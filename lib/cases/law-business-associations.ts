import type { CaseStudy } from "@/lib/caseStudyContent";
import type { Fundamental } from "@/lib/caseStudyFundamentals";

/**
 * Law / Business Associations: the fundamentals checklist and the case bank
 * for this category, kept together so they can be written and reviewed as
 * one unit. Registered in lib/cases/index.ts.
 *
 * Scope note: this category is the entity-LAW layer that sits *before*
 * Corporate & Compliance (lib/cases/law-corporate-compliance.ts), which
 * assumes a company already exists and is being governed/regulated. This
 * category instead covers choice of entity, the formal requirements and
 * consequences of forming each entity type, capital contribution and
 * ownership-interest rules, partner/member/shareholder default rights and
 * liability as a matter of entity-type status (not governance practice),
 * entity conversion/merger/demerger as formal legal transactions, and
 * dissolution/winding-up/liquidation. Where a scenario could plausibly sit
 * in either category, these cases turn on identifying what TYPE of legal
 * person exists and what law automatically attaches to that type, not on
 * whether a director/officer did their job properly.
 *
 * Scenarios are written to be jurisdiction-neutral: the same case text is
 * shown to users in the US, Germany, France, Spain, and Sweden (machine
 * translated at runtime), and an AI grader evaluates the answer against
 * whichever country's legal system the user is in. No case names a specific
 * statute, court, or regulator that only exists in one of those systems.
 */
export const LAW_BUSINESS_ASSOCIATIONS_FUNDAMENTALS: Fundamental[] = [
  { id: "law-bizassoc-entity-choice", label: "Choosing among partnership, private limited company, public corporation, cooperative, and nonprofit/non-stock association based on liability exposure, formality, and capital-raising needs" },
  { id: "law-bizassoc-separate-legal-personality", label: "Determining whether an entity has separate legal personality distinct from its members, and what follows from that distinction as a matter of status rather than conduct" },
  { id: "law-bizassoc-formation-formalities", label: "Identifying the formal requirements (registration, charter/articles, notarization or equivalent) that bring an entity into legal existence, and the consequences of a defect in any one of them" },
  { id: "law-bizassoc-capital-contribution", label: "Applying the rules governing what counts as a validly paid-in capital contribution (cash, in-kind property, services) at formation" },
  { id: "law-bizassoc-capital-maintenance", label: "Applying minimum-capital and capital-maintenance rules that protect creditors and the consequences of capital impairment" },
  { id: "law-bizassoc-ownership-interest-transfer", label: "Determining the default transferability of an ownership interest (shares, partnership interest, membership interest) absent a specific agreement to the contrary" },
  { id: "law-bizassoc-general-partner-liability", label: "Determining when and how a partner's personal liability for the entity's own debts attaches as a matter of that entity type's default legal rule" },
  { id: "law-bizassoc-limited-partner-control-rule", label: "Assessing when a limited partner or passive investor loses a liability shield by crossing into management/control of the entity" },
  { id: "law-bizassoc-member-default-rights", label: "Identifying the default voting, information, and distribution rights a partner, member, or shareholder holds absent a specific governing agreement" },
  { id: "law-bizassoc-minority-exit-appraisal", label: "Assessing a minority owner's statutory exit, appraisal, or buyout rights arising from their ownership status, independent of any claim about how the entity is being run" },
  { id: "law-bizassoc-entity-authority-vs-member-authority", label: "Distinguishing an entity's own legal capacity to act from an individual member's or partner's authority to bind it" },
  { id: "law-bizassoc-cooperative-structure", label: "Applying the distinctive membership, voting, and patronage structure of a cooperative entity" },
  { id: "law-bizassoc-nonprofit-nonstock-structure", label: "Applying the non-distribution constraint and membership structure that distinguishes a nonprofit/non-stock association from an ownership-based entity" },
  { id: "law-bizassoc-entity-conversion", label: "Applying the legal requirements and effects of converting one entity type into another while preserving (or not preserving) the entity's legal identity" },
  { id: "law-bizassoc-merger-demerger-succession", label: "Applying the formal requirements and legal consequences (universal succession, creditor protection) of a merger or demerger between entities" },
  { id: "law-bizassoc-dissolution-grounds", label: "Identifying the grounds on which an entity is dissolved (voluntary resolution, judicial order, automatic operation of law)" },
  { id: "law-bizassoc-winding-up-priority", label: "Applying the statutory order of priority for paying creditors and distributing any remaining assets during winding-up and liquidation" },
  { id: "law-bizassoc-defective-formation-liability", label: "Assessing who is personally liable for acts taken in the name of an entity that was never validly formed or whose formation was defective" },
];

