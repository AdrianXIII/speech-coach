import { NextResponse } from "next/server";
import { requireApiUser } from "@/lib/requireUser";
import { getDb, hasDatabase } from "@/lib/db";

// Temporary, one-off: there's no in-app path for the app owner to subscribe
// to themselves (RevenueCat requires a real App Store purchase), so this
// grants permanent premium directly to one hardcoded account the same way
// app/api/webhooks/revenuecat/route.ts would for a real subscriber. Remove
// this route once used — it's not meant to stay in the codebase.
const OWNER_EMAIL = "adrian.kurti@gmail.com";

export async function POST() {
  const gate = await requireApiUser();
  if (gate instanceof NextResponse) return gate;
  if (gate.email !== OWNER_EMAIL) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }
  if (!hasDatabase()) {
    return NextResponse.json({ error: "No database connected." }, { status: 503 });
  }
  const db = await getDb();
  if (!db) {
    return NextResponse.json({ error: "No database connected." }, { status: 503 });
  }

  const farFuture = new Date();
  farFuture.setFullYear(farFuture.getFullYear() + 100);

  await db`
    INSERT INTO subscriptions (user_id, rc_app_user_id, product_id, status, current_period_end, updated_at)
    VALUES (${gate.id}, ${String(gate.id)}, 'owner_grant', 'active', ${farFuture}, now())
    ON CONFLICT (user_id) DO UPDATE SET
      status = 'active',
      current_period_end = ${farFuture},
      product_id = 'owner_grant',
      updated_at = now()
  `;

  return NextResponse.json({ ok: true });
}
