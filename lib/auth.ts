import NextAuth from "next-auth";
import type { Adapter, AdapterAccount, AdapterSession, AdapterUser, VerificationToken } from "next-auth/adapters";
import Apple from "next-auth/providers/apple";
import type { EmailConfig } from "next-auth/providers/email";
import { SignJWT } from "jose";
import { Resend } from "resend";
import { getDb, hasDatabase } from "@/lib/db";

/**
 * Auth.js v5, web-only (no native Capacitor auth plugin needed — the iOS
 * shell's WKWebView loads the real https://speech-coach-beta.vercel.app
 * origin directly per capacitor.config.ts, so cookies and an ordinary OAuth
 * redirect to appleid.apple.com work exactly like desktop Safari).
 *
 * Sign-in methods: Apple + email magic link, nothing else. Apple App Store
 * guideline 4.8 only requires offering Sign in with Apple once another
 * third-party/social login exists — this combination sidesteps that
 * requirement by construction rather than needing Google too.
 *
 * Session strategy: database, not JWT — a paid subscription needs immediate
 * revocation (refund/chargeback/ban), which a JWT session can't do without a
 * DB-backed blocklist anyway, and this app already accepts a DB round-trip
 * per request elsewhere (see lib/db.ts's hasDatabase()/getDb() pattern,
 * mirrored throughout this file).
 *
 * No official Auth.js adapter exists for a bare `postgres` client (adapters
 * target Prisma/Drizzle/etc.) — the Adapter below is written directly
 * against lib/db.ts's existing client, following the same
 * "getDb() returns null until configured, callers degrade gracefully" idiom
 * as every other lib/*.ts file that touches the database.
 */

const row = <T>(rows: T[]): T | null => rows[0] ?? null;

function toAdapterUser(u: {
  id: number;
  email: string | null;
  email_verified: Date | null;
  name: string | null;
  image: string | null;
}): AdapterUser {
  return {
    id: String(u.id),
    email: u.email ?? "",
    emailVerified: u.email_verified,
    name: u.name ?? undefined,
    image: u.image ?? undefined,
  };
}

function toAdapterSession(s: { session_token: string; user_id: number; expires: Date }): AdapterSession {
  return { sessionToken: s.session_token, userId: String(s.user_id), expires: s.expires };
}

/**
 * Hand-rolled Adapter — see the module doc comment above for why. Every
 * method assumes hasDatabase() is already true (NextAuth() below only wires
 * this adapter in when it is; see the exported `auth`/`handlers` at the
 * bottom of this file).
 */
