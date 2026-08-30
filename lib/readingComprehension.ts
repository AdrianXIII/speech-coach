export interface ComprehensionQuestion {
  prompt: string;
  options: string[];
  correctIndex: number;
}

/**
 * Common Swedish nouns unlikely to show up in arbitrary prose, used as
 * plausible-but-wrong options for presence/absence questions. Filtered
 * against the actual text at generation time in case one happens to match.
 */
const DISTRACTOR_POOL = [
  "cykel", "termos", "vulkan", "trumpet", "marmelad", "kompass", "gitarr",
  "silver", "flotte", "ambassad", "kaktus", "pingvin", "harpa", "smaragd",
  "vaktmästare", "snickare", "ubåt", "pergola", "tsunami", "flöjt",
  "makrill", "spinnrock", "ekorre", "kastell", "brygga", "champinjon",
  "labyrint", "meteor", "oas", "pärlemor",
];

const STOPWORDS = new Set([
  "och", "det", "att", "som", "en", "ett", "på", "i", "av", "för", "med",
  "är", "var", "har", "de", "den", "han", "hon", "jag", "du", "vi", "ni",
  "om", "men", "så", "till", "från", "kan", "ska", "skulle", "hade",
  "blev", "blir", "denna", "detta", "dessa", "sin", "sitt", "sina",
  "eller", "inte", "när", "där", "här", "vad", "vem", "hur", "nu", "då",
  "vilket", "vilken", "vilka", "något", "några", "mycket", "mer", "mest",
  "alla", "allt", "andra", "annan", "annat", "sådan", "sådant", "sådana",
  "samma", "bara", "även", "också", "just", "ännu", "redan", "helt",
]);

function normalize(word: string): string {
  return word.toLowerCase().replace(/^[^a-zA-ZåäöÅÄÖ0-9]+|[^a-zA-ZåäöÅÄÖ0-9]+$/g, "");
}

function displayForm(normalized: string): string {
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function sample<T>(items: T[], count: number): T[] {
  return shuffle(items).slice(0, count);
}

/** Words worth using as a question's subject: real content words, not stopwords/numbers. */
function isEligibleWord(word: string): boolean {
  return word.length >= 3 && !STOPWORDS.has(word) && /[a-zA-ZåäöÅÄÖ]/.test(word);
}

/**
 * "Which word came right after X?" — the strongest local proxy for actually
 * having read the text in order (a skimmer/guesser is at chance, someone
 * who read it recognizes the pair). Only uses anchor words that appear
 * exactly once, so the correct answer is unambiguous.
 */
function buildOrderQuestions(normalizedWords: string[], count: number): ComprehensionQuestion[] {
  const frequency = new Map<string, number>();
  for (const word of normalizedWords) frequency.set(word, (frequency.get(word) ?? 0) + 1);

  const candidates: { anchor: string; next: string; index: number }[] = [];
  for (let i = 0; i < normalizedWords.length - 1; i++) {
    const anchor = normalizedWords[i];
    const next = normalizedWords[i + 1];
    if (
      isEligibleWord(anchor) &&
      isEligibleWord(next) &&
      frequency.get(anchor) === 1 &&
      anchor !== next
    ) {
      candidates.push({ anchor, next, index: i });
    }
  }

  const chosen = sample(candidates, count);
  const otherWords = [...new Set(normalizedWords.filter(isEligibleWord))];

  return chosen.map(({ anchor, next }) => {
    const distractorPool = otherWords.filter((w) => w !== next && w !== anchor);
    const distractors = sample(distractorPool, 3);
    const options = shuffle([next, ...distractors]).map(displayForm);
    return {
      prompt: `Vilket ord kom direkt efter "${displayForm(anchor)}" i texten?`,
      options,
      correctIndex: options.indexOf(displayForm(next)),
    };
  });
}

/** "Which of these words appeared in the text?" */
function buildPresenceQuestion(normalizedWords: string[]): ComprehensionQuestion | null {
  const eligible = [...new Set(normalizedWords.filter(isEligibleWord))];
  if (eligible.length === 0) return null;

  const correct = sample(eligible, 1)[0];
  const distractorPool = DISTRACTOR_POOL.filter((w) => !eligible.includes(w));
  const distractors = sample(distractorPool, 3);
  const options = shuffle([correct, ...distractors]).map(displayForm);

  return {
    prompt: "Vilket av dessa ord förekom i texten du läste?",
    options,
    correctIndex: options.indexOf(displayForm(correct)),
  };
}

/** "Which of these words did NOT appear in the text?" — inverse, forces re-checking each option. */
function buildAbsenceQuestion(normalizedWords: string[]): ComprehensionQuestion | null {
  const eligible = [...new Set(normalizedWords.filter(isEligibleWord))];
  const distractorPool = DISTRACTOR_POOL.filter((w) => !eligible.includes(w));
  if (eligible.length < 3 || distractorPool.length === 0) return null;

  const notInText = sample(distractorPool, 1)[0];
  const realWords = sample(eligible, 3);
  const options = shuffle([notInText, ...realWords]).map(displayForm);

  return {
    prompt: "Vilket av dessa ord förekom INTE i texten du läste?",
    options,
    correctIndex: options.indexOf(displayForm(notInText)),
  };
}

/**
 * Builds a small comprehension quiz purely from the text itself — no AI
 * call. Word-order questions are the strongest signal and are prioritized;
 * presence/absence questions fill in the rest (or all of it, for very
 * short texts where few unambiguous word-order pairs exist).
 */
export function generateComprehensionQuiz(text: string, count = 4): ComprehensionQuestion[] {
  const normalizedWords = text.split(/\s+/).map(normalize).filter(Boolean);

  const orderQuestions = buildOrderQuestions(normalizedWords, Math.ceil(count / 2));
  const questions = [...orderQuestions];

  const fillers = [
    () => buildPresenceQuestion(normalizedWords),
    () => buildAbsenceQuestion(normalizedWords),
  ];
  let fillerIndex = 0;
  while (questions.length < count && fillerIndex < count * 3) {
    const q = fillers[fillerIndex % fillers.length]();
    fillerIndex++;
    if (q) questions.push(q);
    else if (fillerIndex > fillers.length * 2) break;
  }

  return shuffle(questions).slice(0, count);
}

/**
 * The quick single-question check used mid-reading: "did you catch one of
 * the last words shown?" Lighter than the end-of-session quiz since it
 * interrupts flow and needs to resolve fast.
 */
export function generateRecallCheck(
  recentWords: string[],
  fullText: string,
): ComprehensionQuestion | null {
  const normalizedRecent = [...new Set(recentWords.map(normalize).filter(isEligibleWord))];
  if (normalizedRecent.length === 0) return null;

  const fullNormalized = new Set(fullText.split(/\s+/).map(normalize));
  const distractorPool = DISTRACTOR_POOL.filter((w) => !fullNormalized.has(w));
  if (distractorPool.length < 3) return null;

  const correct = sample(normalizedRecent, 1)[0];
  const distractors = sample(distractorPool, 3);
  const options = shuffle([correct, ...distractors]).map(displayForm);

  return {
    prompt: "Vilket av dessa ord förekom i texten du just läste?",
    options,
    correctIndex: options.indexOf(displayForm(correct)),
  };
}
