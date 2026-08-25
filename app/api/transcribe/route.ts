import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/transcribe
 * Accepts a multipart/form-data audio file and returns a transcript.
 *
 * TODO: wire up a speech-to-text provider (e.g. OpenAI Whisper API,
 * Deepgram, or AssemblyAI) here. Kept provider-agnostic for now.
 */
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const audio = formData.get("audio");

  if (!audio || !(audio instanceof Blob)) {
    return NextResponse.json({ error: "Missing 'audio' file in form data." }, { status: 400 });
  }

  // Placeholder response — replace with the real transcription call.
  return NextResponse.json({
    transcript: "",
    durationSeconds: 0,
  });
}
