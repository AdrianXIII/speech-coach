import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/analyze-speech
 * Accepts a recorded audio blob (multipart/form-data, field name "audio",
 * as sent by components/SpeechRecorder.tsx) and returns a speech analysis.
 *
 * Currently a stub. TODO: pipe the audio through a speech-to-text provider
 * (see /api/transcribe) and then the filler-word/pace analysis (see
 * /api/analyze) — or call a single combined provider that does both.
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

  // Placeholder response — replace with the real transcribe -> analyze pipeline.
  return NextResponse.json({
    status: "received",
    sizeBytes: audio.size,
    contentType: audio.type,
    transcript: "",
    fillerWordCount: 0,
    wordsPerMinute: 0,
  });
}
