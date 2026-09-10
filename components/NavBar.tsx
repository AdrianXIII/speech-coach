"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_GROUPS } from "@/lib/navTranslations";
import { LANGUAGES } from "@/lib/languages";
import { useLanguage } from "@/components/LanguageProvider";

export function NavBar() {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();

  return (
    <nav className="border-b border-navy-800 bg-navy">
      <div className="mx-auto flex max-w-4xl flex-col gap-2 px-4 py-3 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-display text-base font-semibold tracking-wide whitespace-nowrap text-cream">
            Speech Coach
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
    </nav>
  );
}
