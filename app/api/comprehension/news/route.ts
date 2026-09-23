import { NextRequest, NextResponse } from "next/server";
import { fetchNewsPassage, NEWS_TOPICS, type NewsTopic } from "@/lib/comprehensionNews";
import { getLanguage, type LanguageCode } from "@/lib/languages";

/**
 * GET /api/comprehension/news?topic=Economy&language=en
 * Real-news passage for the Listening & Summary trainer's topic picker.
 * Cache-first (see lib/comprehensionNews.ts); returns { passage: null } —
 * not an error — when nothing is cached and generation isn't available or
 * fails, so the client can fall back to the static passage pool.
 */
export async function GET(req: NextRequest) {
  const topic = req.nextUrl.searchParams.get("topic") as NewsTopic | null;
  const language = (req.nextUrl.searchParams.get("language") as LanguageCode | null) ?? "en";

  if (!topic || !NEWS_TOPICS.includes(topic)) {
    return NextResponse.json({ error: `'topic' must be one of: ${NEWS_TOPICS.join(", ")}.` }, { status: 400 });
  }

  const passage = await fetchNewsPassage(topic, getLanguage(language).name);
  return NextResponse.json({ passage });
}
