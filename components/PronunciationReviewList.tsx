"use client";

import type { ReviewWord } from "@/lib/pronunciationReviewSchedule";
import { useLanguage } from "@/components/LanguageProvider";
import type { LanguageCode } from "@/lib/languages";

const T: Record<
  LanguageCode,
  { title: string; empty: string; dueToday: string; inDays: (n: number) => string; remove: string; removeLabel: (w: string) => string }
> = {
  en: {
    title: "Review List",
    empty: "No words in your review list yet — add one above to start practicing it over time.",
    dueToday: "Due today",
    inDays: (n) => `in ${n} ${n === 1 ? "day" : "days"}`,
    remove: "Remove",
    removeLabel: (w) => `Remove ${w} from review list`,
  },
  de: {
    title: "Wiederholungsliste",
    empty: "Noch keine Wörter in deiner Wiederholungsliste — füge oben eins hinzu, um es mit der Zeit zu üben.",
    dueToday: "Heute fällig",
    inDays: (n) => `in ${n} ${n === 1 ? "Tag" : "Tagen"}`,
    remove: "Entfernen",
    removeLabel: (w) => `${w} aus der Wiederholungsliste entfernen`,
  },
  fr: {
    title: "Liste de révision",
    empty: "Aucun mot dans votre liste de révision — ajoutez-en un ci-dessus pour le travailler dans le temps.",
    dueToday: "À revoir aujourd'hui",
    inDays: (n) => `dans ${n} ${n === 1 ? "jour" : "jours"}`,
    remove: "Retirer",
    removeLabel: (w) => `Retirer ${w} de la liste de révision`,
  },
  es: {
    title: "Lista de repaso",
    empty: "Aún no hay palabras en tu lista de repaso: añade una arriba para practicarla con el tiempo.",
    dueToday: "Toca hoy",
    inDays: (n) => `en ${n} ${n === 1 ? "día" : "días"}`,
    remove: "Quitar",
    removeLabel: (w) => `Quitar ${w} de la lista de repaso`,
  },
  sv: {
    title: "Repetitionslista",
    empty: "Inga ord i din repetitionslista ännu — lägg till ett ovan för att öva på det över tid.",
    dueToday: "Dags idag",
    inDays: (n) => `om ${n} ${n === 1 ? "dag" : "dagar"}`,
    remove: "Ta bort",
    removeLabel: (w) => `Ta bort ${w} från repetitionslistan`,
  },
};

interface PronunciationReviewListProps {
  words: ReviewWord[];
  onSelect: (word: string) => void;
  onRemove: (id: number) => void;
}

/**
 * Spaced-repetition review list: words the user chose to keep coming back
 * to, due-soonest first (already sorted that way by the API). Purely
 * props-driven — PronunciationTrainer owns the single fetch and all
 * mutations, since it needs the same list for this panel, the "already
 * added" check on its input, and the "Mark practiced" button's visibility.
 */
export function PronunciationReviewList({ words, onSelect, onRemove }: PronunciationReviewListProps) {
  const { language } = useLanguage();
  const t = T[language];

  if (words.length === 0) {
    return (
      <div className="rounded-2xl border border-hairline bg-surface p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-ink">{t.title}</h3>
        <p className="mt-2 text-sm text-ink-muted">{t.empty}</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-hairline bg-surface p-6 shadow-sm">
      <h3 className="text-sm font-semibold text-ink">{t.title}</h3>
      <ul className="mt-3 flex flex-col gap-2">
        {words.map((w) => (
          <li
            key={w.id}
            className="flex items-center justify-between gap-3 rounded-lg border border-hairline bg-surface-2 px-3 py-2"
          >
            <button
              onClick={() => onSelect(w.word)}
              className="flex-1 truncate text-left text-sm font-semibold text-ink hover:text-brass-text"
            >
              {w.word}
            </button>
            <span className={`whitespace-nowrap text-xs font-semibold ${w.due ? "text-brass-text" : "text-ink-muted"}`}>
              {w.due ? t.dueToday : t.inDays(daysUntil(w.nextReviewAt))}
            </span>
            <button
              onClick={() => onRemove(w.id)}
              className="text-xs font-semibold text-red-600 hover:underline"
              aria-label={t.removeLabel(w.word)}
            >
              {t.remove}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function daysUntil(isoDate: string): number {
  const ms = new Date(isoDate).getTime() - Date.now();
  return Math.max(1, Math.round(ms / (24 * 60 * 60 * 1000)));
}
