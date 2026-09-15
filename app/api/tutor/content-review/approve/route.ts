import { NextRequest, NextResponse } from "next/server";
import { getDb, hasDatabase } from "@/lib/db";

export async function POST(req: NextRequest) {
  if (!hasDatabase()) return NextResponse.json({ error: "DATABASE_URL is not configured." }, { status: 503 });
  const body = await req.json().catch(() => null);
  if (!body?.reviewId || !body?.approvedBy) return NextResponse.json({ error: "reviewId and approvedBy are required." }, { status: 400 });
  const sql = await getDb();
  const review = await sql!`select id from tutor_content_reviews where id = ${body.reviewId}`;
  if (!review.length) return NextResponse.json({ error: "Unknown reviewId." }, { status: 404 });
  const edit = await sql!`
    select edited_content from tutor_content_edits
    where review_id = ${body.reviewId}
    order by created_at desc limit 1
  `;
  if (!edit.length) return NextResponse.json({ error: "An expert-edited copy is required before approval." }, { status: 409 });
  await sql!`
    update tutor_content_reviews
    set status = 'approved', reviewer_summary = concat(coalesce(reviewer_summary, ''), ${`\nApproved by ${body.approvedBy}.`}), updated_at = now()
    where id = ${body.reviewId}
  `;
  return NextResponse.json({ approved: true, reviewId: body.reviewId, content: edit[0].edited_content });
}