import type { CaseStudy } from "@/lib/caseStudyContent";
import type { Fundamental } from "@/lib/caseStudyFundamentals";

/**
 * Law / Civil Litigation: the fundamentals checklist and the case bank
 * for this category, kept together so they can be written and reviewed as
 * one unit. Registered in lib/cases/index.ts.
 *
 * Written to be jurisdiction-neutral: cases must work whether the reader's
 * system has broad adversarial discovery and a civil jury (US) or a
 * judge-directed process with limited disclosure and no civil jury
 * (Germany, France, Spain, Sweden).
 */
export const LAW_CIVIL_LITIGATION_FUNDAMENTALS: Fundamental[] = [
  { id: "law-civil-jurisdiction-standing", label: "Establishing that a court has jurisdiction over a dispute and that the claimant has standing to bring it" },
  { id: "law-civil-burden-of-proof", label: "Allocating and meeting the burden of proof under the applicable civil standard (preponderance of evidence / balance of probabilities)" },
  { id: "law-civil-pleading-requirements", label: "Meeting pleading requirements to state a viable claim capable of surviving an early challenge" },
  { id: "law-civil-evidence-disclosure-scope", label: "Scoping evidence-gathering to the jurisdiction's disclosure regime, from broad discovery to limited court-directed exchange" },
  { id: "law-civil-early-dispositive-resolution", label: "Using early dispositive procedures to resolve or narrow a claim before a full trial when there is no genuine factual dispute" },
  { id: "law-civil-class-collective-actions", label: "Assessing whether a claim should proceed as an individual, collective, or group/class action and what certification requires" },
  { id: "law-civil-settlement-negotiation-strategy", label: "Structuring settlement negotiation strategy, including formal settlement offers and their cost or leverage consequences" },
  { id: "law-civil-adr-arbitration-mediation", label: "Choosing and enforcing alternative dispute resolution (arbitration or mediation) over litigation, including the enforceability of ADR clauses and awards" },
  { id: "law-civil-damages-computation", label: "Computing recoverable damages and proving causation and quantum, including which categories of loss are compensable" },
  { id: "law-civil-provisional-interim-relief", label: "Obtaining provisional or interim relief before a final judgment to preserve the status quo or prevent dissipation of assets" },
  { id: "law-civil-appeals-standard-of-review", label: "Identifying the correct standard of review and viable grounds for appeal against a first-instance judgment" },
  { id: "law-civil-preclusion-res-judicata", label: "Applying claim and issue preclusion (res judicata) to bar relitigation of matters already finally decided" },
  { id: "law-civil-judgment-enforcement", label: "Enforcing a final judgment against a non-paying party, including cross-border recognition and enforcement" },
  { id: "law-civil-cost-allocation", label: "Advising on which party bears litigation costs and fees under the jurisdiction's cost-allocation rule" },
  { id: "law-civil-expert-witness-evidence", label: "Using expert evidence and witness testimony effectively to establish disputed technical or factual issues" },
  { id: "law-civil-limitation-periods", label: "Applying limitation or prescription periods and identifying when a claim is time-barred or has been validly tolled" },
  { id: "law-civil-joinder-third-party-claims", label: "Joining necessary parties or bringing third-party contribution and indemnity claims into an existing action" },
  { id: "law-civil-privilege-confidentiality", label: "Protecting privileged or professionally confidential communications from compelled disclosure" },
  { id: "law-civil-choice-of-law-forum", label: "Determining choice of law and the appropriate forum in a cross-border civil dispute" },
  { id: "law-civil-litigation-funding-proportionality", label: "Weighing third-party litigation funding and the proportionality of litigation cost to claim value against settling early" },
];

