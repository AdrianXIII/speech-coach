import type { CaseStudy } from "@/lib/caseStudyContent";
import type { Fundamental } from "@/lib/caseStudyFundamentals";

/**
 * Politics / Public Administration & Governance: the fundamentals checklist
 * and the case bank for this category, kept together so they can be written
 * and reviewed as one unit. Registered in lib/cases/index.ts.
 *
 * Written to be jurisdiction-neutral: the same case bank is shown to users in
 * presidential, semi-presidential, and parliamentary-coalition systems alike,
 * so scenarios avoid any single country's institutions, statutes, or titles,
 * using generic terms (the civil service, the audit office, the procurement
 * regulator, the ombudsman) instead.
 */
export const POLITICS_PUBLIC_ADMINISTRATION_FUNDAMENTALS: Fundamental[] = [
  { id: "pol-pubadmin-principal-agent", label: "Recognizing the principal-agent gap between elected officials and the civil service they direct, and designing oversight/incentives rather than relying on trust alone" },
  { id: "pol-pubadmin-political-neutrality", label: "Preserving a professional, politically neutral civil service that remains responsive to lawful ministerial direction without becoming a partisan instrument" },
  { id: "pol-pubadmin-procurement-integrity", label: "Running a transparent, competitive procurement process that withstands audit and resists steering toward a favored bidder" },
  { id: "pol-pubadmin-red-tape-vs-control", label: "Balancing legitimate administrative controls against the real economic and service cost of red tape and procedural delay" },
  { id: "pol-pubadmin-performance-metrics-gaming", label: "Choosing public-service performance metrics that resist gaming and goal displacement rather than rewarding the measure instead of the mission" },
  { id: "pol-pubadmin-whistleblower-channel", label: "Building a credible internal channel for whistleblower disclosures of waste, fraud, or abuse, and protecting the discloser from retaliation" },
  { id: "pol-pubadmin-audit-response", label: "Responding to a critical independent audit finding with a credible, verifiable corrective-action plan rather than a defensive rebuttal" },
  { id: "pol-pubadmin-service-backlog-diagnosis", label: "Diagnosing the root cause of a front-line service-delivery backlog (staffing, process, or demand shock) before committing to a fix" },
  { id: "pol-pubadmin-interagency-turf", label: "Resolving interagency turf conflict and mandate overlap so a shared problem gets coordinated delivery instead of mutual deflection" },
  { id: "pol-pubadmin-contractor-oversight", label: "Overseeing an outsourced or contracted public service closely enough to catch failure early without losing the in-house capability to ever take it back" },
  { id: "pol-pubadmin-politicized-appointment", label: "Resisting pressure to fill a nominally non-partisan administrative post or decision on political-loyalty grounds rather than merit" },
  { id: "pol-pubadmin-foia-transparency", label: "Managing freedom-of-information or public-records obligations against legitimate confidentiality and candid-deliberation needs, rather than defaulting to blanket disclosure or blanket secrecy" },
  { id: "pol-pubadmin-budget-execution", label: "Managing in-year budget execution discipline to avoid both service-damaging underspend and wasteful, unscrutinized year-end rush spending" },
  { id: "pol-pubadmin-it-modernization-risk", label: "Structuring a government IT or digital-service modernization project to avoid the classic large-scale public-IT failure pattern of scope creep, vendor lock-in, and a late all-or-nothing go-live" },
  { id: "pol-pubadmin-regulatory-capture", label: "Recognizing and guarding against regulatory capture, including the revolving door between a regulator's staff and the industry it oversees" },
  { id: "pol-pubadmin-merit-hiring-patronage", label: "Protecting merit-based civil service hiring and promotion against patronage pressure from elected officials" },
  { id: "pol-pubadmin-surge-capacity", label: "Surging administrative staffing and capacity quickly during a sudden demand spike without breaking the controls that prevent fraud and error" },
  { id: "pol-pubadmin-permitting-delay", label: "Diagnosing and fixing chronic permitting or licensing delay that is driving public and business frustration, without abandoning the checks the process exists to perform" },
  { id: "pol-pubadmin-ombudsman-redress", label: "Using an ombudsman or formal grievance-redress mechanism to resolve a systemic pattern of complaints against the administration, not just individual cases" },
  { id: "pol-pubadmin-change-management-inertia", label: "Managing organizational reform implementation against bureaucratic inertia and front-line resistance, rather than assuming a signed directive changes practice on its own" },
];

