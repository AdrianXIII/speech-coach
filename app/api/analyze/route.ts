import { NextRequest, NextResponse } from "next/server";
import { detectFillerWords } from "@/lib/fillerWords";
import type { AnalysisResult } from "@/types/analysis";

interface AnalyzeRequestBody {
  sessionId: string;
  transcript: string;
  durationSeconds: number;
}

/**
 * POST /api/analyze
 * Takes a transcript + duration and returns filler-word, pace, and audio
 * metrics. Pace/audio metrics are placeholders — TODO: compute pace from
 * word-level timestamps once the transcription provider supplies them,
 * and audio metrics from the uploaded waveform.
 */
export async function POST(req: NextRequest) {
  const body = (await req.json()) as AnalyzeRequestBody;

  if (!body.transcript || !body.sessionId) {
    return NextResponse.json({ error: "Missing 'sessionId' or 'transcript'." }, { status: 400 });
  }

  const fillerWords = detectFillerWords(body.transcript, body.durationSeconds);

  const wordCount = body.transcript.trim().split(/\s+/).filter(Boolean).length;
  const wordsPerMinute =
    body.durationSeconds > 0 ? wordCount / (body.durationSeconds / 60) : 0;

  const result: AnalysisResult = {
    sessionId: body.sessionId,
    transcript: body.transcript,
    fillerWords,
    pace: {
      wordsPerMinute,
      longestPauseSeconds: 0,
      pauseCount: 0,
    },
    audio: {
      averageVolumeDb: 0,
      pitchVarianceHz: 0,
    },
  };

  return NextResponse.json(result);
}