function buildAdapter(): Adapter {
  async function sql() {
    const db = await getDb();
    if (!db) throw new Error("Adapter called without a configured database.");
    return db;
  }

  return {
    async createUser(user: AdapterUser) {
      const db = await sql();
      const [u] = await db<{ id: number; email: string; email_verified: Date | null; name: string | null; image: string | null }[]>`
        INSERT INTO users (email, email_verified, name, image)
        VALUES (${user.email}, ${user.emailVerified}, ${user.name ?? null}, ${user.image ?? null})
        RETURNING id, email, email_verified, name, image
      `;
      return toAdapterUser(u);
    },

    async getUser(id) {
      const db = await sql();
      const rows = await db<{ id: number; email: string; email_verified: Date | null; name: string | null; image: string | null }[]>`
        SELECT id, email, email_verified, name, image FROM users WHERE id = ${Number(id)}
      `;
      const u = row(rows);
      return u ? toAdapterUser(u) : null;
    },

    async getUserByEmail(email) {
      const db = await sql();
      const rows = await db<{ id: number; email: string; email_verified: Date | null; name: string | null; image: string | null }[]>`
        SELECT id, email, email_verified, name, image FROM users WHERE email = ${email}
      `;
      const u = row(rows);
      return u ? toAdapterUser(u) : null;
    },

    async getUserByAccount({ provider, providerAccountId }) {
      const db = await sql();
      const rows = await db<{ id: number; email: string; email_verified: Date | null; name: string | null; image: string | null }[]>`
        SELECT u.id, u.email, u.email_verified, u.name, u.image
        FROM users u
        JOIN accounts a ON a.user_id = u.id
        WHERE a.provider = ${provider} AND a.provider_account_id = ${providerAccountId}
      `;
      const u = row(rows);
      return u ? toAdapterUser(u) : null;
    },

    async updateUser(user) {
      const db = await sql();
      const [u] = await db<{ id: number; email: string; email_verified: Date | null; name: string | null; image: string | null }[]>`
        UPDATE users SET
          email = COALESCE(${user.email ?? null}, email),
          email_verified = COALESCE(${user.emailVerified ?? null}, email_verified),
          name = COALESCE(${user.name ?? null}, name),
          image = COALESCE(${user.image ?? null}, image)
        WHERE id = ${Number(user.id)}
        RETURNING id, email, email_verified, name, image
      `;
      return toAdapterUser(u);
    },

    async linkAccount(account: AdapterAccount) {
      const db = await sql();
      const userId = Number(account.userId);
      const refreshToken: string | null = account.refresh_token ?? null;
      const accessToken: string | null = account.access_token ?? null;
      const expiresAt: number | null = account.expires_at ?? null;
      const tokenType: string | null = account.token_type ?? null;
      const scope: string | null = account.scope ?? null;
      const idToken: string | null = account.id_token ?? null;
      const sessionState: string | null = typeof account.session_state === "string" ? account.session_state : null;
      await db`
        INSERT INTO accounts (
          user_id, type, provider, provider_account_id, refresh_token,
          access_token, expires_at, token_type, scope, id_token, session_state
        ) VALUES (
          ${userId}, ${account.type}, ${account.provider}, ${account.providerAccountId},
          ${refreshToken}, ${accessToken}, ${expiresAt},
          ${tokenType}, ${scope}, ${idToken}, ${sessionState}
        )
      `;
    },

    async createSession({ sessionToken, userId, expires }) {
      const db = await sql();
      const [s] = await db<{ session_token: string; user_id: number; expires: Date }[]>`
        INSERT INTO sessions (session_token, user_id, expires)
        VALUES (${sessionToken}, ${Number(userId)}, ${expires})
        RETURNING session_token, user_id, expires
      `;
      return toAdapterSession(s);
    },

    async getSessionAndUser(sessionToken) {
      const db = await sql();
      const rows = await db<
        { session_token: string; user_id: number; expires: Date; email: string; email_verified: Date | null; name: string | null; image: string | null }[]
      >`
        SELECT s.session_token, s.user_id, s.expires, u.email, u.email_verified, u.name, u.image
        FROM sessions s JOIN users u ON u.id = s.user_id
        WHERE s.session_token = ${sessionToken}
      `;
      const r = row(rows);
      if (!r) return null;
      return {
        session: toAdapterSession(r),
        user: toAdapterUser({ id: r.user_id, email: r.email, email_verified: r.email_verified, name: r.name, image: r.image }),
      };
    },

    async updateSession({ sessionToken, expires }) {
      const db = await sql();
      const rows = await db<{ session_token: string; user_id: number; expires: Date }[]>`
        UPDATE sessions SET expires = COALESCE(${expires ?? null}, expires)
        WHERE session_token = ${sessionToken}
        RETURNING session_token, user_id, expires
      `;
      const s = row(rows);
      return s ? toAdapterSession(s) : null;
    },

    async deleteSession(sessionToken) {
      const db = await sql();
      await db`DELETE FROM sessions WHERE session_token = ${sessionToken}`;
    },

    async createVerificationToken(token: VerificationToken) {
      const db = await sql();
      await db`
        INSERT INTO verification_token (identifier, token, expires)
        VALUES (${token.identifier}, ${token.token}, ${token.expires})
      `;
      return token;
    },

    async useVerificationToken({ identifier, token }) {
      const db = await sql();
      const rows = await db<{ identifier: string; token: string; expires: Date }[]>`
        DELETE FROM verification_token WHERE identifier = ${identifier} AND token = ${token}
        RETURNING identifier, token, expires
      `;
      return row(rows);
    },
  };
}

