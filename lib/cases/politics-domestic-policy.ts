import type { CaseStudy } from "@/lib/caseStudyContent";
import type { Fundamental } from "@/lib/caseStudyFundamentals";

/**
 * Politics / Domestic Policy: the fundamentals checklist and the case bank
 * for this category, kept together so they can be written and reviewed as
 * one unit. Registered in lib/cases/index.ts.
 */
export const POLITICS_DOMESTIC_POLICY_FUNDAMENTALS: Fundamental[] = [
  { id: "pol-domestic-policy-cycle", label: "Locating a live policy fight within the policy cycle (agenda-setting, formulation, adoption, implementation, evaluation) to diagnose where it is actually stuck" },
  { id: "pol-domestic-policy-window", label: "Applying multiple-streams theory to explain why a policy window has opened or closed and what that implies for timing" },
  { id: "pol-domestic-incrementalism", label: "Distinguishing incremental policy change from a punctuated-equilibrium moment and advising a client accordingly" },
  { id: "pol-domestic-subnational-implementation", label: "Assessing how devolution to regional or local government produces uneven implementation of a single national policy" },
  { id: "pol-domestic-street-level-discretion", label: "Diagnosing whether an implementation gap lives in the statute's design, the implementing agency's capacity, or frontline officials' discretion" },
  { id: "pol-domestic-cost-benefit-distributional", label: "Weighing a policy's aggregate net benefit against which specific, identifiable groups bear its concentrated costs" },
  { id: "pol-domestic-wilson-typology", label: "Classifying a reform as majoritarian, interest-group, client, or entrepreneurial politics to predict how hard the coming fight will be" },
  { id: "pol-domestic-coalition-building", label: "Assembling a legislative coalition through vote-trading and logrolling across otherwise unrelated priorities" },
  { id: "pol-domestic-policy-feedback", label: "Anticipating how an enacted program reshapes its own politics over time, building or eroding the coalition that defends it" },
  { id: "pol-domestic-executive-unilateral-action", label: "Weighing unilateral executive action against durable legislation when the legislature will not move, and naming the trade-off in permanence" },
  { id: "pol-domestic-evidence-based-evaluation", label: "Distinguishing correlation from causation when evaluating whether a program actually caused a claimed outcome" },
  { id: "pol-domestic-government-formation", label: "Navigating government-formation bargaining (coalition talks, an investiture or confidence vote) to secure a working majority" },
  { id: "pol-domestic-no-confidence-accountability", label: "Applying no-confidence or accountability mechanisms to constrain, or force concessions from, a government that has lost majority support" },
  { id: "pol-domestic-emergency-decree-power", label: "Judging when urgent executive decree power is justified versus an end-run around ordinary legislative deliberation" },
  { id: "pol-domestic-interest-group-consultation", label: "Running a formal consultation with affected interest groups and social partners before finalizing a policy proposal" },
  { id: "pol-domestic-expert-advisory-bodies", label: "Using an independent expert or inquiry commission to build the evidentiary and legitimacy basis for a contested policy" },
  { id: "pol-domestic-fiscal-rules-constraint", label: "Designing a policy proposal within binding fiscal rules (a debt limit or balanced-budget requirement) that constrain the budget available" },
  { id: "pol-domestic-subsidiarity", label: "Applying the principle that a decision should be taken at the lowest level of government capable of handling it effectively" },
  { id: "pol-domestic-legislative-deadlock-resolution", label: "Resolving deadlock between two chambers, or between the legislature and the executive, through a mediation or conciliation mechanism" },
  { id: "pol-domestic-referendum-deliberative-tools", label: "Deciding when to route a contested policy through a referendum or a deliberative citizens' body rather than ordinary legislation" },
];

