"use client";

import type { ReviewWord } from "@/lib/pronunciationReviewSchedule";

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
  if (words.length === 0) {
    return (
      <div className="rounded-2xl border border-hairline bg-surface p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-ink">Review List</h3>
        <p className="mt-2 text-sm text-ink-muted">
          No words in your review list yet — add one above to start practicing it over time.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-hairline bg-surface p-6 shadow-sm">
      <h3 className="text-sm font-semibold text-ink">Review List</h3>
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
            <span
              className={`whitespace-nowrap text-xs font-semibold ${
                w.due ? "text-brass-text" : "text-ink-muted"
              }`}
            >
              {w.due ? "Due today" : `in ${daysUntil(w.nextReviewAt)} days`}
            </span>
            <button
              onClick={() => onRemove(w.id)}
              className="text-xs font-semibold text-red-600 hover:underline"
              aria-label={`Remove ${w.word} from review list`}
            >
              Remove
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
