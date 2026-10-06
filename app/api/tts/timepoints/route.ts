import { NextRequest, NextResponse } from "next/server";
import { getCachedOrSynthesizeWithTimepoints } from "@/lib/tts";
import { getLanguage, toLanguageCode } from "@/lib/languages";
import { requireApiUser } from "@/lib/requireUser";
import { checkRateLimit, LIGHT_WINDOW_MS, LIGHT_MAX_PER_WINDOW } from "@/lib/rateLimit";

const MAX_TEXT_CHARS = 4000;

/**
 * POST /api/tts/timepoints
 * Body: { text: string, language?: LanguageCode }.
 *
 * Only AI Tutor's Teach-step playback bar (hooks/useSpeechPlayback.ts) calls
 * this — the one place that needs real word-boundary timing to drive
 * pause/skip/word-highlight off actual audio position. Every other "play
 * this text" call site uses the plain /api/tts route instead.
 *
 * Unlike /api/tts (which streams raw audio/mpeg bytes), this returns JSON —
 * the audio and its timepoints are one response, so they can't desync into
 * two separate requests. `{ configured: false }` signals the caller to fall
 * back to the estimated-offset Web Speech path, same contract as /api/tts.
 */
export async function POST(req: NextRequest) {
  const gate = await requireApiUser();
  if (gate instanceof NextResponse) return gate;

  if (!(await checkRateLimit(`tts:${gate.id}`, { windowMs: LIGHT_WINDOW_MS, max: LIGHT_MAX_PER_WINDOW }))) {
    return NextResponse.json({ configured: false, error: "Too many requests. Please slow down." }, { status: 429 });
  }

  let body: { text?: string; language?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ configured: false, error: "Expected JSON body." }, { status: 400 });
  }

  const text = body.text?.trim().slice(0, MAX_TEXT_CHARS);
  if (!text) {
    return NextResponse.json({ configured: false, error: "Missing 'text'." }, { status: 400 });
  }

  const language = getLanguage(toLanguageCode(body.language));
  const result = await getCachedOrSynthesizeWithTimepoints(text, language.ttsVoice, language.speechLang);
  if (!result) {
    return NextResponse.json({ configured: false });
  }

  return NextResponse.json({
    configured: true,
    audio: result.audio.toString("base64"),
    wordStartTimes: result.wordStartTimes,
  });
}
