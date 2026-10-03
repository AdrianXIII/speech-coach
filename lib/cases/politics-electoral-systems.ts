import type { CaseStudy } from "@/lib/caseStudyContent";
import type { Fundamental } from "@/lib/caseStudyFundamentals";

/**
 * Politics / Electoral Systems & Law: the fundamentals checklist and the
 * case bank for this category, kept together so they can be written and
 * reviewed as one unit. Registered in lib/cases/index.ts.
 *
 * This category is distinct from Campaign Strategy: that category is about
 * running a specific campaign within whatever electoral system exists; this
 * one is about the rules of the system itself — districting and
 * apportionment, how votes convert into seats, ballot access, campaign-
 * finance law, and election administration — and how those rules structure
 * strategy and legitimacy. Cases are written to be jurisdiction-neutral: no
 * single country's statutes, courts, or offices are named, so the same case
 * bank works whether a user is graded against a single-member-plurality
 * system with a separate presidential electoral college (US), a mixed-
 * member-proportional system with compensatory seats (Germany), a two-round
 * majoritarian system (France), or closed-list proportional representation
 * with a highest-averages formula (Spain, Sweden).
 */
export const POLITICS_ELECTORAL_SYSTEMS_FUNDAMENTALS: Fundamental[] = [
  { id: "pol-electoral-system-tradeoffs", label: "Weighing proportionality against government stability and accountability when evaluating or advocating for an electoral system's design" },
  { id: "pol-electoral-districting-malapportionment", label: "Assessing whether district boundaries preserve equal representation versus entrenched malapportionment after population shifts" },
  { id: "pol-electoral-gerrymandering-risk", label: "Recognizing partisan or incumbent-protective gerrymandering risk in a redistricting process and arguing for objective safeguards" },
  { id: "pol-electoral-seat-allocation-formula", label: "Understanding how a proportional seat-allocation formula converts votes into seats and which party sizes it systematically favors" },
  { id: "pol-electoral-compensatory-seats", label: "Understanding compensatory or leveling-seat mechanisms that preserve overall proportionality despite district-level or constituency-level distortions" },
  { id: "pol-electoral-threshold-design", label: "Evaluating the strategic and legitimacy effects of a minimum vote-share threshold required for legislative entry" },
  { id: "pol-electoral-ballot-access-barriers", label: "Navigating ballot-access requirements such as signatures, filing fees, or sponsorship rules as a barrier facing new or minor-party candidates" },
  { id: "pol-electoral-campaign-finance-limits", label: "Applying contribution-limit and spending-cap rules while maintaining a campaign's competitive viability" },
  { id: "pol-electoral-disclosure-transparency", label: "Weighing donor-disclosure transparency requirements against privacy, safety, or compliance-burden concerns" },
  { id: "pol-electoral-public-financing-fairness", label: "Assessing how public campaign-financing formulas based on past electoral results can entrench incumbents and disadvantage new entrants" },
  { id: "pol-electoral-runoff-majority-design", label: "Understanding how a two-round or absolute-majority requirement shapes first-round candidate strategy and legitimacy claims" },
  { id: "pol-electoral-dispute-recount-procedure", label: "Managing a contested result through recount and legal-challenge procedures without undermining public confidence in the outcome" },
  { id: "pol-electoral-administration-integrity", label: "Safeguarding the chain of custody and administrative integrity of ballots and vote counting to preserve legitimacy" },
  { id: "pol-electoral-voter-eligibility-access", label: "Balancing voter-eligibility and identity-verification rules against ballot access and turnout considerations" },
  { id: "pol-electoral-redistricting-independence", label: "Evaluating whether an independent commission or a partisan legislative body should control the redistricting process" },
  { id: "pol-electoral-reform-self-interest", label: "Recognizing that incumbent officials evaluating electoral-system or electoral-law reform face a structural conflict between the public interest and their own party's electoral advantage" },
  { id: "pol-electoral-foreign-interference-disinformation", label: "Responding to foreign interference or coordinated disinformation threats to an election without chilling legitimate domestic political speech" },
  { id: "pol-electoral-referendum-initiative-design", label: "Navigating direct-democracy mechanisms such as referendums and their interaction with ordinary representative electoral law" },
  { id: "pol-electoral-strategic-list-ordering", label: "Managing internal party list-ordering and candidate-nomination disputes strategically under a proportional system while weighing intra-party fairness" },
  { id: "pol-electoral-election-calendar-timing", label: "Navigating the strategic and legal considerations around election timing and calendar rules, including discretionary dissolution" },
];

