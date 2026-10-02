import { NextRequest, NextResponse } from "next/server";
import { suggestWords } from "@/lib/wordSearch";
import { suggestWordsAI } from "@/lib/wordAI";
import { getLanguage, toLanguageCode } from "@/lib/languages";
import { requireApiUser } from "@/lib/requireUser";
import { checkRateLimit, LIGHT_WINDOW_MS, LIGHT_MAX_PER_WINDOW } from "@/lib/rateLimit";

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

  // Light tier, own key prefix: this fires on near-every keystroke (a
  // debounced autocomplete), so it needs a far looser budget than — and a
  // separate bucket from — the one-deliberate-action routes.
  if (!(await checkRateLimit(`word-search:${gate.id}`, { windowMs: LIGHT_WINDOW_MS, max: LIGHT_MAX_PER_WINDOW }))) {
    return NextResponse.json({ error: "Too many requests. Please slow down." }, { status: 429 });
  }

  const q = (req.nextUrl.searchParams.get("q") ?? "").slice(0, MAX_QUERY_CHARS);
  const lang = toLanguageCode(req.nextUrl.searchParams.get("lang"));
  if (lang === "en") return NextResponse.json({ suggestions: suggestWords(q) });
  return NextResponse.json({ suggestions: await suggestWordsAI(q, getLanguage(lang).name) });
}
