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
      <h1 className="font-display text-2xl font-semibold text-ink">{title[language]}</h1>
      <div className="mx-auto mt-3 h-px w-10 bg-brass" />
      <p className="mt-3 text-sm text-ink-muted">{subtitle[language]}</p>
    </header>
  );
}
