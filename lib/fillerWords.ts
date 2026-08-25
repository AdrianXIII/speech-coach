import type { FillerWordHit, FillerWordStats } from "@/types/analysis";

export const DEFAULT_FILLER_WORDS = [
  "um",
  "uh",
  "like",
  "you know",
  "so",
  "actually",
  "basically",
  "literally",
  "kind of",
  "sort of",
];

/**
 * Scans a transcript for filler words and returns aggregate stats.
 * `wordTimestamps` is optional — pass it (e.g. from a speech-to-text API
 * that returns per-word timing) to get accurate hit timestamps.
 */
export function detectFillerWords(
  transcript: string,
  durationSeconds: number,
  fillerWords: string[] = DEFAULT_FILLER_WORDS,
): FillerWordStats {
  const lower = transcript.toLowerCase();
  const byWord: Record<string, number> = {};
  const hits: FillerWordHit[] = [];

  for (const word of fillerWords) {
    const pattern = new RegExp(`\\b${word.replace(/\s+/g, "\\s+")}\\b`, "g");
    const matches = lower.match(pattern);
    if (matches?.length) {
      byWord[word] = matches.length;
      for (let i = 0; i < matches.length; i++) {
        // Placeholder timestamp — replace with real per-word timing once
        // the transcription API's word-level timestamps are wired in.
        hits.push({ word, timestampSeconds: 0 });
      }
    }
  }

  const total = Object.values(byWord).reduce((sum, n) => sum + n, 0);
  const perMinute = durationSeconds > 0 ? total / (durationSeconds / 60) : 0;

  return { total, perMinute, byWord, hits };
}