export const POLITICS_ELECTORAL_SYSTEMS_CASES: CaseStudy[] = [
  {
    id: "pol-electoral-redistricting-mandate",
    profession: "politics",
    category: "Electoral Systems & Law",
    title: "Redrawing Lines After the Count",
    scenario:
      "You chair the body responsible for redrawing a legislature's district boundaries following a fresh population count that shows significant growth concentrated in a handful of urban districts while several rural districts have lost population. Current lines are over a decade old; one existing district now has nearly 40% more registered voters than the smallest district in the same chamber, which already invites a credible legal challenge on equal-representation grounds. The ruling majority on your drawing body quietly favors a map that would pack opposition-leaning voters into fewer safe seats, protecting a disproportionate share of its own incumbents even as the map corrects the population imbalance. An independent audit panel has flagged the draft map's unusual district shapes, and a legal challenge appears likely regardless of which map you adopt. You have three weeks to finalize lines before the candidate-filing deadline for the next election opens.",
    keyIssues: [
      "Whether correcting population imbalance can be separated from the ruling majority's preferred partisan map, or whether the two are being deliberately bundled together",
      "What objective, measurable tests — compactness, respect for existing community boundaries, partisan symmetry metrics — can defend a map against a legal challenge",
      "How much weight an independent audit panel's findings should carry against a majority's formal authority to adopt the map",
      "Risk of finalizing a map under deadline pressure that invites prolonged litigation stretching past the filing deadline",
    ],
    expectedConcepts: [
      "malapportionment",
      "one person, one vote",
      "gerrymandering",
      "redistricting commission independence",
      "compactness criteria",
    ],
    modelApproach:
      "A strong answer treats correcting population imbalance and resisting a partisan-advantage map as two separate obligations, not a package deal, and insists on objective line-drawing criteria that would survive judicial review regardless of which party benefits. It takes the independent audit's findings seriously rather than deferring reflexively to the majority's formal voting power, and weighs the real cost of deadline-driven haste against the far larger cost of a map struck down mid-cycle.",
    furtherReading: [
      "Equal-population requirements and malapportionment case law in comparative constitutional systems",
      "Gerrymandering detection metrics (efficiency gap, partisan symmetry)",
      "Independent versus legislative control of redistricting commissions",
    ],
    testsFundamentals: ["pol-electoral-districting-malapportionment", "pol-electoral-gerrymandering-risk", "pol-electoral-redistricting-independence"],
  },
  {
    id: "pol-electoral-formula-choice",
    profession: "politics",
    category: "Electoral Systems & Law",
    title: "Choosing the Seat-Allocation Formula",
    scenario:
      "You sit on a nonpartisan commission tasked with recommending how votes convert into seats under a proportional system the legislature is considering adopting to replace a majoritarian one. Two broad families of formula are on the table: a highest-averages method, which tends to modestly favor larger parties, and a largest-remainder method, which tends to help smaller parties clear into the chamber more easily. Modeling the choice against the last three elections shows it would have changed which bloc held a majority in two of those three contests. The two largest parties both publicly say they want 'the fairest system' while privately favoring the formula that modeling shows helps them specifically; a cluster of smaller parties is pushing hard for the largest-remainder variant. Your commission's recommendation goes to a legislative vote in six weeks, and you must decide what to actually recommend and how to defend it against charges that any choice is just dressed-up self-interest.",
    keyIssues: [
      "Separating a formula's genuine mathematical properties from the self-interested framing each party applies to it",
      "How much weight to give retrospective modeling against past elections versus the formula's effect going forward under a changed party configuration",
      "Whether to recommend based on a stated proportionality principle or to seek the most broadly acceptable political compromise",
      "Anticipating that any recommendation will be attacked as favoring whichever bloc happens to benefit from it",
    ],
    expectedConcepts: [
      "highest-averages method",
      "largest-remainder method",
      "proportionality",
      "seat-vote disproportionality",
      "formula bias toward large or small parties",
    ],
    modelApproach:
      "A strong answer names the real mathematical property distinguishing the two formula families — how each handles remainder votes and rounding — rather than accepting either side's self-interested framing, and is explicit that no formula is neutral in its effects on a given party configuration even when it is neutral in its underlying mathematics. It recommends anchoring the choice in a stated proportionality principle applied consistently, and prepares a clear, formula-agnostic explanation for the legislative vote rather than hoping the commission's technical authority alone will settle the political fight.",
    furtherReading: [
      "Highest-averages versus largest-remainder seat-allocation methods",
      "Measuring seat-vote disproportionality (the Gallagher index)",
      "Comparative adoption of proportional representation formulas",
    ],
    testsFundamentals: ["pol-electoral-seat-allocation-formula", "pol-electoral-reform-self-interest", "pol-electoral-system-tradeoffs"],
  },
  {
    id: "pol-electoral-threshold-lobby",
    profession: "politics",
    category: "Electoral Systems & Law",
    title: "Moving the Threshold",
    scenario:
      "You advise the leadership of a mid-sized governing party that currently sits comfortably above the minimum vote-share threshold a party must clear to enter the legislature at all. A legislative committee is reviewing whether to raise that threshold by a modest margin, officially to reduce the number of very small parties that make coalition-building difficult, though internal modeling shows the change would eliminate exactly two smaller parties from the next legislature, both of which currently sit to your party's ideological left and have occasionally outbid you for voters on your own flank. Your party's public position has always been that a lower threshold protects minority political voices, a principle several senior members still genuinely hold, while a faction in leadership privately favors the change purely because it removes two rivals. You must advise whether to support, oppose, or abstain on the change, and what to say publicly about it.",
    keyIssues: [
      "Reconciling the party's stated principle on minority representation with leadership's private, self-interested motive for the change",
      "Whether the governing-stability argument for a higher threshold is genuine here or a pretext",
      "Risk to the party's credibility if a reversal on this principle is later traced to naked self-interest",
      "What public justification could actually survive scrutiny if challenged by journalists citing the internal modeling",
    ],
    expectedConcepts: [
      "threshold design",
      "legislative fragmentation",
      "governing stability versus proportionality",
      "minority representation",
      "electoral reform self-interest",
    ],
    modelApproach:
      "A strong answer treats the stability-versus-fragmentation argument as a real tradeoff worth weighing on its own merits, but refuses to let it substitute for an honest reckoning with modeling that shows exactly which rivals the change eliminates. It warns leadership that a principle abandoned only when it stops being convenient carries a durable credibility cost, and recommends either a position consistent with the party's stated principle or a transparent, defensible account of why the tradeoff has genuinely changed.",
    furtherReading: [
      "Electoral threshold design and legislative fragmentation",
      "Self-interested electoral reform and incumbent protection",
      "Comparative effects of threshold changes on small-party survival",
    ],
    testsFundamentals: ["pol-electoral-threshold-design", "pol-electoral-reform-self-interest"],
  },
  {
    id: "pol-electoral-ballot-signature-challenge",
    profession: "politics",
    category: "Electoral Systems & Law",
    title: "Qualifying for the Ballot",
    scenario:
      "You manage ballot-access compliance for a newly formed party contesting its first national election. Qualifying requires collecting a substantial number of verified voter signatures within a fixed window, a bar the established parties cleared automatically by virtue of their prior results. Your volunteers submitted signatures with two weeks to spare, but the election authority's review has now rejected nearly a third of them for technical defects, mismatched addresses, and duplicate entries, pushing your valid count below the required threshold with eight days left before the filing deadline. A rival party has publicly suggested, without evidence, that your submission was fraudulent, and local media have picked up the claim. You must decide how to respond to the rejection, whether and how to challenge the authority's review, and whether the public fraud allegation needs an immediate response or can wait.",
    keyIssues: [
      "Whether the rejection rate reflects a genuinely strict but fair review or an inconsistent standard applied against a new entrant",
      "What recourse exists to challenge specific rejected signatures within the remaining window",
      "Separating the administrative ballot-access problem from the separate reputational threat of an unsubstantiated fraud allegation",
      "Realistic chances of qualifying in time versus needing a contingency plan if the deadline cannot be met",
    ],
    expectedConcepts: [
      "ballot access requirements",
      "signature verification",
      "administrative integrity",
      "new-entrant disadvantage",
      "filing deadline",
    ],
    modelApproach:
      "A strong answer treats the two problems as distinct and addresses both: it pursues a prompt, specific administrative or legal challenge to the rejected signatures where a genuine error can be shown, while separately and quickly rebutting the unsubstantiated fraud claim before it hardens into an accepted story. It stays realistic about the compressed timeline and names a fallback if the threshold genuinely cannot be met in time.",
    furtherReading: [
      "Ballot-access requirements and new-entrant barriers in comparative perspective",
      "Signature verification standards and legal challenges",
      "Administrative integrity in candidate qualification processes",
    ],
    testsFundamentals: ["pol-electoral-ballot-access-barriers", "pol-electoral-administration-integrity"],
  },
  {
    id: "pol-electoral-donor-disclosure-risk",
    profession: "politics",
    category: "Electoral Systems & Law",
    title: "The Donor Who Doesn't Want to Be Named",
    scenario:
      "You run compliance for a sitting legislator's campaign. A donor who has credibly described facing harassment and professional retaliation after a past, unrelated public disclosure wants to contribute an amount that would trigger mandatory public donor disclosure under campaign-finance rules, and is asking whether there is any lawful way to structure the contribution to avoid being named. Your jurisdiction's disclosure rules exist specifically to let voters see who is funding a candidate, and you know that structuring a donation specifically to evade disclosure is both a serious compliance violation and a real legal risk to the campaign if discovered. The donor is a longtime, genuine supporter, not a source of suspicious money, and the contribution would meaningfully help a close race with five weeks left. You must advise the donor and the campaign on what is and is not permissible.",
    keyIssues: [
      "Why disclosure rules apply regardless of the donor's sympathetic personal reason for wanting anonymity",
      "The compliance and legal exposure of accepting any contribution structured to evade a disclosure threshold",
      "Whether lawful alternatives exist — a smaller contribution below the threshold, independent legal advice to the donor — that respect both the donor's concern and the rule",
      "How to document the campaign's own handling of the request in case it is later scrutinized",
    ],
    expectedConcepts: [
      "donor disclosure thresholds",
      "campaign-finance compliance",
      "structuring and straw-donor violations",
      "transparency versus donor privacy",
      "contribution limits",
    ],
    modelApproach:
      "A strong answer is unambiguous that structuring the contribution to evade disclosure is not an option regardless of how sympathetic the donor's reason is, and explains why the rule exists independent of any individual case. It offers the donor the lawful alternatives actually available, such as contributing an amount under the threshold or spreading contributions across a reporting period consistent with the rules, and documents the campaign's own compliance handling of the request.",
    furtherReading: [
      "Campaign-finance disclosure thresholds and their rationale",
      "Structuring and straw-donor violations",
      "Donor privacy concerns versus transparency requirements in campaign-finance law",
    ],
    testsFundamentals: ["pol-electoral-disclosure-transparency", "pol-electoral-campaign-finance-limits"],
  },
  {
    id: "pol-electoral-new-entrant-financing",
    profession: "politics",
    category: "Electoral Systems & Law",
    title: "Financing a Campaign With No Track Record",
    scenario:
      "You are the treasurer for a new party in its first election cycle. Public campaign financing in your jurisdiction is calculated largely from a party's vote share or seats won in the previous election, a formula that gives established parties a predictable base of public funds and gives your party close to nothing, regardless of what current polling shows about your real support. Private contribution limits apply equally to every party, but an established party's donor base is already built while yours is still being assembled from scratch, and spending caps mean money raised late in the cycle is worth less than the same money raised and spent early. With four months before the vote, you must build a financing plan that gets the party onto reasonably equal footing without any realistic prospect of matching an established rival's resources outright.",
    keyIssues: [
      "How the public-financing formula structurally disadvantages any new entrant regardless of current support",
      "Whether to prioritize early, legal fundraising intensity over a later push given the time-value of money under spending caps",
      "What legal arguments or advocacy, if any, exist for reforming a formula that only ever helps incumbents' own parties",
      "Realistic sequencing of a financing plan that doesn't assume a parity the formula makes unrealistic",
    ],
    expectedConcepts: [
      "public financing formulas",
      "new-entrant disadvantage",
      "contribution limits",
      "spending caps",
      "time-value of campaign funds",
    ],
    modelApproach:
      "A strong answer names the structural disadvantage honestly rather than treating it as solvable through better execution alone, and builds a financing plan that front-loads legal fundraising given the time-value effect of spending caps. It distinguishes the immediate financing problem from a longer-term advocacy case for reforming the formula, and avoids overpromising donors or volunteers a level of parity the formula makes unrealistic this cycle.",
    furtherReading: [
      "Public campaign-financing formulas and incumbent-party advantage",
      "New-entrant disadvantage in campaign-finance regulation",
      "Spending caps and the timing of campaign fundraising",
    ],
    testsFundamentals: ["pol-electoral-public-financing-fairness", "pol-electoral-campaign-finance-limits"],
  },
  {
    id: "pol-electoral-majority-certification",
    profession: "politics",
    category: "Electoral Systems & Law",
    title: "Certifying a Razor-Thin Majority",
    scenario:
      "You head the body responsible for certifying a first-round result in a system that requires a candidate to win an absolute majority of valid votes to avoid a second round. The leading candidate's count sits at exactly 50.3% once spoiled and blank ballots are excluded from the valid-vote base, but a losing campaign argues that a category of ballots your office classified as spoiled should instead count as valid votes against the leader, which would drop the leading candidate's share below the majority threshold and trigger a runoff. The disputed ballots involve a marking convention that is genuinely ambiguous under the written counting rules, and roughly the same number of ballots use this marking across several regions, meaning the ruling will not look like it was tailored to one district. You have 72 hours before the legal certification deadline to rule on the classification and certify, or decline to certify, the result.",
    keyIssues: [
      "Whether the ambiguous marking convention should be resolved by the letter of the counting rule or by established administrative precedent",
      "The legitimacy cost of a ruling that happens to change the outcome, regardless of its underlying correctness",
      "Managing the compressed legal deadline against the need for a transparent, defensible review of the disputed ballots specifically",
      "What to communicate publicly before and after the ruling to preserve confidence in the result either way",
    ],
    expectedConcepts: [
      "absolute majority requirement",
      "valid-vote base",
      "ballot classification standards",
      "runoff trigger",
      "certification deadline",
    ],
    modelApproach:
      "A strong answer resolves the ambiguous classification by applying a clear, pre-existing rule or precedent rather than reasoning backward from the preferred outcome, and treats the fact that the ruling changes the result as a reason for more transparency, not less. It uses the compressed deadline to prioritize a defensible, well-documented review of the disputed ballots specifically, and prepares public communication that explains the standard applied regardless of which way the ruling goes.",
    furtherReading: [
      "Absolute-majority and runoff-trigger rules in two-round systems",
      "Ballot classification standards and spoiled-vote determinations",
      "Election certification deadlines and dispute procedures",
    ],
    testsFundamentals: ["pol-electoral-runoff-majority-design", "pol-electoral-dispute-recount-procedure", "pol-electoral-administration-integrity"],
  },
  {
    id: "pol-electoral-recount-under-pressure",
    profession: "politics",
    category: "Electoral Systems & Law",
    title: "A Recount Under Public Pressure",
    scenario:
      "You administer elections for a district where the top two candidates finished 412 votes apart out of just over 200,000 cast, within the automatic-recount margin set by law. The losing campaign has also publicly alleged, without presenting evidence beyond the closeness of the result itself, that the voter rolls used that day included a significant number of ineligible registrations, and supporters have organized protests outside your office demanding a full eligibility audit alongside the vote recount. Your statutory recount procedure covers re-tabulating the ballots already cast; it does not itself re-verify voter eligibility, which is a separate, slower administrative process. You must run the lawful recount on its required timeline while deciding how to respond to the separate eligibility allegation without either dismissing a legitimate public concern or implying your process is reopening questions the recount was never designed to answer.",
    keyIssues: [
      "Keeping the lawful ballot recount distinct from the separate, unsubstantiated eligibility allegation",
      "How to communicate what the recount can and cannot determine without appearing dismissive of public concern",
      "Whether any part of the eligibility allegation warrants a separate, proper review process",
      "Managing public trust and the risk of protest escalation throughout a tight, closely watched recount",
    ],
    expectedConcepts: [
      "automatic recount margin",
      "voter eligibility verification",
      "chain of custody",
      "administrative integrity",
      "public confidence in results",
    ],
    modelApproach:
      "A strong answer keeps the statutory recount and the eligibility allegation as two clearly separate processes in every public statement, explaining precisely what the recount does and does not cover rather than letting the two blur together. It takes the eligibility concern seriously enough to route it to whatever proper review channel exists, while refusing to let an unsubstantiated allegation slow or compromise the lawful recount's own strict timeline and chain-of-custody requirements.",
    furtherReading: [
      "Automatic recount thresholds and procedures",
      "Voter-roll eligibility verification processes",
      "Chain-of-custody standards and public confidence in election administration",
    ],
    testsFundamentals: ["pol-electoral-dispute-recount-procedure", "pol-electoral-administration-integrity", "pol-electoral-voter-eligibility-access"],
  },
  {
    id: "pol-electoral-id-law-tradeoff",
    profession: "politics",
    category: "Electoral Systems & Law",
    title: "Drafting a Voter Identification Requirement",
    scenario:
      "You advise a legislative committee drafting a new voter-identification requirement at the ruling party's request. Supporters argue it is a reasonable integrity safeguard that most voters already satisfy without difficulty; independent research your committee commissioned shows a small but real share of eligible voters, concentrated among groups that traditionally vote less often for the party sponsoring the bill, currently lack the specific form of identification the draft would require and would need to obtain it before the next election. There is no credible evidence in your jurisdiction's own data of the specific kind of fraud the requirement is meant to prevent, though sponsors point to the general principle of ballot integrity rather than a documented local problem. You must advise the committee on the draft's design, including whether and how to mitigate its access effects, and how to handle the gap between the stated rationale and the available evidence.",
    keyIssues: [
      "Weighing a genuine ballot-integrity rationale against the absence of documented fraud of the specific kind the measure targets",
      "The access effects falling disproportionately on groups less likely to support the bill's sponsors, and whether that shapes how the measure should be designed",
      "What mitigation — free ID provision, lead time before enforcement, alternative verification options — could preserve the integrity rationale while reducing access harm",
      "Advising honestly on the bill's drafting when the real motive may diverge from the stated one",
    ],
    expectedConcepts: [
      "voter eligibility verification",
      "ballot integrity rationale",
      "disparate access impact",
      "mitigation design",
      "evidence-based policymaking",
    ],
    modelApproach:
      "A strong answer does not dismiss ballot integrity as a legitimate general principle, but insists the draft's design account honestly for the documented access effects and the absence of local evidence for the specific fraud named, rather than treating the rationale as self-justifying. It proposes concrete mitigations that could serve the stated integrity goal while reducing the disparate access burden, and is candid with the committee about the gap between the bill's stated and apparent purposes.",
    furtherReading: [
      "Voter identification laws and documented access effects",
      "Evidence-based evaluation of ballot-integrity rationales",
      "Mitigation design in eligibility-verification legislation",
    ],
    testsFundamentals: ["pol-electoral-voter-eligibility-access", "pol-electoral-reform-self-interest"],
  },
  {
    id: "pol-electoral-disinformation-response",
    profession: "politics",
    category: "Electoral Systems & Law",
    title: "A Coordinated Disinformation Push, Two Weeks Out",
    scenario:
      "You lead election-security coordination for the national electoral authority. With two weeks before the vote, researchers have identified a coordinated network of inauthentic accounts, traced to infrastructure outside the country, spreading false claims that the voting process itself has already been compromised and urging supporters of one side not to bother voting. Separately, and mixed into the same hashtags, ordinary domestic supporters are organically sharing genuine, if sharply one-sided, criticism of the electoral authority's own competence. You must decide what public action to take against the inauthentic network specifically, how to publicly reassure voters about the process without appearing to take a side in a contested domestic debate, and how to avoid a response so broad it chills legitimate domestic criticism of your own institution.",
    keyIssues: [
      "Distinguishing coordinated, foreign-linked inauthentic activity from genuine, if harsh, domestic political speech mixed into the same conversation",
      "What public communication can reassure voters about process integrity without appearing to silence legitimate criticism",
      "Whether and how to name the foreign-linked network publicly without amplifying its claims further",
      "Timing a response quickly enough to matter within the two-week window without a hasty, poorly evidenced attribution",
    ],
    expectedConcepts: [
      "foreign interference",
      "coordinated inauthentic behavior",
      "disinformation versus legitimate criticism",
      "election administration communication",
      "attribution standards",
    ],
    modelApproach:
      "A strong answer draws a clear operational line between the foreign-linked inauthentic network and ordinary domestic criticism, acting against the former specifically rather than issuing a broad response that could chill the latter. It prioritizes a fast, carefully evidenced public communication about process integrity, and treats premature or weakly-supported attribution as a real risk worth weighing against the benefit of speaking out quickly.",
    furtherReading: [
      "Coordinated inauthentic behavior detection and attribution standards",
      "Disinformation versus legitimate political criticism in election contexts",
      "Election administration communication during active interference incidents",
    ],
    testsFundamentals: ["pol-electoral-foreign-interference-disinformation", "pol-electoral-administration-integrity"],
  },
  {
    id: "pol-electoral-referendum-design",
    profession: "politics",
    category: "Electoral Systems & Law",
    title: "Putting the Question Directly to Voters",
    scenario:
      "Your government is deciding whether to resolve a deeply contested policy question through a direct public referendum rather than through the ordinary legislative process, and if so, how to word the question. Internal legal advice is split on whether a referendum result would be binding or merely advisory under your jurisdiction's rules, and on what turnout or majority threshold, if any, should be required for the result to carry real legitimacy. A draft question proposed by one minister uses framing that polling shows would meaningfully shift the result compared to a more neutral phrasing of the identical underlying choice. You must recommend whether to proceed by referendum at all, what threshold and question wording to use if so, and how to handle the result's legitimacy if turnout is low or the margin is narrow.",
    keyIssues: [
      "Whether the underlying question is actually suited to a binary referendum or is being oversimplified by one",
      "The legitimacy consequences of an advisory-only result that the government later overrides or ignores",
      "Why question wording that shifts the outcome compared to neutral phrasing undermines the referendum's legitimacy regardless of the final result",
      "What turnout or majority threshold, if any, should be set in advance rather than argued over after the result is known",
    ],
    expectedConcepts: [
      "direct democracy",
      "referendum question design",
      "binding versus advisory results",
      "turnout and majority thresholds",
      "legitimacy of direct votes",
    ],
    modelApproach:
      "A strong answer insists on neutral question wording decided before any polling on alternative phrasings is seen, and on a turnout or majority threshold fixed in advance rather than contested after the result is known, since either one locked in afterward looks like manipulation regardless of intent. It weighs honestly whether a binding or advisory referendum, and whether a referendum at all versus the ordinary legislative process, best fits a question of this kind.",
    furtherReading: [
      "Referendum design and question-wording effects",
      "Binding versus advisory direct-democracy mechanisms",
      "Turnout and majority thresholds in direct votes",
    ],
    testsFundamentals: ["pol-electoral-referendum-initiative-design", "pol-electoral-system-tradeoffs"],
  },
  {
    id: "pol-electoral-list-ordering-dispute",
    profession: "politics",
    category: "Electoral Systems & Law",
    title: "Ordering the List Before the Filing Deadline",
    scenario:
      "You chair the committee that finalizes your party's candidate list ahead of a proportional election, where list position heavily determines who actually wins a seat. Internal party rules call for a fair process reflecting the membership's preferences, but a dispute has broken out between a regional faction that controls a majority of committee votes and wants to place its own candidates in the top winnable positions, and a smaller faction, including the party's most electorally popular figures by independent polling, that would be pushed down the list to positions unlikely to win a seat. The regional faction's preferred list is procedurally within its rights to adopt under the party's own rules, but would likely cost the party votes overall from supporters who specifically favor the sidelined figures. The filing deadline is four days away.",
    keyIssues: [
      "Whether a procedurally valid list that follows internal rules but costs the party votes should be revisited before the deadline",
      "Balancing the regional faction's legitimate procedural authority against the party's overall electoral interest",
      "Risk of a public internal dispute becoming its own damaging story if not resolved quickly",
      "What compromise, if any, could satisfy both factions within the remaining four days",
    ],
    expectedConcepts: [
      "party list ordering",
      "intra-party nomination disputes",
      "candidate sequencing under proportional representation",
      "internal party democracy",
      "electoral versus procedural legitimacy",
    ],
    modelApproach:
      "A strong answer does not treat procedural validity as the end of the analysis, since a list that followed every internal rule can still be a strategic mistake if it measurably costs the party votes, and proposes a concrete compromise that preserves the regional faction's legitimate standing while keeping the party's most electorally valuable figures in winnable positions. It moves quickly given the four-day window and treats resolving the dispute quietly as preferable to a public fight over the list.",
    furtherReading: [
      "Party-list ordering and candidate sequencing in proportional systems",
      "Intra-party democracy and nomination disputes",
      "Electoral versus procedural legitimacy in candidate selection",
    ],
    testsFundamentals: ["pol-electoral-strategic-list-ordering", "pol-electoral-reform-self-interest"],
  },
  {
    id: "pol-electoral-snap-election-timing",
    profession: "politics",
    category: "Electoral Systems & Law",
    title: "Calling the Vote Early",
    scenario:
      "As head of government, you have the legal discretion to call an early election before your term's scheduled end, subject to specific procedural conditions your legal counsel confirms you currently meet. Your party is polling at its strongest position in years, driven by a temporary boost unlikely to last, while an opposition party is in the middle of its own internal leadership contest and is not yet ready to campaign. Calling the vote now would be seen by many as a naked opportunistic exploitation of timing rules rather than a response to any genuine governing need, and a minority of your own coalition partners have signaled discomfort with an election called purely for tactical advantage. You must decide whether to call the early vote, and if so, how to publicly justify the timing.",
    keyIssues: [
      "Weighing the tactical advantage of favorable timing against the legitimacy cost of an obviously opportunistic call",
      "Whether coalition partners' discomfort creates a genuine governing risk if you proceed over their objections",
      "What public justification, if any, could make the timing look like more than pure political calculation",
      "Whether the polling advantage is durable enough to justify the risk of being seen as manipulating the calendar",
    ],
    expectedConcepts: [
      "election timing discretion",
      "snap election strategy",
      "opportunistic dissolution",
      "coalition cohesion",
      "legitimacy cost of timing decisions",
    ],
    modelApproach:
      "A strong answer treats the legitimacy cost of an obviously opportunistic call as a real, not merely cosmetic, risk, and weighs it honestly against the tactical advantage rather than assuming a polling lead alone settles the decision. It takes the coalition partners' discomfort seriously as a governing risk rather than a formality, and if proceeding, prepares a public justification addressing some substantive governing purpose rather than relying on the favorable polling alone.",
    furtherReading: [
      "Discretionary election timing and dissolution rules",
      "Opportunistic calling of early elections and public legitimacy",
      "Coalition cohesion risk around election-timing decisions",
    ],
    testsFundamentals: ["pol-electoral-election-calendar-timing", "pol-electoral-system-tradeoffs"],
  },
  {
    id: "pol-electoral-oversized-chamber-legitimacy",
    profession: "politics",
    category: "Electoral Systems & Law",
    title: "Explaining Why the Chamber Grew",
    scenario:
      "Following the most recent election, your legislature's compensatory seat-allocation mechanism, designed to preserve overall proportionality when a party wins more individual district seats than its national vote share would otherwise justify, has produced a chamber meaningfully larger than its normal size. As the governing coalition's chief spokesperson, you face mounting public criticism over the added cost and complexity of an oversized chamber, alongside confusion among ordinary voters who assumed the chamber had a fixed number of seats. A populist opposition figure is calling the growth proof the system is 'broken' and demanding an immediate cap on total seats, a change that would reintroduce exactly the kind of disproportionality the compensatory mechanism exists to prevent. You must decide how to explain the mechanism publicly and how to respond to the proposed cap.",
    keyIssues: [
      "Explaining a genuinely technical compensatory mechanism to a public that assumed a fixed chamber size, without sounding evasive",
      "Whether the proposed seat cap is a reasonable reform or would reintroduce the disproportionality the mechanism was built to prevent",
      "Managing the legitimacy narrative when a correct, rules-based outcome still looks alarming on its face",
      "Separating genuine cost and complexity concerns, which are real, from the broken-system framing, which misstates what happened",
    ],
    expectedConcepts: [
      "compensatory seats",
      "proportionality preservation",
      "chamber size variability",
      "seat-cap reform tradeoffs",
      "legitimacy communication",
    ],
    modelApproach:
      "A strong answer explains the compensatory mechanism plainly, in terms of what it is actually trying to preserve — proportionality between votes and seats — rather than retreating into technical jargon, and is honest that chamber-size growth is a real cost worth acknowledging even though the mechanism functioned as designed. It pushes back specifically on the seat-cap proposal by naming the disproportionality it would reintroduce, rather than conceding to a popular-sounding fix that would undo the system's actual purpose.",
    furtherReading: [
      "Compensatory and leveling-seat mechanisms in mixed electoral systems",
      "Chamber-size variability and its public communication challenges",
      "Seat-cap reform proposals and proportionality tradeoffs",
    ],
    testsFundamentals: ["pol-electoral-compensatory-seats", "pol-electoral-system-tradeoffs"],
  },
];
