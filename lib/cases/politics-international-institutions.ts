import type { CaseStudy } from "@/lib/caseStudyContent";
import type { Fundamental } from "@/lib/caseStudyFundamentals";

/**
 * Politics / International & Regional Institutions: the fundamentals checklist
 * and the case bank for this category, kept together so they can be written
 * and reviewed as one unit. Registered in lib/cases/index.ts.
 *
 * Scope note: distinct from Foreign Policy & Diplomacy, which is framed
 * around bilateral, state-to-state diplomacy. This category is about
 * operating from inside a multilateral or supranational institutional
 * structure — councils, secretariats, dispute panels, weighted votes,
 * accession processes — rather than government-to-government negotiation.
 *
 * Written to be jurisdiction-neutral: the same case bank is shown to users
 * in the US, Germany, France, Spain, and Sweden alike, so scenarios describe
 * institutional mechanics generically (a regional bloc, a multilateral
 * alliance, a global trade body, a supranational court) rather than naming
 * any single country's institutions, treaty, or body by its proper name.
 */
export const POLITICS_INTERNATIONAL_INSTITUTIONS_FUNDAMENTALS: Fundamental[] = [
  { id: "pol-intl-consensus-unanimity", label: "Navigating a consensus or unanimity rule where a single member state can block the whole body's action" },
  { id: "pol-intl-veto-player-management", label: "Managing a veto-holding member of an institution's governing council to avoid outright paralysis" },
  { id: "pol-intl-weighted-voting", label: "Working a weighted or qualified-majority voting formula to assemble the specific threshold a proposal actually needs" },
  { id: "pol-intl-rotating-presidency", label: "Using a rotating chair or presidency role to set agenda and broker compromise, while recognizing its real limits as a position of influence rather than command" },
  { id: "pol-intl-dispute-settlement", label: "Choosing a formal multilateral dispute-settlement or arbitration mechanism over unilateral retaliation, and weighing what that choice costs and buys" },
  { id: "pol-intl-burden-sharing", label: "Negotiating a burden-sharing formula (funding, troop contributions, quotas) across member states with very different capacities and incentives" },
  { id: "pol-intl-coalition-building-blocs", label: "Building a voting coalition across regional or ideological blocs inside a large multilateral assembly" },
  { id: "pol-intl-mandate-renewal", label: "Managing the politics of renewing a multilateral mission's, program's, or institution's mandate and funding before it lapses" },
  { id: "pol-intl-domestic-ratification", label: "Reconciling a binding multilateral or supranational rule with domestic political resistance to actually implementing it" },
  { id: "pol-intl-accession-conditionality", label: "Using membership or accession conditionality as leverage to extract reform from a candidate state, while weighing the cost of moving too slowly or too fast" },
  { id: "pol-intl-supranational-supremacy", label: "Navigating a supranational court or legal order's claim to primacy over domestic law when the two visibly conflict" },
  { id: "pol-intl-secretariat-autonomy", label: "Distinguishing an institution's independent secretariat or executive staff's own agenda from the member states' actual collective instructions" },
  { id: "pol-intl-institutional-reform", label: "Negotiating a reform of an institution's own governance or voting rules, where the current winners have little incentive to agree" },
  { id: "pol-intl-collective-defense-clause", label: "Deciding whether and how to invoke a multilateral alliance's mutual-defense or consultation clause when the triggering threshold is genuinely ambiguous" },
  { id: "pol-intl-funding-arrears-leverage", label: "Responding to a member state's funding arrears or withdrawal threat without letting it become a template other members copy" },
  { id: "pol-intl-regulatory-harmonization", label: "Negotiating a harmonized multilateral standard against organized domestic industry resistance without appearing to simply protect national firms" },
  { id: "pol-intl-peer-review-soft-law", label: "Using a non-binding peer-review or soft-law mechanism to shape a member's behavior without any formal enforcement power behind it" },
  { id: "pol-intl-overlapping-mandates", label: "Coordinating a crisis response across multiple institutions with overlapping mandates so the response does not fracture into turf competition" },
];

