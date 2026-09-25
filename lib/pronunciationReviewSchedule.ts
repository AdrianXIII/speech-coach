/**
 * Client-safe pieces of the spaced-repetition review list — the type and
 * scheduling constant, with no import of lib/db.ts (which pulls in the
 * `postgres` package, a Node-only DB driver). Kept separate from
 * lib/pronunciationReview.ts's DB-touching functions so
 * components/PronunciationTrainer.tsx (a client component) can import
 * these without bundling server-only code into the browser build — same
 * split as lib/comprehensionContent.ts (client-safe) vs.
 * lib/comprehensionNews.ts (server-only, DB + Gemini).
 */

/** Fixed escalating interval ladder (days) — not SM-2/ease-factor complexity. `stage` indexes into this, clamped at the last entry. */
export const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30] as const;

export interface ReviewWord {
  id: number;
  word: string;
  addedAt: string;
  lastPracticedAt: string | null;
  practiceCount: number;
  stage: number;
  nextReviewAt: string;
  due: boolean;
}
