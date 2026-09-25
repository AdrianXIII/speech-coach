import { getDb, hasDatabase } from "@/lib/db";
import type { ExecCommAttempt, ScoreKey } from "@/lib/executiveCommTypes";

/**
 * Score history for Executive Communication's progress panel. Same
 * single-user, no-user_id posture as every other table here, and the same
 * degrade-don't-throw error handling as lib/pronunciationReview.ts — a DB
 * hiccup just means no progress panel, never a failed grading.
 */
export async function saveAttempt(attempt: {
  scenarioId: string;
  category: string;
  modelId: string;
  language: string;
  overallScore: number;
  scores: Record<ScoreKey, number>;
}): Promise<void> {
  if (!hasDatabase()) return;
  try {
    const sql = await getDb();
    await sql!`
      INSERT INTO exec_comm_attempts (scenario_id, category, model_id, language, overall_score, scores)
      VALUES (${attempt.scenarioId}, ${attempt.category}, ${attempt.modelId}, ${attempt.language},
              ${attempt.overallScore}, ${sql!.json(attempt.scores as never)})
    `;
  } catch (err) {
    console.error("exec_comm_attempts save failed:", err instanceof Error ? err.message : err);
  }
}

export async function listAttempts(limit = 30): Promise<ExecCommAttempt[]> {
  if (!hasDatabase()) return [];
  try {
    const sql = await getDb();
    const rows = await sql!`
      SELECT id, scenario_id, category, model_id, overall_score, created_at
      FROM exec_comm_attempts
      ORDER BY created_at DESC
      LIMIT ${limit}
    `;
    return rows.map((r) => ({
      id: r.id as number,
      scenarioId: r.scenario_id as string,
      category: r.category as string,
      modelId: r.model_id as string,
      overallScore: r.overall_score as number,
      createdAt: new Date(r.created_at as string).toISOString(),
    }));
  } catch (err) {
    console.error("exec_comm_attempts list failed:", err instanceof Error ? err.message : err);
    return [];
  }
}
