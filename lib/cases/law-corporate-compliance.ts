import type { CaseStudy } from "@/lib/caseStudyContent";
import type { Fundamental } from "@/lib/caseStudyFundamentals";

/**
 * Law / Corporate & Compliance: the fundamentals checklist and the case bank
 * for this category, kept together so they can be written and reviewed as
 * one unit. Registered in lib/cases/index.ts.
 */
export const LAW_CORPORATE_COMPLIANCE_FUNDAMENTALS: Fundamental[] = [];

export const LAW_CORPORATE_COMPLIANCE_CASES: CaseStudy[] = [
  {
    id: "law-corp-insider-trading",
    profession: "law",
    category: "Corporate & Compliance",
    title: "Suspected Insider Trading",
    scenario:
      "Your company's compliance team flagged unusual trading activity by a mid-level finance employee shortly before a major earnings announcement, resulting in significant personal gains. The employee claims the trades were based on public information and coincidence. As in-house counsel, you must advise the board on how to proceed with an internal investigation and whether to self-report to the SEC.",
    keyIssues: [
      "Threshold of suspicion needed to justify a formal internal investigation",
      "Preserving evidence and communications before they can be altered or destroyed",
      "Weighing voluntary self-disclosure to regulators against potential leniency versus certainty of triggering scrutiny",
      "Protecting the company's own liability exposure regardless of the individual employee's culpability",
    ],
    expectedConcepts: [
      "insider trading",
      "material nonpublic information",
      "SEC self-reporting",
      "internal investigation",
      "safe harbor",
    ],
    modelApproach:
      "A strong answer moves quickly to preserve evidence and launch a genuinely independent investigation before assessing self-reporting, and weighs the SEC's cooperation credit framework (self-reporting often results in reduced penalties) against the certainty of drawing regulatory attention — advising based on regulatory incentive structures, not just intuition.",
    furtherReading: [
      "SEC Rule 10b-5 and insider trading enforcement",
      "SEC self-reporting and cooperation credit framework",
      "Corporate internal investigation best practices",
    ],
  },
  {
    id: "law-corp-fcpa",
    profession: "law",
    category: "Corporate & Compliance",
    title: "Bribery Discovered Abroad",
    scenario:
      "During a routine audit, your multinational company discovered that a regional sales manager in a foreign subsidiary made payments to a local government official to expedite a contract approval, potentially violating the Foreign Corrupt Practices Act. The payments were relatively small but pattern-suggestive of a broader practice. Leadership wants your legal guidance on next steps.",
    keyIssues: [
      "Scope of the investigation needed to determine if this is isolated or systemic",
      "FCPA liability exposure for the parent company regardless of where the conduct occurred",
      "Voluntary disclosure considerations under DOJ/SEC FCPA enforcement policy",
      "Remediation steps needed regardless of the disclosure decision",
    ],
    expectedConcepts: [
      "Foreign Corrupt Practices Act (FCPA)",
      "books and records provision",
      "voluntary self-disclosure",
      "remediation",
      "third-party due diligence",
    ],
    modelApproach:
      "A strong answer immediately flags the parent company's exposure under the FCPA regardless of the payment's small size, recommends a scoped independent investigation to assess whether this is isolated, and walks through the DOJ's voluntary disclosure incentives (the FCPA Corporate Enforcement Policy) as a genuine factor in the recommendation, not an afterthought.",
    furtherReading: [
      "Foreign Corrupt Practices Act (FCPA) enforcement guide",
      "DOJ FCPA Corporate Enforcement Policy",
      "Anti-bribery compliance program design",
    ],
  },
  {
    id: "law-corporate-cross-border-restructuring-premium",
    profession: "law",
    category: "Corporate & Compliance",
    title: "A Cross-Border Restructuring",
    premium: true,
    scenario:
      "Your client's multinational group wants to consolidate three separate national subsidiaries under a single holding structure to simplify tax reporting and governance. Each subsidiary operates under different corporate law regimes, has different minority shareholders, and is subject to different works-council consultation requirements. Leadership wants the restructuring completed within one fiscal quarter. You need to advise on how to sequence this without triggering a regulatory or labor-relations crisis in any jurisdiction.",
    keyIssues: [
      "Whether a compressed one-quarter timeline is realistic given works-council consultation obligations in some jurisdictions",
      "Minority shareholder protections that could block or delay parts of the restructuring",
      "Sequencing to avoid triggering change-of-control clauses in existing contracts",
      "Coordinating outside counsel across jurisdictions without inconsistent positions",
    ],
    expectedConcepts: [
      "cross-border restructuring",
      "works council consultation",
      "minority shareholder rights",
      "change of control clause",
      "regulatory coordination",
    ],
    modelApproach:
      "A strong answer is honest that some jurisdictions' consultation requirements make a single-quarter timeline unrealistic without real legal risk, and proposes a phased sequence — starting with the jurisdiction with the fewest procedural obstacles — while flagging early which change-of-control clauses need pre-clearance before any public step is taken.",
    furtherReading: [
      "Cross-border corporate restructuring frameworks",
      "EU works council consultation requirements",
      "Change-of-control clause risk review in M&A/restructuring",
    ],
  },
];
