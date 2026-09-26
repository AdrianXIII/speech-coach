import type { CaseStudy } from "@/lib/caseStudyContent";
import type { Fundamental } from "@/lib/caseStudyFundamentals";

/**
 * Politics / Campaign Strategy: the fundamentals checklist and the case bank
 * for this category, kept together so they can be written and reviewed as
 * one unit. Registered in lib/cases/index.ts.
 *
 * Cases are written to be jurisdiction-neutral: no single country's
 * statutes, courts, or offices are named, so the same bank works whether a
 * user is graded against a candidate-centred system (US, French
 * presidential/legislative) or a party-list proportional system (Germany's
 * mixed system, Spain, Sweden).
 */
export const POLITICS_CAMPAIGN_STRATEGY_FUNDAMENTALS: Fundamental[] = [
  { id: "pol-campaign-fundamentals-vs-events", label: "Weighing structural fundamentals (economic conditions, incumbency, bloc/partisan lean) against campaign-specific events when reading a race's trajectory" },
  { id: "pol-campaign-nomination-tension", label: "Managing the tension between positioning to win an internal party nomination or list selection and positioning to win the broader electorate afterward" },
  { id: "pol-campaign-targeting-persuasion-turnout", label: "Allocating scarce campaign resources between persuading undecided voters and mobilizing turnout among existing supporters" },
  { id: "pol-campaign-message-framing", label: "Applying message discipline and framing theory to keep communication simple, repeatable, and consistently interpreted" },
  { id: "pol-campaign-polling-methodology", label: "Evaluating a poll's likely-voter model, margin of error, and herding risk instead of reacting to a single topline number" },
  { id: "pol-campaign-paid-earned-media", label: "Balancing paid media's message control against earned media's greater credibility and lower cost" },
  { id: "pol-campaign-resource-allocation-battlegrounds", label: "Concentrating money, candidate time, and staff on the seats or districts that actually decide the outcome under the electoral system's real decision rule" },
  { id: "pol-campaign-opposition-research-rapid-response", label: "Using opposition research defensively and offensively, and mounting a rapid response before an unanswered attack hardens into an accepted narrative" },
  { id: "pol-campaign-gotv-ground-game", label: "Running a direct voter-contact operation (canvassing, calls, texts) to convert identified support into votes actually cast" },
  { id: "pol-campaign-crisis-scandal-response", label: "Deciding whether and how to acknowledge, contain, and pivot away from a damaging revelation about a candidate or party mid-campaign" },
  { id: "pol-campaign-debate-prep", label: "Preparing a candidate or list leader to handle a genuine, substantiated attack on a policy position in a televised debate" },
  { id: "pol-campaign-threshold-survival", label: "Managing late-campaign strategy around a minimum vote-share or seat threshold that determines whether a party enters the legislature at all" },
  { id: "pol-campaign-coalition-signaling", label: "Managing pre-election coalition signaling and exclusion statements so a vote for one party is legible as a vote for a plausible governing combination" },
  { id: "pol-campaign-strategic-voting-appeals", label: "Appealing for tactically lent votes from an allied party's supporters to help a smaller ally clear a threshold without risking the larger party's own position" },
  { id: "pol-campaign-party-financing-fairness", label: "Navigating public and private party-financing rules and equal-opportunity principles that shape what campaign resources are even available" },
  { id: "pol-campaign-debate-airtime-rules", label: "Complying with regulated equal-airtime and debate-access rules while still maximizing the campaign's effective media reach" },
  { id: "pol-campaign-leader-personalization", label: "Building a campaign around a personalized leader or list-leader brand while staying consistent with the party's own platform and list" },
  { id: "pol-campaign-runoff-consolidation", label: "Building a second-round or runoff strategy that consolidates a fragmented first-round field into a viable majority coalition of voters" },
  { id: "pol-campaign-blocking-coalition", label: "Deciding whether and how to call for tactical cross-party support to block a candidate or party viewed as unacceptable" },
  { id: "pol-campaign-incumbency-advantage", label: "Weighing the strategic advantages and constraints of incumbency against a challenger's freedom to attack the record" },
];

