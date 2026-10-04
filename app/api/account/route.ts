import { NextResponse } from "next/server";
import { getDb, hasDatabase } from "@/lib/db";
import { requireApiUser } from "@/lib/requireUser";

/**
 * DELETE /api/account — permanently deletes the signed-in account.
 * Required for Apple App Store Review Guideline 5.1.1(v): an app that lets
 * someone create an account must also let them delete it from inside the
 * app, not just by emailing support. A single DELETE on `users` is enough —
 * every other per-account table (accounts, sessions, daily_usage,
 * subscriptions, pronunciation_review_words, exec_comm_attempts) already
 * carries `ON DELETE CASCADE` back to users.id (see lib/db.ts), and
 * tutor_flags intentionally uses ON DELETE SET NULL instead (a deleted
 * account's past content flags stay around for review).
 */
export async function DELETE() {
  if (!hasDatabase()) {
    return NextResponse.json({ error: "No database connected." }, { status: 503 });
  }
  const gate = await requireApiUser();
  if (gate instanceof NextResponse) return gate;

  try {
    const db = await getDb();
    await db!`DELETE FROM users WHERE id = ${gate.id}`;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Account deletion failed:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Could not delete account." }, { status: 500 });
  }
}
