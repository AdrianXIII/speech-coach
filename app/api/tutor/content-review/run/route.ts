import { NextRequest, NextResponse } from "next/server";
import { getDb, hasDatabase } from "@/lib/db";
import { getReviewableTutorContent } from "@/lib/tutorContentReview";
import { reviewWithConfiguredAgents } from "@/lib/contentReviewAgents";
import { configuredReviewAgentCount } from "@/lib/contentReviewAgents";

export async function POST(req: NextRequest) {
  if (!hasDatabase()) return NextResponse.json({ error: "DATABASE_URL is not configured." }, { status: 503 });
  const body = await req.json().catch(() => null);
  const content = body?.contentKey ? getReviewableTutorContent(body.contentKey) : undefined;
  if (!content) return NextResponse.json({ error: "Unknown contentKey." }, { status: 404 });

  const sql = await getDb();
  const configuredLimit = Number(process.env.REVIEW_DAILY_CATEGORY_LIMIT ?? "0");
  if (configuredLimit > 0) {
    const today = await sql!`
      select count(*)::int as count from tutor_content_reviews
      where created_at >= current_date and created_at < current_date + interval '1 day'
    `;
    if (Number(today[0].count) >= configuredLimit) {
      return NextResponse.json({ error: `Daily review limit reached (${configuredLimit} categories). Run this again tomorrow.` }, { status: 429 });
    }
  }
  const previous = await sql!`
    select id, content_key, version, status from tutor_content_reviews
    where content_key = ${content.contentKey}
    order by version desc limit 1
  `;
  if (previous.length && ["ai_consensus", "ai_reviewed", "approved"].includes(previous[0].status)) {
    return NextResponse.json({ skipped: true, reason: "Already reviewed", review: previous[0] });
  }

  const assessments = await reviewWithConfiguredAgents(content);
  const existing = await sql!`select coalesce(max(version), 0) as version from tutor_content_reviews where content_key = ${content.contentKey}`;
  const version = Number(existing[0].version) + 1;
  const expectedAgents = configuredReviewAgentCount();
  const complete = expectedAgents > 0 && assessments.length === expectedAgents;
  const review = await sql!`
    insert into tutor_content_reviews (content_key, version, content, status, reviewer_summary, improvement_suggestions)
    values (${content.contentKey}, ${version}, ${JSON.stringify(content)}, ${!complete ? "needs_retry" : assessments.some((item) => item.verdict !== "agree") ? "needs_expert" : "ai_consensus"}, ${assessments.map((item) => item.summary).join("\n\n")}, ${JSON.stringify(assessments.flatMap((item) => [...item.suggestions, ...item.enrichment]) )})
    returning id, content_key, version, status, created_at
  `;
  for (const assessment of assessments) {
    await sql!`
      insert into tutor_content_reviewers (review_id, agent_name, model, scores, verdict, contradictions, missing_topics, sources, suggestions, raw_output)
      values (${review[0].id}, ${assessment.agentName}, ${assessment.model}, ${JSON.stringify(assessment.scores)}, ${assessment.verdict}, ${JSON.stringify(assessment.contradictions)}, ${JSON.stringify(assessment.missingTopics)}, ${JSON.stringify(assessment.sources)}, ${JSON.stringify([...assessment.suggestions, ...assessment.enrichment])}, ${JSON.stringify(assessment)})
    `;
  }
  return NextResponse.json({ review: review[0], agents: assessments.map(({ agentName, model, verdict }) => ({ agentName, model, verdict })) }, { status: 201 });
}