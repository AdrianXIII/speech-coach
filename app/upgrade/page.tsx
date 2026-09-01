"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

const BENEFITS = [
  "Every current and future premium case study — business, law, and politics",
  "Intermediate and advanced speed-reading levels (up to 650+ wpm)",
  "Cancel anytime from your account page",
];

export default function UpgradePage() {
  const router = useRouter();
  const { user, isPremium, loading } = useAuth();
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUpgrade() {
    if (!user) {
      router.push("/login?next=/upgrade");
      return;
    }

    setStarting(true);
    setError(null);
    try {
      const res = await fetch("/api/stripe/checkout", { method: "POST" });
      const body = await res.json();
      if (!res.ok || !body.url) {
        throw new Error(body.error || "Could not start checkout.");
      }
      window.location.href = body.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStarting(false);
    }
  }

  return (
    <div className="min-h-screen bg-paper px-4 py-12 sm:px-8">
      <div className="mx-auto flex max-w-md flex-col gap-8">
        <header className="text-center">
          <h1 className="font-display text-2xl font-semibold text-ink">Speech Coach Premium</h1>
          <div className="mx-auto mt-3 h-px w-10 bg-brass" />
          <p className="mt-3 text-sm text-ink-muted">
            Everything in the free tier, plus the full case-study library and faster reading
            speeds.
          </p>
        </header>

        <div className="rounded-2xl border border-hairline bg-surface p-8 shadow-sm">
          <ul className="flex flex-col gap-3">
            {BENEFITS.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2 text-sm text-ink">
                <span className="mt-0.5 text-brass">✓</span>
                {benefit}
              </li>
            ))}
          </ul>

          {isPremium ? (
            <p className="mt-6 rounded-lg bg-brass/10 px-4 py-3 text-center text-sm font-semibold text-brass-text">
              You&rsquo;re already subscribed — thank you.
            </p>
          ) : (
            <button
              onClick={handleUpgrade}
              disabled={starting || loading}
              className="mt-6 w-full rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-navy-800 disabled:opacity-60"
            >
              {starting ? "Redirecting…" : "Upgrade to Premium"}
            </button>
          )}

          {error && <p className="mt-3 text-center text-sm text-bad">{error}</p>}
        </div>
      </div>
    </div>
  );
}
