import type { CaseStudy } from "@/lib/caseStudyContent";
import type { Fundamental } from "@/lib/caseStudyFundamentals";

/**
 * Law / Public International Law: the fundamentals checklist and the case
 * bank for this category, kept together so they can be written and reviewed
 * as one unit. Registered in lib/cases/index.ts.
 *
 * Scope note: this category covers the body of law governing relations
 * between states and other international actors — sources of international
 * law, the law of treaties, state responsibility, jurisdiction and
 * immunities, the law of the sea, international human rights law,
 * international humanitarian law, and international dispute settlement. It
 * is written from a LAWYER'S doctrinal perspective — a government legal
 * adviser, international arbitration counsel, a human-rights litigator, or
 * in-house counsel assessing legal exposure — applying actual legal rules to
 * reach a legal conclusion. It is deliberately distinct from the Politics
 * profession's "Foreign Policy & Diplomacy" and "International & Regional
 * Institutions" categories, which are written from a politician's or
 * diplomat's strategic/institutional perspective (negotiating, coalition
 * building, navigating an institution's internal politics) rather than a
 * doctrinal legal one.
 *
 * Every case is written to be jurisdiction-neutral: it must make sense when
 * machine-translated and graded against the US, German, French, Spanish, or
 * Swedish legal system. For this category specifically, jurisdiction-neutral
 * also means not favoring any one state's position in an international
 * dispute — states are described generically (the applicant/respondent
 * state, the sending/host state, the coastal state) rather than named, so
 * the student, as counsel, must apply the law rather than favor their own
 * state. References to genuinely universal international-law instruments
 * and bodies (the VCLT, the ICJ, the ICC, UNCLOS, the Vienna Conventions on
 * diplomatic/consular relations) are not jurisdiction-specific — they are
 * the shared subject matter itself, not any one country's domestic statutes
 * or courts.
 */
export const LAW_PUBLIC_INTERNATIONAL_LAW_FUNDAMENTALS: Fundamental[] = [
  { id: "law-pubintl-sources-hierarchy", label: "Identifying and weighing the sources of international law — treaty, custom, and general principles — including whether any hierarchy governs when they conflict" },
  { id: "law-pubintl-custom-formation", label: "Establishing customary international law through consistent state practice and opinio juris, including the persistent-objector and specially-affected-states doctrines" },
  { id: "law-pubintl-jus-cogens-erga-omnes", label: "Distinguishing a peremptory (jus cogens) norm and an erga omnes obligation from an ordinary treaty or customary rule, and their consequences for consent and standing" },
  { id: "law-pubintl-treaty-formation-vclt", label: "Applying the Vienna Convention on the Law of Treaties' rules on treaty formation, signature, ratification, and entry into force" },
  { id: "law-pubintl-treaty-interpretation", label: "Interpreting a treaty's text under the VCLT's ordinary-meaning, context, and object-and-purpose rules, resorting to supplementary means only where genuine ambiguity remains" },
  { id: "law-pubintl-reservations", label: "Assessing the validity of a treaty reservation against the object-and-purpose compatibility test and determining its legal effect between the reserving and objecting states" },
  { id: "law-pubintl-treaty-termination-suspension", label: "Determining whether a treaty may be terminated, suspended, or invalidated for material breach, supervening impossibility, or a fundamental change of circumstances (rebus sic stantibus)" },
  { id: "law-pubintl-recognition-statehood", label: "Applying the criteria for statehood and distinguishing the constitutive and declaratory theories of recognition and their practical legal consequences" },
  { id: "law-pubintl-state-responsibility-attribution", label: "Attributing an internationally wrongful act to a state, including conduct of its organs, persons exercising governmental authority, and non-state actors under the effective- or overall-control tests" },
  { id: "law-pubintl-state-responsibility-defenses", label: "Applying the circumstances precluding wrongfulness — consent, self-defense, countermeasures, necessity, and force majeure — to a state-responsibility claim" },
  { id: "law-pubintl-reparations", label: "Determining the appropriate form of reparation for an internationally wrongful act — restitution, compensation, or satisfaction — and the standard for calculating it" },
  { id: "law-pubintl-jurisdiction-bases", label: "Identifying a lawful basis for a state to exercise prescriptive or enforcement jurisdiction — territorial, nationality, protective, or universal — and resolving a conflict between competing bases" },
  { id: "law-pubintl-sovereign-immunity", label: "Applying restrictive state (sovereign) immunity, distinguishing sovereign acts (acta jure imperii) from commercial or private acts (acta jure gestionis), including head-of-state immunity ratione personae and ratione materiae" },
  { id: "law-pubintl-diplomatic-consular-immunity", label: "Applying diplomatic and consular immunity under the Vienna Conventions, including the scope of inviolability, waiver, and declaring an agent persona non grata" },
  { id: "law-pubintl-law-of-the-sea-zones", label: "Applying UNCLOS maritime zone classifications — territorial sea, exclusive economic zone, continental shelf, and high seas — to determine a coastal state's rights over a maritime area" },
  { id: "law-pubintl-maritime-delimitation", label: "Applying maritime boundary delimitation principles, including the equidistance/relevant-circumstances method, to an overlapping claim between neighboring states" },
  { id: "law-pubintl-ihrl-treaty-obligations", label: "Applying international human rights treaty obligations, including extraterritorial application and the conditions for a lawful derogation during a public emergency" },
  { id: "law-pubintl-ihl-classification", label: "Classifying an armed conflict as international or non-international to determine which body of international humanitarian law governs it" },
  { id: "law-pubintl-ihl-distinction-proportionality", label: "Applying the international humanitarian law principles of distinction, proportionality, and precaution to assess the lawfulness of an attack" },
  { id: "law-pubintl-dispute-settlement-forum", label: "Choosing and applying the jurisdiction and admissibility rules of an international dispute-settlement forum — the ICJ's contentious or advisory jurisdiction, the ICC, or inter-state/investor-state arbitration" },
];

