"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn, getProviders } from "next-auth/react";
import { PageHeader } from "@/components/PageHeader";
import type { LanguageCode } from "@/lib/languages";

/**
 * English only, regardless of the selected app language — sign-in is part of
 * the introduction to the app, which (like the landing page, App Store
 * listing, terms and privacy policy) is presented in English. The five app
 * languages are for practising, inside the trainers.
 */
const english = (text: string): Record<LanguageCode, string> => ({ en: text, de: text, fr: text, es: text, sv: text });

const TITLE = english("Sign in");
const SUBTITLE = english("One account keeps your progress, review lists, and subscription with you across devices.");

const T: {
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
  forgotPassword: string;
  invalidEmail: string;
  accountExists: string;
  tooManyAccounts: string;
} = {
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
  forgotPassword: "Forgot password?",
  invalidEmail: "Enter a valid email address.",
  accountExists: "An account with this email already exists — sign in instead.",
  tooManyAccounts: "Too many accounts created from this network. Please try again later.",
};

/** Maps register's known 400/409/429 messages to a localized string — never shows the raw English server message. */
function registerErrorMessage(serverMessage: string | undefined, t: typeof T): string {
  const m = (serverMessage ?? "").toLowerCase();
  if (m.includes("already exists")) return t.accountExists;
  if (m.includes("valid email")) return t.invalidEmail;
  if (m.includes("too many accounts")) return t.tooManyAccounts;
  return t.genericError;
}

export default function SignInPage() {
  const t = T;
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
        setError(registerErrorMessage(data?.error, t));
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
              aria-label={t.emailPlaceholder}
              className="rounded-lg border border-hairline bg-surface px-4 py-3 text-sm text-ink outline-none focus:border-brass"
            />
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-label={t.passwordPlaceholder}
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

          {mode === "signin" && (
            <Link href="/forgot-password" className="text-center text-xs font-semibold text-ink-muted hover:underline">
              {t.forgotPassword}
            </Link>
          )}

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
