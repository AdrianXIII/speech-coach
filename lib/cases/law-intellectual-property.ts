import type { CaseStudy } from "@/lib/caseStudyContent";
import type { Fundamental } from "@/lib/caseStudyFundamentals";

/**
 * Law / Intellectual Property Law: the fundamentals checklist and the case
 * bank for this category, kept together so they can be written and reviewed
 * as one unit. Registered in lib/cases/index.ts.
 *
 * Every case is written to be jurisdiction-neutral: it must make sense when
 * machine-translated and graded against the US, German, French, Spanish, or
 * Swedish legal system, so it avoids any single country's statutes,
 * registries, or procedural vocabulary in favor of generic doctrine
 * (patentable subject matter, novelty, inventive step, likelihood of
 * confusion, the idea-expression dichotomy, reasonable secrecy measures)
 * that exists, in some recognizable form, across all five.
 */
export const LAW_INTELLECTUAL_PROPERTY_FUNDAMENTALS: Fundamental[] = [
  { id: "law-ip-patent-eligibility", label: "Determining whether an invention is patentable subject matter, as opposed to an unpatentable abstract idea, natural phenomenon, or law of nature" },
  { id: "law-ip-patent-novelty-prior-art", label: "Applying novelty and the prior-art bar, including the effect of the inventor's own pre-filing disclosures" },
  { id: "law-ip-patent-nonobviousness", label: "Applying the inventive-step/non-obviousness standard to a combination of previously known elements" },
  { id: "law-ip-patent-claim-scope-infringement", label: "Construing patent claim scope and applying literal infringement and the doctrine of equivalents to an accused product" },
  { id: "law-ip-patent-exhaustion", label: "Applying patent exhaustion to limit a patent holder's post-sale control over a product it has authorized to be sold, including repair-versus-reconstruction limits" },
  { id: "law-ip-patent-employee-ownership", label: "Determining ownership of an employee's or contractor's invention, including shop-right and scope-of-employment doctrines absent a clear written assignment" },
  { id: "law-ip-patent-sep-frand", label: "Applying fair, reasonable, and non-discriminatory (FRAND) licensing commitments to a standard-essential patent and the availability of an injunction against a willing licensee" },
  { id: "law-ip-trademark-distinctiveness", label: "Placing a mark on the distinctiveness spectrum from generic to fanciful and assessing whether a descriptive mark has acquired distinctiveness through use" },
  { id: "law-ip-trademark-confusion", label: "Applying the likelihood-of-confusion test across similarity of marks, relatedness of goods/services, and actual marketplace factors" },
  { id: "law-ip-trademark-dilution", label: "Distinguishing dilution of a mark with a reputation (blurring and tarnishment) from ordinary likelihood of confusion, including the unrelated-goods context" },
  { id: "law-ip-trademark-genericide-policing", label: "Assessing the risk that an owner's failure to police third-party use lets a mark become generic, and what policing a mark actually requires" },
  { id: "law-ip-trademark-fair-use", label: "Applying descriptive and referential fair-use defenses that permit using another's mark to describe one's own goods or to truthfully refer to the mark owner's goods" },
  { id: "law-ip-copyright-idea-expression", label: "Applying the idea-expression dichotomy to separate an unprotectable idea, system, or method from its protectable expression" },
  { id: "law-ip-copyright-ownership-works-for-hire", label: "Determining default ownership of a commissioned or employee-created work absent an express written assignment, and what rights actually pass without one" },
  { id: "law-ip-copyright-license-scope", label: "Construing the scope of a copyright license or assignment, including whether it is exclusive or non-exclusive and what uses it actually authorizes" },
  { id: "law-ip-copyright-substantial-similarity", label: "Applying substantial-similarity and access analysis to distinguish copying from independent creation" },
  { id: "law-ip-copyright-fair-use", label: "Applying the fair-use/fair-dealing style exception (purpose and character of the use, amount taken, and market effect) to an unauthorized use" },
  { id: "law-ip-copyright-moral-rights", label: "Applying the author's moral rights of attribution and integrity, including their persistence after an economic-rights transfer" },
  { id: "law-ip-trade-secret-definition-measures", label: "Testing whether information qualifies as a trade secret, including whether the holder took measures reasonable under the circumstances to keep it secret" },
  { id: "law-ip-trade-secret-misappropriation", label: "Distinguishing misappropriation by improper means from lawful independent development or reverse engineering of a product obtained legitimately" },
];

