import type { CaseStudy } from "@/lib/caseStudyContent";
import type { Fundamental } from "@/lib/caseStudyFundamentals";

/**
 * Law / Tax Law: the fundamentals checklist and the case bank
 * for this category, kept together so they can be written and reviewed as
 * one unit. Registered in lib/cases/index.ts.
 *
 * Every case is written to be jurisdiction-neutral: it must make sense when
 * machine-translated and graded against the US, German, French, Spanish, or
 * Swedish legal/tax system, so it avoids any single country's statutes,
 * tax authorities, or procedural vocabulary in favor of generic doctrine
 * (residency, source, permanent establishment, the arm's-length principle,
 * treaty relief, anti-avoidance, burden of proof, limitation periods) that
 * exists, in some form, across all five.
 */
export const LAW_TAX_LAW_FUNDAMENTALS: Fundamental[] = [
  { id: "law-tax-residency-source", label: "Determining tax residency and distinguishing residence-based from source-based taxing jurisdiction over a person's or entity's income" },
  { id: "law-tax-entity-classification", label: "Classifying a business vehicle as tax-transparent (pass-through) or a separate taxable entity, including cross-border hybrid-entity mismatches" },
  { id: "law-tax-income-characterization", label: "Characterizing a receipt as ordinary/business income, a capital gain, or an exempt item, where each has a different tax treatment" },
  { id: "law-tax-capital-vs-revenue", label: "Distinguishing a deductible/taxable revenue-account item from a capital-account item subject to different rules" },
  { id: "law-tax-deductibility-expenses", label: "Testing whether a business expense is deductible against income or is a disallowed personal, capital, or non-business expenditure" },
  { id: "law-tax-transfer-pricing", label: "Applying the arm's-length principle to price a transaction between related/controlled entities for tax purposes" },
  { id: "law-tax-permanent-establishment", label: "Determining whether a foreign enterprise's activities create a taxable permanent establishment in the host jurisdiction" },
  { id: "law-tax-withholding-obligations", label: "Applying withholding-tax obligations and treaty rate reductions to cross-border payments of dividends, interest, and royalties" },
  { id: "law-tax-double-taxation-relief", label: "Applying double-tax-treaty relief (credit, exemption, or tie-breaker rules) to resolve a cross-border double-taxation claim" },
  { id: "law-tax-thin-capitalization", label: "Applying thin-capitalization or interest-deduction-limitation rules to related-party debt financing" },
  { id: "law-tax-avoidance-vs-evasion", label: "Distinguishing lawful tax planning/avoidance from unlawful tax evasion based on disclosure and factual accuracy, not just tax-minimizing intent" },
  { id: "law-tax-general-anti-avoidance", label: "Applying a general anti-avoidance rule or substance-over-form doctrine to a transaction with no genuine business purpose beyond a tax advantage" },
  { id: "law-tax-corporate-reorganization", label: "Applying tax-neutral treatment, and its conditions, to a qualifying corporate merger, division, or reorganization" },
  { id: "law-tax-burden-of-proof-audit", label: "Allocating the burden of proof and documentation obligations between taxpayer and tax authority during an audit or assessment" },
  { id: "law-tax-statute-of-limitations", label: "Applying the limitation period for a tax assessment or reassessment, including extensions for fraud or unreported income" },
  { id: "law-tax-penalties-voluntary-disclosure", label: "Assessing penalty and interest exposure for a tax shortfall and the strategic value of a voluntary disclosure or amnesty regime" },
  { id: "law-tax-tax-dispute-forum", label: "Choosing between an internal administrative appeal and tax-court litigation to contest an assessment, and applying the right procedure" },
  { id: "law-tax-vat-indirect-tax", label: "Applying value-added/indirect tax place-of-supply and input-credit rules, which operate independently of income tax treatment" },
];