export const LAW_BUSINESS_ASSOCIATIONS_CASES: CaseStudy[] = [
  {
    id: "law-bizassoc-cofounders-entity-choice",
    profession: "law",
    category: "Business Associations",
    title: "Three Founders, One Form to Choose",
    scenario:
      "Three friends want to start a specialty food-import business together. One will contribute most of the starting cash, one will contribute an existing supplier network and some equipment but little cash, and the third will work full-time running daily operations but contribute no capital at all. They disagree about personal liability exposure if the business fails, about whether they need a formal charter and registration before they can start signing supplier contracts, and about how easy it will be later to bring in a fourth investor or sell out entirely. They've asked you, before they sign anything, which type of entity actually fits what they're trying to do and why.",
    keyIssues: [
      "Matching the founders' differing liability tolerance to the personal-liability exposure each entity type carries by default",
      "Whether the business can begin operating and signing contracts before formal registration/chartering is complete, and what happens to acts taken in the meantime",
      "How the mismatch between cash, in-kind, and pure-labor contributions should be reflected in ownership interests under each entity type's default rules",
      "Which entity type most easily accommodates bringing in a future outside investor or allowing a founder to exit",
    ],
    expectedConcepts: [
      "entity choice",
      "limited liability",
      "formation formalities",
      "capital contribution",
      "transferability of ownership interest",
    ],
    modelApproach:
      "A strong answer does not reach for one entity type reflexively — it walks through the founders' actual risk tolerance, their need (or lack of it) to raise outside capital later, and the mismatch in what each is contributing, and matches those facts to the liability and formality profile of each available entity type. It flags concretely that operating before formal registration exposes the founders personally for pre-formation acts, and that the pure-labor contributor's ownership stake needs to be fixed explicitly rather than left to default rules that assume contributions are capital.",
    furtherReading: [
      "Comparative choice-of-entity frameworks for closely held businesses",
      "Personal liability for pre-incorporation/pre-registration contracts",
      "Default ownership allocation where founders' contributions are unequal in kind",
    ],
    testsFundamentals: ["law-bizassoc-entity-choice", "law-bizassoc-capital-contribution", "law-bizassoc-formation-formalities"],
  },
  {
    id: "law-bizassoc-partner-personal-liability",
    profession: "law",
    category: "Business Associations",
    title: "The Partnership Debt Nobody Signed For",
    scenario:
      "Two professionals have run an unincorporated general partnership for eight years with no written partnership agreement beyond a one-page note splitting profits evenly. One partner, without telling the other, ordered a large quantity of equipment on credit in the partnership's name for a side project that never generated revenue. The supplier, now unpaid, is pursuing both partners personally for the full amount, and the partner who didn't place the order insists he should not be liable for a debt he never approved and never personally benefited from. They want to know whether that argument holds up, and what, if anything, would have protected the uninvolved partner from this kind of exposure.",
    keyIssues: [
      "Whether a partner's lack of personal knowledge or consent shields them from liability for a debt incurred in the partnership's name",
      "Whether the ordering partner had actual or apparent authority to bind the partnership — and therefore the other partner — to the supplier",
      "What the default liability rule for general partnership debts actually is, absent any agreement changing it",
      "What structural choices, a different entity type or an internal agreement, would have limited this exposure going forward",
    ],
    expectedConcepts: [
      "general partnership",
      "joint and several liability",
      "partner authority to bind the firm",
      "default liability rules",
      "unlimited personal liability",
    ],
    modelApproach:
      "A strong answer is direct that general partnership debt liability does not turn on whether a partner personally approved or benefited from a given transaction — it turns on whether the acting partner had authority to bind the firm, and once that is established, liability for the resulting debt is typically personal and joint for each partner regardless of internal arrangements between them. It explains concretely what would have limited this exposure (a limited-liability entity form, or at minimum an internal agreement restricting an individual partner's contracting authority above a threshold) without pretending that an internal agreement alone would have protected the partner from the supplier itself.",
    furtherReading: [
      "General partnership liability and a partner's authority to bind the firm",
      "Joint and several liability among general partners",
      "Limiting an individual partner's contracting authority by internal agreement",
    ],
    testsFundamentals: ["law-bizassoc-general-partner-liability", "law-bizassoc-entity-authority-vs-member-authority", "law-bizassoc-separate-legal-personality"],
  },
  {
    id: "law-bizassoc-limited-partner-control-rule",
    profession: "law",
    category: "Business Associations",
    title: "The Investor Who Started Running the Show",
    scenario:
      "A limited partnership was formed to develop and operate a mid-sized rental property, with one general partner managing daily operations and two limited partners who contributed capital but were explicitly meant to stay passive. After the general partner fell ill, one limited partner began personally negotiating with tenants, approving maintenance contracts, and directing staff for several months without any amendment to the partnership's governing documents. The property now faces a large liability claim from a contractor who was never paid, and the contractor's lawyer is arguing that the involved limited partner should be treated as personally liable just like the general partner. The limited partner argues she only stepped in temporarily and informally, and that her liability should still be capped at her capital contribution.",
    keyIssues: [
      "Whether the limited partner's hands-on involvement in management crossed the line that normally preserves a limited partner's liability shield",
      "Whether temporary, informal involvement is treated any differently from a formal change in role",
      "What the contractor would need to show to hold the limited partner personally liable for this specific debt",
      "Whether the other limited partner, who remained entirely passive, is affected by the first limited partner's conduct",
    ],
    expectedConcepts: [
      "limited partnership",
      "control rule",
      "liability shield",
      "passive versus active investor",
      "limited partner exposure",
    ],
    modelApproach:
      "A strong answer explains that a limited partner's liability shield is generally conditioned on staying out of the entity's management and control, not on the formality or duration of their involvement, and that months of hands-on operational decisions plausibly crosses that line regardless of how the limited partner characterizes her own intentions. It keeps the two limited partners' positions analytically separate, since one partner's loss of the shield does not automatically affect a co-investor who never participated in management at all.",
    furtherReading: [
      "The control rule and loss of a limited partner's liability shield",
      "Comparative approaches to safe-harbor management activities for limited partners",
      "Liability exposure for one limited partner versus a passive co-investor in the same partnership",
    ],
    testsFundamentals: ["law-bizassoc-limited-partner-control-rule", "law-bizassoc-member-default-rights", "law-bizassoc-general-partner-liability"],
  },
  {
    id: "law-bizassoc-minority-member-default-rights",
    profession: "law",
    category: "Business Associations",
    title: "The Silent Operating Agreement",
    premium: true,
    scenario:
      "Three people formed a private limited company together two years ago to run a small manufacturing operation, each holding roughly equal ownership interests, but they never adopted any written governing agreement beyond the bare minimum needed to register the company. Two of the three owners, who are also the company's managers, have been making all major decisions, including setting their own salaries and deciding not to distribute any profits, without ever formally consulting the third owner. The third owner, who holds no management role, wants to know what rights she actually has by default: whether she is entitled to see the company's financial records, whether she has any say over the decisions being made without her, and whether she can force a distribution of the profits being retained.",
    keyIssues: [
      "What voting, information, and distribution rights a non-managing minority owner holds by default when no governing agreement addresses them",
      "Whether setting managers' own salaries and withholding distributions requires the minority owner's consent absent a specific rule",
      "What the minority owner would actually need to show to compel inspection of financial records or a distribution",
      "How the answer would change if the entity were structured differently, for instance with a formal board or shareholder-meeting requirement",
    ],
    expectedConcepts: [
      "default member rights",
      "information/inspection rights",
      "distribution rights",
      "minority ownership",
      "governing-agreement gap-filling",
    ],
    modelApproach:
      "A strong answer does not treat the absence of a written agreement as leaving the minority owner with no rights at all — it identifies the specific default rights, reasonable access to financial records being the most commonly guaranteed, that typically fill the gap when the owners never wrote their own rules, while being candid that default voting and distribution rights are often considerably weaker protection than a negotiated agreement would have provided.",
    furtherReading: [
      "Default statutory rights of a minority owner absent a governing agreement",
      "Inspection and information rights in closely held entities",
      "Distribution rights and the limits of managerial discretion to retain earnings",
    ],
    testsFundamentals: ["law-bizassoc-member-default-rights", "law-bizassoc-ownership-interest-transfer", "law-bizassoc-entity-authority-vs-member-authority"],
  },
  {
    id: "law-bizassoc-minority-shareholder-exit",
    profession: "law",
    category: "Business Associations",
    title: "Locked In With No Buyer",
    premium: true,
    scenario:
      "A minority shareholder holding a fifteen percent stake in a closely held private company wants out entirely. The majority owners, who are also the only active managers, have made clear they have no interest in buying her out, there is no outside market for shares in a company this size, and the company's charter says nothing about any right to force a sale or exit. She is not alleging anyone did anything wrong — she simply no longer wants to hold an illiquid minority stake in a business she has no influence over and receives no distributions from. She wants to know whether entity law gives her any path to cash out of her ownership position at all, separate from any claim about mismanagement.",
    keyIssues: [
      "Whether minority ownership status alone, without any allegation of wrongdoing, gives rise to any statutory exit, appraisal, or buyout right",
      "What triggering events, a merger, a fundamental change, a specific statutory oppression remedy, would be needed to create an exit right where none otherwise exists",
      "The practical reality of valuing and enforcing a forced buyout of a minority stake in a company with no outside market",
      "How this entity-status question differs from a governance complaint about how the majority is running the company",
    ],
    expectedConcepts: [
      "minority exit rights",
      "appraisal remedy",
      "illiquidity of closely held ownership interests",
      "buyout triggers",
      "statutory dissolution as a last resort",
    ],
    modelApproach:
      "A strong answer is honest that bare minority status, without a triggering event or an oppression finding, generally does not by itself create an exit right, and it distinguishes clearly between an appraisal right tied to a specific corporate transaction and a freestanding desire to liquidate an illiquid stake. It identifies what would actually have to happen, a triggering transaction, a negotiated buyout, or in some systems a petition for dissolution as a remedy of last resort, rather than promising a clean exit that the facts do not yet support.",
    furtherReading: [
      "Appraisal rights and their statutory triggers",
      "Minority shareholder exit remedies in closely held companies",
      "Valuation challenges for illiquid minority ownership interests",
    ],
    testsFundamentals: ["law-bizassoc-minority-exit-appraisal", "law-bizassoc-ownership-interest-transfer", "law-bizassoc-dissolution-grounds"],
  },
  {
    id: "law-bizassoc-in-kind-capital-contribution",
    profession: "law",
    category: "Business Associations",
    title: "The Equipment That Wasn't Worth What He Said",
    premium: true,
    scenario:
      "At formation, one of three founders of a new private limited company contributed a piece of specialized machinery in lieu of cash, which the founders collectively valued at a figure well above what an independent appraisal would later show the machinery was actually worth at the time. The company has since run into financial trouble, and a creditor pursuing the company is now arguing that the company's registered capital was never actually fully paid in, since the machinery's true value fell well short of the contribution figure recorded at formation, and that the founders should be personally liable to make up the shortfall. The founders argue they contributed exactly what they agreed to contribute and acted in good faith on their own honest valuation at the time.",
    keyIssues: [
      "Whether an in-kind contribution overvalued relative to its actual worth counts as validly paid-in capital for purposes of the entity's registered capital",
      "Whether good-faith valuation at the time of contribution protects the founders from a later shortfall claim",
      "What exposure the founders face to make up the difference between the claimed and actual value of the contribution",
      "Whether this is a formation-stage capital defect or a separate question about the entity's ongoing solvency",
    ],
    expectedConcepts: [
      "in-kind capital contribution",
      "valuation of non-cash contributions",
      "capital maintenance",
      "shortfall liability",
      "paid-in capital",
    ],
    modelApproach:
      "A strong answer treats the valuation gap as a genuine capital-formation defect rather than excusing it because the founders acted in good faith, since many systems hold contributors liable to make up a contribution shortfall regardless of good faith, precisely to protect the reliability of the registered capital figure creditors are entitled to rely on. It separates this formation-stage question cleanly from any later claim about how the company has been run since.",
    furtherReading: [
      "Valuation requirements for in-kind capital contributions",
      "Shortfall liability for overvalued non-cash contributions",
      "Capital maintenance rules and creditor reliance on registered capital",
    ],
    testsFundamentals: ["law-bizassoc-capital-contribution", "law-bizassoc-capital-maintenance", "law-bizassoc-formation-formalities"],
  },
  {
    id: "law-bizassoc-capital-impairment-trading",
    profession: "law",
    category: "Business Associations",
    title: "Below the Floor and Still Borrowing",
    premium: true,
    scenario:
      "A private limited company's own interim accounts show that losses over the past year have reduced its net assets well below the minimum capital figure that was registered when the company was formed. Rather than raising new capital, reducing distributions, or formally addressing the shortfall, the two owner-managers kept taking out new supplier credit and personally kept drawing the same fixed distributions they had always taken, on the theory that the business would eventually recover. It has not recovered, and the company is now unable to pay several suppliers who extended credit during this period. The suppliers want to know whether the owner-managers can be personally pursued for continuing to draw money out of a company that was, by the numbers, already below its required capital floor.",
    keyIssues: [
      "What consequences attach, as a matter of entity law, to an entity's net assets falling below its registered minimum capital",
      "Whether continuing to take distributions while capital is impaired is itself a basis for personal exposure, separate from any claim about fraud or deliberate concealment",
      "What the owner-managers should have done once the shortfall became apparent",
      "How this differs from an ordinary insolvency/trading analysis focused on the company's ability to pay its debts as they fall due",
    ],
    expectedConcepts: [
      "capital impairment",
      "minimum capital maintenance",
      "unlawful distribution",
      "personal liability for improper distributions",
      "distinguishing capital impairment from cash-flow insolvency",
    ],
    modelApproach:
      "A strong answer treats the capital-impairment question as distinct from, though related to, ordinary insolvent trading: continuing to draw distributions once net assets have fallen below the legally required capital floor is frequently a freestanding basis for personal liability to repay what was improperly distributed, regardless of whether the company was otherwise paying its bills on time. It identifies concretely what the owner-managers should have done once the shortfall was apparent, stopping distributions and addressing the capital shortfall formally, rather than treating the hope of recovery as a defense.",
    furtherReading: [
      "Minimum capital maintenance and the consequences of capital impairment",
      "Personal liability for improper or unlawful distributions",
      "Distinguishing capital-impairment exposure from insolvent-trading liability",
    ],
    testsFundamentals: ["law-bizassoc-capital-maintenance", "law-bizassoc-dissolution-grounds"],
  },
  {
    id: "law-bizassoc-partnership-to-company-conversion",
    profession: "law",
    category: "Business Associations",
    title: "Converting the Firm Into a Company",
    premium: true,
    scenario:
      "Four partners who have run a successful consulting partnership for over a decade now want to convert the business into a private limited company to limit their personal liability going forward and make it easier to eventually bring in outside investors. They have existing client contracts, an office lease, and a handful of employees, and they want to know whether the conversion can simply carry all of that forward automatically under the partnership's existing legal identity, or whether converting actually means winding up the old partnership and starting the new company from scratch, with everything that implies for existing contracts, the lease, and the employees' continuity of service.",
    keyIssues: [
      "Whether an entity conversion preserves the business's legal identity, and therefore its existing contracts, lease, and employment relationships, or legally terminates the old entity and creates a new one",
      "What formal steps the conversion requires to be valid and effective against third parties",
      "Whether counterparties to existing contracts, the landlord, key clients, need to consent to the conversion, or whether it binds them automatically",
      "How liabilities incurred by the partnership before conversion are treated afterward: whether they simply become the new company's liabilities, or whether former partners remain separately exposed",
    ],
    expectedConcepts: [
      "entity conversion",
      "continuity of legal identity",
      "universal succession",
      "pre-conversion liabilities",
      "third-party consent requirements",
    ],
    modelApproach:
      "A strong answer explains that a properly executed conversion typically preserves the business's legal identity rather than terminating one entity and creating a new one, meaning contracts, the lease, and employment relationships generally continue without needing each counterparty's individual consent, but is careful to flag that liabilities incurred while the business operated as a partnership do not simply vanish, and that former general partners may remain personally exposed for pre-conversion debts for a defined period even after the shield formally takes effect going forward.",
    furtherReading: [
      "Legal-form conversion and continuity of legal identity",
      "Treatment of pre-conversion liabilities after a change of entity type",
      "Third-party consent and notice requirements in an entity conversion",
    ],
    testsFundamentals: ["law-bizassoc-entity-conversion", "law-bizassoc-separate-legal-personality", "law-bizassoc-general-partner-liability"],
  },
  {
    id: "law-bizassoc-merger-creditor-objection",
    profession: "law",
    category: "Business Associations",
    title: "The Merger a Creditor Wants to Block",
    premium: true,
    scenario:
      "Two companies have agreed to merge, with one absorbing the other and all of its assets, contracts, and liabilities by operation of law. A creditor of the company being absorbed, owed a substantial sum not yet due for another two years, is worried that the surviving company is in weaker financial health than the one that currently owes the debt, and wants to know whether it has any right to object to or block the merger, or to demand early payment or additional security before the merger can proceed, given that merging will fold its original debtor into a financially different entity than the one it originally agreed to lend to.",
    keyIssues: [
      "What the legal effect of a merger is on liabilities owed by the absorbed company, and whether the surviving entity automatically becomes liable for them by operation of law",
      "What procedural rights a creditor of the absorbed company has to object to a pending merger or demand security before it takes effect",
      "Whether the creditor's original contract terms, including the timing of repayment, are affected by the merger itself",
      "The timeline and mechanics of any creditor-protection procedure that must run before a merger can be finalized",
    ],
    expectedConcepts: [
      "merger",
      "universal succession",
      "creditor protection procedure",
      "assumption of liabilities",
      "pre-merger notice and objection period",
    ],
    modelApproach:
      "A strong answer confirms that a merger generally transfers the absorbed company's liabilities to the surviving entity automatically by universal succession, so the creditor's claim survives intact against the new, combined entity, and separately identifies the specific creditor-protection mechanism, a notice and objection period, or a right to demand security, that exists precisely to let a creditor like this one raise exactly this concern before the merger becomes final, rather than only after.",
    furtherReading: [
      "Universal succession and the effect of a merger on existing liabilities",
      "Statutory creditor-protection procedures preceding a merger",
      "Creditor rights to demand security before a merger takes effect",
    ],
    testsFundamentals: ["law-bizassoc-merger-demerger-succession", "law-bizassoc-separate-legal-personality"],
  },
  {
    id: "law-bizassoc-demerger-liability-split",
    profession: "law",
    category: "Business Associations",
    title: "Splitting the Company, Splitting the Debt",
    premium: true,
    scenario:
      "A single company operating two distinct business lines, one profitable manufacturing division and one struggling retail division, is being split into two separate companies through a formal demerger, with each new company taking over one of the two business lines. A supplier owed money by the original combined company, relating specifically to the struggling retail division, wants to know which of the two resulting companies it can now pursue, especially because the demerger plan allocates that specific debt to the new retail company, which appears to have far fewer assets than the manufacturing company that was carved out alongside it.",
    keyIssues: [
      "Whether a demerger plan's own allocation of a specific liability to one resulting entity is binding on the original creditor, or whether the creditor retains a claim against both resulting entities",
      "What protections exist for a creditor whose debt is allocated to the less financially sound of the two resulting entities",
      "Whether the demerger requires creditor notice or consent before taking effect, given the risk of exactly this kind of allocation",
      "How this differs from a straightforward merger, where liabilities simply follow the single surviving entity",
    ],
    expectedConcepts: [
      "demerger",
      "liability allocation in a division",
      "creditor protection in a demerger",
      "joint liability of resulting entities",
      "partial universal succession",
    ],
    modelApproach:
      "A strong answer does not treat the demerger plan's own internal allocation as automatically conclusive against the creditor — many systems give a creditor whose debt is allocated to the weaker resulting entity a claim against both resulting entities, at least up to a cap, precisely because an internal allocation agreed between the dividing company's own owners should not be able to unilaterally worsen an existing creditor's position. It also flags the notice procedure the demerger should have triggered before taking effect.",
    furtherReading: [
      "Liability allocation and creditor protection in a corporate demerger/division",
      "Joint and several liability of resulting entities after a split",
      "Notice and objection procedures preceding a demerger",
    ],
    testsFundamentals: ["law-bizassoc-merger-demerger-succession", "law-bizassoc-entity-conversion"],
  },
  {
    id: "law-bizassoc-cooperative-voting-rights",
    profession: "law",
    category: "Business Associations",
    title: "One Member, One Vote — Or So He Thought",
    premium: true,
    scenario:
      "A regional agricultural cooperative, owned and used by its member-farmers to jointly process and market their crops, held a vote on a major investment in new processing equipment. One founding member, who supplies a far larger volume of crops to the cooperative than most other members and has always assumed his larger economic stake should carry proportionally more voting weight, was outvoted by a coalition of smaller members despite contributing many times more business volume than any of them individually. He wants to know whether the cooperative's voting structure can lawfully give him the same single vote as a member who supplies a small fraction of what he does, and whether there is any entity-law basis to challenge the result.",
    keyIssues: [
      "Whether a cooperative's default voting structure is based on membership, one member one vote, rather than capital contribution or volume of business, as a matter of that entity type's defining structure",
      "Whether a cooperative can lawfully depart from one-member-one-vote, and if so, how",
      "The relationship between patronage, how much business a member does with the cooperative, and any entitlement to patronage-based returns, as distinct from voting power",
      "Whether the member has any realistic basis to challenge a vote conducted strictly on the cooperative's own one-member-one-vote structure",
    ],
    expectedConcepts: [
      "cooperative entity structure",
      "one member, one vote",
      "patronage versus voting power",
      "member-democratic governance",
      "cooperative bylaws",
    ],
    modelApproach:
      "A strong answer explains that one-member-one-vote is the defining structural feature that actually distinguishes a cooperative from a capital-based entity like a company, so a larger supplier's disproportionate economic contribution does not, by default, translate into disproportionate voting power, and clearly separates voting power from patronage-based financial returns, which can legitimately scale with the volume of business a member does with the cooperative even while voting power stays equal.",
    furtherReading: [
      "The cooperative entity form and one-member-one-vote governance",
      "Patronage dividends versus voting rights in a cooperative",
      "Permissible departures from one-member-one-vote in cooperative bylaws",
    ],
    testsFundamentals: ["law-bizassoc-cooperative-structure", "law-bizassoc-member-default-rights"],
  },
  {
    id: "law-bizassoc-nonprofit-distribution-constraint",
    profession: "law",
    category: "Business Associations",
    title: "The Nonprofit That Wanted to Pay Dividends",
    premium: true,
    scenario:
      "A nonprofit, non-stock association was formed years ago by a group of founding members to run community arts programming, funded by membership dues, grants, and ticket revenue. The association has unexpectedly generated a significant surplus this year after a successful touring exhibition, and several founding members, who serve on its governing council, want to distribute a portion of that surplus to themselves and the other members as a year-end payment, arguing they built the organization from nothing and deserve some return for years of unpaid effort. Other members argue this would fundamentally violate what kind of entity this is supposed to be. You are asked whether the proposed distribution is legally permissible.",
    keyIssues: [
      "Whether a nonprofit/non-stock association can lawfully distribute surplus funds to its own members at all, as a matter of that entity type's defining constraint",
      "What legitimate alternatives exist for compensating members for genuine services rendered without crossing into a prohibited distribution",
      "What happens to a nonprofit association's assets if it is later dissolved, and whether that reinforces the same non-distribution principle",
      "Whether the proposed payment could be restructured as reasonable compensation for services without violating the entity's basic structure",
    ],
    expectedConcepts: [
      "nonprofit/non-stock entity structure",
      "non-distribution constraint",
      "asset lock / dissolution asset transfer requirement",
      "reasonable compensation versus disguised distribution",
      "member versus owner in a nonprofit",
    ],
    modelApproach:
      "A strong answer is direct that a true surplus distribution to members would violate the fundamental, defining legal constraint of this entity type, regardless of how genuinely the founding members earned it through years of unpaid work, and distinguishes that prohibited distribution clearly from legitimate, reasonable compensation for actual services rendered going forward. It also connects the non-distribution constraint to what would happen to the association's assets on dissolution, reinforcing that the entity's assets were never meant to become members' personal property at any point in its life or at its end.",
    furtherReading: [
      "The non-distribution constraint defining nonprofit/non-stock entities",
      "Asset-lock and dissolution requirements for nonprofit associations",
      "Distinguishing reasonable compensation from a disguised distribution to members",
    ],
    testsFundamentals: ["law-bizassoc-nonprofit-nonstock-structure", "law-bizassoc-dissolution-grounds"],
  },
  {
    id: "law-bizassoc-defective-formation-signing",
    profession: "law",
    category: "Business Associations",
    title: "The Contract Signed Before the Company Existed",
    premium: true,
    scenario:
      "Two aspiring business partners signed a significant equipment lease \"on behalf of\" a private limited company they intended to form, weeks before they actually completed the registration process that would bring the company into legal existence. They proceeded to use the equipment under the company's eventual name, but when the business failed a year later and the lease payments stopped, the leasing company discovered the lease had been signed before the company was ever validly formed, and is now pursuing the two individuals personally for the full remaining balance. The individuals argue they always intended the obligation to belong to the company, not to them personally, and that the company did eventually come into existence and used the equipment.",
    keyIssues: [
      "Whether an entity can be bound by a contract signed in its name before it legally existed, and if not, who actually is bound",
      "Whether the entity's later formation and continued use of the equipment amounts to an adoption or ratification of the pre-formation contract that shifts liability onto the company",
      "What the individuals would have needed to do at the time to avoid personal exposure for a pre-formation obligation",
      "Whether the leasing company has a choice of whom to pursue, or whether liability shifted entirely once the company came into existence",
    ],
    expectedConcepts: [
      "pre-formation/pre-incorporation liability",
      "entity authority to act before legal existence",
      "adoption/ratification of a pre-formation contract",
      "personal liability of promoters",
      "formation formalities",
    ],
    modelApproach:
      "A strong answer explains that an entity generally cannot be bound by a contract signed before it legally existed, since it had no legal capacity to act at that moment, which means the individuals who signed \"on behalf of\" the not-yet-formed company were very likely personally bound at the time of signing. It then addresses, as a genuinely separate question, whether the company's subsequent formation and continued use of the equipment could amount to an adoption of the contract that makes the company additionally liable going forward, without assuming that adoption automatically releases the original individual signatories from their own exposure.",
    furtherReading: [
      "Personal liability for contracts signed before an entity's formation",
      "Adoption and ratification of pre-formation contracts by a newly formed entity",
      "Steps to avoid promoter liability before formal registration is complete",
    ],
    testsFundamentals: ["law-bizassoc-defective-formation-liability", "law-bizassoc-formation-formalities", "law-bizassoc-entity-authority-vs-member-authority"],
  },
  {
    id: "law-bizassoc-liquidation-priority-dispute",
    profession: "law",
    category: "Business Associations",
    title: "Who Gets Paid First When the Company Winds Up",
    premium: true,
    scenario:
      "A private limited company has resolved to dissolve voluntarily after its owners decided the business no longer made sense to continue, and a liquidator has been appointed to wind up its affairs. The company's remaining assets, once sold, will not be enough to pay everyone who has a claim: an employee owed several months of unpaid wages, a tax authority owed an outstanding assessment, an unsecured trade supplier owed a large invoice, a bank holding a security interest over specific equipment, and the owners themselves, who want whatever is left after debts are paid. Several of these claimants are each separately insisting they should be paid in full before anyone else gets anything.",
    keyIssues: [
      "The order of priority in which these different categories of claim are actually satisfied during winding-up, and why that order exists",
      "Whether a creditor holding a security interest over specific assets is treated differently from the general pool of unsecured creditors",
      "Whether owners can receive any distribution at all before every other category of claim has been satisfied in full",
      "What happens if even the priority creditors cannot be paid in full given the shortfall",
    ],
    expectedConcepts: [
      "winding-up",
      "liquidation priority",
      "secured versus unsecured creditors",
      "residual claims of owners",
      "pro rata distribution within a priority class",
    ],
    modelApproach:
      "A strong answer walks through the priority order methodically rather than treating every claimant's insistence as equally plausible: a secured creditor is generally satisfied out of its specific collateral ahead of the general distribution process, certain claims like employee wages and tax debts typically receive statutory priority over ordinary unsecured trade creditors, and the owners' residual claim to anything left over only becomes relevant once every higher-priority category has been paid in full, with a shortfall within any one priority class generally shared pro rata among the claimants in that same class rather than resolved on a first-come basis.",
    furtherReading: [
      "Statutory priority of claims in liquidation/winding-up",
      "Secured versus unsecured creditor treatment in insolvent liquidation",
      "Pro rata distribution within a single priority class on a shortfall",
    ],
    testsFundamentals: ["law-bizassoc-winding-up-priority", "law-bizassoc-dissolution-grounds"],
  },
];
