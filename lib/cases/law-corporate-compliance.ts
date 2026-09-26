import type { CaseStudy } from "@/lib/caseStudyContent";
import type { Fundamental } from "@/lib/caseStudyFundamentals";

/**
 * Law / Corporate & Compliance: the fundamentals checklist and the case bank
 * for this category, kept together so they can be written and reviewed as
 * one unit. Registered in lib/cases/index.ts.
 *
 * Scenarios are written to be jurisdiction-neutral: the same case text is
 * shown to users in the US, Germany, France, Spain, and Sweden (machine
 * translated at runtime), and an AI grader evaluates the answer against
 * whichever country's legal system the user is in. No case names a specific
 * statute, court, or regulator that only exists in one of those systems.
 */
export const LAW_CORPORATE_COMPLIANCE_FUNDAMENTALS: Fundamental[] = [
  { id: "law-corp-fiduciary-duty-care-loyalty", label: "Applying the duty of care and duty of loyalty (and a business-judgment presumption) to evaluate a director's or officer's decision" },
  { id: "law-corp-limited-liability-veil", label: "Determining when a company's limited-liability shield holds and when an owner or officer can be held personally liable" },
  { id: "law-corp-board-structure-authority", label: "Working within a one-tier or two-tier board structure to identify who actually holds decision-making authority" },
  { id: "law-corp-shareholder-meeting-authority", label: "Distinguishing decisions that require shareholder approval at a general meeting from matters within the board's own authority" },
  { id: "law-corp-related-party-transactions", label: "Applying a related-party/conflict-of-interest transaction review and approval process" },
  { id: "law-corp-entity-liability", label: "Assessing a company's own liability for misconduct as an entity, separate from the liability of the individuals involved" },
  { id: "law-corp-compliance-program-design", label: "Designing a risk-based compliance program that would be judged genuinely effective rather than a paper program" },
  { id: "law-corp-internal-investigation-privilege", label: "Running an internal investigation in a way that preserves legal privilege over its findings" },
  { id: "law-corp-foreign-bribery", label: "Assessing exposure and response under anti-bribery law when a payment was made to a foreign official to obtain business" },
  { id: "law-corp-books-records-controls", label: "Evaluating the integrity of a company's books, records, and internal financial controls" },
  { id: "law-corp-whistleblower-protection", label: "Applying whistleblower protection and anti-retaliation rules to an internal report of wrongdoing" },
  { id: "law-corp-worker-consultation-rights", label: "Accounting for statutory employee or works-council consultation rights before a corporate decision affecting the workforce" },
  { id: "law-corp-minority-shareholder-enforcement", label: "Advising on a minority shareholder's enforcement options when the board will not pursue a claim on the company's behalf" },
  { id: "law-corp-insider-trading-mnpi", label: "Applying insider trading / market abuse rules to trading on material nonpublic information" },
  { id: "law-corp-successor-liability-ma", label: "Assessing successor liability for a target company's legacy misconduct in a merger or acquisition" },
  { id: "law-corp-group-liability-structuring", label: "Navigating corporate group structuring and when a parent company answers for a subsidiary's conduct" },
  { id: "law-corp-supply-chain-due-diligence", label: "Applying human-rights and environmental supply-chain due-diligence obligations to a sourcing or investment decision" },
  { id: "law-corp-financial-distress-duties", label: "Recognizing when financial distress shifts a director's duties toward creditors and triggers a duty to act rather than trade on" },
  { id: "law-corp-governance-code-compliance", label: "Applying a comply-or-explain corporate governance code alongside binding statutory duties" },
  { id: "law-corp-voluntary-disclosure-regulator", label: "Weighing voluntary self-disclosure to a regulator against the risks and benefits of staying silent" },
];

