import type { CaseStudy } from "@/lib/caseStudyContent";
import type { Fundamental } from "@/lib/caseStudyFundamentals";

/**
 * Politics / Political Communication & Media: the fundamentals checklist and
 * the case bank for this category, kept together so they can be written and
 * reviewed as one unit. Registered in lib/cases/index.ts.
 *
 * This category is the steady-state, day-to-day communication discipline of
 * governing between elections: press relations, framing, hostile interviews,
 * social media presence, and public-opinion management. It is deliberately
 * scoped apart from Campaign Strategy (election-season campaigning:
 * fundraising, voter targeting, debate prep) and Crisis Response (reactive,
 * incident-driven emergency communication) — none of the cases here involve
 * an active election or an acute incident.
 *
 * Cases are written to be jurisdiction-neutral: no single country's
 * statutes, courts, or offices are named, so the same bank works whether a
 * user is graded against a presidential system (US, French presidential),
 * a parliamentary/coalition system (Germany, Spain, Sweden), or any other
 * structure.
 */
export const POLITICS_COMMUNICATION_MEDIA_FUNDAMENTALS: Fundamental[] = [
  { id: "pol-comms-message-discipline", label: "Maintaining message discipline on a small number of core governing themes across many months without diluting them into an unfocused list" },
  { id: "pol-comms-issue-ownership-framing", label: "Choosing which side of a contested issue to actively frame and own, rather than only reacting to the frame an opponent or outlet has already set" },
  { id: "pol-comms-hostile-interview-technique", label: "Handling an adversarial interview question using bridging and pivot technique without appearing evasive or getting trapped into a damaging soundbite" },
  { id: "pol-comms-on-background-off-record-discipline", label: "Using on-the-record, on-background, and off-the-record channels appropriately, and recognizing when a promised confidentiality arrangement is likely to be broken" },
  { id: "pol-comms-press-corps-relations", label: "Maintaining a working relationship with the press corps that preserves access and credibility without crossing into favoritism or capture" },
  { id: "pol-comms-rapid-response-non-crisis", label: "Mounting a same-day rapid response to a damaging but non-crisis story before it hardens into the dominant narrative" },
  { id: "pol-comms-social-media-direct-reach", label: "Using direct-to-public social media channels to bypass traditional press filtering while managing the amplification risk of an unfiltered misstatement" },
  { id: "pol-comms-leak-management", label: "Distinguishing an authorized trial balloon from a damaging unauthorized leak, and responding to each appropriately" },
  { id: "pol-comms-collective-government-messaging", label: "Coordinating consistent messaging across ministries, departments, and coalition partners so that spokespeople are not visibly contradicting each other" },
  { id: "pol-comms-official-vs-partisan-communication", label: "Observing the line between an official's legitimate use of public-office communications resources and improper partisan or campaign-style use of them" },
  { id: "pol-comms-agenda-setting-vs-reactive-cycle", label: "Proactively setting the news agenda with planned announcements rather than only reacting to whatever the day's news cycle brings" },
  { id: "pol-comms-optics-visual-management", label: "Managing the visual framing of a public appearance (setting, backdrop, imagery) so the optics reinforce rather than undercut the intended message" },
  { id: "pol-comms-internal-deliberation-leak-exposure", label: "Responding to the leak of candid internal deliberations without either confirming damaging details or issuing a denial likely to be contradicted later" },
  { id: "pol-comms-press-access-fairness", label: "Allocating press access (interviews, pool spots, exclusives) in a way that avoids the appearance of punishing unfavorable outlets or rewarding only friendly ones" },
  { id: "pol-comms-polling-feedback-calibration", label: "Using tracking polls and message-testing data as a feedback loop to calibrate language, without over-reacting to short-term noise or appearing to govern by poll" },
  { id: "pol-comms-satire-criticism-restraint", label: "Judging when a satirical or critical piece is better left unanswered versus when it requires a response, to avoid amplifying it unnecessarily" },
  { id: "pol-comms-press-freedom-adversarial-balance", label: "Maintaining a normal adversarial relationship with a free press without tipping into actions that read as intimidation or suppression" },
  { id: "pol-comms-constituency-direct-communication", label: "Maintaining direct constituency-level communication (newsletters, local press, town halls) alongside national media strategy so local accountability does not erode" },
  { id: "pol-comms-gaffe-recovery", label: "Recovering from an unscripted misstatement or gaffe with a timely, proportionate correction rather than a prolonged defensive posture that extends the story" },
  { id: "pol-comms-spokesperson-delegation", label: "Deciding when a spokesperson should absorb a hostile story on the official's behalf versus when the principal must personally respond to be credible" },
];

