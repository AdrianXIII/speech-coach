import { NextRequest, NextResponse } from "next/server";
import { buildTeachingBrief } from "@/lib/tutorEngine";
import { translateTeachingContent } from "@/lib/tutorTranslate";
import type { CaseProfession } from "@/lib/caseStudyContent";
import type { CountryCode } from "@/lib/countryContext";
import { getLanguage, type LanguageCode } from "@/lib/languages";

/**
 * POST /api/tutor/localize-teach
 * Looks up teaching content server-side (same lookup buildTeachingBrief
 * does client-side for English) and, for any non-English language,
 * translates its display text via Gemini so the Teach step can actually be
 * used to practice the target language, not just read English. English
 * requests are served straight from static content — no API call, no
 * translation needed.
 */
export async function POST(req: NextRequest) {
  let body: { profession?: CaseProfession; category?: string; jurisdiction?: CountryCode; language?: LanguageCode };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Expected JSON body." }, { status: 400 });
  }

  const { profession, category, jurisdiction, language } = body;
  if (!profession || !category || !language) {
    return NextResponse.json({ error: "Missing 'profession', 'category', or 'language'." }, { status: 400 });
  }

  const brief = buildTeachingBrief(profession, category, jurisdiction);
  if (language === "en" || !brief.teaching) {
    return NextResponse.json(brief);
  }

  const teaching = await translateTeachingContent(brief.teaching, getLanguage(language).name);
  return NextResponse.json({ ...brief, teaching });
}
