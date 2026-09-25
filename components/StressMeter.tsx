"use client";

import { useEffect, useState } from "react";
import { measureSyllableStress, type StressMeasurement } from "@/lib/audioStress";
import type { WordStress } from "@/lib/wordStress";
import { useLanguage } from "@/components/LanguageProvider";
import type { LanguageCode } from "@/lib/languages";

const T: Record<
  LanguageCode,
  {
    measuring: string;
    unsupported: string;
    error: string;
    heading: string;
    shouldStress: string;
    correct: (s: string) => string;
    wrong: (expected: string, measured: string) => string;
    approximate: string;
  }
> = {
  en: {
    measuring: "Measuring stress…",
    unsupported: "No stress data for this word/phrase — try “Get AI Feedback” below instead.",
    error: "Couldn’t measure stress for that recording.",
    heading: "Stress check",
    shouldStress: "should stress",
    correct: (s) => `✅ Nice — you stressed the right syllable ("${s}").`,
    wrong: (e, m) => `Try emphasizing "${e}" more — right now "${m}" is coming out strongest.`,
    approximate: "Approximate — based on volume and pitch, not lab-grade phonetic analysis.",
  },
  de: {
    measuring: "Betonung wird gemessen…",
    unsupported: "Keine Betonungsdaten für dieses Wort — nutze stattdessen „KI-Feedback erhalten“ unten.",
    error: "Die Betonung dieser Aufnahme konnte nicht gemessen werden.",
    heading: "Betonungscheck",
    shouldStress: "betonen",
    correct: (s) => `✅ Gut — du hast die richtige Silbe betont („${s}“).`,
    wrong: (e, m) => `Betone „${e}“ stärker — im Moment klingt „${m}“ am stärksten.`,
    approximate: "Näherungswert — basiert auf Lautstärke und Tonhöhe, keine Laboranalyse.",
  },
  fr: {
    measuring: "Mesure de l'accentuation…",
    unsupported: "Pas de données d'accentuation pour ce mot — utilisez plutôt « Obtenir un retour IA » ci-dessous.",
    error: "Impossible de mesurer l'accentuation de cet enregistrement.",
    heading: "Vérification de l'accent",
    shouldStress: "à accentuer",
    correct: (s) => `✅ Bien — vous avez accentué la bonne syllabe (« ${s} »).`,
    wrong: (e, m) => `Accentuez davantage « ${e} » — pour l'instant « ${m} » ressort le plus.`,
    approximate: "Approximatif — basé sur le volume et la hauteur, pas une analyse phonétique de laboratoire.",
  },
  es: {
    measuring: "Midiendo el acento…",
    unsupported: "No hay datos de acento para esta palabra: usa «Obtener comentarios de la IA» abajo.",
    error: "No se pudo medir el acento de esta grabación.",
    heading: "Comprobación del acento",
    shouldStress: "acentuar",
    correct: (s) => `✅ Bien: acentuaste la sílaba correcta («${s}»).`,
    wrong: (e, m) => `Intenta marcar más «${e}»: ahora mismo «${m}» suena más fuerte.`,
    approximate: "Aproximado: basado en volumen y tono, no en un análisis fonético de laboratorio.",
  },
  sv: {
    measuring: "Mäter betoningen…",
    unsupported: "Ingen betoningsdata för det här ordet — prova ”Få AI-feedback” nedan istället.",
    error: "Kunde inte mäta betoningen i inspelningen.",
    heading: "Betoningskontroll",
    shouldStress: "ska betonas",
    correct: (s) => `✅ Snyggt — du betonade rätt stavelse (”${s}”).`,
    wrong: (e, m) => `Betona ”${e}” mer — just nu låter ”${m}” starkast.`,
    approximate: "Ungefärligt — baserat på volym och tonhöjd, inte en labbanalys.",
  },
};

interface StressMeterProps {
  word: string;
  audioBlob: Blob;
}

/**
 * Instant, local stress check: splits the word into syllables (from the CMU
 * Pronouncing Dictionary), measures loudness/pitch per syllable in the
 * recording (Web Audio API, no network round trip), and shows which
 * syllable actually came out strongest vs. which one should have. No AI
 * call — this is meant to replace reaching for "Get AI Feedback" on every
 * single attempt; that button stays available for a deeper explanation.
 */
export function StressMeter({ word, audioBlob }: StressMeterProps) {
  const { language } = useLanguage();
  const t = T[language];
  const [wordStress, setWordStress] = useState<WordStress | null>(null);
  const [measurement, setMeasurement] = useState<StressMeasurement | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "unsupported" | "error">("loading");

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        const res = await fetch(`/api/word-stress?word=${encodeURIComponent(word)}&lang=${language}`);
        const stress: WordStress = await res.json();
        if (cancelled) return;

        if (!stress.found) {
          setStatus("unsupported");
          return;
        }
        setWordStress(stress);

        const result = await measureSyllableStress(audioBlob, stress.syllableCount);
        if (cancelled) return;
        setMeasurement(result);
        setStatus("ready");
      } catch {
        if (!cancelled) setStatus("error");
      }
    }
    run();

    return () => {
      cancelled = true;
    };
  }, [word, audioBlob, language]);

  if (status === "loading") {
    return <p className="text-sm text-ink-muted">{t.measuring}</p>;
  }
  if (status === "unsupported") {
    return (
      <p className="text-sm text-ink-muted">{t.unsupported}</p>
    );
  }
  if (status === "error" || !wordStress || !measurement) {
    return <p className="text-sm text-ink-muted">{t.error}</p>;
  }

  const expected = wordStress.stressedSyllableIndex;
  const measured = measurement.measuredStressIndex;
  const isCorrect = expected === measured;

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-hairline bg-surface p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{t.heading}</p>

      <div className="flex items-end justify-center gap-3">
        {wordStress.syllables.map((syllable, i) => {
          const syllableMeasurement = measurement.syllables[i];
          const heightPct = Math.round(20 + (syllableMeasurement?.relativeLoudness ?? 0) * 80);
          const isExpected = i === expected;
          const isMeasured = i === measured;

          return (
            <div key={i} className="flex w-16 flex-col items-center gap-1.5">
              {isExpected && <span className="text-[10px] font-semibold text-brass-text">{t.shouldStress}</span>}
              <div className="flex h-20 w-full items-end justify-center rounded-md bg-surface-2">
                <div
                  className={`w-8 rounded-t-md transition-all ${
                    isMeasured ? (isCorrect ? "bg-emerald-500" : "bg-amber-500") : "bg-hairline"
                  }`}
                  style={{ height: `${heightPct}%` }}
                />
              </div>
              <span
                className={`text-sm font-semibold ${isExpected ? "text-brass-text" : "text-ink-muted"}`}
              >
                {syllable}
              </span>
            </div>
          );
        })}
      </div>

      <p className={`text-center text-sm ${isCorrect ? "text-emerald-700" : "text-amber-700"}`}>
        {isCorrect
          ? t.correct(wordStress.syllables[expected])
          : t.wrong(wordStress.syllables[expected], wordStress.syllables[measured])}
      </p>

      <p className="text-center text-[11px] text-ink-muted">
        {t.approximate}
      </p>
    </div>
  );
}
