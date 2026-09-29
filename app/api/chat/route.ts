import { NextRequest, NextResponse } from "next/server";
import { continueChat, type ChatTurn } from "@/lib/chat";
import { geminiErrorResponse } from "@/lib/gemini";
import { getLanguage, toLanguageCode } from "@/lib/languages";
import { requireApiUser } from "@/lib/requireUser";
import { checkRateLimit } from "@/lib/rateLimit";

const MAX_TURNS = 40;
const MAX_TURN_CHARS = 4000;

/**
 * POST /api/chat
 * Generic follow-up chat used by any AI feedback panel (pronunciation
 * feedback, speech coaching, script generation). Accepts { history }: the
 * full conversation so far as alternating { role: "user" | "model", text }
 * turns, seeded by the caller with the original request/response pair, and
 * returns Gemini's reply to the last turn (mocked if GEMINI_API_KEY isn't
 * set).
 */
export async function POST(req: NextRequest) {
  const gate = await requireApiUser();
  if (gate instanceof NextResponse) return gate;

  if (!(await checkRateLimit(String(gate.id)))) {
    return NextResponse.json({ error: "Too many requests. Please slow down." }, { status: 429 });
  }

  let body: { history?: ChatTurn[]; language?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Expected JSON body." }, { status: 400 });
  }

  const history = body.history;
  if (!Array.isArray(history) || history.length === 0) {
    return NextResponse.json({ error: "Missing 'history'." }, { status: 400 });
  }
  if (history.length > MAX_TURNS || history.some((turn) => (turn.text?.length ?? 0) > MAX_TURN_CHARS)) {
    return NextResponse.json({ error: "Conversation is too long." }, { status: 413 });
  }
  const lastTurn = history[history.length - 1];
  if (lastTurn?.role !== "user" || !lastTurn.text?.trim()) {
    return NextResponse.json(
      { error: "The last history entry must be a non-empty user turn." },
      { status: 400 },
    );
  }

  try {
    const reply = await continueChat(history, getLanguage(toLanguageCode(body.language)).name);
    return NextResponse.json({ reply });
  } catch (err) {
    return geminiErrorResponse(err, "Chat failed.");
  }
}
