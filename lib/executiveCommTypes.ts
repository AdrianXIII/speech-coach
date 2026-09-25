/**
 * Client-safe types for Executive Communication — kept apart from
 * lib/executiveCommEngine.ts (Gemini) and lib/executiveCommHistory.ts
 * (Postgres) so client components can import them without pulling server
 * code into the browser bundle.
 */

export type ScoreKey = "bluf" | "structure" | "conciseness" | "specificity" | "confidence" | "closing";

export const SCORE_KEYS: ScoreKey[] = ["bluf", "structure", "conciseness", "specificity", "confidence", "closing"];

export interface ExecCommResult {
  transcript: string;
  /** 0-10 per dimension. */
  scores: Record<ScoreKey, number>;
  /** 0-100, the average of `scores` — computed server-side, not asked of the model, so it's always consistent with the breakdown shown. */
  overallScore: number;
  bluf: { ledWithConclusion: boolean; note: string };
  structure: { followedPhases: string[]; missingPhases: string[]; note: string };
  conciseness: { rambling: boolean; note: string };
  specificity: { note: string };
  confidence: { hedgingPhrases: string[]; note: string };
  closing: { hasClearAsk: boolean; note: string };
  strengths: string[];
  tips: string[];
  strongRewrite: string;
  mocked: boolean;
}

export interface ExecCommAttempt {
  id: number;
  scenarioId: string;
  category: string;
  modelId: string;
  overallScore: number;
  createdAt: string;
}
