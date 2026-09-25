"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import type { LanguageCode } from "@/lib/languages";

const T: Record<LanguageCode, string> = {
  en: "Back",
  de: "Zurück",
  fr: "Retour",
  es: "Atrás",
  sv: "Tillbaka",
};

interface BackLinkProps {
  /** Navigates to a URL (defaults to "/", the landing page) — used for page-level back links. */
  href?: string;
  /** Steps back within a trainer's own local state instead of navigating — used for in-flow back buttons (e.g. AITutor's category picker back to its profession picker). Takes precedence over `href` when given. */
  onClick?: () => void;
  label?: string;
}

/**
 * Every feature page's way back to the landing page chooser — the nav bar
 * itself no longer carries a link list (see components/NavBar.tsx), so this
 * is the only path back once you're inside a trainer. Same look whether it
 * navigates (`href`, the common case) or just pops a trainer's own
 * multi-step state back one level (`onClick`).
 */
export function BackLink({ href = "/", onClick, label }: BackLinkProps) {
  const { language } = useLanguage();
  const className =
    "inline-flex items-center gap-1.5 text-sm font-semibold text-ink-muted transition-colors hover:text-ink";
  const content = (
    <>
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
      </svg>
      {label ?? T[language]}
    </>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={className}>
        {content}
      </button>
    );
  }
  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}
