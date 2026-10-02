import type { NextRequest } from "next/server";
import { getDb, hasDatabase } from "@/lib/db";

/**
 * Per-caller rate limiting, backed by Postgres rather than a separate Redis
 * service (Upstash) — this app already has a working Postgres connection
 * for everything else, and adding a whole new third-party account just for
 * rate limiting wasn't worth it at this app's current scale. A few extra
 * queries per gated request is negligible next to the Gemini call itself.
 *
 * An in-memory counter would be worthless here regardless of backend:
 * Vercel serverless instances are stateless and horizontally scaled, so a
 * per-instance counter wouldn't actually throttle anything across requests
 * — it has to live somewhere shared, hence the database.
 */
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
// 10 requests per window per caller — generous for genuine practice use
// (each of these routes is a multi-second Gemini call a person triggers by
// hand), tight enough to blunt a scripted hammering of the audio endpoints.
const MAX_PER_WINDOW = 10;

// A looser tier for routes that fire on near-every keystroke (word-search's
// debounced autocomplete, word-stress's lookup-as-you-type) rather than on
// one deliberate button press — the default 10-per-10-minutes tier would
// throttle a single normal typing session.
export const LIGHT_WINDOW_MS = 60 * 1000; // 1 minute
export const LIGHT_MAX_PER_WINDOW = 30;

/**
 * Keyed by caller (typically the signed-in account's id, prefixed per
 * feature by the route itself so one feature's budget can't starve
 * another's — see each route's own `checkRateLimit` call). Returns true
 * when the request should proceed. Degrades to "allow" on any DB error or
 * when no database is configured — same graceful-degrade posture as every
 * other lib/*.ts file that touches the database; a broken limiter should
 * never block real usage.
 */
export async function checkRateLimit(
  key: string,
  opts: { windowMs?: number; max?: number } = {},
): Promise<boolean> {
  if (!hasDatabase()) return true;
  const windowMs = opts.windowMs ?? WINDOW_MS;
  const max = opts.max ?? MAX_PER_WINDOW;
  try {
    const db = await getDb();
    if (!db) return true;

    const windowStart = new Date(Date.now() - windowMs);
    // Prune this key's own expired events first — keeps the table from
    // growing unbounded without needing a separate cleanup job.
    await db`DELETE FROM rate_limit_events WHERE key = ${key} AND created_at <= ${windowStart}`;

    const rows = await db<{ n: number }[]>`SELECT count(*)::int AS n FROM rate_limit_events WHERE key = ${key}`;
    if (rows[0].n >= max) return false;

    await db`INSERT INTO rate_limit_events (key) VALUES (${key})`;
    return true;
  } catch (err) {
    console.error("Rate limit check failed:", err instanceof Error ? err.message : err);
    return true;
  }
}

/**
 * Best-effort caller IP for the handful of routes that must be rate-limited
 * before a session exists (registration, forgot-password) — Vercel sets
 * x-forwarded-for on every request reaching a Route Handler. Falls back to
 * a constant key when absent (local dev without a proxy in front) rather
 * than throwing; worst case that degrades to one shared bucket, not a
 * crash.
 */
export function getClientIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}
