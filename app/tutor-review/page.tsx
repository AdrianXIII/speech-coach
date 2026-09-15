"use client";

import { useEffect, useState } from "react";

interface ContentRow { contentKey: string; profession: string; category: string; teaching: { concepts: { title: string }[] } | null; cases: unknown[] }
interface AgentReview { agentName: string; model?: string; verdict: string; scores: Record<string, number>; contradictions: string[]; missingTopics: string[]; sources: unknown[]; suggestions: string[] }
interface SavedReview { id: number; content_key: string; version: number; status: string; agents: AgentReview[] }

export default function TutorReviewPage() {
  const [content, setContent] = useState<ContentRow[]>([]);
  const [selected, setSelected] = useState("");
  const [reviews, setReviews] = useState<SavedReview[]>([]);
  const [databaseConfigured, setDatabaseConfigured] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [agentJson, setAgentJson] = useState("");
  const [editJson, setEditJson] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [runningAll, setRunningAll] = useState(false);
  const [batchProgress, setBatchProgress] = useState({ done: 0, total: 0, failed: 0 });

  useEffect(() => {
    fetch("/api/tutor/content-review").then((res) => res.json()).then((data) => {
      setContent(data.content ?? []);
      setDatabaseConfigured(data.databaseConfigured);
    }).catch(() => setError("Could not load tutor content."));
  }, []);

  useEffect(() => {
    if (!selected) return;
    fetch(`/api/tutor/content-review?contentKey=${encodeURIComponent(selected)}`).then((res) => res.json())
      .then((data) => setReviews(data.reviews ?? [])).catch(() => setError("Could not load review history."));
  }, [selected]);

  const selectedContent = content.find((row) => row.contentKey === selected);
  async function submitAgentReview() {
    const review = reviews[0];
    try {
      const assessment = JSON.parse(agentJson);
      const response = await fetch("/api/tutor/content-review", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...assessment, contentKey: selected, ...(review ? { reviewId: review.id } : {}) }) });
      if (!response.ok) throw new Error((await response.json()).error ?? "Could not save review.");
      setMessage("Agent review saved.");
      setAgentJson("");
      const refreshed = await fetch(`/api/tutor/content-review?contentKey=${encodeURIComponent(selected)}`).then((res) => res.json());
      setReviews(refreshed.reviews ?? []);
    } catch (err) { setError(err instanceof Error ? err.message : "Invalid review JSON."); }
  }
  async function saveHumanEdit() {
    const review = reviews[0];
    if (!review) return setError("Save an agent review first.");
    try {
      const editedContent = JSON.parse(editJson);
      const response = await fetch("/api/tutor/content-review/edit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ reviewId: review.id, editorName: "Human reviewer", editedContent, status: "needs_expert", note: "Human review edit" }) });
      if (!response.ok) throw new Error((await response.json()).error ?? "Could not save edit.");
      setMessage("Human edit saved as a review copy. Active app content was unchanged.");
      setEditJson("");
    } catch (err) { setError(err instanceof Error ? err.message : "Invalid content JSON."); }
  }
  async function approveReview() {
    const review = reviews[0];
    if (!review) return setError("No review selected.");
    const response = await fetch("/api/tutor/content-review/approve", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ reviewId: review.id, approvedBy: "Owner" }) });
    if (!response.ok) return setError((await response.json()).error ?? "Could not approve review.");
    setMessage("Approved. Download the implementation candidates and send them for implementation.");
  }
  async function runAllReviews() {
    if (runningAll || !content.length) return;
    setRunningAll(true);
    setError(null);
    setMessage(null);
    setBatchProgress({ done: 0, total: content.length, failed: 0 });
    let failed = 0;
    for (const row of content) {
      try {
        const response = await fetch("/api/tutor/content-review/run", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contentKey: row.contentKey }),
        });
        if (response.status === 429) {
          setMessage("Daily review limit reached. Run this again tomorrow; completed categories are saved.");
          break;
        }
        if (!response.ok) failed += 1;
      } catch {
        failed += 1;
      }
      setBatchProgress((current) => ({ done: current.done + 1, total: current.total, failed }));
    }
    setRunningAll(false);
    setMessage(failed ? `Finished with ${failed} failed categories. You can run them again.` : "Finished reviewing all categories.");
  }
  return (
    <main className="min-h-screen bg-paper px-4 py-12 sm:px-8">
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        <header>
          <h1 className="font-display text-2xl font-semibold text-ink">AI Tutor content review</h1>
          <p className="mt-2 text-sm text-ink-muted">Review copies only. Active app content is never changed automatically.</p>
        </header>
        {!databaseConfigured && <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">Database not connected. Export works; saving reviews requires DATABASE_URL.</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div className="flex flex-wrap gap-3">
          <a className="rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-white" href="/api/tutor/content-review/export">Download review export</a>
          <a className="rounded-lg border border-hairline bg-surface px-4 py-2 text-sm font-semibold text-ink" href="/api/tutor/content-review/approved-export">Download approved changes</a>
          <button className="rounded-lg bg-brass px-4 py-2 text-sm font-semibold text-ink disabled:opacity-50" disabled={runningAll || !databaseConfigured} onClick={runAllReviews}>
            {runningAll ? `Reviewing ${batchProgress.done}/${batchProgress.total}` : "Run all AI reviews"}
          </button>
          <select className="rounded-lg border border-hairline bg-surface px-3 py-2 text-sm" value={selected} onChange={(event) => setSelected(event.target.value)}>
            <option value="">Select domain and category</option>
            {content.map((row) => <option key={row.contentKey} value={row.contentKey}>{row.profession} / {row.category}</option>)}
          </select>
        </div>
        {runningAll && <p className="text-sm text-ink-muted">This runs one category at a time to avoid rate limits. You can leave this page open while it works.</p>}
        {selectedContent && <section className="rounded-lg border border-hairline bg-surface p-5">
          <h2 className="font-display text-lg font-semibold text-ink">{selectedContent.profession} / {selectedContent.category}</h2>
          <p className="mt-2 text-sm text-ink-muted">{selectedContent.teaching?.concepts.length ?? 0} teaching concepts, {selectedContent.cases.length} cases.</p>
          <p className="mt-3 text-sm text-ink-muted">Export this content to several AI agents. Submit each agent&apos;s JSON assessment to the review API using the same <code>reviewId</code> after the first submission.</p>
          {message && <p className="mt-4 text-sm text-green-700">{message}</p>}
          {reviews.length === 0 ? <p className="mt-4 text-sm text-ink-muted">No saved reviews for this category.</p> : reviews.map((review) => <div className="mt-4 border-t border-hairline pt-4" key={review.id}><p className="text-sm font-semibold text-ink">Version {review.version} · {review.status}</p><p className="mt-1 text-xs text-ink-muted">{review.agents.length} agent assessments saved. Contradictions require expert review.</p></div>)}
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="text-sm text-ink">Paste one agent&apos;s JSON assessment
              <textarea className="mt-2 min-h-40 w-full rounded-lg border border-hairline bg-paper p-3 font-mono text-xs" value={agentJson} onChange={(event) => setAgentJson(event.target.value)} placeholder='{"agentName":"...","verdict":"agree",...}' />
              <button className="mt-2 rounded-lg bg-navy px-3 py-2 text-xs font-semibold text-white" onClick={submitAgentReview}>Save agent review</button>
            </label>
            <label className="text-sm text-ink">Paste edited review copy JSON
              <textarea className="mt-2 min-h-40 w-full rounded-lg border border-hairline bg-paper p-3 font-mono text-xs" value={editJson} onChange={(event) => setEditJson(event.target.value)} placeholder="Paste the revised content object here" />
              <button className="mt-2 rounded-lg bg-navy px-3 py-2 text-xs font-semibold text-white" onClick={saveHumanEdit}>Save human edit</button>
            </label>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="rounded-lg bg-brass px-3 py-2 text-xs font-semibold text-ink" onClick={approveReview}>Approve latest expert edit</button>
              <button className="rounded-lg border border-hairline px-3 py-2 text-xs font-semibold text-ink" onClick={async () => { const response = await fetch(`/api/tutor/content-review/run`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contentKey: selected }) }); if (!response.ok) setError((await response.json()).error ?? "AI review failed."); else setMessage("AI review completed and saved."); }}>Run AI review</button>
          </div>
        </section>}
      </div>
    </main>
  );
}