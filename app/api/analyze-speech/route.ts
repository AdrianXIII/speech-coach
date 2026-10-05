import { NextRequest, NextResponse } from "next/server";
import { analyzeSpeech } from "@/lib/analyzeSpeech";
import { calculateOverallScore } from "@/lib/scoreSpeech";
import { geminiErrorResponse } from "@/lib/gemini";
import { toLanguageCode } from "@/lib/languages";
import { requireApiUser } from "@/lib/requireUser";
import { checkRateLimit } from "@/lib/rateLimit";
import { isPremium } from "@/lib/subscription";
import { canUseToday, markUsedToday } from "@/lib/usageLimitServer";
import { logActivity } from "@/lib/trainerActivity";
import type { AnalyzeSpeechResponse } from "@/types/speechAnalysis";

const FEATURE = "record";

// Comfortably above a few minutes of compressed browser-recorded audio;
// guards against an oversized upload tying up a Gemini call unnecessarily.
const MAX_AUDIO_BYTES = 15 * 1024 * 1024;
export const maxDuration = 60;

/**
 * POST /api/analyze-speech
 * Accepts a recorded audio blob (multipart/form-data, field name "audio",
 * plus a "durationSeconds" field, as sent by components/SpeechRecorder.tsx
 * — both its Simple and Stage practice modes) and runs the coaching pipeline:
 *
 *   1. Transcribe the audio and generate coaching feedback in a single
 *      Gemini call (mocked if GEMINI_API_KEY isn't set, so the rest of the
 *      pipeline stays testable without it).
 *   2. Analyze the transcript locally for pace (wpm) and filler-word usage.
 */
export async function POST(req: NextRequest) {
  const gate = await requireApiUser();
  if (gate instanceof NextResponse) return gate;

  if (!(await checkRateLimit(String(gate.id)))) {
    return NextResponse.json({ error: "Too many requests. Please slow down." }, { status: 429 });
  }

  const premium = await isPremium(gate.id);
  if (!premium && !(await canUseToday(gate.id, FEATURE))) {
    return NextResponse.json({ error: "Free daily use already used today.", upgradeUrl: "/pricing" }, { status: 402 });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Expected multipart/form-data." }, { status: 400 });
  }

  const audio = formData.get("audio");
  const durationSeconds = Number(formData.get("durationSeconds") ?? 0);
  const language = toLanguageCode(formData.get("language")?.toString());

  if (!audio || !(audio instanceof Blob)) {
    return NextResponse.json({ error: "Missing 'audio' file in form data." }, { status: 400 });
  }
  if (audio.size === 0) {
    return NextResponse.json({ error: "Uploaded audio file is empty." }, { status: 400 });
  }
  if (audio.size > MAX_AUDIO_BYTES) {
    return NextResponse.json({ error: "Recording too large." }, { status: 413 });
  }

  try {
    const analysis = await analyzeSpeech(audio as File, durationSeconds, language);

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
      mispronouncedWords: analysis.mispronouncedWords,
      mocked: analysis.mocked,
    };

    // Not mocked-only: a dev-mode mock response (no GEMINI_API_KEY) never
    // reaches real users, so it shouldn't spend their one real free use.
    if (!premium && !analysis.mocked) await markUsedToday(gate.id, FEATURE);
    // Unlike markUsedToday above, this logs for every account, premium
    // included — see lib/trainerActivity.ts for why that split matters.
    if (!analysis.mocked) {
      await logActivity(gate.id, FEATURE, { durationSeconds, score: response.overallScore });
    }

    return NextResponse.json(response);
  } catch (err) {
    return geminiErrorResponse(err, "Analysis failed.");
  }
}
