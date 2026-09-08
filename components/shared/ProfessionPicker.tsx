"use client";

import type { CaseProfession } from "@/lib/caseStudyContent";

export const PROFESSION_LABELS: Record<CaseProfession, { label: string; blurb: string }> = {
  business: { label: "Business", blurb: "Strategy, finance, marketing, operations, and more." },
  law: { label: "Law", blurb: "Contract, corporate, litigation, criminal, and regulatory cases." },
  politics: { label: "Politics", blurb: "Foreign policy, domestic policy, crisis response, and negotiation." },
};

/** Shared first step of the Area → Domain → Case flow, used by Case Studies and the AI Tutor. */
export function ProfessionPicker({ onSelect }: { onSelect: (p: CaseProfession) => void }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
        Choose a profession
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        {(Object.keys(PROFESSION_LABELS) as CaseProfession[]).map((p) => (
          <button
            key={p}
            onClick={() => onSelect(p)}
            className="flex flex-col gap-1.5 rounded-xl border border-hairline bg-surface-2 p-5 text-left transition-colors hover:border-brass"
          >
            <span className="font-display text-lg font-semibold text-ink">
              {PROFESSION_LABELS[p].label}
            </span>
            <span className="text-xs text-ink-muted">{PROFESSION_LABELS[p].blurb}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
