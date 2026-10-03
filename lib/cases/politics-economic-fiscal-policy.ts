import type { CaseStudy } from "@/lib/caseStudyContent";
import type { Fundamental } from "@/lib/caseStudyFundamentals";

/**
 * Politics / Economic & Fiscal Policy: the fundamentals checklist and the
 * case bank for this category, kept together so they can be written and
 * reviewed as one unit. Registered in lib/cases/index.ts.
 *
 * Distinct from Domestic Policy: this category is the technical/economic
 * policy lane specifically — government budgeting, taxation design,
 * deficit/debt politics, monetary-fiscal coordination, and economic-crisis
 * policy response — rather than the broad general-domestic-issues ground
 * Domestic Policy covers.
 */
export const POLITICS_ECONOMIC_FISCAL_POLICY_FUNDAMENTALS: Fundamental[] = [
  { id: "pol-econ-budget-process", label: "Navigating the formal budget process (drafting, legislative approval, execution) and its sequencing constraints" },
  { id: "pol-econ-fiscal-rules-compliance", label: "Designing and defending a policy within binding fiscal rules (deficit or debt ceilings) and the political cost of breaching them" },
  { id: "pol-econ-debt-sustainability", label: "Assessing public debt sustainability (the debt-to-GDP trajectory, the primary balance, the interest-growth differential) under contested assumptions" },
  { id: "pol-econ-tax-incidence-design", label: "Weighing tax incidence and the distributional and efficiency trade-offs built into a proposed tax design" },
  { id: "pol-econ-automatic-stabilizers", label: "Distinguishing automatic stabilizers from discretionary fiscal stimulus and timing each appropriately to the business cycle" },
  { id: "pol-econ-fiscal-multiplier", label: "Estimating and defending the fiscal-multiplier assumptions used to justify a stimulus or austerity package" },
  { id: "pol-econ-procyclicality-risk", label: "Recognizing and resisting procyclical fiscal pressure — cutting spending in a downturn or expanding it in a boom" },
  { id: "pol-econ-monetary-fiscal-coordination", label: "Coordinating fiscal policy with an independent central bank without appearing to pressure or compromise that independence" },
  { id: "pol-econ-sovereign-debt-crisis", label: "Responding to a sovereign-debt rollover crisis, including market-confidence signaling and emergency financing options" },
  { id: "pol-econ-fiscal-council-oversight", label: "Using, or responding to, an independent fiscal watchdog's assessment to build or contest a budget's credibility" },
  { id: "pol-econ-credit-rating-politics", label: "Managing the political and market fallout of a sovereign credit-rating action" },
  { id: "pol-econ-intergenerational-equity", label: "Weighing intergenerational equity in financing decisions — debt-financed spending versus pay-as-you-go funding" },
  { id: "pol-econ-tax-expenditure-reform", label: "Identifying and reforming tax expenditures (deductions, credits, preferential rates) against concentrated beneficiary resistance" },
  { id: "pol-econ-fiscal-federalism-transfers", label: "Designing fiscal transfers and equalization formulas between national and subnational governments under a binding budget constraint" },
  { id: "pol-econ-austerity-political-backlash", label: "Sequencing and structuring austerity measures to manage political backlash while preserving fiscal credibility" },
  { id: "pol-econ-budget-transparency", label: "Ensuring budget transparency and resisting fiscal illusion or off-budget accounting that obscures the true fiscal position" },
  { id: "pol-econ-crowding-out-investment", label: "Assessing whether public borrowing is crowding out private investment or financing genuinely additive public investment" },
  { id: "pol-econ-entitlement-reform-financing", label: "Financing a structural entitlement or pension shortfall against political resistance to benefit cuts or tax increases" },
  { id: "pol-econ-tax-competition-mobility", label: "Responding to cross-jurisdiction tax competition and capital or corporate mobility pressure" },
  { id: "pol-econ-crisis-conditionality", label: "Navigating conditional external financing during a fiscal crisis, balancing sovereignty, credibility, and the terms attached" },
];

