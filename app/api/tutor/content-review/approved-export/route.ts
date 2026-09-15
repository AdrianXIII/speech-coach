import { NextResponse } from "next/server";
import { getDb, hasDatabase } from "@/lib/db";

export async function GET() {
  if (!hasDatabase()) return NextResponse.json({ error: "DATABASE_URL is not configured." }, { status: 503 });
  const sql = await getDb();
  const rows = await sql!`
    select r.id, r.content_key, r.version, r.status, r.reviewer_summary,
           e.edited_content, e.editor_name, e.created_at as edited_at
    from tutor_content_reviews r
    join lateral (
      select edited_content, editor_name, created_at
      from tutor_content_edits where review_id = r.id order by created_at desc limit 1
    ) e on true
    where r.status = 'approved'
    order by r.updated_at desc
  `;
  return new NextResponse(JSON.stringify({ exportedAt: new Date().toISOString(), implementationCandidates: rows }, null, 2), {
    headers: { "Content-Type": "application/json; charset=utf-8", "Content-Disposition": "attachment; filename=ai-tutor-approved-changes.json" },
  });
}