import type { ComprehensionPassage } from "@/lib/comprehensionContent";
import type { LanguageCode } from "@/lib/languages";

export interface RichnessScore {
  overallScore: number; // 0-100
  transcript: string;
  wordCount: number;
  ttr: number; // type-token ratio, 0-1
  advancedVocabRatio: number; // 0-1
  echoedTerms: string[];
  missedTerms: string[];
  connectivesUsed: string[];
  coveredKeyPoints: string[];
  missedKeyPoints: string[];
  responseLatencySeconds: number;
  feedback: string[];
}

/**
 * Extremely common English words — function words plus the small set of
 * vague, low-precision content words ("good", "bad", "thing", "get") that
 * a professional register tends to avoid in favor of more precise terms.
 * Used as the baseline for "how much of what you said was basic
 * vocabulary vs. more deliberate word choice."
 */
const COMMON_WORDS_BY_LANGUAGE: Record<LanguageCode, Set<string>> = {
  en: new Set([
    "a", "an", "the", "is", "was", "were", "are", "be", "been", "being", "to",
    "of", "and", "in", "that", "it", "for", "on", "with", "as", "at", "by",
    "from", "this", "these", "those", "he", "she", "they", "we", "you", "i",
    "my", "his", "her", "their", "our", "your", "or", "but", "if", "so",
    "not", "no", "do", "does", "did", "has", "have", "had", "will", "would",
    "can", "could", "should", "may", "might", "must", "than", "then",
    "there", "here", "what", "which", "who", "whom", "when", "where", "why",
    "how", "all", "some", "any", "one", "two", "also", "just", "very",
    "really", "well", "okay", "about", "into", "over", "after", "before",
    "because", "such", "them", "us", "him", "its",
    "good", "bad", "big", "small", "nice", "thing", "things", "stuff",
    "get", "got", "gets", "getting", "make", "makes", "made", "go", "goes",
    "went", "going", "said", "say", "says", "lot", "lots", "many", "much",
    "more", "most", "like", "kind", "sort", "basically", "actually",
  ]),
  de: new Set([
    "der", "die", "das", "ein", "eine", "einen", "einem", "ist", "war",
    "sind", "waren", "zu", "von", "und", "in", "dass", "es", "für", "auf",
    "mit", "als", "bei", "aus", "dieser", "diese", "dieses", "er", "sie",
    "wir", "ihr", "ich", "mein", "sein", "unser", "euer", "oder", "aber",
    "wenn", "so", "nicht", "kein", "machen", "macht", "gemacht", "hat",
    "haben", "hatte", "wird", "würde", "kann", "könnte", "sollte", "mag",
    "muss", "dann", "dort", "hier", "was", "welche", "wer", "wann", "wo",
    "warum", "wie", "alle", "einige", "jede", "gut", "schlecht", "groß",
    "klein", "nett", "ding", "dinge", "bekommen", "gehen", "geht", "ging",
    "sagte", "sagen", "viel", "viele", "mehr", "meiste", "auch", "nur",
    "sehr", "wirklich", "über", "nach", "vor", "weil",
  ]),
  fr: new Set([
    "le", "la", "les", "un", "une", "des", "est", "était", "sont",
    "étaient", "à", "de", "et", "dans", "que", "il", "pour", "sur", "avec",
    "comme", "chez", "ce", "cette", "ces", "elle", "nous", "vous", "je",
    "mon", "son", "notre", "votre", "ou", "mais", "si", "donc", "ne", "pas",
    "aucun", "faire", "a", "ont", "avait", "sera", "serait", "peut",
    "pourrait", "devrait", "doit", "alors", "là", "ici", "quoi", "quel",
    "qui", "quand", "où", "pourquoi", "comment", "tout", "tous", "quelques",
    "chaque", "bon", "mauvais", "grand", "petit", "gentil", "chose",
    "choses", "obtenir", "fait", "aller", "va", "allait", "dit", "dire",
    "beaucoup", "plus", "très", "vraiment", "bien", "aussi", "juste",
  ]),
  es: new Set([
    "el", "la", "los", "las", "un", "una", "unos", "unas", "es", "era",
    "son", "eran", "a", "de", "y", "en", "que", "él", "para", "sobre",
    "con", "como", "este", "esta", "estos", "ella", "nosotros", "ustedes",
    "yo", "mi", "su", "nuestro", "o", "pero", "si", "entonces", "no",
    "ningún", "hacer", "ha", "han", "había", "será", "sería", "puede",
    "podría", "debería", "debe", "allí", "aquí", "qué", "cuál", "quién",
    "cuándo", "dónde", "cómo", "todo", "todos", "algunos", "cada", "bueno",
    "malo", "grande", "pequeño", "agradable", "cosa", "cosas", "obtener",
    "hecho", "ir", "va", "iba", "dijo", "decir", "mucho", "muchos", "más",
    "muy", "realmente", "bien", "también", "solo",
    "quien", "cuando", "donde", "cual",
    "tengo", "tienes", "tiene", "tenemos", "tienen", "tenía", "tuvo",
  ]),
  sv: new Set([
    "en", "ett", "den", "det", "är", "var", "har", "hade", "till", "av",
    "och", "i", "som", "han", "hon", "vi", "ni", "jag", "min", "din",
    "sin", "vår", "er", "eller", "men", "om", "så", "inte", "ingen",
    "göra", "gör", "gjorde", "ska", "skulle", "kan", "kunde", "borde",
    "måste", "då", "där", "här", "vad", "vilken", "vem", "när", "varför",
    "hur", "alla", "några", "varje", "bra", "dålig", "stor", "liten",
    "trevlig", "sak", "saker", "få", "fick", "gå", "går", "gick", "sa",
    "säga", "mycket", "många", "mer", "mest", "också", "bara", "verkligen",
    "okej",
  ]),
};

