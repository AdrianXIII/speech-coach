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

/**
 * Creates the review tables if they don't exist yet.
 *
 * If this fails, `schemaReady` is reset to null (see the .catch below)
 * rather than left holding the rejected promise — caching a *failure* here
 * would permanently wedge every later call on this same warm serverless
 * instance (a plain `if (!schemaReady)` check treats a rejected promise as
 * "already have a result," so it would never retry, silently hiding every
 * new table from every request that instance ever serves again, even after
 * whatever caused the failure — a transient connection hiccup, say — has
 * long since cleared up). Retrying is safe and cheap: almost every
 * statement below is CREATE TABLE IF NOT EXISTS / ADD COLUMN IF NOT EXISTS,
 * so a retry after a partial failure just re-confirms what already exists.
 */
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

      -- Review words are per-language (the Pronunciation trainer now covers
      -- all five). Rows saved before this existed were all English, which
      -- the column default backfills; uniqueness moves from (word) to
      -- (language, word), and both steps are idempotent on every cold start.
      ALTER TABLE pronunciation_review_words ADD COLUMN IF NOT EXISTS language TEXT NOT NULL DEFAULT 'en';
      DROP INDEX IF EXISTS pronunciation_review_words_word_lower_idx;
      CREATE UNIQUE INDEX IF NOT EXISTS pronunciation_review_words_lang_word_idx
        ON pronunciation_review_words (language, lower(word));

      CREATE TABLE IF NOT EXISTS exec_comm_attempts (
        id SERIAL PRIMARY KEY,
        scenario_id TEXT NOT NULL,
        category TEXT NOT NULL,
        model_id TEXT NOT NULL,
        language TEXT NOT NULL,
        overall_score INTEGER NOT NULL,
        scores JSONB NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );

      -- Accounts (lib/auth.ts's hand-rolled Auth.js Adapter). trial_ends_at is
      -- stored explicitly rather than computed from created_at + a constant,
      -- so one account's trial can be manually extended later without a code
      -- change. is_admin gates the two internal review routes that used to be
      -- fully unauthenticated (app/api/tutor/flags, .../approved-export).
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE,
        email_verified TIMESTAMPTZ,
        name TEXT,
        image TEXT,
        is_admin BOOLEAN NOT NULL DEFAULT false,
        trial_ends_at TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '7 days'),
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );

      -- Email+password sign-in (lib/password.ts, the Credentials provider in
      -- lib/auth.ts) — nullable because an Apple-only account never sets one.
      ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash TEXT;

      -- One row per linked sign-in method (Apple OAuth today, room for more
      -- later) — Auth.js's standard Adapter shape.
      CREATE TABLE IF NOT EXISTS accounts (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        type TEXT NOT NULL,
        provider TEXT NOT NULL,
        provider_account_id TEXT NOT NULL,
        refresh_token TEXT,
        access_token TEXT,
        expires_at BIGINT,
        token_type TEXT,
        scope TEXT,
        id_token TEXT,
        session_state TEXT,
        UNIQUE (provider, provider_account_id)
      );

      -- Database sessions, not JWT: a paid subscription needs to be
      -- revocable immediately (refund/chargeback/ban), which a JWT session
      -- can't do without a DB-backed blocklist anyway.
      CREATE TABLE IF NOT EXISTS sessions (
        id SERIAL PRIMARY KEY,
        session_token TEXT NOT NULL UNIQUE,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        expires TIMESTAMPTZ NOT NULL
      );

      -- Email magic-link tokens (Auth.js's Email provider).
      CREATE TABLE IF NOT EXISTS verification_token (
        identifier TEXT NOT NULL,
        token TEXT NOT NULL,
        expires TIMESTAMPTZ NOT NULL,
        PRIMARY KEY (identifier, token)
      );

      -- Real per-person data that would otherwise collide once two accounts
      -- use the app at once (see lib/pronunciationReview.ts,
      -- lib/executiveCommHistory.ts). Pre-launch rows stay user_id IS NULL —
      -- Postgres treats NULL as distinct in a unique index, so they simply
      -- become invisible once every query filters WHERE user_id = $1; no
      -- backfill needed, this was the developer's own solo test data.
      ALTER TABLE pronunciation_review_words ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id) ON DELETE CASCADE;
      ALTER TABLE exec_comm_attempts ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id) ON DELETE CASCADE;
      -- Soft case: tutor_flags is a developer content-review tool, not
      -- student-facing data, so ON DELETE SET NULL rather than CASCADE — a
      -- deleted account's past flags stay around for review.
      ALTER TABLE tutor_flags ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id) ON DELETE SET NULL;

      -- Two people must be able to track the same word independently, so
      -- uniqueness moves from (language, word) to (user_id, language, word).
      DROP INDEX IF EXISTS pronunciation_review_words_lang_word_idx;
      CREATE UNIQUE INDEX IF NOT EXISTS pronunciation_review_words_user_lang_word_idx
        ON pronunciation_review_words (user_id, language, lower(word));

      -- Password-reset links (lib/passwordReset.ts, sent via Resend — see
      -- lib/email.ts). A dedicated table rather than reusing the Auth.js
      -- adapter's verification_token (that one's hashing/lookup conventions
      -- are Auth.js-internal; this stays simple and explicit).
      CREATE TABLE IF NOT EXISTS password_reset_tokens (
        token TEXT PRIMARY KEY,
        email TEXT NOT NULL,
        expires TIMESTAMPTZ NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );

      -- Free-tier daily usage (lib/usageLimit.ts) — one row per
      -- (account, feature, calendar day) it actually used; existence alone
      -- is the signal, no count needed since the limit is "once." Old rows
      -- are simply never matched again once usage_date has passed — no
      -- cleanup job required, though they could be pruned later.
      CREATE TABLE IF NOT EXISTS daily_usage (
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        feature TEXT NOT NULL,
        usage_date DATE NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        PRIMARY KEY (user_id, feature, usage_date)
      );

      -- One active RevenueCat entitlement per account (lib/subscription.ts).
      CREATE TABLE IF NOT EXISTS subscriptions (
        user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
        rc_app_user_id TEXT NOT NULL,
        product_id TEXT,
        status TEXT NOT NULL,
        current_period_end TIMESTAMPTZ,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
    `)
      .then(() => undefined)
      .catch((err) => {
        schemaReady = null;
        throw err;
      });
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