export const POLITICS_DOMESTIC_POLICY_CASES: CaseStudy[] = [
  {
    id: "pol-domestic-healthcare-tradeoff",
    profession: "politics",
    category: "Domestic Policy",
    title: "The Healthcare Reform Trade-off",
    scenario:
      "Your proposed healthcare reform would expand coverage to 2 million currently uninsured residents, but independent budget analysis shows it requires either raising taxes on middle-income earners or running a significant deficit increase — both politically costly, and the second option may collide with a binding fiscal rule your government has committed to. Your coalition partners are divided on which trade-off is more acceptable, and neither is willing to simply accept the other's preferred financing. You must present a path forward to the head of government before the proposal goes to the legislature.",
    keyIssues: [
      "Genuine trade-off between coverage-expansion goals and fiscal or political cost",
      "Which constituencies bear the cost of each financing option and the political consequences",
      "Whether phased implementation could reduce the immediate fiscal or political shock",
      "Coalition management given genuine internal disagreement, not just messaging",
    ],
    expectedConcepts: [
      "fiscal impact analysis",
      "coalition politics",
      "policy phasing",
      "distributional impact",
      "political capital",
    ],
    modelApproach:
      "A strong answer doesn't pretend the trade-off doesn't exist, and instead proposes a specific way to manage it — such as phased implementation to spread fiscal impact, or a hybrid funding mechanism that distributes cost more broadly — while being explicit about the coalition management needed to hold the reform together politically.",
    furtherReading: [
      "Comparative healthcare financing models",
      "Policy phasing and implementation strategy",
      "Coalition government policy negotiation dynamics",
    ],
    testsFundamentals: ["pol-domestic-cost-benefit-distributional", "pol-domestic-coalition-building", "pol-domestic-fiscal-rules-constraint"],
  },
  {
    id: "pol-domestic-tax-reform",
    profession: "politics",
    category: "Domestic Policy",
    title: "Tax Reform: Growth vs. Equity",
    scenario:
      "Your finance ministry has proposed a corporate tax cut projected to boost investment and growth by economists across the political spectrum, but independent analysis also shows it would disproportionately benefit already-wealthy shareholders in the short term, worsening measured inequality before any broader benefit materializes. Opposition parties and part of your own base are attacking the plan as regressive, and a citizens' advisory panel convened last year specifically warned against exactly this kind of front-loaded benefit. You must defend or revise the policy before the finance committee vote.",
    keyIssues: [
      "Genuine economic trade-off between growth incentives and near-term distributional fairness",
      "Time-horizon mismatch: growth benefits materialize later than the distributional cost is felt",
      "Whether a complementary measure (e.g., targeted low-income relief) could address the equity critique without abandoning the growth policy",
      "Political credibility of the growth argument given historical cases where promised benefits didn't fully materialize",
    ],
    expectedConcepts: [
      "supply-side economics",
      "distributional analysis",
      "trickle-down critique",
      "tax incidence",
      "policy sequencing",
    ],
    modelApproach:
      "A strong answer doesn't dismiss the equity critique as merely political noise — it engages with the genuine time-horizon mismatch between growth benefits and distributional cost, and proposes pairing the corporate tax cut with a complementary measure that addresses near-term equity concerns directly, rather than relying solely on the growth argument.",
    furtherReading: [
      "Tax incidence analysis and distributional effects of corporate tax policy",
      "Empirical research on corporate tax cuts and investment/growth outcomes",
      "Policy sequencing and complementary measure design",
    ],
    testsFundamentals: ["pol-domestic-cost-benefit-distributional", "pol-domestic-expert-advisory-bodies"],
  },
  {
    id: "pol-domestic-benefits-website-rollout",
    profession: "politics",
    category: "Domestic Policy",
    title: "A Landmark Law's Rocky Launch",
    scenario:
      "Eighteen months ago the legislature adopted your flagship unemployment-support reform by a comfortable margin. The enrollment platform built to deliver it has now been live for three weeks and is failing under demand: wait times exceed two hours, a fifth of applications are lost, and opposition media is calling the entire reform a failure. Your technical staff say the underlying policy design is sound and the problem is a system built for a tenth of the actual traffic, with no budget allocated to fix it before the next reporting period. You must advise the minister on what to say publicly and what to actually fix.",
    keyIssues: [
      "Separating an adoption success from an implementation failure that is purely operational",
      "What resourcing and authority the implementing agency actually needs versus what it was given",
      "Managing public and media perception of a design problem versus a capacity problem",
      "Whether the failure risks curdling the political feedback the program needs to survive",
    ],
    expectedConcepts: [
      "policy cycle",
      "implementation capacity",
      "adoption vs. implementation",
      "agency resourcing",
      "public perception management",
    ],
    modelApproach:
      "A strong answer keeps adoption and implementation analytically separate, correctly diagnoses this as a capacity failure rather than a design flaw, and proposes a concrete fix (emergency resourcing, a phased re-launch, interim manual processing) rather than only a communications response, while flagging the risk that a botched rollout can undermine the political feedback the program will need later to survive.",
    furtherReading: [
      "The policy cycle: agenda-setting through evaluation",
      "Case studies in large-scale public-service platform rollouts",
      "Bureaucratic capacity and program implementation",
    ],
    testsFundamentals: ["pol-domestic-policy-cycle", "pol-domestic-street-level-discretion"],
  },
  {
    id: "pol-domestic-crisis-window-childcare",
    profession: "politics",
    category: "Domestic Policy",
    title: "A Narrow Window for Childcare Reform",
    scenario:
      "A national childcare-cost crisis has dominated the news for two weeks after a viral report on families leaving the workforce, and your ministry has had a fully drafted subsidized-childcare proposal sitting ready for three years without ever securing legislative time. Your chief of staff says the governing coalition's attention will move on within a month once the news cycle fades. A rival ministry wants to use the same media moment to push an unrelated pension proposal instead, arguing it is more likely to survive scrutiny. You have one slot on next week's cabinet agenda and must decide what to bring.",
    keyIssues: [
      "Whether the current moment is a genuine policy window rather than simply short-term media attention",
      "Opportunity cost of using scarce cabinet time on the ready proposal versus the rival's alternative",
      "Risk of the window closing before a proposal not yet drafted could realistically be ready",
      "How to sequence the announcement so it survives past the news cycle that opened the window",
    ],
    expectedConcepts: [
      "multiple streams framework",
      "policy entrepreneur",
      "problem stream vs. politics stream",
      "policy window",
      "opportunity cost",
    ],
    modelApproach:
      "A strong answer correctly identifies this as a genuine convergence of problem, policy, and politics streams, argues for moving the already-drafted proposal specifically because it is ready while the rival's is not, and addresses the risk that the window closes before implementation is secured, rather than treating media attention alone as sufficient justification.",
    furtherReading: [
      "Kingdon's multiple streams framework",
      "Policy entrepreneurship and timing",
      "Case studies in rapid post-crisis legislation",
    ],
    testsFundamentals: ["pol-domestic-policy-window"],
  },
  {
    id: "pol-domestic-pension-reform-pace",
    profession: "politics",
    category: "Domestic Policy",
    title: "Pension Reform: Gradual Adjustment or One Big Push",
    scenario:
      "Your country's pension system faces a demographic funding gap that actuaries project will require either a gradual, decade-long series of small adjustments to the retirement age and contribution rate, or a single comprehensive overhaul passed now while your coalition holds an unusually large majority. The gradual path avoids a single large political fight but has repeatedly stalled in the past under weaker governments. The comprehensive path risks a major public backlash and possible legal challenge, but a comparable government elsewhere used a similar majority to pass lasting reform. Your finance minister wants your recommendation before drafting begins.",
    keyIssues: [
      "Whether current conditions (majority size, public attention) constitute a genuine opportunity for large-scale change",
      "Track record of incremental reform in this specific policy area actually holding over time",
      "Risk that a large, rapid overhaul provokes a backlash that undoes more than gradual reform would have achieved",
      "How to use the current period, whichever path is chosen, to prepare the next round of adjustment",
    ],
    expectedConcepts: [
      "incrementalism",
      "punctuated equilibrium",
      "political capital",
      "policy durability",
      "reform sequencing",
    ],
    modelApproach:
      "A strong answer explicitly frames this as a choice between incremental and punctuated-equilibrium change, weighs the historical track record of incremental drift stalling in this area against the backlash risk of a single large reform, and gives a clear recommendation tied to how durable each path is likely to be rather than just which is easier to pass today.",
    furtherReading: [
      "Punctuated equilibrium theory in public policy",
      "Comparative pension reform case studies",
      "Political capital and reform timing",
    ],
    testsFundamentals: ["pol-domestic-incrementalism"],
  },
  {
    id: "pol-domestic-education-standards-variance",
    profession: "politics",
    category: "Domestic Policy",
    title: "One National Standard, Very Different Results",
    scenario:
      "Three years after the national legislature set a common minimum standard for school funding, an independent audit shows results vary dramatically by region: some regions have exceeded the standard using their own additional funds, while others provide only the bare minimum and a few have found technical grounds to delay compliance entirely. Parents in the lagging regions are demanding national intervention, while regional governments insist implementation is their constitutional responsibility. The education minister has asked you to recommend whether to intervene directly, and if so, how.",
    keyIssues: [
      "How much genuine discretion regional governments retain under the national floor, and what that implies about intervention options",
      "Whether uneven implementation reflects a deliberate design feature or a genuine equity failure",
      "Legal and political limits on central intervention into an area of regional or local authority",
      "Realistic tools to close the gap short of removing subnational discretion altogether",
    ],
    expectedConcepts: [
      "multi-level governance",
      "subnational implementation variance",
      "subsidiarity",
      "policy floor vs. ceiling",
      "intergovernmental relations",
    ],
    modelApproach:
      "A strong answer recognizes that a single national law can legitimately produce different regional outcomes because of the discretion the system grants subnational governments, weighs subsidiarity against the equity harm the variance is causing, and proposes a specific tool (conditional funding, technical assistance, public reporting) rather than simply calling for the floor to be enforced uniformly by fiat.",
    furtherReading: [
      "Multi-level governance and policy implementation variance",
      "The subsidiarity principle in comparative government",
      "Conditional grants as an intergovernmental policy tool",
    ],
    testsFundamentals: ["pol-domestic-subnational-implementation", "pol-domestic-subsidiarity"],
    premium: true,
  },
  {
    id: "pol-domestic-loophole-entrepreneurial-politics",
    profession: "politics",
    category: "Domestic Policy",
    title: "Closing a Loophole Nobody Will Thank You For",
    scenario:
      "You want to close a narrow tax loophole used by one concentrated industry that costs the treasury a meaningful sum each year; closing it would let you modestly cut taxes for every other taxpayer, each of whom would barely notice the saving. The affected industry has already mobilized a well-funded lobbying campaign and is threatening to relocate jobs to a neighboring jurisdiction. The diffuse public who would benefit has shown no organized interest in the issue at all. Your party leadership wants to know whether this fight is worth having before the budget committee finalizes next year's bill.",
    keyIssues: [
      "Classifying this fight correctly within the concentrated-cost, diffuse-benefit pattern and what that predicts about the odds",
      "Whether the diffuse public can realistically be mobilized to counter an organized, well-funded opponent",
      "Credibility of the relocation threat and how to test or blunt it",
      "Whether a modified proposal (phase-in, partial closure, compensating transition support) could reduce the intensity of opposition",
    ],
    expectedConcepts: [
      "concentrated costs vs. diffuse benefits",
      "entrepreneurial politics",
      "interest-group mobilization",
      "policy entrepreneur",
      "regulatory capture",
    ],
    modelApproach:
      "A strong answer names this explicitly as the entrepreneurial-politics pattern, where a concentrated group bears a visible cost for a diffuse public benefit, explains why the diffuse side structurally underorganizes, and proposes a specific tactic (building a public narrative, phasing the change, offsetting transition costs) to shift the odds rather than assuming public support alone will carry the reform.",
    furtherReading: [
      "James Q. Wilson's typology of regulatory politics",
      "Case studies in closing concentrated tax preferences",
      "Interest-group mobilization asymmetries",
    ],
    testsFundamentals: ["pol-domestic-wilson-typology"],
  },
  {
    id: "pol-domestic-subsidy-feedback-repeal",
    profession: "politics",
    category: "Domestic Policy",
    title: "A Popular Subsidy You Now Have to Unwind",
    scenario:
      "A universal home-energy subsidy your predecessor's government introduced five years ago is now consuming a growing share of the budget as energy prices have fallen and the original justification has weakened. Independent analysis recommends phasing it out, but enrollment has grown to cover most households, and an organized recipients' association has formed specifically to defend it, warning of serious backlash at the next election. Your finance minister wants it gone; your party's electoral strategists are warning against touching it. You must recommend how, or whether, to proceed.",
    keyIssues: [
      "Whether the subsidy shows genuine self-reinforcing feedback that makes repeal politically costly regardless of its merits",
      "Fiscal cost of maintaining a program whose original justification has weakened",
      "Whether a redesign (means-testing, gradual phase-out) is more survivable than outright repeal",
      "Electoral risk calculus given the recipients' association's organizing capacity",
    ],
    expectedConcepts: [
      "policy feedback",
      "self-reinforcing feedback",
      "path dependency",
      "means-testing",
      "electoral risk",
    ],
    modelApproach:
      "A strong answer applies policy feedback directly, recognizing that broad enrollment has created a real defending constituency that make simple repeal harder than the fiscal case alone would suggest, and proposes a specific redesign path (means-testing, a multi-year taper) that manages the political risk rather than treating repeal and full retention as the only two options.",
    furtherReading: [
      "Pierson's theory of policy feedback and path dependency",
      "Means-testing design in universal benefit programs",
      "Comparative case studies in subsidy phase-outs",
    ],
    testsFundamentals: ["pol-domestic-policy-feedback"],
    premium: true,
  },
  {
    id: "pol-domestic-decree-housing-emergency",
    profession: "politics",
    category: "Domestic Policy",
    title: "Acting Fast on Housing Without the Legislature",
    scenario:
      "A sudden spike in housing costs is driving visible public anger, and your government has an urgent decree power it could use to impose a temporary rent cap immediately, bypassing the ordinary weeks-long legislative process. The legislature is currently unable to act quickly because of an unrelated procedural dispute, but the opposition has signaled it will challenge any decree as an overreach of executive authority once the immediate emergency justification is questioned. Legal advisors say the decree would likely survive an initial challenge but its long-term durability is uncertain. The head of government wants a recommendation today.",
    keyIssues: [
      "Whether the situation genuinely meets the threshold for emergency decree power rather than ordinary political urgency",
      "Trade-off between speed now and the legal and political durability of an action bypassing the legislature",
      "Risk that a successful legal challenge later undoes both the policy and the government's credibility",
      "Whether pursuing the decree while simultaneously seeking ordinary legislative ratification reduces the risk",
    ],
    expectedConcepts: [
      "emergency decree power",
      "executive unilateral action",
      "legal durability of executive action",
      "separation of powers",
      "sunset provisions",
    ],
    modelApproach:
      "A strong answer weighs the genuine urgency against the legal and political fragility of acting by decree, recommends pairing the decree with a concrete path to legislative ratification or a clear sunset clause, and is explicit that unilateral action here is a faster but structurally weaker substitute for a genuine law rather than a costless shortcut.",
    furtherReading: [
      "Executive decree power and its constitutional limits",
      "Unilateral executive action versus legislation",
      "Sunset clauses in emergency legislation",
    ],
    testsFundamentals: ["pol-domestic-emergency-decree-power", "pol-domestic-executive-unilateral-action"],
    premium: true,
  },
  {
    id: "pol-domestic-jobtraining-evaluation",
    profession: "politics",
    category: "Domestic Policy",
    title: "Does the Flagship Jobs Program Actually Work",
    scenario:
      "Your government's signature job-training program shows participants finding employment at a notably higher rate than non-participants in simple before-and-after comparisons, and ministers have cited this repeatedly as proof of success while requesting a budget increase. An independent research office has now completed a randomized evaluation showing the true causal effect is much smaller than claimed, largely because the kind of person who enrolls was already more likely to find work regardless. Advocates for the program are disputing the new study's relevance. You must advise the minister on how to respond before the budget committee hearing.",
    keyIssues: [
      "Distinguishing the correlation in the original before-and-after comparisons from the causal estimate in the randomized evaluation",
      "Selection effects: what kind of person enrolls, and why that inflates simple comparisons",
      "Political cost of acknowledging a flagship program's overstated impact versus continuing to cite weak evidence",
      "Whether a credible response is redesigning the program, targeting it differently, or defending it as-is",
    ],
    expectedConcepts: [
      "correlation vs. causation",
      "selection bias",
      "randomized evaluation",
      "evidence-based policy",
      "program redesign",
    ],
    modelApproach:
      "A strong answer takes the randomized evidence seriously rather than dismissing it to protect the program's political narrative, explains clearly why the earlier before-and-after comparison overstated impact through selection effects, and proposes a specific evidence-based next step (retargeting the program to the population it actually helps, a redesign, a smaller renewed pilot) rather than simply requesting the same budget increase.",
    furtherReading: [
      "Randomized controlled trials in active labor market policy",
      "Selection bias in program evaluation",
      "Evidence-based policymaking and political incentives",
    ],
    testsFundamentals: ["pol-domestic-evidence-based-evaluation"],
  },
  {
    id: "pol-domestic-coalition-formation-to-confidence",
    profession: "politics",
    category: "Domestic Policy",
    title: "A Fragile Coalition Faces Its First Test",
    scenario:
      "Six months ago you formed a government after a closely fought election left no party with a majority, securing support from two smaller parties only after conceding a minimum-wage increase to one and a specific regional infrastructure commitment to the other — concessions your own finance minister warned were fiscally awkward together. Opposition parties have now announced a no-confidence motion over a deteriorating domestic housing crisis, and early counts suggest a handful of your own coalition's backbenchers may defect unless you offer a further concession, this time on housing, that could strain the original coalition bargain even further. You have four days before the vote and must advise the head of government on strategy.",
    keyIssues: [
      "Whether the original coalition bargain is fiscally and politically coherent enough to absorb a further concession without breaking down",
      "Realistic vote count and which specific legislators are actually persuadable versus firmly committed either way",
      "Trade-off between a new concession that wins the no-confidence vote and undermining the coherence of the government's program",
      "Consequences if the motion succeeds and government formation would have to restart from scratch",
    ],
    expectedConcepts: [
      "coalition formation",
      "no-confidence motion",
      "government durability",
      "policy concession bargaining",
      "backbench defection",
    ],
    modelApproach:
      "A strong answer treats this as one continuous coalition-management problem rather than a fresh crisis: it assesses whether the original formation bargain can actually absorb another concession without collapsing, gives a realistic read on which votes are movable, and weighs the cost of a further concession against the cost of losing the confidence vote and repeating the formation process from scratch.",
    furtherReading: [
      "Comparative coalition-formation theory",
      "No-confidence procedures across parliamentary systems",
      "Coalition durability and sequential concession bargaining",
    ],
    testsFundamentals: ["pol-domestic-government-formation", "pol-domestic-no-confidence-accountability"],
    premium: true,
  },
  {
    id: "pol-domestic-social-partner-consultation",
    profession: "politics",
    category: "Domestic Policy",
    title: "Consulting the Social Partners on Labor Reform",
    scenario:
      "Your labor ministry has drafted a reform loosening certain employment-protection rules to encourage hiring, and formal procedure requires a structured consultation with employer associations and labor unions before the bill can proceed. Early soundings suggest employers broadly support the draft while unions strongly oppose specific provisions and are threatening coordinated public opposition, including possible industrial action, if their objections are ignored. You have a fixed consultation window before the bill must be finalized for submission. You must decide how to run the consultation and what, if anything, to change in response.",
    keyIssues: [
      "Whether the consultation is a genuine opportunity to improve and legitimize the bill or a formality to be managed",
      "Which union objections reflect a substantive design flaw versus a negotiating opening position",
      "Risk of proceeding without meaningful concessions versus diluting the reform's intended effect",
      "How the outcome of consultation affects the bill's later chances in the legislature",
    ],
    expectedConcepts: [
      "social partnership",
      "formal interest-group consultation",
      "tripartite bargaining",
      "industrial action risk",
      "policy legitimacy",
    ],
    modelApproach:
      "A strong answer treats the consultation as substantively important rather than a box-ticking step, separates union objections that point to a genuine design problem from ones that are opening bargaining positions, and proposes a specific, limited set of concessions that preserves the reform's core purpose while reducing the risk of coordinated opposition derailing it later.",
    furtherReading: [
      "Tripartite social partnership and labor-market reform",
      "Formal interest-group consultation procedures",
      "Managing organized opposition during policy drafting",
    ],
    testsFundamentals: ["pol-domestic-interest-group-consultation"],
  },
  {
    id: "pol-domestic-deadlock-or-referendum",
    profession: "politics",
    category: "Domestic Policy",
    title: "When the Chambers Can't Agree, Do You Go to the Public",
    scenario:
      "Your government's flagship environmental-standards bill has passed the lower chamber of the legislature but has been substantially amended by an upper chamber your coalition does not control, and neither version can pass the other as written. A formal mediation mechanism exists to reconcile the two versions but has a mixed track record of producing agreement in time, and the legislative session's deadline is three weeks away, after which the bill would have to restart from scratch next term. A minister has proposed a different route entirely: shelving the bicameral process and putting the core question directly to a binding referendum, arguing the public would resolve it faster and more durably than either chamber will. You must recommend a strategy to the bill's sponsor.",
    keyIssues: [
      "Realistic chances the mediation mechanism produces an agreement given each chamber's actual position and the time available",
      "Whether the underlying question is genuinely suited to a public referendum or is a technical dispute a public vote would handle badly",
      "Legitimacy and durability differences between a mediated legislative compromise and a referendum result",
      "Cost of the bill failing entirely if neither route succeeds before the deadline",
    ],
    expectedConcepts: [
      "bicameral deadlock",
      "mediation/conciliation committee",
      "referendum design",
      "policy legitimacy",
      "legislative bargaining",
    ],
    modelApproach:
      "A strong answer assesses whether the mediation mechanism can realistically deliver within the deadline given each chamber's actual position, and treats the referendum proposal as a genuine alternative to be judged on whether this is the kind of question a public vote can legitimately and competently resolve, rather than simply a faster escape from a difficult negotiation.",
    furtherReading: [
      "Bicameral conflict resolution and mediation committees",
      "Referendums and direct democracy in comparative politics",
      "Legitimacy and durability of different decision mechanisms",
    ],
    testsFundamentals: ["pol-domestic-legislative-deadlock-resolution", "pol-domestic-referendum-deliberative-tools"],
    premium: true,
  },
];