export const LAW_CORPORATE_COMPLIANCE_CASES: CaseStudy[] = [
  {
    id: "law-corp-insider-trading",
    profession: "law",
    category: "Corporate & Compliance",
    title: "Suspected Insider Trading",
    scenario:
      "Your company's compliance team flagged unusual trading activity by a mid-level finance employee shortly before a major earnings announcement, resulting in significant personal gains. The employee claims the trades were based on public information and coincidence. As in-house counsel, you must advise the board on how to proceed with an internal investigation and whether to voluntarily disclose the matter to the securities regulator.",
    keyIssues: [
      "Threshold of suspicion needed to justify a formal internal investigation",
      "Preserving evidence and communications before they can be altered or destroyed",
      "Weighing voluntary self-disclosure to the regulator against potential leniency versus the certainty of triggering scrutiny",
      "Protecting the company's own liability exposure regardless of the individual employee's culpability",
    ],
    expectedConcepts: [
      "insider trading / market abuse",
      "material nonpublic information",
      "voluntary self-disclosure",
      "internal investigation",
      "cooperation credit",
    ],
    modelApproach:
      "A strong answer moves quickly to preserve evidence and launch a genuinely independent investigation before assessing disclosure, and weighs the regulator's typical cooperation-credit incentives (self-reporting often reduces penalties) against the certainty of drawing scrutiny — advising based on the incentive structure, not just intuition.",
    furtherReading: [
      "Insider trading / market abuse enforcement frameworks",
      "Regulatory self-reporting and cooperation credit programs",
      "Corporate internal investigation best practices",
    ],
    testsFundamentals: ["law-corp-insider-trading-mnpi", "law-corp-internal-investigation-privilege", "law-corp-voluntary-disclosure-regulator"],
  },
  {
    id: "law-corp-foreign-bribery",
    profession: "law",
    category: "Corporate & Compliance",
    title: "Bribery Discovered Abroad",
    scenario:
      "During a routine audit, your multinational company discovered that a regional sales manager in a foreign subsidiary made payments to a local government official to expedite a contract approval, potentially violating your jurisdiction's anti-bribery law. The payments were relatively small but pattern-suggestive of a broader practice. Leadership wants your legal guidance on next steps.",
    keyIssues: [
      "Scope of the investigation needed to determine if this is isolated or systemic",
      "The parent company's liability exposure regardless of where the conduct occurred",
      "Whether voluntary disclosure to the regulator would reduce or increase overall exposure",
      "Remediation steps needed regardless of the disclosure decision",
    ],
    expectedConcepts: [
      "foreign bribery / anti-corruption law",
      "books and records accuracy",
      "voluntary self-disclosure",
      "remediation",
      "third-party due diligence",
    ],
    modelApproach:
      "A strong answer immediately flags the parent company's exposure under anti-bribery law regardless of the payment's small size, recommends a scoped independent investigation to assess whether this is isolated, and treats the regulator's voluntary-disclosure incentives as a genuine factor in the recommendation, not an afterthought.",
    furtherReading: [
      "Comparative anti-bribery law: OECD Anti-Bribery Convention and national implementing statutes",
      "Corporate voluntary disclosure and cooperation frameworks",
      "Anti-bribery compliance program design",
    ],
    testsFundamentals: ["law-corp-foreign-bribery", "law-corp-books-records-controls", "law-corp-voluntary-disclosure-regulator"],
  },
  {
    id: "law-corp-cross-border-restructuring",
    profession: "law",
    category: "Corporate & Compliance",
    title: "A Cross-Border Restructuring",
    scenario:
      "Your client's multinational group wants to consolidate three separate national subsidiaries under a single holding structure to simplify tax reporting and governance. Each subsidiary operates under a different national company-law regime, has different minority shareholders, and is subject to different works-council consultation requirements. Leadership wants the restructuring completed within one fiscal quarter. You need to advise on how to sequence this without triggering a regulatory or labor-relations crisis in any jurisdiction.",
    keyIssues: [
      "Whether a compressed one-quarter timeline is realistic given works-council consultation obligations in some jurisdictions",
      "Minority shareholder protections that could block or delay parts of the restructuring",
      "Sequencing to avoid triggering change-of-control clauses in existing contracts",
      "Coordinating outside counsel across jurisdictions without inconsistent positions",
    ],
    expectedConcepts: [
      "cross-border restructuring",
      "works council / employee consultation",
      "minority shareholder rights",
      "change of control clause",
      "corporate group structuring",
    ],
    modelApproach:
      "A strong answer is honest that some jurisdictions' consultation requirements make a single-quarter timeline unrealistic without real legal risk, and proposes a phased sequence — starting with the jurisdiction with the fewest procedural obstacles — while flagging early which change-of-control clauses need pre-clearance before any public step is taken.",
    furtherReading: [
      "Cross-border corporate restructuring frameworks",
      "Comparative works council / employee consultation requirements",
      "Change-of-control clause risk review in restructuring",
    ],
    testsFundamentals: ["law-corp-worker-consultation-rights", "law-corp-minority-shareholder-enforcement", "law-corp-group-liability-structuring"],
  },
  {
    id: "law-corp-derivative-claim-refused",
    profession: "law",
    category: "Corporate & Compliance",
    title: "The Board Won't Sue Itself",
    premium: true,
    scenario:
      "A group of minority shareholders in a mid-sized manufacturing company has approached you after discovering that the board approved a supply contract with a company secretly owned by the CEO's brother, at prices well above market. The shareholders formally demanded the board investigate and pursue a claim against the CEO, but the board — a majority of whom were involved in approving the contract — rejected the demand as without merit. The shareholders want to know if and how they can pursue this themselves.",
    keyIssues: [
      "Whether the board's rejection of the demand is entitled to deference or can be challenged as conflicted",
      "What the shareholders must show to bring an action on the company's own behalf",
      "Whether the underlying contract approval itself breached a duty owed to the company",
      "Practical and cost barriers minority shareholders face in pursuing this route",
    ],
    expectedConcepts: [
      "derivative action",
      "duty of loyalty",
      "related-party transaction",
      "business judgment rule",
      "demand futility",
    ],
    modelApproach:
      "A strong answer recognizes that a board majority approving a self-dealing contract cannot credibly evaluate a demand to sue over that same contract, argues the rejection should not receive the usual deference, and lays out concretely what the shareholders must plead and prove to proceed on the company's behalf.",
    furtherReading: [
      "Derivative actions and demand futility doctrine",
      "Duty of loyalty in related-party transactions",
      "Minority shareholder remedies in closely held companies",
    ],
    testsFundamentals: ["law-corp-minority-shareholder-enforcement", "law-corp-related-party-transactions", "law-corp-fiduciary-duty-care-loyalty"],
  },
  {
    id: "law-corp-compliance-program-audit",
    profession: "law",
    category: "Corporate & Compliance",
    title: "A Compliance Program That Only Exists on Paper",
    premium: true,
    scenario:
      "Your company's compliance manual looks comprehensive on paper, but after a whistleblower complaint you discover that the reporting hotline routes complaints to the very manager most likely to be accused, no one has been trained on the policy in three years, and past red flags in expense reports were closed without any real review. Regulators are now investigating a separate matter at the company and will likely assess whether your compliance program was adequate. You have one board meeting to propose a fix before the regulator's site visit.",
    keyIssues: [
      "What distinguishes a genuinely effective compliance program from a paper program",
      "Independence and escalation gaps in the current reporting channel",
      "Whether retroactive fixes can credibly improve the company's position with the regulator",
      "Resourcing and monitoring needed to prevent regression after the immediate crisis passes",
    ],
    expectedConcepts: [
      "effective compliance program",
      "reporting channel independence",
      "risk-based monitoring",
      "tone at the top",
      "remediation",
    ],
    modelApproach:
      "A strong answer names the specific structural defects (routing, staleness of training, unreviewed red flags) rather than speaking generally about 'improving compliance,' and proposes concrete, verifiable fixes — an independent reporting channel, mandatory training with records, and a real review cadence for red flags — while being candid that a regulator will judge substance, not the existence of a manual.",
    furtherReading: [
      "Elements of an effective corporate compliance program",
      "Whistleblower hotline independence and escalation design",
      "Regulatory evaluation criteria for compliance program adequacy",
    ],
    testsFundamentals: ["law-corp-compliance-program-design", "law-corp-whistleblower-protection"],
  },
  {
    id: "law-corp-privilege-waiver-investigation",
    profession: "law",
    category: "Corporate & Compliance",
    title: "The Investigation Report the CEO Wants to See",
    premium: true,
    scenario:
      "You led an internal investigation into a safety-data falsification allegation at a subsidiary and produced a detailed report identifying which managers knew what and when. The CEO, who is not personally implicated, wants the full report circulated to the executive committee so leadership can decide on discipline. Outside directors, separately, are asking pointed questions about the investigation's scope. You are concerned that wide circulation could waive privilege over the report if litigation follows.",
    keyIssues: [
      "Whether circulating the report beyond those who need it for legal advice risks waiving privilege",
      "How to give the board and executive committee enough information to act without transmitting the privileged report itself",
      "Whether the investigation was structured from the outset to support a privilege claim",
      "Balancing transparency demands from directors against the litigation risk of waiver",
    ],
    expectedConcepts: [
      "attorney-client privilege",
      "privilege waiver",
      "work product protection",
      "internal investigation structuring",
      "board oversight duty",
    ],
    modelApproach:
      "A strong answer separates the legal advice function (protected) from the business decision on discipline (which does not require transmitting the underlying report), proposes an oral or summarized briefing to preserve privilege, and flags that how the investigation was commissioned at the outset determines how defensible the privilege claim is now.",
    furtherReading: [
      "Attorney-client privilege in internal investigations",
      "Privilege waiver through selective disclosure",
      "Structuring investigations to preserve privilege",
    ],
    testsFundamentals: ["law-corp-internal-investigation-privilege", "law-corp-fiduciary-duty-care-loyalty"],
  },
  {
    id: "law-corp-successor-liability-acquisition",
    profession: "law",
    category: "Corporate & Compliance",
    title: "Buying a Company With a Hidden Problem",
    premium: true,
    scenario:
      "Your client is finalizing the acquisition of a competitor, and late in due diligence you discover the target has been underpaying environmental compliance fees for years and faces a plausible enforcement action once regulators notice. The deal is structured as a share purchase, not an asset purchase, and closing is scheduled in two weeks. Your client wants to know whether it can still walk away from this specific liability, and if not, how to protect itself.",
    keyIssues: [
      "How the choice between a share deal and an asset deal affects exposure to this liability",
      "Whether disclosure obligations require flagging this to the seller or regulator before closing",
      "Contractual protections available given the compressed timeline",
      "Whether walking away or renegotiating price is more defensible than closing as planned",
    ],
    expectedConcepts: [
      "successor liability",
      "share deal vs. asset deal",
      "representations and warranties",
      "indemnification",
      "due diligence disclosure",
    ],
    modelApproach:
      "A strong answer explains plainly that a share purchase generally carries the target's liabilities forward in a way an asset purchase would not, recommends specific contractual protections (price adjustment, escrow, indemnity carve-out) given the timeline, and does not pretend structuring alone can make a known liability disappear.",
    furtherReading: [
      "Successor liability in share vs. asset acquisitions",
      "Representations, warranties, and indemnification in M&A",
      "Environmental liability disclosure in due diligence",
    ],
    testsFundamentals: ["law-corp-successor-liability-ma", "law-corp-limited-liability-veil"],
  },
  {
    id: "law-corp-books-records-revenue-recognition",
    profession: "law",
    category: "Corporate & Compliance",
    title: "The Numbers Don't Quite Add Up",
    premium: true,
    scenario:
      "Your company's new CFO flags that the outgoing finance team recognized revenue from several contracts before the underlying services were delivered, inflating the last two quarters' reported results. No one has publicly disclosed this yet, and the company is midway through raising new financing based partly on those results. Leadership asks you whether this needs to be corrected publicly or can be quietly fixed going forward.",
    keyIssues: [
      "Whether continuing to rely on the inflated figures during an active financing round creates new exposure",
      "Obligation to correct the record versus quietly changing practice going forward",
      "Personal liability exposure for officers who knew and stayed silent",
      "How the internal control failure that allowed this needs to be remediated regardless of the disclosure decision",
    ],
    expectedConcepts: [
      "books and records accuracy",
      "internal financial controls",
      "duty to correct known misstatements",
      "officer liability",
      "investor disclosure",
    ],
    modelApproach:
      "A strong answer is direct that continuing to raise money on figures known to be wrong compounds the exposure and cannot simply be fixed quietly going forward, and separates the immediate correction/disclosure question from the longer-term internal-controls remediation the company needs regardless.",
    furtherReading: [
      "Internal financial controls and books-and-records obligations",
      "Duty to correct known misstatements to investors",
      "Officer liability for financial reporting failures",
    ],
    testsFundamentals: ["law-corp-books-records-controls", "law-corp-voluntary-disclosure-regulator"],
  },
  {
    id: "law-corp-whistleblower-retaliation",
    profession: "law",
    category: "Corporate & Compliance",
    title: "The Whistleblower Was Fired a Month Later",
    premium: true,
    scenario:
      "An engineer at your company reported to compliance that a product safety test had been falsified. Compliance investigated and confirmed the concern was credible, and corrective action was taken. Five weeks later, the engineer's manager — who was not implicated — terminated the engineer for what the manager describes as unrelated performance issues that had been documented before the report. The engineer's lawyer has now sent a letter alleging retaliation. Leadership asks you to assess the company's exposure.",
    keyIssues: [
      "Whether the timing alone creates a credible retaliation inference regardless of the stated reason",
      "What documentation would actually support the performance-based justification",
      "Steps needed now to avoid compounding the exposure through how the response is handled",
      "Distinguishing this from the substantive safety issue, which still needs remediation",
    ],
    expectedConcepts: [
      "whistleblower protection",
      "retaliation / adverse action",
      "burden of proof and pretext",
      "documentation of legitimate business reasons",
      "corrective action",
    ],
    modelApproach:
      "A strong answer does not dismiss the retaliation claim on timing alone but does not concede it either — it identifies what contemporaneous documentation would need to exist to support the stated reason, and treats the investigation into retaliation as separate from, and not a substitute for, the earlier safety remediation.",
    furtherReading: [
      "Whistleblower protection and anti-retaliation standards",
      "Burden-shifting frameworks for retaliation claims",
      "Documenting legitimate, non-retaliatory business reasons",
    ],
    testsFundamentals: ["law-corp-whistleblower-protection", "law-corp-entity-liability"],
  },
  {
    id: "law-corp-related-party-founder-lease",
    profession: "law",
    category: "Corporate & Compliance",
    title: "The Founder's Own Building",
    premium: true,
    scenario:
      "Your client, a company preparing to bring in outside investors, leases its main warehouse from a company owned personally by the founder-CEO, at a rate that has never been benchmarked against the market. The lease was never reviewed by the rest of the board. Prospective investors have flagged it as a governance concern during due diligence. The CEO insists the rate is fair and does not want to renegotiate his own lease.",
    keyIssues: [
      "Whether the lease as it stands is defensible without independent review",
      "What process should have been followed when the lease was first signed",
      "How to remediate the governance gap without accusing the CEO of wrongdoing outright",
      "What investors will realistically require before closing",
    ],
    expectedConcepts: [
      "related-party transaction",
      "duty of loyalty",
      "independent/disinterested approval",
      "market benchmarking (fairness)",
      "corporate governance remediation",
    ],
    modelApproach:
      "A strong answer does not assume bad faith but is clear that the lack of independent review, not the rate itself, is the defect, and proposes a concrete fix (market benchmarking plus disinterested board approval, retroactively if needed) as the realistic path to satisfying investors.",
    furtherReading: [
      "Related-party transaction approval procedures",
      "Duty of loyalty and fair-dealing standards",
      "Governance remediation ahead of an investment round",
    ],
    testsFundamentals: ["law-corp-related-party-transactions", "law-corp-governance-code-compliance"],
  },
  {
    id: "law-corp-supply-chain-forced-labor",
    profession: "law",
    category: "Corporate & Compliance",
    title: "A Supplier's Labor Practices Surface",
    premium: true,
    scenario:
      "An NGO report alleges that a key raw-material supplier two tiers down your client's supply chain uses forced labor at one facility. Your client has no direct contract with that facility and says it had no knowledge of the practice. The client's largest customers are now asking what due diligence was performed before the report surfaced, and whether the client will continue sourcing from that supply chain. You have to advise on both the legal exposure and the practical response.",
    keyIssues: [
      "Whether lack of a direct contractual relationship insulates the client from responsibility",
      "What due diligence should have existed before the report, not just after",
      "Immediate steps to investigate and, if confirmed, remediate versus simply exiting the relationship",
      "How to respond to customers without making representations the company cannot yet verify",
    ],
    expectedConcepts: [
      "supply chain human rights due diligence",
      "downstream/upstream liability exposure",
      "remediation vs. disengagement",
      "reasonable due diligence standard",
      "stakeholder communication",
    ],
    modelApproach:
      "A strong answer rejects the idea that no direct contract means no responsibility, explains that modern due-diligence obligations extend into the supply chain, and distinguishes immediate crisis response (verify, then remediate or responsibly exit) from the longer-term fix of building ongoing supply-chain monitoring.",
    furtherReading: [
      "Comparative supply-chain human rights due diligence obligations",
      "Remediation vs. disengagement in supplier misconduct",
      "Reasonable due diligence standards for indirect suppliers",
    ],
    testsFundamentals: ["law-corp-supply-chain-due-diligence", "law-corp-entity-liability"],
  },
  {
    id: "law-corp-director-duties-insolvency",
    profession: "law",
    category: "Corporate & Compliance",
    title: "Trading While the Cash Is Running Out",
    premium: true,
    scenario:
      "You sit on the board of a company whose cash reserves will run out in roughly ten weeks unless a funding round closes or costs are cut sharply. Management wants to keep signing new customer contracts and taking deposits to project stability to investors, but you are increasingly doubtful the funding round will close in time. Some fellow directors want to keep operating as normal until the money is confirmed gone. You need to advise the board on its obligations right now.",
    keyIssues: [
      "Whether continuing to take on new customer obligations is defensible given the doubt about solvency",
      "Whether and how the directors' duties shift once insolvency becomes a real risk rather than a remote one",
      "What documentation the board needs now to defend its decisions later",
      "Balancing genuine optimism about the funding round against the risk of trading recklessly",
    ],
    expectedConcepts: [
      "director duties in the zone of insolvency",
      "wrongful/reckless trading exposure",
      "duty to creditors",
      "board documentation and minutes",
      "going concern assessment",
    ],
    modelApproach:
      "A strong answer explains that once insolvency is a real, not speculative, risk, directors' duties meaningfully shift toward protecting creditors, and recommends concrete steps now — a realistic going-concern assessment, pausing commitments that increase creditor exposure, and documented board deliberation — rather than waiting for certainty.",
    furtherReading: [
      "Director duties in the zone of insolvency",
      "Wrongful/reckless trading standards",
      "Board documentation practices during financial distress",
    ],
    testsFundamentals: ["law-corp-financial-distress-duties", "law-corp-fiduciary-duty-care-loyalty"],
  },
  {
    id: "law-corp-governance-code-explain",
    profession: "law",
    category: "Corporate & Compliance",
    title: "Explaining Away the Governance Code",
    premium: true,
    scenario:
      "Your publicly listed client's board has no genuinely independent audit committee member and no formal succession plan for the CEO, both of which the national corporate governance code recommends as best practice on a comply-or-explain basis. An activist shareholder has published a letter demanding the company either comply immediately or justify its position at the next annual meeting. The chair asks you to help prepare the company's response.",
    keyIssues: [
      "Legal difference between binding statutory duties and comply-or-explain code recommendations",
      "Whether the company's current explanation would credibly satisfy investors and proxy advisors",
      "Practical timeline and process for closing the two gaps if the board chooses to comply instead",
      "Reputational and voting risk of a weak explanation versus the cost of rapid compliance",
    ],
    expectedConcepts: [
      "comply-or-explain governance code",
      "board independence",
      "succession planning",
      "shareholder activism",
      "proxy advisor influence",
    ],
    modelApproach:
      "A strong answer is clear that the code is not itself binding law but that a weak explanation carries real voting and reputational consequences, and gives the chair a genuine choice — a credible written explanation versus a concrete remediation timeline — rather than treating disclosure as a formality.",
    furtherReading: [
      "Comply-or-explain corporate governance codes",
      "Board independence standards for listed companies",
      "Shareholder activism and proxy advisor influence on governance",
    ],
    testsFundamentals: ["law-corp-governance-code-compliance", "law-corp-board-structure-authority"],
  },
  {
    id: "law-corp-shareholder-approval-major-transaction",
    profession: "law",
    category: "Corporate & Compliance",
    title: "Does the Board Need to Ask First",
    premium: true,
    scenario:
      "Your client's board has negotiated the sale of the company's single largest business line, representing roughly half of total revenue, to a competitor. The CEO wants to sign the agreement this week to avoid losing the buyer's interest and plans to inform shareholders only after signing, at the company's next scheduled meeting. Two board members are uneasy about proceeding without shareholder input given the size of the transaction. You are asked whether the board can lawfully sign without seeking shareholder approval first.",
    keyIssues: [
      "Whether a transaction of this size falls within ordinary board authority or requires prior shareholder approval",
      "Risk of proceeding without approval if it turns out to be legally required",
      "Practical options for preserving the buyer's interest while building in shareholder input",
      "How to advise directors who are personally uneasy but face pressure to move fast",
    ],
    expectedConcepts: [
      "fundamental/major transaction approval threshold",
      "shareholder approval requirements",
      "board authority limits",
      "transaction structuring around approval timing",
      "director personal exposure for unauthorized action",
    ],
    modelApproach:
      "A strong answer does not simply say 'ask the board's lawyers' — it identifies that a sale of roughly half the business is the kind of transaction that typically crosses from ordinary board authority into requiring shareholder approval, and proposes structuring (e.g., signing subject to shareholder approval) to preserve the deal without exposing the directors.",
    furtherReading: [
      "Shareholder approval thresholds for major/fundamental transactions",
      "Structuring deals subject to shareholder approval",
      "Director exposure for unauthorized major transactions",
    ],
    testsFundamentals: ["law-corp-shareholder-meeting-authority", "law-corp-board-structure-authority"],
  },
];
