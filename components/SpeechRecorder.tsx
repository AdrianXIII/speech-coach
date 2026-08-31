"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useMediaRecorder } from "@/hooks/useMediaRecorder";
import { formatDuration } from "@/lib/audio";
import { DashboardResults } from "@/components/DashboardResults";
import type { AnalyzeSpeechResponse } from "@/types/speechAnalysis";

/**
 * Self-contained recording widget: big start/stop button, a live timer,
 * an audio playback preview once stopped, and an "Analyze Speech" button
 * that ships the recorded blob to /api/analyze-speech and renders the
 * resulting DashboardResults.
 */
export function SpeechRecorder() {
  const { isRecording, recordedBlob, start, stop, reset, error } = useMediaRecorder(false);

  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzeError, setAnalyzeError] = useState<string | null>(null);
  const [results, setResults] = useState<AnalyzeSpeechResponse | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Derived, not stored state: the playback URL is just a function of
  // recordedBlob, so it's computed during render instead of synced via an
  // effect (see "You Might Not Need an Effect" in the React docs).
  const audioUrl = useMemo(
    () => (recordedBlob ? URL.createObjectURL(recordedBlob) : null),
    [recordedBlob],
  );

  // The only side effect left for the object URL is releasing it — no
  // setState involved, so it's a clean use of an effect.
  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  // Live timer — ticks once per second while recording. The counter is
  // reset in handleStart (an event handler), not here, so the effect never
  // calls setState synchronously on its own.
  useEffect(() => {
    if (!isRecording) return;
    intervalRef.current = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRecording]);

  function handleStart() {
    setElapsedSeconds(0);
    start();
  }

  async function handleAnalyze() {
    if (!recordedBlob) return;
    setIsAnalyzing(true);
    setAnalyzeError(null);
    try {
      const formData = new FormData();
      formData.append("audio", recordedBlob, "speech.webm");
      formData.append("durationSeconds", String(elapsedSeconds));

      const res = await fetch("/api/analyze-speech", { method: "POST", body: formData });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || `Analysis request failed (${res.status}).`);
      }

      const result: AnalyzeSpeechResponse = await res.json();
      setResults(result);
    } catch (err) {
      setAnalyzeError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsAnalyzing(false);
    }
  }

  function handleRecordAgain() {
    reset();
    setElapsedSeconds(0);
    setAnalyzeError(null);
    setResults(null);
  }

  return (
    <div className="flex flex-col gap-6">
    <div className="flex flex-col items-center gap-6 rounded-2xl border border-hairline bg-surface p-8 shadow-sm">
      {/* Timer */}
      <div className="font-mono text-4xl font-bold tabular-nums text-ink">
        {formatDuration(elapsedSeconds)}
      </div>

      {/* Big start/stop button */}
      {!isRecording ? (
        <button
          onClick={handleStart}
          disabled={!!recordedBlob}
          className="flex h-24 w-24 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
          aria-label="Start Recording"
        >
          <span className="h-7 w-7 rounded-full bg-surface" />
        </button>
      ) : (
        <button
          onClick={stop}
          className="flex h-24 w-24 items-center justify-center rounded-full bg-navy text-white shadow-lg transition-transform hover:scale-105"
          aria-label="Stop Recording"
        >
          <span className="h-7 w-7 rounded-md bg-surface" />
        </button>
      )}

      <p className="text-sm font-semibold text-ink-muted">
        {isRecording
          ? "Recording…"
          : recordedBlob
            ? "Recording complete"
            : "Press to start recording"}
      </p>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {/* Playback preview + analyze, once a recording exists */}
      {audioUrl && !isRecording && (
        <div className="flex w-full flex-col items-center gap-4">
          <audio src={audioUrl} controls className="w-full max-w-sm" />

          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800 disabled:opacity-50"
            >
              {isAnalyzing ? "Analyzing…" : "Analyze Speech"}
            </button>
            <button
              onClick={handleRecordAgain}
              disabled={isAnalyzing}
              className="rounded-lg bg-surface-2 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-hairline disabled:opacity-50"
            >
              Record Again
            </button>
          </div>

          {analyzeError && <p className="text-sm text-red-600">{analyzeError}</p>}
        </div>
      )}
    </div>

      {results && <DashboardResults data={results} />}
    </div>
  );
}
