"use client";

import { useEffect, useState } from "react";
import { CASE_CATEGORIES, casesForCategory, type CaseProfession } from "@/lib/caseStudyContent";
import { getFundamentals } from "@/lib/caseStudyFundamentals";
import { loadFundamentalScores, countMastered } from "@/lib/caseStudyProgress";
import { PROFESSION_LABELS } from "@/components/shared/ProfessionPicker";

/** Shared second step of the Area → Domain → Case flow, used by Case Studies and the AI Tutor. */
export function CategoryPicker({
  profession,
  onSelect,
  onBack,
}: {
  profession: CaseProfession;
  onSelect: (category: string) => void;
  onBack: () => void;
}) {
  const [scores, setScores] = useState<Record<string, number>>({});
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setScores(loadFundamentalScores());
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
          {PROFESSION_LABELS[profession].label} — choose a category
        </p>
        <button onClick={onBack} className="text-xs font-semibold text-brass-text hover:underline">
          ← Change profession
        </button>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {CASE_CATEGORIES[profession].map((cat) => {
          const count = casesForCategory(profession, cat).length;
          const fundamentals = getFundamentals(profession, cat);
          const mastered = fundamentals.length ? countMastered(scores, fundamentals.map((f) => f.id)) : 0;
          return (
            <button
              key={cat}
              onClick={() => onSelect(cat)}
              className="flex items-center justify-between rounded-lg border border-hairline bg-surface-2 px-4 py-3 text-left transition-colors hover:border-brass"
            >
              <span className="text-sm font-semibold text-ink">{cat}</span>
              <span className="text-xs text-ink-muted">
                {fundamentals.length
                  ? `${mastered}/${fundamentals.length} fundamentals mastered`
                  : `${count} case${count === 1 ? "" : "s"}`}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
