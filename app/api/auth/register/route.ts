import { NextRequest, NextResponse } from "next/server";
import { getDb, hasDatabase } from "@/lib/db";
import { hashPassword } from "@/lib/password";

const MIN_PASSWORD_LENGTH = 8;

/**
 * POST /api/auth/register — body { email, password }.
 * Creates a new account (or, for a row that exists with no password yet —
 * e.g. an Apple-only sign-in — adds one) so it can then sign in via
 * lib/auth.ts's Credentials provider. Not itself a sign-in: the client
 * calls signIn("credentials", ...) right after this succeeds.
 */
export async function POST(req: NextRequest) {
  if (!hasDatabase()) {
    return NextResponse.json({ error: "No database connected." }, { status: 503 });
  }

  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    return NextResponse.json({ error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.` }, { status: 400 });
  }

  const db = await getDb();
  if (!db) return NextResponse.json({ error: "No database connected." }, { status: 503 });

  try {
    const existing = await db<{ id: number; password_hash: string | null }[]>`
      SELECT id, password_hash FROM users WHERE email = ${email}
    `;
    if (existing[0]?.password_hash) {
      return NextResponse.json({ error: "An account with this email already exists — sign in instead." }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);
    if (existing[0]) {
      await db`UPDATE users SET password_hash = ${passwordHash} WHERE id = ${existing[0].id}`;
    } else {
      await db`INSERT INTO users (email, password_hash) VALUES (${email}, ${passwordHash})`;
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Registration failed:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Could not create account." }, { status: 500 });
  }
}
