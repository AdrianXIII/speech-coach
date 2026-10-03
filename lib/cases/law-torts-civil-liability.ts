import type { CaseStudy } from "@/lib/caseStudyContent";
import type { Fundamental } from "@/lib/caseStudyFundamentals";

/**
 * Law / Torts & Civil Liability: the fundamentals checklist and the case bank
 * for this category, kept together so they can be written and reviewed as
 * one unit. Registered in lib/cases/index.ts.
 *
 * Every case is written to be jurisdiction-neutral: it must make sense when
 * machine-translated and graded against the US, German, French, Spanish, or
 * Swedish legal system, so it avoids any single country's statutes, courts,
 * or procedural vocabulary in favor of generic doctrine that exists (in some
 * form, under whatever local label) across all five — negligence/duty of
 * care, strict/no-fault liability, product liability, defamation, and
 * nuisance all have a real counterpart in common-law and civil-law delict
 * systems alike, even though the labels and statutory sources differ.
 */
export const LAW_TORTS_CIVIL_LIABILITY_FUNDAMENTALS: Fundamental[] = [
  { id: "law-torts-duty-foreseeability", label: "Establishing whether a duty of care exists by asking whether the type of harm to this specific claimant was reasonably foreseeable" },
  { id: "law-torts-breach-standard-of-care", label: "Applying the reasonable-person/objective standard of care to determine whether conduct fell below what was legally required" },
  { id: "law-torts-factual-causation", label: "Establishing factual/cause-in-fact causation (the but-for or necessary-condition test) linking conduct to the harm" },
  { id: "law-torts-legal-causation-remoteness", label: "Limiting liability to harm that is not too remote a consequence of the breach, including intervening- and superseding-cause analysis" },
  { id: "law-torts-strict-liability-dangerous-activity", label: "Applying strict/no-fault liability for abnormally dangerous or hazardous activities regardless of the care actually taken" },
  { id: "law-torts-product-liability", label: "Assessing a manufacturer's or seller's liability for a defective product under a defect-based, not purely fault-based, standard" },
  { id: "law-torts-duty-to-warn", label: "Determining when a duty to warn of a known risk arises and whether a given warning was specific and adequate" },
  { id: "law-torts-vicarious-liability", label: "Applying vicarious/employer liability for an employee's or agent's wrongful act committed in the course of their role" },
  { id: "law-torts-joint-multiple-tortfeasors", label: "Allocating liability, and any right of contribution, among multiple parties who jointly caused a single harm" },
  { id: "law-torts-contributory-comparative-fault", label: "Apportioning or reducing recovery based on the injured party's own contributory fault" },
  { id: "law-torts-defamation-elements-defenses", label: "Applying the elements of defamation (false statement of fact, publication, reputational harm) and the defenses of truth, privilege, and opinion" },
  { id: "law-torts-nuisance", label: "Assessing liability for nuisance: a substantial and unreasonable interference with the use or enjoyment of property" },
  { id: "law-torts-pure-economic-loss", label: "Applying the rules and exceptions limiting recovery for pure economic loss unaccompanied by physical injury or property damage" },
  { id: "law-torts-psychiatric-injury-secondary-victim", label: "Determining when a recognized psychiatric injury is compensable and what proximity a secondary victim/bystander must show" },
  { id: "law-torts-res-ipsa-presumption-fault", label: "Applying a presumption-of-fault or res ipsa loquitur-type inference when the cause of harm is otherwise unascertainable" },
  { id: "law-torts-limitation-period", label: "Applying the limitation period for a tort/delict claim, including when a discoverability rule starts the clock running" },
  { id: "law-torts-assumption-of-risk-consent", label: "Assessing whether the injured party's informed consent or voluntary assumption of risk bars or reduces recovery" },
  { id: "law-torts-omissions-duty-to-act", label: "Determining when a duty to act arises for a pure omission, including through a special relationship or a voluntarily assumed responsibility" },
];

