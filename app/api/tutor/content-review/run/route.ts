import { NextRequest, NextResponse } from "next/server";
import { getDb, hasDatabase } from "@/lib/db";
import { resolveReviewableContent } from "@/lib/tutorContentReview";
import {
  reviewWithConfiguredAgents,
  configuredReviewAgentCount,
  hasFactualDisagreement,
  debateFactualDisagreement,
  tieBreakWithSearch,
  type AgentAssessment,
} from "@/lib/contentReviewAgents";
import { saveContentSources } from "@/lib/tutorContentSources";

export async function POST(req: NextRequest) {
  if (!hasDatabase()) return NextResponse.json({ error: "DATABASE_URL is not configured." }, { status: 503 });
  const body = await req.json().catch(() => null);
  const content = body?.contentKey ? await resolveReviewableContent(body.contentKey) : undefined;
  if (!content) return NextResponse.json({ error: "Unknown contentKey." }, { status: 404 });

  const sql = await getDb();
  // sql.json()'s JSONValue constraint doesn't structurally match our named
  // interfaces (no index signature) even though they're plain serializable
  // data at runtime — this local helper is the one place that bypasses it.
  const j = (value: unknown) => sql!.json(value as never);
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

  const initialResult = await reviewWithConfiguredAgents(content);
  let assessments = initialResult.assessments;
  const expectedAgents = configuredReviewAgentCount();
  const complete = expectedAgents > 0 && assessments.length === expectedAgents;

  // Only a genuine factual dispute (not ordinary spread on subjective
  // criteria) triggers the one debate round; incomplete assessment sets
  // (an agent failed outright) skip straight to needs_retry below instead.
  let debateInfo: { ran: boolean; before: AgentAssessment[]; after?: AgentAssessment[]; tieBreak?: { finding: string; sourceUrl: string | null } } | null = null;
  if (complete && hasFactualDisagreement(assessments)) {
    const before = assessments;
    const debated = await debateFactualDisagreement(content, assessments);
    debateInfo = { ran: true, before, after: debated };
    assessments = debated;

    if (hasFactualDisagreement(assessments)) {
      const tieBreak = await tieBreakWithSearch(content, assessments);
      if (tieBreak) debateInfo.tieBreak = tieBreak;
    }
  }

  const status = !complete
    ? "needs_retry"
    : hasFactualDisagreement(assessments)
      ? "needs_expert"
      : "ai_consensus";

  const existing = await sql!`select coalesce(max(version), 0) as version from tutor_content_reviews where content_key = ${content.contentKey}`;
  const version = Number(existing[0].version) + 1;
  // Note: use sql.json() for jsonb columns — it serializes arrays/objects
  // correctly and satisfies postgres.js's parameter typing. Calling
  // JSON.stringify() first (the previous bug here) double-encodes them
  // instead (the column ends up holding a jsonb *string* that contains JSON
  // text, not a jsonb array/object), which silently breaks any reader that
  // expects to iterate the value as an array.
  const review = await sql!`
    insert into tutor_content_reviews (content_key, version, content, status, reviewer_summary, improvement_suggestions, debate_info)
    values (
      ${content.contentKey}, ${version}, ${j(content)}, ${status},
      ${assessments.map((item) => item.summary).join("\n\n")},
      ${j(assessments.flatMap((item) => [...item.suggestions, ...item.enrichment]))},
      ${debateInfo ? j(debateInfo) : null}
    )
    returning id, content_key, version, status, created_at
  `;
  for (const assessment of assessments) {
    await sql!`
      insert into tutor_content_reviewers (review_id, agent_name, model, scores, verdict, contradictions, missing_topics, sources, suggestions, raw_output)
      values (${review[0].id}, ${assessment.agentName}, ${assessment.model}, ${j(assessment.scores)}, ${assessment.verdict}, ${j(assessment.contradictions)}, ${j(assessment.missingTopics)}, ${j(assessment.sources)}, ${j([...assessment.suggestions, ...assessment.enrichment])}, ${j(assessment)})
    `;
  }

  // Only persist sources for a content_key that isn't stuck needing a
  // human — a needs_expert result means the underlying facts are still in
  // question, so its cited sources aren't trustworthy enough to show a
  // student yet.
  if (status !== "needs_retry" && status !== "needs_expert") {
    const sources = assessments
      .flatMap((a) => a.sources)
      .map((s) => ({
        title: s.title ?? "",
        author: s.author ?? null,
        year: s.year ?? null,
        url: s.url ?? null,
      }))
      .filter((s) => s.title);
    await saveContentSources(content.contentKey, sources);
  }

  return NextResponse.json(
    {
      review: review[0],
      agents: assessments.map(({ agentName, model, verdict, scores }) => ({ agentName, model, verdict, scores })),
      debated: Boolean(debateInfo?.ran),
      // An agent failure is otherwise silently dropped (Promise.allSettled),
      // so the only symptom would be a status stuck on needs_retry with no
      // clue why — this field is what made five separate real failure
      // modes (retired model, malformed JSON, etc.) diagnosable instead of
      // guesswork, so it stays rather than reverting to a black box.
      ...(initialResult.failures.length ? { agentFailures: initialResult.failures } : {}),
    },
    { status: 201 },
  );
}
