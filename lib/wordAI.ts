import { generateContent, hasGeminiKey } from "@/lib/gemini";
import type { WordStress } from "@/lib/wordStress";
import type { WordSuggestion } from "@/lib/wordSearch";

/**
 * Pronunciation-trainer lookups for German, French, Spanish and Swedish.
 * English uses the local CMU Pronouncing Dictionary (lib/wordSearch.ts,
 * lib/wordStress.ts); there's no equivalent free lexicon with syllable +
 * stress data for the other languages, so these ask Gemini instead.
 *
 * Both are cached per server instance — a word's syllabification never
 * changes, and repeated typing of the same prefix shouldn't cost another
 * call. Any failure (no key, quota, bad JSON) degrades to "no suggestions"
 * / "not found", exactly like an unknown English word does today.
 */

const MAX_CACHE = 2000;
const stressCache = new Map<string, WordStress>();
const suggestCache = new Map<string, WordSuggestion[]>();

function remember<T>(cache: Map<string, T>, key: string, value: T) {
  if (cache.size >= MAX_CACHE) cache.delete(cache.keys().next().value as string);
  cache.set(key, value);
}

const NOT_FOUND: WordStress = { found: false, syllableCount: 0, stressedSyllableIndex: -1, syllables: [] };

const STRESS_SCHEMA = {
  type: "OBJECT",
  properties: {
    isRealWord: { type: "BOOLEAN" },
    syllables: { type: "ARRAY", items: { type: "STRING" } },
    stressedSyllableIndex: { type: "INTEGER" },
  },
  required: ["isRealWord", "syllables", "stressedSyllableIndex"],
};

export async function getWordStressAI(word: string, languageName: string): Promise<WordStress> {
  const clean = word.trim();
  // Same scope as the English lookup: single words only, not phrases.
  if (!clean || /\s/.test(clean) || !hasGeminiKey()) return NOT_FOUND;

  const key = `${languageName}:${clean.toLowerCase()}`;
  const cached = stressCache.get(key);
  if (cached) return cached;

  try {
    const raw = await generateContent(
      [
        {
          text: `You are a ${languageName} phonetics reference.

Word: "${clean}"

If this is a real, correctly spelled ${languageName} word, split its written spelling into syllables as a dictionary would hyphenate it for pronunciation (the pieces joined together must exactly equal the original spelling, same letters and case), and give the 0-based index of the syllable that carries primary stress in standard pronunciation.
If it is not a real ${languageName} word, set isRealWord to false and return an empty syllables list.`,
        },
      ],
      { responseMimeType: "application/json", responseSchema: STRESS_SCHEMA },
    );
    const parsed = JSON.parse(raw.trim().replace(/^```(?:json)?\s*|\s*```$/g, "")) as {
      isRealWord?: boolean;
      syllables?: string[];
      stressedSyllableIndex?: number;
    };
    const syllables = (parsed.syllables ?? []).filter(Boolean);
    const index = parsed.stressedSyllableIndex ?? -1;

    // Reject anything that doesn't reassemble to the original word — the
    // bars are labeled with these pieces, so they must be exact.
    const valid =
      parsed.isRealWord === true &&
      syllables.length > 0 &&
      syllables.join("").toLowerCase() === clean.toLowerCase() &&
      index >= 0 &&
      index < syllables.length;

    const result: WordStress = valid
      ? { found: true, syllableCount: syllables.length, stressedSyllableIndex: index, syllables }
      : NOT_FOUND;
    remember(stressCache, key, result);
    return result;
  } catch (err) {
    console.error(`word stress lookup failed (${languageName}: ${clean}):`, err instanceof Error ? err.message : err);
    return NOT_FOUND;
  }
}

const SUGGEST_SCHEMA = {
  type: "OBJECT",
  properties: {
    suggestions: {
      type: "ARRAY",
      maxItems: 8,
      items: {
        type: "OBJECT",
        properties: {
          word: { type: "STRING" },
          matchType: { type: "STRING", enum: ["prefix", "phonetic"] },
        },
        required: ["word", "matchType"],
      },
    },
  },
  required: ["suggestions"],
};

export async function suggestWordsAI(input: string, languageName: string): Promise<WordSuggestion[]> {
  const clean = input.trim().toLowerCase();
  if (clean.length < 3 || !hasGeminiKey()) return [];

  const key = `${languageName}:${clean}`;
  const cached = suggestCache.get(key);
  if (cached) return cached;

  try {
    const raw = await generateContent(
      [
        {
          text: `A learner of ${languageName} is typing a word they want to practice pronouncing, but may not know how it's spelled. They typed: "${clean}"

Suggest up to 8 real, correctly spelled ${languageName} words they most likely mean, most likely first:
- "prefix": common words that start with exactly what they typed (a normal autocomplete).
- "phonetic": words that SOUND like what they typed but are spelled differently (a learner spelling by ear).
If what they typed is already a correct ${languageName} word, put it first as "prefix". Only single words, no phrases, no English words.`,
        },
      ],
      { responseMimeType: "application/json", responseSchema: SUGGEST_SCHEMA },
    );
    const parsed = JSON.parse(raw.trim().replace(/^```(?:json)?\s*|\s*```$/g, "")) as {
      suggestions?: WordSuggestion[];
    };
    const seen = new Set<string>();
    const suggestions = (parsed.suggestions ?? [])
      .filter((s) => s.word && !/\s/.test(s.word.trim()))
      .map((s) => ({ word: s.word.trim(), matchType: s.matchType === "phonetic" ? "phonetic" : "prefix" }) as WordSuggestion)
      .filter((s) => {
        const k = s.word.toLowerCase();
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      })
      .slice(0, 8);
    remember(suggestCache, key, suggestions);
    return suggestions;
  } catch (err) {
    console.error(`word suggestions failed (${languageName}: ${clean}):`, err instanceof Error ? err.message : err);
    return [];
  }
}
