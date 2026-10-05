"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { TrainerIcon, type IconName } from "@/components/shared/TrainerIcons";
import type { ProgressSummary } from "@/lib/trainerActivity";
import type { NavLink } from "@/lib/navTranslations";
import type { LanguageCode } from "@/lib/languages";

const T: Record<
  LanguageCode,
  {
    weeklyGoal: string;
    sessionsOf: (done: number, goal: number) => string;
    streak: string;
    streakUnit: string;
    minutes: string;
    avgScore: string;
    noScoreYet: string;
    recommendedNext: string;
    allCaughtUp: string;
  }
> = {
  en: {
    weeklyGoal: "weekly goal",
    sessionsOf: (done, goal) => `${done} of ${goal} sessions this week`,
    streak: "day streak",
    streakUnit: "days",
    minutes: "minutes",
    avgScore: "avg score",
    noScoreYet: "—",
    recommendedNext: "Recommended next",
    allCaughtUp: "You've used every trainer's free session today — nice work.",
  },
  de: {
    weeklyGoal: "Wochenziel",
    sessionsOf: (done, goal) => `${done} von ${goal} Sitzungen diese Woche`,
    streak: "Tage-Serie",
    streakUnit: "Tage",
    minutes: "Minuten",
    avgScore: "Ø Punktzahl",
    noScoreYet: "—",
    recommendedNext: "Als Nächstes empfohlen",
    allCaughtUp: "Du hast heute jede kostenlose Sitzung genutzt — gut gemacht.",
  },
  fr: {
    weeklyGoal: "objectif hebdo",
    sessionsOf: (done, goal) => `${done} sur ${goal} séances cette semaine`,
    streak: "jours de suite",
    streakUnit: "jours",
    minutes: "minutes",
    avgScore: "score moyen",
    noScoreYet: "—",
    recommendedNext: "Recommandé ensuite",
    allCaughtUp: "Vous avez utilisé la séance gratuite de chaque entraîneur aujourd'hui — bravo.",
  },
  es: {
    weeklyGoal: "meta semanal",
    sessionsOf: (done, goal) => `${done} de ${goal} sesiones esta semana`,
    streak: "días seguidos",
    streakUnit: "días",
    minutes: "minutos",
    avgScore: "puntuación media",
    noScoreYet: "—",
    recommendedNext: "Recomendado a continuación",
    allCaughtUp: "Ya usaste la sesión gratuita de cada entrenador hoy — buen trabajo.",
  },
  sv: {
    weeklyGoal: "veckomål",
    sessionsOf: (done, goal) => `${done} av ${goal} pass denna vecka`,
    streak: "dagars svit",
    streakUnit: "dagar",
    minutes: "minuter",
    avgScore: "snittpoäng",
    noScoreYet: "—",
    recommendedNext: "Rekommenderas härnäst",
    allCaughtUp: "Du har använt varje tränares gratispass idag — snyggt jobbat.",
  },
};

const ICON_BY_HREF: Record<string, IconName> = {
  "/record": "mic",
  "/pronunciation": "chat",
  "/executive-communication": "briefcase",
  "/collocations": "chat",
  "/emphasis": "target",
  "/comprehension": "book",
  "/improv": "clock",
};

const RING_RADIUS = 70;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export function ProgressScreen({ summary, recommended }: { summary: ProgressSummary; recommended: NavLink[] }) {
  const { language } = useLanguage();
  const t = T[language];

  const percent = Math.max(0, Math.min(100, summary.weeklyGoalPercent));
  const dashOffset = RING_CIRCUMFERENCE * (1 - percent / 100);

  return (
    <div className="flex flex-col items-center gap-6 rounded-2xl border border-hairline bg-surface p-8 shadow-sm">
      <div className="relative" style={{ width: 160, height: 160 }}>
        <svg width="160" height="160" viewBox="0 0 160 160">
          <circle cx="80" cy="80" r={RING_RADIUS} fill="none" stroke="var(--color-surface-2)" strokeWidth="14" />
          <circle
            cx="80"
            cy="80"
            r={RING_RADIUS}
            fill="none"
            stroke="url(#progress-ring-grad)"
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={RING_CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            transform="rotate(-90 80 80)"
          />
          <defs>
            <linearGradient id="progress-ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-accent-start)" />
              <stop offset="100%" stopColor="var(--color-accent-end)" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-2xl font-bold text-ink">{percent}%</span>
          <span className="text-[11px] text-ink-muted">{t.weeklyGoal}</span>
        </div>
      </div>
      <p className="text-xs text-ink-muted">{t.sessionsOf(summary.sessionsThisWeek, summary.weeklyGoalSessions)}</p>

      <div className="flex gap-2">
        <StatChip value={String(summary.streakDays)} label={t.streak} />
        <StatChip value={String(summary.minutesThisWeek)} label={t.minutes} />
        <StatChip value={summary.avgScore === null ? t.noScoreYet : String(summary.avgScore)} label={t.avgScore} />
      </div>

      {recommended.length > 0 && (
        <div className="flex w-full flex-col gap-2">
          <h2 className="text-[10px] font-semibold uppercase tracking-wide text-ink-muted">{t.recommendedNext}</h2>
          {recommended.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 rounded-2xl border border-hairline bg-surface-2 p-3.5 transition-colors hover:border-brass"
            >
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-[14px] bg-[linear-gradient(135deg,var(--color-accent-start),var(--color-accent-end))]">
                <TrainerIcon name={ICON_BY_HREF[link.href] ?? "mic"} className="text-cream" />
              </span>
              <span>
                <span className="block font-display text-sm font-semibold text-ink">{link.labels[language]}</span>
                <span className="block text-xs text-ink-muted">{link.descriptions[language]}</span>
              </span>
            </Link>
          ))}
        </div>
      )}
      {recommended.length === 0 && <p className="text-sm text-ink-muted">{t.allCaughtUp}</p>}
    </div>
  );
}

function StatChip({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl bg-surface-2 px-3.5 py-2 text-center">
      <div className="font-display text-base font-bold text-ink">{value}</div>
      <div className="text-[9px] text-ink-muted">{label}</div>
    </div>
  );
}
