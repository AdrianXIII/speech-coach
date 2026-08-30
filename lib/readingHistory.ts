export interface ReadingSessionResult {
  date: string;
  levelId: string;
  wpm: number;
  comprehensionPct: number;
}

const STORAGE_KEY = "speedReadingHistory";

/** Per-browser history so repeat attempts can be compared — no backend for this app yet. */
export function loadReadingHistory(): ReadingSessionResult[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveReadingResult(result: ReadingSessionResult): ReadingSessionResult[] {
  const history = [...loadReadingHistory(), result].slice(-20);
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {
    // Private browsing / storage quota — the result still shows on screen.
  }
  return history;
}
