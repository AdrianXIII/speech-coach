import { NextRequest, NextResponse } from "next/server";
import { refreshNewsPassage, NEWS_TOPICS } from "@/lib/comprehensionNews";
import { LANGUAGES, getLanguage } from "@/lib/languages";

// 5 topics x 5 languages = 25 grounded Gemini calls — comfortably fast, no
// need for the AI Tutor refresh route's extended maxDuration.

/**
 * POST /api/comprehension/news/refresh
 * Daily job (see vercel.json's `crons` entry) that regenerates every
 * topic x language combination and only overwrites
 * lib/comprehensionNews.ts's cache when a new, verifiable (real source URL)
 * result comes back — a failed or unverifiable attempt leaves whatever was
 * cached before untouched, so a student is never left without a passage
 * just because today's search didn't turn up anything usable. Daily, not
 * monthly like the AI Tutor's news cases, because this trainer's whole
 * point is practicing with current events — a month-old cache would defeat
 * the reason this feature exists.
 *
 * Protected the same way Vercel Cron itself recommends: when CRON_SECRET is
 * set, Vercel automatically sends `Authorization: Bearer <CRON_SECRET>` on
 * cron-triggered requests, so anyone else calling this route is rejected.
 */
export async function POST(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }
  }

  const results: { topic: string; language: string; updated: boolean }[] = [];

  for (const topic of NEWS_TOPICS) {
    for (const language of LANGUAGES) {
      const updated = await refreshNewsPassage(topic, getLanguage(language.code).name);
      results.push({ topic, language: language.code, updated });
    }
  }

  const updatedCount = results.filter((r) => r.updated).length;
  return NextResponse.json({ total: results.length, updated: updatedCount, results });
}
