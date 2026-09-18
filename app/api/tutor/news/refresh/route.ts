import { NextRequest, NextResponse } from "next/server";
import { refreshTutorNews } from "@/lib/tutorNews";
import { CASE_CATEGORIES, type CaseProfession } from "@/lib/caseStudyContent";
import { LANGUAGES, getLanguage } from "@/lib/languages";
import { COUNTRY_LABELS, countryForLanguage } from "@/lib/countryContext";

// Up to 28 categories × 5 languages = 140 sequential Gemini calls in one
// request — this can take several minutes. Extend the function timeout as
// far as the hosting plan allows; verify against your actual Vercel plan's
// max duration (Hobby defaults to far less than this).
export const maxDuration = 300;

/**
 * POST /api/tutor/news/refresh
 * Monthly job (see vercel.json's `crons` entry) that re-checks every
 * profession × category × language combination and only overwrites
 * lib/tutorNews.ts's cache when a new, verifiable (real source URL) result
 * comes back — a failed or unverifiable attempt leaves whatever was cached
 * before untouched, so a student is never left without a case just because
 * this month's search didn't turn up anything usable.
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

  const results: { profession: CaseProfession; category: string; language: string; updated: boolean }[] = [];

  for (const profession of Object.keys(CASE_CATEGORIES) as CaseProfession[]) {
    for (const category of CASE_CATEGORIES[profession]) {
      for (const language of LANGUAGES) {
        const languageName = getLanguage(language.code).name;
        const countryCode = countryForLanguage(language.code);
        const countryName = countryCode !== "us" ? COUNTRY_LABELS[countryCode] : undefined;

        const updated = await refreshTutorNews(profession, category, languageName, countryName);
        results.push({ profession, category, language: language.code, updated });
      }
    }
  }

  const updatedCount = results.filter((r) => r.updated).length;
  return NextResponse.json({ total: results.length, updated: updatedCount, results });
}
