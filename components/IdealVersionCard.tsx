"use client";

import { useState } from "react";

interface IdealVersionCardProps {
  transcript: string;
}

/**
 * Turns what you actually said into a polished "ideal" version, then lets
 * you hear it read aloud (via the browser's built-in text-to-speech) so you
 * can listen and imitate its pacing and phrasing.
 */
export function IdealVersionCard({ transcript }: IdealVersionCardProps) {
  const [idealVersion, setIdealVersion] = useState<string | null>(null);
  const [mocked, setMocked] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  async function handleGenerate() {
    setIsGenerating(true);
    setError(null);
    try {
      const res = await fetch("/api/generate-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: transcript }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status}).`);
      const data: { script: string; mocked: boolean } = await res.json();
      setIdealVersion(data.script);
      setMocked(data.mocked);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsGenerating(false);
    }
  }

  function handleListen() {
    if (!idealVersion || typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(idealVersion);
    utterance.lang = "en-US";
    utterance.rate = 0.95;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }

  function handleStop() {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  }

  return (
    <div className="rounded-2xl border border-hairline bg-surface p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-ink">Hear an Ideal Version</h3>
          <p className="mt-0.5 text-xs text-ink-muted">
            A polished rewrite of what you said — listen to it and try to match its pacing and
            phrasing next time.
          </p>
        </div>
        {!idealVersion && (
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="whitespace-nowrap rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy-800 disabled:opacity-50"
          >
            {isGenerating ? "Writing…" : "Generate ideal version"}
          </button>
        )}
      </div>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      {idealVersion && (
        <div className="mt-4 flex flex-col gap-3 rounded-lg border border-hairline bg-surface-2 p-4">
          {mocked && (
            <p className="rounded-md bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
              Mock mode — set GEMINI_API_KEY for a real AI-polished version.
            </p>
          )}
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink">
            {idealVersion}
          </p>
          <button
            onClick={isSpeaking ? handleStop : handleListen}
            className="self-start rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
          >
            {isSpeaking ? "⏹ Stop" : "🔊 Listen"}
          </button>
        </div>
      )}
    </div>
  );
}
