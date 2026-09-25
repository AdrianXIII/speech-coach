"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useMediaRecorder } from "@/hooks/useMediaRecorder";
import { formatDuration } from "@/lib/audio";
import {
  execModelsForLanguage,
  activePhaseIndex,
  scaleModel,
  type StructureModel,
} from "@/lib/structureModels";
import {
  randomScenario,
  RECOMMENDED_SECONDS,
  type CommScenario,
  type CommScenarioCategory,
} from "@/lib/executiveCommScenarios";
import { frameworkLesson } from "@/lib/executiveCommLessons";
import type { ExecCommAttempt, ExecCommResult } from "@/lib/executiveCommTypes";
import { useLanguage } from "@/components/LanguageProvider";
import { PhaseBar } from "@/components/PhaseBar";
import { ExecutiveCommunicationResults } from "@/components/ExecutiveCommunicationResults";
import type { LanguageCode } from "@/lib/languages";

const PREP_SECONDS = 20;
const DURATIONS = [30, 60, 90];
const CUSTOM_DEFAULT_SECONDS = 60;
const MIN_CUSTOM_CHARS = 10;

const CATEGORIES: CommScenarioCategory[] = ["self-advocacy", "executive-summary", "influence"];
type Choice = CommScenarioCategory | "any" | "custom";
type Stage = "setup" | "prep" | "session";

