import type { CaseStudy } from "@/lib/caseStudyContent";
import type { Fundamental } from "@/lib/caseStudyFundamentals";

/**
 * Law / Administrative Law: the fundamentals checklist and the case bank
 * for this category, kept together so they can be written and reviewed as
 * one unit. Registered in lib/cases/index.ts.
 *
 * Scope note: this category covers the administrative PROCESS and agency
 * CONDUCT itself — licensing/permitting, investigation and sanctions,
 * procedural fairness in administrative decision-making, administrative
 * appeals, and state liability for administrative wrongdoing. It is
 * deliberately distinct from Law / Constitutional & Regulatory, which stays
 * focused on judicial review of government action, separation of powers,
 * standing/justiciability, and proportionality review of legislative or
 * executive measures. Some conceptual neighboring with that category is
 * expected (real administrative-law and constitutional-law courses overlap
 * the same way) but the content here is not duplicated from it.
 *
 * Every case is written to be jurisdiction-neutral: it must make sense when
 * machine-translated and graded against the US, German, French, Spanish, or
 * Swedish legal system, so it avoids any single country's statutes, courts,
 * or procedural vocabulary in favor of generic doctrine that exists (in some
 * form) across all five.
 */
export const LAW_ADMINISTRATIVE_LAW_FUNDAMENTALS: Fundamental[] = [
  { id: "law-admin-licensing-application-standard", label: "Applying a licensing or permitting statute's substantive criteria and burden of proof to an application decision" },
  { id: "law-admin-procedural-fairness-hearing-rights", label: "Determining what notice and opportunity to be heard an agency owes before an adverse administrative decision" },
  { id: "law-admin-reasoned-decision-duty", label: "Assessing whether an agency's stated reasons satisfy its duty to explain a licensing or enforcement decision" },
  { id: "law-admin-investigation-powers-limits", label: "Identifying the scope and limits of an agency's investigatory powers (inspection, document production, compelled testimony)" },
  { id: "law-admin-sanction-proportionality", label: "Applying proportionality to an administrative sanction or penalty relative to the violation and the regulated party's circumstances" },
  { id: "law-admin-administrative-appeal-exhaustion", label: "Deciding whether to exhaust an internal administrative appeal before seeking judicial review, and the consequences of skipping it" },
  { id: "law-admin-revocation-suspension-license", label: "Applying the standard and procedure required to revoke or suspend an existing license or permit" },
  { id: "law-admin-state-liability-damages", label: "Establishing state liability in damages for unlawful, negligent, or defective administrative action" },
  { id: "law-admin-legitimate-expectations-estoppel", label: "Applying legitimate-expectations or reliance doctrine where a party relied on an agency's prior assurance or settled practice" },
  { id: "law-admin-delegated-rulemaking-vires", label: "Determining whether agency action stayed within the bounds of its delegated statutory authority (ultra vires review)" },
  { id: "law-admin-conflict-of-interest-bias", label: "Identifying disqualifying bias or conflict of interest in an administrative decision-maker" },
  { id: "law-admin-retroactive-application", label: "Assessing whether applying a new rule or standard to a pending application or past conduct is impermissibly retroactive" },
  { id: "law-admin-silence-deemed-decision", label: "Determining the consequences of agency silence or delay, including deemed decisions and compulsion remedies" },
  { id: "law-admin-administrative-settlement-consent-order", label: "Negotiating and interpreting the binding effect of an administrative consent order or settlement" },
  { id: "law-admin-third-party-intervenor-rights", label: "Assessing whether a third party has a legally cognizable interest to intervene in or challenge another's administrative decision" },
  { id: "law-admin-emergency-summary-action", label: "Applying the standard for emergency or summary administrative action taken without a prior hearing, and its post-hoc review" },
  { id: "law-admin-record-based-review-scope", label: "Determining the scope of review confined to the administrative record versus when new evidence may be introduced" },
  { id: "law-admin-fee-cost-recovery", label: "Assessing whether an administrative fee is a lawful cost-recovery charge or an impermissible disguised tax" },
  { id: "law-admin-whistleblower-referral-inspection", label: "Evaluating the threshold and confidentiality limits for opening an investigation from a complaint or referral" },
];