export const LAW_TAX_LAW_CASES: CaseStudy[] = [
  {
    id: "law-tax-dual-residency-executive",
    profession: "law",
    category: "Tax Law",
    title: "An Executive's Dual Tax Residency",
    scenario:
      "A senior executive who moved mid-year from one country to take up a permanent post in another now has both tax authorities treating her as resident for the full year, each taxing her full worldwide income, because she kept a family home and significant economic ties in her original country while establishing a new permanent home and center of vital interests in the second, and both countries' residency tests are satisfied on the facts. Her employer withheld tax in the new country, and the original country's assessment arrived with a demand for tax on income already taxed abroad, due in 45 days. She wants to know whether a tie-breaker rule would resolve the conflict in her favor, and how to actually invoke it before the payment deadline.",
    keyIssues: [
      "Whether she independently satisfies each country's own domestic residency test, since dual residency is a conflict of two valid domestic claims, not a single error by one country",
      "Applying the treaty tie-breaker hierarchy (permanent home, center of vital interests, habitual abode, nationality) in sequence rather than jumping straight to whichever factor favors her",
      "Whether a mutual agreement procedure or competent-authority request is available, and whether invoking it suspends the payment deadline",
      "What relief (credit or exemption) applies to income already taxed in the other country if the tie-breaker does not resolve cleanly in her favor",
    ],
    expectedConcepts: [
      "tax residency",
      "tie-breaker rule",
      "center of vital interests",
      "mutual agreement procedure",
      "double tax treaty",
      "foreign tax credit",
    ],
    modelApproach:
      "A strong answer works through each country's domestic residency test first, since dual residence is a conflict between two independently valid claims rather than an error by either side, then applies the treaty tie-breaker tests in strict hierarchical order rather than cherry-picking whichever factor favors the client. It treats the mutual agreement procedure as the actual mechanism for resolving the payment deadline, not an afterthought, and separately addresses what credit or exemption relief applies if the tie-breaker does not resolve cleanly.",
    furtherReading: [
      "OECD Model Tax Convention residency tie-breaker rules",
      "Mutual agreement procedure and competent authority relief",
      "Foreign tax credit vs. exemption method for relieving double taxation",
    ],
    testsFundamentals: ["law-tax-residency-source", "law-tax-double-taxation-relief"],
  },
  {
    id: "law-tax-severance-payment-characterization",
    profession: "law",
    category: "Tax Law",
    title: "Characterizing a Severance Package",
    scenario:
      "A departing senior manager received a lump sum described in her settlement agreement as covering three separate things: statutory severance, a payment for not competing with her former employer for two years, and a payment buying out unvested equity awards. The tax authority's assessment taxed the entire lump sum as ordinary employment income at the top marginal rate, but the manager argues the non-compete and equity portions should get different, more favorable treatment, and the settlement agreement does not break the lump sum into component amounts. She wants your opinion on how the payment should actually be characterized and what she would need to defend a different allocation.",
    keyIssues: [
      "Whether each component of the payment is taxed according to what it actually compensates for, rather than the payment's single combined label or form",
      "Default tax treatment of ordinary severance versus a separate payment for a restrictive covenant versus a capital item like an equity buyout",
      "Burden of proving the components, given the settlement agreement does not itemize them",
      "Risk that an unallocated lump sum is simply taxed as ordinary income in full absent persuasive evidence of a different breakdown",
    ],
    expectedConcepts: [
      "income characterization",
      "substance over form",
      "capital gain vs. ordinary income",
      "restrictive covenant payment",
      "burden of proof",
      "employment termination payment",
    ],
    modelApproach:
      "A strong answer insists that tax characterization follows the economic substance of what each part of the payment actually compensates, not the lump sum's single label, and is realistic that without contemporaneous allocation evidence the authority's default ordinary-income treatment of the whole amount is hard to displace. It recommends reconstructing an evidentiary basis for allocation rather than arguing the label alone.",
    furtherReading: [
      "Characterization of termination and settlement payments",
      "Ordinary income vs. capital gain distinction in employment-related payments",
      "Burden of proof in allocating a lump-sum payment among its components",
    ],
    testsFundamentals: ["law-tax-income-characterization", "law-tax-capital-vs-revenue"],
  },
  {
    id: "law-tax-management-fee-transfer-pricing",
    profession: "law",
    category: "Tax Law",
    title: "A Disputed Intercompany Management Fee",
    scenario:
      "Your client, the local subsidiary of a multinational group, pays its foreign parent an annual management fee equal to 4 percent of local revenue for 'strategic oversight and brand support,' a figure set by group policy and applied identically across every subsidiary regardless of size or actual services received. The local tax authority's audit team has disallowed the deduction entirely, arguing the subsidiary received no demonstrable benefit beyond what a shareholder would provide for its own interest, and that no independent business would pay for vague oversight at a flat percentage with no underlying time records or deliverables. The group's finance team wants to defend the fee as consistent with its global transfer pricing policy and is under time pressure before the audit's response deadline in three weeks.",
    keyIssues: [
      "Whether the fee reflects a genuine, benefit-conferring service distinguishable from non-chargeable shareholder activity",
      "Whether a flat percentage-of-revenue charge, applied uniformly regardless of actual service volume, can satisfy the arm's-length standard",
      "What contemporaneous documentation (benefit test, cost-allocation methodology, comparable arrangements) would be needed to defend the charge",
      "Consequences of a full disallowance, including the risk of a correlative-adjustment dispute or double taxation if the other country does not mirror the adjustment",
    ],
    expectedConcepts: [
      "arm's-length principle",
      "transfer pricing",
      "shareholder activity vs. chargeable service",
      "benefit test",
      "cost allocation",
      "correlative adjustment",
    ],
    modelApproach:
      "A strong answer separates the threshold question — was a real service rendered that an independent party would pay for — from the pricing question of whether the amount charged was arm's-length. It recognizes that a uniform percentage-of-revenue fee with no documented benefit test or deliverables is especially vulnerable, and recommends rebuilding the economic substance and documentation rather than relying on the global policy as self-justifying, while flagging the double-taxation risk if the adjustment is not mirrored abroad.",
    furtherReading: [
      "OECD Transfer Pricing Guidelines on intra-group services and the benefit test",
      "Shareholder activity vs. chargeable intra-group services",
      "Correlative adjustments and economic double taxation",
    ],
    premium: true,
    testsFundamentals: ["law-tax-transfer-pricing", "law-tax-burden-of-proof-audit"],
  },
  {
    id: "law-tax-digital-platform-permanent-establishment",
    profession: "law",
    category: "Tax Law",
    title: "Does a Local Warehouse and Sales Team Create a Permanent Establishment?",
    scenario:
      "A foreign e-commerce company sells exclusively through its own website into a market where it has no registered local entity, but it leases a local warehouse operated by a third-party logistics company for storage and last-mile delivery, and employs two local staff who negotiate pricing terms with large retail customers and have, on several occasions, concluded supply agreements on the company's behalf without needing head-office sign-off. The local tax authority argues these facts together create a taxable permanent establishment, while the company maintains the warehouse is a purely preparatory and auxiliary storage function and the local staff are mere marketing support. A large back-assessment is at stake, and the company wants to know how strong its position actually is.",
    keyIssues: [
      "Whether the warehouse activity is genuinely preparatory/auxiliary or whether it has become a core part of the company's actual business function",
      "Whether the local staff's conduct in actually concluding agreements, rather than merely soliciting or negotiating subject to approval, creates a dependent-agent permanent establishment",
      "Interaction between a fixed-place-of-business analysis (the warehouse) and a separate dependent-agent analysis (the staff), since either alone can establish a permanent establishment",
      "Practical consequences of a finding of permanent establishment, including profit attribution and the back-assessment period at risk",
    ],
    expectedConcepts: [
      "permanent establishment",
      "preparatory or auxiliary activity exception",
      "dependent agent",
      "authority to conclude contracts",
      "profit attribution",
      "fixed place of business",
    ],
    modelApproach:
      "A strong answer treats the fixed-place and dependent-agent tests as two independent routes to the same conclusion rather than one combined question. It is skeptical of labeling staff who have actually concluded binding agreements as mere marketing support, and flags that even a successful defense on the warehouse alone does not resolve the separate agent-based exposure.",
    furtherReading: [
      "OECD Model Tax Convention Article 5 on permanent establishment",
      "Preparatory and auxiliary activity exceptions after the BEPS Action 7 changes",
      "Dependent agent permanent establishment and authority to conclude contracts",
    ],
    premium: true,
    testsFundamentals: ["law-tax-permanent-establishment", "law-tax-residency-source"],
  },
  {
    id: "law-tax-royalty-withholding-treaty-relief",
    profession: "law",
    category: "Tax Law",
    title: "Reduced Withholding on a Cross-Border Royalty",
    scenario:
      "Your client licenses a trademark to an unrelated distributor in another country, which pays an annual royalty of 1.8 million and has withheld tax at the full 25 percent domestic statutory rate rather than the 5 percent rate your client believes applies under the relevant double tax treaty, because your client never filed the residency certificate and treaty-relief form the paying country's procedure requires before payment. Your client wants to know whether it can still recover the over-withheld amount after the fact, and separately whether the royalty might instead be recharacterized as a service fee subject to a different treaty article entirely, since part of the licensed package includes ongoing technical support alongside the trademark rights.",
    keyIssues: [
      "Whether procedural relief (reclaim after the fact) remains available having missed the pre-payment certification process, and the realistic timeline for recovering the excess withholding",
      "Whether the payment is properly characterized entirely as a royalty, or whether the technical-support component should be split out and taxed under a different treaty provision",
      "What residency and beneficial-ownership evidence is needed to support either a reclaim or a prospective rate reduction going forward",
      "Practical steps to avoid the same over-withholding on future payments under the same license",
    ],
    expectedConcepts: [
      "withholding tax",
      "double tax treaty rate reduction",
      "beneficial ownership",
      "royalty characterization",
      "reclaim procedure",
      "residency certificate",
    ],
    modelApproach:
      "A strong answer treats the missed pre-payment procedure as a recoverable administrative failure rather than a forfeited right, while being realistic about reclaim timelines and evidentiary demands. It separately tests whether the bundled technical-support component should be unbundled and characterized under a different treaty article rather than assuming the entire payment is a single royalty.",
    furtherReading: [
      "Treaty withholding rate relief and beneficial ownership requirements",
      "Procedural reclaim mechanisms for over-withheld tax",
      "Characterization of mixed royalty/service payments under double tax treaties",
    ],
    premium: true,
    testsFundamentals: ["law-tax-withholding-obligations", "law-tax-double-taxation-relief"],
  },
  {
    id: "law-tax-circular-financing-gaar",
    profession: "law",
    category: "Tax Law",
    title: "A Circular Financing Structure Draws a GAAR Challenge",
    scenario:
      "A corporate group restructured its internal financing so that a newly formed holding company in a low-tax jurisdiction borrowed funds from an operating subsidiary, used the proceeds to subscribe for shares in that same subsidiary, and the subsidiary now deducts the interest paid to the holding company while the holding company pays little tax on the interest received, with the overall arrangement generating a significant net deduction for the group without any new capital, business activity, or third-party financing actually entering the group. The tax authority has invoked a general anti-avoidance rule, arguing the structure has no purpose beyond generating a tax benefit, while the group argues each individual step was a valid, properly documented transaction. You are advising on whether the GAAR challenge is likely to succeed.",
    keyIssues: [
      "Whether the series of individually valid steps can be looked at as a single composite transaction for tax purposes, rather than assessed step by step",
      "Whether the arrangement has any genuine non-tax business purpose (new capital, risk transfer, operational change) beyond generating a deduction",
      "The difference between legitimate tax planning that uses the law as written and a contrived arrangement a general anti-avoidance rule is designed to unwind",
      "Consequences of a successful GAAR challenge, including how the authority may recharacterize or disregard the structure and what that does to the group's deduction and the holding company's position",
    ],
    expectedConcepts: [
      "general anti-avoidance rule",
      "substance over form",
      "step transaction",
      "circular financing",
      "tax benefit",
      "genuine business purpose",
    ],
    modelApproach:
      "A strong answer does not defend the structure step by step, since a GAAR analysis looks at the composite arrangement's overall purpose and economic substance. It concedes that the absence of any new capital, third-party risk, or operational change beyond generating a deduction is close to the paradigm case a general anti-avoidance rule exists to catch, and focuses on what remains defensible, if anything, rather than insisting every individually valid step immunizes the whole scheme.",
    furtherReading: [
      "General anti-avoidance rules and substance-over-form doctrine compared across jurisdictions",
      "Step-transaction and composite-transaction analysis",
      "Circular and round-trip financing arrangements in tax avoidance cases",
    ],
    premium: true,
    testsFundamentals: ["law-tax-general-anti-avoidance", "law-tax-avoidance-vs-evasion"],
  },
  {
    id: "law-tax-undisclosed-foreign-account",
    profession: "law",
    category: "Tax Law",
    title: "An Undisclosed Foreign Account Surfaces",
    scenario:
      "Your client inherited a foreign bank account from a parent eight years ago, never reported the account or the modest interest income it generated on any tax return since, and has just learned the tax authority will soon receive the account's details automatically under an international information-exchange agreement. The account holds roughly 310,000 and the unreported interest income, compounded over eight years, is a small fraction of that, but your client is more worried about the undisclosed principal itself being treated as unreported income than about the modest interest. A voluntary disclosure program exists that reduces penalties and forecloses criminal referral for qualifying disclosures made before the authority identifies the taxpayer independently. Your client wants to know whether to disclose now and what exposure remains either way.",
    keyIssues: [
      "Whether failing to report the account and its income was deliberate evasion or an innocent, actionable oversight, since the two carry very different penalty and criminal exposure",
      "Whether disclosing now, before the information exchange flags the account independently, still qualifies for voluntary-disclosure relief given the automatic-exchange timeline",
      "Correctly separating the inherited principal, which is not itself taxable income, from the unreported interest, which is the actual tax exposure",
      "Realistic penalty and interest exposure under each path (disclose now vs. wait) and the materially worse consequences of being identified first by the authority",
    ],
    expectedConcepts: [
      "voluntary disclosure",
      "tax evasion",
      "automatic exchange of information",
      "penalty mitigation",
      "unreported foreign income",
      "limitation period for fraud",
    ],
    modelApproach:
      "A strong answer is careful to separate the non-taxable inherited principal from the genuinely exposed unreported interest income so the client does not overstate their own exposure. It treats the voluntary-disclosure window as a rapidly closing, high-value option given the pending automatic exchange, recommending disclosure now rather than waiting, since being identified first forecloses the more favorable program entirely.",
    furtherReading: [
      "Voluntary disclosure and tax amnesty program design",
      "Automatic exchange of financial account information (Common Reporting Standard)",
      "Distinguishing tax evasion from negligent non-disclosure for penalty purposes",
    ],
    premium: true,
    testsFundamentals: ["law-tax-avoidance-vs-evasion", "law-tax-penalties-voluntary-disclosure"],
  },
  {
    id: "law-tax-merger-rollover-relief",
    profession: "law",
    category: "Tax Law",
    title: "Will a Merger Qualify for Tax-Neutral Treatment?",
    scenario:
      "Two mid-sized manufacturing companies plan to merge, with the smaller company's shareholders receiving shares in the surviving company in exchange for their shares, plus a modest cash top-up to equalize value, and the companies want the merger to qualify for tax-neutral reorganization treatment so that gain on the share exchange is deferred rather than taxed immediately. Tax-neutral treatment generally requires genuine continuity of the shareholders' interest and a real business purpose beyond tax deferral, and one shareholder of the smaller company, holding 15 percent, privately intends to sell her new shares within weeks of closing. The companies want to know whether the cash top-up and the one shareholder's resale intention put the whole transaction's tax-neutral status at risk for everyone involved.",
    keyIssues: [
      "Whether the cash top-up component is small enough to preserve the continuity-of-interest required for tax-neutral treatment, or whether it taints the entire exchange",
      "Whether one shareholder's private, undisclosed intention to resell shortly after closing can retroactively defeat tax-neutral treatment for that shareholder alone, or for the whole transaction",
      "Whether a genuine, non-tax business purpose (operational integration, market consolidation) is independently demonstrable regardless of the continuity-of-interest analysis",
      "Practical steps (closing mechanics, representations, timing) that would reduce the risk of an adverse finding",
    ],
    expectedConcepts: [
      "tax-neutral reorganization",
      "continuity of shareholder interest",
      "boot/cash consideration",
      "business purpose doctrine",
      "rollover relief",
      "step transaction",
    ],
    modelApproach:
      "A strong answer treats the cash top-up and the one shareholder's resale intention as two analytically separate risks rather than one combined problem. It reasons that a modest cash component is unlikely by itself to taint continuity for shareholders who are not themselves cashing out, and is realistic that a single shareholder's private resale plan more plausibly affects that shareholder's own tax treatment than the whole transaction's status, while still flagging the business-purpose question as independently necessary.",
    furtherReading: [
      "Continuity of interest doctrine in tax-neutral corporate reorganizations",
      "Treatment of cash/boot consideration in share-for-share exchanges",
      "Business purpose requirement for reorganization relief",
    ],
    premium: true,
    testsFundamentals: ["law-tax-corporate-reorganization", "law-tax-capital-vs-revenue"],
  },
  {
    id: "law-tax-intercompany-loan-thin-cap",
    profession: "law",
    category: "Tax Law",
    title: "An Intercompany Loan Draws a Thin-Capitalization Challenge",
    scenario:
      "A local operating subsidiary is funded with a debt-to-equity ratio far above what the local thin-capitalization rules treat as a safe harbor, almost entirely through an interest-bearing loan from its foreign parent at a rate the subsidiary argues reflects its genuine credit risk as a standalone borrower, while the tax authority argues an independent lender would never have extended financing on these terms without a parental guarantee that was never formally given, and has disallowed a large portion of the annual interest deduction as a result. The subsidiary's finance team wants to know whether the disallowance can be challenged, and whether restructuring the debt-to-equity mix prospectively would avoid the same problem for future years.",
    keyIssues: [
      "Whether the loan's terms, considered on a standalone basis without implicit parental support, are consistent with what an independent lender would have offered",
      "Whether exceeding a safe-harbor debt-to-equity ratio creates an irrebuttable presumption of disallowance or only shifts the burden to justify the financing on its actual facts",
      "Interaction between thin-capitalization rules and the broader arm's-length pricing of the interest rate itself, which are related but distinct questions",
      "Practical restructuring options (partial equity conversion, formal guarantee, renegotiated rate) to reduce future-year exposure",
    ],
    expectedConcepts: [
      "thin capitalization",
      "debt-to-equity safe harbor",
      "arm's-length interest rate",
      "implicit parental support",
      "interest deduction limitation",
      "standalone credit rating",
    ],
    modelApproach:
      "A strong answer separates the quantitative safe-harbor question from the substantive arm's-length question, since exceeding the ratio typically shifts the burden rather than automatically losing the deduction. It tests the loan's terms against what a genuinely independent, unsupported borrower could have obtained, and gives the client concrete prospective restructuring options rather than only litigating the past disallowance.",
    furtherReading: [
      "Thin capitalization and interest-deduction-limitation rules compared across jurisdictions",
      "Arm's-length pricing of intercompany debt and implicit support",
      "Debt-to-equity safe harbors and burden-shifting rules",
    ],
    premium: true,
    testsFundamentals: ["law-tax-thin-capitalization", "law-tax-deductibility-expenses"],
  },
  {
    id: "law-tax-audit-assessment-appeal-forum",
    profession: "law",
    category: "Tax Law",
    title: "Choosing a Forum to Contest a Large Reassessment",
    scenario:
      "Following a lengthy audit, the tax authority has issued a reassessment adding 6.2 million to your client's taxable income over three years, based largely on disallowing a category of deductions the authority says lacked adequate contemporaneous documentation, even though your client's bookkeeping, while informal, is substantively consistent with the deductions claimed. Your client must decide within 30 days whether to pursue an internal administrative appeal, which is faster and does not require full payment upfront, or proceed directly to tax-court litigation, which takes considerably longer but allows a fresh, independent hearing rather than internal review by the same authority that issued the assessment. You are advising on which path offers the better realistic chance of success given the documentation weaknesses.",
    keyIssues: [
      "Who bears the burden of proof at each stage, and whether informal but substantively consistent records can meet that burden despite falling short of ideal contemporaneous documentation",
      "Practical tradeoffs between an internal administrative appeal (speed, lower cost, same-authority review) and tax-court litigation (independent hearing, longer timeline, often a prepayment or guarantee requirement)",
      "Whether pursuing the administrative appeal first forecloses or merely delays access to tax-court litigation if it fails",
      "Strategy for strengthening the documentation record before either forum, regardless of which is chosen",
    ],
    expectedConcepts: [
      "burden of proof",
      "administrative appeal",
      "tax court litigation",
      "contemporaneous documentation",
      "prepayment requirement",
      "exhaustion of administrative remedies",
    ],
    modelApproach:
      "A strong answer treats the documentation weakness as the central vulnerability regardless of forum and recommends shoring up the evidentiary record before filing either way. It weighs the speed and cost advantages of the administrative appeal against the independent-hearing advantage of tax-court litigation, and checks whether the chosen path forecloses or merely postpones the other before recommending a sequence.",
    furtherReading: [
      "Burden of proof allocation in tax audits and reassessments",
      "Administrative appeal versus tax court litigation strategy",
      "Documentation standards for substantiating business deductions",
    ],
    premium: true,
    testsFundamentals: ["law-tax-tax-dispute-forum", "law-tax-burden-of-proof-audit"],
  },
  {
    id: "law-tax-reopened-assessment-fraud-exception",
    profession: "law",
    category: "Tax Law",
    title: "Reopening a Nine-Year-Old Assessment on a Fraud Theory",
    scenario:
      "The tax authority has issued a reassessment for a tax year that closed nine years ago, well beyond the ordinary limitation period for reassessment, arguing that your client's failure to report a substantial category of income that year was fraudulent rather than merely careless, which under the applicable rules removes the normal time bar entirely. Your client maintains the omission was an honest bookkeeping error made by a since-departed accountant, not fraud, and that reopening a nine-year-old year at this point is itself unfair given how little contemporaneous evidence either side can now realistically produce. You are advising on whether the fraud exception can actually be sustained on these facts and what happens if it cannot.",
    keyIssues: [
      "What the authority must actually prove to establish fraud (as opposed to mere negligence or error) sufficient to lift the ordinary limitation period",
      "Whether the passage of time itself, and the resulting evidentiary degradation, cuts against the authority's ability to meet that burden",
      "Consequences if the fraud exception fails: does the assessment for that year simply fall away entirely, regardless of whether the underlying income was in fact unreported",
      "Practical evidence (the departed accountant's records, the client's contemporaneous conduct) that would support or undermine the honest-error explanation",
    ],
    expectedConcepts: [
      "statute of limitations",
      "fraud exception",
      "burden of proof",
      "negligence versus fraud",
      "reassessment",
      "time-barred claim",
    ],
    modelApproach:
      "A strong answer insists the authority must meet a genuinely higher evidentiary bar to prove fraud rather than mere carelessness, since the entire basis for reopening a long-closed year depends on clearing that specific bar. It is clear that if the fraud theory fails, the ordinary limitation period simply closes the year regardless of whether the income was actually, in fact, unreported.",
    furtherReading: [
      "Limitation periods for tax reassessment and the fraud exception",
      "Distinguishing negligent error from fraud for limitation purposes",
      "Evidentiary burdens in reopening time-barred tax years",
    ],
    premium: true,
    testsFundamentals: ["law-tax-statute-of-limitations", "law-tax-burden-of-proof-audit"],
  },
  {
    id: "law-tax-cross-border-digital-services-vat",
    profession: "law",
    category: "Tax Law",
    title: "Where Is a Cross-Border Digital Service Actually Supplied?",
    scenario:
      "Your client operates a subscription-based online education platform, selling access to course content to individual customers across several countries directly from its website with no local offices or staff anywhere customers are located. It has been charging and remitting indirect/value-added tax based only on the location of its own headquarters, on the view that the service is supplied from wherever the company itself is established, but one destination country's tax authority argues the applicable place-of-supply rule for digital services sold to consumers, as opposed to businesses, looks instead to the customer's own location, meaning your client should have been registering and charging that country's tax rate on every sale to its residents. A multi-year assessment is at stake.",
    keyIssues: [
      "Whether the applicable place-of-supply rule for this type of digital service depends on the supplier's location, the customer's location, or differs depending on whether the customer is a business or a consumer",
      "Practical registration and collection obligations that would follow from a customer-location rule, including any small-supplier or simplified-registration thresholds that might reduce the burden",
      "Exposure for past periods if the company applied the wrong rule in good faith, versus going-forward compliance changes",
      "Whether the business-to-business portion of its customer base, if any, is governed by a different rule than the business-to-consumer portion",
    ],
    expectedConcepts: [
      "value-added tax",
      "place of supply rules",
      "digital services taxation",
      "B2B vs. B2C treatment",
      "registration threshold",
      "indirect tax compliance",
    ],
    modelApproach:
      "A strong answer does not assume a single place-of-supply rule applies uniformly, since digital-services rules frequently split business-to-consumer sales (a destination/customer-location rule) from business-to-business sales (often a reverse charge, shifting the obligation to the business customer). It separately addresses past-period exposure for a good-faith but mistaken rule from the registration and collection changes needed going forward.",
    furtherReading: [
      "Place-of-supply rules for digital/electronically supplied services",
      "B2B versus B2C treatment under value-added tax systems",
      "Registration thresholds and simplified compliance regimes for cross-border digital suppliers",
    ],
    premium: true,
    testsFundamentals: ["law-tax-vat-indirect-tax", "law-tax-residency-source"],
  },
  {
    id: "law-tax-hybrid-entity-mismatch",
    profession: "law",
    category: "Tax Law",
    title: "A Hybrid Entity Creates a Double Deduction",
    scenario:
      "A corporate group formed a financing subsidiary that one country's tax law treats as a separate taxable company and the other country, where its immediate parent is based, treats as fiscally transparent (disregarded), because the two countries apply different legal tests for entity classification to the same vehicle. As a result, interest the subsidiary pays on an intercompany loan is deducted once in the country where the subsidiary is taxed as a separate company, and effectively deducted again at the parent level in the other country, which looks straight through the subsidiary and treats the parent as having incurred the expense directly. Neither country's domestic law was drafted with this specific interaction in mind, but a growing body of international rules targets exactly this kind of hybrid mismatch by denying one of the two deductions. You are advising the group on its exposure and on which country's deduction is more likely to be the one denied.",
    keyIssues: [
      "How the same legal entity can be classified differently by two tax systems applying their own domestic classification tests independently, producing a hybrid mismatch",
      "How a double-deduction outcome arises mechanically from that classification conflict, as distinct from more familiar double-taxation or double-non-taxation hybrid scenarios",
      "How internationally coordinated hybrid-mismatch rules typically allocate responsibility for denying the duplicated deduction between the payer and parent jurisdictions",
      "Practical restructuring options to eliminate the mismatch going forward, versus the group's exposure for periods that have already passed",
    ],
    expectedConcepts: [
      "hybrid entity mismatch",
      "entity classification",
      "double deduction",
      "fiscally transparent vs. opaque treatment",
      "linking rules",
      "BEPS hybrid mismatch framework",
    ],
    modelApproach:
      "A strong answer walks through the mechanical cause of the double deduction before reaching for any remedy: each country's classification test produces a different, independently valid characterization of the same entity. It applies the standard hybrid-mismatch allocation logic — typically denying the deduction in the payer's jurisdiction first, with the parent jurisdiction's deduction denied only if the payer jurisdiction does not act — rather than assuming either country's deduction is simply safe.",
    furtherReading: [
      "Hybrid mismatch arrangements and entity classification conflicts",
      "OECD/G20 BEPS Action 2 framework on neutralizing hybrid mismatches",
      "Double deduction outcomes versus double non-taxation in hybrid structures",
    ],
    premium: true,
    testsFundamentals: ["law-tax-entity-classification", "law-tax-double-taxation-relief"],
  },
];
