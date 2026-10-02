import { NextRequest, NextResponse } from "next/server";
import { getDb, hasDatabase } from "@/lib/db";
import { consumeResetToken } from "@/lib/passwordReset";
import { hashPassword, MAX_PASSWORD_LENGTH } from "@/lib/password";

const MIN_PASSWORD_LENGTH = 8;

/** POST /api/auth/reset-password — body { token, password }. Consumes the token and sets a new password. */
export async function POST(req: NextRequest) {
  if (!hasDatabase()) {
    return NextResponse.json({ error: "No database connected." }, { status: 503 });
  }

  const body = await req.json().catch(() => null);
  const token = typeof body?.token === "string" ? body.token : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!token) {
    return NextResponse.json({ error: "Missing reset token." }, { status: 400 });
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    return NextResponse.json({ error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.` }, { status: 400 });
  }
  if (password.length > MAX_PASSWORD_LENGTH) {
    return NextResponse.json({ error: `Password must be at most ${MAX_PASSWORD_LENGTH} characters.` }, { status: 400 });
  }

  const email = await consumeResetToken(token);
  if (!email) {
    return NextResponse.json({ error: "This reset link is invalid or has expired." }, { status: 400 });
  }

  try {
    const db = await getDb();
    const passwordHash = await hashPassword(password);
    await db!`UPDATE users SET password_hash = ${passwordHash} WHERE email = ${email}`;
    // Returned so the client can immediately sign in with the new password
    // (see app/reset-password/page.tsx) instead of sending the user back to
    // a separate sign-in form right after they just proved account ownership.
    return NextResponse.json({ ok: true, email });
  } catch (err) {
    console.error("reset-password failed:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Could not reset password." }, { status: 500 });
  }
}
