import type { CaseStudy } from "@/lib/caseStudyContent";
import type { Fundamental } from "@/lib/caseStudyFundamentals";

/**
 * Politics / Legislative Negotiation: the fundamentals checklist and the case bank
 * for this category, kept together so they can be written and reviewed as
 * one unit. Registered in lib/cases/index.ts.
 *
 * Written to be jurisdiction-neutral: the same case bank is shown to users in
 * presidential, semi-presidential, and parliamentary-coalition systems alike,
 * so scenarios avoid any single country's institutions, statutes, or thresholds.
 */
export const POLITICS_LEGISLATIVE_NEGOTIATION_FUNDAMENTALS: Fundamental[] = [
  { id: "pol-legislative-vote-counting", label: "Running an accurate whip/vote count before scheduling a vote and reading a delayed vote as a signal the count came up short" },
  { id: "pol-legislative-logrolling", label: "Using logrolling — trading support across unrelated priorities — to convert opposition or indifference into votes" },
  { id: "pol-legislative-omnibus-bundling", label: "Bundling unrelated provisions into a single package bill to assemble a majority that separate votes could not produce" },
  { id: "pol-legislative-bill-splitting", label: "Splitting a bill into separate vehicles to isolate an unpopular provision from one that can pass on its own" },
  { id: "pol-legislative-poison-pill", label: "Recognizing a poison-pill amendment designed to fracture a coalition rather than genuinely improve the bill" },
  { id: "pol-legislative-agenda-control", label: "Reading agenda control (a bill kept off the schedule) as deliberate gatekeeping rather than evidence the bill lacks support" },
  { id: "pol-legislative-pivotal-threshold", label: "Identifying the actual pivotal threshold a bill must clear (simple majority, supermajority, or absolute majority of the full chamber) rather than assuming a bare headcount majority is enough" },
  { id: "pol-legislative-batna", label: "Assessing each side's BATNA (its outcome if no deal is reached) to judge how much leverage it holds and how much it should concede" },
  { id: "pol-legislative-constituent-signaling", label: "Managing the dual audience of a legislator's own electorate and the other negotiators, distinguishing public position from private negotiating posture" },
  { id: "pol-legislative-chamber-reconciliation", label: "Reconciling differing versions of a bill passed by two chambers, and weighing whether the second chamber holds genuine veto power or only a delaying/advisory role" },
  { id: "pol-legislative-executive-veto-bargaining", label: "Using a credible veto or assent-withholding threat to shape a bill's content before final passage, rather than waiting to exercise it" },
  { id: "pol-legislative-coalition-agreement", label: "Negotiating a governing coalition agreement that allocates portfolios and commits partners to a shared policy program" },
  { id: "pol-legislative-coalition-dispute", label: "Managing a mid-term coalition dispute over an issue the original coalition agreement never anticipated" },
  { id: "pol-legislative-confidence-vote", label: "Calculating the arithmetic of surviving, losing, or deliberately calling a confidence vote as a negotiating tool" },
  { id: "pol-legislative-government-formation", label: "Negotiating government formation (investiture) with potential partners after an inconclusive election produces no outright majority" },
  { id: "pol-legislative-minority-support-deal", label: "Negotiating case-by-case or budget support from outside parties for a minority government that holds no majority of its own" },
  { id: "pol-legislative-committee-negotiation", label: "Identifying committee-level deliberation, not the public floor debate, as the venue where a bill's substance is actually negotiated" },
  { id: "pol-legislative-elevated-threshold", label: "Recognizing when a bill needs an elevated threshold (constitutional or basic-law status) that forces a broader coalition than ordinary legislation" },
  { id: "pol-legislative-interim-funding", label: "Using a short-term interim funding measure to de-escalate a budget deadline while substantive negotiations continue" },
  { id: "pol-legislative-expedited-bypass", label: "Weighing the tradeoffs of invoking an expedited or special procedure that bypasses ordinary negotiation against its political cost" },
];

