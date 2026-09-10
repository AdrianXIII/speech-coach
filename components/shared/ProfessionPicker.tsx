"use client";

import type { CaseProfession } from "@/lib/caseStudyContent";
import type { LanguageCode } from "@/lib/languages";

/** Canonical English labels — used as the fallback and as the identity entry for "en". */
export const PROFESSION_LABELS: Record<CaseProfession, { label: string; blurb: string }> = {
  business: { label: "Business", blurb: "Strategy, finance, marketing, operations, and more." },
  law: { label: "Law", blurb: "Contract, corporate, litigation, criminal, and regulatory cases." },
  politics: { label: "Politics", blurb: "Foreign policy, domestic policy, crisis response, and negotiation." },
};

const PROFESSION_LABELS_BY_LANGUAGE: Record<CaseProfession, Partial<Record<LanguageCode, { label: string; blurb: string }>>> = {
  business: {
    de: { label: "Wirtschaft", blurb: "Strategie, Finanzen, Marketing, Operations und mehr." },
    fr: { label: "Affaires", blurb: "Stratégie, finance, marketing, opérations et plus encore." },
    es: { label: "Negocios", blurb: "Estrategia, finanzas, marketing, operaciones y más." },
    sv: { label: "Näringsliv", blurb: "Strategi, finans, marknadsföring, operations och mer." },
  },
  law: {
    de: { label: "Recht", blurb: "Vertrags-, Gesellschafts-, Prozess-, Straf- und Verwaltungsrecht." },
    fr: { label: "Droit", blurb: "Droit des contrats, des sociétés, contentieux, pénal et réglementaire." },
    es: { label: "Derecho", blurb: "Derecho contractual, societario, litigios, penal y regulatorio." },
    sv: { label: "Juridik", blurb: "Avtalsrätt, bolagsrätt, tvister, straffrätt och reglering." },
  },
  politics: {
    de: { label: "Politik", blurb: "Außenpolitik, Innenpolitik, Krisenreaktion und Verhandlung." },
    fr: { label: "Politique", blurb: "Politique étrangère, politique intérieure, gestion de crise et négociation." },
    es: { label: "Política", blurb: "Política exterior, política interior, respuesta a crisis y negociación." },
    sv: { label: "Politik", blurb: "Utrikespolitik, inrikespolitik, krisrespons och förhandling." },
  },
};

/** The label/blurb shown to the user for a profession in the given language, falling back to English. */
export function professionLabel(profession: CaseProfession, language: LanguageCode): { label: string; blurb: string } {
  return PROFESSION_LABELS_BY_LANGUAGE[profession][language] ?? PROFESSION_LABELS[profession];
}

/** Shared first step of the Area → Domain → Case flow — used by the AI Tutor. */
export function ProfessionPicker({
  language,
  onSelect,
}: {
  language: LanguageCode;
  onSelect: (p: CaseProfession) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
        Choose a profession
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        {(Object.keys(PROFESSION_LABELS) as CaseProfession[]).map((p) => {
          const { label, blurb } = professionLabel(p, language);
          return (
            <button
              key={p}
              onClick={() => onSelect(p)}
              className="flex flex-col gap-1.5 rounded-xl border border-hairline bg-surface-2 p-5 text-left transition-colors hover:border-brass"
            >
              <span className="font-display text-lg font-semibold text-ink">{label}</span>
              <span className="text-xs text-ink-muted">{blurb}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
