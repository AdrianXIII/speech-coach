import { getDb, hasDatabase } from "@/lib/db";

/**
 * The paywall gate: every account gets a fixed free-trial window
 * (users.trial_ends_at, set at signup — see lib/db.ts), then the entire
 * app requires an active subscription. Deliberately a single blanket rule,
 * not per-feature/per-case gating — see the "(superseded)" note in the
 * project's plan history for why a per-case-flag + daily-usage-cap design
 * was considered and dropped in favor of this simpler one.
 *
 * Entitlement is verified server-side only, from the `subscriptions` table
 * that app/api/webhooks/revenuecat/route.ts writes — never trust a client
 * claim of "I'm subscribed."
 */
export async function hasAccess(user: { id: number; trialEndsAt: string }): Promise<boolean> {
  if (new Date(user.trialEndsAt).getTime() > Date.now()) return true;
  if (!hasDatabase()) return false;

  try {
    const db = await getDb();
    if (!db) return false;
    const rows = await db<{ status: string; current_period_end: Date | null }[]>`
      SELECT status, current_period_end FROM subscriptions WHERE user_id = ${user.id}
    `;
    const sub = rows[0];
    if (!sub) return false;
    return sub.status === "active" && !!sub.current_period_end && sub.current_period_end.getTime() > Date.now();
  } catch (err) {
    // Let Next.js's own internal control-flow signals propagate (see the
    // matching guard in lib/requireUser.ts's requireUser() for why) —
    // degrade to "no access" only for an actual DB/query error, same
    // posture as every other lib/*.ts DB function in this app (see
    // lib/pronunciationReview.ts).
    if (err && typeof err === "object" && "digest" in err) throw err;
    console.error("hasAccess failed:", err instanceof Error ? err.message : err);
    return false;
  }
}
