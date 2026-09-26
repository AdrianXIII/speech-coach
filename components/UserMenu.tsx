"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import type { LanguageCode } from "@/lib/languages";

const T: Record<LanguageCode, { signIn: string; signOut: string }> = {
  en: { signIn: "Sign in", signOut: "Sign out" },
  de: { signIn: "Anmelden", signOut: "Abmelden" },
  fr: { signIn: "Se connecter", signOut: "Se déconnecter" },
  es: { signIn: "Iniciar sesión", signOut: "Cerrar sesión" },
  sv: { signIn: "Logga in", signOut: "Logga ut" },
};

/** Sign-in link or account email + sign-out button, mounted in NavBar. */
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
      {session.user.email && (
        <span className="hidden max-w-[10rem] truncate text-xs text-cream-muted sm:inline">{session.user.email}</span>
      )}
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="rounded-full border border-navy-800 px-2.5 py-1 text-xs font-semibold text-cream-muted transition-colors hover:border-brass/60 hover:text-cream"
      >
        {t.signOut}
      </button>
    </div>
  );
}
