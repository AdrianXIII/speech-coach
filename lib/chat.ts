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
export async function continueChat(history: ChatTurn[]): Promise<string> {
  if (!hasGeminiKey()) return MOCK_REPLY;

  const contents: GeminiTurn[] = history.map((turn) => ({
    role: turn.role,
    parts: [{ text: turn.text }],
  }));

  const reply = await generateChat(contents);
  return reply.trim();
}