export const POLITICS_ECONOMIC_FISCAL_POLICY_CASES: CaseStudy[] = [
  {
    id: "pol-econ-bond-yield-spike",
    profession: "politics",
    category: "Economic & Fiscal Policy",
    title: "Bond Yields Spike Overnight",
    scenario:
      "Yields on your government's benchmark long-term bonds jumped 120 basis points in a single trading session after a leaked internal memo suggested next year's deficit will come in well above the figure your finance ministry published two months ago. You face a major debt refinancing auction in nine days, and your debt-management office warns that if yields stay elevated, the interest bill alone could consume a politically unsustainable share of next year's budget. Opposition figures are calling for an emergency statement; some advisors want to wait for the auction's actual result before saying anything, worried that a reactive statement now will look like panic.",
    keyIssues: [
      "Whether to get ahead of the market narrative with a credible statement now or wait and risk the gap widening into the auction",
      "What would actually reassure bond markets versus what would only reassure a domestic political audience",
      "Credibility cost of the deficit figure having been wrong, and what it will take to re-establish trust in the next one",
      "Contingency financing options if the auction itself goes badly",
    ],
    expectedConcepts: [
      "sovereign bond yields",
      "debt rollover risk",
      "market confidence signaling",
      "fiscal credibility",
      "debt management office",
    ],
    modelApproach:
      "A strong answer treats the leaked memo's credibility damage as the actual problem, not the yield move itself, and recommends a concrete, verifiable corrective — a revised deficit figure with the methodology shown, not just reassuring language — delivered before the auction rather than after. It names a contingency plan if the auction still prices poorly, rather than treating a good outcome as the only scenario worth preparing for.",
    furtherReading: [
      "Sovereign debt rollover risk and auction mechanics",
      "Market confidence and fiscal credibility signaling",
      "Case studies in bond-market reactions to fiscal data revisions",
    ],
    testsFundamentals: ["pol-econ-sovereign-debt-crisis", "pol-econ-budget-transparency"],
  },
  {
    id: "pol-econ-deficit-ceiling-coalition-fight",
    profession: "politics",
    category: "Economic & Fiscal Policy",
    title: "A Coalition Budget That Doesn't Fit Under the Ceiling",
    scenario:
      "Your coalition government has agreed in principle to a public-investment package your junior partner considers non-negotiable, but your own fiscal rule caps the structural deficit at a level the package would breach by a meaningful margin unless something else is cut or a new revenue source is found. Your finance ministry has modeled three paths: cutting an unrelated popular program, introducing a politically risky new levy, or reclassifying part of the investment spending under an exception the rule technically allows but that independent commentators would likely call a gimmick. You must recommend a path to the cabinet before the budget bill is finalized for its first reading.",
    keyIssues: [
      "Whether the reclassification option is a legitimate use of an existing exception or a credibility-damaging gimmick once scrutinized",
      "Genuine trade-off between honoring the coalition commitment and holding the fiscal rule's integrity",
      "Political cost of each financing path and which constituency absorbs it",
      "Precedent set for future budgets if a gimmick is used once and then expected again",
    ],
    expectedConcepts: [
      "fiscal rule compliance",
      "structural deficit",
      "coalition budget negotiation",
      "accounting classification risk",
      "fiscal credibility",
    ],
    modelApproach:
      "A strong answer is explicit that the reclassification path carries a durable credibility cost even if it is technically legal, since independent fiscal watchdogs and credit markets will notice and price in the precedent. It weighs the other two paths on their actual political and distributional merits rather than defaulting to the gimmick because it is least visible in the short term, and gives a specific recommendation with a plan for managing whichever constituency bears the cost.",
    furtherReading: [
      "Design and enforcement of structural deficit rules",
      "Creative accounting and fiscal gimmicks in budget compliance",
      "Coalition budget negotiation under binding fiscal constraints",
    ],
    testsFundamentals: ["pol-econ-fiscal-rules-compliance", "pol-econ-budget-transparency"],
  },
  {
    id: "pol-econ-central-bank-pressure",
    profession: "politics",
    category: "Economic & Fiscal Policy",
    title: "Asking the Central Bank for a Favor",
    scenario:
      "Your government's borrowing costs have risen sharply as the independent central bank has raised its policy rate to fight inflation, and your finance minister is under pressure from backbenchers to publicly call for rate cuts or, failing that, to ask the central bank to resume large-scale purchases of government bonds to bring yields down directly. Central bank officials have privately signaled that any public pressure from the government will be read by markets as an attempt to compromise their independence, which could itself trigger exactly the loss of confidence you are trying to avoid. You must advise the finance minister on what, if anything, to say publicly about monetary policy this week.",
    keyIssues: [
      "Distinguishing a legitimate fiscal response to high borrowing costs from pressure that risks compromising central bank independence",
      "Market perception risk if independence appears compromised, even symbolically",
      "What fiscal tools remain available if monetary accommodation is not an option",
      "How to manage backbench pressure without making a public statement that backfires",
    ],
    expectedConcepts: [
      "central bank independence",
      "monetary-fiscal coordination",
      "debt monetization risk",
      "market confidence",
      "policy rate transmission",
    ],
    modelApproach:
      "A strong answer treats central bank independence as something to protect precisely because the government's own credibility depends on markets believing it will not be compromised, and it declines to publicly pressure the bank even under backbench pressure. It redirects the conversation to the fiscal tools actually available — expenditure review, debt-maturity management, a credible medium-term consolidation path — rather than treating monetary accommodation as the only lever.",
    furtherReading: [
      "Central bank independence and its role in fiscal credibility",
      "Debt monetization risk and its effect on market confidence",
      "Comparative frameworks for monetary-fiscal policy coordination",
    ],
    testsFundamentals: ["pol-econ-monetary-fiscal-coordination", "pol-econ-sovereign-debt-crisis"],
  },
  {
    id: "pol-econ-downgrade-response",
    profession: "politics",
    category: "Economic & Fiscal Policy",
    title: "The Morning After a Credit Downgrade",
    scenario:
      "A major credit rating agency downgraded your sovereign debt rating overnight, citing a weakening medium-term fiscal trajectory and policy uncertainty following a contested election. The downgrade will raise borrowing costs on new issuance and may trigger forced selling by some institutional investors whose mandates restrict holdings below a certain rating threshold. Your finance minister must decide this morning whether to announce an immediate corrective package to try to reassure markets ahead of tomorrow's debt auction, or to wait for a scheduled budget statement in three weeks that would allow more careful design but leaves a longer window of elevated borrowing costs.",
    keyIssues: [
      "Whether an immediate announcement under pressure risks a hastily designed package that doesn't survive scrutiny",
      "Cost of three more weeks of elevated borrowing costs versus the benefit of a better-designed response",
      "What the rating agency's specific stated concerns imply about what would actually move the rating back",
      "Managing investor mandate-driven forced selling distinct from the broader market reaction",
    ],
    expectedConcepts: [
      "sovereign credit rating",
      "rating agency methodology",
      "forced-selling dynamics",
      "fiscal trajectory credibility",
      "crisis timing trade-offs",
    ],
    modelApproach:
      "A strong answer reads the rating agency's specific stated rationale closely and designs a response that addresses those named concerns directly, rather than a generic reassurance package, and is honest about the trade-off between speed and design quality rather than assuming the fastest response is automatically the best one. It also distinguishes the mechanical forced-selling pressure from the broader confidence question, since each calls for a different response.",
    furtherReading: [
      "Sovereign credit rating methodology and the role of ratings in bond markets",
      "Institutional investor mandate thresholds and forced-selling dynamics",
      "Case studies in government responses to sovereign downgrades",
    ],
    testsFundamentals: ["pol-econ-credit-rating-politics", "pol-econ-debt-sustainability"],
  },
  {
    id: "pol-econ-recession-stabilizer-timing",
    profession: "politics",
    category: "Economic & Fiscal Policy",
    title: "The Recession Everyone Saw Coming, Except the Budget",
    scenario:
      "Leading indicators have pointed toward a recession for two quarters, and unemployment has just begun climbing, triggering the automatic expansion of unemployment benefits and other built-in stabilizers your system already has. Your economic team is split: one group wants to let the automatic stabilizers do their work and hold discretionary spending flat to preserve fiscal space, while another wants an additional discretionary stimulus package now, arguing that waiting for the automatic stabilizers alone to work will leave the downturn deeper and longer than necessary. A third faction worries that any new discretionary package passed now will not actually be spent until the recession is already ending, arriving too late to help and arguably making the next expansion run too hot.",
    keyIssues: [
      "Whether automatic stabilizers alone are sufficient given the severity of leading indicators, or discretionary action is genuinely needed",
      "Realistic lag between legislating a discretionary package and money actually reaching the economy",
      "Risk of procyclical timing if the package lands after the recession has already turned",
      "Preserving fiscal space for a worse downturn if this one turns out shallower than feared",
    ],
    expectedConcepts: [
      "automatic stabilizers",
      "discretionary fiscal stimulus",
      "fiscal policy lags",
      "procyclical risk",
      "fiscal space",
    ],
    modelApproach:
      "A strong answer takes the implementation-lag concern seriously as a design question, not a reason to do nothing, and proposes measures that can actually disburse quickly if a discretionary package is warranted, rather than assuming legislating stimulus and delivering it are the same thing. It gives a specific, reasoned call on whether the automatic stabilizers already in motion are sufficient given the data in hand, rather than treating the choice as purely ideological.",
    furtherReading: [
      "Automatic stabilizers versus discretionary stimulus design",
      "Fiscal policy implementation lags and timing risk",
      "Preserving fiscal space across the business cycle",
    ],
    testsFundamentals: ["pol-econ-automatic-stabilizers", "pol-econ-procyclicality-risk", "pol-econ-fiscal-multiplier"],
  },
  {
    id: "pol-econ-fiscal-council-dispute",
    profession: "politics",
    category: "Economic & Fiscal Policy",
    title: "The Independent Fiscal Watchdog Calls Your Forecast Unrealistic",
    scenario:
      "Your finance ministry's draft budget relies on a growth forecast that the country's independent fiscal council has publicly called optimistic by a wide margin, warning that if its own, more conservative projection is right, the budget will breach the deficit rule within two years rather than staying comfortably inside it as the ministry claims. The council has no power to block the budget, only to publish its assessment, but opposition parties and financial journalists are already citing its number instead of the ministry's. Your minister must decide whether to defend the original forecast, revise it toward the council's figure, or commission a third assessment, with the budget vote now ten days away.",
    keyIssues: [
      "Whether defending an optimistic forecast under public challenge from a credible independent body is sustainable",
      "Cost of revising the forecast now, including what it implies about which spending or revenue plans must also change",
      "Political versus technical credibility of commissioning a third assessment under this time pressure",
      "Long-term cost to the ministry's own forecasting credibility if it is later proven wrong again",
    ],
    expectedConcepts: [
      "independent fiscal council",
      "growth forecast credibility",
      "deficit rule compliance",
      "forecasting bias",
      "fiscal transparency",
    ],
    modelApproach:
      "A strong answer does not treat the fiscal council's challenge as a public-relations problem to be managed away, and instead engages with whether the ministry's forecast methodology is actually defensible against the council's specific critique. It recommends either a credible, substantiated defense of the original number or a genuine revision with the resulting budget adjustments made explicit, rather than a purely rhetorical response that avoids the substantive forecasting disagreement.",
    furtherReading: [
      "The role of independent fiscal councils in budget oversight",
      "Systematic optimism bias in government growth forecasts",
      "Comparative design of fiscal watchdog institutions",
    ],
    testsFundamentals: ["pol-econ-fiscal-council-oversight", "pol-econ-fiscal-rules-compliance"],
  },
  {
    id: "pol-econ-pension-shortfall-financing",
    profession: "politics",
    category: "Economic & Fiscal Policy",
    title: "The Pension System's Funding Gap Can No Longer Be Deferred",
    scenario:
      "Actuarial projections now show your public pension system's funding gap widening faster than previously estimated, driven by a demographic shift your predecessors postponed addressing for over a decade through small, temporary patches. Closing the gap credibly requires some combination of raising the retirement age, increasing contribution rates, or committing new general-tax revenue indefinitely, and your actuaries warn that another temporary patch would only need to be revisited again within three years. Current pensioners and near-retirees, a large and organized voting bloc, are fiercely opposed to any change that affects them, while younger workers who will bear the long-run cost of inaction are far less politically organized. Your finance minister wants a durable financing recommendation, not another patch.",
    keyIssues: [
      "Genuine trade-off between the three durable financing levers and who bears each one's cost",
      "Political asymmetry between an organized, vocal beneficiary bloc and a diffuse, less organized group bearing the long-run cost",
      "Why another temporary patch would fail to solve the actual problem, only defer it again",
      "Transition design that protects near-retirees while still changing the system's underlying trajectory",
    ],
    expectedConcepts: [
      "pension system sustainability",
      "intergenerational equity",
      "actuarial funding gap",
      "contribution versus benefit levers",
      "grandfathering and transition design",
    ],
    modelApproach:
      "A strong answer treats the intergenerational asymmetry explicitly rather than only the near-term political optics, and recommends a durable combination of levers with a credible transition — such as grandfathering current near-retirees while phasing in a higher retirement age for younger cohorts — over a politically easier but short-lived patch. It is explicit about why deferring again is a real cost, not a neutral choice to revisit later.",
    furtherReading: [
      "Actuarial methods for assessing pension-system sustainability",
      "Intergenerational equity in entitlement financing",
      "Comparative pension reform transition design (grandfathering, phase-ins)",
    ],
    testsFundamentals: ["pol-econ-entitlement-reform-financing", "pol-econ-intergenerational-equity"],
  },
  {
    id: "pol-econ-equalization-formula-fight",
    profession: "politics",
    category: "Economic & Fiscal Policy",
    title: "Rewriting the Formula That Moves Money Between Regions",
    scenario:
      "The formula that redistributes tax revenue from wealthier to poorer regions is due for its scheduled five-year revision, and updated economic data show the gap between contributing and receiving regions has narrowed more than expected in some areas while widening sharply in others. Contributing regions argue the formula should be updated immediately to reflect the new data, since continuing the old formula means transferring money based on outdated need. Receiving regions argue a sudden formula change would be destabilizing to budgets they have already committed years in advance, and want a longer phase-in. You chair the intergovernmental committee responsible for recommending a revision before the fiscal year's transfers are finalized.",
    keyIssues: [
      "Whether using updated data immediately is fairer, or whether budget-planning stability for receiving regions deserves real weight",
      "Risk that an abrupt formula change destabilizes service delivery in regions suddenly receiving less",
      "Designing a phase-in that doesn't simply delay a needed correction indefinitely under political pressure",
      "Transparency of the formula's inputs so neither side can credibly accuse the other of manipulating the calculation",
    ],
    expectedConcepts: [
      "fiscal equalization",
      "intergovernmental fiscal transfers",
      "formula-based redistribution",
      "transition and phase-in design",
      "budget planning stability",
    ],
    modelApproach:
      "A strong answer does not simply split the difference, and instead proposes a specific phase-in schedule tied to concrete milestones that updates the formula on a defensible timetable without either freezing outdated data in place or destabilizing receiving regions' committed budgets overnight. It keeps the formula's inputs transparent and auditable so the eventual recommendation can survive challenge from either side.",
    furtherReading: [
      "Design of fiscal equalization and intergovernmental transfer formulas",
      "Comparative approaches to formula revision and phase-in design",
      "Transparency standards in intergovernmental fiscal transfers",
    ],
    testsFundamentals: ["pol-econ-fiscal-federalism-transfers", "pol-econ-budget-transparency"],
  },
  {
    id: "pol-econ-relocation-threat-incentive",
    profession: "politics",
    category: "Economic & Fiscal Policy",
    title: "A Major Employer Threatens to Leave Over Taxes",
    scenario:
      "Your country's largest private employer, responsible for a meaningful share of regional employment, has announced it is reviewing whether to relocate its headquarters and a large share of its operations to a neighboring jurisdiction offering a substantially lower corporate tax rate and a package of targeted incentives. Matching the offer would cost your treasury a significant recurring sum and invite demands for similar treatment from other large employers, while losing the company would cost thousands of jobs and a large share of regional tax revenue outright. Independent economists are divided on whether the relocation threat is genuine or a negotiating tactic timed to your upcoming budget. Your finance minister wants your recommendation before responding.",
    keyIssues: [
      "Assessing whether the relocation threat is credible or substantially a negotiating tactic, and how to test that credibly",
      "Fiscal and political cost of matching the offer versus the cost of losing the employer if the threat is real",
      "Risk that matching the offer triggers a broader race-to-the-bottom with other large employers seeking equivalent treatment",
      "Whether a narrower, time-limited, or conditional concession could address the core risk without a full permanent tax cut",
    ],
    expectedConcepts: [
      "tax competition",
      "corporate mobility",
      "race to the bottom",
      "credible threat assessment",
      "targeted versus general tax incentives",
    ],
    modelApproach:
      "A strong answer treats the credibility of the relocation threat as a question to actually investigate, not assume, and weighs the precedent risk of matching the offer against the real cost of losing the employer rather than reacting on fear alone. It considers a narrower, conditional response, such as a time-limited investment credit tied to continued local employment, as a way to address the underlying risk without committing to a permanent, broadly replicable concession.",
    furtherReading: [
      "Tax competition and corporate location decisions",
      "Race-to-the-bottom dynamics in subnational and international tax policy",
      "Designing conditional versus unconditional tax incentives",
    ],
    testsFundamentals: ["pol-econ-tax-competition-mobility", "pol-econ-tax-incidence-design"],
  },
  {
    id: "pol-econ-offbudget-guarantee-discovery",
    profession: "politics",
    category: "Economic & Fiscal Policy",
    title: "The Guarantees Nobody Put in the Budget",
    scenario:
      "A routine audit has discovered that a state-owned infrastructure agency carries loan guarantees worth a substantial share of annual GDP that were never consolidated into the headline budget figures your government has been publishing, because the guarantees were structured as contingent liabilities rather than direct debt. Several of the underlying loans are now at meaningful risk of default given a downturn in the sector they financed, which would convert the contingent liability into an immediate, large cash call on the treasury. Opposition politicians are calling it a hidden-debt scandal; your own officials argue the accounting treatment was technically standard practice at the time, just poorly disclosed. You must advise on both the immediate fiscal response and how to restore confidence in the budget's figures.",
    keyIssues: [
      "Whether the accounting treatment was a genuine technical judgment or a disclosure failure that misrepresented the true fiscal position",
      "Immediate fiscal exposure if the at-risk guarantees are actually called, and how to prepare for that without overstating the budget impact",
      "What transparency reforms would prevent a repeat, distinct from managing this specific episode",
      "How to respond publicly without appearing to either minimize a real problem or confirm a worse one than actually exists",
    ],
    expectedConcepts: [
      "contingent liabilities",
      "off-budget accounting",
      "fiscal transparency",
      "budget credibility",
      "government debt disclosure standards",
    ],
    modelApproach:
      "A strong answer does not default to minimizing the issue as mere technical classification, and instead assesses honestly whether the disclosure genuinely misrepresented the government's fiscal exposure, since that judgment should drive both the immediate response and the credibility repair. It proposes a specific disclosure reform, consolidating contingent liabilities into a published register with periodic risk assessment, rather than treating this as a one-off communications problem to be managed and then forgotten.",
    furtherReading: [
      "Government debt and contingent-liability disclosure standards",
      "Fiscal transparency frameworks and off-budget accounting risk",
      "Case studies in hidden sovereign and quasi-sovereign liabilities",
    ],
    testsFundamentals: ["pol-econ-budget-transparency", "pol-econ-debt-sustainability"],
  },
  {
    id: "pol-econ-infrastructure-borrowing-crowdout",
    profession: "politics",
    category: "Economic & Fiscal Policy",
    title: "Borrowing Big for Infrastructure While the Private Sector Is Also Borrowing Big",
    scenario:
      "Your government wants to issue a large volume of long-term debt to finance a multi-year infrastructure program, arguing the projects will raise long-run productive capacity and more than pay for themselves. Private investment is currently also running at a multi-decade high, and some economists on your advisory council warn that issuing this much additional sovereign debt into an already-tight capital market risks crowding out private borrowers and pushing up interest rates economy-wide, while others argue public infrastructure investment is complementary to private investment, not competing with it, and that the bigger risk is under-investing now. You must recommend whether to proceed with the program as planned, scale it back, or phase it over a longer period.",
    keyIssues: [
      "Whether the infrastructure program is genuinely crowding out private investment or complementing it",
      "Evidence needed to tell the two scenarios apart rather than assuming either by default",
      "Trade-off between phasing the program to reduce crowding-out risk and losing the economic benefit of faster completion",
      "How interest-rate sensitivity of the financing plan itself changes the risk calculus",
    ],
    expectedConcepts: [
      "crowding out",
      "public versus private investment complementarity",
      "interest rate effects of sovereign issuance",
      "infrastructure investment returns",
      "debt-financed capital spending",
    ],
    modelApproach:
      "A strong answer resists treating crowding out as settled either way by assumption, and instead looks for the specific evidence, interest-rate and credit-spread movements, private investment trends in affected sectors, that would distinguish genuine crowding out from complementary investment. It gives a reasoned recommendation on pacing the program that weighs the real cost of delay against the real risk of flooding the capital market, rather than treating the choice as binary between proceeding at full speed or not at all.",
    furtherReading: [
      "Crowding out versus complementarity in public investment economics",
      "Interest-rate effects of large-scale sovereign debt issuance",
      "Evaluating returns on public infrastructure investment",
    ],
    testsFundamentals: ["pol-econ-crowding-out-investment", "pol-econ-debt-sustainability"],
  },
  {
    id: "pol-econ-external-assistance-conditionality",
    profession: "politics",
    category: "Economic & Fiscal Policy",
    title: "Accepting a Bailout Means Accepting Its Conditions",
    scenario:
      "After a sustained loss of market access, your government has concluded it cannot refinance maturing debt through normal bond markets and must seek emergency external financing from an international lender of last resort. The lender's standard terms require specific fiscal consolidation measures, including cuts to politically sensitive subsidies, before funds are disbursed, and your cabinet is divided over whether to accept the terms as offered, negotiate a longer adjustment timeline, or attempt one more bond auction first despite your debt-management office's warning that it is likely to fail and worsen your negotiating position. You must recommend a path to the head of government within 48 hours, as reserves available to meet the next debt payment are nearly exhausted.",
    keyIssues: [
      "Realistic odds the next bond auction succeeds versus the cost of a failed attempt weakening your negotiating leverage further",
      "What is actually negotiable in the lender's standard terms versus what is a firm precondition for disbursement",
      "Political cost of accepting externally imposed conditionality versus the cost of a disorderly default if financing isn't secured in time",
      "Sequencing the politically sensitive subsidy cuts to preserve what public support for the program remains possible",
    ],
    expectedConcepts: [
      "lender of last resort",
      "conditionality",
      "sovereign default risk",
      "fiscal consolidation sequencing",
      "negotiating leverage under financing pressure",
    ],
    modelApproach:
      "A strong answer is realistic about the bond auction's actual odds of success given the debt-management office's own warning, and does not recommend gambling on it purely to avoid the political cost of accepting conditionality. It distinguishes firm preconditions from genuinely negotiable terms, pushes to negotiate the adjustment timeline and sequencing specifically where resistance is most likely to succeed, and is honest that a disorderly default would very likely cost more, fiscally and politically, than a negotiated program with difficult but survivable terms.",
    furtherReading: [
      "Conditionality in lender-of-last-resort financing programs",
      "Sovereign default risk and negotiating leverage in financing crises",
      "Sequencing fiscal consolidation under an external adjustment program",
    ],
    testsFundamentals: ["pol-econ-crisis-conditionality", "pol-econ-sovereign-debt-crisis", "pol-econ-austerity-political-backlash"],
  },
  {
    id: "pol-econ-loophole-closure-fiscal-gap",
    profession: "politics",
    category: "Economic & Fiscal Policy",
    title: "Closing a Tax Expenditure to Plug the Budget Gap",
    scenario:
      "Your finance ministry has identified a specific, long-standing tax expenditure, a preferential rate available to a narrow category of investment income, that costs the treasury a substantial and growing sum each year, disproportionately benefiting a small number of very high earners who structure their holdings to qualify. Closing it would meaningfully narrow your deficit without touching any broadly used program, but the affected group includes several politically influential donors and a trade association that has already begun lobbying against the change, warning it would discourage investment broadly even though the preference is narrowly targeted. Your budget committee needs a recommendation on whether to include the closure in this year's bill or defer it again, as has happened twice before.",
    keyIssues: [
      "Whether the investment-discouragement argument holds up given how narrowly the preference is actually targeted",
      "Fiscal credibility cost of deferring a identified, scoreable revenue measure for a third consecutive year",
      "Realistic assessment of the lobbying campaign's political weight against the diffuse fiscal benefit to the broader budget",
      "Transition design (grandfathering existing holdings, phased rate change) that could reduce resistance without abandoning the closure",
    ],
    expectedConcepts: [
      "tax expenditure reform",
      "preferential tax treatment",
      "revenue scoring",
      "concentrated-interest lobbying",
      "transition and grandfathering design",
    ],
    modelApproach:
      "A strong answer examines the investment-discouragement claim against the preference's actual narrow scope rather than accepting it at face value, and treats a third consecutive deferral as a real credibility cost to the budget process, not a free or neutral choice. It proposes a specific, phased closure design, such as grandfathering existing positions while ending the preference for new investment, that gives the measure a real chance of surviving the lobbying pressure intact.",
    furtherReading: [
      "Tax expenditure analysis and revenue scoring methodology",
      "Preferential tax treatment of investment income across jurisdictions",
      "Managing concentrated-interest opposition to revenue-raising reform",
    ],
    testsFundamentals: ["pol-econ-tax-expenditure-reform", "pol-econ-tax-incidence-design"],
  },
];
