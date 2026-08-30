import type { ComprehensionPassage } from "@/lib/comprehensionContent";

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
const COMMON_WORDS = new Set([
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
]);

/** Professional transition phrases signaling structural complexity. */
const CONNECTIVES = [
  "consequently", "furthermore", "moreover", "nevertheless", "nonetheless",
  "whereas", "in contrast", "on the other hand", "as a result",
  "given that", "in light of", "notably", "subsequently", "accordingly",
  "thus", "hence", "in addition", "that said", "to that end",
  "by contrast", "as opposed to", "in turn",
];

function tokenize(text: string): string[] {
  return text.toLowerCase().match(/[a-zA-Z']+/g) ?? [];
}

function keyPointCovered(keyPoint: string, transcriptWords: Set<string>): boolean {
  const significant = tokenize(keyPoint).filter((w) => w.length >= 4 && !COMMON_WORDS.has(w));
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
): RichnessScore {
  const lowerTranscript = transcript.toLowerCase();
  const words = tokenize(transcript);
  const wordCount = words.length;
  const uniqueWords = new Set(words);
  const ttr = wordCount > 0 ? uniqueWords.size / wordCount : 0;

  const eligibleWords = words.filter((w) => w.length >= 3);
  const advancedWords = eligibleWords.filter((w) => !COMMON_WORDS.has(w));
  const advancedVocabRatio = eligibleWords.length > 0 ? advancedWords.length / eligibleWords.length : 0;

  const echoedTerms = passage.advancedTerms.filter((term) =>
    lowerTranscript.includes(term.toLowerCase()),
  );
  const missedTerms = passage.advancedTerms.filter((term) => !echoedTerms.includes(term));

  const connectivesUsed = CONNECTIVES.filter((phrase) => lowerTranscript.includes(phrase));

  const coveredKeyPoints = passage.keyPoints.filter((kp) => keyPointCovered(kp, uniqueWords));
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

function buildFeedback(input: {
  contentCoverageRatio: number;
  advancedVocabRatio: number;
  connectivesUsed: string[];
  missedTerms: string[];
  wordCount: number;
}): string[] {
  const notes: string[] = [];

  if (input.wordCount < 15) {
    notes.push("Your summary was quite short — try expanding on the key details a bit more.");
  }

  if (input.contentCoverageRatio >= 0.8) {
    notes.push("Strong content coverage — you captured the core points clearly.");
  } else if (input.contentCoverageRatio < 0.4) {
    notes.push("You missed several key points — listen again and focus on the main facts.");
  }

  if (input.advancedVocabRatio < 0.3) {
    notes.push(
      "You leaned on basic vocabulary (\"good\", \"bad\", \"thing\"...). Try weaving in more precise terms.",
    );
  } else if (input.advancedVocabRatio >= 0.5) {
    notes.push("Good use of precise, professional vocabulary.");
  }

  if (input.connectivesUsed.length === 0) {
    notes.push(
      "No professional connectives used (e.g. \"consequently\", \"whereas\", \"as a result\") — these make spoken summaries sound more structured and executive.",
    );
  } else {
    notes.push(`Nice structural flow — you used: ${input.connectivesUsed.join(", ")}.`);
  }

  if (input.missedTerms.length > 0) {
    const suggestions = input.missedTerms.slice(0, 4).join(", ");
    notes.push(`Terms from the passage you could try using next time: ${suggestions}.`);
  }

  return notes;
}
