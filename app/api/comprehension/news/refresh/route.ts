import { NextRequest, NextResponse } from "next/server";
import { refreshNewsSlot, NEWS_TOPICS, NEWS_POOL_SIZE, type NewsTopic } from "@/lib/comprehensionNews";
import { LANGUAGES, getLanguage } from "@/lib/languages";

// Hobby's realistic function-duration ceiling is well under Vercel Pro's
// configurable 300s — see the cycle-length reasoning below for why this
// route deliberately never approaches even this lower cap.
export const maxDuration = 60;

/**
 * Spreads filling the 5-topic x 5-language x 5-slot pool (125 grounded
 * Gemini calls total) across CYCLE_LENGTH_DAYS days instead of one big run:
 * a free Gemini key's per-minute rate limit and Vercel Hobby's ~60s function
 * ceiling both rule out 125 sequential grounded-search calls in one
 * invocation. 125 / 18 ≈ 7 calls/day comfortably fits both constraints with
 * margin. Lower this once on a paid Vercel/Gemini tier for fresher slots —
 * it's the only knob that trades safety margin for freshness.
 */
const CYCLE_LENGTH_DAYS = 18;

interface WorkUnit {
  topic: NewsTopic;
  languageCode: string;
  languageName: string;
  slot: number;
}

function buildWorkList(): WorkUnit[] {
  const units: WorkUnit[] = [];
  for (const topic of NEWS_TOPICS) {
    for (const language of LANGUAGES) {
      for (let slot = 0; slot < NEWS_POOL_SIZE; slot++) {
        units.push({ topic, languageCode: language.code, languageName: getLanguage(language.code).name, slot });
      }
    }
  }
  return units;
}

function chunkForToday(units: WorkUnit[], overrideChunkIndex?: number): { chunkIndex: number; chunk: WorkUnit[] } {
  const chunkIndex = overrideChunkIndex ?? Math.floor(Date.now() / 86_400_000) % CYCLE_LENGTH_DAYS;
  const chunkSize = Math.ceil(units.length / CYCLE_LENGTH_DAYS);
  const start = chunkIndex * chunkSize;
  return { chunkIndex, chunk: units.slice(start, start + chunkSize) };
}

/**
 * POST /api/comprehension/news/refresh
 * Daily job (see vercel.json's `crons` entry — schedule unchanged from the
 * original single-slot-per-pair version) that processes one deterministic
 * ~1/18th slice of the full pool-filling work list today (see
 * CYCLE_LENGTH_DAYS above), so the full 5-article-per-topic pool cycles
 * once roughly every 2.5 weeks — the closest safe cadence to "weekly" this
 * project's Vercel Hobby plan and free Gemini key allow. A failed or
 * unverifiable attempt leaves whatever was cached in that slot before
 * untouched, so a student is never left without a passage just because
 * today's search didn't turn up anything usable for one slot.
 *
 * Each (topic, language) pair's slots are processed strictly sequentially
 * (never concurrently) — required so each slot's generation can be steered
 * away from stories already sitting in that pair's other slots, looked up
 * fresh from the DB each time (see lib/comprehensionNews.ts's
 * refreshNewsSlot/getSiblingSlots — this is also what makes dedup work
 * across days, not just within one run, since a pair's 5 slots are
 * routinely filled on different days), and to stay well under a free-tier
 * key's requests-per-minute limit.
 *
 * Protected the same way Vercel Cron itself recommends: when CRON_SECRET is
 * set, Vercel automatically sends `Authorization: Bearer <CRON_SECRET>` on
 * cron-triggered requests, so anyone else calling this route is rejected.
 *
 * Accepts an optional `?chunkIndex=N` (0 to CYCLE_LENGTH_DAYS-1) to manually
 * pre-warm the pool by walking through every chunk in one sitting instead of
 * waiting for the natural daily cycle — the cron itself never sends this,
 * it's for a human driving curl/Postman during initial rollout.
 */
export async function POST(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }
  }

  const rawOverride = req.nextUrl.searchParams.get("chunkIndex");
  const overrideChunkIndex = rawOverride !== null ? Number(rawOverride) : undefined;
  if (overrideChunkIndex !== undefined && (!Number.isInteger(overrideChunkIndex) || overrideChunkIndex < 0 || overrideChunkIndex >= CYCLE_LENGTH_DAYS)) {
    return NextResponse.json({ error: `chunkIndex must be an integer from 0 to ${CYCLE_LENGTH_DAYS - 1}.` }, { status: 400 });
  }

  const { chunkIndex, chunk } = chunkForToday(buildWorkList(), overrideChunkIndex);

  const results: { topic: string; language: string; slot: number; updated: boolean }[] = [];

  for (const unit of chunk) {
    const accepted = await refreshNewsSlot(unit.topic, unit.languageName, unit.slot);
    results.push({ topic: unit.topic, language: unit.languageCode, slot: unit.slot, updated: Boolean(accepted) });
  }

  const updatedCount = results.filter((r) => r.updated).length;
  return NextResponse.json({ chunkIndex, cycleLengthDays: CYCLE_LENGTH_DAYS, total: results.length, updated: updatedCount, results });
}
