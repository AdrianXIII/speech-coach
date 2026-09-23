import { dictionary } from "cmu-pronouncing-dictionary";
import { doubleMetaphone } from "double-metaphone";

export interface WordSuggestion {
  word: string;
  /** "prefix" = an ordinary spelling completion; "phonetic" = sounds like the input but starts differently (e.g. "fisiks" -> "physics"). */
  matchType: "prefix" | "phonetic";
}

const MAX_SUGGESTIONS = 8;

let baseWordsCache: string[] | null = null;
/** A word's *primary* double-metaphone code is its best-guess pronunciation; indexing separately from `secondaryIndex` (below) lets a query match a word's primary code before falling back to weaker secondary-code overlaps, which are often short/generic (e.g. "NL") and otherwise drown out a strong match — see the "nolij" -> "knowledge" case this was built against. */
let primaryIndexCache: Map<string, string[]> | null = null;
let secondaryIndexCache: Map<string, string[]> | null = null;

/** CMU dict keys include alt-pronunciation variants ("read(2)") and abbreviations ("a.m."); this collapses them to the plain, spellable words a learner would actually type. */
function getBaseWords(): string[] {
  if (baseWordsCache) return baseWordsCache;
  const seen = new Set<string>();
  for (const key of Object.keys(dictionary)) {
    const word = key.replace(/\(\d+\)$/, "");
    if (/^[a-z']+$/.test(word)) seen.add(word);
  }
  baseWordsCache = [...seen];
  return baseWordsCache;
}

/** Builds once per server instance (~120k words) and is cached in module scope, same pattern as the CMU dictionary import itself. */
function getIndexes(): { primary: Map<string, string[]>; secondary: Map<string, string[]> } {
  if (primaryIndexCache && secondaryIndexCache) {
    return { primary: primaryIndexCache, secondary: secondaryIndexCache };
  }
  const primary = new Map<string, string[]>();
  const secondary = new Map<string, string[]>();
  for (const word of getBaseWords()) {
    const [primaryCode, secondaryCode] = doubleMetaphone(word);
    if (primaryCode) {
      const list = primary.get(primaryCode);
      if (list) list.push(word);
      else primary.set(primaryCode, [word]);
    }
    if (secondaryCode && secondaryCode !== primaryCode) {
      const list = secondary.get(secondaryCode);
      if (list) list.push(word);
      else secondary.set(secondaryCode, [word]);
    }
  }
  primaryIndexCache = primary;
  secondaryIndexCache = secondary;
  return { primary, secondary };
}

function levenshtein(a: string, b: string): number {
  const dp: number[][] = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[a.length][b.length];
}

function byDistanceTo(query: string) {
  return (a: string, b: string) => levenshtein(query, a) - levenshtein(query, b);
}

/**
 * Suggests correctly-spelled English words for a partial or misspelled
 * input, for someone who knows how a word sounds but not how it's spelled
 * (e.g. "fisiks" -> "physics"). Combines ordinary prefix completion with a
 * double-metaphone phonetic match over the CMU Pronouncing Dictionary.
 *
 * Phonetic candidates are gathered in tiers, strongest first: words whose
 * own *primary* code matches the query's primary code, then the query's
 * secondary (alternate-pronunciation) guess, then weaker secondary-only
 * overlaps — each tier sorted by edit distance to the raw input, but never
 * mixed with a weaker tier, so a handful of short, phonetically-loose
 * matches can't bury a long, exact one further down the list.
 */
export function suggestWords(input: string): WordSuggestion[] {
  const query = input.trim().toLowerCase().replace(/[^a-z']/g, "");
  if (query.length < 2) return [];

  const words = getBaseWords();
  const prefixMatches = words
    .filter((w) => w.startsWith(query) && w !== query)
    .sort((a, b) => a.length - b.length)
    .slice(0, MAX_SUGGESTIONS);
  const prefixSet = new Set(prefixMatches);

  const results: WordSuggestion[] = prefixMatches.map((word) => ({ word, matchType: "prefix" as const }));

  const remaining = MAX_SUGGESTIONS - results.length;
  if (remaining > 0) {
    const { primary, secondary } = getIndexes();
    const [queryPrimary, querySecondary] = doubleMetaphone(query);
    const seen = new Set(prefixMatches);
    seen.add(query);

    const tiers = [
      primary.get(queryPrimary) ?? [],
      querySecondary && querySecondary !== queryPrimary ? primary.get(querySecondary) ?? [] : [],
      secondary.get(queryPrimary) ?? [],
      querySecondary && querySecondary !== queryPrimary ? secondary.get(querySecondary) ?? [] : [],
    ];

    const phoneticMatches: string[] = [];
    for (const tier of tiers) {
      if (phoneticMatches.length >= remaining) break;
      const fresh = tier.filter((w) => !seen.has(w));
      fresh.sort(byDistanceTo(query));
      for (const word of fresh) {
        if (phoneticMatches.length >= remaining) break;
        phoneticMatches.push(word);
        seen.add(word);
      }
    }

    results.push(...phoneticMatches.map((word) => ({ word, matchType: "phonetic" as const })));
  }

  return results;
}
