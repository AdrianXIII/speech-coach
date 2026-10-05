"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import type { LanguageCode } from "@/lib/languages";

const T: Record<LanguageCode, { title: string; body: string; cta: string }> = {
  en: {
    title: "You've used today's free session",
    body: "The free plan includes one session per trainer, per day. Subscribe for unlimited use of every trainer.",
    cta: "See subscription options",
  },
  de: {
    title: "Deine kostenlose Sitzung für heute ist aufgebraucht",
    body: "Der kostenlose Plan umfasst eine Sitzung pro Trainer und Tag. Abonniere für unbegrenzte Nutzung aller Trainer.",
    cta: "Abo-Optionen ansehen",
  },
  fr: {
    title: "Vous avez utilisé votre session gratuite d'aujourd'hui",
    body: "Le plan gratuit inclut une session par entraîneur et par jour. Abonnez-vous pour un usage illimité de tous les entraîneurs.",
    cta: "Voir les abonnements",
  },
  es: {
    title: "Ya usaste tu sesión gratuita de hoy",
    body: "El plan gratuito incluye una sesión por entrenador al día. Suscríbete para usar todos los entrenadores sin límite.",
    cta: "Ver opciones de suscripción",
  },
  sv: {
    title: "Du har använt dagens kostnadsfria session",
    body: "Den kostnadsfria planen ger en session per tränare och dag. Prenumerera för obegränsad användning av alla tränare.",
    cta: "Se prenumerationsalternativ",
  },
};

/**
 * Shown instead of a trainer once its once-a-day free use is spent (see
 * lib/usageLimit.ts). Used both by the 3 fully client-side trainers (whose
 * page.tsx checks canUseToday() itself, since they have no server action of
 * their own to gate — collocations, emphasis, improv) and by
 * the API-gated trainers' own components when their route responds 402.
 */
export function DailyLimitReached() {
  const { language } = useLanguage();
  const t = T[language];
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-hairline bg-surface p-8 text-center shadow-sm">
      <h2 className="font-display text-lg font-semibold text-ink">{t.title}</h2>
      <p className="max-w-sm text-sm text-ink-muted">{t.body}</p>
      <Link
        href="/pricing"
        className="mt-2 rounded-full bg-navy px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        {t.cta}
      </Link>
    </div>
  );
}
