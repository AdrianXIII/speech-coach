import type { CaseStudy } from "@/lib/caseStudyContent";
import type { Fundamental } from "@/lib/caseStudyFundamentals";

/**
 * Law / Social Security & Welfare Law: the fundamentals checklist and the
 * case bank for this category, kept together so they can be written and
 * reviewed as one unit. Registered in lib/cases/index.ts.
 *
 * Scope note: this category covers the INDIVIDUAL-STATE relationship — a
 * person's entitlement to, and disputes over, a government benefit:
 * retirement/old-age pensions, unemployment insurance, sickness and
 * disability benefits, work-injury compensation, means-tested welfare, and
 * the administrative procedure for claiming and appealing a benefit
 * decision, including overpayment recovery and the line between fraud and
 * honest error. It is deliberately distinct from Law / Labor & Employment
 * Law, which covers the EMPLOYER-EMPLOYEE relationship (hiring, firing,
 * discrimination, collective bargaining) — a dispute here turns on
 * entitlement to a state benefit regardless of the claimant's employment
 * status, not on anything an employer did. It is also distinct from Law /
 * Administrative Law, which stays focused on administrative process and
 * agency conduct in general (licensing, investigations, procedural
 * fairness as a general doctrine); content here is specific to the
 * substance of social-security entitlement law, even though benefit claims
 * necessarily pass through administrative agencies and appeals.
 *
 * Every case is written to be jurisdiction-neutral: it must make sense when
 * machine-translated and graded against the US, German, French, Spanish, or
 * Swedish legal system, so it avoids any single country's statutes, courts,
 * or procedural vocabulary in favor of generic doctrine that exists (in some
 * form) across all five.
 */
export const LAW_SOCIAL_SECURITY_WELFARE_FUNDAMENTALS: Fundamental[] = [
  { id: "law-socsec-pension-eligibility-calculation", label: "Applying the contribution-record and age/qualifying-period rules that determine eligibility for, and the amount of, a retirement pension" },
  { id: "law-socsec-early-reduced-pension", label: "Assessing the tradeoffs and actuarial reduction involved in claiming a pension before full retirement age" },
  { id: "law-socsec-unemployment-eligibility-availability", label: "Applying unemployment-insurance eligibility criteria, including availability-for-work and active-job-search conditions" },
  { id: "law-socsec-voluntary-unemployment-disqualification", label: "Determining whether a claimant's own conduct (voluntary quit, dismissal for misconduct, refusing suitable work) disqualifies them from unemployment benefits" },
  { id: "law-socsec-sickness-benefit-capacity-assessment", label: "Applying the medical capacity-to-work assessment that governs eligibility for short-term sickness benefits" },
  { id: "law-socsec-disability-benefit-standard", label: "Applying the long-term disability/incapacity standard, including how partial versus total incapacity changes the benefit level" },
  { id: "law-socsec-work-injury-causation", label: "Establishing that an injury or illness arose out of and in the course of employment for work-injury compensation purposes" },
  { id: "law-socsec-work-injury-vs-ordinary-sickness", label: "Distinguishing work-injury/occupational-disease compensation from ordinary sickness or disability benefits where the two schemes overlap" },
  { id: "law-socsec-means-test-income-asset-assessment", label: "Applying a means test's income and asset thresholds, including which resources are counted, disregarded, or imputed" },
  { id: "law-socsec-household-unit-determination", label: "Determining the correct household or family unit for a means-tested benefit calculation" },
  { id: "law-socsec-claim-filing-procedure", label: "Applying the procedural requirements for filing a benefit claim, including evidentiary burdens and agency fact-finding duties" },
  { id: "law-socsec-internal-reconsideration", label: "Applying the requirement to seek internal agency reconsideration before an external appeal, and the consequences of skipping it" },
  { id: "law-socsec-tribunal-appeal-standard", label: "Applying the standard of review a specialized tribunal or court uses when reviewing a denied or reduced benefit claim" },
  { id: "law-socsec-burden-of-proof-claimant-agency", label: "Allocating the burden of proof between claimant and agency at each stage of a benefit dispute" },
  { id: "law-socsec-overpayment-recovery-waiver", label: "Applying the standard for recovering an overpaid benefit, including any waiver or hardship defense available to the claimant" },
  { id: "law-socsec-fraud-vs-honest-error", label: "Distinguishing benefit fraud (knowing misrepresentation) from an honest reporting error, and the different consequences each carries" },
  { id: "law-socsec-benefit-suspension-pending-investigation", label: "Assessing the standard and procedural protections required before an agency suspends an ongoing benefit pending a fraud or eligibility investigation" },
  { id: "law-socsec-survivor-dependent-benefits", label: "Applying eligibility rules for survivor or dependent benefits derived from another person's contribution record" },
  { id: "law-socsec-benefit-coordination-offset", label: "Applying coordination or offset rules where a claimant qualifies for more than one benefit, or a benefit and a private compensation source, at once" },
  { id: "law-socsec-retroactive-backdating-claims", label: "Applying the rules governing retroactive backdating of a late-filed claim and the good-cause exceptions to a filing deadline" },
];

