"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { PageHeader } from "@/components/PageHeader";
import { useLanguage } from "@/components/LanguageProvider";
import type { LanguageCode } from "@/lib/languages";

const TITLE: Record<LanguageCode, string> = {
  en: "Set a new password",
  de: "Neues Passwort festlegen",
  fr: "Définir un nouveau mot de passe",
  es: "Establecer una nueva contraseña",
  sv: "Ange ett nytt lösenord",
};

const SUBTITLE: Record<LanguageCode, string> = {
  en: "Choose a new password for your account.",
  de: "Wähle ein neues Passwort für dein Konto.",
  fr: "Choisissez un nouveau mot de passe pour votre compte.",
  es: "Elige una nueva contraseña para tu cuenta.",
  sv: "Välj ett nytt lösenord för ditt konto.",
};

const T: Record<
  LanguageCode,
  { passwordPlaceholder: string; submit: string; submitting: string; invalidLink: string; genericError: string; getNewLink: string }
> = {
  en: {
    passwordPlaceholder: "New password (min. 8 characters)",
    submit: "Set new password",
    submitting: "Please wait…",
    invalidLink: "This reset link is invalid or has expired.",
    genericError: "Something went wrong. Please try again.",
    getNewLink: "Request a new link",
  },
  de: {
    passwordPlaceholder: "Neues Passwort (mind. 8 Zeichen)",
    submit: "Neues Passwort speichern",
    submitting: "Einen Moment…",
    invalidLink: "Dieser Link ist ungültig oder abgelaufen.",
    genericError: "Etwas ist schiefgelaufen. Bitte versuche es erneut.",
    getNewLink: "Neuen Link anfordern",
  },
  fr: {
    passwordPlaceholder: "Nouveau mot de passe (8 caractères min.)",
    submit: "Enregistrer le mot de passe",
    submitting: "Un instant…",
    invalidLink: "Ce lien est invalide ou a expiré.",
    genericError: "Une erreur est survenue. Veuillez réessayer.",
    getNewLink: "Demander un nouveau lien",
  },
  es: {
    passwordPlaceholder: "Nueva contraseña (mín. 8 caracteres)",
    submit: "Guardar contraseña",
    submitting: "Un momento…",
    invalidLink: "Este enlace no es válido o ha caducado.",
    genericError: "Algo salió mal. Inténtalo de nuevo.",
    getNewLink: "Solicitar un nuevo enlace",
  },
  sv: {
    passwordPlaceholder: "Nytt lösenord (minst 8 tecken)",
    submit: "Spara nytt lösenord",
    submitting: "Ett ögonblick…",
    invalidLink: "Länken är ogiltig eller har gått ut.",
    genericError: "Något gick fel. Försök igen.",
    getNewLink: "Begär en ny länk",
  },
};

function ResetPasswordForm() {
  const { language } = useLanguage();
  const t = T[language];
  const router = useRouter();
  const token = useSearchParams().get("token") ?? "";

  const [password, setPassword] = useState("");
  const [state, setState] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("submitting");
    setError(null);

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    }).catch(() => null);
    const data = await res?.json().catch(() => null);

    if (!res?.ok) {
      setState("error");
      const m = (data?.error ?? "").toLowerCase();
      setError(m.includes("invalid") || m.includes("expired") ? t.invalidLink : t.genericError);
      return;
    }

    // The password is already reset at this point — sign in with it right
    // away rather than sending the user back to a separate form after they
    // just proved account ownership via the emailed link.
    await signIn("credentials", { email: data.email, password, redirect: false });
    router.push("/");
    router.refresh();
  }

  if (!token) {
    return (
      <p className="rounded-lg bg-surface-2 px-4 py-3 text-center text-sm text-ink">
        {t.invalidLink}{" "}
        <a href="/forgot-password" className="font-semibold text-brass-text hover:underline">
          {t.getNewLink}
        </a>
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="password"
        required
        minLength={8}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder={t.passwordPlaceholder}
        className="rounded-lg border border-hairline bg-surface px-4 py-3 text-sm text-ink outline-none focus:border-brass"
      />
      <button
        type="submit"
        disabled={state === "submitting"}
        className="rounded-lg bg-navy px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {state === "submitting" ? t.submitting : t.submit}
      </button>
      {error && (
        <p className="text-center text-xs text-red-600">
          {error}{" "}
          <a href="/forgot-password" className="font-semibold underline">
            {t.getNewLink}
          </a>
        </p>
      )}
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-paper px-4 py-12 sm:px-8">
      <div className="mx-auto flex max-w-md flex-col gap-8">
        <PageHeader title={TITLE} subtitle={SUBTITLE} />
        <div className="flex flex-col gap-4 rounded-2xl border border-hairline bg-surface p-6 shadow-sm">
          {/* useSearchParams requires a Suspense boundary */}
          <Suspense fallback={null}>
            <ResetPasswordForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