export const POLITICS_PUBLIC_ADMINISTRATION_CASES: CaseStudy[] = [
  {
    id: "pol-pubadmin-benefits-backlog",
    profession: "politics",
    category: "Public Administration & Governance",
    title: "A Benefits Backlog Nobody Will Own",
    scenario:
      "You are the newly appointed head of the national disability-benefits agency. A backlog of unprocessed claims has grown to 310,000 over 18 months amid an unanticipated 40 percent surge in applications; some claimants are at risk of losing housing while they wait for a decision. Staff are stretched, the overtime budget is exhausted, and an emergency hiring wave approved six weeks ago still needs new case workers to complete 12 weeks of certification before they can decide a case alone. The responsible minister wants the backlog cut in half within 90 days and has floated publishing a raw 'cases closed per week' dashboard, which the staff union warns will reward closing easy cases first while the most complex and urgent ones keep waiting. You have to decide the plan and the metric.",
    keyIssues: [
      "Whether a headline 'cases closed' metric would incentivize caseworkers to prioritize easy claims over the most urgent or complex ones",
      "Whether certification requirements for new hires can be safely compressed, and what shortcut would create unacceptable error risk",
      "How to communicate a realistic 90-day target without either downplaying the human cost or promising what isn't achievable",
      "What structural root cause — staffing, demand shock, or process — actually drove the backlog, since the fix differs depending on the answer",
    ],
    expectedConcepts: [
      "backlog root-cause diagnosis",
      "performance-metric design and goal displacement",
      "case triage by urgency",
      "staffing ramp-up constraints",
      "realistic target-setting",
    ],
    modelApproach:
      "A strong answer diagnoses whether the backlog is primarily a demand-shock, staffing, or process problem before committing to a target, since each calls for a different fix. It rejects a raw throughput metric in favor of one that also tracks the age and severity of the oldest claims, explicitly guarding against the incentive to cherry-pick easy cases, and is honest publicly about what a realistic 90-day trajectory looks like given the hiring pipeline's fixed training time.",
    furtherReading: [
      "Goodhart's law and performance-metric design in public administration",
      "Triage-based case prioritization in benefits administration",
      "Public-sector workforce ramp-up and training-pipeline constraints",
    ],
    testsFundamentals: ["pol-pubadmin-service-backlog-diagnosis", "pol-pubadmin-performance-metrics-gaming", "pol-pubadmin-surge-capacity"],
  },
  {
    id: "pol-pubadmin-procurement-bid-protest",
    profession: "politics",
    category: "Public Administration & Governance",
    title: "A Losing Bidder Cries Foul",
    scenario:
      "Your ministry just awarded a 180 million contract for IT services to the second-lowest bidder, citing stronger technical scoring. The losing low-cost bidder has filed a formal protest alleging the evaluation criteria were quietly reweighted after bids opened to favor the eventual winner, whose lead engineer previously worked for the procurement office that ran the evaluation. Journalists have requested the full evaluation scoring sheets under the public-records law; your legal office warns that releasing them mid-protest could taint the review, while withholding them is already being framed publicly as a cover-up. You are advising the procurement director on how to handle the protest and the disclosure request at the same time.",
    keyIssues: [
      "Whether the evaluation criteria were in fact changed after bids opened, and if so whether that alone invalidates the award",
      "How to handle the prior employment link between the winning bidder's staff and the procurement office without assuming it is disqualifying or dismissing it outright",
      "Balancing transparency obligations under the public-records law against the integrity of an ongoing protest review",
      "What a credible, independent protest-review process looks like so the outcome is trusted regardless of which way it goes",
    ],
    expectedConcepts: [
      "procurement integrity",
      "criteria reweighting after bid opening",
      "conflict-of-interest disclosure",
      "freedom-of-information balancing",
      "independent bid-protest review",
    ],
    modelApproach:
      "A strong answer treats the mid-process criteria change as the central factual question to resolve first, through a protest review run independently of the office that made the award, and does not treat the prior-employment link as proof of wrongdoing without evidence it actually influenced scoring. On disclosure, it looks for a narrow, defensible way to release what can be released immediately while explaining precisely why the full scoring file waits for the protest review, rather than either stonewalling or dumping unreviewed material into a live dispute.",
    furtherReading: [
      "Public procurement integrity and bid-protest procedures",
      "Conflict-of-interest management in government contracting",
      "Freedom-of-information disclosure during active administrative disputes",
    ],
    testsFundamentals: ["pol-pubadmin-procurement-integrity", "pol-pubadmin-foia-transparency"],
  },
  {
    id: "pol-pubadmin-whistleblower-fraud-disclosure",
    profession: "politics",
    category: "Public Administration & Governance",
    title: "A Junior Auditor Flags a Pattern",
    premium: true,
    scenario:
      "A junior internal auditor has come to you, the agency's inspector general, with evidence that a long-standing facilities-maintenance contractor has been billing for inspections that site logs show never happened, for at least three years, across contracts worth 40 million. She says she first raised concerns informally with her direct supervisor eight months ago and was told to drop it because the contractor is 'untouchable' given its political connections. She is asking to remain anonymous, fearing retaliation, but a full investigation will likely require interviewing people who could identify her as the source. You must decide how to proceed.",
    keyIssues: [
      "How to protect the discloser's identity and position as far as realistically possible while still running a credible investigation",
      "Whether her supervisor's instruction to drop the matter is itself something to investigate separately",
      "How to preserve evidence and freeze further payments to the contractor without tipping it off prematurely",
      "What independent authority should run the investigation given the contractor's political connections",
    ],
    expectedConcepts: [
      "whistleblower protection",
      "retaliation risk management",
      "internal control failure",
      "contractor fraud investigation",
      "independence of investigative authority",
    ],
    modelApproach:
      "A strong answer takes concrete, early steps to protect the discloser — limiting who knows her identity, documenting any retaliation risk — while recognizing that full anonymity may not survive a thorough investigation, and is honest with her about that tradeoff rather than overpromising. It treats the supervisor's dismissal of the original complaint as a second, distinct problem worth its own review, and insists the investigation and any payment freeze run through a channel genuinely independent of the contractor's political connections.",
    furtherReading: [
      "Whistleblower protection frameworks in public administration",
      "Contractor fraud detection and internal audit practice",
      "Independence safeguards for inspector-general investigations",
    ],
    testsFundamentals: ["pol-pubadmin-whistleblower-channel", "pol-pubadmin-contractor-oversight"],
  },
  {
    id: "pol-pubadmin-critical-audit-report",
    profession: "politics",
    category: "Public Administration & Governance",
    title: "The Auditor's Report Lands Tomorrow",
    premium: true,
    scenario:
      "The national audit office is releasing a report tomorrow finding that your ministry's grant-disbursement unit lost effective control over 60 million in payments last year due to inadequate verification of recipient eligibility, with at least 9 million now assessed as unrecoverable overpayment. The report recommends a full overhaul of verification procedures and names the unit's director as responsible for ignoring an internal warning raised 14 months ago. The minister wants a statement ready the moment the report goes public. You are drafting the response and the corrective-action plan.",
    keyIssues: [
      "Whether to contest specific findings in the audit report or accept them and pivot immediately to corrective action",
      "What a credible corrective-action plan actually requires — timeline, verification mechanism, independent follow-up — versus a vague promise to do better",
      "How to address the ignored internal warning from 14 months ago without it looking like the ministry is only reacting because it was caught",
      "What accountability, if any, is appropriate for the named director versus the broader unit",
    ],
    expectedConcepts: [
      "external audit response",
      "corrective-action planning",
      "institutional learning",
      "accountability for ignored internal warnings",
      "verification control design",
    ],
    modelApproach:
      "A strong answer does not contest findings it cannot credibly rebut, and instead leads with a specific, time-bound corrective-action plan with mechanisms the audit office itself can later verify, rather than a general commitment to improve. It addresses the ignored 14-month-old warning directly rather than hoping it goes unmentioned, since the audit office and legislators will ask about it regardless, and treats individual accountability for the director as a separate question from the structural fixes the unit as a whole needs.",
    furtherReading: [
      "Independent audit institutions and their relationship to the executive",
      "Designing verifiable corrective-action plans after an adverse audit",
      "Grant-payment verification and overpayment-recovery practice",
    ],
    testsFundamentals: ["pol-pubadmin-audit-response", "pol-pubadmin-budget-execution"],
  },
  {
    id: "pol-pubadmin-politicized-senior-appointment",
    profession: "politics",
    category: "Public Administration & Governance",
    title: "The Minister Wants His Own Person in the Job",
    premium: true,
    scenario:
      "The post of deputy director of the national statistics office — a position legally defined as non-partisan and filled on merit through an independent public-service commission — has come open. The incoming minister responsible for the office wants to install a close political ally with no statistical or civil-service background, bypassing the standard competitive selection process, arguing the office has been 'too independent' and needs someone who will align its economic releases with the government's messaging. The independent selection panel has already shortlisted three career civil servants. You advise the head of the civil service on how to respond to the minister's request.",
    keyIssues: [
      "Whether the minister's request is a lawful exercise of appointment authority or an improper override of a merit-based process",
      "What the statistics office's independence is actually meant to protect, and what is lost if political alignment of its releases becomes an explicit goal",
      "How to push back on a minister without appearing insubordinate or triggering an unnecessary political confrontation",
      "What precedent is set for future appointments if this bypass is allowed to stand",
    ],
    expectedConcepts: [
      "civil service political neutrality",
      "merit-based appointment",
      "administrative independence of statistical agencies",
      "pushback without insubordination",
      "appointment precedent",
    ],
    modelApproach:
      "A strong answer is direct that bypassing the independent selection panel for this specific post would breach the legal basis for the office's neutrality, not merely set an awkward precedent, and proposes a lawful way to address the minister's underlying concern — briefings, liaison staff — that does not require compromising the office's independence or the merit process. It is realistic that outright refusal carries political risk, but treats quiet acquiescence as the greater long-term cost.",
    furtherReading: [
      "Civil service neutrality and merit-protection frameworks",
      "Independence of national statistical agencies",
      "Case studies of politicized appointments to nominally non-partisan posts",
    ],
    testsFundamentals: ["pol-pubadmin-political-neutrality", "pol-pubadmin-politicized-appointment"],
  },
  {
    id: "pol-pubadmin-it-system-failure",
    profession: "politics",
    category: "Public Administration & Governance",
    title: "The New Benefits System Is Three Years Late",
    premium: true,
    scenario:
      "A flagship project to replace the national benefits-payment IT system, originally budgeted at 220 million and due to launch two years ago, is now projected at 480 million with a new go-live date 14 months away — one that depends on switching all claimants over in a single weekend cutover from the 35-year-old legacy system. The lead vendor says the delays stem from requirements that kept expanding as different ministries added their own demands; your own staff warn that an all-at-once cutover risks a repeat of past government IT failures that left vulnerable claimants without payments for weeks. You are advising the program's senior sponsor on whether to proceed with the current plan.",
    keyIssues: [
      "Whether a phased, incremental migration is achievable at this stage versus the current all-or-nothing cutover plan",
      "How requirements crept so far beyond the original scope, and what governance failure allowed it",
      "What contingency exists if the cutover fails and claimants stop receiving payments",
      "Whether continuing to fund the current plan is still justified or whether a hard reset is cheaper in the long run",
    ],
    expectedConcepts: [
      "large-scale public IT project risk",
      "scope creep and requirements governance",
      "phased migration versus big-bang cutover",
      "payment-continuity contingency planning",
    ],
    modelApproach:
      "A strong answer treats the proposed all-at-once cutover as the single biggest risk in the plan and pushes hard for a phased migration or parallel-running period instead, even at some additional cost or delay, given the track record of comparable failures. It also names the requirements-governance failure that let scope expand so far past the original budget as something to fix immediately, regardless of what is decided about the cutover itself, since the same failure will recur on the next phase otherwise.",
    furtherReading: [
      "Case studies of large-scale government IT project failures",
      "Phased versus big-bang system migration strategy",
      "Requirements governance and scope control in public-sector IT programs",
    ],
    testsFundamentals: ["pol-pubadmin-it-modernization-risk", "pol-pubadmin-principal-agent"],
  },
  {
    id: "pol-pubadmin-regulatory-capture-revolving-door",
    profession: "politics",
    category: "Public Administration & Governance",
    title: "The Regulator's Chief Inspector Is Joining the Industry",
    premium: true,
    scenario:
      "The chief inspector of the agency that licenses and inspects commercial fishing operations has just announced she is leaving in six weeks to become a senior executive at the largest fishing company she has regulated for the past four years. In that time, the agency has approved every license renewal the company sought and reduced its inspection frequency, citing a 'strong compliance history.' An investigative journalist is asking whether the company's clean record reflects real compliance or a regulator that went easy on a future employer. You advise the agency's director on how to respond and what to review.",
    keyIssues: [
      "Whether the reduced inspection frequency and clean compliance record can be independently verified as justified or whether they show signs of capture",
      "What cooling-off or recusal rules should have applied to the chief inspector's recent decisions regarding this company, and whether they were followed",
      "How to respond publicly without either admitting unproven wrongdoing or dismissing a legitimate question",
      "What structural change — rotation, cooling-off periods, independent review of high-risk licensees — would reduce this risk going forward",
    ],
    expectedConcepts: [
      "regulatory capture",
      "revolving-door conflicts of interest",
      "cooling-off periods",
      "independent review of regulatory decisions",
      "inspection-frequency justification",
    ],
    modelApproach:
      "A strong answer commissions an independent review of the specific decisions the chief inspector made regarding this company in her final years, rather than asserting there is nothing to see, and treats the absence of an enforced cooling-off or recusal rule as a real structural gap to fix regardless of what the review finds about her particular conduct. It responds publicly by committing to the review and to specific reforms rather than offering a blanket defense of the agency's past decisions.",
    furtherReading: [
      "Regulatory capture theory and the revolving door",
      "Cooling-off periods and post-employment restrictions for regulators",
      "Independent review mechanisms for high-risk regulatory decisions",
    ],
    testsFundamentals: ["pol-pubadmin-regulatory-capture", "pol-pubadmin-political-neutrality"],
  },
  {
    id: "pol-pubadmin-interagency-turf-war",
    profession: "politics",
    category: "Public Administration & Governance",
    title: "Everyone Says It's Someone Else's Job",
    premium: true,
    scenario:
      "Dozens of residents in a border region between two administrative zones have fallen ill from contaminated well water. The environmental agency says groundwater contamination from an old industrial site is a public-health matter for the health agency; the health agency says identifying and remediating the contamination source is squarely an environmental matter. Neither has formally accepted lead responsibility, and three months have passed since the first cases were reported. Affected residents are now organizing legal action against the government generally, naming no specific agency because none will claim ownership. You are advising the cabinet office on how to break the deadlock.",
    keyIssues: [
      "Whether a formal lead-agency designation, imposed from above, is needed given the two agencies' mutual deflection",
      "How much of the delay reflects genuine ambiguity in the agencies' mandates versus each avoiding a costly, reputationally risky problem",
      "What joint, time-bound action plan could start immediately even while the lead-agency question is settled",
      "How to communicate with affected residents in the meantime without either agency speaking for the government as a whole",
    ],
    expectedConcepts: [
      "interagency mandate overlap",
      "lead-agency designation",
      "turf-driven deflection",
      "joint task force coordination",
      "public communication during interagency disputes",
    ],
    modelApproach:
      "A strong answer does not wait for the two agencies to resolve the mandate question themselves, since three months of mutual deflection shows they will not, and instead has the cabinet office designate a lead agency or stand up a joint task force with clear, time-bound deliverables immediately. It is candid that turf avoidance, not genuine ambiguity, is likely driving much of the delay, and treats resident communication as too urgent to wait for the interagency question to be fully settled.",
    furtherReading: [
      "Interagency coordination and lead-agency designation mechanisms",
      "Mandate overlap and turf-protection dynamics in public administration",
      "Joint task force design for cross-agency public-health and environmental problems",
    ],
    testsFundamentals: ["pol-pubadmin-interagency-turf", "pol-pubadmin-service-backlog-diagnosis"],
  },
  {
    id: "pol-pubadmin-contracted-service-failure",
    profession: "politics",
    category: "Public Administration & Governance",
    title: "The Private Operator Running Your Prisons Is Failing Inspections",
    premium: true,
    scenario:
      "A private company contracted eight years ago to operate three regional prisons has failed its last four independent inspections, with findings including unsafe staffing ratios and delayed medical care. The contract has eleven years left on its term, substantial penalty clauses for early termination, and your ministry no longer has the in-house staff or expertise to resume direct operation if the contract were cancelled. The company blames chronic underfunding in the original contract price; the inspectorate says the failures reflect management, not money. You advise the minister on what to do before the next inspection cycle.",
    keyIssues: [
      "Whether the ministry retains enough leverage and in-house capability to credibly threaten termination, or whether that threat is hollow",
      "How to distinguish a genuine underfunding problem from a management failure the company is using funding as cover for",
      "What enforceable, time-bound improvement plan with real penalties short of termination could be imposed now",
      "What it would take to rebuild enough in-house capability to make the termination threat credible for future contracts",
    ],
    expectedConcepts: [
      "contracted public-service oversight",
      "contractual leverage and penalty clauses",
      "in-house capability loss",
      "performance-improvement plans",
      "outsourcing and accountability",
    ],
    modelApproach:
      "A strong answer does not accept the company's underfunding explanation uncritically, and instead has the inspectorate's findings independently tested against comparable facilities before accepting either account, while building a concrete, penalty-backed improvement plan with a real deadline rather than a fifth round of informal warnings. It treats the loss of in-house operating capability as a structural vulnerability worth fixing regardless of this contract's outcome, since it is what makes the termination threat hollow in the first place.",
    furtherReading: [
      "Public-service outsourcing and accountability for contracted performance",
      "Contract design and penalty-clause enforcement in government service contracts",
      "Rebuilding in-house capability after long-term outsourcing",
    ],
    testsFundamentals: ["pol-pubadmin-contractor-oversight", "pol-pubadmin-red-tape-vs-control"],
  },
  {
    id: "pol-pubadmin-permitting-delays-business",
    profession: "politics",
    category: "Public Administration & Governance",
    title: "A Permit That Took Fourteen Months",
    premium: true,
    scenario:
      "Small manufacturers in your jurisdiction report that a routine environmental-compliance permit, which the regulation specifies should take 60 days to process, is now averaging 14 months, with some applicants waiting over two years. Business groups say the delay is costing investment and jobs and are demanding automatic approval if the agency misses its own deadline. Agency staff say the delays stem from a near-tripling of applications without a matching increase in reviewer headcount, and warn that automatic approval would let unsafe projects through by default. You are advising the agency head on how to respond to legislative pressure for reform.",
    keyIssues: [
      "Whether the root cause is a fixable capacity or staffing gap or a process that is genuinely too slow regardless of headcount",
      "Why an automatic-approval-on-deadline proposal is attractive politically but risky substantively, and what alternative achieves the same accountability",
      "What realistic timeline exists for closing the backlog given hiring and training lead times for technical reviewers",
      "How to triage the existing backlog so straightforward applications move faster while complex ones still get full scrutiny",
    ],
    expectedConcepts: [
      "permitting and licensing delay diagnosis",
      "automatic-approval-on-deadline risk",
      "risk-based application triage",
      "reviewer capacity and training lead time",
      "red tape versus genuine control",
    ],
    modelApproach:
      "A strong answer resists the automatic-approval proposal as a fix that solves the headline political problem by creating a new safety risk, and instead proposes risk-based triage — fast-tracking straightforward applications while preserving full review for complex or high-risk ones — paired with a funded, realistic hiring plan. It is honest with the legislature about how long closing the backlog will actually take given training lead times, rather than promising an unrealistic turnaround.",
    furtherReading: [
      "Permitting and licensing reform in public administration",
      "Risk-based regulatory triage",
      "Reviewer capacity planning and training lead times in technical regulatory agencies",
    ],
    testsFundamentals: ["pol-pubadmin-permitting-delay", "pol-pubadmin-red-tape-vs-control"],
  },
  {
    id: "pol-pubadmin-year-end-spending-rush",
    profession: "politics",
    category: "Public Administration & Governance",
    title: "Spend It or Lose It by Friday",
    premium: true,
    scenario:
      "With six weeks left in the fiscal year, your department's budget office flags that eleven line units are projected to underspend their allocations by a combined 34 million. Under the current budget rule, unspent funds are returned to the treasury and cannot be carried forward, while each unit's allocation for next year is partly based on this year's spend. Unit heads are scrambling to commit the money on anything roughly eligible before the deadline, including an unplanned bulk purchase of equipment with no clear operational need. The finance director asks you to review and approve, or block, these last-minute commitments before the fiscal year closes.",
    keyIssues: [
      "Whether the underlying use-it-or-lose-it rule and spend-based allocation formula are themselves driving wasteful behavior",
      "How to distinguish defensible late-year spending from wasteful rush purchases made purely to protect next year's budget",
      "What to do about the specific unplanned equipment purchase with no clear operational justification",
      "What structural fix — carryover authority, non-spend-based allocation criteria — would prevent this same scramble next year",
    ],
    expectedConcepts: [
      "budget execution discipline",
      "use-it-or-lose-it incentive distortion",
      "carryover authority",
      "spend-based allocation formula critique",
      "wasteful year-end procurement",
    ],
    modelApproach:
      "A strong answer blocks or demands justification for the specific purchases that show no real operational need, rather than approving them simply because the deadline is close, and names the use-it-or-lose-it rule and the spend-based allocation formula as the actual root cause worth fixing structurally, not just this year's symptom. It proposes a concrete alternative — limited carryover authority or allocation criteria less tied to pure spend — as the real fix.",
    furtherReading: [
      "Budget execution and the use-it-or-lose-it problem in public finance",
      "Carryover authority and multi-year budgeting reform",
      "Spend-based versus needs-based budget allocation formulas",
    ],
    testsFundamentals: ["pol-pubadmin-budget-execution", "pol-pubadmin-performance-metrics-gaming"],
  },
  {
    id: "pol-pubadmin-merit-hiring-patronage-pressure",
    profession: "politics",
    category: "Public Administration & Governance",
    title: "The District Office Wants Its Own Hires",
    premium: true,
    scenario:
      "You direct the regional office of a national agency responsible for issuing business licenses. A newly elected regional official has told your hiring panel, informally but unmistakably, that several of the twelve open case-officer posts should go to specific individuals he names, all active supporters with no relevant qualifications, warning that your office's budget request next year 'will be remembered' if you don't cooperate. Your formal hiring process is merit-based and independently scored, and two of his nominees did not pass the minimum qualifying exam. You must decide how to proceed with the hiring round and how to handle the budget threat.",
    keyIssues: [
      "Whether and how to document the informal pressure in case it needs to be escalated or reported later",
      "How to respond to the explicit linkage between hiring cooperation and next year's budget without either provoking unnecessary confrontation or capitulating",
      "What happens to the two nominees who failed the qualifying exam if political pressure continues after the results are known",
      "Who above you — an independent civil-service commission, an inspector general, or similar body — should be informed now rather than after an improper hire is made",
    ],
    expectedConcepts: [
      "merit-based hiring protection",
      "patronage pressure",
      "documentation of improper interference",
      "independent civil-service oversight bodies",
      "budget retaliation threats",
    ],
    modelApproach:
      "A strong answer documents the pressure in real time and escalates it to an independent civil-service or inspector-general channel immediately rather than waiting to see if the threat materializes, and holds firm that the two candidates who failed the qualifying exam cannot be hired regardless of the pressure. It treats the budget threat as a separate matter to be raised through proper channels, not a reason to compromise the hiring process itself.",
    furtherReading: [
      "Merit-based civil service protection against patronage",
      "Documentation and escalation of improper political interference",
      "Independent civil-service commissions and their oversight role",
    ],
    testsFundamentals: ["pol-pubadmin-merit-hiring-patronage", "pol-pubadmin-politicized-appointment", "pol-pubadmin-principal-agent"],
  },
  {
    id: "pol-pubadmin-ombudsman-systemic-complaints",
    profession: "politics",
    category: "Public Administration & Governance",
    title: "The Ombudsman Has Seen This Complaint Six Hundred Times",
    premium: true,
    scenario:
      "The independent ombudsman's office has referred a pattern finding to your ministry: over the past two years, it has received more than 600 individual complaints about the same issue — a disability-assessment scorecard that systematically undercounts certain conditions — and has already upheld 80 percent of complaints that reached a final ruling. Rather than fixing the underlying scorecard, your agency has been settling each case individually as it escalates, which the ombudsman's report says is costing more in administrative overhead than fixing the root cause would, while leaving the same flawed process to generate the next complaint. You are advising the agency head on how to respond to the ombudsman's systemic finding.",
    keyIssues: [
      "Why settling complaints case by case has persisted instead of fixing the root cause, and whether that reflects genuine uncertainty about the fix or simple institutional inertia",
      "What it would actually take to redesign the scorecard, and how to manage claimants currently going through the flawed process during the transition",
      "How to respond to the ombudsman's finding in a way that commits to the structural fix rather than just processing the current backlog of complaints",
      "What resistance to expect from staff who have operated under the current scorecard for years, and how to manage it",
    ],
    expectedConcepts: [
      "ombudsman systemic findings",
      "root-cause versus case-by-case remediation",
      "organizational change management",
      "bureaucratic inertia",
      "process redesign under active caseload",
    ],
    modelApproach:
      "A strong answer treats the ombudsman's systemic finding as exactly the signal it was designed to surface, and commits publicly to redesigning the scorecard itself rather than continuing the costlier pattern of settling individual escalations one at a time. It plans concretely for staff resistance to the redesign, since years of practice under the old scorecard will not change simply because a directive says so, and builds in a transition plan for claimants caught in the process while the fix is implemented.",
    furtherReading: [
      "The role of ombudsman institutions in surfacing systemic administrative failure",
      "Root-cause remediation versus case-by-case settlement in public administration",
      "Managing bureaucratic resistance to process redesign",
    ],
    testsFundamentals: ["pol-pubadmin-ombudsman-redress", "pol-pubadmin-change-management-inertia"],
  },
];
