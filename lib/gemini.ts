import { NextResponse } from "next/server";

const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

/** True once GEMINI_API_KEY is set — used to switch between real calls and mocks. */
export function hasGeminiKey(): boolean {
  return !!process.env.GEMINI_API_KEY;
}

/** Thrown when Gemini rejects a request for exceeding its rate/usage quota (HTTP 429). */
export class GeminiQuotaError extends Error {}

/**
 * Shared error handler for the AI API routes: logs the underlying error and
 * maps it to a client-facing response. A quota error gets its own status
 * and a message the UI can show as-is, instead of a generic 500.
 */
export function geminiErrorResponse(err: unknown, fallbackMessage: string) {
  console.error(fallbackMessage, err);
  if (err instanceof GeminiQuotaError) {
    return NextResponse.json(
      { error: "AI usage limit reached for now — please try again in a few minutes." },
      { status: 429 },
    );
  }
  return NextResponse.json(
    { error: err instanceof Error ? err.message : fallbackMessage },
    { status: 500 },
  );
}

interface GeminiPart {
  text?: string;
  inlineData?: { mimeType: string; data: string };
}

export interface GeminiTurn {
  role: "user" | "model";
  parts: GeminiPart[];
}

async function callGemini(
  contents: GeminiTurn[],
  options?: { responseMimeType?: string },
): Promise<string> {
  const res = await fetch(`${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents,
      generationConfig: {
        thinkingConfig: { thinkingBudget: 0 },
        ...(options?.responseMimeType && { responseMimeType: options.responseMimeType }),
      },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    if (res.status === 429) {
      throw new GeminiQuotaError(`Gemini quota exceeded (${res.status}): ${err}`);
    }
    throw new Error(`Gemini request failed (${res.status}): ${err}`);
  }

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Gemini returned an empty response.");
  return text;
}

/**
 * Calls Gemini's generateContent endpoint directly over fetch (no SDK
 * dependency, same pattern as Memory Atlas's ai-proxy edge function), for a
 * single-turn request. Only call this after checking hasGeminiKey().
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
  return callGemini([{ role: "user", parts }], options);
}

/**
 * Like generateContent, but for a multi-turn conversation: pass the full
 * history (alternating user/model turns) so Gemini can answer a follow-up
 * question with the earlier exchange as context. Only call this after
 * checking hasGeminiKey().
 */
export async function generateChat(history: GeminiTurn[]): Promise<string> {
  return callGemini(history);
}
