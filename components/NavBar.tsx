"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Record & Analyze" },
  { href: "/stage", label: "Virtual Stage" },
];

export function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-4xl items-center gap-6 px-4 py-3 sm:px-8">
        <span className="text-sm font-bold text-slate-900">Speech Coach</span>
        <div className="flex gap-1">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
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
