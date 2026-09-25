"use client";

import { useState } from "react";
import type { ExecCommResult } from "@/lib/executiveCommEngine";
import type { StructureModel } from "@/lib/structureModels";
import { useLanguage } from "@/components/LanguageProvider";
import { getLanguage, type LanguageCode } from "@/lib/languages";

const T: Record<LanguageCode, {
  mockBanner: string;
  bluf: string;
  ledWithConclusion: string;
  buriedIt: string;
  structure: string;
  followed: string;
  missing: string;
  conciseness: string;
  tight: string;
  rambled: string;
  transcript: string;
  strengths: string;
  tips: string;
  strongRewrite: string;
  strongRewriteHint: string;
  listen: string;
  stop: string;
  practiceAgain: string;
}> = {
  en: {
    mockBanner: "Showing mock results — set GEMINI_API_KEY to see real grading.",
    bluf: "Bottom Line Up Front",
    ledWithConclusion: "Led with the conclusion",
    buriedIt: "Buried the lede",
    structure: "Structure",
    followed: "Covered",
    missing: "Missing",
    conciseness: "Conciseness",
    tight: "Tight & focused",
    rambled: "Rambled or went on tangents",
    transcript: "Transcript",
    strengths: "Strengths",
    tips: "Areas to Improve",
    strongRewrite: "A Stronger Version",
    strongRewriteHint: "Same content, restructured to lead with the point and follow the framework.",
    listen: "🔊 Listen",
    stop: "⏹ Stop",
    practiceAgain: "🎲 Practice again",
  },
  de: {
    mockBanner: "Mock-Ergebnisse — setze GEMINI_API_KEY für echte Bewertung.",
    bluf: "Bottom Line Up Front",
    ledWithConclusion: "Mit der Kernaussage begonnen",
    buriedIt: "Die Kernaussage kam zu spät",
    structure: "Struktur",
    followed: "Abgedeckt",
    missing: "Fehlend",
    conciseness: "Prägnanz",
    tight: "Klar und fokussiert",
    rambled: "Abgeschweift oder wiederholt",
    transcript: "Transkript",
    strengths: "Stärken",
    tips: "Verbesserungspotenzial",
    strongRewrite: "Eine stärkere Version",
    strongRewriteHint: "Gleicher Inhalt, umstrukturiert mit der Kernaussage zuerst, dem gewählten Modell folgend.",
    listen: "🔊 Anhören",
    stop: "⏹ Stopp",
    practiceAgain: "🎲 Erneut üben",
  },
  fr: {
    mockBanner: "Résultats fictifs — définissez GEMINI_API_KEY pour une évaluation réelle.",
    bluf: "Bottom Line Up Front",
    ledWithConclusion: "A commencé par la conclusion",
    buriedIt: "La conclusion est arrivée trop tard",
    structure: "Structure",
    followed: "Couvert",
    missing: "Manquant",
    conciseness: "Concision",
    tight: "Clair et concentré",
    rambled: "Digressions ou répétitions",
    transcript: "Transcription",
    strengths: "Points forts",
    tips: "Axes d'amélioration",
    strongRewrite: "Une version plus forte",
    strongRewriteHint: "Même contenu, restructuré pour commencer par l'essentiel et suivre le modèle choisi.",
    listen: "🔊 Écouter",
    stop: "⏹ Arrêter",
    practiceAgain: "🎲 Réessayer",
  },
  es: {
    mockBanner: "Mostrando resultados simulados — define GEMINI_API_KEY para una evaluación real.",
    bluf: "Bottom Line Up Front",
    ledWithConclusion: "Empezó con la conclusión",
    buriedIt: "La conclusión llegó tarde",
    structure: "Estructura",
    followed: "Cubierto",
    missing: "Faltante",
    conciseness: "Concisión",
    tight: "Claro y enfocado",
    rambled: "Divagó o se fue por las ramas",
    transcript: "Transcripción",
    strengths: "Puntos fuertes",
    tips: "Áreas de mejora",
    strongRewrite: "Una versión más sólida",
    strongRewriteHint: "Mismo contenido, reestructurado para empezar por lo esencial y seguir el modelo elegido.",
    listen: "🔊 Escuchar",
    stop: "⏹ Detener",
    practiceAgain: "🎲 Practicar de nuevo",
  },
  sv: {
    mockBanner: "Visar mockresultat — sätt GEMINI_API_KEY för riktig bedömning.",
    bluf: "Bottom Line Up Front",
    ledWithConclusion: "Ledde med slutsatsen",
    buriedIt: "Slutsatsen kom för sent",
    structure: "Struktur",
    followed: "Täckte in",
    missing: "Saknades",
    conciseness: "Koncishet",
    tight: "Tight och fokuserat",
    rambled: "Svamlade eller gick på sidospår",
    transcript: "Transkript",
    strengths: "Styrkor",
    tips: "Förbättringsområden",
    strongRewrite: "En starkare version",
    strongRewriteHint: "Samma innehåll, omstrukturerat för att leda med poängen och följa vald modell.",
    listen: "🔊 Lyssna",
    stop: "⏹ Stoppa",
    practiceAgain: "🎲 Öva igen",
  },
};

