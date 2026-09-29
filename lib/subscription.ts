import { getDb, hasDatabase } from "@/lib/db";

/**
 * Whether this account has unlimited access — an active RevenueCat
 * subscription, nothing else. There is no trial anymore: every account
 * starts on the free tier (once-a-day use per trainer, 3 AI Tutor
 * categories per profession — see lib/usageLimit.ts) forever, which acts
 * as the ongoing "trial" instead of a time-limited one. Entitlement is
 * verified server-side only, from the `subscriptions` table that
 * app/api/webhooks/revenuecat/route.ts writes — never trust a client claim
 * of "I'm subscribed."
 */
export async function isPremium(userId: number): Promise<boolean> {
  if (!hasDatabase()) return false;
  try {
    const db = await getDb();
    if (!db) return false;
    const rows = await db<{ status: string; current_period_end: Date | null }[]>`
      SELECT status, current_period_end FROM subscriptions WHERE user_id = ${userId}
    `;
    const sub = rows[0];
    if (!sub) return false;
    return sub.status === "active" && !!sub.current_period_end && sub.current_period_end.getTime() > Date.now();
  } catch (err) {
    // Let Next.js's own internal control-flow signals propagate (see the
    // matching guard in lib/requireUser.ts's requireUser() for why) —
    // degrade to "not premium" only for an actual DB/query error, same
    // posture as every other lib/*.ts DB function in this app.
    if (err && typeof err === "object" && "digest" in err) throw err;
    console.error("isPremium failed:", err instanceof Error ? err.message : err);
    return false;
  }
}
