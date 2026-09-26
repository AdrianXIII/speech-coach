import type { CaseStudy } from "@/lib/caseStudyContent";
import type { Fundamental } from "@/lib/caseStudyFundamentals";

/**
 * Politics / Crisis Response: the fundamentals checklist and the case bank
 * for this category, kept together so they can be written and reviewed as
 * one unit. Registered in lib/cases/index.ts.
 */
export const POLITICS_CRISIS_RESPONSE_FUNDAMENTALS: Fundamental[] = [
  { id: "pol-crisis-lifecycle", label: "Identifying which phase of a crisis (warning signs, acute, chronic, resolution) a situation is in and adapting the response accordingly" },
  { id: "pol-crisis-situational-awareness", label: "Building a verified, shared operating picture across responding agencies before acting on early, unconfirmed reports" },
  { id: "pol-crisis-command-structure", label: "Establishing a clear chain of command and decision authority across agencies and levels of government during a crisis" },
  { id: "pol-crisis-speed-accuracy-communication", label: "Balancing speed against accuracy in public crisis communication by stating clearly what is confirmed and what remains unknown" },
  { id: "pol-crisis-worst-case-decisionmaking", label: "Acting on a reasonable worst-case scenario under incomplete information and time pressure, then scaling the response as better data arrives" },
  { id: "pol-crisis-risk-perception", label: "Accounting for the psychology of public risk perception (dread, unfamiliarity) rather than assuming statistics alone will settle public fear" },
  { id: "pol-crisis-accountability-vs-blame-avoidance", label: "Choosing visible accountability over blame-avoidance and deflection when a crisis exposes an official's own failure" },
  { id: "pol-crisis-mutual-aid", label: "Using pre-negotiated mutual aid and resource-sharing arrangements to mobilize help once local capacity is overwhelmed" },
  { id: "pol-crisis-scenario-planning", label: "Preparing for plausible crisis scenarios in advance through pre-assigned roles, protocols, and exercises rather than improvising under pressure" },
  { id: "pol-crisis-post-crisis-review", label: "Conducting a structural after-action review that targets systemic failure, not just individual blame, and feeds lessons back into preparedness" },
  { id: "pol-crisis-national-regional-coordination", label: "Managing coordination friction between national and regional or local authorities with overlapping crisis responsibilities" },
  { id: "pol-crisis-emergency-powers-legal-thresholds", label: "Identifying the legal threshold and scope of emergency powers being invoked and which legislative or judicial check applies to that tier" },
  { id: "pol-crisis-military-civil-support", label: "Deciding when and how to deploy armed forces to support, not replace, civilian authority in a domestic crisis" },
  { id: "pol-crisis-expert-advisory-bodies", label: "Using independent scientific or technical advisory bodies to inform and lend credibility to crisis decisions without ceding political accountability" },
  { id: "pol-crisis-public-warning-systems", label: "Designing and maintaining a public alert and warning system capable of reaching the affected population in time" },
  { id: "pol-crisis-formal-accountability-mechanisms", label: "Anticipating formal accountability mechanisms after a failed response, such as an independent or legislative inquiry, distinct from a voluntary internal review" },
  { id: "pol-crisis-civil-unrest-outside-playbook", label: "Responding to a crisis that falls outside the standard disaster playbook, such as sustained civil unrest or a public-order emergency" },
  { id: "pol-crisis-whole-of-society-preparedness", label: "Building whole-of-society preparedness and resilience — public stockpiling, household readiness, private-sector coordination — ahead of a crisis" },
  { id: "pol-crisis-resource-prioritization-triage", label: "Prioritizing and triaging scarce emergency resources (personnel, equipment, medical capacity) when need exceeds available supply" },
  { id: "pol-crisis-media-information-environment", label: "Managing the crisis information environment against rumor and misinformation amplified by media and social platforms" },
];

