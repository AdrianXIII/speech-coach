import { generateContent, hasGeminiKey } from "@/lib/gemini";
import type { TeachingContent } from "@/lib/tutorTeachingContent";

type TranslatableConcept = { id: string; title: string; explanation: string; whyItMatters: string; example: string };

/** Concepts per parallel translation request — small enough that each call returns in seconds. */
const CONCEPTS_PER_CHUNK = 2;

/**
 * Finished translations, keyed by content + language. Teaching content is
 * static per deployment, so a lecture translated once can be served
 * instantly to every later visitor that lands on the same server instance.
 */
const translationCache = new Map<string, TeachingContent>();
const MAX_CACHED_TRANSLATIONS = 200;

const TRANSLATE_RULES = `Translate naturally and idiomatically for an adult professional learner, not
word-for-word. Preserve the exact JSON structure and keys. Do NOT translate any "id" field values
(they're internal identifiers). Some sentences end with a citation marker like "[1]" or "[2]" —
keep every such marker exactly as-is, attached to the same claim it follows in the original (do not
translate, remove, renumber, or move it). Respond with ONLY the translated JSON, no markdown fences,
no commentary.`;

async function translateJson<T>(value: T, languageName: string): Promise<T | null> {
  try {
    const raw = await generateContent(
      [{ text: `Translate the following JSON into ${languageName}.\n${TRANSLATE_RULES}\n\n${JSON.stringify(value)}` }],
      { responseMimeType: "application/json" },
    );
    return JSON.parse(raw.replace(/^```(?:json)?\s*|\s*```$/g, "")) as T;
  } catch {
    return null;
  }
}

/**
 * Translates a teaching-content entry's display text into the target
 * language via Gemini, so the AI Tutor can actually be used to practice
 * business/law/politics vocabulary IN that language — not just get
 * country-accurate facts while reading English. Concept `id`s are never
 * translated (they're internal identifiers, used for flagging).
 *
 * A full ~5,800-word lecture in one Gemini call took 50-110 seconds, so the
 * lecture is split into small chunks (overview + connections, then two
 * concepts at a time) translated in parallel. Each chunk falls back to its
 * original English independently — one failed chunk leaves a couple of
 * concepts in English rather than the whole lecture.
 */
export async function translateTeachingContent(
  teaching: TeachingContent,
  languageName: string,
): Promise<TeachingContent> {
  if (!hasGeminiKey()) return teaching;

  const cacheKey = `${languageName}|${teaching.profession}|${teaching.category}|${teaching.jurisdiction ?? ""}|${teaching.generatedAt}`;
  const cached = translationCache.get(cacheKey);
  if (cached) return cached;

  const conceptChunks: TranslatableConcept[][] = [];
  for (let i = 0; i < teaching.concepts.length; i += CONCEPTS_PER_CHUNK) {
    conceptChunks.push(
      teaching.concepts.slice(i, i + CONCEPTS_PER_CHUNK).map(({ id, title, explanation, whyItMatters, example }) => ({
        id,
        title,
        explanation,
        whyItMatters,
        example,
      })),
    );
  }

  const [frame, ...translatedChunks] = await Promise.all([
    translateJson({ overview: teaching.overview, connections: teaching.connections }, languageName),
    ...conceptChunks.map((chunk) => translateJson({ concepts: chunk }, languageName)),
  ]);

  let failed = !frame?.overview || !frame?.connections;
  const concepts = teaching.concepts.map((original, i) => {
    const chunk = translatedChunks[Math.floor(i / CONCEPTS_PER_CHUNK)]?.concepts;
    const translated = Array.isArray(chunk) ? chunk[i % CONCEPTS_PER_CHUNK] : undefined;
    if (!translated) failed = true;
    // Keep original ids regardless of what came back, so flagging/keys never break.
    return {
      ...original,
      title: translated?.title ?? original.title,
      explanation: translated?.explanation ?? original.explanation,
      whyItMatters: translated?.whyItMatters ?? original.whyItMatters,
      example: translated?.example ?? original.example,
    };
  });

  const result: TeachingContent = {
    ...teaching,
    overview: frame?.overview ?? teaching.overview,
    concepts,
    connections: frame?.connections ?? teaching.connections,
  };

  // Only cache complete translations, so a transient failure gets retried next load.
  if (!failed) {
    if (translationCache.size >= MAX_CACHED_TRANSLATIONS) {
      translationCache.delete(translationCache.keys().next().value!);
    }
    translationCache.set(cacheKey, result);
  }
  return result;
}

/** Translates just a case's title/scenario (the only fields shown/spoken to the student) — the grading rubric fields stay English internally, which Gemini handles fine when grading a translated transcript. */
export async function translateCaseText(
  title: string,
  scenario: string,
  languageName: string,
): Promise<{ title: string; scenario: string }> {
  if (!hasGeminiKey()) return { title, scenario };

  const prompt = `Translate the following JSON into ${languageName} — naturally and idiomatically.
Respond with ONLY the translated JSON, no markdown fences, no commentary.

${JSON.stringify({ title, scenario })}`;

  try {
    const raw = await generateContent([{ text: prompt }], { responseMimeType: "application/json" });
    const translated = JSON.parse(raw) as { title?: string; scenario?: string };
    if (!translated.title || !translated.scenario) return { title, scenario };
    return { title: translated.title, scenario: translated.scenario };
  } catch {
    return { title, scenario };
  }
}
