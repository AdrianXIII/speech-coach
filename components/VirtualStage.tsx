"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useMediaRecorder } from "@/hooks/useMediaRecorder";
import { formatDuration } from "@/lib/audio";
import { AudienceGrid } from "@/components/stage/AudienceGrid";
import { Teleprompter } from "@/components/stage/Teleprompter";
import { ScriptAssistant } from "@/components/ScriptAssistant";
import { DashboardResults } from "@/components/DashboardResults";
import type { AnalyzeSpeechResponse } from "@/types/speechAnalysis";

/**
 * Practice view: a webcam recorder with a live "audience" that reacts
 * while you speak, and a teleprompter overlay for your notes. Recording
 * captures video + audio simultaneously via useMediaRecorder(true).
 */
export function VirtualStage() {
  const { isRecording, recordedBlob, stream, start, stop, reset, error } =
    useMediaRecorder(true);

  const [notes, setNotes] = useState("");
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const livePreviewRef = useRef<HTMLVideoElement>(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzeError, setAnalyzeError] = useState<string | null>(null);
  const [results, setResults] = useState<AnalyzeSpeechResponse | null>(null);

  // Bind the live camera stream to the preview <video> element.
  useEffect(() => {
    if (livePreviewRef.current) {
      livePreviewRef.current.srcObject = stream;
    }
  }, [stream]);

  // Timer, same pattern as SpeechRecorder: reset happens in the click
  // handler, not the effect, to avoid setState-in-effect.
  useEffect(() => {
    if (!isRecording) return;
    intervalRef.current = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRecording]);

  const playbackUrl = useMemo(
    () => (recordedBlob ? URL.createObjectURL(recordedBlob) : null),
    [recordedBlob],
  );
  useEffect(() => {
    return () => {
      if (playbackUrl) URL.revokeObjectURL(playbackUrl);
    };
  }, [playbackUrl]);

  function handleStart() {
    setElapsedSeconds(0);
    start();
  }

  function handlePracticeAgain() {
    reset();
    setElapsedSeconds(0);
    setAnalyzeError(null);
    setResults(null);
  }

  async function handleAnalyze() {
    if (!recordedBlob) return;
    setIsAnalyzing(true);
    setAnalyzeError(null);
    try {
      const formData = new FormData();
      formData.append("audio", recordedBlob, "practice.webm");
      formData.append("durationSeconds", String(elapsedSeconds));

      const res = await fetch("/api/analyze-speech", { method: "POST", body: formData });
      if (!res.ok) throw new Error(`Analysis request failed (${res.status}).`);

      const result: AnalyzeSpeechResponse = await res.json();
      setResults(result);
    } catch (err) {
      setAnalyzeError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsAnalyzing(false);
    }
  }

  const showLiveStage = isRecording;
  const showReview = !!recordedBlob && !isRecording;

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Virtual Stage</h1>
        <p className="mt-1 text-sm text-slate-500">
          Practice in front of a live audience, with your notes scrolling as you speak.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        {/* Stage: webcam preview / recorded playback + teleprompter overlay */}
        <div className="flex flex-col gap-4">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-sm">
            {showLiveStage ? (
              <video
                ref={livePreviewRef}
                autoPlay
                muted
                playsInline
                className="aspect-video w-full object-cover"
              />
            ) : showReview ? (
              <video src={playbackUrl ?? undefined} controls className="aspect-video w-full" />
            ) : (
              <div className="flex aspect-video w-full items-center justify-center text-sm text-slate-500">
                Your camera preview will appear here once you start
              </div>
            )}

            {/* Teleprompter overlay — only while actively recording */}
            {showLiveStage && (
              <div className="absolute inset-x-4 bottom-4">
                <Teleprompter text={notes} onTextChange={setNotes} isScrolling />
              </div>
            )}

            {showLiveStage && (
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur-sm">
                <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                {formatDuration(elapsedSeconds)}
              </div>
            )}
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex justify-center gap-3">
            {!isRecording && !recordedBlob && (
              <button
                onClick={handleStart}
                className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
              >
                Start Practice
              </button>
            )}
            {isRecording && (
              <button
                onClick={stop}
                className="rounded-lg bg-slate-800 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
              >
                Stop
              </button>
            )}
            {showReview && (
              <>
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-500 disabled:opacity-50"
                >
                  {isAnalyzing ? "Analyzing…" : "Analyze Speech"}
                </button>
                <button
                  onClick={handlePracticeAgain}
                  disabled={isAnalyzing}
                  className="rounded-lg bg-slate-200 px-6 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-300 disabled:opacity-50"
                >
                  Practice Again
                </button>
              </>
            )}
          </div>

          {analyzeError && <p className="text-center text-sm text-red-600">{analyzeError}</p>}
        </div>

        {/* Audience */}
        <AudienceGrid engaged={isRecording} />
      </div>

      {/* Notes editor + AI script help — shown whenever we're not actively recording. */}
      {!isRecording && (
        <div className="flex flex-col gap-4">
          <Teleprompter text={notes} onTextChange={setNotes} isScrolling={false} />
          <ScriptAssistant onScriptReady={setNotes} />
        </div>
      )}

      {results && <DashboardResults data={results} />}
    </div>
  );
}
