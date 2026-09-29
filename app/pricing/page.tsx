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
    perMonth: string;
    subscribe: string;
    purchasing: string;
    restore: string;
    webNotice: string;
    loadFailed: string;
    purchaseFailed: string;
  }
> = {
  en: {
    perMonth: "/mo",
    subscribe: "Subscribe",
    purchasing: "Processing…",
    restore: "Restore purchases",
    webNotice: "Subscriptions are managed through the MasterSpeak iOS app — open it on your iPhone to subscribe.",
    loadFailed: "Couldn't load subscription options. Please try again shortly.",
    purchaseFailed: "Purchase didn't go through. Please try again.",
  },
  de: {
    perMonth: "/Monat",
    subscribe: "Abonnieren",
    purchasing: "Wird verarbeitet…",
    restore: "Käufe wiederherstellen",
    webNotice: "Abos werden über die MasterSpeak-iOS-App verwaltet — öffne sie auf deinem iPhone, um zu abonnieren.",
    loadFailed: "Abo-Optionen konnten nicht geladen werden. Bitte versuche es gleich noch einmal.",
    purchaseFailed: "Der Kauf ist fehlgeschlagen. Bitte versuche es erneut.",
  },
  fr: {
    perMonth: "/mois",
    subscribe: "S'abonner",
    purchasing: "Traitement…",
    restore: "Restaurer les achats",
    webNotice: "Les abonnements sont gérés via l'application iOS MasterSpeak — ouvrez-la sur votre iPhone pour vous abonner.",
    loadFailed: "Impossible de charger les options d'abonnement. Réessayez bientôt.",
    purchaseFailed: "L'achat n'a pas abouti. Veuillez réessayer.",
  },
  es: {
    perMonth: "/mes",
    subscribe: "Suscribirse",
    purchasing: "Procesando…",
    restore: "Restaurar compras",
    webNotice: "Las suscripciones se gestionan desde la app de iOS de MasterSpeak: ábrela en tu iPhone para suscribirte.",
    loadFailed: "No se pudieron cargar las opciones de suscripción. Inténtalo de nuevo en breve.",
    purchaseFailed: "La compra no se completó. Inténtalo de nuevo.",
  },
  sv: {
    perMonth: "/mån",
    subscribe: "Prenumerera",
    purchasing: "Bearbetar…",
    restore: "Återställ köp",
    webNotice: "Prenumerationer hanteras via MasterSpeak-appen för iOS — öppna den på din iPhone för att prenumerera.",
    loadFailed: "Kunde inte hämta prenumerationsalternativ. Försök igen om en stund.",
    purchaseFailed: "Köpet gick inte igenom. Försök igen.",
  },
};

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
              <button onClick={handleRestore} className="text-center text-xs font-semibold text-ink-muted hover:underline">
                {t.restore}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
