"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_GROUPS } from "@/lib/navTranslations";
import { LANGUAGES } from "@/lib/languages";
import { useLanguage } from "@/components/LanguageProvider";

export function NavBar() {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  // A link tap should close the menu instead of leaving it open over the
  // next page — pathname changing is the signal a navigation happened.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav className="border-b border-navy-800 bg-navy">
      <div className="mx-auto max-w-4xl px-4 sm:px-8">
        {/* Mobile: logo + hamburger only, full nav collapses into a toggled
            panel below — the unconstrained flex-wrap layout below (built for
            desktop) stacks into 550px+ of vertical space on a phone-width
            screen otherwise, before any page content is visible. */}
        <div className="flex items-center justify-between py-3 sm:hidden">
          <span className="font-display text-base font-semibold tracking-wide text-cream">
            MasterSpeak
          </span>
          <button
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-cream-muted hover:bg-navy-800 hover:text-cream"
          >
            {mobileOpen ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>

        {mobileOpen && (
          <div className="flex flex-col gap-4 pb-4 sm:hidden">
            <div className="flex flex-wrap items-center gap-2">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  className={`rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors ${
                    language === l.code
                      ? "border-brass bg-brass text-navy"
                      : "border-navy-800 text-cream-muted hover:border-brass/60 hover:text-cream"
                  }`}
                >
                  {l.name}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              {NAV_GROUPS.map((group) => (
                <div key={group.label.en} className="flex flex-col gap-1">
                  <span className="px-1 text-[10px] font-semibold uppercase tracking-wide text-cream-muted/70">
                    {group.label[language]}
                  </span>
                  <div className="flex flex-col gap-0.5">
                    {group.links.map((link) => {
                      const active = pathname === link.href;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                            active
                              ? "bg-navy-800 text-brass-soft"
                              : "text-cream-muted hover:bg-navy-800 hover:text-cream"
                          }`}
                        >
                          {link.labels[language]}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Desktop / tablet: unchanged from before — already reads well down to iPad width. */}
        <div className="hidden flex-col gap-2 py-3 sm:flex">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-display text-base font-semibold tracking-wide whitespace-nowrap text-cream">
              MasterSpeak
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  className={`rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors ${
                    language === l.code
                      ? "border-brass bg-brass text-navy"
                      : "border-navy-800 text-cream-muted hover:border-brass/60 hover:text-cream"
                  }`}
                >
                  {l.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-start gap-x-5 gap-y-2">
            {NAV_GROUPS.map((group) => (
              <div key={group.label.en} className="flex flex-col gap-1">
                <span className="px-1 text-[10px] font-semibold uppercase tracking-wide text-cream-muted/70">
                  {group.label[language]}
                </span>
                <div className="flex flex-wrap gap-1">
                  {group.links.map((link) => {
                    const active = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                          active
                            ? "bg-navy-800 text-brass-soft"
                            : "text-cream-muted hover:bg-navy-800 hover:text-cream"
                        }`}
                      >
                        {link.labels[language]}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
