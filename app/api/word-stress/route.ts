import { NextRequest, NextResponse } from "next/server";
import { getWordStress } from "@/lib/wordStress";

/**
 * GET /api/word-stress?word=development
 * Looks up a word's syllable count and expected stress position in the CMU
 * Pronouncing Dictionary. Pure local lookup — no AI call, no quota concern.
 * `found: false` when the word/phrase isn't in the dictionary; the client
 * falls back to the existing AI feedback flow in that case.
 */
export async function GET(req: NextRequest) {
  const word = req.nextUrl.searchParams.get("word")?.trim();
  if (!word) {
    return NextResponse.json({ error: "Missing 'word' query param." }, { status: 400 });
  }

  return NextResponse.json(getWordStress(word));
}
