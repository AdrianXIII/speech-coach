"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
    passwordPlaceholder: string;
    signIn: string;
    createAccount: string;
    submitting: string;
    toggleToCreate: string;
    toggleToSignIn: string;
    genericError: string;
    invalidCredentials: string;
  }
> = {
  en: {
    appleButton: "Continue with Apple",
    orEmail: "or with email",
    emailPlaceholder: "you@example.com",
    passwordPlaceholder: "Password (min. 8 characters)",
    signIn: "Sign in",
    createAccount: "Create account",
    submitting: "Please wait…",
    toggleToCreate: "No account yet? Create one",
    toggleToSignIn: "Already have an account? Sign in",
    genericError: "Something went wrong. Please try again.",
    invalidCredentials: "Wrong email or password.",
  },
  de: {
    appleButton: "Weiter mit Apple",
    orEmail: "oder per E-Mail",
    emailPlaceholder: "du@beispiel.de",
    passwordPlaceholder: "Passwort (mind. 8 Zeichen)",
    signIn: "Anmelden",
    createAccount: "Konto erstellen",
    submitting: "Einen Moment…",
    toggleToCreate: "Noch kein Konto? Jetzt erstellen",
    toggleToSignIn: "Schon ein Konto? Anmelden",
    genericError: "Etwas ist schiefgelaufen. Bitte versuche es erneut.",
    invalidCredentials: "Falsche E-Mail oder falsches Passwort.",
  },
  fr: {
    appleButton: "Continuer avec Apple",
    orEmail: "ou par e-mail",
    emailPlaceholder: "vous@exemple.fr",
    passwordPlaceholder: "Mot de passe (8 caractères min.)",
    signIn: "Se connecter",
    createAccount: "Créer un compte",
    submitting: "Un instant…",
    toggleToCreate: "Pas encore de compte ? En créer un",
    toggleToSignIn: "Déjà un compte ? Se connecter",
    genericError: "Une erreur est survenue. Veuillez réessayer.",
    invalidCredentials: "E-mail ou mot de passe incorrect.",
  },
  es: {
    appleButton: "Continuar con Apple",
    orEmail: "o con correo",
    emailPlaceholder: "tu@ejemplo.es",
    passwordPlaceholder: "Contraseña (mín. 8 caracteres)",
    signIn: "Iniciar sesión",
    createAccount: "Crear cuenta",
    submitting: "Un momento…",
    toggleToCreate: "¿Aún no tienes cuenta? Crea una",
    toggleToSignIn: "¿Ya tienes cuenta? Inicia sesión",
    genericError: "Algo salió mal. Inténtalo de nuevo.",
    invalidCredentials: "Correo o contraseña incorrectos.",
  },
  sv: {
    appleButton: "Fortsätt med Apple",
    orEmail: "eller med e-post",
    emailPlaceholder: "du@exempel.se",
    passwordPlaceholder: "Lösenord (minst 8 tecken)",
    signIn: "Logga in",
    createAccount: "Skapa konto",
    submitting: "Ett ögonblick…",
    toggleToCreate: "Inget konto än? Skapa ett",
    toggleToSignIn: "Redan ett konto? Logga in",
    genericError: "Något gick fel. Försök igen.",
    invalidCredentials: "Fel e-post eller lösenord.",
  },
};

export default function SignInPage() {
  const { language } = useLanguage();
  const t = T[language];
  const router = useRouter();

  const [mode, setMode] = useState<"signin" | "create">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [appleAvailable, setAppleAvailable] = useState(false);

  useEffect(() => {
    getProviders().then((providers) => setAppleAvailable(!!providers?.apple));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("submitting");
    setError(null);

    if (mode === "create") {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      }).catch(() => null);
      const data = await res?.json().catch(() => null);
      if (!res?.ok) {
        setState("error");
        setError(data?.error ?? t.genericError);
        return;
      }
    }

    const result = await signIn("credentials", { email: email.trim(), password, redirect: false });
    if (result?.error) {
      setState("error");
      setError(t.invalidCredentials);
      return;
    }
    router.push("/");
    router.refresh();
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

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.emailPlaceholder}
              className="rounded-lg border border-hairline bg-surface px-4 py-3 text-sm text-ink outline-none focus:border-brass"
            />
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
              {state === "submitting" ? t.submitting : mode === "create" ? t.createAccount : t.signIn}
            </button>
            {error && <p className="text-center text-xs text-red-600">{error}</p>}
          </form>

          <button
            onClick={() => {
              setMode(mode === "signin" ? "create" : "signin");
              setError(null);
            }}
            className="text-center text-xs font-semibold text-ink-muted hover:underline"
          >
            {mode === "signin" ? t.toggleToCreate : t.toggleToSignIn}
          </button>
        </div>
      </div>
    </div>
  );
}
