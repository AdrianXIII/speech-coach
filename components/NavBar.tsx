"use client";

import Link from "next/link";
import { LANGUAGES } from "@/lib/languages";
import { useLanguage } from "@/components/LanguageProvider";
import { UserMenu } from "@/components/UserMenu";

/**
 * Just the app title (linking home) and the language picker — no menu, no
 * link list. Every feature page carries its own "back to home" link (see
 * components/BackLink.tsx), so the nav itself doesn't need to double as a
 * navigation hub anymore; the landing page ("/") already owns discovery.
 */
/** The app icon's sound-wave mark (public/icon.svg), inlined so it tints via currentColor instead of carrying its own fixed gradient. */
function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} fill="none" stroke="currentColor" strokeWidth="50" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 120,110 C 150,160 140,200 165,225 C 180,240 195,242 195,256 C 195,270 170,272 160,285 C 145,305 155,340 130,402" />
      <path d="M 285,256 Q 305,256 315,220 T 345,290 T 375,190 T 405,310 T 435,256 L 455,256" />
    </svg>
  );
}

export function NavBar() {
  const { language, setLanguage } = useLanguage();

  return (
    <nav className="border-b border-navy-800 bg-navy pt-[env(safe-area-inset-top)]">
      <div className="mx-auto flex max-w-4xl flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-base font-semibold tracking-wide text-cream transition-opacity hover:opacity-80"
        >
          <LogoMark className="h-7 w-7 flex-none text-brass-soft" />
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
          <UserMenu />
        </div>
      </div>
    </nav>
  );
}
