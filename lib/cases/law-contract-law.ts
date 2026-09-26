import type { CaseStudy } from "@/lib/caseStudyContent";
import type { Fundamental } from "@/lib/caseStudyFundamentals";

/**
 * Law / Contract Law: the fundamentals checklist and the case bank
 * for this category, kept together so they can be written and reviewed as
 * one unit. Registered in lib/cases/index.ts.
 */
export const LAW_CONTRACT_LAW_FUNDAMENTALS: Fundamental[] = [
  {
    id: "law-contract-formation",
    label: "Applying offer, acceptance, and a seriousness-of-intent requirement (consideration or cause) to determine whether a contract was ever formed",
  },
  {
    id: "law-contract-capacity",
    label: "Assessing a party's capacity to contract to determine whether an agreement is void or voidable",
  },
  {
    id: "law-contract-agency-authority",
    label: "Determining whether someone who contracted through an agent had the actual or apparent authority to bind them",
  },
  {
    id: "law-contract-form-requirements",
    label: "Identifying which contracts require a specific form (writing, notarization, registration) to be valid or enforceable",
  },
  {
    id: "law-contract-vices-of-consent",
    label: "Applying the doctrines of mistake, fraud, and duress to void or avoid a contract for defective consent",
  },
  {
    id: "law-contract-interpretation",
    label: "Resolving an ambiguous contract term through interpretation rules, including construing ambiguity against the drafter",
  },
  {
    id: "law-contract-good-faith",
    label: "Applying the duty of good faith to contract negotiation and performance",
  },
  {
    id: "law-contract-standard-terms",
    label: "Testing whether a standard-form or adhesion term was fairly incorporated and substantively fair",
  },
  {
    id: "law-contract-conditions",
    label: "Distinguishing a condition precedent from an ordinary obligation to determine whether a duty to perform has even arisen",
  },
  {
    id: "law-contract-breach-severity",
    label: "Classifying a breach as fundamental/material versus minor to decide whether the other party may terminate or must keep performing",
  },
  {
    id: "law-contract-anticipatory-breach",
    label: "Applying anticipatory breach and adequate-assurance doctrine when a party signals in advance that it will not perform",
  },
  {
    id: "law-contract-remedies-choice",
    label: "Choosing between damages and specific performance as the appropriate remedy for breach",
  },
  {
    id: "law-contract-mitigation",
    label: "Applying the duty to mitigate loss to limit a damages claim",
  },
  {
    id: "law-contract-foreseeability",
    label: "Limiting recoverable damages to losses that were foreseeable at the time of contracting",
  },
  {
    id: "law-contract-force-majeure-impossibility",
    label: "Applying force majeure, impossibility, or frustration-of-purpose doctrine to excuse non-performance",
  },
  {
    id: "law-contract-hardship",
    label: "Applying hardship doctrine to decide whether a fundamental change in circumstances justifies renegotiation or termination",
  },
  {
    id: "law-contract-nonconformity-cure",
    label: "Applying non-conformity and cure rules to a defective delivery before awarding further remedies",
  },
  {
    id: "law-contract-limitation-period",
    label: "Applying the limitation period that extinguishes a contract claim if not brought in time",
  },
  {
    id: "law-contract-third-party-rights",
    label: "Determining whether a non-signatory (assignee, delegate, or third-party beneficiary) can enforce or is bound by a contract",
  },
  {
    id: "law-contract-restrictive-covenant",
    label: "Assessing the reasonableness of a restrictive covenant against the legitimate interest it is meant to protect",
  },
];

