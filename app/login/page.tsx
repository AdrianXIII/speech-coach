"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function LoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/";
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });
    setStatus(error ? "error" : "sent");
  }

  if (status === "sent") {
    return (
      <p className="text-center text-sm text-ink-muted">
        Check <span className="text-ink">{email}</span> for a sign-in link.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="rounded-lg border border-hairline bg-surface px-4 py-2.5 text-sm text-ink outline-none focus:border-brass"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-lg bg-navy px-4 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-navy-800 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send sign-in link"}
      </button>
      {status === "error" && (
        <p className="text-center text-sm text-bad">Something went wrong. Try again.</p>
      )}
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-paper px-4 py-12 sm:px-8">
      <div className="mx-auto flex max-w-sm flex-col gap-8">
        <header className="text-center">
          <h1 className="font-display text-2xl font-semibold text-ink">Sign in</h1>
          <div className="mx-auto mt-3 h-px w-10 bg-brass" />
          <p className="mt-3 text-sm text-ink-muted">
            No password — we&apos;ll email you a link.
          </p>
        </header>

        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
