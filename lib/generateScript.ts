import { generateContent, hasGeminiKey } from "@/lib/gemini";

export interface GeneratedScript {
  script: string;
  mocked: boolean;
}

const SYSTEM_PROMPT = `You are an expert speechwriter helping someone prepare for a practice speech.

They'll give you a topic, rough notes, or a rough draft below. Write a polished, natural-sounding
version of what they could say out loud — written to be spoken, not read: contractions are fine,
keep the rhythm conversational, avoid stiff or overly literary phrasing.

Aim for roughly 150-250 words (about 1-2 minutes at a natural speaking pace).

Return ONLY the script text. No preamble, no markdown, no quotation marks around it.`;

const MOCK_SCRIPT =
  "Mock mode: set GEMINI_API_KEY to get a real AI-written script here. " +
  "For now, here's a placeholder you can still use to test the teleprompter — " +
  "try pasting your own notes above and clicking record to practice your pacing " +
  "and delivery while these lines scroll past.";

/**
 * Turns a topic, rough notes, or a draft into a polished, speakable script.
 * Falls back to a mock script when GEMINI_API_KEY isn't set.
 */
export async function generateScript(input: string): Promise<GeneratedScript> {
  if (!hasGeminiKey()) {
    return { script: MOCK_SCRIPT, mocked: true };
  }

  const script = await generateContent([{ text: `${SYSTEM_PROMPT}\n\nInput:\n"""${input}"""` }]);
  return { script: script.trim(), mocked: false };
}