export const POLITICS_COMMUNICATION_MEDIA_CASES: CaseStudy[] = [
  {
    id: "pol-comms-core-message-drift",
    profession: "politics",
    category: "Political Communication & Media",
    title: "Eighteen Months of Announcements, No Clear Story",
    scenario:
      "You are the communications director for a senior official roughly halfway through a multi-year term. Over the past eighteen months your office has put out announcements spanning a dozen different policy areas, each covered for a day or two and then forgotten, even though at least three of those initiatives have produced genuine, measurable results. Internal polling now shows that fewer than one in five voters can name a single thing the administration stands for, despite approval of the individual achievements running much higher when voters are prompted with specifics. A planning retreat this week will set the communications strategy for the second half of the term. Several senior advisers want to keep showcasing breadth, arguing it proves every ministry is pulling its weight, while you believe the office needs to narrow to two or three signature themes repeated relentlessly, even if that means several real accomplishments get far less airtime than they deserve.",
    keyIssues: [
      "Whether showcasing every ministry's work or narrowing to a few repeated themes better serves long-term public understanding",
      "The tradeoff between fairness to individual ministries and ministers who want their own work highlighted versus overall message clarity",
      "Converting unprompted recall, which is poor, into a usable asset given that prompted approval is already strong",
      "Designing a planning process that can survive new, unplanned news without reverting to a scattershot announcement calendar",
    ],
    expectedConcepts: [
      "message discipline",
      "agenda-setting theory",
      "signature themes",
      "unprompted vs. prompted recall",
      "narrative consistency",
    ],
    modelApproach:
      "A strong answer recommends narrowing to a small, deliberately chosen set of signature themes and disciplining every subsequent announcement to connect back to one of them, accepting the real cost that some genuine achievements will get less visibility than they deserve. It names the recall gap as the actual problem being solved, not approval, since approval is already healthy once voters are prompted, and proposes a governance process for the planning retreat that can incorporate unplanned news without collapsing back into an unfocused announcement calendar.",
    furtherReading: [
      "McCombs and Shaw's agenda-setting theory",
      "The concept of message discipline in political communication strategy",
      "Research on prompted versus unprompted recall in public-opinion measurement",
    ],
    testsFundamentals: ["pol-comms-message-discipline", "pol-comms-agenda-setting-vs-reactive-cycle"],
  },
  {
    id: "pol-comms-hostile-interview-prep",
    profession: "politics",
    category: "Political Communication & Media",
    title: "Prepping for a Known Interrupter",
    scenario:
      "Your principal is booked for a 25-minute long-form interview with a well-known interviewer whose program is famous for repeated interruptions and tightly sequenced follow-up questions designed to box guests into a damaging admission. The subject is a policy with genuinely mixed results: one flagship metric has improved by double digits, while a second, closely related metric has quietly gotten worse over the same period, a fact the interviewer's producers have already signaled they intend to raise with specific figures in hand. Your principal's past attempts to handle hostile follow-ups have sometimes drifted into repeating a scripted line word-for-word even when it no longer answers the actual question being asked, which reads on camera as evasive. You have two days to prepare a response strategy for the interview, including how to handle the one question you cannot credibly deny.",
    keyIssues: [
      "Preparing a substantive, honest answer to the one metric that has genuinely worsened, rather than a denial likely to be fact-checked on air",
      "Distinguishing genuine bridging technique from robotic repetition of an unresponsive scripted line",
      "Deciding which single theme to pivot back to repeatedly, regardless of which specific follow-up is asked",
      "Rehearsing for interruption specifically, not just for the anticipated questions in isolation",
    ],
    expectedConcepts: [
      "bridging technique",
      "pivot strategy",
      "concede-and-reframe",
      "issue ownership",
      "message discipline under pressure",
    ],
    modelApproach:
      "A strong answer prepares the principal to acknowledge the worsened metric candidly and explain it in context rather than deny or minimize a figure the interviewer can produce on screen, then pivots deliberately to the improved metric and the broader theme the office wants to own. It distinguishes genuine bridging, acknowledge, pivot, land, from the robotic repetition that reads as evasive, and rehearses specifically for being interrupted mid-answer so the principal has a short, complete version of the key point ready at any moment.",
    furtherReading: [
      "Bridging and pivot technique in adversarial media training",
      "The concede-and-reframe approach to handling a genuine, documented weakness on air",
      "Research on viewer perception of evasiveness in televised political interviews",
    ],
    testsFundamentals: ["pol-comms-hostile-interview-technique", "pol-comms-issue-ownership-framing"],
  },
  {
    id: "pol-comms-leak-trial-balloon",
    profession: "politics",
    category: "Political Communication & Media",
    title: "Two Leaks, Two Very Different Problems",
    scenario:
      "Ten days ago your office deliberately floated an unpopular reform proposal to a trusted reporter on background, an authorized trial balloon meant to gauge public reaction before any formal announcement, and the resulting coverage has been cautiously negative but manageable. This morning, a second and far more sensitive document has leaked, an internal memo in which three senior advisers sharply disagree with the official's own preferred version of the reform, written in blunt language never meant to leave the building. The second leak was not authorized by anyone in your office, and its source is unknown. Reporters are now treating both stories as part of the same narrative, that the reform is in disarray, even though one was a deliberate test and the other is a genuine internal-security failure. You have a few hours before the next briefing to decide how to respond to each separately.",
    keyIssues: [
      "Treating the authorized trial balloon and the unauthorized leak as genuinely different problems requiring different responses",
      "Responding to the leaked internal memo without confirming damaging specifics or issuing a denial likely to be contradicted by the document itself",
      "Deciding whether and how to acknowledge the earlier trial balloon now that it is being read together with the second leak",
      "Launching a leak investigation without the investigation itself becoming a second news story",
    ],
    expectedConcepts: [
      "trial balloon",
      "on-background sourcing",
      "leak management",
      "internal deliberation exposure",
      "narrative separation",
    ],
    modelApproach:
      "A strong answer separates the two leaks explicitly rather than letting a single disarray narrative cover both, treating the trial balloon as a deliberate, lower-stakes test whose negative reaction is itself useful input, while treating the internal memo's leak as a genuine breach requiring a careful, true, and non-confirming public line about the document's authenticity and a quiet, separate internal review. It avoids a sweeping denial that the document's own content could later contradict, and keeps the leak investigation itself out of public view wherever possible.",
    furtherReading: [
      "The strategic use of trial balloons and background sourcing in political communication",
      "Distinguishing authorized leaks from damaging unauthorized disclosures",
      "Crisis containment when internal deliberations become public",
    ],
    testsFundamentals: ["pol-comms-leak-management", "pol-comms-internal-deliberation-leak-exposure", "pol-comms-on-background-off-record-discipline"],
  },
  {
    id: "pol-comms-social-media-unfiltered-post",
    profession: "politics",
    category: "Political Communication & Media",
    title: "An 11 P.M. Reply That Won't Go Away",
    scenario:
      "Just before midnight, your principal personally replied to an online critic with a sharp, dismissive comment that undercuts the careful, disciplined tone your office has spent months building around its signature themes. By morning the reply has been screenshotted tens of thousands of times, and several outlets are running stories framing it as evidence of a thin-skinned temperament rather than engaging with the substantive point the critic had actually raised, which was itself a fair question about implementation timelines. Your principal insists on keeping personal control of the account rather than routing every post through the communications team, arguing that the direct, unfiltered voice is part of what makes the account effective in the first place. You have to recommend what to do with the post itself and what, if anything, changes about how the account is run going forward.",
    keyIssues: [
      "Whether to delete the post, leave it up with a follow-up, or address it in a different format entirely",
      "Separating the posting-control question from the immediate damage-control question so one decision does not get rushed by the other",
      "Designing a workable review step that preserves the account's authentic voice without removing all guardrails",
      "Redirecting attention back to the substantive implementation question the original critic actually raised",
    ],
    expectedConcepts: [
      "direct-to-public communication",
      "unfiltered amplification risk",
      "gaffe recovery",
      "message discipline",
      "proportionate correction",
    ],
    modelApproach:
      "A strong answer avoids an overcorrection that strips all spontaneity from the account, since that is the asset the principal values and partly why the channel works, but proposes a specific, narrow guardrail, such as a short delay or a single trusted second reader for anything posted outside normal hours, rather than full pre-clearance of every post. It recommends a brief, proportionate acknowledgment rather than either deletion with no comment or a defensive non-apology, and separately answers the substantive implementation question the original critic raised so the news cycle has a real story to move on to.",
    furtherReading: [
      "Direct-to-public communication and the bypassing of traditional media gatekeepers",
      "Research on amplification dynamics for unscripted official social-media posts",
      "Proportionate correction strategies after a minor but widely shared misstep",
    ],
    testsFundamentals: ["pol-comms-social-media-direct-reach", "pol-comms-gaffe-recovery"],
  },
  {
    id: "pol-comms-press-pool-exclusive-favoritism",
    profession: "politics",
    category: "Political Communication & Media",
    title: "A Blacklisting Accusation From the Press Corps",
    scenario:
      "Your press office allocates a weekly one-on-one interview slot and a handful of pool positions among roughly twenty outlets that regularly cover your official. Over the past four months, one consistently friendly outlet has received the interview slot more often than any other, while a second, more adversarial outlet has not been granted a single one-on-one since it published a sharply critical investigative piece five months ago, even though its day-to-day coverage since then has been unremarkable. A reporters' association representative has now raised, on the record, whether access is being allocated based on favorable coverage rather than any neutral rotation, and a few other outlets are privately asking the same question. You must decide how to respond to the accusation and, separately, whether and how to change the actual allocation process.",
    keyIssues: [
      "Whether the actual pattern of access, regardless of intent, would reasonably be read as retaliation for critical coverage",
      "Designing an access policy transparent and rule-based enough to survive the next similar accusation",
      "Responding to the reporters' association without conceding more than the facts actually warrant or appearing defensive",
      "Balancing legitimate efficiency reasons for favoring responsive, reliable outlets against the appearance of punishing critical ones",
    ],
    expectedConcepts: [
      "press access fairness",
      "press corps relations",
      "perceived retaliation",
      "rotation policy",
      "institutional credibility",
    ],
    modelApproach:
      "A strong answer does not simply assert that access decisions were made on the merits without examining whether the actual pattern supports that claim, and treats a credible appearance of retaliation as a real problem to fix even if no one intended it that way. It recommends moving to a more explicit, rule-based rotation that is easy to explain and defend publicly, and responds to the reporters' association by acknowledging the legitimate question directly rather than dismissing it, since a defensive non-answer would only confirm the suspicion.",
    furtherReading: [
      "Press pool and press-gallery access norms in political communication",
      "The appearance-of-retaliation standard in evaluating access decisions",
      "Case studies in press corps disputes over credentialing and access",
    ],
    testsFundamentals: ["pol-comms-press-access-fairness", "pol-comms-press-corps-relations"],
  },
  {
    id: "pol-comms-coalition-message-contradiction",
    profession: "politics",
    category: "Political Communication & Media",
    title: "Three Spokespeople, Three Different Timelines",
    scenario:
      "A new regulation your government has committed to is scheduled to take effect, but its exact start date has shifted twice during implementation planning. This morning, within a span of six hours, one ministry's spokesperson told reporters the rule takes effect next month, a second ministry's spokesperson said it had already been delayed to next year, and a junior coalition partner's spokesperson told a different outlet that the timeline was still under review entirely. By early afternoon, outlets are running a story less about the regulation itself than about a government that cannot coordinate its own basic messaging. You are the head of government's communications coordinator and must fix both the immediate contradiction and the underlying coordination gap before tomorrow's scheduled briefings across all three offices.",
    keyIssues: [
      "Establishing one verified, authoritative answer that every spokesperson actually works from before the next briefing",
      "Correcting the public record without further embarrassing any single ministry or coalition partner by name",
      "Diagnosing why three offices gave three answers in one day and fixing the coordination process, not just today's statement",
      "Rebuilding reporters' confidence that future timeline questions will get one consistent answer",
    ],
    expectedConcepts: [
      "collective government messaging",
      "coordination failure",
      "single source of truth",
      "spokesperson alignment",
      "government disarray narrative",
    ],
    modelApproach:
      "A strong answer's first move is establishing a single, confirmed answer and distributing it to every spokesperson before any further public statements, rather than letting each office issue its own correction separately. It addresses the contradiction honestly in the next briefing without assigning public blame to a specific ministry or coalition partner, and proposes a concrete coordination fix, such as a shared daily line-to-take document circulated before any spokesperson faces the press, so the same failure does not recur on the next sensitive timeline question.",
    furtherReading: [
      "Lines-to-take and coordinated-messaging practices across government departments",
      "Coalition communication discipline and the 'government in disarray' media narrative",
      "Case studies in cross-ministry message coordination failures",
    ],
    testsFundamentals: ["pol-comms-collective-government-messaging"],
  },
  {
    id: "pol-comms-official-resources-partisan-use",
    profession: "politics",
    category: "Political Communication & Media",
    title: "Where the Official Press Office Stops",
    scenario:
      "Your official's party is holding its internal leadership conference in six weeks, and your official is expected to make a pitch for a renewed mandate within the party. Several members of your team, drawn from the official public-communications office and paid from public funds, have begun drafting speech material and a social-media push explicitly framed around winning the internal leadership vote, and a staffer has already asked whether the official government press list can be used to promote conference attendance. Your ethics adviser has flagged that using public-office communications staff, equipment, or distribution lists for an explicitly intra-party political purpose crosses a real line, even though the same official will of course continue speaking publicly about government business during the same period. You must set out what the office can and cannot do in the six weeks before the conference.",
    keyIssues: [
      "Distinguishing communication about the official's government role from communication aimed at an internal party contest",
      "Deciding whether staff, lists, and equipment funded for official duties may be used for any part of the leadership pitch",
      "Setting a workable line for an official who must speak publicly on both government business and party matters during the same weeks",
      "Managing staff who may reasonably be unclear where the boundary actually falls without clear written guidance",
    ],
    expectedConcepts: [
      "official versus partisan communication",
      "public resource propriety",
      "ethics guidance",
      "separation of government and party communications",
      "staff role boundaries",
    ],
    modelApproach:
      "A strong answer sets a clear, written line separating government-business communication, which official staff and resources may continue supporting, from leadership-conference and party-specific messaging, which must be handled by separate party staff and funds, and directs the specific requests already raised, the social-media push and the press list, to be declined on the public-office side. It takes the ethics adviser's concern seriously rather than treating it as an obstacle, and gives staff concrete written guidance rather than leaving them to guess case by case.",
    furtherReading: [
      "Rules distinguishing official government communications from partisan political communication",
      "Ethics guidance on the use of public-office resources for internal party purposes",
      "Comparative practice on separating government and party communications staff",
    ],
    testsFundamentals: ["pol-comms-official-vs-partisan-communication"],
  },
  {
    id: "pol-comms-satire-response-decision",
    profession: "politics",
    category: "Political Communication & Media",
    title: "A Viral Sketch and a Buried Policy Critique",
    scenario:
      "A popular satirical program aired a sketch this week exaggerating your official's verbal mannerisms and a recent public stumble, and it has been viewed and shared far more widely than almost anything your office has put out this quarter. Several junior aides want a sharp public rebuttal, arguing the sketch is unfair and damaging if left unanswered. At the same time, a respected columnist published a serious, well-researched critique of a specific policy decision the same week, raising a substantive question your office has not yet addressed publicly, but that story is being completely overshadowed by the viral sketch. You have limited communications bandwidth this week and must decide how, if at all, to respond to the sketch, and whether to redirect attention to the substantive critique instead.",
    keyIssues: [
      "Weighing whether responding to the satire amplifies it further or genuinely limits its damage",
      "Recognizing that substantive criticism, not satire, is the more consequential story being ignored this week",
      "Allocating scarce communications bandwidth between a viral but low-stakes story and a serious but quieter one",
      "Choosing a tone, if any response to the satire is made, that does not read as thin-skinned",
    ],
    expectedConcepts: [
      "satire and parody in political communication",
      "the Streisand effect",
      "agenda-setting under limited bandwidth",
      "substantive versus viral news value",
      "proportionate response",
    ],
    modelApproach:
      "A strong answer generally recommends leaving the satirical sketch largely unanswered, or responding only with a brief, self-deprecating line at most, since a forceful rebuttal would likely amplify it further without changing many minds. It redirects the office's actual communications effort toward the substantive policy critique, which deserves and currently lacks a real public answer, treating that as the more consequential use of this week's limited bandwidth even though it will draw far less immediate attention than the viral sketch.",
    furtherReading: [
      "Research on the Streisand effect and the risk of amplifying criticism by responding to it",
      "The role of satire and parody in political communication",
      "Agenda-setting and the allocation of scarce communications attention",
    ],
    testsFundamentals: ["pol-comms-satire-criticism-restraint", "pol-comms-agenda-setting-vs-reactive-cycle"],
  },
  {
    id: "pol-comms-press-credential-dispute",
    profession: "politics",
    category: "Political Communication & Media",
    title: "A Frustrated Aide Wants a Reporter's Access Pulled",
    scenario:
      "A specific journalist has spent the past two months asking unusually pointed, persistent questions at every briefing about a contract award your official's office approved, questions that are legally fair game and not inaccurate, but that your chief of staff finds personally confrontational in tone. The chief of staff has asked you, as press secretary, to quietly remove that journalist from the regular briefing list going forward, citing disruption to the briefing's flow. You believe the questions, while uncomfortable, are legitimate oversight journalism rather than harassment, and that removing the journalist would likely become its own much larger story about press suppression if it ever became known, which in a small press corps it almost certainly would. You must respond to your chief of staff's request and propose how to actually handle the underlying discomfort with the journalist's questions.",
    keyIssues: [
      "Distinguishing genuinely hostile or disruptive conduct from merely uncomfortable but legitimate oversight questioning",
      "Weighing the real risk that removing access becomes a bigger story than the original contract questions",
      "Proposing a constructive way to handle a persistent journalist that does not involve restricting access",
      "Managing internal pressure from a superior while maintaining your own professional judgment as press secretary",
    ],
    expectedConcepts: [
      "press freedom and adversarial balance",
      "press access fairness",
      "oversight journalism",
      "the optics of access restriction",
      "professional independence of a press office",
    ],
    modelApproach:
      "A strong answer pushes back on the request to remove the journalist's access, explaining plainly that pointed, legally fair questioning is not a legitimate basis for restricting access and that doing so would likely cause far more damage than the original questions ever could. It proposes handling the discomfort directly instead, by preparing better, more complete answers to the contract questions so they stop generating uncomfortable follow-ups, and by offering the journalist a direct briefing on the underlying facts rather than trying to limit their access to the story.",
    furtherReading: [
      "Press freedom norms and the limits of government control over journalist access",
      "Oversight journalism and its role in democratic accountability",
      "Case studies in credential and access disputes between governments and the press",
    ],
    testsFundamentals: ["pol-comms-press-freedom-adversarial-balance", "pol-comms-press-access-fairness"],
  },
  {
    id: "pol-comms-polling-driven-message-shift",
    profession: "politics",
    category: "Political Communication & Media",
    title: "The Phrase That Tests Badly",
    scenario:
      "For the past year your official has consistently used a specific phrase to describe a sensitive policy area, and your internal pollster now reports that the phrase itself is testing significantly worse than the underlying policy, with focus-group participants associating the wording with a previous, unpopular administration even though the current policy differs substantially in substance. Switching language now, fourteen months into consistent use of the old phrase, risks a story about an abrupt reversal or an admission that the previous framing was a mistake, especially since two rival officials have already begun using the new wording themselves, in the opposite direction, after presumably seeing similar data of their own. You must recommend whether and how to adjust the language, and how to explain any change if it is noticed.",
    keyIssues: [
      "Weighing the real communication cost of the old phrase against the real risk of a visible reversal",
      "Designing a transition that reframes gradually rather than announcing an abrupt change in wording",
      "Responding, if asked, in a way that does not read as governing by poll",
      "Accounting for rival officials already shifting their own language in the same space",
    ],
    expectedConcepts: [
      "message testing",
      "framing",
      "polling as feedback loop",
      "perceived flip-flopping",
      "gradual reframing",
    ],
    modelApproach:
      "A strong answer treats the polling data as a real signal worth acting on rather than noise to be ignored, but recommends a gradual, substantive reframing, introducing new language alongside the old for a period rather than an abrupt switch, so the shift reads as a natural evolution in explanation rather than a reversal. If asked directly, it recommends being honest that the new phrasing communicates the same underlying policy more clearly, rather than denying that language has changed at all, which would be easily disproven.",
    furtherReading: [
      "Message testing and tracking-poll methodology in political communication",
      "Framing theory and the effect of wording on policy perception",
      "Research on perceived flip-flopping and language change in political messaging",
    ],
    testsFundamentals: ["pol-comms-polling-feedback-calibration", "pol-comms-issue-ownership-framing"],
  },
  {
    id: "pol-comms-constituency-national-balance",
    profession: "politics",
    category: "Political Communication & Media",
    title: "Famous Nationally, Forgotten Locally",
    scenario:
      "Over the past two years, your official's communications effort has focused almost entirely on national television appearances and national outlets, building real national profile and a growing reputation on a signature issue. Meanwhile, the local paper covering your official's own home district has run a piece noting that no local town hall has been held in over a year, a local hospital funding question constituents have repeatedly raised publicly has gone unanswered, and a well-liked local newsletter the office used to send monthly stopped eighteen months ago without explanation. A primary or re-selection contest is approaching, and a credible local challenger is already making constituent neglect a central part of an early campaign message. You must recommend how to rebalance communications effort between the national profile that has taken years to build and the local relationship that has clearly eroded.",
    keyIssues: [
      "Whether national profile-building has come at a real, now-visible cost to constituency relationships",
      "Designing a realistic local-communication cadence that can be sustained alongside an ongoing national role",
      "Addressing the specific, named local grievance (the hospital funding question) rather than only resuming general local visibility",
      "Responding to a challenger's neglect narrative without appearing to confirm it through a sudden, visibly reactive burst of local activity",
    ],
    expectedConcepts: [
      "constituency communication",
      "local versus national media strategy",
      "constituent service visibility",
      "the neglect narrative",
      "sustainable communication cadence",
    ],
    modelApproach:
      "A strong answer does not simply announce a one-off local event to counter the story, recognizing that a visibly reactive burst of local activity right as a challenger raises the issue would itself read as confirming the neglect narrative. It recommends restoring a sustainable, regular local cadence, resuming the newsletter, scheduling a recurring town hall, and specifically answering the hospital funding question that constituents have been raising, while keeping the national role intact rather than treating the two as a zero-sum tradeoff.",
    furtherReading: [
      "Constituency communication and the service-responsiveness literature in representation studies",
      "Local versus national media strategy for sitting officeholders",
      "Case studies in the 'national profile, local neglect' challenge narrative",
    ],
    testsFundamentals: ["pol-comms-constituency-direct-communication"],
  },
  {
    id: "pol-comms-townhall-gaffe-recovery",
    profession: "politics",
    category: "Political Communication & Media",
    title: "An Unscripted Answer, Clipped and Spreading",
    scenario:
      "During an open question-and-answer session at a community town hall, your official gave a rambling, poorly phrased answer to a question about a sensitive demographic policy issue, an answer that, taken in full, was defensible but that contains one eleven-second segment, stripped of context, that sounds considerably worse than what was actually meant. That clip is now the most-shared piece of video from the event by a wide margin, and two rival offices have already issued statements condemning it. Your official is adamant the full answer was fine and is reluctant to apologize for something taken out of context, while your deputy believes any delay in addressing it will let the out-of-context version harden into the only version anyone remembers. You must recommend, within the next two hours, how to respond and whether the official should personally address it or a spokesperson should.",
    keyIssues: [
      "Weighing the real cost of delay against the real cost of a rushed, insufficiently considered response",
      "Deciding whether to release the full, unedited exchange as context rather than relying on a verbal explanation alone",
      "Judging whether the official addressing it personally adds credibility or risks a second unscripted misstep",
      "Crafting a response proportionate to what was actually said, rather than either over-apologizing or dismissively blaming editing alone",
    ],
    expectedConcepts: [
      "gaffe recovery",
      "context stripping",
      "spokesperson delegation",
      "proportionate correction",
      "rapid response",
    ],
    modelApproach:
      "A strong answer recommends acting the same day, releasing the full, unedited exchange so the context is verifiably available rather than merely asserted, paired with a short, proportionate clarifying statement, over outright dismissal or a sweeping apology for something said in full context differently than the clip suggests. It weighs whether the official should personally deliver the clarification, which can add credibility precisely because it is the official's own words being clarified, against the real risk of a second unscripted misstep, and generally favors a prepared, brief personal statement over an unscripted follow-up appearance.",
    furtherReading: [
      "Gaffe recovery strategy and the role of releasing full, unedited context",
      "Context stripping and clip-based misrepresentation in modern media cycles",
      "Spokesperson versus principal response strategy for unscripted remarks",
    ],
    testsFundamentals: ["pol-comms-gaffe-recovery", "pol-comms-spokesperson-delegation"],
  },
  {
    id: "pol-comms-rapid-response-expense-story",
    profession: "politics",
    category: "Political Communication & Media",
    title: "An Expense Story With Hours, Not Days, to Respond",
    scenario:
      "An investigative outlet is publishing a story this evening alleging that your official's senior aide billed public travel funds for what appears to be a personal trip, based on documents the outlet has obtained through a records request. The underlying facts are genuinely ambiguous, the trip combined an official engagement with one extra personal day, and the aide insists the extra cost was paid out of pocket, but the documentation to prove that has not yet been located. The outlet has given your office until the end of the day to respond before publishing. This is a reputational problem, not an emergency, but a same-day broadcast cycle means any response has to go out within hours, and your deputy has to decide whether the official or the aide personally should be the one to respond, or whether a written statement from the press office is enough.",
    keyIssues: [
      "Responding honestly to a genuinely ambiguous set of facts without either admitting wrongdoing not yet established or denying something that may later be documented",
      "Deciding how fast a response needs to go out before the outlet's own framing becomes the only available account",
      "Choosing whether the press office, the aide, or the official should be the one to respond, given the story centers on the aide rather than the official directly",
      "Committing to produce the missing documentation promptly rather than letting the ambiguity simply sit unresolved",
    ],
    expectedConcepts: [
      "rapid response",
      "same-day news cycle management",
      "spokesperson delegation",
      "factual ambiguity in crisis-adjacent stories",
      "proportionate acknowledgment",
    ],
    modelApproach:
      "A strong answer treats the same-day deadline as a real constraint and gets a factual, honest statement to the outlet before publication rather than staying silent and ceding the entire initial frame to the story as written. It recommends the response come from the press office on the aide's behalf rather than pulling the official personally into a story that, on current facts, concerns a staff member's expenses, and commits publicly to producing the missing receipt or documentation promptly rather than leaving the ambiguity unresolved indefinitely.",
    furtherReading: [
      "Same-day rapid response strategy for non-crisis reputational stories",
      "The role of documentation and verifiable fact in resolving ambiguous allegations quickly",
      "Spokesperson delegation when a story centers on staff rather than the principal",
    ],
    testsFundamentals: ["pol-comms-rapid-response-non-crisis", "pol-comms-spokesperson-delegation"],
  },
  {
    id: "pol-comms-factory-visit-optics",
    profession: "politics",
    category: "Political Communication & Media",
    title: "A Jobs Announcement Inside a Factory That's Cutting Jobs",
    scenario:
      "Your office is planning a visit to a manufacturing facility to announce a new regional jobs-investment program, chosen because it is the most visually impressive factory floor available on short notice. Two days before the visit, you learn the same facility announced a round of layoffs affecting roughly 8 percent of its workforce six weeks ago, a fact your advance team had not flagged, and local reporters are very likely to know this given it was covered locally at the time. Your events team wants to proceed as planned, arguing the backdrop and factory-floor imagery are too valuable to lose this close to the date, while your communications director worries that announcing a jobs program inside a facility currently cutting jobs will dominate coverage and undercut the announcement entirely. You must decide whether to proceed at this location, change it, or adjust the framing, with two days left to act.",
    keyIssues: [
      "Weighing the visual value of the planned backdrop against the real risk it undercuts the announcement's own substance",
      "Deciding whether a changed venue this close to the date is more damaging than proceeding with careful framing",
      "Determining what, if anything, the office should proactively say about the facility's recent layoffs rather than waiting to be asked",
      "Building a basic advance-team check for a situation like this so it is caught earlier next time",
    ],
    expectedConcepts: [
      "optics and visual framing",
      "advance-team due diligence",
      "backdrop selection",
      "proactive disclosure",
      "venue risk assessment",
    ],
    modelApproach:
      "A strong answer treats this as a real framing risk, not a minor scheduling inconvenience, and generally recommends changing the venue if a comparably strong alternative can be found in two days, since announcing new jobs at a facility currently cutting them invites an obvious and damaging contrast reporters will not miss. If no alternative venue is workable in time, it recommends proactively acknowledging the layoffs in the announcement itself rather than waiting to be asked, and separately fixes the advance-team process so a basic news-history check on any planned venue happens well before the two-day mark going forward.",
    furtherReading: [
      "Optics and visual framing in televised political events",
      "Advance-team due diligence practices for venue selection",
      "Case studies in backdrop choices that contradicted their own announcement's message",
    ],
    testsFundamentals: ["pol-comms-optics-visual-management", "pol-comms-issue-ownership-framing"],
  },
];
