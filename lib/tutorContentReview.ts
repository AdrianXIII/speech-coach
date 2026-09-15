import { CASE_CATEGORIES, CASE_STUDIES, type CaseProfession, type CaseStudy } from "@/lib/caseStudyContent";
import { getFundamentals } from "@/lib/caseStudyFundamentals";
import { getTeachingContent, type TeachingContent } from "@/lib/tutorTeachingContent";
import { translateTeachingContent, translateCaseText } from "@/lib/tutorTranslate";
import { hasGeminiKey } from "@/lib/gemini";
import { LANGUAGES, getLanguage, type LanguageCode } from "@/lib/languages";
import type { CountryCode } from "@/lib/countryContext";

const REVIEW_COUNTRIES: CountryCode[] = ["us", "de", "fr", "es", "se"];

/** Every language the live app can deliver AI Tutor content in — see lib/languages.ts. Content review covers all of them, not just the English source. */
export const REVIEW_LANGUAGES: LanguageCode[] = LANGUAGES.map((l) => l.code);

export type ReviewStatus = "draft" | "ai_reviewed" | "ai_consensus" | "needs_expert" | "approved" | "superseded";

export interface ReviewCriterionScores {
  factualAccuracy: number;
  relevance: number;
  depth: number;
  clarity: number;
  usefulness: number;
  balance: number;
}

export interface ReviewSource {
  title: string;
  author?: string;
  year?: string;
  url?: string;
  kind: "book" | "journal" | "official" | "other";
  note?: string;
}

export interface ReviewableTutorContent {
  contentKey: string;
  profession: CaseProfession;
  category: string;
  jurisdiction?: CountryCode;
  /** Language the teaching/cases text below is actually in. "en" is the hand-authored source; every other language is a live translation of it, same as the app does at runtime. */
  language: LanguageCode;
  teaching: TeachingContent | null;
  fundamentals: ReturnType<typeof getFundamentals>;
  cases: typeof CASE_STUDIES;
  /** Only set when language !== "en" — the untranslated English source, given to review agents so they can check translation fidelity, not just re-review the same facts. */
  englishReference?: { teaching: TeachingContent | null; cases: typeof CASE_STUDIES };
}

/** English-only, no translation calls — cheap enumeration used for listing/UI. */
export function listReviewableTutorContent(): ReviewableTutorContent[] {
  const rows: ReviewableTutorContent[] = [];
  for (const profession of Object.keys(CASE_CATEGORIES) as CaseProfession[]) {
    for (const category of CASE_CATEGORIES[profession]) {
      const jurisdictions = profession === "business" ? [undefined] : REVIEW_COUNTRIES;
      for (const jurisdiction of jurisdictions) {
        rows.push({
          contentKey: `${profession}/${category}${jurisdiction ? `/${jurisdiction}` : ""}`,
          profession,
          category,
          jurisdiction,
          language: "en",
          teaching: getTeachingContent(profession, category, jurisdiction),
          fundamentals: getFundamentals(profession, category),
          cases: CASE_STUDIES.filter((item) => item.profession === profession && item.category === category),
        });
      }
    }
  }
  return rows;
}

function parseContentKey(contentKey: string): { baseKey: string; language: LanguageCode } {
  const [baseKey, language] = contentKey.split("::");
  return { baseKey, language: (language as LanguageCode) ?? "en" };
}

/** Synchronous, English-only lookup — kept for callers (e.g. content edits) that only ever deal with the source language. */
export function getReviewableTutorContent(contentKey: string): ReviewableTutorContent | undefined {
  const { baseKey } = parseContentKey(contentKey);
  return listReviewableTutorContent().find((item) => item.contentKey === baseKey);
}

/**
 * Resolves a contentKey to its full reviewable content, translating on demand
 * for non-English languages via the same Gemini translation the live app uses
 * (lib/tutorTranslate.ts) — so what gets validated is exactly what a student
 * in that language actually sees. This is the only path that calls out to
 * Gemini, and it only runs for the one contentKey being reviewed right now,
 * never for the whole list.
 */
export async function resolveReviewableContent(contentKey: string): Promise<ReviewableTutorContent | undefined> {
  const { baseKey, language } = parseContentKey(contentKey);
  const english = listReviewableTutorContent().find((item) => item.contentKey === baseKey);
  if (!english) return undefined;
  if (language === "en") return english;
  if (!hasGeminiKey()) return english; // no key configured — fall back to the English source rather than failing the review

  const languageName = getLanguage(language).name;
  const teaching = english.teaching ? await translateTeachingContent(english.teaching, languageName) : null;
  const cases: CaseStudy[] = await Promise.all(
    english.cases.map(async (item) => {
      const translated = await translateCaseText(item.title, item.scenario, languageName);
      return { ...item, title: translated.title, scenario: translated.scenario };
    }),
  );
  return {
    ...english,
    contentKey,
    language,
    teaching,
    cases,
    englishReference: { teaching: english.teaching, cases: english.cases },
  };
}

export const REVIEW_INSTRUCTIONS = `Review the supplied university/professional AI Tutor content.
Score each criterion from 0 to 2: factualAccuracy, relevance, depth, clarity, usefulness, balance.
0 = unacceptable, 1 = acceptable with reservations, 2 = strong. Check every factual claim against
academic books, peer-reviewed journals, or official sources where possible. Treat law and politics as
jurisdiction-specific. Flag contradictions, unsupported claims, missing important concepts, excessive
length, and content that is too thin. Aim for enough depth for university students and professionals,
without turning a teaching step into a textbook chapter. If "language" is not "en", the content is a
translation of "englishReference" — also verify it is accurate, natural for a native speaker, and adds
or loses no meaning versus the English original; treat any mistranslation as a contradiction. Return
JSON only with this shape:
{"agentName":"...","model":"...","verdict":"agree|mixed|contradiction","scores":{"factualAccuracy":0,"relevance":0,"depth":0,"clarity":0,"usefulness":0,"balance":0},"contradictions":[],"missingTopics":[],"sources":[{"title":"...","author":"...","year":"...","url":"...","kind":"book|journal|official|other","note":"..."}],"suggestions":[],"summary":"..."}`;

export function reviewExport(): { exportedAt: string; reviewInstructions: string; content: ReviewableTutorContent[] } {
  return { exportedAt: new Date().toISOString(), reviewInstructions: REVIEW_INSTRUCTIONS, content: listReviewableTutorContent() };
}