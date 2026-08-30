"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/navTranslations";
import { LANGUAGES } from "@/lib/languages";
import { useLanguage } from "@/components/LanguageProvider";

export function NavBar() {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();

  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-4xl flex-col gap-2 px-4 py-3 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-sm font-bold whitespace-nowrap text-slate-900">Speech Coach</span>
          <div className="flex flex-wrap gap-1">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => setLanguage(l.code)}
                className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${
                  language === l.code
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                {l.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                }`}
              >
                {link.labels[language]}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