export const POLITICS_LEGISLATIVE_NEGOTIATION_CASES: CaseStudy[] = [
  {
    id: "pol-legislative-bipartisan-holdouts",
    profession: "politics",
    category: "Legislative Negotiation",
    title: "Winning Over Holdout Votes",
    scenario:
      "Your governing coalition's major infrastructure bill has broad backing but is three votes short of passage, with a small bloc of legislators outside the coalition withholding support over a specific provision they consider fiscally risky. Your own coalition's more progressive wing opposes removing or weakening that provision, and threatens to defect if it is cut outright. Leadership needs a path to passage before the parliamentary session's scheduled recess. You're advising on how to actually secure the three votes.",
    keyIssues: [
      "Whether the holdout provision can be modified without losing progressive-wing support entirely",
      "What the holdout bloc would genuinely accept versus their stated public position",
      "Whether splitting the contested provision into a separate bill could unlock the broader package",
      "Cost to the coalition's broader legislative agenda if the bill fails outright",
    ],
    expectedConcepts: [
      "legislative coalition-building",
      "logrolling",
      "vote counting",
      "bill severability",
      "compromise amendment",
    ],
    modelApproach:
      "A strong answer looks for a structural compromise — such as splitting the contested provision into separate legislation with its own timeline, or a modified version with safeguards — that could satisfy both the holdout bloc's fiscal concerns and the progressive wing's priorities, rather than assuming the two positions are fundamentally irreconcilable. It also runs an honest whip count rather than relying on the bloc's public statements.",
    furtherReading: [
      "Legislative coalition-building and vote-counting strategy",
      "Bill severability and legislative-vehicle strategy",
      "Comparative case studies in cross-bloc negotiation on major legislation",
    ],
    testsFundamentals: ["pol-legislative-vote-counting", "pol-legislative-bill-splitting"],
  },
  {
    id: "pol-legislative-shutdown-threat",
    profession: "politics",
    category: "Legislative Negotiation",
    title: "Averting a Budget Deadline",
    scenario:
      "Budget negotiations have stalled with days remaining before current spending authority expires, risking a lapse in government funding. A rival bloc is demanding an unrelated policy rider as a condition for its support; your side considers the rider a non-starter on principle. Both sides face public blame if funding lapses and services are disrupted. You're advising leadership on negotiation strategy for the final days before the deadline.",
    keyIssues: [
      "Whether a short-term interim funding measure could buy time without conceding on the rider",
      "Public messaging strategy to assign responsibility for the standoff without appearing solely obstructionist",
      "Identifying what each side actually needs versus their public negotiating position",
      "Cost-benefit of holding firm on principle against the real-world impact of a funding lapse",
    ],
    expectedConcepts: [
      "interim funding measure",
      "brinkmanship",
      "blame attribution strategy",
      "negotiating leverage",
      "political cost-benefit analysis",
    ],
    modelApproach:
      "A strong answer considers a short-term interim funding measure as a genuine tool to de-escalate the immediate deadline while negotiations continue, rather than treating the choice as binary (concede or let funding lapse), and is realistic about both the substantive stakes and the parallel public messaging battle over who bears blame.",
    furtherReading: [
      "Interim/continuing funding mechanisms in budget negotiations",
      "Brinkmanship and negotiation theory in legislative standoffs",
      "Comparative case studies of budget-deadline negotiations",
    ],
    testsFundamentals: ["pol-legislative-interim-funding", "pol-legislative-batna", "pol-legislative-constituent-signaling"],
  },
  {
    id: "pol-legislative-minority-budget-support",
    profession: "politics",
    category: "Legislative Negotiation",
    title: "Securing a Minority Government's Budget",
    premium: true,
    scenario:
      "You are chief of staff to the head of a minority government that controls only 38 percent of seats. Passing next year's budget requires support from a mid-sized party that is formally outside the government and does not want a coalition role. That party's leader is willing to let the budget pass but is demanding a policy concession in a completely unrelated area as the price of support or abstention. Internal party critics within your own government warn that giving in sets a precedent for every future budget vote. You have three weeks before the budget must clear the chamber.",
    keyIssues: [
      "Whether the demanded concession can be time-limited or narrowed to avoid setting an open-ended precedent",
      "What threshold of support (active vote versus abstention) is actually needed for the budget to pass",
      "How to preserve future negotiating room with this and other outside parties",
      "Risk that a public concession damages the government's standing with its own base",
    ],
    expectedConcepts: [
      "minority government",
      "confidence-and-supply arrangement",
      "pivotal threshold",
      "precedent-setting concession",
      "negotiating leverage",
    ],
    modelApproach:
      "A strong answer distinguishes between securing an active yes vote and merely securing an abstention, since a minority government often only needs the latter, and looks for a way to bound the concession (sunset clause, narrow scope) rather than treating it as an open-ended commitment. It weighs the precedent risk explicitly rather than treating this as a one-off transaction.",
    furtherReading: [
      "Minority government survival strategies in parliamentary systems",
      "Confidence-and-supply and case-by-case support arrangements",
      "Comparative studies of budget passage under minority governments",
    ],
    testsFundamentals: ["pol-legislative-minority-support-deal", "pol-legislative-pivotal-threshold"],
  },
  {
    id: "pol-legislative-coalition-formation",
    profession: "politics",
    category: "Legislative Negotiation",
    title: "Building a Governing Coalition",
    premium: true,
    scenario:
      "A national election has produced no outright majority for any single party. Your party won the most seats but needs at least one, and possibly two, partners to reach a governing majority. Two potential partner parties have overlapping but not identical priorities, and one insists on controlling a specific ministry your party wanted to keep for itself. Talks must produce either a workable coalition agreement or a credible path to a minority government within the next several weeks, or the mandate to form a government could pass to a rival. You're advising the party leader on how to structure the negotiation.",
    keyIssues: [
      "Sequencing: whether to negotiate with both potential partners simultaneously or in stages",
      "Which disputed portfolio, if any, is worth conceding to close the deal",
      "Whether a two-party coalition or a broader three-party arrangement is more durable",
      "What happens to negotiating leverage if talks drag on and the formation mandate is at risk of lapsing",
    ],
    expectedConcepts: [
      "coalition agreement",
      "portfolio allocation",
      "government formation",
      "exploratory talks",
      "negotiating leverage",
    ],
    modelApproach:
      "A strong answer treats portfolio allocation as a genuine bargaining chip rather than a fixed demand, proposes a sequencing strategy for the talks, and weighs the durability tradeoff between a leaner two-party coalition and a broader but more fragile three-party one, rather than optimizing only for speed.",
    furtherReading: [
      "Coalition theory and government formation in multi-party systems",
      "Portfolio allocation and coalition bargaining models",
      "Comparative case studies of post-election coalition negotiations",
    ],
    testsFundamentals: ["pol-legislative-coalition-agreement", "pol-legislative-government-formation"],
  },
  {
    id: "pol-legislative-coalition-dispute",
    profession: "politics",
    category: "Legislative Negotiation",
    title: "Holding a Coalition Together Mid-Term",
    premium: true,
    scenario:
      "Eighteen months into its term, your governing coalition faces its first real crisis: an unexpected fiscal shortfall requires emergency spending decisions the original coalition agreement never addressed. Your coalition partner wants deep cuts to a program your party considers a core commitment; your party wants new borrowing instead, which the partner rejects on principle. The partner has hinted, though not stated outright, that it could withdraw from the coalition if overruled. You're advising the head of government on how to resolve the dispute without losing the coalition.",
    keyIssues: [
      "Whether a face-saving middle option exists that neither side has proposed yet",
      "How credible the partner's implicit threat to leave the coalition actually is",
      "Whether the dispute should go to a formal coalition committee or be settled privately by the two leaders",
      "Political cost to both parties of a public coalition rupture versus a quiet compromise",
    ],
    expectedConcepts: [
      "coalition dispute resolution",
      "coalition committee",
      "confidence vote",
      "BATNA",
      "negotiating leverage",
    ],
    modelApproach:
      "A strong answer treats the partner's implicit exit threat as a BATNA to be tested rather than accepted at face value, looks for a structured venue (a coalition committee or equivalent) to resolve the dispute away from public view, and proposes a middle option that addresses the fiscal shortfall without requiring either side to fully abandon its position.",
    furtherReading: [
      "Coalition governance and dispute-resolution mechanisms",
      "Confidence votes as coalition-management tools",
      "Comparative case studies of mid-term coalition crises",
    ],
    testsFundamentals: ["pol-legislative-coalition-dispute", "pol-legislative-confidence-vote"],
  },
  {
    id: "pol-legislative-second-chamber-standoff",
    profession: "politics",
    category: "Legislative Negotiation",
    title: "Negotiating a Second-Chamber Standoff",
    premium: true,
    scenario:
      "A bill central to your government's program has passed the lower chamber, but the second chamber, currently controlled by a different political majority, has passed a substantially amended version. The two chambers' texts differ enough that the bill cannot simply be reconciled by picking one side's language. Your government believes it can eventually push its preferred version through, but doing so would take months and burn political capital it needs for other priorities. You're advising on how to approach the reconciliation process.",
    keyIssues: [
      "Whether the second chamber holds genuine veto power here or only the power to delay",
      "What the second chamber's negotiators would actually accept versus their opening position",
      "Whether the time and political cost of a prolonged standoff outweighs the value of holding firm",
      "How to sequence concessions so the lower chamber's core priorities survive reconciliation",
    ],
    expectedConcepts: [
      "chamber reconciliation",
      "second-chamber veto power",
      "negotiating leverage",
      "political capital",
      "compromise text",
    ],
    modelApproach:
      "A strong answer first establishes exactly what formal power the second chamber holds in this case (a genuine veto over this category of bill versus a delaying power the lower chamber can ultimately override), since that determines how much must actually be conceded, and then proposes a sequenced set of concessions rather than an all-or-nothing standoff.",
    furtherReading: [
      "Bicameral reconciliation processes and second-chamber powers",
      "Comparative studies of upper/second-chamber veto strength",
      "Case studies in prolonged inter-chamber negotiation",
    ],
    testsFundamentals: ["pol-legislative-chamber-reconciliation", "pol-legislative-batna"],
  },
  {
    id: "pol-legislative-executive-veto-threat",
    profession: "politics",
    category: "Legislative Negotiation",
    title: "Negotiating Around a Veto Threat",
    premium: true,
    scenario:
      "Your legislature has passed a bill by a comfortable but not overwhelming margin. The head of state or government whose formal assent is required before the bill can take effect has signaled, through informal channels, that a specific provision will be rejected unless it is changed. Overcoming an outright rejection would require a considerably larger majority than the bill currently has, one your coalition is unlikely to reach. You're advising legislative leaders on whether to preemptively amend the bill or call the bluff.",
    keyIssues: [
      "How credible the rejection threat actually is versus a negotiating tactic",
      "Whether the disputed provision is worth the risk of losing the entire bill",
      "What amendment would satisfy the objection without abandoning the bill's core purpose",
      "Realistic odds of assembling the larger majority needed to overcome an outright rejection",
    ],
    expectedConcepts: [
      "veto bargaining",
      "credible threat",
      "pivotal threshold",
      "assent-withholding power",
      "compromise amendment",
    ],
    modelApproach:
      "A strong answer treats the informal signal as a genuine bargaining move to be tested through back-channel clarification rather than either dismissed or capitulated to immediately, and weighs the realistic odds of assembling the larger majority an outright override would require before recommending whether to amend preemptively or hold firm.",
    furtherReading: [
      "Veto bargaining theory and pre-emptive legislative accommodation",
      "Comparative assent and promulgation powers across political systems",
      "Case studies of legislation revised to avoid a credible rejection threat",
    ],
    testsFundamentals: ["pol-legislative-pivotal-threshold", "pol-legislative-executive-veto-bargaining"],
  },
  {
    id: "pol-legislative-poison-pill-amendment",
    profession: "politics",
    category: "Legislative Negotiation",
    title: "Responding to a Poison-Pill Amendment",
    premium: true,
    scenario:
      "A popular bill backed by your coalition is heading toward an easy floor victory. An opposition legislator has just introduced an amendment adding a genuinely controversial, unrelated provision that your coalition's more cautious members could not accept, clearly intended to fracture your coalition's support rather than to improve the bill. If the amendment passes, the bill's core purpose may become politically impossible to pass. You're advising the coalition whip on how to respond before the vote on the amendment itself.",
    keyIssues: [
      "Whether the amendment can be defeated on a procedural vote before it forces a substantive choice",
      "How to keep cautious coalition members from being peeled off by the amendment's framing",
      "Whether publicly naming the amendment as a poison pill helps or backfires politically",
      "What happens to the bill's timeline if the amendment vote itself becomes a prolonged fight",
    ],
    expectedConcepts: [
      "poison-pill amendment",
      "coalition management",
      "procedural vote",
      "agenda control",
      "heresthetic",
    ],
    modelApproach:
      "A strong answer recognizes the amendment as a heresthetic move aimed at restructuring the vote rather than a genuine policy proposal, looks for a procedural mechanism to dispose of it before it reaches a substantive vote, and has a plan for keeping wavering coalition members focused on the bill's core purpose rather than the amendment's framing.",
    furtherReading: [
      "Heresthetic and strategic manipulation of legislative choices",
      "Poison-pill amendment tactics and procedural defenses",
      "Case studies of coalitions fractured by unrelated riders",
    ],
    testsFundamentals: ["pol-legislative-poison-pill", "pol-legislative-agenda-control"],
  },
  {
    id: "pol-legislative-end-of-session-omnibus",
    profession: "politics",
    category: "Legislative Negotiation",
    title: "Assembling an End-of-Session Package",
    premium: true,
    scenario:
      "With only two weeks left before the legislative session ends, a dozen separate bills your coalition cares about are all stalled at different stages, none individually able to command a majority on its own. Party whips have proposed combining several of them into a single omnibus package, trading a provision one faction wants for a provision another faction wants, to get everything through before the deadline. Some legislators privately oppose parts of the package but might accept the bundle as a whole. You're advising leadership on how to assemble the final package.",
    keyIssues: [
      "Which provisions are genuinely complementary trades versus ones that will alienate more votes than they gain",
      "Whether bundling risks losing legislators who could accept individual pieces but reject the whole package",
      "How to sequence the final negotiation given the hard session deadline",
      "What happens to the stalled bills individually if the omnibus package itself fails",
    ],
    expectedConcepts: [
      "omnibus bill",
      "logrolling",
      "vote counting",
      "legislative deadline pressure",
      "package negotiation",
    ],
    modelApproach:
      "A strong answer runs an honest count of who the bundle actually wins versus who it risks losing, since bundling can backfire if it forces a legislator who would support most pieces individually to vote against the whole package over one objectionable provision, and sequences the trades to lock in the most fragile support first.",
    furtherReading: [
      "Logrolling and omnibus bill strategy in legislative negotiation",
      "Deadline pressure and end-of-session legislative dynamics",
      "Case studies of large package bills assembled from stalled individual measures",
    ],
    testsFundamentals: ["pol-legislative-omnibus-bundling", "pol-legislative-logrolling"],
  },
  {
    id: "pol-legislative-elevated-threshold-reform",
    profession: "politics",
    category: "Legislative Negotiation",
    title: "Passing a Constitutional-Level Reform",
    premium: true,
    scenario:
      "Your government wants to reform the electoral system, a change that in your jurisdiction requires an elevated threshold well beyond an ordinary majority, such as a supermajority or passage in successive sessions with an election in between. Your coalition alone cannot reach that threshold and needs genuine support from at least part of the opposition, which has little short-term incentive to hand your government a political win. You're advising on a strategy to build the broader coalition this reform actually requires.",
    keyIssues: [
      "What would make this reform genuinely attractive to opposition legislators rather than purely beneficial to your side",
      "Whether phasing the reform (so it does not take effect until after the next election) changes the opposition's incentives",
      "Realistic timeline given that the elevated threshold may require action across more than one legislative session",
      "Risk that a reform perceived as one-sided collapses even if enough votes exist on paper",
    ],
    expectedConcepts: [
      "elevated threshold legislation",
      "supermajority",
      "cross-bloc coalition-building",
      "phased implementation",
      "electoral reform",
    ],
    modelApproach:
      "A strong answer treats the elevated threshold as the binding constraint that reshapes the whole strategy, not a detail to solve later, and looks for design choices (delayed effective date, reciprocal guarantees) that give opposition legislators a genuine reason to support a reform that does not obviously favor them, rather than assuming raw persuasion alone will close the gap.",
    furtherReading: [
      "Constitutional and basic-law amendment thresholds across political systems",
      "Electoral reform negotiation and cross-party incentive design",
      "Comparative case studies of supermajority-threshold legislation",
    ],
    testsFundamentals: ["pol-legislative-vote-counting", "pol-legislative-elevated-threshold"],
  },
  {
    id: "pol-legislative-fragmented-formation-stalemate",
    profession: "politics",
    category: "Legislative Negotiation",
    title: "Breaking a Government-Formation Stalemate",
    premium: true,
    scenario:
      "Two rounds of investiture votes have already failed after the last election produced a chamber split across five parties, none close to a majority. Your party leader has been asked to make a third attempt at forming a government before the mandate passes to a rival or the chamber is dissolved for new elections. Two smaller parties are each individually willing to support your leader, but their demands are mutually incompatible on one major issue. You're advising on how to actually reach a majority in this third attempt.",
    keyIssues: [
      "Whether the two smaller parties' incompatible demands can be sequenced or narrowed rather than resolved head-on",
      "Whether abstention from one or both parties, rather than active support, is enough to clear the threshold",
      "Cost of a third failed attempt versus the cost of a further compromise neither party loves",
      "What leverage new elections would actually change for each of the parties involved",
    ],
    expectedConcepts: [
      "government formation",
      "investiture vote",
      "pivotal threshold",
      "abstention as passive support",
      "negotiating leverage",
    ],
    modelApproach:
      "A strong answer distinguishes between what an active governing majority requires and the lower threshold an abstention-based approach might clear, and treats the incompatible demands as a sequencing problem (what can be delivered to each party at different times) rather than assuming a single deal must satisfy both simultaneously.",
    furtherReading: [
      "Government formation theory in fragmented multi-party chambers",
      "Investiture procedures and abstention-based support arrangements",
      "Comparative case studies of repeated failed formation attempts",
    ],
    testsFundamentals: ["pol-legislative-pivotal-threshold", "pol-legislative-government-formation"],
  },
  {
    id: "pol-legislative-committee-markup-fight",
    profession: "politics",
    category: "Legislative Negotiation",
    title: "Winning the Fight in Committee",
    premium: true,
    scenario:
      "A bill you support has drawn heavy public attention, with advocacy groups on both sides holding press events outside the chamber. The real decisions, however, are happening in the committee responsible for the bill, where a handful of members are quietly negotiating amendments that will determine the bill's substance long before any floor vote. One committee member from your own coalition is under pressure from constituents to publicly oppose a provision she privately supports. You're advising her on how to navigate the committee process.",
    keyIssues: [
      "How to distinguish which amendments are genuine substantive fights versus symbolic positioning for public consumption",
      "How the committee member can manage a public position that differs from her private negotiating stance without losing credibility on either side",
      "Whether to push contested provisions to a public committee vote or resolve them informally first",
      "What happens to a provision if it survives committee but was won as an informal concession rather than a recorded vote",
    ],
    expectedConcepts: [
      "committee markup",
      "constituent signaling",
      "public versus private negotiating posture",
      "informal negotiation",
      "legislative substance versus floor theater",
    ],
    modelApproach:
      "A strong answer treats the committee, not the public floor debate, as the actual site of the negotiation, and gives the committee member a concrete way to manage her dual audience — a public statement that reflects genuine constituent concern while she works privately toward the outcome she actually wants — rather than telling her to simply pick one posture.",
    furtherReading: [
      "Committee-level negotiation and markup procedure",
      "Public position versus private negotiating posture in legislatures",
      "Case studies of substantive deals reached in committee rather than on the floor",
    ],
    testsFundamentals: ["pol-legislative-constituent-signaling", "pol-legislative-committee-negotiation"],
  },
  {
    id: "pol-legislative-confidence-vote-gambit",
    profession: "politics",
    category: "Legislative Negotiation",
    title: "Calling a Confidence Vote as Leverage",
    premium: true,
    scenario:
      "A stalled reform bill central to your government's program cannot secure enough votes from within your own coalition, where several backbenchers have quietly signaled they may abstain. The head of government is considering formally tying the bill to a confidence vote, a move that would force wavering coalition members to choose between passing the bill or bringing down the government they belong to. The tactic could resolve the standoff immediately, or it could backfire and trigger the very collapse it is meant to prevent. You're advising on whether to use this tool and how to prepare for either outcome.",
    keyIssues: [
      "Whether the wavering members' abstention threat is credible enough that a confidence vote would actually flip them",
      "What happens to the government and the bill if the gambit fails and confidence is lost",
      "Whether a less drastic tool could achieve the same result without the downside risk",
      "How to prepare a fallback plan in case the confidence vote does not resolve as intended",
    ],
    expectedConcepts: [
      "confidence vote",
      "credible threat",
      "coalition discipline",
      "negotiating leverage",
      "downside risk assessment",
    ],
    modelApproach:
      "A strong answer treats calling a confidence vote as a high-variance tool of last resort, testing first whether the wavering members' resistance is genuine or simply a bargaining posture, and insists on a concrete fallback plan for a loss before recommending the gambit, rather than presenting it as a clean way to force compliance.",
    furtherReading: [
      "Confidence votes as legislative discipline and negotiation tools",
      "Government stability and confidence-vote gambits in parliamentary systems",
      "Case studies of confidence votes that succeeded or backfired",
    ],
    testsFundamentals: ["pol-legislative-executive-veto-bargaining", "pol-legislative-confidence-vote"],
  },
  {
    id: "pol-legislative-expedited-procedure-bypass",
    profession: "politics",
    category: "Legislative Negotiation",
    title: "Weighing an Expedited Procedure",
    premium: true,
    scenario:
      "An urgent measure your government wants has stalled in ordinary negotiation, with the opposition using every available procedural delay to prevent a vote before a fast-approaching deadline. Your jurisdiction's rules allow the government to invoke a special expedited procedure for this category of measure, one that would let it pass largely without further amendment or delay, but using it would be seen as bypassing normal deliberation and could provoke a retaliatory no-confidence motion or lasting damage to relations with potential future coalition partners. You're advising on whether to invoke the procedure or keep negotiating.",
    keyIssues: [
      "Whether the measure's urgency genuinely justifies the political cost of bypassing ordinary negotiation",
      "How the opposition and potential future partners would likely respond if the procedure is invoked",
      "Whether a narrower version of the measure could pass through ordinary channels before the deadline",
      "What precedent invoking the procedure sets for future stalled negotiations",
    ],
    expectedConcepts: [
      "expedited legislative procedure",
      "agenda control",
      "political cost-benefit analysis",
      "retaliatory no-confidence motion",
      "negotiating precedent",
    ],
    modelApproach:
      "A strong answer weighs the expedited procedure as a real but costly tool, not a free shortcut, explicitly pricing in the retaliation risk and the precedent it sets, and checks whether a narrower measure could still clear the deadline through ordinary negotiation before recommending the bypass.",
    furtherReading: [
      "Expedited and special legislative procedures across political systems",
      "Political cost-benefit analysis of bypassing ordinary deliberation",
      "Case studies of governments invoking fast-track procedures under deadline pressure",
    ],
    testsFundamentals: ["pol-legislative-agenda-control", "pol-legislative-expedited-bypass"],
  },
];
