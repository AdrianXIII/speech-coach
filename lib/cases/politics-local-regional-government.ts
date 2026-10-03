import type { CaseStudy } from "@/lib/caseStudyContent";
import type { Fundamental } from "@/lib/caseStudyFundamentals";

/**
 * Politics / Local & Regional Government: the fundamentals checklist and the
 * case bank for this category, kept together so they can be written and
 * reviewed as one unit. Registered in lib/cases/index.ts.
 */
export const POLITICS_LOCAL_REGIONAL_GOVERNMENT_FUNDAMENTALS: Fundamental[] = [
  { id: "pol-localgov-own-source-revenue-constraints", label: "Designing a local budget or service commitment within binding local fiscal constraints (a property-tax cap, a balanced-budget requirement, a legal spending limit)" },
  { id: "pol-localgov-intergovernmental-transfers", label: "Managing dependence on transfers or grants from a higher level of government, including the trade-off between conditional and unconditional funding" },
  { id: "pol-localgov-jurisdiction-dispute", label: "Resolving a dispute between local, regional, and national authority over which level of government actually has the legal power to act" },
  { id: "pol-localgov-preemption", label: "Responding when a higher level of government overrides or preempts a local policy choice the local government had already made" },
  { id: "pol-localgov-equalization", label: "Navigating fiscal equalization mechanisms that redistribute revenue between wealthier and poorer regions or localities, and the political resentment they can generate" },
  { id: "pol-localgov-intermunicipal-cooperation", label: "Structuring intermunicipal cooperation or shared-service arrangements to overcome the scale limitations of a small jurisdiction" },
  { id: "pol-localgov-consolidation-annexation", label: "Weighing municipal consolidation, merger, or annexation against the value of preserving local autonomy and identity" },
  { id: "pol-localgov-land-use-zoning", label: "Balancing local land-use and zoning authority against a regional or national policy goal, such as housing supply or infrastructure siting" },
  { id: "pol-localgov-capital-debt-financing", label: "Financing capital investment (infrastructure, schools, transit) within legal subnational borrowing limits and real credit-market constraints" },
  { id: "pol-localgov-economic-development-incentives", label: "Evaluating a competitive economic-development incentive against the risk of a race-to-the-bottom bidding war with a neighboring jurisdiction" },
  { id: "pol-localgov-regional-disparity", label: "Responding to sustained political pressure from persistent economic disparity between regions or localities within the same country" },
  { id: "pol-localgov-asymmetric-autonomy", label: "Managing a demand for expanded or asymmetric autonomy from a historically, linguistically, or economically distinct region" },
  { id: "pol-localgov-service-accountability-gap", label: "Staying accountable to local voters for a service outcome that depends partly on funding or rules set by a higher level of government outside local control" },
  { id: "pol-localgov-executive-council-relations", label: "Managing the relationship between a local executive (a mayor or equivalent) and an elected council or assembly, including building a working majority on it" },
  { id: "pol-localgov-disaster-capacity-gap", label: "Recognizing when a local government's own capacity is overwhelmed in an emergency and requesting help from a regional or national level without losing operational control" },
  { id: "pol-localgov-collective-advocacy", label: "Organizing local or regional governments collectively to lobby a national government for funding, legal authority, or a policy change" },
  { id: "pol-localgov-administrative-capacity", label: "Diagnosing and addressing a mismatch between a small jurisdiction's administrative capacity and the responsibilities it has been assigned" },
  { id: "pol-localgov-local-referendum", label: "Deciding when to route a contested local decision through a local referendum or participatory mechanism rather than an ordinary council vote" },
];