/** Professional transition phrases signaling structural complexity, per language. */
const CONNECTIVES_BY_LANGUAGE: Record<LanguageCode, string[]> = {
  en: [
    "consequently", "furthermore", "moreover", "nevertheless", "nonetheless",
    "whereas", "in contrast", "on the other hand", "as a result",
    "given that", "in light of", "notably", "subsequently", "accordingly",
    "thus", "hence", "in addition", "that said", "to that end",
    "by contrast", "as opposed to", "in turn",
  ],
  de: [
    "folglich", "außerdem", "darüber hinaus", "dennoch", "trotzdem",
    "während", "im gegensatz dazu", "andererseits", "infolgedessen",
    "angesichts", "bemerkenswerterweise", "anschließend", "dementsprechend",
    "somit", "daher", "zusätzlich", "allerdings",
  ],
  fr: [
    "par conséquent", "de plus", "en outre", "néanmoins", "cependant",
    "alors que", "en revanche", "d'autre part", "ainsi", "étant donné",
    "notamment", "par la suite", "donc", "de ce fait", "en effet",
    "toutefois",
  ],
  es: [
    "en consecuencia", "además", "asimismo", "sin embargo", "no obstante",
    "mientras que", "por otro lado", "en contraste", "por lo tanto",
    "dado que", "cabe destacar", "posteriormente", "en efecto",
    "por consiguiente", "de hecho",
  ],
  sv: [
    "följaktligen", "dessutom", "vidare", "likväl", "trots detta", "medan",
    "däremot", "å andra sidan", "som ett resultat", "med tanke på",
    "anmärkningsvärt", "därefter", "alltså", "därför", "i själva verket",
    "sålunda",
  ],
};

/** Includes Latin-1 accented letters (é, ä, ö, ñ, ü, ß, ç…) — a plain
 * a-z regex would silently strip every accented word in German, French,
 * Spanish, and Swedish text, breaking matching for exactly the words that
 * matter most. */
