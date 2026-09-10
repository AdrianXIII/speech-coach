const STORAGE_KEY = "tutorContentFlags";

export interface TutorFlag {
  profession: string;
  category: string;
  conceptId: string | null;
  conceptTitle: string | null;
  reason: "inaccurate" | "shallow" | "other";
  note: string;
  at: string;
}

/**
 * The durable, cross-device copy of a flag lives in Postgres when a
 * database is connected (see lib/db.ts, app/api/tutor/flag/route.ts) —
 * reviewable at /tutor-flags. This local copy exists as a fallback so
 * flags stay visible *in the app itself* on the reporting device even
 * before a database is set up, or if a write to it ever fails.
 */
export function loadTutorFlags(): TutorFlag[] {
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

export function saveTutorFlag(flag: TutorFlag): void {
  try {
    const flags = loadTutorFlags();
    flags.push(flag);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(flags));
  } catch {
    // Private browsing / storage quota — the server-side log still has it.
  }
}
