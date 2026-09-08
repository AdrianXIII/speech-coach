"use client";

import { useState } from "react";
import type { CaseProfession } from "@/lib/caseStudyContent";
import { saveTutorProfile, type TutorProfile } from "@/lib/tutorProfile";

const ENTITY_LABEL: Record<CaseProfession, string> = {
  business: "company",
  law: "client organization",
  politics: "organization",
};

/**
 * Lets the student edit their persistent fictive company/client/org (used by
 * Live News mode to keep applied questions consistent across sessions).
 * Saved to localStorage per profession — no backend needed.
 */
export function TutorProfileEditor({
  profession,
  profile,
  onSave,
  onClose,
}: {
  profession: CaseProfession;
  profile: TutorProfile;
  onSave: (profile: TutorProfile) => void;
  onClose: () => void;
}) {
  const [draft, setDraft] = useState<TutorProfile>(profile);

  function handleSave() {
    saveTutorProfile(profession, draft);
    onSave(draft);
    onClose();
  }

  function field(key: keyof TutorProfile, label: string, placeholder: string) {
    return (
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{label}</p>
        <input
          value={draft[key]}
          onChange={(e) => setDraft((d) => ({ ...d, [key]: e.target.value }))}
          placeholder={placeholder}
          className="mt-1 w-full rounded-lg border border-hairline px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-brass focus:outline-none"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-hairline bg-surface-2 p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
        Your fictive {ENTITY_LABEL[profession]}
      </p>
      {field("name", "Name", "e.g. XYZ Corp")}
      {field("description", "Description", "e.g. A mid-sized B2B software company")}
      {field("size", "Size", "e.g. ~500 employees, $80M revenue")}
      {field("market", "Market", "e.g. North America and Western Europe")}
      {field("goals", "Goals", "e.g. Grow the enterprise segment")}
      <div className="flex justify-end gap-2">
        <button
          onClick={onClose}
          className="rounded-lg bg-surface px-4 py-2 text-xs font-semibold text-ink transition-colors hover:bg-hairline"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="rounded-lg bg-navy px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-navy-800"
        >
          Save
        </button>
      </div>
    </div>
  );
}