const T: Record<LanguageCode, {
  categoryAny: string;
  categoryLabels: Record<CommScenarioCategory, string>;
  custom: string;
  customLabel: string;
  customPlaceholder: string;
  scenario: string;
  newScenario: string;
  structure: string;
  showExample: string;
  hideExample: string;
  weakExample: string;
  strongExample: string;
  duration: string;
  recommended: string;
  startButton: string;
  prepTitle: string;
  prepHint: string;
  notesPlaceholder: string;
  startSpeaking: string;
  yourNotes: string;
  finishNow: string;
  discardRecording: string;
  submitButton: string;
  submitting: string;
  loading: string;
  submitError: string;
  sec: string;
}> = {
  en: {
    categoryAny: "Surprise me",
    categoryLabels: { "self-advocacy": "Self-Advocacy", "executive-summary": "Executive Summary", influence: "Influence" },
    custom: "✏️ My own situation",
    customLabel: "Describe a real situation you're facing",
    customPlaceholder: "e.g. I have to present our Q3 budget overrun to the leadership team on Monday.",
    scenario: "Scenario",
    newScenario: "🎲 New scenario",
    structure: "Structure",
    showExample: "How does it work? Show an example",
    hideExample: "Hide example",
    weakExample: "Weak",
    strongExample: "Strong",
    duration: "Speaking time",
    recommended: "recommended",
    startButton: "Start",
    prepTitle: "Think first",
    prepHint: "Jot down your main point and 2–3 keywords. Recording starts automatically.",
    notesPlaceholder: "Your main point, key facts, your ask…",
    startSpeaking: "I'm ready — start speaking",
    yourNotes: "Your notes",
    finishNow: "Finish now",
    discardRecording: "🗑️ Discard and redo",
    submitButton: "Get feedback",
    submitting: "Grading…",
    loading: "Loading…",
    submitError: "Something went wrong grading your answer.",
    sec: "sec",
  },
  de: {
    categoryAny: "Überrasch mich",
    categoryLabels: { "self-advocacy": "Selbstvertretung", "executive-summary": "Executive Summary", influence: "Einfluss" },
    custom: "✏️ Meine eigene Situation",
    customLabel: "Beschreibe eine echte Situation, vor der du stehst",
    customPlaceholder: "z. B. Ich muss am Montag der Geschäftsleitung die Budgetüberschreitung im Q3 erklären.",
    scenario: "Szenario",
    newScenario: "🎲 Neues Szenario",
    structure: "Struktur",
    showExample: "Wie funktioniert es? Beispiel zeigen",
    hideExample: "Beispiel ausblenden",
    weakExample: "Schwach",
    strongExample: "Stark",
    duration: "Redezeit",
    recommended: "empfohlen",
    startButton: "Starten",
    prepTitle: "Erst nachdenken",
    prepHint: "Notiere deine Kernaussage und 2–3 Stichworte. Die Aufnahme startet automatisch.",
    notesPlaceholder: "Kernaussage, wichtige Fakten, deine Bitte…",
    startSpeaking: "Ich bin bereit — jetzt sprechen",
    yourNotes: "Deine Notizen",
    finishNow: "Jetzt beenden",
    discardRecording: "🗑️ Verwerfen und neu",
    submitButton: "Feedback erhalten",
    submitting: "Wird bewertet…",
    loading: "Wird geladen…",
    submitError: "Bei der Bewertung ist etwas schiefgelaufen.",
    sec: "Sek.",
  },
  fr: {
    categoryAny: "Surprends-moi",
    categoryLabels: { "self-advocacy": "Se valoriser", "executive-summary": "Résumé exécutif", influence: "Influence" },
    custom: "✏️ Ma propre situation",
    customLabel: "Décrivez une situation réelle à laquelle vous faites face",
    customPlaceholder: "ex. Je dois présenter le dépassement budgétaire du T3 à la direction lundi.",
    scenario: "Scénario",
    newScenario: "🎲 Nouveau scénario",
    structure: "Structure",
    showExample: "Comment ça marche ? Voir un exemple",
    hideExample: "Masquer l'exemple",
    weakExample: "Faible",
    strongExample: "Fort",
    duration: "Temps de parole",
    recommended: "recommandé",
    startButton: "Démarrer",
    prepTitle: "Réfléchissez d'abord",
    prepHint: "Notez votre point principal et 2–3 mots-clés. L'enregistrement démarre automatiquement.",
    notesPlaceholder: "Point principal, faits clés, votre demande…",
    startSpeaking: "Je suis prêt — parler maintenant",
    yourNotes: "Vos notes",
    finishNow: "Terminer maintenant",
    discardRecording: "🗑️ Supprimer et recommencer",
    submitButton: "Obtenir un retour",
    submitting: "Évaluation…",
    loading: "Chargement…",
    submitError: "Une erreur est survenue lors de l'évaluation.",
    sec: "s",
  },
  es: {
    categoryAny: "Sorpréndeme",
    categoryLabels: { "self-advocacy": "Autopromoción", "executive-summary": "Resumen ejecutivo", influence: "Influencia" },
    custom: "✏️ Mi propia situación",
    customLabel: "Describe una situación real a la que te enfrentas",
    customPlaceholder: "p. ej. El lunes tengo que presentar a la dirección el sobrecoste del tercer trimestre.",
    scenario: "Escenario",
    newScenario: "🎲 Nuevo escenario",
    structure: "Estructura",
    showExample: "¿Cómo funciona? Ver un ejemplo",
    hideExample: "Ocultar ejemplo",
    weakExample: "Débil",
    strongExample: "Fuerte",
    duration: "Tiempo para hablar",
    recommended: "recomendado",
    startButton: "Empezar",
    prepTitle: "Piensa primero",
    prepHint: "Anota tu idea principal y 2–3 palabras clave. La grabación empieza automáticamente.",
    notesPlaceholder: "Idea principal, datos clave, tu petición…",
    startSpeaking: "Estoy listo — empezar a hablar",
    yourNotes: "Tus notas",
    finishNow: "Terminar ahora",
    discardRecording: "🗑️ Descartar y repetir",
    submitButton: "Obtener comentarios",
    submitting: "Evaluando…",
    loading: "Cargando…",
    submitError: "Algo salió mal al evaluar tu respuesta.",
    sec: "s",
  },
  sv: {
    categoryAny: "Överraska mig",
    categoryLabels: { "self-advocacy": "Självförespråkande", "executive-summary": "Executive summary", influence: "Genomslag" },
    custom: "✏️ Min egen situation",
    customLabel: "Beskriv en verklig situation du står inför",
    customPlaceholder: "t.ex. Jag ska presentera budgetöverskridandet i Q3 för ledningsgruppen på måndag.",
    scenario: "Scenario",
    newScenario: "🎲 Nytt scenario",
    structure: "Struktur",
    showExample: "Hur fungerar det? Visa exempel",
    hideExample: "Dölj exempel",
    weakExample: "Svagt",
    strongExample: "Starkt",
    duration: "Taltid",
    recommended: "rekommenderat",
    startButton: "Starta",
    prepTitle: "Tänk först",
    prepHint: "Skriv ner din huvudpoäng och 2–3 stödord. Inspelningen startar automatiskt.",
    notesPlaceholder: "Huvudpoäng, nyckelfakta, vad du vill ha…",
    startSpeaking: "Jag är redo — börja prata",
    yourNotes: "Dina anteckningar",
    finishNow: "Avsluta nu",
    discardRecording: "🗑️ Kasta och gör om",
    submitButton: "Få feedback",
    submitting: "Bedömer…",
    loading: "Laddar…",
    submitError: "Något gick fel när svaret skulle bedömas.",
    sec: "sek",
  },
};

