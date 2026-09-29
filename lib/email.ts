import { Resend } from "resend";

/**
 * Thin Resend wrapper — the only place this app sends transactional email
 * (right now, just password-reset links; see lib/passwordReset.ts and
 * app/api/auth/forgot-password/route.ts). Same "managed service via one env
 * var, no-op until configured" posture as GEMINI_API_KEY elsewhere in this
 * app — constructing `new Resend(...)` with no key throws synchronously, so
 * callers must check hasEmailConfig() first rather than relying on a
 * try/catch here to hide misconfiguration silently.
 */
export function hasEmailConfig(): boolean {
  return !!process.env.RESEND_API_KEY;
}

const FROM_ADDRESS = process.env.AUTH_EMAIL_FROM ?? "MasterSpeak <onboarding@resend.dev>";

export async function sendEmail(opts: { to: string; subject: string; text: string; html: string }): Promise<boolean> {
  if (!hasEmailConfig()) return false;
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({ from: FROM_ADDRESS, to: opts.to, subject: opts.subject, text: opts.text, html: opts.html });
    return true;
  } catch (err) {
    console.error("sendEmail failed:", err instanceof Error ? err.message : err);
    return false;
  }
}
