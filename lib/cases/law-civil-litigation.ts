import type { CaseStudy } from "@/lib/caseStudyContent";
import type { Fundamental } from "@/lib/caseStudyFundamentals";

/**
 * Law / Civil Litigation: the fundamentals checklist and the case bank
 * for this category, kept together so they can be written and reviewed as
 * one unit. Registered in lib/cases/index.ts.
 */
export const LAW_CIVIL_LITIGATION_FUNDAMENTALS: Fundamental[] = [];

export const LAW_CIVIL_LITIGATION_CASES: CaseStudy[] = [
  {
    id: "law-civil-product-liability",
    profession: "law",
    category: "Civil Litigation",
    title: "The Product Liability Suit",
    scenario:
      "Your client, a power-tool manufacturer, is being sued after a user was injured while operating a saw with the safety guard allegedly removed by the user prior to the accident. The plaintiff argues the guard was too easy to remove, constituting a design defect. Your client's engineering team maintains the guard meets all industry safety standards. You're preparing the defense strategy.",
    keyIssues: [
      "Whether meeting industry standards is sufficient defense against a design-defect claim, or just one factor",
      "Comparative/contributory negligence given the user's own modification of the safety guard",
      "Risk-utility test for design defect: could a safer, still-functional alternative design have existed",
      "Documentary evidence needed regarding design decisions and safety testing",
    ],
    expectedConcepts: [
      "design defect",
      "risk-utility test",
      "comparative negligence",
      "industry standard defense",
      "product liability",
    ],
    modelApproach:
      "A strong answer doesn't rest the defense solely on industry-standard compliance (which courts often treat as evidence, not a complete defense), and instead builds a risk-utility argument alongside a comparative negligence argument based on the user's own removal of the safety guard — using both doctrinal threads together.",
    furtherReading: [
      "Risk-utility test in products liability law",
      "Restatement (Third) of Torts: Products Liability",
      "Comparative negligence and its interaction with strict liability claims",
    ],
  },
  {
    id: "law-civil-wrongful-termination",
    profession: "law",
    category: "Civil Litigation",
    title: "The Wrongful Termination Claim",
    scenario:
      "Your corporate client terminated an employee for documented performance issues one week after she filed an internal complaint about a manager's conduct. She's now suing for wrongful termination and retaliation, arguing the timing is suspicious even though the performance issues predate the complaint. You must assess the strength of the company's defense.",
    keyIssues: [
      "Temporal proximity between the complaint and termination as circumstantial evidence of retaliation",
      "Quality and consistency of the documented performance record predating the complaint",
      "Whether similarly-situated employees without complaints received the same treatment for similar issues",
      "Pretext analysis: whether the stated reason is likely genuine or a cover for retaliation",
    ],
    expectedConcepts: [
      "retaliation claim",
      "pretext",
      "temporal proximity",
      "McDonnell Douglas burden-shifting framework",
      "at-will employment",
    ],
    modelApproach:
      "A strong answer takes the temporal proximity concern seriously rather than dismissing it, and focuses the defense on the McDonnell Douglas framework — showing a legitimate, well-documented, consistently-applied reason for termination and comparator evidence — rather than relying on 'she was at-will' alone.",
    furtherReading: [
      "McDonnell Douglas burden-shifting framework in employment discrimination/retaliation claims",
      "Temporal proximity as evidence of retaliatory intent",
      "Documentation best practices in performance-based terminations",
    ],
  },
];
