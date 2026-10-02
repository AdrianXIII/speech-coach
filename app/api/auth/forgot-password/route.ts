import { NextRequest, NextResponse } from "next/server";
import { getDb, hasDatabase } from "@/lib/db";
import { createResetToken } from "@/lib/passwordReset";
import { sendEmail } from "@/lib/email";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

// IP-keyed, not email-keyed — this route must stay usable for someone
// retrying a typo'd email, but a script sweeping through addresses to spam
// strangers' inboxes with reset links (or to burn through Resend's sending
// quota) should hit a wall well before 5 requests/15 min from one source.
const MAX_PER_WINDOW = 5;
const WINDOW_MS = 15 * 60 * 1000;

/**
 * POST /api/auth/forgot-password — body { email }.
 * Always responds { ok: true } regardless of whether that email has an
 * account, so this endpoint can't be used to enumerate registered emails.
 */
export async function POST(req: NextRequest) {
  const allowed = await checkRateLimit(`forgot-password:${getClientIp(req)}`, { windowMs: WINDOW_MS, max: MAX_PER_WINDOW });
  if (!allowed) {
    // Still { ok: true }, not 429 — a 429 here would itself leak timing
    // info distinguishing "rate limited" from "no such account" if an
    // attacker correlates response codes across many addresses; silently
    // no-op-ing the send keeps this route's only observable behavior
    // "always ok" regardless of reason.
    return NextResponse.json({ ok: true });
  }

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
