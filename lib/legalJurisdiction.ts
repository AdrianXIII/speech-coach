import { COUNTRY_LABELS, countryForLanguage, type CountryCode } from "@/lib/countryContext";

/**
 * Law's country concept — a thin, Law-flavored alias over the shared
 * lib/countryContext.ts (Politics uses that module directly, with its own
 * labels, since "Germany" needs a legal-system label here but a
 * political-system label there). Kept as its own module so existing
 * imports (LawJurisdiction, JURISDICTION_LABELS, jurisdictionForLanguage)
 * didn't need to change when Politics gained the same country dimension.
 */
export type LawJurisdiction = CountryCode;

export const JURISDICTION_LABELS: Record<LawJurisdiction, string> = {
  us: "United States (common law)",
  de: "Germany (BGB / civil law)",
  fr: "France (Code civil)",
  es: "Spain (Código Civil)",
  se: "Sweden (Nordic civil law)",
};

export const jurisdictionForLanguage = countryForLanguage;

export { COUNTRY_LABELS };
