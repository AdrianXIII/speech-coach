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

  "business/Finance": {
    profession: "business",
    category: "Finance",
    overview:
      "Corporate finance is about allocating money — where it comes from, what it should be spent on, and how to tell whether a decision actually creates value versus just moving numbers around. Every concept below is ultimately a variation on comparing a return against the true cost of the capital used to get it.",
    concepts: [
      {
        id: "fin-npv-irr-payback",
        title: "NPV, IRR, and payback period",
        explanation:
          "Net present value (NPV) discounts a project's future cash flows to today's dollars and subtracts the initial investment — positive NPV means the project creates value. Internal rate of return (IRR) is the discount rate at which NPV equals zero. Payback period is simply how long until the investment is recouped, ignoring the time value of money.",
        whyItMatters:
          "NPV and IRR can disagree on ranking mutually exclusive projects (especially with different sizes or cash flow timing) — NPV is generally the more reliable decision rule since it directly measures value created in dollar terms, while IRR can be misleading for unconventional cash flow patterns.",
        example:
          "A project with a huge IRR on a tiny investment can still create less total value than a project with a modest IRR on a much larger investment — which is why a CFO comparing a $10,000 project at 40% IRR against a $10 million project at 15% IRR would rely on NPV, not IRR, to see which actually adds more dollars of value.",
      },
      {
        id: "fin-capital-structure-leverage",
        title: "Capital structure: debt vs. equity",
        explanation:
          "A company can fund itself with debt (must be repaid with interest, but doesn't dilute ownership) or equity (no repayment obligation, but dilutes ownership and is more expensive since equity investors demand higher returns for taking more risk). Leverage — using debt — magnifies both returns and risk to equity holders.",
        whyItMatters:
          "More debt increases returns to equity holders when things go well (since debt has a fixed cost and equity captures the upside) but also increases the risk of financial distress or bankruptcy when they don't — capital structure decisions are really about how much of that amplified risk a company can safely carry.",
        example:
          "Highly leveraged buyouts (LBOs) intentionally load a company with debt to boost equity returns for the private equity sponsor — a strategy that works well if the business performs as projected, and can force bankruptcy if cash flows fall short of covering the debt service.",
      },
      {
        id: "fin-wacc-cost-of-capital",
        title: "WACC and the cost of capital",
        explanation:
          "The weighted average cost of capital (WACC) blends the cost of debt and the cost of equity, weighted by how much of each a company uses, into a single discount rate representing the minimum return a project must clear to be worth doing — since that's the return capital providers require for the risk they're taking.",
        whyItMatters:
          "WACC is the hurdle rate used in NPV calculations — get it wrong (too low) and you'll approve value-destroying projects that look attractive on paper; get it too high and you'll reject genuinely good projects.",
        example:
          "A riskier business (like an early-stage biotech) has a much higher WACC than a stable utility, because equity investors demand a much higher expected return to compensate for the biotech's greater risk — the same project cash flows would be judged differently depending on which company's WACC discounts them.",
      },
      {
        id: "fin-cash-conversion-cycle",
        title: "Cash conversion cycle and profitability vs. liquidity",
        explanation:
          "The cash conversion cycle measures how long cash is tied up in operations — from paying for inventory, through selling it, to collecting payment from customers. A profitable company on paper can still run out of cash if this cycle is too long relative to its available financing.",
        whyItMatters:
          "This is why 'profitable' and 'solvent' aren't the same thing — a growing company can be reporting healthy profits while simultaneously running out of cash, because growth itself consumes cash (more inventory, more receivables) faster than profit generates it.",
        example:
          "Fast-growing retailers have historically gone bankrupt despite reporting profits, because rapid expansion required financing more inventory and receivables than operating cash flow could support — a classic 'growing broke' scenario driven by cash conversion cycle mechanics, not lack of profitability.",
      },
      {
        id: "fin-valuation-methods",
        title: "Valuation methods: DCF, comparables, precedent transactions",
        explanation:
          "Discounted cash flow (DCF) values a company based on its own projected future cash flows, discounted to present value. Trading comparables value it relative to similar public companies' valuation multiples. Precedent transactions value it based on what similar companies actually sold for in past M&A deals.",
        whyItMatters:
          "No single method is 'correct' — each has different strengths and blind spots (DCF is sensitive to assumptions about growth and discount rate; comparables depend on finding truly similar companies; precedent transactions can be stale or reflect deal-specific premiums), so practitioners typically triangulate across all three.",
        example:
          "Investment bankers routinely present a 'football field' chart showing the valuation range from each method side by side — a company's fair value is usually argued to sit somewhere in the overlap of these ranges, not at a single precise number from any one method.",
      },
      {
        id: "fin-financial-statement-analysis",
        title: "Diagnosing a business from financial statements",
        explanation:
          "The income statement (profitability over a period), balance sheet (assets, liabilities, and equity at a point in time), and cash flow statement (actual cash movements, split into operating, investing, and financing activities) together tell a fuller story than any one alone — reading them together reveals things a single number can hide.",
        whyItMatters:
          "A company can show growing revenue and profit on the income statement while its cash flow statement reveals operating cash flow is actually negative — a red flag that pure income-statement analysis would miss entirely, often signaling aggressive revenue recognition or a working-capital problem.",
        example:
          "Several accounting scandals (like Enron) involved income statements that looked strong while cash flow and balance sheet details — had they been scrutinized together — showed the underlying cash generation didn't match the reported profits.",
      },
    ],
    connections:
      "NPV, IRR, and payback are the decision tools for evaluating any individual investment, but they only work correctly once you know your WACC — the true cost of the capital being invested, which itself depends on the debt/equity mix chosen in your capital structure. The cash conversion cycle is a reminder that accounting profit and actual cash aren't the same thing, valuation methods extend the same NPV logic to valuing an entire company rather than a single project, and financial statement analysis is the diagnostic skill that ties all of it back to what a business's real financial health actually looks like.",
    source: "claude",
    generatedAt: "2026-09-09",
  },

  "business/Marketing": {
    profession: "business",
    category: "Marketing",
    overview:
      "Marketing is about identifying which customers to serve and why they should choose you over alternatives, then executing that choice consistently across price, product, and message. The concepts below build from figuring out who to target to actually launching and pricing something for them.",
    concepts: [
      {
        id: "mktg-stp",
        title: "Segmentation, targeting, and positioning (STP)",
        explanation:
          "Segmentation divides a broad market into groups with similar needs; targeting selects which segment(s) to actually pursue; positioning defines how the product should be perceived relative to alternatives in the targeted segment's mind. Trying to serve everyone with one undifferentiated position usually serves no one especially well.",
        whyItMatters:
          "Most marketing failures trace back to skipping or rushing this step — a great product with a confused or overly broad target market struggles to build a coherent message, since 'everyone' isn't a customer segment with a shared, addressable need.",
        example:
          "Volvo's decades-long positioning around safety (rather than trying to compete on performance or luxury broadly) is a textbook STP example — a deliberate, narrow, and consistently reinforced position rather than trying to be all things to all car buyers.",
      },
      {
        id: "mktg-brand-equity",
        title: "Brand equity",
        explanation:
          "Brand equity is the added value a brand name gives a product beyond its functional attributes — the premium customers will pay, or the preference they show, purely because of the brand. It's built over time through consistent quality, positioning, and experience, and can be damaged quickly by a single bad episode.",
        whyItMatters:
          "Brand equity is a genuine balance-sheet-relevant asset (even when not formally capitalized) — it's why the same physical product can command different prices under different brand names, and why companies protect it so aggressively even at real short-term cost.",
        example:
          "A generic drug and its branded equivalent can be chemically identical, yet the branded version commands a substantial price premium purely from accumulated brand trust — pure brand equity with no functional difference behind it.",
      },
      {
        id: "mktg-value-based-pricing",
        title: "Value-based pricing",
        explanation:
          "Rather than pricing based on cost-plus-margin or simply matching competitors, value-based pricing sets price according to the value the customer actually perceives and receives — which can be far higher (or lower) than production cost would suggest.",
        whyItMatters:
          "Cost-plus pricing systematically leaves money on the table for high-value products and prices low-value products out of the market — value-based pricing captures more of the value actually created, which is why it's the standard approach for genuinely differentiated products.",
        example:
          "Enterprise software is routinely priced based on the cost savings or revenue it generates for the customer (value-based) rather than the marginal cost of producing another software license (which is near zero) — a pure cost-plus approach would radically underprice it.",
      },
      {
        id: "mktg-clv-cac",
        title: "Customer lifetime value (CLV) and CAC",
        explanation:
          "Customer lifetime value estimates the total profit a customer generates over their entire relationship with the company; customer acquisition cost (CAC) is what it costs to acquire one. The relationship between the two (often expressed as a CLV:CAC ratio) tells you whether your growth spending is actually sustainable.",
        whyItMatters:
          "A business can grow revenue rapidly while destroying value if CAC exceeds CLV — this is a common trap in subscription and marketplace businesses that mistake top-line growth for health without checking whether each new customer is actually profitable over their lifetime.",
        example:
          "Several well-funded startups have grown user numbers rapidly through heavy paid acquisition spending, only to struggle once investor capital dried up, because CAC was never brought meaningfully below CLV — growth was subsidized, not organically profitable.",
      },
      {
        id: "mktg-marketing-mix",
        title: "The marketing mix (4Ps)",
        explanation:
          "Product, price, place (distribution), and promotion — the classic framework for the tactical decisions that execute a chosen positioning. Each element should reinforce the same positioning; misalignment (a premium-positioned product sold through discount channels, for instance) undermines the whole strategy.",
        whyItMatters:
          "It's a useful checklist precisely because inconsistency across the 4Ps is one of the most common ways a coherent strategy falls apart in execution — a strong brand position can be quietly eroded by a distribution or pricing decision that contradicts it.",
        example:
          "A luxury brand discounting heavily through mass-market outlet channels risks undermining the exclusivity that justifies its premium pricing elsewhere — a 'place' and 'promotion' decision directly undercutting the intended positioning.",
      },
      {
        id: "mktg-gtm-launch",
        title: "New product launch / go-to-market strategy",
        explanation:
          "A go-to-market plan sequences how a new product reaches customers: which segment to target first, which channels to use, how to price and message it, and how to build early momentum (often starting narrow before expanding) rather than launching broadly and thinly everywhere at once.",
        whyItMatters:
          "A weak or rushed launch can permanently damage a good product's prospects — first impressions, early reviews, and initial retailer/channel relationships are hard to reset once established, so sequencing and initial targeting decisions carry outsized long-term weight.",
        example:
          "Many successful tech products deliberately launched to a narrow beachhead market first (a specific city, use case, or customer segment) to build strong word-of-mouth and refine the product before expanding broadly, rather than attempting a simultaneous mass-market launch.",
      },
    ],
    connections:
      "STP is the foundational choice — who you're serving and how you want to be perceived — that everything else should reinforce. Brand equity is what accumulates from consistently executing that positioning well over time. Value-based pricing and the CLV:CAC relationship determine whether the resulting business is actually profitable, the marketing mix is the tactical checklist for consistent execution, and go-to-market strategy is how a specific new product enters the market in a way that's aligned with all of the above.",
    source: "claude",
    generatedAt: "2026-09-09",
  },

  "business/Operations": {
    profession: "business",
    category: "Operations",
    overview:
      "Operations is about reliably converting inputs into outputs at the right cost, quality, and speed — and doing so under real-world uncertainty (demand swings, supplier failures, quality variation) rather than the tidy assumptions of a textbook process diagram.",
    concepts: [
      {
        id: "ops-capacity-planning",
        title: "Capacity planning under demand uncertainty",
        explanation:
          "Capacity decisions (how much production, staffing, or infrastructure to build) are hard because demand is uncertain and capacity commitments are often large and slow to reverse. Approaches range from committing to a single demand forecast, to phased/incremental capacity additions, to real-options thinking that keeps flexibility to scale up or down as actual demand becomes clearer.",
        whyItMatters:
          "Overbuilding capacity wastes capital on idle assets; underbuilding leaves revenue on the table and can permanently cede market share to competitors who can meet demand you can't — the cost of being wrong is asymmetric depending on the industry and situation, which is why the planning approach itself matters.",
        example:
          "Semiconductor manufacturers face multi-year lead times to build new fabrication capacity, so capacity decisions must be made years before actual demand is known — a systemic reason the industry experiences boom-bust cycles of shortage and oversupply.",
      },
      {
        id: "ops-supply-risk",
        title: "Supply risk mitigation: safety stock vs. diversification",
        explanation:
          "Two complementary (not competing) strategies reduce supply disruption risk: safety stock (buffer inventory that absorbs short-term supply variability) and supplier diversification (multiple qualified suppliers, so no single failure stops production). Relying on just one leaves a real gap the other would have covered.",
        whyItMatters:
          "Companies that optimized purely for lean, single-source efficiency learned expensively during recent supply chain disruptions that resilience has a cost worth paying — the right balance depends on how critical and how volatile a given input actually is.",
        example:
          "Automakers that relied on a single source for critical semiconductor chips faced production shutdowns during the 2021 chip shortage, while those with more diversified sourcing (or larger buffer stock) weathered it comparatively better.",
      },
      {
        id: "ops-make-vs-buy",
        title: "Make-vs-buy on total cost of ownership",
        explanation:
          "Outsourcing decisions should be evaluated on total cost of ownership — not just the headline unit price, but quality risk, lead time, coordination cost, loss of control, and the strategic cost of not building the capability in-house — rather than choosing the cheapest quoted price alone.",
        whyItMatters:
          "A supplier's lower unit price can hide real costs elsewhere (longer lead times requiring more inventory, quality issues requiring rework, or losing an internal capability that turns out to matter strategically later) — narrow price comparison alone routinely leads to bad outsourcing decisions.",
        example:
          "Companies that outsourced core manufacturing purely on unit-cost grounds have sometimes found themselves unable to quickly innovate on the product afterward, because the manufacturing know-how — which turned out to matter for product development — had effectively moved to the supplier.",
      },
      {
        id: "ops-bottleneck-throughput",
        title: "Bottleneck / throughput analysis (Theory of Constraints)",
        explanation:
          "In any multi-step process, one step (the bottleneck) limits the throughput of the entire system — improving any other step doesn't increase total output, only improving the actual bottleneck does. The Theory of Constraints formalizes identifying and systematically elevating this constraint.",
        whyItMatters:
          "Effort spent optimizing non-bottleneck steps is often wasted effort dressed up as productivity — a common operational mistake is improving the parts of a process that are easiest to improve rather than the one step that's actually limiting overall output.",
        example:
          "A factory that speeds up an early production stage that already has spare capacity gains nothing in total output if a later stage remains the true bottleneck — the extra work-in-progress just piles up in front of the real constraint.",
      },
      {
        id: "ops-root-cause-analysis",
        title: "Root cause analysis (5 Whys, fishbone)",
        explanation:
          "Structured root-cause methods (repeatedly asking 'why' to trace a problem to its underlying systemic cause, or mapping potential cause categories on a fishbone/Ishikawa diagram) push past treating symptoms toward fixing the actual, often less obvious, source of a recurring problem.",
        whyItMatters:
          "Fixing a symptom without addressing the root cause guarantees the problem recurs — root-cause discipline is what separates a genuine fix from a temporary patch, especially for quality or safety failures that keep coming back in slightly different forms.",
        example:
          "A recurring machine breakdown addressed by simply repairing it each time (symptom) versus tracing it back to inadequate preventive maintenance scheduling (root cause) leads to very different long-term outcomes — one keeps recurring, the other actually stops it.",
      },
      {
        id: "ops-jit-inventory",
        title: "Just-in-time vs. buffer inventory tradeoffs",
        explanation:
          "Just-in-time (JIT) inventory minimizes carrying cost by holding minimal stock, ordering just enough just in time for use — efficient when supply is reliable, but fragile when it isn't. Buffer/safety inventory sacrifices some efficiency for resilience against demand or supply variability.",
        whyItMatters:
          "The right level on this spectrum isn't universal — it depends on how volatile and consequential a stockout would be for that specific input, which is why sophisticated operations apply different inventory policies to different components rather than one blanket approach.",
        example:
          "Toyota, the originator of JIT/lean manufacturing, still maintains deliberate buffer stock for its most critical, hard-to-replace components — even the company most associated with lean inventory recognizes it isn't a one-size-fits-all rule.",
      },
    ],
    connections:
      "Capacity planning and supply risk mitigation address uncertainty on the input and demand side; make-vs-buy determines which parts of the process you even control directly. Bottleneck analysis tells you where to focus improvement effort once a process exists, root cause analysis is how you actually fix problems that surface (including at the bottleneck), and JIT-vs-buffer tradeoffs run through nearly all of these decisions as the recurring efficiency-versus-resilience tension.",
    source: "claude",
    generatedAt: "2026-09-09",
  },

  "business/Leadership & HR": {
    profession: "business",
    category: "Leadership & HR",
    overview:
      "This category is about the human side of running an organization — managing performance and behavior fairly and defensibly, handling painful decisions (layoffs, terminations) well, and building a culture that survives stress rather than fracturing under it.",
    concepts: [
      {
        id: "hr-toxic-high-performer",
        title: "Managing a toxic high performer",
        explanation:
          "A high performer whose behavior damages team morale or drives away colleagues creates a real dilemma: their individual output looks valuable, but the team-level cost (attrition, disengagement, chilled psychological safety) is often larger and harder to measure. Acting requires documented behavioral evidence, not just performance metrics.",
        whyItMatters:
          "Leaders who tolerate toxic behavior because of strong individual output routinely underestimate the real cost — quiet attrition of other good employees who won't work under those conditions, which is a slower but often larger loss than the toxic employee's individual contribution.",
        example:
          "Multiple well-documented corporate cultural crises trace back to leadership protecting a high-revenue-generating individual from consequences for behavioral misconduct for too long — the eventual cost (legal, reputational, talent attrition) usually dwarfs whatever that individual's output was worth.",
      },
      {
        id: "hr-performance-documentation",
        title: "Performance management and documentation",
        explanation:
          "Addressing behavioral or performance issues requires consistent, contemporaneous documentation — specific incidents, dates, and communicated expectations — not just a memory of 'this has been a pattern.' This protects both fairness to the employee and the company's position if a termination is later challenged.",
        whyItMatters:
          "Undocumented 'informal' performance concerns are hard to act on later and create real legal exposure if a termination looks retaliatory or discriminatory without a documented performance record to support it — documentation is protective for everyone involved, not just defensive paperwork.",
        example:
          "Wrongful termination claims are far harder to defend when a company can't produce any documented performance conversations before the termination — even a legitimate performance-based firing can become expensive to defend without a paper trail.",
      },
      {
        id: "hr-workforce-reduction",
        title: "Workforce reduction tradeoffs: layoffs vs. pay cuts",
        explanation:
          "Cutting costs through headcount (layoffs) versus across-the-board pay/hours reductions involves different tradeoffs: layoffs concentrate pain on fewer people but preserve remaining employees' full compensation and can remove genuinely underperforming roles; broad pay cuts spread pain thinly but can demoralize the whole organization and risk losing your best people to competitors who didn't cut pay.",
        whyItMatters:
          "There's no universally 'kinder' option — the right choice depends on how temporary the downturn is expected to be, and which failure mode (losing your best talent broadly, or the trauma/signal of concentrated layoffs) the organization can least afford.",
        example:
          "Some Japanese companies have historically favored broad pay/hours reductions over layoffs during downturns, reflecting different cultural and legal norms around employment security — a genuinely different tradeoff resolution than the more layoff-favoring norm in many U.S. companies.",
      },
      {
        id: "hr-post-merger-culture",
        title: "Cultural integration in M&A",
        explanation:
          "Merging two organizations means merging two different cultures, decision-making norms, and unwritten rules — treated as a distinct workstream from financial and legal due diligence, cultural fit assessment tries to anticipate friction (autonomy vs. process, pace of decision-making) before it derails the deal's value.",
        whyItMatters:
          "A large share of M&A deals fail to achieve their projected value specifically because of poor integration, and cultural clashes are one of the most commonly cited reasons — a financially sound deal can still fail to deliver its synergies if the two organizations can't actually work together afterward.",
        example:
          "Acquisitions of smaller, fast-moving companies by larger, more bureaucratic acquirers have repeatedly seen key talent leave within the first year or two, frustrated by a slower decision-making culture imposed post-acquisition — a cultural integration failure, not a strategic or financial one.",
      },
      {
        id: "hr-psychological-safety",
        title: "Psychological safety",
        explanation:
          "Psychological safety is a shared belief that a team is safe for interpersonal risk-taking — that raising a concern, admitting a mistake, or challenging an idea won't be punished or embarrassing. It's a well-researched predictor of team learning, innovation, and — critically — of problems actually surfacing before they become crises.",
        whyItMatters:
          "Teams without psychological safety don't have fewer problems — they have the same problems, just hidden longer, since people are afraid to raise them until it's too late to address them cheaply, which is why so many organizational failures are traced back afterward to warnings that existed but went unspoken.",
        example:
          "Google's internal 'Project Aristotle' research on what made teams effective found psychological safety was the single most important factor — more predictive of team performance than who was actually on the team.",
      },
      {
        id: "hr-culture-change-management",
        title: "Leading organizational culture change",
        explanation:
          "Deliberate culture change requires more than a values statement — it needs structural reinforcement: what gets measured, rewarded, and modeled by leadership, since culture is ultimately what an organization actually does under pressure, not what it says it values.",
        whyItMatters:
          "A mismatch between stated values and actual incentives (rewarding behavior that contradicts the stated culture) is why so many culture change initiatives fail — employees calibrate to what's actually rewarded and tolerated, not to posters on the wall.",
        example:
          "A company that says it values collaboration but only promotes and bonuses individual star performers will develop a competitive, siloed culture regardless of its stated values — because the actual incentive structure, not the mission statement, is what shapes behavior.",
      },
    ],
    connections:
      "Performance documentation is the foundation that makes it possible to act fairly on both a toxic high performer and a broader workforce reduction decision. Psychological safety and genuine culture change both depend on the same underlying truth — what's actually rewarded and tolerated (not stated) shapes behavior — and post-merger cultural integration is a concentrated, high-stakes test of all of this at once, since two different reward and behavior systems are being forced together simultaneously.",
    source: "claude",
    generatedAt: "2026-09-09",
  },

  "business/Crisis Management": {
    profession: "business",
    category: "Crisis Management",
    overview:
      "Crisis management is about protecting people and trust when something goes seriously wrong, under real time pressure and incomplete information — the recurring lesson across almost every case study in this area is that how an organization responds usually matters more, in the end, than the original failure itself.",
    concepts: [
      {
        id: "crisis-disclosure-timing",
        title: "Disclosure timing: legal minimum vs. reputational optimum",
        explanation:
          "Companies facing bad news must decide when to disclose it — the legal minimum (what regulation actually requires, and when) is often later than the reputational optimum (disclosing proactively, before being forced to, to control the narrative and demonstrate good faith).",
        whyItMatters:
          "Waiting for a forced disclosure (a leak, a regulator, an investigative journalist) almost always looks worse than getting ahead of it voluntarily — the public reads the timing itself as a signal about how much the company was trying to hide.",
        example:
          "Companies that disclosed data breaches quickly and transparently have generally faced less lasting reputational damage than those where a breach was discovered to have been known internally for months before public disclosure.",
      },
      {
        id: "crisis-precautionary-principle",
        title: "Acting under incomplete evidence",
        explanation:
          "When safety or reputational risk is asymmetric (the downside of being wrong is much larger than the cost of precaution), the sound approach is often to act on incomplete evidence rather than waiting for full certainty — pausing production, issuing a warning, or recalling a product before root cause is fully confirmed.",
        whyItMatters:
          "Waiting for complete certainty before acting on a plausible safety signal has repeatedly proven far more costly (in harm and in liability) than acting early and being wrong about the ultimate root cause — asymmetric risk changes the right decision threshold.",
        example:
          "Automotive recalls are frequently issued while root-cause investigation is still ongoing, once a credible enough safety signal exists — regulators and companies both increasingly favor early, precautionary action over waiting for full certainty on causation.",
      },
      {
        id: "crisis-duty-of-care",
        title: "Duty of care to victims/employees/customers first",
        explanation:
          "Effective crisis response explicitly sequences human welfare (affected people's safety and wellbeing) ahead of business or legal considerations — not just as an ethical stance, but because visibly prioritizing anything else (like protecting the stock price) first is itself a reputational catastrophe if it becomes known.",
        whyItMatters:
          "Any crisis response that appears to have prioritized legal or financial protection over the people actually harmed tends to become a second, often worse scandal on top of the original one — the sequencing itself is read as a statement of values.",
        example:
          "Corporate crisis responses that are later shown (through leaked internal communications) to have focused early discussion on legal liability exposure rather than victim welfare have repeatedly become bigger stories than the original incident.",
      },
      {
        id: "crisis-business-continuity",
        title: "Business continuity planning",
        explanation:
          "A business continuity plan identifies critical operations, single points of failure, and pre-arranged fallback procedures (alternate suppliers, backup facilities, remote work capability) so a disruption doesn't halt the whole business — prepared in advance, not improvised during the actual disruption.",
        whyItMatters:
          "Organizations without continuity plans lose far more time improvising a response during the disruption itself — the value of the plan is largely in having already made the hard decisions (who has authority, what the fallback process is) before the pressure of an actual crisis.",
        example:
          "Companies with tested remote-work infrastructure and continuity plans in place before COVID-19 transitioned operations far more smoothly in early 2020 than those building remote capability for the first time under emergency conditions.",
      },
      {
        id: "crisis-apology-accountability",
        title: "Apology and accountability framing",
        explanation:
          "Image-repair research distinguishes genuine accountability (a clear acknowledgment of what went wrong and concrete remediation) from defensive strategies (minimizing, blame-shifting, or over-explaining) — the public generally responds far better to the former, even when the underlying failure is serious.",
        whyItMatters:
          "A defensive or legalistic non-apology ('we regret that some customers felt...') is widely recognized by the public as evasive and often generates more anger than the original incident — genuine accountability, while it feels riskier legally, usually produces a better reputational outcome.",
        example:
          "Johnson & Johnson's 1982 Tylenol response (full accountability, immediate nationwide recall, concrete fix) remains the standard positive benchmark precisely because it avoided minimization or blame-shifting despite the company not being at fault for the tampering itself.",
      },
      {
        id: "crisis-preparedness-playbook",
        title: "Building a crisis playbook before you need it",
        explanation:
          "A crisis management protocol — pre-identified spokespeople, escalation triggers, decision authority, and communication templates — built proactively means a real crisis follows a rehearsed structure instead of being designed from scratch under maximum pressure and scrutiny.",
        whyItMatters:
          "The quality of decisions made under acute stress and time pressure is generally worse than decisions made calmly in advance — a playbook moves as many decisions as possible out of the crisis moment itself and into a calmer planning period.",
        example:
          "Companies with a pre-designated crisis communications team and pre-approved escalation protocols typically issue their first public response within hours of an incident, while companies without one often take a day or more just to determine who's authorized to speak — a gap that shapes the entire narrative.",
      },
    ],
    connections:
      "Duty of care sets the priority order everything else should follow. Disclosure timing and the precautionary principle both concern acting before full certainty — proactively, not reactively — and apology/accountability framing is what determines whether the response itself builds or destroys trust once action is taken. Business continuity planning and a pre-built crisis playbook are both about making these choices in advance, so the actual crisis moment executes a rehearsed structure rather than improvising all of the above at once.",
    source: "claude",
    generatedAt: "2026-09-09",
  },

  "business/Mergers & Acquisitions": {
    profession: "business",
    category: "Mergers & Acquisitions",
    overview:
      "M&A is uniquely unforgiving of sloppy analysis — huge sums are committed based on projections about a future that hasn't happened yet, and the difference between a value-creating deal and a value-destroying one is often decided by discipline exercised well before the deal closes.",
    concepts: [
      {
        id: "ma-valuation",
        title: "Core valuation methods applied to a deal",
        explanation:
          "The same triangulation used generally in finance (DCF, trading comparables, precedent transactions) anchors what a target is worth — but in M&A, buyers also add a control premium (compensation to target shareholders for giving up control) on top of the standalone valuation.",
        whyItMatters:
          "Overpaying is the single most common way M&A destroys value — a deal can be strategically brilliant and still fail purely because too much was paid relative to what the target was actually worth, even including reasonable synergies.",
        example:
          "Time Warner's 2000 merger with AOL is widely cited as a valuation and synergy-overestimation disaster — the deal was struck near the peak of the dot-com bubble, and the projected value never materialized once market conditions normalized.",
      },
      {
        id: "ma-synergy-quantification",
        title: "Quantifying and stress-testing synergies",
        explanation:
          "Synergies — cost savings or revenue gains only achievable by combining two companies — are routinely used to justify paying a premium above standalone value, but they need to be quantified specifically and stress-tested for realism, not simply asserted as a round percentage of combined revenue.",
        whyItMatters:
          "Synergy estimates are famously optimistic in practice — deal teams are incentivized (consciously or not) to project synergies large enough to justify the price being discussed, which is why disciplined buyers discount initial synergy estimates and build in integration cost and delay.",
        example:
          "Post-merger reviews across many large deals have found actual realized synergies falling well short of pre-deal projections — a persistent enough pattern that sophisticated acquirers now often apply a standard 'haircut' to management's synergy case before valuing a deal.",
      },
      {
        id: "ma-post-merger-integration",
        title: "Post-merger integration planning",
        explanation:
          "Integration — combining systems, teams, processes, and cultures — is where most of a deal's projected value is actually realized or lost, and needs a clear plan (with sequencing priorities, usually customer-facing risk first) developed before close, not improvised afterward.",
        whyItMatters:
          "A financially sound deal with a weak integration plan routinely underperforms its own projections — the purchase price is locked in on day one, but synergy realization plays out over the following 1-3 years and depends entirely on execution quality.",
        example:
          "Deals that lose key customer-facing staff or disrupt customer relationships during a chaotic early integration period frequently see revenue erosion in year one that offsets much of the projected cost synergies — a failure of integration sequencing, not deal logic.",
      },
      {
        id: "ma-cultural-due-diligence",
        title: "Cultural due diligence",
        explanation:
          "Assessing cultural fit — decision-making pace, risk tolerance, management style — as a distinct workstream from financial and legal diligence, since a financially attractive target with an incompatible culture can still fail to integrate successfully after close.",
        whyItMatters:
          "Cultural mismatch is one of the most commonly cited causes of M&A underperformance, yet it's the diligence workstream most often shortchanged relative to financial and legal review, since it's harder to quantify in a spreadsheet.",
        example:
          "Acquisitions pairing a fast-moving, entrepreneurial target with a large, process-heavy acquirer have repeatedly seen key talent depart within 12-24 months once the target's autonomy is reduced — a predictable cultural mismatch that proper diligence could often have flagged in advance.",
      },
      {
        id: "ma-earnout-structuring",
        title: "Earnouts and contingent consideration",
        explanation:
          "An earnout ties part of the purchase price to the target's future performance post-close, bridging a valuation gap when buyer and seller disagree about future prospects — the seller gets more if their optimistic projections come true, the buyer doesn't overpay if they don't.",
        whyItMatters:
          "Earnouts create their own risk: post-close disputes are common over whether the acquirer managed the business in a way that fairly gave the earnout targets a chance to be met, which is why earnout agreements need carefully drafted operating covenants, not just a target number.",
        example:
          "Earnout litigation frequently centers on claims that the acquirer changed operations, cut investment, or redirected resources away from the acquired business specifically to avoid triggering an earnout payment — a recurring enough pattern that sophisticated sellers now negotiate explicit operating covenants to prevent it.",
      },
      {
        id: "ma-antitrust-strategy",
        title: "Antitrust and regulatory strategy",
        explanation:
          "Larger deals face antitrust review, which can result in a 'second request' for extensive information, required divestitures to preserve competition, or in some cases outright blocking. Deal timelines and structure (including breakup fees if the deal fails to close) need to account for this risk from the start.",
        whyItMatters:
          "Antitrust risk isn't binary pass/fail — it shapes deal terms directly, including how much walk-away risk each side accepts and what divestiture commitments a buyer is willing to make in advance to smooth regulatory approval.",
        example:
          "Several major proposed mergers have been abandoned or restructured after regulators signaled they'd require divestitures large enough to undermine the deal's original strategic logic — antitrust risk realized late enough to have already cost both sides significant time and deal costs.",
      },
    ],
    connections:
      "Valuation and synergy quantification together determine what a fair price actually is — get either wrong and you overpay regardless of how good the strategic logic sounds. Cultural due diligence and post-merger integration planning determine whether that projected value is actually realized after close, earnouts are one tool for managing valuation disagreement risk between the parties, and antitrust strategy is the regulatory gate the whole deal has to clear before any of the above can even be executed.",
    source: "claude",
    generatedAt: "2026-09-09",
  },

  "business/Entrepreneurship & Startups": {
    profession: "business",
    category: "Entrepreneurship & Startups",
    overview:
      "Startups operate under extreme uncertainty with limited runway — the core discipline is testing assumptions as cheaply as possible before committing real capital, and knowing exactly how much time you have left to find a business model that actually works.",
    concepts: [
      {
        id: "startup-pmf",
        title: "Recognizing genuine product-market fit",
        explanation:
          "Product-market fit is the point where a product satisfies real, strong market demand — evidenced by organic growth, high retention, and customers who'd be genuinely disappointed to lose the product, not just polite survey responses or vanity signup numbers.",
        whyItMatters:
          "Scaling (spending heavily on growth/sales) before genuine product-market fit is one of the most common ways startups burn through capital without building a durable business — growth spending amplifies whatever retention and engagement already exist, good or bad.",
        example:
          "The 'Sean Ellis test' — asking users how they'd feel if they could no longer use the product, with a benchmark of roughly 40% saying 'very disappointed' — is a widely used rough signal that real product-market fit may exist before committing to aggressive scaling.",
      },
      {
        id: "startup-mvp-testing",
        title: "MVP testing before committing engineering investment",
        explanation:
          "A minimum viable product tests a core hypothesis with the least investment needed to get a real signal — sometimes not even a working product (a landing page measuring signup interest, or a manually-delivered 'concierge' version) before building the real thing.",
        whyItMatters:
          "Building a fully-featured product before validating that anyone actually wants it is one of the most common and expensive startup mistakes — an MVP's entire purpose is learning cheaply, which requires resisting the urge to over-build it.",
        example:
          "Airbnb's founders initially tested demand by manually renting out air mattresses in their own apartment and photographing listings themselves — a deliberately manual, unscalable process that validated real demand before any platform was built.",
      },
      {
        id: "startup-runway-math",
        title: "Runway and burn multiple",
        explanation:
          "Runway is how many months of operation remain at the current burn rate (cash spent per month) before running out of money. Burn multiple (net burn divided by net new revenue added) measures how efficiently that cash is buying growth — a useful check on whether spending is translating into durable progress.",
        whyItMatters:
          "Running out of runway before finding a sustainable business model or the next round of funding is the single most common cause of startup failure — everything else (product decisions, hiring, marketing) needs to be weighed against how much runway it costs.",
        example:
          "A startup burning heavily to acquire revenue that immediately churns away has a poor burn multiple even with headline revenue growth — a sign the spending isn't buying durable business value, just temporary top-line numbers.",
      },
      {
        id: "startup-unit-economics",
        title: "Unit economics: CAC, LTV, contribution margin",
        explanation:
          "Unit economics examines whether a single customer or transaction is fundamentally profitable — customer acquisition cost against lifetime value, and contribution margin per unit sold — independent of whether the overall company is currently profitable at its current scale.",
        whyItMatters:
          "A business with broken unit economics (losing money on every customer, before even counting fixed costs) doesn't get better with scale — it gets worse faster, since more volume just multiplies the per-unit losses. Scale only helps a business with sound unit economics amortize fixed costs.",
        example:
          "Several heavily funded consumer startups scaled rapidly on venture capital despite losing money on every transaction, betting scale would eventually fix unit economics — a bet that failed when funding dried up and the underlying per-unit losses were still there.",
      },
      {
        id: "startup-fundraising-tradeoffs",
        title: "Venture capital vs. bootstrapping",
        explanation:
          "Venture capital provides growth capital in exchange for equity (dilution) and, often, board influence and pressure for rapid growth; bootstrapping (self-funding from revenue) preserves ownership and control but limits the pace of growth to what current cash flow supports.",
        whyItMatters:
          "This choice shapes the entire trajectory of a company, not just its balance sheet — VC funding pushes toward a specific outcome profile (rapid growth, eventual large exit) that may not fit every business, while bootstrapping forecloses opportunities that require large upfront capital to capture a fast-moving market.",
        example:
          "Companies like Mailchimp built substantial, profitable businesses through bootstrapping and organic growth rather than venture funding, retaining full founder ownership — a genuinely different and viable path from the VC-funded, rapid-scale model many assume is the only option.",
      },
      {
        id: "startup-equity-vesting",
        title: "Equity vesting and cliffs",
        explanation:
          "Founder and employee equity typically vests over time (commonly four years, with a one-year 'cliff' before any vesting occurs) rather than being granted immediately — protecting the company if someone leaves early, and aligning equity value with sustained contribution.",
        whyItMatters:
          "Without vesting, a co-founder who leaves after two months could retain a large equity stake earned by everyone else's continued work — vesting (and the cliff specifically) is the standard protection against exactly this outcome, and its absence is a common early-stage legal mistake.",
        example:
          "Co-founder disputes over unvested or improperly structured equity are a recurring cause of early-stage startup dysfunction — the classic cautionary case is a co-founder who departs almost immediately but retains full, unvested equity because no vesting schedule was ever put in place.",
      },
    ],
    connections:
      "Runway and burn multiple set the clock a startup is racing against — MVP testing and honestly recognizing (or not yet having) product-market fit are how that limited time gets spent efficiently rather than wastefully. Unit economics is the check on whether growth, once it starts, is actually building a sustainable business or just burning cash faster. Fundraising strategy determines how much runway and pressure a company takes on in the first place, and equity vesting protects the ownership structure everyone is working (and betting their time) against.",
    source: "claude",
    generatedAt: "2026-09-09",
  },

  "business/Sales & Business Development": {
    profession: "business",
    category: "Sales & Business Development",
    overview:
      "Sales is a discipline of prioritization under uncertainty — which deals to pursue, which to walk away from, how much to concede, and how to forecast honestly enough that the rest of the business can plan around it.",
    concepts: [
      {
        id: "sales-churn-diagnosis",
        title: "Diagnosing the true root cause of churn",
        explanation:
          "Customer churn has different underlying causes — price sensitivity, poor onboarding, a missing feature, a bad support experience, or simply outgrowing the product — that require entirely different fixes. Treating all churn the same (e.g., defaulting to a discount) often addresses the wrong problem.",
        whyItMatters:
          "A discount fixes price-driven churn but does nothing for churn caused by poor onboarding or an unmet feature need — misdiagnosing the cause wastes the intervention and the customer often leaves anyway, just after a delay.",
        example:
          "Exit interviews and churn analysis that segment departing customers by actual stated (and behaviorally inferred) reason reveal very different intervention priorities than assuming all churn is price-related and responding with blanket discounting.",
      },
      {
        id: "sales-value-based-selling",
        title: "Value-based selling vs. defaulting to price concessions",
        explanation:
          "Rather than defaulting to a discount when a deal stalls, value-based selling reframes the conversation around the value delivered — bundling, multi-year terms, or clarifying ROI — preserving price integrity while still addressing the buyer's underlying hesitation.",
        whyItMatters:
          "Habitual discounting trains customers (and the sales team) to expect it, eroding margin and pricing credibility over time — a sales team's default response to hesitation shapes long-term pricing power, not just the individual deal.",
        example:
          "Enterprise sales teams that lead with quantified ROI and case studies close deals at list price more consistently than teams that default to 'what discount do you need to sign today' — the same product, sold with a different conversation.",
      },
      {
        id: "sales-pipeline-forecasting",
        title: "Disciplined, evidence-based forecasting",
        explanation:
          "Sales forecasts are typically tiered by confidence (commit, best-case, pipeline) based on objective signals — stage in the sales process, specific buying commitments made, not just a rep's optimism — since forecast accuracy directly affects how the rest of the business plans production, hiring, and cash.",
        whyItMatters:
          "Inflated or overly optimistic forecasts cascade into bad decisions elsewhere in the business (overhiring, overproducing) — a forecast's real value is its honesty, not its size, which is why disciplined forecasting processes exist to counteract natural sales-side optimism.",
        example:
          "Companies that missed public earnings guidance due to overly optimistic sales forecasts have repeatedly had to implement more rigorous, criteria-based forecasting processes afterward — the cost of forecast inaccuracy becomes visible fastest when it's publicly disclosed.",
      },
      {
        id: "sales-pipeline-qualification",
        title: "Deal qualification discipline (MEDDIC/BANT)",
        explanation:
          "Structured qualification frameworks (like MEDDIC: Metrics, Economic buyer, Decision criteria, Decision process, Identify pain, Champion, or the simpler BANT: Budget, Authority, Need, Timeline) force a rep to verify a deal is real and winnable before investing further time, rather than chasing every lead equally.",
        whyItMatters:
          "Unqualified pipeline — deals that look active but lack real budget, authority, or urgency — wastes sales capacity and produces the false confidence that leads to inflated forecasts; qualification discipline is what keeps pipeline numbers honest.",
        example:
          "A deal with an enthusiastic user champion but no identified economic buyer or budget process is a common trap — genuine enthusiasm that will never convert to a signed contract without someone who can actually approve spending.",
      },
      {
        id: "sales-comp-design",
        title: "Sales compensation design",
        explanation:
          "Sales compensation plans (base salary, commission structure, accelerators, quotas) directly shape rep behavior — a plan overweighted toward new-customer acquisition, for instance, will get exactly that, often at the expense of retention or expansion revenue that isn't equally incentivized.",
        whyItMatters:
          "Reps optimize hard for whatever's actually measured and paid, sometimes in ways that hurt the business overall (aggressive discounting to hit quota near quarter-end, or churn-prone customers signed just to close a deal) — comp design is a lever with real behavioral consequences, not just a cost line.",
        example:
          "Sales teams compensated purely on new logo acquisition, with no retention or expansion component, have been observed signing customers who churn quickly — the rep's incentive was fully satisfied by the initial signature, regardless of what happened afterward.",
      },
      {
        id: "sales-win-loss-analysis",
        title: "Win-loss analysis",
        explanation:
          "Systematically reviewing why deals were won or lost — competitor comparisons, pricing feedback, feature gaps, sales process friction — turns individual deal outcomes into an organizational learning loop rather than isolated anecdotes.",
        whyItMatters:
          "Without structured win-loss analysis, patterns in why deals are lost (a recurring competitor advantage, a consistent pricing objection, a specific stage where deals stall) stay invisible, even though the raw data to see them already exists in each individual deal.",
        example:
          "Structured win-loss interviews — conducted by someone other than the losing rep, to get more candid feedback — frequently surface a specific, addressable pattern (like a competitor's feature or a pricing perception) that no single deal's post-mortem alone would have revealed.",
      },
    ],
    connections:
      "Qualification discipline is what makes forecasting honest in the first place — pipeline built on unqualified deals produces unreliable forecasts regardless of methodology. Churn diagnosis and value-based selling both push toward addressing the real underlying cause of a problem instead of a generic fix (a discount), compensation design shapes what behavior the whole sales organization actually optimizes for day to day, and win-loss analysis is the feedback loop that improves all of the above over time by turning individual deal outcomes into organizational learning.",
    source: "claude",
    generatedAt: "2026-09-09",
  },

  "business/Supply Chain & Logistics": {
    profession: "business",
    category: "Supply Chain & Logistics",
    overview:
      "Supply chain management is about moving materials and products efficiently across a network that's inherently uncertain — demand fluctuates, suppliers fail, and costs hidden in the details (not the headline price) often determine whether a sourcing decision was actually a good one.",
    concepts: [
      {
        id: "sc-total-landed-cost",
        title: "Total landed cost",
        explanation:
          "Total landed cost adds everything beyond the unit price — freight, tariffs, insurance, carrying cost of longer lead times, and the risk-adjusted cost of potential disruption — to give a true comparison between sourcing options, rather than comparing headline unit prices alone.",
        whyItMatters:
          "A supplier with a lower unit price can easily be more expensive overall once longer lead times (requiring more safety stock), higher freight costs, or tariff exposure are properly accounted for — unit-price-only comparisons are a common and costly sourcing mistake.",
        example:
          "Offshore sourcing decisions made purely on unit cost have sometimes proven more expensive overall once landed cost properly accounted for tariffs, longer transit-time inventory carrying costs, and quality/rework issues — prompting some companies to reshore or nearshore production after a full landed-cost recalculation.",
      },
      {
        id: "sc-bullwhip-effect",
        title: "The bullwhip effect",
        explanation:
          "Small fluctuations in actual consumer demand get amplified as they propagate upstream through a supply chain — each link (retailer, distributor, manufacturer, raw material supplier) adds a buffer to protect against uncertainty, and those buffers compound, causing large swings in orders far upstream from relatively small real demand changes.",
        whyItMatters:
          "This explains a lot of supply chain volatility that looks irrational in isolation — upstream suppliers can see wild order swings even when actual end-consumer demand barely moved, purely because of how uncertainty and buffering compound through each link in the chain.",
        example:
          "Modest, temporary spikes in consumer demand for a product have repeatedly triggered dramatically larger order swings at the raw-material level a few links upstream — a textbook bullwhip pattern documented across many industries, from consumer goods to semiconductors.",
      },
      {
        id: "sc-safety-stock-policy",
        title: "Safety stock policy",
        explanation:
          "Safety stock — buffer inventory held above expected demand — is set based on demand variability and the desired service level (probability of not stocking out), not an arbitrary round number. Higher variability or a higher target service level both require more safety stock.",
        whyItMatters:
          "Setting safety stock without reference to actual demand variability either wastes capital on excess inventory or leaves the business exposed to stockouts — the right level is a genuine calculation, not a rule of thumb, and it should differ meaningfully across SKUs with different variability.",
        example:
          "A retailer applying the same flat safety stock policy across both highly predictable staple products and highly variable seasonal/trend items is likely overstocking the stable items and understocking the volatile ones — a uniform policy applied to a non-uniform problem.",
      },
      {
        id: "sc-sop-process",
        title: "Sales and operations planning (S&OP)",
        explanation:
          "S&OP is the recurring cross-functional process (typically monthly) that reconciles demand forecasts, supply capacity, and financial targets across sales, operations, and finance — so the whole company is planning against one shared, agreed-upon plan rather than each function operating on its own separate assumptions.",
        whyItMatters:
          "Without S&OP, sales forecasts optimistic demand while operations plans conservative capacity (or vice versa), and the disconnect surfaces as stockouts or excess inventory — S&OP is specifically the mechanism for catching and resolving that misalignment before it becomes a physical problem.",
        example:
          "Companies that implement disciplined monthly S&OP processes commonly report meaningful reductions in both stockouts and excess inventory simultaneously — direct evidence that the previous state wasn't a capacity or demand problem per se, but a coordination problem between functions.",
      },
      {
        id: "sc-concentration-risk",
        title: "Supply chain concentration risk",
        explanation:
          "Over-reliance on a single port, carrier, supplier, or customer creates a structural vulnerability — a single point of failure that can halt operations regardless of how well-run the rest of the supply chain is, independent of any individual supplier's quality or reliability.",
        whyItMatters:
          "Concentration risk is often invisible until the single point of failure actually fails — companies that never experienced a disruption at their sole supplier had no reason to notice the risk, right up until they did.",
        example:
          "Widespread manufacturing disruptions following a major regional disaster or geopolitical event have repeatedly exposed companies whose supply chains were unknowingly concentrated in a single region or through a single critical supplier, despite appearing diversified on paper across brand names.",
      },
      {
        id: "sc-reshoring-nearshoring",
        title: "Reshoring, nearshoring, and hybrid sourcing",
        explanation:
          "Companies are increasingly weighing offshore sourcing (lowest unit cost, longer lead times, higher risk) against nearshoring (closer, faster, often more expensive) or reshoring (domestic production) — frequently landing on a hybrid dual-network approach rather than an all-or-nothing choice.",
        whyItMatters:
          "This is a direct response to the total-landed-cost and concentration-risk lessons above — pure lowest-unit-cost offshoring looks less attractive once realistic risk, lead time, and total cost are properly weighed, which is why hybrid strategies have become more common rather than wholesale reshoring or staying fully offshore.",
        example:
          "Several manufacturers have adopted a dual-sourcing strategy — maintaining a lower-cost offshore supplier for baseline volume while adding a nearshore or domestic supplier for surge capacity and risk mitigation — rather than choosing one model exclusively.",
      },
    ],
    connections:
      "Total landed cost and concentration risk are both about seeing the true cost and risk of a sourcing decision beyond the headline price — which is what motivates the reshoring/nearshoring/hybrid tradeoff. The bullwhip effect explains why demand signals get distorted as they move upstream, safety stock policy and S&OP are the two main tools for managing that distortion and uncertainty (buffer inventory, and cross-functional coordination) so the whole network stays aligned rather than each function planning against its own separate assumptions.",
    source: "claude",
    generatedAt: "2026-09-09",
  },

  "business/IT & Technology Management": {
    profession: "business",
    category: "IT & Technology Management",
    overview:
      "Technology management is about making build-vs-buy and investment decisions under genuine uncertainty about future needs, while managing the accumulating cost of past shortcuts (technical debt) and increasingly severe downside risk (cyber, compliance) that a purely feature-focused view of IT easily misses.",
    concepts: [
      {
        id: "it-build-vs-buy",
        title: "Build vs. buy: the core-vs-context framework",
        explanation:
          "A useful lens for technology investment decisions: build (invest real engineering effort) in what's genuinely core to competitive advantage; buy (use a vendor solution) for context — necessary but not differentiating — capabilities, where a mature vendor product is usually faster and cheaper than custom development.",
        whyItMatters:
          "Building custom software for non-differentiating needs wastes scarce engineering capacity that could go toward genuinely core capabilities — the core-vs-context distinction is what prevents 'we can build it ourselves' from being applied indiscriminately to everything.",
        example:
          "Most companies buy standard HR or accounting software rather than building it — those functions are necessary but not a source of competitive differentiation for a typical company, so engineering effort is better spent on whatever actually differentiates the business.",
      },
      {
        id: "it-tco-analysis",
        title: "Total cost of ownership across build/buy/vendor options",
        explanation:
          "A proper technology TCO comparison spans multiple years and includes not just license or build cost, but implementation, integration, ongoing maintenance, support, and the eventual cost of migrating away — not just the initial price tag.",
        whyItMatters:
          "A cheap upfront license or build estimate can hide much larger downstream costs (support burden, integration complexity, migration difficulty) — multi-year TCO comparison is what prevents a technology decision from looking good only in year one.",
        example:
          "Custom-built internal systems often look cost-competitive against a vendor solution at build time, but the ongoing maintenance burden (with no vendor support, borne entirely by internal engineering) frequently makes the true multi-year TCO higher than initially estimated.",
      },
      {
        id: "it-technical-debt",
        title: "Quantifying technical debt's business cost",
        explanation:
          "Technical debt — shortcuts taken to ship faster that accumulate ongoing cost (slower development velocity, more bugs, harder onboarding) — is easiest to ignore because its cost is diffuse and gradual rather than a single visible expense, unlike a line item in a budget.",
        whyItMatters:
          "Quantifying technical debt's actual business cost (in velocity lost, incidents caused, or churn from a buggy product) is what makes the case for investing time in paying it down, since 'the code is messy' alone rarely wins against pressure to ship new features.",
        example:
          "Engineering teams that track cycle time or incident frequency over time can often show a clear, quantifiable slowdown correlated with accumulating technical debt in a specific system — turning an abstract complaint into a data-backed business case for dedicated remediation time.",
      },
      {
        id: "it-cyber-risk-quantification",
        title: "Quantifying cyber risk in financial terms",
        explanation:
          "Frameworks like FAIR (Factor Analysis of Information Risk) translate cybersecurity risk into estimated financial terms — expected loss given a breach's likelihood and impact — so security investment can be justified and prioritized against other capital priorities using the same language as the rest of the business.",
        whyItMatters:
          "Security requests framed purely in technical terms ('we need better endpoint protection') compete poorly for budget against initiatives with clear ROI — framing cyber risk in expected-financial-loss terms lets it compete on equal footing in capital allocation decisions.",
        example:
          "Companies that model a specific breach scenario's expected cost (probability × estimated impact including regulatory fines, remediation, and reputational damage) can make a much more compelling budget case for a specific security investment than a generic appeal to 'best practices.'",
      },
      {
        id: "it-ai-use-case-prioritization",
        title: "Prioritizing AI/technology initiatives on value vs. feasibility",
        explanation:
          "With many possible technology (especially AI) initiatives competing for limited resources, prioritization should weigh realistic business value against actual technical feasibility and data readiness — not just which use case generates the most executive excitement or media attention.",
        whyItMatters:
          "Chasing high-visibility but low-feasibility AI projects (often driven by hype rather than a clear-eyed feasibility assessment) is a common way technology budgets get wasted on pilots that never reach production — a disciplined value-versus-feasibility screen catches this before resources are committed.",
        example:
          "Many companies' early generative AI pilot projects stalled at the proof-of-concept stage specifically because the necessary underlying data infrastructure and governance weren't actually in place — a feasibility gap that wasn't assessed before the initiative was prioritized based on excitement alone.",
      },
      {
        id: "it-vendor-lockin",
        title: "Vendor lock-in and switching-cost leverage",
        explanation:
          "Deep integration with a vendor's platform creates switching costs that grow over time — useful to recognize both as a risk when choosing a vendor initially, and as a negotiating dynamic (for both sides) when a contract comes up for renewal.",
        whyItMatters:
          "A vendor that knows switching would be costly and disruptive for you has real leverage at renewal time — recognizing lock-in depth before it becomes severe (and negotiating exit terms or data portability upfront) preserves negotiating leverage for later.",
        example:
          "Companies deeply integrated with a single cloud provider's proprietary services (beyond basic compute/storage) often find migration prohibitively expensive years later — a lock-in dynamic that shows up clearly at the next contract renewal, when the vendor's pricing leverage becomes apparent.",
      },
    ],
    connections:
      "The core-vs-context framework decides what should be built at all — TCO analysis is how you properly compare the build-vs-buy options for everything else. Technical debt is the accumulating cost of past build decisions, cyber risk quantification and vendor lock-in are both about surfacing risks that are easy to underweight because they're not immediately visible line items, and AI/initiative prioritization applies the same value-versus-feasibility discipline to deciding what gets built or bought next.",
    source: "claude",
    generatedAt: "2026-09-09",
  },

  "business/Manufacturing & Production": {
    profession: "business",
    category: "Manufacturing & Production",
    overview:
      "Manufacturing leadership is about the discipline of catching problems early — through process control and root-cause thinking — while balancing efficiency gains (automation, lean methods) against the resilience and safety margins that keep a single failure from becoming a catastrophe.",
    concepts: [
      {
        id: "mfg-root-cause-analysis",
        title: "Root cause analysis (5 Whys, fishbone, SPC)",
        explanation:
          "Structured root-cause methods — repeated 'why' questioning, fishbone diagrams categorizing potential causes, and statistical process control (SPC) monitoring for unusual variation — distinguish a systemic cause from a one-off event, which determines whether a fix actually prevents recurrence.",
        whyItMatters:
          "A quality failure blamed on 'operator error' without deeper analysis often recurs, because the real cause (a process or design flaw that makes the error easy to make) was never addressed — root cause discipline is what actually stops repeat failures.",
        example:
          "SPC control charts flag when a process starts drifting outside normal variation before it produces visibly defective output — catching a tooling wear problem statistically, days before it would otherwise show up as a batch of bad parts.",
      },
      {
        id: "mfg-spc-tolerance-drift",
        title: "Statistical process control and tolerance drift",
        explanation:
          "Manufacturing processes naturally drift over time (tool wear, material variation, temperature changes) — SPC uses control charts to distinguish normal random variation from a real, systematic shift that risks producing out-of-tolerance parts, triggering intervention before defects actually occur.",
        whyItMatters:
          "Waiting to catch problems through final inspection alone means defective units have already been produced (and often shipped) — SPC catches drift while the process is still within tolerance, preventing the defect rather than just detecting it after the fact.",
        example:
          "A machining process that starts trending toward the upper tolerance limit over several shifts (visible on a control chart) can be recalibrated proactively, before any individual part actually falls outside spec.",
      },
      {
        id: "mfg-lean-continuous-improvement",
        title: "Lean / continuous improvement (Kaizen)",
        explanation:
          "Lean manufacturing focuses on eliminating waste (excess motion, waiting, overproduction, defects) through continuous, incremental improvement (Kaizen) driven substantially by frontline workers who know the process best — not just top-down engineering redesigns.",
        whyItMatters:
          "Lean programs imposed purely top-down, without genuine frontline participation, tend to produce short-lived improvements — sustained gains generally require the people actually doing the work to be genuinely engaged in identifying and fixing waste, not just told to follow a new procedure.",
        example:
          "Toyota's production system, the origin of much of lean manufacturing practice, is built around frontline workers having explicit authority to stop the line when they spot a problem (andon cord) — a structural, not just cultural, commitment to frontline-driven improvement.",
      },
      {
        id: "mfg-preventive-maintenance",
        title: "Preventive/predictive maintenance",
        explanation:
          "Preventive maintenance services equipment on a schedule before failure; predictive maintenance uses sensor data and analytics to service equipment based on actual condition, catching developing failures earlier and avoiding unnecessary scheduled maintenance on equipment that doesn't yet need it.",
        whyItMatters:
          "Unplanned downtime from equipment failure is typically far more expensive than the maintenance that would have prevented it — production stoppage, rush repairs, and missed delivery commitments usually dwarf the cost of proactive maintenance.",
        example:
          "Vibration and temperature sensors on critical rotating equipment can detect a developing bearing failure weeks before it would cause an unplanned breakdown, allowing a planned repair during scheduled downtime instead of an emergency stoppage.",
      },
      {
        id: "mfg-capacity-planning-uncertainty",
        title: "Capacity planning under demand uncertainty",
        explanation:
          "Committing to fixed production capacity based on a single demand forecast is risky given real uncertainty — phased capacity investment, flexible/modular equipment, or contract manufacturing for overflow demand all reduce the cost of guessing wrong compared to a single large, irreversible commitment.",
        whyItMatters:
          "Overbuilding wastes capital that can't easily be recovered; underbuilding means losing sales (and possibly customers permanently) to competitors who can meet demand — the cost of being wrong in either direction can be severe, which is why flexibility has real value.",
        example:
          "A manufacturer entering a new product category might use contract manufacturers for initial production runs, deferring the capital commitment of building dedicated capacity until demand is confirmed at scale.",
      },
      {
        id: "mfg-jit-vs-buffer-resilience",
        title: "Just-in-time vs. buffer inventory resilience",
        explanation:
          "Just-in-time production minimizes inventory carrying costs by timing material delivery closely to need, but leaves little margin for supply disruption. Holding buffer inventory for critical, hard-to-substitute inputs costs more but provides resilience — the right balance should be targeted by how critical and disruption-prone each specific input is, not applied uniformly.",
        whyItMatters:
          "Blanket JIT policies applied to every input, regardless of criticality, leave a manufacturer exposed on exactly the inputs where a shortage would be most damaging — the sophisticated approach differentiates buffer policy by input criticality rather than treating all inventory the same way.",
        example:
          "Manufacturers that faced production stoppages from single-source semiconductor shortages have since built deliberately larger buffers specifically for critical, hard-to-substitute chips, while keeping leaner JIT policies for easily sourced, lower-risk components.",
      },
    ],
    connections:
      "Root cause analysis and statistical process control are the diagnostic backbone for catching and understanding problems — lean/Kaizen applies that same discipline continuously to eliminate waste, and preventive/predictive maintenance applies it specifically to equipment reliability. Capacity planning and JIT-vs-buffer decisions are both about managing uncertainty and risk in how much flexibility and resilience to build in, which is the recurring tension underneath most manufacturing strategy decisions.",
    source: "claude",
    generatedAt: "2026-09-09",
  },

  "business/Product Management & Innovation": {
    profession: "business",
    category: "Product Management & Innovation",
    overview:
      "Product management is the discipline of deciding what to build, for whom, and why — using real evidence (usage data, discovery interviews, experiments) rather than the loudest voice in the room, and holding that discipline even under pressure from stakeholders who want their priority built next.",
    concepts: [
      {
        id: "product-jtbd-discovery",
        title: "Jobs-to-be-done and customer discovery",
        explanation:
          "The jobs-to-be-done framework reframes product decisions around the underlying task or problem a customer is trying to accomplish, rather than the specific feature they asked for — customer discovery (interviews, observation) is how you actually validate that a real, painful problem exists before committing engineering investment to solve it.",
        whyItMatters:
          "Building a well-executed feature that solves a problem customers don't actually have is a common, expensive failure mode — discovery validates the problem is real and painful enough that customers will change behavior (or pay) for a solution, before investing in building one.",
        example:
          "The famous example is that customers don't actually want a quarter-inch drill — they want a quarter-inch hole. Understanding the underlying job (making a hole) rather than the literal requested product (a drill) opens up a much wider space of possible solutions.",
      },
      {
        id: "product-prioritization-frameworks",
        title: "Prioritization frameworks (RICE and similar)",
        explanation:
          "Structured prioritization frameworks (like RICE: Reach, Impact, Confidence, Effort) score competing roadmap items on consistent criteria, providing a defensible, repeatable basis for sequencing work instead of prioritizing by whoever asked most recently, most loudly, or most senior.",
        whyItMatters:
          "Without a structured framework, roadmaps tend to be captured by whichever stakeholder has the most organizational power or persistence, not necessarily the highest-value work — a consistent scoring method makes tradeoffs visible and defensible.",
        example:
          "A sales-requested custom feature for one large account might score well on Impact but poorly on Reach (benefits only one customer) — a RICE-style framework makes that tradeoff explicit rather than the decision being made purely on sales pressure.",
      },
      {
        id: "product-mvp-expectation-setting",
        title: "MVP expectation-setting and feedback triage",
        explanation:
          "A minimum viable product is deliberately stripped down to test a core hypothesis with real users — which means managing expectations carefully (this isn't the finished vision) and triaging the resulting feedback to separate genuine signal about the core hypothesis from noise about missing polish that was never the point of the MVP.",
        whyItMatters:
          "Early users often judge an MVP as if it were a finished product, generating a flood of feedback about missing features that can drown out the specific signal the MVP was actually designed to test — knowing what question you're trying to answer keeps the feedback useful.",
        example:
          "An early MVP that manually fulfills a service behind the scenes (a 'concierge MVP') can validate real customer demand and willingness to pay long before any of the eventual automated product actually exists — the point is testing demand, not showcasing final execution.",
      },
      {
        id: "product-statistical-rigor",
        title: "Statistical rigor in experimentation",
        explanation:
          "A/B tests and other experiments require adequate sample size and statistical significance before drawing conclusions — a result that looks directionally positive but isn't statistically significant is not yet evidence, regardless of how much stakeholders want it to be.",
        whyItMatters:
          "Under pressure to ship a change stakeholders are excited about, there's a real temptation to call a marginal, non-significant result a 'win' (sometimes called HiPPO bias — highest-paid-person's-opinion overriding data) — holding the statistical line protects against shipping changes that don't actually work.",
        example:
          "A change that shows a 2% lift in a test with wide confidence intervals and a small sample size may well be pure noise — shipping it based on that alone risks rolling out changes with no real effect, or worse, a real negative effect masked by random variation.",
      },
      {
        id: "product-sustainable-moat",
        title: "Durable competitive advantage vs. easily cloned features",
        explanation:
          "Some product advantages are durable — proprietary data that improves with scale, workflow lock-in, genuine network effects — while others (most surface-level features) can be copied by a competitor within a product cycle. Good product strategy invests disproportionately in the former.",
        whyItMatters:
          "A roadmap full of easily-copied features can win a temporary edge but rarely a lasting one — competitors will match visible features quickly, so sustainable advantage usually has to come from something structurally harder to replicate.",
        example:
          "A product that accumulates unique usage data over time (making its recommendations or matching progressively better) creates a moat that widens with scale — a competitor launching an identical feature today starts with none of that accumulated advantage.",
      },
      {
        id: "product-pricing-monetization",
        title: "Pricing and packaging aligned to value",
        explanation:
          "Pricing and packaging decisions should align the monetization model with how customers actually derive and perceive value — a mismatch (like charging per-seat when value scales with usage, not headcount) can leave money on the table or actively frustrate customers.",
        whyItMatters:
          "A pricing model misaligned with actual value delivery creates friction that shows up as churn, negotiation fights, or under-monetization — getting this structurally right matters more than optimizing the specific price point within a poorly chosen model.",
        example:
          "Many software products shifted from flat per-seat pricing toward usage-based or outcome-based pricing specifically because seat count stopped correlating well with the value customers were actually getting, especially as more work became automated rather than performed by individual named users.",
      },
    ],
    connections:
      "Jobs-to-be-done and customer discovery validate that a real problem exists before building anything; prioritization frameworks decide what to build first among many validated (or plausible) opportunities. MVP expectation-setting and statistical rigor are both about interpreting evidence honestly once something ships — resisting the pull to over-read early signal — and sustainable moat and pricing/monetization determine whether what gets built and shipped actually translates into durable, well-captured business value.",
    source: "claude",
    generatedAt: "2026-09-09",
  },

  "business/Customer Experience": {
    profession: "business",
    category: "Customer Experience",
    overview:
      "Customer experience is about systematically finding where a customer's journey breaks down — not just measuring overall satisfaction, but diagnosing specific friction points — and making the investment case for fixing them using metrics that connect experience quality to real business outcomes like retention and lifetime value.",
    concepts: [
      {
        id: "cx-journey-mapping",
        title: "Customer journey mapping",
        explanation:
          "Journey mapping documents every touchpoint a customer has with a company across channels and over time, surfacing systemic, cross-channel breakdowns that wouldn't be visible looking at any single department's metrics in isolation.",
        whyItMatters:
          "Individual departments often each look fine on their own metrics while the overall customer experience is broken at the handoffs between them — journey mapping is specifically designed to catch these cross-functional gaps.",
        example:
          "A customer might have a great in-app experience and a great support-call experience individually, but a terrible overall journey if the handoff between the two (e.g., support agents lacking visibility into in-app activity) forces the customer to repeat context — a gap invisible to either team's own metrics.",
      },
      {
        id: "cx-nps-driver-analysis",
        title: "NPS/CSAT driver analysis, not just the score",
        explanation:
          "Net Promoter Score and customer satisfaction scores are useful trend indicators, but the score alone doesn't explain why it moved — proper analysis segments the data by cohort and digs into the underlying drivers rather than assuming any single initiative (like a recent feature launch) explains an aggregate shift.",
        whyItMatters:
          "Attributing an NPS change to the most recent visible initiative, without segmenting the actual drivers, risks both wrongly crediting something that didn't help and missing the real cause — which could be an unrelated support process change or a competitor's move.",
        example:
          "An overall NPS increase might mask a declining score among a company's highest-value enterprise segment, offset by gains among smaller, lower-value customers — a pattern invisible without segmented analysis, but critical to the business.",
      },
      {
        id: "cx-service-recovery-paradox",
        title: "The service recovery paradox",
        explanation:
          "Research on service recovery suggests that a customer whose problem is resolved exceptionally well after a failure can end up more loyal than one who never experienced a failure at all — genuine, effective remediation converts a visible failure into a demonstration of the company's real values.",
        whyItMatters:
          "This reframes a service failure as a genuine opportunity, not just damage control — but only if the recovery is fast, genuine, and goes beyond the bare minimum; a slow or grudging fix doesn't produce the same effect and can compound the original damage.",
        example:
          "A customer whose flight was cancelled but who received proactive rebooking, a hotel voucher, and a sincere apology from an empowered agent often rates the airline more favorably afterward than a customer who had an uneventful, unremarkable flight.",
      },
      {
        id: "cx-clv-segmentation",
        title: "CLV segmentation for triaging effort",
        explanation:
          "Customer lifetime value segmentation directs support, retention, and personalization effort toward the accounts that matter most to long-term revenue, rather than treating every customer interaction with identical priority regardless of their actual value to the business.",
        whyItMatters:
          "Uniform service levels across all customers, regardless of value, often means under-serving high-value accounts (who could churn at real cost) while over-investing in low-value ones — CLV segmentation makes that resource allocation deliberate rather than accidental.",
        example:
          "Many companies route their highest-value customers to dedicated, higher-touch support tiers with faster response times, while lower-value customers rely more heavily on self-service — a deliberate allocation of finite support capacity based on customer value.",
      },
      {
        id: "cx-kano-model",
        title: "The Kano model: must-haves vs. delighters",
        explanation:
          "The Kano model classifies features into must-haves (their absence causes dissatisfaction, but their presence isn't noticed as a bonus), performance features (more is linearly better), and delighters (unexpected extras that create disproportionate satisfaction) — helping distinguish what actually deserves investment.",
        whyItMatters:
          "A feedback-driven backlog can drift toward accumulating nice-to-have 'delighter' requests while genuine must-have gaps (invisible until they're missing) go unaddressed — the Kano model helps triage which feedback deserves priority.",
        example:
          "Basic account security (like not losing customer data) is a must-have — its presence is invisible and expected, but its absence is catastrophic; a surprising personalized touch (like a handwritten thank-you note) is a delighter — pleasant but not expected, and not damaging if absent.",
      },
      {
        id: "cx-effort-score",
        title: "Customer Effort Score",
        explanation:
          "Customer Effort Score measures how much effort a customer had to expend to get their issue resolved or task completed — a metric that often predicts loyalty and churn better than satisfaction alone, since low-effort experiences (even unremarkable ones) tend to retain customers better than high-satisfaction-but-high-effort ones.",
        whyItMatters:
          "A company can score well on satisfaction (customers are happy with the eventual outcome) while still bleeding customers due to high effort required to reach that outcome — effort captures a distinct, often more predictive dimension of the experience.",
        example:
          "A support interaction that eventually resolves a customer's issue but requires three transfers and re-explaining the problem each time will likely score well on final resolution satisfaction while scoring poorly on effort — and effort is often the better predictor of whether that customer stays.",
      },
    ],
    connections:
      "Journey mapping is the diagnostic map for where experience breaks down across the whole customer relationship — NPS/CSAT driver analysis and Customer Effort Score are the specific metrics for measuring how well or badly it's working and why. The Kano model helps decide what's actually worth fixing or adding, CLV segmentation determines how much effort to spend fixing it for which customers, and the service recovery paradox is the reminder that a well-handled failure, found through this whole system, can be turned into a genuine loyalty-building moment rather than pure damage control.",
    source: "claude",
    generatedAt: "2026-09-09",
  },

  "business/HR & Talent Management": {
    profession: "business",
    category: "HR & Talent Management",
    overview:
      "Talent management is about winning the competition for people — through compensation, growth opportunity, and fair process — while building the pipeline and structural safeguards that keep the organization from being derailed by a single departure or a single biased decision.",
    concepts: [
      {
        id: "talent-comp-benchmarking",
        title: "Compensation benchmarking",
        explanation:
          "Compensation benchmarking compares pay for a given role against the external market (using salary survey data) to ensure offers and existing pay are competitive — critical both for winning new hires and for retaining existing employees whose pay may fall behind a rising market over time (internal pay compression).",
        whyItMatters:
          "Without regular benchmarking, a company can drift out of market unnoticed — existing employees discover they're underpaid relative to new-hire offers or the external market, which is a common and preventable driver of otherwise-avoidable attrition.",
        example:
          "In tight labor markets for specific skills, new-hire salaries can rise faster than existing employees' pay, creating 'pay compression' where a newly hired employee earns close to (or more than) a tenured peer in the same role — a well-documented driver of resentment and turnover if unaddressed.",
      },
      {
        id: "talent-succession-planning",
        title: "Succession planning and leadership pipelines",
        explanation:
          "Succession planning identifies and develops internal candidates for key leadership roles before a vacancy occurs — often using a '9-box' grid (performance vs. potential) to assess and develop high-potential employees systematically, rather than defaulting to an external search whenever a leadership role opens.",
        whyItMatters:
          "Organizations without a real succession pipeline are forced into reactive, often rushed external searches when a key leader departs unexpectedly — with real costs in lost institutional knowledge, onboarding time, and cultural fit risk compared to a prepared internal candidate.",
        example:
          "Companies known for strong leadership benches (able to promote a credible internal CEO successor with little disruption) generally invested years in advance identifying and developing multiple internal candidates, rather than starting the succession process only once a vacancy was imminent.",
      },
      {
        id: "talent-pay-equity-audit",
        title: "Pay equity audits",
        explanation:
          "A pay equity audit statistically analyzes whether pay differences correlate with protected characteristics (gender, race) after controlling for legitimate factors (role, experience, performance) — and traces any unexplained gaps back to root causes across hiring, promotion, and negotiation processes, not just current pay.",
        whyItMatters:
          "Pay gaps often originate upstream of the current pay decision — in who gets hired at what starting salary, who gets promoted, or who negotiates more aggressively — so remediation that only adjusts current pay without fixing the upstream process tends to see the gap re-emerge over time.",
        example:
          "A company that finds an unexplained gender pay gap concentrated among recent hires (not tenured employees) likely has a starting-salary or negotiation-process issue, distinct from a company where the gap grows with tenure (suggesting a promotion or raise-allocation issue) — same headline finding, different root cause and fix.",
      },
      {
        id: "talent-onboarding-newhire",
        title: "Structured onboarding (e.g., 30-60-90 plans)",
        explanation:
          "A structured onboarding plan — often organized around 30/60/90-day milestones — gives new hires clear early expectations and support, which research consistently links to lower early attrition and faster time-to-productivity compared to an unstructured, sink-or-swim start.",
        whyItMatters:
          "Early attrition (within the first 90 days) is disproportionately expensive relative to the value gained, since the company has invested full recruiting cost with minimal productive output — good onboarding is one of the highest-leverage, lowest-cost retention investments available.",
        example:
          "Companies that pair every new hire with a dedicated onboarding buddy and clear early milestones report meaningfully lower 90-day attrition than teams that rely on ad hoc, manager-dependent onboarding with no structured plan.",
      },
      {
        id: "talent-inclusive-hiring-bias",
        title: "Structured, bias-resistant hiring",
        explanation:
          "Unstructured interviews (different questions for different candidates, purely gut-feel evaluation) are more vulnerable to bias and less predictive of job performance than structured interviews with consistent questions and standardized scorecards applied to every candidate for a role.",
        whyItMatters:
          "Beyond fairness, structured hiring is also better hiring — it's more predictive of actual job performance than unstructured 'culture fit' interviews, which is why the business case and the fairness case for structure point the same direction.",
        example:
          "Companies that replaced free-form 'tell me about yourself' interviews with structured, scorecard-based interviews using the same core questions for every candidate for a role have reported both improved hiring outcomes and reduced adverse-impact risk in hiring data.",
      },
      {
        id: "talent-evp-design",
        title: "Employer value proposition (EVP)",
        explanation:
          "The employer value proposition is everything an employee gets in exchange for their work beyond base pay — growth opportunity, flexibility, mission, culture, benefits — which matters especially when a company can't simply out-pay competitors for talent.",
        whyItMatters:
          "In a competitive talent market where a company can't win on compensation alone, a genuinely differentiated EVP (not just marketing language, but real, delivered attributes) becomes the actual lever for attracting and retaining people who have other options.",
        example:
          "Companies that can't match Big Tech compensation levels often compete successfully on EVP elements like mission-driven work, faster growth/responsibility, or flexibility — genuinely delivered, not just stated in recruiting materials, which candidates can usually tell the difference between.",
      },
    ],
    connections:
      "Compensation benchmarking and pay equity audits both ensure pay is fair and competitive, from different angles (external market position and internal fairness). Structured, bias-resistant hiring and onboarding determine who joins and how well they're set up to succeed, succession planning builds the pipeline for future leadership needs, and EVP design is the overall story that ties compensation, growth, and culture together into why someone should choose — and stay at — this employer over the alternatives.",
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