export const LAW_PUBLIC_INTERNATIONAL_LAW_CASES: CaseStudy[] = [
  {
    id: "law-pubintl-cyber-custom-emerging",
    profession: "law",
    category: "Public International Law",
    title: "Has a Rule of Customary International Law Crystallized?",
    scenario:
      "You are legal adviser to a State's foreign ministry. Following a wave of cross-border cyberattacks on hospital networks during an armed conflict elsewhere, a growing group of States has begun issuing joint statements declaring that intentionally disabling civilian medical infrastructure through cyber means is 'prohibited under international law,' and several have cited the statements in formal protest notes to the State believed responsible. A significant number of other States, including some major cyber powers, have neither joined the statements nor commented, and your own State's military has cyber capabilities that could, in a future conflict, affect similar civilian systems incidentally. The minister wants to know, before any further incident occurs, whether this emerging consensus already binds your State as a matter of customary international law, or whether it remains a position some States merely wish were binding.",
    keyIssues: [
      "Whether the States' statements and protest notes reflect the two required elements of custom — widespread and consistent state practice plus opinio juris — or merely aspirational rhetoric",
      "Significance of a sizable group of States, including major cyber powers, neither joining nor objecting to the claimed rule",
      "Whether your State could preserve a persistent-objector position now, before the rule (if it exists) fully crystallizes, or whether that window has already closed",
      "Practical consequence of concluding the rule binds your State: how it would need to constrain future cyber operations with incidental effects on civilian systems",
    ],
    expectedConcepts: [
      "customary international law",
      "state practice",
      "opinio juris",
      "persistent objector",
      "specially affected states",
      "emerging norms",
    ],
    modelApproach:
      "A strong answer tests the claimed rule against both elements of custom separately rather than treating consistent statements alone as sufficient, and gives real weight to the silence of specially affected cyber powers as evidence the practice is not yet general enough to bind non-consenting states. It advises on the persistent-objector doctrine's narrow window, since an objection raised only after a rule has clearly crystallized offers little protection, and it is candid that the law here is genuinely unsettled rather than forcing a false certainty onto the minister's question.",
    furtherReading: [
      "Article 38(1) of the ICJ Statute and the sources of international law",
      "The ICJ's North Sea Continental Shelf and Nicaragua jurisprudence on state practice and opinio juris",
      "The persistent-objector doctrine and its limits",
    ],
    testsFundamentals: ["law-pubintl-sources-hierarchy", "law-pubintl-custom-formation"],
  },
  {
    id: "law-pubintl-reservation-compatibility",
    profession: "law",
    category: "Public International Law",
    title: "Objecting to a Reservation on a Human Rights Treaty",
    scenario:
      "A State has just ratified a major multilateral human rights convention but attached a reservation purporting to exempt itself from the convention's non-discrimination provisions whenever they conflict with its domestic personal-status law. Your client, a different State party to the same convention, has asked you, as legal adviser, whether it should formally object to the reservation, and if so, what objecting would actually achieve. The convention's own text is silent on whether reservations of this kind are permitted, and other States parties have already reacted differently: some formally objected, some stayed silent, and one declared the reservation itself invalid and treated the reserving State as fully bound by the unreserved treaty.",
    keyIssues: [
      "Whether the reservation is compatible with the convention's object and purpose, the governing test where the treaty itself is silent on permissible reservations",
      "Legal effect of a formal objection: does it sever treaty relations entirely between the two states, or merely exclude the reserved provision between them",
      "Weight, if any, to give the other state's more aggressive position that the reservation is invalid outright and the reserving state remains fully bound",
      "Practical versus purely doctrinal value of objecting, where the reservation plainly undermines the convention's core non-discrimination purpose",
    ],
    expectedConcepts: [
      "treaty reservations",
      "object-and-purpose compatibility test",
      "VCLT Articles 19-23",
      "severability of reservations",
      "treaty relations between reserving and objecting states",
    ],
    modelApproach:
      "A strong answer applies the object-and-purpose test directly to the specific provision reserved, rather than assessing the reservation's compatibility in the abstract, and recognizes that a reservation gutting a convention's core non-discrimination guarantee is a strong candidate for incompatibility. It explains the different legal consequences of formally objecting versus remaining silent, and treats the more aggressive 'reservation invalid, state fully bound' position as a minority view worth flagging but not assuming will prevail.",
    furtherReading: [
      "VCLT Articles 19-23 on reservations",
      "The object-and-purpose compatibility test in treaty reservation practice",
      "The UN Human Rights Committee's general comment on reservations to human rights treaties",
    ],
    testsFundamentals: ["law-pubintl-treaty-formation-vclt", "law-pubintl-reservations"],
  },
  {
    id: "law-pubintl-rebus-sic-stantibus",
    profession: "law",
    category: "Public International Law",
    title: "Terminating a Resource-Sharing Treaty for Changed Circumstances",
    scenario:
      "Two neighboring States signed a treaty forty years ago dividing the flow of a shared river for irrigation, based on historical flow data from that era. A sustained change in regional climate has since cut the river's actual flow by nearly half, and your client State, which depends on its treaty share for a large portion of its agricultural water, wants to invoke a fundamental change of circumstances to renegotiate or suspend the allocation formula, rather than continue honoring an agreement that now leaves it with far less usable water than either side anticipated. The other State insists the treaty's text contains no climate contingency clause and must be performed exactly as written regardless of how circumstances have changed.",
    keyIssues: [
      "Whether the reduced river flow qualifies as a fundamental change of circumstances under the rebus sic stantibus doctrine, and the narrow conditions that doctrine actually requires",
      "Significance of the change being unforeseen at the time of the treaty's conclusion versus a risk the parties arguably should have anticipated for a resource-allocation treaty of this kind",
      "Whether a boundary or territorial-type treaty is treated differently from an ordinary resource-sharing treaty for purposes of this doctrine",
      "Realistic remedy: suspension and renegotiation of the allocation formula versus full termination of the treaty",
    ],
    expectedConcepts: [
      "rebus sic stantibus",
      "fundamental change of circumstances",
      "VCLT Article 62",
      "treaty suspension versus termination",
      "boundary-treaty exception",
    ],
    modelApproach:
      "A strong answer is honest that Article 62's fundamental-change doctrine is deliberately narrow and rarely succeeds, and tests the climate-driven flow reduction against each of its specific conditions, including whether the change was genuinely unforeseen for a treaty whose entire purpose was dividing a natural resource. It recommends suspension and renegotiation of the formula as the realistic, legally defensible goal rather than outright termination, and flags that courts and tribunals have historically been reluctant to let this doctrine unwind long-settled arrangements.",
    furtherReading: [
      "VCLT Article 62 and the rebus sic stantibus doctrine",
      "The ICJ's Gabčíkovo-Nagymaros and Fisheries Jurisdiction jurisprudence on fundamental change of circumstances",
      "Treaty suspension versus termination under the VCLT",
    ],
    testsFundamentals: ["law-pubintl-treaty-interpretation", "law-pubintl-treaty-termination-suspension"],
  },
  {
    id: "law-pubintl-recognition-secessionist-entity",
    profession: "law",
    category: "Public International Law",
    title: "Contracting With a Territory That Has Declared Independence",
    scenario:
      "A region within an existing State has unilaterally declared independence following a referendum the parent State deems unconstitutional, and the breakaway authority now controls the region's territory, administers its own courts and currency, and has been recognized as a State by a handful of other governments, while the vast majority of the international community, including the parent State, has not. Your client, a multinational energy company with existing infrastructure in the region, has been approached by the breakaway authority to sign a new long-term resource-extraction concession directly with it, and wants to know whether doing so is legally meaningful, and what risk it creates with the parent State and with governments that do not recognize the new entity.",
    keyIssues: [
      "Whether the breakaway entity satisfies the traditional criteria for statehood (defined territory, permanent population, effective government, capacity to enter international relations) independent of how many states have recognized it",
      "Difference between the constitutive and declaratory theories of recognition, and which better explains why some states treat the entity as a state and others do not",
      "Legal exposure the company faces with the parent state if it treats the breakaway authority as having capacity to grant a valid concession",
      "Practical structuring options short of full recognition-dependent contracting that might reduce the company's exposure",
    ],
    expectedConcepts: [
      "statehood criteria",
      "constitutive theory",
      "declaratory theory",
      "effective control",
      "non-recognition policy",
      "state succession",
    ],
    modelApproach:
      "A strong answer separates the factual statehood analysis — whether the entity actually meets the traditional criteria on the ground — from the recognition question, which most modern doctrine treats as merely declaratory of a status that either exists or does not, rather than as what creates statehood in the first place. It is candid that effective control plus widespread non-recognition creates real, unresolved legal risk for the company, and explores structuring the arrangement to minimize exposure to the parent state's near-certain position that the concession is void.",
    furtherReading: [
      "The Montevideo Convention criteria for statehood",
      "The constitutive and declaratory theories of recognition",
      "Non-recognition policy and its effect on contracts with unrecognized or partially recognized entities",
    ],
    premium: true,
    testsFundamentals: ["law-pubintl-recognition-statehood"],
  },
  {
    id: "law-pubintl-cyber-attribution-nonstate-actor",
    profession: "law",
    category: "Public International Law",
    title: "Attributing a Cyberattack on Critical Infrastructure to a State",
    scenario:
      "A sophisticated cyberattack disabled a State's electricity grid for several days, and the affected State's investigators traced the intrusion to a hacking collective that operates openly from another State's territory, receives funding through accounts linked to that State's intelligence service, and has previously carried out operations matching that State's stated strategic interests, though the collective is not formally part of any government agency. The affected State's foreign ministry wants to know whether it can attribute the attack to the other State for purposes of a formal protest and a possible claim of state responsibility, or whether the connection falls short of what the law requires, and what standard actually governs that question.",
    keyIssues: [
      "Whether the hacking collective's conduct can be attributed to the other state under the effective-control standard or the more permissive overall-control standard, and which one actually governs this situation",
      "Evidentiary burden the affected state would need to meet to support a formal attribution claim, given that funding links and shared strategic interest fall short of direct operational control",
      "Consequences of attribution once established: what responsibility follows, and what responses it would unlock",
      "Risk of making a public attribution claim that later turns out to be legally unsupportable",
    ],
    expectedConcepts: [
      "attribution of conduct to a state",
      "effective control test",
      "overall control test",
      "state-sponsored non-state actors",
      "due diligence obligation",
    ],
    modelApproach:
      "A strong answer walks through the attribution standards precisely rather than asserting that funding and shared interest alone establish state responsibility, and recognizes that the stricter effective-control standard from the ICJ's state-responsibility jurisprudence, rather than the looser overall-control standard developed in a different context, is the one more likely to govern an inter-state responsibility claim of this kind. It flags the significant evidentiary burden the affected state would face and distinguishes a weaker but still available due-diligence argument — that the territorial state failed to prevent its territory being used for the attack — from the harder direct-attribution claim.",
    furtherReading: [
      "The International Law Commission's Articles on State Responsibility, Article 8, on conduct directed or controlled by a state",
      "The ICJ's Nicaragua effective-control standard",
      "The due-diligence obligation not to allow one's territory to be used to the detriment of another state",
    ],
    premium: true,
    testsFundamentals: ["law-pubintl-state-responsibility-attribution"],
  },
  {
    id: "law-pubintl-countermeasures-sanctions",
    profession: "law",
    category: "Public International Law",
    title: "Are Unilateral Countermeasures Lawful in Response to Another State's Breach?",
    scenario:
      "After a State expropriated a neighboring State's state-owned pipeline running through its territory without compensation, in clear breach of a decades-old transit treaty, the injured State suspended an unrelated trade agreement with the responsible State, froze certain of its diplomatic assets, and announced it would withhold payments due under a separate financing arrangement until compensation is paid. The responsible State protests that these measures are themselves unlawful breaches of entirely separate obligations and has threatened its own retaliatory measures. Your client, the injured State's foreign ministry, wants your assessment of whether its measures qualify as lawful countermeasures and what conditions it must satisfy to keep that characterization.",
    keyIssues: [
      "Whether the injured state's measures meet the legal requirements for countermeasures: a prior, genuine internationally wrongful act, proportionality, and prior notice/demand for cessation where circumstances allow",
      "Whether freezing diplomatic assets specifically falls within what countermeasures may lawfully target, given special protections attaching to certain categories of state property and conduct",
      "Risk that disproportionate measures convert what would be a lawful countermeasure into the injured state's own internationally wrongful act",
      "What reparation the injured state should actually be seeking as the endpoint of this dispute, separate from the lawfulness of the interim countermeasures",
    ],
    expectedConcepts: [
      "countermeasures",
      "proportionality of countermeasures",
      "prior demand for cessation",
      "inviolability of diplomatic property",
      "reparations (restitution, compensation, satisfaction)",
    ],
    modelApproach:
      "A strong answer walks through each requirement for lawful countermeasures in turn rather than assuming the injured state's good cause excuses any response it chooses, and flags the diplomatic-asset freeze as the most legally vulnerable measure given the special inviolability diplomatic and consular property generally enjoys even during a dispute. It keeps the proportionality assessment anchored to the harm the original expropriation actually caused, and distinguishes the interim countermeasures from the ultimate reparation the injured state should be pursuing as the real resolution to the dispute.",
    furtherReading: [
      "The ILC Articles on State Responsibility, Part Three, Chapter II, on countermeasures",
      "Proportionality limits on countermeasures",
      "The forms of reparation under the ILC Articles (restitution, compensation, satisfaction)",
    ],
    premium: true,
    testsFundamentals: ["law-pubintl-state-responsibility-defenses", "law-pubintl-reparations"],
  },
  {
    id: "law-pubintl-universal-jurisdiction-immunity",
    profession: "law",
    category: "Public International Law",
    title: "Prosecuting a Former Foreign Official Under Universal Jurisdiction",
    scenario:
      "Prosecutors in your State have opened an investigation into a former senior official of another State, now residing within your territory, over allegations of torture committed abroad years earlier while that individual held office, relying on a domestic statute implementing universal jurisdiction over such international crimes. The official's home State has formally protested, arguing the individual retains immunity as a former head of a ministry responsible for state security, and separately that prosecuting conduct with no territorial or nationality link to your State oversteps what international law permits even under a universal-jurisdiction theory. You are advising the prosecutor's office on both the jurisdictional basis for proceeding and the immunity defense before any charges are filed.",
    keyIssues: [
      "Whether universal jurisdiction over torture or other grave international crimes is sufficiently established in international law to support proceeding absent any territorial or nationality link",
      "Distinguishing immunity ratione personae, generally limited to a narrow category of incumbent senior officials, from immunity ratione materiae, which can attach to official acts even after leaving office",
      "Whether conduct amounting to a grave international crime such as torture is treated as falling outside the protection immunity ratione materiae would otherwise provide",
      "Practical and diplomatic consequences of proceeding, separate from the strict legal analysis of jurisdiction and immunity",
    ],
    expectedConcepts: [
      "universal jurisdiction",
      "immunity ratione personae",
      "immunity ratione materiae",
      "international crimes exception to immunity",
      "diplomatic protest",
    ],
    modelApproach:
      "A strong answer separates the jurisdictional question from the immunity question entirely, since a state can have a valid jurisdictional basis to prosecute and still be barred by immunity, or vice versa, and treats the former official's claim as resting on immunity ratione materiae rather than the narrower ratione personae since they no longer hold office. It engages honestly with the genuinely unsettled state of the law on whether grave international crimes override immunity ratione materiae for former officials, rather than asserting a settled rule in either direction, and flags the diplomatic fallout as a real factor even where the legal analysis favors proceeding.",
    furtherReading: [
      "Universal jurisdiction over grave international crimes (torture, genocide, war crimes)",
      "The ICJ's Arrest Warrant case and the distinction between immunity ratione personae and ratione materiae",
      "The ongoing debate over an international-crimes exception to functional immunity",
    ],
    premium: true,
    testsFundamentals: ["law-pubintl-jurisdiction-bases", "law-pubintl-sovereign-immunity"],
  },
  {
    id: "law-pubintl-diplomat-immunity-incident",
    profession: "law",
    category: "Public International Law",
    title: "A Diplomat's Immunity After a Fatal Traffic Incident",
    scenario:
      "A diplomat accredited to your State was driving a vehicle registered to the mission when it struck and killed a pedestrian, and your State's prosecutors want to charge the diplomat with a serious criminal offense. The sending State has confirmed the diplomat's accreditation and declined, so far, to waive immunity, instead offering to recall the diplomat and pursue its own domestic proceedings at home. The victim's family has asked your ministry whether anything more can be done within your own territory, and the sending mission has separately asked whether your government intends to declare the diplomat persona non grata regardless of how the immunity question is resolved.",
    keyIssues: [
      "Scope of diplomatic immunity from criminal jurisdiction under the Vienna Convention on Diplomatic Relations, and whether any exception could apply to an incident of this severity",
      "Whether immunity can be waived only by the sending state, not the diplomat personally, and what form a valid waiver must take",
      "Legal and diplomatic effect of declaring the diplomat persona non grata as a tool distinct from, and not dependent on, resolving the immunity question",
      "Realistic options left to the host state and the victim's family if the sending state declines to waive immunity and limits itself to its own domestic proceedings",
    ],
    expectedConcepts: [
      "diplomatic immunity from criminal jurisdiction",
      "waiver of immunity",
      "persona non grata",
      "inviolability of mission vehicles",
      "sending-state accountability",
    ],
    modelApproach:
      "A strong answer is clear that the severity of the incident does not itself create an exception to immunity from criminal jurisdiction, which only the sending state, not the diplomat, can waive, and treats persona non grata as an entirely separate, always-available tool the host state can exercise regardless of how the immunity and waiver questions resolve. It is honest with the family that the realistic path to accountability likely runs through the sending state's own domestic proceedings or diplomatic pressure, not a prosecution in the host state's own courts absent a waiver.",
    furtherReading: [
      "Vienna Convention on Diplomatic Relations, Articles 29-32 and 37, on inviolability and immunity",
      "Waiver of diplomatic immunity under Article 32",
      "Declaring a diplomat persona non grata under Article 9",
    ],
    premium: true,
    testsFundamentals: ["law-pubintl-diplomatic-consular-immunity"],
  },
  {
    id: "law-pubintl-maritime-delimitation-dispute",
    profession: "law",
    category: "Public International Law",
    title: "Overlapping Claims to a Resource-Rich Maritime Area",
    scenario:
      "Two neighboring coastal States have overlapping claims to an area of seabed believed to hold substantial hydrocarbon reserves, located within 200 nautical miles of both States' coastlines, where their exclusive economic zone and continental shelf claims overlap because their coastlines are closer together than 400 nautical miles apart. One State's coastline is considerably longer and more convex than the other's, and a small, mostly uninhabited island belonging to the State with the shorter coastline sits close to the midpoint of the disputed area. Your client, the State with the longer coastline, wants advice on the delimitation methodology most likely to apply and the weight the small island is likely to carry in that analysis.",
    keyIssues: [
      "Correct classification of the maritime zones in play (exclusive economic zone and continental shelf) and the baseline from which any delimitation would be measured",
      "Application of the equidistance/relevant-circumstances method and whether coastline length and configuration function as a relevant circumstance justifying an adjustment to a strict median line",
      "Weight a small, sparsely populated island is likely to receive in the delimitation, since international tribunals have sometimes given such features reduced or no effect rather than full equidistance weight",
      "Realistic range of outcomes your client should prepare for, rather than assuming the delimitation will track its most favorable theory exactly",
    ],
    expectedConcepts: [
      "exclusive economic zone",
      "continental shelf",
      "equidistance/relevant-circumstances method",
      "proportionality in maritime delimitation",
      "effect of islands on delimitation lines",
    ],
    modelApproach:
      "A strong answer starts from the correct zone classification before reaching delimitation methodology at all, and applies the equidistance/relevant-circumstances method as the dominant modern approach, testing coastline length and configuration as a genuine relevant circumstance that can justify shifting a line rather than assuming the longer coastline automatically wins a larger share. It treats the small island's likely reduced effect as a realistic, well-precedented outcome rather than an exception to argue against, and frames the advice around a realistic range of outcomes rather than the client's single most favorable scenario.",
    furtherReading: [
      "UNCLOS Articles 74 and 83 on EEZ and continental shelf delimitation",
      "The ICJ's and arbitral tribunals' equidistance/relevant-circumstances methodology",
      "The treatment of islands in maritime delimitation (reduced or no effect)",
    ],
    premium: true,
    testsFundamentals: ["law-pubintl-law-of-the-sea-zones", "law-pubintl-maritime-delimitation"],
  },
  {
    id: "law-pubintl-icj-jurisdiction-erga-omnes-standing",
    profession: "law",
    category: "Public International Law",
    title: "A State Sues Over Obligations It Is Not Directly Injured By",
    scenario:
      "A State has filed an application before an international court against another State, alleging breaches of a multilateral convention prohibiting a specific category of atrocity, even though the applicant State itself suffered no direct injury from the alleged conduct, which occurred entirely within the respondent State's own territory against the respondent's own population. The respondent State has raised a preliminary objection that the applicant lacks standing to bring a claim over harm it never itself suffered, and separately argues the court's jurisdiction depends on a compromissory clause in the convention that the respondent claims does not cover this type of dispute. Your client, the applicant State's legal team, must respond to both objections before the court reaches the merits.",
    keyIssues: [
      "Whether obligations under the convention at issue are owed erga omnes partes, to all states parties collectively, such that any party has standing to invoke them regardless of direct injury",
      "Whether the court's jurisdiction genuinely depends on the compromissory clause's specific scope, and how that clause should be interpreted against the respondent's narrower reading",
      "Distinguishing the standing objection from the jurisdiction objection, since a court can resolve them independently and a win on one does not guarantee a win on the other",
      "Strategic sequencing of the response, since preliminary objections can end the case before the merits are ever reached regardless of how strong the merits case is",
    ],
    expectedConcepts: [
      "erga omnes partes obligations",
      "standing before international courts and tribunals",
      "compromissory clause",
      "preliminary objections",
      "jurisdiction versus admissibility",
    ],
    modelApproach:
      "A strong answer treats the erga omnes partes theory of standing as the applicant's strongest response to the injury objection, grounding it in the collective nature of obligations under conventions of this kind rather than an ordinary bilateral-injury model of standing, while separately interpreting the compromissory clause under the VCLT's ordinary interpretive rules rather than assuming the broadest possible reading will simply prevail. It keeps the standing and jurisdiction objections analytically distinct throughout, since conflating them risks losing an argument that was actually available on one ground by tying it unnecessarily to the weaker ground.",
    furtherReading: [
      "The ICJ's Barcelona Traction and Gambia v. Myanmar jurisprudence on erga omnes partes obligations and standing",
      "Compromissory clauses and jurisdiction ratione materiae",
      "The distinction between jurisdiction and admissibility in preliminary objections",
    ],
    premium: true,
    testsFundamentals: ["law-pubintl-jus-cogens-erga-omnes", "law-pubintl-dispute-settlement-forum"],
  },
  {
    id: "law-pubintl-ihrl-derogation-emergency",
    profession: "law",
    category: "Public International Law",
    title: "Derogating From Human Rights Obligations During a Declared Emergency",
    scenario:
      "Facing a sudden wave of large-scale civil unrest, a government has declared a state of emergency and suspended several rights guaranteed under a human rights treaty it has ratified, including extending pre-charge detention well beyond the treaty's ordinary limits and imposing a curfew enforced by the military. The government has notified the treaty's depositary of the derogation, as the treaty requires, but has not specified which particular rights are affected or why the ordinary legal framework proved inadequate, beyond citing the unrest generally. You are advising the government's legal office on whether the derogation, as implemented, is likely to withstand later scrutiny by the treaty's monitoring body.",
    keyIssues: [
      "Whether the notification requirement was genuinely satisfied given its lack of specificity about which rights are affected and why",
      "Whether the measures taken are strictly required by the exigencies of the actual situation, the proportionality standard governing lawful derogation, or go further than the emergency justifies",
      "Identification of rights that are non-derogable even during a declared emergency, and whether any of the government's measures risk crossing that line",
      "Practical recommendations to bring the derogation into compliance going forward, separate from assessing what has already been done",
    ],
    expectedConcepts: [
      "derogation from human rights treaty obligations",
      "notification requirement",
      "strict necessity and proportionality",
      "non-derogable rights",
      "state of emergency",
    ],
    modelApproach:
      "A strong answer treats the notification's lack of specificity as a genuine, independent defect worth correcting immediately rather than a mere formality, and tests each specific measure — extended detention and the curfew — against the strict-necessity standard rather than accepting the general unrest as sufficient justification for whatever the government has chosen to do. It identifies the non-derogable core, which typically survives any emergency regardless of its severity, as the firm floor the government's measures must not cross, and proposes concrete fixes to the notification and the proportionality of the detention extension rather than only flagging the problems.",
    furtherReading: [
      "The derogation clauses found in major human rights treaties and their notification requirements",
      "The strict-necessity and proportionality standard for derogation measures",
      "Non-derogable rights and their treatment during a declared emergency",
    ],
    premium: true,
    testsFundamentals: ["law-pubintl-ihrl-treaty-obligations"],
  },
  {
    id: "law-pubintl-ihl-targeting-proportionality",
    profession: "law",
    category: "Public International Law",
    title: "Clearing a Strike Near a Protected Target",
    scenario:
      "During an ongoing armed conflict, a government's military legal adviser has been asked to clear a planned strike on a logistics facility that intelligence assesses is being used to stage weapons for the opposing armed force, located roughly 300 meters from a functioning hospital. Planners project that the strike carries a real, though not certain, risk of incidental damage to the hospital's power supply, which could disrupt its operations for several days, and ask whether the strike can proceed, whether its timing or munition choice should change to reduce that risk, and whether the conflict's classification affects the analysis at all. You are the legal adviser providing that clearance opinion.",
    keyIssues: [
      "Correct classification of the conflict (international or non-international) and whether that classification actually changes the governing targeting rules in this instance",
      "Whether the logistics facility qualifies as a lawful military objective under the distinction principle, separate from its proximity to the hospital",
      "Application of the proportionality principle to weigh the anticipated incidental harm to the hospital's power supply against the military advantage anticipated from the strike",
      "Precautionary measures (timing, munition choice, advance warning where feasible) that could reduce incidental harm without abandoning the strike, and whether they are required or merely advisable",
    ],
    expectedConcepts: [
      "distinction between military objectives and civilian objects",
      "conflict classification",
      "proportionality in the conduct of hostilities",
      "precautions in attack",
      "protected status of medical facilities",
    ],
    modelApproach:
      "A strong answer confirms the facility's qualification as a lawful military objective under the distinction principle first, since nothing else in the analysis matters if that threshold fails, and then runs the proportionality balancing explicitly, weighing the anticipated military advantage against the specific, concrete incidental harm projected to the hospital's power supply rather than treating proximity to a protected facility alone as disqualifying. It treats feasible precautions — adjusting timing or munition choice — as a legal requirement where available and effective, not an optional improvement, and is clear that the conflict's classification matters here mainly for which specific treaty or customary rules apply, since the core distinction and proportionality principles bind in both international and non-international armed conflict.",
    furtherReading: [
      "Additional Protocol I, Articles 51-57, on distinction, proportionality, and precautions in attack",
      "The customary-law status of these principles in non-international armed conflict",
      "The protected status of medical facilities under international humanitarian law",
    ],
    premium: true,
    testsFundamentals: ["law-pubintl-ihl-classification", "law-pubintl-ihl-distinction-proportionality"],
  },
  {
    id: "law-pubintl-investor-state-arbitration-expropriation",
    profession: "law",
    category: "Public International Law",
    title: "Defending a Regulatory Change Against an Investor-State Claim",
    scenario:
      "A State enacted a new environmental regulation requiring all power generation facilities above a certain emissions threshold to install costly new filtration equipment within eighteen months or cease operating, a measure the government adopted after new scientific evidence of serious public health harm emerged. A foreign investor that owns one of the affected facilities has filed an arbitration claim under a bilateral investment treaty, arguing the regulation amounts to an indirect expropriation of its investment without compensation and breaches the treaty's fair-and-equitable-treatment standard, since the facility's compliance cost makes continued operation uneconomical. The State's foreign ministry has asked you to assess the strength of its defense before the tribunal.",
    keyIssues: [
      "Whether a non-discriminatory regulatory measure adopted in good faith for a legitimate public-health purpose can still amount to indirect expropriation, and the doctrine distinguishing legitimate regulation from a compensable taking",
      "Application of the fair-and-equitable-treatment standard, including whether the investor had a legitimate expectation of regulatory stability that the new measure actually defeats",
      "Relevance of the state's genuine, evidence-based public-health rationale to both the expropriation and fair-and-equitable-treatment analyses",
      "What reparation, if the tribunal finds a breach, is actually likely to be ordered, and how that differs from simply reversing the regulation",
    ],
    expectedConcepts: [
      "indirect expropriation",
      "police powers / regulatory doctrine",
      "fair and equitable treatment",
      "legitimate expectations",
      "investor-state arbitration",
      "compensation standard",
    ],
    modelApproach:
      "A strong answer leads with the police-powers doctrine, arguing that a genuinely non-discriminatory, good-faith regulatory measure addressing a real public-health risk is the paradigm case tribunals have declined to treat as indirect expropriation, rather than conceding the expropriation question too quickly. It tests the fair-and-equitable-treatment claim separately, asking whether the state made any specific stability assurance to this investor that the new regulation defeats, since a generalized regulatory environment rarely generates an enforceable legitimate expectation on its own, and anticipates that even an adverse finding would likely yield compensation rather than an order to repeal the regulation itself.",
    furtherReading: [
      "The police-powers doctrine and the line between regulation and indirect expropriation in investment arbitration",
      "The fair-and-equitable-treatment standard and legitimate expectations",
      "Compensation standards in investor-state arbitration awards",
    ],
    premium: true,
    testsFundamentals: ["law-pubintl-dispute-settlement-forum", "law-pubintl-reparations"],
  },
];
