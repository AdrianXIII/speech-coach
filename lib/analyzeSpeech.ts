import { generateContent, hasGeminiKey } from "@/lib/gemini";
import { analyzeSpeechMetrics, type SpeechMetrics } from "@/lib/speechMetrics";

export interface SpeechAnalysisResult {
  transcript: string;
  metrics: SpeechMetrics;
  strengths: string[]; // exactly 3
  tips: string[]; // exactly 3
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

Respond with a JSON object matching exactly this shape:
{
  "transcript": "<verbatim transcript>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "tips": ["<actionable tip 1>", "<actionable tip 2>", "<actionable tip 3>"]
}

Rules:
- Exactly 3 strengths and exactly 3 tips — no more, no fewer.
- One to two sentences each.
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
  };
  const transcript = (parsed.transcript ?? "").trim();
  if (!transcript) throw new Error("Gemini returned an empty transcript.");

  return {
    transcript,
    metrics: analyzeSpeechMetrics(transcript, durationSeconds),
    strengths: (parsed.strengths ?? []).slice(0, 3),
    tips: (parsed.tips ?? []).slice(0, 3),
    mocked: false,
  };
}
