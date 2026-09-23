import type { MispronouncedWord } from "@/lib/analyzeSpeech";

/** Response shape for POST /api/analyze-speech. */
export interface AnalyzeSpeechResponse {
  transcript: string;
  durationSeconds: number;
  /** 0-100, derived from pace + filler-word rate — see lib/scoreSpeech.ts. */
  overallScore: number;
  metrics: {
    wordsPerMinute: number;
    fillerWordCount: number;
    fillerWordBreakdown: Record<string, number>;
  };
  feedback: {
    strengths: string[]; // exactly 3
    tips: string[]; // exactly 3
  };
  /** Up to 5 words Gemini heard as mispronounced in the actual audio, for targeted practice — see lib/analyzeSpeech.ts. */
  mispronouncedWords: MispronouncedWord[];
  /** True if Gemini was mocked because GEMINI_API_KEY isn't set. */
  mocked: boolean;
}
