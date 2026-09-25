"use client";

import Link from "next/link";
import { LANGUAGES } from "@/lib/languages";
import { useLanguage } from "@/components/LanguageProvider";

/**
 * Just the app title (linking home) and the language picker — no menu, no
 * link list. Every feature page carries its own "back to home" link (see
 * components/BackLink.tsx), so the nav itself doesn't need to double as a
 * navigation hub anymore; the landing page ("/") already owns discovery.
 */
export function NavBar() {
  const { language, setLanguage } = useLanguage();

  return (
    <nav className="border-b border-navy-800 bg-navy pt-[env(safe-area-inset-top)]">
      <div className="mx-auto flex max-w-4xl flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <Link
          href="/"
          className="font-display text-base font-semibold tracking-wide text-cream transition-opacity hover:opacity-80"
        >
          MasterSpeak
        </Link>
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
    </nav>
  );
}
