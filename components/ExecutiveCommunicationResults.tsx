"use client";

import { useState } from "react";
import { SCORE_KEYS, type ExecCommAttempt, type ExecCommResult, type ScoreKey } from "@/lib/executiveCommTypes";
import type { StructureModel } from "@/lib/structureModels";
import { useLanguage } from "@/components/LanguageProvider";
import { getLanguage, type LanguageCode } from "@/lib/languages";

const T: Record<LanguageCode, {
  mockBanner: string;
  overall: string;
  before: string;
  now: string;
  dimensions: Record<ScoreKey, string>;
  ledWithConclusion: string;
  buriedIt: string;
  covered: string;
  missing: string;
  hedgingFound: string;
  noHedging: string;
  transcript: string;
  strengths: string;
  tips: string;
  strongRewrite: string;
  strongRewriteHint: string;
  listen: string;
  stop: string;
  retrySame: string;
  retryHint: string;
  newScenario: string;
  progress: string;
  attempts: string;
  average: string;
  best: string;
  scoreLabel: (score: number) => string;
}> = {
  en: {
    mockBanner: "Showing mock results — set GEMINI_API_KEY to see real grading.",
    overall: "Overall score",
    before: "Before",
    now: "Now",
    dimensions: {
      bluf: "Bottom line first",
      structure: "Structure",
      conciseness: "Conciseness",
      specificity: "Specificity",
      confidence: "Confident language",
      closing: "Clear close / ask",
    },
    ledWithConclusion: "Led with the conclusion",
    buriedIt: "Conclusion came too late",
    covered: "Covered",
    missing: "Missing",
    hedgingFound: "Hedging phrases you used",
    noHedging: "No hedging — you owned your message.",
    transcript: "Transcript",
    strengths: "Strengths",
    tips: "For your next attempt",
    strongRewrite: "A Stronger Version",
    strongRewriteHint: "Same content, restructured — listen, then try to say it your way.",
    listen: "🔊 Listen",
    stop: "⏹ Stop",
    retrySame: "🔁 Try again — same scenario",
    retryHint: "The fastest way to improve: apply the feedback right away and compare.",
    newScenario: "New scenario",
    progress: "Your progress",
    attempts: "attempts",
    average: "average",
    best: "best",
    scoreLabel: (s) => (s >= 85 ? "Excellent" : s >= 70 ? "Strong" : s >= 55 ? "Getting there" : s >= 40 ? "Needs work" : "Keep practicing"),
  },
  de: {
    mockBanner: "Mock-Ergebnisse — setze GEMINI_API_KEY für echte Bewertung.",
    overall: "Gesamtpunktzahl",
    before: "Vorher",
    now: "Jetzt",
    dimensions: {
      bluf: "Kernaussage zuerst",
      structure: "Struktur",
      conciseness: "Prägnanz",
      specificity: "Konkretheit",
      confidence: "Selbstsichere Sprache",
      closing: "Klarer Abschluss",
    },
    ledWithConclusion: "Mit der Kernaussage begonnen",
    buriedIt: "Kernaussage kam zu spät",
    covered: "Abgedeckt",
    missing: "Fehlend",
    hedgingFound: "Abschwächende Formulierungen",
    noHedging: "Keine Abschwächungen — du stehst zu deiner Aussage.",
    transcript: "Transkript",
    strengths: "Stärken",
    tips: "Für deinen nächsten Versuch",
    strongRewrite: "Eine stärkere Version",
    strongRewriteHint: "Gleicher Inhalt, neu strukturiert — anhören und dann auf deine Art sagen.",
    listen: "🔊 Anhören",
    stop: "⏹ Stopp",
    retrySame: "🔁 Nochmal — gleiches Szenario",
    retryHint: "Der schnellste Weg zur Verbesserung: Feedback sofort umsetzen und vergleichen.",
    newScenario: "Neues Szenario",
    progress: "Dein Fortschritt",
    attempts: "Versuche",
    average: "Durchschnitt",
    best: "Bestwert",
    scoreLabel: (s) => (s >= 85 ? "Ausgezeichnet" : s >= 70 ? "Stark" : s >= 55 ? "Auf gutem Weg" : s >= 40 ? "Ausbaufähig" : "Weiter üben"),
  },
  fr: {
    mockBanner: "Résultats fictifs — définissez GEMINI_API_KEY pour une évaluation réelle.",
    overall: "Score global",
    before: "Avant",
    now: "Maintenant",
    dimensions: {
      bluf: "L'essentiel d'abord",
      structure: "Structure",
      conciseness: "Concision",
      specificity: "Précision",
      confidence: "Langage assuré",
      closing: "Conclusion claire",
    },
    ledWithConclusion: "A commencé par la conclusion",
    buriedIt: "La conclusion est arrivée trop tard",
    covered: "Couvert",
    missing: "Manquant",
    hedgingFound: "Formules hésitantes utilisées",
    noHedging: "Aucune hésitation — vous assumez votre message.",
    transcript: "Transcription",
    strengths: "Points forts",
    tips: "Pour votre prochain essai",
    strongRewrite: "Une version plus forte",
    strongRewriteHint: "Même contenu, restructuré — écoutez, puis dites-le à votre façon.",
    listen: "🔊 Écouter",
    stop: "⏹ Arrêter",
    retrySame: "🔁 Réessayer — même scénario",
    retryHint: "Le moyen le plus rapide de progresser : appliquer le retour tout de suite et comparer.",
    newScenario: "Nouveau scénario",
    progress: "Votre progression",
    attempts: "essais",
    average: "moyenne",
    best: "meilleur",
    scoreLabel: (s) => (s >= 85 ? "Excellent" : s >= 70 ? "Solide" : s >= 55 ? "En bonne voie" : s >= 40 ? "À travailler" : "Continuez"),
  },
  es: {
    mockBanner: "Mostrando resultados simulados — define GEMINI_API_KEY para una evaluación real.",
    overall: "Puntuación global",
    before: "Antes",
    now: "Ahora",
    dimensions: {
      bluf: "Lo esencial primero",
      structure: "Estructura",
      conciseness: "Concisión",
      specificity: "Concreción",
      confidence: "Lenguaje seguro",
      closing: "Cierre claro",
    },
    ledWithConclusion: "Empezó con la conclusión",
    buriedIt: "La conclusión llegó tarde",
    covered: "Cubierto",
    missing: "Faltante",
    hedgingFound: "Expresiones de duda que usaste",
    noHedging: "Sin dudas — defendiste tu mensaje.",
    transcript: "Transcripción",
    strengths: "Puntos fuertes",
    tips: "Para tu próximo intento",
    strongRewrite: "Una versión más sólida",
    strongRewriteHint: "Mismo contenido, reestructurado — escúchalo y luego dilo a tu manera.",
    listen: "🔊 Escuchar",
    stop: "⏹ Detener",
    retrySame: "🔁 Otra vez — mismo escenario",
    retryHint: "La forma más rápida de mejorar: aplica los comentarios enseguida y compara.",
    newScenario: "Nuevo escenario",
    progress: "Tu progreso",
    attempts: "intentos",
    average: "promedio",
    best: "mejor",
    scoreLabel: (s) => (s >= 85 ? "Excelente" : s >= 70 ? "Sólido" : s >= 55 ? "Vas bien" : s >= 40 ? "A mejorar" : "Sigue practicando"),
  },
  sv: {
    mockBanner: "Visar mockresultat — sätt GEMINI_API_KEY för riktig bedömning.",
    overall: "Totalpoäng",
    before: "Före",
    now: "Nu",
    dimensions: {
      bluf: "Slutsatsen först",
      structure: "Struktur",
      conciseness: "Koncishet",
      specificity: "Konkretion",
      confidence: "Självsäkert språk",
      closing: "Tydlig avslutning",
    },
    ledWithConclusion: "Ledde med slutsatsen",
    buriedIt: "Slutsatsen kom för sent",
    covered: "Täckte in",
    missing: "Saknades",
    hedgingFound: "Osäkra uttryck du använde",
    noHedging: "Inga osäkra uttryck — du stod för ditt budskap.",
    transcript: "Transkript",
    strengths: "Styrkor",
    tips: "Till nästa försök",
    strongRewrite: "En starkare version",
    strongRewriteHint: "Samma innehåll, omstrukturerat — lyssna och säg det sedan på ditt sätt.",
    listen: "🔊 Lyssna",
    stop: "⏹ Stoppa",
    retrySame: "🔁 Försök igen — samma scenario",
    retryHint: "Snabbaste vägen till förbättring: använd feedbacken direkt och jämför.",
    newScenario: "Nytt scenario",
    progress: "Din utveckling",
    attempts: "försök",
    average: "snitt",
    best: "bästa",
    scoreLabel: (s) => (s >= 85 ? "Utmärkt" : s >= 70 ? "Starkt" : s >= 55 ? "På god väg" : s >= 40 ? "Behöver jobbas på" : "Fortsätt öva"),
  },
};

