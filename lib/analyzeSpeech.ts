import { generateContent, hasGeminiKey } from "@/lib/gemini";
import { analyzeSpeechMetrics, type SpeechMetrics } from "@/lib/speechMetrics";

export interface MispronouncedWord {
  /** The correctly spelled target word (never a phonetic spelling of what was actually said) — safe to feed straight into the Pronunciation trainer's dictionary lookup. */
  word: string;
  /** What was off, and how to say it correctly — one short sentence. */
  note: string;
}

export interface SpeechAnalysisResult {
  transcript: string;
  metrics: SpeechMetrics;
  strengths: string[]; // exactly 3
  tips: string[]; // exactly 3
  mispronouncedWords: MispronouncedWord[]; // 0-5
  mocked: boolean;
}

const MOCK_TRANSCRIPT =
  "So, um, today I want to talk about, like, the importance of, uh, public speaking. " +
  "You know, it's a skill that, um, basically everyone needs, whether you're, like, " +
  "presenting to a small team or, uh, speaking at a big conference. So, yeah, let's get into it.";

const SYSTEM_PROMPT = `You are an expert public speaking coach with decades of experience helping people become more confident, clear, and engaging speakers.

You will be given an audio recording of someone's practice speech.

Step 1: Transcribe it exactly word-for-word, in the language spoken (ignore any video, focus only on what's said). Include filler words like "um", "uh", "like", "you know", "so" if you hear them — do not clean them up.

Step 2: Using that transcript, analyze their delivery and respond with specific, constructive, encouraging feedback grounded in what's actually in the transcript and how it's paced — not generic advice that could apply to anyone.

Step 3: Listen specifically for pronunciation, separately from content or delivery — words where the articulation itself was unclear, a sound was substituted or dropped, or stress fell on the wrong syllable. Pick out at most 5 of the clearest examples actually audible in the recording (never guess from spelling alone). If pronunciation was generally clear, return fewer, or none — do not invent problems to fill 5 slots.

Respond with a JSON object matching exactly this shape:
{
  "transcript": "<verbatim transcript>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "tips": ["<actionable tip 1>", "<actionable tip 2>", "<actionable tip 3>"],
  "mispronouncedWords": [{"word": "<the correctly spelled target word — the real dictionary word they were trying to say, NEVER a phonetic spelling of what came out>", "note": "<what was off and how to say it correctly, one short sentence>"}]
}

Rules:
- Exactly 3 strengths and exactly 3 tips — no more, no fewer.
- mispronouncedWords: at most 5 entries, and only ones you actually heard — an empty array is a valid, good answer. "word" must always be the correctly spelled target word (e.g. "speaking"), even if what was actually said sounded like "sproaking" — describe that discrepancy in "note", not in "word".
- One to two sentences each for strengths/tips; one short sentence per mispronouncedWords note.
- Tips must be actionable (something to practice or change next time), not just restating a problem.
- Be honest but encouraging.`;

/**
 * Transcribes a recording and generates coaching feedback in a single
 * Gemini call (rather than a separate transcribe-then-coach round trip),
 * to cut API request volume in half. Falls back to a mock transcript +
 * feedback (still reflecting real, locally-computed metrics) when
 * GEMINI_API_KEY isn't set.
 */
export async function analyzeSpeech(
  audio: File,
  durationSeconds: number,
): Promise<SpeechAnalysisResult> {
  if (!hasGeminiKey()) {
    const metrics = analyzeSpeechMetrics(MOCK_TRANSCRIPT, durationSeconds);
    return {
      transcript: MOCK_TRANSCRIPT,
      metrics,
      strengths: [
        "Mock mode: set GEMINI_API_KEY to get real AI coaching feedback here.",
        "Your transcript was captured and run through the filler-word and pacing analysis successfully.",
        "The full pipeline (record → transcribe → analyze → coach) is wired up end-to-end.",
      ],
      tips: [
        "Add GEMINI_API_KEY to your environment to replace this mock with real AI coaching.",
        `You used ${metrics.fillerWords.total} filler word(s) in this recording — try pausing silently instead of filling the gap.`,
        `Your pace was ${metrics.wordsPerMinute} words/minute — a natural conversational pace is roughly 120-160 wpm.`,
      ],
      mispronouncedWords: [],
      mocked: true,
    };
  }

  const buffer = await audio.arrayBuffer();
  const base64 = Buffer.from(buffer).toString("base64");

  const raw = await generateContent(
    [
      { text: SYSTEM_PROMPT },
      { inlineData: { mimeType: audio.type || "audio/webm", data: base64 } },
    ],
    { responseMimeType: "application/json" },
  );

  const parsed = JSON.parse(raw) as {
    transcript?: string;
    strengths?: string[];
    tips?: string[];
    mispronouncedWords?: Partial<MispronouncedWord>[];
  };
  const transcript = (parsed.transcript ?? "").trim();
  if (!transcript) throw new Error("Gemini returned an empty transcript.");

  const mispronouncedWords = (parsed.mispronouncedWords ?? [])
    .filter((item): item is MispronouncedWord => Boolean(item.word && item.note))
    .slice(0, 5);

  return {
    transcript,
    metrics: analyzeSpeechMetrics(transcript, durationSeconds),
    strengths: (parsed.strengths ?? []).slice(0, 3),
    tips: (parsed.tips ?? []).slice(0, 3),
    mispronouncedWords,
    mocked: false,
  };
}
