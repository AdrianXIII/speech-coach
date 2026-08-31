import type { LanguageCode } from "@/lib/languages";

export interface ComprehensionQuestion {
  prompt: string;
  options: string[];
  correctIndex: number;
}

/**
 * Common nouns unlikely to show up in arbitrary prose, per language, used
 * as plausible-but-wrong options for presence/absence questions. Filtered
 * against the actual text at generation time in case one happens to match.
 */
const DISTRACTOR_POOL_BY_LANGUAGE: Record<LanguageCode, string[]> = {
  en: [
    "bicycle", "thermos", "volcano", "trumpet", "marmalade", "compass", "guitar",
    "silver", "raft", "embassy", "cactus", "penguin", "harp", "emerald",
    "caretaker", "carpenter", "submarine", "pergola", "tsunami", "flute",
    "mackerel", "spinning wheel", "squirrel", "castle", "jetty", "mushroom",
    "labyrinth", "meteor", "oasis", "mother-of-pearl",
  ],
  de: [
    "Fahrrad", "Thermoskanne", "Vulkan", "Trompete", "Marmelade", "Kompass", "Gitarre",
    "Silber", "Floß", "Botschaft", "Kaktus", "Pinguin", "Harfe", "Smaragd",
    "Hausmeister", "Schreiner", "U-Boot", "Pergola", "Tsunami", "Flöte",
    "Makrele", "Spinnrad", "Eichhörnchen", "Schloss", "Steg", "Champignon",
    "Labyrinth", "Meteor", "Oase", "Perlmutt",
  ],
  fr: [
    "vélo", "thermos", "volcan", "trompette", "confiture", "boussole", "guitare",
    "argent", "radeau", "ambassade", "cactus", "pingouin", "harpe", "émeraude",
    "concierge", "menuisier", "sous-marin", "pergola", "tsunami", "flûte",
    "maquereau", "rouet", "écureuil", "château", "jetée", "champignon",
    "labyrinthe", "météore", "oasis", "nacre",
  ],
  es: [
    "bicicleta", "termo", "volcán", "trompeta", "mermelada", "brújula", "guitarra",
    "plata", "balsa", "embajada", "cactus", "pingüino", "arpa", "esmeralda",
    "conserje", "carpintero", "submarino", "pérgola", "tsunami", "flauta",
    "caballa", "rueca", "ardilla", "castillo", "muelle", "champiñón",
    "laberinto", "meteoro", "oasis", "nácar",
  ],
  sv: [
    "cykel", "termos", "vulkan", "trumpet", "marmelad", "kompass", "gitarr",
    "silver", "flotte", "ambassad", "kaktus", "pingvin", "harpa", "smaragd",
    "vaktmästare", "snickare", "ubåt", "pergola", "tsunami", "flöjt",
    "makrill", "spinnrock", "ekorre", "kastell", "brygga", "champinjon",
    "labyrint", "meteor", "oas", "pärlemor",
  ],
};

