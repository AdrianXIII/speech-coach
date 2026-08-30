"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useMediaRecorder } from "@/hooks/useMediaRecorder";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { passagesForLanguage, randomPassage, type ComprehensionPassage } from "@/lib/comprehensionContent";
import { analyzeRichness, type RichnessScore } from "@/lib/languageRichness";
import { LANGUAGES, getLanguage, type LanguageCode } from "@/lib/languages";

const LANGUAGE_STORAGE_KEY = "comprehensionLanguage";

type Phase = "setup" | "listening" | "ready" | "responding" | "results";

/**
 * Listening comprehension + spoken-summary drill for professionals working
 * on sounding polished in a second language: hear a short business-register
 * passage (browser TTS, text never shown), then summarize it out loud in
 * your own words. The recording is scored on how much of the content you
 * captured, how advanced/diverse your vocabulary was, whether you used
 * professional connectives, and how quickly you responded — all computed
 * locally from the transcript (Web Speech API, free) against the passage's
 * own key points and vocabulary, no AI call.
 */
export function ComprehensionTrainer() {
  const [language, setLanguage] = useState<LanguageCode>("en");
  const [passage, setPassage] = useState<ComprehensionPassage | null>(null);

  // Client-only: localStorage + the initial random pick both need to wait
  // for the client (see ContrastiveStressTrainer for why), so they're
  // combined into one effect run once on mount.
  useEffect(() => {
    let initialLanguage: LanguageCode = "en";
    try {
      const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (LANGUAGES.some((l) => l.code === saved)) initialLanguage = saved as LanguageCode;
    } catch {
      // Private browsing / storage disabled — fall back to English.
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLanguage(initialLanguage);
    setPassage(randomPassage(initialLanguage));
  }, []);

  const [phase, setPhase] = useState<Phase>("setup");
  const [score, setScore] = useState<RichnessScore | null>(null);
  const [isFinalizing, setIsFinalizing] = useState(false);

  const { recordedBlob, start: startRecorder, stop: stopRecorder, reset: resetRecorder } =
    useMediaRecorder(false);
  const recognition = useSpeechRecognition(getLanguage(language).speechLang);

  const audioEndTimeRef = useRef(0);
  const latencySecondsRef = useRef(0);
  const listenSafetyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (listenSafetyTimeoutRef.current) clearTimeout(listenSafetyTimeoutRef.current);
      window.speechSynthesis.cancel();
    };
  }, []);

  const audioUrl = useMemo(
    () => (recordedBlob ? URL.createObjectURL(recordedBlob) : null),
    [recordedBlob],
  );
  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  // Once we've requested a stop, wait for the recognizer to actually settle
  // (isListening -> false) before scoring — the final transcript chunk can
  // arrive slightly after stop() is called.
  useEffect(() => {
    if (isFinalizing && !recognition.isListening && passage) {
      const result = analyzeRichness(
        recognition.transcript,
        passage,
        latencySecondsRef.current,
        language,
      );
      setScore(result);
      setPhase("results");
      setIsFinalizing(false);
    }
  }, [isFinalizing, recognition.isListening, recognition.transcript, passage, language]);

  function handleLanguageChange(newLanguage: LanguageCode) {
    setLanguage(newLanguage);
    setPassage(randomPassage(newLanguage));
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguage);
    } catch {
      // Ignore — the choice just won't persist across visits.
    }
  }

  function handlePickPassage(p: ComprehensionPassage) {
    setPassage(p);
  }

  function handleShufflePassage() {
    setPassage((current) => randomPassage(language, current?.id));
  }

  function handleListen() {
    if (!passage) return;
    window.speechSynthesis.cancel();
    if (listenSafetyTimeoutRef.current) clearTimeout(listenSafetyTimeoutRef.current);

    let settled = false;
    const finishListening = () => {
      if (settled) return;
      settled = true;
      if (listenSafetyTimeoutRef.current) clearTimeout(listenSafetyTimeoutRef.current);
      audioEndTimeRef.current = performance.now();
      setPhase("ready");
    };

    const utterance = new SpeechSynthesisUtterance(passage.text);
    utterance.lang = getLanguage(language).speechLang;
    utterance.rate = 0.95;
    utterance.onend = finishListening;
    // A missing/failed voice (some browsers/OSes ship with none) must not
    // leave the exercise stuck on "Listening…" forever with no way out.
    utterance.onerror = finishListening;

    setPhase("listening");
    window.speechSynthesis.speak(utterance);

    const estimatedMs = (passage.text.split(/\s+/).length / 130) * 60_000;
    listenSafetyTimeoutRef.current = setTimeout(finishListening, estimatedMs + 6000);
  }

  function handleSkipListening() {
    window.speechSynthesis.cancel();
    if (listenSafetyTimeoutRef.current) clearTimeout(listenSafetyTimeoutRef.current);
    audioEndTimeRef.current = performance.now();
    setPhase("ready");
  }

  function handleStartResponse() {
    latencySecondsRef.current = Math.max(0, (performance.now() - audioEndTimeRef.current) / 1000);
    resetRecorder();
    recognition.reset();
    startRecorder();
    recognition.start();
    setPhase("responding");
  }

  function handleStopResponse() {
    stopRecorder();
    recognition.stop();
    setIsFinalizing(true);
  }

  function handleRetry() {
    resetRecorder();
    recognition.reset();
    setScore(null);
    setPhase("setup");
  }

  function handleNewPassage() {
    resetRecorder();
    recognition.reset();
    setScore(null);
    setPhase("setup");
    setPassage((current) => randomPassage(language, current?.id));
  }

  if (!passage) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm text-slate-400">Loading…</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      {!recognition.isSupported && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Your browser doesn&rsquo;t support speech recognition (Web Speech API) — try Chrome or
          Edge to use this exercise.
        </div>
      )}

      {phase === "setup" && (
        <SetupPanel
          language={language}
          onLanguageChange={handleLanguageChange}
          passage={passage}
          onPick={handlePickPassage}
          onShuffle={handleShufflePassage}
          onListen={handleListen}
          disabled={!recognition.isSupported}
        />
      )}

      {phase === "listening" && (
        <div className="flex flex-col items-center gap-3 py-10">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-2xl">
            🔊
          </span>
          <p className="text-sm font-semibold text-indigo-600">Listening…</p>
          <p className="text-xs text-slate-400">({passage.topic})</p>
          <button
            onClick={handleSkipListening}
            className="text-xs font-semibold text-slate-400 underline underline-offset-2 hover:text-slate-600"
          >
            Skip ahead
          </button>
        </div>
      )}

      {phase === "ready" && (
        <div className="flex flex-col items-center gap-4 py-6">
          <p className="text-center text-base font-medium text-slate-800">
            Now summarize what you just heard, in your own words — out loud.
          </p>
          <button
            onClick={handleListen}
            className="text-xs font-semibold text-indigo-600 underline underline-offset-2"
          >
            🔁 Listen again
          </button>
          <button
            onClick={handleStartResponse}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform hover:scale-105"
            aria-label="Start Recording"
          >
            <span className="h-6 w-6 rounded-full bg-white" />
          </button>
        </div>
      )}

      {phase === "responding" && (
        <div className="flex flex-col items-center gap-4 py-6">
          <span className="flex items-center gap-2 text-sm font-semibold text-red-600">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500" />
            Recording…
          </span>
          <p className="min-h-[3rem] max-w-md text-center text-sm text-slate-500">
            {recognition.transcript || "…"}
          </p>
          <button
            onClick={handleStopResponse}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-800 text-white shadow-lg transition-transform hover:scale-105"
            aria-label="Stop Recording"
          >
            <span className="h-6 w-6 rounded-md bg-white" />
          </button>
        </div>
      )}

      {phase === "results" && score && (
        <ResultsPanel
          score={score}
          passage={passage}
          audioUrl={audioUrl}
          onRetry={handleRetry}
          onNewPassage={handleNewPassage}
        />
      )}
    </div>
  );
}

