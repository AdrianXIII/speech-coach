"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { useLanguage } from "@/components/LanguageProvider";
import type { LanguageCode } from "@/lib/languages";

const TITLE: Record<LanguageCode, string> = {
  en: "Reset your password",
  de: "Passwort zurücksetzen",
  fr: "Réinitialiser votre mot de passe",
  es: "Restablecer tu contraseña",
  sv: "Återställ ditt lösenord",
};

const SUBTITLE: Record<LanguageCode, string> = {
  en: "Enter your account email and we'll send you a link to set a new password.",
  de: "Gib die E-Mail-Adresse deines Kontos ein — wir senden dir einen Link zum Festlegen eines neuen Passworts.",
  fr: "Indiquez l'e-mail de votre compte et nous vous enverrons un lien pour définir un nouveau mot de passe.",
  es: "Introduce el correo de tu cuenta y te enviaremos un enlace para establecer una nueva contraseña.",
  sv: "Ange kontots mejladress så skickar vi en länk för att sätta ett nytt lösenord.",
};

const T: Record<LanguageCode, { emailPlaceholder: string; send: string; sending: string; sent: string; backToSignIn: string }> = {
  en: {
    emailPlaceholder: "you@example.com",
    send: "Send reset link",
    sending: "Sending…",
    sent: "If an account exists for that email, a reset link is on its way.",
    backToSignIn: "Back to sign in",
  },
  de: {
    emailPlaceholder: "du@beispiel.de",
    send: "Link senden",
    sending: "Wird gesendet…",
    sent: "Falls ein Konto mit dieser E-Mail existiert, ist ein Link unterwegs.",
    backToSignIn: "Zurück zur Anmeldung",
  },
  fr: {
    emailPlaceholder: "vous@exemple.fr",
    send: "Envoyer le lien",
    sending: "Envoi…",
    sent: "Si un compte existe avec cet e-mail, un lien est en route.",
    backToSignIn: "Retour à la connexion",
  },
  es: {
    emailPlaceholder: "tu@ejemplo.es",
    send: "Enviar enlace",
    sending: "Enviando…",
    sent: "Si existe una cuenta con ese correo, un enlace está en camino.",
    backToSignIn: "Volver a iniciar sesión",
  },
  sv: {
    emailPlaceholder: "du@exempel.se",
    send: "Skicka länk",
    sending: "Skickar…",
    sent: "Om ett konto finns för den mejladressen är en länk på väg.",
    backToSignIn: "Tillbaka till inloggning",
  },
};

export default function ForgotPasswordPage() {
  const { language } = useLanguage();
  const t = T[language];
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim() }),
    }).catch(() => null);
    setState("sent");
  }

  return (
    <div className="min-h-screen bg-paper px-4 py-12 sm:px-8">
      <div className="mx-auto flex max-w-md flex-col gap-8">
        <PageHeader title={TITLE} subtitle={SUBTITLE} />

        <div className="flex flex-col gap-4 rounded-2xl border border-hairline bg-surface p-6 shadow-sm">
          {state === "sent" ? (
            <p className="rounded-lg bg-surface-2 px-4 py-3 text-center text-sm text-ink">{t.sent}</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
                className="rounded-lg bg-navy px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {state === "sending" ? t.sending : t.send}
              </button>
            </form>
          )}

          <Link href="/sign-in" className="text-center text-xs font-semibold text-ink-muted hover:underline">
            {t.backToSignIn}
          </Link>
        </div>
      </div>
    </div>
  );
}
