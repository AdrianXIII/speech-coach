"use client";

import { useEffect, useMemo, useState } from "react";
import { useMediaRecorder } from "@/hooks/useMediaRecorder";
import { measureSyllableStress, type StressMeasurement } from "@/lib/audioStress";
import { randomContrastiveExercise, type ContrastiveExercise } from "@/lib/contrastiveStress";
import { LANGUAGES, type LanguageCode } from "@/lib/languages";

const LANGUAGE_STORAGE_KEY = "contrastiveStressLanguage";

/**
 * Contrastive stress drill: same word-count-based sentence, different word
 * stressed each time — say it so the stress lands on the target word.
 * Reuses measureSyllableStress from the Pronunciation Trainer unchanged:
 * it just measures loudness/pitch across N audio segments, and a sentence's
 * words are exactly that — N segments — same as a word's syllables. No AI
 * call, no cost, same local Web Audio API analysis already validated there.
 *
 * Content is per-language (English, German, French, Spanish, Swedish) —
 * the first feature in the app to use the shared `lib/languages.ts` list.
 */
export function ContrastiveStressTrainer() {
  const [language, setLanguage] = useState<LanguageCode>("en");
  const [exercise, setExercise] = useState<ContrastiveExercise | null>(null);

  // Client-only: reads localStorage and picks the first exercise. Both are
  // unavoidably client-only (no localStorage during SSR, and a value
  // picked during the initial render would differ between SSR and
  // hydration), so they're combined into one effect run once on mount.
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
    setExercise(randomContrastiveExercise(initialLanguage));
  }, []);

  const { isRecording, recordedBlob, start, stop, reset, error: recordError } =
    useMediaRecorder(false);
  const [measurement, setMeasurement] = useState<StressMeasurement | null>(null);
  const [measureError, setMeasureError] = useState<string | null>(null);

  const audioUrl = useMemo(
    () => (recordedBlob ? URL.createObjectURL(recordedBlob) : null),
    [recordedBlob],
  );
  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  // Measure as soon as a recording finishes. measurement/measureError start
  // out null for this blob and only get set once the async result lands —
  // no separate "isMeasuring" flag needed, that's just "reviewing and
  // neither is set yet" (see render below).
  useEffect(() => {
    if (!recordedBlob || !exercise) return;
    let cancelled = false;
    measureSyllableStress(recordedBlob, exercise.sentence.words.length)
      .then((result) => {
        if (!cancelled) setMeasurement(result);
      })
      .catch(() => {
        if (!cancelled) setMeasureError("Couldn't measure the stress in that recording.");
      });
    return () => {
      cancelled = true;
    };
  }, [recordedBlob, exercise]);

  function handleLanguageChange(newLanguage: LanguageCode) {
    setLanguage(newLanguage);
    setExercise(randomContrastiveExercise(newLanguage));
    reset();
    setMeasurement(null);
    setMeasureError(null);
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguage);
    } catch {
      // Ignore — the choice just won't persist across visits.
    }
  }

  function handleRetry() {
    reset();
    setMeasurement(null);
    setMeasureError(null);
  }

  function handleNewExercise() {
    reset();
    setMeasurement(null);
    setMeasureError(null);
    setExercise(randomContrastiveExercise(language));
  }

  if (!exercise) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm text-slate-400">Loading…</p>
      </div>
    );
  }

  const { sentence, variant } = exercise;
  const targetWord = sentence.words[variant.targetWordIndex];
  const showSetup = !isRecording && !recordedBlob;
  const showReview = !!recordedBlob && !isRecording;
  const isMeasuring = showReview && !measurement && !measureError;

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      {showSetup && (
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Language</p>
          <div className="flex flex-wrap gap-1.5">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => handleLanguageChange(l.code)}
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
      )}

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Sentence</p>
        <p className="mt-2 text-xl leading-relaxed text-slate-900">
          {sentence.words.map((word, i) => (
            <span
              key={i}
              className={i === variant.targetWordIndex ? "font-extrabold text-indigo-600" : ""}
            >
              {word}
              {i < sentence.words.length - 1 ? " " : "."}
            </span>
          ))}
        </p>
      </div>

      <div className="rounded-lg bg-indigo-50 p-4">
        <p className="text-sm text-slate-700">
          Say the sentence with stress on <span className="font-bold text-indigo-700">{targetWord}</span>.
        </p>
        <p className="mt-1 text-xs text-slate-500">{variant.meaning}</p>
      </div>

      {recordError && <p className="text-sm text-red-600">{recordError}</p>}

      {showSetup && (
        <button
          onClick={start}
          className="flex h-20 w-20 items-center justify-center self-center rounded-full bg-red-600 text-white shadow-lg transition-transform hover:scale-105"
          aria-label="Start Recording"
        >
          <span className="h-6 w-6 rounded-full bg-white" />
        </button>
      )}

      {isRecording && (
        <div className="flex flex-col items-center gap-3">
          <span className="flex items-center gap-2 text-sm font-semibold text-red-600">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500" />
            Recording…
          </span>
          <button
            onClick={stop}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-800 text-white shadow-lg transition-transform hover:scale-105"
            aria-label="Stop Recording"
          >
            <span className="h-6 w-6 rounded-md bg-white" />
          </button>
        </div>
      )}

      {showReview && (
        <div className="flex flex-col items-center gap-4">
          <audio src={audioUrl ?? undefined} controls className="w-full max-w-sm" />

          {isMeasuring && <p className="text-sm text-slate-400">Measuring stress…</p>}
          {measureError && <p className="text-sm text-red-600">{measureError}</p>}
          {measurement && (
            <StressResult sentence={sentence} variant={variant} measurement={measurement} />
          )}

          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={handleRetry}
              className="rounded-lg bg-slate-200 px-6 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-300"
            >
              Try again
            </button>
            <button
              onClick={handleNewExercise}
              className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
            >
              🎲 New sentence
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function StressResult({
  sentence,
  variant,
  measurement,
}: {
  sentence: { words: string[] };
  variant: { targetWordIndex: number };
  measurement: StressMeasurement;
}) {
  const isCorrect = measurement.measuredStressIndex === variant.targetWordIndex;
  const measuredWord = sentence.words[measurement.measuredStressIndex];
  const targetWord = sentence.words[variant.targetWordIndex];

  return (
    <div className="flex w-full flex-col gap-3 rounded-lg border border-slate-200 p-4">
      <div className="flex items-end justify-center gap-2 overflow-x-auto">
        {sentence.words.map((word, i) => {
          const m = measurement.syllables[i];
          const heightPct = Math.round(20 + (m?.relativeLoudness ?? 0) * 80);
          const isTarget = i === variant.targetWordIndex;
          const isMeasured = i === measurement.measuredStressIndex;

          return (
            <div key={i} className="flex w-14 shrink-0 flex-col items-center gap-1">
              {isTarget && <span className="text-[9px] font-semibold text-indigo-500">target</span>}
              <div className="flex h-16 w-full items-end justify-center rounded-md bg-slate-100">
                <div
                  className={`w-6 rounded-t-md transition-all ${
                    isMeasured ? (isCorrect ? "bg-emerald-500" : "bg-amber-500") : "bg-slate-300"
                  }`}
                  style={{ height: `${heightPct}%` }}
                />
              </div>
              <span
                className={`truncate text-xs font-semibold ${isTarget ? "text-indigo-600" : "text-slate-600"}`}
                title={word}
              >
                {word}
              </span>
            </div>
          );
        })}
      </div>

      <p className={`text-center text-sm font-medium ${isCorrect ? "text-emerald-700" : "text-amber-700"}`}>
        {isCorrect
          ? `✅ Correct! You stressed "${targetWord}" the most.`
          : `❌ You stressed "${measuredWord}" the most — try emphasizing "${targetWord}" more.`}
      </p>
      <p className="text-center text-[11px] text-slate-400">
        Approximate measurement based on volume and pitch, not an exact answer key.
      </p>
    </div>
  );
}
