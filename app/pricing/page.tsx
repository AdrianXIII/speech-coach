"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Capacitor } from "@capacitor/core";
import { Purchases } from "@revenuecat/purchases-capacitor";
import type { PurchasesPackage } from "@revenuecat/purchases-capacitor";
import { PageHeader } from "@/components/PageHeader";
import { useLanguage } from "@/components/LanguageProvider";
import type { LanguageCode } from "@/lib/languages";

const TITLE: Record<LanguageCode, string> = {
  en: "Subscribe to MasterSpeak",
  de: "MasterSpeak abonnieren",
  fr: "S'abonner à MasterSpeak",
  es: "Suscríbete a MasterSpeak",
  sv: "Prenumerera på MasterSpeak",
};

const SUBTITLE: Record<LanguageCode, string> = {
  en: "The free plan includes one session per trainer, per day, and 3 AI Tutor categories per profession. Subscribe for unlimited daily use and the full AI Tutor case library.",
  de: "Der kostenlose Plan umfasst eine Sitzung pro Trainer und Tag sowie 3 KI-Tutor-Kategorien pro Berufsfeld. Abonniere für unbegrenzte tägliche Nutzung und die vollständige KI-Tutor-Fallbibliothek.",
  fr: "Le plan gratuit inclut une session par entraîneur et par jour, ainsi que 3 catégories du Tuteur IA par domaine. Abonnez-vous pour un usage quotidien illimité et l'accès complet aux cas du Tuteur IA.",
  es: "El plan gratuito incluye una sesión por entrenador al día y 3 categorías del Tutor de IA por profesión. Suscríbete para un uso diario ilimitado y la biblioteca completa de casos del Tutor de IA.",
  sv: "Den kostnadsfria planen ger en session per tränare och dag, samt 3 AI-handledare-kategorier per yrke. Prenumerera för obegränsad daglig användning och hela AI-handledarens fallbibliotek.",
};

const T: Record<
  LanguageCode,
  {
    subscribe: string;
    purchasing: string;
    restore: string;
    manage: string;
    webNotice: string;
    loadFailed: string;
    purchaseFailed: string;
    renewalNotice: string;
  }
> = {
  en: {
    subscribe: "Subscribe",
    purchasing: "Processing…",
    restore: "Restore purchases",
    manage: "Manage subscription",
    webNotice: "Subscriptions are managed through the MasterSpeak iOS app — open it on your iPhone to subscribe.",
    loadFailed: "Couldn't load subscription options. Please try again shortly.",
    purchaseFailed: "Purchase didn't go through. Please try again.",
    renewalNotice: "Billed annually. Your subscription automatically renews each year unless cancelled at least 24 hours before the end of the current period. Manage or cancel anytime in your Apple ID subscription settings.",
  },
  de: {
    subscribe: "Abonnieren",
    purchasing: "Wird verarbeitet…",
    restore: "Käufe wiederherstellen",
    manage: "Abo verwalten",
    webNotice: "Abos werden über die MasterSpeak-iOS-App verwaltet — öffne sie auf deinem iPhone, um zu abonnieren.",
    loadFailed: "Abo-Optionen konnten nicht geladen werden. Bitte versuche es gleich noch einmal.",
    purchaseFailed: "Der Kauf ist fehlgeschlagen. Bitte versuche es erneut.",
    renewalNotice: "Jährliche Abrechnung. Dein Abo verlängert sich automatisch jedes Jahr, sofern du nicht mindestens 24 Stunden vor Ablauf des aktuellen Zeitraums kündigst. Verwalte oder kündige jederzeit in deinen Apple-ID-Aboeinstellungen.",
  },
  fr: {
    subscribe: "S'abonner",
    purchasing: "Traitement…",
    restore: "Restaurer les achats",
    manage: "Gérer l'abonnement",
    webNotice: "Les abonnements sont gérés via l'application iOS MasterSpeak — ouvrez-la sur votre iPhone pour vous abonner.",
    loadFailed: "Impossible de charger les options d'abonnement. Réessayez bientôt.",
    purchaseFailed: "L'achat n'a pas abouti. Veuillez réessayer.",
    renewalNotice: "Facturation annuelle. Votre abonnement se renouvelle automatiquement chaque année, sauf annulation au moins 24 heures avant la fin de la période en cours. Gérez ou annulez à tout moment dans les réglages d'abonnement de votre identifiant Apple.",
  },
  es: {
    subscribe: "Suscribirse",
    purchasing: "Procesando…",
    restore: "Restaurar compras",
    manage: "Gestionar suscripción",
    webNotice: "Las suscripciones se gestionan desde la app de iOS de MasterSpeak: ábrela en tu iPhone para suscribirte.",
    loadFailed: "No se pudieron cargar las opciones de suscripción. Inténtalo de nuevo en breve.",
    purchaseFailed: "La compra no se completó. Inténtalo de nuevo.",
    renewalNotice: "Facturación anual. Tu suscripción se renueva automáticamente cada año salvo que la canceles al menos 24 horas antes de que finalice el periodo actual. Gestiona o cancela cuando quieras en los ajustes de suscripción de tu ID de Apple.",
  },
  sv: {
    subscribe: "Prenumerera",
    purchasing: "Bearbetar…",
    restore: "Återställ köp",
    manage: "Hantera prenumeration",
    webNotice: "Prenumerationer hanteras via MasterSpeak-appen för iOS — öppna den på din iPhone för att prenumerera.",
    loadFailed: "Kunde inte hämta prenumerationsalternativ. Försök igen om en stund.",
    purchaseFailed: "Köpet gick inte igenom. Försök igen.",
    renewalNotice: "Årlig fakturering. Din prenumeration förnyas automatiskt varje år om du inte säger upp den minst 24 timmar innan innevarande period löper ut. Hantera eller säg upp när som helst i dina Apple-ID-prenumerationsinställningar.",
  },
};

