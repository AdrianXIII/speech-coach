import { generateChat, hasGeminiKey, type GeminiTurn } from "@/lib/gemini";

export interface ChatTurn {
  role: "user" | "model";
  text: string;
}

const MOCK_REPLY =
  "Mock mode: set GEMINI_API_KEY to get a real follow-up answer here. Once it's set, I'll " +
  "answer based on everything discussed above.";

/**
 * Continues a conversation seeded with the original AI feedback: `history`
 * starts with a synthetic user/model turn pair (what was asked, what the
 * feature's feedback said) followed by the actual back-and-forth, ending
 * with the visitor's latest question. Text-only — no audio is re-sent, so
 * a follow-up costs a fraction of the original analysis call.
 */
export async function continueChat(history: ChatTurn[], languageName = "English"): Promise<string> {
  if (!hasGeminiKey()) return MOCK_REPLY;

  // No system-prompt slot in generateChat, so the language instruction
  // rides on the first (synthetic, caller-seeded) user turn.
  const contents: GeminiTurn[] = history.map((turn, i) => ({
    role: turn.role,
    parts: [{ text: i === 0 ? `(Always reply in ${languageName}.)\n\n${turn.text}` : turn.text }],
  }));

  const reply = await generateChat(contents);
  return reply.trim();
}
