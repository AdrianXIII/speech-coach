import type { CaseStudy } from "@/lib/caseStudyContent";
import type { Fundamental } from "@/lib/caseStudyFundamentals";

/**
 * Law / Family Law: the fundamentals checklist and the case bank
 * for this category, kept together so they can be written and reviewed as
 * one unit. Registered in lib/cases/index.ts.
 *
 * Every case is written to be jurisdiction-neutral: it must make sense when
 * machine-translated and graded against the US, German, French, Spanish, or
 * Swedish legal system, so it avoids any single country's statutes, courts,
 * or procedural vocabulary in favor of generic doctrine that exists (in some
 * form) across all five.
 */
export const LAW_FAMILY_LAW_FUNDAMENTALS: Fundamental[] = [
  { id: "law-family-marriage-validity", label: "Assessing the validity of a marriage (capacity, consent, formal requirements) and the consequences of a defective marriage" },
  { id: "law-family-matrimonial-property-regime", label: "Identifying which matrimonial property regime governs a marriage and how it characterizes an asset as separate or shared" },
  { id: "law-family-property-division-divorce", label: "Dividing marital/community property on divorce, including tracing separate property and valuing commingled or appreciated assets" },
  { id: "law-family-spousal-support", label: "Determining entitlement to, and the amount and duration of, post-divorce spousal maintenance/support" },
  { id: "law-family-grounds-for-divorce", label: "Applying the available grounds or route to divorce (no-fault, fault-based, mutual consent, separation period) and any required waiting period" },
  { id: "law-family-prenuptial-agreements", label: "Assessing the validity and enforceability of a premarital or marital agreement that alters the default property or support regime" },
  { id: "law-family-best-interests-standard", label: "Applying the best-interests-of-the-child standard to resolve a custody or parenting-time dispute" },
  { id: "law-family-legal-physical-custody", label: "Distinguishing legal/decision-making custody from physical/residential custody and allocating each between parents" },
  { id: "law-family-relocation-disputes", label: "Resolving a parent's proposed relocation with the child against the other parent's custody or visitation rights" },
  { id: "law-family-child-support-calculation", label: "Calculating child support using an income-based formula/guideline and the grounds for deviating from it" },
  { id: "law-family-modification-of-orders", label: "Applying the substantial-change-in-circumstances standard required to modify an existing custody or support order" },
  { id: "law-family-domestic-violence-protective-orders", label: "Evaluating the standard for emergency protective measures and their effect on custody, visitation, and property possession" },
  { id: "law-family-paternity-parentage", label: "Establishing or contesting legal parentage, including the effect of a presumption of parentage and the time limit to challenge it" },
  { id: "law-family-adoption-requirements", label: "Applying the consent, notice, and best-interests requirements that govern an adoption, including termination of an existing parent's rights" },
  { id: "law-family-child-abduction-cross-border", label: "Applying the framework for the prompt return of a child wrongfully removed or retained across an international border" },
  { id: "law-family-intestate-succession", label: "Determining the forced heirs and shares that pass by intestate succession when a person dies without a valid will" },
  { id: "law-family-forced-heirship-reserved-share", label: "Applying forced-heirship/reserved-share protections that limit a testator's freedom to disinherit certain close relatives" },
  { id: "law-family-will-validity-contest", label: "Assessing the formal validity of a will and the grounds (capacity, undue influence, fraud) on which it can be contested" },
  { id: "law-family-surviving-spouse-rights", label: "Determining a surviving spouse's statutory share or election rights in the deceased spouse's estate, independent of the will's terms" },
  { id: "law-family-cohabitation-unmarried-partners", label: "Assessing what property, support, or parentage rights, if any, arise between unmarried cohabiting partners absent a marriage" },
];