/**
 * A workplace situation (a scenario, or the user's own), a framework
 * (PREP / STAR / BLUF / What-So what-Now what), a short think-first prep
 * phase, then a timed recording that's graded on six dimensions. After
 * feedback the user can retry the SAME situation and see before/after —
 * the attempt → feedback → retry loop is what actually builds the skill.
 */
export function ExecutiveCommunicationTrainer() {
  const { language } = useLanguage();
  const t = T[language];

  const [choice, setChoice] = useState<Choice>("any");
  const [scenario, setScenario] = useState<CommScenario | null>(null);
  const [customText, setCustomText] = useState("");
  const [model, setModel] = useState<StructureModel | null>(null);
  const [targetSeconds, setTargetSeconds] = useState(60);
  const [showLesson, setShowLesson] = useState(false);

  const [stage, setStage] = useState<Stage>("setup");
  const [prepLeft, setPrepLeft] = useState(PREP_SECONDS);
  const [notes, setNotes] = useState("");

  const { isRecording, recordedBlob, start, stop, reset, error: recordError } = useMediaRecorder(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [results, setResults] = useState<ExecCommResult | null>(null);
  const [previousResult, setPreviousResult] = useState<ExecCommResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [history, setHistory] = useState<ExecCommAttempt[]>([]);

  const scaledModel = useMemo(() => (model ? scaleModel(model, targetSeconds) : null), [model, targetSeconds]);
  const isCustom = choice === "custom";
  const scenarioPrompt = isCustom ? customText.trim() : (scenario?.prompt ?? "");
  const recommendedSeconds = isCustom ? CUSTOM_DEFAULT_SECONDS : scenario ? RECOMMENDED_SECONDS[scenario.category] : 60;

  const audioUrl = useMemo(() => (recordedBlob ? URL.createObjectURL(recordedBlob) : null), [recordedBlob]);
  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  useEffect(() => {
    fetch("/api/executive-communication")
      .then((res) => res.json())
      .then((data: { attempts: ExecCommAttempt[] }) => setHistory(data.attempts ?? []))
      .catch(() => {});
  }, []);

  function loadHistory() {
    fetch("/api/executive-communication")
      .then((res) => res.json())
      .then((data: { attempts: ExecCommAttempt[] }) => setHistory(data.attempts ?? []))
      .catch(() => {});
  }

  useEffect(() => {
    if (!isRecording) return;
    intervalRef.current = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRecording]);

  useEffect(() => {
    if (isRecording && elapsedSeconds >= targetSeconds) stop();
  }, [isRecording, elapsedSeconds, targetSeconds, stop]);

  // Prep countdown, then start recording automatically.
  useEffect(() => {
    if (stage !== "prep") return;
    const id = setInterval(() => setPrepLeft((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [stage]);

  useEffect(() => {
    if (stage === "prep" && prepLeft <= 0) {
      beginSpeaking();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, prepLeft]);

  // Re-roll whenever the app-wide language changes (including the first
  // settle from LanguageProvider's own localStorage load).
  useEffect(() => {
    const s = randomScenario(language, CATEGORIES.includes(choice as CommScenarioCategory) ? (choice as CommScenarioCategory) : undefined);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setScenario(s);
    if (choice !== "custom") setTargetSeconds(RECOMMENDED_SECONDS[s.category]);
    setModel(execModelsForLanguage(language)[0]);
    reset();
    setElapsedSeconds(0);
    setResults(null);
    setPreviousResult(null);
    setSubmitError(null);
    setStage("setup");
    // `choice` intentionally omitted: picking a category re-rolls via handlePickChoice.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, reset]);

  function applyScenario(s: CommScenario) {
    setScenario(s);
    setTargetSeconds(RECOMMENDED_SECONDS[s.category]);
  }

  function handlePickChoice(next: Choice) {
    setChoice(next);
    setPreviousResult(null);
    if (next === "custom") {
      setTargetSeconds(CUSTOM_DEFAULT_SECONDS);
    } else {
      applyScenario(randomScenario(language, next === "any" ? undefined : next));
    }
  }

  function handleNewScenario() {
    setPreviousResult(null);
    applyScenario(randomScenario(language, choice === "any" || choice === "custom" ? undefined : choice));
  }

  function handleStart() {
    reset();
    setElapsedSeconds(0);
    setResults(null);
    setSubmitError(null);
    setNotes("");
    setPrepLeft(PREP_SECONDS);
    setStage("prep");
  }

  function beginSpeaking() {
    setStage("session");
    setElapsedSeconds(0);
    start();
  }

  function handleDiscard() {
    reset();
    setElapsedSeconds(0);
    setSubmitError(null);
    setPrepLeft(PREP_SECONDS);
    setStage("prep");
  }

  function handleRetrySame() {
    setPreviousResult(results);
    setResults(null);
    reset();
    setElapsedSeconds(0);
    setSubmitError(null);
    setPrepLeft(PREP_SECONDS);
    setStage("prep");
  }

  function handleNewFromResults() {
    setPreviousResult(null);
    setResults(null);
    reset();
    setElapsedSeconds(0);
    setSubmitError(null);
    setStage("setup");
    if (choice !== "custom") {
      applyScenario(randomScenario(language, choice === "any" ? undefined : choice));
    }
  }

  async function handleSubmit() {
    if (!recordedBlob || !model) return;
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const formData = new FormData();
      formData.append("audio", recordedBlob, "answer.webm");
      formData.append("modelId", model.id);
      formData.append("language", language);
      formData.append("targetSeconds", String(targetSeconds));
      if (isCustom) formData.append("customPrompt", customText.trim());
      else if (scenario) formData.append("scenarioId", scenario.id);

      const res = await fetch("/api/executive-communication", { method: "POST", body: formData });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || t.submitError);
      }
      const data: ExecCommResult = await res.json();
      setResults(data);
      loadHistory();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : t.submitError);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!model || !scaledModel || (!isCustom && !scenario)) {
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
        previousResult={previousResult}
        model={scaledModel}
        history={history}
        onRetrySame={handleRetrySame}
        onNewScenario={handleNewFromResults}
      />
    );
  }

  const lesson = frameworkLesson(language, model.id);
  const currentPhase = activePhaseIndex(scaledModel, elapsedSeconds);
  const showLive = stage === "session" && isRecording;
  const showReview = stage === "session" && !isRecording && !!recordedBlob;
  const canStart = !isCustom || customText.trim().length >= MIN_CUSTOM_CHARS;

  const scenarioBlock = (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{t.scenario}</p>
      <p className="mt-2 text-base font-medium leading-relaxed text-ink">{scenarioPrompt}</p>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-hairline bg-surface p-8 shadow-sm">
      {stage === "setup" && (
        <>
          <div className="flex flex-wrap gap-2">
            {(["any", ...CATEGORIES, "custom"] as Choice[]).map((c) => (
              <button
                key={c}
                onClick={() => handlePickChoice(c)}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  choice === c
                    ? "border-brass bg-brass text-navy"
                    : "border-hairline text-ink-muted hover:border-brass/60 hover:text-ink"
                }`}
              >
                {c === "any" ? t.categoryAny : c === "custom" ? t.custom : t.categoryLabels[c]}
              </button>
            ))}
          </div>

          {isCustom ? (
            <div>
              <label htmlFor="exec-custom" className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                {t.customLabel}
              </label>
              <textarea
                id="exec-custom"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                maxLength={600}
                rows={3}
                placeholder={t.customPlaceholder}
                className="mt-2 w-full rounded-lg border border-hairline px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-brass focus:outline-none"
              />
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{t.scenario}</p>
                <button
                  onClick={handleNewScenario}
                  className="rounded-lg bg-surface-2 px-3 py-1.5 text-sm font-semibold text-ink transition-colors hover:bg-hairline"
                >
                  {t.newScenario}
                </button>
              </div>
              <p className="mt-2 text-base font-medium leading-relaxed text-ink">{scenarioPrompt}</p>
            </div>
          )}

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{t.structure}</p>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {execModelsForLanguage(language).map((m) => (
                <button
                  key={m.id}
                  onClick={() => setModel(m)}
                  className={`rounded-lg border p-3 text-left transition-colors ${
                    model.id === m.id ? "border-brass bg-surface-2" : "border-hairline bg-surface hover:bg-surface-2"
                  }`}
                >
                  <p className="text-sm font-bold text-ink">{m.name}</p>
                  <p className="mt-0.5 text-xs text-ink-muted">{m.fullName}</p>
                </button>
              ))}
            </div>

            {lesson && (
              <div className="mt-3">
                <button
                  onClick={() => setShowLesson((v) => !v)}
                  className="text-xs font-semibold text-brass-text hover:underline"
                >
                  {showLesson ? t.hideExample : t.showExample}
                </button>
                {showLesson && (
                  <div className="mt-2 flex flex-col gap-2 rounded-lg border border-hairline bg-surface-2 p-4 text-sm">
                    <p className="text-ink">{lesson.whenToUse}</p>
                    <p className="text-ink-muted">
                      <span className="font-semibold text-amber-700">{t.weakExample}: </span>
                      &ldquo;{lesson.weak}&rdquo;
                    </p>
                    <p className="text-ink">
                      <span className="font-semibold text-emerald-700">{t.strongExample}: </span>
                      &ldquo;{lesson.strong}&rdquo;
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{t.duration}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {DURATIONS.map((d) => (
                <button
                  key={d}
                  onClick={() => setTargetSeconds(d)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                    targetSeconds === d
                      ? "border-brass bg-brass text-navy"
                      : "border-hairline text-ink-muted hover:border-brass/60 hover:text-ink"
                  }`}
                >
                  {d} {t.sec}
                  {d === recommendedSeconds ? ` · ${t.recommended}` : ""}
                </button>
              ))}
            </div>
            <PhaseBar model={scaledModel} activeIndex={-1} elapsedSeconds={0} />
          </div>

          <button
            onClick={handleStart}
            disabled={!canStart}
            className="self-center rounded-lg bg-navy px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800 disabled:opacity-40"
          >
            {t.startButton} ({targetSeconds} {t.sec})
          </button>
        </>
      )}

      {stage === "prep" && (
        <>
          {scenarioBlock}
          <div className="flex flex-col items-center gap-2 border-t border-hairline pt-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-brass-text">{t.prepTitle}</p>
            <p className="font-mono text-4xl font-bold tabular-nums text-ink">{formatDuration(Math.max(0, prepLeft))}</p>
            <p className="text-center text-xs text-ink-muted">{t.prepHint}</p>
          </div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            autoFocus
            placeholder={t.notesPlaceholder}
            className="w-full rounded-lg border border-hairline px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-brass focus:outline-none"
          />
          <PhaseBar model={scaledModel} activeIndex={-1} elapsedSeconds={0} />
          {recordError && <p className="text-center text-sm text-red-600">{recordError}</p>}
          <button
            onClick={beginSpeaking}
            className="self-center rounded-lg bg-navy px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
          >
            {t.startSpeaking}
          </button>
        </>
      )}

      {stage === "session" && (
        <>
          {scenarioBlock}
          {notes.trim() && (
            <div className="rounded-lg border border-hairline bg-surface-2 px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted">{t.yourNotes}</p>
              <p className="mt-1 whitespace-pre-wrap text-sm text-ink">{notes}</p>
            </div>
          )}

          <div className="flex flex-col items-center gap-4 border-t border-hairline pt-6">
            <PhaseBar model={scaledModel} activeIndex={showLive ? currentPhase : -1} elapsedSeconds={elapsedSeconds} />

            {showLive && (
              <>
                <p className="text-lg font-bold text-brass-text">{scaledModel.phases[currentPhase].label}</p>
                <div className="flex items-center gap-2 font-mono text-4xl font-bold tabular-nums text-ink">
                  <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500" />
                  {formatDuration(Math.max(0, targetSeconds - elapsedSeconds))}
                </div>
                <button
                  onClick={stop}
                  className="rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
                >
                  {t.finishNow}
                </button>
              </>
            )}

            {recordError && (
              <div className="flex flex-col items-center gap-3">
                <p className="text-sm text-red-600">{recordError}</p>
                <button
                  onClick={beginSpeaking}
                  className="rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
                >
                  {t.startSpeaking}
                </button>
              </div>
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
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
