export interface CollocationOption {
  phrase: string;
  correct: boolean;
  explanation: string;
}

export interface CollocationChallenge {
  id: string;
  category: string;
  weakPhrase: string;
  options: CollocationOption[];
  /** The verb/noun stems to look for in the spoken round — substrings so
   * conjugations (mitigate/mitigated/mitigating) still match. */
  targetVerbStem: string;
  targetNounStem: string;
  /** A short business scenario prompting the user to use the phrase aloud. */
  scenario: string;
}

/**
 * Weak business phrase -> pick the correctly upgraded version among
 * plausible-but-wrong options. The wrong options aren't random noise: each
 * is either still basic, or a "weak collocation" (grammatically fine, but
 * the verb/noun pairing doesn't actually go together professionally — the
 * exact trap described in the "Mitigate Risk" vs "Mitigate Resources"
 * example this feature is built from).
 */
export const COLLOCATION_CHALLENGES: CollocationChallenge[] = [
  {
    id: "lower-risk",
    category: "Risk & Strategy",
    weakPhrase: "We need to lower the risk before scaling.",
    targetVerbStem: "mitigat",
    targetNounStem: "risk",
    scenario: "You're advising the board on a risky new market entry.",
    options: [
      { phrase: "We need to mitigate the risk before scaling.", correct: true, explanation: "\"Mitigate\" is almost always paired with \"risk\" or \"damage\" — a strong, natural collocation." },
      { phrase: "We need to mitigate the resources before scaling.", correct: false, explanation: "\"Mitigate\" means to lessen the severity of something negative — it doesn't fit \"resources\". Try \"allocate\" or \"optimize\" instead." },
      { phrase: "We need to fix the risk before scaling.", correct: false, explanation: "\"Fix\" is a weak, generic verb — it doesn't signal the deliberate, strategic action \"mitigate\" does." },
      { phrase: "We need to drive the risk before scaling.", correct: false, explanation: "\"Drive\" pairs with things you want to increase (growth, performance) — not risk, which you want to reduce." },
    ],
  },
  {
    id: "make-plan-better",
    category: "Strategy",
    weakPhrase: "We want to make the plan better.",
    targetVerbStem: "enhanc",
    targetNounStem: "framework",
    scenario: "You're presenting a revised strategy document to leadership.",
    options: [
      { phrase: "We want to enhance the framework.", correct: true, explanation: "\"Enhance\" plus \"framework\" is a classic upgrade of \"a plan\" — precise and formal." },
      { phrase: "We want to mitigate the framework.", correct: false, explanation: "\"Mitigate\" only applies to negative things (risk, damage) — a framework isn't inherently negative." },
      { phrase: "We want to improve the plan.", correct: false, explanation: "Grammatically fine, but \"improve\" and \"plan\" are both fairly basic — this barely upgrades the original." },
      { phrase: "We want to allocate the framework.", correct: false, explanation: "\"Allocate\" is for distributing resources (budget, time, capital) — you don't \"allocate\" a framework." },
    ],
  },
  {
    id: "grow-in-good-way",
    category: "Growth & Performance",
    weakPhrase: "We want the company to grow in a good way.",
    targetVerbStem: "driv",
    targetNounStem: "growth",
    scenario: "You're pitching the company's five-year outlook to investors.",
    options: [
      { phrase: "We aim to drive sustainable growth.", correct: true, explanation: "\"Drive\" plus \"growth\" is a textbook strong collocation — decisive and forward-looking." },
      { phrase: "We aim to mandate sustainable growth.", correct: false, explanation: "\"Mandate\" is about imposing rules or authority — growth isn't something you can mandate into existing." },
      { phrase: "We want good growth.", correct: false, explanation: "\"Good growth\" is vague and informal — it doesn't carry any strategic precision." },
      { phrase: "We aim to allocate sustainable growth.", correct: false, explanation: "\"Allocate\" needs a distributable object (budget, resources) — growth is an outcome, not something you distribute." },
    ],
  },
  {
    id: "spend-budget-carefully",
    category: "Financial",
    weakPhrase: "The budget needs to be spent carefully.",
    targetVerbStem: "allocat",
    targetNounStem: "capital",
    scenario: "You're explaining a cost-cutting decision to the finance team.",
    options: [
      { phrase: "Capital must be allocated prudently.", correct: true, explanation: "\"Allocate\" plus \"capital\", qualified by \"prudently\" — precise, formal, and exactly how executives discuss spending." },
      { phrase: "Capital must be mitigated prudently.", correct: false, explanation: "Capital isn't a negative thing to lessen the severity of — \"mitigate\" doesn't fit here." },
      { phrase: "The budget needs to be careful.", correct: false, explanation: "This isn't even a complete professional thought — budgets don't \"be careful\", people spend them carefully." },
      { phrase: "Capital must be driven prudently.", correct: false, explanation: "\"Drive\" pairs with growth or performance, not with careful, controlled spending." },
    ],
  },
  {
    id: "team-follow-rule",
    category: "Leadership & Compliance",
    weakPhrase: "We must make sure the team follows the new rule.",
    targetVerbStem: "mandat",
    targetNounStem: "complian",
    scenario: "You're rolling out a new compliance policy to department heads.",
    options: [
      { phrase: "We must mandate compliance with the new policy.", correct: true, explanation: "\"Mandate\" plus \"compliance\" is exactly the register for enforcing a rule with authority." },
      { phrase: "We must mitigate compliance with the new policy.", correct: false, explanation: "You don't lessen the severity of compliance — \"mitigate\" doesn't apply here." },
      { phrase: "We must make the team follow the rule.", correct: false, explanation: "This is grammatically fine but stays at the basic register — no upgrade in precision or authority." },
      { phrase: "We must allocate compliance with the new policy.", correct: false, explanation: "Compliance isn't a resource to distribute — \"allocate\" doesn't fit." },
    ],
  },
  {
    id: "strengths-get-better",
    category: "Growth & Performance",
    weakPhrase: "Our strengths need to get better.",
    targetVerbStem: "enhanc",
    targetNounStem: "competenc",
    scenario: "You're outlining a talent-development plan to HR leadership.",
    options: [
      { phrase: "We must enhance our core competencies.", correct: true, explanation: "\"Enhance\" plus \"core competencies\" is precise, formal, and directly upgrades \"strengths get better\"." },
      { phrase: "We must mitigate our core competencies.", correct: false, explanation: "Competencies are a strength, not a risk — there's nothing to \"mitigate\"." },
      { phrase: "Our strengths need improvement.", correct: false, explanation: "Grammatically correct but minimal — \"strengths\" and \"improvement\" are both basic-register words." },
      { phrase: "We must mandate our core competencies.", correct: false, explanation: "You can't mandate a competency into existing — mandate applies to rules and behavior, not skill." },
    ],
  },
  {
    id: "company-money-problems",
    category: "Financial",
    weakPhrase: "The company had problems with money because of bad choices.",
    targetVerbStem: "experienc",
    targetNounStem: "downturn",
    scenario: "You're summarizing last quarter's results to shareholders.",
    options: [
      { phrase: "The firm experienced a financial downturn due to strategic miscalculations.", correct: true, explanation: "Precise nouns (\"financial downturn\", \"strategic miscalculations\") replace vague ones (\"problems\", \"bad choices\") — this is the core of executive phrasing." },
      { phrase: "The company had bad money problems.", correct: false, explanation: "This barely differs from the original — \"bad\" and \"problems\" are exactly the vague words to avoid." },
      { phrase: "The company mandated a financial downturn.", correct: false, explanation: "A downturn isn't something a company can mandate — that verb implies deliberate authority over an outcome nobody chooses." },
      { phrase: "The firm's money went down because of bad choices.", correct: false, explanation: "Still entirely basic vocabulary — \"went down\" and \"bad choices\" carry no strategic precision." },
    ],
  },
  {
    id: "less-waste",
    category: "Operations",
    weakPhrase: "The team should try to have less waste in the process.",
    targetVerbStem: "optimiz",
    targetNounStem: "efficienc",
    scenario: "You're presenting a process-improvement initiative to operations leadership.",
    options: [
      { phrase: "The team should aim to optimize operational efficiency.", correct: true, explanation: "\"Optimize\" plus \"efficiency\" is the standard, precise way to describe reducing waste in a process." },
      { phrase: "The team should aim to mitigate operational efficiency.", correct: false, explanation: "Efficiency is a positive you want more of — \"mitigate\" only applies to negatives you want less of." },
      { phrase: "The team should have less waste.", correct: false, explanation: "Direct but entirely basic — no professional vocabulary upgrade at all." },
      { phrase: "The team should allocate operational efficiency.", correct: false, explanation: "Efficiency isn't a resource you distribute — \"allocate\" needs an object like budget, time, or headcount." },
    ],
  },
  {
    id: "more-workers",
    category: "Operations",
    weakPhrase: "We need more workers to do more things.",
    targetVerbStem: "expand",
    targetNounStem: "workforc",
    scenario: "You're justifying a hiring plan to the executive committee.",
    options: [
      { phrase: "We need to expand our workforce to scale operations.", correct: true, explanation: "\"Expand\" plus \"workforce\" is the standard professional phrasing for planned hiring growth." },
      { phrase: "We need to mitigate our workforce to scale operations.", correct: false, explanation: "The workforce isn't a risk to reduce — \"mitigate\" doesn't fit an action meant to grow the team." },
      { phrase: "We need more people to do more work.", correct: false, explanation: "Direct, but entirely basic vocabulary — no strategic precision." },
      { phrase: "We need to mandate our workforce to scale operations.", correct: false, explanation: "You mandate rules or behavior, not the existence of a workforce — the verb doesn't fit this meaning." },
    ],
  },
  {
    id: "keep-momentum",
    category: "Growth & Performance",
    weakPhrase: "Things are going well and we should keep this going.",
    targetVerbStem: "sustain",
    targetNounStem: "trajector",
    scenario: "You're closing a quarterly review on a high note.",
    options: [
      { phrase: "Momentum is strong, and we must sustain this trajectory.", correct: true, explanation: "\"Sustain\" plus \"trajectory\" precisely captures \"keep the good thing going\" in strategic language." },
      { phrase: "Momentum is strong, and we must mitigate this trajectory.", correct: false, explanation: "The trajectory here is positive — \"mitigate\" only applies to something negative you want to lessen." },
      { phrase: "Things are good, and we should keep it going.", correct: false, explanation: "Entirely basic register — \"things\", \"good\", \"keep it going\" are all vague." },
      { phrase: "Momentum is strong, and we must allocate this trajectory.", correct: false, explanation: "A trajectory isn't a resource to distribute — \"allocate\" doesn't fit." },
    ],
  },
];

export function pickSession(size = 5): CollocationChallenge[] {
  const shuffled = [...COLLOCATION_CHALLENGES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(size, shuffled.length));
}
