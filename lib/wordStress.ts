import { dictionary } from "cmu-pronouncing-dictionary";

export interface WordStress {
  found: boolean;
  syllableCount: number;
  /** 0-based index of the syllable that should carry primary stress. */
  stressedSyllableIndex: number;
  /** The word's spelling split into `syllableCount` chunks, for display. */
  syllables: string[];
}

const VOWELS = new Set("aeiouy");

/**
 * Heuristic English syllabifier: splits a word's spelling into `count`
 * chunks based on vowel-group boundaries. This is for display grouping
 * only (which letters to show under each syllable bar) — it doesn't need
 * to be phonetically exact, just a reasonable visual split that adds up to
 * the syllable count CMUdict gives us.
 */
function splitIntoSyllables(word: string, count: number): string[] {
  if (count <= 1) return [word];

  const lower = word.toLowerCase();
  const vowelGroups: { start: number; end: number }[] = [];
  let i = 0;
  while (i < lower.length) {
    if (VOWELS.has(lower[i])) {
      const start = i;
      while (i < lower.length && VOWELS.has(lower[i])) i++;
      vowelGroups.push({ start, end: i });
    } else {
      i++;
    }
  }

  if (vowelGroups.length !== count) {
    // Heuristic didn't line up with the dictionary's syllable count —
    // fall back to an even split so the UI still gets `count` chunks.
    const chunkSize = Math.ceil(word.length / count);
    const chunks: string[] = [];
    for (let c = 0; c < count; c++) {
      chunks.push(word.slice(c * chunkSize, (c + 1) * chunkSize));
    }
    return chunks.filter(Boolean);
  }

  const boundaries = [0];
  for (let g = 0; g < vowelGroups.length - 1; g++) {
    const gapStart = vowelGroups[g].end;
    const gapEnd = vowelGroups[g + 1].start;
    boundaries.push(Math.round((gapStart + gapEnd) / 2));
  }
  boundaries.push(word.length);

  const chunks: string[] = [];
  for (let b = 0; b < boundaries.length - 1; b++) {
    chunks.push(word.slice(boundaries[b], boundaries[b + 1]));
  }
  return chunks;
}

/**
 * Looks up a word's syllable count and which syllable carries primary
 * stress, from the CMU Pronouncing Dictionary (~135k English words).
 * `found: false` for words/phrases not in the dictionary (proper nouns,
 * multi-word phrases, typos) — callers should fall back to AI feedback in
 * that case.
 */
export function getWordStress(word: string): WordStress {
  const key = word.trim().toLowerCase().replace(/[^a-z']/g, "");
  const entry = key ? dictionary[key] : undefined;

  if (!entry) {
    return { found: false, syllableCount: 0, stressedSyllableIndex: -1, syllables: [] };
  }

  const stressDigits = entry
    .split(" ")
    .map((phoneme) => /[0-2]$/.exec(phoneme)?.[0])
    .filter((digit): digit is string => digit !== undefined)
    .map(Number);

  const syllableCount = stressDigits.length;
  const primaryIndex = stressDigits.indexOf(1);
  const stressedSyllableIndex = primaryIndex === -1 ? 0 : primaryIndex;

  return {
    found: true,
    syllableCount,
    stressedSyllableIndex,
    syllables: splitIntoSyllables(word.trim(), syllableCount),
  };
}
