import type { ReviewableTutorContent } from "@/lib/tutorContentReview";
import { generateContentWithSources } from "@/lib/gemini";

export interface AgentAssessment {
  agentName: string;
  model: string;
  verdict: "agree" | "mixed" | "contradiction";
  /** Keys: factualAccuracy, relevance, depth, clarity, usefulness, balance, professionalCredibility — each 0-2. */
  scores: Record<string, number>;
  contradictions: string[];
  missingTopics: string[];
  sources: Array<Record<string, string>>;
  suggestions: string[];
  enrichment: string[];
  summary: string;
}

export function configuredReviewAgentCount(): number {
  return Number(Boolean(process.env.OPENAI_API_KEY)) + Number(Boolean(process.env.ANTHROPIC_API_KEY)) + Number(Boolean(process.env.GEMINI_API_KEY));
}

const RESPONSE_SHAPE = `{"agentName":"...","model":"...","verdict":"agree|mixed|contradiction","scores":{"factualAccuracy":0,"relevance":0,"depth":0,"clarity":0,"usefulness":0,"balance":0,"professionalCredibility":0},"contradictions":[],"missingTopics":[],"sources":[{"title":"...","author":"...","year":"...","url":"...","kind":"book|journal|official|other","note":"..."}],"suggestions":[],"enrichment":[],"summary":"..."}`;

const REVIEW_PROMPT = (content: ReviewableTutorContent) => `You are reviewing educational content for university students and working professionals.
Review only the supplied content. Do not invent certainty. For every proposed fact or enrichment,
provide a source or mark it "EXPERT_REVIEW_REQUIRED". Prefer peer-reviewed journals, academic books,
and official sources. Law and politics must be judged for the supplied jurisdiction.

The content should be substantial enough to teach a capable beginner and useful to a professional,
but concise enough for a voice tutor. Return at most 3 items in each array, one short sentence per item.
Identify repetition, missing essentials, unsupported claims, excessive length, and thin material.
Compare concepts with the case studies and fundamentals.

In addition to the other six scores, score "professionalCredibility" (0-2): would a working
professional or professor in this exact field, reading this content, recognize it as the essential
core someone in this role should know — not superficial, and not padded with more than that core
requires? 0 = clearly too thin or too bloated to pass that bar, 1 = roughly right but noticeably off
in one direction, 2 = a professional would recognize this as exactly the right scope.
${content.language !== "en" ? `
This content's "teaching" and "cases" fields are in ${content.language} (a live translation of the
English original, given below as "englishReference"). In addition to the checks above, verify the
translation: it must be accurate (no lost, added, or distorted meaning), and read naturally and
idiomatically for a native speaker rather than as a literal word-for-word rendering. Report any
mistranslation as a "contradiction", quoting the English phrase and the mistranslated phrase together.
` : ""}Return JSON only:
${RESPONSE_SHAPE}

CONTENT TO REVIEW:
${JSON.stringify(content)}`;

/**
 * Follow-up prompt for the one debate round that fires when reviewers
 * disagreed specifically on factual accuracy (see hasFactualDisagreement).
 * Each agent sees the others' factual assessments and is asked to confirm
 * or revise — not to defer to a majority, since majority isn't truth; if
 * they still disagree they're asked to say specifically why.
 */
const DEBATE_PROMPT = (content: ReviewableTutorContent, peers: AgentAssessment[]) => `You previously reviewed the educational content below (or content like it) for factual accuracy.
Independent reviewers disagreed specifically on whether it's factually correct — not on style, depth,
or tone. Here is what the other reviewers found:

${peers
  .map((a) => `- ${a.agentName} (factualAccuracy ${a.scores.factualAccuracy ?? "?"}/2): ${
    a.contradictions.length ? a.contradictions.join("; ") : a.summary || "no specific concern noted"
  }`)
  .join("\n")}

Re-examine the content in light of this. If the other reviewers' point is correct, revise your
factualAccuracy score and say so in your summary. If you still believe your original assessment was
right, say specifically which claim you believe is correct or incorrect and why — ideally naming a
source — rather than just restating disagreement.

Return JSON only, same shape as before:
${RESPONSE_SHAPE}

CONTENT:
${JSON.stringify(content)}`;

