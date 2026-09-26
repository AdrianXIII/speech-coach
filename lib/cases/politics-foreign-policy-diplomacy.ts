import type { CaseStudy } from "@/lib/caseStudyContent";
import type { Fundamental } from "@/lib/caseStudyFundamentals";

/**
 * Politics / Foreign Policy & Diplomacy: the fundamentals checklist and the case bank
 * for this category, kept together so they can be written and reviewed as
 * one unit. Registered in lib/cases/index.ts.
 */
export const POLITICS_FOREIGN_POLICY_DIPLOMACY_FUNDAMENTALS: Fundamental[] = [
  { id: "pol-foreign-national-interest", label: "Applying the national-interest lens to explain a state's action that appears to break with its own stated values" },
  { id: "pol-foreign-levels-of-analysis", label: "Diagnosing a foreign policy decision using the individual, state, and systemic levels of analysis" },
  { id: "pol-foreign-deterrence-credibility", label: "Assessing deterrent credibility (denial vs. punishment, general vs. immediate deterrence) before recommending a response" },
  { id: "pol-foreign-diplomatic-channels", label: "Choosing among bilateral, multilateral, track-II, and public diplomacy channels to fit a negotiation's political risk" },
  { id: "pol-foreign-alliance-management", label: "Managing the entrapment-versus-abandonment tradeoff in an alliance or mutual-defense commitment" },
  { id: "pol-foreign-economic-statecraft", label: "Designing sanctions or export controls with a clear theory of behavioral change and a durable coalition" },
  { id: "pol-foreign-intelligence-uncertainty", label: "Treating an intelligence assessment as a probabilistic judgment rather than settled fact, and guarding against politicization" },
  { id: "pol-foreign-international-institutions", label: "Applying international law and institutions as a constraint on state behavior without central enforcement" },
  { id: "pol-foreign-two-level-game", label: "Using the two-level game / win-set framework to keep an international agreement ratifiable at home" },
  { id: "pol-foreign-crisis-escalation", label: "Managing crisis escalation control: signaling resolve while leaving an adversary a face-saving way to step back" },
  { id: "pol-foreign-negotiation-batna", label: "Applying BATNA and reservation-value analysis to set a walk-away point in a bilateral negotiation" },
  { id: "pol-foreign-mediation-good-offices", label: "Using third-party mediation or good offices to unlock a deadlocked bilateral dispute" },
  { id: "pol-foreign-sanctions-evasion", label: "Anticipating sanctions evasion and third-country backfill, and adapting an economic-pressure strategy in response" },
  { id: "pol-foreign-humanitarian-intervention", label: "Weighing sovereignty against the responsibility-to-protect norm when deciding how to respond to a humanitarian crisis abroad" },
  { id: "pol-foreign-refugee-migration-diplomacy", label: "Negotiating burden-sharing and border-management arrangements for a cross-border refugee or migration surge" },
  { id: "pol-foreign-diplomatic-immunity", label: "Applying diplomatic immunity and consular-relations norms when a diplomat is implicated in a host-country incident" },
  { id: "pol-foreign-extradition-mla", label: "Evaluating an extradition or mutual-legal-assistance request against dual criminality and political-offense concerns" },
  { id: "pol-foreign-cyber-statecraft", label: "Attributing and responding to a state-linked cyber operation that falls below the threshold of armed conflict" },
  { id: "pol-foreign-public-opinion-constraint", label: "Reading domestic public opinion and media pressure as a binding constraint on a foreign policy choice" },
  { id: "pol-foreign-arms-control-verification", label: "Weighing verification regimes and compliance risk when responding to a suspected arms-control treaty violation" },
];

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
      "Whether the underlying subsidy dispute has genuine merit worth contesting through a trade tribunal versus bilateral negotiation",
      "Signaling resolve without triggering an escalatory spiral",
      "Linkage risk: whether tying this dispute to the security agreement helps or harms both objectives",
    ],
    expectedConcepts: [
      "trade retaliation",
      "linkage diplomacy",
      "multilateral trade dispute resolution",
      "escalation dynamics",
      "domestic political constraints",
    ],
    modelApproach:
      "A strong answer resists purely reactive retaliation and considers a calibrated response — pursuing formal trade dispute mechanisms while keeping the security negotiation on a separate track — showing awareness that domestic political pressure and long-term strategic interest can pull in different directions and need explicit reconciliation.",
    furtherReading: [
      "Multilateral trade dispute settlement mechanisms",
      "Linkage diplomacy and its risks",
      "Game theory in trade negotiation and retaliation",
    ],
    testsFundamentals: ["pol-foreign-economic-statecraft", "pol-foreign-alliance-management", "pol-foreign-national-interest"],
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
    testsFundamentals: ["pol-foreign-alliance-management", "pol-foreign-crisis-escalation", "pol-foreign-diplomatic-channels"],
  },
  {
    id: "pol-foreign-strait-deterrence",
    profession: "politics",
    category: "Foreign Policy & Diplomacy",
    title: "Deterrence in a Contested Strait",
    scenario:
      "A neighboring state has begun sending armed coast-guard vessels to escort fishing fleets into a strait your country also claims, testing whether your navy will intervene. Trade through the strait carries a significant share of your country's imports, and your defense staff estimates a visible naval deployment would cost roughly two months of an ordinary patrol budget. Domestic commentators are split between demanding a show of force and warning that any deployment could trigger a wider standoff. The head of government has asked you, as national security adviser, to recommend a response before tomorrow's cabinet meeting.",
    keyIssues: [
      "Whether a visible deployment would function as deterrence by denial, deterrence by punishment, or fail to be credible either way",
      "Distinguishing this as a general-deterrence problem (deterring future incursions) versus an immediate-deterrence problem (stopping the current one)",
      "Risk that a forceful response provokes the very escalation it is meant to prevent",
      "Domestic political pressure to appear resolute versus the strategic cost of a wider standoff",
    ],
    expectedConcepts: [
      "deterrence by denial",
      "deterrence by punishment",
      "general vs. immediate deterrence",
      "credibility",
      "escalation dynamics",
      "security dilemma",
    ],
    modelApproach:
      "A strong answer names which form of deterrence a given deployment actually achieves rather than treating a show of force as self-evidently credible, and explicitly separates the general-deterrence goal from the immediate incident. It recommends a calibrated response — proportionate presence paired with an open diplomatic channel — so the adversary has a face-saving way to stand down rather than being cornered.",
    furtherReading: [
      "Schelling on deterrence and coercive bargaining",
      "The security dilemma in international relations",
      "Comparative maritime boundary dispute-resolution mechanisms",
    ],
    premium: true,
    testsFundamentals: ["pol-foreign-deterrence-credibility", "pol-foreign-crisis-escalation"],
  },
  {
    id: "pol-foreign-leadership-succession",
    profession: "politics",
    category: "Foreign Policy & Diplomacy",
    title: "Reading a Rival's Leadership Change",
    scenario:
      "A long-standing rival state has just installed a new head of government after the previous leader's sudden death. Early statements from the new leader sound noticeably more conciliatory toward your country than the last decade of policy. Your foreign ministry is split: some analysts argue this reflects a genuine personal shift in the new leader's outlook, others argue the underlying security competition between the two states has not changed and the softer tone will not survive contact with that state's own military and party establishment. You must advise the cabinet on how much weight to put behind the opening.",
    keyIssues: [
      "Whether the apparent policy shift is anchored at the individual, state, or systemic level",
      "What evidence would distinguish a durable shift from a temporary change in tone",
      "Risk of overcommitting to an opening that reverses once domestic or institutional pressure reasserts itself",
      "How much of the rivalry's underlying logic (interests, threats, alliance structures) has genuinely changed versus merely the leader's rhetoric",
    ],
    expectedConcepts: [
      "levels of analysis",
      "individual vs. structural explanation",
      "national interest",
      "credible signaling",
      "domestic political constraints on a leader",
    ],
    modelApproach:
      "A strong answer explicitly works through all three levels rather than betting entirely on the new leader's personality, and proposes testing the opening with reversible, low-cost steps before committing to anything that would be costly to walk back if the shift turns out to be cosmetic.",
    furtherReading: [
      "Waltz on levels of analysis in international relations",
      "Case studies in leadership transition and foreign policy continuity",
      "Signaling theory in international relations",
    ],
    premium: true,
    testsFundamentals: ["pol-foreign-levels-of-analysis", "pol-foreign-national-interest"],
  },
  {
    id: "pol-foreign-intelligence-assessment",
    profession: "politics",
    category: "Foreign Policy & Diplomacy",
    title: "Acting on a Moderate-Confidence Assessment",
    scenario:
      "Your intelligence service has briefed the minister that a rival state is, with moderate confidence, restarting a sensitive weapons-research program, based on satellite imagery and a single human source whose reliability is still being validated. Opposition legislators have gotten wind of the briefing and are pressing the government to confirm or deny it publicly. Going public risks a diplomatic incident if the assessment later proves wrong; staying silent risks a leak that makes the government look like it is hiding a threat. You must advise the minister on both the substance and the public messaging within 48 hours.",
    keyIssues: [
      "What 'moderate confidence' actually means and how much weight the assessment can bear",
      "Risk of treating a probabilistic judgment as settled fact for the sake of a clean public message",
      "Guarding against pressure to sharpen the assessment's language to fit the political moment",
      "How much to disclose publicly given both leak risk and the cost of being wrong",
    ],
    expectedConcepts: [
      "intelligence confidence levels",
      "collection vs. analysis",
      "politicization of intelligence",
      "public opinion management",
      "probabilistic judgment",
    ],
    modelApproach:
      "A strong answer keeps the confidence level explicit in any public statement rather than rounding it up to certainty, resists pressure to align the assessment with a politically convenient conclusion, and separates the substantive intelligence question from the tactical question of what and when to disclose.",
    furtherReading: [
      "Politicization of intelligence assessments",
      "Standards for intelligence confidence language",
      "Case studies in flawed pre-decision intelligence assessments",
    ],
    premium: true,
    testsFundamentals: ["pol-foreign-intelligence-uncertainty", "pol-foreign-public-opinion-constraint"],
  },
  {
    id: "pol-foreign-agreement-ratification",
    profession: "politics",
    category: "Foreign Policy & Diplomacy",
    title: "Selling a Deal Back Home",
    scenario:
      "You have just concluded a framework agreement with a neighboring state to jointly manage a shared river basin, resolving a dispute that has simmered for a decade. The deal is well regarded internationally, but several legislators from regions that depend on the river for irrigation say it concedes too much water flow to the other side and are threatening to block ratification. You have two weeks before the ratification vote to either adjust the deal, build domestic support for it as written, or risk losing the agreement entirely.",
    keyIssues: [
      "Whether the agreement as negotiated actually falls inside your government's domestic win-set",
      "Options for expanding the win-set (side payments to affected regions, phased implementation, compensatory measures) versus reopening the negotiation itself",
      "Risk that reopening the deal internationally to satisfy domestic critics undoes the concessions the other side already made",
      "How to communicate the deal's tradeoffs to affected legislators without appearing to have negotiated against their interests",
    ],
    expectedConcepts: [
      "two-level games",
      "win-set",
      "ratification constraint",
      "side payments",
      "domestic coalition-building",
    ],
    modelApproach:
      "A strong answer treats the ratification vote as a second negotiation with its own logic rather than a formality, proposes concrete ways to expand the domestic win-set short of reopening the international deal, and weighs the credibility cost of renegotiating against the political cost of losing ratification.",
    furtherReading: [
      "Putnam on two-level games",
      "Case studies in treaty ratification failure",
      "Comparative approaches to transboundary water-sharing agreements",
    ],
    premium: true,
    testsFundamentals: ["pol-foreign-two-level-game", "pol-foreign-national-interest"],
  },
  {
    id: "pol-foreign-mediated-resource-dispute",
    profession: "politics",
    category: "Foreign Policy & Diplomacy",
    title: "Mediating a Stalled Border Resource Dispute",
    scenario:
      "Your country and a neighboring state have been deadlocked for three years over access to a shared offshore gas field, with direct talks having produced no movement. A respected international mediator has offered good offices to restart talks, but your negotiating team is unsure what your government's actual walk-away position should be if mediation fails: unilateral development of the field, international arbitration, or continued deadlock. You are asked to define the negotiating mandate before talks resume next month.",
    keyIssues: [
      "What your government's best alternative to a negotiated agreement (BATNA) actually is, and how strong it really is",
      "Whether accepting mediation signals weakness or is simply the most efficient path to a deal",
      "How the neighboring state's own BATNA shapes what it will actually accept at the table",
      "Setting a reservation value below which walking away is better than any deal on offer",
    ],
    expectedConcepts: [
      "BATNA",
      "reservation value",
      "third-party mediation",
      "good offices",
      "negotiation leverage",
    ],
    modelApproach:
      "A strong answer defines a concrete BATNA and reservation value before entering mediation rather than negotiating without a fallback, and treats the mediator's good offices as a tool for finding a deal inside the zone of possible agreement rather than as a sign of weakness.",
    furtherReading: [
      "Getting to Yes and BATNA theory",
      "Comparative maritime boundary and resource-sharing arbitration",
      "Case studies in successful third-party mediation",
    ],
    premium: true,
    testsFundamentals: ["pol-foreign-mediation-good-offices", "pol-foreign-negotiation-batna", "pol-foreign-national-interest"],
  },
  {
    id: "pol-foreign-sanctions-erosion",
    profession: "politics",
    category: "Foreign Policy & Diplomacy",
    title: "A Sanctions Coalition Springs Leaks",
    scenario:
      "Eighteen months ago your government helped assemble a multilateral sanctions coalition targeting a state accused of a serious treaty violation. New trade data shows the targeted state's exports have largely recovered, rerouted through two third countries that never joined the coalition. Coalition partners are divided: some want to tighten enforcement and pressure the third countries directly, others argue the sanctions have made their political point and further escalation is not worth the cost. You must recommend a path forward to your minister.",
    keyIssues: [
      "Whether the original sanctions ever had a clear theory of what behavioral change they were meant to produce",
      "How third-country backfill has undermined the coalition's actual leverage",
      "Costs and risks of pressuring the third countries directly to close the gap",
      "Whether to escalate, narrow the target toward smarter sanctions, or accept diminished returns",
    ],
    expectedConcepts: [
      "economic statecraft",
      "sanctions evasion",
      "coalition durability",
      "targeted vs. comprehensive sanctions",
      "theory of change",
    ],
    modelApproach:
      "A strong answer asks what specific behavior change the sanctions were meant to produce before recommending escalation, and treats third-country backfill as the expected, not exceptional, response to any sanctions regime, weighing the cost of chasing evasion against simply narrowing the target.",
    furtherReading: [
      "Baldwin on economic statecraft",
      "Case studies in sanctions evasion and third-country backfill",
      "Comparative design of targeted vs. comprehensive sanctions regimes",
    ],
    premium: true,
    testsFundamentals: ["pol-foreign-sanctions-evasion", "pol-foreign-economic-statecraft"],
  },
  {
    id: "pol-foreign-humanitarian-crisis-response",
    profession: "politics",
    category: "Foreign Policy & Diplomacy",
    title: "A Neighbor's Internal Conflict Turns Humanitarian Crisis",
    scenario:
      "Fighting between a neighboring state's government and a breakaway region has produced credible reports of attacks on civilian areas, with an international monitoring body estimating tens of thousands displaced in the past month alone. Your country has historic ties to the affected population and faces growing domestic pressure to act, but the neighboring government insists this is an internal matter and any outside involvement would violate its sovereignty. Regional partners are divided on whether to support a humanitarian corridor, targeted measures against the government, or continued non-interference. You must recommend your government's position ahead of a regional summit next week.",
    keyIssues: [
      "Weighing sovereignty against the responsibility-to-protect norm given the scale of harm to civilians",
      "What form of response (humanitarian corridor, diplomatic pressure, referral to an international body) is proportionate to the evidence available",
      "Risk that intervention, even humanitarian, is read as taking sides in the underlying conflict",
      "Coordinating with regional partners so a response has real weight rather than standing alone",
    ],
    expectedConcepts: [
      "sovereignty",
      "responsibility to protect",
      "humanitarian intervention",
      "proportionality",
      "regional coordination",
    ],
    modelApproach:
      "A strong answer does not treat sovereignty and responsibility-to-protect as an absolute binary, weighing the evidentiary threshold, the proportionality of available responses, and the practical odds that a given response actually improves civilian protection rather than simply making a moral statement.",
    furtherReading: [
      "The Responsibility to Protect doctrine",
      "Comparative case studies in humanitarian intervention",
      "Sovereignty and non-intervention in international law",
    ],
    premium: true,
    testsFundamentals: ["pol-foreign-humanitarian-intervention", "pol-foreign-crisis-escalation"],
  },
  {
    id: "pol-foreign-refugee-burden-sharing",
    profession: "politics",
    category: "Foreign Policy & Diplomacy",
    title: "A Sudden Refugee Surge Strains a Border",
    scenario:
      "Unrest in a neighboring country has sent an estimated 400,000 people across your shared border in six weeks, overwhelming local reception capacity. Two other neighboring states are also receiving smaller but significant flows, and each government has different domestic tolerance for accepting new arrivals. Your government wants a regional burden-sharing arrangement rather than bearing the cost alone, but the neighboring states have been slow to commit, and domestic opposition politicians are demanding immediate border restrictions. You are tasked with proposing a diplomatic strategy within the next two weeks.",
    keyIssues: [
      "Whether unilateral border restrictions would solve the immediate pressure or simply displace it onto neighboring states",
      "What incentives could bring reluctant neighboring states into a genuine burden-sharing arrangement",
      "Balancing domestic political pressure for restriction against international legal and reputational obligations toward displaced people",
      "Sequencing: immediate humanitarian response versus the longer diplomatic effort to negotiate shared responsibility",
    ],
    expectedConcepts: [
      "burden-sharing",
      "refugee protection norms",
      "regional diplomacy",
      "domestic political constraints",
      "humanitarian obligation",
    ],
    modelApproach:
      "A strong answer resists the false choice between unilateral restriction and unlimited acceptance, proposes concrete terms for a regional burden-sharing arrangement, and explicitly addresses domestic political pressure as a real constraint the diplomatic strategy has to work around rather than ignore.",
    furtherReading: [
      "Comparative refugee burden-sharing arrangements",
      "Regional migration diplomacy case studies",
      "International norms on refugee protection and non-refoulement",
    ],
    premium: true,
    testsFundamentals: ["pol-foreign-refugee-migration-diplomacy", "pol-foreign-diplomatic-channels"],
  },
  {
    id: "pol-foreign-diplomatic-immunity-incident",
    profession: "politics",
    category: "Foreign Policy & Diplomacy",
    title: "A Diplomat's Immunity Collides With a Host-Country Prosecution",
    scenario:
      "A senior diplomat posted to a foreign capital was involved in a serious traffic collision that seriously injured a local pedestrian. The host country's prosecutors want to charge the diplomat; your foreign ministry is invoking diplomatic immunity, which is legally sound but has triggered public outrage in the host country and calls for the diplomat's expulsion. Your government must decide how to respond — waive immunity, recall the diplomat, offer compensation, or hold firm — before the story dominates another news cycle.",
    keyIssues: [
      "What diplomatic immunity actually covers and does not cover under the relevant international convention",
      "Reputational cost of holding firm on immunity versus the precedent set by waiving it",
      "Options short of a full trial (recall, compensation, waiver) that could resolve the incident",
      "Managing the host-country relationship so this incident does not spill into unrelated diplomatic business",
    ],
    expectedConcepts: [
      "diplomatic immunity",
      "consular relations",
      "reciprocity",
      "sending-state vs. receiving-state obligations",
      "reputational cost",
    ],
    modelApproach:
      "A strong answer explains what immunity legally protects without treating it as a blank check, and weighs recall or compensation as ways to address the underlying harm and preserve the relationship without setting a precedent of prosecuting accredited diplomats abroad.",
    furtherReading: [
      "The Vienna Convention on Diplomatic Relations",
      "Comparative practice on waiving diplomatic immunity",
      "Case studies in diplomatic incidents and reciprocity",
    ],
    premium: true,
    testsFundamentals: ["pol-foreign-diplomatic-immunity", "pol-foreign-international-institutions"],
  },
  {
    id: "pol-foreign-extradition-request",
    profession: "politics",
    category: "Foreign Policy & Diplomacy",
    title: "An Extradition Request Meets a Political-Offense Claim",
    scenario:
      "A foreign government has requested the extradition of a businessperson living in your country, accused of large-scale financial fraud back home. The individual claims the charges are politically motivated retaliation for funding opposition media, and your courts must decide whether to authorize extradition before the treaty deadline passes. Rights groups are pressing your government to refuse; the requesting state is warning that refusal will damage bilateral relations and future law-enforcement cooperation.",
    keyIssues: [
      "Whether the dual-criminality requirement is satisfied by the underlying conduct alleged",
      "How to evaluate the political-offense exception claim without simply taking either side's framing at face value",
      "Diplomatic cost of refusing a formal extradition request from a state you otherwise cooperate closely with",
      "What safeguards (assurances on treatment, trial monitoring) could make extradition defensible even if some political motive is plausible",
    ],
    expectedConcepts: [
      "dual criminality",
      "political-offense exception",
      "mutual legal assistance",
      "non-refoulement",
      "diplomatic cost of refusal",
    ],
    modelApproach:
      "A strong answer works through the legal tests (dual criminality, political-offense exception) on their own terms rather than deciding based purely on the diplomatic relationship, and considers conditional extradition with monitoring safeguards as a middle path between blanket refusal and unconditional surrender.",
    furtherReading: [
      "Comparative extradition law and the political-offense exception",
      "Mutual legal assistance treaty practice",
      "Case studies in politically contested extradition requests",
    ],
    premium: true,
    testsFundamentals: ["pol-foreign-extradition-mla", "pol-foreign-international-institutions"],
  },
  {
    id: "pol-foreign-cyber-attribution-response",
    profession: "politics",
    category: "Foreign Policy & Diplomacy",
    title: "Attributing a Cyber Operation Against Critical Infrastructure",
    scenario:
      "A cyberattack disabled part of your country's electricity grid operator for eighteen hours last month. Your intelligence service attributes the operation to actors linked to a rival state's military intelligence with high confidence, though the evidence remains partly classified and the rival state denies involvement. Your cabinet must decide how to respond: public attribution, diplomatic protest, proportionate cyber or economic countermeasures, or quiet deterrent signaling without public accusation — none of which clearly crosses the threshold that would justify a traditional military response.",
    keyIssues: [
      "How confident the attribution evidence actually is and how much of it to disclose publicly",
      "Whether a public accusation without full public evidence helps or damages your credibility",
      "What response is proportionate given the operation fell below the threshold of an armed attack",
      "Signaling future deterrence without escalating into open confrontation",
    ],
    expectedConcepts: [
      "cyber attribution",
      "deterrence below the threshold of armed conflict",
      "proportionality",
      "intelligence confidence",
      "escalation management",
    ],
    modelApproach:
      "A strong answer treats attribution confidence as a genuine variable to communicate carefully rather than either full certainty or silence, and matches the response's visibility and severity to the operation's own severity, favoring a calibrated mix of private signaling and measured public steps over an all-or-nothing choice.",
    furtherReading: [
      "State responsibility and attribution in cyberspace",
      "Comparative cyber-deterrence doctrine",
      "Case studies in below-threshold state cyber operations",
    ],
    premium: true,
    testsFundamentals: ["pol-foreign-cyber-statecraft", "pol-foreign-intelligence-uncertainty", "pol-foreign-deterrence-credibility"],
  },
  {
    id: "pol-foreign-arms-control-violation",
    profession: "politics",
    category: "Foreign Policy & Diplomacy",
    title: "A Suspected Arms-Control Treaty Violation",
    scenario:
      "Satellite and seismic data suggest a rival state may have tested a weapons system restricted under a bilateral arms-control treaty your government helped negotiate a decade ago. The evidence is suggestive but falls short of the treaty's own formal verification threshold, and the rival state denies any violation, offering an alternative explanation your technical experts consider plausible but unlikely. Some in your government want to invoke the treaty's dispute mechanism immediately; others warn that a premature accusation that later proves wrong would badly damage the treaty's credibility and your own. You must recommend how to proceed.",
    keyIssues: [
      "Whether the available evidence meets the treaty's own verification and evidentiary threshold",
      "Risk of invoking the dispute mechanism prematurely versus the risk of staying silent on a genuine violation",
      "How verification and compliance mechanisms function without a central enforcer",
      "Preserving the treaty's long-term credibility regardless of how this specific dispute resolves",
    ],
    expectedConcepts: [
      "arms control verification",
      "compliance mechanisms",
      "evidentiary threshold",
      "treaty credibility",
      "international institutions as constraint without control",
    ],
    modelApproach:
      "A strong answer treats the treaty's own verification threshold as the relevant standard rather than a political judgment call, and weighs the credibility cost of both a premature accusation and of staying silent, generally favoring use of the treaty's formal consultation mechanism before any public escalation.",
    furtherReading: [
      "Arms control verification regimes",
      "Comparative bilateral and multilateral arms-control treaty design",
      "Case studies in disputed treaty-compliance incidents",
    ],
    premium: true,
    testsFundamentals: ["pol-foreign-arms-control-verification", "pol-foreign-international-institutions", "pol-foreign-intelligence-uncertainty"],
  },
];
