import type { CaseStudy } from "@/lib/caseStudyContent";
import type { Fundamental } from "@/lib/caseStudyFundamentals";

/**
 * Law / Constitutional & Regulatory: the fundamentals checklist and the case bank
 * for this category, kept together so they can be written and reviewed as
 * one unit. Registered in lib/cases/index.ts.
 */
export const LAW_CONSTITUTIONAL_REGULATORY_FUNDAMENTALS: Fundamental[] = [];

export const LAW_CONSTITUTIONAL_REGULATORY_CASES: CaseStudy[] = [
  {
    id: "law-const-agency-enforcement",
    profession: "law",
    category: "Constitutional & Regulatory",
    title: "Appealing a Regulatory Enforcement Action",
    scenario:
      "A federal environmental agency has issued a $2M fine against your manufacturing client for exceeding emissions thresholds, based on testing methodology your client's experts argue is scientifically outdated compared to current standards used elsewhere. You're advising on whether and how to appeal the enforcement action.",
    keyIssues: [
      "Standard of review courts apply to agency factual and methodological determinations (Chevron-style deference considerations)",
      "Strength of the scientific challenge to the testing methodology as a basis for appeal",
      "Procedural options: administrative appeal within the agency versus judicial review",
      "Cost-benefit of a prolonged appeal versus a negotiated settlement",
    ],
    expectedConcepts: [
      "administrative deference",
      "arbitrary and capricious standard",
      "administrative appeal",
      "judicial review",
      "regulatory settlement",
    ],
    modelApproach:
      "A strong answer is realistic about the high bar for overturning agency technical determinations under deference doctrines, while identifying whether the outdated-methodology argument is strong enough to meet an 'arbitrary and capricious' standard, and weighs a negotiated settlement against the cost and uncertainty of full judicial review.",
    furtherReading: [
      "Administrative deference doctrine post-Loper Bright",
      "Arbitrary and capricious standard of review",
      "Environmental enforcement appeal procedures",
    ],
  },
  {
    id: "law-const-content-moderation",
    profession: "law",
    category: "Constitutional & Regulatory",
    title: "Free Speech vs. Platform Moderation",
    scenario:
      "A user is suing a social media platform (your client) for removing their political content, alleging a First Amendment violation. Your client is a private company, not a government actor. The plaintiff argues the platform has become a 'public square' functionally equivalent to state action given its market dominance. You're preparing the motion to dismiss.",
    keyIssues: [
      "State action doctrine and its limits — the First Amendment restrains government, not private actors",
      "Whether market dominance alone converts a private platform into a state actor (it generally doesn't under current law)",
      "Section 230 protections for content moderation decisions",
      "Distinguishing this from the narrow 'company town' state action exceptions",
    ],
    expectedConcepts: [
      "state action doctrine",
      "First Amendment",
      "Section 230",
      "company town doctrine",
      "motion to dismiss",
    ],
    modelApproach:
      "A strong answer leads with the state action doctrine as the dispositive issue — private platforms, regardless of size, are not bound by the First Amendment absent genuine government entanglement — and reinforces the argument with Section 230's protection for content moderation, rather than getting drawn into a debate about fairness or market power.",
    furtherReading: [
      "State action doctrine and the 'public square' argument in recent case law",
      "Section 230 of the Communications Decency Act",
      "Manhattan Community Access Corp. v. Halleck (state action limits)",
    ],
  },
];
