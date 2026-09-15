import { CASE_CATEGORIES, CASE_STUDIES, type CaseProfession } from "@/lib/caseStudyContent";
import { getFundamentals } from "@/lib/caseStudyFundamentals";
import { getTeachingContent, type TeachingContent } from "@/lib/tutorTeachingContent";
import type { CountryCode } from "@/lib/countryContext";

const REVIEW_COUNTRIES: CountryCode[] = ["us", "de", "fr", "es", "se"];

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
  teaching: TeachingContent | null;
  fundamentals: ReturnType<typeof getFundamentals>;
  cases: typeof CASE_STUDIES;
}

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
          teaching: getTeachingContent(profession, category, jurisdiction),
          fundamentals: getFundamentals(profession, category),
          cases: CASE_STUDIES.filter((item) => item.profession === profession && item.category === category),
        });
      }
    }
  }
  return rows;
}

export function getReviewableTutorContent(contentKey: string): ReviewableTutorContent | undefined {
  return listReviewableTutorContent().find((item) => item.contentKey === contentKey);
}

export const REVIEW_INSTRUCTIONS = `Review the supplied university/professional AI Tutor content.
Score each criterion from 0 to 2: factualAccuracy, relevance, depth, clarity, usefulness, balance.
0 = unacceptable, 1 = acceptable with reservations, 2 = strong. Check every factual claim against
academic books, peer-reviewed journals, or official sources where possible. Treat law and politics as
jurisdiction-specific. Flag contradictions, unsupported claims, missing important concepts, excessive
length, and content that is too thin. Aim for enough depth for university students and professionals,
without turning a teaching step into a textbook chapter. Return JSON only with this shape:
{"agentName":"...","model":"...","verdict":"agree|mixed|contradiction","scores":{"factualAccuracy":0,"relevance":0,"depth":0,"clarity":0,"usefulness":0,"balance":0},"contradictions":[],"missingTopics":[],"sources":[{"title":"...","author":"...","year":"...","url":"...","kind":"book|journal|official|other","note":"..."}],"suggestions":[],"summary":"..."}`;

export function reviewExport(): { exportedAt: string; reviewInstructions: string; content: ReviewableTutorContent[] } {
  return { exportedAt: new Date().toISOString(), reviewInstructions: REVIEW_INSTRUCTIONS, content: listReviewableTutorContent() };
}