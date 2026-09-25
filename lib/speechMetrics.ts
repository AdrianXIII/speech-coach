import { FILLER_WORDS_BY_LANGUAGE, detectFillerWords } from "@/lib/fillerWords";
import type { FillerWordStats } from "@/lib/fillerWords";
import type { LanguageCode } from "@/lib/languages";

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
export function analyzeSpeechMetrics(
  transcript: string,
  durationSeconds: number,
  language: LanguageCode = "en",
): SpeechMetrics {
  const wordCount = transcript.trim().split(/\s+/).filter(Boolean).length;
  const wordsPerMinute =
    durationSeconds > 0 ? Math.round((wordCount / durationSeconds) * 60) : 0;

  const fillerWords = detectFillerWords(transcript, durationSeconds, FILLER_WORDS_BY_LANGUAGE[language]);

  return { wordsPerMinute, fillerWords };
}