export const LAW_CONTRACT_LAW_CASES: CaseStudy[] = [
  {
    id: "law-contract-force-majeure",
    profession: "law",
    category: "Contract Law",
    title: "The Force Majeure Claim",
    scenario:
      "Your client, a manufacturing supplier, failed to deliver goods on time after a regional power grid failure knocked out its plant for nine days. The buyer is suing for breach and lost profits, arguing the contract's force majeure clause lists only 'acts of God' and does not clearly cover infrastructure failures. Your client insists the outage was unforeseeable, entirely outside its control, and that it resumed shipments as soon as power was restored. The buyer's lawyer has signaled they will argue the clause must be read narrowly against whoever drafted it. You have been asked to present the argument for why the clause should excuse the delay.",
    keyIssues: [
      "Whether the force majeure clause's language is broad enough to reach an infrastructure failure or is genuinely limited to natural disasters",
      "Foreseeability of the event and the supplier's reasonable efforts to mitigate the delay",
      "Causation: whether the power failure directly and solely caused the breach",
      "Interpreting an ambiguous clause against the party who drafted it (contra proferentem) if the wording is genuinely unclear",
    ],
    expectedConcepts: [
      "force majeure",
      "foreseeability",
      "causation",
      "mitigation of damages",
      "contra proferentem",
      "impossibility",
    ],
    modelApproach:
      "A strong answer engages directly with the clause's actual wording rather than general fairness arguments, addresses foreseeability and mitigation as necessary elements of the defense, and, if the clause is genuinely ambiguous, argues for interpreting it against the party that drafted it — grounding the argument in contract-interpretation doctrine rather than sympathy for the supplier.",
    furtherReading: [
      "Force majeure clause drafting and interpretation",
      "Comparative impossibility and hardship: UNIDROIT Principles and national codes",
      "Contra proferentem and the interpretation of ambiguous contract terms",
    ],
    testsFundamentals: ["law-contract-force-majeure-impossibility", "law-contract-interpretation"],
  },
  {
    id: "law-contract-noncompete",
    profession: "law",
    category: "Contract Law",
    title: "Enforcing a Non-Compete",
    scenario:
      "Your client, a mid-sized consulting firm, wants to enforce a non-compete clause against a former senior partner who left to join a direct competitor, taking relationships with several key clients along with them. The clause bars competitive work in the same industry for two years, across the whole country, with no compensation paid during that period. The former partner argues the clause is overbroad and should not be enforced as written, and that it was presented as a standard-form document with no real chance to negotiate its terms. Your client wants to know whether the clause will hold up and, if not, what relief they can realistically still get.",
    keyIssues: [
      "Reasonableness of the clause's scope: geographic reach, duration, and the activity actually restricted",
      "The legitimate business interest the clause is meant to protect versus a bare restraint on competition",
      "Whether the clause was fairly incorporated into the contract given how it was presented to the departing partner",
      "Whether narrower enforcement (limited to specific clients or a shorter duration) is more defensible than the clause as written",
    ],
    expectedConcepts: [
      "restrictive covenant",
      "legitimate business interest",
      "reasonableness standard",
      "severance / blue-penciling",
      "standard terms",
      "burden of proof",
    ],
    modelApproach:
      "A strong answer does not assume the clause is automatically enforceable just because it was signed. It walks through the reasonableness test against the legitimate business interest at stake, flags the risk that a court treats it as an unfairly imposed standard term, and considers whether the client should seek narrower, more defensible relief rather than insisting on the clause exactly as written.",
    furtherReading: [
      "Comparative enforceability of restrictive covenants across jurisdictions",
      "Legitimate business interest doctrine in restrictive covenants",
      "Severance and judicial modification of overbroad clauses",
    ],
    testsFundamentals: ["law-contract-restrictive-covenant", "law-contract-standard-terms"],
  },
  {
    id: "law-contract-minor-influencer-deal",
    profession: "law",
    category: "Contract Law",
    title: "The Underage Influencer's Contract",
    scenario:
      "Your client is a talent agency that signed a two-year exclusive endorsement contract with a popular social media personality who, it later emerged, was sixteen years old at the time of signing and whose guardian never countersigned. The agency has already paid a signing bonus and arranged three brand campaigns around the endorsement. The influencer, now represented by new management, wants out of the deal entirely and claims it was never binding in the first place. Separately, the agency worries the contract's description of what the influencer actually had to deliver each month was too vague to count as a real agreement even if capacity were not an issue. The agency wants your assessment of where it stands.",
    keyIssues: [
      "Whether the influencer's age at signing means the contract is void or merely voidable, and who holds the right to avoid it",
      "Whether the missing guardian countersignature changes that analysis",
      "Whether the contract's description of the influencer's obligations was definite enough for a contract to have formed at all",
      "What the agency can realistically recover (bonus paid, campaign costs) if the contract is unwound",
    ],
    expectedConcepts: [
      "capacity to contract",
      "minority / incapacity",
      "offer and acceptance",
      "definiteness of terms",
      "restitution",
      "voidable versus void",
    ],
    modelApproach:
      "A strong answer keeps capacity and formation analytically separate rather than blending them: it addresses whether a minor's agreement is voidable and by whom, independently of whether the terms were ever definite enough to form a contract in the first place. It also addresses what the agency can recover if the deal unwinds, rather than treating the answer as simply 'the contract is dead.'",
    furtherReading: [
      "Capacity to contract and the protection of minors across legal systems",
      "Definiteness of terms as a requirement of contract formation",
      "Restitution following a void or avoided contract",
    ],
    premium: true,
    testsFundamentals: ["law-contract-capacity", "law-contract-formation"],
  },
  {
    id: "law-contract-agent-overstepped",
    profession: "law",
    category: "Contract Law",
    title: "The Agent Who Overstepped",
    scenario:
      "Your client is a mid-sized food distributor whose regional sales agent signed a three-year exclusive supply contract with a large retail chain, promising volume and pricing terms well beyond what the agent's written mandate actually authorized. The retail chain had no reason to know the agent's authority was limited and relied on the agent's job title and past dealings when it signed. Your client wants to disown the deal as unauthorized. A separate wrinkle: the retail chain's own regional franchisees, who are named in the contract as the actual buyers of the goods, are now asking whether they can enforce the pricing terms directly even though they never signed anything themselves. You need to advise your client on both questions.",
    keyIssues: [
      "Whether the agent had actual authority, and if not, whether apparent authority binds the principal anyway",
      "What the retail chain reasonably understood about the agent's authority based on the agent's role and prior conduct",
      "Whether the contract's language shows an intent to benefit the franchisees directly, making them third-party beneficiaries, or only incidentally",
      "The client's options if it is bound: ratification, damages against the agent, or renegotiation",
    ],
    expectedConcepts: [
      "apparent authority",
      "actual authority",
      "ratification",
      "agency",
      "third-party beneficiary",
      "incidental versus intended beneficiary",
    ],
    modelApproach:
      "A strong answer separates the authority question from the beneficiary question rather than collapsing them. It applies apparent authority to explain why the principal may be bound despite the agent exceeding its actual mandate, and separately asks whether the contract's language and circumstances show the franchisees were meant to be direct beneficiaries or merely incidental ones.",
    furtherReading: [
      "Actual versus apparent authority in agency law",
      "Ratification of an agent's unauthorized acts",
      "Intended versus incidental third-party beneficiaries",
    ],
    premium: true,
    testsFundamentals: ["law-contract-agency-authority", "law-contract-third-party-rights"],
  },
  {
    id: "law-contract-handshake-land-deal",
    profession: "law",
    category: "Contract Law",
    title: "The Handshake Land Deal",
    scenario:
      "Your client agreed, over several meetings and a handshake, to buy a small parcel of land from a private seller for an agreed price, with nothing put in writing beyond a one-page memo of the size and location. Months later, before any deed or formal transfer, the seller backed out after receiving a higher offer from someone else. Your client wants to force the sale through. There is a second problem: your client also says the seller, during negotiations, represented that the parcel included access to a shared water source, which turns out not to be true and may have influenced your client's decision to agree to the price. You need to advise on both the enforceability of the oral deal and the effect of the water-access statement.",
    keyIssues: [
      "Whether a transfer of land requires a particular form to be valid or enforceable at all, regardless of what was orally agreed",
      "Whether the one-page memo satisfies whatever form requirement applies",
      "Whether the seller's statement about water access amounts to a mistake or misrepresentation that taints the client's consent",
      "What relief is realistically available if the deal is unenforceable for want of form",
    ],
    expectedConcepts: [
      "form requirements",
      "formal validity",
      "mistake",
      "misrepresentation / fraud",
      "vices of consent",
      "specific performance",
    ],
    modelApproach:
      "A strong answer addresses the form question first, since land transfers are commonly subject to formal requirements that an oral agreement alone cannot satisfy, and only then turns to whether the water-access statement would matter if the form problem is overcome. It avoids assuming a handshake deal is automatically binding just because both sides clearly intended it.",
    furtherReading: [
      "Form requirements for transfers of immovable property across legal systems",
      "Mistake and misrepresentation as vices of consent",
      "Specific performance in real property disputes",
    ],
    premium: true,
    testsFundamentals: ["law-contract-form-requirements", "law-contract-vices-of-consent"],
  },
  {
    id: "law-contract-supplier-gone-quiet",
    profession: "law",
    category: "Contract Law",
    title: "The Supplier Who Went Quiet",
    scenario:
      "Your client manufactures medical devices and depends on a single supplier for a critical component. Industry rumors suggest the supplier is in financial distress, its last two shipments arrived late and short of the ordered quantity, and its usual sales contact has stopped responding to calls. Your client's production line will stall within three weeks without a reliable source, and qualifying an alternative supplier would take at least two months if started now. Your client wants to know whether it can treat the relationship as over and switch suppliers immediately, or whether doing so risks being the party found in breach.",
    keyIssues: [
      "Whether the supplier's conduct amounts to a clear repudiation or only grounds for reasonable insecurity",
      "Whether your client should demand written assurance of performance before treating the contract as over",
      "The risk of wrongly declaring the contract at an end and becoming the breaching party itself",
      "Your client's duty to begin mitigating its own exposure by lining up an alternative source regardless of how the contract issue resolves",
    ],
    expectedConcepts: [
      "anticipatory breach",
      "adequate assurance",
      "repudiation",
      "duty to mitigate",
      "reasonable grounds for insecurity",
    ],
    modelApproach:
      "A strong answer does not treat rumor and late shipments as automatically equivalent to a clear repudiation. It recommends the safer route of demanding adequate assurance before walking away, while separately advising the client to begin mitigating its exposure — for instance starting supplier qualification — regardless of how the assurance demand plays out, since the duty to mitigate runs independently of who ultimately breached.",
    furtherReading: [
      "Anticipatory breach and the right to treat a contract as repudiated",
      "Demanding adequate assurance of performance",
      "The duty to mitigate loss following an actual or anticipated breach",
    ],
    premium: true,
    testsFundamentals: ["law-contract-anticipatory-breach", "law-contract-mitigation"],
  },
  {
    id: "law-contract-late-software-delivery",
    profession: "law",
    category: "Contract Law",
    title: "The Late Software Delivery",
    scenario:
      "Your client hired a software vendor to build a custom inventory management system for a fixed price, with a firm go-live date tied to the start of the client's peak sales season. The vendor delivered the system six weeks late and missing one minor reporting feature that was in the specification but is not essential to core operations. Because the system was not ready in time, your client says it lost a specific, unusually large wholesale order that depended on real-time inventory visibility, a fact the client had mentioned to the vendor only once, informally, during an early planning call. Your client wants to terminate the contract entirely, withhold final payment, and recover the lost order's value. You need to advise on whether that is realistic.",
    keyIssues: [
      "Whether the delay and missing feature together amount to a fundamental/material breach or only a minor one",
      "Whether termination and full non-payment are available given how the breach is classified",
      "Whether the lost wholesale order was a foreseeable consequence of late delivery at the time of contracting",
      "What the client can actually recover if the breach is only minor",
    ],
    expectedConcepts: [
      "material breach",
      "minor breach",
      "foreseeability of damages",
      "consequential damages",
      "termination",
    ],
    modelApproach:
      "A strong answer keeps the breach-severity question and the damages question distinct. It weighs whether a six-week delay with one minor missing feature defeats the core purpose of the contract before concluding termination is available, and separately tests whether the lost wholesale order was foreseeable to the vendor given how informally it was mentioned, rather than assuming every loss the client suffered is automatically recoverable.",
    furtherReading: [
      "Material versus minor breach and its effect on the right to terminate",
      "Foreseeability of damages at the time of contracting",
      "Recovery of consequential/lost-profit damages for breach",
    ],
    premium: true,
    testsFundamentals: ["law-contract-breach-severity", "law-contract-foreseeability"],
  },
  {
    id: "law-contract-unique-warehouse",
    profession: "law",
    category: "Contract Law",
    title: "The One-of-a-Kind Warehouse",
    scenario:
      "Your client agreed to buy a disused riverside warehouse with unique rail access that no other property in the area offers, after months of negotiation during which the seller repeatedly assured your client the deal was 'as good as done' while your client spent significant money on site surveys and permit applications. Days before signing, the seller walked away to accept a higher offer from a competing buyer. Your client wants the property specifically, not just their money back, and separately believes the seller's repeated assurances during negotiations, made knowing your client was relying on them and spending real money, were themselves improper. You need to advise on both the remedy your client should pursue and whether the seller's pre-contract conduct matters.",
    keyIssues: [
      "Whether money damages are an adequate substitute given the property's unique features, or whether specific performance is the appropriate remedy",
      "What your client can recover for survey and permit costs if the deal is not revived",
      "Whether the seller's conduct during negotiations breached a duty of good faith even before any contract was signed",
      "How the good-faith issue affects the strength of your client's overall position, even if it does not independently force the sale",
    ],
    expectedConcepts: [
      "specific performance",
      "adequate remedy at law",
      "good faith in negotiation",
      "reliance damages",
      "uniqueness of subject matter",
    ],
    modelApproach:
      "A strong answer explains why a unique property makes specific performance a live option in a way it would not be for ordinary, replaceable goods, and treats the good-faith question in negotiation as a separate, additional argument rather than the main basis for forcing the sale. It is realistic about what remedy actually fits each part of the loss.",
    furtherReading: [
      "Specific performance and the adequacy of money damages",
      "Good faith in pre-contractual negotiations (culpa in contrahendo)",
      "Reliance damages for expenses incurred before a contract is finalized",
    ],
    premium: true,
    testsFundamentals: ["law-contract-remedies-choice", "law-contract-good-faith"],
  },
  {
    id: "law-contract-recalled-equipment-batch",
    profession: "law",
    category: "Contract Law",
    title: "The Defective Equipment Batch",
    scenario:
      "Your client bought a batch of industrial pumps for a water treatment facility, and roughly a third of them failed within months due to a manufacturing defect. Your client kept using the working pumps and only formally notified the seller of the problem fourteen months after delivery, after commissioning an independent inspection. The seller has offered to repair the defective units but denies liability for the resulting downtime, and separately argues that too much time has passed for your client to bring any claim at all. Your client wants to know whether it can reject the seller's repair-only offer and claim full damages instead, and whether the delay in notifying the seller is fatal to the claim.",
    keyIssues: [
      "Whether the seller's offer to repair the defect must be accepted before your client can pursue other remedies",
      "Whether fourteen months is within the time allowed to notify a defect and bring a claim",
      "Whether continued use of the working pumps affects your client's position",
      "What downtime damages are recoverable alongside or instead of repair",
    ],
    expectedConcepts: [
      "non-conformity",
      "right to cure",
      "notice of defect",
      "limitation period / prescription",
      "burden of proof",
    ],
    modelApproach:
      "A strong answer treats the cure question and the limitation-period question as two separate gates the claim has to clear, not one. It assesses whether the seller's right to attempt repair first is genuine and whether it was properly invoked, and independently checks whether the notice and any applicable time limit for bringing the claim have been respected, rather than assuming the underlying defect alone is enough to win.",
    furtherReading: [
      "The seller's right to cure a non-conforming delivery",
      "Notice periods for defects in sale-of-goods contracts",
      "Limitation periods (prescription) for contract claims",
    ],
    premium: true,
    testsFundamentals: ["law-contract-nonconformity-cure", "law-contract-limitation-period"],
  },
  {
    id: "law-contract-hardship-raw-materials",
    profession: "law",
    category: "Contract Law",
    title: "The Raw Material Price Shock",
    scenario:
      "Your client supplies a fixed quantity of a processed metal to a manufacturer under a five-year contract at a price agreed before a sudden geopolitical disruption more than tripled the cost of the raw ore your client needs to produce it. Continuing to perform at the original price would mean selling at a steep loss for the remaining three years of the contract. The buyer, aware of the situation, is nonetheless insisting on the original price and refusing even to discuss adjusting it, pointing out that commodity prices always fluctuate and that your client accepted that risk when it signed a long-term fixed-price deal. Your client wants to know whether it has any path to renegotiate or exit the contract, and whether the buyer's flat refusal to even discuss the issue is itself a problem.",
    keyIssues: [
      "Whether the price shock is severe and unforeseeable enough to qualify as hardship rather than ordinary commercial risk",
      "Whether the contract's own terms already allocated this kind of risk to the supplier",
      "Whether hardship gives a right to renegotiate, a right to have a price adjusted, or only a right to terminate",
      "Whether the buyer's outright refusal to discuss adjustment itself falls short of a duty to negotiate in good faith",
    ],
    expectedConcepts: [
      "hardship",
      "changed circumstances",
      "risk allocation",
      "good faith in performance",
      "renegotiation duty",
      "termination",
    ],
    modelApproach:
      "A strong answer does not treat every bad commodity swing as hardship — it tests severity and foreseeability against the specific facts and checks whether the contract already allocated this risk before concluding hardship doctrine even applies. It then distinguishes what hardship actually entitles the client to (renegotiation, price adjustment, or termination, depending on the governing framework) from a bare complaint that the deal became unprofitable, and treats the buyer's refusal to negotiate as a distinct good-faith issue.",
    furtherReading: [
      "Hardship doctrine and changed circumstances: UNIDROIT Principles and comparative national approaches",
      "Risk allocation clauses in long-term supply contracts",
      "Good faith as a duty to negotiate contract adjustments",
    ],
    premium: true,
    testsFundamentals: ["law-contract-hardship", "law-contract-good-faith"],
  },
  {
    id: "law-contract-condition-precedent-certificate",
    profession: "law",
    category: "Contract Law",
    title: "The Withheld Certificate",
    scenario:
      "Your client is a contractor who built an office fit-out under a contract that conditions the owner's final payment on an independent architect issuing a certificate confirming the work meets specification. The architect, who has an ongoing relationship with the owner on other projects, is refusing to issue the certificate over a disagreement about one minor finish detail that your client says is a trivial, easily fixed cosmetic issue. The owner is refusing to pay anything until the certificate is issued, even though the space has been fully usable and occupied for two months. Your client wants to know whether it can force payment now, and separately whether the disputed finish detail would even count as serious enough to justify withholding the whole payment if the certificate issue were resolved.",
    keyIssues: [
      "Whether the certificate requirement is a genuine condition precedent to the payment obligation, meaning payment simply is not yet due",
      "Whether an architect closely tied to the owner can withhold a certificate unreasonably, and what recourse the contractor has if so",
      "Separately, whether the disputed finish detail would count as a material or only a minor shortfall in the underlying work",
      "What the contractor can realistically do now: seek an independent determination, argue the condition should be treated as satisfied, or press for partial payment",
    ],
    expectedConcepts: [
      "condition precedent",
      "constructive condition",
      "good faith exercise of a certifying role",
      "material versus minor breach",
      "waiver of a condition",
    ],
    modelApproach:
      "A strong answer keeps the condition analysis distinct from the breach analysis: it first asks whether the certificate is truly a condition precedent that suspends the payment duty altogether, then separately evaluates whether the underlying finish issue is serious enough to matter, rather than assuming a withheld certificate and an actual breach are the same problem. It also considers whether the owner's continued occupancy for two months suggests the condition has effectively been waived.",
    furtherReading: [
      "Conditions precedent versus ordinary contractual promises",
      "Certification requirements and their exercise in good faith",
      "Waiver of a contractual condition through conduct",
    ],
    premium: true,
    testsFundamentals: ["law-contract-conditions", "law-contract-breach-severity"],
  },
  {
    id: "law-contract-subscription-auto-renewal",
    profession: "law",
    category: "Contract Law",
    title: "The Auto-Renewal Complaint",
    scenario:
      "Your client operates a business software subscription platform whose standard terms, presented at signup as a lengthy scroll-through agreement nobody was required to actually read, include an automatic renewal clause that locks customers into another full year at a higher price unless they cancel through a specific, hard-to-find process within a narrow window. A customer association has begun publicly criticizing the practice, and one large former customer is refusing to pay for the renewed year, arguing the clause was never genuinely brought to its attention and is unfair regardless. Your client wants to know whether the clause is enforceable as written and whether it should change its process going forward.",
    keyIssues: [
      "Whether the auto-renewal clause was validly incorporated into the contract given how it was presented at signup",
      "Whether the clause's terms (automatic renewal, narrow cancellation window, price increase) are unfair enough to be unenforceable even if incorporated",
      "Whether your client has an independent good-faith obligation to make the renewal and cancellation process clear regardless of what the fine print technically permits",
      "Practical changes that would reduce your client's exposure going forward",
    ],
    expectedConcepts: [
      "standard terms",
      "adhesion contract",
      "unfair contract terms",
      "good faith",
      "conspicuousness / notice of terms",
    ],
    modelApproach:
      "A strong answer does not simply ask whether the clause was technically included in the terms — it separately tests whether it was fairly and clearly brought to the customer's attention, and whether its substance is unfair enough that it would be struck down even if properly incorporated. It ties the recommendation to concrete changes to the signup and renewal flow, not just a legal opinion on enforceability.",
    furtherReading: [
      "Unfair terms in standard-form and consumer contracts",
      "Incorporation and notice requirements for standard contract terms",
      "Good faith obligations in ongoing subscription relationships",
    ],
    premium: true,
    testsFundamentals: ["law-contract-standard-terms", "law-contract-good-faith"],
  },
  {
    id: "law-contract-cross-border-distribution",
    profession: "law",
    category: "Contract Law",
    title: "The Exclusive Distribution Email Chain",
    scenario:
      "Your client, a consumer goods manufacturer, believes it reached an exclusive distribution agreement with a distributor in another country entirely through a back-and-forth email exchange, without ever signing a single consolidated document. The distributor has begun selling a competitor's similar product alongside your client's, and when confronted, argues the emails were only preliminary discussions and that the word 'exclusive' used in one message was ambiguous, possibly referring only to a specific product line rather than the whole relationship. Your client wants to know whether a binding exclusive agreement was actually formed through the email exchange, and how the ambiguity over 'exclusive' should be resolved if it was.",
    keyIssues: [
      "Whether the email exchange shows a clear enough offer and acceptance to have formed a binding contract at all",
      "Whether anything in the exchange signals the parties intended a further signed document before being bound, which would undercut formation",
      "How to resolve the ambiguity over what 'exclusive' was meant to cover, including who drafted the term",
      "What practical steps would have avoided this dispute and should be used going forward",
    ],
    expectedConcepts: [
      "offer and acceptance",
      "intention to be bound",
      "contract interpretation",
      "contra proferentem",
      "course of dealing",
    ],
    modelApproach:
      "A strong answer walks through the email chain for the actual elements of offer and acceptance rather than assuming an exclusive deal existed just because both sides discussed one, and separately checks whether the parties signaled that a later signed document was a precondition to being bound. It then resolves the ambiguity over 'exclusive' using ordinary interpretation tools, including who used the word first and who should bear the consequence of it being read narrowly.",
    furtherReading: [
      "Contract formation through correspondence and conduct",
      "Intention to be legally bound as a formation requirement",
      "Interpretation of ambiguous terms in commercial correspondence",
    ],
    premium: true,
    testsFundamentals: ["law-contract-formation", "law-contract-interpretation"],
  },
  {
    id: "law-contract-freelancer-assignment",
    profession: "law",
    category: "Contract Law",
    title: "The Freelancer's Assigned Invoice",
    scenario:
      "Your client is a small manufacturer that hired an independent freelance designer to create a distinctive product packaging design, with the contract specifying that all rights in the final design transfer to your client once final payment is made. Before your client paid the final invoice, the freelancer assigned the right to receive that payment to a factoring company in exchange for immediate cash, and the factoring company is now demanding payment directly from your client. Separately, your client discovered the freelancer has also begun using an early, similar version of the same design for a different customer, and your client wants the design work itself, not just a refund, since a competing product launch is only weeks away. You need to advise on both the assignment and the remedy your client should pursue over the design.",
    keyIssues: [
      "Whether the freelancer's assignment of the payment right to the factoring company is valid and binds your client to pay the factoring company instead",
      "Whether your client can raise against the factoring company any defenses it would have had against the freelancer directly",
      "Whether money damages are adequate for the design work given the looming product launch, or whether your client should seek to compel delivery and exclusive use",
      "How the freelancer's reuse of a similar design for another customer affects the strength of that remedy",
    ],
    expectedConcepts: [
      "assignment of contractual rights",
      "delegation of duties",
      "defenses against an assignee",
      "specific performance",
      "adequate remedy at law",
    ],
    modelApproach:
      "A strong answer treats the assignment question and the remedy question as separate issues. It explains that an assignment generally transfers the right to payment subject to the same defenses your client could have raised against the freelancer, and it separately evaluates whether the urgency and distinctiveness of the design work justify seeking compelled delivery rather than settling for damages alone.",
    furtherReading: [
      "Assignment of contractual rights and the assignee's exposure to the assignor's defenses",
      "Specific performance for uniquely creative or bespoke work",
      "Delegation of duties and continuing liability of the original party",
    ],
    premium: true,
    testsFundamentals: ["law-contract-third-party-rights", "law-contract-remedies-choice"],
  },
];
