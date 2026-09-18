import { NextResponse } from "next/server";
import { getDb, hasDatabase } from "@/lib/db";

/**
 * GET /api/tutor/content-review/overview
 * One row per content_key's LATEST reviewed version, sorted so
 * needs_expert content comes first — the prioritized worklist for making
 * teaching content more substantial: what's actually weak, and each
 * agent's concrete suggestions/missingTopics for it, instead of clicking
 * through every category one at a time on /tutor-review.
 */
export async function GET() {
  if (!hasDatabase()) return NextResponse.json({ rows: [], databaseConfigured: false });
  const sql = await getDb();
  const rows = await sql!`
    with latest as (
      select distinct on (content_key)
        id, content_key, version, status, reviewer_summary, improvement_suggestions, debate_info, created_at
      from tutor_content_reviews
      order by content_key, version desc
    )
    select
      l.content_key, l.version, l.status, l.reviewer_summary, l.improvement_suggestions,
      l.debate_info, l.created_at,
      coalesce(json_agg(json_build_object(
        'agentName', a.agent_name,
        'scores', a.scores,
        'verdict', a.verdict,
        'suggestions', a.suggestions,
        'missingTopics', a.missing_topics
      ) order by a.created_at) filter (where a.id is not null), '[]') as agents
    from latest l
    left join tutor_content_reviewers a on a.review_id = l.id
    group by l.id, l.content_key, l.version, l.status, l.reviewer_summary, l.improvement_suggestions, l.debate_info, l.created_at
    order by (l.status = 'needs_expert') desc, (l.status = 'needs_retry') desc, l.content_key
  `;
  return NextResponse.json({ rows, databaseConfigured: true });
}
