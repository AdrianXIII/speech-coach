import type { CaseStudy } from "@/lib/caseStudyContent";
import type { Fundamental } from "@/lib/caseStudyFundamentals";

/**
 * Politics / Foreign Policy & Diplomacy: the fundamentals checklist and the case bank
 * for this category, kept together so they can be written and reviewed as
 * one unit. Registered in lib/cases/index.ts.
 */
export const POLITICS_FOREIGN_POLICY_DIPLOMACY_FUNDAMENTALS: Fundamental[] = [];

export const POLITICS_FOREIGN_POLICY_DIPLOMACY_CASES: CaseStudy[] = [
  {
    id: "pol-foreign-trade-dispute",
    profession: "politics",
    category: "Foreign Policy & Diplomacy",
    title: "Negotiating a Trade Dispute",
    scenario:
      "A key trading partner has imposed unexpected tariffs on your country's agricultural exports, citing unfair subsidy practices your government disputes. Domestic farmers are demanding retaliation; your foreign ministry warns that escalation could jeopardize a broader security cooperation agreement with the same partner currently under negotiation. You must advise on the government's response.",
    keyIssues: [
      "Balancing domestic political pressure for retaliation against broader strategic relationship costs",
      "Whether the underlying subsidy dispute has genuine merit worth contesting through trade bodies (e.g. WTO) versus bilateral negotiation",
      "Signaling resolve without triggering an escalatory spiral",
      "Linkage risk: whether tying this dispute to the security agreement helps or harms both objectives",
    ],
    expectedConcepts: [
      "trade retaliation",
      "linkage diplomacy",
      "World Trade Organization dispute resolution",
      "escalation dynamics",
      "domestic political constraints",
    ],
    modelApproach:
      "A strong answer resists purely reactive retaliation and considers a calibrated response — pursuing formal trade dispute mechanisms while keeping the security negotiation on a separate track — showing awareness that domestic political pressure and long-term strategic interest can pull in different directions and need explicit reconciliation.",
    furtherReading: [
      "WTO dispute settlement mechanisms",
      "Linkage diplomacy and its risks",
      "Game theory in trade negotiation and retaliation",
    ],
  },
  {
    id: "pol-foreign-ally-crisis",
    profession: "politics",
    category: "Foreign Policy & Diplomacy",
    title: "An Ally Acts Unilaterally",
    scenario:
      "A close allied nation has just conducted a military strike against a third country without consulting your government, despite a mutual consultation agreement. Domestic and international media are asking whether your government endorses the action. Your alliance is strategically important, but the unilateral strike risks destabilizing the region and undermining your credibility with other partners who expected consultation.",
    keyIssues: [
      "Immediate public messaging that neither endorses the action nor ruptures the alliance",
      "Private diplomatic response to the ally regarding the consultation agreement breach",
      "Reassurance needed for other partners questioning the alliance's reliability",
      "Distinguishing disagreement with the process (lack of consultation) from the substance of the action",
    ],
    expectedConcepts: [
      "alliance management",
      "strategic ambiguity",
      "public vs. private diplomacy",
      "credibility and reassurance",
      "consultation mechanisms",
    ],
    modelApproach:
      "A strong answer separates public messaging (careful, non-committal on substance, but clear that consultation matters) from private diplomatic channels (a direct, firmer message to the ally about the breach), and addresses third-party partner reassurance as a distinct, necessary task rather than an afterthought.",
    furtherReading: [
      "Alliance management theory in international relations",
      "Public vs. private diplomatic signaling",
      "Case studies in allied unilateral action and alliance strain",
    ],
  },
];