export const POLITICS_CAMPAIGN_STRATEGY_CASES: CaseStudy[] = [
  {
    id: "pol-campaign-scandal-control",
    profession: "politics",
    category: "Campaign Strategy",
    title: "Mid-Campaign Damage Control",
    scenario:
      "Six weeks before an election, a decade-old but genuine controversy involving your candidate has resurfaced with new documentation, confirming what was previously only alleged. Polling shows the race tightening. Your campaign must decide how to respond before the story dominates the final weeks.",
    keyIssues: [
      "Whether to acknowledge and address the issue directly versus minimizing engagement",
      "Distinguishing genuine accountability from a defensive posture that prolongs the story",
      "Timing: addressing it immediately and fully versus a drawn-out, incremental response",
      "Refocusing the remaining campaign narrative on substantive issues without appearing to dodge",
    ],
    expectedConcepts: [
      "crisis communication",
      "news cycle management",
      "accountability messaging",
      "narrative control",
      "damage control",
    ],
    modelApproach:
      "A strong answer generally favors a full, direct acknowledgment early — since incremental revelations prolong news cycles far more than a single complete statement — paired with genuine accountability language, and then a deliberate pivot back to substantive campaign issues rather than continuing to relitigate the story.",
    furtherReading: [
      "Crisis communication and the 'rip the band-aid off' strategy in political scandals",
      "News cycle dynamics and story lifecycle management",
      "Case studies in political scandal response effectiveness",
    ],
    testsFundamentals: ["pol-campaign-crisis-scandal-response"],
  },
  {
    id: "pol-campaign-debate-attack",
    profession: "politics",
    category: "Campaign Strategy",
    title: "Preparing for a Debate Attack",
    scenario:
      "Your opponent is expected to attack your signature policy proposal in the upcoming debate, citing a genuine implementation flaw identified by independent analysts that your team has not yet fully resolved. You're preparing the candidate's response strategy.",
    keyIssues: [
      "Whether to concede the flaw exists while defending the policy's overall merit, or minimize it",
      "Credibility cost of denying a genuine, independently-verified flaw",
      "Redirecting to comparative strengths versus the opponent's own policy record",
      "Preparing a substantive fix or refinement to offer, not just a defensive talking point",
    ],
    expectedConcepts: [
      "debate strategy",
      "policy credibility",
      "comparative messaging",
      "issue ownership",
      "concede-and-pivot technique",
    ],
    modelApproach:
      "A strong answer recommends acknowledging the legitimate flaw rather than denying well-documented facts (which risks a bigger credibility hit if pressed), pairs the acknowledgment with a concrete refinement or fix, and pivots to a comparative contrast with the opponent's own record — rather than pure defense.",
    furtherReading: [
      "Debate strategy and concede-and-pivot messaging techniques",
      "Policy credibility and voter trust research",
      "Comparative political messaging strategy",
    ],
    testsFundamentals: ["pol-campaign-debate-prep"],
  },
  {
    id: "pol-campaign-poll-tracking",
    profession: "politics",
    category: "Campaign Strategy",
    title: "Reading a Sudden Poll Swing",
    scenario:
      "You are the head of research for a mid-sized party's national campaign. A poll released this morning shows your party's support jumping 6 points in a single week, an outlier compared to four other polls released over the same period, none of which moved by more than 1 point in either direction. The outlier firm's likely-voter model is built on turnout patterns from an earlier election cycle, while most other firms have already updated their models for a shift in youth turnout seen more recently. Volunteers are already circulating the favorable number to donors and local organizers, and a senior strategist wants to shift the closing message to a confident 'we're winning' tone based on it. Your team meeting is in two hours and wants your read: is this real movement or noise, and what should the campaign actually do with it.",
    keyIssues: [
      "Whether a single outlier poll should change campaign strategy or messaging",
      "How an outdated likely-voter model can distort a result independent of sampling error",
      "Distinguishing genuine cross-pollster convergence from herding",
      "Risk of over-promising to donors and volunteers based on an unverified number",
    ],
    expectedConcepts: [
      "likely-voter model",
      "margin of error",
      "polling herding",
      "poll averaging",
      "sampling bias",
    ],
    modelApproach:
      "A strong answer treats the outlier as a single data point, not a verdict, and asks specifically how its likely-voter model was built before crediting the 6-point jump. It recommends weighting a polling average by methodology and recency rather than reacting to the outlier, cautions against changing message or donor communication on the strength of one poll, and flags the outdated turnout model as the likely source of the discrepancy.",
    furtherReading: [
      "Likely-voter models and their effect on poll accuracy",
      "Polling herding and pollster convergence effects",
      "Best practices in poll averaging and aggregation",
    ],
    premium: true,
    testsFundamentals: ["pol-campaign-polling-methodology"],
  },
  {
    id: "pol-campaign-final-budget-allocation",
    profession: "politics",
    category: "Campaign Strategy",
    title: "Allocating the Final Six Weeks' Budget",
    scenario:
      "You manage the national campaign for a party contesting a legislature where a number of seats were decided by tight margins last time. With six weeks left and a fixed remaining budget, your polling shows the party's core support stable but not growing nationally, while eleven seats sit within 3 points and could plausibly go either way. A regional coordinator is pushing for a national advertising buy aimed at persuading undecided voters broadly, arguing it will lift the party's overall vote share. Your own data shows undecided voters make up only 4% of the electorate in those eleven seats, and most of them are already-identified supporters who backed the party before but sat out the last election. You have to recommend how to split the remaining budget between broad national persuasion advertising and seat-level turnout operations.",
    keyIssues: [
      "Whether the marginal vote gained from national persuasion advertising changes the seat count at all",
      "How the size of the persuadable versus already-supportive electorate should drive the spend split",
      "Opportunity cost of a broad national buy against concentrated seat-level turnout spending",
      "Whether to trust nationwide vote-share optics over the actual seat-deciding math",
    ],
    expectedConcepts: [
      "persuasion vs. turnout targeting",
      "battleground resource allocation",
      "electoral decision rule",
      "marginal voter",
      "seat-vote efficiency",
    ],
    modelApproach:
      "A strong answer starts from the system's actual decision rule: seats are won in the eleven competitive seats, not by national vote share alone, so spend should follow electoral leverage rather than population. Given a mostly-identified but under-turned-out electorate in those seats, it recommends shifting the bulk of the remaining budget into seat-level turnout operations over a broad national persuasion buy, while naming the tradeoff being made.",
    furtherReading: [
      "Persuasion versus mobilization resource allocation in competitive races",
      "Battleground targeting and the electoral decision rule",
      "Field studies on turnout among lapsed supporters",
    ],
    premium: true,
    testsFundamentals: ["pol-campaign-targeting-persuasion-turnout", "pol-campaign-resource-allocation-battlegrounds"],
  },
  {
    id: "pol-campaign-earned-media-play",
    profession: "politics",
    category: "Campaign Strategy",
    title: "Out-Communicating a Better-Funded Opponent",
    scenario:
      "You run communications for a challenger party whose advertising budget is roughly a fifth of the governing party's. Your candidate has one clear contrast to offer voters, a proposal to cap a widely resented administrative fee, but internal message testing shows voters currently associate your party with six or seven different priorities, none memorable on their own. With ten weeks until the vote, you are planning a rollout event meant to generate national news coverage rather than being carried mainly through paid channels. The press office wants a multi-issue policy document released alongside the event, while your media strategist warns that a crowded announcement will not produce a clean, quotable story journalists are likely to run with. You need to decide what to actually announce and how to message it to maximize genuine earned coverage.",
    keyIssues: [
      "Whether a multi-issue rollout undermines the chance of getting a clean, coverable earned-media story",
      "Tradeoff between paid message control and earned media's greater credibility and reach on a limited budget",
      "Choosing one memorable, repeatable message over comprehensive policy communication",
      "Designing an event specifically to be newsworthy rather than merely informative",
    ],
    expectedConcepts: [
      "framing",
      "message discipline",
      "earned media",
      "paid media",
      "news value",
    ],
    modelApproach:
      "A strong answer recommends narrowing the rollout to the single fee-cap proposal, since a disciplined, single message is what actually survives the trip through an earned-media channel the campaign cannot fully control, and a multi-issue release dilutes the story past what journalists will cover cleanly. It ties the free-media strategy directly to the budget constraint and specifies concrete choices (a clear visual, a quotable line) that make the event newsworthy.",
    furtherReading: [
      "Entman's theory of framing in political communication",
      "Paid versus earned media strategy under budget constraints",
      "Message discipline and voter recall research",
    ],
    premium: true,
    testsFundamentals: ["pol-campaign-paid-earned-media", "pol-campaign-message-framing"],
  },
  {
    id: "pol-campaign-threshold-survival-appeal",
    profession: "politics",
    category: "Campaign Strategy",
    title: "A Coalition Partner Near the Threshold",
    scenario:
      "You advise a small party that has governed for four years as the junior partner in a coalition and now polls at 4.2%, just under the minimum vote-share threshold most seat-allocation systems require for a party to enter the legislature at all. Your senior coalition partner is polling comfortably above the threshold on its own. Three weeks remain before the vote, and your internal data shows roughly 2% of the electorate consists of the larger partner's own sympathizers who like your party but are voting for the bigger one out of habit. A public appeal asking those sympathizers to lend you their vote this one time, on the understanding the two parties will likely govern together again, could close the gap, but it risks costing your partner some of its own vote share and could look like an admission of weakness to swing voters. You must recommend whether to run this appeal and how to frame it.",
    keyIssues: [
      "Whether the party's own weak position justifies asking the coalition partner's supporters for their vote",
      "How explicitly to frame a loan-vote appeal without signaling panic to swing voters",
      "Risk this poses to the larger partner's own vote share and to the coalition relationship",
      "Alternative uses of the final three weeks if the appeal is judged too risky",
    ],
    expectedConcepts: [
      "threshold survival strategy",
      "loan-vote appeal",
      "coalition signaling",
      "wasted vote",
      "swing-voter perception",
    ],
    modelApproach:
      "A strong answer recognizes that below the threshold every vote for the party is functionally wasted, which changes the calculus considerably from an ordinary persuasion campaign, and recommends a targeted, narrowly worded appeal aimed specifically at the identified 2% of the larger partner's sympathizers rather than a public, headline-grabbing plea that could read as panic. It weighs the real cost to the coalition partner and proposes coordinating the ask with that partner in advance rather than launching it unilaterally.",
    furtherReading: [
      "Threshold effects in proportional representation systems",
      "Loan-vote (tactical voting) campaigns between coalition allies",
      "Voter perception of vulnerability signaling in late campaigns",
    ],
    premium: true,
    testsFundamentals: ["pol-campaign-threshold-survival", "pol-campaign-strategic-voting-appeals"],
  },
  {
    id: "pol-campaign-exclusion-statement",
    profession: "politics",
    category: "Campaign Strategy",
    title: "Ruling a Coalition Partner In or Out",
    scenario:
      "You are the strategist for a mid-sized party heading into a legislative election where no single party is expected to win a majority. A rapidly growing party on the political fringe is polling at 18% and is expected to place second nationally. Journalists press your candidate in every interview to say clearly whether the party would ever govern with, or accept support from, the fringe party under any circumstance, and whether your party would join other mainstream parties in an explicit pact to keep that fringe party out of government regardless of its seat count. Your internal polling shows a clear, public exclusion statement wins back some centrist voters currently drifting toward a rival mainstream party, but risks handing the fringe party a rhetorical win by letting it claim the political establishment is uniting against ordinary voters' choice. You must advise the candidate on what to say before the next debate.",
    keyIssues: [
      "Whether an explicit, public exclusion statement helps or hands the fringe party a grievance narrative",
      "How coalition signaling before the vote shapes which voters treat your party as a legible choice",
      "Weighing participation in a cross-party blocking arrangement against appearing to override voters' choices",
      "Timing: committing early for clarity versus preserving post-election negotiating flexibility",
    ],
    expectedConcepts: [
      "coalition signaling",
      "exclusion statement",
      "blocking coalition",
      "cordon sanitaire",
      "legitimacy narrative",
    ],
    modelApproach:
      "A strong answer treats the exclusion statement as inseparable from the coalition-signaling problem: voters read a vote for a mid-sized party partly as a vote for which governing combination it makes possible, so ambiguity itself carries a cost. It recommends a clear, values-based exclusion statement rather than a purely tactical one, addresses the legitimacy-narrative risk directly, and distinguishes ruling out governing with the fringe party from the separate, more discretionary decision of joining a formal cross-party blocking pact.",
    furtherReading: [
      "Coalition signaling and voter behavior in multiparty systems",
      "The cordon sanitaire strategy against extremist parties",
      "Comparative studies of exclusion statements and their electoral effects",
    ],
    premium: true,
    testsFundamentals: ["pol-campaign-coalition-signaling", "pol-campaign-blocking-coalition"],
  },
  {
    id: "pol-campaign-list-leader-brand",
    profession: "politics",
    category: "Campaign Strategy",
    title: "Branding the Campaign Around the List Leader",
    scenario:
      "You direct communications for a party running in a proportional, list-based election where voters technically choose a party rather than an individual. Your party's number-one list candidate, who would become head of government if the party leads the next coalition, has far higher personal approval than the party brand itself, and focus groups increasingly refer to the party by her name rather than its official name. Some senior figures on the list want campaign materials to foreground her image and personal story almost exclusively, arguing it is the party's strongest asset with eleven weeks to go. Others worry an overly personalized campaign leaves the party's actual platform under-communicated, risks alienating other list candidates who feel sidelined, and could backfire if her personal ratings dip before the vote. You must recommend how far to push the personalization.",
    keyIssues: [
      "How far to build campaign branding around a popular list leader without eclipsing the platform",
      "Risk to internal party cohesion if other list candidates feel their own campaigns are sidelined",
      "Vulnerability created if the strategy depends heavily on one person's personal popularity",
      "Ensuring the party's actual governing platform still reaches voters despite the personalized branding",
    ],
    expectedConcepts: [
      "leader personalization",
      "party brand versus candidate brand",
      "list-based campaign strategy",
      "message discipline",
      "internal party cohesion",
    ],
    modelApproach:
      "A strong answer treats personalization as a genuine asset worth using given the polling gap between the leader and the party brand, but recommends anchoring it to specific, repeatable platform commitments rather than image alone, so the campaign does not become entirely dependent on one person's popularity. It also flags the internal-cohesion cost among other list candidates and proposes a concrete way to keep them visibly part of the campaign.",
    furtherReading: [
      "Personalization of politics in party-list electoral systems",
      "Leader effects on party vote share",
      "Balancing candidate branding with party platform communication",
    ],
    premium: true,
    testsFundamentals: ["pol-campaign-leader-personalization"],
  },
  {
    id: "pol-campaign-financing-and-airtime",
    profession: "politics",
    category: "Campaign Strategy",
    title: "A Spending Cap and a Debate Snub",
    scenario:
      "You are the compliance and communications lead for a newly formed party contesting its first national election. Campaign-finance rules in your jurisdiction cap total spending and require public disclosure of donations above a set amount, while public financing for established parties is calculated from past electoral results your new party does not yet have. Two weeks before the vote, the public broadcaster announces a televised leaders' debate that includes only the four parties currently holding seats, excluding your party despite its polling at 7%, above the seat-based threshold used elsewhere in the process. Your campaign is already near the legal spending cap after a large early advertising push, so there is little room left to buy alternative airtime, and your legal team is debating whether to formally challenge the exclusion as inconsistent with equal-opportunity principles or instead invest remaining resources in earned coverage of the snub itself.",
    keyIssues: [
      "Whether formally challenging the debate exclusion is worth the time and resource cost this close to the vote",
      "How the spending cap and reliance on public financing formulas structurally disadvantage a new entrant",
      "Whether the exclusion itself can be turned into an earned-media opportunity",
      "Ensuring continued compliance with donation disclosure rules under time pressure",
    ],
    expectedConcepts: [
      "party financing regulation",
      "equal opportunity principle",
      "spending cap",
      "debate access rules",
      "new entrant disadvantage",
    ],
    modelApproach:
      "A strong answer recognizes that financing formulas built on past results and a debate-access rule built on current seats both structurally disadvantage a new entrant regardless of current polling, and treats a formal equal-access challenge and public earned-media framing of the exclusion as complementary rather than either-or. It stays explicit about the binding spending-cap constraint and recommends against risking non-compliance to manufacture more paid exposure.",
    furtherReading: [
      "Public party financing formulas and new-entrant disadvantage",
      "Equal-opportunity principles in campaign-finance regulation",
      "Debate access rules and their effect on smaller parties",
    ],
    premium: true,
    testsFundamentals: ["pol-campaign-party-financing-fairness", "pol-campaign-debate-airtime-rules"],
  },
  {
    id: "pol-campaign-runoff-consolidation-case",
    profession: "politics",
    category: "Campaign Strategy",
    title: "Consolidating a Fragmented First Round",
    scenario:
      "Your candidate advanced to the second round of a two-round election with 24% of the first-round vote, narrowly ahead of a third-place candidate who is now eliminated. The two-week runoff campaign must now win over voters from six eliminated first-round candidates whose combined support totals 41%, ranging from a market-friendly centrist bloc to a smaller environmentalist party to a bloc of voters who backed a protest candidate largely out of anger at both mainstream blocs. Your opponent in the runoff, who led the first round with 27%, is making a similar consolidation pitch. You have two weeks and a fixed advertising budget to decide which eliminated candidates' voters to actively court, what commitments, if any, to make to them, and how to avoid alienating your own first-round base in the process.",
    keyIssues: [
      "Which eliminated candidates' voters are realistically persuadable within two weeks versus already lost",
      "What concrete commitments, if any, to offer without abandoning the first-round platform",
      "Risk of alienating your own core first-round voters while courting others",
      "How to sequence outreach given the compressed runoff timeline",
    ],
    expectedConcepts: [
      "runoff consolidation",
      "second-round strategy",
      "voter bloc analysis",
      "platform consistency",
      "compressed-timeline targeting",
    ],
    modelApproach:
      "A strong answer segments the 41% of eliminated-candidate voters by realistic persuadability rather than treating them as a single bloc, prioritizes the segments closest to the candidate's own coalition first, and proposes specific, credible commitments rather than vague appeals. It explicitly addresses the risk of diluting the first-round platform and sequences outreach given only two weeks to act.",
    furtherReading: [
      "Two-round electoral systems and runoff consolidation strategy",
      "Voter bloc transfer patterns between electoral rounds",
      "Coalition-building under compressed campaign timelines",
    ],
    premium: true,
    testsFundamentals: ["pol-campaign-runoff-consolidation", "pol-campaign-targeting-persuasion-turnout"],
  },
  {
    id: "pol-campaign-incumbent-headwinds",
    profession: "politics",
    category: "Campaign Strategy",
    title: "Campaigning as an Incumbent Against the Economic Wind",
    scenario:
      "You advise the head of government seeking re-election. Structural conditions are working against the campaign: growth has slowed for six consecutive quarters, and independent forecasters rate the race a genuine toss-up on fundamentals alone, well before any campaign event has occurred. At the same time, incumbency gives your candidate real assets: name recognition, a governing record to point to on other issues, and the institutional visibility of the office itself. Your opponent, a challenger with no governing record to defend, is running an entirely attack-based campaign focused on the economy. Senior aides are split between leaning hard into the incumbency advantage, emphasizing stability and experience, and instead distancing the candidate from the government's own record on the economy specifically while campaigning as a change agent on other issues. You have to recommend the overall framing for the final phase of the campaign.",
    keyIssues: [
      "Whether unfavorable economic fundamentals can realistically be overcome by incumbency-specific advantages",
      "How much to lean into the governing record versus selectively distancing from its weakest parts",
      "Risk that a change-agent framing undercuts the credibility incumbency is supposed to provide",
      "Setting realistic expectations for the campaign given what fundamentals-based forecasting already suggests",
    ],
    expectedConcepts: [
      "incumbency advantage",
      "structural fundamentals",
      "election forecasting",
      "record ownership",
      "change-agent framing",
    ],
    modelApproach:
      "A strong answer takes the fundamentals-based forecast seriously as a baseline rather than assuming tactics alone can overcome it, and recommends leveraging incumbency's genuine assets, visibility and a record on non-economic issues, selectively rather than either fully owning or fully disowning the economic record. It flags the contradiction risk in trying to be both the steady incumbent and a change agent at once, and proposes a coherent choice between the two framings rather than mixing them.",
    furtherReading: [
      "Structural fundamentals and election forecasting models",
      "The incumbency advantage in comparative perspective",
      "Record ownership versus distancing strategies for incumbents",
    ],
    premium: true,
    testsFundamentals: ["pol-campaign-incumbency-advantage", "pol-campaign-fundamentals-vs-events"],
  },
  {
    id: "pol-campaign-primary-to-general-pivot",
    profession: "politics",
    category: "Campaign Strategy",
    title: "Repositioning After Winning the Nomination",
    scenario:
      "Your candidate just won a competitive internal party nomination by taking a firmly hard-line position on an immigration-related policy that energized the party's most committed activists and members. Polling of the general electorate shows that position is held by only 22% of voters overall, while a more moderate version of the same underlying policy goal commands support from 54%. With the general campaign beginning in three days, your candidate must speak publicly about the issue for the first time since the nomination result, and the activists who campaigned hard for the hard-line position are watching closely for any sign of retreat. You need to recommend how the candidate should frame the position going forward without triggering an activist backlash or a credibility-destroying reversal story in the press.",
    keyIssues: [
      "Whether to shift toward the median general-electorate position or hold the nomination-winning position",
      "Risk of a damaging reversal narrative if the shift is framed as a flip rather than a refinement",
      "Managing activist backlash from the base that delivered the nomination win",
      "Framing the position in a way that survives contact with a much larger, less ideological electorate",
    ],
    expectedConcepts: [
      "primary-general tension",
      "median voter",
      "framing",
      "activist backlash",
      "credibility management",
    ],
    modelApproach:
      "A strong answer names the tension directly: the coalition that wins a nomination is rarely the coalition that wins a general election, and pretending otherwise risks losing both audiences. It recommends reframing the underlying goal in terms that can credibly stretch toward the 54% majority position without explicitly disavowing the nomination-era stance, and proposes direct, early engagement with activist leaders to manage the backlash before the press does it for the campaign.",
    furtherReading: [
      "The primary-general electorate tension in candidate positioning",
      "Median voter theory in campaign strategy",
      "Managing activist coalitions through a general election pivot",
    ],
    premium: true,
    testsFundamentals: ["pol-campaign-nomination-tension", "pol-campaign-message-framing"],
  },
  {
    id: "pol-campaign-ground-game-investment",
    profession: "politics",
    category: "Campaign Strategy",
    title: "Betting the Late Budget on the Ground Game",
    scenario:
      "You manage field operations for a party defending a narrow lead in a handful of competitive districts within an otherwise settled national race. With four weeks left, you have to decide between expanding the door-knocking and phone-banking program in those districts or redirecting the same funds into a final digital advertising push. Randomized studies your team has reviewed suggest in-person canvassing produces modest but real turnout gains among already-identified supporters, while your digital team argues a late ad push could still move a small number of genuinely undecided voters. The districts in question are expected to be decided by margins smaller than the ground game's typically measured effect, and your current volunteer capacity is only two-thirds of what would be needed to canvass every identified supporter in the remaining time. You must recommend the final allocation and, if canvassing wins out, how to close the capacity gap.",
    keyIssues: [
      "Whether the ground game's typical measured effect is large enough to plausibly decide these specific races",
      "How to weigh experimentally-supported turnout tactics against a less certain persuasion-focused ad buy",
      "Closing a volunteer capacity shortfall within a four-week window",
      "Whether resources should even be split across both tactics rather than fully committed to one",
    ],
    expectedConcepts: [
      "ground game",
      "field experiments",
      "get-out-the-vote",
      "canvassing effectiveness",
      "battleground resource allocation",
    ],
    modelApproach:
      "A strong answer weighs the ground game's evidence base directly against the margin expected to decide these specific districts, and recommends committing the bulk of remaining resources to expanding canvassing capacity given that the races are close enough for the ground game's typical effect to plausibly be decisive. It proposes a concrete plan to close the volunteer shortfall (recruitment, volunteer-multiplier tools, prioritizing the highest-turnout-probability supporters first) rather than treating the capacity gap as a reason to default to advertising instead.",
    furtherReading: [
      "Gerber and Green's randomized field experiments on canvassing effectiveness",
      "Ground game investment in close elections",
      "Volunteer capacity planning for late-campaign turnout operations",
    ],
    premium: true,
    testsFundamentals: ["pol-campaign-gotv-ground-game", "pol-campaign-resource-allocation-battlegrounds"],
  },
  {
    id: "pol-campaign-resurfaced-statement",
    profession: "politics",
    category: "Campaign Strategy",
    title: "An Old Nomination-Era Statement Resurfaces",
    scenario:
      "Two months before the general vote, a video surfaces of your candidate, filmed during the internal party nomination contest eighteen months ago, making a sharply worded statement aimed at energizing the party's base that plays very differently in front of the broader general electorate. Your opponent's team has already pushed the clip to journalists, and it is gaining traction within hours. Your own opposition-research unit had flagged this exact clip during vetting months ago but deprioritized it as unlikely to resurface. You have a same-day rapid-response window before the story hardens into the dominant narrative of the news cycle, and you must decide what the candidate says publicly and how fast.",
    keyIssues: [
      "How quickly a same-day response needs to go out before the story hardens into an accepted narrative",
      "Whether to contextualize the statement as base-directed nomination-era rhetoric or to apologize outright",
      "What the vetting failure means for how the rest of the candidate's record should now be re-reviewed",
      "Balancing a fast response against the risk of an insufficiently prepared statement making things worse",
    ],
    expectedConcepts: [
      "opposition research",
      "rapid response",
      "primary-general tension",
      "vetting",
      "news cycle management",
    ],
    modelApproach:
      "A strong answer treats speed as close to as important as substance, given how quickly an unanswered clip can define a candidate before a correction lands, and recommends a same-day, factual response that explains the nomination-era context without either dismissively minimizing the statement or over-apologizing for something said to a different audience under different stakes. It also flags the vetting failure as a reason to immediately re-run opposition research on the candidate's full public record before the opponent surfaces something else.",
    furtherReading: [
      "Rapid response operations and news cycle timing",
      "Opposition research vetting practices",
      "The primary-general tension as a recurring opposition-research target",
    ],
    premium: true,
    testsFundamentals: ["pol-campaign-opposition-research-rapid-response", "pol-campaign-nomination-tension"],
  },
];
