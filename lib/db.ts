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

      -- Added after tutor_content_reviews already existed in some deployments,
      -- so a plain CREATE TABLE IF NOT EXISTS above wouldn't add it there.
      ALTER TABLE tutor_content_reviews ADD COLUMN IF NOT EXISTS debate_info JSONB;

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
      );

      CREATE TABLE IF NOT EXISTS tutor_news_cache (
        id SERIAL PRIMARY KEY,
        profession TEXT NOT NULL,
        category TEXT NOT NULL,
        country TEXT NOT NULL DEFAULT '',
        language TEXT NOT NULL,
        headline TEXT NOT NULL,
        summary TEXT NOT NULL,
        connection TEXT NOT NULL,
        applied_question TEXT NOT NULL,
        source_url TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        UNIQUE (profession, category, country, language)
      );

      CREATE TABLE IF NOT EXISTS tutor_content_sources (
        id SERIAL PRIMARY KEY,
        content_key TEXT NOT NULL,
        title TEXT NOT NULL,
        author TEXT,
        year TEXT,
        url TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS comprehension_news_cache (
        id SERIAL PRIMARY KEY,
        topic TEXT NOT NULL,
        language TEXT NOT NULL,
        title TEXT NOT NULL,
        text TEXT NOT NULL,
        advanced_terms JSONB NOT NULL DEFAULT '[]'::jsonb,
        key_points JSONB NOT NULL DEFAULT '[]'::jsonb,
        source_url TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        UNIQUE (topic, language)
      );

      -- Turns one cached row per (topic, language) into a pool of up to 5
      -- (slot 0-4), served randomly — see lib/comprehensionNews.ts. Existing
      -- rows backfill to slot 0 via the column default, so nothing is lost.
      -- ADD CONSTRAINT has no IF NOT EXISTS in Postgres, and this whole block
      -- re-runs on every cold start, so the DO block is required to keep
      -- ensureSchema() idempotent past the first run. A named UNIQUE
      -- constraint creates a backing index of the same name, and Postgres
      -- raises that specific "already exists" case as duplicate_table
      -- (42P07), not duplicate_object (42710) — catching only the latter
      -- (as an earlier version of this migration did) let the error escape
      -- on the second-and-later cold start, permanently breaking every
      -- query on that Lambda instance since ensureSchema() caches the
      -- rejected promise. Both must be caught.
      ALTER TABLE comprehension_news_cache ADD COLUMN IF NOT EXISTS slot INTEGER NOT NULL DEFAULT 0;
      ALTER TABLE comprehension_news_cache DROP CONSTRAINT IF EXISTS comprehension_news_cache_topic_language_key;

      DO $$ BEGIN
        ALTER TABLE comprehension_news_cache
          ADD CONSTRAINT comprehension_news_cache_topic_language_slot_key UNIQUE (topic, language, slot);
      EXCEPTION WHEN duplicate_object OR duplicate_table THEN NULL;
      END $$;

      CREATE TABLE IF NOT EXISTS pronunciation_review_words (
        id SERIAL PRIMARY KEY,
        word TEXT NOT NULL,
        added_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        last_practiced_at TIMESTAMPTZ,
        practice_count INTEGER NOT NULL DEFAULT 0,
        stage INTEGER NOT NULL DEFAULT 0,
        next_review_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );

      CREATE UNIQUE INDEX IF NOT EXISTS pronunciation_review_words_word_lower_idx
        ON pronunciation_review_words (lower(word));
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
