import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Per-caller rate limiting for the app's most expensive routes (the 4 that
 * send raw audio into a Gemini call — see each route's own `checkRateLimit`
 * usage). No-ops (always allows) until UPSTASH_REDIS_REST_URL/TOKEN are set
 * — same "gracefully do nothing until configured" posture as
 * hasGeminiKey()/hasDatabase() elsewhere in this app — so these routes keep
 * working before that Vercel Marketplace integration is added.
 *
 * An in-memory counter would be worthless here: Vercel serverless
 * instances are stateless and horizontally scaled, so a per-instance
 * counter wouldn't actually throttle anything across requests.
 */
const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({ url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN })
    : null;

// 10 requests per 10 minutes per caller — generous for genuine practice use
// (each of these routes is a multi-second Gemini call a person triggers by
// hand), tight enough to blunt a scripted hammering of the audio endpoints.
const limiter = redis ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(10, "10 m") }) : null;

/**
 * Keyed by the signed-in account's id when available, falling back to the
 * request's IP for the rare pre-auth case. Returns true when the request
 * should proceed.
 */
export async function checkRateLimit(key: string): Promise<boolean> {
  if (!limiter) return true;
  try {
    const { success } = await limiter.limit(key);
    return success;
  } catch (err) {
    // A Redis hiccup should never block real usage — fail open, same
    // degrade-don't-throw posture as this app's other optional integrations.
    console.error("Rate limit check failed:", err instanceof Error ? err.message : err);
    return true;
  }
}
