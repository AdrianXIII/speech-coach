import type { LanguageCode } from "@/lib/languages";

export interface FillerWordHit {
  word: string;
  timestampSeconds: number;
}

export interface FillerWordStats {
  total: number;
  perMinute: number;
  byWord: Record<string, number>;
  hits: FillerWordHit[];
}

/**
 * Common spoken fillers per language. Kept to words that are almost always
 * filler in speech — genuinely ambiguous ones (German "ja", Swedish "så")
 * are left out so ordinary sentences don't get flagged.
 */
export const FILLER_WORDS_BY_LANGUAGE: Record<LanguageCode, string[]> = {
  en: ["um", "uh", "ah", "like", "you know", "so", "actually", "basically", "literally", "kind of", "sort of"],
  de: ["äh", "ähm", "öhm", "hm", "also", "halt", "quasi", "sozusagen", "irgendwie", "eigentlich", "na ja"],
  fr: ["euh", "ben", "bah", "genre", "en fait", "du coup", "voilà", "tu vois", "quoi", "bref"],
  es: ["eh", "em", "este", "o sea", "pues", "bueno", "vale", "tipo", "en plan", "digamos", "sabes"],
  sv: ["eh", "öh", "ehm", "liksom", "typ", "alltså", "asså", "ba", "så att säga", "på något sätt"],
};

export const DEFAULT_FILLER_WORDS = FILLER_WORDS_BY_LANGUAGE.en;

/**
 * Regex for one filler word/phrase with Unicode-aware word boundaries —
 * JS's `\b` only knows ASCII letters, so it would never match fillers
 * starting with "ä"/"ö" (German "äh", Swedish "öh").
 */
export function fillerPattern(word: string, flags = "gu"): RegExp {
  const body = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+");
  return new RegExp(`(?<![\\p{L}\\p{N}])${body}(?![\\p{L}\\p{N}])`, flags);
}

/**
 * Scans a transcript for filler words and returns aggregate stats.
 */
export function detectFillerWords(
  transcript: string,
  durationSeconds: number,
  fillerWords: string[] = DEFAULT_FILLER_WORDS,
): FillerWordStats {
  const lower = transcript.toLowerCase();
  const byWord: Record<string, number> = {};
  const hits: FillerWordHit[] = [];

  for (const word of fillerWords) {
    const matches = lower.match(fillerPattern(word));
    if (matches?.length) {
      byWord[word] = matches.length;
      for (let i = 0; i < matches.length; i++) {
        // Placeholder timestamp — no word-level timing from the transcription yet.
        hits.push({ word, timestampSeconds: 0 });
      }
    }
  }

  const total = Object.values(byWord).reduce((sum, n) => sum + n, 0);
  const perMinute = durationSeconds > 0 ? total / (durationSeconds / 60) : 0;

  return { total, perMinute, byWord, hits };
}
