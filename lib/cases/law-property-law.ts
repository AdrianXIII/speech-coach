import type { CaseStudy } from "@/lib/caseStudyContent";
import type { Fundamental } from "@/lib/caseStudyFundamentals";

/**
 * Law / Property Law: the fundamentals checklist and the case bank
 * for this category, kept together so they can be written and reviewed as
 * one unit. Registered in lib/cases/index.ts.
 *
 * Every case is written to be jurisdiction-neutral: it must make sense when
 * machine-translated and graded against the US, German, French, Spanish, or
 * Swedish legal system, so it avoids any single country's statutes, courts,
 * or procedural vocabulary in favor of generic doctrine that exists (in some
 * form) across all five — ownership and possession, real-property
 * transactions, landlord-tenant law, easements/servitudes, and secured
 * interests over property.
 */
export const LAW_PROPERTY_LAW_FUNDAMENTALS: Fundamental[] = [
  { id: "law-property-possession-vs-ownership", label: "Distinguishing possession from ownership and the distinct legal protections and remedies each confers" },
  { id: "law-property-adverse-possession", label: "Applying adverse possession / acquisitive prescription requirements (open, continuous, hostile possession for the statutory period) to determine whether title has passed" },
  { id: "law-property-bona-fide-purchaser", label: "Determining whether a good-faith purchaser for value takes free of a hidden defect or competing claim in the seller's title" },
  { id: "law-property-registration-priority", label: "Applying a land registry/recording system's rules to determine which of two competing property interests has priority" },
  { id: "law-property-transfer-formalities", label: "Identifying the formal requirements (deed, notarization, registration) that must be satisfied for a valid transfer of real property" },
  { id: "law-property-easements-servitudes", label: "Determining the creation, scope, and termination of an easement or servitude burdening another's land" },
  { id: "law-property-covenants-running-with-land", label: "Deciding whether a restrictive covenant or use restriction runs with the land and binds a successor in title" },
  { id: "law-property-co-ownership-partition", label: "Resolving a co-ownership dispute, including the right to seek partition or forced sale among co-owners" },
  { id: "law-property-lease-formation-license-distinction", label: "Distinguishing a lease (a possessory interest) from a mere license, and identifying the essential terms a lease must contain" },
  { id: "law-property-habitability-repair", label: "Applying the landlord's duty to deliver and maintain habitable, fit-for-purpose premises and the tenant's remedies for a failure to do so" },
  { id: "law-property-eviction-procedure", label: "Applying the lawful procedure for eviction and the prohibition on self-help remedies against a tenant in possession" },
  { id: "law-property-security-deposit-rules", label: "Applying the rules governing a security deposit or rent guarantee, including permissible deductions and the duty to return it" },
  { id: "law-property-mortgage-secured-interest", label: "Determining how a mortgage or other secured interest in real property is validly created and perfected" },
  { id: "law-property-priority-foreclosure", label: "Resolving priority among competing secured creditors and applying the foreclosure procedure that realizes a defaulted security interest" },
  { id: "law-property-fixtures-chattels", label: "Classifying an item as a fixture (part of the land) or a movable chattel to determine who owns it on transfer or lease-end" },
  { id: "law-property-nuisance-boundary-disputes", label: "Resolving a nuisance or boundary dispute between neighboring landowners, including the remedies available short of litigation" },
  { id: "law-property-leasehold-assignment-sublease", label: "Applying the rules governing assignment and subletting of a leasehold interest, including when landlord consent is required" },
  { id: "law-property-good-faith-improver", label: "Determining the rights of a good-faith possessor who builds on or improves land believing, mistakenly, that it is their own" },
  { id: "law-property-risk-of-loss-transfer", label: "Allocating the risk of loss or damage to property between contract formation and the completion of transfer" },
  { id: "law-property-condominium-common-areas", label: "Applying the rules governing shared/condominium ownership, including management of common areas and apportionment of charges" },
];

