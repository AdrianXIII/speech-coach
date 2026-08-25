export interface FeedbackCategory {
  label: string;
  score: number; // 0-100
  summary: string;
  tips: string[];
}

export interface FeedbackResult {
  sessionId: string;
  overallScore: number;
  categories: FeedbackCategory[];
  strengths: string[];
  areasToImprove: string[];
}
