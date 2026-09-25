import { getDb, hasDatabase } from "@/lib/db";
import { REVIEW_INTERVAL_DAYS, type ReviewWord } from "@/lib/pronunciationReviewSchedule";

export { REVIEW_INTERVAL_DAYS, type ReviewWord };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toReviewWord(row: any): ReviewWord {
  const nextReviewAt = new Date(row.next_review_at);
  return {
    id: row.id,
    word: row.word,
    addedAt: new Date(row.added_at).toISOString(),
    lastPracticedAt: row.last_practiced_at ? new Date(row.last_practiced_at).toISOString() : null,
    practiceCount: row.practice_count,
    stage: row.stage,
    nextReviewAt: nextReviewAt.toISOString(),
    due: nextReviewAt.getTime() <= Date.now(),
  };
}

/**
 * All four functions below degrade gracefully (empty list / null / false)
 * rather than throwing on a DB error — same posture as
 * lib/comprehensionNews.ts's cache functions, so a broken database
 * connection degrades this one feature instead of breaking the whole
 * Pronunciation trainer for every visitor.
 */
export async function listReviewWords(language: string): Promise<ReviewWord[]> {
  if (!hasDatabase()) return [];
  try {
    const sql = await getDb();
    const rows = await sql!`
      SELECT id, word, added_at, last_practiced_at, practice_count, stage, next_review_at
      FROM pronunciation_review_words
      WHERE language = ${language}
      ORDER BY next_review_at ASC
    `;
    return rows.map(toReviewWord);
  } catch (err) {
    console.error("pronunciation_review_words list failed:", err instanceof Error ? err.message : err);
    return [];
  }
}

export async function addReviewWord(word: string, language: string): Promise<ReviewWord | null> {
  if (!hasDatabase()) return null;
  try {
    const sql = await getDb();
    const inserted = await sql!`
      INSERT INTO pronunciation_review_words (word, language)
      VALUES (${word}, ${language})
      ON CONFLICT (language, lower(word)) DO NOTHING
      RETURNING id, word, added_at, last_practiced_at, practice_count, stage, next_review_at
    `;
    if (inserted[0]) return toReviewWord(inserted[0]);

    // Already exists (race, or the UI's own "already in list" check was
    // bypassed) — return the existing row instead of treating this as a failure.
    const existing = await sql!`
      SELECT id, word, added_at, last_practiced_at, practice_count, stage, next_review_at
      FROM pronunciation_review_words
      WHERE language = ${language} AND lower(word) = lower(${word})
    `;
    return existing[0] ? toReviewWord(existing[0]) : null;
  } catch (err) {
    console.error("pronunciation_review_words add failed:", err instanceof Error ? err.message : err);
    return null;
  }
}

export async function markReviewWordPracticed(id: number): Promise<ReviewWord | null> {
  if (!hasDatabase()) return null;
  try {
    const sql = await getDb();
    const rows = await sql!`SELECT stage FROM pronunciation_review_words WHERE id = ${id}`;
    if (!rows[0]) return null;

    const nextStage = Math.min(rows[0].stage + 1, REVIEW_INTERVAL_DAYS.length - 1);
    const intervalDays = REVIEW_INTERVAL_DAYS[nextStage];
    const updated = await sql!`
      UPDATE pronunciation_review_words
      SET stage = ${nextStage},
          practice_count = practice_count + 1,
          last_practiced_at = now(),
          next_review_at = now() + (${intervalDays} || ' days')::interval
      WHERE id = ${id}
      RETURNING id, word, added_at, last_practiced_at, practice_count, stage, next_review_at
    `;
    return updated[0] ? toReviewWord(updated[0]) : null;
  } catch (err) {
    console.error(`pronunciation_review_words mark-practiced failed (id ${id}):`, err instanceof Error ? err.message : err);
    return null;
  }
}

export async function removeReviewWord(id: number): Promise<boolean> {
  if (!hasDatabase()) return false;
  try {
    const sql = await getDb();
    await sql!`DELETE FROM pronunciation_review_words WHERE id = ${id}`;
    return true;
  } catch (err) {
    console.error(`pronunciation_review_words remove failed (id ${id}):`, err instanceof Error ? err.message : err);
    return false;
  }
}
