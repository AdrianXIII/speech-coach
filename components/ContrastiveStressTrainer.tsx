"use client";

import { useEffect, useMemo, useState } from "react";
import { useMediaRecorder } from "@/hooks/useMediaRecorder";
import { measureSyllableStress, type StressMeasurement } from "@/lib/audioStress";
import { randomContrastiveExercise, type ContrastiveExercise } from "@/lib/contrastiveStress";
import { useLanguage } from "@/components/LanguageProvider";
import type { LanguageCode } from "@/lib/languages";

const T: Record<LanguageCode, {
  sentence: string;
  stressPromptBefore: string;
  stressPromptAfter: string;
  recording: string;
  measuringStress: string;
  measureError: string;
  tryAgain: string;
  newSentence: string;
  target: string;
  correctVerdict: (word: string) => string;
  wrongVerdict: (measured: string, target: string) => string;
  approximateNote: string;
  loading: string;
}> = {
  en: {
    sentence: "Sentence",
    stressPromptBefore: "Say the sentence with stress on",
    stressPromptAfter: ".",
    recording: "Recording…",
    measuringStress: "Measuring stress…",
    measureError: "Couldn't measure the stress in that recording.",
    tryAgain: "Try again",
    newSentence: "🎲 New sentence",
    target: "target",
    correctVerdict: (word) => `✅ Correct! You stressed "${word}" the most.`,
    wrongVerdict: (measured, target) => `❌ You stressed "${measured}" the most — try emphasizing "${target}" more.`,
    approximateNote: "Approximate measurement based on volume and pitch, not an exact answer key.",
    loading: "Loading…",
  },
  de: {
    sentence: "Satz",
    stressPromptBefore: "Sag den Satz mit Betonung auf",
    stressPromptAfter: ".",
    recording: "Aufnahme läuft…",
    measuringStress: "Betonung wird gemessen…",
    measureError: "Die Betonung in dieser Aufnahme konnte nicht gemessen werden.",
    tryAgain: "Erneut versuchen",
    newSentence: "🎲 Neuer Satz",
    target: "Ziel",
    correctVerdict: (word) => `✅ Richtig! Du hast „${word}“ am stärksten betont.`,
    wrongVerdict: (measured, target) => `❌ Du hast „${measured}“ am stärksten betont — versuch „${target}“ stärker zu betonen.`,
    approximateNote: "Ungefähre Messung basierend auf Lautstärke und Tonhöhe, kein exakter Maßstab.",
    loading: "Wird geladen…",
  },
  fr: {
    sentence: "Phrase",
    stressPromptBefore: "Dites la phrase en accentuant",
    stressPromptAfter: ".",
    recording: "Enregistrement…",
    measuringStress: "Mesure de l'accentuation…",
    measureError: "Impossible de mesurer l'accentuation dans cet enregistrement.",
    tryAgain: "Réessayer",
    newSentence: "🎲 Nouvelle phrase",
    target: "cible",
    correctVerdict: (word) => `✅ Correct ! Vous avez le plus accentué « ${word} ».`,
    wrongVerdict: (measured, target) => `❌ Vous avez le plus accentué « ${measured} » — essayez d'accentuer davantage « ${target} ».`,
    approximateNote: "Mesure approximative basée sur le volume et la hauteur, pas une référence exacte.",
    loading: "Chargement…",
  },
  es: {
    sentence: "Oración",
    stressPromptBefore: "Di la oración con énfasis en",
    stressPromptAfter: ".",
    recording: "Grabando…",
    measuringStress: "Midiendo el énfasis…",
    measureError: "No se pudo medir el énfasis en esa grabación.",
    tryAgain: "Intentar de nuevo",
    newSentence: "🎲 Nueva oración",
    target: "objetivo",
    correctVerdict: (word) => `✅ ¡Correcto! Enfatizaste más "${word}".`,
    wrongVerdict: (measured, target) => `❌ Enfatizaste más "${measured}" — intenta enfatizar más "${target}".`,
    approximateNote: "Medición aproximada basada en volumen y tono, no una referencia exacta.",
    loading: "Cargando…",
  },
  sv: {
    sentence: "Mening",
    stressPromptBefore: "Säg meningen med betoning på",
    stressPromptAfter: ".",
    recording: "Spelar in…",
    measuringStress: "Mäter betoning…",
    measureError: "Kunde inte mäta betoningen i den inspelningen.",
    tryAgain: "Försök igen",
    newSentence: "🎲 Ny mening",
    target: "mål",
    correctVerdict: (word) => `✅ Rätt! Du betonade "${word}" mest.`,
    wrongVerdict: (measured, target) => `❌ Du betonade "${measured}" mest — försök betona "${target}" mer.`,
    approximateNote: "Ungefärlig mätning baserad på volym och tonhöjd, inte ett exakt facit.",
    loading: "Laddar…",
  },
};

type Translations = (typeof T)[LanguageCode];

/**
 * Contrastive stress drill: same word-count-based sentence, different word
 * stressed each time — say it so the stress lands on the target word.
 * Reuses measureSyllableStress from the Pronunciation Trainer unchanged:
 * it just measures loudness/pitch across N audio segments, and a sentence's
 * words are exactly that — N segments — same as a word's syllables. No AI
 * call, no cost, same local Web Audio API analysis already validated there.
 *
 * Content is per-language (English, German, French, Spanish, Swedish),
 * driven by the app-wide language picker in the nav bar (LanguageProvider)
 * rather than its own local selector.
 */
export function ContrastiveStressTrainer() {
  const { language } = useLanguage();
  const t = T[language];
  const [exercise, setExercise] = useState<ContrastiveExercise | null>(null);

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
        if (!cancelled) setMeasureError(t.measureError);
      });
    return () => {
      cancelled = true;
    };
  }, [recordedBlob, exercise, t.measureError]);

  // Re-roll whenever the app-wide language changes (including the very
  // first time it settles, from LanguageProvider's own localStorage load).
  // This responds to an external dependency changing, not a mount-only
  // hack — the sanctioned use of setState-in-effect.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setExercise(randomContrastiveExercise(language));
    reset();
    setMeasurement(null);
    setMeasureError(null);
  }, [language, reset]);

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
        <p className="text-sm text-slate-400">{t.loading}</p>
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
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{t.sentence}</p>
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
          {t.stressPromptBefore} <span className="font-bold text-indigo-700">{targetWord}</span>{t.stressPromptAfter}
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
            {t.recording}
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

          {isMeasuring && <p className="text-sm text-slate-400">{t.measuringStress}</p>}
          {measureError && <p className="text-sm text-red-600">{measureError}</p>}
          {measurement && (
            <StressResult t={t} sentence={sentence} variant={variant} measurement={measurement} />
          )}

          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={handleRetry}
              className="rounded-lg bg-slate-200 px-6 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-300"
            >
              {t.tryAgain}
            </button>
            <button
              onClick={handleNewExercise}
              className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
            >
              {t.newSentence}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function StressResult({
  t,
  sentence,
  variant,
  measurement,
}: {
  t: Translations;
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
              {isTarget && <span className="text-[9px] font-semibold text-indigo-500">{t.target}</span>}
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
        {isCorrect ? t.correctVerdict(targetWord) : t.wrongVerdict(measuredWord, targetWord)}
      </p>
      <p className="text-center text-[11px] text-slate-400">
        {t.approximateNote}
      </p>
    </div>
  );
}
