import { generateContent, hasGeminiKey } from "@/lib/gemini";

export interface TranscriptionResult {
  transcript: string;
  mocked: boolean;
}

const MOCK_TRANSCRIPT =
  "So, um, today I want to talk about, like, the importance of, uh, public speaking. " +
  "You know, it's a skill that, um, basically everyone needs, whether you're, like, " +
  "presenting to a small team or, uh, speaking at a big conference. So, yeah, let's get into it.";

const TRANSCRIBE_PROMPT =
  "Transcribe the speech in this recording, exactly word for word, in the language spoken " +
  "(ignore any video and focus only on what's said). Include filler words like 'um', 'uh', " +
  "'like' if you hear them — do not clean them up. Return only the transcript text, with no " +
  "preamble or labels.";

/**
 * Transcribes an audio or video recording via Gemini (which reads it
 * directly, no separate speech-to-text step needed) — used by both the
 * audio-only Record & Analyze flow and Virtual Stage's video recordings.
 * Falls back to a mock transcript (with a realistic mix of filler words)
 * when GEMINI_API_KEY isn't set, so the rest of the pipeline stays
 * testable without real credentials.
 */
export async function transcribeAudio(audio: File): Promise<TranscriptionResult> {
  if (!hasGeminiKey()) {
    return { transcript: MOCK_TRANSCRIPT, mocked: true };
  }

  const buffer = await audio.arrayBuffer();
  const base64 = Buffer.from(buffer).toString("base64");

  const transcript = await generateContent([
    { text: TRANSCRIBE_PROMPT },
    { inlineData: { mimeType: audio.type || "audio/webm", data: base64 } },
  ]);

  return { transcript: transcript.trim(), mocked: false };
}
