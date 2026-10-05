"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useLanguage } from "@/components/LanguageProvider";
import type { LanguageCode } from "@/lib/languages";

// Same deep link already used on the pricing page's "Manage subscription"
// — Apple's own subscription-management screen, not something this app
// can render itself.
const MANAGE_SUBSCRIPTIONS_URL = "https://apps.apple.com/account/subscriptions";

const T: Record<
  LanguageCode,
  {
    emailLabel: string;
    planLabel: string;
    freePlan: string;
    premiumPlan: string;
    manageSubscription: string;
    seeSubscriptionOptions: string;
    dangerTitle: string;
    dangerBody: string;
    deleteButton: string;
    confirmBody: string;
    confirmButton: string;
    cancelButton: string;
    deleting: string;
    failed: string;
  }
> = {
  en: {
    emailLabel: "Signed in as",
    planLabel: "Plan",
    freePlan: "Free",
    premiumPlan: "Premium",
    manageSubscription: "Manage subscription",
    seeSubscriptionOptions: "See subscription options",
    dangerTitle: "Delete account",
    dangerBody: "Permanently deletes your account and all your data — recordings history, review lists, and subscription status. This can't be undone.",
    deleteButton: "Delete my account",
    confirmBody: "Are you sure? This will immediately and permanently delete your account.",
    confirmButton: "Yes, delete my account",
    cancelButton: "Cancel",
    deleting: "Deleting…",
    failed: "Couldn't delete your account. Please try again, or email kosaltech2025@gmail.com.",
  },
  de: {
    emailLabel: "Angemeldet als",
    planLabel: "Plan",
    freePlan: "Kostenlos",
    premiumPlan: "Premium",
    manageSubscription: "Abo verwalten",
    seeSubscriptionOptions: "Abo-Optionen ansehen",
    dangerTitle: "Konto löschen",
    dangerBody: "Löscht dein Konto und alle deine Daten dauerhaft — Aufnahmeverlauf, Wiederholungslisten und Abo-Status. Das kann nicht rückgängig gemacht werden.",
    deleteButton: "Mein Konto löschen",
    confirmBody: "Bist du sicher? Dein Konto wird sofort und dauerhaft gelöscht.",
    confirmButton: "Ja, mein Konto löschen",
    cancelButton: "Abbrechen",
    deleting: "Wird gelöscht…",
    failed: "Konto konnte nicht gelöscht werden. Bitte versuche es erneut oder schreibe an kosaltech2025@gmail.com.",
  },
  fr: {
    emailLabel: "Connecté en tant que",
    planLabel: "Forfait",
    freePlan: "Gratuit",
    premiumPlan: "Premium",
    manageSubscription: "Gérer l'abonnement",
    seeSubscriptionOptions: "Voir les abonnements",
    dangerTitle: "Supprimer le compte",
    dangerBody: "Supprime définitivement votre compte et toutes vos données — historique des enregistrements, listes de révision et statut d'abonnement. Cette action est irréversible.",
    deleteButton: "Supprimer mon compte",
    confirmBody: "Êtes-vous sûr(e) ? Votre compte sera supprimé immédiatement et définitivement.",
    confirmButton: "Oui, supprimer mon compte",
    cancelButton: "Annuler",
    deleting: "Suppression…",
    failed: "Impossible de supprimer votre compte. Réessayez, ou écrivez à kosaltech2025@gmail.com.",
  },
  es: {
    emailLabel: "Sesión iniciada como",
    planLabel: "Plan",
    freePlan: "Gratis",
    premiumPlan: "Premium",
    manageSubscription: "Gestionar suscripción",
    seeSubscriptionOptions: "Ver opciones de suscripción",
    dangerTitle: "Eliminar cuenta",
    dangerBody: "Elimina permanentemente tu cuenta y todos tus datos: historial de grabaciones, listas de repaso y estado de la suscripción. Esta acción no se puede deshacer.",
    deleteButton: "Eliminar mi cuenta",
    confirmBody: "¿Estás seguro/a? Tu cuenta se eliminará de forma inmediata y permanente.",
    confirmButton: "Sí, eliminar mi cuenta",
    cancelButton: "Cancelar",
    deleting: "Eliminando…",
    failed: "No se pudo eliminar tu cuenta. Inténtalo de nuevo o escribe a kosaltech2025@gmail.com.",
  },
  sv: {
    emailLabel: "Inloggad som",
    planLabel: "Plan",
    freePlan: "Gratis",
    premiumPlan: "Premium",
    manageSubscription: "Hantera prenumeration",
    seeSubscriptionOptions: "Se prenumerationsalternativ",
    dangerTitle: "Radera konto",
    dangerBody: "Raderar ditt konto och all din data permanent — inspelningshistorik, repetitionslistor och prenumerationsstatus. Detta går inte att ångra.",
    deleteButton: "Radera mitt konto",
    confirmBody: "Är du säker? Ditt konto raderas omedelbart och permanent.",
    confirmButton: "Ja, radera mitt konto",
    cancelButton: "Avbryt",
    deleting: "Raderar…",
    failed: "Kunde inte radera kontot. Försök igen, eller mejla kosaltech2025@gmail.com.",
  },
};

export function AccountSettings({ email, premium }: { email: string | null; premium: boolean }) {
  const { language } = useLanguage();
  const t = T[language];
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [failed, setFailed] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    setFailed(false);
    try {
      const res = await fetch("/api/account", { method: "DELETE" });
      if (!res.ok) throw new Error("delete failed");
      await signOut({ callbackUrl: "/" });
    } catch {
      setFailed(true);
      setDeleting(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {email && (
        <div className="rounded-2xl border border-hairline bg-surface p-6 text-sm text-ink shadow-sm">
          <span className="text-ink-muted">{t.emailLabel}</span> <span className="font-semibold">{email}</span>
        </div>
      )}

      <div className="flex items-center justify-between rounded-2xl border border-hairline bg-surface p-6 text-sm text-ink shadow-sm">
        <div>
          <span className="text-ink-muted">{t.planLabel}</span>{" "}
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
              premium ? "bg-[linear-gradient(135deg,var(--color-accent-start),var(--color-accent-end))] text-cream" : "bg-surface-2 text-ink-muted"
            }`}
          >
            {premium ? t.premiumPlan : t.freePlan}
          </span>
        </div>
        {premium ? (
          <a
            href={MANAGE_SUBSCRIPTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-brass-text hover:underline"
          >
            {t.manageSubscription}
          </a>
        ) : (
          <Link href="/pricing" className="text-xs font-semibold text-brass-text hover:underline">
            {t.seeSubscriptionOptions}
          </Link>
        )}
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm">
        <h2 className="font-display text-base font-semibold text-red-900">{t.dangerTitle}</h2>
        <p className="text-sm text-red-800">{t.dangerBody}</p>

        {!confirming ? (
          <button
            onClick={() => setConfirming(true)}
            className="self-start rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-semibold text-red-700 transition-colors hover:bg-red-100"
          >
            {t.deleteButton}
          </button>
        ) : (
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold text-red-900">{t.confirmBody}</p>
            {failed && <p className="text-sm text-red-700">{t.failed}</p>}
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-800 disabled:opacity-60"
              >
                {deleting ? t.deleting : t.confirmButton}
              </button>
              <button
                onClick={() => setConfirming(false)}
                disabled={deleting}
                className="rounded-lg border border-hairline px-4 py-2 text-sm font-semibold text-ink-muted transition-colors hover:border-ink-muted"
              >
                {t.cancelButton}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
