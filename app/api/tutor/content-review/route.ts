import { NextRequest, NextResponse } from "next/server";
import { getDb, hasDatabase } from "@/lib/db";
import { resolveReviewableContent, listReviewableTutorContent } from "@/lib/tutorContentReview";

export async function GET(req: NextRequest) {
  const key = new URL(req.url).searchParams.get("contentKey");
  const content = key ? await resolveReviewableContent(key) : listReviewableTutorContent();
  if (!hasDatabase()) return NextResponse.json({ content, reviews: [], databaseConfigured: false });
  const sql = await getDb();
  const reviews = key
    ? await sql!`
        select r.id, r.content_key, r.version, r.status, r.reviewer_summary,
               r.improvement_suggestions, r.created_at, r.updated_at,
               coalesce(json_agg(json_build_object(
                 'id', a.id, 'agentName', a.agent_name, 'model', a.model,
                 'scores', a.scores, 'verdict', a.verdict,
                 'contradictions', a.contradictions, 'missingTopics', a.missing_topics,
                 'sources', a.sources, 'suggestions', a.suggestions,
                 'createdAt', a.created_at
               ) order by a.created_at) filter (where a.id is not null), '[]') as agents
        from tutor_content_reviews r
        left join tutor_content_reviewers a on a.review_id = r.id
        where r.content_key = ${key}
        group by r.id
        order by r.version desc
      `
    : [];
  return NextResponse.json({ content, reviews, databaseConfigured: true });
}

export async function POST(req: NextRequest) {
  if (!hasDatabase()) return NextResponse.json({ error: "DATABASE_URL is not configured." }, { status: 503 });
  const body = await req.json().catch(() => null);
  if (!body?.contentKey || !body?.agentName || !body?.scores || !body?.verdict) {
    return NextResponse.json({ error: "contentKey, agentName, scores, and verdict are required." }, { status: 400 });
  }
  const content = await resolveReviewableContent(body.contentKey);
  if (!content) return NextResponse.json({ error: "Unknown contentKey." }, { status: 404 });

  const sql = await getDb();
  let review;
  if (body.reviewId) {
    review = await sql!`select id, content_key, version, status, created_at from tutor_content_reviews where id = ${body.reviewId}`;
    if (!review.length) return NextResponse.json({ error: "Unknown reviewId." }, { status: 404 });
  } else {
    const existing = await sql!`select coalesce(max(version), 0) as version from tutor_content_reviews where content_key = ${body.contentKey}`;
    const version = Number(existing[0].version) + 1;
    review = await sql!`
      insert into tutor_content_reviews (content_key, version, content, status, reviewer_summary, improvement_suggestions)
      values (${body.contentKey}, ${version}, ${JSON.stringify(content)}, ${body.status ?? "ai_reviewed"}, ${body.summary ?? null}, ${JSON.stringify(body.suggestions ?? [])})
      returning id, content_key, version, status, created_at
    `;
  }
  await sql!`
    insert into tutor_content_reviewers (review_id, agent_name, model, scores, verdict, contradictions, missing_topics, sources, suggestions, raw_output)
    values (${review[0].id}, ${body.agentName}, ${body.model ?? null}, ${JSON.stringify(body.scores)}, ${body.verdict}, ${JSON.stringify(body.contradictions ?? [])}, ${JSON.stringify(body.missingTopics ?? [])}, ${JSON.stringify(body.sources ?? [])}, ${JSON.stringify(body.suggestions ?? [])}, ${body.rawOutput ? JSON.stringify(body.rawOutput) : null})
  `;
  const verdicts = await sql!`select verdict from tutor_content_reviewers where review_id = ${review[0].id}`;
  const hasContradiction = verdicts.some((row) => row.verdict === "contradiction" || row.verdict === "mixed");
  const status = hasContradiction ? "needs_expert" : verdicts.length > 1 ? "ai_consensus" : body.status ?? "ai_reviewed";
  await sql!`update tutor_content_reviews set status = ${status}, updated_at = now() where id = ${review[0].id}`;
  return NextResponse.json({ review: review[0] }, { status: 201 });
}