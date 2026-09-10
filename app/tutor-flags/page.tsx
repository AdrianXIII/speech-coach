"use client";

import { useEffect, useState } from "react";

interface Flag {
  id: number;
  profession: string;
  category: string;
  conceptId: string | null;
  conceptTitle: string | null;
  reason: string;
  note: string;
  createdAt: string;
}

/**
 * Review view for AI Tutor content flags (app/api/tutor/flags). Not in the
 * main nav — this is a review tool for you, not a user-facing feature, same
 * "no auth" posture as the rest of this single-user app.
 */
export default function TutorFlagsPage() {
  const [flags, setFlags] = useState<Flag[]>([]);
  const [databaseConfigured, setDatabaseConfigured] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/tutor/flags")
      .then((res) => res.json())
      .then((data: { flags: Flag[]; databaseConfigured: boolean }) => {
        setFlags(data.flags);
        setDatabaseConfigured(data.databaseConfigured);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Something went wrong."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-paper px-4 py-12 sm:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <header>
          <h1 className="font-display text-2xl font-semibold text-ink">AI Tutor content flags</h1>
          <div className="mt-3 h-px w-10 bg-brass" />
        </header>

        {loading && <p className="text-sm text-ink-muted">Loading…</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}

        {!loading && !databaseConfigured && (
          <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            No database is connected yet — flags are only in the Vercel function log and reporters&rsquo;
            local browsers until DATABASE_URL is set (see .env.example).
          </p>
        )}

        {!loading && databaseConfigured && flags.length === 0 && (
          <p className="text-sm text-ink-muted">No flags yet.</p>
        )}

        <div className="flex flex-col gap-3">
          {flags.map((flag) => (
            <div key={flag.id} className="rounded-lg border border-hairline bg-surface p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wide text-brass-text">
                  {flag.profession} · {flag.category}
                  {flag.conceptTitle && ` · ${flag.conceptTitle}`}
                </p>
                <span className="text-[10px] text-ink-muted">{new Date(flag.createdAt).toLocaleString()}</span>
              </div>
              <p className="mt-1 text-sm font-semibold text-ink">{flag.reason}</p>
              {flag.note && <p className="mt-1 text-sm text-ink-muted">{flag.note}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
