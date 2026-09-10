import { generateContent, hasGeminiKey } from "@/lib/gemini";
import type { CaseProfession } from "@/lib/caseStudyContent";
import type { TutorProfile } from "@/lib/tutorProfile";

export interface TutorNewsItem {
  headline: string;
  summary: string;
  /** How this news connects to a concept in the selected domain. */
  connection: string;
  /** The applied question put to the student, framed against their fictive profile. */
  appliedQuestion: string;
}

const DOMAIN_LABEL: Record<CaseProfession, string> = {
  business: "business or financial",
  law: "legal or regulatory",
  politics: "political or policy",
};

const ENTITY_LABEL: Record<CaseProfession, string> = {
  business: "company",
  law: "client organization",
  politics: "organization",
};

const PROMPT = (
  profession: CaseProfession,
  category: string,
  profile: TutorProfile,
  languageName: string,
  countryName?: string,
) => `You are preparing a live, applied tutoring exercise for a student practicing "${category}" in
${profession}, studying in ${languageName}.

Search for one real, recent (within the last few days) ${DOMAIN_LABEL[profession]} news story that is
clearly relevant to "${category}" concepts${countryName ? `, prioritizing a story from or directly relevant to ${countryName} if a genuinely relevant one exists` : ""}.

The student maintains a fictive ${ENTITY_LABEL[profession]} with this profile, which every exercise
should stay consistent with:
Name: ${profile.name}
Description: ${profile.description}
Size: ${profile.size}
Market: ${profile.market}
Goals: ${profile.goals}

Respond with ONLY a JSON object (no markdown fences, no commentary) matching exactly this shape. Every
string value must be written in ${languageName} — the student is practicing ${languageName}, not just
reading facts, so do not respond in English unless ${languageName} is English:
{
  "headline": "<the real news headline, translated/written in ${languageName} if the source wasn't>",
  "summary": "<2-3 sentence factual summary of the news, in ${languageName}>",
  "connection": "<1-2 sentences connecting this news to a specific ${category} concept, in ${languageName}>",
  "appliedQuestion": "<one applied question in ${languageName}, referencing the student's fictive ${ENTITY_LABEL[profession]} by name, e.g. 'Given this news, how would it affect ${profile.name}'s strategy?'>"
}`;

/**
 * Fetches one real, current news item relevant to the domain and turns it
 * into an applied question, using Gemini's built-in Google Search grounding
 * tool — deliberately not a separate news API/vendor/key, since grounding
 * reuses the same GEMINI_API_KEY already configured for everything else in
 * this app. Writes the whole result directly in the target language (so
 * Live News mode is actual language practice, not English content to
 * translate yourself) and, when a country is given, prefers a story from
 * that country so the practice stays immersive. Returns null on any
 * failure (no key, search failure, malformed response) so the caller can
 * fall back to standard Challenge mode instead of breaking the session.
 */
export async function fetchTutorNews(
  profession: CaseProfession,
  category: string,
  profile: TutorProfile,
  languageName: string,
  countryName?: string,
): Promise<TutorNewsItem | null> {
  if (!hasGeminiKey()) return null;

  try {
    const raw = await generateContent([{ text: PROMPT(profession, category, profile, languageName, countryName) }], {
      tools: [{ google_search: {} }],
    });
    const cleaned = raw.trim().replace(/^```(?:json)?\s*|\s*```$/g, "");
    const parsed = JSON.parse(cleaned);
    if (!parsed.headline || !parsed.appliedQuestion) return null;
    return {
      headline: String(parsed.headline),
      summary: String(parsed.summary ?? ""),
      connection: String(parsed.connection ?? ""),
      appliedQuestion: String(parsed.appliedQuestion),
    };
  } catch {
    return null;
  }
}
