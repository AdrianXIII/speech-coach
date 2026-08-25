export interface FillerWordHit {
  word: string;
  timestampSeconds: number;
}

export interface FillerWordStats {
  total: number;
  perMinute: number;
  byWord: Record<string, number>;
  hits: FillerWordHit[];
}

export interface PaceStats {
  wordsPerMinute: number;
  longestPauseSeconds: number;
  pauseCount: number;
}

export interface AudioMetrics {
  averageVolumeDb: number;
  pitchVarianceHz: number;
}

export interface AnalysisResult {
  sessionId: string;
  transcript: string;
  fillerWords: FillerWordStats;
  pace: PaceStats;
  audio: AudioMetrics;
}
