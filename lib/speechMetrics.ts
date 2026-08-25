import { DEFAULT_FILLER_WORDS, detectFillerWords } from "@/lib/fillerWords";
import type { FillerWordStats } from "@/types/analysis";

export interface SpeechMetrics {
  wordsPerMinute: number;
  fillerWords: FillerWordStats;
}

/**
 * Analyzes a transcript for pacing (words per minute) and filler-word
 * usage ('um', 'ah', 'like', 'you know', etc.). Pure function — no network
 * calls — so it works identically whether the transcript came from Whisper
 * or the mock fallback.
 */
export function analyzeSpeechMetrics(transcript: string, durationSeconds: number): SpeechMetrics {
  const wordCount = transcript.trim().split(/\s+/).filter(Boolean).length;
  const wordsPerMinute =
    durationSeconds > 0 ? Math.round((wordCount / durationSeconds) * 60) : 0;

  const fillerWords = detectFillerWords(transcript, durationSeconds, DEFAULT_FILLER_WORDS);

  return { wordsPerMinute, fillerWords };
}
