import type { CaseStudy } from "@/lib/caseStudyContent";
import type { Fundamental } from "@/lib/caseStudyFundamentals";

/**
 * Law / Labor & Employment Law: the fundamentals checklist and the case bank
 * for this category, kept together so they can be written and reviewed as
 * one unit. Registered in lib/cases/index.ts.
 *
 * Every case is written to be jurisdiction-neutral: it must make sense when
 * machine-translated and graded against the US, German, French, Spanish, or
 * Swedish legal system, so it avoids any single country's statutes, courts,
 * or procedural vocabulary in favor of generic doctrine that exists (in some
 * form) across all five.
 */
export const LAW_LABOR_EMPLOYMENT_FUNDAMENTALS: Fundamental[] = [
  { id: "law-labor-employment-classification", label: "Distinguishing an employee from a genuinely independent contractor using a substance-over-form, economic-reality test" },
  { id: "law-labor-termination-standards", label: "Applying the standard for a lawful dismissal (just cause, substantive grounds, or applicable at-will limits) and the employer's burden to establish it" },
  { id: "law-labor-notice-severance", label: "Determining the statutory or contractual notice period and severance owed on termination" },
  { id: "law-labor-discrimination-protected-characteristics", label: "Applying anti-discrimination protections for a protected characteristic (sex, pregnancy, age, disability) to an adverse employment decision" },
  { id: "law-labor-disparate-impact-vs-treatment", label: "Distinguishing disparate treatment (intentional discrimination) from disparate impact (a facially neutral practice with a discriminatory effect)" },
  { id: "law-labor-harassment-hostile-work-environment", label: "Assessing employer liability for workplace harassment and the adequacy of its remedial response" },
  { id: "law-labor-retaliation-protected-activity", label: "Identifying unlawful retaliation for protected activity (complaints, leave, whistleblowing, organizing) using timing and comparator evidence" },
  { id: "law-labor-collective-bargaining", label: "Applying the duty to recognize and bargain in good faith with a certified or representative union" },
  { id: "law-labor-strike-industrial-action", label: "Distinguishing lawful industrial action or a protected safety-related work refusal from an unauthorized work stoppage" },
  { id: "law-labor-worker-representation-consultation", label: "Applying information-and-consultation obligations owed to an elected worker representative body in workplace decisions" },
  { id: "law-labor-collective-redundancy", label: "Applying collective-redundancy procedural requirements (consultation, timing, selection criteria) to a mass layoff or plant closure" },
  { id: "law-labor-wage-hour-compliance", label: "Applying minimum-wage, overtime, and working-time compliance obligations, including exposure for misclassified workers" },
  { id: "law-labor-workplace-safety-duty-of-care", label: "Applying the employer's duty of care for workplace health and safety, including liability for a known, unaddressed hazard" },
  { id: "law-labor-reasonable-accommodation-disability", label: "Applying the duty to provide reasonable accommodation for a disability or medical condition through a genuine interactive process" },
  { id: "law-labor-leave-entitlements", label: "Applying statutory leave entitlements (parental, sick, family) and the right to return to an equivalent role afterward" },
  { id: "law-labor-restrictive-covenants", label: "Assessing the enforceability of a post-employment restrictive covenant against the legitimate interest it is meant to protect" },
  { id: "law-labor-whistleblower-protection", label: "Applying whistleblower protections to an employee who reports a legal or safety violation internally or to a regulator" },
  { id: "law-labor-transfer-of-undertakings", label: "Determining what happens to employment terms, seniority, and liability when a business is sold or transferred as a going concern" },
  { id: "law-labor-equal-pay", label: "Applying equal-pay-for-equal-work principles and evaluating whether a pay-setting factor is a legally sufficient justification for a gap" },
];

