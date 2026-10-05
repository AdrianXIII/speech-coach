"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useLanguage } from "@/components/LanguageProvider";
import { TrainerIcon, type IconName } from "@/components/shared/TrainerIcons";
import type { LanguageCode } from "@/lib/languages";

const T: Record<LanguageCode, { train: string; progress: string; account: string }> = {
  en: { train: "Train", progress: "Progress", account: "Account" },
  de: { train: "Training", progress: "Fortschritt", account: "Konto" },
  fr: { train: "Entraîner", progress: "Progrès", account: "Compte" },
  es: { train: "Entrenar", progress: "Progreso", account: "Cuenta" },
  sv: { train: "Träna", progress: "Framsteg", account: "Konto" },
};

const TABS: { href: string; labelKey: keyof (typeof T)["en"]; icon: IconName }[] = [
  { href: "/", labelKey: "train", icon: "home" },
  { href: "/progress", labelKey: "progress", icon: "chart" },
  { href: "/account", labelKey: "account", icon: "person" },
];

/**
 * Persistent bottom tab bar (Direction E from the mobile-UI design review)
 * — only rendered when signed in, so marketing/auth pages are unaffected.
 * Renders two things together: the fixed bar itself, and an in-flow spacer
 * of the same height so Footer/page content below it isn't hidden behind
 * it — both gated by the same signed-in check so nothing shifts on
 * sign-out. Mounted once in app/layout.tsx, after {children}.
 */
export function TabBar() {
  const { status } = useSession();
  const pathname = usePathname();
  const { language } = useLanguage();
  const t = T[language];

  if (status !== "authenticated") return null;

  return (
    <>
      <div className="h-[calc(64px+env(safe-area-inset-bottom))]" aria-hidden="true" />
      <nav className="fixed inset-x-0 bottom-0 z-40 flex items-start justify-around border-t border-hairline bg-surface px-2 pb-[env(safe-area-inset-bottom)] pt-2.5">
        {TABS.map((tab) => {
          const active = tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
          return (
            <Link key={tab.href} href={tab.href} className="flex flex-col items-center gap-1 px-3 py-1">
              {active ? (
                <span className="flex h-[21px] w-[21px] items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--color-accent-start),var(--color-accent-end))]">
                  <TrainerIcon name={tab.icon} className="h-[13px] w-[13px] text-cream" />
                </span>
              ) : (
                <TrainerIcon name={tab.icon} className="text-ink-muted" />
              )}
              <span className={active ? "text-[9px] font-bold text-ink" : "text-[9px] font-semibold text-ink-muted"}>
                {t[tab.labelKey]}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
