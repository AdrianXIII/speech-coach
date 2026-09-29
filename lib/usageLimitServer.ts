import { getDb } from "@/lib/db";

/**
 * Once-a-day free-tier usage (lib/db.ts's daily_usage table) — server-only
 * (imports getDb, which pulls in the `postgres` package). Kept in its own
 * file, separate from lib/usageLimit.ts's client-safe
 * FREE_AI_TUTOR_CATEGORIES/isFreeAiTutorCategory, so a client component
 * (e.g. components/shared/CategoryPicker.tsx) can import the category-lock
 * logic without accidentally pulling `postgres` into the browser bundle.
 *
 * "Once per day" is enforced at the point that actually costs something or
 * represents one real attempt (a graded submission, a fetched passage) —
 * see each feature's own API route — not at page load, so a free user can
 * browse a trainer's page freely and only spends their day's use when they
 * actually do the thing. The four fully client-side trainers (no server
 * action to hook into: collocations, contrastive stress, speed reading,
 * improv) are the exception — their own page.tsx gates at page load instead,
 * the only server touchpoint available for them.
 */

/**
 * True if this feature's once-a-day free use hasn't been spent yet today.
 * Degrades to "available" (open, not closed) on any DB error — same
 * graceful-degrade posture as every other lib/*.ts file that touches the
 * database; a broken limiter should never lock someone out of the app.
 */
export async function canUseToday(userId: number, feature: string): Promise<boolean> {
  try {
    const db = await getDb();
    if (!db) return true;
    const rows = await db`
      SELECT 1 FROM daily_usage WHERE user_id = ${userId} AND feature = ${feature} AND usage_date = CURRENT_DATE
    `;
    return rows.length === 0;
  } catch (err) {
    console.error("canUseToday failed:", err instanceof Error ? err.message : err);
    return true;
  }
}

/** Records today's use. Safe to call more than once — ON CONFLICT DO NOTHING. */
export async function markUsedToday(userId: number, feature: string): Promise<void> {
  try {
    const db = await getDb();
    if (!db) return;
    await db`
      INSERT INTO daily_usage (user_id, feature, usage_date) VALUES (${userId}, ${feature}, CURRENT_DATE)
      ON CONFLICT (user_id, feature, usage_date) DO NOTHING
    `;
  } catch (err) {
    console.error("markUsedToday failed:", err instanceof Error ? err.message : err);
  }
}
