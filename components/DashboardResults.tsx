"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import type { AnalyzeSpeechResponse } from "@/types/speechAnalysis";
import type { MispronouncedWord } from "@/lib/analyzeSpeech";
import { IdealVersionCard } from "@/components/IdealVersionCard";
import { FollowUpChat } from "@/components/FollowUpChat";
import { useLanguage } from "@/components/LanguageProvider";
import type { LanguageCode } from "@/lib/languages";

type Strings = {
  mockBanner: string;
  sessionScore: string;
  scoreBasis: string;
  pace: string;
  wpm: string;
  fillerWords: string;
  transcript: string;
  fillersHighlighted: string;
  strengths: string;
  improve: string;
  wordsToPractice: string;
  practiceWord: string;
  scoreLabel: (score: number) => string;
};

const T: Record<LanguageCode, Strings> = {
  en: {
    mockBanner: "Showing mock results — set GEMINI_API_KEY to see real transcription and coaching feedback.",
    sessionScore: "Session Score",
    scoreBasis: "Based on your pace and how often filler words showed up in this recording.",
    pace: "Pace",
    wpm: "wpm",
    fillerWords: "Filler Words",
    transcript: "Transcript",
    fillersHighlighted: "Filler words highlighted above",
    strengths: "Strengths",
    improve: "Areas to Improve",
    wordsToPractice: "Words to Practice",
    practiceWord: "Practice this word in Pronunciation Trainer →",
    scoreLabel: (s) =>
      s >= 90 ? "Excellent delivery" : s >= 75 ? "Great job" : s >= 60 ? "Solid effort" : s >= 40 ? "Needs some work" : "Keep practicing",
  },
  de: {
    mockBanner: "Mock-Ergebnisse — setze GEMINI_API_KEY für echte Transkription und Coaching.",
    sessionScore: "Sitzungswertung",
    scoreBasis: "Basierend auf deinem Tempo und wie oft Füllwörter in dieser Aufnahme vorkamen.",
    pace: "Tempo",
    wpm: "W/Min",
    fillerWords: "Füllwörter",
    transcript: "Transkript",
    fillersHighlighted: "Füllwörter oben hervorgehoben",
    strengths: "Stärken",
    improve: "Verbesserungspotenzial",
    wordsToPractice: "Wörter zum Üben",
    practiceWord: "Dieses Wort im Aussprachetrainer üben →",
    scoreLabel: (s) =>
      s >= 90 ? "Ausgezeichneter Vortrag" : s >= 75 ? "Sehr gut" : s >= 60 ? "Solide Leistung" : s >= 40 ? "Ausbaufähig" : "Weiter üben",
  },
  fr: {
    mockBanner: "Résultats fictifs — définissez GEMINI_API_KEY pour une vraie transcription et un vrai coaching.",
    sessionScore: "Score de la séance",
    scoreBasis: "Basé sur votre débit et la fréquence des mots de remplissage dans cet enregistrement.",
    pace: "Débit",
    wpm: "mots/min",
    fillerWords: "Mots de remplissage",
    transcript: "Transcription",
    fillersHighlighted: "Mots de remplissage surlignés ci-dessus",
    strengths: "Points forts",
    improve: "Axes d'amélioration",
    wordsToPractice: "Mots à travailler",
    practiceWord: "Travailler ce mot dans l'entraîneur de prononciation →",
    scoreLabel: (s) =>
      s >= 90 ? "Excellente prestation" : s >= 75 ? "Très bien" : s >= 60 ? "Bon effort" : s >= 40 ? "À travailler" : "Continuez",
  },
  es: {
    mockBanner: "Mostrando resultados simulados — define GEMINI_API_KEY para ver la transcripción y el coaching reales.",
    sessionScore: "Puntuación de la sesión",
    scoreBasis: "Basada en tu ritmo y en la frecuencia de muletillas en esta grabación.",
    pace: "Ritmo",
    wpm: "ppm",
    fillerWords: "Muletillas",
    transcript: "Transcripción",
    fillersHighlighted: "Muletillas resaltadas arriba",
    strengths: "Puntos fuertes",
    improve: "Áreas de mejora",
    wordsToPractice: "Palabras para practicar",
    practiceWord: "Practica esta palabra en el entrenador de pronunciación →",
    scoreLabel: (s) =>
      s >= 90 ? "Presentación excelente" : s >= 75 ? "Muy bien" : s >= 60 ? "Buen esfuerzo" : s >= 40 ? "A mejorar" : "Sigue practicando",
  },
  sv: {
    mockBanner: "Visar mockresultat — sätt GEMINI_API_KEY för riktig transkribering och coachning.",
    sessionScore: "Sessionspoäng",
    scoreBasis: "Baserat på ditt tempo och hur ofta utfyllnadsord förekom i inspelningen.",
    pace: "Tempo",
    wpm: "ord/min",
    fillerWords: "Utfyllnadsord",
    transcript: "Transkript",
    fillersHighlighted: "Utfyllnadsord markerade ovan",
    strengths: "Styrkor",
    improve: "Förbättringsområden",
    wordsToPractice: "Ord att öva på",
    practiceWord: "Öva på ordet i Uttalstränaren →",
    scoreLabel: (s) =>
      s >= 90 ? "Utmärkt framförande" : s >= 75 ? "Riktigt bra" : s >= 60 ? "Stabil insats" : s >= 40 ? "Behöver jobbas på" : "Fortsätt öva",
  },
};