const STOPWORDS_BY_LANGUAGE: Record<LanguageCode, Set<string>> = {
  en: new Set([
    "and", "the", "that", "which", "one", "for", "with", "are", "was", "were",
    "have", "has", "had", "this", "these", "those", "from", "they", "she",
    "him", "her", "his", "their", "our", "your", "not", "but", "when", "where",
    "here", "what", "who", "how", "all", "some", "any", "also", "just", "very",
    "really", "well", "okay", "about", "into", "over", "after", "before",
    "because", "such", "them", "its", "than", "then", "there", "will", "would",
    "can", "could", "should", "may", "might", "must", "does", "did",
  ]),
  de: new Set([
    "und", "das", "dass", "welche", "eine", "für", "mit", "sind", "war", "waren",
    "haben", "hat", "hatte", "diese", "dieser", "dieses", "von", "sie", "ihm",
    "ihr", "sein", "unser", "euer", "nicht", "aber", "wenn", "wo", "hier",
    "was", "wer", "wie", "alle", "einige", "auch", "nur", "sehr", "wirklich",
    "über", "nach", "vor", "weil", "solche", "dann", "dort", "wird", "würde",
    "kann", "könnte", "sollte", "mag", "muss",
  ]),
  fr: new Set([
    "et", "que", "qui", "quel", "une", "pour", "avec", "sont", "était", "étaient",
    "ont", "avait", "cette", "ces", "elle", "leur", "notre", "votre", "pas",
    "mais", "quand", "où", "ici", "quoi", "comment", "tout", "tous", "aussi",
    "juste", "très", "vraiment", "bien", "sur", "après", "avant", "parce",
    "alors", "là", "sera", "serait", "peut", "pourrait", "devrait", "doit",
  ]),
  es: new Set([
    "y", "que", "cuál", "una", "para", "con", "son", "era", "eran", "han",
    "había", "esta", "estos", "ella", "su", "nuestro", "no", "pero", "cuándo",
    "dónde", "aquí", "qué", "cómo", "todo", "todos", "también", "solo", "muy",
    "realmente", "bien", "sobre", "después", "antes", "porque", "entonces",
    "allí", "será", "sería", "puede", "podría", "debería", "debe",
  ]),
  sv: new Set([
    "och", "det", "att", "som", "en", "ett", "på", "i", "av", "för", "med",
    "är", "var", "har", "de", "den", "han", "hon", "jag", "du", "vi", "ni",
    "om", "men", "så", "till", "från", "kan", "ska", "skulle", "hade",
    "blev", "blir", "denna", "detta", "dessa", "sin", "sitt", "sina",
    "eller", "inte", "när", "där", "här", "vad", "vem", "hur", "nu", "då",
    "vilket", "vilken", "vilka", "något", "några", "mycket", "mer", "mest",
    "alla", "allt", "andra", "annan", "annat", "sådan", "sådant", "sådana",
    "samma", "bara", "även", "också", "just", "ännu", "redan", "helt",
  ]),
};

const QUIZ_STRINGS: Record<LanguageCode, {
  wordAfter: (word: string) => string;
  presence: string;
  absence: string;
  recall: string;
}> = {
  en: {
    wordAfter: (word) => `Which word came directly after "${word}" in the text?`,
    presence: "Which of these words appeared in the text you read?",
    absence: "Which of these words did NOT appear in the text you read?",
    recall: "Which of these words appeared in the text you just read?",
  },
  de: {
    wordAfter: (word) => `Welches Wort kam im Text direkt nach „${word}"?`,
    presence: "Welches dieser Wörter kam im gelesenen Text vor?",
    absence: "Welches dieser Wörter kam NICHT im gelesenen Text vor?",
    recall: "Welches dieser Wörter kam im Text vor, den du gerade gelesen hast?",
  },
  fr: {
    wordAfter: (word) => `Quel mot venait juste après « ${word} » dans le texte ?`,
    presence: "Lequel de ces mots apparaissait dans le texte que vous avez lu ?",
    absence: "Lequel de ces mots n'apparaissait PAS dans le texte que vous avez lu ?",
    recall: "Lequel de ces mots apparaissait dans le texte que vous venez de lire ?",
  },
  es: {
    wordAfter: (word) => `¿Qué palabra venía justo después de "${word}" en el texto?`,
    presence: "¿Cuál de estas palabras apareció en el texto que leíste?",
    absence: "¿Cuál de estas palabras NO apareció en el texto que leíste?",
    recall: "¿Cuál de estas palabras apareció en el texto que acabas de leer?",
  },
  sv: {
    wordAfter: (word) => `Vilket ord kom direkt efter "${word}" i texten?`,
    presence: "Vilket av dessa ord fanns med i texten du läste?",
    absence: "Vilket av dessa ord fanns INTE med i texten du läste?",
    recall: "Vilket av dessa ord fanns med i texten du precis läste?",
  },
};

