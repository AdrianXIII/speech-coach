import type { CaseStudy } from "@/lib/caseStudyContent";
import type { Fundamental } from "@/lib/caseStudyFundamentals";

/**
 * Politics / Campaign Strategy: the fundamentals checklist and the case bank
 * for this category, kept together so they can be written and reviewed as
 * one unit. Registered in lib/cases/index.ts.
 */
export const POLITICS_CAMPAIGN_STRATEGY_FUNDAMENTALS: Fundamental[] = [];

export const POLITICS_CAMPAIGN_STRATEGY_CASES: CaseStudy[] = [
  {
    id: "pol-campaign-scandal-control",
    profession: "politics",
    category: "Campaign Strategy",
    title: "Mid-Campaign Damage Control",
    scenario:
      "Six weeks before an election, a decade-old but genuine controversy involving your candidate has resurfaced with new documentation, confirming what was previously only alleged. Polling shows the race tightening. Your campaign must decide how to respond before the story dominates the final weeks.",
    keyIssues: [
      "Whether to acknowledge and address the issue directly versus minimizing engagement",
      "Distinguishing genuine accountability from a defensive posture that prolongs the story",
      "Timing: addressing it immediately and fully versus a drawn-out, incremental response",
      "Refocusing the remaining campaign narrative on substantive issues without appearing to dodge",
    ],
    expectedConcepts: [
      "crisis communication",
      "news cycle management",
      "accountability messaging",
      "narrative control",
      "damage control",
    ],
    modelApproach:
      "A strong answer generally favors a full, direct acknowledgment early — since incremental revelations prolong news cycles far more than a single complete statement — paired with genuine accountability language, and then a deliberate pivot back to substantive campaign issues rather than continuing to relitigate the story.",
    furtherReading: [
      "Crisis communication and the 'rip the band-aid off' strategy in political scandals",
      "News cycle dynamics and story lifecycle management",
      "Case studies in political scandal response effectiveness",
    ],
  },
  {
    id: "pol-campaign-debate-attack",
    profession: "politics",
    category: "Campaign Strategy",
    title: "Preparing for a Debate Attack",
    scenario:
      "Your opponent is expected to attack your signature policy proposal in the upcoming debate, citing a genuine implementation flaw identified by independent analysts that your team has not yet fully resolved. You're preparing the candidate's response strategy.",
    keyIssues: [
      "Whether to concede the flaw exists while defending the policy's overall merit, or minimize it",
      "Credibility cost of denying a genuine, independently-verified flaw",
      "Redirecting to comparative strengths versus the opponent's own policy record",
      "Preparing a substantive fix or refinement to offer, not just a defensive talking point",
    ],
    expectedConcepts: [
      "debate strategy",
      "policy credibility",
      "comparative messaging",
      "issue ownership",
      "concede-and-pivot technique",
    ],
    modelApproach:
      "A strong answer recommends acknowledging the legitimate flaw rather than denying well-documented facts (which risks a bigger credibility hit if pressed), pairs the acknowledgment with a concrete refinement or fix, and pivots to a comparative contrast with the opponent's own record — rather than pure defense.",
    furtherReading: [
      "Debate strategy and concede-and-pivot messaging techniques",
      "Policy credibility and voter trust research",
      "Comparative political messaging strategy",
    ],
  },
];