export const LAW_SOCIAL_SECURITY_WELFARE_CASES: CaseStudy[] = [
  {
    id: "law-socsec-pension-record-gap-dispute",
    profession: "law",
    category: "Social Security & Welfare Law",
    title: "A Missing Decade in a Pension Contribution Record",
    scenario:
      "Your client, now approaching standard retirement age, applied for a state retirement pension and received a calculation showing a monthly amount roughly 30 percent lower than she expected, based on a contribution record that shows a nine-year gap during which she worked continuously for a small employer that, she has since learned, never actually registered her or remitted the required contributions on her behalf, despite deducting an amount from her pay each month that she always understood to be her share. The employer dissolved years ago and no corporate records survive. Your client has old pay slips showing the deductions but no proof the money was ever forwarded to the pension system. The pension agency says it can only credit contributions actually received and recorded, and that the shortfall, whatever its cause, is not something it can simply fill in on her behalf. You are advising her on challenging the pension calculation.",
    keyIssues: [
      "Whether a worker whose employer deducted but never remitted contributions can still have the corresponding years credited toward her own pension entitlement",
      "What evidentiary weight pay slips showing the deductions carry in the absence of any surviving employer or agency record",
      "Whether responsibility for the employer's non-remittance should fall on the worker, the dissolved employer's residual liability, or the pension system itself",
      "Practical remedy available given that the employer no longer exists to be pursued directly",
    ],
    expectedConcepts: [
      "contribution-record crediting",
      "burden of proof using secondary evidence",
      "employer non-remittance versus worker liability",
      "state guarantee or shortfall-absorption mechanisms",
      "pension recalculation remedy",
    ],
    modelApproach:
      "A strong answer separates the question of what actually happened to the withheld money, which is a dispute with the vanished employer that may now be practically unrecoverable, from the question of whether the years should still count toward her own pension, where the pay slips are strong secondary evidence that contributions were in fact deducted even if never remitted. It argues that a worker who had money deducted from her own pay should not bear the risk of her employer's separate failure to forward it, and treats a pension-system-level guarantee or credit mechanism for employer non-remittance, where one exists, as the most realistic path to a full recalculation.",
    furtherReading: [
      "Crediting contribution gaps caused by employer non-remittance",
      "Secondary evidence standards in pension record disputes",
      "State guarantee mechanisms for unpaid employer contributions",
    ],
    testsFundamentals: ["law-socsec-pension-eligibility-calculation", "law-socsec-claim-filing-procedure"],
  },
  {
    id: "law-socsec-early-pension-actuarial-reduction",
    profession: "law",
    category: "Social Security & Welfare Law",
    title: "Weighing an Early Pension Against a Permanent Reduction",
    scenario:
      "Your client, three years below standard retirement age, has been offered an early-retirement package by her employer and is considering drawing her state pension early to bridge the gap, but the pension agency's estimate shows that claiming three years early would permanently reduce her monthly pension by roughly 18 percent for the rest of her life, compounding against an already modest contribution record from two extended periods of part-time work raising children. She is in good health with a family history of longevity on both sides, and has no other significant retirement savings. Her employer's package includes a one-time payment that would cover only about fourteen months of living expenses at her current rate of spending. You are advising her on the tradeoffs and what she needs to understand before deciding.",
    keyIssues: [
      "How the permanent nature of an early-claiming reduction compares to the temporary bridge problem the employer's package is meant to solve",
      "Relevance of health and family longevity expectations to the lifetime value of claiming early versus waiting",
      "Whether a partial or phased claiming option, where available, better matches the actual bridge-funding gap than claiming the full pension early",
      "The practical risk of underestimating how long the reduced pension will need to last given her modest existing savings",
    ],
    expectedConcepts: [
      "actuarial reduction for early claiming",
      "permanent versus temporary income-gap solutions",
      "life-expectancy-adjusted breakeven analysis",
      "phased or partial claiming options",
      "retirement income adequacy",
    ],
    modelApproach:
      "A strong answer treats the 18 percent reduction as a permanent, lifelong tradeoff rather than a short-term fix, and tests it against her actual bridge problem, roughly three years of income replacement, asking whether a smaller, partial draw or another bridge source could cover the gap without locking in a lifetime reduction. It uses her health and family-longevity information to frame the breakeven analysis honestly, while being clear that no individual projection is a guarantee, and flags that her thin existing savings make the permanent reduction's long-run effect especially consequential.",
    furtherReading: [
      "Actuarial reduction formulas for early pension claiming",
      "Breakeven and life-expectancy-adjusted claiming analysis",
      "Phased or partial pension claiming options",
    ],
    testsFundamentals: ["law-socsec-early-reduced-pension"],
  },
  {
    id: "law-socsec-unemployment-refused-job-offer",
    profession: "law",
    category: "Social Security & Welfare Law",
    title: "Disqualified for Refusing a Job Two Hours Away",
    scenario:
      "Your client, receiving unemployment benefits after a factory closure, was referred by the employment agency to a job opening that would require a round-trip commute of nearly four hours a day using available public transport, at a wage modestly above the statutory minimum but well below what she earned in her previous role of eleven years in the same specialized trade. She declined the referral, and the agency has now suspended her benefits for refusing an offer of 'suitable work' without good cause, treating the wage as adequate and the commute as a personal preference rather than a disqualifying factor. She argues the commute is not genuinely sustainable long-term and that the role abandons the specialized trade she has spent over a decade building. You are advising her on challenging the disqualification.",
    keyIssues: [
      "What factors actually define 'suitable work' for disqualification purposes beyond the wage offered, including commute time and fit with prior occupation and skill level",
      "Whether a four-hour daily round-trip commute is itself a legally relevant factor in assessing suitability, or purely a personal preference the agency may disregard",
      "Weight given to preserving a claimant's specialized occupational skill set against the general expectation that benefit recipients must accept available work",
      "Procedural requirements the agency must satisfy before imposing a disqualification, including notice and the claimant's opportunity to explain",
    ],
    expectedConcepts: [
      "suitable work standard",
      "commute time as a suitability factor",
      "occupational and skill-level fit",
      "good cause for declining a referral",
      "disqualification procedure and notice",
    ],
    modelApproach:
      "A strong answer tests the referral against the full suitable-work standard rather than wage alone, arguing that an extreme commute and a sharp mismatch with over a decade of specialized experience are both legally relevant to suitability, not mere preference, especially this early in a claim period when preserving occupational fit still carries real weight. It also checks whether the agency gave her adequate notice and a genuine opportunity to explain her reasons before suspending benefits, since a procedural shortcut in imposing the disqualification is an independent ground for challenge.",
    furtherReading: [
      "The suitable work standard in unemployment-benefit disqualification",
      "Commute burden and occupational fit as suitability factors",
      "Procedural requirements before disqualifying a benefit claimant",
    ],
    testsFundamentals: ["law-socsec-unemployment-eligibility-availability", "law-socsec-voluntary-unemployment-disqualification"],
  },
  {
    id: "law-socsec-sickness-benefit-fitness-dispute",
    profession: "law",
    category: "Social Security & Welfare Law",
    title: "A Treating Doctor and an Agency Examiner Disagree on Fitness to Work",
    scenario:
      "Your client has been receiving sickness benefits for four months following a back injury, supported throughout by his treating physician's repeated certifications that he remains unfit for his physically demanding warehouse role, but a one-time examination arranged by the benefit agency's own medical assessor concluded he has sufficient functional capacity to return to modified duties, relying on a single twenty-minute assessment that did not include the imaging his treating physician says shows ongoing disc compression. The agency has terminated his benefit effective immediately based on the assessor's report. Your client says the modified-duties description the assessor relied on does not match any role his employer has actually offered or confirmed exists. You are advising him on challenging the termination.",
    keyIssues: [
      "How to weigh a one-time agency assessor's conclusion against a treating physician's longitudinal clinical record where they conflict",
      "Whether the assessor's failure to consider the imaging evidence undermines the reliability of the capacity determination",
      "Relevance of whether the specific modified-duties role the assessment assumed actually exists and is genuinely available to the client",
      "Procedural rights to challenge a benefit termination based on a medical assessment, including requesting a second opinion or review",
    ],
    expectedConcepts: [
      "medical capacity-to-work assessment",
      "treating physician versus agency assessor weight",
      "evidentiary completeness of a capacity determination",
      "availability of the specific modified duties assumed",
      "right to request reassessment or review",
    ],
    modelApproach:
      "A strong answer does not simply assert that the treating physician should always win, but tests the assessor's report for completeness, arguing that an assessment made without reviewing the imaging evidence the treating physician relied on is incomplete and should carry less weight, not simply conflicting equal weight. It separately argues that modified duties assumed in the abstract are irrelevant if no such role is actually available at his employer, and pursues reassessment or review as the primary remedy rather than accepting the termination as final on a single contested report.",
    furtherReading: [
      "Weighing treating-physician evidence against agency medical assessments",
      "Evidentiary completeness requirements for capacity-to-work determinations",
      "Review and reassessment rights following a sickness-benefit termination",
    ],
    premium: true,
    testsFundamentals: ["law-socsec-sickness-benefit-capacity-assessment", "law-socsec-burden-of-proof-claimant-agency"],
  },
  {
    id: "law-socsec-partial-vs-total-disability-classification",
    profession: "law",
    category: "Social Security & Welfare Law",
    title: "Classified as Partially, Not Totally, Incapacitated",
    scenario:
      "Your client suffered a severe hand injury that ended his twenty-two-year career as a precision machinist, and the disability agency classified him as having a 40 percent partial incapacity, entitling him to a modest supplemental benefit rather than the much larger total-incapacity benefit, reasoning that he retains full use of his legs and could theoretically perform some seated administrative role. Your client has no administrative training, no transferable credentials, and three vocational assessments commissioned by his own doctor conclude that, at age fifty-eight with his specific physical limitations and skill profile, no realistic, sustained employment path exists for him in the actual regional labor market. The agency's classification did not address regional job availability at all, relying only on a generic capacity checklist. You are advising on challenging the classification.",
    keyIssues: [
      "Whether a theoretical physical capacity to perform some category of work is sufficient for partial-incapacity classification, or whether realistic employability in the actual labor market must also be considered",
      "Weight to give the three vocational assessments addressing real-world placement prospects against the agency's generic capacity checklist",
      "Relevance of age, lack of transferable training, and regional job scarcity to the incapacity determination",
      "Remedy available if the classification is successfully challenged: reclassification to total incapacity versus remand for a more complete assessment",
    ],
    expectedConcepts: [
      "partial versus total incapacity classification",
      "theoretical capacity versus realistic employability",
      "vocational assessment evidence",
      "age and transferable-skill considerations",
      "remand versus direct reclassification",
    ],
    modelApproach:
      "A strong answer argues that a classification resting only on theoretical physical capacity, without any assessment of whether that capacity translates into genuine, sustained employment in the actual regional market, is incomplete, and uses the three vocational assessments as the kind of real-world evidence the agency's generic checklist never considered. It treats his age and total absence of transferable training as directly relevant rather than incidental, and asks for reclassification, or at minimum remand for a properly evidenced determination, rather than accepting the 40 percent figure as a reasonable compromise.",
    furtherReading: [
      "Distinguishing theoretical work capacity from realistic employability in incapacity determinations",
      "The role of vocational assessment evidence in disability classification disputes",
      "Age and transferable-skill factors in total-incapacity determinations",
    ],
    premium: true,
    testsFundamentals: ["law-socsec-disability-benefit-standard", "law-socsec-burden-of-proof-claimant-agency"],
  },
  {
    id: "law-socsec-work-injury-causation-preexisting-condition",
    profession: "law",
    category: "Social Security & Welfare Law",
    title: "A Workplace Fall Aggravates a Pre-Existing Spine Condition",
    scenario:
      "Your client, a warehouse worker with a previously asymptomatic and undiagnosed mild spinal degeneration, slipped on an unmarked wet floor and has suffered significant, ongoing pain and mobility limitation ever since, far beyond what a typical soft-tissue fall injury would cause in someone without the underlying condition. The work-injury compensation agency denied his claim, arguing the real cause of his current condition is the pre-existing degeneration, not the fall itself, and that compensating him would effectively make the system responsible for a condition that predates his employment entirely. Medical evidence confirms the degeneration existed before the fall but was asymptomatic, and that the fall is what triggered his current, disabling symptoms. You are advising him on challenging the denial.",
    keyIssues: [
      "Whether a workplace accident that aggravates or triggers symptoms from an asymptomatic pre-existing condition is still compensable as a work injury",
      "How to apportion compensation where the current disabling condition results from an interaction between the accident and the pre-existing degeneration",
      "Evidentiary weight of the asymptomatic-before, symptomatic-after medical timeline in establishing causation",
      "Whether the agency's position would effectively exclude coverage for the common real-world situation of an accident interacting with a pre-existing vulnerability",
    ],
    expectedConcepts: [
      "work-injury causation standard",
      "aggravation of a pre-existing condition",
      "asymptomatic-to-symptomatic medical timeline as causation evidence",
      "apportionment of compensation",
      "take-the-worker-as-found principle",
    ],
    modelApproach:
      "A strong answer leads with the general compensation principle that an employer or system generally takes a worker as found, with whatever vulnerabilities already exist, so that an accident which aggravates or triggers a previously silent condition is still compensable even though the same accident might have caused only a minor injury in someone without the degeneration. It uses the clean asymptomatic-before, symptomatic-after timeline as strong causation evidence, and addresses apportionment as a question of degree, not a reason to deny the claim outright.",
    furtherReading: [
      "Aggravation of pre-existing conditions in work-injury compensation",
      "Causation standards and the take-the-worker-as-found principle",
      "Apportionment of compensation between accident and pre-existing condition",
    ],
    premium: true,
    testsFundamentals: ["law-socsec-work-injury-causation", "law-socsec-work-injury-vs-ordinary-sickness"],
  },
  {
    id: "law-socsec-means-test-inherited-house-asset",
    profession: "law",
    category: "Social Security & Welfare Law",
    title: "An Inherited, Unsellable House Pushes a Welfare Claim Over the Asset Limit",
    scenario:
      "Your client, applying for means-tested welfare support after losing her job, disclosed that she inherited a half-share in a rural house from her late father eighteen months ago, jointly owned with an estranged sibling who refuses to cooperate with any sale, leaving the property effectively illiquid and generating her no income. The welfare agency valued her nominal half-share at its full assessed market value and denied her application as exceeding the asset threshold, without addressing her evidence that she cannot access, sell, borrow against, or realize any value from the share given her sibling's refusal to cooperate. She has no other significant assets and genuinely needs the support now. You are advising her on challenging the means-test determination.",
    keyIssues: [
      "Whether an asset must be realistically accessible or liquid to count at full value in a means test, or whether nominal legal ownership alone is sufficient regardless of practical access",
      "How a jointly owned, disputed property with an uncooperative co-owner should be valued given the genuine barriers to realizing any value from it",
      "Whether the agency's valuation method adequately accounted for the discount a forced or disputed partial-interest sale would actually realize",
      "Available remedies: a reduced notional valuation, a disregard for genuinely inaccessible assets, or an interim award pending resolution of the ownership dispute",
    ],
    expectedConcepts: [
      "means-test asset valuation",
      "accessibility and liquidity of a disputed or jointly held asset",
      "notional versus actual realizable value",
      "disregard for inaccessible assets",
      "interim relief pending resolution of an asset dispute",
    ],
    modelApproach:
      "A strong answer challenges the agency's valuation methodology directly, arguing that a means test should assess what a claimant can actually realize from an asset, not its full nominal market value, especially where a specific, documented legal barrier, an uncooperative co-owner, genuinely prevents any sale or borrowing. It proposes either a steep discount reflecting the real-world value of a contested, illiquid partial interest or a temporary disregard of the asset while the ownership dispute remains unresolved, paired with interim support in the meantime given her genuine and immediate need.",
    furtherReading: [
      "Liquidity and accessibility requirements in means-test asset valuation",
      "Valuing disputed or jointly held property interests for welfare eligibility",
      "Disregards and interim relief for genuinely inaccessible assets",
    ],
    premium: true,
    testsFundamentals: ["law-socsec-means-test-income-asset-assessment", "law-socsec-household-unit-determination"],
  },
  {
    id: "law-socsec-household-unit-adult-child-roommate",
    profession: "law",
    category: "Social Security & Welfare Law",
    title: "Is a Grown Son Sharing Rent Part of the Household for a Welfare Calculation?",
    scenario:
      "Your client, a single mother applying for means-tested welfare support, lists her twenty-four-year-old son as a resident of her apartment, since he moved back in eight months ago after losing his own job, pays her a fixed amount toward rent and utilities each month, buys and cooks his own food separately, and is actively job-hunting with no income beyond occasional short-term gig work. The welfare agency treated his gig income and his rent payments to her as part of her own household income for the means test, substantially reducing her award, on the premise that anyone residing at the same address is automatically part of the same benefit household. Your client argues they function as separate economic units sharing an address, not a shared household budget. You are advising her on challenging the household-unit determination.",
    keyIssues: [
      "What factors actually distinguish a single shared household from two separate economic units sharing the same address for means-test purposes",
      "Whether a fixed rent-sharing arrangement between a parent and an adult child indicates a landlord-tenant-like relationship rather than pooled household finances",
      "Whether the son's own irregular gig income should be attributed to his mother's household calculation at all, given they do not pool finances",
      "Evidentiary steps to document separate food, finances, and expenses to support the separate-household argument",
    ],
    expectedConcepts: [
      "household or family unit determination",
      "shared address versus shared household economics",
      "attribution of a co-resident's income",
      "evidentiary documentation of separate finances",
      "landlord-tenant-like arrangements between relatives",
    ],
    modelApproach:
      "A strong answer rejects the agency's same-address-equals-same-household shortcut and argues that the actual test should turn on whether finances, food, and expenses are genuinely pooled, not simply whether two people share a roof, using the fixed rent payment and separate food arrangements as concrete evidence of two distinct economic units. It recommends assembling specific documentation, receipts, a written or informal rent arrangement, separate grocery spending, to support reclassification, and argues the son's own irregular income has no proper place in his mother's calculation once the households are shown to be genuinely separate.",
    furtherReading: [
      "Household and family unit determination standards for means-tested benefits",
      "Distinguishing shared-address arrangements from shared household economics",
      "Evidentiary documentation in household-composition disputes",
    ],
    premium: true,
    testsFundamentals: ["law-socsec-household-unit-determination", "law-socsec-means-test-income-asset-assessment"],
  },
  {
    id: "law-socsec-reconsideration-skipped-appeal",
    profession: "law",
    category: "Social Security & Welfare Law",
    title: "Appealing Straight to a Tribunal Without Internal Reconsideration",
    scenario:
      "Your client's disability benefit application was denied, and frustrated by what she saw as an obviously wrong decision, she filed directly with the external appeals tribunal without first requesting the agency's own internal reconsideration, which the governing rules describe as a required step before external appeal. The tribunal has now notified her that her appeal may be dismissed for failing to exhaust the internal reconsideration step, while the deadline to actually request reconsideration has since passed during the months her external appeal was pending. She is understandably anxious that a procedural misstep has now cost her any route to challenge the denial at all. You are advising her on the options still available.",
    keyIssues: [
      "Whether skipping required internal reconsideration is a curable procedural defect or a fatal one once the reconsideration deadline has since passed",
      "Whether the time spent pursuing the (improper) external appeal provides any basis for extending or excusing the missed reconsideration deadline",
      "Practical sequencing: whether to request late reconsideration with an explanation, or to argue the tribunal should treat the external filing as sufficient given the circumstances",
      "Risk that pursuing one remedy forecloses or delays the other, given the time already elapsed",
    ],
    expectedConcepts: [
      "exhaustion of internal reconsideration before external appeal",
      "good-cause extension of a missed procedural deadline",
      "curable versus fatal procedural defects",
      "effect of a good-faith but misdirected filing on deadlines",
      "sequencing of remedies under time pressure",
    ],
    modelApproach:
      "A strong answer treats the missed-deadline problem as the real emergency, not the exhaustion requirement itself, and argues that having filed a timely, good-faith, if procedurally misdirected, challenge with the external tribunal is exactly the kind of circumstance that should support a good-cause extension to file reconsideration now, rather than treating the error as fatal. It recommends immediately requesting late reconsideration with a clear explanation of the mistake, while also asking the tribunal to hold the external appeal in abeyance rather than dismiss it outright, preserving both paths until the reconsideration question is resolved.",
    furtherReading: [
      "Exhaustion of internal administrative reconsideration before external appeal",
      "Good-cause extensions for a missed benefit-appeal deadline",
      "Preserving multiple remedies when a procedural step has been skipped",
    ],
    premium: true,
    testsFundamentals: ["law-socsec-internal-reconsideration", "law-socsec-tribunal-appeal-standard"],
  },
  {
    id: "law-socsec-overpayment-recovery-hardship-waiver",
    profession: "law",
    category: "Social Security & Welfare Law",
    title: "A Three-Year-Old Agency Calculation Error Becomes a Demand for Repayment",
    scenario:
      "Your client has received a disability benefit at a steady monthly amount for three years, relying on it as his only income, and has now been notified that the agency miscalculated the amount from the start due to its own internal processing error, unrelated to anything he reported or failed to report, and is demanding repayment of the full three-year overpayment in a lump sum, with no fault attributed to him at any point. He has spent the money on ordinary living expenses as it arrived each month and has no savings or realistic ability to repay a lump sum without severe hardship. The agency's position is that an overpayment must be recovered regardless of fault, since public funds were paid out that were never actually owed. You are advising him on challenging or mitigating the repayment demand.",
    keyIssues: [
      "Whether an overpayment caused entirely by the agency's own error, with no fault or misrepresentation by the claimant, is still recoverable in full",
      "Availability of a waiver or reduction of recovery based on the claimant's good-faith reliance and financial hardship",
      "Whether a lump-sum demand is appropriate given his demonstrated inability to pay, as opposed to a reduced-rate repayment plan",
      "Relevance of how promptly the agency identified and corrected its own error to the fairness of recovering the full historical amount",
    ],
    expectedConcepts: [
      "overpayment recovery standard",
      "fault-free agency error versus claimant misrepresentation",
      "hardship or equitable waiver of recovery",
      "good-faith reliance on an erroneous payment",
      "repayment plan versus lump-sum demand",
    ],
    modelApproach:
      "A strong answer separates the fact that an overpayment occurred, which is not seriously disputed, from the question of how much, if any, should actually be recovered and on what terms, and argues that his complete lack of fault, his good-faith reliance on a steady payment he had no reason to doubt, and his genuine inability to repay a lump sum without hardship together support either a waiver of some portion of the recovery or, at minimum, a sharply reduced monthly repayment plan rather than the lump-sum demand as issued.",
    furtherReading: [
      "Overpayment recovery standards and agency-error exceptions",
      "Hardship and good-faith-reliance waivers in benefit overpayment cases",
      "Structuring a repayment plan versus a lump-sum recovery demand",
    ],
    premium: true,
    testsFundamentals: ["law-socsec-overpayment-recovery-waiver", "law-socsec-fraud-vs-honest-error"],
  },
  {
    id: "law-socsec-fraud-allegation-reporting-mistake",
    profession: "law",
    category: "Social Security & Welfare Law",
    title: "A Reporting Mistake Treated as Benefit Fraud",
    scenario:
      "Your client, receiving unemployment benefits, took a short, three-week part-time gig processing holiday orders for a retailer and genuinely believed, based on a mistaken reading of the program's own guidance, that seasonal gig income below a certain small weekly threshold did not need to be reported at all, a misunderstanding seemingly reinforced by an earlier, unrelated gig he had correctly not reported because it genuinely fell under a separate, legitimate disregard. The agency's data-matching system flagged the unreported income and has now opened a fraud referral, suspending his ongoing benefits immediately and demanding full repayment plus a fraud penalty, treating the non-disclosure as a knowing misrepresentation. Your client has no history of prior violations and voluntarily explained his reasoning as soon as the agency contacted him. You are advising him on contesting the fraud characterization.",
    keyIssues: [
      "What distinguishes a knowing, intentional misrepresentation from a genuine, good-faith misunderstanding of a reporting rule",
      "Relevance of his prior, correct non-reporting of a genuinely disregarded income source to the plausibility of his claimed misunderstanding here",
      "Whether immediate benefit suspension is justified before any fraud finding is actually established, or whether due process requires a determination first",
      "Consequences that follow if the fraud characterization is successfully downgraded to an honest error: recovery of the underpayment amount without a penalty, and reinstatement of ongoing benefits",
    ],
    expectedConcepts: [
      "fraud versus honest error standard",
      "intent / knowing misrepresentation requirement",
      "prior consistent conduct as evidence of good faith",
      "due process before benefit suspension",
      "consequences of a downgraded fraud finding",
    ],
    modelApproach:
      "A strong answer centers the intent requirement, arguing that fraud demands a knowing misrepresentation, not merely an incorrect one, and uses his earlier correct handling of a genuinely different disregard as evidence he was engaging in good-faith, if mistaken, reasoning rather than concealment, especially given he volunteered his explanation unprompted. It separately challenges the immediate suspension as premature given no fraud finding had actually been made yet, and frames the realistic outcome as repayment of the actual overpayment without a fraud penalty, plus prompt reinstatement of ongoing benefits.",
    furtherReading: [
      "Distinguishing benefit fraud from an honest reporting error",
      "The intent requirement in benefit-fraud determinations",
      "Due process protections before suspending benefits pending a fraud investigation",
    ],
    premium: true,
    testsFundamentals: ["law-socsec-fraud-vs-honest-error", "law-socsec-benefit-suspension-pending-investigation"],
  },
  {
    id: "law-socsec-survivor-benefit-second-family",
    profession: "law",
    category: "Social Security & Welfare Law",
    title: "Competing Survivor Claims From Two Families After One Worker's Death",
    scenario:
      "Following the death of a long-time contributor, both his current wife of six years and his first wife, from whom he was divorced after a twenty-year marriage but never remarried into a new qualifying union before his death, have separately filed for a survivor's benefit derived from his contribution record, along with his adult child from the first marriage who separately claims a dependent benefit as a full-time student still under the applicable age limit. The agency has paused all three claims pending clarification of how the available survivor benefit should be divided, if at all, among competing claimants with different relationships to the deceased. You are advising the current wife on her claim and on how the competing claims are likely to be resolved.",
    keyIssues: [
      "Whether a divorced former spouse retains any independent entitlement to a survivor benefit based on the length of the prior marriage, separate from the current spouse's claim",
      "Whether survivor benefits to a current spouse and a qualifying former spouse are paid concurrently from the same record or must be apportioned between them",
      "Independent eligibility of the adult dependent child's student benefit and whether it reduces what either surviving spouse receives",
      "Documentation each claimant needs to establish their specific relationship and dependency status",
    ],
    expectedConcepts: [
      "survivor benefit eligibility from a contribution record",
      "divorced spouse's independent survivor entitlement",
      "concurrent versus apportioned payment among multiple claimants",
      "dependent child student benefit eligibility",
      "documentation of relationship and dependency status",
    ],
    modelApproach:
      "A strong answer explains that many systems allow a divorced former spouse who was married to the worker for a sufficiently long qualifying period to claim an independent survivor benefit that does not reduce what the current spouse receives, since the two claims typically draw on the same record concurrently rather than competing over a fixed, shared pool, and treats the dependent child's student benefit as a further largely independent claim subject to its own age and enrollment conditions. It advises the current wife to file promptly and document her own marriage and dependency status fully, since delay in a multi-claimant situation like this one tends to compound processing time rather than improve her position.",
    furtherReading: [
      "Survivor benefit eligibility for current and former spouses",
      "Concurrent versus apportioned survivor benefit payment among multiple claimants",
      "Dependent child benefits derived from a deceased contributor's record",
    ],
    premium: true,
    testsFundamentals: ["law-socsec-survivor-dependent-benefits", "law-socsec-benefit-coordination-offset"],
  },
  {
    id: "law-socsec-disability-and-work-injury-offset",
    profession: "law",
    category: "Social Security & Welfare Law",
    title: "A Work-Injury Payout Triggers an Unexpected Disability Offset",
    scenario:
      "Your client began receiving a long-term disability benefit after a workplace accident left him with a permanent partial impairment, and separately pursued and won a lump-sum work-injury compensation payment from the same accident through a different scheme, intended primarily to cover pain, suffering, and future medical costs. Shortly after the lump sum was paid, the disability agency notified him that it is applying a coordination offset, reducing his ongoing monthly disability benefit for an extended period to account for the lump sum, treating it as duplicative income for the same incapacity, even though he maintains the lump sum compensates distinct harms, pain and future medical needs, not lost income the disability benefit is meant to replace. You are advising him on challenging the offset's scope.",
    keyIssues: [
      "Whether a coordination or offset rule between a disability benefit and a separate work-injury payout should apply to the full lump sum or only the portion that genuinely duplicates lost-income replacement",
      "Evidentiary burden to show how the lump-sum settlement was actually allocated among pain-and-suffering, future medical costs, and lost income, if the settlement itself does not specify",
      "Whether offsetting non-income components of the settlement is consistent with the actual purpose of a coordination rule meant to prevent double payment of the same loss",
      "Practical remedy: seeking a proportional offset tied only to the income-replacement component, rather than the full amount",
    ],
    expectedConcepts: [
      "benefit coordination and offset rules",
      "duplicative versus distinct compensable harms",
      "allocation of a lump-sum settlement among harm categories",
      "purpose-based limits on an offset rule",
      "proportional offset remedy",
    ],
    modelApproach:
      "A strong answer argues that a coordination offset exists to prevent paying twice for the same lost income, not to claw back compensation for genuinely distinct harms like pain, suffering, or future medical costs, and pushes to have the lump sum broken down by component, using the original settlement documentation or expert allocation evidence if the settlement itself is silent. It frames the realistic remedy as a proportional offset limited to whatever portion of the lump sum actually represents income replacement, rather than accepting an offset against the full settlement amount.",
    furtherReading: [
      "Coordination and offset rules between disability and work-injury compensation",
      "Allocating a lump-sum settlement among distinct categories of harm",
      "Purpose-based limits on benefit coordination and offset provisions",
    ],
    premium: true,
    testsFundamentals: ["law-socsec-benefit-coordination-offset", "law-socsec-work-injury-vs-ordinary-sickness"],
  },
  {
    id: "law-socsec-late-filed-claim-backdating",
    profession: "law",
    category: "Social Security & Welfare Law",
    title: "Filing a Disability Claim Fourteen Months After Becoming Unable to Work",
    scenario:
      "Your client became unable to work due to a severe depressive episode, compounded by the same condition's effect on her ability to manage paperwork, follow administrative deadlines, or even recognize that a benefit claim was something she needed to file, and did not submit a disability claim until fourteen months after she stopped working, well past the standard filing window the governing rules describe. She has since stabilized with treatment and now wants the claim backdated to the point she actually became unable to work, supported by contemporaneous medical records documenting her condition and its severity throughout the entire gap period. The agency's initial response treated the late filing as simply forfeiting benefits for the period before she actually applied. You are advising her on seeking backdating under a good-cause exception.",
    keyIssues: [
      "Whether a documented mental-health condition that itself impaired her capacity to file can constitute good cause excusing a late claim",
      "Evidentiary requirements to establish both the underlying incapacity and its specific effect on her ability to manage the claims process during the gap period",
      "Whether backdating, once good cause is established, restores the full retroactive period or only a partial extension",
      "Practical steps to request good-cause backdating and the kind of medical and personal evidence that supports it most effectively",
    ],
    expectedConcepts: [
      "good-cause exception to a filing deadline",
      "incapacity-to-file as a recognized good-cause basis",
      "contemporaneous medical evidence of both condition and its procedural effect",
      "scope of retroactive backdating once good cause is shown",
      "distinguishing incapacity to file from mere unawareness of the filing requirement",
    ],
    modelApproach:
      "A strong answer treats the core legal question as not merely 'was she sick' but 'did the sickness itself impair her specific capacity to understand and act on a filing obligation,' since good-cause exceptions typically require that tighter causal link rather than illness in general, and leans on the contemporaneous medical records covering the full gap period as the evidence most likely to establish both elements together. It explains that successfully establishing good cause typically restores the claim to the actual onset date, not merely to some earlier but still-late filing point, and recommends assembling that medical evidence systematically before submitting the backdating request.",
    furtherReading: [
      "Good-cause exceptions to benefit-claim filing deadlines",
      "Incapacity-to-file as a basis for retroactive backdating",
      "Evidentiary standards for establishing good cause in late-filed disability claims",
    ],
    premium: true,
    testsFundamentals: ["law-socsec-retroactive-backdating-claims", "law-socsec-disability-benefit-standard"],
  },
];
