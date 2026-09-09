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
 * This app has no database, so the durable copy of a flag is the Vercel
 * function log (see app/api/tutor/flag/route.ts). This local copy exists so
 * flags stay visible *in the app itself* on the device that reported them,
 * between sessions — check it via lib/tutorFlags.ts's loadTutorFlags() from
 * the browser console, or wire up a small review view if this grows past a
 * handful of reports.
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
