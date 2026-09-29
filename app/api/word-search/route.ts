import { NextRequest, NextResponse } from "next/server";
import { suggestWords } from "@/lib/wordSearch";
import { suggestWordsAI } from "@/lib/wordAI";
import { getLanguage, toLanguageCode } from "@/lib/languages";
import { requireApiUser } from "@/lib/requireUser";

const MAX_QUERY_CHARS = 60;

/**
 * GET /api/word-search?q=fisiks&lang=en
 * Spelling-help suggestions for a partial or phonetically-guessed input.
 * English is a pure local lookup against the CMU Pronouncing Dictionary;
 * de/fr/es/sv ask Gemini (cached per input — see lib/wordAI.ts).
 */
export async function GET(req: NextRequest) {
  const gate = await requireApiUser();
  if (gate instanceof NextResponse) return gate;

  const q = (req.nextUrl.searchParams.get("q") ?? "").slice(0, MAX_QUERY_CHARS);
  const lang = toLanguageCode(req.nextUrl.searchParams.get("lang"));
  if (lang === "en") return NextResponse.json({ suggestions: suggestWords(q) });
  return NextResponse.json({ suggestions: await suggestWordsAI(q, getLanguage(lang).name) });
}
