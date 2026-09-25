"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useMediaRecorder } from "@/hooks/useMediaRecorder";
import { formatDuration } from "@/lib/audio";
import {
  execModelsForLanguage,
  activePhaseIndex,
  type StructureModel,
} from "@/lib/structureModels";
import {
  randomScenario,
  type CommScenario,
  type CommScenarioCategory,
} from "@/lib/executiveCommScenarios";
import type { ExecCommResult } from "@/lib/executiveCommEngine";
import { useLanguage } from "@/components/LanguageProvider";
import { PhaseBar } from "@/components/PhaseBar";
import { ExecutiveCommunicationResults } from "@/components/ExecutiveCommunicationResults";
import type { LanguageCode } from "@/lib/languages";

const EXERCISE_SECONDS = 60;

const CATEGORIES: CommScenarioCategory[] = ["self-advocacy", "executive-summary", "influence"];

const T: Record<LanguageCode, {
  categoryAny: string;
  categoryLabels: Record<CommScenarioCategory, string>;
  scenario: string;
  newScenario: string;
  structure: string;
  newModel: string;
  finishNow: string;
  discardRecording: string;
  newScenarioAndModel: string;
  startButton: string;
  submitButton: string;
  submitting: string;
  loading: string;
  submitError: string;
}> = {
  en: {
    categoryAny: "Surprise me",
    categoryLabels: {
      "self-advocacy": "Self-Advocacy",
      "executive-summary": "Executive Summary",
      influence: "Influence",
    },
    scenario: "Scenario",
    newScenario: "🎲 New scenario",
    structure: "Structure",
    newModel: "🎲 New framework",
    finishNow: "Finish now",
    discardRecording: "🗑️ Discard recording",
    newScenarioAndModel: "🎲 New scenario & framework",
    startButton: "Start (60 sec)",
    submitButton: "Get feedback",
    submitting: "Grading…",
    loading: "Loading…",
    submitError: "Something went wrong grading your answer.",
  },
  de: {
    categoryAny: "Überrasch mich",
    categoryLabels: {
      "self-advocacy": "Selbstvertretung",
      "executive-summary": "Executive Summary",
      influence: "Einfluss",
    },
    scenario: "Szenario",
    newScenario: "🎲 Neues Szenario",
    structure: "Struktur",
    newModel: "🎲 Neues Modell",
    finishNow: "Jetzt beenden",
    discardRecording: "🗑️ Aufnahme verwerfen",
    newScenarioAndModel: "🎲 Neues Szenario & Modell",
    startButton: "Starten (60 Sek.)",
    submitButton: "Feedback erhalten",
    submitting: "Wird bewertet…",
    loading: "Wird geladen…",
    submitError: "Bei der Bewertung ist etwas schiefgelaufen.",
  },
  fr: {
    categoryAny: "Surprends-moi",
    categoryLabels: {
      "self-advocacy": "Se valoriser",
      "executive-summary": "Résumé exécutif",
      influence: "Influence",
    },
    scenario: "Scénario",
    newScenario: "🎲 Nouveau scénario",
    structure: "Structure",
    newModel: "🎲 Nouveau modèle",
    finishNow: "Terminer maintenant",
    discardRecording: "🗑️ Supprimer l'enregistrement",
    newScenarioAndModel: "🎲 Nouveau scénario et modèle",
    startButton: "Démarrer (60 s)",
    submitButton: "Obtenir un retour",
    submitting: "Évaluation…",
    loading: "Chargement…",
    submitError: "Une erreur est survenue lors de l'évaluation.",
  },
  es: {
    categoryAny: "Sorpréndeme",
    categoryLabels: {
      "self-advocacy": "Autopromoción",
      "executive-summary": "Resumen ejecutivo",
      influence: "Influencia",
    },
    scenario: "Escenario",
    newScenario: "🎲 Nuevo escenario",
    structure: "Estructura",
    newModel: "🎲 Nuevo modelo",
    finishNow: "Terminar ahora",
    discardRecording: "🗑️ Descartar grabación",
    newScenarioAndModel: "🎲 Nuevo escenario y modelo",
    startButton: "Empezar (60 s)",
    submitButton: "Obtener comentarios",
    submitting: "Evaluando…",
    loading: "Cargando…",
    submitError: "Algo salió mal al evaluar tu respuesta.",
  },
  sv: {
    categoryAny: "Överraska mig",
    categoryLabels: {
      "self-advocacy": "Självförespråkande",
      "executive-summary": "Executive summary",
      influence: "Genomslag",
    },
    scenario: "Scenario",
    newScenario: "🎲 Nytt scenario",
    structure: "Struktur",
    newModel: "🎲 Ny modell",
    finishNow: "Avsluta nu",
    discardRecording: "🗑️ Kasta inspelning",
    newScenarioAndModel: "🎲 Nytt scenario & modell",
    startButton: "Starta (60 sek)",
    submitButton: "Få feedback",
    submitting: "Bedömer…",
    loading: "Laddar…",
    submitError: "Något gick fel när svaret skulle bedömas.",
  },
};

