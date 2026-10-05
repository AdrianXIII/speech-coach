"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import type { LanguageCode } from "@/lib/languages";

const T: Record<LanguageCode, { signIn: string; signOut: string; account: string; progress: string }> = {
  en: { signIn: "Sign in", signOut: "Sign out", account: "Account", progress: "Progress" },
  de: { signIn: "Anmelden", signOut: "Abmelden", account: "Konto", progress: "Fortschritt" },
  fr: { signIn: "Se connecter", signOut: "Se déconnecter", account: "Compte", progress: "Progrès" },
  es: { signIn: "Iniciar sesión", signOut: "Cerrar sesión", account: "Cuenta", progress: "Progreso" },
  sv: { signIn: "Logga in", signOut: "Logga ut", account: "Konto", progress: "Framsteg" },
};

/** Sign-in link or sign-out button, mounted in NavBar. */
export function UserMenu() {
  const { data: session, status } = useSession();
  const { language } = useLanguage();
  const t = T[language];

  if (status === "loading") return null;

  if (!session?.user) {
    return (
      <Link
        href="/sign-in"
        className="rounded-full border border-navy-800 px-2.5 py-1 text-xs font-semibold text-cream-muted transition-colors hover:border-brass/60 hover:text-cream"
      >
        {t.signIn}
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {/* Always visible, not just on wide screens — components/TabBar.tsx's
          bottom Progress tab only renders below the md breakpoint, so this
          is the sole path to /progress on tablet/desktop. Harmless light
          redundancy with the tab bar on phones, same as the Account link
          below. */}
      <Link
        href="/progress"
        className="rounded-full border border-navy-800 px-2.5 py-1 text-xs font-semibold text-cream-muted transition-colors hover:border-brass/60 hover:text-cream"
      >
        {t.progress}
      </Link>
      <Link
        href="/account"
        className="rounded-full border border-navy-800 px-2.5 py-1 text-xs font-semibold text-cream-muted transition-colors hover:border-brass/60 hover:text-cream"
      >
        {t.account}
      </Link>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="rounded-full border border-navy-800 px-2.5 py-1 text-xs font-semibold text-cream-muted transition-colors hover:border-brass/60 hover:text-cream"
      >
        {t.signOut}
      </button>
    </div>
  );
}