function tokenize(text: string): string[] {
  return text.toLowerCase().match(/[a-zA-ZÀ-ÿ']+/g) ?? [];
}

function keyPointCovered(
  keyPoint: string,
  transcriptWords: Set<string>,
  commonWords: Set<string>,
): boolean {
  const significant = tokenize(keyPoint).filter((w) => w.length >= 4 && !commonWords.has(w));
  if (significant.length === 0) return false;
  const matched = significant.filter((w) => transcriptWords.has(w));
  return matched.length / significant.length >= 0.5;
}

/**
 * Scores a spoken summary against the passage it was based on, entirely
 * from local text analysis — no AI call. Deliberately measures proxies a
 * frequency list and keyword matching can actually support (vocabulary
 * diversity, echoed advanced terms, professional connectives, rough
 * content coverage, response latency) rather than claiming to judge
 * "rhetorical sharpness" the way a language model could.
 */
export function analyzeRichness(
  transcript: string,
  passage: ComprehensionPassage,
  responseLatencySeconds: number,
  language: LanguageCode,
): RichnessScore {
  const commonWords = COMMON_WORDS_BY_LANGUAGE[language];
  const connectives = CONNECTIVES_BY_LANGUAGE[language];

  const lowerTranscript = transcript.toLowerCase();
  const words = tokenize(transcript);
  const wordCount = words.length;
  const uniqueWords = new Set(words);
  const ttr = wordCount > 0 ? uniqueWords.size / wordCount : 0;

  const eligibleWords = words.filter((w) => w.length >= 3);
  const advancedWords = eligibleWords.filter((w) => !commonWords.has(w));
  const advancedVocabRatio = eligibleWords.length > 0 ? advancedWords.length / eligibleWords.length : 0;

  const echoedTerms = passage.advancedTerms.filter((term) =>
    lowerTranscript.includes(term.toLowerCase()),
  );
  const missedTerms = passage.advancedTerms.filter((term) => !echoedTerms.includes(term));

  const connectivesUsed = connectives.filter((phrase) => lowerTranscript.includes(phrase));

  const coveredKeyPoints = passage.keyPoints.filter((kp) =>
    keyPointCovered(kp, uniqueWords, commonWords),
  );
  const missedKeyPoints = passage.keyPoints.filter((kp) => !coveredKeyPoints.includes(kp));

  const contentCoverageRatio =
    passage.keyPoints.length > 0 ? coveredKeyPoints.length / passage.keyPoints.length : 0;
  const latencyScore = Math.max(0, Math.min(1, 1 - (responseLatencySeconds - 2) / 10));

  const overallScore = Math.round(
    contentCoverageRatio * 40 +
      advancedVocabRatio * 25 +
      ttr * 15 +
      Math.min(1, connectivesUsed.length / 2) * 10 +
      latencyScore * 10,
  );

  const feedback = buildFeedback({
    contentCoverageRatio,
    advancedVocabRatio,
    connectivesUsed,
    missedTerms,
    wordCount,
    language,
  });

  return {
    overallScore,
    transcript: transcript.trim(),
    wordCount,
    ttr,
    advancedVocabRatio,
    echoedTerms,
    missedTerms,
    connectivesUsed,
    coveredKeyPoints,
    missedKeyPoints,
    responseLatencySeconds,
    feedback,
  };
}

const FEEDBACK_STRINGS: Record<LanguageCode, {
  shortSummary: string;
  strongCoverage: string;
  missedPoints: string;
  basicVocab: string;
  goodVocab: string;
  noConnectives: string;
  goodFlow: (used: string) => string;
  tryTerms: (terms: string) => string;
}> = {
  en: {
    shortSummary: "Your summary was quite short — try expanding on the key details a bit more.",
    strongCoverage: "Strong content coverage — you captured the core points clearly.",
    missedPoints: "You missed several key points — listen again and focus on the main facts.",
    basicVocab: "You leaned on basic vocabulary (\"good\", \"bad\", \"thing\"...). Try weaving in more precise terms.",
    goodVocab: "Good use of precise, professional vocabulary.",
    noConnectives: "No professional connectives used (e.g. \"consequently\", \"whereas\", \"as a result\") — these make spoken summaries sound more structured and executive.",
    goodFlow: (used) => `Nice structural flow — you used: ${used}.`,
    tryTerms: (terms) => `Terms from the passage you could try using next time: ${terms}.`,
  },
  de: {
    shortSummary: "Deine Zusammenfassung war ziemlich kurz — versuche, die wichtigsten Details etwas mehr auszuführen.",
    strongCoverage: "Starke inhaltliche Abdeckung — du hast die Kernpunkte klar erfasst.",
    missedPoints: "Du hast mehrere Kernpunkte verpasst — hör noch einmal zu und konzentriere dich auf die wichtigsten Fakten.",
    basicVocab: "Du hast dich auf einfaches Vokabular verlassen („gut“, „schlecht“, „Sache“...). Versuche, präzisere Begriffe einzubauen.",
    goodVocab: "Guter Einsatz von präzisem, professionellem Vokabular.",
    noConnectives: "Keine professionellen Konnektoren verwendet (z. B. „folglich“, „während“, „infolgedessen“) — sie lassen gesprochene Zusammenfassungen strukturierter und souveräner klingen.",
    goodFlow: (used) => `Schöner struktureller Fluss — du hast verwendet: ${used}.`,
    tryTerms: (terms) => `Begriffe aus der Passage, die du nächstes Mal ausprobieren könntest: ${terms}.`,
  },
  fr: {
    shortSummary: "Votre résumé était plutôt court — essayez de développer un peu plus les détails clés.",
    strongCoverage: "Bonne couverture du contenu — vous avez clairement saisi les points essentiels.",
    missedPoints: "Vous avez manqué plusieurs points clés — réécoutez et concentrez-vous sur les faits principaux.",
    basicVocab: "Vous vous êtes appuyé sur un vocabulaire basique (« bon », « mauvais », « chose »...). Essayez d'intégrer des termes plus précis.",
    goodVocab: "Bon usage d'un vocabulaire précis et professionnel.",
    noConnectives: "Aucun connecteur professionnel utilisé (par ex. « par conséquent », « alors que », « ainsi ») — ce type d'expression rend les résumés oraux plus structurés et plus percutants.",
    goodFlow: (used) => `Beau fil conducteur — vous avez utilisé : ${used}.`,
    tryTerms: (terms) => `Termes du passage que vous pourriez essayer d'utiliser la prochaine fois : ${terms}.`,
  },
  es: {
    shortSummary: "Tu resumen fue bastante corto — intenta desarrollar un poco más los detalles clave.",
    strongCoverage: "Buena cobertura del contenido — captaste los puntos principales con claridad.",
    missedPoints: "Te perdiste varios puntos clave — escucha de nuevo y concéntrate en los hechos principales.",
    basicVocab: "Te apoyaste en vocabulario básico (\"bueno\", \"malo\", \"cosa\"...). Intenta incorporar términos más precisos.",
    goodVocab: "Buen uso de vocabulario preciso y profesional.",
    noConnectives: "No usaste conectores profesionales (p. ej. \"en consecuencia\", \"mientras que\", \"por lo tanto\") — hacen que los resúmenes orales suenen más estructurados y ejecutivos.",
    goodFlow: (used) => `Buen flujo estructural — usaste: ${used}.`,
    tryTerms: (terms) => `Términos del pasaje que podrías intentar usar la próxima vez: ${terms}.`,
  },
  sv: {
    shortSummary: "Din sammanfattning var ganska kort — försök utveckla de viktigaste detaljerna lite mer.",
    strongCoverage: "Stark innehållstäckning — du fångade kärnpunkterna tydligt.",
    missedPoints: "Du missade flera kärnpunkter — lyssna igen och fokusera på huvudfakta.",
    basicVocab: "Du lutade dig mot enkelt ordförråd (\"bra\", \"dålig\", \"sak\"...). Försök väva in mer precisa termer.",
    goodVocab: "Bra användning av precist, professionellt ordförråd.",
    noConnectives: "Inga professionella konnektiver användes (t.ex. \"följaktligen\", \"medan\", \"som ett resultat\") — de får muntliga sammanfattningar att låta mer strukturerade och auktoritativa.",
    goodFlow: (used) => `Snyggt strukturellt flöde — du använde: ${used}.`,
    tryTerms: (terms) => `Termer från avsnittet du kan prova att använda nästa gång: ${terms}.`,
  },
};

function buildFeedback(input: {
  contentCoverageRatio: number;
  advancedVocabRatio: number;
  connectivesUsed: string[];
  missedTerms: string[];
  wordCount: number;
  language: LanguageCode;
}): string[] {
  const s = FEEDBACK_STRINGS[input.language];
  const notes: string[] = [];

  if (input.wordCount < 15) {
    notes.push(s.shortSummary);
  }

  if (input.contentCoverageRatio >= 0.8) {
    notes.push(s.strongCoverage);
  } else if (input.contentCoverageRatio < 0.4) {
    notes.push(s.missedPoints);
  }

  if (input.advancedVocabRatio < 0.3) {
    notes.push(s.basicVocab);
  } else if (input.advancedVocabRatio >= 0.5) {
    notes.push(s.goodVocab);
  }

  if (input.connectivesUsed.length === 0) {
    notes.push(s.noConnectives);
  } else {
    notes.push(s.goodFlow(input.connectivesUsed.join(", ")));
  }

  if (input.missedTerms.length > 0) {
    const suggestions = input.missedTerms.slice(0, 4).join(", ");
    notes.push(s.tryTerms(suggestions));
  }

  return notes;
}
