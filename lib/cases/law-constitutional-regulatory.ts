import type { CaseStudy } from "@/lib/caseStudyContent";
import type { Fundamental } from "@/lib/caseStudyFundamentals";

/**
 * Law / Constitutional & Regulatory: the fundamentals checklist and the case bank
 * for this category, kept together so they can be written and reviewed as
 * one unit. Registered in lib/cases/index.ts.
 *
 * Every case is written to be jurisdiction-neutral: it must make sense when
 * machine-translated and graded against the US, German, French, Spanish, or
 * Swedish legal/constitutional system, so it avoids any single country's
 * statutes, courts, or procedural vocabulary in favor of generic doctrine
 * that exists (in some form) across all five.
 */
export const LAW_CONSTITUTIONAL_REGULATORY_FUNDAMENTALS: Fundamental[] = [
  { id: "law-const-separation-of-powers", label: "Applying separation of powers and institutional checks to determine which branch may lawfully take a contested action" },
  { id: "law-const-judicial-review-mechanism", label: "Identifying the correct forum and mechanism for judicial review of a law or government action in a given legal system" },
  { id: "law-const-standing-justiciability", label: "Assessing standing, ripeness, and justiciability before a court will reach the merits of a constitutional claim" },
  { id: "law-const-proportionality", label: "Applying a proportionality or scrutiny test to decide whether a rights-infringing measure is justified" },
  { id: "law-const-freedom-of-expression", label: "Balancing freedom of expression against restrictions grounded in incitement, public order, or reputational harm" },
  { id: "law-const-religious-freedom-neutrality", label: "Reconciling individual religious freedom with the state's duty of neutrality toward religion" },
  { id: "law-const-due-process", label: "Determining the fair-hearing and notice protections owed before government action deprives a person of a right, benefit, or property" },
  { id: "law-const-property-expropriation", label: "Evaluating an expropriation or regulatory-takings claim and the compensation owed to the affected owner" },
  { id: "law-const-vertical-power-division", label: "Allocating regulatory competence between the central government and regional or subnational authorities" },
  { id: "law-const-supranational-primacy", label: "Resolving a conflict between supranational or international legal obligations and domestic constitutional law" },
  { id: "law-const-agency-deference", label: "Determining how much deference a reviewing court owes a regulator's interpretation of its own governing statute" },
  { id: "law-const-administrative-appeal-review", label: "Choosing between an internal administrative appeal and judicial review, and applying the applicable standard of review to a regulator's decision" },
  { id: "law-const-emergency-powers", label: "Assessing the constitutional limits on emergency or crisis powers, including duration, scope, and legislative oversight" },
  { id: "law-const-militant-democracy", label: "Applying constitutional limits on political parties or associations that threaten the democratic order" },
  { id: "law-const-horizontal-effect", label: "Determining whether constitutional rights protections extend into disputes between private parties" },
  { id: "law-const-transparency-foia", label: "Applying freedom-of-information and transparency law to a request for government records, including permissible exemptions" },
  { id: "law-const-independent-oversight", label: "Using an independent oversight body to challenge maladministration as an alternative or complement to litigation" },
  { id: "law-const-constitutional-amendment", label: "Distinguishing ordinary legislation from entrenched constitutional provisions that require a special amendment procedure" },
  { id: "law-const-regulatory-rulemaking-procedure", label: "Assessing whether a regulator followed the required procedural steps — notice, consultation, reasoned explanation — in adopting a binding rule" },
  { id: "law-const-data-protection-rights", label: "Applying constitutional or fundamental-rights protection of personal data and privacy against state data collection or surveillance" },
];