export const LAW_FAMILY_LAW_CASES: CaseStudy[] = [
  {
    id: "law-family-startup-equity-divorce",
    profession: "law",
    category: "Family Law",
    title: "Dividing a Founder's Equity on Divorce",
    scenario:
      "Your client co-founded a technology company four years into an eleven-year marriage; the company was worth almost nothing at founding but is now valued at 40 million ahead of a prospective acquisition, and your client's spouse, who left a stable career to manage the household and raise their two children, is seeking a share of the equity in the divorce. Your client argues the equity is personal, founder-specific property because it resulted from their own skill and long hours, while the spouse argues the value grew throughout the marriage with the benefit of unpaid domestic and childcare labor that let your client work the hours the company required. The founder also exercised and vested the bulk of the equity only eighteen months ago, after the couple had already separated but before the divorce was filed. You are advising on how the equity will likely be characterized and divided.",
    keyIssues: [
      "Whether equity founded and grown during the marriage is treated as shared marital property or as the founder's separate property because it derives from personal effort and skill",
      "How to value and divide an illiquid, pre-acquisition equity stake that cannot simply be split in kind",
      "Whether the timing of vesting after separation but before filing changes how much of the equity's growth counts as marital",
      "Whether unpaid domestic and childcare contributions are recognized as contributing to the marital estate's growth, independent of direct financial contribution",
    ],
    expectedConcepts: [
      "marital versus separate property",
      "active appreciation during marriage",
      "valuation of illiquid business interests",
      "date of separation as a dividing line",
      "non-financial contribution to the marital estate",
    ],
    modelApproach:
      "A strong answer does not treat the equity as automatically all-marital or all-separate; it walks through when the company was founded relative to the marriage, what portion of its growth is attributable to the founder's labor during the marriage versus post-separation effort, and how the applicable property regime treats appreciation of a business interest founded during the marriage. It addresses valuation realistically given the stake's illiquidity and the pending acquisition, and treats the non-financial homemaking and childcare contribution as directly relevant to the division, not as a sympathetic aside.",
    furtherReading: [
      "Characterization of a business founded during marriage as marital or separate property",
      "Valuation methods for illiquid private-company equity in divorce",
      "The legal significance of the date of separation in property division",
    ],
    testsFundamentals: ["law-family-matrimonial-property-regime", "law-family-property-division-divorce"],
  },
  {
    id: "law-family-prenup-signed-week-before",
    profession: "law",
    category: "Family Law",
    title: "The Premarital Agreement Signed a Week Before the Wedding",
    scenario:
      "Your client's spouse is seeking to enforce a premarital agreement, signed six days before their wedding, that waives nearly all claims to spousal support and limits your client to a fixed, modest sum regardless of the length of the marriage or the wealth accumulated during it. Your client says they were presented with the document for the first time at a moment when invitations were already sent and the venue booked, had no opportunity to consult independent counsel, and did not receive a full financial disclosure from the other side before signing. Fourteen years and two children later, your client's income and career have been substantially shaped by time out of the workforce, and the couple is now divorcing. You are advising on whether the agreement is likely to be enforced as written.",
    keyIssues: [
      "Whether the timing and circumstances of signing amount to coercion or a lack of genuine voluntariness undermining the agreement's validity",
      "Whether the absence of independent legal advice and full financial disclosure are independently fatal defects or merely relevant factors",
      "Whether a court will enforce an agreement whose terms have become grossly unfair given how the marriage actually unfolded, even if it was validly formed",
      "What relief is realistically available if the agreement is struck down entirely versus only partially",
    ],
    expectedConcepts: [
      "premarital/marital agreement validity",
      "voluntariness and procedural fairness",
      "financial disclosure requirement",
      "substantive unconscionability/unfairness at enforcement",
      "independent legal advice",
    ],
    modelApproach:
      "A strong answer separates the formation question from the enforcement question: it tests whether the agreement was genuinely voluntary given the timing and pressure, and whether the missing disclosure and independent advice are defects serious enough to void it outright, rather than assuming a signed document is automatically binding. It also recognizes that even a validly formed agreement can be refused enforcement, in whole or in part, if its result has become unconscionable given how the marriage and the parties' circumstances actually developed, and is realistic about what remedy follows from each possible outcome.",
    furtherReading: [
      "Procedural fairness requirements for premarital agreements (timing, disclosure, independent counsel)",
      "Unconscionability review of marital agreements at the time of enforcement",
      "Severability of an invalid provision from an otherwise enforceable premarital agreement",
    ],
    testsFundamentals: ["law-family-prenuptial-agreements", "law-family-spousal-support"],
  },
  {
    id: "law-family-relocation-new-job",
    profession: "law",
    category: "Family Law",
    title: "A Parent's Job Offer Three Time Zones Away",
    scenario:
      "Your client shares joint legal custody and a roughly equal parenting-time schedule with their ex-spouse for their eight-year-old child, and has just been offered a significant promotion that requires relocating three time zones away within two months. The other parent opposes the move, arguing it would gut the current shared schedule and sever the child's established routine, school, and weekly extended-family contact, and has proposed instead that your client decline the move or take primary custody themselves. Your client argues the promotion would substantially improve the household's financial stability and that a revised long-distance schedule, concentrated in school holidays, could preserve a meaningful relationship with the other parent. You are advising your client on how a court will likely approach the relocation request and what to propose.",
    keyIssues: [
      "Whether relocation requires advance notice or court approval given the existing shared custody arrangement",
      "How the best-interests standard weighs the relocating parent's legitimate reasons against the disruption to the child's routine and relationship with the other parent",
      "Whether a revised long-distance parenting schedule can realistically preserve a meaningful relationship with the non-relocating parent",
      "What happens to the existing custody allocation if the court denies relocation but the parent moves anyway, or if it approves relocation and must redesign the schedule",
    ],
    expectedConcepts: [
      "best interests of the child",
      "relocation standard",
      "modification of custody/parenting-time orders",
      "legal versus physical custody",
      "long-distance parenting plan",
    ],
    modelApproach:
      "A strong answer identifies that relocation with a child under an existing shared-custody order is not simply the relocating parent's unilateral choice, and walks through how the best-interests standard balances the stated reason for the move, the child's ties to the current community, and the feasibility of a revised schedule. It proposes a concrete alternative parenting plan rather than treating the dispute as all-or-nothing, and flags the practical and legal risk of relocating before the matter is resolved.",
    furtherReading: [
      "Relocation standards in custody disputes and required notice to the other parent",
      "Best-interests factors applied to a proposed long-distance parenting plan",
      "Modification of an existing custody order following a material change in circumstances",
    ],
    testsFundamentals: ["law-family-relocation-disputes", "law-family-best-interests-standard"],
  },
  {
    id: "law-family-support-job-loss-modification",
    profession: "law",
    category: "Family Law",
    title: "Modifying Child Support After a Job Loss",
    scenario:
      "Your client has paid child support under a formula-based order for three years, calculated from a stable salary at a company that has now eliminated their position. Your client has been unemployed for two months, has applied widely without success, and has taken a substantially lower-paying temporary role to stay current on other obligations. The other parent argues your client voluntarily left a search for comparable work too early and is now underemployed by choice, pointing to two declined interviews at firms your client found culturally incompatible, and opposes any reduction until your client can show a longer job search was exhausted. You are advising your client on whether a modification is likely to succeed and what evidence will matter most.",
    keyIssues: [
      "Whether the job loss qualifies as a substantial, involuntary change in circumstances justifying modification of the existing support order",
      "Whether declining two interviews supports a finding of voluntary underemployment that would cap the modification to imputed, rather than actual, income",
      "What evidence of a genuine, diligent job search strengthens the modification request",
      "Whether any modification would be retroactive to the job loss or only prospective from the date of filing",
    ],
    expectedConcepts: [
      "substantial change in circumstances",
      "imputed income / voluntary underemployment",
      "modification of support orders",
      "retroactivity of modification",
      "good-faith job search",
    ],
    modelApproach:
      "A strong answer does not assume a job loss automatically justifies a reduction; it tests whether the loss was involuntary and whether the subsequent job search was genuinely diligent, since a finding of voluntary underemployment would have a court impute the prior income level instead of using actual current earnings. It advises on documenting the search concretely, and flags the separate, often-missed question of whether any modification will be retroactive or only effective from the filing date, since delay in filing can be costly regardless of how strong the underlying change-in-circumstances argument is.",
    furtherReading: [
      "The substantial-change-in-circumstances standard for modifying support orders",
      "Imputed income and voluntary underemployment/unemployment doctrine",
      "Retroactive versus prospective modification of child support",
    ],
    testsFundamentals: ["law-family-modification-of-orders", "law-family-child-support-calculation"],
  },
  {
    id: "law-family-emergency-protective-order-custody",
    profession: "law",
    category: "Family Law",
    title: "An Emergency Protective Order's Effect on an Existing Custody Schedule",
    scenario:
      "Your client obtained an emergency protective order against their spouse after an incident the client says involved a physical altercation witnessed by their ten-year-old child, and the order currently bars the spouse from the family home and from contact with your client, but is silent on the existing joint custody schedule that gives the spouse three overnight visits per week. The spouse denies the incident occurred as described, says it was a heated argument with no physical contact, and is demanding the overnight visits continue as scheduled, citing the silence in the order's text. The child has not been interviewed by anyone yet. You are advising your client on how the protective order interacts with the custody schedule and what to request at the upcoming hearing.",
    keyIssues: [
      "Whether an emergency protective order automatically suspends an existing custody and visitation schedule or requires a separate request to modify it",
      "What standard of proof and what evidence will matter at the hearing given the dispute over whether the incident occurred as described",
      "Whether and how the child's account, if obtained, should factor into both the protective order and any interim custody modification",
      "What interim arrangement (supervised visitation, suspended overnights, alternative exchange location) is appropriate pending a full hearing",
    ],
    expectedConcepts: [
      "emergency/temporary protective order",
      "domestic violence and custody interplay",
      "interim or temporary custody modification",
      "best interests of the child",
      "supervised visitation",
    ],
    modelApproach:
      "A strong answer does not assume the protective order silently resolves the custody question one way or the other; it explains that the two proceedings, protective order and custody, are related but distinct, and that the client should affirmatively seek an interim modification of the visitation schedule rather than relying on the protective order's silence. It addresses the evidentiary dispute candidly, proposes a protective interim measure such as supervised visitation pending a full hearing, and treats the child's safety and any eventual account as central to that interim request.",
    furtherReading: [
      "The interaction between protective orders and existing custody/visitation schedules",
      "Standards for interim or temporary custody modification pending a full hearing",
      "Supervised visitation as an interim safeguard in contested domestic violence allegations",
    ],
    premium: true,
    testsFundamentals: ["law-family-domestic-violence-protective-orders", "law-family-modification-of-orders"],
  },
  {
    id: "law-family-paternity-presumption-challenge",
    profession: "law",
    category: "Family Law",
    title: "Challenging a Presumption of Parentage Three Years In",
    scenario:
      "A man who was married to the child's mother at the time of birth, and is listed as the legal parent on the birth record, has raised the child as his own for three years. After the couple separated, a DNA test he took out of curiosity revealed he is not the child's biological parent, and he now wants to be released from any ongoing child support obligation on that basis. The mother argues the legal parentage established at birth should stand regardless of biology, given the bond already formed and the child's reliance on him as a parent, and separately reveals she always suspected he was not the biological parent but said nothing. You are advising him on whether the parentage presumption can still be challenged after this much time and bonding have passed.",
    keyIssues: [
      "Whether a presumption of parentage arising from marriage at birth can still be rebutted this long after the fact, and whether a time limit applies",
      "How a court weighs the child's established bond and reliance on the presumed parent against the biological result",
      "Whether the mother's silence about her own suspicion affects the analysis",
      "What happens to the existing support and custody arrangement if the presumption is successfully rebutted, including any obligation to a biological parent not yet in the picture",
    ],
    expectedConcepts: [
      "presumption of parentage",
      "rebuttal of parentage and time limits",
      "best interests of the child / established parent-child bond",
      "equitable estoppel in parentage disputes",
      "child support obligation tied to legal parentage",
    ],
    modelApproach:
      "A strong answer does not treat the DNA result as automatically dispositive; it identifies that most systems time-limit a challenge to an established presumption of parentage precisely because of the reliance interest a bonded child has built up, and weighs that interest seriously rather than treating biology as the only relevant fact. It addresses the mother's own earlier suspicion as potentially relevant to an estoppel-type argument against her, and is realistic that even a successful challenge may not simply erase the existing support and custody relationship given the time that has passed.",
    furtherReading: [
      "Presumption of parentage and the time limits for rebutting it",
      "Equitable estoppel and the established-bond exception to a biology-based parentage challenge",
      "The relationship between legal parentage and an ongoing child support obligation",
    ],
    premium: true,
    testsFundamentals: ["law-family-paternity-parentage", "law-family-best-interests-standard"],
  },
  {
    id: "law-family-stepparent-adoption-objecting-parent",
    profession: "law",
    category: "Family Law",
    title: "A Stepparent Adoption Over an Absent Parent's Objection",
    scenario:
      "Your client's spouse wants to adopt your client's child from a prior relationship, and the child, now twelve, has asked to be adopted after years of being raised primarily by the stepparent. The child's other legal parent has had almost no contact or financial involvement for six years, but has just resurfaced to object to the adoption, citing a renewed desire to be part of the child's life, though offering no concrete plan or explanation for the prior absence. You are advising on whether the adoption can proceed over the objection, what weight the child's own wishes carry at this age, and what showing is needed to terminate the absent parent's rights.",
    keyIssues: [
      "What showing (abandonment, failure to support or maintain contact for a defined period) is required to terminate the objecting parent's rights over their objection",
      "Whether a late, unsubstantiated change of heart defeats a strong abandonment showing built on years of absence",
      "How much weight a twelve-year-old's own expressed wishes carry in the adoption decision",
      "Whether partial relief, such as adoption without full termination of all residual rights, is available or whether termination is all-or-nothing",
    ],
    expectedConcepts: [
      "termination of parental rights",
      "abandonment standard",
      "adoption consent requirements",
      "child's wishes / age-appropriate weight",
      "best interests of the child",
    ],
    modelApproach:
      "A strong answer walks through the specific abandonment or failure-to-support standard that must be met to terminate the objecting parent's rights, and tests the newly expressed desire to reconnect against the sustained prior absence rather than treating a last-minute objection as automatically sufficient to block the adoption. It gives real weight to the child's own stated wishes given their age, while still grounding the outcome in the governing legal standard rather than the child's preference alone, and clarifies that termination is generally required before an adoption can proceed, not an optional extra step.",
    furtherReading: [
      "Abandonment and failure-to-support standards for involuntary termination of parental rights",
      "The weight given to an older child's wishes in adoption and custody proceedings",
      "Stepparent adoption procedure and consent requirements",
    ],
    premium: true,
    testsFundamentals: ["law-family-adoption-requirements", "law-family-best-interests-standard"],
  },
  {
    id: "law-family-cross-border-abduction-vacation",
    profession: "law",
    category: "Family Law",
    title: "A Parent Who Did Not Return From a Summer Vacation",
    scenario:
      "Under an existing custody order, your client agreed to let the other parent take their child abroad for a four-week summer vacation to visit extended family. The agreed return date has now passed by three weeks, and the other parent has informed your client, by message, that they have enrolled the child in school in that country and do not intend to return, citing better opportunities and family support there. Your client wants the child back as quickly as possible and is asking whether to pursue a new custody case in the other country or seek the child's prompt return through a different route entirely. You are advising on the fastest and most effective path forward.",
    keyIssues: [
      "Whether a prompt-return mechanism for wrongful retention applies given the child's habitual residence immediately before the trip, independent of who currently has physical custody",
      "Why pursuing a fresh custody case in the country where the child was taken is likely the wrong first move, since it can concede jurisdiction or delay the return remedy",
      "What qualifies as wrongful retention once an agreed return date has passed without consent to an extension",
      "What narrow defenses the other parent might raise against a return request and how strong they are likely to be here",
    ],
    expectedConcepts: [
      "habitual residence",
      "wrongful removal or retention",
      "prompt return mechanism (international child abduction framework)",
      "jurisdiction versus return proceedings",
      "defenses to a return request (settled, grave risk, child's objection)",
    ],
    modelApproach:
      "A strong answer leads with the prompt-return framework rather than a fresh custody filing in the other country, since the point of that framework is precisely to restore the status quo based on habitual residence before any merits-based custody dispute is litigated elsewhere. It identifies the retention as wrongful once the agreed return date passed without consent, flags the urgency of acting before any settled-in-the-new-country defense could mature, and is realistic about the narrow set of defenses the other parent could raise and how weak they appear on these facts.",
    furtherReading: [
      "The international framework for the prompt return of wrongfully removed or retained children",
      "Habitual residence as the operative concept in cross-border custody disputes",
      "Defenses to a return request and the risk of delay strengthening a settled-in-new-country argument",
    ],
    premium: true,
    testsFundamentals: ["law-family-child-abduction-cross-border", "law-family-best-interests-standard"],
  },
  {
    id: "law-family-intestate-blended-family",
    profession: "law",
    category: "Family Law",
    title: "Dying Without a Will in a Blended Family",
    scenario:
      "Your client's parent died suddenly without a will, survived by a second spouse of eight years and two adult children from a first marriage, your client among them. The estate consists mainly of a family home titled solely in the deceased's name and a modest investment account, and the surviving spouse has begun telling the children informally that the home and account are now simply theirs, while the children believe they are entitled to a substantial share as the deceased's direct descendants. No one has yet opened a formal estate proceeding. You are advising your client on how the estate will actually be divided by default and what steps should be taken next.",
    keyIssues: [
      "How intestate succession divides an estate between a surviving spouse and the deceased's children from a prior relationship when no will exists",
      "Whether the family home receives any special treatment for the surviving spouse distinct from the ordinary intestate shares",
      "What formal steps are required to administer the estate rather than relying on the surviving spouse's informal characterization of ownership",
      "What claims, if any, the surviving spouse or children could raise beyond the baseline intestate shares",
    ],
    expectedConcepts: [
      "intestate succession",
      "surviving spouse's statutory share",
      "forced heirs / descendants' share",
      "estate administration",
      "family home / marital home protections",
    ],
    modelApproach:
      "A strong answer does not accept the surviving spouse's informal claim that the assets are simply theirs; it walks through how intestate succession actually divides the estate between a surviving spouse and children from a prior relationship, flags any special protection the surviving spouse may have specifically for the family home distinct from the general intestate share, and insists on a formal estate administration process rather than an informal division based on who currently occupies the house.",
    furtherReading: [
      "Intestate succession shares between a surviving spouse and children from a prior relationship",
      "Special protections for a surviving spouse's continued occupancy of the family home",
      "Formal estate administration procedure when no will exists",
    ],
    premium: true,
    testsFundamentals: ["law-family-intestate-succession", "law-family-surviving-spouse-rights"],
  },
  {
    id: "law-family-will-disinherits-child",
    profession: "law",
    category: "Family Law",
    title: "A Will That Disinherits One Child Entirely",
    scenario:
      "Your client's parent left a will, signed eighteen months before death, that leaves the entire estate to one sibling and expressly disinherits your client, citing years of estrangement. Your client argues the will was signed shortly after their parent began a new, powerful prescription medication and while under the increasing influence of the favored sibling, who managed the parent's finances and arranged the signing with a lawyer the sibling selected, with your client never informed or present. Your client wants to know both whether the disinheritance itself is valid under the law and whether the will can be contested on grounds of incapacity or undue influence.",
    keyIssues: [
      "Whether the law allows a parent to disinherit a child entirely, or whether a forced-heirship or reserved-share protection guarantees the child a minimum share regardless of the will's terms",
      "Whether the circumstances support a genuine undue-influence or incapacity challenge to the will's validity, independent of the disinheritance itself being otherwise permissible",
      "What evidence would meaningfully strengthen an undue-influence claim given the sibling's role in managing finances and arranging the signing",
      "What relief follows if the will is invalidated versus if only the disinheritance clause is struck while the rest of the will stands",
    ],
    expectedConcepts: [
      "forced heirship / reserved share",
      "testamentary capacity",
      "undue influence",
      "freedom of testation and its limits",
      "will contest procedure",
    ],
    modelApproach:
      "A strong answer keeps two separate questions apart: whether the applicable system even permits full disinheritance of a child in the first place, since many systems guarantee a reserved share regardless of the will's wording, and, independently, whether this particular will is vulnerable to a capacity or undue-influence challenge given the medication, the estrangement narrative, and the favored sibling's role in arranging the signing. It identifies what evidence (medical records, the role of independent counsel, the timing of the estrangement claim) would actually move the undue-influence analysis, rather than treating the family conflict alone as sufficient.",
    furtherReading: [
      "Forced heirship and reserved-share protections limiting disinheritance",
      "Testamentary capacity and undue influence as grounds to contest a will",
      "The evidentiary showing required to prove undue influence in estate planning",
    ],
    premium: true,
    testsFundamentals: ["law-family-forced-heirship-reserved-share", "law-family-will-validity-contest"],
  },
  {
    id: "law-family-unmarried-partners-separation",
    profession: "law",
    category: "Family Law",
    title: "Splitting Up After Twelve Years Without Ever Marrying",
    scenario:
      "Your client and their partner lived together for twelve years, raised one child together, and jointly used your client's income to pay down the mortgage on a home titled solely in the partner's name, but never married. The couple has now separated, and the partner says the home, titled solely in their name, is entirely theirs, and that your client has no claim to spousal-type support since they were never married, though the partner agrees the child's needs must be addressed separately. Your client contributed significantly to the household and the mortgage but has no documentation beyond bank statements showing transfers over the years. You are advising on what claims, if any, your client realistically has regarding the home, support, and the child.",
    keyIssues: [
      "What property or compensation claims, if any, an unmarried cohabiting partner has in an asset titled solely in the other partner's name, absent a marriage",
      "Whether informal financial contributions over time (mortgage payments, household support) can support a claim despite the lack of marriage",
      "Whether support-type claims exist between unmarried partners at all, or whether any support question is limited to the child alone",
      "How child-related obligations (support, custody) are handled independently of the couple's unmarried status and the property dispute",
    ],
    expectedConcepts: [
      "cohabitation and unmarried-partner rights",
      "unjust enrichment / contribution-based property claims",
      "absence of spousal support absent marriage",
      "child support independent of parents' marital status",
      "titled ownership versus equitable contribution",
    ],
    modelApproach:
      "A strong answer does not treat the partner's sole title as automatically the end of the inquiry; it explores whether a contribution-based or unjust-enrichment theory can give your client a claim against the home's value despite never being on title, while being realistic that most systems do not extend marriage-style spousal support to unmarried partners regardless of relationship length. It keeps the child support and custody questions analytically separate from the property dispute, since those obligations arise from parentage, not from the couple's marital status.",
    furtherReading: [
      "Property and compensation claims between unmarried cohabiting partners",
      "Unjust enrichment and contribution-based claims to a solely titled asset",
      "Child support and custody obligations independent of the parents' marital status",
    ],
    premium: true,
    testsFundamentals: ["law-family-cohabitation-unmarried-partners", "law-family-property-division-divorce"],
  },
  {
    id: "law-family-contested-fault-divorce",
    profession: "law",
    category: "Family Law",
    title: "Choosing a Route to Divorce When One Spouse Won't Agree",
    scenario:
      "Your client wants a divorce, but their spouse refuses to consent to any version of the split and insists on contesting it entirely, including disputing the characterization of several significant assets. Your client wants to know the realistic options for actually obtaining a divorce given the spouse's refusal to cooperate, including whether fault (citing the spouse's own conduct during the marriage) would get the process moving faster than waiting out a no-fault route, and what a prolonged separation requirement might mean for how long this actually takes. Your client is also concerned that contesting fault could backfire by escalating the asset disputes rather than resolving anything.",
    keyIssues: [
      "What routes to divorce are available when one spouse refuses to consent, and whether any of them still requires a waiting or separation period regardless of fault",
      "Whether pursuing a fault-based route offers a realistic speed advantage, or mainly adds cost, delay, and conflict without changing the ultimate outcome",
      "How contesting fault could affect the separate property division and support negotiations, for better or worse",
      "A realistic sequencing recommendation given the spouse's stated refusal to cooperate on both the divorce and the asset characterization",
    ],
    expectedConcepts: [
      "no-fault versus fault-based divorce",
      "separation period requirements",
      "contested divorce procedure",
      "interplay between fault findings and property/support outcomes",
      "unilateral versus mutual-consent divorce",
    ],
    modelApproach:
      "A strong answer is realistic that an unwilling spouse generally cannot block a divorce indefinitely, but that the available route (no-fault with a waiting period, or a fault-based filing) changes the timeline and the dynamics of the asset fight differently depending on the system. It weighs whether pursuing fault is likely to speed things up or simply escalate the already-contested property dispute, and gives a sequencing recommendation grounded in that tradeoff rather than treating fault as a free, risk-free lever to pull.",
    furtherReading: [
      "No-fault and fault-based grounds for divorce compared",
      "Mandatory separation periods as a precondition to divorce",
      "The practical effect of a fault finding on related property and support disputes",
    ],
    testsFundamentals: ["law-family-grounds-for-divorce", "law-family-property-division-divorce"],
  },
  {
    id: "law-family-hidden-asset-divorce",
    profession: "law",
    category: "Family Law",
    title: "A Spouse Who Quietly Moved Money Before Filing",
    scenario:
      "Your client's spouse filed for divorce six weeks ago, and your client has since discovered that, over the eight months beforehand, the spouse transferred a substantial sum from a joint investment account into a new account solely in the spouse's name and in the name of a sibling, describing the transfers in family messages as a 'loan' that was never formally documented or repaid. The spouse now argues the money was always intended as a gift to the sibling and is therefore no longer part of the marital estate to be divided. Your client wants to know whether these transfers can be unwound or otherwise accounted for in the property division, and what evidence will matter most.",
    keyIssues: [
      "Whether pre-filing transfers of marital funds to a third party can be clawed back or credited against the transferring spouse's share of the marital estate",
      "Whether the 'loan' versus 'gift' characterization matters, and what evidence would support treating the transfer as a dissipation of marital assets rather than a legitimate transaction",
      "What remedies are available if the funds have already been spent or are otherwise unrecoverable from the sibling",
      "What discovery and disclosure obligations apply to uncover the full scope of similar transfers",
    ],
    expectedConcepts: [
      "dissipation of marital assets",
      "financial disclosure obligations in divorce",
      "tracing transferred funds",
      "offsetting a spouse's share for wrongful depletion of the marital estate",
      "fraudulent transfer / family-member transferee issues",
    ],
    modelApproach:
      "A strong answer treats this as a dissipation issue rather than a simple characterization dispute, and focuses on what evidence (the undocumented 'loan' framing, the timing relative to the filing, the recipient being a close relative) supports treating the transfer as an improper depletion of the marital estate. It identifies that even if the funds cannot be physically recovered from the sibling, the transferring spouse's own share of the remaining estate can often be adjusted to offset the dissipation, and flags financial disclosure and discovery as the tools to uncover the full extent of the pattern.",
    furtherReading: [
      "Dissipation of marital assets and remedies available in property division",
      "Financial disclosure obligations and discovery tools in divorce proceedings",
      "Tracing and characterizing undocumented intra-family transfers during a pending divorce",
    ],
    premium: true,
    testsFundamentals: ["law-family-property-division-divorce", "law-family-matrimonial-property-regime"],
  },
];
