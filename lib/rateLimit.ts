import { getDb, hasDatabase } from "@/lib/db";

/**
 * Per-caller rate limiting for the app's most expensive routes (the 6 that
 * call Gemini directly from user input — see each route's own
 * `checkRateLimit` usage), backed by Postgres rather than a separate Redis
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

/**
 * Keyed by the signed-in account's id (every caller of this is already
 * behind requireApiUser(), so there's no pre-auth case to fall back to an
 * IP for). Returns true when the request should proceed. Degrades to
 * "allow" on any DB error or when no database is configured — same
 * graceful-degrade posture as every other lib/*.ts file that touches the
 * database; a broken limiter should never block real usage.
 */
export async function checkRateLimit(key: string): Promise<boolean> {
  if (!hasDatabase()) return true;
  try {
    const db = await getDb();
    if (!db) return true;

    const windowStart = new Date(Date.now() - WINDOW_MS);
    // Prune this key's own expired events first — keeps the table from
    // growing unbounded without needing a separate cleanup job.
    await db`DELETE FROM rate_limit_events WHERE key = ${key} AND created_at <= ${windowStart}`;

    const rows = await db<{ n: number }[]>`SELECT count(*)::int AS n FROM rate_limit_events WHERE key = ${key}`;
    if (rows[0].n >= MAX_PER_WINDOW) return false;

    await db`INSERT INTO rate_limit_events (key) VALUES (${key})`;
    return true;
  } catch (err) {
    console.error("Rate limit check failed:", err instanceof Error ? err.message : err);
    return true;
  }
}
