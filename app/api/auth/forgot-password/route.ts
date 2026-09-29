import { NextRequest, NextResponse } from "next/server";
import { getDb, hasDatabase } from "@/lib/db";
import { createResetToken } from "@/lib/passwordReset";
import { sendEmail } from "@/lib/email";

/**
 * POST /api/auth/forgot-password — body { email }.
 * Always responds { ok: true } regardless of whether that email has an
 * account, so this endpoint can't be used to enumerate registered emails.
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

  if (email && hasDatabase()) {
    try {
      const db = await getDb();
      const rows = await db!<{ id: number }[]>`
        SELECT id FROM users WHERE email = ${email} AND password_hash IS NOT NULL
      `;
      if (rows[0]) {
        const token = await createResetToken(email);
        if (token) {
          const url = `${req.nextUrl.origin}/reset-password?token=${token}`;
          await sendEmail({
            to: email,
            subject: "Reset your MasterSpeak password",
            text: `Reset your password by opening this link:\n${url}\n\nThis link expires in 1 hour. If you didn't request this, you can ignore this email.`,
            html: `<p>Reset your password by clicking the link below:</p><p><a href="${url}">${url}</a></p><p>This link expires in 1 hour. If you didn't request this, you can ignore this email.</p>`,
          });
        }
      }
    } catch (err) {
      console.error("forgot-password failed:", err instanceof Error ? err.message : err);
    }
  }

  return NextResponse.json({ ok: true });
}