/* ─────────────────────────── Setup ─────────────────────────── */

function SetupPanel({
  language,
  onLanguageChange,
  passage,
  onPick,
  onShuffle,
  onListen,
  disabled,
}: {
  language: LanguageCode;
  onLanguageChange: (l: LanguageCode) => void;
  passage: ComprehensionPassage;
  onPick: (p: ComprehensionPassage) => void;
  onShuffle: () => void;
  onListen: () => void;
  disabled: boolean;
}) {
  const passages = passagesForLanguage(language);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Language</p>
        <div className="flex flex-wrap gap-1.5">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => onLanguageChange(l.code)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                language === l.code
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {l.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Topic</p>
        <button
          onClick={onShuffle}
          className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200"
        >
          🎲 Shuffle
        </button>
      </div>

      <div className="grid gap-2 sm:grid-cols-3">
        {passages.map((p) => (
          <button
            key={p.id}
            onClick={() => onPick(p)}
            className={`rounded-lg border p-3 text-left transition-colors ${
              passage.id === p.id
                ? "border-indigo-400 bg-indigo-50"
                : "border-slate-200 bg-white hover:bg-slate-50"
            }`}
          >
            <p className="text-[11px] font-semibold uppercase tracking-wide text-indigo-500">
              {p.topic}
            </p>
            <p className="mt-0.5 text-sm font-bold text-slate-900">{p.title}</p>
          </button>
        ))}
      </div>

      <p className="text-center text-sm text-slate-500">
        You&rsquo;ll hear a short passage — the text stays hidden. Afterward, summarize it out
        loud in your own words.
      </p>

      <button
        onClick={onListen}
        disabled={disabled}
        className="self-center rounded-lg bg-indigo-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
      >
        🔊 Listen
      </button>
    </div>
  );
}

