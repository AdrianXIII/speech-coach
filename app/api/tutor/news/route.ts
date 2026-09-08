import { NextRequest, NextResponse } from "next/server";
import { fetchTutorNews } from "@/lib/tutorNews";
import type { CaseProfession } from "@/lib/caseStudyContent";
import type { TutorProfile } from "@/lib/tutorProfile";

/**
 * POST /api/tutor/news
 * Accepts { profession, category, profile } and returns { newsItem } — or
 * { newsItem: null } if the fetch failed for any reason, so the client can
 * fall back to standard Challenge mode instead of breaking the session.
 */
export async function POST(req: NextRequest) {
  let body: { profession?: CaseProfession; category?: string; profile?: TutorProfile };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Expected JSON body." }, { status: 400 });
  }

  if (!body.profession || !body.category || !body.profile) {
    return NextResponse.json({ error: "Missing 'profession', 'category', or 'profile'." }, { status: 400 });
  }

  const newsItem = await fetchTutorNews(body.profession, body.category, body.profile);
  return NextResponse.json({ newsItem });
}
