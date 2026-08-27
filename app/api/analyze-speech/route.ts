import { NextRequest, NextResponse } from "next/server";
import { analyzeSpeech } from "@/lib/analyzeSpeech";
import { calculateOverallScore } from "@/lib/scoreSpeech";
import { geminiErrorResponse } from "@/lib/gemini";
import type { AnalyzeSpeechResponse } from "@/types/speechAnalysis";

/**
 * POST /api/analyze-speech
 * Accepts a recorded audio blob (multipart/form-data, field name "audio",
 * plus a "durationSeconds" field, as sent by components/SpeechRecorder.tsx
 * and components/VirtualStage.tsx) and runs the coaching pipeline:
 *
 *   1. Transcribe the audio and generate coaching feedback in a single
 *      Gemini call (mocked if GEMINI_API_KEY isn't set, so the rest of the
 *      pipeline stays testable without it).
 *   2. Analyze the transcript locally for pace (wpm) and filler-word usage.
 */
export async function POST(req: NextRequest) {
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Expected multipart/form-data." }, { status: 400 });
  }

  const audio = formData.get("audio");
  const durationSeconds = Number(formData.get("durationSeconds") ?? 0);

  if (!audio || !(audio instanceof Blob)) {
    return NextResponse.json({ error: "Missing 'audio' file in form data." }, { status: 400 });
  }
  if (audio.size === 0) {
    return NextResponse.json({ error: "Uploaded audio file is empty." }, { status: 400 });
  }

  try {
    const analysis = await analyzeSpeech(audio as File, durationSeconds);

    const response: AnalyzeSpeechResponse = {
      transcript: analysis.transcript,
      durationSeconds,
      overallScore: calculateOverallScore(analysis.metrics),
      metrics: {
        wordsPerMinute: analysis.metrics.wordsPerMinute,
        fillerWordCount: analysis.metrics.fillerWords.total,
        fillerWordBreakdown: analysis.metrics.fillerWords.byWord,
      },
      feedback: {
        strengths: analysis.strengths,
        tips: analysis.tips,
      },
      mocked: analysis.mocked,
    };

    return NextResponse.json(response);
  } catch (err) {
    return geminiErrorResponse(err, "Analysis failed.");
  }
}
