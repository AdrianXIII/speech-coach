import { NextRequest, NextResponse } from "next/server";
import { fetchTutorNews } from "@/lib/tutorNews";
import type { CaseProfession } from "@/lib/caseStudyContent";
import type { TutorProfile } from "@/lib/tutorProfile";
import { getLanguage, type LanguageCode } from "@/lib/languages";
import { COUNTRY_LABELS, type CountryCode } from "@/lib/countryContext";

/**
 * POST /api/tutor/news
 * Accepts { profession, category, profile, language, country? } and
 * returns { newsItem } — or { newsItem: null } if the fetch failed for any
 * reason, so the client can fall back to standard Challenge mode instead of
 * breaking the session. The news item is written directly in `language`
 * (Live News mode is language practice, not just current-events content).
 */
export async function POST(req: NextRequest) {
  let body: {
    profession?: CaseProfession;
    category?: string;
    profile?: TutorProfile;
    language?: LanguageCode;
    country?: CountryCode;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Expected JSON body." }, { status: 400 });
  }

  if (!body.profession || !body.category || !body.profile || !body.language) {
    return NextResponse.json({ error: "Missing 'profession', 'category', 'profile', or 'language'." }, { status: 400 });
  }

  const languageName = getLanguage(body.language).name;
  const countryName = body.country && body.country !== "us" ? COUNTRY_LABELS[body.country] : undefined;

  const newsItem = await fetchTutorNews(body.profession, body.category, body.profile, languageName, countryName);
  return NextResponse.json({ newsItem });
}