interface DashboardResultsProps {
  data: AnalyzeSpeechResponse;
}

/**
 * Full results dashboard for a completed analysis: score ring, metric
 * badges, a transcript with filler words highlighted inline, and the AI
 * coach's strengths / areas to improve.
 */
export function DashboardResults({ data }: DashboardResultsProps) {
  const { language } = useLanguage();
  const t = T[language];
  const fillerWords = Object.keys(data.metrics.fillerWordBreakdown);

  return (
    <div className="flex flex-col gap-6">
      {data.mocked && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">{t.mockBanner}</div>
      )}

      <SummaryCard score={data.overallScore} t={t} />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
        <MetricBadge icon={<PaceIcon />} label={t.pace} value={`${data.metrics.wordsPerMinute} ${t.wpm}`} />
        <MetricBadge icon={<FillerIcon />} label={t.fillerWords} value={String(data.metrics.fillerWordCount)} />
      </div>

      <TranscriptCard transcript={data.transcript} fillerWords={fillerWords} t={t} />

      <IdealVersionCard transcript={data.transcript} />

      <div className="grid gap-4 sm:grid-cols-2">
        <FeedbackList title={t.strengths} items={data.feedback.strengths} tone="positive" />
        <FeedbackList title={t.improve} items={data.feedback.tips} tone="improve" />
      </div>

      {data.mispronouncedWords.length > 0 && <MispronunciationCard words={data.mispronouncedWords} t={t} />}

      <div className="rounded-2xl border border-hairline bg-surface p-6 shadow-sm">
        <FollowUpChat
          context={[
            `Here is a transcript of my practice speech:\n"""${data.transcript}"""`,
            "",
            `Metrics: ${data.metrics.wordsPerMinute} words per minute, ${data.metrics.fillerWordCount} filler words.`,
            "I asked for coaching feedback on my delivery.",
          ].join("\n")}
          initialAnswer={[
            "Strengths:",
            ...data.feedback.strengths.map((s) => `- ${s}`),
            "",
            "Areas to improve:",
            ...data.feedback.tips.map((tip) => `- ${tip}`),
          ].join("\n")}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────── Summary / score ─────────────────────────── */

function SummaryCard({ score, t }: { score: number; t: Strings }) {
  return (
    <div className="flex flex-col items-center gap-6 rounded-2xl border border-hairline bg-gradient-to-br from-surface to-surface-2 p-8 shadow-sm sm:flex-row sm:justify-between">
      <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
        <p className="text-xs font-semibold uppercase tracking-widest text-brass-text">{t.sessionScore}</p>
        <h2 className="mt-1 text-lg font-bold text-ink">{t.scoreLabel(score)}</h2>
        <p className="mt-1 max-w-xs text-sm text-ink-muted">{t.scoreBasis}</p>
      </div>
      <ScoreRing score={score} />
    </div>
  );
}

function ScoreRing({ score }: { score: number }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(100, Math.max(0, score)) / 100) * circumference;
  const ringColor = score >= 80 ? "stroke-emerald-500" : score >= 60 ? "stroke-amber-500" : "stroke-red-500";

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

/* ──────────────────────────── Metric badges ──────────────────────────── */

function MetricBadge({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-hairline bg-surface px-4 py-3.5 shadow-sm">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-2 text-brass-text">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted">{label}</p>
        <p className="truncate text-lg font-bold text-ink">{value}</p>
      </div>
    </div>
  );
}

function PaceIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" strokeWidth="2" stroke="currentColor">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FillerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" strokeWidth="2" stroke="currentColor">
      <path
        d="M8 9h8M8 13h5M5 19l2.5-2.5H19a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10.5A2 2 0 0 0 5 19Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ────────────────────────── Transcript, highlighted ────────────────────────── */

function TranscriptCard({ transcript, fillerWords, t }: { transcript: string; fillerWords: string[]; t: Strings }) {
  return (
    <div className="rounded-2xl border border-hairline bg-surface p-6 shadow-sm">
      <h3 className="mb-3 text-sm font-semibold text-ink">{t.transcript}</h3>
      <p className="text-[15px] leading-relaxed text-ink-muted">{highlightFillerWords(transcript, fillerWords)}</p>
      {fillerWords.length > 0 && (
        <p className="mt-4 flex items-center gap-1.5 text-xs text-ink-muted">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-amber-200" />
          {t.fillersHighlighted}
        </p>
      )}
    </div>
  );
}

function highlightFillerWords(transcript: string, fillerWords: string[]): ReactNode {
  if (fillerWords.length === 0) return transcript;

  // Unicode-aware boundaries (see lib/fillerWords.ts) — `\b` misses words
  // like "äh"/"öh" whose first letter isn't ASCII.
  const alternatives = fillerWords
    .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+"))
    .join("|");
  const pattern = new RegExp(`((?<![\\p{L}\\p{N}])(?:${alternatives})(?![\\p{L}\\p{N}]))`, "giu");
  const parts = transcript.split(pattern);
  const fillerSet = new Set(fillerWords.map((w) => w.toLowerCase()));

  return parts.map((part, i) =>
    fillerSet.has(part.toLowerCase().replace(/\s+/g, " ")) ? (
      <mark key={i} className="rounded bg-amber-200/70 px-1 py-0.5 font-medium text-amber-900">
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

/* ─────────────────────────── Feedback lists ─────────────────────────── */

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

/** Up to 5 words Gemini heard as mispronounced in the actual recording (see lib/analyzeSpeech.ts). Each links straight to the Pronunciation trainer with that word pre-filled. */
function MispronunciationCard({ words, t }: { words: MispronouncedWord[]; t: Strings }) {
  return (
    <div className="rounded-2xl border border-hairline bg-surface p-6 shadow-sm">
      <h3 className="mb-3 text-sm font-semibold text-amber-700">{t.wordsToPractice}</h3>
      <ul className="space-y-3">
        {words.map((item, i) => (
          <li key={`${item.word}-${i}`} className="flex flex-col gap-0.5">
            <span className="text-sm font-semibold text-ink">{item.word}</span>
            <span className="text-sm text-ink-muted">{item.note}</span>
            <Link
              href={`/pronunciation?word=${encodeURIComponent(item.word)}`}
              className="mt-1 text-xs font-semibold text-brass-text underline underline-offset-2"
            >
              {t.practiceWord}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
