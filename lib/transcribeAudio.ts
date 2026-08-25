import { getOpenAI, hasOpenAIKey } from "@/lib/openai";

export interface TranscriptionResult {
  transcript: string;
  durationSeconds: number;
  mocked: boolean;
}

const MOCK_TRANSCRIPT =
  "So, um, today I want to talk about, like, the importance of, uh, public speaking. " +
  "You know, it's a skill that, um, basically everyone needs, whether you're, like, " +
  "presenting to a small team or, uh, speaking at a big conference. So, yeah, let's get into it.";

/**
 * Transcribes an audio recording via OpenAI's Whisper API. Falls back to a
 * mock transcript (with a realistic mix of filler words) when
 * OPENAI_API_KEY isn't set, so the rest of the pipeline stays testable
 * without real credentials.
 */
export async function transcribeAudio(audio: File): Promise<TranscriptionResult> {
  if (!hasOpenAIKey()) {
    return { transcript: MOCK_TRANSCRIPT, durationSeconds: 42, mocked: true };
  }

  const openai = getOpenAI();
  const result = await openai.audio.transcriptions.create({
    file: audio,
    model: "whisper-1",
    response_format: "verbose_json",
  });

  return {
    transcript: result.text,
    durationSeconds: result.duration ?? 0,
    mocked: false,
  };
}
