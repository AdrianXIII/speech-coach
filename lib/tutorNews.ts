import { generateContentWithSources, hasGeminiKey } from "@/lib/gemini";
import { getDb, hasDatabase } from "@/lib/db";
import type { CaseProfession } from "@/lib/caseStudyContent";

export interface TutorNewsItem {
  headline: string;
  summary: string;
  /** How this news connects to a concept in the selected domain. */
  connection: string;
  /** The applied question put to the student — generic, not tied to any one student's profile, since this item is cached and reused across students. */
  appliedQuestion: string;
  /** Real source URL the article was grounded on. Always present — an item without one is never cached or returned. */
  sourceUrl: string;
}

const DOMAIN_LABEL: Record<CaseProfession, string> = {
  business: "business or financial",
  law: "legal or regulatory",
  politics: "political or policy",
};

const ENTITY_LABEL: Record<CaseProfession, string> = {
  business: "a company",
  law: "a client organization",
  politics: "an organization",
};

// No student profile is injected here on purpose: this item is cached and
// served to many students (see readCachedNews/writeCachedNews below), so
// the applied question must stand on its own for anyone in this
// profession/category, not reference one particular student's fictive
// company by name.
const PROMPT = (
  profession: CaseProfession,
  category: string,
  languageName: string,
  countryName?: string,
) => `You are preparing a live, applied tutoring exercise for students practicing "${category}" in
${profession}, studying in ${languageName}.

Search for one real, recent (within the last few days) ${DOMAIN_LABEL[profession]} news story that is
clearly relevant to "${category}" concepts${countryName ? `, prioritizing a story from or directly relevant to ${countryName} if a genuinely relevant one exists` : ""}.

This exercise will be shown to many different students, so the applied question must be generic —
framed around ${ENTITY_LABEL[profession]} in a comparable situation, never a specific named company
or organization the student is meant to already know.

Respond with ONLY a JSON object (no markdown fences, no commentary) matching exactly this shape. Every
string value must be written in ${languageName} — the student is practicing ${languageName}, not just
reading facts, so do not respond in English unless ${languageName} is English:
{
  "headline": "<the real news headline, translated/written in ${languageName} if the source wasn't>",
  "summary": "<2-3 sentence factual summary of the news, in ${languageName}>",
  "connection": "<1-2 sentences connecting this news to a specific ${category} concept, in ${languageName}>",
  "appliedQuestion": "<one applied question in ${languageName}, framed generically around ${ENTITY_LABEL[profession]} in this situation — e.g. 'Given this news, how should ${ENTITY_LABEL[profession]} in this position respond?' — not naming any specific company>"
}`;

async function readCachedNews(
  profession: CaseProfession,
  category: string,
  country: string,
  languageName: string,
): Promise<TutorNewsItem | null> {
  if (!hasDatabase()) return null;
  const sql = await getDb();
  const rows = await sql!`
    select headline, summary, connection, applied_question, source_url
    from tutor_news_cache
    where profession = ${profession} and category = ${category}
      and country = ${country} and language = ${languageName}
    limit 1
  `;
  const row = rows[0];
  if (!row) return null;
  return {
    headline: row.headline,
    summary: row.summary,
    connection: row.connection,
    appliedQuestion: row.applied_question,
    sourceUrl: row.source_url,
  };
}

async function writeCachedNews(
  profession: CaseProfession,
  category: string,
  country: string,
  languageName: string,
  item: TutorNewsItem,
): Promise<void> {
  if (!hasDatabase()) return;
  const sql = await getDb();
  await sql!`
    insert into tutor_news_cache
      (profession, category, country, language, headline, summary, connection, applied_question, source_url)
    values
      (${profession}, ${category}, ${country}, ${languageName}, ${item.headline}, ${item.summary},
       ${item.connection}, ${item.appliedQuestion}, ${item.sourceUrl})
    on conflict (profession, category, country, language) do update set
      headline = excluded.headline,
      summary = excluded.summary,
      connection = excluded.connection,
      applied_question = excluded.applied_question,
      source_url = excluded.source_url,
      created_at = now()
  `;
}

/**
 * Calls Gemini (Google Search grounding) for one fresh news item. Requires a
 * real grounded source URL — see generateContentWithSources's doc comment
 * for why an LLM-typed URL field wouldn't be trustworthy here. Returns null
 * on any failure, including a successful-looking response with no source.
 */
async function generateTutorNews(
  profession: CaseProfession,
  category: string,
  languageName: string,
  countryName?: string,
): Promise<TutorNewsItem | null> {
  if (!hasGeminiKey()) return null;

  try {
    const { text, sourceUrl } = await generateContentWithSources(
      [{ text: PROMPT(profession, category, languageName, countryName) }],
      { tools: [{ google_search: {} }] },
    );
    if (!sourceUrl) return null;

    const cleaned = text.trim().replace(/^```(?:json)?\s*|\s*```$/g, "");
    const parsed = JSON.parse(cleaned);
    if (!parsed.headline || !parsed.appliedQuestion) return null;
    return {
      headline: String(parsed.headline),
      summary: String(parsed.summary ?? ""),
      connection: String(parsed.connection ?? ""),
      appliedQuestion: String(parsed.appliedQuestion),
      sourceUrl,
    };
  } catch {
    return null;
  }
}

/**
 * Returns a news-based case for this profession/category/country/language.
 * Cache-first: a previously verified item is served straight from
 * tutor_news_cache with zero Gemini calls. Only on a cache miss does this
 * call Gemini, and only a result with a real source URL is cached and
 * returned — an unverifiable one returns null so the caller can show the
 * "not available right now" state instead of a fabricated case.
 *
 * The cache is not refreshed here on every read — see refreshTutorNews,
 * run monthly by /api/tutor/news/refresh.
 */
export async function fetchTutorNews(
  profession: CaseProfession,
  category: string,
  languageName: string,
  countryName?: string,
): Promise<TutorNewsItem | null> {
  const country = countryName ?? "";

  const cached = await readCachedNews(profession, category, country, languageName);
  if (cached) return cached;

  const generated = await generateTutorNews(profession, category, languageName, countryName);
  if (generated) await writeCachedNews(profession, category, country, languageName, generated);
  return generated;
}

/**
 * Used by the monthly refresh job only: always generates fresh (bypasses
 * the cache read), and overwrites the cached row only when a valid new
 * result comes back — a failed/unverifiable attempt leaves whatever was
 * cached before untouched. Returns whether the cache was updated.
 */
export async function refreshTutorNews(
  profession: CaseProfession,
  category: string,
  languageName: string,
  countryName?: string,
): Promise<boolean> {
  const generated = await generateTutorNews(profession, category, languageName, countryName);
  if (!generated) return false;
  await writeCachedNews(profession, category, countryName ?? "", languageName, generated);
  return true;
}