export const LAW_TORTS_CIVIL_LIABILITY_CASES: CaseStudy[] = [
  {
    id: "law-torts-factory-explosion-bystander",
    profession: "law",
    category: "Torts & Civil Liability",
    title: "The Explosion Two Streets Away",
    scenario:
      "Your client operates a fuel storage depot on the edge of a mixed industrial-residential district. A vapor buildup ignited during routine maintenance, causing an explosion that shattered windows and injured people in small businesses up to three hundred meters away, including a seamstress who was cut by flying glass while working at her shop counter two streets over. The depot had passed its most recent safety inspection, and your client argues that a business operator two streets away, with no direct connection to the depot's operations, customers, or deliveries, was never a person the depot owed any duty to protect in the first place, however badly she was actually hurt. The seamstress's lawyers argue that anyone within a wide blast radius of a known stock of flammable material is obviously foreseeable. You are advising the depot on how a court is likely to analyze whether a duty existed at all before even reaching whether the maintenance work itself fell below a reasonable standard of care.",
    keyIssues: [
      "Whether the scope of duty in a negligence claim depends on the specific claimant being a reasonably foreseeable person at risk, not merely that some harm somewhere was foreseeable in the abstract",
      "Whether the distance and lack of any direct relationship between the depot and the seamstress defeats the existence of a duty, independent of how carelessly the maintenance was actually performed",
      "Whether passing a safety inspection is evidence of reasonable care or just one factor a court will weigh against the actual risk the depot's operations posed",
      "How foreseeability at the duty stage differs from foreseeability at the later, separate causation stage of the analysis",
    ],
    expectedConcepts: [
      "duty of care",
      "foreseeable claimant",
      "zone of danger",
      "standard of care",
      "negligence",
    ],
    modelApproach:
      "A strong answer separates the duty question from the standard-of-care question rather than collapsing them into one broad fairness argument. It tests whether a business operator within the realistic blast radius of a known store of flammable material is a foreseeable claimant as a class, regardless of any direct dealings with the depot, and only then turns to whether the maintenance procedures that caused the ignition met a reasonable standard of care, treating the prior safety inspection as relevant but not conclusive evidence either way.",
    furtherReading: [
      "Foreseeability and the scope of duty in negligence claims",
      "The reasonable-person/objective standard of care and the relevance of regulatory compliance",
      "Comparative approaches to limiting the class of persons to whom a duty is owed",
    ],
    testsFundamentals: ["law-torts-duty-foreseeability", "law-torts-breach-standard-of-care"],
  },
  {
    id: "law-torts-defective-brake-component",
    profession: "law",
    category: "Torts & Civil Liability",
    title: "The Brake Caliper Recall Question",
    scenario:
      "Your client manufactures brake calipers supplied to several electric bicycle makers. A manufacturing-line fault caused a batch of roughly 4,000 units to intermittently lose braking force under heavy, repeated use, a defect the quality-control process should have caught but did not. A rider suffered a serious injury when the brakes failed on a steep descent. Your client's defense is that the accompanying manual included a generic warning to 'inspect brakes periodically,' which it argues covers this scenario, and that the rider should have noticed unusual grinding noises in the weeks before the accident. The distributor who sold the finished bicycles separately argues it is a mere reseller with no responsibility for a defect it could not have discovered. You are advising your client on its exposure for the defect itself, independent of fault, and on whether its generic warning was adequate as a legal matter.",
    keyIssues: [
      "Whether liability for a manufacturing defect in this setting turns on proving the manufacturer was careless, or on the product simply being defective regardless of the care taken in making it",
      "Whether a generic periodic-inspection warning is specific enough to discharge any duty to warn of this particular, known failure mode",
      "Whether the rider's failure to notice early warning signs affects the claim, and how that differs from the question of whether the product was defective in the first place",
      "Whether a distributor with no practical ability to detect a hidden manufacturing defect shares in liability alongside the manufacturer",
    ],
    expectedConcepts: [
      "product liability",
      "manufacturing defect",
      "duty to warn",
      "defect-based liability",
      "comparative fault",
    ],
    modelApproach:
      "A strong answer keeps the defect-based liability question analytically separate from any argument about the manufacturer's carelessness, since a manufacturing-defect claim generally does not require proving negligence at all, only that the product left the line in a condition different from, and more dangerous than, its intended design. It then tests the generic warning against the specific, known risk it needed to address, and treats the distributor's limited ability to detect the defect as a separate question from the manufacturer's own liability, which does not depend on the distributor's knowledge at all.",
    furtherReading: [
      "Defect-based (strict) product liability versus negligence-based claims",
      "Adequacy of warnings for a known, specific failure mode",
      "Liability allocation along a distribution chain for a manufacturing defect",
    ],
    testsFundamentals: ["law-torts-product-liability", "law-torts-duty-to-warn"],
  },
  {
    id: "law-torts-contractor-building-collapse",
    profession: "law",
    category: "Torts & Civil Liability",
    title: "The Balcony That Gave Way",
    scenario:
      "A balcony on a forty-year-old apartment building partially collapsed during an unusually heavy rainstorm, injuring two residents. The original architect's design, now decades old, called for a drainage slope that later renovation work subtly altered, and the structural engineer who signed off on that renovation five years ago never re-ran the load calculations for the altered slope. Your client, the renovation contractor who actually poured the new surface, argues that the engineer's sign-off was the real cause of the failure, that the original architect's own design was already marginal, and that the storm itself was so far outside historical rainfall records that it, not any party's conduct, was the true cause of the collapse. You are advising the contractor on how a court will likely sort out which, if any, of these contributing factors counts as an actual cause of the harm, and whether an unusually severe storm can break the chain between any party's conduct and the collapse.",
    keyIssues: [
      "Whether the contractor's altered drainage slope was a necessary condition without which the collapse would not have occurred, even if other parties also contributed",
      "Whether the engineer's failure to recalculate the load given the altered slope functions as an independent, intervening cause or as a foreseeable extension of the contractor's own departure from the original design",
      "Whether an unusually severe storm is an extraordinary, unforeseeable event that breaks the causal chain, or a foreseeable kind of event the design and sign-off process should have accounted for",
      "How a court should treat multiple contributing causes where no single factor is obviously sufficient on its own",
    ],
    expectedConcepts: [
      "cause-in-fact / but-for causation",
      "proximate or legal cause",
      "intervening cause",
      "foreseeability of the type of harm",
      "multiple contributing causes",
    ],
    modelApproach:
      "A strong answer separates the two stages of causation rather than treating the dispute as one single question of blame. It first asks whether the contractor's altered slope was a necessary link in the chain leading to the collapse, regardless of who else also contributed, and then separately asks whether the storm, or the engineer's failure to recalculate, was foreseeable enough that it does not relieve the contractor of liability, since rainfall-driven drainage failure is exactly the kind of risk the original design existed to prevent.",
    furtherReading: [
      "Cause-in-fact versus proximate/legal cause in multi-party harm",
      "Intervening and superseding causes and when they break the causal chain",
      "Allocating causation among multiple contributing actors",
    ],
    premium: true,
    testsFundamentals: ["law-torts-factual-causation", "law-torts-legal-causation-remoteness"],
  },
  {
    id: "law-torts-chemical-plant-leak",
    profession: "law",
    category: "Torts & Civil Liability",
    title: "The Leak and the Lingering Smell",
    scenario:
      "Your client operates a chemical processing facility that stores and handles industrial solvents classified as hazardous even under normal operating conditions. A valve failure released a cloud of fumes that drifted over a neighboring farm, forcing a temporary evacuation and damaging a portion of that season's crop. Separately, and unrelated to the leak itself, the farm's owner has long complained that the facility's ordinary, day-to-day operation produces a persistent chemical odor and a low background hum that she says has made her property markedly less pleasant to live on for years, even though the facility has always operated within its permitted limits. Your client wants to know whether its care in designing and running the facility can shield it from liability for the leak itself, and separately whether operating lawfully within permit limits protects it from a claim over the ongoing odor and noise.",
    keyIssues: [
      "Whether liability for harm caused by storing and handling an inherently hazardous substance can attach regardless of how carefully the facility was designed and operated",
      "Whether operating within permitted regulatory limits is a defense to a claim based on ongoing interference with a neighboring property's use and enjoyment",
      "Whether the one-time leak and the ongoing odor and noise are properly analyzed as the same claim or as two legally distinct theories of liability",
      "What role the social or economic utility of the facility plays in each of the two theories",
    ],
    expectedConcepts: [
      "strict liability for abnormally dangerous activity",
      "nuisance",
      "substantial and unreasonable interference",
      "regulatory compliance as evidence, not a defense",
      "no-fault liability",
    ],
    modelApproach:
      "A strong answer treats the leak and the ongoing odor and noise as two separate theories rather than one claim. For the leak, it recognizes that storing and handling substances this hazardous can trigger liability regardless of the care taken, since the risk itself, not carelessness, is what justifies holding the operator responsible. For the ongoing interference, it tests whether the odor and noise are substantial and unreasonable given the character of the area, treating lawful permit compliance as relevant evidence of reasonableness but not an automatic defense to a neighbor's claim.",
    furtherReading: [
      "Strict/no-fault liability for abnormally dangerous or ultra-hazardous activities",
      "Nuisance: substantial and unreasonable interference with use and enjoyment of land",
      "The limited defensive weight of regulatory permit compliance",
    ],
    premium: true,
    testsFundamentals: ["law-torts-strict-liability-dangerous-activity", "law-torts-nuisance"],
  },
  {
    id: "law-torts-vicarious-employee-delivery-crash",
    profession: "law",
    category: "Torts & Civil Liability",
    title: "The Detour on the Delivery Route",
    scenario:
      "A driver employed by your client, a courier company, was midway through a scheduled delivery run when he made an unplanned ten-minute detour to drop off his own dry cleaning, a stop entirely unrelated to any delivery. On the way back to his route, he struck a cyclist while his view of the intersection was partly blocked by a delivery truck belonging to an unrelated company that was parked illegally in a loading zone. The cyclist suffered serious injuries and is pursuing a claim against your client, the driver personally, and the owner of the illegally parked truck. Your client wants to know whether the detour takes the driver's conduct outside the course of his employment, cutting off the company's own liability, and separately how liability should be divided if both the driver and the truck's owner contributed to the crash.",
    keyIssues: [
      "Whether a short, personal detour during an otherwise work-related trip takes the driver's conduct outside the course of employment, or is a minor deviation that does not break the employment connection",
      "What factors distinguish a minor detour from a substantial departure from work duties for purposes of employer liability",
      "Whether the illegally parked truck's owner is a second contributing cause, and how liability should be apportioned between it and the driver",
      "What right of contribution or recourse the parties have against each other once liability is established",
    ],
    expectedConcepts: [
      "vicarious liability",
      "course and scope of employment",
      "frolic versus detour",
      "joint and several liability",
      "contribution among multiple tortfeasors",
    ],
    modelApproach:
      "A strong answer treats the scope-of-employment question as one of degree rather than an all-or-nothing label, weighing the detour's short duration and its proximity to the driver's actual route against the fact that it served no purpose connected to the job at all, and reaches a reasoned conclusion rather than assuming either outcome automatically. It then treats the illegally parked truck as a genuinely separate, independent contributing cause, and works through how liability and any right of contribution should be divided between the two responsible parties rather than treating the case as involving only one wrongdoer.",
    furtherReading: [
      "Vicarious liability and the course-and-scope-of-employment limit",
      "The frolic-and-detour distinction in employer liability",
      "Joint and several liability and contribution among multiple tortfeasors",
    ],
    premium: true,
    testsFundamentals: ["law-torts-vicarious-liability", "law-torts-joint-multiple-tortfeasors"],
  },
  {
    id: "law-torts-online-review-defamation",
    profession: "law",
    category: "Torts & Civil Liability",
    title: "The Invoice-Padding Review",
    scenario:
      "A former client of your client, a boutique architecture firm, posted a detailed online review accusing the firm of 'fraudulently padding invoices to squeeze more money out of a straightforward renovation.' The firm's actual invoices were higher than its original estimate, but the firm says every increase was disclosed in writing at the time and tied to specific, client-approved change orders, a paper trail it can produce in full. The reviewer insists the word 'fraudulently' was just a strong way of expressing a genuine, honestly held opinion about how the firm handled the relationship, not a factual accusation, and that honest opinion about a business's conduct based on true underlying facts cannot be the basis of a claim. The firm has lost at least two prospective clients who mentioned the review specifically. You are advising the firm on whether the review crosses the line from protected opinion into an actionable false statement of fact.",
    keyIssues: [
      "Whether calling the billing practice 'fraudulent' is a statement of fact capable of being proven true or false, or genuinely just a strong expression of opinion",
      "Whether the underlying facts the reviewer relied on were themselves true, and if so, whether that defeats the claim regardless of how harsh the characterization was",
      "What the firm actually needs to prove: a false statement, published to others, that caused harm to its reputation",
      "What remedy is realistic given the review remains visible and demonstrably cost the firm actual prospective business",
    ],
    expectedConcepts: [
      "defamation",
      "statement of fact versus opinion",
      "truth as a defense",
      "publication and reputational harm",
      "damages from reputational injury",
    ],
    modelApproach:
      "A strong answer does not treat 'fraudulently' as automatically either pure opinion or an actionable factual accusation; it tests whether a reasonable reader would understand the word as asserting a specific, verifiable fact, that the firm knowingly overbilled, rather than merely as colorful criticism. It then checks whether the underlying facts, the price increases and the change orders, were accurately described, since even a harsh characterization built on accurately disclosed facts is far harder to treat as defamatory than one resting on a hidden or distorted factual claim.",
    furtherReading: [
      "The distinction between statements of fact and protected opinion in defamation claims",
      "Truth as a defense to a defamation claim",
      "Reputational harm and damages in defamation",
    ],
    premium: true,
    testsFundamentals: ["law-torts-defamation-elements-defenses"],
  },
  {
    id: "law-torts-investment-adviser-negligent-report",
    profession: "law",
    category: "Torts & Civil Liability",
    title: "The Valuation Report That Traveled",
    scenario:
      "An accounting firm, your client, was engaged by a company to prepare a valuation report supporting its planned sale to a specific buyer. The buyer, with the accounting firm's knowledge, shared the report with a separate investor who was considering putting additional capital into the deal alongside the buyer, without that investor ever engaging the accounting firm directly or paying it any fee. The report significantly overstated the target company's recurring revenue due to a calculation error, and the second investor says it relied on the report's numbers in deciding how much additional capital to commit, and has now suffered a substantial loss. Your client never had a contract with this second investor and argues it owes no duty to a party it never agreed to serve, while the investor argues the accounting firm knew exactly who would be relying on the report and for what purpose.",
    keyIssues: [
      "Whether a professional preparing a report for one party can owe a duty to a specific third party it knew would rely on that report for a particular purpose, even absent any direct contract",
      "How claims for this kind of purely financial loss, unaccompanied by any physical injury or property damage, are treated differently from ordinary negligence claims",
      "What limits exist on the class of people and purposes for which reliance was foreseeable, to avoid exposing the accounting firm to unlimited liability",
      "What the second investor actually needs to show to establish that the error caused its specific loss",
    ],
    expectedConcepts: [
      "pure economic loss",
      "negligent misstatement/misrepresentation",
      "known and intended reliance",
      "limits on the class of foreseeable claimants",
      "duty absent privity of contract",
    ],
    modelApproach:
      "A strong answer recognizes that claims for purely financial loss are treated far more cautiously than claims for physical injury or property damage, and focuses the analysis on whether the accounting firm actually knew, specifically, that this investor and this transaction were the intended use of the report, rather than relying on the broader foreseeability standard that would apply to a physical-injury claim. It avoids assuming that mere awareness the report might circulate is enough, and instead asks whether the firm's knowledge was specific enough to justify extending a duty to a party outside its original engagement.",
    furtherReading: [
      "The economic-loss limitation and its exceptions for known, intended reliance",
      "Negligent misstatement/misrepresentation claims by non-clients",
      "Limiting the class of claimants for professional negligence absent a contract",
    ],
    premium: true,
    testsFundamentals: ["law-torts-pure-economic-loss"],
  },
  {
    id: "law-torts-bystander-ptsd-accident",
    profession: "law",
    category: "Torts & Civil Liability",
    title: "What the Mother Saw",
    scenario:
      "A delivery van reversing out of a loading bay without checking its mirror struck a child riding a bicycle on the sidewalk, causing serious but survivable injuries. The child's mother was standing roughly ten meters away and saw the entire collision happen in front of her. She was not herself at any risk of being struck, but has since been diagnosed with a persistent psychiatric condition directly tied to witnessing the accident, confirmed through documented treatment rather than ordinary grief or distress. The delivery company, your client, accepts the driver was careless toward the child but argues that extending liability to a bystander's own psychiatric harm, however genuine, risks opening claims to an unmanageable and indeterminate class of witnesses to any accident. You are advising on whether the mother's claim is likely to succeed and what limits a court is likely to apply.",
    keyIssues: [
      "Whether a diagnosed, documented psychiatric condition is the kind of harm that can support its own claim, as distinct from ordinary distress that does not",
      "What closeness of relationship to the primary victim, if any, the mother must show to bring a claim for psychiatric harm she suffered as a witness",
      "What proximity in time and space to the accident itself is required, given that she directly perceived the event as it happened rather than learning of it afterward",
      "How a court balances compensating genuine, serious psychiatric harm against the risk of an unmanageably large class of claimants from any single incident",
    ],
    expectedConcepts: [
      "psychiatric injury",
      "secondary victim",
      "proximity requirement",
      "recognized medical condition",
      "indeterminate liability concern",
    ],
    modelApproach:
      "A strong answer does not treat the mother's claim as automatically barred just because she was never physically at risk herself, nor as automatically valid just because the harm is genuine and documented. It works through the specific proximity factors courts actually apply to secondary-victim claims: a close relationship to the primary victim, direct perception of the event through her own senses rather than a secondhand account, and closeness in time and space to the accident, and explains why those factors exist specifically to prevent indeterminate liability rather than to minimize genuine psychiatric harm.",
    furtherReading: [
      "Secondary-victim claims for psychiatric injury and the proximity requirements courts apply",
      "The distinction between a recognized psychiatric condition and ordinary grief or distress",
      "Policy limits on liability to avoid an indeterminate class of claimants",
    ],
    premium: true,
    testsFundamentals: ["law-torts-psychiatric-injury-secondary-victim"],
  },
  {
    id: "law-torts-unexplained-surgical-injury",
    profession: "law",
    category: "Torts & Civil Liability",
    title: "The Nerve Injury No One Can Explain",
    scenario:
      "A patient underwent a routine, low-risk outpatient procedure on her shoulder and woke up with a significant nerve injury in her unrelated opposite arm, an injury that does not ordinarily occur from this type of procedure when it is performed competently. She was under sedation throughout and has no memory of the procedure itself, and the clinical notes from the operating team are unusually sparse about how she was positioned during the surgery, a detail that often explains this specific type of injury. The clinic, your client, argues the patient cannot identify any specific negligent act by any specific person, and that without pointing to exactly what went wrong, there is no basis for a claim. You are advising the clinic on whether the circumstances themselves, independent of any specific identified act, can shift the practical burden onto it to explain what happened.",
    keyIssues: [
      "Whether an injury of a kind that does not ordinarily occur absent negligence, combined with the fact that the clinic had exclusive control over the circumstances, can support an inference of fault without the patient identifying a specific negligent act",
      "Whether the sparse documentation itself should count against the clinic, given it controlled what was recorded and the patient had no ability to observe or document anything herself while sedated",
      "What showing the clinic must make to rebut the inference once it arises, rather than simply pointing out that no specific act was identified",
      "How this situation differs from an ordinary negligence claim where the claimant must affirmatively prove the specific breach",
    ],
    expectedConcepts: [
      "res ipsa loquitur / presumption of fault",
      "exclusive control",
      "burden of proof",
      "inference from circumstances",
      "unexplained injury",
    ],
    modelApproach:
      "A strong answer recognizes that an injury which would not ordinarily occur without carelessness, suffered by a patient who was unconscious and had no ability to observe anything, combined with the clinic's exclusive control over the entire procedure, is exactly the situation in which courts allow fault to be inferred from the circumstances themselves rather than requiring the claimant to pinpoint a specific act. It then addresses what the clinic must actually show to rebut that inference, rather than treating the absence of a named negligent act as the end of the analysis.",
    furtherReading: [
      "Res ipsa loquitur and presumption-of-fault doctrines where the cause is otherwise unascertainable",
      "The role of exclusive control and the shifting practical burden of proof",
      "Evidentiary consequences of incomplete records controlled by the defendant",
    ],
    premium: true,
    testsFundamentals: ["law-torts-res-ipsa-presumption-fault"],
  },
  {
    id: "law-torts-delayed-diagnosis-claim-limitation",
    profession: "law",
    category: "Torts & Civil Liability",
    title: "The Scan No One Flagged",
    scenario:
      "A radiologist reviewing a routine scan several years ago failed to flag a visible mass that, in hindsight, was clearly abnormal. The patient only learned of the missed finding last month, when a different doctor reviewing the old images after a related diagnosis noticed the mass had been visible, and already concerning, in the original scan. Measured from the date of the original scan itself, the ordinary limitation period for bringing a claim has already expired. The patient wants to know whether the clock instead starts running from when she actually discovered, or reasonably could have discovered, the missed finding, and whether anything the clinic did or failed to do afterward, such as never correcting its own internal records, affects that analysis. You are advising her on the realistic strength of the timing argument before anything else about the underlying claim is even assessed.",
    keyIssues: [
      "Whether the limitation period runs from the date of the original act or from when the harm was, or reasonably should have been, discovered",
      "What standard governs whether the patient reasonably should have discovered the missed finding earlier than she actually did",
      "Whether the clinic's own failure to correct or flag its internal records after the fact has any bearing on the timing question",
      "What happens to the underlying claim on the merits if the timing argument fails outright",
    ],
    expectedConcepts: [
      "limitation period",
      "discoverability rule",
      "accrual of a claim",
      "reasonable diligence standard",
      "latent harm",
    ],
    modelApproach:
      "A strong answer does not simply accept that the limitation period ran from the date of the original scan, since many systems start the clock instead from when the harm was, or reasonably should have been, discovered, particularly for latent injuries a patient had no realistic way of detecting earlier. It tests whether the patient exercised reasonable diligence given that nothing about the earlier scan would have prompted her to question it, and treats the discoverability question as the decisive, threshold issue to resolve before the underlying negligence claim is even reached.",
    furtherReading: [
      "Discoverability rules for the accrual of a limitation period in latent-harm claims",
      "The reasonable-diligence standard for discovering a hidden injury",
      "Consequences of a missed limitation period for an otherwise strong claim",
    ],
    premium: true,
    testsFundamentals: ["law-torts-limitation-period"],
  },
  {
    id: "law-torts-skydiving-waiver-injury",
    profession: "law",
    category: "Torts & Civil Liability",
    title: "The Waiver and the Harness",
    scenario:
      "Your client operates a tandem skydiving business. Every participant signs a liability waiver acknowledging the inherent risks of skydiving before any jump. During a recent tandem jump, the instructor fitted a participant's harness incorrectly, a fitting error unrelated to any ordinary risk of the sport itself, and the participant was injured on landing as a direct result of the faulty fit. The company argues the signed waiver covers any injury arising from the jump, full stop, while the injured participant argues she accepted the ordinary risks of skydiving, a parachute malfunction or a hard landing in good conditions, but never agreed to bear the risk of the company's own staff making a basic equipment error. You are advising the company on how far its waiver actually reaches and whether some risks simply cannot be waived regardless of what the document says.",
    keyIssues: [
      "Whether a general waiver of the inherent risks of an activity extends to an injury caused by the operator's own careless conduct, as opposed to the ordinary risks of the activity itself",
      "Whether certain categories of conduct, such as a basic safety-equipment error, fall outside what any waiver can validly cover regardless of its wording",
      "Whether the waiver was clear and specific enough to have genuinely informed the participant of what she was giving up",
      "What the participant's recovery looks like if the waiver is found to bar only the inherent-risk claim but not the equipment-error claim",
    ],
    expectedConcepts: [
      "assumption of risk",
      "informed consent",
      "scope of a liability waiver",
      "non-waivable conduct",
      "inherent versus created risk",
    ],
    modelApproach:
      "A strong answer draws a sharp line between the inherent, irreducible risks of skydiving that a knowing participant genuinely assumes by signing up, and a risk created by the operator's own basic failure to perform a safety task correctly, which a waiver of inherent risk does not automatically cover. It tests the waiver's actual wording and clarity against that distinction, and flags that many systems treat a waiver purporting to cover an operator's own careless or reckless conduct, as opposed to the sport's inherent danger, with considerable skepticism regardless of how broadly it was drafted.",
    furtherReading: [
      "Assumption of risk and the limits of a liability waiver's scope",
      "Inherent risk of an activity versus risk created by the operator's own conduct",
      "Conduct that cannot be waived in advance regardless of contractual language",
    ],
    premium: true,
    testsFundamentals: ["law-torts-assumption-of-risk-consent"],
  },
  {
    id: "law-torts-lifeguard-failure-to-rescue",
    profession: "law",
    category: "Torts & Civil Liability",
    title: "Two Lifeguards, One Pool",
    scenario:
      "A member of a private swim club got into serious trouble in the deep end while the club's on-duty lifeguard was distracted by a personal phone call and failed to notice for nearly a minute. A second club member, who happened to be a certified lifeguard elsewhere but was off duty and swimming for leisure, noticed the struggle, began swimming over to help, then stopped and turned back after briefly assuming it was just horseplay between friends. The struggling swimmer suffered a serious injury before the on-duty lifeguard finally responded. The injured member's family wants to pursue a claim against both the club, through its on-duty lifeguard, and the off-duty bystander who started to help and then stopped. You are advising on whether each of these two people owed any duty to act in the first place, and whether starting a rescue and then abandoning it changes the analysis for the bystander.",
    keyIssues: [
      "Whether the on-duty lifeguard's assigned role created an affirmative duty to act that an ordinary bystander would not have had",
      "Whether a person with no pre-existing duty who voluntarily begins a rescue takes on a duty to continue, or at least not to make the situation worse by starting and then stopping",
      "Whether the off-duty bystander's mistaken, good-faith belief that it was horseplay affects the analysis of whether stopping was reasonable",
      "How liability, if any, should be divided between the club and the bystander given their very different starting positions",
    ],
    expectedConcepts: [
      "duty to act versus no general duty to rescue",
      "special relationship creating a duty",
      "voluntary undertaking",
      "reasonable belief/mistake of fact",
      "omission versus affirmative conduct",
    ],
    modelApproach:
      "A strong answer keeps the two defendants analytically distinct rather than treating them the same way. It establishes that the on-duty lifeguard's role itself created a clear affirmative duty to act that does not depend on any voluntary undertaking at all, while the off-duty bystander began with no duty whatsoever, so only a narrower, separate question arises once he voluntarily started to help: whether beginning a rescue and then abandoning it, based on a genuine but mistaken belief, breached whatever narrower obligation a voluntary rescuer takes on once they have begun.",
    furtherReading: [
      "The general rule against a duty to rescue and its exceptions",
      "Special relationships (lifeguard, caregiver, employer) that create an affirmative duty to act",
      "Liability for a voluntarily undertaken rescue that is then abandoned",
    ],
    premium: true,
    testsFundamentals: ["law-torts-omissions-duty-to-act"],
  },
  {
    id: "law-torts-pedestrian-contributory-fault",
    profession: "law",
    category: "Torts & Civil Liability",
    title: "The Mid-Block Crossing",
    scenario:
      "A pedestrian crossing mid-block, away from any marked crossing and looking down at her phone, was struck by a delivery van traveling slightly above the posted speed limit whose driver was simultaneously glancing down to adjust the radio. Both the pedestrian and the driver appear to have contributed to the collision, which left the pedestrian with severe, long-term injuries. The delivery company, your client, does not dispute that its driver was speeding and distracted, but argues the pedestrian's own decision to cross mid-block while distracted by her phone should significantly reduce, or even eliminate, what it has to pay. The pedestrian's representatives argue the driver's conduct was so plainly careless that her own momentary inattention should barely matter at all. You are advising on how fault is likely to be apportioned between the two and what that means for the final award.",
    keyIssues: [
      "Whether the pedestrian's own conduct falls below a reasonable standard of care for her own safety, independent of how careless the driver also was",
      "How a court or fact-finder is likely to weigh and apportion relative fault between the two parties rather than treating the question as binary",
      "Whether apportioned fault reduces the recoverable compensation proportionally or can bar recovery entirely past some threshold",
      "What practical difference the apportionment makes to the actual amount the pedestrian ultimately recovers",
    ],
    expectedConcepts: [
      "contributory/comparative fault",
      "standard of care applied to the injured party",
      "apportionment of damages",
      "proportional reduction versus complete bar",
    ],
    modelApproach:
      "A strong answer treats the driver's clear carelessness and the pedestrian's own momentary inattention as two separate questions of fault to be weighed against each other, rather than letting the driver's more obvious violations excuse the pedestrian's own conduct from scrutiny entirely. It walks through how relative fault is likely to be apportioned on the specific facts, and explains concretely what that apportionment means for the final recoverable amount, since the practical consequence of a fault-sharing finding is often the single most important number in the entire case.",
    furtherReading: [
      "Comparative and contributory fault doctrines and how they differ in effect",
      "Apportionment of damages between an injured party and a negligent defendant",
      "The standard of care expected of an injured party for their own safety",
    ],
    premium: true,
    testsFundamentals: ["law-torts-contributory-comparative-fault", "law-torts-breach-standard-of-care"],
  },
  {
    id: "law-torts-noisy-neighbor-factory",
    profession: "law",
    category: "Torts & Civil Liability",
    title: "The Bakery That Was There First",
    scenario:
      "A small commercial bakery has operated the same early-morning baking schedule at its current location for over a decade, holding every permit required for its ovens, extraction fans, and delivery schedule. A new residential building was constructed immediately next door three years ago, and one of its residents now complains that the bakery's pre-dawn deliveries, extraction-fan noise, and persistent roasting odor have substantially disrupted her sleep and made her apartment unpleasant to live in, far beyond what she expected when she moved in. The bakery, your client, argues it has done nothing differently in years, holds every necessary permit, and that the resident chose to move in next to an operating bakery with her eyes open. The resident argues that none of that matters if the actual, ongoing interference with her property is severe enough. You are advising the bakery on how much weight its permits and its priority in time actually carry.",
    keyIssues: [
      "Whether holding all required permits and operating lawfully provides a defense to a claim based on substantial interference with a neighbor's use and enjoyment of their property",
      "What weight, if any, the bakery's priority in time, operating at the location well before the resident moved in, carries in the analysis",
      "Whether the character of the surrounding area, mixed commercial-residential use, affects what counts as a substantial and unreasonable interference",
      "What remedies are realistically available if the interference is found to be actionable, short of simply shutting the bakery down",
    ],
    expectedConcepts: [
      "nuisance",
      "substantial and unreasonable interference",
      "character of the locality",
      "priority of use / coming to the nuisance",
      "regulatory compliance as evidence, not a defense",
    ],
    modelApproach:
      "A strong answer treats lawful permit compliance and the bakery's priority in time as relevant factors in assessing reasonableness, not as automatic defenses that end the inquiry, and tests the actual severity and persistence of the noise and odor against the character of a mixed commercial-residential area rather than against a purely residential standard. It also considers realistic remedies short of closure, such as adjusted delivery timing or additional odor control, as the kind of outcome a court is more likely to actually order than an outright shutdown of a long-operating, permitted business.",
    furtherReading: [
      "Nuisance and the balancing of substantial, unreasonable interference against the character of the locality",
      "The limited weight of 'coming to the nuisance' and priority in time as a defense",
      "Remedies for nuisance short of an outright injunction against operation",
    ],
    premium: true,
    testsFundamentals: ["law-torts-nuisance"],
  },
];
