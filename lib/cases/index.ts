import type { CaseStudy } from "@/lib/caseStudyContent";
import type { Fundamental } from "@/lib/caseStudyFundamentals";
import { LAW_CIVIL_LITIGATION_CASES, LAW_CIVIL_LITIGATION_FUNDAMENTALS } from "@/lib/cases/law-civil-litigation";
import { LAW_CONSTITUTIONAL_REGULATORY_CASES, LAW_CONSTITUTIONAL_REGULATORY_FUNDAMENTALS } from "@/lib/cases/law-constitutional-regulatory";
import { LAW_CONTRACT_LAW_CASES, LAW_CONTRACT_LAW_FUNDAMENTALS } from "@/lib/cases/law-contract-law";
import { LAW_CORPORATE_COMPLIANCE_CASES, LAW_CORPORATE_COMPLIANCE_FUNDAMENTALS } from "@/lib/cases/law-corporate-compliance";
import { LAW_CRIMINAL_LAW_CASES, LAW_CRIMINAL_LAW_FUNDAMENTALS } from "@/lib/cases/law-criminal-law";
import { POLITICS_CAMPAIGN_STRATEGY_CASES, POLITICS_CAMPAIGN_STRATEGY_FUNDAMENTALS } from "@/lib/cases/politics-campaign-strategy";
import { POLITICS_CRISIS_RESPONSE_CASES, POLITICS_CRISIS_RESPONSE_FUNDAMENTALS } from "@/lib/cases/politics-crisis-response";
import { POLITICS_DOMESTIC_POLICY_CASES, POLITICS_DOMESTIC_POLICY_FUNDAMENTALS } from "@/lib/cases/politics-domestic-policy";
import { POLITICS_FOREIGN_POLICY_DIPLOMACY_CASES, POLITICS_FOREIGN_POLICY_DIPLOMACY_FUNDAMENTALS } from "@/lib/cases/politics-foreign-policy-diplomacy";
import { POLITICS_LEGISLATIVE_NEGOTIATION_CASES, POLITICS_LEGISLATIVE_NEGOTIATION_FUNDAMENTALS } from "@/lib/cases/politics-legislative-negotiation";

/** Law and Politics case banks, one file per category. */
export const COUNTRY_BOUND_CASES: CaseStudy[] = [
  ...LAW_CIVIL_LITIGATION_CASES,
  ...LAW_CONSTITUTIONAL_REGULATORY_CASES,
  ...LAW_CONTRACT_LAW_CASES,
  ...LAW_CORPORATE_COMPLIANCE_CASES,
  ...LAW_CRIMINAL_LAW_CASES,
  ...POLITICS_CAMPAIGN_STRATEGY_CASES,
  ...POLITICS_CRISIS_RESPONSE_CASES,
  ...POLITICS_DOMESTIC_POLICY_CASES,
  ...POLITICS_FOREIGN_POLICY_DIPLOMACY_CASES,
  ...POLITICS_LEGISLATIVE_NEGOTIATION_CASES,
];

/** Law and Politics fundamentals, keyed "profession/category" like FUNDAMENTALS. */
export const COUNTRY_BOUND_FUNDAMENTALS: Record<string, Fundamental[]> = {
  "law/Civil Litigation": LAW_CIVIL_LITIGATION_FUNDAMENTALS,
  "law/Constitutional & Regulatory": LAW_CONSTITUTIONAL_REGULATORY_FUNDAMENTALS,
  "law/Contract Law": LAW_CONTRACT_LAW_FUNDAMENTALS,
  "law/Corporate & Compliance": LAW_CORPORATE_COMPLIANCE_FUNDAMENTALS,
  "law/Criminal Law": LAW_CRIMINAL_LAW_FUNDAMENTALS,
  "politics/Campaign Strategy": POLITICS_CAMPAIGN_STRATEGY_FUNDAMENTALS,
  "politics/Crisis Response": POLITICS_CRISIS_RESPONSE_FUNDAMENTALS,
  "politics/Domestic Policy": POLITICS_DOMESTIC_POLICY_FUNDAMENTALS,
  "politics/Foreign Policy & Diplomacy": POLITICS_FOREIGN_POLICY_DIPLOMACY_FUNDAMENTALS,
  "politics/Legislative Negotiation": POLITICS_LEGISLATIVE_NEGOTIATION_FUNDAMENTALS,
};
