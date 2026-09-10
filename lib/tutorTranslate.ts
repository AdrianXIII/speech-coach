import { generateContent, hasGeminiKey } from "@/lib/gemini";
import type { TeachingContent } from "@/lib/tutorTeachingContent";

interface TranslatableTeaching {
  overview: string;
  concepts: { id: string; title: string; explanation: string; whyItMatters: string; example: string }[];
  connections: string;
}

/**
 * Translates a teaching-content entry's display text into the target
 * language via Gemini, so the AI Tutor can actually be used to practice
 * business/law/politics vocabulary IN that language — not just get
 * country-accurate facts while reading English. Concept `id`s are never
 * translated (they're internal identifiers, used for flagging). Falls back
 * to the original English content on any failure — a translation hiccup
 * shouldn't break the session, it just means this one load stays English.
 */
export async function translateTeachingContent(
  teaching: TeachingContent,
  languageName: string,
): Promise<TeachingContent> {
  if (!hasGeminiKey()) return teaching;

  const payload: TranslatableTeaching = {
    overview: teaching.overview,
    concepts: teaching.concepts,
    connections: teaching.connections,
  };

  const prompt = `Translate the following JSON into ${languageName} — naturally and idiomatically for
an adult professional learner, not a literal word-for-word translation. Preserve the exact JSON
structure and keys. Do NOT translate the "id" field values inside "concepts" (leave them exactly
as-is — they're internal identifiers, not user-facing text). Respond with ONLY the translated JSON,
no markdown fences, no commentary.

${JSON.stringify(payload)}`;

  try {
    const raw = await generateContent([{ text: prompt }], { responseMimeType: "application/json" });
    const translated = JSON.parse(raw) as TranslatableTeaching;
    if (!translated.overview || !Array.isArray(translated.concepts) || !translated.connections) {
      return teaching;
    }
    // Keep original ids regardless of what came back, so flagging/keys never break.
    const concepts = teaching.concepts.map((original, i) => ({
      ...original,
      title: translated.concepts[i]?.title ?? original.title,
      explanation: translated.concepts[i]?.explanation ?? original.explanation,
      whyItMatters: translated.concepts[i]?.whyItMatters ?? original.whyItMatters,
      example: translated.concepts[i]?.example ?? original.example,
    }));
    return { ...teaching, overview: translated.overview, concepts, connections: translated.connections };
  } catch {
    return teaching;
  }
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
