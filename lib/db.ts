import postgres from "postgres";

/**
 * Postgres client for the one thing this app persists server-side: AI Tutor
 * content flags (see app/api/tutor/flag/route.ts). Everything else in the
 * app stays local-first (localStorage) by design — this is the single
 * exception, because flags need to be reviewable across devices/sessions.
 *
 * Reads whichever connection string Vercel's database integration injects —
 * DATABASE_URL (current Neon-on-Vercel-Marketplace integration) or
 * POSTGRES_URL (legacy Vercel Postgres naming) — so it works either way
 * without caring which flow was used to create the database. Until a
 * database is connected, hasDatabase() is false and callers fall back
 * gracefully (same "mock mode" pattern as GEMINI_API_KEY elsewhere in this
 * app) — see .env.example for how to set one up.
 */
const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

export function hasDatabase(): boolean {
  return !!connectionString;
}

let client: ReturnType<typeof postgres> | null = null;
let schemaReady: Promise<void> | null = null;

function getClient() {
  if (!connectionString) return null;
  if (!client) {
    client = postgres(connectionString, { ssl: "require" });
  }
  return client;
}

/** Creates the tutor_flags table if it doesn't exist yet — idempotent, cheap, no manual migration step needed. */
function ensureSchema(sql: ReturnType<typeof postgres>): Promise<void> {
  if (!schemaReady) {
    schemaReady = sql`
      CREATE TABLE IF NOT EXISTS tutor_flags (
        id SERIAL PRIMARY KEY,
        profession TEXT NOT NULL,
        category TEXT NOT NULL,
        concept_id TEXT,
        concept_title TEXT,
        reason TEXT NOT NULL,
        note TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `.then(() => undefined);
  }
  return schemaReady;
}

/** Returns a ready-to-query client (schema already ensured), or null if no database is configured. */
export async function getDb(): Promise<ReturnType<typeof postgres> | null> {
  const sql = getClient();
  if (!sql) return null;
  await ensureSchema(sql);
  return sql;
}
