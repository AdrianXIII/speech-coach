import type { CaseStudy } from "@/lib/caseStudyContent";
import type { Fundamental } from "@/lib/caseStudyFundamentals";

/**
 * Politics / Crisis Response: the fundamentals checklist and the case bank
 * for this category, kept together so they can be written and reviewed as
 * one unit. Registered in lib/cases/index.ts.
 */
export const POLITICS_CRISIS_RESPONSE_FUNDAMENTALS: Fundamental[] = [];

export const POLITICS_CRISIS_RESPONSE_CASES: CaseStudy[] = [
  {
    id: "pol-crisis-disaster-response",
    profession: "politics",
    category: "Crisis Response",
    title: "Coordinating Disaster Response",
    scenario:
      "A major flood has devastated a region of your country, displacing 100,000 people. Local officials are requesting immediate federal resources, but initial reports are inconsistent about the scale of damage and specific needs. Political opponents are already criticizing the pace of the response, even as agencies are still assessing the situation. You're advising on the next public statement and resource deployment decision.",
    keyIssues: [
      "Balancing rapid visible action against the risk of misallocating resources based on incomplete information",
      "Public communication that shows urgency without overpromising on timelines that can't be met",
      "Coordination challenges between federal, state, and local authorities in the response",
      "Managing political criticism without letting it distort operational priorities",
    ],
    expectedConcepts: [
      "emergency management coordination",
      "crisis communication",
      "federalism in disaster response",
      "resource allocation under uncertainty",
      "public trust",
    ],
    modelApproach:
      "A strong answer prioritizes deploying resources for immediate life-safety needs even under incomplete information, rather than waiting for perfect data, while being honest in public communication about what is and isn't yet known — and treats political criticism as a communications challenge to manage, not a reason to change operational priorities reactively.",
    furtherReading: [
      "Emergency management coordination frameworks (e.g. FEMA's National Response Framework)",
      "Crisis communication best practices in government",
      "Federalism and intergovernmental coordination in disaster response",
    ],
  },
  {
    id: "pol-crisis-public-health",
    profession: "politics",
    category: "Crisis Response",
    title: "Public Health Emergency Messaging",
    scenario:
      "Health authorities have identified an emerging infectious disease outbreak with still-uncertain transmission and severity data. Early, cautious guidance risks being seen as an overreaction if the threat turns out to be mild; delayed action risks a severe outbreak if the threat is serious. Public trust in health authorities is already fragile from past inconsistent messaging. You're advising on the government's initial public communication.",
    keyIssues: [
      "Communicating genuine scientific uncertainty without either alarmism or false reassurance",
      "Precautionary action under uncertainty versus waiting for more complete data",
      "Rebuilding fragile public trust through consistent, transparent messaging",
      "Preparing the public for guidance that may change as more is learned",
    ],
    expectedConcepts: [
      "risk communication",
      "precautionary principle",
      "public health messaging",
      "institutional trust",
      "uncertainty communication",
    ],
    modelApproach:
      "A strong answer recommends transparent communication of what is and isn't known, framing precautionary measures as reasonable given uncertainty rather than certainty of severity, and explicitly prepares the public for guidance to evolve — addressing the trust deficit by being honest about uncertainty rather than projecting false confidence in either direction.",
    furtherReading: [
      "Risk communication frameworks in public health (CDC/WHO guidance)",
      "Precautionary principle in public health decision-making",
      "Research on public trust and health messaging consistency",
    ],
  },
  {
    id: "pol-crisis-coalition-collapse-premium",
    profession: "politics",
    category: "Crisis Response",
    title: "A Coalition Government on the Brink",
    premium: true,
    scenario:
      "You advise the head of government in a coalition administration. The junior coalition partner has just threatened to withdraw support over a contested policy unless it's reversed within 48 hours, which would trigger a confidence vote your government would likely lose. Reversing the policy publicly would look like capitulation and damage credibility with your own base ahead of elections next year. You have less than two days to recommend a path forward.",
    keyIssues: [
      "Whether a face-saving compromise exists that lets the junior partner claim a partial win without a full reversal",
      "Risk calculus of forcing a confidence vote versus conceding",
      "Managing your own base's perception of the outcome regardless of which path is chosen",
      "Time pressure and what can realistically be negotiated in 48 hours versus what needs more time",
    ],
    expectedConcepts: [
      "coalition governance",
      "confidence vote",
      "face-saving compromise",
      "political credibility",
      "brinkmanship",
    ],
    modelApproach:
      "A strong answer looks for a substantive but narrow concession — e.g., a review clause, a delayed implementation, or a carve-out — that gives the junior partner a credible claim to have moved the policy without a full public reversal, while being realistic about the confidence-vote math if no compromise is reachable in time.",
    furtherReading: [
      "Coalition government stability and confidence vote mechanics",
      "Face-saving negotiation tactics in political crises",
      "Case studies in coalition breakdown and recovery",
    ],
  },
];
