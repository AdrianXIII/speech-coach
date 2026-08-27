import { NextRequest, NextResponse } from "next/server";
import { continueChat, type ChatTurn } from "@/lib/chat";
import { geminiErrorResponse } from "@/lib/gemini";

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
  let body: { history?: ChatTurn[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Expected JSON body." }, { status: 400 });
  }

  const history = body.history;
  if (!Array.isArray(history) || history.length === 0) {
    return NextResponse.json({ error: "Missing 'history'." }, { status: 400 });
  }
  const lastTurn = history[history.length - 1];
  if (lastTurn?.role !== "user" || !lastTurn.text?.trim()) {
    return NextResponse.json(
      { error: "The last history entry must be a non-empty user turn." },
      { status: 400 },
    );
  }

  try {
    const reply = await continueChat(history);
    return NextResponse.json({ reply });
  } catch (err) {
    return geminiErrorResponse(err, "Chat failed.");
  }
}
