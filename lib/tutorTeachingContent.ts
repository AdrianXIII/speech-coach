import type { CaseProfession } from "@/lib/caseStudyContent";
import { GENERATED_TEACHING_CONTENT } from "@/lib/tutorTeachingContent.generated";

/**
 * The AI Tutor's deep-dive teaching content — the "what you need to know
 * before you're challenged" material for one profession/category pair.
 * This is the single source of truth the app reads at runtime: nothing here
 * is regenerated per session, so a session costs zero extra API calls for
 * the Teach step (see lib/tutorEngine.ts's buildTeachingBrief).
 *
 * STORAGE: this file, in the repo — not a database (this app has none; see
 * the "no backend" note in .env.example). To fact-check or edit an area,
 * copy the object for that "profession/category" key out of TEACHING_CONTENT
 * below and paste it into whatever you're reviewing with. `source` on each
 * entry says who wrote it (a specific Claude/Gemini call), and `generatedAt`
 * says when — both there so you can tell stale content from fresh.
 *
 * COVERAGE: hand-authored so far for one flagship category per profession
 * (business/Strategy, politics/Foreign Policy & Diplomacy, law/Contract Law)
 * as a working, fact-checkable proof of the whole pipeline. The remaining
 * categories return null from getTeachingContent() until populated — the
 * Teach step falls back to the existing Fundamentals checklist for those, so
 * nothing breaks. Populate the rest at scale with `scripts/generate-tutor-
 * content.mjs` (uses this app's own GEMINI_API_KEY — see that file's header
 * for how to run it), or ask for more to be hand-authored directly here.
 */

export interface TeachingConcept {
  id: string;
  title: string;
  /** What the concept actually is. */
  explanation: string;
  /** Why it matters in practice. */
  whyItMatters: string;
  /** A concrete real-world example. */
  example: string;
}

export interface TeachingContent {
  profession: CaseProfession;
  category: string;
  /** 2-3 sentence framing read before the first concept. */
  overview: string;
  /** In deliberate teaching order — later concepts often build on earlier ones. */
  concepts: TeachingConcept[];
  /** How the concepts above connect/build on each other, read after the last one. */
  connections: string;
  source: "claude" | "gemini";
  generatedAt: string;
}

function contentKey(profession: CaseProfession, category: string): string {
  return `${profession}/${category}`;
}

/**
 * Hand-authored, reviewed content. Takes priority over script-generated
 * content in TEACHING_CONTENT below — so re-running the generation script
 * never silently overwrites something that's already been fact-checked.
 */
