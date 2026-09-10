import { countryForLanguage, type CountryCode } from "@/lib/countryContext";

/**
 * Politics' country concept — same shared lib/countryContext.ts as Law
 * (lib/legalJurisdiction.ts), with political-system labels instead of
 * legal-system ones. See that module's header for the language-vs-country
 * simplification note, which applies identically here.
 */
export type PoliticalSystem = CountryCode;

export const POLITICAL_SYSTEM_LABELS: Record<PoliticalSystem, string> = {
  us: "United States (federal presidential republic)",
  de: "Germany (federal parliamentary republic)",
  fr: "France (semi-presidential republic)",
  es: "Spain (parliamentary constitutional monarchy)",
  se: "Sweden (parliamentary constitutional monarchy)",
};

export const countrySystemForLanguage = countryForLanguage;