export const LAW_ADMINISTRATIVE_LAW_CASES: CaseStudy[] = [
  {
    id: "law-admin-license-denial-opaque-criteria",
    profession: "law",
    category: "Administrative Law",
    title: "Challenging a Denied Operating License with No Stated Reasons",
    scenario:
      "A regional licensing authority denied your client's application to operate a mid-size waste-processing facility, citing only 'failure to meet the public interest standard' in a two-sentence letter, without identifying which specific statutory criteria were not met or what evidence the authority relied on. Your client spent eight months and a substantial sum preparing the application, including an environmental impact study that the decision never acknowledged. The authority's enabling statute requires that license decisions 'state the grounds for approval or denial,' but does not specify a format. You are advising on whether the denial itself is vulnerable to challenge independent of the facility's actual merits.",
    keyIssues: [
      "Whether a conclusory denial that only tracks the statute's general standard, without identifying the specific deficiency, satisfies a statutory duty to give reasons",
      "Whether the agency's failure to engage with the submitted environmental impact study is itself a reviewable defect",
      "Remedy available for a reasons-giving defect: remand for a reasoned decision versus an order granting the license outright",
      "Whether raising the reasons-giving defect forecloses or merely delays a later substantive challenge to the merits of the denial",
    ],
    expectedConcepts: [
      "duty to give reasons",
      "burden of proof in licensing decisions",
      "remand versus substitution of judgment",
      "exhaustion of administrative remedies",
      "arbitrary and capricious review",
    ],
    modelApproach:
      "A strong answer treats the reasons-giving defect as a free-standing, independently winnable argument that does not require re-litigating the facility's actual merits, and explains why courts typically remand for a properly reasoned decision rather than ordering the license granted outright. It flags that remand carries real risk: the agency may issue the same denial again with adequate reasons attached, so the client should prepare the merits case in parallel rather than treating the procedural win as the end of the matter.",
    furtherReading: [
      "Duty to give reasons in administrative decision-making",
      "Standards of review for conclusory agency decisions",
      "Remand versus substituted judgment as a judicial review remedy",
    ],
    testsFundamentals: ["law-admin-licensing-application-standard", "law-admin-reasoned-decision-duty"],
  },
  {
    id: "law-admin-pre-revocation-hearing-denied",
    profession: "law",
    category: "Administrative Law",
    title: "Revoking a Professional License Without a Prior Hearing",
    scenario:
      "A professional licensing board revoked your client's license to practice, effective immediately, after receiving a single written complaint alleging a billing irregularity, without notifying your client of the complaint or giving them any opportunity to respond before the revocation took effect. The board's governing rules provide for a hearing 'as part of the licensing process' but do not explicitly state whether a hearing must precede or may follow a revocation. Your client has been unable to work for three weeks, and the board's internal appeal process typically takes four months to resolve. You are advising on whether the lack of a pre-revocation hearing is independently challengeable.",
    keyIssues: [
      "Whether procedural fairness requires an opportunity to be heard before an existing license is revoked, given the severity of the harm",
      "Whether the board's rules can be read to require a pre-revocation hearing even without an explicit textual command",
      "Interim relief available to restore the license pending the board's own appeal process",
      "Whether a single uncorroborated complaint provided sufficient basis for immediate revocation absent emergency circumstances",
    ],
    expectedConcepts: [
      "procedural fairness / right to be heard",
      "notice requirement",
      "interim or provisional relief",
      "standard for summary action absent emergency",
      "burden of proof on the licensing body",
    ],
    modelApproach:
      "A strong answer distinguishes an ordinary revocation, which generally demands notice and an opportunity to respond before it takes effect, from a true emergency suspension, which may be justified without a prior hearing only on a genuine showing of immediate risk, and tests whether a single unverified complaint meets that higher bar. It treats interim reinstatement pending the internal appeal as the client's most urgent practical remedy, separate from the ultimate merits of the billing allegation.",
    furtherReading: [
      "Procedural fairness in administrative decision-making",
      "Pre-deprivation versus post-deprivation hearing requirements",
      "Interim relief pending administrative appeal",
    ],
    testsFundamentals: ["law-admin-procedural-fairness-hearing-rights", "law-admin-revocation-suspension-license"],
  },
  {
    id: "law-admin-inspection-scope-overreach",
    profession: "law",
    category: "Administrative Law",
    title: "An Agency Inspection That Exceeded Its Own Authorization",
    scenario:
      "Inspectors from a market-conduct regulator arrived at your client's business with authorization to inspect records relating to one specific product line, but proceeded to copy financial records, employee emails, and customer files covering the entire business, later citing material found in the emails as the basis for a separate enforcement action unrelated to the original product line. Your client did not object at the time, uncertain of its rights, and cooperated fully. The regulator argues broad document access is implicit in any inspection power under its enabling statute. You are advising on whether the emails can be excluded from the enforcement case and on the lawfulness of the broader seizure.",
    keyIssues: [
      "Whether the inspectors' document collection exceeded the scope of the authorization actually granted",
      "Whether material obtained beyond the authorized scope can be used in a separate, unrelated enforcement action",
      "Effect of the business's cooperation and failure to object at the time on its ability to challenge the scope later",
      "Whether the agency's enabling statute can be read to imply the broader access it claims, or whether that reading itself exceeds delegated authority",
    ],
    expectedConcepts: [
      "scope of investigatory authority",
      "ultra vires agency action",
      "exclusion of improperly obtained evidence in administrative proceedings",
      "implied versus express statutory authority",
      "waiver by cooperation",
    ],
    modelApproach:
      "A strong answer separates the scope question from the waiver question, arguing that silent cooperation under pressure from inspectors on-site is not the kind of informed, voluntary waiver that should bar a later challenge to the scope of the search. It tests the agency's 'implicit in any inspection power' argument against the actual text of its enabling statute, and argues that material obtained outside the authorized scope should be excluded from the unrelated enforcement action even if the original inspection itself was otherwise lawful.",
    furtherReading: [
      "Scope and limits of administrative investigatory powers",
      "Ultra vires doctrine and the limits of delegated authority",
      "Exclusion of improperly obtained evidence in administrative enforcement",
    ],
    testsFundamentals: ["law-admin-investigation-powers-limits", "law-admin-delegated-rulemaking-vires"],
  },
  {
    id: "law-admin-disproportionate-fine-small-business",
    profession: "law",
    category: "Administrative Law",
    title: "A Maximum-Scale Fine for a First-Time Paperwork Violation",
    scenario:
      "A consumer-protection regulator fined your client, a five-employee retailer, the maximum penalty available under the statute for failing to display a required pricing disclosure on its website, treating each of 40,000 product pages as a separate violation and multiplying the per-violation fine accordingly to reach a total of 1.8 million, an amount that would force the business to close. This is the retailer's first violation of any kind, the omission affected a single template used site-wide rather than 40,000 distinct decisions, and the regulator's own guidance for larger competitors in the same situation resulted in fines under 50,000. You are advising on challenging the fine as disproportionate.",
    keyIssues: [
      "Whether the fine's method of calculation, treating a single systemic error as thousands of discrete violations, is itself defensible or inflates the penalty beyond what proportionality allows",
      "Comparative treatment of similarly situated larger competitors as evidence the fine is disproportionate or discriminatory in application",
      "Relevance of first-time violation status and the absence of consumer harm to the proportionality analysis",
      "Whether to pursue an internal administrative appeal on proportionality grounds before any judicial challenge",
    ],
    expectedConcepts: [
      "proportionality of administrative sanctions",
      "per-violation calculation methodology",
      "comparator evidence of disparate enforcement",
      "aggravating and mitigating factors in penalty-setting",
      "administrative appeal exhaustion",
    ],
    modelApproach:
      "A strong answer attacks the per-page multiplication methodology directly, arguing that a single systemic template error is one violation in substance even if it technically recurs across many pages, and uses the regulator's own more lenient treatment of comparable larger businesses as direct evidence the fine is disproportionate. It recommends exhausting the internal administrative appeal first, since proportionality challenges to penalty calculation are often resolved more successfully at that stage than before a reviewing court applying a deferential standard.",
    furtherReading: [
      "Proportionality review of administrative penalties",
      "Per-violation penalty calculation methodology and its limits",
      "Comparator evidence in disparate enforcement challenges",
    ],
    premium: true,
    testsFundamentals: ["law-admin-sanction-proportionality", "law-admin-administrative-appeal-exhaustion"],
  },
  {
    id: "law-admin-emergency-suspension-restaurant",
    profession: "law",
    category: "Administrative Law",
    title: "An Immediate Food-Safety Suspension Before Any Hearing",
    scenario:
      "A health and safety agency suspended your client's restaurant license immediately, without a prior hearing, after an inspector found what the inspection report called 'a significant pest presence in the food preparation area,' relying on an emergency-powers provision that allows suspension without a prior hearing 'where necessary to prevent imminent harm to public health.' Your client disputes the severity of the finding, has already remediated the issue, and has lost two weeks of revenue during the suspension, with a post-suspension hearing scheduled five weeks out. You are advising on challenging the suspension and securing faster relief.",
    keyIssues: [
      "Whether the inspection finding actually meets the statutory threshold of imminent harm required to justify suspension without a prior hearing",
      "Adequacy of a five-week delay before any hearing, given the ongoing loss of income and the client's claim that the issue has already been remediated",
      "Whether completed remediation is relevant to whether the suspension should continue pending the hearing, separate from whether it was initially justified",
      "Available mechanisms to accelerate the post-suspension hearing or seek interim reinstatement",
    ],
    expectedConcepts: [
      "emergency or summary administrative action",
      "imminent harm threshold",
      "post-hoc hearing requirement",
      "interim relief pending hearing",
      "mootness through remediation",
    ],
    modelApproach:
      "A strong answer tests the inspection finding against the specific statutory threshold for emergency action rather than accepting the agency's characterization at face value, and separately argues that completed remediation, even if the original suspension was justified, removes the ongoing basis for keeping the suspension in place while the client waits for a hearing. It pushes for an accelerated hearing date or interim reinstatement as the most time-sensitive relief, rather than simply waiting out the five-week schedule.",
    furtherReading: [
      "Emergency and summary administrative action standards",
      "Imminent-harm thresholds for suspension without prior hearing",
      "Interim relief pending a post-suspension hearing",
    ],
    premium: true,
    testsFundamentals: ["law-admin-emergency-summary-action", "law-admin-procedural-fairness-hearing-rights"],
  },
  {
    id: "law-admin-state-liability-defective-inspection",
    profession: "law",
    category: "Administrative Law",
    title: "Collapse of a Balcony After a Signed-Off Safety Inspection",
    scenario:
      "A municipal building-safety office inspected and certified a residential building's balconies as structurally sound eighteen months before one collapsed, injuring several residents, and an independent engineering review commissioned after the collapse concluded the original inspection missed a visible corrosion pattern that a competent inspection should have caught. Injured residents want to bring a claim against the government for the inspection failure, while the government argues that certifying a building's safety is a discretionary judgment call for which it cannot be held liable, and that the building owner's own failure to maintain the structure is the real cause. You are advising the residents on the state-liability claim.",
    keyIssues: [
      "Whether state liability for a negligent administrative inspection requires an operational, correctable standard of care rather than purely discretionary judgment immune from suit",
      "Causal relationship between the inspection failure and the collapse where the building owner's own neglect was also a contributing cause",
      "Standard of care expected of a competent inspector and whether missing a visible corrosion pattern falls below it",
      "Available defenses the government is likely to raise, including discretionary-function-type immunity and contributing fault",
    ],
    expectedConcepts: [
      "state liability in damages for administrative action",
      "discretionary versus operational or ministerial function",
      "standard of care for inspection failures",
      "causation and contributing fault",
      "sovereign or governmental immunity limits",
    ],
    modelApproach:
      "A strong answer separates the genuinely discretionary policy choices the office makes, which may be shielded, from the operational act of actually conducting a competent inspection according to professional standards, which generally is not, and argues the missed corrosion pattern falls in the latter, unshielded category. It addresses the building owner's contributing neglect as a question of shared or apportioned liability rather than a complete defense that forecloses the government's own responsibility.",
    furtherReading: [
      "State liability in damages for negligent administrative action",
      "Discretionary function immunity and its limits",
      "Causation and apportionment where multiple parties contribute to harm",
    ],
    premium: true,
    testsFundamentals: ["law-admin-state-liability-damages"],
  },
  {
    id: "law-admin-legitimate-expectation-permit-renewal",
    profession: "law",
    category: "Administrative Law",
    title: "A Permit Renewal Denied Under a Standard Adopted After the Application",
    scenario:
      "Your client has renewed an annual operating permit for a recycling facility without incident for eleven years, each time under the same basic eligibility standard, and was verbally told by the agency's own senior case officer, during a routine site visit four months ago, that 'renewal this year should be straightforward.' Shortly after your client submitted its renewal application, the agency adopted a stricter new technical standard and applied it to deny the pending application, even though the new standard was not in effect when your client built its current equipment or submitted the application. You are advising on challenging the denial.",
    keyIssues: [
      "Whether eleven years of consistent renewal under the same standard, plus the case officer's specific assurance, gives rise to a legitimate expectation protecting the client against an abrupt change",
      "Whether applying the new technical standard to a pending application filed before the standard's adoption amounts to impermissible retroactive application",
      "Remedy if the legitimate-expectation argument succeeds: a grace or transition period versus full exemption from the new standard",
      "Weight to give the agency's genuine regulatory interest in applying improved standards against the client's reliance interest",
    ],
    expectedConcepts: [
      "legitimate expectations doctrine",
      "retroactive application of new rules",
      "reliance on agency assurances and settled practice",
      "transition or grace period as a remedy",
      "balancing regulatory interest against reliance",
    ],
    modelApproach:
      "A strong answer treats the legitimate-expectation argument as strongest where both consistent past practice and a specific individual assurance are present together, rather than relying on either alone, and frames the retroactivity problem as independent: applying a new standard to an application that predates its adoption is a distinct defect from whether the standard itself is reasonable going forward. It proposes a transition period as the realistic middle-ground remedy most likely to be granted, rather than demanding permanent exemption from the new standard.",
    furtherReading: [
      "Legitimate expectations and reliance in administrative decision-making",
      "Retroactive application of new regulatory standards",
      "Transition periods as a remedy for abrupt regulatory change",
    ],
    premium: true,
    testsFundamentals: ["law-admin-legitimate-expectations-estoppel", "law-admin-retroactive-application"],
  },
  {
    id: "law-admin-biased-decisionmaker-recusal",
    profession: "law",
    category: "Administrative Law",
    title: "A Licensing Panel Member Who Competes With the Applicant",
    scenario:
      "Your client's application for a specialty pharmacy license was denied by a three-member licensing panel, and your client has since discovered that one panel member owns a minority stake in a competing pharmacy located four blocks from the proposed location, a fact the member never disclosed before voting to deny the application. The panel's decision was not unanimous, decided 2-1, with the undisclosed panel member voting with the majority. The agency argues the member's stake is too small to matter and that the decision would have been the same regardless. You are advising on challenging the decision for bias.",
    keyIssues: [
      "Whether an undisclosed financial interest in a competitor creates a disqualifying conflict of interest regardless of the stake's size",
      "Whether the decision can stand if the outcome would arguably have been the same without the biased member's vote, given the panel split 2-1",
      "Appropriate remedy: automatic invalidation versus remand for reconsideration by an unconflicted panel",
      "Disclosure obligations decision-makers owe before, not after, a vote on a matter where they hold a personal interest",
    ],
    expectedConcepts: [
      "conflict of interest / disqualifying bias",
      "apparent versus actual bias standard",
      "harmless error / same-outcome defense",
      "remand to an unconflicted decision-maker",
      "disclosure duties of adjudicators",
    ],
    modelApproach:
      "A strong answer argues that a disqualifying conflict is generally assessed by whether a reasonable observer would perceive a risk of bias, not by precisely quantifying the decision-maker's financial stake, and that a non-unanimous 2-1 vote makes the 'same outcome anyway' defense particularly weak since the conflicted vote was decisive. It seeks remand to a reconstituted, unconflicted panel rather than treating the original denial as curable after the fact.",
    furtherReading: [
      "Disqualifying bias and conflict of interest in administrative adjudication",
      "Apparent bias standard versus proof of actual bias",
      "Harmless error doctrine in administrative decision review",
    ],
    premium: true,
    testsFundamentals: ["law-admin-conflict-of-interest-bias"],
  },
  {
    id: "law-admin-agency-silence-deemed-denial",
    profession: "law",
    category: "Administrative Law",
    title: "An Application Left Unanswered for Fourteen Months",
    scenario:
      "Your client applied for a permit to expand a logistics facility fourteen months ago, and the licensing authority has neither approved, denied, nor requested further information since, despite the statute requiring a decision 'within a reasonable time' and your client's three separate written follow-ups going unanswered. Your client's lease on adjacent land needed for the expansion expires in two months, and competitors who applied after your client have already received decisions. You are advising on what relief is available for the agency's prolonged silence and whether it can be treated as an effective denial your client may now challenge.",
    keyIssues: [
      "Whether prolonged silence past any reasonable-time requirement can be treated as a deemed decision that triggers a right to challenge or appeal",
      "Available compulsion remedies to force the agency to actually decide, as distinct from deeming a result",
      "Relevance of the agency having decided later-filed competitor applications as evidence the delay is unreasonable and not simply a general backlog",
      "Practical sequencing given the looming lease deadline: compulsion versus a deemed-denial challenge, and which is faster",
    ],
    expectedConcepts: [
      "agency silence and deemed decisions",
      "compulsion or mandamus-type relief to force a decision",
      "reasonable time standard for administrative decisions",
      "comparator evidence of selective delay",
      "exhaustion of remedies where no decision has issued",
    ],
    modelApproach:
      "A strong answer identifies which of the two tools, treating the silence as a deemed denial so the client can appeal on the merits, or seeking a direct order compelling the agency to decide, is faster and more reliable given the looming lease deadline, rather than pursuing both without a clear sequencing plan. It uses the agency's timely handling of later-filed competitor applications as strong evidence the delay is not a neutral backlog problem, strengthening the compulsion argument.",
    furtherReading: [
      "Deemed decisions and the consequences of agency silence",
      "Compulsion remedies to force administrative action",
      "Reasonable-time standards for administrative decision-making",
    ],
    premium: true,
    testsFundamentals: ["law-admin-silence-deemed-decision"],
  },
  {
    id: "law-admin-competitor-intervention-license",
    profession: "law",
    category: "Administrative Law",
    title: "A Competitor Seeks to Block a Rival's New License",
    scenario:
      "Your client applied for a license to operate a second ambulance service in a region currently served by a single incumbent provider, and the incumbent has petitioned the licensing authority to intervene in the proceeding, arguing that a second provider would fragment demand below the level needed to sustain adequate service for either company and that the authority must consider the incumbent's own operational viability before granting a competing license. Your client argues the incumbent has no legal interest in the matter beyond ordinary competitive disadvantage. You are advising on whether the incumbent should be allowed to participate and what standard governs that threshold question.",
    keyIssues: [
      "Whether a competitor's purely commercial interest in avoiding new competition is sufficient to grant it standing to intervene in another applicant's licensing proceeding",
      "Distinguishing a legally cognizable interest, such as a statutory service-area protection if one exists, from ordinary competitive disadvantage",
      "Whether the licensing statute's criteria actually authorize the agency to weigh an incumbent's commercial viability at all, or only public-interest factors",
      "Practical consequences of allowing intervention: delay, an expanded record, and the risk the incumbent uses the process to obstruct rather than genuinely inform the decision",
    ],
    expectedConcepts: [
      "third-party intervention and standing in administrative proceedings",
      "legally cognizable interest versus mere competitive disadvantage",
      "scope of statutory licensing criteria",
      "procedural efficiency versus participatory rights",
      "public interest versus private commercial interest",
    ],
    modelApproach:
      "A strong answer tests the incumbent's claimed interest against whatever the licensing statute actually authorizes the agency to consider, arguing that ordinary competitive disadvantage is not, by itself, a legally cognizable interest unless the statute specifically protects incumbents from added competition. It flags the practical risk that granting broad intervention rights invites delay and tactical obstruction, while acknowledging that some narrow, structured participation, such as a written comment without full party status, may be a defensible middle ground.",
    furtherReading: [
      "Standing and intervention rights of third parties in licensing proceedings",
      "Legally cognizable interest versus general competitive disadvantage",
      "Scope of statutory criteria in administrative licensing decisions",
    ],
    premium: true,
    testsFundamentals: ["law-admin-third-party-intervenor-rights"],
  },
  {
    id: "law-admin-consent-order-breach",
    profession: "law",
    category: "Administrative Law",
    title: "Reopening a Settled Enforcement Matter After an Alleged Breach",
    scenario:
      "Eighteen months ago, your client settled a regulatory enforcement action over workplace safety violations by signing a consent order agreeing to specific remedial measures and a reduced fine, with the order stating the agency would take no further action over the underlying violations 'provided the remedial measures are completed within twelve months.' The agency now claims one minor remedial measure, a signage update at two of fourteen facility locations, was completed eight weeks after the deadline, and it is seeking to reopen the entire original enforcement action, including the originally threatened larger fine. You are advising on whether the agency may do so.",
    keyIssues: [
      "Whether a minor, partial delay in completing one remedial measure justifies reopening the entire settled matter, or only a proportionate response to the specific lapse",
      "Binding effect of a consent order on both parties, and whether the agency's own conduct, if it never objected until now, is relevant",
      "Interpretation of the order's completion condition and whether substantial, if not perfectly timely, compliance satisfies it",
      "Available defenses and remedies short of full reopening, such as a supplemental, narrower penalty tied only to the specific delay",
    ],
    expectedConcepts: [
      "binding effect of administrative consent orders and settlements",
      "substantial compliance versus strict compliance with a settlement condition",
      "proportionate response to a partial breach",
      "estoppel from the agency's own delayed objection",
      "interpretation of settlement conditions",
    ],
    modelApproach:
      "A strong answer argues that a consent order, like other negotiated settlements, should generally be read to tie consequences to the significance of the breach rather than allowing any minor shortfall to unravel the entire bargain, and tests whether substantial compliance with the remedial measures as a whole should satisfy the order's condition despite one late, minor item. It also examines whether the agency's own delay in raising the issue weakens its position, and proposes a narrower, proportionate response as the realistic negotiated outcome.",
    furtherReading: [
      "Binding effect and interpretation of administrative consent orders",
      "Substantial compliance doctrine in settlement conditions",
      "Proportionate response to partial breach of a negotiated settlement",
    ],
    premium: true,
    testsFundamentals: ["law-admin-administrative-settlement-consent-order"],
  },
  {
    id: "law-admin-new-evidence-on-appeal",
    profession: "law",
    category: "Administrative Law",
    title: "Introducing New Evidence on Judicial Review of a Denied Application",
    scenario:
      "Your client's application for an import license was denied based on the agency's finding that the imported product failed a specific safety standard, relying on a laboratory test the agency commissioned but never shared with your client before the decision. Your client has since obtained its own independent laboratory analysis, conducted after the denial, that reaches the opposite conclusion, and wants to introduce it in the judicial review proceeding challenging the denial. The agency argues review is confined to the administrative record as it existed when the decision was made, and that any new evidence must instead be presented through a fresh application. You are advising on the admissibility of the new test and the related non-disclosure argument.",
    keyIssues: [
      "Whether review is confined to the record before the agency at the time of decision, and what exceptions, if any, allow new evidence to be introduced on review",
      "Whether the agency's failure to disclose its own test results before deciding is itself a separate, independent procedural defect regardless of whose test is ultimately correct",
      "Strategic choice between pursuing the non-disclosure argument on the existing record versus trying to introduce the new independent test",
      "Risk and benefit of a remand that would let the agency consider the new test itself rather than the reviewing court weighing it directly",
    ],
    expectedConcepts: [
      "scope of judicial review confined to the administrative record",
      "exceptions allowing supplementation of the record",
      "duty to disclose evidence relied upon before deciding",
      "remand for consideration of new evidence",
      "procedural versus substantive grounds for challenge",
    ],
    modelApproach:
      "A strong answer leads with the non-disclosure argument, since failing to share the test result the agency itself relied on is a procedural defect decidable on the existing record without needing any exception to the record-based review rule, and treats introducing the client's own new test as a separate, harder argument that depends on whether the relevant system recognizes a narrow exception for evidence that could not reasonably have been presented earlier. It recommends seeking remand so the agency itself weighs the new test in the first instance, rather than asking a reviewing court to resolve a dispute between competing laboratory results.",
    furtherReading: [
      "Scope of judicial review and the administrative record rule",
      "Exceptions permitting supplementation of the record on review",
      "Disclosure obligations for evidence relied upon in an administrative decision",
    ],
    premium: true,
    testsFundamentals: ["law-admin-record-based-review-scope"],
  },
  {
    id: "law-admin-permit-fee-overcharge",
    profession: "law",
    category: "Administrative Law",
    title: "A Permit Fee That Funds More Than the Permitting Program",
    scenario:
      "A municipal planning authority charges a fixed 'development review fee' for building permits that your client, a mid-sized developer, estimates is roughly four times the authority's actual average cost of reviewing and processing an application of that type, based on the authority's own published budget figures, with the surplus revenue flowing into the municipality's general fund rather than the permitting program itself. Your client has paid the fee under protest on its last three permits and wants to challenge the fee's legality and recover the overpayment, while the authority argues it has broad discretion to set fees at any level the governing statute allows. You are advising on the challenge.",
    keyIssues: [
      "Whether an administrative fee must be reasonably tied to the actual cost of providing the service, or whether broader revenue-raising is permissible depending on the statutory authority",
      "Evidentiary weight of the authority's own budget figures as proof the fee substantially exceeds cost",
      "Significance of the surplus flowing to the general fund rather than the permitting program, as evidence the fee functions as a disguised tax rather than a genuine cost-recovery charge",
      "Available remedy: prospective reduction of the fee versus retrospective recovery of amounts already paid under protest",
    ],
    expectedConcepts: [
      "cost-recovery limits on administrative fees",
      "fee versus disguised tax distinction",
      "burden of proof using the agency's own cost data",
      "payment under protest preserving a refund claim",
      "prospective versus retrospective remedies",
    ],
    modelApproach:
      "A strong answer anchors the challenge in the authority's own published cost figures rather than an independent cost estimate, since using the agency's own numbers forecloses an easy factual dispute, and frames the surplus flowing to the general fund as the strongest single piece of evidence that the charge functions as a revenue-raising tax rather than a genuine cost-recovery fee. It treats the client's payment under protest as what preserves the retrospective refund claim, and argues for both a prospective fee correction and recovery of the identified overpayment.",
    furtherReading: [
      "Cost-recovery limits on administrative and regulatory fees",
      "Distinguishing a fee from a disguised tax",
      "Payment under protest and preservation of refund claims",
    ],
    premium: true,
    testsFundamentals: ["law-admin-fee-cost-recovery"],
  },
  {
    id: "law-admin-anonymous-complaint-inspection-trigger",
    profession: "law",
    category: "Administrative Law",
    title: "An Investigation Launched From an Anonymous Competitor Tip",
    scenario:
      "A workplace-standards agency opened a full compliance investigation into your client's manufacturing plant after receiving an anonymous complaint that your client suspects was filed by a competitor seeking to disrupt operations during a critical production period, rather than by a genuine employee with a workplace concern, since the complaint's specific internal details suggest access to information not available to employees at your client's facility. The agency refuses to disclose the complainant's identity or any detail about the complaint's origin, citing confidentiality protections for complainants, while proceeding with a full on-site investigation. You are advising on challenging the investigation's basis and on the limits of complainant confidentiality.",
    keyIssues: [
      "Whether an agency may rely on an anonymous or unverified complaint to open a full investigation, and what minimum threshold of credibility, if any, the law requires before doing so",
      "Scope and limits of complainant confidentiality protections, and whether they can be overridden where the complaint's legitimacy is itself genuinely in question",
      "Whether the suspected competitor motive is a relevant basis to challenge the investigation's scope or conduct, as opposed to merely its origin",
      "Practical remedies: narrowing the investigation's scope or seeking disclosure of limited non-identifying details, versus challenging the investigation's legitimacy outright",
    ],
    expectedConcepts: [
      "complaint- or referral-triggered investigations",
      "complainant confidentiality protections and their limits",
      "threshold of credibility required to open an investigation",
      "investigatory scope and proportionality",
      "protection against competitively motivated misuse of complaint mechanisms",
    ],
    modelApproach:
      "A strong answer accepts that agencies generally may act on anonymous tips and that complainant confidentiality serves a genuine protective purpose, but argues that confidentiality protects identity, not the agency's duty to apply some minimum threshold of plausibility before committing investigatory resources, and that evidence suggesting a competitor motive is relevant to scope and fairness even if it cannot by itself end the investigation. It recommends seeking a narrower, more targeted investigation rather than demanding its termination outright, since outright termination is the harder, less likely remedy to obtain.",
    furtherReading: [
      "Complaint- and referral-triggered administrative investigations",
      "Complainant confidentiality protections and their limits",
      "Proportionality and scope limits in administrative investigations",
    ],
    premium: true,
    testsFundamentals: ["law-admin-whistleblower-referral-inspection", "law-admin-investigation-powers-limits"],
  },
];