const HAND_AUTHORED_CONTENT: Record<string, TeachingContent> = {
  "business/Strategy": {
    profession: "business",
    category: "Strategy",
    overview:
      "Strategy is about making a specific set of choices — what to do, what not to do, and why — that gives a company a defensible advantage over time. Every framework below is a different lens for making that choice well; a strong strategist knows which lens fits the situation in front of them.",
    concepts: [
      {
        id: "strat-five-forces",
        title: "Porter's Five Forces",
        explanation:
          "A framework for assessing how attractive an industry is by examining five competitive pressures: rivalry among existing competitors, the threat of new entrants, the bargaining power of suppliers, the bargaining power of buyers, and the threat of substitute products.",
        whyItMatters:
          "Before you decide how to compete, you need to know whether the industry itself is structurally profitable. A brilliant strategy in a terrible industry (razor-thin margins, powerful buyers, easy entry) will still struggle — the forces set the ceiling on what any competitor can earn.",
        example:
          "Airlines: low barriers to entry, powerful fuel/aircraft suppliers, price-sensitive buyers who compare on Google Flights, and fierce rivalry — which is exactly why the industry has historically struggled with profitability regardless of how well any single airline is run.",
      },
      {
        id: "strat-generic-strategies",
        title: "Generic strategies: cost leadership, differentiation, focus",
        explanation:
          "Porter's second contribution: within an industry, a company generally wins by being the lowest-cost producer, by being meaningfully different in a way customers will pay for, or by dominating a narrow segment better than generalists can. Trying to do all three at once usually means doing none of them well — he called this being 'stuck in the middle.'",
        whyItMatters:
          "This forces discipline. Once you know which generic strategy you're pursuing, it tells you what to say no to — a cost leader shouldn't chase every custom feature request, and a differentiator shouldn't compete on price.",
        example:
          "Ryanair (cost leadership, ruthlessly stripping every cost out of the flying experience) versus Singapore Airlines (differentiation, charging a premium for service quality) — both profitable in the same industry, precisely because neither tries to be the other.",
      },
      {
        id: "strat-resource-based-view",
        title: "Resource-based view (VRIN)",
        explanation:
          "Where the Five Forces looks outward at the industry, this looks inward: sustainable advantage comes from resources or capabilities that are Valuable, Rare, hard to Imitate, and Non-substitutable (VRIN). A resource that fails any one of these tests won't sustain an edge for long.",
        whyItMatters:
          "It explains why some companies keep winning even in unattractive industries — their internal capability, not the industry structure, is doing the work. It also warns you: a resource competitors can easily copy or replace isn't really a moat, no matter how valuable it looks today.",
        example:
          "Amazon's logistics and fulfillment network took over a decade and tens of billions of dollars to build — valuable, rare, and extremely hard to imitate quickly, which is why it remains a real advantage rather than a temporary one.",
      },
      {
        id: "strat-diversification-related-unrelated",
        title: "Related vs. unrelated diversification",
        explanation:
          "When a company expands into a new business, the key question is whether it can transfer existing capabilities, brand, or infrastructure into that new area (related diversification) or whether it's really just deploying capital into an unconnected business (unrelated diversification, i.e. running a conglomerate).",
        whyItMatters:
          "Related diversification tends to create more value because the company brings something the new business actually needs; unrelated diversification has to justify itself purely on capital allocation and portfolio management skill, which is a much higher bar and one most companies fail.",
        example:
          "Disney moving from animated films into theme parks, merchandise, and streaming is related diversification — each leg reinforces the same IP and brand. A random industrial conglomerate buying an unrelated insurance business is unrelated diversification, and has to be justified purely on financial discipline (as Berkshire Hathaway does).",
      },
      {
        id: "strat-build-buy-partner",
        title: "Build vs. buy vs. partner",
        explanation:
          "When a company needs a new capability, it has three basic options: build it internally, acquire a company that already has it, or partner/license/joint-venture with someone who has it. The right choice depends on speed needed, how core the capability is to long-term advantage, and whether a suitable target or partner even exists.",
        whyItMatters:
          "Getting this wrong is expensive in a specific way: building something you should have bought wastes years you didn't have; buying something you should have built means you never really own the capability and pay a premium for it besides.",
        example:
          "A bank wanting AI capability might buy a fintech startup (buy — faster, but expensive and risks integration failure), build an internal data science team (build — slower, but the capability becomes truly owned), or license a vendor's model (partner — fastest, but creates dependency).",
      },
      {
        id: "strat-blue-ocean-value-innovation",
        title: "Blue ocean strategy / value innovation",
        explanation:
          "Instead of competing head-on in an existing market ('red ocean,' bloody from competition), a company can create uncontested market space by simultaneously pursuing differentiation and low cost — dropping some factors the industry competes on entirely while raising or creating others customers actually value.",
        whyItMatters:
          "It reframes strategy as not always a zero-sum fight against named rivals — sometimes the better move is redefining what's being competed on at all, which sidesteps the Five Forces pressures of an existing industry rather than fighting through them.",
        example:
          "Cirque du Soleil dropped expensive elements of traditional circus (star performers, animal acts) that customers valued less, while adding theatrical elements from live theater — creating a new category rather than out-competing Ringling Bros. on their own terms.",
      },
      {
        id: "strat-disruption-theory",
        title: "Disruptive innovation",
        explanation:
          "Clayton Christensen's theory: disruptors don't usually beat incumbents by being better at what incumbents already do well — they enter at the bottom of the market (or a new market entirely) with a product that's worse on the traditional metrics but cheaper, simpler, or more accessible, then improve until it's good enough for the mainstream.",
        whyItMatters:
          "It explains why well-run incumbents get blindsided: they rationally ignore the disruptor because it looks inferior and unprofitable by their own current customers' standards — right up until it isn't. Knowing this pattern is the main defense against it.",
        example:
          "Early digital cameras were far worse than film cameras on image quality — Kodak's own engineers invented the technology and its own best customers didn't want it. By the time digital was 'good enough,' it had displaced film entirely.",
      },
    ],
    connections:
      "These fit together as a sequence, not a menu: Five Forces tells you whether the industry is worth competing in at all; generic strategy tells you how you'll compete within it; the resource-based view checks whether you actually have (or can build) what that requires; and diversification, build-vs-buy, blue ocean, and disruption theory are all different answers to the same underlying question — how do you get or defend an advantage the forces and your competitors can't easily erode.",
    source: "claude",
    generatedAt: "2026-09-09",
  },

  "politics/Foreign Policy & Diplomacy": {
    profession: "politics",
    category: "Foreign Policy & Diplomacy",
    overview:
      "Foreign policy is the art of pursuing a state's interests in a world with no higher authority to enforce agreements — every tool below exists because states can't simply sue each other in court when things go wrong. A strong foreign policy analyst can explain not just what a state did, but why that choice was rational given its interests, constraints, and the absence of a global enforcer.",
    concepts: [
      {
        id: "fp-national-interest",
        title: "National interest as the organizing lens",
        explanation:
          "The realist tradition in international relations starts from a simple premise: states act to secure their own survival, security, and prosperity in an anarchic system with no world government to protect them. Values and ideology matter, but they operate within — and are often overridden by — this baseline logic.",
        whyItMatters:
          "It's the default lens for explaining why a state does something that looks inconsistent with its stated principles: a democracy allying with an authoritarian regime, or a peace-focused country building up its military. Asking 'what interest does this serve' before assuming hypocrisy or incoherence is usually more accurate.",
        example:
          "The U.S. and Soviet Union both supported nasty regimes during the Cold War when it served the containment/expansion competition — not because either abandoned its stated values, but because national interest (denying the other side influence) took priority in practice.",
      },
      {
        id: "fp-levels-of-analysis",
        title: "Levels of analysis: individual, state, system",
        explanation:
          "Any foreign policy decision can be explained at three levels: the individual (a specific leader's psychology, beliefs, personal history), the state (domestic politics, bureaucratic interests, regime type), or the international system (the distribution of power among states, alliance structures).",
        whyItMatters:
          "Analysts who fixate on only one level miss the full picture — over-explaining a war by one leader's personality ignores structural pressures that would have produced similar behavior from most leaders in that position, and vice versa.",
        example:
          "Explaining a state's decision to go nuclear purely by pointing to one leader's ambition (individual level) misses that a genuine security threat from a nuclear neighbor (systemic level) or domestic political pressure to look strong (state level) may be doing more of the actual work.",
      },
      {
        id: "fp-deterrence-credibility",
        title: "Deterrence and credibility",
        explanation:
          "Deterrence works by convincing an adversary that the costs of an action will outweigh the benefits — but only if the threat is credible: the adversary must believe you both have the capability and the actual will to follow through.",
        whyItMatters:
          "A deterrent threat that isn't credible is worthless and can even invite the very aggression it was meant to prevent, since the adversary calls the bluff. This is why states sometimes take costly, seemingly disproportionate actions — to preserve credibility for future threats, not just to punish the immediate act.",
        example:
          "NATO's Article 5 mutual-defense commitment only deters an attack on a member state as long as adversaries believe other members would actually risk war to honor it — which is why NATO invests heavily in visible, forward-deployed troops as a credibility signal, not just for their direct military value.",
      },
      {
        id: "fp-diplomatic-tools",
        title: "Diplomatic tools: bilateral, multilateral, and track II",
        explanation:
          "Bilateral diplomacy is direct state-to-state negotiation; multilateral diplomacy works through institutions (UN, WTO, regional bodies) involving many states at once; Track II diplomacy involves unofficial dialogue — academics, former officials, NGOs — that can float ideas or build trust without binding governments.",
        whyItMatters:
          "Choosing the right channel matters as much as the message: multilateral venues can confer legitimacy but move slowly and require consensus; bilateral channels are faster but lack broader buy-in; Track II can test politically risky ideas that no official would say on the record.",
        example:
          "Secret Track II talks between Norwegian intermediaries and Israeli/Palestinian officials in the early 1990s (which produced the Oslo Accords) succeeded partly because deniability let both sides explore compromises that would have been politically impossible to propose officially.",
      },
      {
        id: "fp-alliances-collective-security",
        title: "Alliances and collective security",
        explanation:
          "An alliance is a formal commitment to mutual defense or cooperation against a shared threat; collective security is the broader idea (embodied imperfectly in the UN system) that an attack on any state should be treated as a threat to all, deterring aggression through the threat of a unified response.",
        whyItMatters:
          "Alliances solve a real problem (no state can deter every threat alone) but create their own risks — most notably 'entrapment,' where a weaker ally's reckless behavior can drag a stronger partner into a conflict it didn't choose, because credibility requires honoring the commitment.",
        example:
          "The tangled alliance system in Europe before World War I is the textbook cautionary case: a regional crisis between Austria-Hungary and Serbia escalated into a continental war partly because allied commitments pulled in major powers that had no direct stake in the original dispute.",
      },
      {
        id: "fp-economic-statecraft",
        title: "Economic statecraft: sanctions and trade leverage",
        explanation:
          "States increasingly pursue foreign policy goals through economic tools short of military force — sanctions (restricting trade, finance, or travel to pressure a target), export controls, and using access to markets or currency systems as leverage.",
        whyItMatters:
          "Economic tools are attractive because they're more reversible and less escalatory than military force, but they're also frequently less effective than intended: sanctioned regimes often adapt, third countries backfill lost trade, and the domestic economic pain can strengthen rather than weaken a targeted government's grip.",
        example:
          "Sanctions on Iran and North Korea have persisted for decades without producing the intended policy change on nuclear programs — both states adapted (illicit trade networks, alternative partners) faster than sanctions could close the gaps, though the sanctions did impose real economic cost.",
      },
      {
        id: "fp-crisis-escalation-control",
        title: "Crisis management and escalation control",
        explanation:
          "In a fast-moving crisis, leaders must balance signaling resolve (so the adversary doesn't miscalculate and think they can act without consequence) against avoiding actions that force the other side into a corner with no face-saving way to back down — since cornered actors sometimes escalate rather than concede.",
        whyItMatters:
          "Most wars aren't planned from the start — they emerge from crises that escalate faster than either side intended, often because of poor communication, worst-case assumptions about the other side's intent, or domestic political pressure to not look weak.",
        example:
          "The Cuban Missile Crisis is the classic case study in deliberate off-ramps: Kennedy's team publicly responded to Khrushchev's more conciliatory of two contradictory messages (the 'Trollope ploy'), and a secret, face-saving concession (withdrawing US missiles from Turkey) let both sides step back without either appearing to fully capitulate.",
      },
    ],
    connections:
      "National interest and the levels of analysis are your diagnostic starting point — before judging a state's move, work out whose interest it serves and at which level it's best explained. Deterrence, alliances, and economic statecraft are the main tools states use to pursue those interests without war; diplomacy (bilateral, multilateral, Track II) is how they negotiate and de-escalate; and crisis management is what determines whether a breakdown in all of the above turns into an actual war or gets contained.",
    source: "claude",
    generatedAt: "2026-09-09",
  },

  "law/Contract Law": {
    profession: "law",
    category: "Contract Law",
    overview:
      "Contract law exists to make promises enforceable — but not every promise, and not in every circumstance. The core doctrines below define which promises the law will enforce, what happens when one side breaks its promise, and when the law will excuse a party from a promise it would otherwise have to keep.",
    concepts: [
      {
        id: "contract-formation",
        title: "Formation: offer, acceptance, consideration",
        explanation:
          "A binding contract requires an offer (a clear proposal with definite terms), acceptance (an unambiguous agreement to those exact terms — under the traditional 'mirror image rule,' a response that changes terms is a counteroffer, not an acceptance), and consideration (something of value exchanged by both sides — a promise given for a promise, not a one-sided gift).",
        whyItMatters:
          "This is the gatekeeping test for whether a contract exists at all — before arguing about breach or remedies, you have to establish there was an enforceable agreement in the first place. Disputes often turn on whether a genuine offer was ever made, or whether a reply counted as acceptance or a counteroffer that killed the original offer.",
        example:
          "A store advertising 'shoes $50' is generally just an invitation to make an offer, not an offer itself — the customer offering to buy at that price is the actual offer, which the store can still decline (e.g., if out of stock), which is why 'the ad promised $50' rarely succeeds as a formation argument on its own.",
      },
      {
        id: "contract-capacity-legality",
        title: "Capacity and legality of purpose",
        explanation:
          "Even with offer, acceptance, and consideration, a contract is unenforceable if a party lacked the legal capacity to agree (minors, and people lacking mental competence, can generally void contracts) or if the contract's purpose is illegal (courts won't enforce an agreement to do something the law prohibits).",
        whyItMatters:
          "This protects parties who can't meaningfully consent and keeps courts from becoming enforcement mechanisms for unlawful bargains — a court won't help either party to an illegal contract collect on it, which is itself a strong practical deterrent against illegal dealing.",
        example:
          "A contract for the sale of illegal drugs is void regardless of how clearly both sides agreed to it — no court will order 'specific performance' or damages, because enforcing it would make the legal system complicit in the underlying crime.",
      },
      {
        id: "contract-terms",
        title: "Terms: express, implied, and the parol evidence rule",
        explanation:
          "Express terms are what the parties actually wrote or said; implied terms are ones courts read into a contract because they're standard in that type of deal or necessary to make the contract work (e.g., an implied warranty of merchantability in a sale of goods). The parol evidence rule generally bars using earlier oral statements to contradict a later, complete written contract.",
        whyItMatters:
          "This is why written contracts matter so much in practice: once a deal is reduced to a final signed writing, the parol evidence rule usually locks in those written terms, cutting off arguments like 'but they promised me X verbally beforehand' — making careful drafting the real protection, not memory of the negotiation.",
        example:
          "If a signed lease says 'no pets' but the landlord verbally told the tenant pets were fine before signing, the parol evidence rule generally keeps that earlier oral promise from overriding the final written 'no pets' term — the tenant should have gotten it in writing.",
      },
      {
        id: "contract-breach",
        title: "Breach: material vs. minor",
        explanation:
          "A material breach goes to the heart of the contract's purpose and generally excuses the other party from further performance and entitles them to full damages; a minor (partial) breach doesn't defeat the contract's core purpose, and the non-breaching party must still perform but can seek damages for the shortfall.",
        whyItMatters:
          "This distinction determines your actual options when the other side falls short: walk away entirely (only available for material breach), or keep performing while claiming damages for the gap (minor breach) — treating a minor breach as material and walking away can itself become a breach on your part.",
        example:
          "A contractor who finishes a house but uses a slightly different (still functional, similarly priced) brand of pipe than specified has likely committed only a minor breach — the owner generally can't refuse to pay and must instead seek the (probably small) cost difference as damages.",
      },
      {
        id: "contract-remedies",
        title: "Remedies: expectation, reliance, restitution, specific performance",
        explanation:
          "Expectation damages (the default) put the injured party where they'd have been had the contract been performed — typically the most generous measure. Reliance damages cover out-of-pocket costs spent relying on the contract. Restitution returns any benefit conferred on the breaching party. Specific performance (an equitable remedy) orders the breaching party to actually perform, reserved for situations where money damages are inadequate.",
        whyItMatters:
          "Which remedy is available shapes negotiating leverage long before any lawsuit: money damages are the default and courts are reluctant to order specific performance except for genuinely unique subject matter, since forcing ongoing performance is harder to supervise and enforce than awarding money.",
        example:
          "A buyer of a mass-produced car who doesn't get delivery can just buy an equivalent car elsewhere and sue for the price difference (expectation damages, money is adequate); a buyer of a specific piece of real estate or a one-of-a-kind painting can often get specific performance, because no substitute exists.",
      },
      {
        id: "contract-excuses",
        title: "Excuses: impossibility, frustration of purpose, unconscionability",
        explanation:
          "Impossibility excuses performance when an unforeseen event makes performance objectively impossible (not just harder or more expensive). Frustration of purpose excuses performance when the entire reason for the contract has been destroyed by an unforeseen event, even though performance itself remains technically possible. Unconscionability lets a court refuse to enforce a contract (or a term) so one-sided or procedurally unfair that enforcing it would shock the conscience.",
        whyItMatters:
          "These are narrow, deliberately hard-to-meet exceptions — courts are wary of letting parties escape bad bargains just because a deal turned out worse than expected, since that would undermine the whole point of binding promises. Knowing how narrow they are is as important as knowing they exist.",
        example:
          "A venue destroyed by fire before a scheduled wedding reception makes the venue contract impossible to perform (excused). A coronation-viewing room rented specifically to watch a parade that got cancelled is the classic frustration-of-purpose case (Krell v. Henry) — the room itself was still available, but the entire purpose of renting it was destroyed.",
      },
      {
        id: "contract-third-party-rights",
        title: "Third-party rights: assignment, delegation, third-party beneficiaries",
        explanation:
          "Assignment transfers a party's contractual rights to someone outside the original contract; delegation transfers a party's duties (though the original party often remains liable if the delegate fails to perform). A third-party beneficiary is someone the original parties intended to directly benefit from the contract, even though they weren't a signing party — and who may be able to enforce it themselves.",
        whyItMatters:
          "Contracts routinely affect people beyond the original two signers — knowing whether rights can be assigned, whether duties can be delegated, and whether an outside party has standing to sue is essential for anything involving subcontracting, insurance, or benefit arrangements.",
        example:
          "A life insurance policy names a beneficiary who never signed the insurance contract but can still enforce payment as an intended third-party beneficiary — the whole point of the contract, from the policyholder's side, was to benefit that named person.",
      },
    ],
    connections:
      "Formation, capacity, and legality answer the threshold question — is there an enforceable contract at all. Terms (express, implied, and what the parol evidence rule locks in) define exactly what was promised. Breach classification determines what happens when a promise is broken, and remedies determine what the injured party actually gets. Excuses are the narrow escape hatches from an otherwise-binding promise, and third-party rights extend the whole framework to people beyond the original two parties.",
    source: "claude",
    generatedAt: "2026-09-09",
  },
};

/**
 * Script-generated entries first, then hand-authored entries layered on top
 * (see the note on HAND_AUTHORED_CONTENT above) — this is what the app
 * actually reads from.
 */
export const TEACHING_CONTENT: Record<string, TeachingContent> = {
  ...GENERATED_TEACHING_CONTENT,
  ...HAND_AUTHORED_CONTENT,
};

export function getTeachingContent(profession: CaseProfession, category: string): TeachingContent | null {
  return TEACHING_CONTENT[contentKey(profession, category)] ?? null;
}

export function hasTeachingContent(profession: CaseProfession, category: string): boolean {
  return contentKey(profession, category) in TEACHING_CONTENT;
}
