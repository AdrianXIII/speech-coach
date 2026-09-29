"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CASE_CATEGORIES, casesForCategory, type CaseProfession } from "@/lib/caseStudyContent";
import { getFundamentals } from "@/lib/caseStudyFundamentals";
import { loadFundamentalScores, countMastered } from "@/lib/caseStudyProgress";
import { professionLabel } from "@/components/shared/ProfessionPicker";
import { categoryLabel } from "@/lib/categoryLabels";
import type { LanguageCode } from "@/lib/languages";
import { tutorUI } from "@/lib/tutorUIStrings";
import { isFreeAiTutorCategory } from "@/lib/usageLimit";

const LOCK_LABEL: Record<LanguageCode, string> = {
  en: "Premium",
  de: "Premium",
  fr: "Premium",
  es: "Premium",
  sv: "Premium",
};

/** Shared second step of the Area → Domain → Case flow — used by the AI Tutor. */
export function CategoryPicker({
  profession,
  language,
  isPremium,
  onSelect,
  onBack,
}: {
  profession: CaseProfession;
  language: LanguageCode;
  /** Free accounts can only open the 3 starter categories per profession (lib/usageLimit.ts) — the rest render locked. */
  isPremium: boolean;
  onSelect: (category: string) => void;
  onBack: () => void;
}) {
  const ui = tutorUI(language);
  const [scores, setScores] = useState<Record<string, number>>({});
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setScores(loadFundamentalScores());
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
          {professionLabel(profession, language).label} — {ui.chooseCategory}
        </p>
        <button onClick={onBack} className="text-xs font-semibold text-brass-text hover:underline">
          {ui.changeProfession}
        </button>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {CASE_CATEGORIES[profession].map((cat) => {
          const count = casesForCategory(profession, cat).length;
          const fundamentals = getFundamentals(profession, cat);
          const mastered = fundamentals.length ? countMastered(scores, fundamentals.map((f) => f.id)) : 0;
          const locked = !isPremium && !isFreeAiTutorCategory(profession, cat);
          const content = (
            <>
              <span className="flex items-center gap-1.5 text-sm font-semibold text-ink">
                {locked && <span aria-hidden="true">🔒</span>}
                {categoryLabel(cat, language)}
              </span>
              <span className="text-xs text-ink-muted">
                {locked
                  ? LOCK_LABEL[language]
                  : fundamentals.length
                    ? ui.fundamentalsMastered(mastered, fundamentals.length)
                    : ui.cases(count)}
              </span>
            </>
          );
          return locked ? (
            <Link
              key={cat}
              href="/pricing"
              className="flex items-center justify-between rounded-lg border border-hairline bg-surface-2 px-4 py-3 text-left opacity-60 transition-colors hover:border-brass hover:opacity-100"
            >
              {content}
            </Link>
          ) : (
            <button
              key={cat}
              onClick={() => onSelect(cat)}
              className="flex items-center justify-between rounded-lg border border-hairline bg-surface-2 px-4 py-3 text-left transition-colors hover:border-brass"
            >
              {content}
            </button>
          );
        })}
      </div>
    </div>
  );
}