export const LAW_CONSTITUTIONAL_REGULATORY_CASES: CaseStudy[] = [
  {
    id: "law-const-agency-enforcement",
    profession: "law",
    category: "Constitutional & Regulatory",
    title: "Appealing a Regulatory Enforcement Action",
    scenario:
      "The national environmental regulator has fined your manufacturing client 2.4 million for exceeding emissions thresholds, based on a testing methodology your client's experts argue is scientifically outdated compared to methods used elsewhere in the sector. The decision followed an internal review that lasted only two weeks. Your client wants to know whether to accept the fine, pursue an internal administrative appeal, or go straight to judicial review, and needs a recommendation before the payment deadline in three weeks. You are advising on strategy and the realistic odds of success.",
    keyIssues: [
      "Standard of review a court applies to a regulator's technical and methodological findings, and how much deference it owes",
      "Strength of the scientific challenge to the testing methodology as a ground for appeal",
      "Procedural choice between an internal administrative appeal and direct judicial review, including which preserves more options",
      "Cost and delay of a prolonged challenge against a negotiated settlement or reduced penalty",
    ],
    expectedConcepts: [
      "administrative deference",
      "arbitrary and unreasonable review standard",
      "internal administrative appeal",
      "judicial review",
      "regulatory settlement",
      "burden of proof",
    ],
    modelApproach:
      "A strong answer is realistic about the high bar for overturning a regulator's technical determination under whatever deference standard applies in the relevant system, while assessing whether the outdated-methodology argument is strong enough to meet an arbitrary-or-unreasonable standard. It sequences the internal administrative appeal before judicial review where that is required or strategically advantageous, and weighs a negotiated settlement against the cost, delay, and uncertainty of a full challenge.",
    furtherReading: [
      "Comparative administrative deference doctrines across common-law and civil-law systems",
      "Standards of review for agency fact-finding and methodology",
      "Negotiated settlement and consent-order practice in regulatory enforcement",
    ],
    testsFundamentals: ["law-const-agency-deference", "law-const-administrative-appeal-review"],
  },
  {
    id: "law-const-content-moderation",
    profession: "law",
    category: "Constitutional & Regulatory",
    title: "Free Expression vs. Platform Moderation",
    scenario:
      "A user is suing a social media platform, your client, after it removed their political content, arguing that the platform must respect free-expression rights because it functions as a modern public square and dominates the national online-speech market. Your client is a private company, not part of the government, and its terms of service reserve broad discretion to moderate content. You are drafting the initial response, and the platform's leadership wants both the doctrinal defense and an assessment of whether newer platform-regulation statutes create obligations that ordinary constitutional rights doctrine would not.",
    keyIssues: [
      "Whether constitutional free-expression guarantees bind a private actor directly, and the narrow exceptions where they do (horizontal effect)",
      "Whether market dominance alone converts a private platform into an entity bound by constitutional rights obligations",
      "Statutory or regulatory content-moderation duties that may apply to large platforms independent of constitutional doctrine",
      "How the platform's own terms of service and any duty of consistent, non-arbitrary enforcement factor into the dispute",
    ],
    expectedConcepts: [
      "horizontal effect (direct vs. indirect)",
      "state action / public function doctrine",
      "freedom of expression",
      "platform regulation duties",
      "terms of service enforcement",
      "proportionality",
    ],
    modelApproach:
      "A strong answer leads with whether the relevant legal system recognizes any horizontal effect of expression rights against private actors, and if so how it operates (direct in some systems, indirect via interpretation of ordinary law in others, largely absent in others), rather than assuming constitutional rights apply to private companies the same way they apply to the state. It then layers in any platform-specific statutory obligations the client may face regardless of constitutional doctrine, and evaluates the terms-of-service and consistent-enforcement argument as a separate, narrower theory of liability.",
    furtherReading: [
      "Comparative horizontal effect doctrines: direct effect, indirect effect, and the state action requirement",
      "Large-platform content moderation and transparency obligations",
      "Terms of service enforcement and arbitrary/inconsistent application claims",
    ],
    testsFundamentals: ["law-const-freedom-of-expression", "law-const-horizontal-effect"],
  },
  {
    id: "law-const-protest-ordinance",
    profession: "law",
    category: "Constitutional & Regulatory",
    title: "Permitting a Protest Route Through the Capital's Financial District",
    scenario:
      "A coalition planning a demonstration against a proposed pension reform has applied for a permit to march through the capital's financial district on a weekday morning, expecting up to 15,000 participants. City officials want to reroute the march to a park three kilometers away, citing traffic disruption and business complaints, but the organizers argue the rerouting is really about muting their message near the ministries the protest is meant to target, and note that a business-friendly rally was permitted through the same district last month without objection. The city has asked you, as its counsel, to defend the rerouting decision or recommend a different approach before the permit deadline in five days.",
    keyIssues: [
      "Whether the rerouting decision is genuinely content-neutral (about time, place, and manner) or a disguised content-based restriction on the protest's message",
      "The comparative treatment of the earlier business rally as evidence of viewpoint discrimination",
      "Proportionality of the traffic/disruption justification against the significant burden of moving the march away from its intended target",
      "Practical alternatives (partial route, timing changes, security measures) that would address the city's stated concerns without silencing the message",
    ],
    expectedConcepts: [
      "content-based vs. content-neutral restriction",
      "freedom of expression",
      "proportionality",
      "viewpoint discrimination",
      "time, place, and manner regulation",
    ],
    modelApproach:
      "A strong answer tests the city's stated traffic justification against the disparate treatment of the earlier business rally, since inconsistent treatment of comparable events is strong evidence the restriction is not genuinely content-neutral. It applies a proportionality analysis rather than a binary framing of free expression versus no free expression, and proposes a narrower alternative (partial closure, revised timing) that serves the city's legitimate interest without moving the protest away from its intended audience.",
    furtherReading: [
      "Proportionality analysis in restrictions on assembly and protest",
      "Content-neutral time, place, and manner regulation compared across legal systems",
      "Viewpoint discrimination and comparator evidence in free-expression claims",
    ],
    premium: true,
    testsFundamentals: ["law-const-freedom-of-expression", "law-const-proportionality"],
  },
  {
    id: "law-const-infrastructure-expropriation",
    profession: "law",
    category: "Constitutional & Regulatory",
    title: "Compensation Dispute Over a Rail-Corridor Expropriation",
    scenario:
      "The transport ministry has expropriated a strip of your client's family-owned farmland to build a new high-speed rail corridor, offering compensation based on the land's current agricultural value of roughly 40,000 per hectare. Your client argues the valuation ignores the land's realistic near-term rezoning potential for logistics warehousing, which comparable nearby parcels sold for at more than six times that price after a similar rezoning two years ago, and that the expropriation notice gave only ten days to respond before the compulsory transfer took effect. You are preparing your client's challenge, which can contest the valuation, the process, or both.",
    keyIssues: [
      "Whether expropriation for a rail corridor qualifies as a valid public-use/public-interest purpose, which is rarely the harder question",
      "Whether just compensation must reflect realistic future-use potential rather than only current use",
      "Whether the ten-day notice period satisfied the fair-hearing and adequate-notice requirements owed before a compulsory taking",
      "Strategic choice between contesting valuation, contesting process, or both, given the relative strength and cost of each",
    ],
    expectedConcepts: [
      "expropriation / eminent domain",
      "just compensation",
      "public use or public interest requirement",
      "fair market value including development potential",
      "procedural due process",
    ],
    modelApproach:
      "A strong answer does not waste effort contesting the public-interest purpose of a rail corridor, which is a weak line of attack, and instead concentrates on valuation and process. It builds the compensation argument around the comparable rezoned parcels as evidence of realistic development-adjusted value, and treats the truncated notice period as an independent, potentially decisive procedural defect that could unwind the taking or force renewed proceedings regardless of how the valuation dispute is resolved.",
    furtherReading: [
      "Just compensation and the valuation of development potential in expropriation cases",
      "Public use / public interest requirements compared across legal systems",
      "Notice and fair-hearing requirements in compulsory purchase procedures",
    ],
    premium: true,
    testsFundamentals: ["law-const-property-expropriation", "law-const-due-process"],
  },
  {
    id: "law-const-standing-environmental-challenge",
    profession: "law",
    category: "Constitutional & Regulatory",
    title: "Standing to Challenge a Coastal Development Permit",
    scenario:
      "An environmental association with 200 members, none of whom live within 50 kilometers of the site, has filed a legal challenge against a permit your client's company received to build a marina on a protected coastline, arguing the environmental impact assessment understated damage to a seabird nesting habitat. The association has no members who use the specific beach in question, though it has a stated organizational mission of coastal conservation nationwide, and construction is scheduled to begin in six weeks. You are advising your client on whether to move to dismiss the challenge on standing and ripeness grounds before engaging on the merits of the environmental assessment.",
    keyIssues: [
      "Whether an organization with a general mission-based interest, but no member with a concrete individual injury, has standing to sue",
      "Whether organizational or public-interest standing exists as a distinct route where individual standing is weak",
      "Whether the challenge is ripe given that construction has not yet begun",
      "Cost and risk of leading with a standing/ripeness defense versus engaging directly on the merits of the environmental assessment",
    ],
    expectedConcepts: [
      "standing",
      "organizational/associational standing",
      "ripeness",
      "justiciability",
      "concrete and particularized injury",
    ],
    modelApproach:
      "A strong answer recognizes that standing rules vary significantly by system — some jurisdictions recognize broad organizational or public-interest standing for environmental associations regardless of individual injury, while others require a concrete, particularized injury — so it identifies which regime governs before predicting the outcome. It treats a standing/ripeness motion as a genuine strategic option that could end the case without ever reaching the environmental assessment's merits, while flagging the risk that a court sympathetic to organizational standing will simply proceed to the merits anyway.",
    furtherReading: [
      "Comparative standing doctrine: individual injury requirements versus organizational/public-interest standing",
      "Ripeness and pre-enforcement review of permitting decisions",
      "Environmental impact assessment challenges and procedural review",
    ],
    premium: true,
    testsFundamentals: ["law-const-standing-justiciability", "law-const-judicial-review-mechanism"],
  },
  {
    id: "law-const-regional-environmental-competence",
    profession: "law",
    category: "Constitutional & Regulatory",
    title: "A Region's Stricter Emissions Rule Meets National and Supranational Law",
    scenario:
      "A regional government has enacted a rule capping industrial emissions at a level 30 percent stricter than the national standard, and your client, a chemical manufacturer with a plant in the region, must decide whether to comply, challenge the regional rule as exceeding the region's constitutional competence, or argue it is displaced by a recently adopted supranational directive that already occupies the same regulatory field at the stricter national-standard level. Compliance with the regional rule would cost the plant approximately 8 million in retrofits, on a timeline the company says it cannot meet before the rule's effective date in four months. You are advising on which challenge, if any, is strongest.",
    keyIssues: [
      "Whether environmental standard-setting falls within the region's constitutional competence or is reserved to the central government",
      "Whether the supranational directive preempts both the national standard and the stricter regional rule, or merely sets a floor regions may exceed",
      "Practical sequencing: seeking interim relief against the four-month deadline while the competence question is litigated",
      "Risk that winning on competence grounds still leaves the client facing an equally stringent supranational-law requirement",
    ],
    expectedConcepts: [
      "division of competence between central and regional government",
      "primacy of supranational/international law",
      "preemption / occupied field",
      "minimum-standard vs. maximum-harmonization rules",
      "interim relief",
    ],
    modelApproach:
      "A strong answer separates two distinct questions that are easy to conflate: whether the region had constitutional authority to legislate at all, and, independently, whether a supranational directive already occupies the field regardless of the domestic competence answer. It recognizes that many supranational regimes set floors, not ceilings, so a region may remain free to exceed the supranational minimum even if it lacked domestic competence to do so for other reasons, and it flags interim relief as the client's most time-sensitive lever given the four-month deadline.",
    furtherReading: [
      "Division of legislative competence between central and regional government",
      "Primacy of supranational law and minimum-harmonization directives",
      "Preemption and occupied-field doctrine in multi-level legal systems",
    ],
    premium: true,
    testsFundamentals: ["law-const-vertical-power-division", "law-const-supranational-primacy"],
  },
  {
    id: "law-const-religious-symbol-workplace",
    profession: "law",
    category: "Constitutional & Regulatory",
    title: "A Public Employee's Religious Dress and the State's Neutrality Duty",
    scenario:
      "A schoolteacher employed by the public education authority has been told she may not wear a religious head covering while teaching, under a rule requiring state employees to appear religiously neutral in front of students, and she is challenging the rule as a violation of her individual religious freedom. The education authority argues the neutrality rule protects students' own freedom of conscience and public confidence in a secular state education system, while the teacher argues the rule singles out visible religious dress without banning any other personal expression and has never been applied to a small secular pendant a colleague wears. You are advising the education authority on whether the rule, as applied, would likely survive a legal challenge.",
    keyIssues: [
      "Whether the neutrality rule serves a legitimate and sufficiently weighty state interest to justify restricting an employee's religious freedom",
      "Whether the rule is applied consistently, or singles out visible religious symbols while tolerating comparable secular expression",
      "Proportionality of a full ban on visible religious dress versus a narrower alternative",
      "How the answer might differ for a public-facing authority role versus a private employer's dress code",
    ],
    expectedConcepts: [
      "freedom of religion",
      "state neutrality / secularism",
      "proportionality",
      "indirect discrimination",
      "least restrictive means",
    ],
    modelApproach:
      "A strong answer does not treat this as religious freedom versus neutrality in the abstract; it tests the neutrality rule's legitimate purpose against its actual scope and consistency, treating the untouched secular pendant as strong evidence the rule is not applied even-handedly. It applies a proportionality/least-restrictive-means analysis to ask whether a narrower rule, limited to specific classroom activities, would serve the same interest with less impact on the employee's religious freedom.",
    furtherReading: [
      "State neutrality and secularism doctrines compared across legal systems",
      "Proportionality review of workplace religious-dress restrictions",
      "Indirect discrimination and consistency-of-enforcement analysis",
    ],
    premium: true,
    testsFundamentals: ["law-const-religious-freedom-neutrality", "law-const-proportionality"],
  },
  {
    id: "law-const-benefit-termination-hearing",
    profession: "law",
    category: "Constitutional & Regulatory",
    title: "Terminating a Disability Benefit Without a Prior Hearing",
    scenario:
      "The national social security agency has terminated a client's disability benefit, worth about 950 per month, after a routine file review flagged inconsistencies, without giving her any opportunity to respond before the payments stopped. She has no other income, and the termination letter arrived the same week the payments simply ceased. The agency's position is that a post-termination appeal process, which typically takes four to six months to resolve, provides all the process she is owed. You are advising her on whether the lack of a pre-termination hearing is itself a valid ground for challenge, separate from whether the agency's underlying eligibility determination was correct.",
    keyIssues: [
      "Whether due process requires a hearing before termination of an existing benefit, given the recipient's reliance and hardship",
      "Balancing the recipient's private interest, the risk of erroneous deprivation, and the agency's administrative burden in providing a pre-termination hearing",
      "Whether a lengthy post-termination appeal cures a due-process defect or merely mitigates it",
      "Practical relief available: reinstatement pending appeal versus a remedy for the process violation alone",
    ],
    expectedConcepts: [
      "procedural due process",
      "fair hearing",
      "balancing test (private interest, risk of error, administrative burden)",
      "interim/provisional relief",
      "administrative appeal",
    ],
    modelApproach:
      "A strong answer separates the due-process claim from the merits of the eligibility redetermination, since a recipient can win on process even if the underlying eligibility question is genuinely close. It applies a balancing test weighing the severity of hardship from an erroneous termination, the recipient's reliance on the ongoing benefit, and the agency's cost of providing a pre-termination hearing, and argues that a slow post-termination appeal does not substitute for a hearing before an ongoing benefit is cut off.",
    furtherReading: [
      "Procedural due process balancing tests for termination of government benefits",
      "Pre-deprivation versus post-deprivation hearing requirements",
      "Interim reinstatement pending administrative appeal",
    ],
    premium: true,
    testsFundamentals: ["law-const-due-process", "law-const-administrative-appeal-review"],
  },
  {
    id: "law-const-emergency-decree-extension",
    profession: "law",
    category: "Constitutional & Regulatory",
    title: "Extending Emergency Powers by Lowering the Amendment Threshold",
    scenario:
      "Facing a public-health crisis, the government invoked constitutional emergency powers six months ago to restrict large gatherings, and has now asked the legislature to pass, by simple majority, a change to the constitutional provision that would let future emergency declarations run indefinitely without renewal, instead of the current requirement of a two-thirds legislative vote to renew every 30 days. The opposition, which holds enough seats to block a two-thirds vote but not a simple majority, argues the change is itself a core structural amendment requiring the higher threshold it would abolish, while the government argues it is ordinary legislation implementing the existing emergency clause. You are advising a constitutional-affairs committee on how this dispute should be resolved and on the underlying limits on emergency power itself.",
    keyIssues: [
      "Whether a change to the entrenched threshold for renewing emergency powers is itself an entrenched constitutional amendment, or ordinary legislation adoptable by simple majority",
      "Substantive limits on the scope and duration of emergency powers even if the procedural threshold question is set aside",
      "The separation-of-powers risk of letting the executive branch effectively rewrite the legislature's own check on emergency power",
      "What role, if any, judicial review plays in policing the boundary between ordinary legislation and entrenched constitutional change",
    ],
    expectedConcepts: [
      "emergency/crisis powers",
      "constitutional entrenchment and amendment procedure",
      "separation of powers",
      "sunset and renewal requirements",
      "judicial review of constitutional amendments",
    ],
    modelApproach:
      "A strong answer identifies that the proposal is self-referential — a simple-majority vote to remove the very supermajority check that constrains simple-majority action — and treats that structural feature as strong evidence the change is itself an entrenched constitutional amendment requiring the higher threshold, not ordinary legislation. It separately evaluates whether indefinite, unrenewed emergency power is substantively consistent with constitutional limits on crisis governance regardless of how the threshold question is resolved, and flags judicial review as the likely forum for resolving the procedural dispute if the legislature does not.",
    furtherReading: [
      "Constitutional entrenchment and amendment-procedure doctrine",
      "Substantive and procedural limits on emergency/crisis powers",
      "Separation of powers and legislative oversight of executive emergency action",
    ],
    premium: true,
    testsFundamentals: ["law-const-emergency-powers", "law-const-constitutional-amendment", "law-const-separation-of-powers"],
  },
  {
    id: "law-const-party-deregistration",
    profession: "law",
    category: "Constitutional & Regulatory",
    title: "Deregistering a Party Accused of Anti-Democratic Aims",
    scenario:
      "The national election authority has asked a court to deregister a political party that won 4 percent of the vote in the last election, citing party publications that call for suspending regular elections and concentrating power in an unelected council if the party ever takes office. The party argues the publications are political rhetoric protected as free expression and that deregistration would disenfranchise its voters, while the authority argues the party's own platform, not just its rhetoric, is incompatible with the democratic order the constitution protects. You are advising the court-appointed panel on the standard that should govern this decision.",
    keyIssues: [
      "The standard for banning or deregistering a political party as a defense of the democratic order (militant democracy), and how it differs from ordinary content-based restriction of speech",
      "Distinguishing protected political rhetoric and criticism of the current system from a genuine, actionable program to abolish democratic government",
      "Proportionality of deregistration, a drastic remedy, versus lesser measures such as loss of public funding or restrictions on specific conduct",
      "The democratic cost of disenfranchising the party's existing voters against the risk of tolerating an anti-democratic movement",
    ],
    expectedConcepts: [
      "militant democracy",
      "freedom of expression",
      "proportionality",
      "party ban / deregistration standard",
      "imminent threat versus rhetoric",
    ],
    modelApproach:
      "A strong answer treats militant-democracy doctrine as a narrow, high-threshold exception to ordinary free-expression protection, not an ordinary content-based restriction, and requires evidence of a genuine, actionable program against the democratic order rather than provocative rhetoric alone. It weighs deregistration against proportionate lesser measures, and does not treat the party's electoral support as irrelevant, since disenfranchising an existing electorate is itself a real cost the standard must account for.",
    furtherReading: [
      "Militant democracy and party-ban doctrines compared across legal systems",
      "Proportionality of lesser measures short of deregistration (funding restrictions, conduct-specific bans)",
      "The line between political rhetoric and an actionable anti-democratic program",
    ],
    premium: true,
    testsFundamentals: ["law-const-militant-democracy", "law-const-freedom-of-expression"],
  },
  {
    id: "law-const-records-request-denial",
    profession: "law",
    category: "Constitutional & Regulatory",
    title: "A National-Security Exemption to a Records Request",
    scenario:
      "A journalist has requested internal correspondence about the government's decision to award a 60 million infrastructure contract without competitive tender, and the relevant ministry has denied the request in full, citing a national-security exemption in the transparency law even though the contract concerns road maintenance with no obvious security dimension. The journalist's outlet has asked you to advise on challenging the denial, noting the ministry provided no explanation of how the exemption applies beyond citing its label, and that partial, redacted release was never considered. You are preparing the challenge and advising on the standard the reviewing body will likely apply.",
    keyIssues: [
      "Whether the ministry's bare citation of an exemption, without explaining its application to these specific records, satisfies the transparency law's requirements",
      "Whether a blanket denial is justified when partial or redacted disclosure was never considered",
      "The burden of proof for invoking an exemption and the level of scrutiny the reviewing body applies to a security-based justification",
      "Available fora: internal reconsideration, an independent information commissioner or ombudsman, or direct judicial review",
    ],
    expectedConcepts: [
      "freedom of information / transparency law",
      "burden of proof for statutory exemptions",
      "redaction and partial disclosure",
      "independent review body",
      "judicial review",
    ],
    modelApproach:
      "A strong answer does not accept an exemption label at face value; it requires the ministry to show, record by record, how disclosure would cause the harm the exemption is meant to prevent, and treats the failure to consider redaction as an independent defect. It maps out the available review path, an independent oversight body before or alongside judicial review, and is realistic that a purely conclusory security claim is unlikely to survive meaningful scrutiny.",
    furtherReading: [
      "Freedom of information exemption standards and the burden of justification",
      "Redaction and partial disclosure obligations under transparency law",
      "The role of independent information commissioners and ombudsman review",
    ],
    premium: true,
    testsFundamentals: ["law-const-transparency-foia", "law-const-judicial-review-mechanism"],
  },
  {
    id: "law-const-ombudsman-maladministration",
    profession: "law",
    category: "Constitutional & Regulatory",
    title: "A Wrongly Denied Permit and the Choice of Forum",
    scenario:
      "A small business owner's application for an operating license was rejected because a caseworker at the licensing authority misapplied an outdated version of the eligibility criteria, a fact the authority now privately acknowledges but has not corrected, leaving the business unable to open for the past two months and losing an estimated 15,000 in revenue. You are advising the owner on whether to file a formal complaint with the independent administrative ombudsman, pursue an internal administrative appeal, or go directly to judicial review, given that each path differs sharply in cost, speed, and the kind of remedy it can actually deliver.",
    keyIssues: [
      "What an ombudsman complaint can and cannot deliver (findings, recommendations, non-binding redress) compared to an internal appeal or judicial review",
      "Speed and cost tradeoffs between the three forums given the business's ongoing losses",
      "Whether the caseworker's acknowledged error strengthens the case for a fast informal remedy over a formal, adversarial challenge",
      "Whether pursuing one forum forecloses or delays access to the others",
    ],
    expectedConcepts: [
      "independent oversight / ombudsman review",
      "administrative appeal",
      "judicial review",
      "maladministration",
      "proportional choice of remedy",
    ],
    modelApproach:
      "A strong answer treats the ombudsman route as a genuine, often underused option well suited to a clear, acknowledged administrative error, since it is faster and cheaper than judicial review even though its findings are typically only recommendatory rather than binding. It sequences the options realistically given the business's mounting losses, and flags whether pursuing one path, such as the ombudsman, preserves or forecloses the others before recommending a course of action.",
    furtherReading: [
      "The role and limits of ombudsman/independent oversight bodies in administrative redress",
      "Choosing between administrative appeal, ombudsman complaint, and judicial review",
      "Maladministration and acknowledged-error cases in licensing decisions",
    ],
    premium: true,
    testsFundamentals: ["law-const-independent-oversight", "law-const-administrative-appeal-review"],
  },
  {
    id: "law-const-rule-procedural-defect",
    profession: "law",
    category: "Constitutional & Regulatory",
    title: "Challenging a Binding Rule Adopted Without Consultation",
    scenario:
      "The financial-services regulator adopted a binding rule last month raising capital-reserve requirements for mid-sized lenders by 25 percent, effective in 60 days, without the public consultation period its own governing statute requires for rules of this kind, citing urgency due to sector instability. Your client, a mid-sized lender, argues the urgency claim is pretextual since the regulator has been studying the issue for over a year, and that compliance will require raising capital it cannot realistically source before the deadline. You are advising on whether the rule can be challenged for the procedural defect alone, independent of whether the capital requirement itself is substantively reasonable.",
    keyIssues: [
      "Whether skipping the required consultation period invalidates the rule regardless of its substantive merit",
      "Whether the regulator's urgency justification for bypassing consultation is credible given the yearlong study period",
      "Consequences of a successful procedural challenge: does the rule fall entirely, or can the regulator cure the defect by re-adopting it with proper consultation",
      "Interim relief to suspend the compliance deadline while the procedural challenge is pending",
    ],
    expectedConcepts: [
      "notice-and-consultation requirements",
      "procedural invalidity of rulemaking",
      "urgency exceptions to rulemaking procedure",
      "judicial review of rulemaking",
      "interim relief",
    ],
    modelApproach:
      "A strong answer treats the procedural defect as a genuinely independent ground for challenge that does not require winning on the substantive reasonableness of the capital requirement at all, and tests the claimed urgency against the yearlong study period as undermining the exception. It is realistic that a successful procedural challenge often only delays the regulator, which can typically re-adopt the same rule after proper consultation, and treats interim relief on the deadline as the client's most immediate practical need.",
    furtherReading: [
      "Notice-and-consultation requirements in rulemaking procedure",
      "Urgency exceptions to procedural rulemaking requirements",
      "Judicial review of agency rulemaking for procedural defects",
    ],
    premium: true,
    testsFundamentals: ["law-const-regulatory-rulemaking-procedure", "law-const-judicial-review-mechanism"],
  },
  {
    id: "law-const-data-retention-law",
    profession: "law",
    category: "Constitutional & Regulatory",
    title: "A Blanket Data Retention Law Meets Privacy Rights",
    scenario:
      "The legislature has passed a law requiring telecommunications providers to retain all customers' location and communications metadata for two years, accessible to law enforcement without prior judicial authorization, in response to a rise in organized crime. Civil liberties groups plan to challenge the law as a disproportionate interference with the constitutional right to privacy and data protection, since it applies to the entire population regardless of any suspicion, while the government argues the retention period and safeguards are proportionate to a serious and rising public-safety threat. You are advising the challengers on how to frame the proportionality argument and what evidence would strengthen it.",
    keyIssues: [
      "Whether blanket, suspicionless retention of an entire population's data can ever be proportionate, or whether targeted retention tied to suspicion is constitutionally required",
      "The role of prior judicial or independent authorization as a safeguard, and its absence in the law as adopted",
      "Proportionality of the two-year retention period against the stated law-enforcement objective",
      "What evidence (crime statistics, comparative data from other systems, expert testimony on necessity) would strengthen or weaken the proportionality challenge",
    ],
    expectedConcepts: [
      "right to privacy / data protection",
      "proportionality",
      "blanket versus targeted surveillance measures",
      "prior judicial authorization safeguard",
      "necessity and effectiveness evidence",
    ],
    modelApproach:
      "A strong answer leads with proportionality rather than a categorical right-to-privacy claim, since most systems allow some surveillance measures if proportionate, and it specifically attacks the blanket, suspicionless scope and the absence of prior independent authorization as the two features most likely to make the law disproportionate regardless of the legitimate underlying objective. It anticipates that comparative and empirical evidence on necessity and effectiveness will matter more to the outcome than doctrinal argument alone.",
    furtherReading: [
      "Proportionality review of blanket data-retention and surveillance measures",
      "Prior judicial or independent authorization as a safeguard in surveillance law",
      "Comparative data-protection and privacy-rights jurisprudence",
    ],
    premium: true,
    testsFundamentals: ["law-const-data-protection-rights", "law-const-proportionality"],
  },
];
