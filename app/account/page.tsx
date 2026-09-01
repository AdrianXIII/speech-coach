"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { createClient } from "@/lib/supabase/client";

export default function AccountPage() {
  const router = useRouter();
  const { user, isPremium, loading } = useAuth();
  const [opening, setOpening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleManageSubscription() {
    setOpening(true);
    setError(null);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const body = await res.json();
      if (!res.ok || !body.url) {
        throw new Error(body.error || "Could not open the billing portal.");
      }
      window.location.href = body.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setOpening(false);
    }
  }

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  if (loading) {
    return null;
  }

  if (!user) {
    router.push("/login?next=/account");
    return null;
  }

  return (
    <div className="min-h-screen bg-paper px-4 py-12 sm:px-8">
      <div className="mx-auto flex max-w-sm flex-col gap-8">
        <header className="text-center">
          <h1 className="font-display text-2xl font-semibold text-ink">Your account</h1>
          <div className="mx-auto mt-3 h-px w-10 bg-brass" />
          <p className="mt-3 text-sm text-ink-muted">{user.email}</p>
        </header>

        <div className="rounded-2xl border border-hairline bg-surface p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-ink">Plan</p>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                isPremium ? "bg-brass text-navy" : "bg-surface-2 text-ink-muted"
              }`}
            >
              {isPremium ? "Premium" : "Free"}
            </span>
          </div>

          {isPremium ? (
            <button
              onClick={handleManageSubscription}
              disabled={opening}
              className="mt-6 w-full rounded-lg bg-surface-2 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-hairline disabled:opacity-60"
            >
              {opening ? "Opening…" : "Manage subscription"}
            </button>
          ) : (
            <Link
              href="/upgrade"
              className="mt-6 block w-full rounded-lg bg-navy px-6 py-3 text-center text-sm font-semibold text-cream transition-colors hover:bg-navy-800"
            >
              Upgrade to Premium
            </Link>
          )}

          {error && <p className="mt-3 text-center text-sm text-bad">{error}</p>}

          <button
            onClick={handleSignOut}
            className="mt-4 w-full text-center text-xs font-semibold text-brass-text hover:underline"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
