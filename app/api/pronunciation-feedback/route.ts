import { NextRequest, NextResponse } from "next/server";
import { getPronunciationFeedback } from "@/lib/pronunciationFeedback";
import { geminiErrorResponse } from "@/lib/gemini";

/**
 * POST /api/pronunciation-feedback
 * Accepts multipart/form-data with an "audio" recording and a "word" field
 * (the word/phrase being practiced), and returns Gemini's qualitative
 * pronunciation feedback (mocked if GEMINI_API_KEY isn't set).
 */
export async function POST(req: NextRequest) {
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Expected multipart/form-data." }, { status: 400 });
  }

  const audio = formData.get("audio");
  const word = formData.get("word")?.toString().trim();

  if (!audio || !(audio instanceof Blob)) {
    return NextResponse.json({ error: "Missing 'audio' file in form data." }, { status: 400 });
  }
  if (audio.size === 0) {
    return NextResponse.json({ error: "Uploaded audio file is empty." }, { status: 400 });
  }
  if (!word) {
    return NextResponse.json({ error: "Missing 'word' field." }, { status: 400 });
  }

  try {
    const result = await getPronunciationFeedback(word, audio as File);
    return NextResponse.json(result);
  } catch (err) {
    return geminiErrorResponse(err, "Pronunciation feedback failed.");
  }
}
