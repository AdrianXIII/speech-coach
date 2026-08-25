import { NextRequest, NextResponse } from "next/server";
import { transcribeAudio } from "@/lib/transcribeAudio";
import { analyzeSpeechMetrics } from "@/lib/speechMetrics";
import { generateCoachFeedback } from "@/lib/coachFeedback";
import type { AnalyzeSpeechResponse } from "@/types/speechAnalysis";

/**
 * POST /api/analyze-speech
 * Accepts a recorded audio blob (multipart/form-data, field name "audio",
 * as sent by components/SpeechRecorder.tsx) and runs the full coaching
 * pipeline:
 *
 *   1. Transcribe the audio with OpenAI Whisper (mocked if OPENAI_API_KEY
 *      isn't set, so the rest of the pipeline stays testable without it).
 *   2. Analyze the transcript for pace (wpm) and filler-word usage.
 *   3. Send the transcript + metrics to GPT-4o, acting as an expert public
 *      speaking coach, for 3 strengths and 3 actionable tips.
 */
export async function POST(req: NextRequest) {
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Expected multipart/form-data." }, { status: 400 });
  }

  const audio = formData.get("audio");

  if (!audio || !(audio instanceof Blob)) {
    return NextResponse.json({ error: "Missing 'audio' file in form data." }, { status: 400 });
  }
  if (audio.size === 0) {
    return NextResponse.json({ error: "Uploaded audio file is empty." }, { status: 400 });
  }

  try {
    const transcription = await transcribeAudio(audio as File);
    const metrics = analyzeSpeechMetrics(transcription.transcript, transcription.durationSeconds);
    const feedback = await generateCoachFeedback(transcription.transcript, metrics);

    const response: AnalyzeSpeechResponse = {
      transcript: transcription.transcript,
      durationSeconds: transcription.durationSeconds,
      metrics: {
        wordsPerMinute: metrics.wordsPerMinute,
        fillerWordCount: metrics.fillerWords.total,
        fillerWordBreakdown: metrics.fillerWords.byWord,
      },
      feedback: {
        strengths: feedback.strengths,
        tips: feedback.tips,
      },
      mocked: transcription.mocked || feedback.mocked,
    };

    return NextResponse.json(response);
  } catch (err) {
    console.error("analyze-speech failed:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Analysis failed." },
      { status: 500 },
    );
  }
}