export const LAW_CIVIL_LITIGATION_CASES: CaseStudy[] = [
  {
    id: "law-civil-product-liability",
    profession: "law",
    category: "Civil Litigation",
    title: "The Product Liability Suit",
    scenario:
      "Your client, a power-tool manufacturer, is being sued after a user was injured while operating a saw with the safety guard allegedly removed by the user prior to the accident. The claimant argues the guard was too easy to remove, constituting a design defect. Your client's engineering team maintains the guard meets all recognized industry safety standards. The case will turn heavily on technical evidence about the guard's design and how it compares to feasible alternatives. You're preparing the defense strategy.",
    keyIssues: [
      "Whether meeting industry standards is sufficient defense against a design-defect claim, or just one factor a court will weigh",
      "Comparative or contributory fault given the user's own modification of the safety guard",
      "Risk-utility analysis: whether a safer, still-functional alternative design was feasible",
      "What expert evidence is needed to establish or rebut the design-defect and causation elements",
    ],
    expectedConcepts: [
      "design defect",
      "risk-utility test",
      "comparative fault",
      "industry standard defense",
      "product liability",
      "burden of proof",
    ],
    modelApproach:
      "A strong answer doesn't rest the defense solely on industry-standard compliance (which is usually evidence, not a complete defense), and instead builds a risk-utility argument alongside a comparative-fault argument based on the user's own removal of the guard, identifying the expert testimony needed to support both and being explicit about which party carries the burden on each element.",
    furtherReading: [
      "Risk-utility test in product liability law",
      "Comparative treatments of strict product liability: EU Product Liability Directive and national codes",
      "Comparative/contributory fault and its interaction with strict liability claims",
    ],
    testsFundamentals: ["law-civil-burden-of-proof", "law-civil-expert-witness-evidence"],
  },
  {
    id: "law-civil-wrongful-termination",
    profession: "law",
    category: "Civil Litigation",
    title: "The Retaliatory Dismissal Claim",
    scenario:
      "Your corporate client dismissed an employee for documented performance issues one week after she filed an internal complaint about a manager's conduct. She is now suing, arguing the dismissal was retaliation and that the timing is suspicious even though the performance record predates the complaint. Your client has performance reviews and written warnings going back eight months. You must assess the strength of the company's position and what evidence will decide the case.",
    keyIssues: [
      "Temporal proximity between the complaint and the dismissal as circumstantial evidence of retaliation",
      "Quality and consistency of the documented performance record predating the complaint",
      "Whether similarly-situated employees without complaints received comparable treatment for similar issues",
      "How the burden of proof shifts once the employee makes an initial showing of a retaliatory motive",
    ],
    expectedConcepts: [
      "retaliation claim",
      "pretext",
      "temporal proximity",
      "burden-shifting framework",
      "comparator evidence",
    ],
    modelApproach:
      "A strong answer takes the temporal proximity concern seriously rather than dismissing it, and focuses the defense on a burden-shifting framework: producing a legitimate, well-documented, consistently-applied reason for the dismissal and comparator evidence, rather than relying on the existence of a performance file alone.",
    furtherReading: [
      "Burden-shifting frameworks in employment retaliation and discrimination claims",
      "Temporal proximity as evidence of retaliatory intent",
      "Documentation practices in performance-based dismissals",
    ],
    testsFundamentals: ["law-civil-burden-of-proof", "law-civil-evidence-disclosure-scope"],
  },
  {
    id: "law-civil-standing-challenge",
    profession: "law",
    category: "Civil Litigation",
    title: "The Standing and Forum Challenge",
    scenario:
      "An environmental advocacy group has sued your client, a chemical processing company, alleging that discharge from its plant contaminated a river shared by two neighboring countries. Your client wants to challenge the suit at the threshold: the group is registered in a third country where none of its members live near the river, and the harm alleged largely occurred downstream, outside the court where the case was filed. You need to assess whether the case can be knocked out before the merits are ever reached, and where it should properly be heard.",
    keyIssues: [
      "Whether the advocacy group has suffered a concrete, particularized injury sufficient for standing, or asserts only a generalized grievance",
      "Whether the court where the case was filed has jurisdiction over a defendant and harm connected to another country",
      "Whether the complaint's factual allegations, if true, are specific enough to state a viable claim",
      "Strategic tradeoffs between challenging standing/jurisdiction early versus litigating the merits",
    ],
    expectedConcepts: [
      "standing",
      "concrete injury",
      "subject-matter jurisdiction",
      "forum",
      "pleading sufficiency",
    ],
    modelApproach:
      "A strong answer separates the standing question (does this claimant have a right to sue) from the jurisdiction/forum question (is this the right court), addresses each with its own test, and recognizes that a successful threshold challenge can end the case without ever reaching the pollution allegations — while flagging the risk that the claim simply gets refiled in a proper forum.",
    furtherReading: [
      "Standing doctrine: concrete and particularized injury requirements",
      "Cross-border environmental litigation and jurisdictional rules",
      "Pleading sufficiency standards for stating a viable claim",
    ],
    testsFundamentals: ["law-civil-jurisdiction-standing", "law-civil-pleading-requirements"],
  },
  {
    id: "law-civil-stale-claim-dismissal",
    profession: "law",
    category: "Civil Litigation",
    title: "The Four-Year-Old Handshake Deal",
    scenario:
      "A former business associate is suing your client, a startup founder, claiming they had an oral agreement to split future profits from a product line that has since become successful. The alleged agreement was made more than four years ago, was never written down, and the associate only raised it after seeing recent press about the product's success. Your client wants the case ended quickly rather than litigated fully. You need to advise on the fastest realistic path to getting the case dismissed.",
    keyIssues: [
      "Whether the claim is barred by the applicable limitation or prescription period, and whether any tolling event delayed the clock",
      "Whether the pleaded facts, even if accepted as true, are specific enough to support an enforceable agreement",
      "Whether an early dispositive motion is available, or whether this dispute genuinely requires fuller evidence-taking",
      "Evidentiary weaknesses in an unwritten agreement claimed years after the fact",
    ],
    expectedConcepts: [
      "limitation period",
      "tolling",
      "early dismissal",
      "pleading sufficiency",
      "oral contract",
    ],
    modelApproach:
      "A strong answer leads with the limitation-period defense as the cleanest and earliest off-ramp, addresses whether any tolling argument could realistically save the claim, and only then turns to whether an early dispositive procedure can dispose of the case on the pleadings even if the limitation defense fails, rather than assuming the case must go to a full evidentiary hearing.",
    furtherReading: [
      "Limitation and prescription periods for contract claims and tolling doctrines",
      "Standards for early dismissal on the pleadings",
      "Proving the existence of an oral or informal agreement",
    ],
    testsFundamentals: ["law-civil-limitation-periods", "law-civil-early-dispositive-resolution"],
    premium: true,
  },
  {
    id: "law-civil-battery-defect-class-action",
    profession: "law",
    category: "Civil Litigation",
    title: "The Group Claim Over Defective Batteries",
    scenario:
      "Your client, a consumer electronics company, sold roughly 400,000 units of a portable charger with a battery defect that can overheat under normal use. A group of purchasers, coordinated by a consumer-rights organization, wants to bring a single collective proceeding on behalf of all affected buyers rather than thousands of individual claims. Your client's exposure ranges from a modest refund-only outcome to a much larger figure if consequential damages for property damage are included. You must assess whether the claim can proceed collectively and estimate the exposure.",
    keyIssues: [
      "Whether the claims are similar enough across the group to justify collective treatment (commonality of the defect and harm)",
      "How aggregate damages would be computed and distributed if the group proceeding succeeds",
      "Whether it is more favorable to the client to have the claims resolved collectively or to face them individually",
      "Practical case-management issues in coordinating a defense against a large, coordinated group of claimants",
    ],
    expectedConcepts: [
      "collective/class action certification",
      "commonality",
      "aggregate damages",
      "consequential damages",
      "case management",
    ],
    modelApproach:
      "A strong answer evaluates certification on its merits (is the defect and its effect common enough across the group) rather than assuming collective treatment is automatically worse for the client, models a realistic range of aggregate exposure separating refund-level damages from consequential-damage claims, and considers whether resolving the matter collectively actually reduces total risk and cost versus a wave of individual suits.",
    furtherReading: [
      "Certification requirements for collective and group proceedings",
      "Aggregate damages modeling in consumer product defect claims",
      "Comparative approaches to group litigation: US class actions, EU representative actions, national group-claim mechanisms",
    ],
    testsFundamentals: ["law-civil-class-collective-actions", "law-civil-damages-computation"],
    premium: true,
  },
  {
    id: "law-civil-settlement-cost-consequences",
    profession: "law",
    category: "Civil Litigation",
    title: "The Settlement Offer With Teeth",
    scenario:
      "Your client, a mid-size logistics company, is being sued by a supplier over a disputed contract termination worth roughly two million in claimed losses. The supplier has made a formal settlement offer that, under the applicable procedural rules, carries cost consequences if your client rejects it and later fails to do better at trial. Internally, your client believes it has a strong case and wants to reject the offer outright. You need to advise on how the offer changes the risk calculus, not just whether the underlying claim is strong.",
    keyIssues: [
      "How the formal settlement offer's cost consequences change the expected value of continuing to litigate versus settling",
      "Realistic assessment of the likely trial outcome range, not just the client's confidence in its position",
      "Whether to make a counteroffer structured to preserve a favorable cost position later",
      "Communicating the litigation-cost math to a client who wants to fight on principle",
    ],
    expectedConcepts: [
      "formal settlement offer",
      "cost-shifting consequences",
      "expected value analysis",
      "litigation risk assessment",
    ],
    modelApproach:
      "A strong answer treats the settlement decision as an expected-value calculation that explicitly incorporates the cost-shifting exposure of rejecting the offer, not merely a judgment about who is 'right' on the merits, and translates that math into a clear recommendation the client can act on, including a counteroffer strategy if a flat rejection is unwise.",
    furtherReading: [
      "Cost-shifting mechanisms attached to formal settlement offers",
      "Expected-value frameworks for litigation settlement decisions",
      "Negotiation strategy under asymmetric cost exposure",
    ],
    testsFundamentals: ["law-civil-settlement-negotiation-strategy", "law-civil-cost-allocation"],
    premium: true,
  },
  {
    id: "law-civil-arbitration-clause-fight",
    profession: "law",
    category: "Civil Litigation",
    title: "The Cross-Border Arbitration Clause Fight",
    scenario:
      "Your client, an equipment manufacturer, has a distribution contract with a foreign distributor that includes a clause requiring disputes to be resolved through arbitration in a neutral third country. After a falling-out over unpaid invoices, the distributor filed suit in its home country's courts instead, arguing the arbitration clause is unconscionable because it was buried in standard terms the distributor never separately negotiated. You need to advise on compelling arbitration and on which country's law should govern the underlying contract dispute.",
    keyIssues: [
      "Whether the arbitration clause is enforceable despite being part of standard, non-negotiated terms",
      "The correct procedural route for compelling arbitration and staying the court proceeding",
      "Which jurisdiction's law governs the validity of the arbitration clause itself versus the underlying contract",
      "Practical consequences of losing the forum fight, including delay and duplicated cost",
    ],
    expectedConcepts: [
      "arbitration clause enforceability",
      "unconscionability",
      "choice of law",
      "compelling arbitration",
      "separability of the arbitration agreement",
    ],
    modelApproach:
      "A strong answer treats the arbitration clause's validity as a distinct, separable question from the merits of the underlying contract dispute, addresses the unconscionability argument directly rather than dismissing it, and identifies which body of law governs the clause's enforceability separately from which law governs the contract itself.",
    furtherReading: [
      "Separability doctrine in arbitration agreements",
      "New York Convention on recognition and enforcement of arbitration agreements",
      "Choice-of-law analysis for arbitration clauses versus the underlying contract",
    ],
    testsFundamentals: ["law-civil-adr-arbitration-mediation", "law-civil-choice-of-law-forum"],
    premium: true,
  },
  {
    id: "law-civil-asset-freeze-collection",
    profession: "law",
    category: "Civil Litigation",
    title: "The Disappearing Debtor",
    scenario:
      "Your client, a supplier, is owed roughly 900,000 by a buyer who has stopped responding and, according to a private investigator's report, has begun transferring funds and property to related entities abroad. Litigation on the merits will likely take a year or more to conclude. Your client wants to know whether anything can be done now, before judgment, to keep the buyer from becoming judgment-proof, and how a judgment would actually be collected once obtained.",
    keyIssues: [
      "Whether the facts support urgent provisional relief to freeze or preserve assets before judgment",
      "The evidentiary threshold needed to obtain interim relief without tipping off the debtor",
      "How enforcement would work in practice once a judgment is obtained, including against assets held abroad",
      "Balancing the cost and risk of seeking interim relief against the risk of doing nothing",
    ],
    expectedConcepts: [
      "provisional/interim relief",
      "asset freezing order",
      "urgency requirement",
      "judgment enforcement",
      "cross-border enforcement",
    ],
    modelApproach:
      "A strong answer recognizes that winning on the merits a year from now is worthless if the debtor is judgment-proof by then, and leads with the case for urgent provisional relief (showing urgency and a real risk of dissipation), while also mapping out realistically how any eventual judgment would be enforced, including against assets that have moved across borders.",
    furtherReading: [
      "Standards for provisional and interim relief to preserve assets pending judgment",
      "Cross-border judgment enforcement and recognition regimes",
      "Risk of dissipation as grounds for urgent relief",
    ],
    testsFundamentals: ["law-civil-provisional-interim-relief", "law-civil-judgment-enforcement"],
    premium: true,
  },
  {
    id: "law-civil-appeal-or-accept",
    profession: "law",
    category: "Civil Litigation",
    title: "Appeal, or Let It Stand",
    scenario:
      "Your client lost a first-instance judgment in a contract dispute, with the court finding against them on both a factual issue (whether a delivery was late) and a legal issue (how the contract's penalty clause should be interpreted). Losing on appeal would also affect a second, related dispute your client has pending with a different counterparty involving a similar clause. Your client wants to know whether an appeal is worth pursuing and what is actually at stake if they decide not to appeal at all.",
    keyIssues: [
      "Which parts of the judgment are reviewable on appeal, and under what standard for factual versus legal findings",
      "Realistic odds of overturning the factual finding versus the legal interpretation",
      "Whether letting the judgment stand unappealed risks binding the client's position in the related, second dispute",
      "Cost and time tradeoffs of appealing versus accepting the result",
    ],
    expectedConcepts: [
      "standard of review",
      "questions of fact vs. questions of law",
      "grounds for appeal",
      "issue preclusion",
    ],
    modelApproach:
      "A strong answer separates the factual finding (reviewed deferentially and hard to overturn) from the legal interpretation (reviewed more searchingly), gives a realistic assessment of each, and explicitly addresses whether accepting the judgment could create an issue-preclusion problem in the related second dispute rather than treating the appeal decision in isolation.",
    furtherReading: [
      "Standards of review: deference to factual findings versus legal conclusions",
      "Issue preclusion and its effect on related disputes",
      "Cost-benefit framework for deciding whether to appeal",
    ],
    testsFundamentals: ["law-civil-appeals-standard-of-review", "law-civil-preclusion-res-judicata"],
    premium: true,
  },
  {
    id: "law-civil-subcontractor-indemnity",
    profession: "law",
    category: "Civil Litigation",
    title: "The Building Owner's Claim and the Missing Subcontractor",
    scenario:
      "Your client, a general contractor, is being sued by a building owner over water damage traced to a failed roofing installation. Your client subcontracted the roofing work to a specialist firm that performed the actual installation under its own supervision. Your client believes it followed the subcontractor's technical specifications and wants to bring the subcontractor into the case rather than absorb the full loss alone. You need to plan how to do that and what evidence-gathering will be needed against a party not originally sued.",
    keyIssues: [
      "The correct procedural mechanism for bringing the subcontractor into the existing proceeding for contribution or indemnity",
      "Whether the general contractor's supervisory role creates independent liability regardless of the subcontractor's fault",
      "Scope of evidence needed from the subcontractor once joined, including technical records the client does not currently hold",
      "Practical and cost implications of a three-way dispute versus settling with the owner and pursuing the subcontractor separately",
    ],
    expectedConcepts: [
      "joinder",
      "third-party claim",
      "contribution and indemnity",
      "evidence disclosure",
    ],
    modelApproach:
      "A strong answer identifies joinder/third-party practice as the mechanism to bring the subcontractor in rather than pursuing a wholly separate later action, addresses whether the general contractor's own supervisory duties create independent exposure even if the subcontractor was at fault, and flags what additional evidence becomes available, and discoverable, once the subcontractor is a party.",
    furtherReading: [
      "Joinder of parties and third-party contribution/indemnity claims",
      "Allocation of liability between a general contractor and subcontractor",
      "Scope of evidence disclosure once additional parties are joined",
    ],
    testsFundamentals: ["law-civil-joinder-third-party-claims", "law-civil-evidence-disclosure-scope"],
    premium: true,
  },
  {
    id: "law-civil-privileged-memo-dispute",
    profession: "law",
    category: "Civil Litigation",
    title: "The Memo the Other Side Wants",
    scenario:
      "Your client, a mid-size manufacturer, is being sued over a safety incident at one of its facilities. Opposing counsel has demanded production of an internal memo, written by in-house counsel shortly after the incident, analyzing the company's legal exposure and recommending operational changes. Some of those operational changes were later implemented. Opposing counsel argues the memo is really a business document because it recommends operational action, not purely legal advice. You need to determine whether the memo can be withheld and how to respond to the demand.",
    keyIssues: [
      "Whether the memo qualifies as privileged or professionally confidential communication given its mixed legal and operational content",
      "Whether implementing the memo's recommendations later waives any privilege that originally attached",
      "How broadly the applicable disclosure regime requires the client to search for and log related documents",
      "How to respond to the production demand without waiving privilege over related communications",
    ],
    expectedConcepts: [
      "legal professional privilege",
      "mixed-purpose communications",
      "waiver",
      "disclosure/discovery scope",
    ],
    modelApproach:
      "A strong answer works through whether the memo's dominant purpose was legal advice despite its operational recommendations, addresses the waiver risk from later implementing those recommendations, and gives a concrete plan for responding to the production demand that protects the privilege claim without inviting sanctions for over-withholding under the jurisdiction's disclosure rules.",
    furtherReading: [
      "Legal professional privilege and the dominant-purpose test for mixed-content documents",
      "Waiver of privilege through subsequent conduct",
      "Comparative disclosure obligations: adversarial discovery versus judge-directed document exchange",
    ],
    testsFundamentals: ["law-civil-privilege-confidentiality", "law-civil-evidence-disclosure-scope"],
    premium: true,
  },
  {
    id: "law-civil-funding-proportionality-call",
    profession: "law",
    category: "Civil Litigation",
    title: "Is the Claim Worth Chasing",
    scenario:
      "Your client, a small engineering firm, has a strong but not airtight claim worth roughly 150,000 against a much larger corporate debtor who has been slow to pay for completed work. Litigating the claim through trial would likely cost a substantial fraction of that amount, and a third-party litigation funder has offered to finance the case in exchange for a share of any recovery. Your client wants a clear recommendation on whether pursuing the claim in court, with or without funding, actually makes economic sense compared to writing it off or accepting a low settlement now.",
    keyIssues: [
      "Whether the likely cost of litigation is proportionate to the claim's value and probability of success",
      "How third-party funding changes the client's net recovery and risk exposure",
      "Whether an early, discounted settlement is economically preferable to litigating fully",
      "How to present this as a business decision rather than purely a legal one",
    ],
    expectedConcepts: [
      "proportionality",
      "third-party litigation funding",
      "cost-benefit analysis",
      "settlement value versus litigation value",
    ],
    modelApproach:
      "A strong answer treats this explicitly as a proportionality and expected-value decision, models the net recovery under litigation (with and without funding) against a realistic early-settlement figure, and gives the client a clear recommendation rather than simply listing the options.",
    furtherReading: [
      "Proportionality principles in civil litigation cost management",
      "Third-party litigation funding structures and their effect on net recovery",
      "Expected-value analysis for the decision to litigate versus settle",
    ],
    testsFundamentals: ["law-civil-litigation-funding-proportionality", "law-civil-damages-computation"],
    premium: true,
  },
  {
    id: "law-civil-settlement-release-scope",
    profession: "law",
    category: "Civil Litigation",
    title: "Does the Old Settlement Cover This",
    scenario:
      "Two years ago, your client settled a dispute with a former equipment supplier over a malfunctioning component, signing a release covering 'all claims arising from the component's design and installation.' A new, more serious failure has now occurred, and your client wants to sue again, this time for a related but distinct manufacturing flaw discovered only recently. The supplier argues the earlier release and the doctrine barring repeat litigation cover this new claim entirely. You need to assess whether the new suit can proceed.",
    keyIssues: [
      "Whether the newly discovered manufacturing flaw falls within the scope of the prior release's language",
      "Whether the claim and issue preclusion doctrine bars a claim that could have been, but was not, raised in the earlier dispute",
      "Whether the earlier settlement was itself negotiated with adequate information about the underlying defect",
      "How to frame the new claim to minimize overlap with the settled dispute if the case proceeds",
    ],
    expectedConcepts: [
      "release scope",
      "claim preclusion",
      "issue preclusion",
      "settlement negotiation strategy",
    ],
    modelApproach:
      "A strong answer reads the release's actual language narrowly against the specific new defect rather than assuming the old settlement forecloses everything, applies the preclusion doctrine's requirement that the claim could and should have been raised earlier, and considers how the settlement negotiation itself (what was known and disclosed at the time) affects the preclusion analysis.",
    furtherReading: [
      "Interpreting the scope of settlement releases",
      "Claim and issue preclusion: what could have been raised in the earlier proceeding",
      "Negotiating settlement releases to avoid future scope disputes",
    ],
    testsFundamentals: ["law-civil-settlement-negotiation-strategy", "law-civil-preclusion-res-judicata"],
    premium: true,
  },
];