interface ExecutiveCommunicationResultsProps {
  results: ExecCommResult;
  previousResult: ExecCommResult | null;
  model: StructureModel;
  history: ExecCommAttempt[];
  onRetrySame: () => void;
  onNewScenario: () => void;
}

export function ExecutiveCommunicationResults({
  results,
  previousResult,
  model,
  history,
  onRetrySame,
  onNewScenario,
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

  const notes: Record<ScoreKey, string> = {
    bluf: results.bluf.note,
    structure: results.structure.note,
    conciseness: results.conciseness.note,
    specificity: results.specificity.note,
    confidence: results.confidence.note,
    closing: results.closing.note,
  };

  const delta = previousResult ? results.overallScore - previousResult.overallScore : null;

  return (
    <div className="flex flex-col gap-6">
      {results.mocked && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">{t.mockBanner}</div>
      )}

      {/* Overall score, with before/after when this was a retry */}
      <div className="flex flex-col items-center gap-5 rounded-2xl border border-hairline bg-gradient-to-br from-surface to-surface-2 p-8 shadow-sm sm:flex-row sm:justify-between">
        <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
          <p className="text-xs font-semibold uppercase tracking-widest text-brass-text">{t.overall}</p>
          <h2 className="mt-1 text-lg font-bold text-ink">{t.scoreLabel(results.overallScore)}</h2>
          {previousResult && delta !== null && (
            <p className="mt-2 text-sm text-ink-muted">
              {t.before} {previousResult.overallScore} → {t.now} {results.overallScore}{" "}
              <span className={`font-bold ${delta > 0 ? "text-emerald-700" : delta < 0 ? "text-red-600" : "text-ink-muted"}`}>
                ({delta > 0 ? "+" : ""}
                {delta})
              </span>
            </p>
          )}
        </div>
        <ScoreRing score={results.overallScore} />
      </div>

      {/* Six dimensions */}
      <div className="flex flex-col gap-4 rounded-2xl border border-hairline bg-surface p-6 shadow-sm">
        {SCORE_KEYS.map((key) => {
          const score = results.scores[key];
          const prev = previousResult?.scores[key];
          const d = prev !== undefined ? score - prev : null;
          return (
            <div key={key} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-ink">
                  {t.dimensions[key]}
                  {key === "structure" ? ` (${model.name})` : ""}
                </span>
                <span className="font-mono text-sm tabular-nums text-ink">
                  {score}/10
                  {d !== null && d !== 0 && (
                    <span className={`ml-1.5 text-xs font-bold ${d > 0 ? "text-emerald-700" : "text-red-600"}`}>
                      {d > 0 ? "+" : ""}
                      {d}
                    </span>
                  )}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-surface-2">
                <div
                  className={`h-full rounded-full ${score >= 7 ? "bg-emerald-500" : score >= 4 ? "bg-amber-500" : "bg-red-500"}`}
                  style={{ width: `${score * 10}%` }}
                />
              </div>

              {key === "bluf" && (
                <p className={`text-xs font-semibold ${results.bluf.ledWithConclusion ? "text-emerald-700" : "text-amber-700"}`}>
                  {results.bluf.ledWithConclusion ? `✓ ${t.ledWithConclusion}` : `⚠ ${t.buriedIt}`}
                </p>
              )}
              {key === "structure" && (
                <>
                  {results.structure.followedPhases.length > 0 && (
                    <p className="text-xs text-emerald-700">
                      {t.covered}: {results.structure.followedPhases.join(", ")}
                    </p>
                  )}
                  {results.structure.missingPhases.length > 0 && (
                    <p className="text-xs text-amber-700">
                      {t.missing}: {results.structure.missingPhases.join(", ")}
                    </p>
                  )}
                </>
              )}
              {key === "confidence" &&
                (results.confidence.hedgingPhrases.length > 0 ? (
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-xs text-ink-muted">{t.hedgingFound}:</span>
                    {results.confidence.hedgingPhrases.map((p) => (
                      <span key={p} className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-900">
                        &ldquo;{p}&rdquo;
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs font-semibold text-emerald-700">✓ {t.noHedging}</p>
                ))}

              {notes[key] && <p className="text-sm text-ink-muted">{notes[key]}</p>}
            </div>
          );
        })}
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

      <div className="rounded-2xl border border-hairline bg-surface p-6 shadow-sm">
        <h3 className="mb-3 text-sm font-semibold text-ink">{t.transcript}</h3>
        <p className="text-[15px] leading-relaxed text-ink-muted">{results.transcript}</p>
      </div>

      {history.length > 0 && <ProgressPanel history={history} t={t} />}

      <div className="flex flex-col items-center gap-2">
        <button
          onClick={() => {
            handleStop();
            onRetrySame();
          }}
          className="rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
        >
          {t.retrySame}
        </button>
        <p className="text-center text-xs text-ink-muted">{t.retryHint}</p>
        <button
          onClick={() => {
            handleStop();
            onNewScenario();
          }}
          className="mt-1 rounded-lg bg-surface-2 px-6 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-hairline"
        >
          {t.newScenario}
        </button>
      </div>
    </div>
  );
}

function ScoreRing({ score }: { score: number }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(100, Math.max(0, score)) / 100) * circumference;
  const ringColor = score >= 70 ? "stroke-emerald-500" : score >= 50 ? "stroke-amber-500" : "stroke-red-500";
  return (
    <div className="relative flex h-32 w-32 shrink-0 items-center justify-center">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={radius} fill="none" strokeWidth="10" className="stroke-surface-2" />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={`${ringColor} transition-[stroke-dashoffset] duration-700 ease-out`}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-extrabold tabular-nums text-ink">{score}</span>
        <span className="text-xs font-medium text-ink-muted">/ 100</span>
      </div>
    </div>
  );
}

function ProgressPanel({
  history,
  t,
}: {
  history: ExecCommAttempt[];
  t: { progress: string; attempts: string; average: string; best: string };
}) {
  // API returns newest first; chart reads left (oldest) to right (newest).
  const recent = history.slice(0, 12).reverse();
  const scores = history.map((a) => a.overallScore);
  const average = Math.round(scores.reduce((s, v) => s + v, 0) / scores.length);
  const best = Math.max(...scores);

  return (
    <div className="rounded-2xl border border-hairline bg-surface p-6 shadow-sm">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-sm font-semibold text-ink">{t.progress}</h3>
        <p className="text-xs text-ink-muted">
          {history.length} {t.attempts} · {t.average} {average} · {t.best} {best}
        </p>
      </div>
      <div className="mt-4 flex h-24 items-end gap-1.5">
        {recent.map((a) => (
          <div key={a.id} className="flex flex-1 flex-col items-center gap-1">
            <div
              className={`w-full rounded-t ${a.overallScore >= 70 ? "bg-emerald-500" : a.overallScore >= 50 ? "bg-amber-500" : "bg-red-400"}`}
              style={{ height: `${Math.max(4, a.overallScore)}%` }}
              title={`${a.overallScore}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function FeedbackList({ title, items, tone }: { title: string; items: string[]; tone: "positive" | "improve" }) {
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
