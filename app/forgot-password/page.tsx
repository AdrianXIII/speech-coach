"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import type { LanguageCode } from "@/lib/languages";

// English only, like the rest of the sign-in flow (see app/sign-in/page.tsx).
const english = (text: string): Record<LanguageCode, string> => ({ en: text, de: text, fr: text, es: text, sv: text });

const TITLE = english("Reset your password");

const SUBTITLE = english("Enter your account email and we'll send you a link to set a new password.");

const T: { emailPlaceholder: string; send: string; sending: string; sent: string; backToSignIn: string } = {
  emailPlaceholder: "you@example.com",
  send: "Send reset link",
  sending: "Sending…",
  sent: "If an account exists for that email, a reset link is on its way.",
  backToSignIn: "Back to sign in",
};

export default function ForgotPasswordPage() {
  const t = T;
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim() }),
    }).catch(() => null);
    setState("sent");
  }

  return (
    <div className="min-h-screen bg-paper px-4 py-12 sm:px-8">
      <div className="mx-auto flex max-w-md flex-col gap-8">
        <PageHeader title={TITLE} subtitle={SUBTITLE} />

        <div className="flex flex-col gap-4 rounded-2xl border border-hairline bg-surface p-6 shadow-sm">
          {state === "sent" ? (
            <p className="rounded-lg bg-surface-2 px-4 py-3 text-center text-sm text-ink">{t.sent}</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                aria-label={t.emailPlaceholder}
                className="rounded-lg border border-hairline bg-surface px-4 py-3 text-sm text-ink outline-none focus:border-brass"
              />
              <button
                type="submit"
                disabled={state === "sending"}
                className="rounded-lg bg-navy px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {state === "sending" ? t.sending : t.send}
              </button>
            </form>
          )}

          <Link href="/sign-in" className="text-center text-xs font-semibold text-ink-muted hover:underline">
            {t.backToSignIn}
          </Link>
        </div>
      </div>
    </div>
  );
}
