import type { CaseStudy } from "@/lib/caseStudyContent";
import type { Fundamental } from "@/lib/caseStudyFundamentals";

/**
 * Politics / Legislative Negotiation: the fundamentals checklist and the case bank
 * for this category, kept together so they can be written and reviewed as
 * one unit. Registered in lib/cases/index.ts.
 */
export const POLITICS_LEGISLATIVE_NEGOTIATION_FUNDAMENTALS: Fundamental[] = [];

export const POLITICS_LEGISLATIVE_NEGOTIATION_CASES: CaseStudy[] = [
  {
    id: "pol-legislative-bipartisan-holdouts",
    profession: "politics",
    category: "Legislative Negotiation",
    title: "Winning Over Holdout Votes",
    scenario:
      "Your major infrastructure bill has broad support but is three votes short of passage, with a small group of moderate legislators from the opposing party withholding support over a specific provision they consider fiscally risky. Your own party's progressive wing opposes removing or weakening that provision. You're advising leadership on how to secure passage.",
    keyIssues: [
      "Whether the holdout provision can be modified without losing progressive support entirely",
      "What the holdouts would genuinely accept versus their stated public position",
      "Sequencing: whether a separate vehicle for the contested provision could unlock the broader bill",
      "Cost of failure to the broader legislative agenda if the bill doesn't pass",
    ],
    expectedConcepts: [
      "legislative coalition-building",
      "logrolling",
      "vote counting",
      "bill severability",
      "compromise amendment",
    ],
    modelApproach:
      "A strong answer looks for a structural compromise — such as splitting the contested provision into separate legislation with its own timeline, or a modified version with safeguards — that could satisfy both the holdouts' fiscal concerns and the progressive wing's priorities, rather than assuming the two positions are fundamentally irreconcilable.",
    furtherReading: [
      "Legislative coalition-building and vote-counting strategy",
      "Bill severability and legislative vehicle strategy",
      "Case studies in bipartisan negotiation on major legislation",
    ],
  },
  {
    id: "pol-legislative-shutdown-threat",
    profession: "politics",
    category: "Legislative Negotiation",
    title: "Averting a Government Shutdown",
    scenario:
      "Budget negotiations have stalled with days remaining before funding expires, risking a government shutdown. The opposing party is demanding a policy rider unrelated to spending levels as a condition for their support; your side considers the rider a non-starter on principle. Both sides face political blame if a shutdown occurs. You're advising on negotiation strategy for the final days.",
    keyIssues: [
      "Whether a short-term continuing resolution could buy time without conceding on the rider",
      "Public messaging strategy to assign responsibility for the standoff without appearing solely obstructionist",
      "Identifying what each side actually needs versus their public negotiating position",
      "Cost-benefit of holding firm on principle against the real-world impact of a shutdown",
    ],
    expectedConcepts: [
      "continuing resolution",
      "brinkmanship",
      "blame attribution strategy",
      "negotiating leverage",
      "political cost-benefit analysis",
    ],
    modelApproach:
      "A strong answer considers a short-term continuing resolution as a genuine tool to de-escalate the immediate deadline while negotiations continue, rather than treating the choice as binary (concede or shut down), and is realistic about both the substantive stakes and the political messaging battle happening in parallel.",
    furtherReading: [
      "Continuing resolutions and government funding mechanisms",
      "Brinkmanship and negotiation theory in legislative standoffs",
      "Historical case studies of government shutdown negotiations",
    ],
  },
];
