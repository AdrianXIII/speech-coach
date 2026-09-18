import { NextRequest, NextResponse } from "next/server";
import { fetchTutorNews } from "@/lib/tutorNews";
import type { CaseProfession } from "@/lib/caseStudyContent";
import { getLanguage, type LanguageCode } from "@/lib/languages";
import { COUNTRY_LABELS, type CountryCode } from "@/lib/countryContext";

/**
 * POST /api/tutor/news
 * Accepts { profession, category, language, country? } and returns
 * { newsItem } — or { newsItem: null } if no verifiable cached or freshly
 * generated item is available, so the client can show its "not available
 * right now" state. `profile` is no longer read: news items are cached and
 * shared across students (see lib/tutorNews.ts), so the applied question is
 * generic rather than tied to one student's fictive company — a `profile`
 * field in the request body, if the client still sends one, is ignored.
 */
export async function POST(req: NextRequest) {
  let body: {
    profession?: CaseProfession;
    category?: string;
    language?: LanguageCode;
    country?: CountryCode;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Expected JSON body." }, { status: 400 });
  }

  if (!body.profession || !body.category || !body.language) {
    return NextResponse.json({ error: "Missing 'profession', 'category', or 'language'." }, { status: 400 });
  }

  const languageName = getLanguage(body.language).name;
  const countryName = body.country && body.country !== "us" ? COUNTRY_LABELS[body.country] : undefined;

  const newsItem = await fetchTutorNews(body.profession, body.category, languageName, countryName);
  return NextResponse.json({ newsItem });
}
