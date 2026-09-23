import { generateContentWithSources, hasGeminiKey } from "@/lib/gemini";
import { getDb, hasDatabase } from "@/lib/db";
import { NEWS_TOPICS, type NewsTopic, type ComprehensionPassage } from "@/lib/comprehensionContent";

export { NEWS_TOPICS, type NewsTopic };

/** Slots per (topic, language) — see the refresh route for how they're kept filled without exceeding Hobby's function-duration limit or a free Gemini key's rate limit. */
export const NEWS_POOL_SIZE = 5;

export interface ComprehensionNewsPassage extends ComprehensionPassage {
  sourceUrl: string;
}

const PROMPT = (topic: NewsTopic, languageName: string, avoidTitles?: string[]) => `You are preparing a listening-comprehension exercise for a professional practicing
${languageName}: the student hears a short passage read aloud (they never see the text), then
summarizes it out loud from memory.

Search for one real, recent (within the last few days) ${topic.toLowerCase()} news story suitable for
an educated general audience — nothing so technical or niche it needs specialist background.
${avoidTitles && avoidTitles.length > 0 ? `\nDo not reuse any of these stories, already covered in this batch: ${avoidTitles.join("; ")}.\n` : ""}
Write a self-contained passage (120-180 words) in ${languageName}, in a clear, professional spoken
register (like a radio news segment) — factual, well-structured, no markdown. It must stand on its own
without the headline or source attached.

Respond with ONLY a JSON object (no markdown fences, no commentary), every string in ${languageName}:
{
  "title": "<a short, neutral title for this story, in ${languageName}, 2-6 words>",
  "text": "<the 120-180 word passage itself, in ${languageName}>",
  "advancedTerms": ["<3-8 sophisticated words/phrases that literally appear in "text", verbatim>"],
  "keyPoints": ["<4-7 short phrases capturing the passage's core facts, each using words that appear in "text", for content-coverage scoring>"]
}`;

/**
 * Both cache functions below swallow DB errors (not just a missing
 * DATABASE_URL, but a live connection/auth failure too) rather than
 * throwing — a broken database must degrade this feature to "always
 * generate, never cache", not break the exercise outright for every
 * student until someone notices and fixes the connection. They still
 * console.error the real reason (visible in Vercel's function logs) —
 * swallowing the error from the caller's perspective isn't the same as
 * hiding it from observability entirely.
 */
async function readCachedPassage(topic: NewsTopic, language: string): Promise<ComprehensionNewsPassage | null> {
  if (!hasDatabase()) return null;
  try {
    const sql = await getDb();
    const rows = await sql!`
      select topic, title, text, advanced_terms, key_points, source_url
      from comprehension_news_cache
      where topic = ${topic} and language = ${language}
      order by random()
      limit 1
    `;
    const row = rows[0];
    if (!row) return null;
    return {
      id: `news-${topic.toLowerCase()}`,
      topic: row.topic,
      title: row.title,
      text: row.text,
      advancedTerms: row.advanced_terms,
      keyPoints: row.key_points,
      sourceUrl: row.source_url,
    };
  } catch (err) {
    console.error(`comprehension_news_cache read failed (${topic}/${language}):`, err instanceof Error ? err.message : err);
    return null;
  }
}

async function writeCachedPassage(
  topic: NewsTopic,
  language: string,
  slot: number,
  item: Omit<ComprehensionNewsPassage, "id" | "topic">,
): Promise<void> {
  if (!hasDatabase()) return;
  try {
    const sql = await getDb();
    const j = (value: unknown) => sql!.json(value as never);
    await sql!`
      insert into comprehension_news_cache (topic, language, slot, title, text, advanced_terms, key_points, source_url)
      values (${topic}, ${language}, ${slot}, ${item.title}, ${item.text}, ${j(item.advancedTerms)}, ${j(item.keyPoints)}, ${item.sourceUrl})
      on conflict (topic, language, slot) do update set
        title = excluded.title,
        text = excluded.text,
        advanced_terms = excluded.advanced_terms,
        key_points = excluded.key_points,
        source_url = excluded.source_url,
        created_at = now()
    `;
  } catch (err) {
    // Best-effort — the generated passage is still returned to the caller
    // (see fetchNewsPassage) even when it can't be persisted.
    console.error(`comprehension_news_cache write failed (${topic}/${language}/slot ${slot}):`, err instanceof Error ? err.message : err);
  }
}