export const POLITICS_LOCAL_REGIONAL_GOVERNMENT_CASES: CaseStudy[] = [
  {
    id: "pol-localgov-balanced-budget-cap",
    profession: "politics",
    category: "Local & Regional Government",
    title: "Balancing the Books Under a Legal Cap",
    scenario:
      "You run the finance office for a mid-sized city whose own-source revenue is constrained by a legal cap on how much its main local tax can rise each year without a special vote. Costs for policing, waste collection, and road maintenance are rising faster than that cap allows, and a structural deficit is now projected within three budget cycles if nothing changes. Raising fees for services the city already controls would help but is politically unpopular, and the council is reluctant to put a cap override to a public vote so soon after the last one failed. You must present the council with a credible path to a balanced budget before the legal filing deadline in six weeks.",
    keyIssues: [
      "Whether the structural gap is actually closeable within the existing legal revenue cap or genuinely requires new revenue authority",
      "Which service cuts or fee increases are least politically and operationally damaging if the cap cannot be raised in time",
      "Timing and framing of any request to override the cap, given the recent failed vote",
      "Risk of deferring the problem through one-time measures that reappear worse in the next budget cycle",
    ],
    expectedConcepts: [
      "own-source revenue constraints",
      "structural versus cyclical deficit",
      "balanced-budget requirement",
      "fee-for-service financing",
      "political capital and ballot timing",
    ],
    modelApproach:
      "A strong answer treats the legal cap as a genuine binding constraint rather than an obstacle to argue around, separates one-time fixes from a durable structural solution, and gives a specific, sequenced recommendation — for example, a mix of targeted fee increases the council can enact on its own authority now, paired with a longer-term case for a cap override once the political groundwork has been rebuilt, rather than presenting the override as the only option on a compressed timeline.",
    furtherReading: [
      "Local tax and expenditure limitations and their effect on municipal budgeting",
      "Structural versus cyclical deficits in subnational government finance",
      "Case studies in municipal fee-for-service financing",
    ],
    testsFundamentals: ["pol-localgov-own-source-revenue-constraints", "pol-localgov-capital-debt-financing"],
  },
  {
    id: "pol-localgov-grant-with-strings",
    profession: "politics",
    category: "Local & Regional Government",
    title: "A Grant With Strings Attached",
    scenario:
      "The national government has offered your region a substantial multi-year grant for public transit expansion, but acceptance requires adopting specific route and fare rules the regional assembly did not design and that would override a locally popular low-fare policy for low-income riders. Declining the grant means the transit expansion simply does not happen, since the region cannot finance it from its own revenue alone. Accepting it on the national government's terms would let opposition councillors accuse you of surrendering local control over a program voters associate with your administration. You must recommend whether to accept the grant, and on what terms, before the funding window closes next month.",
    keyIssues: [
      "Genuine trade-off between a program that cannot otherwise be built and the policy control surrendered to secure its funding",
      "Whether the grant's conditions can be negotiated or phased rather than accepted or rejected wholesale",
      "Political cost of appearing to cede local authority versus the cost of forgoing the investment entirely",
      "Long-term dependence this creates on continued national funding for the program's operating costs, not just its construction",
    ],
    expectedConcepts: [
      "conditional versus unconditional transfers",
      "intergovernmental grant negotiation",
      "local policy autonomy",
      "program sustainability after construction funding ends",
      "political accountability for outcomes outside local control",
    ],
    modelApproach:
      "A strong answer does not treat this as a simple accept-or-reject choice — it explores whether the conditions are genuinely fixed or open to negotiation, weighs the low-fare policy's importance against the real cost of building nothing at all, and flags the less visible risk that ongoing operating costs, not just the upfront grant, will tie the region to national conditions well beyond this one funding cycle.",
    furtherReading: [
      "Conditional versus unconditional intergovernmental transfers",
      "Negotiating grant conditions in subnational infrastructure financing",
      "The sustainability of locally popular programs built on externally funded capital grants",
    ],
    testsFundamentals: ["pol-localgov-intergovernmental-transfers", "pol-localgov-service-accountability-gap"],
  },
  {
    id: "pol-localgov-who-has-authority",
    profession: "politics",
    category: "Local & Regional Government",
    title: "Who Actually Has the Authority Here",
    scenario:
      "Your city council passed a strict registration and capacity limit on short-term vacation rentals after sustained complaints about housing shortages and neighborhood disruption. A regional tourism agency and several national-level officials argue the regulation of accommodation falls under regional or national economic-policy authority, not local land-use power, and are threatening to have the rule struck down or overridden. Legal opinion within your own office is divided on whether the city's land-use authority genuinely covers this kind of restriction or whether it strays into an area reserved for a higher level of government. Platform operators are meanwhile ignoring the rule pending the outcome. You must advise the council on how to defend the regulation and what, if anything, to change.",
    keyIssues: [
      "Whether the regulation is genuinely within the city's land-use authority or oversteps into a reserved regional or national competence",
      "Risk of continuing to enforce a rule whose legal authority is seriously contested",
      "Whether a narrower version of the rule would survive a jurisdictional challenge that the current version might not",
      "How to engage the regional and national actors before the dispute escalates to formal legal conflict",
    ],
    expectedConcepts: [
      "division of competence between levels of government",
      "land-use and zoning authority",
      "jurisdictional challenge",
      "regulatory scope and legal risk",
      "intergovernmental negotiation before litigation",
    ],
    modelApproach:
      "A strong answer takes the jurisdictional question seriously on its own legal merits rather than assuming the city's authority is self-evident, distinguishes which specific provisions of the rule are most clearly within local land-use power from those that reach further, and recommends engaging the regional and national actors directly to narrow the dispute before it hardens into a costly and uncertain legal fight.",
    furtherReading: [
      "Division of legislative and regulatory competence between levels of government",
      "Local land-use authority and its limits",
      "Short-term rental regulation across comparative subnational systems",
    ],
    testsFundamentals: ["pol-localgov-jurisdiction-dispute", "pol-localgov-preemption"],
  },
  {
    id: "pol-localgov-zoning-overridden",
    profession: "politics",
    category: "Local & Regional Government",
    title: "The Higher Level Just Overrode Your Zoning Law",
    scenario:
      "After a years-long local process, your city adopted a zoning plan that deliberately limited building height in several neighborhoods to preserve their character, over the objections of housing advocates. The regional or national government has now passed a law requiring cities to permit higher-density housing near transit corridors to address a worsening regional housing shortage, which would override key parts of your city's own zoning plan without requiring further local approval. Several council members want to resist implementation and explore a legal challenge; housing advocates and some residents support the override as the only realistic way to add supply. You must advise the mayor's office on how to respond before the override's compliance deadline.",
    keyIssues: [
      "Legal and political limits on a city's ability to resist a lawful override of its own zoning authority",
      "Whether to comply fully, seek a negotiated modification, or mount a legal challenge, and the realistic odds of each",
      "Balancing the neighborhood-character rationale for the original zoning against the regional housing-shortage rationale for the override",
      "How to communicate the shift to residents who participated in good faith in the original local planning process",
    ],
    expectedConcepts: [
      "preemption of local authority",
      "housing supply policy",
      "zoning and land-use authority",
      "subsidiarity versus regional-scale problems",
      "local planning legitimacy",
    ],
    modelApproach:
      "A strong answer is honest about the real legal limits on resisting a lawful override rather than promising residents a fight likely to fail, weighs whether the regional housing shortage is genuinely the kind of problem that justifies overriding local control, and proposes a specific path — negotiated compliance, a narrowly tailored legal challenge, or a modified local implementation — rather than simply defying or fully capitulating to the override.",
    furtherReading: [
      "State and national preemption of local zoning authority",
      "Housing-supply mandates near transit corridors in comparative planning law",
      "The subsidiarity principle applied to land-use decisions with regional spillover effects",
    ],
    testsFundamentals: ["pol-localgov-preemption", "pol-localgov-land-use-zoning"],
    premium: true,
  },
  {
    id: "pol-localgov-equalization-resentment",
    profession: "politics",
    category: "Local & Regional Government",
    title: "Why Should the Rich Region Subsidize the Poor One",
    scenario:
      "You govern one of the country's wealthiest regions, which contributes a large net amount into a fiscal equalization system that redistributes revenue to poorer regions so they can fund comparable public services. A populist movement within your own region is gaining support by arguing the region should keep more of what it raises, pointing to years of net contributions that it says have not been matched by any visible benefit at home. National officials warn that reducing your region's contribution would force real service cuts in several poorer regions that depend on it. You must decide how to respond publicly and what, if anything, to propose changing about the system before the issue dominates the next regional election.",
    keyIssues: [
      "Whether the resentment reflects a genuine design flaw in the equalization formula or a political narrative that outpaces the actual facts",
      "Trade-off between defending the system's national solidarity rationale and responding to real grievances within your own region",
      "Realistic political and economic consequences if the system were weakened or your region's contribution were cut",
      "Whether a modified formula or added transparency could address the grievance without abandoning equalization's purpose",
    ],
    expectedConcepts: [
      "fiscal equalization",
      "interregional redistribution",
      "regional populism",
      "solidarity versus self-interest framing",
      "formula transparency and reform",
    ],
    modelApproach:
      "A strong answer does not dismiss the grievance as simply uninformed, and instead examines honestly whether the formula's design or its lack of visible local benefit is driving the resentment, defends the equalization system's underlying rationale while acknowledging its real political cost in the wealthier region, and proposes a specific, limited reform (greater transparency, a visible local offset, a formula adjustment) rather than either an unexplained defense of the status quo or a populist capitulation.",
    furtherReading: [
      "Comparative fiscal equalization systems between regions",
      "Political economy of interregional redistribution and separatist sentiment",
      "Reform options for equalization formula transparency",
    ],
    testsFundamentals: ["pol-localgov-equalization", "pol-localgov-regional-disparity"],
  },
  {
    id: "pol-localgov-shared-services-small-towns",
    profession: "politics",
    category: "Local & Regional Government",
    title: "Nine Small Towns, One Overworked Fire Department",
    scenario:
      "Nine small, neighboring municipalities each run their own tiny fire and emergency-response department, several with aging equipment and crews too thin to meet the response-time standard required by regulation. A regional official has proposed a shared-service arrangement that would merge the departments into a single regional authority with pooled funding and equipment, which modeling shows would meet the standard at a lower total cost. Several town councils resist, citing loss of local control over a service residents strongly identify with, and two towns worry they would end up subsidizing the others in any shared arrangement. You are advising the regional official on how to design and pitch a shared-service agreement that could actually secure the needed local approvals.",
    keyIssues: [
      "Whether the cost and coverage case for consolidation is strong enough to overcome the identity and control concerns driving local resistance",
      "Designing a cost-sharing formula that does not leave any single town clearly subsidizing the others",
      "What local control each town could realistically retain (station locations, a seat on a joint board) within a shared structure",
      "Sequencing: whether a smaller pilot arrangement among a subset of towns could build trust before a full nine-town agreement",
    ],
    expectedConcepts: [
      "intermunicipal cooperation",
      "shared-service agreements",
      "economies of scale in small jurisdictions",
      "cost-sharing formula design",
      "local identity and service control",
    ],
    modelApproach:
      "A strong answer takes the identity and control objections seriously rather than treating them as mere inefficiency to be argued away, proposes a concrete governance structure that gives each town a genuine voice (such as a joint board with proportional representation) and a transparent, defensible cost-sharing formula, and considers a phased or pilot approach among a smaller group of towns to demonstrate the arrangement works before asking all nine to commit at once.",
    furtherReading: [
      "Intermunicipal cooperation and shared-service agreements",
      "Economies of scale and administrative capacity in small local governments",
      "Governance design for joint regional service authorities",
    ],
    testsFundamentals: ["pol-localgov-intermunicipal-cooperation", "pol-localgov-administrative-capacity"],
  },
  {
    id: "pol-localgov-merging-rival-towns",
    profession: "politics",
    category: "Local & Regional Government",
    title: "Merging Two Rival Towns",
    scenario:
      "Two adjoining towns with a long history of friendly rivalry are both too small to afford modern water and sewer infrastructure on their own, and a regional government has offered a one-time grant to fund the upgrade only if the towns formally merge into a single municipality within two years. One town's council strongly favors the merger as the only realistic way to secure the infrastructure funding; the other's council fears losing its name, its separately elected council seats, and its distinct local identity, even though its own finances are in worse shape. A non-binding referendum in each town is scheduled before any final council vote. You are advising the council most skeptical of the merger on how to approach the decision.",
    keyIssues: [
      "Whether the infrastructure need genuinely requires full consolidation or could be met through a lesser form of cooperation",
      "What identity, representation, and service guarantees could realistically be negotiated into a merger agreement",
      "How the weaker town's finances affect its real bargaining position despite its council's reluctance",
      "How to use the referendum result to inform, rather than simply ratify or block, the council's eventual decision",
    ],
    expectedConcepts: [
      "municipal consolidation",
      "local identity and representation",
      "negotiated merger terms",
      "fiscal capacity disparities between merging jurisdictions",
      "participatory local decision-making",
    ],
    modelApproach:
      "A strong answer does not treat preserving the town's name and council seats as more important than a realistic assessment of its finances, explores whether specific identity and representation guarantees could be negotiated into the merger terms, and uses the referendum as a genuine input to the council's judgment rather than either overriding it or hiding behind it to avoid making a hard call.",
    furtherReading: [
      "Municipal consolidation and merger case studies",
      "Negotiating representation and identity guarantees in local government mergers",
      "The role of local referendums in consolidation decisions",
    ],
    testsFundamentals: ["pol-localgov-consolidation-annexation", "pol-localgov-local-referendum"],
    premium: true,
  },
  {
    id: "pol-localgov-incentive-bidding-war",
    profession: "politics",
    category: "Local & Regional Government",
    title: "A Bidding War for the New Factory",
    scenario:
      "A major manufacturer is choosing among three neighboring regions for a new factory promising thousands of jobs, and each region's government is independently offering escalating tax breaks and infrastructure subsidies to win it. Your region's finance office projects that the incentive package now under consideration would take over a decade to pay for itself even under optimistic job-creation assumptions, and a neighboring region has just signaled it may go even further. Your economic-development team argues losing the factory to a neighbor would be a visible political failure regardless of the incentive's actual value. You must advise the regional government on whether to escalate the offer, hold firm, or withdraw from the competition.",
    keyIssues: [
      "Whether the incentive's true long-term cost outweighs the political and economic value of winning the factory",
      "Risk that escalating further simply continues a race to the bottom with little actual control over the outcome",
      "Whether a different kind of offer (workforce training, infrastructure useful regardless of this specific deal) could be more defensible than a pure tax concession",
      "How to manage the political cost of appearing to lose to a neighboring region regardless of the substantive decision",
    ],
    expectedConcepts: [
      "economic-development incentive competition",
      "race to the bottom",
      "incentive payback analysis",
      "regional interjurisdictional competition",
      "political cost of visible economic losses",
    ],
    modelApproach:
      "A strong answer is willing to recommend walking away from a deal whose numbers do not work, even at real political cost, rather than escalating indefinitely in a competition with no natural floor, and looks for an alternative offer structured around durable regional assets rather than an open-ended subsidy that a neighbor can simply outbid again next time.",
    furtherReading: [
      "Economic-development incentive competition between subnational jurisdictions",
      "Race-to-the-bottom dynamics in interjurisdictional tax competition",
      "Cost-benefit analysis of large firm-specific subsidy packages",
    ],
    testsFundamentals: ["pol-localgov-economic-development-incentives", "pol-localgov-regional-disparity"],
  },
  {
    id: "pol-localgov-autonomy-demand",
    profession: "politics",
    category: "Local & Regional Government",
    title: "The Region Wants More Autonomy",
    scenario:
      "A region with a distinct history, language, or economic base already holds more devolved authority than most other regions in the country, and its governing coalition has just won re-election on a platform demanding further powers over taxation and policing that would make its autonomy still more asymmetric relative to other regions. The national government worries that granting the request will fuel similar demands elsewhere and destabilize the broader territorial settlement, while refusing it risks hardening support for a more radical independence movement within the region itself. You are advising the national government on how to respond to the region's formal request within the next parliamentary session.",
    keyIssues: [
      "Whether granting further asymmetric powers to this region is politically sustainable given likely demands from other regions",
      "Risk that refusing the request strengthens, rather than weakens, support for a more radical push toward independence",
      "What specific powers could realistically be devolved without destabilizing the broader territorial settlement",
      "How to sequence any response to avoid either appearing to reward separatist pressure or dismissing a legitimate democratic mandate",
    ],
    expectedConcepts: [
      "asymmetric devolution",
      "territorial settlement stability",
      "regional autonomy demands",
      "separatist versus autonomist political dynamics",
      "intergovernmental negotiation over competence transfer",
    ],
    modelApproach:
      "A strong answer does not treat the request as simply a yes-or-no question, and instead examines which specific powers could be devolved with manageable spillover risk to the rest of the territorial settlement, takes seriously the risk that refusal strengthens more radical separatist sentiment, and proposes a negotiating path that distinguishes defensible asymmetric devolution from precedent-setting concessions the national government genuinely cannot sustain elsewhere.",
    furtherReading: [
      "Asymmetric devolution in comparative territorial politics",
      "The relationship between autonomist concessions and separatist movements",
      "Case studies in negotiated competence transfer between national and regional governments",
    ],
    testsFundamentals: ["pol-localgov-asymmetric-autonomy", "pol-localgov-jurisdiction-dispute"],
    premium: true,
  },
  {
    id: "pol-localgov-council-wont-pass-budget",
    profession: "politics",
    category: "Local & Regional Government",
    title: "The Council Won't Pass Your Budget",
    scenario:
      "You lead a city government whose party holds the mayor's office but not a majority on the elected council, and your proposed annual budget has failed twice on preliminary votes as opposition councillors demand changes you consider unaffordable under the city's legal balanced-budget deadline, now three weeks away. A handful of councillors from a smaller faction have signaled they might support the budget in exchange for a specific capital project in their district that was not originally included. Missing the deadline would trigger an automatic, less favorable interim budget set by regional rules. You must decide how far to negotiate and with whom before the deadline arrives.",
    keyIssues: [
      "Realistic vote count and which councillors are genuinely persuadable versus firmly opposed regardless of concessions",
      "Whether the requested capital project is an affordable, defensible concession or a precedent that invites further demands",
      "Cost of missing the legal deadline and triggering the less favorable default budget",
      "How to manage the optics of a visible concession to a small faction in exchange for its votes",
    ],
    expectedConcepts: [
      "mayor-council relations",
      "minority administration bargaining",
      "balanced-budget deadline",
      "vote-trading on a local budget",
      "default or interim budget provisions",
    ],
    modelApproach:
      "A strong answer treats this as a genuine vote-counting and negotiation problem rather than a messaging problem, distinguishes councillors who are actually movable from those who are not, weighs the specific concession honestly against both its affordability and the precedent it sets, and is explicit about why missing the deadline and defaulting to the interim budget would be worse than the concession under discussion.",
    furtherReading: [
      "Mayor-council government and minority administration bargaining",
      "Balanced-budget deadlines and default budget provisions in local government law",
      "Case studies in local legislative vote-trading",
    ],
    testsFundamentals: ["pol-localgov-executive-council-relations", "pol-localgov-own-source-revenue-constraints"],
  },
  {
    id: "pol-localgov-storm-overwhelmed-city",
    profession: "politics",
    category: "Local & Regional Government",
    title: "The Storm Overwhelmed Your Small City",
    scenario:
      "A severe storm has knocked out power and damaged roads across your small city, and your public works department, sized for routine maintenance, cannot clear debris and restore access fast enough to prevent a second night of outages for vulnerable residents. The regional government has emergency crews and equipment available but requires a formal request and has its own competing demands from other affected municipalities that night. Accepting regional help means temporarily working under coordination arrangements your own staff has never used before. Local officials are under pressure to show residents the city is handling the crisis itself. You must decide tonight whether and how to request regional assistance.",
    keyIssues: [
      "Recognizing that the city's own capacity is genuinely insufficient rather than waiting too long to ask for help",
      "How to request and prioritize regional assistance when other municipalities are competing for the same limited crews and equipment",
      "Operational risk of integrating unfamiliar regional coordination arrangements into an active response",
      "Balancing the political instinct to appear self-sufficient against the practical need for outside help",
    ],
    expectedConcepts: [
      "local emergency capacity limits",
      "requesting regional mutual aid",
      "resource competition across affected jurisdictions",
      "unified coordination under crisis conditions",
      "political optics of accepting outside assistance",
    ],
    modelApproach:
      "A strong answer does not let the instinct to appear self-sufficient delay an honest recognition that the city's own capacity is insufficient, requests regional assistance promptly and makes a specific, defensible case for priority given competing demands that night, and treats the unfamiliar coordination arrangement as a manageable operational risk to work through rather than a reason to decline help altogether.",
    furtherReading: [
      "Local emergency management capacity and mutual aid requests",
      "Resource prioritization across competing municipal requests during regional emergencies",
      "Coordination protocols between local and regional emergency authorities",
    ],
    testsFundamentals: ["pol-localgov-disaster-capacity-gap", "pol-localgov-intergovernmental-transfers"],
    premium: true,
  },
  {
    id: "pol-localgov-collective-advocacy-funding",
    profession: "politics",
    category: "Local & Regional Government",
    title: "Getting Every Mayor to Agree on One Ask",
    scenario:
      "You coordinate an association representing dozens of city and town governments that all depend on a national infrastructure fund facing a proposed cut. Larger cities want the association to prioritize restoring funding for transit systems; smaller towns want the priority to be rural road maintenance, which matters far more to them but is a smaller line item nationally. The association's credibility with the national government depends on presenting a single, unified ask rather than competing requests from its own members. You have one meeting with national budget officials before the funding decision is finalized, and you must decide what the association's single request will be.",
    keyIssues: [
      "Whether a genuinely unified ask is possible without simply favoring the association's largest or most influential members",
      "Risk that presenting competing priorities undermines the association's credibility and leverage with national officials",
      "Realistic assessment of which single ask is most likely to succeed given the national government's own constraints",
      "How to manage internal dissent from members whose priority does not become the association's final position",
    ],
    expectedConcepts: [
      "collective subnational advocacy",
      "intergovernmental lobbying",
      "internal coalition management within an association of governments",
      "prioritization under a single-ask constraint",
      "credibility and leverage with a national funder",
    ],
    modelApproach:
      "A strong answer does not default to whichever member government has the most influence, and instead proposes a concrete process for reaching a genuinely unified position — such as sequencing asks across budget cycles or finding a formulation that credibly serves both large and small members — while being realistic that some members will be disappointed and that managing their continued buy-in matters for the association's future leverage, not just this one meeting.",
    furtherReading: [
      "Associations of local and regional governments as collective advocacy bodies",
      "Intergovernmental lobbying and national infrastructure funding decisions",
      "Managing internal coalition dissent in multi-member advocacy organizations",
    ],
    testsFundamentals: ["pol-localgov-collective-advocacy", "pol-localgov-administrative-capacity"],
  },
  {
    id: "pol-localgov-put-it-to-a-vote",
    profession: "politics",
    category: "Local & Regional Government",
    title: "Put It to a Local Vote",
    scenario:
      "Your city council is deadlocked over a proposed waste-incineration facility that would solve a genuine disposal capacity problem but has drawn intense opposition from residents near the proposed site, who argue the siting process ignored their neighborhood's concerns from the start. A councillor has proposed putting the decision to a binding local referendum rather than a council vote, arguing it would settle the question more legitimately than a narrow council majority could. Critics of the referendum proposal argue the technical, long-term tradeoffs involved are poorly suited to a simple yes-or-no public vote and that the council was elected precisely to make exactly this kind of difficult decision. You must advise the council on whether to proceed with the referendum.",
    keyIssues: [
      "Whether this decision is genuinely well-suited to a referendum or is a technical question better resolved through ordinary representative deliberation",
      "Legitimacy gap created by the flawed original siting process, and whether a referendum actually repairs it",
      "Risk that a referendum result, in either direction, does not resolve the underlying technical disposal-capacity problem",
      "How to address the affected neighborhood's specific process grievance regardless of which decision mechanism is chosen",
    ],
    expectedConcepts: [
      "local referendum and direct democracy",
      "representative versus direct decision-making",
      "siting process legitimacy",
      "technical complexity versus binary public votes",
      "participatory remedies for a flawed process",
    ],
    modelApproach:
      "A strong answer weighs honestly whether a referendum is actually suited to a technical siting question with genuine long-term tradeoffs, rather than treating a public vote as an automatic legitimacy fix, and separately addresses the affected neighborhood's valid complaint about the original process through concrete participatory remedies, whatever decision mechanism is ultimately used to resolve the facility question itself.",
    furtherReading: [
      "Local referendums and the limits of direct democracy for technical decisions",
      "Siting process legitimacy for locally unwanted land uses",
      "Participatory remedies for flawed local decision-making processes",
    ],
    testsFundamentals: ["pol-localgov-local-referendum", "pol-localgov-land-use-zoning"],
  },
  {
    id: "pol-localgov-bond-rating-downgrade",
    profession: "politics",
    category: "Local & Regional Government",
    title: "The Bond Rating Downgrade",
    scenario:
      "A credit rating agency has downgraded your city's bonds after years of relying on short-term borrowing to cover recurring budget gaps, which will raise the interest cost on a major transit-infrastructure bond the city planned to issue next quarter. The finance committee is split between scaling back the infrastructure project to reduce the borrowing needed, raising local revenue to improve the city's underlying fiscal position before issuing any new debt, and proceeding as planned despite the higher cost because delaying the project further would mean losing matching funds tied to a deadline. You must recommend a path forward to the finance committee within two weeks, before the matching-funds deadline and the bond issuance both arrive.",
    keyIssues: [
      "Whether the downgrade reflects a genuine structural fiscal problem that borrowing more will only deepen",
      "Trade-off between the higher borrowing cost now and the risk of losing time-limited matching funds for the infrastructure project",
      "Whether scaling back the project, raising revenue first, or restructuring the debt is the most defensible path given the deadline",
      "What it would take to credibly demonstrate improved fiscal management to avoid a further downgrade on future borrowing",
    ],
    expectedConcepts: [
      "municipal credit ratings",
      "structural reliance on short-term borrowing",
      "capital project financing under a rating downgrade",
      "matching-fund deadlines and opportunity cost",
      "fiscal credibility with credit markets",
    ],
    modelApproach:
      "A strong answer does not treat the downgrade as simply a cost to absorb, and instead asks what it reveals about the city's underlying fiscal practices, weighs the real risk of losing time-limited matching funds against the cost of borrowing at a higher rate, and proposes a credible combination — such as a modest project scale-back paired with a concrete plan to reduce reliance on short-term borrowing — rather than treating the three options as mutually exclusive.",
    furtherReading: [
      "Municipal credit ratings and the cost of subnational borrowing",
      "Structural reliance on short-term debt in local government finance",
      "Matching-fund programs and capital project timing in infrastructure financing",
    ],
    testsFundamentals: ["pol-localgov-capital-debt-financing", "pol-localgov-own-source-revenue-constraints"],
    premium: true,
  },
];
