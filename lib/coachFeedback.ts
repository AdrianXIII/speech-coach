import { getOpenAI, hasOpenAIKey } from "@/lib/openai";
import type { SpeechMetrics } from "@/lib/speechMetrics";

export interface CoachFeedback {
  strengths: string[]; // exactly 3
  tips: string[]; // exactly 3
  mocked: boolean;
}

const SYSTEM_PROMPT = `You are an expert public speaking coach with decades of experience helping people become more confident, clear, and engaging speakers.

You will be given a transcript of someone's practice speech, along with objective delivery metrics (pace in words per minute, filler-word usage). Analyze their delivery and respond with specific, constructive, encouraging feedback grounded in what's actually in the transcript and metrics — not generic advice that could apply to anyone.

Respond with a JSON object matching exactly this shape:
{
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "tips": ["<actionable tip 1>", "<actionable tip 2>", "<actionable tip 3>"]
}

Rules:
- Exactly 3 strengths and exactly 3 tips — no more, no fewer.
- One to two sentences each.
- Tips must be actionable (something to practice or change next time), not just restating a problem.
- Be honest but encouraging.`;

/**
 * Sends the transcript + metrics to GPT-4o for coaching feedback. Falls
 * back to a mock response (that still reflects the real metrics) when
 * OPENAI_API_KEY isn't set.
 */
export async function generateCoachFeedback(
  transcript: string,
  metrics: SpeechMetrics,
): Promise<CoachFeedback> {
  if (!hasOpenAIKey()) {
    return {
      strengths: [
        "Mock mode: set OPENAI_API_KEY to get real GPT-4o coaching feedback here.",
        "Your transcript was captured and run through the filler-word and pacing analysis successfully.",
        "The full pipeline (record → transcribe → analyze → coach) is wired up end-to-end.",
      ],
      tips: [
        "Add OPENAI_API_KEY to your environment to replace this mock with real AI coaching.",
        `You used ${metrics.fillerWords.total} filler word(s) in this recording — try pausing silently instead of filling the gap.`,
        `Your pace was ${metrics.wordsPerMinute} words/minute — a natural conversational pace is roughly 120-160 wpm.`,
      ],
      mocked: true,
    };
  }

  const openai = getOpenAI();
  const userPrompt = [
    `Transcript:\n"""${transcript}"""`,
    "",
    "Metrics:",
    `- Pace: ${metrics.wordsPerMinute} words per minute`,
    `- Filler words: ${metrics.fillerWords.total} total — ${JSON.stringify(metrics.fillerWords.byWord)}`,
  ].join("\n");

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userPrompt },
    ],
    response_format: { type: "json_object" },
  });

  const raw = completion.choices[0]?.message?.content;
  if (!raw) throw new Error("GPT-4o returned an empty response.");

  const parsed = JSON.parse(raw) as { strengths?: string[]; tips?: string[] };

  return {
    strengths: (parsed.strengths ?? []).slice(0, 3),
    tips: (parsed.tips ?? []).slice(0, 3),
    mocked: false,
  };
}