function parseAssessment(raw: string, agentName: string, model: string): AgentAssessment {
  const cleaned = raw.trim().replace(/^```(?:json)?\s*|\s*```$/g, "");
  let parsed: Partial<AgentAssessment>;
  try {
    parsed = JSON.parse(cleaned) as Partial<AgentAssessment>;
  } catch (err) {
    // Surface which agent/response actually failed to parse (e.g. output
    // truncated at the max_tokens cap) instead of a bare "Unexpected end of
    // JSON input" that gives no clue which of the parallel calls broke.
    throw new Error(`${agentName} (${model}) returned unparseable JSON (${cleaned.length} chars): ${(err as Error).message}`);
  }
  const contradictions = parsed.contradictions ?? [];
  // EXPERT_REVIEW_REQUIRED is a real signal, not decoration: the prompt asks
  // agents to write it wherever they have a claim with no source behind it.
  // That's exactly what a contradiction means for disagreement-detection
  // purposes, so route it the same way instead of letting it pass through
  // silently (previously nothing read this string at all).
  const hasUnsourcedClaim = cleaned.includes("EXPERT_REVIEW_REQUIRED");
  const alreadyNoted = contradictions.some((c) => c.includes("EXPERT_REVIEW_REQUIRED"));
  return {
    agentName,
    model,
    verdict: parsed.verdict === "contradiction" || parsed.verdict === "mixed" ? parsed.verdict : "agree",
    scores: parsed.scores ?? {},
    contradictions:
      hasUnsourcedClaim && !alreadyNoted
        ? [...contradictions, "Contains a claim marked EXPERT_REVIEW_REQUIRED (no source given)."]
        : contradictions,
    missingTopics: parsed.missingTopics ?? [],
    sources: parsed.sources ?? [],
    suggestions: parsed.suggestions ?? [],
    enrichment: parsed.enrichment ?? [],
    summary: parsed.summary ?? "",
  };
}

async function reviewWithOpenAI(prompt: string): Promise<AgentAssessment> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: process.env.OPENAI_REVIEW_MODEL ?? "gpt-4o-mini",
      temperature: 0.1,
      // Denser content (more citations, more specific claims to weigh in on)
      // produces a longer review response — 1800 was tight enough to
      // truncate mid-JSON for longer entries, silently failing that agent.
      max_tokens: 4096,
      response_format: { type: "json_object" },
      messages: [{ role: "system", content: "You are a rigorous academic content reviewer." }, { role: "user", content: prompt }],
    }),
  });
  if (!response.ok) throw new Error(`OpenAI review failed (${response.status}): ${await response.text()}`);
  const data = await response.json();
  return parseAssessment(data.choices?.[0]?.message?.content ?? "{}", "OpenAI", process.env.OPENAI_REVIEW_MODEL ?? "gpt-4o-mini");
}

async function reviewWithClaude(prompt: string): Promise<AgentAssessment> {
  // claude-3-5-haiku-latest was retired (Anthropic now 404s on it); Haiku
  // 4.5 is the current directly-comparable cost/speed tier for this job.
  const model = process.env.ANTHROPIC_REVIEW_MODEL ?? "claude-haiku-4-5-20251001";
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": process.env.ANTHROPIC_API_KEY ?? "",
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    // Same reasoning as OpenAI above: give enough headroom that a longer,
    // more heavily cited review target can't truncate the JSON response.
    body: JSON.stringify({ model, max_tokens: 4096, temperature: 0.1, system: "You are a rigorous academic content reviewer. Return JSON only.", messages: [{ role: "user", content: prompt }] }),
  });
  if (!response.ok) throw new Error(`Claude review failed (${response.status}): ${await response.text()}`);
  const data = await response.json();
  return parseAssessment(data.content?.[0]?.text ?? "{}", "Claude", model);
}

async function reviewWithGemini(prompt: string): Promise<AgentAssessment> {
  const model = process.env.GEMINI_REVIEW_MODEL ?? "gemini-2.5-flash";
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.1,
        responseMimeType: "application/json",
      },
    }),
  });
  if (!response.ok) throw new Error(`Gemini review failed (${response.status}).`);
  const data = await response.json();
  const rawText = data.candidates?.[0]?.content?.parts
    ?.map((part: { text?: string }) => part.text ?? "")
    .join("") ?? "{}";
  return parseAssessment(rawText, "Gemini", model);
}

