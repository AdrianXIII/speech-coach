"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Record & Analyze" },
  { href: "/stage", label: "Virtual Stage" },
  { href: "/pronunciation", label: "Pronunciation" },
  { href: "/improv", label: "60s Improv" },
  { href: "/emphasis", label: "Betoning" },
  { href: "/speed-reading", label: "Snabbläsning" },
  { href: "/comprehension", label: "Listening & Summary" },
  { href: "/collocations", label: "Executive Phrasing" },
];

export function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 sm:px-8">
        <span className="text-sm font-bold whitespace-nowrap text-slate-900">Speech Coach</span>
        <div className="flex flex-wrap gap-1">
          {LINKS.map((link) => {
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
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
