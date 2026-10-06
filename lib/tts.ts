import { createHash } from "crypto";
import { getDb, hasDatabase } from "@/lib/db";

const TTS_URL = "https://texttospeech.googleapis.com/v1/text:synthesize";
// Word-boundary timepoints (enableTimePointing) are v1beta1-only as of this
// writing — v1's text:synthesize has no such field. Only
// synthesizeSpeechWithTimepoints below uses this endpoint; every other
// (non-highlighted) call site stays on the stable v1 URL above.
const TTS_URL_V1BETA1 = "https://texttospeech.googleapis.com/v1beta1/text:synthesize";

/**
 * Same "managed service via one env var, no-op until configured" posture as
 * GEMINI_API_KEY/RESEND_API_KEY elsewhere in this app (lib/gemini.ts,
 * lib/email.ts) — callers check this first and fall back to the browser's
 * Web Speech API when it's false, rather than erroring.
 */
export function hasTtsKey(): boolean {
  return !!process.env.GOOGLE_TTS_API_KEY;
}

function cacheKey(voiceName: string, text: string): string {
  return createHash("sha256").update(`${voiceName}::${text}`).digest("hex");
}

/**
 * Calls Google Cloud Text-to-Speech's REST endpoint directly (simple API-key
 * auth, not a service-account JSON flow — same lightweight shape as
 * GEMINI_API_KEY). Returns decoded MP3 bytes, or null on any error/missing
 * key — callers must degrade to the existing Web Speech playback rather than
 * treat this as a hard failure.
 */
export async function synthesizeSpeech(text: string, voiceName: string, languageCode: string): Promise<Buffer | null> {
  if (!hasTtsKey()) return null;
  try {
    const res = await fetch(`${TTS_URL}?key=${process.env.GOOGLE_TTS_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: { text },
        voice: { languageCode, name: voiceName },
        audioConfig: { audioEncoding: "MP3" },
      }),
    });
    if (!res.ok) {
      console.error(`Google TTS request failed (${res.status}): ${await res.text()}`);
      return null;
    }
    const data: { audioContent?: string } = await res.json();
    if (!data.audioContent) return null;
    return Buffer.from(data.audioContent, "base64");
  } catch (err) {
    console.error("synthesizeSpeech failed:", err instanceof Error ? err.message : err);
    return null;
  }
}

/**
 * Checks tts_cache before calling Google, and writes a fresh synthesis back
 * to it when `cacheable` — the normal case for AI Tutor's static
 * prompts/lessons and Comprehension's pooled passages, where the same
 * (voice, text) pair recurs across every user. Fully-dynamic callers
 * (a typed word, a Gemini-generated sentence) pass cacheable: false so a
 * one-off string never bloats the table.
 */
export async function getCachedOrSynthesize(
  text: string,
  voiceName: string,
  languageCode: string,
  cacheable: boolean,
): Promise<Buffer | null> {
  if (!hasTtsKey()) return null;
  const key = cacheKey(voiceName, text);

  if (cacheable && hasDatabase()) {
    try {
      const db = await getDb();
      if (db) {
        const rows = await db<{ audio_data: Buffer }[]>`SELECT audio_data FROM tts_cache WHERE cache_key = ${key}`;
        if (rows[0]) return rows[0].audio_data;
      }
    } catch (err) {
      console.error("tts_cache read failed:", err instanceof Error ? err.message : err);
    }
  }

  const audio = await synthesizeSpeech(text, voiceName, languageCode);
  if (!audio) return null;

  if (cacheable && hasDatabase()) {
    try {
      const db = await getDb();
      if (db) {
        await db`
          INSERT INTO tts_cache (cache_key, audio_data) VALUES (${key}, ${audio})
          ON CONFLICT (cache_key) DO NOTHING
        `;
      }
    } catch (err) {
      console.error("tts_cache write failed:", err instanceof Error ? err.message : err);
    }
  }

  return audio;
}

export interface TimepointedAudio {
  audio: Buffer;
  /** wordStartTimes[i] = seconds into the audio where word i begins — i is an index into text.trim().split(/\s+/), the same tokenization hooks/useSpeechPlayback.ts and AITutor.tsx's HighlightedWords already use for currentWordIndex. */
  wordStartTimes: number[];
}

function escapeSsmlText(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Wraps each word in an SSML <mark> so Google's response can report exactly when each one starts. */
function buildMarkedSsml(text: string): { ssml: string; words: string[] } {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const ssml = `<speak>${words.map((w, i) => `<mark name="w${i}"/>${escapeSsmlText(w)}`).join(" ")}</speak>`;
  return { ssml, words };
}

/**
 * Like synthesizeSpeech, but requests real word-boundary timestamps via
 * SSML <mark> tags (Google's enableTimePointing: ["SSML_MARK"], v1beta1
 * only) instead of returning plain audio. Powers AI Tutor's Teach-step
 * playback bar (hooks/useSpeechPlayback.ts) — real currentTime-driven
 * pause/skip/word-highlight instead of a words-per-minute estimate. Returns
 * null on any error/missing key, same degrade-gracefully contract as
 * synthesizeSpeech.
 */
export async function synthesizeSpeechWithTimepoints(
  text: string,
  voiceName: string,
  languageCode: string,
): Promise<TimepointedAudio | null> {
  if (!hasTtsKey()) return null;
  const { ssml, words } = buildMarkedSsml(text);
  if (words.length === 0) return null;

  try {
    const res = await fetch(`${TTS_URL_V1BETA1}?key=${process.env.GOOGLE_TTS_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: { ssml },
        voice: { languageCode, name: voiceName },
        audioConfig: { audioEncoding: "MP3" },
        enableTimePointing: ["SSML_MARK"],
      }),
    });
    if (!res.ok) {
      console.error(`Google TTS timepointed request failed (${res.status}): ${await res.text()}`);
      return null;
    }
    const data: { audioContent?: string; timepoints?: { markName: string; timeSeconds: number }[] } = await res.json();
    if (!data.audioContent) return null;

    const wordStartTimes = new Array(words.length).fill(0) as number[];
    for (const tp of data.timepoints ?? []) {
      const match = /^w(\d+)$/.exec(tp.markName);
      const idx = match ? Number(match[1]) : -1;
      if (idx >= 0 && idx < wordStartTimes.length) wordStartTimes[idx] = tp.timeSeconds;
    }
    return { audio: Buffer.from(data.audioContent, "base64"), wordStartTimes };
  } catch (err) {
    console.error("synthesizeSpeechWithTimepoints failed:", err instanceof Error ? err.message : err);
    return null;
  }
}

