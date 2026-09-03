/** Score at/above this counts a fundamental as mastered — matches the "strong" (emerald) score band shown in feedback. */
export const MASTERY_THRESHOLD = 75;

const STORAGE_KEY = "caseStudyFundamentalScores";

type ScoreMap = Record<string, number>;

/** Per-browser progress on fundamentals — no backend/account needed to track this. */
export function loadFundamentalScores(): ScoreMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

/** Records the best score achieved per fundamental id (keeps the highest across attempts). */
export function saveFundamentalScores(fundamentalIds: string[], score: number): ScoreMap {
  const scores = loadFundamentalScores();
  for (const id of fundamentalIds) {
    scores[id] = Math.max(scores[id] ?? 0, score);
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
  } catch {
    // Private browsing / storage quota — progress just won't persist this session.
  }
  return scores;
}

export function isMastered(scores: ScoreMap, fundamentalId: string): boolean {
  return (scores[fundamentalId] ?? 0) >= MASTERY_THRESHOLD;
}

export function countMastered(scores: ScoreMap, fundamentalIds: string[]): number {
  return fundamentalIds.filter((id) => isMastered(scores, id)).length;
}