/** À-ÿ covers the accented Latin-1 letters used across German/French/Spanish/Swedish. */
function normalize(word: string): string {
  return word.toLowerCase().replace(/^[^a-zA-ZÀ-ÿ0-9]+|[^a-zA-ZÀ-ÿ0-9]+$/g, "");
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
function isEligibleWord(word: string, stopwords: Set<string>): boolean {
  return word.length >= 3 && !stopwords.has(word) && /[a-zA-ZÀ-ÿ]/.test(word);
}

/**
 * "Which word came right after X?" — the strongest local proxy for actually
 * having read the text in order (a skimmer/guesser is at chance, someone
 * who read it recognizes the pair). Only uses anchor words that appear
 * exactly once, so the correct answer is unambiguous.
 */
function buildOrderQuestions(
  normalizedWords: string[],
  count: number,
  stopwords: Set<string>,
  language: LanguageCode,
): ComprehensionQuestion[] {
  const frequency = new Map<string, number>();
  for (const word of normalizedWords) frequency.set(word, (frequency.get(word) ?? 0) + 1);

  const candidates: { anchor: string; next: string; index: number }[] = [];
  for (let i = 0; i < normalizedWords.length - 1; i++) {
    const anchor = normalizedWords[i];
    const next = normalizedWords[i + 1];
    if (
      isEligibleWord(anchor, stopwords) &&
      isEligibleWord(next, stopwords) &&
      frequency.get(anchor) === 1 &&
      anchor !== next
    ) {
      candidates.push({ anchor, next, index: i });
    }
  }

  const chosen = sample(candidates, count);
  const otherWords = [...new Set(normalizedWords.filter((w) => isEligibleWord(w, stopwords)))];

  return chosen.map(({ anchor, next }) => {
    const distractorPool = otherWords.filter((w) => w !== next && w !== anchor);
    const distractors = sample(distractorPool, 3);
    const options = shuffle([next, ...distractors]).map(displayForm);
    return {
      prompt: QUIZ_STRINGS[language].wordAfter(displayForm(anchor)),
      options,
      correctIndex: options.indexOf(displayForm(next)),
    };
  });
}

/** "Which of these words appeared in the text?" */
function buildPresenceQuestion(
  normalizedWords: string[],
  stopwords: Set<string>,
  distractorPool: string[],
  language: LanguageCode,
): ComprehensionQuestion | null {
  const eligible = [...new Set(normalizedWords.filter((w) => isEligibleWord(w, stopwords)))];
  if (eligible.length === 0) return null;

  const correct = sample(eligible, 1)[0];
  const distractors = sample(
    distractorPool.filter((w) => !eligible.includes(w)),
    3,
  );
  const options = shuffle([correct, ...distractors]).map(displayForm);

  return {
    prompt: QUIZ_STRINGS[language].presence,
    options,
    correctIndex: options.indexOf(displayForm(correct)),
  };
}

/** "Which of these words did NOT appear in the text?" — inverse, forces re-checking each option. */
function buildAbsenceQuestion(
  normalizedWords: string[],
  stopwords: Set<string>,
  distractorPool: string[],
  language: LanguageCode,
): ComprehensionQuestion | null {
  const eligible = [...new Set(normalizedWords.filter((w) => isEligibleWord(w, stopwords)))];
  const available = distractorPool.filter((w) => !eligible.includes(w));
  if (eligible.length < 3 || available.length === 0) return null;

  const notInText = sample(available, 1)[0];
  const realWords = sample(eligible, 3);
  const options = shuffle([notInText, ...realWords]).map(displayForm);

  return {
    prompt: QUIZ_STRINGS[language].absence,
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
export function generateComprehensionQuiz(
  text: string,
  language: LanguageCode,
  count = 4,
): ComprehensionQuestion[] {
  const stopwords = STOPWORDS_BY_LANGUAGE[language];
  const distractorPool = DISTRACTOR_POOL_BY_LANGUAGE[language];
  const normalizedWords = text.split(/\s+/).map(normalize).filter(Boolean);

  const orderQuestions = buildOrderQuestions(normalizedWords, Math.ceil(count / 2), stopwords, language);
  const questions = [...orderQuestions];

  const fillers = [
    () => buildPresenceQuestion(normalizedWords, stopwords, distractorPool, language),
    () => buildAbsenceQuestion(normalizedWords, stopwords, distractorPool, language),
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
  language: LanguageCode,
): ComprehensionQuestion | null {
  const stopwords = STOPWORDS_BY_LANGUAGE[language];
  const distractorPool = DISTRACTOR_POOL_BY_LANGUAGE[language];

  const normalizedRecent = [
    ...new Set(recentWords.map(normalize).filter((w) => isEligibleWord(w, stopwords))),
  ];
  if (normalizedRecent.length === 0) return null;

  const fullNormalized = new Set(fullText.split(/\s+/).map(normalize));
  const available = distractorPool.filter((w) => !fullNormalized.has(w));
  if (available.length < 3) return null;

  const correct = sample(normalizedRecent, 1)[0];
  const distractors = sample(available, 3);
  const options = shuffle([correct, ...distractors]).map(displayForm);

  return {
    prompt: QUIZ_STRINGS[language].recall,
    options,
    correctIndex: options.indexOf(displayForm(correct)),
  };
}