export const POLITICS_CRISIS_RESPONSE_CASES: CaseStudy[] = [
  {
    id: "pol-crisis-disaster-response",
    profession: "politics",
    category: "Crisis Response",
    title: "Coordinating Disaster Response",
    scenario:
      "A major flood has devastated a region of your country, displacing 100,000 people and causing an estimated 800 million in damage to infrastructure. Regional and local officials are overwhelmed and are requesting immediate support from the national government, but initial reports are inconsistent about the scale of damage and specific needs. Neighboring regions have offered to send personnel and equipment, but no framework exists yet for coordinating or reimbursing that help quickly. Political opponents are already criticizing the pace of the response, even as agencies are still assessing the situation on the ground. You are advising the head of government on the next public statement and on how to allocate the first wave of national resources.",
    keyIssues: [
      "Balancing rapid, visible action against the risk of misallocating resources based on incomplete information",
      "Public communication that shows urgency without overpromising on timelines that cannot be met",
      "Coordination friction between national, regional, and local authorities with overlapping responsibility for the response",
      "Whether and how to draw in support offered by neighboring regions, and how that support gets organized without slowing the response down",
    ],
    expectedConcepts: [
      "emergency management coordination",
      "crisis communication",
      "national-regional coordination",
      "mutual aid / inter-regional resource sharing",
      "resource allocation under uncertainty",
    ],
    modelApproach:
      "A strong answer prioritizes deploying resources for immediate life-safety needs even under incomplete information, rather than waiting for perfect data, while being honest in public communication about what is and is not yet known. It also treats the neighboring regions' offer of help as something to accept through a fast, pre-agreed process rather than negotiate from scratch, and treats political criticism as a communications challenge to manage, not a reason to change operational priorities reactively.",
    furtherReading: [
      "Comparative emergency management coordination frameworks (national and regional government)",
      "Crisis communication best practices in government",
      "Mutual aid and inter-regional resource-sharing agreements in disaster response",
    ],
    testsFundamentals: ["pol-crisis-worst-case-decisionmaking", "pol-crisis-national-regional-coordination", "pol-crisis-mutual-aid"],
  },
  {
    id: "pol-crisis-public-health",
    profession: "politics",
    category: "Crisis Response",
    title: "Public Health Emergency Messaging",
    scenario:
      "Health authorities have identified an emerging infectious disease outbreak with still-uncertain transmission and severity data. Early, cautious guidance risks being seen as an overreaction if the threat turns out to be mild; delayed action risks a severe outbreak if the threat is serious. Public trust in health authorities is already fragile from past inconsistent messaging. You're advising on the government's initial public communication.",
    keyIssues: [
      "Communicating genuine scientific uncertainty without either alarmism or false reassurance",
      "Precautionary action under uncertainty versus waiting for more complete data",
      "Rebuilding fragile public trust through consistent, transparent messaging",
      "Preparing the public for guidance that may change as more is learned",
    ],
    expectedConcepts: [
      "risk communication",
      "precautionary principle",
      "public health messaging",
      "institutional trust",
      "uncertainty communication",
    ],
    modelApproach:
      "A strong answer recommends transparent communication of what is and isn't known, framing precautionary measures as reasonable given uncertainty rather than certainty of severity, and explicitly prepares the public for guidance to evolve — addressing the trust deficit by being honest about uncertainty rather than projecting false confidence in either direction.",
    furtherReading: [
      "Risk communication frameworks in public health (WHO and national public-health-agency guidance)",
      "Precautionary principle in public health decision-making",
      "Research on public trust and health messaging consistency",
    ],
    testsFundamentals: ["pol-crisis-speed-accuracy-communication", "pol-crisis-risk-perception"],
  },
  {
    id: "pol-crisis-coalition-collapse-premium",
    profession: "politics",
    category: "Crisis Response",
    title: "A Coalition Government on the Brink",
    premium: true,
    scenario:
      "You advise the head of government in a coalition administration. The junior coalition partner has just threatened to withdraw support over a contested policy unless it's reversed within 48 hours, which would trigger a confidence vote your government would likely lose. Reversing the policy publicly would look like capitulation and damage credibility with your own base ahead of elections next year. You have less than two days to recommend a path forward.",
    keyIssues: [
      "Whether a face-saving compromise exists that lets the junior partner claim a partial win without a full reversal",
      "Risk calculus of forcing a confidence vote versus conceding",
      "Managing your own base's perception of the outcome regardless of which path is chosen",
      "Time pressure and what can realistically be negotiated in 48 hours versus what needs more time",
    ],
    expectedConcepts: [
      "coalition governance",
      "confidence vote",
      "face-saving compromise",
      "political credibility",
      "brinkmanship",
    ],
    modelApproach:
      "A strong answer looks for a substantive but narrow concession — e.g., a review clause, a delayed implementation, or a carve-out — that gives the junior partner a credible claim to have moved the policy without a full public reversal, while being realistic about the confidence-vote math if no compromise is reachable in time.",
    furtherReading: [
      "Coalition government stability and confidence vote mechanics",
      "Face-saving negotiation tactics in political crises",
      "Case studies in coalition breakdown and recovery",
    ],
    testsFundamentals: ["pol-crisis-accountability-vs-blame-avoidance", "pol-crisis-worst-case-decisionmaking"],
  },
  {
    id: "pol-crisis-industrial-plant-explosion",
    profession: "politics",
    category: "Crisis Response",
    title: "An Explosion at a Chemical Plant",
    premium: true,
    scenario:
      "An explosion has struck a chemical processing plant on the edge of a mid-sized city, killing at least 6 workers and sending a toxic plume over nearby neighborhoods. In the first two hours, the plant operator, the fire service, the environmental regulator, and local police are each giving reporters different figures for casualties, evacuation radius, and what chemicals are actually involved. No single official has yet been named as being in charge of the overall response, and two agencies have issued conflicting evacuation instructions for the same street. You are advising the regional crisis coordinator on how to regain control of the response in the next hour.",
    keyIssues: [
      "Establishing a single, verified account of the incident that every responding agency actually works from, rather than each agency broadcasting its own partial picture",
      "Naming one person with clear authority over the overall response, and getting every agency to defer to that authority",
      "Correcting conflicting public instructions quickly without further damaging public trust",
      "Deciding how far to widen the evacuation zone before the full scope of the chemical release is confirmed",
    ],
    expectedConcepts: [
      "common operating picture",
      "incident command",
      "situational awareness",
      "verified versus unverified reporting",
      "unified public messaging",
    ],
    modelApproach:
      "A strong answer's first move is establishing a single, continuously updated, verified picture of casualties, the chemical release, and the affected area, and insisting every agency work from it rather than its own partial account. It names one incident commander with authority over the other responding agencies for the duration of the event, and treats resolving the conflicting evacuation instructions as urgent precisely because contradictory official messages erode public trust in everything that follows.",
    furtherReading: [
      "Incident command system doctrine for multi-agency emergencies",
      "Common operating picture and situational awareness in crisis response",
      "Case studies in industrial-accident coordination failures",
    ],
    testsFundamentals: ["pol-crisis-situational-awareness", "pol-crisis-command-structure"],
  },
  {
    id: "pol-crisis-cyberattack-power-grid",
    profession: "politics",
    category: "Crisis Response",
    title: "A Cyberattack on the Power Grid",
    premium: true,
    scenario:
      "A coordinated cyberattack has knocked out electricity to roughly 2 million people for what officials expect to be several days. A post-incident review of network logs shows unusual probing activity against the grid operator's systems going back at least four months, activity that was flagged internally at the time but never escalated to senior officials or acted on. No national contingency plan exists for a prolonged, multi-region power outage of this scale, so agencies are improvising evacuation of vulnerable people, backup power for hospitals, and public communication as they go. You are advising the minister responsible for critical infrastructure on both the immediate response and what to say about how this was allowed to happen.",
    keyIssues: [
      "Recognizing that this crisis had a months-long warning period that was missed, and what that implies for the current response",
      "Improvising a large-scale response without a rehearsed plan, and where that improvisation is creating unnecessary risk",
      "Whether and how to acknowledge publicly that the warning signs were missed, versus focusing only on the current response",
      "What minimum contingency planning should exist going forward for critical-infrastructure attacks of this kind",
    ],
    expectedConcepts: [
      "crisis lifecycle",
      "prodromal warning signs",
      "scenario and contingency planning",
      "critical infrastructure protection",
      "institutional learning",
    ],
    modelApproach:
      "A strong answer identifies that this crisis was in its prodromal stage for months before the acute failure, and that the cheapest response would have been catching the internal warning and escalating it, not the crisis response now underway. It treats the absence of a rehearsed contingency plan as the reason the government is now improvising decisions that should have been pre-agreed, and recommends building exactly that kind of pre-tested plan once the acute stage ends, rather than treating this as a one-off failure.",
    furtherReading: [
      "The crisis lifecycle model (warning signs to resolution)",
      "Scenario planning and exercises for critical-infrastructure crises",
      "Comparative approaches to cyberattack contingency planning for utilities",
    ],
    testsFundamentals: ["pol-crisis-lifecycle", "pol-crisis-scenario-planning"],
  },
  {
    id: "pol-crisis-bridge-collapse-inquiry",
    profession: "politics",
    category: "Crisis Response",
    title: "After a Bridge Collapse, Demands for an Inquiry",
    premium: true,
    scenario:
      "A highway bridge collapsed during evening traffic three weeks ago, killing 12 people. An internal agency review, completed in days, blamed a single inspector for missing a corroded support beam and recommended his dismissal. Families of the victims, opposition politicians, and engineering associations are now demanding an independent public inquiry, arguing that inspection budgets were cut for years and that the failure is structural, not individual. The transport minister must decide, within the next week, whether to accept the internal review as final or commission a broader independent inquiry that could take a year and implicate current and former officials. You are advising the minister on that decision.",
    keyIssues: [
      "Whether an internal review that assigns blame to one individual actually explains why the failure happened",
      "The political and reputational cost of commissioning an inquiry that could implicate the minister's own department or predecessors",
      "What an independent inquiry can uncover and change that an internal review cannot",
      "How to respond to the families and the public in the meantime without prejudging the inquiry's findings",
    ],
    expectedConcepts: [
      "after-action review",
      "independent public inquiry",
      "structural versus individual blame",
      "institutional learning",
      "accountability mechanisms",
    ],
    modelApproach:
      "A strong answer is skeptical of an internal review that closes the question in days by blaming a single individual, especially when a plausible structural cause, years of budget cuts, has not been examined. It recommends commissioning an independent inquiry precisely because it can examine funding and policy decisions an internal review has no mandate or incentive to examine, and treats the political cost to the minister as secondary to getting a review that will actually prevent the next collapse.",
    furtherReading: [
      "Design of independent public inquiries after infrastructure failures",
      "Structural versus individual-blame analysis in after-action review",
      "Comparative accountability mechanisms following major public-safety failures",
    ],
    testsFundamentals: ["pol-crisis-post-crisis-review", "pol-crisis-formal-accountability-mechanisms"],
  },
  {
    id: "pol-crisis-unrest-emergency-powers",
    profession: "politics",
    category: "Crisis Response",
    title: "Invoking Emergency Powers During Civil Unrest",
    premium: true,
    scenario:
      "For six straight nights, protests over a contested policy have turned into rioting in the capital, with looted shops, injured police officers, and blocked infrastructure. Police leadership says ordinary policing powers are no longer enough to restore order and is asking the government to invoke emergency powers that would allow curfews, expanded detention, and restrictions on assembly. Your legal advisers warn that the broadest emergency powers available require meeting a high legal threshold that this unrest may not yet satisfy, and that invoking them anyway risks legal challenge and further inflaming protesters who see the underlying policy grievance as legitimate. You are advising the head of government on whether to invoke emergency powers tonight, and at what level.",
    keyIssues: [
      "Whether the situation actually meets the legal threshold for the emergency powers being requested, or only for a narrower tier",
      "The risk that invoking powers beyond what is legally justified triggers a successful legal challenge and further loss of legitimacy",
      "Distinguishing the security problem (violence, looting) from the underlying political grievance driving the protests, and not letting emergency powers become a response to the grievance itself",
      "What legislative or judicial check attaches to the tier of powers being considered, and how that constrains the decision",
    ],
    expectedConcepts: [
      "legal thresholds for emergency powers",
      "proportionality",
      "legislative and judicial checks on emergency powers",
      "civil unrest response",
      "rule of law under crisis pressure",
    ],
    modelApproach:
      "A strong answer treats the legal threshold question as the first question, not an afterthought, and is willing to recommend a narrower, better-justified tier of emergency powers over a broader one that invites legal challenge and appears to punish protest itself. It separates the operational problem of violence and looting, which can justify narrower public-order measures, from the underlying political grievance, which emergency powers cannot legitimately resolve, and keeps the applicable oversight check in view throughout.",
    furtherReading: [
      "Comparative frameworks for tiered emergency powers and their legal thresholds",
      "Proportionality analysis in public-order crisis response",
      "Civil unrest as a crisis category distinct from natural disaster response",
    ],
    testsFundamentals: ["pol-crisis-emergency-powers-legal-thresholds", "pol-crisis-civil-unrest-outside-playbook"],
  },
  {
    id: "pol-crisis-flood-military-assistance",
    profession: "politics",
    category: "Crisis Response",
    title: "Requesting Military Assistance for Flood Rescue",
    premium: true,
    scenario:
      "Severe flooding has cut off several towns, and civilian rescue services report they can reach fewer than half of an estimated 3,000 stranded residents before water levels rise further tonight. The regional government has asked the national government to deploy military helicopters and personnel to assist with rescues, but the defense ministry notes that domestic deployment of the armed forces is legally limited to a support role under civilian direction, not an independent command of the operation. At the same time, the same military units are the only ones with the airlift capacity to reach an isolated hospital that is about to lose backup power. You are advising on whether to approve the deployment and how to prioritize the two competing missions.",
    keyIssues: [
      "Whether the request for military support fits within the legal limits on domestic military deployment, and who retains command authority",
      "How to prioritize scarce airlift capacity between stranded residents and the hospital losing power, when both are genuinely urgent",
      "Coordinating a civilian-led operation that now includes military assets operating under an unfamiliar chain of command",
      "Communicating the decision publicly in a way that does not suggest the military is taking over the response",
    ],
    expectedConcepts: [
      "military assistance to civilian authorities",
      "civil-military command boundaries",
      "resource triage under scarcity",
      "life-safety prioritization",
      "unified command",
    ],
    modelApproach:
      "A strong answer keeps the military assets under civilian direction and treats them as an addition to the response, not a takeover of it, while being clear about the specific legal limits on what the deployed units can do on their own authority. It makes an explicit, defensible triage call between the two missions, for example prioritizing the hospital given the shorter time to a fatal outcome, rather than trying to split scarce airlift capacity evenly, and communicates that trade-off honestly rather than avoiding it.",
    furtherReading: [
      "Legal frameworks governing military assistance to civilian authorities in domestic emergencies",
      "Triage principles under scarce emergency resources",
      "Comparative civil-military coordination in disaster response",
    ],
    testsFundamentals: ["pol-crisis-military-civil-support", "pol-crisis-resource-prioritization-triage"],
  },
  {
    id: "pol-crisis-scientific-advisory-dispute",
    profession: "politics",
    category: "Crisis Response",
    title: "When the Science Advisers and the Government Disagree in Public",
    premium: true,
    scenario:
      "Three weeks into a fast-spreading disease outbreak, the government's independent scientific advisory council has published a recommendation for restrictions well beyond what the government has been willing to announce, citing modeling that shows hospital capacity being exceeded within ten days on the current trajectory. A leaked early draft of the council's advice is now circulating online alongside claims, unsupported by the council itself, that the outbreak is being deliberately exaggerated. Government spokespeople are being asked directly why they are not following their own scientific advisers' recommendation. You are advising the government on how to respond publicly within the next day.",
    keyIssues: [
      "Whether to adopt the council's recommendation, explain a reasoned departure from it, or delay a decision, and what each choice signals about the government's relationship to its own expert advice",
      "Addressing the leaked draft and the unfounded exaggeration claims without amplifying them further",
      "Preserving the council's independence and credibility for future advice, regardless of what the government ultimately decides",
      "Retaining public trust in official information while a competing, unverified narrative spreads online",
    ],
    expectedConcepts: [
      "independent scientific advisory bodies",
      "political accountability versus technical advice",
      "misinformation and rumor control",
      "institutional credibility",
      "risk communication",
    ],
    modelApproach:
      "A strong answer does not treat the council's independence as something to overrule quietly; if the government departs from the recommendation, it explains the reasoning openly rather than letting the gap go unaddressed, since an unexplained departure invites exactly the exaggeration narrative already circulating. It also separates responding to the legitimate leaked-draft story from responding to the unfounded claims, addressing the second firmly and briefly rather than amplifying it with a lengthy rebuttal.",
    furtherReading: [
      "The role of independent scientific advisory bodies in crisis governance",
      "Misinformation and rumor control during public health crises",
      "Political accountability when departing from expert recommendations",
    ],
    testsFundamentals: ["pol-crisis-expert-advisory-bodies", "pol-crisis-media-information-environment"],
  },
  {
    id: "pol-crisis-warning-system-failure",
    profession: "politics",
    category: "Crisis Response",
    title: "A Wildfire Outran the Warning System",
    premium: true,
    scenario:
      "A fast-moving wildfire jumped a containment line and reached a residential area within 40 minutes, faster than the region's alert system, which relies on a mix of sirens and an opt-in mobile app, could notify most residents. At least 9 people died, several after telling investigators they never received any warning. A post-incident review finds the app had only 22 percent local adoption and the sirens cover barely half the affected area. You are advising the regional government on both the immediate public explanation and the redesign of the warning system before the next fire season.",
    keyIssues: [
      "Explaining honestly why the warning system failed to reach most residents in time, without minimizing the deaths involved",
      "Redesigning the alert system to reach the whole population, not just those who opted into a low-adoption app",
      "Addressing the broader gap in household-level preparedness (evacuation plans, go-bags, defensible space) that a faster warning alone will not fix",
      "Balancing the cost and speed of a system upgrade against the risk of another fire before it is completed",
    ],
    expectedConcepts: [
      "public warning and alert systems",
      "whole-of-society preparedness",
      "redundant, multi-channel notification",
      "household-level emergency preparedness",
      "post-crisis review",
    ],
    modelApproach:
      "A strong answer does not treat this as solely a technology procurement problem; it recommends a redundant, multi-channel warning system that does not depend on residents opting in, while being direct in public communication about why the previous system failed. It also treats household-level preparedness, people knowing their evacuation route and having a plan before an alert ever arrives, as a necessary complement to a faster warning, since even a perfect alert system cannot substitute for basic preparedness on the ground.",
    furtherReading: [
      "Design principles for public emergency alert and warning systems",
      "Whole-of-society and household-level disaster preparedness",
      "Case studies in wildfire and flood warning system failures",
    ],
    testsFundamentals: ["pol-crisis-public-warning-systems", "pol-crisis-whole-of-society-preparedness"],
  },
  {
    id: "pol-crisis-hospital-surge-triage",
    profession: "politics",
    category: "Crisis Response",
    title: "Hospitals Nearing Capacity in a Mass-Casualty Event",
    premium: true,
    scenario:
      "A large industrial explosion has sent over 400 injured people to hospitals in a city whose combined intensive-care capacity is roughly 120 beds. Within three hours, hospital administrators warn they will run out of ventilators and ICU beds if the current admission rate continues, and are asking the health ministry for authority to activate a formal crisis triage protocol that would prioritize patients by likelihood of survival rather than order of arrival. Some officials worry that publicly authorizing triage criteria will look like the government is deciding who lives, while administrators warn that continuing first-come, first-served admission under these conditions will cost more lives overall. You are advising the health minister on whether to authorize the protocol tonight.",
    keyIssues: [
      "Whether to authorize a formal triage protocol now, given uncertain but worsening projections of demand versus capacity",
      "The ethical and political stakes of publicly authorizing survival-likelihood-based triage criteria",
      "Coordinating patient transfers to hospitals outside the immediate area to relieve pressure on the most affected facilities",
      "Communicating the decision to the public in a way that is honest about what triage means without causing panic",
    ],
    expectedConcepts: [
      "mass-casualty triage",
      "resource allocation under scarcity",
      "worst-case decision-making under uncertainty",
      "medical ethics in crisis response",
      "crisis risk communication",
    ],
    modelApproach:
      "A strong answer treats delaying the triage decision as itself a choice with consequences, and is willing to authorize the protocol based on a reasonable worst-case projection of demand rather than waiting for capacity to actually run out. It also pushes to relieve pressure through regional patient transfers before relying solely on triage, and is direct rather than evasive in explaining to the public what the protocol does and why it was necessary.",
    furtherReading: [
      "Mass-casualty triage protocols and their ethical basis",
      "Decision-making under uncertainty in health-system crises",
      "Regional patient-transfer coordination during surge events",
    ],
    testsFundamentals: ["pol-crisis-resource-prioritization-triage", "pol-crisis-worst-case-decisionmaking"],
  },
  {
    id: "pol-crisis-misinformation-campaign",
    profession: "politics",
    category: "Crisis Response",
    title: "A Misinformation Campaign During a Contamination Scare",
    premium: true,
    scenario:
      "Tests have confirmed low-level contamination in part of the public water supply, at a concentration the health agency says poses negligible risk if the current boil-water advisory is followed for a few days. Within hours, social media posts, some from anonymous accounts and some amplified by a foreign-linked media outlet, are circulating claims that the contamination is far more dangerous and that the government is covering up the true scale. Bottled water is being panic-bought across the region, and calls to the emergency hotline have overwhelmed its capacity. You are advising the government on its public communication for the next 24 hours.",
    keyIssues: [
      "Countering specific false claims quickly without repeating and further spreading them unnecessarily",
      "Explaining a genuinely low but non-zero health risk in a way that neither dismisses public concern nor feeds the panic",
      "Addressing the credibility gap the misinformation is exploiting, especially where past official communication has been inconsistent",
      "Managing a practical capacity problem (overwhelmed hotline, panic-buying) alongside the communication problem",
    ],
    expectedConcepts: [
      "misinformation and rumor control",
      "risk perception psychology",
      "crisis risk communication",
      "source credibility",
      "public information capacity",
    ],
    modelApproach:
      "A strong answer addresses the specific false claims directly but briefly, without amplifying them through extended rebuttal, and explains the actual, low level of risk in concrete terms while acknowledging why the concern feels larger than the statistics alone suggest. It treats restoring capacity, more hotline staff, clear channels for verified updates, as part of the response, not a separate problem from the communication itself.",
    furtherReading: [
      "Misinformation and rumor dynamics during public health scares",
      "The psychology of public risk perception (dread and unfamiliarity)",
      "Crisis communication and source-credibility research",
    ],
    testsFundamentals: ["pol-crisis-media-information-environment", "pol-crisis-risk-perception"],
  },
  {
    id: "pol-crisis-security-incident-response",
    profession: "politics",
    category: "Crisis Response",
    title: "An Active Attack and a Delayed Police Response",
    premium: true,
    scenario:
      "An armed attacker killed 14 people at a shopping center before being stopped, and it has since emerged that responding police units waited over 40 minutes outside the building on the mistaken belief that a barricade situation, not an active attack, was underway, following an unclear initial radio report. Survivors and families are demanding to know who made that call and why it took so long to correct. The police commissioner is under pressure to either defend the officers involved or acknowledge a command failure, while an internal investigation is only beginning. You are advising the commissioner on the public statement due later today.",
    keyIssues: [
      "Whether to defend the on-scene decision-making pending investigation or acknowledge that the response was too slow",
      "What the breakdown reveals about how conflicting or unclear initial reports get resolved into an operational decision during an active incident",
      "Balancing support for individual officers against the public's demand for accountability for the delay",
      "Setting realistic expectations for what the investigation can determine and how long it will take",
    ],
    expectedConcepts: [
      "incident command and decision authority",
      "accountability versus blame avoidance",
      "situational awareness under active-incident conditions",
      "public trust after a security failure",
      "internal investigation process",
    ],
    modelApproach:
      "A strong answer does not default to defending the response before the facts are established, nor does it scapegoat individual officers before the investigation is complete; it acknowledges plainly that the response took too long and commits to a genuine, structural investigation into how the initial unclear report led to a 40-minute delay. It treats this as a command and protocol failure to be examined honestly, recognizing that a defensive posture now would cost more public trust than a direct acknowledgment followed by a credible investigation.",
    furtherReading: [
      "Command and control failures in active-attack response",
      "Accountability versus blame-avoidance in security failures",
      "Comparative protocols for active-attack response and initial report verification",
    ],
    testsFundamentals: ["pol-crisis-command-structure", "pol-crisis-accountability-vs-blame-avoidance"],
  },
  {
    id: "pol-crisis-preparedness-budget-cuts",
    profession: "politics",
    category: "Crisis Response",
    title: "Cutting the Emergency Preparedness Budget",
    premium: true,
    scenario:
      "Facing a tight fiscal year, the finance ministry has proposed cutting the national emergency-preparedness agency's budget by 30 percent, including canceling the annual multi-agency disaster exercise and a public household-preparedness campaign. The preparedness agency argues the exercise is what actually tests whether the response plan, evacuation routes, and inter-agency coordination work before a real crisis, not after, and that the public campaign is the main channel for getting households to keep basic emergency supplies and plans. Other ministries argue the cuts are affordable because no major crisis has occurred in the past five years. You are advising the cabinet on whether to approve the cuts as proposed.",
    keyIssues: [
      "Whether the absence of a recent crisis is evidence that preparedness spending can safely be cut, or simply the reason it has not yet been tested",
      "What is actually lost when a rehearsed, exercised response plan is replaced with one that has never been tested against a realistic scenario",
      "The value of household-level preparedness campaigns versus government capacity alone",
      "How to weigh a real, immediate fiscal saving against a harder-to-quantify future risk",
    ],
    expectedConcepts: [
      "scenario planning and exercises",
      "whole-of-society preparedness",
      "opportunity cost of preparedness spending",
      "risk of untested response plans",
      "prodromal-stage prevention",
    ],
    modelApproach:
      "A strong answer resists the argument that five quiet years is evidence preparedness spending is no longer needed, since the entire purpose of prodromal-stage investment is that its value is invisible until the crisis it prevented would otherwise have arrived. It argues for preserving the exercise in particular, since an unrehearsed plan is a real, not merely theoretical, degradation in response quality, and makes the case that household preparedness campaigns are a comparatively low-cost way to build resilience that government capacity alone cannot replace.",
    furtherReading: [
      "The value of exercises and scenario planning in crisis preparedness",
      "Whole-of-society resilience and household preparedness campaigns",
      "Cost-benefit analysis of preparedness spending versus response spending",
    ],
    testsFundamentals: ["pol-crisis-scenario-planning", "pol-crisis-whole-of-society-preparedness"],
  },
];