/**
 * Apple's client secret isn't a static value — it's a JWT the app itself
 * signs with the Sign-in-with-Apple .p8 private key, valid for at most six
 * months (Auth.js's own `clientSecret` field only accepts a plain string,
 * not a generator function, so it's computed once per cold start and cached
 * here — regenerating it on every request would be pure waste given the
 * ~150-day validity window this deliberately stays under). Registered as an
 * Apple provider only when all four env vars are present, so email-only
 * auth keeps working before that portal setup is done.
 */
let cachedAppleSecret: { jwt: string; expiresAt: number } | null = null;

async function appleClientSecret(): Promise<string> {
  if (cachedAppleSecret && cachedAppleSecret.expiresAt > Date.now()) return cachedAppleSecret.jwt;
  const privateKey = (process.env.AUTH_APPLE_PRIVATE_KEY ?? "").replace(/\\n/g, "\n");
  const key = await (await import("jose")).importPKCS8(privateKey, "ES256");
  const jwt = await new SignJWT({})
    .setProtectedHeader({ alg: "ES256", kid: process.env.AUTH_APPLE_KEY_ID })
    .setIssuer(process.env.AUTH_APPLE_TEAM_ID!)
    .setIssuedAt()
    .setExpirationTime("150d")
    .setAudience("https://appleid.apple.com")
    .setSubject(process.env.AUTH_APPLE_ID!)
    .sign(key);
  cachedAppleSecret = { jwt, expiresAt: Date.now() + 149 * 24 * 60 * 60 * 1000 };
  return jwt;
}

const hasAppleConfig = !!(
  process.env.AUTH_APPLE_ID &&
  process.env.AUTH_APPLE_TEAM_ID &&
  process.env.AUTH_APPLE_KEY_ID &&
  process.env.AUTH_APPLE_PRIVATE_KEY
);

const hasResendConfig = !!process.env.RESEND_API_KEY;

/**
 * Custom Email provider (not the deprecated nodemailer-based default export)
 * so magic links send via Resend directly — same "managed service via one
 * env var" posture as GEMINI_API_KEY elsewhere in this app. Only called
 * when hasResendConfig is true (see the providers array below) — the
 * Resend constructor throws synchronously on a missing key, which would
 * otherwise crash every single auth() call, not just email sign-in.
 */
function resendEmailProvider(): EmailConfig {
  const resend = new Resend(process.env.RESEND_API_KEY);
  return {
    id: "email",
    type: "email",
    name: "Email",
    from: process.env.AUTH_EMAIL_FROM ?? "MasterSpeak <sign-in@mastertalk.app>",
    maxAge: 24 * 60 * 60,
    async sendVerificationRequest({ identifier, url }) {
      await resend.emails.send({
        from: process.env.AUTH_EMAIL_FROM ?? "MasterSpeak <sign-in@mastertalk.app>",
        to: identifier,
        subject: "Sign in to MasterSpeak",
        text: `Sign in to MasterSpeak by clicking this link:\n${url}\n\nIf you didn't request this, you can ignore this email.`,
        html: `<p>Sign in to MasterSpeak by clicking this link:</p><p><a href="${url}">${url}</a></p><p>If you didn't request this, you can ignore this email.</p>`,
      });
    },
  };
}

export const { handlers, auth, signIn, signOut } = NextAuth(async () => ({
  adapter: hasDatabase() ? buildAdapter() : undefined,
  session: { strategy: "database" },
  trustHost: true,
  providers: [
    ...(hasResendConfig ? [resendEmailProvider()] : []),
    ...(hasAppleConfig
      ? [
          Apple({
            clientId: process.env.AUTH_APPLE_ID,
            clientSecret: await appleClientSecret(),
          }),
        ]
      : []),
  ],
  pages: { signIn: "/sign-in" },
  callbacks: {
    async session({ session, user }) {
      // Auth.js's default session callback only forwards a handful of
      // AdapterUser fields — is_admin/trial_ends_at live on `users` but not
      // on AdapterUser, so lib/requireUser.ts reads them with their own
      // query keyed by this id rather than threading them through here.
      if (session.user) session.user.id = user.id;
      return session;
    },
  },
}));
