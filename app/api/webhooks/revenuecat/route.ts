import { timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { getDb, hasDatabase } from "@/lib/db";

/** Constant-time string comparison — avoids leaking the secret's length/prefix via response-time differences. */
function secretsMatch(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}

/**
 * POST /api/webhooks/revenuecat
 * The only place subscription entitlement is ever written — every gated
 * request (see lib/subscription.ts's isPremium()) reads the `subscriptions`
 * row this writes, never RevenueCat's API directly, and never trusts a
 * client-side purchase claim.
 *
 * RevenueCat calls this with a shared secret in the Authorization header
 * (configured in its dashboard's webhook settings) — verified below against
 * REVENUECAT_WEBHOOK_SECRET before touching anything.
 *
 * app_user_id is set client-side via Purchases.logIn(String(userId)) right
 * after sign-in (see components/RevenueCatInit.tsx), so RevenueCat's id
 * *is* this app's internal numeric user id, no separate mapping table
 * needed.
 */

const ACTIVE_EVENT_TYPES = new Set(["INITIAL_PURCHASE", "RENEWAL", "PRODUCT_CHANGE", "UNCANCELLATION"]);
const INACTIVE_EVENT_TYPES = new Set(["CANCELLATION", "EXPIRATION", "BILLING_ISSUE"]);

interface RevenueCatEvent {
  type: string;
  app_user_id: string;
  product_id?: string;
  expiration_at_ms?: number;
}

export async function POST(req: NextRequest) {
  const expected = process.env.REVENUECAT_WEBHOOK_SECRET;
  if (!expected) {
    // Not configured yet (portal step not done) — accept but no-op, same
    // "gracefully do nothing until configured" posture as the rest of this
    // app, rather than 500ing every webhook delivery RevenueCat retries.
    return NextResponse.json({ ok: true, configured: false });
  }
  if (!secretsMatch(req.headers.get("Authorization") ?? "", `Bearer ${expected}`)) {
    return NextResponse.json({ error: "Invalid webhook secret." }, { status: 401 });
  }
  if (!hasDatabase()) {
    return NextResponse.json({ error: "No database connected." }, { status: 503 });
  }

  const body = await req.json().catch(() => null);
  const event: RevenueCatEvent | undefined = body?.event;
  const userId = Number(event?.app_user_id);
  if (!event || !Number.isFinite(userId)) {
    return NextResponse.json({ error: "Missing or invalid event.app_user_id." }, { status: 400 });
  }

  const status = ACTIVE_EVENT_TYPES.has(event.type) ? "active" : INACTIVE_EVENT_TYPES.has(event.type) ? "expired" : null;
  if (!status) {
    // Other event types (TRANSFER, TEST, etc.) don't change entitlement — ack and ignore.
    return NextResponse.json({ ok: true, ignored: event.type });
  }

  try {
    const sql = await getDb();
    await sql!`
      INSERT INTO subscriptions (user_id, rc_app_user_id, product_id, status, current_period_end, updated_at)
      VALUES (${userId}, ${event.app_user_id}, ${event.product_id ?? null}, ${status},
              ${event.expiration_at_ms ? new Date(event.expiration_at_ms) : null}, now())
      ON CONFLICT (user_id) DO UPDATE SET
        rc_app_user_id = EXCLUDED.rc_app_user_id,
        product_id = EXCLUDED.product_id,
        status = EXCLUDED.status,
        current_period_end = EXCLUDED.current_period_end,
        updated_at = now()
    `;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("RevenueCat webhook write failed:", err instanceof Error ? err.message : err);
    // 500 so RevenueCat retries delivery instead of silently losing the event.
    return NextResponse.json({ error: "Write failed." }, { status: 500 });
  }
}