/**
 * Calls Gemini (Google Search grounding) for one fresh news passage. Requires
 * a real grounded source URL — see generateContentWithSources's doc comment
 * for why an LLM-typed URL field wouldn't be trustworthy here. Returns null
 * on any failure, including a successful-looking response with no source.
 * `avoidTitles` steers away from stories already picked earlier in the same
 * (topic, language) pool-filling run — see the refresh route.
 */
async function generateNewsPassage(
  topic: NewsTopic,
  languageName: string,
  avoidTitles?: string[],
): Promise<Omit<ComprehensionNewsPassage, "id" | "topic"> | null> {
  if (!hasGeminiKey()) return null;

  try {
    const { text: raw, sourceUrl } = await generateContentWithSources(
      [{ text: PROMPT(topic, languageName, avoidTitles) }],
      { tools: [{ google_search: {} }] },
    );
    if (!sourceUrl) return null;

    const cleaned = raw.trim().replace(/^```(?:json)?\s*|\s*```$/g, "");
    const parsed = JSON.parse(cleaned);
    if (!parsed.title || !parsed.text || !Array.isArray(parsed.advancedTerms) || !Array.isArray(parsed.keyPoints)) {
      return null;
    }
    return {
      title: String(parsed.title),
      text: String(parsed.text),
      advancedTerms: parsed.advancedTerms.map(String),
      keyPoints: parsed.keyPoints.map(String),
      sourceUrl,
    };
  } catch {
    return null;
  }
}

/**
 * Returns a real-news passage for this topic/language, picked at random
 * from whatever's cached (1-5 slots filled — served identically either
 * way, zero Gemini calls). Only a fully empty pool (a brand-new pair before
 * its first refresh, or one that's somehow lost all its rows) falls
 * through to a single live generate-and-cache, written to slot 0 — the
 * refresh job (see /api/comprehension/news/refresh) is what fills the rest
 * of the pool over time, a read never tops one up itself.
 */
export async function fetchNewsPassage(topic: NewsTopic, languageName: string): Promise<ComprehensionNewsPassage | null> {
  const cached = await readCachedPassage(topic, languageName);
  if (cached) return cached;

  const generated = await generateNewsPassage(topic, languageName);
  if (!generated) return null;
  await writeCachedPassage(topic, languageName, 0, generated);
  return { id: `news-${topic.toLowerCase()}`, topic, ...generated };
}

/**
 * Used by the refresh job only, one pool slot at a time: always generates
 * fresh (bypasses the cache read), and overwrites that slot only when a
 * valid, non-duplicate new result comes back — a failed/unverifiable
 * attempt, or one that lands on a `sourceUrl` already used elsewhere in
 * this same pool-filling run (title-avoidance alone can't stop the search
 * from re-finding the same article under a different title), leaves
 * whatever was cached in that slot before untouched. Returns the accepted
 * {title, sourceUrl} for the caller to fold into the next slot's
 * avoid-list, or null if this slot wasn't updated.
 */
export async function refreshNewsSlot(
  topic: NewsTopic,
  languageName: string,
  slot: number,
  avoidTitles: string[],
  avoidUrls: Set<string>,
): Promise<{ title: string; sourceUrl: string } | null> {
  const generated = await generateNewsPassage(topic, languageName, avoidTitles);
  if (!generated) return null;
  if (avoidUrls.has(generated.sourceUrl)) return null;

  await writeCachedPassage(topic, languageName, slot, generated);
  return { title: generated.title, sourceUrl: generated.sourceUrl };
}
