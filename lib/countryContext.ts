import type { LanguageCode } from "@/lib/languages";

/**
 * Both Law and Politics are country-bound in ways Business mostly isn't —
 * common law (US) vs. civil law (Germany/France/Spain/Sweden) use different
 * core legal doctrines, not just local details, and presidential (US),
 * parliamentary (Germany, Spain, Sweden), and semi-presidential (France)
 * systems work structurally differently, not just cosmetically. This is the
 * shared country concept both lib/legalJurisdiction.ts (Law) and Politics
 * teaching content key off.
 *
 * IMPORTANT SIMPLIFICATION: language is not the same as country — French is
 * spoken in France, Belgium, Switzerland, and Quebec, each with different
 * law and government; German in Germany, Austria, and Switzerland likewise.
 * This maps each app language to ONE representative country as a practical
 * default, not a claim that e.g. "French" content covers Belgian law too.
 * A real per-country picker (independent of the language switch) is the
 * natural next step if that distinction ever matters to users.
 */
export type CountryCode = "us" | "de" | "fr" | "es" | "se";

export const COUNTRY_LABELS: Record<CountryCode, string> = {
  us: "United States",
  de: "Germany",
  fr: "France",
  es: "Spain",
  se: "Sweden",
};

const COUNTRY_FOR_LANGUAGE: Record<LanguageCode, CountryCode> = {
  en: "us",
  de: "de",
  fr: "fr",
  es: "es",
  sv: "se",
};

/** The default country for a given app language — see the simplification note above. */
export function countryForLanguage(language: LanguageCode): CountryCode {
  return COUNTRY_FOR_LANGUAGE[language];
}