function configuredAgentTasks(prompt: string): Promise<AgentAssessment>[] {
  const tasks: Promise<AgentAssessment>[] = [];
  if (process.env.OPENAI_API_KEY) tasks.push(reviewWithOpenAI(prompt));
  if (process.env.ANTHROPIC_API_KEY) tasks.push(reviewWithClaude(prompt));
  if (process.env.GEMINI_API_KEY) tasks.push(reviewWithGemini(prompt));
  return tasks;
}

export interface ReviewAgentResult {
  assessments: AgentAssessment[];
  /** Rejected-agent error messages, surfaced to the caller for diagnostics — an agent failure is otherwise silently dropped by design (see Promise.allSettled below). */
  failures: string[];
}

export async function reviewWithConfiguredAgents(content: ReviewableTutorContent): Promise<ReviewAgentResult> {
  const tasks = configuredAgentTasks(REVIEW_PROMPT(content));
  if (!tasks.length) throw new Error("No review agent is configured. Set GEMINI_API_KEY, OPENAI_API_KEY and/or ANTHROPIC_API_KEY.");
  const results = await Promise.allSettled(tasks);
  const assessments = results.filter((result): result is PromiseFulfilledResult<AgentAssessment> => result.status === "fulfilled").map((result) => result.value);
  const failures = results.filter((result): result is PromiseRejectedResult => result.status === "rejected").map((result) => (result.reason instanceof Error ? result.reason.message : String(result.reason)));
  if (!assessments.length) throw new Error(`All configured review agents failed: ${failures.join(" | ")}`);
  return { assessments, failures };
}

/**
 * True only for a genuine factual dispute — a wide spread specifically on
 * factualAccuracy, or any agent raising a contradiction — not for ordinary
 * spread on subjective criteria (depth/clarity/balance/usefulness/
 * professionalCredibility), which is left as an average signal on its own.
 */
export function hasFactualDisagreement(assessments: AgentAssessment[]): boolean {
  const factualScores = assessments
    .map((a) => a.scores.factualAccuracy)
    .filter((s): s is number => typeof s === "number");
  const spread = factualScores.length ? Math.max(...factualScores) - Math.min(...factualScores) : 0;
  const hasContradiction = assessments.some((a) => a.contradictions.length > 0);
  return spread >= 2 || hasContradiction;
}

/**
 * One follow-up round, only called when hasFactualDisagreement is true.
 * Re-runs every currently-configured agent (not just the ones that
 * disagreed) against DEBATE_PROMPT, which shows each agent the others'
 * factual findings. Falls back to the original assessments if the debate
 * round itself fails outright, so a transient error never makes things
 * worse than not debating at all.
 */
export async function debateFactualDisagreement(
  content: ReviewableTutorContent,
  assessments: AgentAssessment[],
): Promise<AgentAssessment[]> {
  const tasks = configuredAgentTasks(DEBATE_PROMPT(content, assessments));
  if (!tasks.length) return assessments;
  const results = await Promise.allSettled(tasks);
  const successful = results.filter((result): result is PromiseFulfilledResult<AgentAssessment> => result.status === "fulfilled").map((result) => result.value);
  return successful.length ? successful : assessments;
}

export interface TieBreakResult {
  finding: string;
  sourceUrl: string | null;
}

/**
 * Last resort after a debate round that didn't converge: asks Gemini, with
 * real Google Search grounding (see lib/gemini.ts's generateContentWithSources —
 * same mechanism Live News uses to require a verifiable source), to check
 * the specific disputed claim. This is one more data point for the human
 * reviewer, not an automatic override of the needs_expert status.
 */
export async function tieBreakWithSearch(
  content: ReviewableTutorContent,
  assessments: AgentAssessment[],
): Promise<TieBreakResult | null> {
  const disputedClaims = assessments.flatMap((a) => a.contradictions);
  if (!disputedClaims.length) return null;
  try {
    const { text, sourceUrl } = await generateContentWithSources(
      [
        {
          text: `Independent reviewers disagreed about the following claim(s) in educational content about "${content.category}" (${content.profession}): ${disputedClaims.join("; ")}. Search for an authoritative source and state plainly, in 2-3 sentences, which side is correct — or that it's genuinely ambiguous/context-dependent, and why.`,
        },
      ],
      { tools: [{ google_search: {} }] },
    );
    return { finding: text.trim(), sourceUrl };
  } catch {
    return null;
  }
}