export const LAW_PROPERTY_LAW_CASES: CaseStudy[] = [
  {
    id: "law-property-encroaching-fence",
    profession: "law",
    category: "Property Law",
    title: "The Fence That Moved the Boundary",
    scenario:
      "Two adjacent homeowners share a property line that a fence has marked for eleven years, built by your client's predecessor roughly 2.4 meters inside what a new survey, commissioned when your client tried to refinance, shows is actually your client's own parcel. The neighbor has used that strip exclusively and openly the entire time, mowing it, gardening it, and storing equipment on it, and now refuses to move the fence, arguing both prior owners treated it as the real boundary for over a decade. Separately, the neighbor recently built a toolshed partly on the disputed strip, and water now pools against your client's foundation whenever it rains, a problem that did not exist before the shed went up. Your client wants to know whether the boundary can still be challenged given how long the neighbor has used the strip, and separately what can be done about the drainage problem regardless of how the boundary question is resolved.",
    keyIssues: [
      "Whether the neighbor's open, continuous, and exclusive use of the disputed strip for the applicable statutory period has already transferred title to the land by operation of law, regardless of what the new survey shows",
      "What counts as sufficiently 'hostile' or adverse use as opposed to permissive or shared use that would not run the clock at all",
      "Whether the drainage and flooding problem caused by the new shed is a distinct nuisance claim that survives even if the boundary question is lost",
      "Practical alternatives (a boundary-line agreement, a drainage easement) that could resolve the dispute without a full title fight",
    ],
    expectedConcepts: [
      "adverse possession / acquisitive prescription",
      "open, continuous, and hostile possession",
      "tacking and privity between successive possessors",
      "nuisance",
      "boundary-line agreement",
      "burden of proof",
    ],
    modelApproach:
      "A strong answer treats the boundary question and the drainage question as genuinely separate claims rather than one dispute, since losing the adverse-possession fight does not resolve whether the new shed is causing an actionable nuisance. It tests the neighbor's use against the specific elements adverse possession requires — openness, continuity, and hostility for the full statutory period, including whether the predecessor's use can be tacked onto the current owner's — rather than assuming eleven years of visible use automatically satisfies every element. It treats a negotiated boundary-line agreement as a realistic, lower-cost alternative to full litigation regardless of how strong either side's claim actually is.",
    furtherReading: [
      "Adverse possession and acquisitive prescription requirements compared across legal systems",
      "Tacking and privity between successive adverse possessors",
      "Nuisance and drainage disputes between neighboring landowners",
    ],
    testsFundamentals: ["law-property-adverse-possession", "law-property-nuisance-boundary-disputes"],
  },
  {
    id: "law-property-double-sale-unregistered-buyer",
    profession: "law",
    category: "Property Law",
    title: "The Buyer Who Registered First",
    scenario:
      "The seller of a small commercial building sold it twice within a six-week window. Your client paid the full price first, took possession, and has been operating a retail business out of the building ever since, but delayed registering the transfer at the land registry on their lawyer's advice while a minor title issue was cleared up. Weeks later, facing a cash shortage, the same seller sold the identical building to a second buyer at a slightly lower price. That buyer registered the transfer immediately and says they had no actual knowledge of your client's earlier purchase, even though your client's shop sign and storefront have been visible from the street the entire time. The second buyer is now demanding your client vacate immediately, citing their registered title. You need to advise your client on who has the stronger claim and what to do right away.",
    keyIssues: [
      "Whether the registry's priority rules protect a later buyer who registered first, even against an earlier buyer who paid in full and took possession",
      "Whether the second buyer's actual or constructive knowledge of your client's open possession defeats the good-faith-purchaser protection the second buyer is relying on",
      "What your client can recover from the seller directly, regardless of how the priority dispute between the two buyers is resolved",
      "Practical urgency: whether your client can obtain interim relief to remain in possession while the priority dispute is litigated",
    ],
    expectedConcepts: [
      "bona fide purchaser for value",
      "registration/recording priority",
      "constructive notice from visible possession",
      "double sale",
      "seller liability for breach",
    ],
    modelApproach:
      "A strong answer does not assume registration alone settles the priority fight; it tests whether the second buyer actually qualifies as a good-faith purchaser given that your client's open, ongoing possession and visible business are exactly the kind of facts that should have prompted further inquiry before relying on a clean registry entry. It keeps the priority dispute between the two buyers analytically separate from your client's claim against the seller, which exists and is strong regardless of how the priority question comes out, and treats interim relief to preserve possession as the most time-sensitive step.",
    furtherReading: [
      "Good-faith purchaser protection and its limits where a prior possessor's interest is visible",
      "Land registry/recording systems and priority between competing transfers",
      "Remedies against a seller who sells the same property twice",
    ],
    testsFundamentals: ["law-property-bona-fide-purchaser", "law-property-registration-priority"],
  },
  {
    id: "law-property-blocked-right-of-way",
    profession: "law",
    category: "Property Law",
    title: "Blocking the Only Right of Way",
    scenario:
      "Your client's rural property is landlocked except for a gravel access road crossing a neighboring parcel, created thirty years ago by a deed granting an easement 'for ingress and egress to the main road.' The current owner of the neighboring parcel recently bought a large camper and has started parking it across the road for days at a time to keep it off their own lawn, physically blocking your client's deliveries and your client's own access entirely. The neighbor argues the easement was granted broadly for access generally, so parking on the road is simply the neighbor exercising ordinary use of the neighbor's own land, which the easement does not take away. Your client needs the road clear for an upcoming harvest and wants to know the actual scope of the right of way and what can be done about the repeated blocking.",
    keyIssues: [
      "Whether the easement's language ('ingress and egress') defines its scope narrowly, meaning the servient owner cannot obstruct it for unrelated uses of their own",
      "Whether the servient landowner retains any right to use the strip of land the easement burdens, and the limits on that retained right",
      "What remedies, including injunctive relief, are available against an easement holder's own obstruction of the right of way",
      "Whether thirty years of a particular pattern of actual use has itself shaped the easement's practical scope, for either side's benefit",
    ],
    expectedConcepts: [
      "easement / servitude",
      "scope of an easement by grant",
      "servient owner's retained rights",
      "unreasonable interference with an easement",
      "injunctive relief",
    ],
    modelApproach:
      "A strong answer reads the deed's actual grant language first, since an easement 'for ingress and egress' is a right of passage, not a right to park, and tests the neighbor's camper against that defined scope rather than treating any use of the servient land as automatically permissible just because the neighbor owns the underlying soil. It identifies injunctive relief as the appropriate remedy for an ongoing, repeated obstruction rather than only damages after the fact, and separately considers whether decades of a particular pattern of use has itself shaped the easement's practical scope.",
    furtherReading: [
      "Scope of easements created by express grant",
      "The servient owner's retained rights and the limits on interference with an easement",
      "Injunctive relief against ongoing obstruction of a right of way",
    ],
    premium: true,
    testsFundamentals: ["law-property-easements-servitudes", "law-property-possession-vs-ownership"],
  },
  {
    id: "law-property-no-business-use-covenant",
    profession: "law",
    category: "Property Law",
    title: "The Fifty-Year-Old No-Business Covenant",
    scenario:
      "Your client bought a house in a small residential subdivision whose original deeds, recorded decades ago, included a covenant restricting every lot to 'residential use only,' a restriction referenced in every subsequent deed in the chain of title, including your client's own. Your client wants to convert the ground floor into a small bookkeeping office that would see occasional walk-in clients. A homeowner three doors down, whose own deed also carries the covenant, is threatening to sue to enforce it, even though two other houses on the same street have operated small home businesses for years without any neighbor objecting. Your client wants to know whether a restriction never personally negotiated still binds them, and whether the unenforced history on the street changes the answer.",
    keyIssues: [
      "Whether a restrictive covenant recorded in the chain of title runs with the land and binds a purchaser who never personally agreed to it",
      "Whether the neighbor three doors down has standing to enforce a covenant benefiting the whole subdivision, without owning the parcel immediately next to your client's",
      "Whether the unenforced history of other home businesses on the street amounts to a waiver or abandonment of the covenant generally, or only as to those specific properties",
      "What relief, if any, is realistically available against your client's planned use given these two live uncertainties",
    ],
    expectedConcepts: [
      "restrictive covenant",
      "covenant running with the land",
      "privity and the burdened/benefited estate",
      "waiver / abandonment of a covenant",
      "equitable servitude",
    ],
    modelApproach:
      "A strong answer does not treat 'I never agreed to this' as a real defense once a covenant properly runs with the land through the recorded chain of title; it instead focuses on whether the long pattern of unenforced home businesses on the street amounts to a genuine waiver or abandonment of the covenant generally, not just a one-off tolerance of those specific neighbors. It separately checks whether the enforcing neighbor actually holds a benefited interest entitled to enforce the restriction before assuming any neighbor on the street automatically can.",
    furtherReading: [
      "Covenants running with the land and the touch-and-concern requirement",
      "Equitable servitudes and enforcement by non-adjacent benefited owners",
      "Waiver and abandonment of restrictive covenants through a pattern of non-enforcement",
    ],
    premium: true,
    testsFundamentals: ["law-property-covenants-running-with-land", "law-property-registration-priority"],
  },
  {
    id: "law-property-mold-habitability-rent-withholding",
    profession: "law",
    category: "Property Law",
    title: "Mold, a Broken Heater, and Withheld Rent",
    scenario:
      "Your client, a residential tenant, has reported a persistent mold problem in the bathroom and a broken heating system to the landlord's property manager six times over four months, with text messages and photographs as evidence, but no repair has been made. Overnight indoor temperatures have dropped as low as 12 degrees. Your client stopped paying rent entirely for the last two months, reasoning the unit is not worth paying for in its current state, and the landlord has now sent a notice threatening eviction for nonpayment. Your client insists the broken heater and mold justify withholding rent entirely, while the landlord argues nonpayment is nonpayment regardless of the premises' condition and that your client should have paid in full and sued separately for damages. You need to advise your client on the strength of the withholding strategy and the realistic risk it carries.",
    keyIssues: [
      "Whether the landlord's prolonged failure to repair the heating system and address the mold breaches an implied duty to deliver and maintain habitable premises",
      "Whether withholding all rent is a legally available remedy for a habitability breach, or over-reaches what the law actually permits compared to abatement, escrow, or a capped repair-and-deduct right",
      "What documentation would make your client's habitability claim strongest if the landlord's eviction notice proceeds",
      "The realistic risk that withholding too much, or withholding without following the correct procedure, could itself leave your client vulnerable to eviction despite a genuine habitability problem",
    ],
    expectedConcepts: [
      "implied warranty of habitability",
      "constructive eviction",
      "rent withholding versus repair-and-deduct",
      "rent abatement",
      "retaliatory eviction protection",
    ],
    modelApproach:
      "A strong answer does not simply validate the instinct that a bad-enough unit justifies paying nothing at all; it tests whether the governing system actually allows full withholding, partial abatement, escrow, or only a repair-and-deduct right capped at a modest amount, since getting this wrong can turn a strong habitability claim into a losing nonpayment eviction case. It treats the tenant's documentation, dated photos, repair requests, and the landlord's own months of inaction, as the asset that will decide the case, and flags retaliatory-eviction protections as a separate safeguard worth raising given the timing of the eviction notice.",
    furtherReading: [
      "The implied warranty of habitability and available tenant remedies compared across systems",
      "Repair-and-deduct and rent-escrow procedures as alternatives to full rent withholding",
      "Retaliatory eviction protections following a tenant's repair complaint",
    ],
    premium: true,
    testsFundamentals: ["law-property-habitability-repair", "law-property-eviction-procedure"],
  },
  {
    id: "law-property-landlord-changed-locks",
    profession: "law",
    category: "Property Law",
    title: "The Landlord Who Changed the Locks",
    scenario:
      "Your client, a tenant of three years, fell eleven days behind on rent for the first time ever, during a short gap between jobs. Without filing any court action or giving any eviction notice, the landlord entered the unit while your client was at a job interview, changed the locks, moved your client's furniture into a storage unit, and re-listed the apartment for rent, informing your client only afterward by text that they were 'evicted for nonpayment' and that the security deposit, equal to one month's rent, would be kept in full to cover 'the inconvenience.' Your client wants back into the unit and wants to know whether the lockout was lawful and what can be done about the deposit, with the landlord already showing the unit to prospective new tenants.",
    keyIssues: [
      "Whether a landlord may ever lawfully remove a tenant from possession without using the required judicial or administrative eviction procedure, regardless of how clearly the tenant was in arrears",
      "What remedies, including immediate reinstatement and damages, are available against a landlord who used self-help instead of the lawful procedure",
      "Whether keeping the full security deposit for 'inconvenience' is a permissible deduction, or exceeds what deposit rules actually allow",
      "Practical urgency: what interim relief can get the tenant back into the unit quickly given the removed furniture and the active re-listing",
    ],
    expectedConcepts: [
      "prohibition on landlord self-help",
      "unlawful lockout",
      "lawful eviction procedure",
      "security deposit deduction limits",
      "damages for wrongful eviction",
    ],
    modelApproach:
      "A strong answer treats the self-help lockout as the dominant issue regardless of whether the tenant was genuinely in arrears, since most systems require a landlord to use the lawful eviction procedure and flatly prohibit removing a tenant or their belongings without it, however justified the underlying nonpayment claim might be. It separately tests the deposit deduction against whatever specific, permitted categories of deduction actually exist, rather than accepting 'inconvenience' as a valid category on its own, and treats urgent reinstatement as the client's most pressing need given the re-listing already under way.",
    furtherReading: [
      "The prohibition on landlord self-help and lawful eviction procedure requirements",
      "Remedies and statutory penalties for an unlawful lockout",
      "Permitted and impermissible deductions from a security deposit",
    ],
    premium: true,
    testsFundamentals: ["law-property-eviction-procedure", "law-property-security-deposit-rules"],
  },
  {
    id: "law-property-inherited-house-partition",
    profession: "law",
    category: "Property Law",
    title: "Three Siblings, One House, No Agreement",
    scenario:
      "Three siblings inherited their late mother's house in equal shares, with no provision in the will directing what should happen to it. Two of your clients want to sell it and split the proceeds; the third sibling wants to keep it in the family and live there, offering to buy out the other two at a price based on an old tax assessment well below current market value. Your clients have received a credible outside offer at a significantly higher price, but the resident sibling refuses to cooperate with a sale, has not changed the locks but has stopped responding to calls about scheduling showings, and the formal transfer of title into the three heirs' names has still not been completed at the registry even though probate closed eight months ago. You need to advise your two clients on their options.",
    keyIssues: [
      "Whether a co-owner who refuses to cooperate in a sale can be compelled to sell through a forced partition action, and what triggers that remedy",
      "Whether partition would realistically proceed in kind, physically dividing the property, or by sale, given the nature of a single house",
      "How the stalled formal transfer of title into the three heirs' names affects anyone's ability to sell or force partition in the meantime",
      "Whether the resident sibling's buyout offer at the old assessed value is relevant to a partition proceeding, or only to a separate negotiated resolution outside it",
    ],
    expectedConcepts: [
      "co-ownership / tenancy in common",
      "partition in kind versus partition by sale",
      "forced sale among co-owners",
      "completing a transfer of title following inheritance",
      "fair market value in a buyout",
    ],
    modelApproach:
      "A strong answer treats partition by forced sale, not partition in kind, as the realistic remedy for a single house that cannot sensibly be physically divided among three owners, and explains that any one co-owner generally has the right to force that outcome rather than remaining indefinitely blocked by a holdout. It flags the incomplete transfer of title into the heirs' names as a practical prerequisite that needs resolving before any sale or partition filing can proceed cleanly, and treats the resident sibling's lowball buyout offer as a negotiating position rather than something a partition proceeding would actually have to accept.",
    furtherReading: [
      "Partition in kind versus partition by sale among co-owners",
      "Forced sale remedies for a non-cooperating co-owner",
      "Completing the formal transfer of inherited real property into heirs' names",
    ],
    premium: true,
    testsFundamentals: ["law-property-co-ownership-partition", "law-property-transfer-formalities"],
  },
  {
    id: "law-property-second-mortgage-priority-dispute",
    profession: "law",
    category: "Property Law",
    title: "Two Lenders, One Property, and a Missed Filing",
    scenario:
      "Your client, a bank, lent a small manufacturing company a significant sum secured by a mortgage over the company's factory building, but an internal paperwork backlog meant the mortgage was not registered at the land registry until five months after the loan closed. During that window, the company borrowed again from a second lender, which registered its own mortgage over the same building immediately and says it had no actual knowledge of your client's unregistered loan. The company has now defaulted on both loans, and the building's sale value is enough to satisfy only one lender in full. Your client argues its loan came first in time and should be paid first; the second lender argues its registered mortgage has priority since your client never perfected its own interest until after the second lender's was already on record. You need to advise your client on the strength of its position.",
    keyIssues: [
      "Whether priority between competing mortgages is governed by the order of registration or the order the loans were actually made, and which rule the governing system actually follows",
      "Whether the second lender's lack of actual knowledge of the unregistered mortgage matters to the priority analysis, or whether registration alone is dispositive regardless of knowledge",
      "What your client's realistic recovery looks like if the priority claim fails, including any claim against the borrower or against whoever caused the registration delay",
      "Whether the late registration can cure the gap retroactively, or only establishes priority from the date it was actually filed",
    ],
    expectedConcepts: [
      "mortgage perfection and registration",
      "first-in-time versus first-to-register priority",
      "constructive notice through registration",
      "foreclosure proceeds distribution",
      "negligent loan administration",
    ],
    modelApproach:
      "A strong answer does not assume your client wins simply because its loan came first; it identifies whether the governing system treats registration, not the date of the underlying loan, as what actually establishes priority, which would leave your client, despite lending first, subordinate to a lender who registered first and had no notice of the earlier unregistered interest. It separately identifies your client's realistic fallback, pursuing the borrower directly or examining whether the internal delay created a separate claim, rather than treating the priority fight as the only avenue to recovery.",
    furtherReading: [
      "Mortgage perfection and registration requirements",
      "First-in-time versus first-to-register priority rules compared across systems",
      "Distribution of foreclosure proceeds among competing secured creditors",
    ],
    premium: true,
    testsFundamentals: ["law-property-mortgage-secured-interest", "law-property-priority-foreclosure"],
  },
  {
    id: "law-property-removed-restaurant-equipment",
    profession: "law",
    category: "Property Law",
    title: "The Walk-In Cooler the Tenant Took",
    scenario:
      "A restaurant tenant's ten-year commercial lease expired without renewal, and on moving out, the tenant removed a large custom walk-in cooler and a built-in ventilation hood system, both installed by the tenant early in the tenancy and bolted into the building's structure, cutting through drywall to extract them and leaving visible damage behind. Your client, the landlord, says both items became part of the building and had to stay; the tenant says it paid for and installed both items for its own business needs and was entitled to take them, noting the lease never specifically mentioned either item. Your client also wants to charge the tenant for the removal damage and for lost rent while the space sits unusable until repaired. You need to advise your client on what it can actually recover.",
    keyIssues: [
      "Whether the cooler and ventilation hood became fixtures that pass with the building regardless of who paid for or installed them, or remained the tenant's removable trade fixtures",
      "What factors, including the method of attachment, adaptation to the specific space, and the parties' apparent intent, actually govern that classification where the lease itself is silent",
      "Whether a tenant removing a true trade fixture still owes damages for the physical harm the removal caused to the building, even if removal itself was lawful",
      "What your client can recover for lost rent during repair, and how that interacts with the fixture question",
    ],
    expectedConcepts: [
      "fixtures versus trade fixtures",
      "method and permanence of annexation",
      "duty to repair damage caused by removal",
      "lost rent / holdover damages",
      "silence of the lease on ownership of improvements",
    ],
    modelApproach:
      "A strong answer does not treat 'bolted to the structure' as automatically decisive; it works through the recognized factors for classifying an item as a fixture versus a removable trade fixture, including whether the item was installed to serve the tenant's specific trade and was reasonably capable of removal without destroying the building. It separately holds that even a tenant with a genuine right to remove a trade fixture still owes for the actual damage the removal caused, since a right to take the item is not a license to leave the space damaged.",
    furtherReading: [
      "Fixtures versus trade fixtures and the tests courts use to classify an item",
      "A tenant's right to remove trade fixtures and the duty to repair resulting damage",
      "Lease silence on improvements and the default allocation of ownership",
    ],
    premium: true,
    testsFundamentals: ["law-property-fixtures-chattels"],
  },
  {
    id: "law-property-wrong-lot-garage",
    profession: "law",
    category: "Property Law",
    title: "The Garage Built on the Wrong Lot",
    scenario:
      "Your client bought a vacant lot and, relying on an old, inaccurate fence line, built a substantial detached garage believing in good faith the lot extended to the fence. A new survey, commissioned by the neighboring lot's new owner, who bought the adjoining parcel only months ago, now shows the garage sits almost entirely on the neighbor's legal lot, with roughly 85 percent of its footprint over the line. Neither side acted in bad faith: your client genuinely believed, based on decades-old fencing, that the land was theirs, and the new neighbor had no reason to know about the encroachment before the survey. The new neighbor wants the garage removed and the land returned. Your client, having spent considerable money, wants to know whether there is a path to keep the garage, or at least be compensated instead of facing a forced tear-down.",
    keyIssues: [
      "What rights, if any, a good-faith possessor who mistakenly builds on another's land has against a forced removal of the improvement",
      "Whether the landowner is limited to removal, or can instead be required to accept compensation, or sell the encroached strip, where removal would be disproportionately destructive",
      "How the good faith of both the builder and the new, unaware neighbor affects the balance of equities between forced removal and a compensation-based resolution",
      "What role the recent sale to the new neighbor plays, given the new neighbor did not create the situation and did not necessarily buy at a price discounted for the encroachment",
    ],
    expectedConcepts: [
      "good-faith improver / builder in good faith",
      "disproportionate removal versus compensation",
      "balance of equities between landowner and improver",
      "encroachment remedies",
      "knowledge and good faith of a subsequent purchaser",
    ],
    modelApproach:
      "A strong answer does not default to an automatic tear-down just because the garage sits on someone else's legal parcel; it tests whether the builder's good faith and the severity of the mismatch between removal cost and the landowner's actual loss justify a compensation-based resolution, such as a forced sale or easement over the encroached strip, instead of literal removal. It treats the new neighbor's own good faith and lack of involvement in creating the problem as relevant to fashioning a fair remedy, not as grounds to simply let the earlier builder's mistake stand unaddressed.",
    furtherReading: [
      "Good-faith improver doctrine and remedies short of forced removal",
      "Balancing equities between an encroaching improver and the true landowner",
      "Encroachment resolutions: compensation, forced sale of the strip, or removal",
    ],
    premium: true,
    testsFundamentals: ["law-property-good-faith-improver", "law-property-possession-vs-ownership"],
  },
  {
    id: "law-property-warehouse-fire-before-closing",
    profession: "law",
    category: "Property Law",
    title: "The Warehouse That Burned Before Closing",
    scenario:
      "Your client agreed to buy a warehouse, with closing, the final transfer of title and payment, scheduled six weeks after signing to allow time to arrange financing. Three weeks after signing but before closing, an electrical fault caused a fire that destroyed roughly 60 percent of the warehouse, through no fault of either party. The seller's insurance will pay out, but the policy names only the seller as the insured. The seller wants to proceed to closing at the full original price, arguing your client agreed to buy 'the warehouse as described' and bears the risk once a binding contract existed. Your client wants out of the deal entirely, or a steep price reduction, arguing it never agreed to buy a half-destroyed building and that the risk should stay with whoever still held title and insured the property when the fire happened. You need to advise your client.",
    keyIssues: [
      "Which party bears the risk of loss between signing the sale contract and completing the transfer, under the doctrine or default rule the governing system actually applies",
      "Whether the seller's exclusive insurance coverage at the time of the fire is relevant to, or even decisive of, who should bear the uncompensated loss",
      "Whether your client can walk away from the deal entirely, or is limited to a price adjustment reflecting the damage",
      "What specific contract language, a risk-of-loss clause, would have avoided this dispute, and whether its absence here favors either side by default",
    ],
    expectedConcepts: [
      "risk of loss between contract and closing",
      "equitable conversion",
      "insurable interest",
      "price abatement for property damage",
      "risk-of-loss clauses",
    ],
    modelApproach:
      "A strong answer identifies which default rule actually governs this gap, since legal systems differ sharply on whether risk passes to the buyer at signing or stays with the seller until closing and transfer of title, and that threshold choice decides most of the rest of the analysis. It treats the seller's exclusive insurance coverage as a strong practical argument for leaving the risk on the seller, even where the formal default rule might say otherwise, and is realistic that the buyer's best outcome is often a negotiated price reduction or a contractual right to walk away, rather than an automatic entitlement to either.",
    furtherReading: [
      "Risk of loss between contract formation and closing in real property sales",
      "Equitable conversion and its effect on risk allocation",
      "Risk-of-loss clauses and their role in allocating uninsured property damage before closing",
    ],
    premium: true,
    testsFundamentals: ["law-property-risk-of-loss-transfer", "law-property-transfer-formalities"],
  },
  {
    id: "law-property-condo-assessment-dispute",
    profession: "law",
    category: "Property Law",
    title: "The Special Assessment for a Roof Nobody Agreed To",
    scenario:
      "A condominium association's board approved a special assessment of 18,000 per unit to replace the building's roof after a structural engineer's report found it at risk of failure within two years, without putting the decision to a vote of the full ownership as the association's own governing rules arguably require for expenditures above a certain threshold. Your client, an owner who is current on regular dues, refuses to pay the special assessment, arguing the board exceeded its authority by skipping the required ownership vote, while the board argues the roof's condition created an emergency that justified acting without delay. The association is now threatening to place a lien on your client's unit for the unpaid assessment. You need to advise your client on the strength of challenging both the assessment's validity and the threatened lien.",
    keyIssues: [
      "Whether the board's emergency justification is strong enough to bypass whatever ownership-vote threshold normally governs an expenditure of this size",
      "Whether a successful procedural challenge to the assessment's approval voids the charge entirely or only delays it until a proper vote is held",
      "Whether the association can lawfully place a lien on a single owner's unit for an unpaid assessment, and what procedural steps must precede that",
      "The practical tension between challenging the assessment and continuing to benefit from, and eventually needing, the roof repair itself regardless of how the vote dispute resolves",
    ],
    expectedConcepts: [
      "condominium governance / board authority",
      "special assessment approval requirements",
      "association lien rights",
      "emergency exception to ordinary governance procedure",
      "common area repair obligations",
    ],
    modelApproach:
      "A strong answer does not treat the roof's genuine urgency as automatically curing a procedural shortcut; it tests the board's emergency justification against the specific threshold the association's own governing rules set for bypassing a vote, and treats a successful challenge as likely to delay and require a proper vote rather than eliminate the owner's ultimate obligation to contribute to a repair every owner will eventually need. It separately checks the lien procedure's own prerequisites before conceding the association can simply attach the unit over a disputed, unresolved assessment.",
    furtherReading: [
      "Condominium association governance and the board's authority to approve special assessments",
      "Association lien rights and the procedure required before attaching a unit",
      "Emergency exceptions to ordinary condominium governance procedure",
    ],
    premium: true,
    testsFundamentals: ["law-property-condominium-common-areas", "law-property-co-ownership-partition"],
  },
  {
    id: "law-property-unauthorized-sublease-short-term-rental",
    profession: "law",
    category: "Property Law",
    title: "The Tenant Running a Short-Term Rental",
    scenario:
      "Your client, a landlord, leased a residential apartment under a two-year lease prohibiting 'assignment or subletting of any kind without the landlord's prior written consent.' Your client discovered, after a building neighbor complained about unfamiliar guests coming and going with luggage, that the tenant has for five months been listing the apartment on a short-term rental platform whenever away for more than a few days, hosting paying guests for stretches of two to ten nights, without ever asking your client. The tenant argues hosting short-term guests is not really a 'sublease' at all, just letting paying visitors stay temporarily while the tenant retains the apartment and intends to return, and that the clause was only meant to stop a full, permanent handover to a new long-term occupant. You need to advise your client on whether this conduct breaches the lease and what can be done about it.",
    keyIssues: [
      "Whether short-term paying occupancy by guests who never intend to stay permanently counts as a sublease, or an assignment, within the meaning of a clause barring both, or is better characterized as merely licensing temporary guests",
      "Whether the clause's broad 'of any kind' language forecloses the tenant's narrower reading limiting it to a full, permanent handover",
      "What remedies, including termination, damages for the platform income earned, and an injunction against continuing, are available if the conduct is a breach",
      "Whether your client's delay in discovering and acting on five months of this conduct affects the available remedies",
    ],
    expectedConcepts: [
      "sublease versus license",
      "no-subletting / no-assignment clauses",
      "unauthorized subletting as a lease violation",
      "disgorgement of unauthorized rental income",
      "waiver through delayed enforcement",
    ],
    modelApproach:
      "A strong answer tests the tenant's 'it's just hosting guests' argument against what actually distinguishes a sublease or assignment from a mere license, whether the occupant has an independent right to exclusive possession for a defined period in exchange for payment, which repeated paying short-term stays through a rental platform generally does establish, regardless of how temporary any single booking is. It reads the clause's broad 'of any kind' language as covering exactly this kind of recurring, income-generating arrangement rather than only a single permanent handover, and separately asks whether the landlord's five-month delay in discovering and objecting undermines, or simply reflects the practical difficulty of detecting, the violation.",
    furtherReading: [
      "Distinguishing a sublease or assignment from a license to occupy",
      "Enforceability and scope of no-subletting and no-assignment lease clauses",
      "Remedies for unauthorized short-term subletting, including disgorgement of rental income",
    ],
    premium: true,
    testsFundamentals: ["law-property-leasehold-assignment-sublease", "law-property-lease-formation-license-distinction"],
  },
];
