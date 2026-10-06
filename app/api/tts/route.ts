import { NextRequest, NextResponse } from "next/server";
import { getCachedOrSynthesize } from "@/lib/tts";
import { getLanguage, toLanguageCode } from "@/lib/languages";
import { requireApiUser } from "@/lib/requireUser";
import { checkRateLimit, LIGHT_WINDOW_MS, LIGHT_MAX_PER_WINDOW } from "@/lib/rateLimit";

const MAX_TEXT_CHARS = 2000;

/**
 * POST /api/tts
 * Body: { text: string, language?: LanguageCode, cacheable?: boolean }.
 *
 * Returns raw audio/mpeg bytes on success. On any failure — missing
 * GOOGLE_TTS_API_KEY, an upstream Google error, anything — responds with a
 * plain JSON body instead of audio bytes rather than a hard error status;
 * the client-side hook (hooks/useNeuralSpeech.ts) checks the response's
 * Content-Type and falls back to the browser's Web Speech API whenever it
 * isn't audio, so an unconfigured/misbehaving TTS backend never breaks
 * playback, only degrades its quality.
 *
 * Rate-limited on the light tier (lib/rateLimit.ts): this fires on every
 * "play" interaction across several trainers in one sitting, much closer to
 * word-search's debounced-keystroke shape than a single deliberate
 * multi-second Gemini call.
 */
export async function POST(req: NextRequest) {
  const gate = await requireApiUser();
  if (gate instanceof NextResponse) return gate;

  if (!(await checkRateLimit(`tts:${gate.id}`, { windowMs: LIGHT_WINDOW_MS, max: LIGHT_MAX_PER_WINDOW }))) {
    return NextResponse.json({ configured: false, error: "Too many requests. Please slow down." }, { status: 429 });
  }

  let body: { text?: string; language?: string; cacheable?: boolean };
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
  const audio = await getCachedOrSynthesize(text, language.ttsVoice, language.speechLang, !!body.cacheable);
  if (!audio) {
    return NextResponse.json({ configured: false });
  }

  return new NextResponse(new Uint8Array(audio), { headers: { "Content-Type": "audio/mpeg" } });
}