/**
 * Cached counterpart to synthesizeSpeechWithTimepoints — always cacheable
 * (only ever called for AI Tutor's static per-step lesson text, never
 * per-request content), keyed separately from the plain-audio cache
 * (":tp" suffix) since the underlying request (SSML+marks vs. plain text)
 * differs, even though the audible result is effectively the same.
 */
export async function getCachedOrSynthesizeWithTimepoints(
  text: string,
  voiceName: string,
  languageCode: string,
): Promise<TimepointedAudio | null> {
  if (!hasTtsKey()) return null;
  const key = cacheKey(voiceName, `${text}::tp`);

  if (hasDatabase()) {
    try {
      const db = await getDb();
      if (db) {
        const rows = await db<{ audio_data: Buffer; timepoints: string | null }[]>`
          SELECT audio_data, timepoints FROM tts_cache WHERE cache_key = ${key}
        `;
        if (rows[0]?.timepoints) {
          return { audio: rows[0].audio_data, wordStartTimes: JSON.parse(rows[0].timepoints) as number[] };
        }
      }
    } catch (err) {
      console.error("tts_cache (timepoints) read failed:", err instanceof Error ? err.message : err);
    }
  }

  const result = await synthesizeSpeechWithTimepoints(text, voiceName, languageCode);
  if (!result) return null;

  if (hasDatabase()) {
    try {
      const db = await getDb();
      if (db) {
        const timepointsJson = JSON.stringify(result.wordStartTimes);
        await db`
          INSERT INTO tts_cache (cache_key, audio_data, timepoints) VALUES (${key}, ${result.audio}, ${timepointsJson})
          ON CONFLICT (cache_key) DO UPDATE SET timepoints = EXCLUDED.timepoints
        `;
      }
    } catch (err) {
      console.error("tts_cache (timepoints) write failed:", err instanceof Error ? err.message : err);
    }
  }

  return result;
}
