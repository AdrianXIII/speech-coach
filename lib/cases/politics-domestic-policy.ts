import type { CaseStudy } from "@/lib/caseStudyContent";
import type { Fundamental } from "@/lib/caseStudyFundamentals";

/**
 * Politics / Domestic Policy: the fundamentals checklist and the case bank
 * for this category, kept together so they can be written and reviewed as
 * one unit. Registered in lib/cases/index.ts.
 */
export const POLITICS_DOMESTIC_POLICY_FUNDAMENTALS: Fundamental[] = [];

export const POLITICS_DOMESTIC_POLICY_CASES: CaseStudy[] = [
  {
    id: "pol-domestic-healthcare-tradeoff",
    profession: "politics",
    category: "Domestic Policy",
    title: "The Healthcare Reform Trade-off",
    scenario:
      "Your proposed healthcare reform would expand coverage to 2 million currently uninsured citizens, but independent budget analysis shows it requires either raising taxes on middle-income earners or running a significant deficit increase — both politically costly. Your coalition partners are divided on which trade-off is more acceptable. You must present a path forward to leadership.",
    keyIssues: [
      "Genuine trade-off between coverage expansion goals and fiscal/political cost",
      "Which constituencies bear the cost of each option and the political consequences",
      "Whether phased implementation could reduce the immediate fiscal or political shock",
      "Coalition management given genuine internal disagreement, not just messaging",
    ],
    expectedConcepts: [
      "fiscal impact analysis",
      "coalition politics",
      "policy phasing",
      "distributional impact",
      "political capital",
    ],
    modelApproach:
      "A strong answer doesn't pretend the trade-off doesn't exist, and instead proposes a specific way to manage it — such as phased implementation to spread fiscal impact, or a hybrid funding mechanism that distributes cost more broadly — while being explicit about the coalition management needed to hold the reform together politically.",
    furtherReading: [
      "Comparative healthcare financing models",
      "Policy phasing and implementation strategy",
      "Coalition government policy negotiation dynamics",
    ],
  },
  {
    id: "pol-domestic-tax-reform",
    profession: "politics",
    category: "Domestic Policy",
    title: "Tax Reform: Growth vs. Equity",
    scenario:
      "Your finance ministry has proposed a corporate tax cut projected to boost investment and GDP growth by economists across the political spectrum, but independent analysis also shows it would disproportionately benefit already-wealthy shareholders in the short term, worsening measured inequality before any broader benefits materialize. Opposition parties and some of your own base are attacking the plan as regressive. You must defend or revise the policy.",
    keyIssues: [
      "Genuine economic trade-off between growth incentives and near-term distributional fairness",
      "Time horizon mismatch: growth benefits materialize later than the distributional cost is felt",
      "Whether complementary measures (e.g., targeted low-income tax relief) could address the equity critique without abandoning the growth policy",
      "Political credibility of the growth argument given historical examples where promised benefits didn't fully materialize",
    ],
    expectedConcepts: [
      "supply-side economics",
      "distributional analysis",
      "trickle-down critique",
      "tax incidence",
      "policy sequencing",
    ],
    modelApproach:
      "A strong answer doesn't dismiss the equity critique as merely political noise — it engages with the genuine time-horizon mismatch between growth benefits and distributional cost, and proposes pairing the corporate tax cut with a complementary measure that addresses near-term equity concerns directly, rather than relying solely on the growth argument.",
    furtherReading: [
      "Tax incidence analysis and distributional effects of corporate tax policy",
      "Empirical research on corporate tax cuts and investment/growth outcomes",
      "Policy sequencing and complementary measure design",
    ],
  },
];