/**
 * A workplace scenario (self-advocacy / executive summary / influence),
 * plus a rhetorical structure model (PREP / STAR / BLUF) to hang the answer
 * on — same phase-timer UI as ImprovTrainer, but here the recording is
 * actually graded: did you lead with your conclusion, follow the chosen
 * framework, stay concise. See lib/executiveCommEngine.ts.
 */
export function ExecutiveCommunicationTrainer() {
  const { language } = useLanguage();
  const t = T[language];

  const [category, setCategory] = useState<CommScenarioCategory | null>(null);
  const [scenario, setScenario] = useState<CommScenario | null>(null);
  const [model, setModel] = useState<StructureModel | null>(null);

  const { isRecording, recordedBlob, start, stop, reset, error: recordError } =
    useMediaRecorder(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [results, setResults] = useState<ExecCommResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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

  // Re-roll whenever the app-wide language changes (including the very
  // first time it settles, from LanguageProvider's own localStorage load).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setScenario(randomScenario(language, category ?? undefined));
    setModel(execModelsForLanguage(language)[0]);
    reset();
    setElapsedSeconds(0);
    setResults(null);
    setSubmitError(null);
    // category intentionally omitted: picking a category re-rolls via
    // handlePickCategory below, this effect should only fire on language change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, reset]);

  function handlePickCategory(next: CommScenarioCategory | null) {
    setCategory(next);
    setScenario(randomScenario(language, next ?? undefined));
  }

  function handleNewScenario() {
    setScenario(randomScenario(language, category ?? undefined));
  }

  function handleStart() {
    setElapsedSeconds(0);
    setResults(null);
    setSubmitError(null);
    start();
  }

  function handleDiscard() {
    reset();
    setElapsedSeconds(0);
    setResults(null);
    setSubmitError(null);
  }

  function handleNewPrompt() {
    reset();
    setElapsedSeconds(0);
    setResults(null);
    setSubmitError(null);
    setScenario(randomScenario(language, category ?? undefined));
    setModel(execModelsForLanguage(language)[0]);
  }

  async function handleSubmit() {
    if (!recordedBlob || !scenario || !model) return;
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const formData = new FormData();
      formData.append("audio", recordedBlob, "answer.webm");
      formData.append("modelId", model.id);
      formData.append("scenarioId", scenario.id);
      formData.append("language", language);

      const res = await fetch("/api/executive-communication", { method: "POST", body: formData });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || t.submitError);
      }
      const data: ExecCommResult = await res.json();
      setResults(data);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : t.submitError);
    } finally {
      setIsSubmitting(false);
    }
  }

  const showSetup = !isRecording && !recordedBlob && !results;
  const showLive = isRecording;
  const showReview = !!recordedBlob && !isRecording && !results;

  if (!scenario || !model) {
    return (
      <div className="rounded-2xl border border-hairline bg-surface p-8 shadow-sm">
        <p className="text-sm text-ink-muted">{t.loading}</p>
      </div>
    );
  }

  if (results) {
    return (
      <ExecutiveCommunicationResults
        results={results}
        model={model}
        onPracticeAgain={handleNewPrompt}
      />
    );
  }

  const currentPhase = activePhaseIndex(model, elapsedSeconds);

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-hairline bg-surface p-8 shadow-sm">
      {showSetup && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handlePickCategory(null)}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
              category === null
                ? "border-brass bg-brass text-navy"
                : "border-hairline text-ink-muted hover:border-brass/60 hover:text-ink"
            }`}
          >
            {t.categoryAny}
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => handlePickCategory(c)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                category === c
                  ? "border-brass bg-brass text-navy"
                  : "border-hairline text-ink-muted hover:border-brass/60 hover:text-ink"
              }`}
            >
              {t.categoryLabels[c]}
            </button>
          ))}
        </div>
      )}

      {/* Scenario */}
      <div>
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{t.scenario}</p>
          {showSetup && (
            <button
              onClick={handleNewScenario}
              className="rounded-lg bg-surface-2 px-3 py-1.5 text-sm font-semibold text-ink transition-colors hover:bg-hairline"
            >
              {t.newScenario}
            </button>
          )}
        </div>
        <p className="mt-2 text-base font-medium leading-relaxed text-ink">{scenario.prompt}</p>
      </div>

      {/* Structure model */}
      {showSetup && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{t.structure}</p>
          <div className="mt-2 grid gap-2 sm:grid-cols-3">
            {execModelsForLanguage(language).map((m) => (
              <button
                key={m.id}
                onClick={() => setModel(m)}
                className={`rounded-lg border p-3 text-left transition-colors ${
                  model.id === m.id
                    ? "border-brass bg-surface-2"
                    : "border-hairline bg-surface hover:bg-surface-2"
                }`}
              >
                <p className="text-sm font-bold text-ink">{m.name}</p>
                <p className="mt-0.5 text-xs text-ink-muted">{m.fullName}</p>
              </button>
            ))}
          </div>

          <PhaseBar model={model} activeIndex={-1} elapsedSeconds={0} />
        </div>
      )}

      {/* Live phase timer + recording */}
      {(showLive || showReview) && (
        <div className="flex flex-col items-center gap-4 border-t border-hairline pt-6">
          <PhaseBar
            model={model}
            activeIndex={showLive ? currentPhase : -1}
            elapsedSeconds={elapsedSeconds}
          />

          {showLive && (
            <>
              <p className="text-lg font-bold text-brass-text">{model.phases[currentPhase].label}</p>
              <div className="flex items-center gap-2 font-mono text-4xl font-bold tabular-nums text-ink">
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500" />
                {formatDuration(EXERCISE_SECONDS - elapsedSeconds)}
              </div>
            </>
          )}

          {recordError && <p className="text-sm text-red-600">{recordError}</p>}

          {showLive && (
            <button
              onClick={stop}
              className="rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
            >
              {t.finishNow}
            </button>
          )}

          {showReview && (
            <div className="flex w-full flex-col items-center gap-4">
              <audio src={audioUrl ?? undefined} controls className="w-full max-w-sm" />
              {submitError && <p className="text-sm text-red-600">{submitError}</p>}
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800 disabled:opacity-50"
                >
                  {isSubmitting ? t.submitting : t.submitButton}
                </button>
                <button
                  onClick={handleDiscard}
                  disabled={isSubmitting}
                  className="rounded-lg bg-red-50 px-6 py-3 text-sm font-semibold text-red-700 transition-colors hover:bg-red-100 disabled:opacity-50"
                >
                  {t.discardRecording}
                </button>
                <button
                  onClick={handleNewPrompt}
                  disabled={isSubmitting}
                  className="rounded-lg bg-surface-2 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-hairline disabled:opacity-50"
                >
                  {t.newScenarioAndModel}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {showSetup && (
        <button
          onClick={handleStart}
          className="self-center rounded-lg bg-navy px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
        >
          {t.startButton}
        </button>
      )}
    </div>
  );
}
