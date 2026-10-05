import { getDb, hasDatabase } from "@/lib/db";

/**
 * Unified per-session activity log, written by every trainer for every
 * account — free AND premium (see lib/db.ts's trainer_activity doc comment
 * for why this has to be a separate table from daily_usage, which is only
 * ever written for free-tier accounts as a side effect of gating the daily
 * limit, so it's blind for every paying subscriber). Backs the Progress
 * screen (app/progress/page.tsx). Same degrade-don't-throw posture as every
 * other lib/*.ts file that touches the database — a DB hiccup here should
 * never fail the trainer action it's logging alongside.
 */

// No "weekly goal" concept exists anywhere else in this app — this is a
// new, reasonable-but-invented default (loosely echoing the free tier's
// "one session per trainer per day" framing), not something discovered.
// Easy to change later if a different number fits better.
const WEEKLY_GOAL_SESSIONS = 5;

export async function logActivity(
  userId: number,
  feature: string,
  opts: { durationSeconds?: number; score?: number } = {},
): Promise<void> {
  if (!hasDatabase()) return;
  try {
    const sql = await getDb();
    await sql!`
      INSERT INTO trainer_activity (user_id, feature, duration_seconds, score)
      VALUES (${userId}, ${feature}, ${opts.durationSeconds ?? null}, ${opts.score ?? null})
    `;
  } catch (err) {
    console.error("trainer_activity log failed:", err instanceof Error ? err.message : err);
  }
}

export interface ProgressSummary {
  streakDays: number;
  minutesThisWeek: number;
  /** null (not 0) when nothing with a score has been logged yet — a brand-new account has no average, not a zero one. */
  avgScore: number | null;
  sessionsThisWeek: number;
  weeklyGoalSessions: number;
  weeklyGoalPercent: number;
}

const EMPTY_SUMMARY: ProgressSummary = {
  streakDays: 0,
  minutesThisWeek: 0,
  avgScore: null,
  sessionsThisWeek: 0,
  weeklyGoalSessions: WEEKLY_GOAL_SESSIONS,
  weeklyGoalPercent: 0,
};

export async function getProgressSummary(userId: number): Promise<ProgressSummary> {
  if (!hasDatabase()) return EMPTY_SUMMARY;
  try {
    const sql = await getDb();
    if (!sql) return EMPTY_SUMMARY;

    // Fetched as raw timestamps (not a ::date cast) and bucketed into UTC
    // calendar days in JS below — simpler and more predictable than relying
    // on how a Postgres date cast happens to get typed back by the driver.
    // 60 days is comfortably more than any realistic streak in a daily-use
    // coaching app, without scanning a long-tenured account's full history.
    const recent = await sql<{ occurred_at: Date }[]>`
      SELECT occurred_at FROM trainer_activity
      WHERE user_id = ${userId} AND occurred_at >= now() - interval '60 days'
      ORDER BY occurred_at DESC
    `;
    const dayKeysDesc = Array.from(new Set(recent.map((r) => new Date(r.occurred_at).toISOString().slice(0, 10))));
    const streakDays = computeStreak(dayKeysDesc);

    const weekRows = await sql<{ minutes: string | null; sessions: number }[]>`
      SELECT COALESCE(SUM(duration_seconds), 0) / 60 AS minutes, COUNT(*)::int AS sessions
      FROM trainer_activity
      WHERE user_id = ${userId} AND occurred_at >= date_trunc('week', now())
    `;
    const minutesThisWeek = Math.round(Number(weekRows[0]?.minutes ?? 0));
    const sessionsThisWeek = weekRows[0]?.sessions ?? 0;

    const scoreRows = await sql<{ avg: string | null }[]>`
      SELECT AVG(score) AS avg FROM trainer_activity WHERE user_id = ${userId} AND score IS NOT NULL
    `;
    const avgRaw = scoreRows[0]?.avg;
    const avgScore = avgRaw === null || avgRaw === undefined ? null : Math.round(Number(avgRaw));

    const weeklyGoalPercent = Math.min(100, Math.round((sessionsThisWeek / WEEKLY_GOAL_SESSIONS) * 100));

    return {
      streakDays,
      minutesThisWeek,
      avgScore,
      sessionsThisWeek,
      weeklyGoalSessions: WEEKLY_GOAL_SESSIONS,
      weeklyGoalPercent,
    };
  } catch (err) {
    console.error("getProgressSummary failed:", err instanceof Error ? err.message : err);
    return EMPTY_SUMMARY;
  }
}

/**
 * Consecutive UTC calendar days of activity, counting back from today.
 * `dayKeysDesc` is "YYYY-MM-DD" strings, already deduplicated and sorted
 * newest-first. A missing *today* doesn't break the streak (yesterday can
 * still anchor it — the user just hasn't practiced yet today); a missing
 * yesterday with no activity today means the streak is over.
 */
function computeStreak(dayKeysDesc: string[]): number {
  if (dayKeysDesc.length === 0) return 0;
  const dayMs = 24 * 60 * 60 * 1000;
  const toUTC = (key: string) => new Date(`${key}T00:00:00Z`).getTime();
  const todayUTC = toUTC(new Date().toISOString().slice(0, 10));

  const mostRecent = toUTC(dayKeysDesc[0]);
  if (mostRecent !== todayUTC && mostRecent !== todayUTC - dayMs) return 0;

  let streak = 1;
  let cursor = mostRecent;
  for (let i = 1; i < dayKeysDesc.length; i++) {
    const d = toUTC(dayKeysDesc[i]);
    if (d !== cursor - dayMs) break;
    streak++;
    cursor = d;
  }
  return streak;
}