export const POLITICS_INTERNATIONAL_INSTITUTIONS_CASES: CaseStudy[] = [
  {
    id: "pol-intl-single-vote-block",
    profession: "politics",
    category: "International & Regional Institutions",
    title: "Blocked by a Single Vote",
    scenario:
      "Your country currently holds the rotating chair of a regional political and economic bloc's council. A joint declaration condemning a fast-moving security crisis just outside the bloc's borders needs unanimous support to be adopted before an international summit in four days, and every member but one has signed on. The holdout, a smaller member with close commercial ties to the state the declaration would criticize, is not merely negotiating terms; it appears willing to block the statement outright regardless of what concessions are offered. Other members are growing frustrated and some are floating the idea of issuing the statement outside the bloc's formal structure entirely, which would be faster but would weaken the bloc's collective voice going forward.",
    keyIssues: [
      "Whether the holdout's objection is a genuine, negotiable concern or a position it will not move off regardless of concessions",
      "What the chair's rotating role can actually deliver here versus what it cannot (the chair brokers, it does not override)",
      "Cost to the bloc's long-term credibility if members route around the unanimity rule entirely versus the cost of no statement at all",
      "Whether a watered-down statement that the holdout can accept is worse than no joint statement, given what each signals to outside observers",
    ],
    expectedConcepts: [
      "unanimity rule",
      "rotating chair/presidency",
      "veto player",
      "coalition of the willing",
      "institutional credibility",
    ],
    modelApproach:
      "A strong answer tests whether the holdout's objection is substantive (addressable through text changes) or structural (an unmovable red line tied to its own bilateral relationship) before deciding how to spend the remaining time, and treats the chair's leverage honestly — real but limited to agenda-setting and brokering, not command. It weighs the precedent of bypassing the bloc's own rule against the cost of silence, and looks for a middle path, such as a statement from the willing members outside the bloc's formal name, that preserves both unity-in-principle and urgency.",
    furtherReading: [
      "Consensus and unanimity decision rules in regional and multilateral bodies",
      "The limits and real uses of a rotating chair/presidency",
      "Comparative case studies of single-member blocking coalitions",
    ],
    testsFundamentals: ["pol-intl-consensus-unanimity", "pol-intl-rotating-presidency", "pol-intl-veto-player-management"],
  },
  {
    id: "pol-intl-supranational-ruling-collision",
    profession: "politics",
    category: "International & Regional Institutions",
    title: "A Supranational Ruling Collides With Domestic Law",
    scenario:
      "A supranational court attached to a regional union your country belongs to has just struck down a domestic regulation your government considers central to its mandate, ruling it incompatible with the union's founding treaties. Several legislators are publicly arguing your parliament should simply decline to implement the ruling, citing national sovereignty and the specific domestic constitutional provision the regulation was built on. Your government has thirty days to respond before the union's executive body can initiate a formal infringement process, which could eventually carry financial penalties. You are advising the head of government on how to respond without either capitulating in a way that looks politically weak or triggering a institutional confrontation with costs well beyond this one regulation.",
    keyIssues: [
      "What the supranational court's ruling actually requires versus what domestic commentators are claiming it requires",
      "Whether open defiance is realistically sustainable once a formal infringement process and financial penalties are in play",
      "Options between full compliance and outright defiance, such as a narrowly tailored legislative fix or a request for a transition period",
      "Long-term cost to your country's standing and leverage within the union if this becomes a pattern rather than an isolated dispute",
    ],
    expectedConcepts: [
      "supranational legal supremacy",
      "pooled sovereignty",
      "infringement process",
      "constitutional courts and EU-style primacy conflicts",
      "compliance versus defiance costs",
    ],
    modelApproach:
      "A strong answer separates the legal question (what the ruling actually requires) from the political one (what domestic audiences are demanding), and treats outright non-compliance as a real but high-cost option rather than dismissing it reflexively or embracing it reflexively. It looks for a narrowly tailored path — amending the specific provision in genuine tension with the ruling while preserving the regulation's broader purpose — and is explicit about what a pattern of defiance would eventually cost in financial penalties and lost influence within the body.",
    furtherReading: [
      "Supranational legal primacy and domestic constitutional pushback",
      "Infringement and dispute mechanisms in regional integration bodies",
      "Comparative case studies of national courts resisting supranational rulings",
    ],
    testsFundamentals: ["pol-intl-supranational-supremacy", "pol-intl-domestic-ratification"],
  },
  {
    id: "pol-intl-weighted-vote-coalition",
    profession: "politics",
    category: "International & Regional Institutions",
    title: "The Weighted Vote You Cannot Win Alone",
    scenario:
      "A regional economic and political union is voting on a new regulation that would significantly affect an industry central to your country's economy. The union's council uses a weighted voting formula where larger and smaller member states carry different vote shares, and no single country, including yours, holds anywhere near enough weight to block or pass the measure alone. You have identified several other member states with partially overlapping concerns, but their specific objections differ from yours and from each other's. You have six weeks before the vote to build a blocking or amending coalition large enough to actually move the outcome.",
    keyIssues: [
      "Which potential partners' objections are compatible enough with yours to combine into a single negotiating position",
      "Whether the realistic goal is blocking the measure outright or extracting specific amendments, given the actual vote arithmetic",
      "How to sequence outreach so early commitments do not box you into a position that costs you a larger coalition later",
      "What you would have to offer other member states in return for their support, since a coalition rarely holds together on shared complaint alone",
    ],
    expectedConcepts: [
      "qualified-majority/weighted voting",
      "coalition-building across blocs",
      "blocking minority",
      "vote-trading",
      "amendment versus rejection strategy",
    ],
    modelApproach:
      "A strong answer runs the actual vote arithmetic first — what weighted share is needed to block versus to amend — rather than assuming more partners is automatically better, and is honest that partners with different underlying objections may need different concessions to stay aligned. It sequences the coalition-building so the hardest-to-win partners are approached once the coalition already has credible momentum, and treats vote-trading across unrelated issues as a legitimate tool rather than an afterthought.",
    furtherReading: [
      "Weighted and qualified-majority voting formulas in regional unions",
      "Coalition theory in multilateral voting bodies",
      "Comparative case studies of blocking-minority coalitions",
    ],
    testsFundamentals: ["pol-intl-weighted-voting", "pol-intl-coalition-building-blocs"],
  },
  {
    id: "pol-intl-trade-panel-or-retaliate",
    profession: "politics",
    category: "International & Regional Institutions",
    title: "Taking a Trade Dispute to the Panel",
    scenario:
      "A major trading partner has just imposed a new measure on your country's exports that your trade ministry believes violates the rules of the global trade body both countries belong to. Domestic exporters are losing contracts immediately and are demanding retaliatory tariffs within days. Filing a formal dispute with the trade body's panel process would likely vindicate your position, but the process could take a year or more to produce a binding ruling, and even then, enforcement depends on your country's own ability to impose authorized countermeasures if the partner does not comply. You must recommend whether to retaliate immediately, file the formal dispute, or pursue both.",
    keyIssues: [
      "Whether the measure's legal merits actually support a formal challenge or are more ambiguous than domestic commentators assume",
      "Cost and risk of unilateral retaliation outside the formal process, including the risk of counter-retaliation and a broader dispute spiral",
      "Timeline mismatch between the panel process and the immediate political pressure to act now",
      "Whether pursuing the formal process while holding retaliation in reserve preserves more leverage than either option alone",
    ],
    expectedConcepts: [
      "multilateral dispute-settlement panel",
      "authorized countermeasures",
      "unilateral versus multilateral retaliation",
      "escalation risk",
      "legal merits versus political pressure",
    ],
    modelApproach:
      "A strong answer does not treat the choice as binary, and considers filing the formal dispute while explicitly reserving the option of narrowly targeted retaliation if the measure's harm is severe enough to justify acting before a ruling arrives. It is honest about the panel process's own timeline and enforcement limits, and weighs the reputational cost of bypassing the formal mechanism entirely against the political cost of looking passive while exporters absorb real losses.",
    furtherReading: [
      "Dispute-settlement mechanisms in global and regional trade bodies",
      "Authorized countermeasures and retaliation design in trade disputes",
      "Comparative case studies of trade disputes resolved through formal panels versus unilateral action",
    ],
    testsFundamentals: ["pol-intl-dispute-settlement", "pol-intl-veto-player-management"],
  },
  {
    id: "pol-intl-mission-burden-sharing",
    profession: "politics",
    category: "International & Regional Institutions",
    title: "Who Pays for the Mission",
    premium: true,
    scenario:
      "A multilateral peacekeeping and stabilization mission your country has long supported is up for its annual mandate renewal in three weeks. The mission's largest funder has signaled it will only approve renewal if the funding and troop-contribution formula is rewritten so smaller member states shoulder a larger share, arguing the current arrangement is unsustainable. Several smaller contributors say they cannot absorb a bigger share without cutting their own domestic budgets, and at least one has hinted it would rather see the mission end than accept the new formula. The mission's work on the ground is genuinely at a fragile but improving stage, and a funding gap or mandate lapse could unravel real progress.",
    keyIssues: [
      "Whether the largest funder's demand is a genuine fiscal constraint or an opening negotiating position",
      "What a revised formula would need to look like to keep smaller contributors in rather than driving an exit",
      "Risk that mandate renewal slips past the deadline while the formula is still being negotiated, lapsing the mission's authority on the ground",
      "Whether a short-term bridge arrangement could preserve the mission while the harder formula negotiation continues",
    ],
    expectedConcepts: [
      "burden-sharing formula",
      "mandate renewal deadline",
      "funder leverage",
      "bridge/interim funding",
      "contributor exit risk",
    ],
    modelApproach:
      "A strong answer treats the largest funder's demand as a real constraint worth testing rather than dismissing, while also testing how firm the threatened smaller-state exit actually is, and looks for a phased revision to the formula that avoids an all-or-nothing choice at the renewal deadline. It explicitly weighs a short-term bridge mechanism to avoid a mandate lapse while the underlying formula fight continues on a separate, less time-pressured track.",
    furtherReading: [
      "Burden-sharing formulas in multilateral peacekeeping and stabilization missions",
      "Mandate renewal politics and deadline pressure in multilateral institutions",
      "Comparative case studies of funding disputes that nearly ended standing missions",
    ],
    testsFundamentals: ["pol-intl-burden-sharing", "pol-intl-mandate-renewal"],
  },
  {
    id: "pol-intl-arrears-withdrawal-threat",
    profession: "politics",
    category: "International & Regional Institutions",
    title: "A Member in Arrears Threatens to Walk",
    premium: true,
    scenario:
      "A member state of a multilateral institution your country helped found has fallen significantly behind on its required financial contributions for the third consecutive year, and now says it will withdraw from the institution entirely unless its contribution formula and voting weight are both renegotiated in its favor. Several other members are sympathetic to parts of the member's underlying complaint about the formula being outdated, but granting the demand under open withdrawal pressure risks teaching every other member in arrears that non-payment plus a credible exit threat is the fastest route to a better deal. You are advising your country's representative on how to respond before the institution's next budget session.",
    keyIssues: [
      "Whether the member's underlying complaint about the formula has genuine merit separate from the arrears and the threat",
      "Precedent risk if a concession is seen to reward arrears and a withdrawal threat rather than good-faith negotiation",
      "What the institution actually loses if this member leaves versus what it loses by rewarding the tactic",
      "Whether a reform process opened on a separate, non-coerced track could address the legitimate complaint without conceding to the threat itself",
    ],
    expectedConcepts: [
      "funding arrears",
      "withdrawal threat as leverage",
      "precedent-setting concession",
      "institutional reform track",
      "member retention versus moral hazard",
    ],
    modelApproach:
      "A strong answer separates the legitimacy of the underlying grievance from the legitimacy of the tactic used to raise it, and resists rewarding the arrears-plus-threat combination directly even while taking the formula complaint seriously on its own track. It weighs the real cost of losing the member against the larger cost of signaling to every other member that this is now the playbook for renegotiating terms.",
    furtherReading: [
      "Member-state arrears and withdrawal threats in international organizations",
      "Reform of outdated contribution and voting formulas in multilateral bodies",
      "Comparative case studies of institutions that lost or retained a major member over a funding dispute",
    ],
    testsFundamentals: ["pol-intl-funding-arrears-leverage", "pol-intl-institutional-reform"],
  },
  {
    id: "pol-intl-accession-conditionality-pressure",
    profession: "politics",
    category: "International & Regional Institutions",
    title: "Bringing a Candidate Up to Standard",
    premium: true,
    scenario:
      "A neighboring state has applied to join the regional political and security bloc your country belongs to, and its application has taken on new urgency following a regional security crisis that makes faster integration strategically attractive to several existing members. The candidate state has made real but incomplete progress on the rule-of-law and anti-corruption reforms the bloc's own accession criteria require, and some members want to fast-track membership for strategic reasons while others, including judicial reform advocates inside your own government, warn that admitting the state before it meets the criteria would permanently weaken the conditionality that made past accessions actually work. You must recommend a position before the next accession review.",
    keyIssues: [
      "Whether the strategic urgency genuinely justifies lowering the bar, or whether it is being used to paper over a judgment that could be made on the merits",
      "What a credible intermediate step (partial integration, a binding reform timeline) could offer instead of a binary admit-or-wait decision",
      "Cost to the conditionality mechanism's credibility for future candidates if standards are visibly bent for this one",
      "Risk of the candidate state's domestic reform momentum stalling if admission happens before, rather than after, the reforms are locked in",
    ],
    expectedConcepts: [
      "accession conditionality",
      "rule-of-law benchmarking",
      "strategic urgency versus institutional credibility",
      "phased/partial integration",
      "reform-lock-in sequencing",
    ],
    modelApproach:
      "A strong answer does not treat strategic urgency and conditionality as automatically opposed, and looks for an intermediate mechanism — binding timelines, partial integration in specific areas, enhanced monitoring — that captures some strategic benefit now while preserving genuine pressure to complete the reforms. It is explicit about the long-run cost to the conditionality mechanism itself if this case becomes the precedent other future candidates expect to be able to invoke.",
    furtherReading: [
      "Accession conditionality and benchmarking in regional political and security blocs",
      "Phased and partial integration models for candidate states",
      "Comparative case studies of accession processes accelerated or stalled under strategic pressure",
    ],
    testsFundamentals: ["pol-intl-accession-conditionality", "pol-intl-veto-player-management"],
  },
  {
    id: "pol-intl-harmonized-standard-industry-revolt",
    profession: "politics",
    category: "International & Regional Institutions",
    title: "Harmonizing a Rule Your Industry Hates",
    premium: true,
    scenario:
      "A regional union your country belongs to is finalizing a harmonized technical and environmental standard that would apply uniformly across all member states. A domestic industry that is a major employer in several of your electoral strongholds argues the standard, as drafted, would impose costs that smaller domestic firms cannot absorb as easily as larger competitors based in other member states, effectively handing those competitors an advantage. You broadly support the standard's underlying goal and recognize that blocking harmonization outright would isolate your country and could be read as simple protectionism, but you also cannot ignore the domestic political cost of the standard passing unchanged.",
    keyIssues: [
      "Whether the industry's competitive-disadvantage claim is well-founded or an exaggerated defense of the status quo",
      "What technical adjustments (phase-in periods, size-based thresholds, transition support) could address the real cost concern without reopening the standard's substance",
      "Risk that visibly fighting the standard on behalf of one domestic industry damages your credibility on harmonization issues more broadly",
      "How to negotiate the adjustment through the normal technical process rather than it looking like special-interest capture",
    ],
    expectedConcepts: [
      "regulatory harmonization",
      "competitive disadvantage across member states",
      "phased implementation/transition periods",
      "protectionism optics",
      "technical versus political negotiation track",
    ],
    modelApproach:
      "A strong answer tests the industry's claim with real evidence before fighting on its behalf, and if the concern holds up, pursues a technical adjustment — a phase-in period or a size-based threshold — that addresses the specific cost concern without reopening or diluting the standard's core goal. It is explicit about the reputational cost of being seen to fight harmonization for one domestic sector, and prefers the normal technical negotiating track over a public political fight wherever possible.",
    furtherReading: [
      "Regulatory harmonization and transition mechanisms in regional unions",
      "Industry lobbying and competitive-disadvantage claims in standard-setting",
      "Comparative case studies of harmonized standards renegotiated after domestic industry pushback",
    ],
    testsFundamentals: ["pol-intl-regulatory-harmonization", "pol-intl-domestic-ratification"],
  },
  {
    id: "pol-intl-mutual-defense-clause-ambiguity",
    profession: "politics",
    category: "International & Regional Institutions",
    title: "Invoking the Mutual-Defense Clause",
    premium: true,
    scenario:
      "Your country has just experienced a serious, sustained cyberattack that disabled part of a critical national infrastructure system for several days, with credible but not fully conclusive evidence pointing to a state actor outside the multilateral security alliance you belong to. Several officials want to formally invoke the alliance's mutual-defense or consultation clause to secure allied political and material support; others warn that invoking it over an incident that falls short of the clause's traditional threshold could set a precedent that dilutes the clause's seriousness for future, more clearly military attacks, and that allies may be reluctant to treat this as a triggering event at all. You must recommend whether and how to raise this with alliance partners before the next scheduled consultation.",
    keyIssues: [
      "Whether the evidence of state responsibility is solid enough to raise formally, and what happens to your credibility if it is later disputed",
      "Risk that invoking the clause over an ambiguous, below-threshold incident weakens its deterrent value for a clearer future case",
      "What allies would actually be willing to offer even if the clause is invoked, versus what a lower-key consultation request might secure just as well",
      "How other member states' own prior positions on below-threshold incidents (such as cyber or hybrid attacks) shape what response you can realistically expect",
    ],
    expectedConcepts: [
      "mutual-defense/consultation clause",
      "threshold ambiguity",
      "below-threshold/hybrid attacks",
      "alliance credibility and precedent",
      "attribution confidence",
    ],
    modelApproach:
      "A strong answer treats invoking the clause as a serious, precedent-setting decision rather than a symbolic gesture, and weighs a formal consultation request short of full invocation as a genuine middle option that still mobilizes allied attention without testing the clause's threshold on ambiguous evidence. It is explicit about what allied support would realistically look like either way, and about the attribution confidence actually behind the claim before recommending how publicly to frame it.",
    furtherReading: [
      "Mutual-defense and consultation clauses in multilateral security alliances",
      "Below-threshold and hybrid attacks and the attribution problem",
      "Comparative case studies of ambiguous incidents raised under alliance consultation mechanisms",
    ],
    testsFundamentals: ["pol-intl-collective-defense-clause", "pol-intl-veto-player-management"],
  },
  {
    id: "pol-intl-outdated-voting-formula-reform",
    profession: "politics",
    category: "International & Regional Institutions",
    title: "A Reform Nobody Wants to Open",
    premium: true,
    scenario:
      "An international institution your country has belonged to for decades allocates voting weight and leadership positions according to a formula set when the institution was founded, one that several newer and fast-growing member states now argue badly understates their current economic and demographic weight. Your country benefits from the existing formula and has historically resisted reopening it, but a growing bloc of underrepresented members is now threatening to build a rival institution outside the existing framework if reform does not move forward, which would fragment the system both institutions were meant to serve. You are advising on whether and how to support opening a reform negotiation your country stands to lose influence from.",
    keyIssues: [
      "Whether continuing to block reform risks a worse outcome (institutional fragmentation) than accepting a managed loss of relative influence",
      "What transition mechanisms (phased reweighting, grandfathering, new leadership seats) could make reform politically survivable at home",
      "How credible the threat of a rival institution actually is, and what it would cost your country if that threat is carried out",
      "Whether leading the reform conversation voluntarily preserves more long-term influence than being forced into it later",
    ],
    expectedConcepts: [
      "institutional reform of governance/voting rules",
      "status-quo veto incentives",
      "rival/parallel institution risk",
      "phased reweighting and grandfathering",
      "managed decline in relative influence",
    ],
    modelApproach:
      "A strong answer does not treat preserving the current formula as costless, and weighs the real risk of institutional fragmentation against the real cost of a managed loss of relative influence. It looks for transition mechanisms that make reform survivable domestically, and makes the strategic case that leading a reform process you cannot indefinitely block preserves more influence than resisting until you are forced into a worse version of the same outcome.",
    furtherReading: [
      "Governance and voting-formula reform in long-standing international institutions",
      "Rival and parallel institution-building as a reform-forcing threat",
      "Comparative case studies of institutions that reformed, split, or stagnated under representation pressure",
    ],
    testsFundamentals: ["pol-intl-institutional-reform", "pol-intl-veto-player-management"],
  },
  {
    id: "pol-intl-secretariat-independent-agenda",
    profession: "politics",
    category: "International & Regional Institutions",
    title: "The Secretariat Has Its Own Agenda",
    premium: true,
    scenario:
      "The independent secretariat of a multilateral institution your country belongs to has just published a major policy proposal that goes considerably further than any mandate member states have actually given it, effectively trying to set the agenda rather than simply execute decisions made collectively. Several member states, including some normally aligned with your country, are reacting very differently: some welcome the proposal as useful cover for a domestically unpopular reform they wanted anyway, others see it as serious overreach that needs to be reined in before it sets a precedent for secretariat independence going forward. You are advising your country's representative on how to respond at the next governing council session.",
    keyIssues: [
      "Whether the secretariat's proposal is substantively good policy regardless of whether it overstepped its mandate",
      "Risk that welcoming the overreach because it is convenient this time weakens member states' collective control going forward",
      "How other member states' divided reactions shape what response is actually achievable at the council session",
      "Whether a formal rebuke, quiet guidance, or simply ignoring the proposal is the most effective way to reassert member-state control",
    ],
    expectedConcepts: [
      "secretariat/executive autonomy",
      "principal-agent problem in international institutions",
      "mandate creep",
      "member-state collective control",
      "selective convenience versus precedent",
    ],
    modelApproach:
      "A strong answer separates the substantive merits of the proposal from the procedural question of whether the secretariat overstepped its mandate, and resists the temptation to wave through overreach simply because it is convenient this time. It reads the other member states' divided reactions honestly to judge what response is actually achievable, and favors a response that reasserts collective member-state control without necessarily rejecting a proposal that may have real merit.",
    furtherReading: [
      "Secretariat and executive-staff autonomy in international organizations",
      "Principal-agent dynamics between member states and international bureaucracies",
      "Comparative case studies of secretariats accused of mandate overreach",
    ],
    testsFundamentals: ["pol-intl-secretariat-autonomy", "pol-intl-coalition-building-blocs"],
  },
  {
    id: "pol-intl-peer-review-reputational-pressure",
    profession: "politics",
    category: "International & Regional Institutions",
    title: "A Soft Standard With Real Teeth",
    premium: true,
    scenario:
      "A non-binding peer-review mechanism run by an international institution your country participates in has just published a report flagging specific weaknesses in your government's fiscal transparency and anti-corruption practices. The mechanism carries no formal sanction, but the finding is already being cited by credit-rating analysts and foreign investors, and opposition politicians are using it as evidence of government mismanagement. Some advisers argue you should contest the report's methodology publicly; others argue a public fight will draw more attention to the finding than quietly committing to the specific reforms it recommends. You must decide on a response before the report's findings dominate the news cycle.",
    keyIssues: [
      "Whether the report's substantive findings are actually defensible or genuinely identify real weaknesses worth fixing regardless of the political embarrassment",
      "Risk that publicly contesting a non-binding report's methodology draws more attention and credibility to it than a quieter response would",
      "How much market and reputational consequence a technically non-binding finding can carry in practice",
      "What a credible, time-bound reform commitment would need to include to actually defuse the reputational pressure",
    ],
    expectedConcepts: [
      "peer review / soft law mechanisms",
      "reputational enforcement without formal sanction",
      "market and credit-rating spillover",
      "contest-versus-commit response strategy",
      "non-binding findings with binding consequences",
    ],
    modelApproach:
      "A strong answer takes the substantive findings seriously on their own merits before deciding how to respond politically, and recognizes that a non-binding mechanism can still carry real reputational and market consequences that functionally operate like enforcement even without formal sanction. It generally favors a credible, specific, time-bound commitment to the recommended reforms over a public methodological fight that risks amplifying the finding rather than neutralizing it.",
    furtherReading: [
      "Peer review and soft-law mechanisms in international institutions",
      "Reputational and market-based enforcement of non-binding standards",
      "Comparative case studies of governments responding to adverse peer-review findings",
    ],
    testsFundamentals: ["pol-intl-peer-review-soft-law", "pol-intl-domestic-ratification"],
  },
  {
    id: "pol-intl-overlapping-crisis-response",
    profession: "politics",
    category: "International & Regional Institutions",
    title: "Two Institutions, One Crisis",
    premium: true,
    scenario:
      "A major cross-border disaster has struck a region near your country, and both a regional bloc your country belongs to and a separate global institution with its own disaster-response mandate have activated parallel response mechanisms, each offering funding, personnel, and coordination structures that overlap substantially. Officials on the ground report duplicated needs assessments, competing logistics chains, and confusion among affected local authorities about which institution's guidance actually takes precedence. Your country sits on the governing bodies of both institutions and is well placed to push for better coordination, but each institution's own staff has incentives to protect its visibility and role rather than simply deferring to the other.",
    keyIssues: [
      "Whether a genuine division of labor between the two institutions is achievable quickly enough to matter during an active crisis",
      "How to push for coordination without appearing to take sides, given your country's seat on both governing bodies",
      "Risk that institutional turf competition costs real time and resources that affected communities on the ground cannot afford to lose",
      "Whether a lasting coordination framework is worth negotiating now, beyond just this one crisis",
    ],
    expectedConcepts: [
      "overlapping institutional mandates",
      "turf competition during crisis response",
      "division-of-labor agreements",
      "dual governing-body membership as leverage",
      "lasting coordination frameworks",
    ],
    modelApproach:
      "A strong answer uses your country's seat on both governing bodies to push concretely for a division of labor rather than simply urging vague cooperation, and treats the turf competition as a real, predictable institutional dynamic to work around rather than a surprising failure of goodwill. It weighs whether to settle for ad hoc coordination that gets through this crisis or to use the moment to negotiate a lasting framework that prevents the same duplication next time.",
    furtherReading: [
      "Overlapping mandates and coordination failures in multilateral crisis response",
      "Division-of-labor agreements between regional and global institutions",
      "Comparative case studies of disaster responses hampered by institutional turf competition",
    ],
    testsFundamentals: ["pol-intl-overlapping-mandates", "pol-intl-burden-sharing"],
  },
];
