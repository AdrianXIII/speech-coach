import type { CaseStudy } from "@/lib/caseStudyContent";
import type { Fundamental } from "@/lib/caseStudyFundamentals";

/**
 * Law / Criminal Law: the fundamentals checklist and the case bank
 * for this category, kept together so they can be written and reviewed as
 * one unit. Registered in lib/cases/index.ts.
 */
export const LAW_CRIMINAL_LAW_FUNDAMENTALS: Fundamental[] = [];

export const LAW_CRIMINAL_LAW_CASES: CaseStudy[] = [
  {
    id: "law-criminal-fraud-defense",
    profession: "law",
    category: "Criminal Law",
    title: "Defending a White-Collar Fraud Case",
    scenario:
      "Your client, a former CFO, is charged with securities fraud for allegedly approving misleading financial disclosures. He maintains he relied in good faith on figures provided by subordinates and outside auditors, and had no intent to deceive. The prosecution has emails showing he raised internal concerns about the numbers but signed off anyway under pressure from the CEO. You're building the defense strategy.",
    keyIssues: [
      "Scienter (intent to defraud) as the critical element the prosecution must prove beyond reasonable doubt",
      "Good-faith reliance on subordinates and auditors as a defense, despite the concerning emails",
      "How to contextualize the internal emails without appearing to concede guilt",
      "Pressure from superiors as context for the decision, though not a full legal defense",
    ],
    expectedConcepts: [
      "scienter",
      "securities fraud",
      "good-faith defense",
      "burden of proof",
      "mens rea",
    ],
    modelApproach:
      "A strong answer centers the defense on scienter — arguing the emails show due diligence and internal concern-raising, not intent to deceive — while being realistic that this evidence is genuinely double-edged and needs careful framing, not denial. It should explicitly name the prosecution's burden to prove intent beyond a reasonable doubt.",
    furtherReading: [
      "Scienter requirement in securities fraud prosecutions",
      "Good-faith reliance defense in white-collar cases",
      "Case law on executive liability for subordinate-prepared disclosures",
    ],
  },
  {
    id: "law-criminal-evidence-admissibility",
    profession: "law",
    category: "Criminal Law",
    title: "Challenging Evidence Admissibility",
    scenario:
      "Police searched your client's home and found evidence central to the prosecution's case, based on a warrant that was later found to contain an address error (correct street, wrong apartment number in a multi-unit building). The prosecution argues the error was a harmless clerical mistake since officers still searched the right physical location the informant described. You're arguing to suppress the evidence.",
    keyIssues: [
      "Particularity requirement of the Fourth Amendment for warrants",
      "Whether the good-faith exception to the exclusionary rule applies despite the warrant defect",
      "Practical effect of the error: did it actually risk searching the wrong premises",
      "Precedent on clerical/technical warrant errors and their materiality",
    ],
    expectedConcepts: [
      "Fourth Amendment",
      "particularity requirement",
      "exclusionary rule",
      "good-faith exception",
      "suppression motion",
    ],
    modelApproach:
      "A strong answer engages directly with the good-faith exception (Leon), since that's the prosecution's likely strongest counter, and argues either that the error was significant enough to defeat good faith or that it satisfies particularity in substance despite the technical error — rather than relying on a bare particularity argument alone.",
    furtherReading: [
      "Fourth Amendment particularity requirement case law",
      "United States v. Leon and the good-faith exception",
      "Suppression motion strategy in criminal defense",
    ],
  },
];
