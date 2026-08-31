"use client";

import { useLanguage } from "@/components/LanguageProvider";
import type { LanguageCode } from "@/lib/languages";

interface PageHeaderProps {
  title: Record<LanguageCode, string>;
  subtitle: Record<LanguageCode, string>;
}

/**
 * Shared page header for every trainer page — a thin client boundary so the
 * h1/subtitle can follow the app-wide language picker even though the pages
 * themselves are Server Components.
 */
export function PageHeader({ title, subtitle }: PageHeaderProps) {
  const { language } = useLanguage();
  return (
    <header className="text-center">
      <h1 className="text-2xl font-bold text-slate-900">{title[language]}</h1>
      <p className="mt-1 text-sm text-slate-500">{subtitle[language]}</p>
    </header>
  );
}
