"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { NAV_GROUPS, LANDING_COPY } from "@/lib/navTranslations";

/**
 * The app's entry point: a "what do you want to practice?" chooser instead
 * of dropping straight into Record & Analyze (which now lives at /record).
 * Reuses NAV_GROUPS as the single source of truth for feature grouping and
 * translated copy, so this and the nav can never drift out of sync.
 */
export default function Home() {
  const { language } = useLanguage();
  const copy = LANDING_COPY[language];

  return (
    <div className="min-h-screen bg-paper px-4 py-12 sm:px-8">
      <div className="mx-auto flex max-w-4xl flex-col gap-10">
        <header className="text-center">
          <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">{copy.title}</h1>
          <div className="mx-auto mt-3 h-px w-10 bg-brass" />
          <p className="mt-3 text-sm text-ink-muted">{copy.subtitle}</p>
        </header>

        <div className="flex flex-col gap-8">
          {NAV_GROUPS.map((group) => (
            <section key={group.label.en}>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-muted">
                {group.label[language]}
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {group.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group flex flex-col gap-2 rounded-2xl border border-hairline bg-surface p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brass/60 hover:shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl" aria-hidden="true">
                        {link.icon}
                      </span>
                      <span className="font-display text-lg font-semibold text-ink group-hover:text-brass-text">
                        {link.labels[language]}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-ink-muted">{link.descriptions[language]}</p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
