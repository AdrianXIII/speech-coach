import { createHash } from "crypto";
import { getDb, hasDatabase } from "@/lib/db";

const TTS_URL = "https://texttospeech.googleapis.com/v1/text:synthesize";

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
