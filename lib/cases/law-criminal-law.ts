import type { CaseStudy } from "@/lib/caseStudyContent";
import type { Fundamental } from "@/lib/caseStudyFundamentals";

/**
 * Law / Criminal Law: the fundamentals checklist and the case bank
 * for this category, kept together so they can be written and reviewed as
 * one unit. Registered in lib/cases/index.ts.
 *
 * Cases are written to be jurisdiction-neutral: they must make sense whether
 * the reader is thinking in an adversarial system (US) or a more
 * inquisitorial one (investigating judges in France/Spain, prosecutor-led
 * investigation and lay judges in Germany/Sweden). No single-country
 * statutes, courts, or offices are named.
 */
export const LAW_CRIMINAL_LAW_FUNDAMENTALS: Fundamental[] = [
  { id: "law-criminal-actus-reus-mens-rea", label: "Applying the guilty-act and guilty-mind (actus reus/mens rea) elements to determine whether a crime has been committed" },
  { id: "law-criminal-burden-standard-of-proof", label: "Applying the presumption of innocence and the criminal standard of proof to decide whether guilt has been established" },
  { id: "law-criminal-lawful-evidence-gathering", label: "Evaluating whether evidence was lawfully obtained and what follows if a search or seizure was defective" },
  { id: "law-criminal-right-to-counsel", label: "Applying the right to legal counsel and to silence during police questioning or pretrial custody" },
  { id: "law-criminal-pretrial-detention", label: "Assessing the necessity and proportionality of pretrial detention against the presumption of liberty" },
  { id: "law-criminal-investigation-structure", label: "Distinguishing the roles of the investigating judge/magistrate, prosecutor, and police in directing a criminal investigation" },
  { id: "law-criminal-prosecutorial-discretion", label: "Weighing prosecutorial discretion against a mandatory-prosecution duty in deciding whether to bring charges" },
  { id: "law-criminal-negotiated-resolution", label: "Advising a client on a negotiated resolution (plea bargain, penal order, or abbreviated procedure) versus proceeding to trial" },
  { id: "law-criminal-factfinder-composition", label: "Adapting trial strategy to the composition of the fact-finder, whether jury, lay judges, or a professional bench" },
  { id: "law-criminal-accomplice-liability", label: "Applying accomplice, conspiracy, or joint-enterprise liability to a defendant who did not personally commit the core act" },
  { id: "law-criminal-affirmative-defenses", label: "Building an affirmative defense such as self-defense, necessity, duress, or diminished capacity" },
  { id: "law-criminal-sentencing-factors", label: "Weighing aggravating and mitigating factors and proportionality in a sentencing argument" },
  { id: "law-criminal-double-jeopardy", label: "Applying the double-jeopardy / ne bis in idem principle to bar re-prosecution for the same conduct" },
  { id: "law-criminal-appeal-standard", label: "Distinguishing what an appellate or review court can revisit: errors of law versus fresh findings of fact" },
  { id: "law-criminal-victim-participation", label: "Accounting for a victim's own independent role in a criminal proceeding alongside the public prosecution" },
  { id: "law-criminal-corporate-liability", label: "Applying corporate or organizational criminal liability, including compliance-program defenses, to conduct by employees" },
  { id: "law-criminal-juvenile-justice", label: "Adapting charging and sentencing strategy for a minor under a diversion-oriented juvenile-justice framework" },
  { id: "law-criminal-forensic-evidence-reliability", label: "Challenging the chain of custody and reliability of forensic or expert evidence" },
  { id: "law-criminal-witness-credibility", label: "Assessing eyewitness credibility and identification evidence for known reliability risks" },
  { id: "law-criminal-restorative-compensation", label: "Weighing restorative justice measures and victim compensation orders alongside punitive sentencing" },
];

