"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useMediaRecorder } from "@/hooks/useMediaRecorder";
import { formatDuration } from "@/lib/audio";
import { randomImprovWord } from "@/lib/improvWords";
import {
  modelsForLanguage,
  randomStructureModel,
  activePhaseIndex,
  type StructureModel,
} from "@/lib/structureModels";
import { LANGUAGES, type LanguageCode } from "@/lib/languages";

const EXERCISE_SECONDS = 60;
const LANGUAGE_STORAGE_KEY = "improvLanguage";

/**
 * 60-second improv drill: a random everyday word plus a rhetorical
 * structure model (PREP / NUPP / Triad) to hang the answer on. A segmented
 * phase timer shows which part of the structure to be in as the clock
 * runs; recording is local-only with a one-tap discard so failing costs
 * nothing. No AI involved — this is pure practice, not feedback.
 */
export function ImprovTrainer() {
  const [language, setLanguage] = useState<LanguageCode>("en");
  // Picked client-side only (in an effect below): a random initial value
  // here would be computed once during SSR and again on the client during
  // hydration, and Math.random() obviously won't agree with itself.
  const [word, setWord] = useState<string | null>(null);
  const [model, setModel] = useState<StructureModel | null>(null);

  useEffect(() => {
    let initialLanguage: LanguageCode = "en";
    try {
      const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (LANGUAGES.some((l) => l.code === saved)) initialLanguage = saved as LanguageCode;
    } catch {
      // Private browsing / storage disabled — fall back to English.
    }
    // Deliberate client-only setState: this is the standard fix for a
    // Math.random() hydration mismatch (start null on both server and
    // client, fill in the random value only after mount), not something
    // to lift into render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLanguage(initialLanguage);
    setWord(randomImprovWord(initialLanguage));
    setModel(randomStructureModel(initialLanguage));
  }, []);

  const { isRecording, recordedBlob, start, stop, reset, error: recordError } =
    useMediaRecorder(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  // Auto-stop at 60 seconds.
  useEffect(() => {
    if (isRecording && elapsedSeconds >= EXERCISE_SECONDS) stop();
  }, [isRecording, elapsedSeconds, stop]);

  function handleLanguageChange(newLanguage: LanguageCode) {
    setLanguage(newLanguage);
    setWord(randomImprovWord(newLanguage));
    setModel(randomStructureModel(newLanguage));
    reset();
    setElapsedSeconds(0);
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguage);
    } catch {
      // Ignore — the choice just won't persist across visits.
    }
  }

  function handleNewWord() {
    setWord(randomImprovWord(language));
  }

  function handleNewModel() {
    setModel(randomStructureModel(language));
  }

  function handleStart() {
    setElapsedSeconds(0);
    start();
  }

  function handleDiscard() {
    reset();
    setElapsedSeconds(0);
  }

  function handleNewPrompt() {
    reset();
    setElapsedSeconds(0);
    setWord(randomImprovWord(language));
    setModel(randomStructureModel(language));
  }

  const showSetup = !isRecording && !recordedBlob;
  const showLive = isRecording;
  const showReview = !!recordedBlob && !isRecording;

  if (!word || !model) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm text-slate-400">Loading…</p>
      </div>
    );
  }

  const currentPhase = activePhaseIndex(model, elapsedSeconds);

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

      {/* Word */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Word</p>
        <div className="mt-2 flex items-center gap-3">
          <p className="text-2xl font-bold text-slate-900">{word}</p>
          {showSetup && (
            <button
              onClick={handleNewWord}
              className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200"
            >
              🎲 New word
            </button>
          )}
        </div>
      </div>

      {/* Structure model */}
      {showSetup && (
        <div>
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Structure
            </p>
            <button
              onClick={handleNewModel}
              className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200"
            >
              🎲 New model
            </button>
          </div>

          <div className="mt-2 grid gap-2 sm:grid-cols-3">
            {modelsForLanguage(language).map((m) => (
              <button
                key={m.id}
                onClick={() => setModel(m)}
                className={`rounded-lg border p-3 text-left transition-colors ${
                  model.id === m.id
                    ? "border-indigo-400 bg-indigo-50"
                    : "border-slate-200 bg-white hover:bg-slate-50"
                }`}
              >
                <p className="text-sm font-bold text-slate-900">{m.name}</p>
                <p className="mt-0.5 text-xs text-slate-500">{m.fullName}</p>
              </button>
            ))}
          </div>

          <PhaseBar model={model} activeIndex={-1} elapsedSeconds={0} />
        </div>
      )}

      {/* Live phase timer + recording */}
      {(showLive || showReview) && (
        <div className="flex flex-col items-center gap-4 border-t border-slate-100 pt-6">
          <PhaseBar
            model={model}
            activeIndex={showLive ? currentPhase : -1}
            elapsedSeconds={elapsedSeconds}
          />

          {showLive && (
            <>
              <p className="text-lg font-bold text-indigo-600">
                {model.phases[currentPhase].label}
              </p>
              <div className="flex items-center gap-2 font-mono text-4xl font-bold tabular-nums text-slate-800">
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500" />
                {formatDuration(EXERCISE_SECONDS - elapsedSeconds)}
              </div>
            </>
          )}

          {recordError && <p className="text-sm text-red-600">{recordError}</p>}

          {showLive && (
            <button
              onClick={stop}
              className="rounded-lg bg-slate-800 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
            >
              Finish now
            </button>
          )}

          {showReview && (
            <div className="flex w-full flex-col items-center gap-4">
              <audio src={audioUrl ?? undefined} controls className="w-full max-w-sm" />
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={handleDiscard}
                  className="rounded-lg bg-red-50 px-6 py-3 text-sm font-semibold text-red-700 transition-colors hover:bg-red-100"
                >
                  🗑️ Discard recording
                </button>
                <button
                  onClick={handleNewPrompt}
                  className="rounded-lg bg-slate-200 px-6 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-300"
                >
                  🎲 New word & model
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {showSetup && (
        <button
          onClick={handleStart}
          className="self-center rounded-lg bg-indigo-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
        >
          Start (60 sec)
        </button>
      )}
    </div>
  );
}

/**
 * Horizontal bar split into the model's phases, width-proportional to each
 * phase's share of the 60 seconds. `activeIndex` (-1 when not running)
 * highlights the current phase and fills it based on progress within that
 * phase specifically, not just the whole bar.
 */
function PhaseBar({
  model,
  activeIndex,
  elapsedSeconds,
}: {
  model: StructureModel;
  activeIndex: number;
  elapsedSeconds: number;
}) {
  const phaseStarts: number[] = [];
  model.phases.reduce((cumulative, phase) => {
    phaseStarts.push(cumulative);
    return cumulative + phase.seconds;
  }, 0);

  return (
    <div className="mt-3 flex w-full gap-1">
      {model.phases.map((phase, i) => {
        const phaseStart = phaseStarts[i];
        const isActive = i === activeIndex;
        const isPast = activeIndex >= 0 && i < activeIndex;
        const progressInPhase = isActive
          ? Math.min(1, Math.max(0, (elapsedSeconds - phaseStart) / phase.seconds))
          : isPast
            ? 1
            : 0;

        return (
          <div
            key={i}
            className="flex flex-col gap-1"
            style={{ flexGrow: phase.seconds, flexBasis: 0 }}
          >
            <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full transition-all ${
                  isActive ? "bg-indigo-500" : isPast ? "bg-indigo-300" : "bg-slate-200"
                }`}
                style={{ width: `${progressInPhase * 100}%` }}
              />
            </div>
            <p
              className={`truncate text-center text-[11px] font-semibold ${
                isActive ? "text-indigo-600" : "text-slate-400"
              }`}
              title={phase.label}
            >
              {phase.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}
