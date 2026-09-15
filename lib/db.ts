import postgres from "postgres";

/**
 * Postgres client for AI Tutor review records and content flags. The teaching
 * source remains in the repository; the database stores review snapshots,
 * sources, agent assessments, and human edits.
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

/** Creates the review tables if they don't exist yet. */
function ensureSchema(sql: ReturnType<typeof postgres>): Promise<void> {
  if (!schemaReady) {
    // sql.unsafe uses the simple query protocol, which (unlike a tagged-template
    // call) allows multiple semicolon-separated statements in one round trip —
    // required for this multi-CREATE-TABLE block, and safe here since it takes
    // no interpolated parameters.
    schemaReady = sql.unsafe(`
      CREATE TABLE IF NOT EXISTS tutor_flags (
        id SERIAL PRIMARY KEY,
        profession TEXT NOT NULL,
        category TEXT NOT NULL,
        concept_id TEXT,
        concept_title TEXT,
        reason TEXT NOT NULL,
        note TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS tutor_content_reviews (
        id SERIAL PRIMARY KEY,
        content_key TEXT NOT NULL,
        version INTEGER NOT NULL,
        content JSONB NOT NULL,
        status TEXT NOT NULL DEFAULT 'draft',
        reviewer_summary TEXT,
        improvement_suggestions JSONB NOT NULL DEFAULT '[]'::jsonb,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        UNIQUE(content_key, version)
      );

      CREATE TABLE IF NOT EXISTS tutor_content_reviewers (
        id SERIAL PRIMARY KEY,
        review_id INTEGER NOT NULL REFERENCES tutor_content_reviews(id) ON DELETE CASCADE,
        agent_name TEXT NOT NULL,
        model TEXT,
        scores JSONB NOT NULL,
        verdict TEXT NOT NULL,
        contradictions JSONB NOT NULL DEFAULT '[]'::jsonb,
        missing_topics JSONB NOT NULL DEFAULT '[]'::jsonb,
        sources JSONB NOT NULL DEFAULT '[]'::jsonb,
        suggestions JSONB NOT NULL DEFAULT '[]'::jsonb,
        raw_output JSONB,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS tutor_content_edits (
        id SERIAL PRIMARY KEY,
        review_id INTEGER NOT NULL REFERENCES tutor_content_reviews(id) ON DELETE CASCADE,
        editor_name TEXT NOT NULL,
        edited_content JSONB NOT NULL,
        note TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `).then(() => undefined);
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
