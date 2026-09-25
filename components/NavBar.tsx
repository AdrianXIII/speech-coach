"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_GROUPS } from "@/lib/navTranslations";
import { LANGUAGES } from "@/lib/languages";
import { useLanguage } from "@/components/LanguageProvider";

/**
 * Deliberately minimal at every breakpoint: logo + a single menu toggle.
 * The old version kept every group/link spelled out at all times (a second
 * full desktop layout, duplicating this one) — that made sense before the
 * landing page existed, but now it's pure noise next to the "what do you
 * want to practice?" chooser at "/", which already does discovery better
 * (icons, descriptions, grouped cards). The nav's job shrank to "get me
 * home" (the logo) and "jump to another tool without going home first"
 * (the menu) — so it's sized for that, not for browsing.
 */
export function NavBar() {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  // A link tap should close the menu instead of leaving it open over the
  // next page — pathname changing is the signal a navigation happened.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuOpen(false);
  }, [pathname]);

  return (
    <nav className="relative border-b border-navy-800 bg-navy pt-[env(safe-area-inset-top)]">
      <div className="mx-auto max-w-4xl px-4 sm:px-8">
        <div className="flex items-center justify-between py-3">
          <Link
            href="/"
            className="font-display text-base font-semibold tracking-wide text-cream transition-opacity hover:opacity-80"
          >
            MasterSpeak
          </Link>
          <button
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-cream-muted transition-colors hover:bg-navy-800 hover:text-cream"
          >
            {menuOpen ? (
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
      </div>

      {menuOpen && (
        <>
          {/* Backdrop: click-outside-to-dismiss, and it visually separates the
              floating panel from page content below instead of pushing it
              down the way the old always-expanded layout did. */}
          <div
            className="fixed inset-0 z-40 bg-navy-800/40 backdrop-blur-[1px]"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 top-full z-50 border-b border-navy-800 bg-navy shadow-xl">
            <div className="mx-auto max-w-4xl px-4 py-5 sm:px-8">
              <div className="flex flex-wrap items-center gap-2 border-b border-navy-800/70 pb-4">
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

              <div className="grid grid-cols-2 gap-x-6 gap-y-5 pt-4 sm:grid-cols-4">
                {NAV_GROUPS.map((group) => (
                  <div key={group.label.en} className="flex flex-col gap-1.5">
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
                            className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium transition-colors ${
                              active
                                ? "bg-navy-800 text-brass-soft"
                                : "text-cream-muted hover:bg-navy-800 hover:text-cream"
                            }`}
                          >
                            <span aria-hidden="true">{link.icon}</span>
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
        </>
      )}
    </nav>
  );
}