/* ─────────────────────────── Results ─────────────────────────── */

function ResultsPanel({
  score,
  passage,
  audioUrl,
  onRetry,
  onNewPassage,
}: {
  score: RichnessScore;
  passage: ComprehensionPassage;
  audioUrl: string | null;
  onRetry: () => void;
  onNewPassage: () => void;
}) {
  const [showOriginal, setShowOriginal] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Overall Score
        </p>
        <p
          className={`text-4xl font-extrabold ${
            score.overallScore >= 75
              ? "text-emerald-600"
              : score.overallScore >= 50
                ? "text-amber-600"
                : "text-red-600"
          }`}
        >
          {score.overallScore}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Content covered" value={`${score.coveredKeyPoints.length}/${score.coveredKeyPoints.length + score.missedKeyPoints.length}`} />
        <Stat label="Vocabulary diversity" value={`${Math.round(score.ttr * 100)}%`} />
        <Stat label="Advanced words" value={`${Math.round(score.advancedVocabRatio * 100)}%`} />
        <Stat label="Response time" value={`${score.responseLatencySeconds.toFixed(1)}s`} />
      </div>

      <div className="flex flex-col gap-2">
        {score.feedback.map((note, i) => (
          <p key={i} className="rounded-lg bg-indigo-50 px-3 py-2 text-sm text-indigo-800">
            {note}
          </p>
        ))}
      </div>

      {score.missedKeyPoints.length > 0 && (
        <div className="rounded-lg border border-slate-200 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Key points you missed
          </p>
          <ul className="mt-2 flex flex-col gap-1">
            {score.missedKeyPoints.map((kp) => (
              <li key={kp} className="text-sm text-slate-600">
                • {kp}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="rounded-lg border border-slate-200 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          What we heard
        </p>
        <p className="mt-2 text-sm italic text-slate-600">
          {score.transcript ? `“${score.transcript}”` : "(no speech detected)"}
        </p>
        {audioUrl && <audio src={audioUrl} controls className="mt-3 w-full max-w-sm" />}
      </div>

      <div>
        <button
          onClick={() => setShowOriginal((v) => !v)}
          className="text-xs font-semibold text-indigo-600 underline underline-offset-2"
        >
          {showOriginal ? "Hide" : "Show"} original passage
        </button>
        {showOriginal && (
          <p className="mt-2 rounded-lg bg-slate-50 p-3 text-sm leading-relaxed text-slate-600">
            {passage.text}
          </p>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={onRetry}
          className="rounded-lg bg-slate-200 px-6 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-300"
        >
          Try again
        </button>
        <button
          onClick={onNewPassage}
          className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
        >
          🎲 New passage
        </button>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 text-center">
      <p className="text-lg font-bold text-slate-900">{value}</p>
      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{label}</p>
    </div>
  );
}
