export type SessionStatus = "recording" | "processing" | "complete" | "error";

export interface SpeechSession {
  id: string;
  createdAt: string;
  durationSeconds: number;
  status: SessionStatus;
  audioUrl?: string;
  videoUrl?: string;
  transcript?: string;
}

export interface SessionSummary {
  id: string;
  createdAt: string;
  durationSeconds: number;
  overallScore: number;
  fillerWordCount: number;
}
