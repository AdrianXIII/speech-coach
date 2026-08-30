export interface CollocationUsage {
  verbUsed: boolean;
  nounUsed: boolean;
  usedTogether: boolean;
}

const PROXIMITY_WINDOW = 6; // words apart still counts as "used together"

/**
 * Checks whether a spoken transcript actually used the target verb/noun
 * pairing — not just each word somewhere, but close enough together that
 * they read as the same collocation, not two unrelated mentions.
 */
export function checkCollocationUsage(
  transcript: string,
  verbStem: string,
  nounStem: string,
): CollocationUsage {
  // À-ÿ covers the accented Latin-1 letters (é, ä, ö, ñ, ü, ß…) that a
  // plain a-z regex would silently strip from German/French/Spanish/Swedish.
  const words = transcript.toLowerCase().match(/[a-zA-ZÀ-ÿ']+/g) ?? [];
  const verbIndices = words
    .map((w, i) => (w.includes(verbStem.toLowerCase()) ? i : -1))
    .filter((i) => i !== -1);
  const nounIndices = words
    .map((w, i) => (w.includes(nounStem.toLowerCase()) ? i : -1))
    .filter((i) => i !== -1);

  const verbUsed = verbIndices.length > 0;
  const nounUsed = nounIndices.length > 0;
  const usedTogether = verbIndices.some((vi) =>
    nounIndices.some((ni) => Math.abs(ni - vi) <= PROXIMITY_WINDOW),
  );

  return { verbUsed, nounUsed, usedTogether };
}
