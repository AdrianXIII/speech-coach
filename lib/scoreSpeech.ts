import type { SpeechMetrics } from "@/lib/speechMetrics";

const IDEAL_PACE_MIN = 120;
const IDEAL_PACE_MAX = 160;

/**
 * A transparent, explainable 0-100 score derived from the same metrics
 * shown to the user — not a black box. Two components:
 *   - Filler words: penalized by rate (per minute), not raw count, so a
 *     longer speech with the same filler-word density isn't penalized more.
 *   - Pace: penalized by distance outside the natural conversational
 *     range (120-160 wpm), in either direction.
 */
export function calculateOverallScore(metrics: SpeechMetrics): number {
  let score = 100;

  const fillerPenalty = Math.min(40, metrics.fillerWords.perMinute * 6);
  score -= fillerPenalty;

  const paceDeviation =
    metrics.wordsPerMinute < IDEAL_PACE_MIN
      ? IDEAL_PACE_MIN - metrics.wordsPerMinute
      : metrics.wordsPerMinute > IDEAL_PACE_MAX
        ? metrics.wordsPerMinute - IDEAL_PACE_MAX
        : 0;
  const pacePenalty = Math.min(30, paceDeviation * 0.5);
  score -= pacePenalty;

  return Math.max(0, Math.round(score));
}