const MANAGE_SUBSCRIPTIONS_URL = "https://apps.apple.com/account/subscriptions";

export default function PricingPage() {
  const { language } = useLanguage();
  const { status } = useSession();
  const router = useRouter();
  const t = T[language];
  const isNative = Capacitor.isNativePlatform();

  const [packages, setPackages] = useState<PurchasesPackage[] | null>(null);
  const [error, setError] = useState(false);
  const [purchasingId, setPurchasingId] = useState<string | null>(null);

  useEffect(() => {
    if (!isNative) return;
    Purchases.getOfferings()
      .then((offerings) => setPackages(offerings.current?.availablePackages ?? []))
      .catch(() => setError(true));
  }, [isNative]);

  async function handlePurchase(pkg: PurchasesPackage) {
    setPurchasingId(pkg.identifier);
    try {
      await Purchases.purchasePackage({ aPackage: pkg });
      router.push("/");
    } catch (err) {
      // RevenueCat rejects with { userCancelled: true } on a plain cancel — not a real failure.
      if (!(err && typeof err === "object" && "userCancelled" in err && (err as { userCancelled?: boolean }).userCancelled)) {
        setError(true);
      }
    } finally {
      setPurchasingId(null);
    }
  }

  async function handleRestore() {
    try {
      await Purchases.restorePurchases();
      router.push("/");
    } catch {
      setError(true);
    }
  }

  return (
    <div className="min-h-screen bg-paper px-4 py-12 sm:px-8">
      <div className="mx-auto flex max-w-md flex-col gap-8">
        <PageHeader title={TITLE} subtitle={SUBTITLE} />

        <div className="flex flex-col gap-4 rounded-2xl border border-hairline bg-surface p-6 shadow-sm">
          {!isNative ? (
            <p className="text-center text-sm text-ink-muted">{t.webNotice}</p>
          ) : error ? (
            <p className="text-center text-sm text-red-600">{t.loadFailed}</p>
          ) : packages === null ? (
            <p className="text-center text-sm text-ink-muted">…</p>
          ) : (
            <>
              {packages.map((pkg) => (
                <button
                  key={pkg.identifier}
                  onClick={() => handlePurchase(pkg)}
                  disabled={purchasingId !== null || status !== "authenticated"}
                  className="flex items-center justify-between rounded-lg border border-hairline bg-surface-2 px-4 py-3 text-left transition-colors hover:border-brass disabled:opacity-60"
                >
                  <span className="text-sm font-semibold text-ink">{pkg.product.title || pkg.identifier}</span>
                  <span className="text-sm font-semibold text-brass-text">
                    {purchasingId === pkg.identifier ? t.purchasing : pkg.product.priceString}
                  </span>
                </button>
              ))}
              <p className="text-center text-xs leading-relaxed text-ink-muted">{t.renewalNotice}</p>
              <button onClick={handleRestore} className="text-center text-xs font-semibold text-ink-muted hover:underline">
                {t.restore}
              </button>
              <a
                href={MANAGE_SUBSCRIPTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center text-xs font-semibold text-ink-muted hover:underline"
              >
                {t.manage}
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
