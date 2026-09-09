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

  "law/Corporate & Compliance": {
    profession: "law",
    category: "Corporate & Compliance",
    overview:
      "Corporate and compliance law governs how companies are run internally — who owes what duties to whom, and how a company builds systems to catch and prevent misconduct before regulators do. The recurring theme is that good process, documented at the time, is usually a company's best defense.",
    concepts: [
      {
        id: "corp-fiduciary-duties",
        title: "Fiduciary duties: care and loyalty",
        explanation:
          "Officers and directors owe a duty of care (make informed, reasonably diligent decisions) and a duty of loyalty (act in the company's interest, not a conflicting personal one). The business judgment rule protects good-faith, informed decisions from being second-guessed later just because they turned out badly.",
        whyItMatters:
          "This is why process matters as much as outcome: a director who gets bad legal advice after asking the right questions is protected by the business judgment rule; one who rubber-stamps a decision without reading the materials is not, even if the decision happened to work out.",
        example:
          "In the Disney/Ovitz executive severance litigation, the Delaware courts scrutinized whether the board was adequately informed when approving a huge severance package — ultimately finding no breach, but only after years of litigation over exactly how informed 'informed' needs to be.",
      },
      {
        id: "corp-veil-limited-liability",
        title: "Limited liability and piercing the corporate veil",
        explanation:
          "A corporation is legally separate from its owners, who are normally not personally liable for its debts. Courts will 'pierce the veil' — holding owners personally liable — only in narrow circumstances: failing to maintain corporate formalities, undercapitalizing the company to defraud creditors, or using it as a mere alter ego of the owner.",
        whyItMatters:
          "This is the whole economic point of incorporating, so courts are deliberately reluctant to override it — but that reluctance evaporates fast if the company was never really treated as separate from its owner (commingled funds, no real records, no meetings).",
        example:
          "A single-owner LLC that pays the owner's personal mortgage directly from the business account, keeps no minutes, and is thinly capitalized is a textbook veil-piercing target if it later can't pay a judgment creditor.",
      },
      {
        id: "corp-compliance-programs",
        title: "Effective compliance programs",
        explanation:
          "Regulators (and the U.S. Sentencing Guidelines) evaluate compliance programs on concrete factors: written standards, a senior compliance officer with real authority, employee training, a confidential reporting channel, consistent enforcement, and periodic auditing — not just a policy binder on a shelf.",
        whyItMatters:
          "Whether a company had a genuinely 'effective' program (versus a paper one) is often the difference between a warning and criminal charges when misconduct is discovered — regulators explicitly credit real programs with reduced penalties.",
        example:
          "The DOJ's Evaluation of Corporate Compliance Programs guidance is used by prosecutors to decide charging and penalty decisions — a company that can show its program was resourced, tested, and actually acted on, not just written, fares dramatically better after a violation surfaces.",
      },
      {
        id: "corp-insider-trading",
        title: "Insider trading and material nonpublic information",
        explanation:
          "It's illegal to trade a company's securities (or tip someone else who trades) while in possession of material nonpublic information — information a reasonable investor would consider important and that hasn't been made public — in breach of a duty of trust or confidence.",
        whyItMatters:
          "This affects far more people than executives: employees, consultants, and even family members who receive a tip can be liable. 'I didn't trade, I just told my brother' is not a defense — tipper and tippee can both be liable.",
        example:
          "The Martha Stewart case involved a tip about an FDA decision passed from a broker to a client before it became public — the underlying trade avoided a modest loss, but the resulting prosecution and reputational damage were enormous, illustrating how disproportionate the consequences can be to the trade size.",
      },
      {
        id: "corp-fcpa-anti-bribery",
        title: "Anti-bribery and anti-corruption (FCPA)",
        explanation:
          "The Foreign Corrupt Practices Act prohibits U.S. companies (and many foreign companies with U.S. ties) from bribing foreign officials to obtain or retain business, and separately requires accurate books and records. Liability extends to bribes paid by third-party agents and distributors acting on the company's behalf.",
        whyItMatters:
          "Using a local 'consultant' or distributor to make a payment doesn't create distance from liability — regulators explicitly look for this pattern, and a company can be liable for what its intermediaries do if it should have known.",
        example:
          "Several major multinational companies have paid nine- or ten-figure FCPA settlements for bribes routed through local sales agents or joint-venture partners rather than paid directly — the indirect structure didn't insulate the parent company.",
      },
      {
        id: "corp-whistleblower-internal-investigations",
        title: "Whistleblower protections and internal investigations",
        explanation:
          "Whistleblower laws (Sarbanes-Oxley, Dodd-Frank, and others) protect employees who report suspected violations from retaliation, and in some cases (like SEC whistleblower programs) offer financial rewards. A credible internal investigation must be independent of anyone implicated and preserve evidence properly.",
        whyItMatters:
          "Retaliating against a whistleblower — even subtly, like a bad performance review timed suspiciously close to a report — creates a second, often easier-to-prove legal claim layered on top of whatever the original report was about, and mishandled investigations can destroy privilege protections.",
        example:
          "Wells Fargo faced not only the original fallout from its unauthorized-accounts scandal but additional whistleblower-retaliation liability from employees who said they were fired for reporting the practice internally before it became public.",
      },
    ],
    connections:
      "Fiduciary duties and the corporate veil define the basic internal accountability structure — who's responsible to whom, and when that separation between company and owner can be disregarded. Compliance programs are the practical machinery for catching problems (like insider trading or FCPA violations) before they become scandals, and whistleblower protections are the release valve that surfaces problems the compliance program missed — all of it ultimately tested by how a company documents and responds when something goes wrong.",
    source: "claude",
    generatedAt: "2026-09-09",
  },

  "law/Civil Litigation": {
    profession: "law",
    category: "Civil Litigation",
    overview:
      "Civil litigation is the structured process for resolving private disputes through courts — a sequence of procedural stages, each with its own strategic leverage points, that exists specifically so cases can usually be resolved (or settled) without going all the way to trial.",
    concepts: [
      {
        id: "civ-pleading-burden-of-proof",
        title: "Pleading standards and burden of proof",
        explanation:
          "A civil complaint must state a 'plausible' claim (not just conceivable) under modern federal pleading standards. Unlike criminal cases, civil plaintiffs generally only need to prove their case by a 'preponderance of the evidence' — more likely than not, a far lower bar than 'beyond a reasonable doubt.'",
        whyItMatters:
          "This lower burden is why civil liability can attach even when someone is acquitted of a related crime — the O.J. Simpson civil case is the famous example, since 'more likely than not' is a much easier bar to clear than 'beyond a reasonable doubt.'",
        example:
          "After being acquitted criminally, O.J. Simpson was found liable in a subsequent civil wrongful-death suit — same underlying facts, different burden of proof, different outcome.",
      },
      {
        id: "civ-jurisdiction-standing",
        title: "Jurisdiction and standing",
        explanation:
          "A court needs subject-matter jurisdiction (authority over the type of case) and personal jurisdiction (authority over the defendant, generally requiring 'minimum contacts' with the forum state). A plaintiff also needs standing — a concrete, particularized injury actually caused by the defendant that a favorable ruling would redress.",
        whyItMatters:
          "Cases get dismissed on these threshold grounds constantly, often before any argument about who's actually right — a strong claim filed in the wrong court, or by someone who can't show a real personal injury, goes nowhere regardless of the merits.",
        example:
          "A federal court dismissing a data-breach class action for lack of standing because the plaintiffs couldn't show a concrete injury (as opposed to speculative future harm) is a recurring pattern in privacy litigation.",
      },
      {
        id: "civ-discovery",
        title: "Discovery",
        explanation:
          "Discovery is the pre-trial process where each side obtains evidence from the other: interrogatories (written questions), depositions (sworn oral testimony), and requests for documents. It's designed to prevent trial by ambush — each side should know the other's evidence before trial.",
        whyItMatters:
          "Discovery is often where cases are actually won or lost — a damaging document or a bad deposition answer can force a settlement long before trial, and discovery costs themselves are a major factor in settlement decisions regardless of the underlying merits.",
        example:
          "In large commercial litigation, discovery of internal emails has repeatedly proven more damaging than any argument made in court — a casually written internal message can undercut an entire litigation strategy once it surfaces.",
      },
      {
        id: "civ-dispositive-motions",
        title: "Motions to dismiss and summary judgment",
        explanation:
          "A motion to dismiss argues the complaint fails as a matter of law even if every fact alleged is true. A motion for summary judgment (after discovery) argues there's no genuine factual dispute for a jury to resolve, so the court should rule as a matter of law based on the undisputed facts.",
        whyItMatters:
          "These are the main ways a case ends before trial — understanding which arguments survive a motion to dismiss (where facts are assumed true) versus what survives summary judgment (where facts must actually be supported by evidence) shapes litigation strategy from day one.",
        example:
          "A defendant might lose a motion to dismiss (because the complaint's allegations, taken as true, state a claim) but win summary judgment later once discovery reveals the plaintiff has no actual evidence to support those allegations.",
      },
      {
        id: "civ-settlement-adr",
        title: "Settlement dynamics and alternative dispute resolution",
        explanation:
          "The overwhelming majority of civil cases settle rather than go to trial. Mediation (a neutral third party facilitates negotiation, non-binding) and arbitration (a neutral decides the case, often binding, per a contract clause) are common alternatives that are typically faster and more private than litigation.",
        whyItMatters:
          "Settlement value isn't just about the merits — it's a function of litigation cost, time, risk tolerance, and reputational exposure on both sides, which is why even strong cases often settle for less than a jury might have awarded.",
        example:
          "Many consumer and employment contracts now include mandatory arbitration clauses, which courts generally enforce — meaning a dispute that looks headed for a public jury trial is often actually resolved in private, binding arbitration instead.",
      },
      {
        id: "civ-damages-remedies",
        title: "Damages and remedies",
        explanation:
          "Compensatory damages make the plaintiff whole for actual losses (economic and, in some cases, non-economic like pain and suffering). Punitive damages punish especially egregious conduct and deter repetition, and are available in a narrower set of cases, usually requiring a showing of malice or recklessness beyond ordinary negligence.",
        whyItMatters:
          "The availability (or cap) of punitive damages massively affects settlement leverage and case valuation — a case with a plausible punitive-damages theory is worth defending (or settling) very differently than one limited to compensatory damages alone.",
        example:
          "The McDonald's hot coffee case is widely misunderstood: the plaintiff had serious third-degree burns and McDonald's had received hundreds of prior complaints without changing its practices — facts that supported a punitive damages claim, which is why the jury award (later reduced) was so much larger than pure medical costs.",
      },
    ],
    connections:
      "Jurisdiction and standing are threshold gatekeepers — no case proceeds without clearing them. Once past that, pleading standards determine whether a complaint survives to discovery, discovery generates the evidence that dispositive motions (and eventually a jury) will evaluate against the burden of proof, and throughout all of it, settlement/ADR dynamics are constantly weighing whether to keep litigating toward the damages a case might ultimately be worth.",
    source: "claude",
    generatedAt: "2026-09-09",
  },

  "law/Criminal Law": {
    profession: "law",
    category: "Criminal Law",
    overview:
      "Criminal law is fundamentally different from civil law in what's at stake (liberty, not just money) and who brings the case (the state, not a private party) — which is why it comes with a much higher burden of proof and a distinct set of constitutional protections for the accused.",
    concepts: [
      {
        id: "crim-actus-reus-mens-rea",
        title: "Elements of a crime: actus reus and mens rea",
        explanation:
          "Most crimes require both a guilty act (actus reus — a voluntary act or, sometimes, a failure to act where there's a legal duty to act) and a guilty mind (mens rea — the required mental state, such as intent, knowledge, recklessness, or negligence, which varies by crime).",
        whyItMatters:
          "The required mens rea is often the whole case: the same act (causing someone's death) is murder, manslaughter, or not a crime at all depending on whether it was intentional, reckless, or a pure accident — the physical act alone doesn't determine the charge.",
        example:
          "Killing someone while driving drunk versus killing someone in a premeditated, planned act are both homicides in the physical sense, but the vastly different mental states involved lead to entirely different charges (vehicular manslaughter versus first-degree murder) and penalties.",
      },
      {
        id: "crim-burden-of-proof",
        title: "Burden of proof: beyond a reasonable doubt",
        explanation:
          "The prosecution must prove every element of a crime beyond a reasonable doubt — a far higher standard than civil law's preponderance of the evidence — and the defendant is presumed innocent throughout, with no burden to prove innocence.",
        whyItMatters:
          "This asymmetry is deliberate: the system is designed to prefer letting some guilty people go free over convicting innocent people, given how much more is at stake (loss of liberty) than in a civil case about money.",
        example:
          "A case can result in acquittal even when jurors think the defendant 'probably' did it — 'probably' (more likely than not) is the civil standard, not the criminal one, so genuine doubt about guilt, even a fairly small amount, is legally supposed to mean acquittal.",
      },
      {
        id: "crim-fourth-amendment",
        title: "Fourth Amendment: search and seizure",
        explanation:
          "The Fourth Amendment protects against unreasonable searches and seizures, generally requiring a warrant based on probable cause — with numerous exceptions (consent, plain view, exigent circumstances, search incident to arrest). Evidence obtained in violation of it can be excluded from trial under the exclusionary rule.",
        whyItMatters:
          "Strong physical evidence can become worthless if it was obtained illegally — this is why 'the search itself' is so often the actual battleground in criminal defense, separate from the question of what the evidence shows.",
        example:
          "A large drug seizure can be entirely excluded from trial if the initial traffic stop that led to it lacked reasonable suspicion — the evidence's reliability isn't in question, only whether police were legally allowed to find it.",
      },
      {
        id: "crim-fifth-amendment-miranda",
        title: "Fifth Amendment and Miranda rights",
        explanation:
          "The Fifth Amendment protects against self-incrimination. Miranda v. Arizona requires police to inform a suspect in custodial interrogation of their right to remain silent and to an attorney — statements obtained without a proper Miranda warning during custodial interrogation generally can't be used in the prosecution's case-in-chief.",
        whyItMatters:
          "Miranda only applies to custodial interrogation — a common misconception is that police must always 'read you your rights' immediately upon arrest, when actually the requirement is specifically tied to combining custody with interrogation.",
        example:
          "A voluntary confession given before any arrest or restraint on movement (not 'in custody') generally doesn't require a Miranda warning at all — the rule is narrower than popular TV depictions suggest.",
      },
      {
        id: "crim-plea-bargaining",
        title: "Plea bargaining",
        explanation:
          "The vast majority of criminal cases are resolved through plea agreements rather than trial — a defendant pleads guilty (often to a reduced charge or with a sentencing recommendation) in exchange for certainty and typically a lighter outcome than the maximum trial exposure.",
        whyItMatters:
          "Plea bargaining is the actual engine of the criminal justice system in practical terms, not the exception — it shapes outcomes for the overwhelming majority of defendants and creates real pressure to plead even when a case might be winnable at trial, given the risk of a much harsher sentence if convicted.",
        example:
          "A defendant facing a mandatory minimum sentence on the top charge may accept a plea to a lesser charge specifically to avoid that mandatory minimum — the strategic calculation is about sentencing exposure and risk, not necessarily a claim of guilt to the original charge as filed.",
      },
      {
        id: "crim-defenses",
        title: "Defenses: self-defense, insanity, duress",
        explanation:
          "Affirmative defenses admit the act but argue it shouldn't result in conviction: self-defense (a reasonable, proportionate response to an imminent threat), insanity (the defendant couldn't understand the nature or wrongfulness of the act due to mental illness, under varying legal tests), and duress (the act was compelled by an imminent threat from someone else).",
        whyItMatters:
          "These defenses have specific, often narrow legal tests that differ meaningfully from lay intuitions — 'I was scared' doesn't automatically establish self-defense, and being mentally ill doesn't automatically establish legal insanity, which is a much narrower standard.",
        example:
          "The insanity defense is raised in a tiny fraction of cases and succeeds even less often — despite its outsized presence in popular culture, most jurisdictions require the defendant prove they genuinely couldn't understand right from wrong at the time of the act, not just that they had a diagnosed mental illness.",
      },
    ],
    connections:
      "Actus reus and mens rea define what the prosecution must prove; the beyond-a-reasonable-doubt standard defines how convincingly they must prove it. Fourth and Fifth Amendment protections constrain how that evidence can be gathered in the first place, and defenses (self-defense, insanity, duress) are ways to defeat the case even when the underlying act isn't disputed. Plea bargaining sits over all of it as the practical mechanism by which most cases actually resolve, shaped by how strong each side's position is on the elements above.",
    source: "claude",
    generatedAt: "2026-09-09",
  },

  "law/Constitutional & Regulatory": {
    profession: "law",
    category: "Constitutional & Regulatory",
    overview:
      "Constitutional and regulatory law is about the structure and limits of government power — which branch or agency can do what, how courts check that power, and how much deference agencies get when they act. Recent doctrinal shifts (notably around agency deference) make this an area where staying current matters more than usual.",
    concepts: [
      {
        id: "const-separation-of-powers",
        title: "Separation of powers and checks and balances",
        explanation:
          "Government power is divided among the legislative (makes law), executive (enforces law), and judicial (interprets law) branches, each with tools to check the others — veto, judicial review, impeachment, appointment/confirmation, and the power of the purse.",
        whyItMatters:
          "Most high-stakes constitutional disputes are really about which branch has authority to act at all, not just whether an action is wise — a president or agency doing something Congress never authorized is a separation-of-powers problem even if the action itself might otherwise be reasonable.",
        example:
          "Disputes over a president's use of emergency powers to redirect funds Congress appropriated for a different purpose are classic separation-of-powers fights — the substantive policy question is often secondary to who had the legal authority to make that call.",
      },
      {
        id: "const-judicial-review",
        title: "Judicial review",
        explanation:
          "Established by Marbury v. Madison (1803), judicial review is the power of courts to declare a law or government action unconstitutional. It's not explicitly written into the Constitution's text — it was the Supreme Court's own interpretation of its role that established the practice.",
        whyItMatters:
          "This is the foundational mechanism that makes constitutional rights actually enforceable rather than aspirational — without judicial review, a legislature's or executive's judgment about its own constitutional limits would be essentially final.",
        example:
          "Brown v. Board of Education (1954) is a landmark exercise of judicial review — the Court struck down state segregation laws as unconstitutional even though those laws had been duly enacted through ordinary legislative process.",
      },
      {
        id: "const-levels-of-scrutiny",
        title: "Levels of scrutiny",
        explanation:
          "Courts apply different levels of scrutiny depending on the right or classification at issue: rational basis (most government action, easy for the government to satisfy — just needs a legitimate purpose and a rational connection), intermediate scrutiny (e.g., gender classifications, requires an important government interest), and strict scrutiny (fundamental rights or suspect classifications like race, requires a compelling interest and narrow tailoring — the hardest for the government to satisfy).",
        whyItMatters:
          "Which level of scrutiny applies is often outcome-determinative before the merits are even argued — laws that easily survive rational basis review are frequently struck down under strict scrutiny, so classifying the right level is usually the real fight.",
        example:
          "Race-based affirmative action programs are evaluated under strict scrutiny (as a racial classification), which is why they face a much higher bar to survive than, say, an ordinary economic regulation reviewed under rational basis.",
      },
      {
        id: "const-commerce-clause",
        title: "The Commerce Clause and federal regulatory power",
        explanation:
          "Congress's power to 'regulate commerce among the several states' is the constitutional basis for most federal regulation — of businesses, labor, the environment, and more. Its scope has expanded and occasionally contracted through different eras of Supreme Court interpretation, and remains a live boundary question for how far federal power reaches.",
        whyItMatters:
          "Nearly every major federal regulatory statute needs a constitutional hook, and the Commerce Clause is usually it — a serious Commerce Clause challenge questions not whether a regulation is good policy, but whether the federal government (as opposed to the states) has the authority to impose it at all.",
        example:
          "In NFIB v. Sebelius (2012), the individual mandate in the Affordable Care Act was found to exceed Commerce Clause authority (though it was ultimately upheld as a valid exercise of the taxing power instead) — illustrating how a policy can survive only by finding an alternative constitutional basis.",
      },
      {
        id: "const-administrative-deference",
        title: "Administrative law and agency deference (post-Chevron)",
        explanation:
          "Federal agencies (EPA, SEC, FDA, and others) implement statutes through regulations and interpret ambiguous statutory language. For 40 years, Chevron deference required courts to defer to a reasonable agency interpretation of an ambiguous statute; the Supreme Court's 2024 decision in Loper Bright Enterprises v. Raimondo overruled Chevron, holding that courts must exercise independent judgment on statutory meaning rather than defer to the agency, though an agency's interpretation can still carry persuasive weight (Skidmore-style) where it reflects genuine expertise.",
        whyItMatters:
          "This is a major, recent shift: regulations that might once have survived a court challenge simply because they were a 'reasonable' agency reading of an ambiguous statute are now reviewed with courts making their own independent call on what the statute means — significantly raising litigation risk for agency rules built on debatable statutory interpretations.",
        example:
          "Loper Bright itself involved a fisheries regulation requiring boats to pay for federal observers — the specific dispute was narrow, but the ruling's effect is broad, inviting more, and more searching, judicial challenges to agency rules across environmental, healthcare, financial, and labor regulation.",
      },
      {
        id: "const-due-process",
        title: "Due process: procedural and substantive",
        explanation:
          "Procedural due process requires fair procedures (notice and an opportunity to be heard) before the government deprives someone of life, liberty, or property. Substantive due process protects certain fundamental rights from government interference regardless of what procedures were followed, even though the term itself doesn't appear verbatim in that form in the Constitution's text.",
        whyItMatters:
          "The distinction matters for what kind of challenge to bring: a procedural due process claim argues the process was unfair (e.g., no hearing before termination of benefits); a substantive due process claim argues the government simply shouldn't be able to do this at all, no matter how fair the process.",
        example:
          "Goldberg v. Kelly (1970) established that welfare benefits couldn't be terminated without a hearing first — a procedural due process case about the process owed, not about whether the underlying benefits program itself was constitutionally required.",
      },
    ],
    connections:
      "Separation of powers sets the stage for asking which branch or agency may act; judicial review is the mechanism courts use to police that boundary. The level of scrutiny applied determines how hard it is for a challenged government action to survive, the Commerce Clause is the usual source of federal regulatory authority being tested, administrative deference (or its recent absence, post-Chevron) determines how much benefit of the doubt an agency's own interpretation gets, and due process protections constrain how — and whether — government can act against an individual even within all of the above.",
    source: "claude",
    generatedAt: "2026-09-09",
  },

  "politics/Domestic Policy": {
    profession: "politics",
    category: "Domestic Policy",
    overview:
      "Domestic policy is about how a government actually gets things done within its own borders — turning a political goal into a functioning program, budget, and set of incentives that survive contact with a legislature, courts, bureaucracy, and shifting public opinion.",
    concepts: [
      {
        id: "dp-policy-cycle",
        title: "The policy cycle: agenda-setting, formulation, adoption, implementation, evaluation",
        explanation:
          "Policy typically moves through stages: agenda-setting (an issue gets political attention), formulation (specific proposals are drafted), adoption (a proposal is enacted), implementation (agencies actually carry it out), and evaluation (does it work — often feeding back into agenda-setting for the next round).",
        whyItMatters:
          "Most policy failures happen at implementation, not adoption — a well-designed law can fail because the implementing agency lacked funding, staff, or authority, which is why 'we passed the law' and 'the policy worked' are very different claims.",
        example:
          "The rocky early rollout of HealthCare.gov in 2013 — a functioning law undermined by an implementation failure (a broken website) — shows how adoption and implementation are genuinely separate stages that can succeed or fail independently of each other.",
      },
      {
        id: "dp-incrementalism-vs-punctuated-equilibrium",
        title: "Incrementalism vs. punctuated equilibrium",
        explanation:
          "Most policy change is incremental — small adjustments to existing programs, since large policy shifts every session are politically and administratively hard. Punctuated equilibrium theory describes how policy can occasionally undergo large, rapid shifts when a crisis, changed public attention, or a shift in governing coalition breaks the usual incremental pattern.",
        whyItMatters:
          "This explains why genuinely transformative policy usually needs a crisis or major political realignment to happen — reformers who wait for 'normal' conditions to pass ambitious change are usually waiting for something that structurally doesn't happen very often.",
        example:
          "Major financial regulation (Dodd-Frank) passed relatively quickly after the 2008 financial crisis — a punctuated-equilibrium moment — after decades of comparatively incremental adjustments to financial regulation before that.",
      },
      {
        id: "dp-federalism-implementation",
        title: "Federalism and implementation across levels of government",
        explanation:
          "Many domestic policies are implemented through a federal-state (or state-local) partnership — the federal government sets broad rules and funding (often with conditions), while states or localities handle actual delivery, creating real variation in how a single federal policy plays out on the ground.",
        whyItMatters:
          "A policy's real-world effect often depends as much on which states choose to fully implement it as on its federal design — 'national policy' is frequently, in practice, fifty different policies with a shared federal floor.",
        example:
          "Medicaid expansion under the Affordable Care Act was structured as a state option (after a Supreme Court ruling made it non-mandatory) — resulting in dramatically different healthcare access outcomes between expansion and non-expansion states, despite being the 'same' federal law.",
      },
      {
        id: "dp-cost-benefit-distributional",
        title: "Cost-benefit analysis and distributional impact",
        explanation:
          "Policy analysis typically weighs aggregate costs against aggregate benefits, but a policy with a positive net benefit can still be politically explosive if the costs and benefits fall on different, identifiable groups — concentrated costs on a visible group tend to generate much louder opposition than diffuse benefits generate support.",
        whyItMatters:
          "This asymmetry (concentrated costs, diffuse benefits) explains a lot of policy gridlock: a reform that would modestly benefit almost everyone but impose a real, visible cost on a smaller organized group often struggles to pass, even with a clearly positive net benefit.",
        example:
          "Removing a narrow tax loophole that benefits a specific industry, while spreading modest savings across all taxpayers, routinely faces disproportionate, well-funded opposition from that industry relative to the diffuse support among the broader public who'd each save relatively little.",
      },
      {
        id: "dp-interest-groups-coalitions",
        title: "Interest groups and coalition-building",
        explanation:
          "Domestic policy rarely passes on the strength of an idea alone — it requires building a coalition of interest groups, affected industries, advocacy organizations, and legislators willing to trade votes or support across otherwise unrelated priorities (logrolling).",
        whyItMatters:
          "Understanding who benefits, who loses, and who can be brought along (sometimes with unrelated concessions) is often more predictive of whether a policy passes than the policy's substantive merits.",
        example:
          "Large infrastructure or budget bills routinely bundle unrelated provisions specifically to assemble a winning coalition — a given legislator may vote for the whole package because of one provision that matters to their district, regardless of their view on the rest.",
      },
      {
        id: "dp-evidence-based-policy-evaluation",
        title: "Evidence-based policy and evaluation",
        explanation:
          "Rigorous policy evaluation (randomized controlled trials where feasible, quasi-experimental methods otherwise) tries to isolate a policy's actual causal effect from other factors changing at the same time — distinguishing correlation (things improved after the policy) from causation (the policy caused the improvement).",
        whyItMatters:
          "Without real evaluation, a program that coincided with an improvement (or a broader trend that was already happening) gets credited or blamed inappropriately — good evaluation is what lets policymakers actually learn what works rather than just what was popular.",
        example:
          "Early childhood education programs like Perry Preschool were tracked with genuine randomized, long-term follow-up (decades later) — producing much more credible evidence of real impact than programs evaluated only by short-term, non-randomized before-and-after comparisons.",
      },
    ],
    connections:
      "The policy cycle is the overall map — but incrementalism vs. punctuated equilibrium explains why most movement along that cycle is slow, with occasional exceptions. Federalism determines who actually implements a given policy once adopted, and cost-benefit/distributional analysis, interest-group coalitions, and evidence-based evaluation all shape whether — and how well — a policy survives each stage of that cycle from agenda-setting through evaluation.",
    source: "claude",
    generatedAt: "2026-09-09",
  },

  "politics/Crisis Response": {
    profession: "politics",
    category: "Crisis Response",
    overview:
      "Political crisis response is about managing a fast-moving, high-uncertainty event (a disaster, scandal, security incident, or public health emergency) while the public and media are watching in real time and demanding both immediate action and honest information — two things that are sometimes in tension.",
    concepts: [
      {
        id: "cr-crisis-communication-speed-accuracy",
        title: "Balancing speed and accuracy in crisis communication",
        explanation:
          "In a fast-moving crisis, officials face pressure to say something quickly (a vacuum gets filled by rumor and speculation) while risking saying something wrong (which damages credibility later when corrected). The generally sound approach is to communicate what's confirmed, be explicit about what's still unknown, and commit to regular updates.",
        whyItMatters:
          "Getting this balance wrong in either direction is costly: staying silent too long looks evasive and cedes the narrative to others; speaking too fast with wrong information creates a credibility problem that outlasts the original crisis.",
        example:
          "Early public statements during fast-moving disasters (e.g., initial death toll or cause estimates) are frequently revised — officials who explicitly frame early numbers as preliminary generally retain more credibility through revisions than those who state them as certain.",
      },
      {
        id: "cr-incident-command-structure",
        title: "Incident command and clear chains of authority",
        explanation:
          "Effective crisis response requires a clear command structure — who has authority to make which decisions, and how information flows up to decision-makers and back down to those executing the response (formalized in the U.S. as the Incident Command System for emergency management).",
        whyItMatters:
          "Crises expose unclear authority structures brutally and immediately — when multiple agencies or levels of government aren't sure who's actually in charge of what, response gets slower and more contradictory exactly when speed and clarity matter most.",
        example:
          "Hurricane Katrina's response was widely criticized partly for unclear coordination between federal, state, and local authorities about who had authority to order evacuations, deploy resources, and communicate with the public — a structural failure as much as a resource failure.",
      },
      {
        id: "cr-accountability-vs-blame-avoidance",
        title: "Accountability versus blame avoidance",
        explanation:
          "Officials face a real tension between taking visible accountability (which can build trust but creates political and legal exposure) and blame avoidance strategies (deflecting, delaying, or diffusing responsibility, which protects politically in the short term but can badly damage long-term credibility if it looks evasive).",
        whyItMatters:
          "The public generally forgives an honest admission of a mistake handled with a credible plan to fix it far more readily than it forgives a cover-up or blame-shifting that's later exposed — the second failure (the response to the crisis) often does more lasting damage than the first (the crisis itself).",
        example:
          "Johnson & Johnson's handling of the 1982 Tylenol tampering crisis — immediate nationwide recall, transparent communication, and tamper-proof packaging introduced afterward — is the standard positive case study, versus corporate/political scandals where an initial cover-up attempt became the bigger story than the original incident.",
      },
      {
        id: "cr-scenario-contingency-planning",
        title: "Scenario planning and pre-crisis contingency preparation",
        explanation:
          "The most effective crisis response is prepared well before the crisis: identifying plausible scenarios in advance, pre-assigning roles and decision authority, and running exercises — so that when a real crisis hits, the response follows a rehearsed structure rather than being improvised from scratch under pressure.",
        whyItMatters:
          "Decision quality degrades under acute time pressure and stress — pre-crisis planning moves as many decisions as possible to a calmer period, leaving fewer genuinely novel judgment calls to be made in the worst possible conditions for making them well.",
        example:
          "Countries and cities that had run prior pandemic-preparedness exercises (identifying supply chain gaps, hospital surge capacity, and communication protocols in advance) generally responded faster and more effectively to COVID-19 than those improvising a response structure for the first time in 2020.",
      },
      {
        id: "cr-managing-uncertainty-worst-case",
        title: "Managing uncertainty and worst-case framing",
        explanation:
          "Crisis decisions usually have to be made with incomplete information under time pressure — the practical approach is often to act on the reasonable worst-case scenario for irreversible or high-stakes decisions (like evacuation), while remaining willing to scale back as better information arrives, rather than waiting for certainty that may never come in time.",
        whyItMatters:
          "Waiting for full certainty before acting on a genuine threat is itself a decision with consequences — the cost of over-preparing for a threat that turns out smaller than feared is usually much lower than the cost of under-preparing for one that turns out larger.",
        example:
          "Evacuation orders ahead of hurricanes are routinely issued before the storm's exact path or severity is fully certain, precisely because waiting for full certainty would leave too little time to evacuate safely if the worse-case path materializes.",
      },
      {
        id: "cr-post-crisis-review",
        title: "Post-crisis review and institutional learning",
        explanation:
          "After a crisis, a genuine after-action review — identifying what went wrong structurally, not just assigning individual blame — is what actually improves the next response. Reviews that focus purely on political blame rather than structural/process failures tend to produce weaker institutional learning.",
        whyItMatters:
          "Without honest post-crisis review, the same structural failures (unclear authority, communication breakdowns, resource gaps) tend to recur in the next crisis, since nothing about the underlying system actually changed.",
        example:
          "The 9/11 Commission's report is a widely cited model of post-crisis review specifically because it focused heavily on structural and institutional failures (intelligence-sharing gaps between agencies) that led directly to concrete reforms, rather than stopping at individual blame.",
      },
    ],
    connections:
      "Scenario planning and incident command structure are what you build before a crisis hits, so that when it does, decisions about accountability, speed-versus-accuracy in communication, and managing uncertainty under worst-case framing can be executed against a prepared structure rather than improvised — and post-crisis review is what feeds lessons from this crisis back into better preparation for the next one.",
    source: "claude",
    generatedAt: "2026-09-09",
  },

  "politics/Campaign Strategy": {
    profession: "politics",
    category: "Campaign Strategy",
    overview:
      "Campaign strategy is about allocating scarce resources — money, candidate time, volunteer effort, and message — toward the specific combination of voters and turnout needed to win, which is a different and more disciplined problem than simply persuading as many people as possible of everything.",
    concepts: [
      {
        id: "cs-targeting-persuasion-turnout",
        title: "Targeting: persuasion vs. turnout",
        explanation:
          "Campaigns generally split resources between persuasion (convincing undecided or opposing voters) and turnout/mobilization (getting already-supportive voters to actually vote). Modern campaigns increasingly use voter data to identify which specific individuals fall into which category, since blanket outreach to all voters is inefficient.",
        whyItMatters:
          "The right mix depends heavily on the electorate: in a highly polarized race with few true swing voters, mobilizing your existing base can be a better use of resources than trying to persuade a shrinking pool of undecideds — misjudging this tradeoff wastes real money and time.",
        example:
          "The Obama 2008 and 2012 campaigns were noted for sophisticated micro-targeting models that scored individual voters on both persuadability and turnout propensity, directing specific messages and contact methods differently to each group rather than a single universal message.",
      },
      {
        id: "cs-message-discipline-framing",
        title: "Message discipline and framing",
        explanation:
          "Effective campaigns typically settle on a small number of core messages and repeat them relentlessly across every channel and surrogate, rather than trying to communicate every policy position with equal emphasis. Framing — how an issue is presented, not just what position is taken — shapes how voters interpret it.",
        whyItMatters:
          "Voters are exposed to a message only briefly and often inattentively — a campaign that dilutes its message across too many priorities is usually outcompeted by one voters can actually summarize and remember, regardless of the substantive merit of either platform.",
        example:
          "Bill Clinton's 1992 campaign's internal focus on 'the economy, stupid' as a disciplined, repeated core message (even as many other issues existed) is a widely cited example of message discipline overriding the temptation to litigate every issue equally.",
      },
      {
        id: "cs-fundamentals-vs-events",
        title: "Fundamentals vs. campaign events",
        explanation:
          "Political science research suggests structural 'fundamentals' — the economy, incumbency, partisan lean of the electorate — predict a substantial share of election outcomes well before campaign events happen. Individual campaign moments (debates, gaffes, ads) tend to matter most at the margins, in already-close races.",
        whyItMatters:
          "This tempers how much weight to put on any single campaign tactic or moment — a well-run campaign in a structurally hostile environment can still lose, and a poorly run one in a favorable environment can still win, which is important context for evaluating campaign decisions after the fact.",
        example:
          "Election forecasting models that weight economic indicators and incumbency alongside polling (rather than polling alone) have a track record of reasonably predicting outcomes months in advance, before most campaign-specific events have even occurred.",
      },
      {
        id: "cs-resource-allocation-battleground",
        title: "Resource allocation and battleground targeting",
        explanation:
          "Campaigns for offices decided by something other than a pure national popular vote (like the U.S. Electoral College, or targeted legislative races) concentrate resources disproportionately in competitive 'battleground' areas rather than spreading spending proportionally to population.",
        whyItMatters:
          "This is a direct consequence of the actual decision rule for winning — a vote in a safe state or district changes the outcome far less than a vote in a genuinely competitive one, so rational resource allocation looks very different from broad national persuasion.",
        example:
          "U.S. presidential campaigns spend a hugely disproportionate share of advertising dollars and candidate travel time in a handful of swing states, while largely ignoring states considered safely decided for either party, regardless of population size.",
      },
      {
        id: "cs-opposition-research-rapid-response",
        title: "Opposition research and rapid response",
        explanation:
          "Opposition research (vetting an opponent's record, statements, and vulnerabilities) informs both attack strategy and — just as importantly — a candidate's own defensive preparation. Rapid response operations exist to counter attacks or damaging stories quickly, before an unanswered narrative sets in the news cycle.",
        whyItMatters:
          "An unanswered attack tends to define a candidate in voters' minds faster than most campaigns can fully correct later — the speed of the response often matters as much as its substantive strength, especially within a single news cycle.",
        example:
          "Campaigns maintain dedicated rapid-response teams specifically to issue same-day rebuttals to news stories or opponent attacks, on the theory that a 24-48 hour gap in response lets an unfavorable narrative harden before any correction reaches the same audience.",
      },
      {
        id: "cs-gotv-ground-game",
        title: "Get-out-the-vote (GOTV) and the ground game",
        explanation:
          "Direct voter contact — door-knocking, phone banking, and text outreach, typically in the final stretch before an election — remains one of the most reliably effective ways to increase turnout among identified supporters, distinct from broadcast advertising aimed at persuasion.",
        whyItMatters:
          "In low-turnout or close elections, the ground game can be decisive on its own — a campaign that outperforms an opponent purely on turnout execution, with an identical message and ad spend, can still win by getting more of its own identified supporters to actually vote.",
        example:
          "Field experiments in political science (randomized trials on door-knocking and phone banking) have repeatedly found modest but real, measurable turnout increases from quality in-person canvassing — one of the relatively few campaign tactics with genuine experimental evidence behind it.",
      },
    ],
    connections:
      "Fundamentals set the baseline conditions a campaign is operating within — targeting and resource allocation (battlegrounds, persuasion vs. turnout) determine where effort goes given those conditions, message discipline and framing determine what voters actually hear, opposition research and rapid response defend and attack within that message battle, and GOTV/ground game converts all of the above into actual votes cast.",
    source: "claude",
    generatedAt: "2026-09-09",
  },

  "politics/Legislative Negotiation": {
    profession: "politics",
    category: "Legislative Negotiation",
    overview:
      "Legislative negotiation is about assembling enough votes to pass something through a body where no single actor has full control — which almost always requires trading, compromise, and understanding each player's real constraints and incentives, not just the stated policy positions.",
    concepts: [
      {
        id: "ln-vote-counting-whipping",
        title: "Vote counting and whipping",
        explanation:
          "Before a bill comes to a vote, party leadership ('whips') systematically canvasses members to count likely support, opposition, and undecided votes — and works to move undecided or wavering members toward the needed threshold through persuasion, pressure, or concessions.",
        whyItMatters:
          "A bill's substantive merit is often secondary to whether leadership can actually count to a majority (or supermajority, where required) — skilled legislative strategists spend more time on vote-counting mechanics than on public argument for the policy itself.",
        example:
          "Major legislation is routinely delayed or reworked at the last minute specifically because a whip count came up short — the public debate about the policy's merits often continues in parallel with a much more granular, private negotiation over the votes of a handful of swing legislators.",
      },
      {
        id: "ln-logrolling-omnibus",
        title: "Logrolling and omnibus bills",
        explanation:
          "Logrolling is trading support across unrelated issues ('I'll vote for your priority if you vote for mine'). Omnibus bills bundle many provisions into one package specifically to assemble a winning coalition — a legislator might vote for the whole package because of one provision that matters most to them, even while opposing parts of it.",
        whyItMatters:
          "This is often the only practical way genuinely difficult legislation passes at all — pure up-or-down votes on politically costly individual measures frequently fail, while the same substantive content bundled strategically with other priorities can pass.",
        example:
          "Major annual government funding bills are routinely passed as massive omnibus packages combining dozens of unrelated agency budgets and policy riders specifically because passing each piece separately would require winning (and re-winning) the same fight repeatedly.",
      },
      {
        id: "ln-procedural-leverage",
        title: "Procedural leverage: committee control, filibuster, reconciliation",
        explanation:
          "Legislative procedure itself is a major source of power, independent of raw vote counts: committee chairs control what gets a hearing or markup, the U.S. Senate filibuster effectively requires 60 votes for most legislation, and budget reconciliation allows certain fiscal measures to bypass the filibuster with a simple majority.",
        whyItMatters:
          "Understanding which procedural path a piece of legislation is using explains outcomes that raw public support numbers alone can't — a policy with majority public and even majority legislative support can still fail if it can't clear a specific procedural hurdle like a supermajority threshold.",
        example:
          "Several major U.S. fiscal and healthcare bills have been deliberately structured to qualify for budget reconciliation specifically to avoid a Senate filibuster, accepting real substantive constraints (reconciliation limits what can be included) in exchange for only needing a simple majority.",
      },
      {
        id: "ln-baker-batna",
        title: "BATNA and walk-away points",
        explanation:
          "As in any negotiation, understanding your Best Alternative To a Negotiated Agreement (BATNA) — what happens if no deal is reached — shapes how much you should concede. A party with a strong BATNA (a good outcome even without a deal) has more leverage to hold firm than one whose alternative to a deal is much worse.",
        whyItMatters:
          "Misjudging your own or the other side's BATNA leads to bad deals in both directions — conceding too much when you actually had more leverage than you realized, or holding out for terms the other side has no real reason to ever accept.",
        example:
          "A minority party with the votes to sustain a filibuster has a strong BATNA (blocking the bill entirely) in negotiations over its content — which is why bipartisan deals often require real substantive concessions to bring those votes on board, not just an appeal for unity.",
      },
      {
        id: "ln-constituent-pressure-signaling",
        title: "Constituent pressure and public signaling",
        explanation:
          "Legislators weigh not just the substantive merit of a deal but how a vote will play with their constituents and primary electorate — sometimes taking a symbolic public position (a floor speech, a press release) that differs from their actual private negotiating posture, to manage that pressure.",
        whyItMatters:
          "Public and private positions can diverge in ways that look inconsistent from the outside but are strategically coherent — a legislator publicly opposing a deal while privately negotiating improvements to it is managing two audiences (their electorate and the other negotiators) simultaneously, not necessarily being duplicitous.",
        example:
          "Legislators from competitive districts often vote against their own party's signature legislation even when they privately support most of its content, specifically to manage reelection risk in a district where the bill polls poorly — a rational response to genuinely conflicting pressures.",
      },
      {
        id: "ln-conference-committee-reconciliation-differences",
        title: "Conference committees and reconciling different chamber versions",
        explanation:
          "When two legislative chambers (like the U.S. House and Senate) pass different versions of the same bill, a conference committee (or informal negotiation) reconciles the differences into a single version both chambers must then pass again before it can become law.",
        whyItMatters:
          "This is a second, often less visible round of negotiation where provisions can be added, dropped, or watered down after the more public initial floor votes — the final law can look meaningfully different from either chamber's original passed version.",
        example:
          "Provisions that passed one chamber but not the other are frequently dropped or heavily modified during conference/reconciliation — a legislator who voted for a bill's House version isn't necessarily voting for everything that survives into the final reconciled text.",
      },
    ],
    connections:
      "Vote counting tells you whether you have the numbers; if you don't, logrolling and omnibus bundling, BATNA-aware concessions, and constituent-pressure management are the tools for getting there. Procedural leverage (committee control, filibuster, reconciliation) determines which path a bill can even take to a vote, and conference committees are where remaining differences get resolved after initial passage — all of it ultimately measured against the same question of whether you can actually count to a majority (or the relevant threshold) when it matters.",
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
