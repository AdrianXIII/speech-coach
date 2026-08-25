const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

/** True once GEMINI_API_KEY is set — used to switch between real calls and mocks. */
export function hasGeminiKey(): boolean {
  return !!process.env.GEMINI_API_KEY;
}

interface GeminiPart {
  text?: string;
  inlineData?: { mimeType: string; data: string };
}

/**
 * Calls Gemini's generateContent endpoint directly over fetch (no SDK
 * dependency, same pattern as Memory Atlas's ai-proxy edge function).
 * Only call this after checking hasGeminiKey().
 *
 * Thinking is disabled by default: these are direct extraction tasks
 * (transcribe, produce JSON feedback), not reasoning tasks, and 2.5
 * Flash's thinking mode can otherwise spend its whole token budget on
 * internal reasoning and return a response with no actual text part.
 */
export async function generateContent(
  parts: GeminiPart[],
  options?: { responseMimeType?: string },
): Promise<string> {
  const res = await fetch(`${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts }],
      generationConfig: {
        thinkingConfig: { thinkingBudget: 0 },
        ...(options?.responseMimeType && { responseMimeType: options.responseMimeType }),
      },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini request failed (${res.status}): ${err}`);
  }

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error(`Gemini returned an empty response: ${JSON.stringify(data)}`);
  }
  return text;
}
