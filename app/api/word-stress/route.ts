import { NextRequest, NextResponse } from "next/server";
import { getWordStress } from "@/lib/wordStress";
import { getWordStressAI } from "@/lib/wordAI";
import { getLanguage, toLanguageCode } from "@/lib/languages";

/**
 * GET /api/word-stress?word=development&lang=en
 * A word's syllables and expected stress position. English is a pure local
 * lookup in the CMU Pronouncing Dictionary; de/fr/es/sv ask Gemini (cached
 * per word — see lib/wordAI.ts). `found: false` when the word isn't known;
 * the client falls back to the AI feedback flow in that case.
 */
export async function GET(req: NextRequest) {
  const word = req.nextUrl.searchParams.get("word")?.trim();
  if (!word) {
    return NextResponse.json({ error: "Missing 'word' query param." }, { status: 400 });
  }
  const lang = toLanguageCode(req.nextUrl.searchParams.get("lang"));
  if (lang === "en") return NextResponse.json(getWordStress(word));
  return NextResponse.json(await getWordStressAI(word, getLanguage(lang).name));
}
