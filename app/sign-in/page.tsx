"use client";

import { useEffect, useState } from "react";
import { signIn, getProviders } from "next-auth/react";
import { PageHeader } from "@/components/PageHeader";
import { useLanguage } from "@/components/LanguageProvider";
import type { LanguageCode } from "@/lib/languages";

const TITLE: Record<LanguageCode, string> = {
  en: "Sign in",
  de: "Anmelden",
  fr: "Se connecter",
  es: "Iniciar sesión",
  sv: "Logga in",
};

const SUBTITLE: Record<LanguageCode, string> = {
  en: "One account keeps your progress, review lists, and subscription with you across devices.",
  de: "Ein Konto bewahrt deinen Fortschritt, deine Wiederholungslisten und dein Abo geräteübergreifend.",
  fr: "Un compte conserve votre progression, vos listes de révision et votre abonnement sur tous vos appareils.",
  es: "Una cuenta conserva tu progreso, tus listas de repaso y tu suscripción en todos los dispositivos.",
  sv: "Ett konto håller dina framsteg, repetitionslistor och prenumeration med dig på alla enheter.",
};

const T: Record<
  LanguageCode,
  {
    appleButton: string;
    orEmail: string;
    emailPlaceholder: string;
    sendLink: string;
    sending: string;
    checkInbox: (email: string) => string;
    error: string;
  }
> = {
  en: {
    appleButton: "Continue with Apple",
    orEmail: "or continue with email",
    emailPlaceholder: "you@example.com",
    sendLink: "Send sign-in link",
    sending: "Sending…",
    checkInbox: (email) => `Check ${email} for a sign-in link.`,
    error: "Something went wrong. Please try again.",
  },
  de: {
    appleButton: "Weiter mit Apple",
    orEmail: "oder weiter per E-Mail",
    emailPlaceholder: "du@beispiel.de",
    sendLink: "Anmeldelink senden",
    sending: "Wird gesendet…",
    checkInbox: (email) => `Schau in ${email} nach dem Anmeldelink.`,
    error: "Etwas ist schiefgelaufen. Bitte versuche es erneut.",
  },
  fr: {
    appleButton: "Continuer avec Apple",
    orEmail: "ou continuer par e-mail",
    emailPlaceholder: "vous@exemple.fr",
    sendLink: "Envoyer le lien de connexion",
    sending: "Envoi…",
    checkInbox: (email) => `Consultez ${email} pour le lien de connexion.`,
    error: "Une erreur est survenue. Veuillez réessayer.",
  },
  es: {
    appleButton: "Continuar con Apple",
    orEmail: "o continuar por correo",
    emailPlaceholder: "tu@ejemplo.es",
    sendLink: "Enviar enlace de acceso",
    sending: "Enviando…",
    checkInbox: (email) => `Revisa ${email} para ver el enlace de acceso.`,
    error: "Algo salió mal. Inténtalo de nuevo.",
  },
  sv: {
    appleButton: "Fortsätt med Apple",
    orEmail: "eller fortsätt med e-post",
    emailPlaceholder: "du@exempel.se",
    sendLink: "Skicka inloggningslänk",
    sending: "Skickar…",
    checkInbox: (email) => `Kolla ${email} efter en inloggningslänk.`,
    error: "Något gick fel. Försök igen.",
  },
};

export default function SignInPage() {
  const { language } = useLanguage();
  const t = T[language];
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  // Apple's provider is only registered server-side once its four env vars
  // exist (see lib/auth.ts) — checking here instead of assuming it's always
  // present avoids showing a button that would fail the OAuth handshake.
  const [appleAvailable, setAppleAvailable] = useState(false);

  useEffect(() => {
    getProviders().then((providers) => setAppleAvailable(!!providers?.apple));
  }, []);

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setState("sending");
    try {
      const result = await signIn("email", { email: email.trim(), redirect: false });
      setState(result?.error ? "error" : "sent");
    } catch {
      setState("error");
    }
  }

  return (
    <div className="min-h-screen bg-paper px-4 py-12 sm:px-8">
      <div className="mx-auto flex max-w-md flex-col gap-8">
        <PageHeader title={TITLE} subtitle={SUBTITLE} />

        <div className="flex flex-col gap-4 rounded-2xl border border-hairline bg-surface p-6 shadow-sm">
          {appleAvailable && (
            <>
              <button
                onClick={() => signIn("apple")}
                className="flex items-center justify-center gap-2 rounded-lg bg-ink px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                {t.appleButton}
              </button>

              <div className="flex items-center gap-3 text-xs uppercase tracking-wide text-ink-muted">
                <div className="h-px flex-1 bg-hairline" />
                {t.orEmail}
                <div className="h-px flex-1 bg-hairline" />
              </div>
            </>
          )}

          {state === "sent" ? (
            <p className="rounded-lg bg-surface-2 px-4 py-3 text-center text-sm text-ink">{t.checkInbox(email)}</p>
          ) : (
            <form onSubmit={handleEmailSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                className="rounded-lg border border-hairline bg-surface px-4 py-3 text-sm text-ink outline-none focus:border-brass"
              />
              <button
                type="submit"
                disabled={state === "sending"}
                className="rounded-lg border border-hairline bg-surface-2 px-4 py-3 text-sm font-semibold text-ink transition-colors hover:border-brass disabled:opacity-60"
              >
                {state === "sending" ? t.sending : t.sendLink}
              </button>
              {state === "error" && <p className="text-center text-xs text-red-600">{t.error}</p>}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
