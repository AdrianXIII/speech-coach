import { generateContent, hasGeminiKey } from "@/lib/gemini";

export interface PronunciationFeedback {
  feedback: string;
  mocked: boolean;
}

const PROMPT_TEMPLATE = (targetWord: string) => `You are a friendly pronunciation coach helping a
non-native English speaker sound more like a native speaker.

They are practicing saying: "${targetWord}"

Listen to the attached recording of them saying it. In 2-3 short sentences: say how close it is to
a native pronunciation, point out the specific sound(s) or syllable stress that's off (if any), and
give one concrete tip to fix it (e.g. tongue/mouth position, which syllable to stress, a similar
word that has the right sound). Be encouraging but honest — if it already sounds native, say so
plainly instead of inventing a flaw.

Return plain text only, no markdown.`;

const MOCK_FEEDBACK =
  "Mock mode: set GEMINI_API_KEY to get real pronunciation feedback here. " +
  "Once it's set, this will listen to your recording and compare it against a native pronunciation " +
  "of the word, syllable by syllable.";

/**
 * Sends a recording of the user saying `targetWord` to Gemini for
 * qualitative pronunciation feedback. Falls back to a mock response when
 * GEMINI_API_KEY isn't set.
 */
export async function getPronunciationFeedback(
  targetWord: string,
  audio: File,
): Promise<PronunciationFeedback> {
  if (!hasGeminiKey()) {
    return { feedback: MOCK_FEEDBACK, mocked: true };
  }

  const buffer = await audio.arrayBuffer();
  const base64 = Buffer.from(buffer).toString("base64");

  const feedback = await generateContent([
    { text: PROMPT_TEMPLATE(targetWord) },
    { inlineData: { mimeType: audio.type || "audio/webm", data: base64 } },
  ]);

  return { feedback: feedback.trim(), mocked: false };
}