export const LAW_CRIMINAL_LAW_CASES: CaseStudy[] = [
  {
    id: "law-criminal-fraud-defense",
    profession: "law",
    category: "Criminal Law",
    title: "Defending an Executive Accused of Fraud",
    scenario:
      "Your client, a former finance director at a mid-sized company, is charged with fraud for approving financial disclosures that turned out to be misleading. He maintains he relied in good faith on figures prepared by subordinates and outside auditors, and had no intent to deceive anyone. The prosecution has internal emails, sent about six weeks before the disclosures went out, showing he raised concerns about the numbers before signing off, which it says proves he knew they were wrong. Your client insists he signed off because he believed his team's later reassurances, not because he abandoned his doubts. You are building the defense strategy for trial.",
    keyIssues: [
      "Proving the fault element (intent to deceive) as the fact the prosecution must establish, not merely that the disclosures were inaccurate",
      "Good-faith reliance on subordinates and outside auditors as a defense, despite the concerning emails",
      "How to contextualize the internal emails without appearing to concede the client's guilty state of mind",
      "Distinguishing negligent oversight, which may not be criminal, from a genuinely fraudulent state of mind",
    ],
    expectedConcepts: [
      "fault element / mens rea",
      "fraud",
      "good-faith reliance defense",
      "burden of proof",
      "standard of proof beyond reasonable doubt",
      "negligence versus intent",
    ],
    modelApproach:
      "A strong answer centers the defense on the fault element — arguing the emails show diligence and genuine concern-raising rather than an intent to deceive — while acknowledging this evidence is double-edged and needs careful framing rather than denial. It should explicitly name the prosecution's burden to prove intent to the applicable criminal standard, and distinguish carelessness from fraud.",
    furtherReading: [
      "The fault/intent requirement in fraud offenses across jurisdictions",
      "Good-faith reliance as a defense in white-collar prosecutions",
      "Comparative treatment of executive liability for subordinate-prepared disclosures",
    ],
    testsFundamentals: ["law-criminal-actus-reus-mens-rea", "law-criminal-burden-standard-of-proof"],
  },
  {
    id: "law-criminal-evidence-admissibility",
    profession: "law",
    category: "Criminal Law",
    title: "Challenging How the Evidence Was Obtained",
    scenario:
      "Police searched your client's home under a search order that was later found to contain an address error — the correct street, but the wrong apartment number in a multi-unit building. The evidence found during that search is central to the prosecution's case. The prosecution argues the error was a harmless clerical mistake, since officers searched the physical location the informant actually described, and that excluding the evidence over a paperwork slip would let a guilty person go free on a technicality. You are arguing to have the evidence excluded from trial.",
    keyIssues: [
      "Whether the search order was specific enough to lawfully authorize searching your client's actual unit",
      "Whether an honest, good-faith error by the authorizing authority should still permit the evidence's use despite the defect",
      "The practical effect of the error: did it create a real risk of searching the wrong home, or was the target unambiguous in substance",
      "How courts in different systems treat clerical versus substantive defects in search authorizations when deciding whether to exclude evidence",
    ],
    expectedConcepts: [
      "particularity of a search authorization",
      "exclusion of unlawfully obtained evidence",
      "good-faith exception (where recognized)",
      "proportionality of the intrusion",
      "burden of proof on the prosecution",
      "role of the authorizing judge or magistrate",
    ],
    modelApproach:
      "A strong answer engages directly with whether the defect was substantive or merely clerical, addresses the prosecution's most likely counterargument (a good-faith or harmless-error exception) rather than ignoring it, and argues either that the error was serious enough to defeat any such exception or that the order was sufficiently particular in substance despite the typo.",
    furtherReading: [
      "Comparative approaches to exclusion of unlawfully gathered evidence",
      "The role of the authorizing judge or magistrate in approving search measures",
      "Clerical versus substantive defects in search authorizations",
    ],
    testsFundamentals: ["law-criminal-lawful-evidence-gathering", "law-criminal-investigation-structure"],
  },
  {
    id: "law-criminal-interrogation-confession",
    profession: "law",
    category: "Criminal Law",
    title: "The Confession Without a Lawyer Present",
    scenario:
      "Your client was questioned by police for six hours after being detained on suspicion of burglary, and eventually signed a confession. He says he asked to speak with a lawyer twice during questioning and was told one would be 'sorted out later,' and that by the end he was exhausted and just wanted the questioning to stop. The interviewing officers say he never clearly invoked his right to counsel and that the confession was voluntary. The confession is now the centerpiece of the prosecution's case, with little other direct evidence tying him to the scene. You must decide whether and how to challenge its use at trial.",
    keyIssues: [
      "Whether your client's requests were clear enough to count as invoking the right to counsel during questioning",
      "Voluntariness of the confession given the length of questioning and his stated exhaustion",
      "Consequences for the confession, and for evidence found because of it, if the right to counsel was violated",
      "Trial strategy if the confession cannot be excluded and the case proceeds largely on that evidence",
    ],
    expectedConcepts: [
      "right to counsel during questioning",
      "voluntariness of a confession",
      "exclusion of improperly obtained evidence",
      "fruit of an unlawful interrogation",
      "burden of proof",
      "credibility of contested interview accounts",
    ],
    modelApproach:
      "A strong answer treats the right to counsel as central and argues concretely from the facts (repeated requests, length of questioning, exhaustion) rather than asserting a violation in the abstract. It also plans for the scenario where exclusion fails, addressing how to attack the confession's reliability and weight at trial.",
    furtherReading: [
      "The right to legal assistance during police questioning across jurisdictions",
      "Voluntariness standards for confessions",
      "Consequences of excluding evidence obtained through a rights violation",
    ],
    premium: true,
    testsFundamentals: ["law-criminal-right-to-counsel", "law-criminal-lawful-evidence-gathering"],
  },
  {
    id: "law-criminal-bail-hearing",
    profession: "law",
    category: "Criminal Law",
    title: "Arguing Against Pretrial Detention",
    scenario:
      "Your client was arrested two days ago on a serious assault charge, and the prosecutor is seeking to keep him in pretrial detention until trial, citing flight risk and the seriousness of the allegations. Your client has a stable job, a fixed address, two young children, and no prior convictions; he denies the charge and says he acted in self-defense. Trial is not expected to begin for at least eight months. You are appearing before the court to argue for his release, with or without conditions, pending trial.",
    keyIssues: [
      "Whether the seriousness of the charge alone is enough to justify continued detention, or whether concrete flight or interference risk must be shown",
      "Availability of less restrictive conditions (reporting requirements, surrendering travel documents, sureties) as alternatives to detention",
      "The presumption of innocence and its bearing on pretrial deprivation of liberty before guilt is established",
      "Proportionality between the length of likely pretrial detention and the sentence your client would actually face if convicted",
    ],
    expectedConcepts: [
      "pretrial detention",
      "presumption of innocence",
      "flight risk",
      "proportionality",
      "conditions of release",
      "necessity of detention",
    ],
    modelApproach:
      "A strong answer does not just assert the presumption of innocence rhetorically — it builds a concrete, fact-based case against necessity (ties to the community, no prior record, available conditions) and directly engages the proportionality point about detention length versus likely sentence, rather than treating detention as automatic given the charge.",
    furtherReading: [
      "Necessity and proportionality standards for pretrial detention",
      "Alternatives to pretrial detention across legal systems",
      "The presumption of innocence and pretrial liberty",
    ],
    premium: true,
    testsFundamentals: ["law-criminal-pretrial-detention", "law-criminal-burden-standard-of-proof"],
  },
  {
    id: "law-criminal-charging-discretion",
    profession: "law",
    category: "Criminal Law",
    title: "Deciding Whether to Bring Charges",
    scenario:
      "You are the prosecutor reviewing a file involving a workplace altercation that left one employee with a broken wrist. The evidence supports a charge of assault, but it is a first offense, the parties have since reconciled, and the injured employee — while initially wanting charges — has now asked you not to pursue the case, saying a formal prosecution would cost her the working relationship she still needs. Your office generally encourages diversion for low-level, first-time offenses where the victim supports it, but a colleague argues the injury was serious enough that declining to charge would look like the office doesn't take workplace violence seriously. You need to decide, and be ready to explain the decision.",
    keyIssues: [
      "How much weight the victim's stated wishes should carry against the office's independent duty to enforce the law",
      "Whether diversion or a formal charge better serves the purposes of the criminal process here (deterrence, accountability, proportionality)",
      "The limits of prosecutorial discretion where your legal system leans toward mandatory prosecution for offenses of this seriousness",
      "How to explain a declination or diversion decision so it doesn't appear to devalue the injury",
    ],
    expectedConcepts: [
      "prosecutorial discretion",
      "mandatory prosecution principle",
      "diversion",
      "victim's role in the charging decision",
      "proportionality",
      "public interest in prosecution",
    ],
    modelApproach:
      "A strong answer recognizes that discretion is not unlimited in every system — some systems favor mandatory prosecution absent narrow exceptions — and reasons explicitly about where this case falls on that spectrum. It weighs the victim's wishes as a real but not decisive factor, and reaches a defensible decision with reasons that could be stated publicly.",
    furtherReading: [
      "Prosecutorial discretion versus mandatory prosecution across legal systems",
      "Diversion programs for first-time, low-level offenses",
      "The victim's role in the decision whether to prosecute",
    ],
    premium: true,
    testsFundamentals: ["law-criminal-prosecutorial-discretion", "law-criminal-victim-participation"],
  },
  {
    id: "law-criminal-plea-offer",
    profession: "law",
    category: "Criminal Law",
    title: "Advising on a Negotiated Resolution",
    scenario:
      "Your client is charged with a mid-level theft offense involving goods worth roughly nine hundred euros. The prosecutor has offered a negotiated resolution: a reduced charge and a suspended sentence with no additional custody, in exchange for accepting responsibility and forgoing a full trial. Your client insists he only took the item because a coworker told him it was abandoned stock and he genuinely believed that, which would be a real defense if a court accepted it. But he is also risk-averse, has no savings to weather a longer proceeding, and is worried that even a modest chance of a custodial sentence at trial isn't worth taking. You need to advise him on whether to accept.",
    keyIssues: [
      "Realistically weighing the strength of the good-faith belief defense against the risk and cost of trial",
      "What your client actually gives up by accepting a negotiated resolution, including the ability to later contest guilt",
      "How sentencing exposure at trial compares to the offer, if the defense fails",
      "Ensuring the client's decision is genuinely informed and voluntary, not just pressure to avoid a stressful process",
    ],
    expectedConcepts: [
      "negotiated resolution / plea bargaining",
      "mens rea / good-faith belief defense",
      "sentencing exposure",
      "risk-adjusted trial strategy",
      "informed and voluntary decision-making",
      "presumption of innocence",
    ],
    modelApproach:
      "A strong answer doesn't just recommend accepting or rejecting the offer — it walks through the actual strength of the defense, quantifies the downside risk at trial versus the offer, and treats the final decision as the client's to make once properly informed, rather than the lawyer's alone.",
    furtherReading: [
      "Negotiated resolution procedures across adversarial and inquisitorial systems",
      "Sentencing discounts for early acceptance of responsibility",
      "Ensuring a voluntary and informed plea or admission",
    ],
    premium: true,
    testsFundamentals: ["law-criminal-negotiated-resolution", "law-criminal-sentencing-factors"],
  },
  {
    id: "law-criminal-addressing-factfinder",
    profession: "law",
    category: "Criminal Law",
    title: "Arguing Self-Defense to the Court",
    scenario:
      "Your client struck another man during a bar altercation, breaking his jaw, after the other man allegedly shoved him and raised a bottle. Your client says he believed he was about to be hit and struck first to stop it. There is no video, and the two witnesses who were present give conflicting accounts of who moved first. You will be presenting the self-defense argument at trial, and the case will be decided by whoever is the actual fact-finder in your court — a jury, a panel of lay and professional judges together, or a professional judge alone, depending on the system and the offense's seriousness.",
    keyIssues: [
      "Whether your client's belief that force was necessary was both genuine and objectively reasonable given what he perceived",
      "Proportionality of the force used against the threat he says he faced",
      "How the conflicting witness accounts affect whether the defense can be established to the required standard",
      "Adapting how you present and frame the argument to the actual composition of the fact-finder in your court",
    ],
    expectedConcepts: [
      "self-defense",
      "necessity and proportionality of force",
      "reasonable belief standard",
      "credibility of conflicting testimony",
      "burden of proof on self-defense",
      "role of the fact-finder (jury, lay judges, or professional bench)",
    ],
    modelApproach:
      "A strong answer builds the self-defense argument on both genuineness and reasonableness of the belief, engages honestly with the conflicting witness accounts rather than ignoring them, and shows awareness that the same argument must be pitched differently depending on whether it will be heard by a jury, a mixed lay/professional panel, or a professional judge alone.",
    furtherReading: [
      "Self-defense doctrine: subjective belief versus objective reasonableness",
      "Comparative fact-finder composition in criminal trials (jury, lay judges, professional bench)",
      "Handling conflicting eyewitness testimony at trial",
    ],
    premium: true,
    testsFundamentals: ["law-criminal-factfinder-composition", "law-criminal-affirmative-defenses"],
  },
  {
    id: "law-criminal-getaway-driver",
    profession: "law",
    category: "Criminal Law",
    title: "The Driver Who Never Went Inside",
    scenario:
      "Your client drove two acquaintances to a warehouse and waited outside while they broke in and stole equipment worth about forty thousand euros; she says she believed they were only going to 'pick something up' and had no idea a break-in was planned. Cell phone records show she left the engine running and pulled away quickly once the others returned. The prosecution charges her as an accomplice to the burglary, arguing her conduct and the timing show she knew exactly what was happening. You are building her defense around what she actually knew and intended.",
    keyIssues: [
      "What level of knowledge and intent accomplice liability requires beyond simply providing assistance",
      "Whether the driving-away-quickly evidence proves knowledge of the plan or is equally consistent with innocent surprise",
      "Distinguishing accomplice liability from mere presence or unwitting assistance",
      "How the timeline and her actual statements support or undercut her claimed lack of knowledge",
    ],
    expectedConcepts: [
      "accomplice / secondary liability",
      "mens rea for participation in another's offense",
      "mere presence versus complicity",
      "circumstantial evidence of knowledge",
      "burden of proof",
      "conspiracy versus accomplice liability",
    ],
    modelApproach:
      "A strong answer focuses on the specific knowledge/intent threshold for accomplice liability in the applicable system, rather than treating 'she was there and drove away' as automatically sufficient, and addresses the quick-departure evidence directly with an alternative, innocent explanation instead of ignoring it.",
    furtherReading: [
      "Accomplice and secondary liability doctrine",
      "Distinguishing complicity from mere presence at the scene",
      "Circumstantial evidence of knowledge and intent",
    ],
    premium: true,
    testsFundamentals: ["law-criminal-accomplice-liability", "law-criminal-actus-reus-mens-rea"],
  },
  {
    id: "law-criminal-sentencing-restitution",
    profession: "law",
    category: "Criminal Law",
    title: "Sentencing and Compensating the Victim",
    scenario:
      "Your client has been convicted of causing serious injury through a reckless workplace safety violation that put a colleague in hospital for five weeks. He has no prior convictions, has cooperated fully with the investigation, and has voluntarily offered to pay the injured colleague's lost wages and medical costs, totaling around eighteen thousand euros. The prosecutor is asking for a significant custodial sentence, citing the severity of the injury and the need for deterrence across the industry. You are presenting sentencing submissions, including the case for weighing his cooperation, lack of record, and compensation offer against a lighter or non-custodial outcome.",
    keyIssues: [
      "Which aggravating factors (severity of harm, industry-wide deterrence need) and mitigating factors (no record, cooperation, remorse) actually apply and how they should be weighed",
      "Whether a genuine compensation or restitution offer to the victim should meaningfully affect the sentence",
      "Proportionality between the sentence sought and sentences typically imposed for comparable conduct",
      "Balancing punitive, deterrent, and restorative purposes of sentencing in a single recommendation",
    ],
    expectedConcepts: [
      "aggravating and mitigating factors",
      "proportionality in sentencing",
      "restitution / compensation orders",
      "restorative justice",
      "deterrence as a sentencing purpose",
      "cooperation and remorse as mitigation",
    ],
    modelApproach:
      "A strong answer organizes the submission around specific aggravating and mitigating factors rather than general pleas for leniency, makes a concrete case for how the compensation offer should factor into the outcome, and explicitly addresses the deterrence argument rather than avoiding the prosecution's strongest point.",
    furtherReading: [
      "Aggravating and mitigating factors in sentencing frameworks",
      "Restitution and compensation orders in criminal sentencing",
      "Restorative versus purely punitive approaches to sentencing",
    ],
    premium: true,
    testsFundamentals: ["law-criminal-sentencing-factors", "law-criminal-restorative-compensation"],
  },
  {
    id: "law-criminal-second-prosecution",
    profession: "law",
    category: "Criminal Law",
    title: "A Second Case Over the Same Conduct",
    scenario:
      "Your client was tried and acquitted of causing a workplace fire through arson eighteen months ago, after the court found the prosecution hadn't proven intent. New investigators have since reviewed the file and want to bring a new charge over the same fire, this time framed as reckless endangerment rather than arson, arguing it is a legally distinct offense based on the same underlying conduct. Your client is alarmed at facing another proceeding over an incident he thought was resolved. You must assess whether the new charge is barred by the earlier acquittal or is genuinely a separate matter the authorities are entitled to pursue.",
    keyIssues: [
      "Whether the new charge concerns the same conduct as the earlier acquittal or is genuinely a legally and factually distinct offense",
      "The scope and purpose of the rule against being tried twice for the same conduct",
      "How re-charging under a different legal label affects that analysis, if the underlying facts are unchanged",
      "Whether reopening the case is a legitimate exercise of prosecutorial authority or an attempt to relitigate a finding the state already lost",
    ],
    expectedConcepts: [
      "double jeopardy / ne bis in idem",
      "same-conduct versus same-offense analysis",
      "finality of an acquittal",
      "prosecutorial discretion to re-charge",
      "distinct legal characterization of the same facts",
    ],
    modelApproach:
      "A strong answer works through whether the new charge truly targets the same underlying conduct as the acquittal, engages with the state's argument that a different offense definition makes it a distinct matter, and doesn't simply assert unfairness without grounding it in what the rule against double prosecution actually protects.",
    furtherReading: [
      "Double jeopardy / ne bis in idem principle in comparative criminal procedure",
      "Same-conduct versus same-offense tests for re-prosecution",
      "Finality of acquittals and limits on reopening criminal cases",
    ],
    premium: true,
    testsFundamentals: ["law-criminal-double-jeopardy", "law-criminal-prosecutorial-discretion"],
  },
  {
    id: "law-criminal-appeal-forensic-evidence",
    profession: "law",
    category: "Criminal Law",
    title: "Appealing a Conviction Built on a Lab Match",
    scenario:
      "Your client was convicted largely on the strength of a forensic match linking a fiber found at the scene to clothing seized from his home, and received a three-year sentence. After the trial, a review of the laboratory's records revealed the analyst had not followed the standard verification protocol, and that the lab's error rate for this technique is higher than was disclosed to the court. No new witness or alibi evidence has emerged; your grounds are entirely about how the forensic evidence was handled and presented. You are preparing the appeal.",
    keyIssues: [
      "Whether the appellate court can revisit this at all, given that appeals often review legal errors rather than reweigh factual findings",
      "Framing the lab protocol failure and undisclosed error rate as a legal error (admission of unreliable evidence) rather than simply relitigating the facts",
      "How much the conviction actually depended on the forensic evidence, given the rest of the record",
      "What remedy is realistically available: a new trial, exclusion of the evidence, or something narrower",
    ],
    expectedConcepts: [
      "standard and scope of appellate review",
      "reliability and admissibility of forensic/expert evidence",
      "chain of custody and laboratory protocol",
      "error preservation and materiality",
      "remedies on appeal (retrial, exclusion, resentencing)",
    ],
    modelApproach:
      "A strong answer is precise about the appellate court's actual role — distinguishing a genuine legal error (unreliable evidence improperly admitted) from an invitation to simply re-decide the facts — and connects the protocol failure concretely to whether the conviction can stand, rather than arguing reliability in the abstract.",
    furtherReading: [
      "Standards of appellate review: questions of law versus fact",
      "Reliability standards for forensic and expert evidence",
      "Remedies available on a successful criminal appeal",
    ],
    premium: true,
    testsFundamentals: ["law-criminal-appeal-standard", "law-criminal-forensic-evidence-reliability"],
  },
  {
    id: "law-criminal-corporate-bribery-charge",
    profession: "law",
    category: "Criminal Law",
    title: "Prosecuting the Company, Not Just the Employee",
    scenario:
      "A regional sales manager at a mid-sized company was caught paying bribes to a public official to win a supply contract worth several million euros. Investigators now want to charge the company itself, not just the manager, arguing senior management created a culture where hitting sales targets was rewarded regardless of method and turned a blind eye to red flags in the manager's expense reports. The company argues it had a written anti-bribery policy and training program, even if this one employee ignored them, and that criminal liability should stop with the individual who paid the bribe. You must assess whether the company's compliance program is a real defense or a paper shield.",
    keyIssues: [
      "What must be shown to attribute the manager's conduct to the company itself, rather than treating it as a rogue individual act",
      "Whether a written compliance program that was not meaningfully enforced can still support a defense",
      "The company's exposure if senior leadership's incentive structure, not just the policy on paper, is what actually mattered",
      "Consequences for the company versus the individual, and whether both can be pursued",
    ],
    expectedConcepts: [
      "corporate / organizational criminal liability",
      "attribution of an employee's conduct to the organization",
      "compliance program as a defense or mitigating factor",
      "bribery of a public official",
      "mens rea at the organizational level",
    ],
    modelApproach:
      "A strong answer goes beyond whether a policy existed on paper and asks whether it was genuinely implemented and enforced, ties the incentive structure directly to the attribution question, and reaches a clear view on whether the compliance program helps the company's defense or actually undercuts it.",
    furtherReading: [
      "Corporate/organizational criminal liability doctrine across jurisdictions",
      "Effective versus paper compliance programs as a defense",
      "Bribery of public officials and corporate exposure",
    ],
    premium: true,
    testsFundamentals: ["law-criminal-corporate-liability", "law-criminal-actus-reus-mens-rea"],
  },
  {
    id: "law-criminal-juvenile-diversion",
    profession: "law",
    category: "Criminal Law",
    title: "Charging a Sixteen-Year-Old as an Adult Offense",
    scenario:
      "A sixteen-year-old client is accused of a serious assault during a fight outside a school that left another student with a fractured cheekbone. The offense is serious enough that the prosecutor is considering whether it should be handled under the ordinary criminal process rather than the juvenile framework. Your client has no prior record, has been supported by family throughout, and a youth-services assessment suggests he would respond well to a structured diversion program. You are arguing for the case to stay within the juvenile framework, or at minimum for measures that reflect his age and circumstances, and you also need to make sure his procedural rights during questioning were properly respected given his age.",
    keyIssues: [
      "The factors that should determine whether a case involving a minor stays within a juvenile framework or moves toward an adult process",
      "How age and maturity bear on culpability and on the purposes served by diversion versus punishment",
      "Whether his rights, including access to counsel and to a parent or appropriate adult during questioning, were properly safeguarded given his age",
      "What a workable diversion outcome would look like here, and how to make the case for it",
    ],
    expectedConcepts: [
      "juvenile justice framework",
      "diversion",
      "age and culpability",
      "right to counsel and appropriate-adult safeguards for minors",
      "proportionality",
      "purposes of youth sentencing (rehabilitation versus punishment)",
    ],
    modelApproach:
      "A strong answer makes a concrete, individualized case for why this defendant fits the diversion framework rather than arguing age alone should control, and separately checks that his procedural safeguards during questioning were actually honored given his status as a minor.",
    furtherReading: [
      "Juvenile justice and diversion frameworks in comparative criminal law",
      "Procedural safeguards for minors during police questioning",
      "Purposes of youth sentencing: rehabilitation, proportionality, and public protection",
    ],
    premium: true,
    testsFundamentals: ["law-criminal-juvenile-justice", "law-criminal-right-to-counsel"],
  },
  {
    id: "law-criminal-eyewitness-identification",
    profession: "law",
    category: "Criminal Law",
    title: "The Identification That Doesn't Hold Up",
    scenario:
      "Your client was identified by a single eyewitness as the person who robbed a convenience store at night. The witness saw the perpetrator for only a few seconds, was initially unsure during the identification procedure, and picked your client only after an officer reportedly said 'take your time, look at number three again.' There is no forensic or video evidence connecting him to the scene, and your client has a consistent account of being elsewhere that evening. You are preparing to challenge the reliability of the identification at trial.",
    keyIssues: [
      "Known factors that undermine eyewitness reliability here: brief viewing time, night conditions, and initial uncertainty",
      "Whether the identification procedure itself was suggestive, given the officer's reported comment",
      "How to present the absence of any corroborating forensic or video evidence without overstating what that absence proves",
      "Strategy for cross-examining or questioning the identification without appearing to attack the witness personally",
    ],
    expectedConcepts: [
      "eyewitness identification reliability",
      "suggestive identification procedures",
      "corroborating evidence",
      "burden of proof",
      "questioning/cross-examination technique",
      "wrongful conviction risk factors",
    ],
    modelApproach:
      "A strong answer grounds the challenge in the specific, known reliability factors present in this identification (viewing time, conditions, procedure suggestiveness) rather than a generic 'eyewitnesses can be wrong' argument, and treats the lack of corroboration as reinforcing reasonable doubt rather than as proof of innocence on its own.",
    furtherReading: [
      "Eyewitness identification reliability research and legal standards",
      "Suggestive identification procedures and safeguards against them",
      "The role of corroborating evidence where identification is contested",
    ],
    premium: true,
    testsFundamentals: ["law-criminal-witness-credibility", "law-criminal-forensic-evidence-reliability"],
  },
];
