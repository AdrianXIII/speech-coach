import type { ReviewableTutorContent } from "@/lib/tutorContentReview";

export interface AgentAssessment {
  agentName: string;
  model: string;
  verdict: "agree" | "mixed" | "contradiction";
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

const REVIEW_PROMPT = (content: ReviewableTutorContent) => `You are reviewing educational content for university students and working professionals.
Review only the supplied content. Do not invent certainty. For every proposed fact or enrichment,
provide a source or mark it "EXPERT_REVIEW_REQUIRED". Prefer peer-reviewed journals, academic books,
and official sources. Law and politics must be judged for the supplied jurisdiction.

The content should be substantial enough to teach a capable beginner and useful to a professional,
but concise enough for a voice tutor. Return at most 3 items in each array, one short sentence per item.
Identify repetition, missing essentials, unsupported claims, excessive length, and thin material.
Compare concepts with the case studies and fundamentals.
${content.language !== "en" ? `
This content's "teaching" and "cases" fields are in ${content.language} (a live translation of the
English original, given below as "englishReference"). In addition to the checks above, verify the
translation: it must be accurate (no lost, added, or distorted meaning), and read naturally and
idiomatically for a native speaker rather than as a literal word-for-word rendering. Report any
mistranslation as a "contradiction", quoting the English phrase and the mistranslated phrase together.
` : ""}Return JSON only:
{"agentName":"...","model":"...","verdict":"agree|mixed|contradiction","scores":{"factualAccuracy":0,"relevance":0,"depth":0,"clarity":0,"usefulness":0,"balance":0},"contradictions":[],"missingTopics":[],"sources":[{"title":"...","author":"...","year":"...","url":"...","kind":"book|journal|official|other","note":"..."}],"suggestions":[],"enrichment":[],"summary":"..."}

CONTENT TO REVIEW:
${JSON.stringify(content)}`;

function parseAssessment(raw: string, agentName: string, model: string): AgentAssessment {
  const cleaned = raw.trim().replace(/^```(?:json)?\s*|\s*```$/g, "");
  const parsed = JSON.parse(cleaned) as Partial<AgentAssessment>;
  return {
    agentName,
    model,
    verdict: parsed.verdict === "contradiction" || parsed.verdict === "mixed" ? parsed.verdict : "agree",
    scores: parsed.scores ?? {},
    contradictions: parsed.contradictions ?? [],
    missingTopics: parsed.missingTopics ?? [],
    sources: parsed.sources ?? [],
    suggestions: parsed.suggestions ?? [],
    enrichment: parsed.enrichment ?? [],
    summary: parsed.summary ?? "",
  };
}

async function reviewWithOpenAI(content: ReviewableTutorContent): Promise<AgentAssessment> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: process.env.OPENAI_REVIEW_MODEL ?? "gpt-4o-mini",
      temperature: 0.1,
      max_tokens: 1800,
      response_format: { type: "json_object" },
      messages: [{ role: "system", content: "You are a rigorous academic content reviewer." }, { role: "user", content: REVIEW_PROMPT(content) }],
    }),
  });
  if (!response.ok) throw new Error(`OpenAI review failed (${response.status}).`);
  const data = await response.json();
  return parseAssessment(data.choices?.[0]?.message?.content ?? "{}", "OpenAI", process.env.OPENAI_REVIEW_MODEL ?? "gpt-4o-mini");
}

async function reviewWithClaude(content: ReviewableTutorContent): Promise<AgentAssessment> {
  const model = process.env.ANTHROPIC_REVIEW_MODEL ?? "claude-3-5-haiku-latest";
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": process.env.ANTHROPIC_API_KEY ?? "",
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({ model, max_tokens: 1800, temperature: 0.1, system: "You are a rigorous academic content reviewer. Return JSON only.", messages: [{ role: "user", content: REVIEW_PROMPT(content) }] }),
  });
  if (!response.ok) throw new Error(`Claude review failed (${response.status}).`);
  const data = await response.json();
  return parseAssessment(data.content?.[0]?.text ?? "{}", "Claude", model);
}

async function reviewWithGemini(content: ReviewableTutorContent): Promise<AgentAssessment> {
  const model = process.env.GEMINI_REVIEW_MODEL ?? "gemini-2.5-flash";
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: REVIEW_PROMPT(content) }] }],
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

export async function reviewWithConfiguredAgents(content: ReviewableTutorContent): Promise<AgentAssessment[]> {
  const tasks: Promise<AgentAssessment>[] = [];
  if (process.env.OPENAI_API_KEY) tasks.push(reviewWithOpenAI(content));
  if (process.env.ANTHROPIC_API_KEY) tasks.push(reviewWithClaude(content));
  if (process.env.GEMINI_API_KEY) tasks.push(reviewWithGemini(content));
  if (!tasks.length) throw new Error("No review agent is configured. Set GEMINI_API_KEY, OPENAI_API_KEY and/or ANTHROPIC_API_KEY.");
  const results = await Promise.allSettled(tasks);
  const successful = results.filter((result): result is PromiseFulfilledResult<AgentAssessment> => result.status === "fulfilled").map((result) => result.value);
  if (!successful.length) throw new Error("All configured review agents failed.");
  return successful;
}