interface ExecutiveCommunicationResultsProps {
  results: ExecCommResult;
  model: StructureModel;
  onPracticeAgain: () => void;
}

/**
 * Results view for Executive Communication — modeled on DashboardResults.tsx's
 * visual pattern (card stack, two-column strengths/tips) but not sharing its
 * component, since it's tightly coupled to analyzeSpeech's different shape.
 */
export function ExecutiveCommunicationResults({
  results,
  model,
  onPracticeAgain,
}: ExecutiveCommunicationResultsProps) {
  const { language } = useLanguage();
  const t = T[language];
  const [isSpeaking, setIsSpeaking] = useState(false);

  function handleListen() {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(results.strongRewrite);
    utterance.lang = getLanguage(language).speechLang;
    utterance.rate = 0.95;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }

  function handleStop() {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  }

  return (
    <div className="flex flex-col gap-6">
      {results.mocked && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {t.mockBanner}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-hairline bg-surface p-6 shadow-sm">
          <h3 className="mb-2 text-sm font-semibold text-ink">{t.bluf}</h3>
          <p
            className={`text-sm font-semibold ${
              results.bluf.ledWithConclusion ? "text-emerald-700" : "text-amber-700"
            }`}
          >
            {results.bluf.ledWithConclusion ? `✓ ${t.ledWithConclusion}` : `⚠ ${t.buriedIt}`}
          </p>
          <p className="mt-1.5 text-sm text-ink-muted">{results.bluf.note}</p>
        </div>

        <div className="rounded-2xl border border-hairline bg-surface p-6 shadow-sm">
          <h3 className="mb-2 text-sm font-semibold text-ink">
            {t.structure} ({model.name})
          </h3>
          {results.structure.followedPhases.length > 0 && (
            <p className="text-sm text-emerald-700">
              {t.followed}: {results.structure.followedPhases.join(", ")}
            </p>
          )}
          {results.structure.missingPhases.length > 0 && (
            <p className="mt-1 text-sm text-amber-700">
              {t.missing}: {results.structure.missingPhases.join(", ")}
            </p>
          )}
          <p className="mt-1.5 text-sm text-ink-muted">{results.structure.note}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-hairline bg-surface p-6 shadow-sm">
        <h3 className="mb-2 text-sm font-semibold text-ink">{t.conciseness}</h3>
        <p
          className={`text-sm font-semibold ${
            results.conciseness.rambling ? "text-amber-700" : "text-emerald-700"
          }`}
        >
          {results.conciseness.rambling ? `⚠ ${t.rambled}` : `✓ ${t.tight}`}
        </p>
        <p className="mt-1.5 text-sm text-ink-muted">{results.conciseness.note}</p>
      </div>

      <div className="rounded-2xl border border-hairline bg-surface p-6 shadow-sm">
        <h3 className="mb-3 text-sm font-semibold text-ink">{t.transcript}</h3>
        <p className="text-[15px] leading-relaxed text-ink-muted">{results.transcript}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FeedbackList title={t.strengths} items={results.strengths} tone="positive" />
        <FeedbackList title={t.tips} items={results.tips} tone="improve" />
      </div>

      <div className="rounded-2xl border border-hairline bg-surface p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-ink">{t.strongRewrite}</h3>
        <p className="mt-0.5 text-xs text-ink-muted">{t.strongRewriteHint}</p>
        <div className="mt-4 flex flex-col gap-3 rounded-lg border border-hairline bg-surface-2 p-4">
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink">{results.strongRewrite}</p>
          <button
            onClick={isSpeaking ? handleStop : handleListen}
            className="self-start rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
          >
            {isSpeaking ? t.stop : t.listen}
          </button>
        </div>
      </div>

      <button
        onClick={onPracticeAgain}
        className="self-center rounded-lg bg-surface-2 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-hairline"
      >
        {t.practiceAgain}
      </button>
    </div>
  );
}

function FeedbackList({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "positive" | "improve";
}) {
  const toneClasses =
    tone === "positive"
      ? { title: "text-emerald-700", bullet: "bg-emerald-500" }
      : { title: "text-amber-700", bullet: "bg-amber-500" };

  return (
    <div className="rounded-2xl border border-hairline bg-surface p-6 shadow-sm">
      <h3 className={`mb-3 text-sm font-semibold ${toneClasses.title}`}>{title}</h3>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-ink-muted">
            <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${toneClasses.bullet}`} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
