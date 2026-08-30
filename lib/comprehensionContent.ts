export interface ComprehensionPassage {
  id: string;
  topic: string;
  title: string;
  text: string;
  /** Sophisticated vocabulary/phrases actually present in the text. */
  advancedTerms: string[];
  /** Short phrases representing the passage's core facts, for content-coverage scoring. */
  keyPoints: string[];
}

/**
 * Short, professional-register passages across a few business topics —
 * read aloud via the browser's TTS, never shown as text during the
 * exercise. English, since the target skill ("sound professional in a
 * second language") is overwhelmingly a business-English use case.
 */
export const COMPREHENSION_PASSAGES: ComprehensionPassage[] = [
  {
    id: "market-correction",
    topic: "Economics",
    title: "Market Correction",
    text: "Last quarter, the company's stock price fell sharply after a series of strategic miscalculations by senior management. Analysts pointed to an overreliance on a single revenue stream, which left the firm vulnerable when consumer demand shifted unexpectedly. Furthermore, rising interest rates increased borrowing costs, squeezing profit margins even further. In response, the board initiated a comprehensive restructuring plan, diversifying the company's portfolio and cutting non-essential expenditures. While the downturn was significant, executives remain cautiously optimistic that these measures will restore investor confidence within the next two fiscal years.",
    advancedTerms: [
      "strategic miscalculations", "overreliance", "revenue stream",
      "profit margins", "restructuring", "diversifying", "expenditures",
      "cautiously optimistic",
    ],
    keyPoints: [
      "stock price fell", "strategic miscalculations", "single revenue stream",
      "rising interest rates", "restructuring plan", "diversifying portfolio",
    ],
  },
  {
    id: "startup-funding",
    topic: "Economics",
    title: "Startup Funding",
    text: "The fledgling startup secured a substantial round of venture capital after months of negotiations with prospective investors. Rather than pursuing rapid, unchecked expansion, the founders opted for a measured growth strategy, prioritizing sustainable revenue over sheer scale. This approach reassured investors who had grown wary of startups that prioritized valuation over viability. The funding will primarily be allocated toward research and development, along with strategic hires in engineering and sales. Industry observers suggest that this disciplined approach could position the company favorably compared to competitors burning through capital at an unsustainable rate.",
    advancedTerms: [
      "fledgling", "venture capital", "prospective investors",
      "measured growth strategy", "sustainable revenue", "valuation",
      "viability", "disciplined approach", "unsustainable rate",
    ],
    keyPoints: [
      "venture capital secured", "measured growth strategy", "sustainable revenue",
      "research and development", "strategic hires", "disciplined approach",
    ],
  },
  {
    id: "remote-work-culture",
    topic: "Leadership",
    title: "Remote Work Culture",
    text: "When the organization transitioned to a fully remote model, leadership quickly realized that traditional management practices were no longer effective. Consequently, managers shifted their focus from monitoring hours worked to evaluating measurable outcomes. This cultural shift required a significant investment in trust and transparent communication across all levels of the hierarchy. Some employees initially struggled with the lack of structure, whereas others thrived under the newfound autonomy. To address this disparity, the company introduced flexible check-ins and clearer performance benchmarks, ultimately fostering a more inclusive and adaptable work environment.",
    advancedTerms: [
      "transitioned", "measurable outcomes", "cultural shift",
      "transparent communication", "hierarchy", "autonomy", "disparity",
      "performance benchmarks", "adaptable",
    ],
    keyPoints: [
      "remote model transition", "monitoring hours to outcomes", "trust and communication",
      "employees struggled vs thrived", "flexible check-ins", "performance benchmarks",
    ],
  },
  {
    id: "crisis-management",
    topic: "Leadership",
    title: "Crisis Management",
    text: "Following a widely publicized product recall, the chief executive faced mounting pressure to address concerns from both customers and shareholders. Rather than downplaying the severity of the situation, she chose to acknowledge the failure candidly and outline a concrete plan for remediation. This transparency, though initially risky, ultimately bolstered public trust and mitigated long-term reputational damage. Internally, the company overhauled its quality assurance processes to prevent similar incidents. Industry experts later cited this response as a textbook example of effective crisis communication under intense scrutiny.",
    advancedTerms: [
      "mounting pressure", "downplaying", "candidly", "remediation",
      "bolstered", "mitigated", "reputational damage", "overhauled",
      "quality assurance", "scrutiny",
    ],
    keyPoints: [
      "product recall", "CEO acknowledged failure", "plan for remediation",
      "public trust", "quality assurance overhaul", "crisis communication",
    ],
  },
  {
    id: "ai-adoption",
    topic: "Technology",
    title: "AI Adoption",
    text: "As artificial intelligence tools became increasingly sophisticated, the manufacturing firm began integrating automated systems into its production line. Initially, employees expressed apprehension, fearing that the technology would render their roles obsolete. However, management emphasized that the goal was to augment human capabilities rather than replace them entirely. Workers were retrained to oversee and fine-tune the automated processes, shifting their responsibilities toward higher-value tasks. Over time, productivity increased substantially, and employee satisfaction improved as repetitive, tedious work was delegated to machines.",
    advancedTerms: [
      "sophisticated", "integrating", "apprehension", "obsolete", "augment",
      "retrained", "higher-value tasks", "productivity", "delegated",
    ],
    keyPoints: [
      "AI integration in manufacturing", "employees feared obsolescence",
      "augment not replace", "workers retrained", "productivity increased",
    ],
  },
  {
    id: "cybersecurity-breach",
    topic: "Technology",
    title: "Cybersecurity Breach",
    text: "The company disclosed that hackers had exploited a previously unknown vulnerability, compromising sensitive customer data over several weeks before detection. In the aftermath, the organization scrambled to contain the breach, notifying affected users and regulatory authorities as required by law. Cybersecurity experts criticized the firm for inadequate monitoring systems, which allowed the intrusion to go unnoticed for so long. In response, the company committed to a substantial investment in threat detection infrastructure and pledged greater transparency regarding future incidents.",
    advancedTerms: [
      "disclosed", "exploited", "vulnerability", "compromising",
      "regulatory authorities", "inadequate monitoring", "intrusion",
      "threat detection infrastructure", "transparency",
    ],
    keyPoints: [
      "hackers exploited vulnerability", "customer data compromised",
      "notified users and regulators", "inadequate monitoring criticized",
      "investment in threat detection",
    ],
  },
];

export function randomPassage(excludeId?: string): ComprehensionPassage {
  const pool = excludeId
    ? COMPREHENSION_PASSAGES.filter((p) => p.id !== excludeId)
    : COMPREHENSION_PASSAGES;
  return pool[Math.floor(Math.random() * pool.length)];
}
