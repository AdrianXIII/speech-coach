import { NextRequest, NextResponse } from "next/server";
import { fetchNewsPassage, fetchNewsPassageBySlot, listPoolEntries, NEWS_TOPICS, type NewsTopic } from "@/lib/comprehensionNews";
import { getLanguage, type LanguageCode } from "@/lib/languages";

/**
 * GET /api/comprehension/news?topic=Economy&language=en
 *   -> { passage } — one random cached passage (bootstrap-generates on a
 *      fully empty pool). Used by Shuffle/"New passage" for a one-click pick.
 * GET /api/comprehension/news?topic=Economy&language=en&list=true
 *   -> { pool: [{slot, title}] } — every cached headline for this topic, so
 *      the student can pick one instead of getting a random passage.
 * GET /api/comprehension/news?topic=Economy&language=en&slot=2
 *   -> { passage } — the full passage for one specific slot the student
 *      picked from that list. Returns { passage: null } if that slot isn't
 *      cached (no fallback generation here — see fetchNewsPassageBySlot).
 *
 * `passage: null` / `pool: []` are not errors — the client falls back to
 * the static passage pool when nothing is cached and generation isn't
 * available or fails.
 */
export async function GET(req: NextRequest) {
  const topic = req.nextUrl.searchParams.get("topic") as NewsTopic | null;
  const language = (req.nextUrl.searchParams.get("language") as LanguageCode | null) ?? "en";

  if (!topic || !NEWS_TOPICS.includes(topic)) {
    return NextResponse.json({ error: `'topic' must be one of: ${NEWS_TOPICS.join(", ")}.` }, { status: 400 });
  }

  const languageName = getLanguage(language).name;

  if (req.nextUrl.searchParams.get("list") === "true") {
    const pool = await listPoolEntries(topic, languageName);
    return NextResponse.json({ pool });
  }

  const rawSlot = req.nextUrl.searchParams.get("slot");
  if (rawSlot !== null) {
    const slot = Number(rawSlot);
    if (!Number.isInteger(slot) || slot < 0) {
      return NextResponse.json({ error: "'slot' must be a non-negative integer." }, { status: 400 });
    }
    const passage = await fetchNewsPassageBySlot(topic, languageName, slot);
    return NextResponse.json({ passage });
  }

  const passage = await fetchNewsPassage(topic, languageName);
  return NextResponse.json({ passage });
}