export const LAW_LABOR_EMPLOYMENT_CASES: CaseStudy[] = [
  {
    id: "law-labor-contractor-reclassification",
    profession: "law",
    category: "Labor & Employment Law",
    title: "The 'Independent Contractor' Delivery Fleet",
    scenario:
      "A logistics platform classifies its delivery drivers as independent contractors, requiring them to use the platform's app, follow assigned routes and delivery windows, wear branded uniforms, and face account deactivation for declining more than a set percentage of assigned jobs, while the platform argues drivers remain free to work for competitors and set their own schedule in theory. A labor inspectorate has opened an investigation after driver complaints that they receive no overtime pay, no minimum-wage guarantee, and no entitlement to paid leave, on the premise that they are engaged in a genuinely independent business. You are advising the platform on how an inspectorate or tribunal is likely to assess the drivers' true status, and what exposure reclassification would create.",
    keyIssues: [
      "Which factors actually indicate genuine entrepreneurial independence rather than disguised employment",
      "Whether the degree of practical control (branding, fixed routes, deactivation for declined jobs) undermines the independent-contractor label despite the formal contract terms",
      "The scope of back pay for minimum wage, overtime, and leave entitlements if the drivers are reclassified as employees",
      "Whether a theoretical freedom to decline work matters if declining is penalized in practice",
    ],
    expectedConcepts: [
      "substance over form",
      "economic reality / control test",
      "integration into the business",
      "mutuality of obligation",
      "worker misclassification remedies",
    ],
    modelApproach:
      "A strong answer tests actual day-to-day practice rather than the contract's own label, weighing the branding, route control, and deactivation policy as evidence of real control regardless of what the paperwork calls the relationship, and is realistic about the scale of back-pay exposure the inspectorate's investigation could expose if reclassification follows.",
    furtherReading: [
      "Comparative tests for distinguishing employee and independent-contractor status",
      "Consequences and remedies for worker misclassification",
      "Platform and gig-economy employment-status disputes",
    ],
    testsFundamentals: ["law-labor-employment-classification", "law-labor-wage-hour-compliance"],
  },
  {
    id: "law-labor-undocumented-performance-dismissal",
    profession: "law",
    category: "Labor & Employment Law",
    title: "Dismissing an Underperforming Employee With No Paper Trail",
    scenario:
      "A mid-sized firm wants to dismiss a five-year employee for ongoing underperformance, but her personnel file contains only positive annual reviews and no record of any formal warning, improvement plan, or documented conversation about the specific shortfalls now cited as the reason for dismissal. The company wants to terminate this week, citing a client complaint received yesterday as the final straw, and wants to pay no more than the statutory minimum notice. The employee's manager insists her performance has genuinely been declining for over a year, just never written down. You are advising HR on whether proceeding immediately is defensible, and what it would take to materially lower the risk of a successful wrongful-dismissal claim.",
    keyIssues: [
      "Whether substantive grounds for dismissal exist when the personnel file contradicts the stated reason",
      "Statutory or contractual notice and severance obligations regardless of how the dismissal is justified",
      "The practical risk of an unjustified or unfair dismissal claim given the absence of any documented warning or improvement process",
      "Whether a documented remedial process is a practical prerequisite before dismissal, or whether the latest incident alone can carry the decision",
    ],
    expectedConcepts: [
      "substantive justification for dismissal",
      "progressive discipline and documentation",
      "statutory minimum notice",
      "unjustified / unfair dismissal claim",
      "burden of proof on the employer",
    ],
    modelApproach:
      "A strong answer flags the mismatch between a year of undocumented decline and a file full of positive reviews as the central vulnerability, recommends a documented remedial process before any dismissal rather than an abrupt termination built on yesterday's complaint alone, and addresses the notice and severance floor as a separate obligation regardless of how the substantive dismissal question is resolved.",
    furtherReading: [
      "Just-cause and substantive-fairness standards for employee dismissal",
      "Documentation and progressive-discipline practice in termination decisions",
      "Statutory and contractual notice and severance obligations",
    ],
    testsFundamentals: ["law-labor-termination-standards", "law-labor-notice-severance"],
  },
  {
    id: "law-labor-pregnancy-promotion-denial",
    profession: "law",
    category: "Labor & Employment Law",
    title: "Passed Over for Promotion After Announcing a Pregnancy",
    scenario:
      "A sales manager with a strong track record was the clear internal favorite for a regional director promotion until she told her supervisor she was pregnant; two weeks later the role was given to a colleague with shorter tenure and a demonstrably thinner sales record, and the supervisor's explanation referenced 'team stability' and 'upcoming workload demands' without further detail. She filed an internal complaint and was removed from a flagship client account the following month, which the company describes as a routine account reassignment unrelated to her complaint. She wants to know whether she has a viable discrimination claim over the promotion, a separate retaliation claim over the account reassignment, and how the timing of each should be used as evidence.",
    keyIssues: [
      "Whether pregnancy was a determinative or motivating factor in the promotion decision given the comparator's weaker record",
      "Whether the vague 'team stability' and 'workload' justification is credible or looks like pretext for the real reason",
      "Whether the account reassignment following her internal complaint supports an independent retaliation claim distinct from the promotion claim",
      "How timing and comparator evidence work together as circumstantial proof without being treated as automatically conclusive on their own",
    ],
    expectedConcepts: [
      "pregnancy / family-status discrimination",
      "comparator evidence",
      "pretext",
      "protected activity and retaliation",
      "burden-shifting framework",
    ],
    modelApproach:
      "A strong answer treats the promotion-discrimination claim and the retaliation claim as two distinct theories each needing its own proof, uses the comparator's weaker sales record as strong circumstantial evidence against the stated justification, and treats the timing of the account reassignment as suspicious but not conclusive by itself.",
    furtherReading: [
      "Pregnancy and family-status discrimination protections",
      "Comparator and pretext analysis in employment discrimination claims",
      "Retaliation claims and the causal-proximity inference",
    ],
    premium: true,
    testsFundamentals: ["law-labor-discrimination-protected-characteristics", "law-labor-retaliation-protected-activity"],
  },
  {
    id: "law-labor-algorithmic-screening-age-bias",
    profession: "law",
    category: "Labor & Employment Law",
    title: "An Automated Hiring Tool's Age Skew",
    scenario:
      "A large employer uses automated resume-screening software that weights long employment gaps and graduation dates heavily, and an internal audit shows applicants over fifty are screened out at nearly three times the rate of younger applicants with comparable qualifications, even though no screening criterion explicitly references age. The vendor says the tool was never programmed to consider age and that the disparity simply reflects natural variance in its correlation-based scoring, while a rejected applicant's lawyer has requested the audit data and the tool's scoring methodology. You are advising the employer on its exposure and on whether it can keep relying on the tool's recommendations while the question is resolved.",
    keyIssues: [
      "Whether facially neutral criteria causing a statistically significant disparity support a disparate-impact claim regardless of intent",
      "The employer's burden to justify the criteria as job-related and necessary once a measurable disparity is shown",
      "Why the vendor's 'no intent' defense does not resolve disparate-impact exposure, which does not require intent at all",
      "The practical risk of continuing to rely on the tool's recommendations while the methodology question is still open",
    ],
    expectedConcepts: [
      "disparate impact versus disparate treatment",
      "statistically significant disparity",
      "job-relatedness / business-necessity justification",
      "less-discriminatory-alternative obligation",
      "vendor versus employer liability allocation",
    ],
    modelApproach:
      "A strong answer separates intent, which is irrelevant to disparate impact, from the facially neutral criteria actually causing the disparity, requires the employer itself (not the vendor's generic defense) to produce a specific job-related justification for the weighted criteria, and recommends suspending or auditing further reliance on the tool rather than continuing to use it while the exposure is unresolved.",
    furtherReading: [
      "Disparate impact doctrine and statistical proof of discriminatory effect",
      "Validation and job-relatedness defenses for screening criteria",
      "Algorithmic hiring tools and emerging discrimination liability",
    ],
    premium: true,
    testsFundamentals: ["law-labor-disparate-impact-vs-treatment", "law-labor-discrimination-protected-characteristics"],
  },
  {
    id: "law-labor-executive-harassment-inadequate-response",
    profession: "law",
    category: "Labor & Employment Law",
    title: "A Harassment Complaint Against a Revenue-Generating Executive",
    scenario:
      "A mid-level employee has filed a formal complaint alleging repeated unwelcome comments about her appearance and physical intimidation by a senior executive who personally manages the company's largest client relationships. HR's investigation substantiated two of the three incidents described but recommended only a private verbal warning and a mandatory training module, with no change to the executive's role or reporting line, and the complainant now sits two floors away from the executive but still attends the same weekly leadership meetings. She says the environment remains intolerable and is considering resigning and pursuing a claim; the company wants to know whether its response was legally adequate and what it should do now.",
    keyIssues: [
      "Whether a response proportionate to a substantiated harassment finding requires more than a warning and training given the ongoing required contact",
      "The risk that an inadequate remedial response itself creates continuing liability independent of the original conduct",
      "Whether the continued shared meetings undermine the claim that the issue has actually been resolved",
      "The risk that resigning over conditions the company failed to adequately fix amounts to a constructive dismissal",
    ],
    expectedConcepts: [
      "hostile work environment",
      "duty to take prompt and effective remedial action",
      "proportionality of remedial measures to severity",
      "constructive dismissal",
      "continuing violation",
    ],
    modelApproach:
      "A strong answer evaluates whether the remedial action was actually calculated to end the conduct and prevent recurrence rather than simply to document a process, flags the continued forced contact in shared meetings as evidence the response was not adequate, and recommends concrete structural changes while honestly assessing the resignation and constructive-dismissal risk if nothing further is done.",
    furtherReading: [
      "Employer liability standards for workplace harassment and the adequacy of remedial action",
      "Constructive dismissal and the intolerable-conditions standard",
      "Proportionate remedial measures following a substantiated harassment finding",
    ],
    premium: true,
    testsFundamentals: ["law-labor-harassment-hostile-work-environment", "law-labor-discrimination-protected-characteristics"],
  },
  {
    id: "law-labor-union-recognition-refusal",
    profession: "law",
    category: "Labor & Employment Law",
    title: "Refusing to Recognize a Newly Organized Union",
    scenario:
      "A majority of warehouse employees at a distribution center have organized and formally notified management that they wish to be represented by a union for the purpose of collective bargaining over wages and shift scheduling. Management has refused to meet with the union's representatives, instead sending a company-wide email announcing an unrelated 4 percent raise effective immediately, and instructing supervisors to remind employees individually, in one-on-one check-ins scheduled with everyone next week, that 'the company already treats people fairly.' The union says this conduct is designed to undercut organizing and bypass its representational role, while the company says it is simply continuing routine pay reviews and ordinary supervisor check-ins unrelated to the union. You are advising the company on the legal risk in each of these specific actions.",
    keyIssues: [
      "Whether a duty to recognize and bargain arises once majority support or certification is established, and what refusing to meet exposes the company to",
      "Whether unilaterally announcing a pay change after organizing begins, but before bargaining starts, interferes with the duty to bargain even if the raise itself is otherwise reasonable",
      "Whether individualized supervisor meetings during an organizing period amount to improper direct dealing that bypasses the union's representative role",
      "What remedies are available if a labor authority finds the company's conduct amounted to bad-faith interference with organizing or bargaining rights",
    ],
    expectedConcepts: [
      "duty to bargain in good faith",
      "exclusive representation",
      "unilateral change during an organizing or bargaining period",
      "direct dealing",
      "remedies for interference with organizing rights",
    ],
    modelApproach:
      "A strong answer treats the raise announcement and the scheduled one-on-ones as independently risky even absent any explicit anti-union statement, since timing and context alone can establish unlawful interference with organizing and bargaining rights, and recommends engaging with the union through its representatives immediately rather than continuing to act around them.",
    furtherReading: [
      "Comparative duty-to-bargain and union-recognition standards",
      "Unilateral changes and direct dealing during an organizing or bargaining period",
      "Remedies for employer interference with organizing and collective bargaining rights",
    ],
    premium: true,
    testsFundamentals: ["law-labor-collective-bargaining", "law-labor-retaliation-protected-activity"],
  },
  {
    id: "law-labor-wildcat-safety-strike",
    profession: "law",
    category: "Labor & Employment Law",
    title: "A Walkout Over Unaddressed Safety Hazards",
    scenario:
      "After three employees suffered minor injuries from a malfunctioning conveyor system that maintenance had flagged internally twice without repair, a group of forty warehouse workers refused to report to their stations one morning, citing imminent danger, without following any formal notice or ballot procedure that might otherwise apply to organized industrial action. Management wants to discipline the group for an unauthorized work stoppage and has sent a notice stating that anyone not returning to their station within the hour will be treated as having abandoned their job. The workers argue they were exercising a basic right to refuse genuinely dangerous work, not engaging in a labor dispute requiring the usual procedural steps. You are advising management on whether discipline is defensible and what obligations the hazard itself independently creates.",
    keyIssues: [
      "Whether a spontaneous refusal to work due to a genuine, specific safety hazard is legally distinct from formal industrial action requiring notice or ballot procedures",
      "The employer's independent duty to address a known, previously flagged hazard regardless of how the workers reacted to it",
      "The risk of unlawful retaliation or dismissal for exercising a right to refuse genuinely dangerous work",
      "What remediation steps are needed before the employer can legitimately require a return to the affected stations",
    ],
    expectedConcepts: [
      "right to refuse dangerous work",
      "genuine and imminent hazard requirement",
      "protected safety refusal versus unauthorized industrial action",
      "employer duty of care / safe workplace obligation",
      "retaliation for a safety-related work refusal",
    ],
    modelApproach:
      "A strong answer separates the hazard question from the procedural labor-dispute question, treats the twice-flagged, unrepaired conveyor as the central liability exposure regardless of how the workers reacted to it, and warns that disciplining a genuine safety refusal risks an independent retaliation claim layered on top of the underlying hazard itself.",
    furtherReading: [
      "The right to refuse dangerous work and its limits",
      "Employer duty of care and liability for known, unaddressed workplace hazards",
      "Distinguishing protected safety-related work refusals from unauthorized industrial action",
    ],
    premium: true,
    testsFundamentals: ["law-labor-strike-industrial-action", "law-labor-workplace-safety-duty-of-care"],
  },
  {
    id: "law-labor-plant-closure-no-consultation",
    profession: "law",
    category: "Labor & Employment Law",
    title: "Announcing a Plant Closure Before Consulting Worker Representatives",
    scenario:
      "A manufacturer has decided to close one of its three plants, affecting 220 employees, and the general manager announced the closure and a target shutdown date eight weeks out in a company-wide email, before any formal consultation with the plant's elected worker representative body about the decision, its timing, or possible alternatives such as redeployment or a phased closure. Leadership argues that consulting after the decision is announced still satisfies information-and-consultation requirements since nothing has actually been implemented yet, while the worker representatives argue the decision itself must remain genuinely open to influence, not merely its implementation details, and that the compressed eight-week timeline leaves no real room for severance negotiation or redeployment planning. You are advising leadership on the adequacy of the process so far and what remains to be done.",
    keyIssues: [
      "Whether information-and-consultation obligations attach before a closure decision is finalized, not only to its implementation",
      "Whether consultation limited to timing and logistics satisfies a requirement to consult while the underlying decision remains genuinely open",
      "Whether the eight-week timeline is adequate given collective-redundancy obligations around severance negotiation and redeployment",
      "What remedies worker representatives could pursue if the consultation process is found procedurally deficient",
    ],
    expectedConcepts: [
      "information and consultation obligations",
      "collective redundancy procedure",
      "genuine versus pro forma consultation",
      "minimum notice and consultation periods",
      "remedies for inadequate consultation",
    ],
    modelApproach:
      "A strong answer distinguishes consulting on a decision that is still genuinely open from consulting only on how an already-final decision will be carried out, treats the pre-consultation public announcement as strong evidence the decision was presented as a fait accompli, and recommends reopening meaningful consultation on alternatives and timeline, including the severance and redeployment questions, before proceeding further.",
    furtherReading: [
      "Information and consultation obligations before a collective redundancy or plant closure",
      "Genuine versus pro forma consultation with worker representative bodies",
      "Minimum notice and consultation periods in collective redundancy law",
    ],
    premium: true,
    testsFundamentals: ["law-labor-worker-representation-consultation", "law-labor-collective-redundancy", "law-labor-notice-severance"],
  },
  {
    id: "law-labor-rsi-accommodation-resistance",
    profession: "law",
    category: "Labor & Employment Law",
    title: "A Repetitive Strain Injury and a Disputed Workstation Accommodation",
    scenario:
      "A data-entry employee developed a diagnosed repetitive strain injury and submitted a physician's note requesting a modified keyboard, an adjustable desk, and two additional short breaks per shift to prevent the injury from worsening. Her employer approved the equipment but refused the extra breaks, citing a need for continuous phone coverage during business hours, and has not explored any alternative way to achieve the same relief, such as a brief rotation with a colleague or a staggered break schedule. The employee says her symptoms are worsening without the additional breaks, while the employer maintains it has already done what the doctor's note 'mainly' asked for. You are advising the employer on whether its response meets the duty to accommodate and what it is still missing.",
    keyIssues: [
      "Whether partial accommodation addressing equipment but not the break-frequency element satisfies the full accommodation duty",
      "Whether the employer has genuinely explored alternative ways to meet its coverage needs rather than simply denying the specific accommodation requested",
      "What would actually count as an undue burden justifying refusal, as opposed to mere inconvenience",
      "Whether the foreseeable worsening of the condition without further accommodation is itself an avoidable harm the employer should now be treating as urgent",
    ],
    expectedConcepts: [
      "reasonable accommodation duty",
      "interactive / cooperative accommodation process",
      "undue hardship or burden standard",
      "partial compliance is not full compliance",
      "foreseeable aggravation of a known condition",
    ],
    modelApproach:
      "A strong answer treats 'we did most of it' as insufficient, since the duty is evaluated against each distinct element of the medical request, requires the employer to show it actually explored alternatives like staggered coverage before claiming undue burden, and flags the foreseeable-aggravation angle as an independent reason to revisit the refusal now rather than waiting for the condition to worsen further.",
    furtherReading: [
      "The duty to provide reasonable accommodation for a disability or medical condition at work",
      "The interactive process and the undue-hardship standard in accommodation disputes",
      "Employer liability for foreseeable aggravation of a known medical condition",
    ],
    premium: true,
    testsFundamentals: ["law-labor-reasonable-accommodation-disability", "law-labor-workplace-safety-duty-of-care"],
  },
  {
    id: "law-labor-parental-leave-return-demotion",
    profession: "law",
    category: "Labor & Employment Law",
    title: "A Demotion on Return From Parental Leave",
    scenario:
      "An employee took statutory parental leave for four months and returned to find her previous role had been restructured, her direct reports reassigned to a colleague who covered for her, and her new role described as 'equivalent' despite a lower public profile and no path back to her prior client portfolio. The employer says the restructuring was planned before she left, for unrelated business reasons, and would have happened regardless of her leave, while she argues the timing and the specific choice to permanently reassign exactly the responsibilities she held is difficult to square with a reorganization genuinely unrelated to her absence. You are advising her on what she would need to show to succeed in a claim that her treatment on return violated her leave-related protections.",
    keyIssues: [
      "What a statutory right to return to an equivalent role actually requires beyond matching title and pay",
      "Whether the employer's 'planned regardless' defense is credible given the timing and the specific target of the reassignment",
      "The burden of proof once a prima facie adverse change following protected leave has been shown",
      "What remedies, reinstatement versus compensation, are realistically available if the claim succeeds",
    ],
    expectedConcepts: [
      "right to return after protected leave",
      "equivalence of role, status, and responsibilities, not just title or pay",
      "burden-shifting once adverse treatment follows protected leave",
      "reinstatement as a remedy",
      "pretext",
    ],
    modelApproach:
      "A strong answer tests 'equivalent role' against substance, direct reports, profile, client portfolio, rather than label, treats the timing and the specific target of the reassignment as circumstantial evidence undercutting the unrelated-reorganization defense, and identifies reinstatement to a genuinely equivalent role as the primary remedy she should be seeking.",
    furtherReading: [
      "The right to return to an equivalent role after statutory parental or family leave",
      "Burden-shifting frameworks for adverse treatment following protected leave",
      "Reinstatement and compensation remedies for leave-related retaliation",
    ],
    premium: true,
    testsFundamentals: ["law-labor-leave-entitlements", "law-labor-retaliation-protected-activity"],
  },
  {
    id: "law-labor-safety-whistleblower-dismissal",
    profession: "law",
    category: "Labor & Employment Law",
    title: "Dismissed Six Weeks After Reporting a Safety Violation",
    scenario:
      "A quality-control engineer reported to the relevant safety regulator that his plant was bypassing a mandatory pressure-testing step to meet a production deadline, after raising the issue internally twice with no response. Six weeks later, following the regulator's unannounced inspection, which confirmed the shortcut and resulted in a fine, the engineer was dismissed for what the company describes as an unrelated restructuring that eliminated his specific position, the only position eliminated in the round. He wants to know whether the timing alone is enough to support a whistleblower-retaliation claim, and what the company would need to show to rebut it.",
    keyIssues: [
      "Whether reporting externally, after internal reporting went unanswered, is itself protected whistleblowing activity",
      "Whether the proximity in time between the report, the inspection, and the dismissal supports an inference of retaliation",
      "What a credible non-retaliatory explanation would need to show, given that his was the only position eliminated in the round",
      "What remedies, reinstatement or damages, are available for an unlawfully retaliatory dismissal",
    ],
    expectedConcepts: [
      "whistleblower protection",
      "external reporting after internal reporting fails",
      "causal-proximity inference",
      "employer's burden to show a genuine, independent justification",
      "reinstatement and damages remedies",
    ],
    modelApproach:
      "A strong answer treats the timing together with the fact that his was the only position cut as strong circumstantial evidence shifting the burden to the employer, requires more than a generic 'restructuring' label to rebut that inference, and flags that external reporting after an unanswered internal complaint falls squarely within protected activity rather than being a basis to treat him less favorably for going outside the company.",
    furtherReading: [
      "Whistleblower protection for external reports of safety or regulatory violations",
      "Causal-proximity inference and burden-shifting in retaliatory-dismissal claims",
      "Remedies for retaliatory dismissal following protected whistleblowing",
    ],
    premium: true,
    testsFundamentals: ["law-labor-whistleblower-protection", "law-labor-workplace-safety-duty-of-care"],
  },
  {
    id: "law-labor-business-sale-employee-transfer",
    profession: "law",
    category: "Labor & Employment Law",
    title: "Whose Employees Are They After an Asset Sale?",
    scenario:
      "A company is selling its catering division as a going concern to a competitor, who plans to continue operating it under a new name with the same staff, equipment, and client contracts, but wants to offer the existing 35 employees new contracts with a lower base salary and reduced seniority-based benefits, treating them as new hires rather than continuing employees. The seller believes it can simply walk away from any employment obligations once the deal closes, since it is the buyer's business now. Several employees have asked what happens to their accrued seniority, their existing collective bargaining agreement coverage, and their job security during the transition. You are advising both the seller and the buyer on the labor-law consequences of structuring the deal as a going-concern transfer rather than a bare asset sale.",
    keyIssues: [
      "Whether a sale of a going concern automatically transfers existing employment contracts, accrued seniority, and collective-agreement obligations to the buyer by operation of law",
      "Whether the buyer can unilaterally offer continuing employees less favorable terms than they already had",
      "Whether dismissal protections are specifically triggered by the transfer itself, independent of the ordinary rules governing termination",
      "How liability for pre-transfer employment claims is allocated between seller and buyer once the deal closes",
    ],
    expectedConcepts: [
      "transfer of undertakings / automatic transfer of employment",
      "continuity of seniority and collective agreement terms",
      "dismissal protection triggered by the transfer itself",
      "allocation of liability between seller and buyer",
    ],
    modelApproach:
      "A strong answer corrects the assumption that a going-concern sale lets either party simply redefine continuing staff as new hires, explains that automatic-transfer doctrine, where it applies, carries over terms and seniority by operation of law regardless of what the buyer would prefer to offer, and separately addresses how pre-transfer liability is allocated between seller and buyer.",
    furtherReading: [
      "Automatic transfer of employment on the sale of a business as a going concern",
      "Continuity of seniority and collective agreement terms following a business transfer",
      "Dismissal protections triggered by a transfer of undertakings",
    ],
    premium: true,
    testsFundamentals: ["law-labor-transfer-of-undertakings", "law-labor-notice-severance"],
  },
  {
    id: "law-labor-pay-equity-audit-claim",
    profession: "law",
    category: "Labor & Employment Law",
    title: "An Internal Pay Audit Finds a Gender Gap in Identical Roles",
    scenario:
      "A company's own voluntary pay-equity audit found that women in a specific engineering grade earn on average 11 percent less than men in the same grade with comparable tenure and performance ratings, a gap the compensation team attributes partly to market-based starting-salary negotiations at the time each person was first hired, rather than to the grade's own formal pay band. One affected employee has asked for a raise closing her individual gap plus back pay for the difference since her hire date, while the company would rather address the issue only prospectively, through future pay bands, to avoid conceding that past decisions were unlawful. You are advising the company on its exposure if it declines to address the past gap and on whether 'market-based starting salary' is likely to hold up as a justification.",
    keyIssues: [
      "Whether a facially neutral practice, individualized starting-salary negotiation, that produces a statistically significant gender pay gap requires an equal-pay-style justification rather than being automatically excused as market-based",
      "Whether prior salary or negotiation history is a legally sufficient factor to justify unequal pay for equal work",
      "The scope of back-pay exposure if the gap is ultimately found unjustified",
      "Whether the completed internal audit itself creates actual or constructive knowledge that triggers a duty to act promptly",
    ],
    expectedConcepts: [
      "equal pay for equal work",
      "factors other than sex as a defense",
      "prior-salary justification doctrine",
      "back-pay exposure",
      "knowledge-triggered duty to remediate",
    ],
    modelApproach:
      "A strong answer tests the 'market-based' justification against whether a factor like prior salary is actually permitted to justify a pay gap at all, rather than simply asserted as a label, treats the completed internal audit as actual knowledge that starts a clock on remediation, and advises against treating a prospective-only fix as sufficient once the company already knows about a specific, identified disparity.",
    furtherReading: [
      "Equal pay for equal work and permissible versus impermissible justifications for a pay gap",
      "The use and limits of prior salary as a pay-setting factor",
      "Back-pay exposure and the duty to remediate a known pay disparity",
    ],
    premium: true,
    testsFundamentals: ["law-labor-equal-pay", "law-labor-discrimination-protected-characteristics"],
  },
  {
    id: "law-labor-noncompete-departing-sales-exec",
    profession: "law",
    category: "Labor & Employment Law",
    title: "A Departing Sales Executive and a Two-Year Restriction",
    scenario:
      "A sales executive is leaving to join a direct competitor after eight years managing the company's largest accounts, and her employment contract includes a two-year post-employment restriction barring her from working anywhere in the same industry nationwide, with no compensation paid during the restricted period. The company wants to enforce the restriction in full to protect its client relationships and confidential pricing strategy, while the executive argues the restriction is far broader than necessary to protect any real interest, since her actual client contact was limited to a specific regional market and a specific product line. You are advising the company on whether the restriction as written is likely to be enforced, and what a more defensible version would look like.",
    keyIssues: [
      "Whether the restriction's scope, nationwide, whole industry, two years, uncompensated, is proportionate to the legitimate interest actually at stake",
      "The legitimate-business-interest requirement as distinct from a bare restraint on competition",
      "Whether a court or tribunal is likely to narrow the clause rather than void it outright",
      "Practical alternatives, a narrower non-solicitation of specific clients, paid leave during the restricted period, that would better withstand a challenge",
    ],
    expectedConcepts: [
      "restrictive covenant / post-employment restraint",
      "legitimate business interest",
      "reasonableness of scope (geography, duration, activity)",
      "severance or judicial narrowing of an overbroad clause",
      "non-solicitation as a narrower alternative",
    ],
    modelApproach:
      "A strong answer measures the restriction's actual scope against the narrower interest it claims to protect rather than assuming broad language is automatically enforceable, flags the uncompensated two-year nationwide bar as the clause's most vulnerable feature, and recommends negotiating a narrower, more defensible alternative rather than litigating the clause exactly as written.",
    furtherReading: [
      "Enforceability of post-employment restrictive covenants",
      "The legitimate-interest requirement and proportionality of scope in non-compete clauses",
      "Severance, judicial narrowing, and non-solicitation as alternatives to a broad restraint",
    ],
    premium: true,
    testsFundamentals: ["law-labor-restrictive-covenants"],
  },
];