export const LAW_INTELLECTUAL_PROPERTY_CASES: CaseStudy[] = [
  {
    id: "law-ip-algorithm-patent-rejection",
    profession: "law",
    category: "Intellectual Property Law",
    title: "The Rejected Algorithm Patent",
    scenario:
      "Your client's patent application claims a method for dynamically reallocating computing resources across a network, implemented entirely in software, to reduce processing latency. The patent examiner has rejected every claim on two separate grounds: first, that the claims are directed to nothing more than the abstract mathematical idea of optimizing an allocation, merely dressed up with generic computer language; and second, that an academic paper your client's own co-founder published describing a similar allocation scheme, thirteen months before the application was filed, anticipates the claims as prior art. Your client insists the invention is a genuine technical improvement, since it measurably reduces memory consumption compared to the prior approach, and points out the co-founder's paper was itself based on the client's unpublished internal work. The client wants to know whether narrowing the claims to the specific memory-reduction mechanism would overcome the eligibility rejection, and separately whether the co-founder's own paper can really be held against the client as prior art.",
    keyIssues: [
      "Whether an abstract allocation idea becomes patent-eligible once the claims are tied to a specific technical improvement (reduced memory consumption) rather than claimed at the level of the bare idea itself",
      "Whether a disclosure by the inventor's own co-founder, derived from the inventor's own unpublished work, counts as the inventor's own disclosure for purposes of any applicable grace period, or as independent third-party prior art with no grace period available",
      "Whether the specific filing date and the exact relationship between the co-founder's paper and the client's internal work changes which answer applies",
      "Practical claim-drafting strategy for distinguishing a genuine technical solution from an abstract idea merely implemented on a generic computer",
    ],
    expectedConcepts: [
      "patentable subject matter",
      "abstract idea exclusion",
      "novelty",
      "prior art",
      "inventor-disclosure grace period",
      "claim amendment",
    ],
    modelApproach:
      "A strong answer treats the eligibility rejection and the novelty rejection as two independent hurdles that both have to be cleared, not one combined problem. It explains that eligibility turns on whether the amended claims are anchored to a specific technical mechanism (the memory-reduction detail) rather than the bare idea of allocation itself, and separately investigates whether the co-founder's disclosure falls within any grace period available for the inventor's own prior disclosures before concluding it is fatal prior art.",
    furtherReading: [
      "Patent-eligible subject matter and the abstract-idea exclusion for software-implemented inventions",
      "Novelty and the prior-art effect of an inventor's own pre-filing disclosures",
      "Claim drafting strategies tying an abstract concept to a specific technical implementation",
    ],
    testsFundamentals: ["law-ip-patent-eligibility", "law-ip-patent-novelty-prior-art"],
  },
  {
    id: "law-ip-departing-engineer-files",
    profession: "law",
    category: "Intellectual Property Law",
    title: "The Departing Engineer's Files",
    scenario:
      "A senior engineer at your client's company resigned last month and, in her final two weeks, downloaded a large batch of internal files to a personal drive, including a document describing a proprietary manufacturing process that gives your client's product its distinctive durability. She has now joined a direct competitor, which has begun marketing a product with similar durability claims. Your client never had the engineer sign a confidentiality agreement specific to this process, the relevant files were stored on a shared drive accessible to roughly forty employees with no special access controls, and the process itself is not described in any patent, since your client chose to keep it as an internal secret rather than file for a patent and disclose it publicly. The competitor says its product's durability comes from its own, independently developed process and denies ever receiving or using the engineer's files. Your client wants to know whether it has a viable claim.",
    keyIssues: [
      "Whether information shared internally with roughly forty employees, with no special access restrictions, was still subject to measures reasonable under the circumstances to keep it secret",
      "Whether the absence of a specific confidentiality agreement with this particular engineer is fatal, or whether other circumstances (general policy, the nature of the information) can still support trade-secret status",
      "What circumstantial evidence (timing, the files actually downloaded, similarity of the resulting product) would be needed to show misappropriation rather than coincidence",
      "Whether the competitor's claim of independent development is plausible enough to defeat the claim, and what discovery would be needed to test it",
    ],
    expectedConcepts: [
      "trade secret",
      "reasonable secrecy measures",
      "misappropriation",
      "improper means",
      "independent development",
      "circumstantial evidence of use",
    ],
    modelApproach:
      "A strong answer does not assume the broad internal access alone defeats trade-secret status, since reasonableness is judged against the circumstances as a whole, including industry practice and the sensitivity of the specific information, rather than demanding airtight access controls as a precondition. It is realistic that proving misappropriation will likely rest on circumstantial evidence, given the competitor's denial, and treats the independent-development defense as a live possibility to be tested through discovery rather than dismissed outright.",
    furtherReading: [
      "Trade secret definition and the requirement of reasonable secrecy measures",
      "Misappropriation by improper means versus lawful independent development",
      "Circumstantial proof of trade secret use through timing and access evidence",
    ],
    testsFundamentals: ["law-ip-trade-secret-definition-measures", "law-ip-trade-secret-misappropriation"],
  },
  {
    id: "law-ip-adjacent-market-logo",
    profession: "law",
    category: "Intellectual Property Law",
    title: "The Adjacent-Market Logo Dispute",
    scenario:
      "Your client has sold premium kitchen knives under a distinctive stylized-wave logo and a coined, invented brand name for eleven years, with a registered mark covering kitchenware. A new company has launched a line of high-end cutting boards and kitchen storage containers under a strikingly similar wave logo and a brand name that sounds almost identical when spoken aloud, though spelled differently. The new company argues its products are cutting boards and storage containers, not knives, that its logo is a common decorative motif nobody can monopolize, and that no reasonable shopper would actually confuse the two brands. Your client points to several customer reviews and social-media comments already mixing up the two brands, and notes both products are frequently sold on the same retail shelves and websites, often to the same gift-buying customers. Your client wants to know whether it has a viable infringement claim.",
    keyIssues: [
      "Where the coined brand name and stylized logo actually sit on the distinctiveness spectrum, since an invented name and a specific stylized rendering of a common motif can both be strongly distinctive even if the underlying motif itself is common",
      "Whether cutting boards and storage containers are related enough to knives, given shared retail channels and customer overlap, for confusion to be plausible despite the products being technically different",
      "How much weight actual evidence of consumer confusion (reviews, social-media mix-ups) should carry compared to a side-by-side, in-the-abstract comparison of the marks",
      "Whether the spelling difference meaningfully reduces confusion given how similar the names sound when spoken",
    ],
    expectedConcepts: [
      "distinctiveness spectrum",
      "likelihood of confusion",
      "relatedness of goods",
      "channels of trade",
      "actual confusion evidence",
      "aural similarity",
    ],
    modelApproach:
      "A strong answer does not treat 'different products' as an automatic defense, since likelihood of confusion weighs relatedness and shared trade channels rather than requiring identical goods. It gives real weight to the actual confusion evidence rather than relying only on an abstract side-by-side comparison of the marks, and treats the aural similarity of the two names as independently significant given how customers actually encounter and discuss these brands.",
    furtherReading: [
      "The distinctiveness spectrum and strength of a mark",
      "Likelihood-of-confusion multi-factor analysis",
      "The evidentiary weight of actual consumer confusion",
    ],
    premium: true,
    testsFundamentals: ["law-ip-trademark-distinctiveness", "law-ip-trademark-confusion"],
  },
  {
    id: "law-ip-four-second-sample",
    profession: "law",
    category: "Intellectual Property Law",
    title: "The Four-Second Sample",
    scenario:
      "A musician signed to your client's label released a song that includes a four-second instrumental sample lifted from a lesser-known recording released thirty years ago, pitched down and looped underneath an entirely new melody, lyrics, and arrangement. The original recording's rights holder has sent a demand letter claiming infringement and seeking a share of royalties plus damages for the unlicensed use. Your client's artist argues the sample is unrecognizable to an ordinary listener once pitched down and layered beneath the new material, that the new song is a wholly original creative work built around a tiny transformed fragment, and that the sample's use comments on and reinterprets a genre convention from the original era. The rights holder disputes that characterization and says four seconds of a creatively significant passage is still a real, commercially meaningful taking. Your client wants an honest assessment of its exposure before responding to the letter.",
    keyIssues: [
      "Whether the new song is substantially similar to the original recording in a way that matters, given how heavily the sampled fragment was transformed, or whether transformation defeats substantial similarity entirely on its own",
      "Whether access to the thirty-year-old recording is itself in dispute, or effectively conceded by the admitted sampling",
      "Whether the purpose and character of the use (transformative commentary on a genre convention versus simple reuse to save the cost of composing an equivalent passage) favors a fair-use-style exception",
      "Whether the amount taken, four seconds of what the rights holder calls a creatively significant passage, and the effect on the market for the original recording and its licensing, cut for or against the exception",
    ],
    expectedConcepts: [
      "substantial similarity",
      "access to the original work",
      "transformative use",
      "fair use / fair dealing factors",
      "amount and substantiality of the portion used",
      "effect on the market for the original",
    ],
    modelApproach:
      "A strong answer resists the instinct to treat heavy transformation as an automatic defense, since substantial similarity and a fair-use-style exception are analytically separate questions, and even a genuinely transformative use can still fail the exception on the amount-taken or market-effect factors. It works through the purpose-and-character, amount, and market-effect factors concretely on these facts rather than asserting transformation wins by itself.",
    furtherReading: [
      "Substantial similarity analysis and the role of access",
      "Transformative use within the fair-use/fair-dealing style exception",
      "Sampling disputes and the licensing market for musical excerpts",
    ],
    premium: true,
    testsFundamentals: ["law-ip-copyright-substantial-similarity", "law-ip-copyright-fair-use"],
  },
  {
    id: "law-ip-trademark-turned-common-noun",
    profession: "law",
    category: "Intellectual Property Law",
    title: "The Trademark Turned Common Noun",
    scenario:
      "Your client owns a registered mark for a once-novel type of insulated, vacuum-sealed beverage container that it pioneered fifteen years ago. Over time, the word has crept into everyday language, with news articles, competitors' advertising, and even customers routinely using the term to describe any vacuum-sealed container regardless of brand. Your client has sent a handful of cease-and-desist letters over the years, but inconsistently, and several competitors currently use the term descriptively in their own marketing without having been challenged. A direct competitor's advertising uses the term prominently to describe its own, differently branded product, and your client wants to stop it. The competitor argues the term is simply the generic name for this category of product at this point, pointing to dictionary entries and widespread public usage, and separately argues its own use is purely descriptive of its product's actual function, not a use of your client's mark as a brand.",
    keyIssues: [
      "Whether the mark has already become generic in the public's mind through widespread, unpoliced use, in which case trademark protection is lost regardless of the mark's valid origin",
      "Whether your client's inconsistent policing history helps or undermines its position now, and what more rigorous policing going forward would need to look like",
      "Separately from genericness, whether the competitor's specific use is a protected descriptive reference to the product's function rather than a trademark use likely to cause confusion",
      "Realistic strategy (consumer surveys, alternative generic terminology campaigns, more consistent enforcement) for defending the mark going forward even if this particular dispute is lost",
    ],
    expectedConcepts: [
      "genericide",
      "duty to police a mark",
      "descriptive fair use",
      "primary significance to the public",
      "consumer survey evidence",
      "trademark use versus descriptive use",
    ],
    modelApproach:
      "A strong answer treats genericness and descriptive fair use as two separate, independently sufficient defenses rather than one combined argument, since the competitor could win on either ground alone. It takes the genericide risk seriously given the inconsistent policing history and widespread public usage, rather than assuming a validly registered mark is automatically safe, and recommends a realistic path to shore up the mark going forward regardless of how this specific dispute resolves.",
    furtherReading: [
      "Genericide and the loss of trademark rights through public generic use",
      "The trademark owner's duty to police third-party use",
      "Descriptive use of a term as a defense to infringement",
    ],
    premium: true,
    testsFundamentals: ["law-ip-trademark-genericide-policing", "law-ip-trademark-fair-use"],
  },
  {
    id: "law-ip-standard-essential-patent-holdup",
    profession: "law",
    category: "Intellectual Property Law",
    title: "The Standard-Essential Patent Holdup",
    scenario:
      "Your client manufactures wireless-enabled devices that must implement an industry communication standard to interoperate with other manufacturers' equipment. A patent holder whose patent is essential to implementing that standard, and who committed to a standards body to license any essential patents on fair, reasonable, and non-discriminatory terms, has demanded a royalty rate your client believes is several times higher than comparable licensees pay, and has threatened to seek an injunction blocking sales of your client's devices if the rate is not accepted within thirty days. Your client has made a counteroffer at what it believes is a FRAND-consistent rate based on public licenses the patent holder has granted to similarly situated competitors, but the patent holder has not meaningfully engaged with that counteroffer. Your client wants to know whether the injunction threat is realistic given the FRAND commitment, and how to position itself as a willing licensee while this is sorted out.",
    keyIssues: [
      "Whether a patent holder that made a FRAND licensing commitment can still obtain an injunction against an implementer that is genuinely negotiating in good faith, as opposed to simply refusing to pay anything at all",
      "What conduct actually marks your client as a 'willing licensee' (a good-faith counteroffer benchmarked to comparable licenses) versus a hold-out refusing to engage",
      "Whether the demanded rate, compared to rates actually granted to similarly situated licensees, is itself evidence the demand breaches the FRAND commitment",
      "Practical negotiating posture (continuing to make reasoned counteroffers, seeking third-party rate-setting, or escrowing a disputed amount) that preserves your client's position if the dispute proceeds further",
    ],
    expectedConcepts: [
      "standard-essential patent",
      "FRAND commitment",
      "willing licensee",
      "injunction against a good-faith negotiator",
      "comparable license benchmarking",
      "patent holdup",
    ],
    modelApproach:
      "A strong answer centers the analysis on the FRAND commitment's practical consequence: it substantially constrains, though does not always categorically eliminate, the availability of an injunction against an implementer that is genuinely negotiating rather than stalling. It treats the comparable-license evidence as the concrete benchmark for testing whether the demanded rate is actually FRAND-consistent, and gives the client concrete, documented steps to keep demonstrating good faith throughout the negotiation.",
    furtherReading: [
      "FRAND commitments and standard-essential patent licensing",
      "The willing-licensee standard and its effect on injunctive relief",
      "Benchmarking a FRAND royalty rate against comparable licenses",
    ],
    premium: true,
    testsFundamentals: ["law-ip-patent-sep-frand", "law-ip-patent-claim-scope-infringement"],
  },
  {
    id: "law-ip-refilled-cartridge-resale",
    profession: "law",
    category: "Intellectual Property Law",
    title: "The Refilled Cartridge Resale",
    scenario:
      "Your client holds several patents covering a printer cartridge's internal mechanism. A third-party recycler collects your client's empty, authorized-sale cartridges from customers, refills them with new ink, replaces a worn internal seal, and resells them at a steep discount under its own label. Your client's original sale of each cartridge was unrestricted, carrying no printed resale or single-use restriction on the packaging. Your client wants to shut the recycler down entirely as a patent infringer, arguing that refilling and reselling its patented cartridges without authorization infringes regardless of how the empty cartridge was originally obtained. The recycler argues that patent exhaustion lets it do whatever it wants with a cartridge it lawfully acquired after an authorized sale, including whatever repairs or refills it chooses to make, and that replacing a single worn seal is no different from any other permissible repair.",
    keyIssues: [
      "Whether the original, unrestricted authorized sale of each cartridge exhausted your client's patent rights in that specific physical item",
      "Whether what the recycler does (refilling ink, replacing one worn seal) is properly characterized as permissible repair of an exhausted item, or as impermissible reconstruction of the patented article that exhaustion does not cover",
      "Whether the absence of any printed resale or single-use restriction on the original packaging matters to this analysis, and whether such a restriction would have changed the outcome if your client had actually imposed one",
      "What, if anything, your client can still do to protect its cartridge business going forward given how exhaustion applies here",
    ],
    expectedConcepts: [
      "patent exhaustion",
      "authorized sale",
      "permissible repair versus impermissible reconstruction",
      "post-sale restrictions",
      "single-use limitation",
      "first sale",
    ],
    modelApproach:
      "A strong answer works through exhaustion before reaching the repair/reconstruction question, since an unrestricted authorized sale exhausts the patent rights in that specific item regardless of how the client might wish it had not. It then applies the repair-versus-reconstruction line concretely to refilling ink and replacing one seal, rather than assuming any post-sale modification automatically defeats exhaustion, and is honest that the lack of a printed restriction likely forecloses an argument the client might otherwise have preserved.",
    furtherReading: [
      "Patent exhaustion and the effect of an authorized, unrestricted sale",
      "Permissible repair versus impermissible reconstruction of a patented article",
      "Enforceability and limits of post-sale use restrictions",
    ],
    premium: true,
    testsFundamentals: ["law-ip-patent-exhaustion", "law-ip-patent-claim-scope-infringement"],
  },
  {
    id: "law-ip-freelancer-icon",
    profession: "law",
    category: "Intellectual Property Law",
    title: "The Freelancer's Icon",
    scenario:
      "Your client, a startup, paid a freelance illustrator a flat fee to design its app icon and a small set of in-app graphics under a two-paragraph email agreement that described the deliverables and the fee but said nothing about who would own the resulting copyright. The startup has used the icon prominently for two years, including on merchandise and in a recent funding pitch deck, and is now negotiating an acquisition in which the acquirer's due-diligence team has flagged the missing ownership language as a real risk. The illustrator, contacted for a standard confirmatory assignment, is now demanding a substantial additional payment before signing anything, pointing out that without a signed assignment, the startup may only ever have held a license to use the artwork, not ownership of the copyright itself. The startup wants to know how exposed it actually is and how much leverage the illustrator genuinely has.",
    keyIssues: [
      "What the startup actually owns absent any written assignment: full ownership, an implied license limited to the purpose for which the work was commissioned, or something in between",
      "Whether the commissioning relationship, paying a flat fee for a specific described deliverable, by itself transfers any rights beyond a license to use the work for its intended purpose",
      "Whether the uses the startup has already made (merchandise, pitch deck) stayed within the scope of whatever implied license actually exists, or exceeded it",
      "Realistic leverage assessment for the current negotiation, given the illustrator's genuine ability to withhold a clean assignment the acquisition needs",
    ],
    expectedConcepts: [
      "ownership of a commissioned work",
      "default rule absent written assignment",
      "implied license",
      "scope of a license",
      "due-diligence risk",
      "retroactive assignment negotiation",
    ],
    modelApproach:
      "A strong answer does not assume payment of a fee for described deliverables automatically transfers copyright ownership, since the default rule in the absence of a signed assignment commonly leaves the commissioning party with only a license rather than full ownership. It assesses carefully whether past uses stayed within whatever implied license actually exists before turning to the negotiation itself, and gives the client a realistic, rather than one-sided, read of how much leverage the illustrator holds given the acquisition's genuine need for a clean assignment.",
    furtherReading: [
      "Default ownership of a commissioned work absent an express written assignment",
      "Scope of an implied license versus an outright transfer of copyright",
      "Due-diligence practice for unresolved intellectual property ownership",
    ],
    premium: true,
    testsFundamentals: ["law-ip-copyright-ownership-works-for-hire", "law-ip-copyright-license-scope"],
  },
  {
    id: "law-ip-engineers-weekend-invention",
    profession: "law",
    category: "Intellectual Property Law",
    title: "The Engineer's Weekend Invention",
    scenario:
      "An engineer employed by your client, a company that designs industrial sensors, developed a new calibration technique on weekends using her own laptop and a prototype sensor she borrowed from the office over a long weekend without asking. The technique is conceptually related to, but technically distinct from, the company's core product line, and the engineer's employment contract contains a general assignment clause covering inventions 'relating to the company's business' but was signed years before this specific product category existed. The engineer has filed a provisional patent application in her own name and is now in talks to license the technique to one of your client's competitors. Your client wants to know whether it owns the invention outright, holds some lesser right to use it, or has no claim at all, and separately whether the competitor can be warned off dealing with the engineer.",
    keyIssues: [
      "Whether the invention falls within the scope of the assignment clause's language given how the company's business has evolved since the clause was signed",
      "Whether using company equipment (the borrowed prototype sensor) during off-hours development gives the company at least a non-exclusive right to use the invention even if it does not own it outright",
      "How a conceptually related but technically distinct invention should be analyzed against a broadly worded 'relating to the business' assignment clause",
      "What the company can realistically do (ownership claim, a shop-right defense, an infringement warning to the competitor) depending on which of these analyses prevails",
    ],
    expectedConcepts: [
      "invention-assignment clause scope",
      "shop right",
      "scope of employment",
      "use of employer resources",
      "provisional patent application",
      "competing license negotiation",
    ],
    modelApproach:
      "A strong answer separates the ownership question (does the assignment clause's language actually reach this invention) from the more modest shop-right question (does using company equipment give the company at least a non-exclusive right to use the invention regardless of ownership), since the company may win on one even if it loses on the other. It is realistic that a broadly worded but dated assignment clause may not cleanly cover an invention in a product category that did not exist when it was signed, and calibrates the warning to the competitor to whichever right actually survives this analysis.",
    furtherReading: [
      "Scope and enforceability of employee invention-assignment clauses",
      "The shop-right doctrine and employer use of employee-developed inventions",
      "Ownership disputes over inventions made with employer resources outside normal duties",
    ],
    premium: true,
    testsFundamentals: ["law-ip-patent-employee-ownership", "law-ip-patent-claim-scope-infringement"],
  },
  {
    id: "law-ip-heavily-edited-memoir",
    profession: "law",
    category: "Intellectual Property Law",
    title: "The Heavily Edited Memoir",
    scenario:
      "Your client, a publisher, acquired exclusive publishing rights to a public figure's memoir under a contract transferring the economic rights needed to print, distribute, and sell the book, and granting the publisher editorial discretion over 'structure and pacing.' During final editing, the publisher's team rewrote several passages to soften the author's criticism of a former business partner, reordered chapters in a way that changes the memoir's emotional arc, and added a chapter-opening quote the author never wrote or approved, without showing the author the final changes before printing. The author, upon seeing advance copies, is demanding the book be pulled and reprinted without the unauthorized changes, arguing the published version misrepresents her actual voice and views regardless of what the publishing contract's economic-rights transfer covers. Your client wants to know whether 'editorial discretion over structure and pacing' covers what was actually done, and what exposure remains even if it does.",
    keyIssues: [
      "Whether the specific changes made (softened criticism, an unapproved invented quote attributed to the author, a reordered emotional arc) fall within 'structure and pacing' discretion or exceed it",
      "Whether the author retains a right of integrity in the work that persists independently of the economic rights the publishing contract transferred, regardless of how broadly that contract's language is read",
      "Whether the added, unapproved quote implicates attribution concerns distinct from the integrity concerns raised by the other changes",
      "Realistic remedies (a corrected edition, a public clarification, or something short of a full reprint) given the advance copies already in circulation",
    ],
    expectedConcepts: [
      "moral rights of integrity and attribution",
      "persistence of moral rights after an economic rights transfer",
      "scope of editorial discretion",
      "misattribution",
      "distortion of a work",
      "remedies for a moral-rights violation",
    ],
    modelApproach:
      "A strong answer keeps the contractual scope question (did 'structure and pacing' discretion cover this) analytically separate from the moral-rights question (does the author have an integrity and attribution interest that survives the economic transfer regardless of contractual scope), since the author may win on the second even if the publisher technically had contractual latitude on the first. It treats the invented, unapproved quote as a distinct attribution problem from the softened criticism and reordering, and proposes a remedy proportionate to what advance circulation still makes practical.",
    furtherReading: [
      "Moral rights of attribution and integrity and their persistence after a rights transfer",
      "Scope of editorial discretion under a publishing agreement",
      "Remedies for distortion or misattribution of a published work",
    ],
    premium: true,
    testsFundamentals: ["law-ip-copyright-moral-rights", "law-ip-copyright-license-scope"],
  },
  {
    id: "law-ip-parody-account",
    profession: "law",
    category: "Intellectual Property Law",
    title: "The Parody Account",
    scenario:
      "A popular social-media account your client runs posts satirical content mocking a well-known luxury beverage brand, using a deliberately altered version of the brand's famous logo and a tagline that closely echoes the brand's own slogan, consistently to mock the brand's marketing and its customers' perceived pretensions. The account has never claimed to be official, states 'parody account' in its bio, and sells no competing product. The brand owner has sent a demand letter arguing the account, by trading on the fame of its mark, is diluting the mark's distinctiveness and tarnishing its reputation by associating it with mocking, sometimes crude commentary, regardless of any confusion over affiliation. Your client wants to know whether the parody framing actually protects it from a dilution claim specifically, since it understands dilution does not require any likelihood of confusion the way ordinary infringement does.",
    keyIssues: [
      "Whether dilution by tarnishment can be established without any likelihood of confusion, given that the account openly disclaims any official affiliation",
      "Whether genuine parody that comments on and criticizes the brand itself, rather than merely borrowing its fame to sell something unrelated, is treated differently under dilution analysis than ordinary commercial use",
      "Whether the crude or mocking nature of some of the content changes the analysis compared to gentler, more clearly comedic parody",
      "What the account can do to strengthen its parody defense going forward, such as how clearly it disclaims affiliation and how directly its content actually comments on the brand itself",
    ],
    expectedConcepts: [
      "dilution by blurring and tarnishment",
      "no confusion requirement for dilution",
      "parody as commentary on the mark itself",
      "disclaimer of affiliation",
      "fair use exclusion from dilution liability",
      "famous mark",
    ],
    modelApproach:
      "A strong answer does not treat 'it's a parody' as an automatic defense, since dilution protects against tarnishment of reputation independent of confusion, and some uses genuinely cross from commentary into simple reputational harm. It focuses the analysis on whether the account's content functions as genuine commentary on the brand itself, which tends to be treated more protectively, rather than as an unrelated use merely borrowing the mark's fame, and gives concrete, practical steps to strengthen that characterization going forward.",
    furtherReading: [
      "Dilution by blurring and tarnishment of a famous mark",
      "Parody and commentary as a limitation on dilution liability",
      "The role of an explicit disclaimer of affiliation in a parody defense",
    ],
    premium: true,
    testsFundamentals: ["law-ip-trademark-dilution", "law-ip-trademark-fair-use"],
  },
  {
    id: "law-ip-reverse-engineered-firmware",
    profession: "law",
    category: "Intellectual Property Law",
    title: "The Reverse-Engineered Firmware",
    scenario:
      "Your client's competitor purchased several units of your client's networked sensor device on the open market, then decompiled the device's firmware using standard, publicly available tools to understand how it communicates with its companion app, and used that understanding to build a compatible replacement device that works with the same app. Your client's firmware was never published or licensed to the public in source form, and the device's packaging included a brief notice stating the firmware was proprietary and confidential, though the notice said nothing specifically prohibiting decompilation. Separately, your client holds a patent covering the specific handshake sequence the device uses to authenticate with the app, and the competitor's device uses what appears to be a functionally identical sequence. Your client wants to know whether the decompilation itself was unlawful, and separately whether the competitor's device actually infringes the authentication-sequence patent.",
    keyIssues: [
      "Whether decompiling firmware from a lawfully purchased, publicly sold device using standard tools constitutes improper means for trade-secret purposes, or is instead the kind of lawful reverse engineering the law generally tolerates",
      "Whether the proprietary-and-confidential notice, without an explicit anti-decompilation restriction, changes that analysis",
      "Whether the competitor's authentication sequence falls within the literal scope of the patent's claims, or is close enough on the merits to be reached only under the doctrine of equivalents",
      "Whether the trade-secret and patent claims rise or fall together, or are genuinely independent given how differently each body of law treats information obtained through lawful reverse engineering",
    ],
    expectedConcepts: [
      "lawful reverse engineering",
      "improper means",
      "proprietary notice without an explicit restriction",
      "literal infringement",
      "doctrine of equivalents",
      "independence of trade secret and patent claims",
    ],
    modelApproach:
      "A strong answer treats the trade-secret and patent questions as genuinely independent claims resting on different legal theories, rather than assuming one outcome decides both. It is realistic that decompiling a lawfully purchased device with standard tools is generally treated as permissible reverse engineering rather than improper means, especially absent an explicit anti-decompilation restriction, while separately and carefully comparing the accused authentication sequence against the patent's actual claim scope before reaching for the doctrine of equivalents.",
    furtherReading: [
      "Lawful reverse engineering of a purchased product versus trade-secret misappropriation",
      "The effect of a general confidentiality notice without an explicit anti-reverse-engineering term",
      "Literal infringement versus the doctrine of equivalents in claim comparison",
    ],
    premium: true,
    testsFundamentals: ["law-ip-trade-secret-misappropriation", "law-ip-patent-claim-scope-infringement"],
  },
  {
    id: "law-ip-obvious-combination-patent",
    profession: "law",
    category: "Intellectual Property Law",
    title: "The 'Obvious' Combination Patent",
    scenario:
      "Your client holds a patent on a portable device that combines a known liquid-cooling mechanism, previously used only in stationary equipment, with a known high-density battery design, previously used only in devices without active cooling, to allow sustained high-performance operation in a handheld form factor. A competitor your client is suing for infringement has countered by challenging the patent's validity, arguing that combining two already-known, individually documented components was an obvious design choice any competent engineer would eventually have tried, pointing to earlier industry articles each separately suggesting the combination 'might be worth exploring.' Your client argues the combination solved a genuine, long-standing engineering problem (thermal throttling in handheld devices) that the industry had struggled with for years despite both components being individually well known, and that the specific integration actually achieved required solving real technical obstacles neither article addressed. The competitor's own accused product uses a near-identical, slightly rearranged version of the same combination.",
    keyIssues: [
      "Whether combining two individually known elements was obvious to a person of ordinary skill at the time, given the articles merely speculating about the idea, or whether the actual engineering obstacles to a working implementation support non-obviousness despite that speculation",
      "What secondary evidence (the industry's years-long struggle with the underlying problem, any commercial success tied specifically to the solution) supports non-obviousness beyond the bare technical comparison",
      "Whether the competitor's near-identical but rearranged version falls within the patent's literal claim scope or is reached only through the doctrine of equivalents",
      "How the validity challenge and the infringement analysis interact, since a successful validity challenge would moot the infringement question entirely",
    ],
    expectedConcepts: [
      "inventive step / non-obviousness",
      "combination of known elements",
      "secondary considerations (long-felt need, commercial success)",
      "literal infringement",
      "doctrine of equivalents",
      "validity challenge as a defense to infringement",
    ],
    modelApproach:
      "A strong answer does not treat mere speculative suggestion in the prior art as conclusive proof of obviousness, since actually solving the real engineering obstacles the articles never addressed is itself evidence cutting the other way, reinforced by secondary considerations like the industry's prolonged failure to solve the same problem. It resolves the validity question before the infringement question, since a successful challenge would end the case, and only then compares the competitor's rearranged version against the claims' actual scope.",
    furtherReading: [
      "Non-obviousness analysis for a combination of individually known elements",
      "Secondary considerations supporting non-obviousness (long-felt need, commercial success)",
      "Sequencing a validity challenge against an infringement claim",
    ],
    premium: true,
    testsFundamentals: ["law-ip-patent-nonobviousness", "law-ip-patent-claim-scope-infringement"],
  },
  {
    id: "law-ip-copied-game-mechanic",
    profession: "law",
    category: "Intellectual Property Law",
    title: "The Copied Game Mechanic",
    scenario:
      "Your client's mobile game features a core scoring mechanic in which matching colored tiles in specific patterns triggers escalating chain reactions, wrapped in distinctive original artwork, character designs, and a specific visual animation style for the chain reactions. A newly released competing game uses an extremely similar matching-and-chain-reaction scoring mechanic, including similar pattern thresholds for triggering escalation, but features entirely different artwork, different characters, and a different animation style for its own chain reactions. Your client wants to sue for copyright infringement, arguing the competitor obviously studied and copied its game closely, since the mechanic's specific numeric thresholds are an unusual design choice unlikely to be independently recreated by coincidence. The competitor argues scoring mechanics and gameplay rules are not protectable by copyright at all, only the specific artwork and animations are, and its own visual presentation is entirely original and plainly different from your client's.",
    keyIssues: [
      "Whether the scoring mechanic itself, including its specific numeric thresholds, is an unprotectable idea, system, or method of operation, or whether the particular expression of how that mechanic is realized could still be protected",
      "Whether the suspicious similarity of the numeric thresholds is itself probative of actual copying, even if the mechanic as such is unprotectable, and what that similarity might actually support (a different kind of claim, or just suspicion with no viable copyright theory)",
      "Whether substantial similarity, properly assessed, should be judged by the protectable expression alone (artwork, animation style) with the unprotectable mechanic filtered out, given how different those protectable elements actually are here",
      "What realistic claim, if any, survives once the idea-expression filtering is applied honestly",
    ],
    expectedConcepts: [
      "idea-expression dichotomy",
      "unprotectable systems and methods of operation",
      "filtering unprotectable elements before comparing similarity",
      "substantial similarity of protectable expression",
      "access and suspicious similarity",
      "scope of copyright in game design",
    ],
    modelApproach:
      "A strong answer applies the idea-expression dichotomy honestly rather than letting sympathy for the client's suspicion override it: a gameplay mechanic and its numeric thresholds are generally the kind of system or method of operation copyright does not protect, however distinctive the design choice feels. It filters out that unprotectable mechanic before comparing the works for substantial similarity, concludes the genuinely different artwork and animation make a copyright claim weak on these facts, and is candid that strong suspicion of deliberate copying does not by itself create a viable copyright claim where the thing actually copied is unprotectable.",
    furtherReading: [
      "The idea-expression dichotomy and unprotectable systems or methods of operation",
      "Filtering unprotectable elements before a substantial-similarity comparison",
      "Scope of copyright protection in interactive game design",
    ],
    premium: true,
    testsFundamentals: ["law-ip-copyright-idea-expression", "law-ip-copyright-substantial-similarity"],
  },
];
