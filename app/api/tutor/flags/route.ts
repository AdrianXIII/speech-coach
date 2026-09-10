import { NextResponse } from "next/server";
import { getDb, hasDatabase } from "@/lib/db";

/**
 * GET /api/tutor/flags
 * Lists AI Tutor content flags, newest first — the review view for
 * app/api/tutor/flag/route.ts's reports. Returns an empty list (not an
 * error) when no database is connected yet, consistent with the rest of
 * the app's "gracefully do nothing until configured" convention.
 */
export async function GET() {
  if (!hasDatabase()) {
    return NextResponse.json({ flags: [], databaseConfigured: false });
  }

  const sql = await getDb();
  const rows = await sql!`
    SELECT id, profession, category, concept_id, concept_title, reason, note, created_at
    FROM tutor_flags
    ORDER BY created_at DESC
    LIMIT 200
  `;

  return NextResponse.json({
    flags: rows.map((r) => ({
      id: r.id,
      profession: r.profession,
      category: r.category,
      conceptId: r.concept_id,
      conceptTitle: r.concept_title,
      reason: r.reason,
      note: r.note,
      createdAt: r.created_at,
    })),
    databaseConfigured: true,
  });
}
