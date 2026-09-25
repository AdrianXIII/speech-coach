import type { CaseStudy } from "@/lib/caseStudyContent";
import type { Fundamental } from "@/lib/caseStudyFundamentals";

/**
 * Law / Contract Law: the fundamentals checklist and the case bank
 * for this category, kept together so they can be written and reviewed as
 * one unit. Registered in lib/cases/index.ts.
 */
export const LAW_CONTRACT_LAW_FUNDAMENTALS: Fundamental[] = [];

export const LAW_CONTRACT_LAW_CASES: CaseStudy[] = [
  {
    id: "law-contract-force-majeure",
    profession: "law",
    category: "Contract Law",
    title: "The Force Majeure Claim",
    scenario:
      "Your client, a manufacturing supplier, failed to deliver goods on time due to a regional power grid failure lasting nine days. The buyer is suing for breach of contract and lost profits, arguing the contract's force majeure clause only covers 'acts of God' and doesn't clearly list infrastructure failures. Your client argues the power failure was unforeseeable and outside their control. You need to present your legal argument for why the force majeure clause should apply.",
    keyIssues: [
      "Whether the force majeure clause's language is broad enough to cover infrastructure failure, or genuinely limited to natural disasters",
      "Foreseeability and the supplier's reasonable efforts to mitigate the delay",
      "Causation: whether the power failure directly and solely caused the breach",
      "Contra proferentem (ambiguity construed against the drafter) if the clause's wording is genuinely unclear",
    ],
    expectedConcepts: [
      "force majeure",
      "foreseeability",
      "causation",
      "mitigation of damages",
      "contra proferentem",
    ],
    modelApproach:
      "A strong answer engages directly with the contract's actual language rather than general fairness arguments, addresses foreseeability and mitigation efforts as necessary elements of the defense, and, if the clause is ambiguous, argues for interpretation against the drafter — grounding the argument in contract interpretation doctrine, not sympathy.",
    furtherReading: [
      "Force majeure clause drafting and interpretation",
      "UCC provisions on impracticability and excuse",
      "Contra proferentem doctrine in contract interpretation",
    ],
  },
  {
    id: "law-contract-noncompete",
    profession: "law",
    category: "Contract Law",
    title: "Enforcing a Non-Compete",
    scenario:
      "Your client, a mid-sized consulting firm, wants to enforce a non-compete clause against a former senior partner who left to join a direct competitor, taking with them relationships with several key clients. The clause bars competitive work within the same industry for two years, nationwide, with no compensation during that period. The former partner argues the clause is overbroad and unenforceable. You must advise your client on the strength of their position.",
    keyIssues: [
      "Reasonableness of scope (geographic reach, duration, activity restricted) under applicable state law",
      "Legitimate business interest the clause is meant to protect versus a bare restraint on competition",
      "Jurisdictional variation — some states heavily disfavor or ban non-competes entirely",
      "Whether narrower enforcement (e.g., limited to specific clients, shorter duration) is more defensible than the clause as written",
    ],
    expectedConcepts: [
      "restrictive covenant",
      "legitimate business interest",
      "reasonableness standard",
      "blue-penciling",
      "choice of law",
    ],
    modelApproach:
      "A strong answer doesn't assume the clause is automatically enforceable just because it was signed — it walks through the reasonableness test (scope, duration, geography) against the legitimate business interest, flags jurisdictional risk given how much this varies by state, and considers whether the client should seek narrower, more defensible relief.",
    furtherReading: [
      "State-by-state non-compete enforceability (e.g., California's near-total ban vs. other states)",
      "Legitimate business interest doctrine in restrictive covenants",
      "Blue-penciling and judicial modification of overbroad clauses",
    ],
  },
];
