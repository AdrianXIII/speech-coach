import { NextRequest, NextResponse } from "next/server";
import { getDb, hasDatabase } from "@/lib/db";

export async function POST(req: NextRequest) {
  if (!hasDatabase()) return NextResponse.json({ error: "DATABASE_URL is not configured." }, { status: 503 });
  const body = await req.json().catch(() => null);
  if (!body?.reviewId || !body?.editorName || !body?.editedContent) {
    return NextResponse.json({ error: "reviewId, editorName, and editedContent are required." }, { status: 400 });
  }
  const sql = await getDb();
  const review = await sql!`select id from tutor_content_reviews where id = ${body.reviewId}`;
  if (!review.length) return NextResponse.json({ error: "Unknown reviewId." }, { status: 404 });
  const edit = await sql!`
    insert into tutor_content_edits (review_id, editor_name, edited_content, note)
    values (${body.reviewId}, ${body.editorName}, ${JSON.stringify(body.editedContent)}, ${body.note ?? null})
    returning id, review_id, editor_name, note, created_at
  `;
  await sql!`
    update tutor_content_reviews
    set status = ${body.status ?? "needs_expert"}, updated_at = now()
    where id = ${body.reviewId}
  `;
  return NextResponse.json({ edit: edit[0] }, { status: 201 });
}