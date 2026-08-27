"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useMediaRecorder } from "@/hooks/useMediaRecorder";
import { formatDuration } from "@/lib/audio";
import { FollowUpChat } from "@/components/FollowUpChat";
import { StressMeter } from "@/components/StressMeter";

interface FeedbackState {
  text: string;
  mocked: boolean;
}

/**
 * Pronunciation practice: type a word or short phrase, hear it spoken by
 * the browser's built-in text-to-speech, record yourself saying it, then
 * send the recording to Gemini for qualitative feedback on how close it is
 * to a native pronunciation.
 */
export function PronunciationTrainer() {
  const [word, setWord] = useState("");
  const { isRecording, recordedBlob, start, stop, reset, error: recordError } =
    useMediaRecorder(false);

  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const [isFetchingFeedback, setIsFetchingFeedback] = useState(false);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);
  // Bumped on every new recording so <StressMeter> remounts fresh instead of
  // reusing state from a previous attempt.
  const [attempt, setAttempt] = useState(0);

  const audioUrl = useMemo(
    () => (recordedBlob ? URL.createObjectURL(recordedBlob) : null),
    [recordedBlob],
  );
  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  useEffect(() => {
    if (!isRecording) return;
    intervalRef.current = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRecording]);

  function handleListen() {
    if (!word.trim() || typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word.trim());
    utterance.lang = "en-US";
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }

  function handleStart() {
    setElapsedSeconds(0);
    setFeedback(null);
    setFeedbackError(null);
    setAttempt((a) => a + 1);
    start();
  }

  function handleTryAgain() {
    reset();
    setElapsedSeconds(0);
    setFeedback(null);
    setFeedbackError(null);
  }

  async function handleGetFeedback() {
    if (!recordedBlob || !word.trim()) return;
    setIsFetchingFeedback(true);
    setFeedbackError(null);
    try {
      const formData = new FormData();
      formData.append("audio", recordedBlob, "pronunciation.webm");
      formData.append("word", word.trim());

      const res = await fetch("/api/pronunciation-feedback", { method: "POST", body: formData });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || `Feedback request failed (${res.status}).`);
      }

      const data: { feedback: string; mocked: boolean } = await res.json();
      setFeedback({ text: data.feedback, mocked: data.mocked });
    } catch (err) {
      setFeedbackError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsFetchingFeedback(false);
    }
  }

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div>
        <label htmlFor="pronunciation-word" className="text-sm font-semibold text-slate-900">
          Word or phrase to practice
        </label>
        <div className="mt-2 flex gap-2">
          <input
            id="pronunciation-word"
            value={word}
            onChange={(e) => {
              setWord(e.target.value);
              handleTryAgain();
            }}
            placeholder="e.g. 'entrepreneur' or 'particularly'"
            className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none"
          />
          <button
            onClick={handleListen}
            disabled={!word.trim()}
            className="whitespace-nowrap rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700 disabled:opacity-40"
          >
            🔊 Listen
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 border-t border-slate-100 pt-6">
        <div className="font-mono text-2xl font-bold tabular-nums text-slate-800">
          {formatDuration(elapsedSeconds)}
        </div>

        {!isRecording ? (
          <button
            onClick={handleStart}
            disabled={!word.trim() || !!recordedBlob}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
            aria-label="Start Recording"
          >
            <span className="h-5 w-5 rounded-full bg-white" />
          </button>
        ) : (
          <button
            onClick={stop}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-800 text-white shadow-lg transition-transform hover:scale-105"
            aria-label="Stop Recording"
          >
            <span className="h-5 w-5 rounded-md bg-white" />
          </button>
        )}

        <p className="text-sm font-semibold text-slate-500">
          {!word.trim()
            ? "Type a word above to get started"
            : isRecording
              ? "Recording…"
              : recordedBlob
                ? "Recording complete"
                : "Press to record yourself saying it"}
        </p>

        {recordError && <p className="text-sm text-red-600">{recordError}</p>}

        {audioUrl && !isRecording && (
          <div className="flex w-full flex-col items-center gap-4">
            <audio src={audioUrl} controls className="w-full max-w-sm" />

            {recordedBlob && <StressMeter key={attempt} word={word.trim()} audioBlob={recordedBlob} />}

            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={handleGetFeedback}
                disabled={isFetchingFeedback}
                className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-500 disabled:opacity-50"
              >
                {isFetchingFeedback ? "Listening…" : "Get AI Feedback"}
              </button>
              <button
                onClick={handleTryAgain}
                disabled={isFetchingFeedback}
                className="rounded-lg bg-slate-200 px-6 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-300 disabled:opacity-50"
              >
                Try Again
              </button>
            </div>
            {feedbackError && <p className="text-sm text-red-600">{feedbackError}</p>}
          </div>
        )}
      </div>

      {feedback && (
        <div className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-slate-50 p-4">
          {feedback.mocked && (
            <p className="rounded-md bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
              Mock mode — set GEMINI_API_KEY for real pronunciation feedback.
            </p>
          )}
          <p className="text-sm leading-relaxed text-slate-700">{feedback.text}</p>

          <FollowUpChat
            context={`I practiced saying the word/phrase "${word.trim()}" out loud and asked for pronunciation feedback.`}
            initialAnswer={feedback.text}
          />
        </div>
      )}
    </div>
  );
}
