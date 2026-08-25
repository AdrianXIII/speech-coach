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
  /** True if Whisper and/or GPT-4o were mocked because OPENAI_API_KEY isn't set. */
  mocked: boolean;
}
