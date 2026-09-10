import type { LanguageCode } from "@/lib/languages";

/**
 * Law is jurisdiction-bound in a way Business and Politics content mostly
 * isn't — common law (US) and civil law (Germany, France, Spain, Sweden)
 * aren't just "the same law with local details," they use different core
 * doctrines (German contract formation has no "consideration" concept at
 * all, for instance). The AI Tutor's Law content therefore needs a
 * jurisdiction dimension that Business/Politics don't.
 *
 * IMPORTANT SIMPLIFICATION: language is not the same as jurisdiction —
 * French is spoken in France, Belgium, Switzerland, and Quebec, each with
 * different law; German in Germany, Austria, and Switzerland likewise. This
 * maps each app language to ONE representative jurisdiction as a practical
 * default, not a claim that e.g. "French" content covers Belgian law too.
 * A real per-country picker (independent of the language switch) is the
 * natural next step if that distinction ever matters to users.
 */
export type LawJurisdiction = "us" | "de" | "fr" | "es" | "se";

export const JURISDICTION_LABELS: Record<LawJurisdiction, string> = {
  us: "United States (common law)",
  de: "Germany (BGB / civil law)",
  fr: "France (Code civil)",
  es: "Spain (Código Civil)",
  se: "Sweden (Nordic civil law)",
};

const JURISDICTION_FOR_LANGUAGE: Record<LanguageCode, LawJurisdiction> = {
  en: "us",
  de: "de",
  fr: "fr",
  es: "es",
  sv: "se",
};

/** The default jurisdiction for a given app language — see the simplification note above. */
export function jurisdictionForLanguage(language: LanguageCode): LawJurisdiction {
  return JURISDICTION_FOR_LANGUAGE[language];
}
