"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
  en: "MasterSpeak Premium gives you full access to every trainer and the complete AI Tutor library. New subscribers start with a 2-week free trial.",
  de: "MasterSpeak Premium gibt dir vollen Zugriff auf alle Trainer und die komplette KI-Tutor-Bibliothek. Neue Abonnenten starten mit einem 2-wöchigen kostenlosen Testzeitraum.",
  fr: "MasterSpeak Premium vous donne un accès complet à tous les entraîneurs et à toute la bibliothèque du Tuteur IA. Les nouveaux abonnés commencent par un essai gratuit de 2 semaines.",
  es: "MasterSpeak Premium te da acceso completo a todos los entrenadores y a toda la biblioteca del Tutor de IA. Los nuevos suscriptores empiezan con una prueba gratuita de 2 semanas.",
  sv: "MasterSpeak Premium ger dig full tillgång till alla tränare och hela AI-handledarens bibliotek. Nya prenumeranter börjar med 2 veckors gratis provperiod.",
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
    trialNotice: string;
    perYear: string;
    duration: string;
    free: (period: string) => string;
    terms: string;
    privacy: string;
    units: Record<string, [string, string]>;
    activating: string;
    activationPending: string;
    nothingToRestore: string;
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
    trialNotice: "Start a free trial and payment is charged to your Apple ID when it ends — unless you cancel at least 24 hours before the trial ends.",
    perYear: "/ year",
    duration: "1-year subscription, auto-renewing",
    free: (p) => `${p} free, then`,
    terms: "Terms of Use (EULA)",
    privacy: "Privacy Policy",
    units: {DAY:["day","days"],WEEK:["week","weeks"],MONTH:["month","months"],YEAR:["year","years"]},
    activating: "Activating your access…",
    activationPending: "Purchase received. Your access is being activated — this can take up to a minute. Please reopen the app shortly.",
    nothingToRestore: "No active subscription was found for this Apple ID.",
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
    trialNotice: "Beim Start eines kostenlosen Testzeitraums wird die Zahlung an dessen Ende über deine Apple-ID abgerechnet — es sei denn, du kündigst mindestens 24 Stunden vor Ende des Testzeitraums.",
    perYear: "/ Jahr",
    duration: "Abo mit 1 Jahr Laufzeit, automatische Verlängerung",
    free: (p) => `${p} kostenlos, danach`,
    terms: "Nutzungsbedingungen (EULA)",
    privacy: "Datenschutzerklärung",
    units: {DAY:["Tag","Tage"],WEEK:["Woche","Wochen"],MONTH:["Monat","Monate"],YEAR:["Jahr","Jahre"]},
    activating: "Zugang wird aktiviert…",
    activationPending: "Kauf erhalten. Dein Zugang wird aktiviert — das kann bis zu einer Minute dauern. Bitte öffne die App gleich erneut.",
    nothingToRestore: "Für diese Apple-ID wurde kein aktives Abo gefunden.",
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
    trialNotice: "Si vous commencez un essai gratuit, le paiement est prélevé sur votre identifiant Apple à la fin de l'essai — sauf annulation au moins 24 heures avant la fin de l'essai.",
    perYear: "/ an",
    duration: "Abonnement d'un an, renouvellement automatique",
    free: (p) => `${p} d'essai gratuit, puis`,
    terms: "Conditions d'utilisation (CLUF)",
    privacy: "Politique de confidentialité",
    units: {DAY:["jour","jours"],WEEK:["semaine","semaines"],MONTH:["mois","mois"],YEAR:["an","ans"]},
    activating: "Activation de votre accès…",
    activationPending: "Achat reçu. Votre accès est en cours d'activation — cela peut prendre jusqu'à une minute. Rouvrez l'application dans un instant.",
    nothingToRestore: "Aucun abonnement actif n'a été trouvé pour cet identifiant Apple.",
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
    trialNotice: "Si empiezas una prueba gratuita, el pago se carga a tu ID de Apple cuando termine, salvo que la canceles al menos 24 horas antes de que finalice.",
    perYear: "/ año",
    duration: "Suscripción de 1 año, renovación automática",
    free: (p) => `${p} gratis, después`,
    terms: "Términos de uso (EULA)",
    privacy: "Política de privacidad",
    units: {DAY:["día","días"],WEEK:["semana","semanas"],MONTH:["mes","meses"],YEAR:["año","años"]},
    activating: "Activando tu acceso…",
    activationPending: "Compra recibida. Tu acceso se está activando; puede tardar hasta un minuto. Vuelve a abrir la app en un momento.",
    nothingToRestore: "No se encontró ninguna suscripción activa para este ID de Apple.",
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
    trialNotice: "Om du startar en gratis provperiod dras betalningen från ditt Apple-ID när den tar slut — om du inte säger upp den minst 24 timmar innan provperioden löper ut.",
    perYear: "/ år",
    duration: "Prenumeration på 1 år, förnyas automatiskt",
    free: (p) => `${p} gratis, sedan`,
    terms: "Användarvillkor (EULA)",
    privacy: "Integritetspolicy",
    units: {DAY:["dag","dagar"],WEEK:["vecka","veckor"],MONTH:["månad","månader"],YEAR:["år","år"]},
    activating: "Aktiverar din åtkomst…",
    activationPending: "Köpet är mottaget. Din åtkomst aktiveras — det kan ta upp till en minut. Öppna appen igen om en stund.",
    nothingToRestore: "Ingen aktiv prenumeration hittades för detta Apple-ID.",
  },
};

/** e.g. "2 weeks" from the App Store intro offer (1 WEEK × 2). */
function formatPeriod(units: Record<string, [string, string]>, n: number, unit: string): string {
  const [one, many] = units[unit.toUpperCase()] ?? units.DAY;
  return `${n} ${n === 1 ? one : many}`;
}

/**
 * Hard paywall: access opens only once RevenueCat's webhook has written the
 * subscription server-side (app/api/webhooks/revenuecat/route.ts), usually a
 * few seconds after the App Store sheet closes. Polls until then, so the
 * user isn't bounced straight back to this page by requirePremium().
 */
async function waitForPremium(timeoutMs = 30_000): Promise<boolean> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch("/api/subscription/status", { cache: "no-store" });
      if (res.ok && (await res.json()).premium) return true;
    } catch {
      // Network blip — keep polling until the deadline.
    }
    await new Promise((r) => setTimeout(r, 2000));
  }
  return false;
}

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
  const [notice, setNotice] = useState<string | null>(null);

  async function unlock(): Promise<boolean> {
    if (await waitForPremium()) {
      router.replace("/");
      router.refresh();
      return true;
    }
    setNotice(t.activationPending);
    return false;
  }

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
      setNotice(t.activating);
      await unlock();
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
      const { customerInfo } = await Purchases.restorePurchases();
      if (Object.keys(customerInfo.entitlements.active).length === 0) {
        setNotice(t.nothingToRestore);
        return;
      }
      setNotice(t.activating);
      await unlock();
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
                  <span className="flex flex-col">
                    <span className="text-sm font-semibold text-ink">{pkg.product.title || pkg.identifier}</span>
                    <span className="text-xs text-ink-muted">{t.duration}</span>
                  </span>
                  <span className="text-right text-sm font-semibold text-brass-text">
                    {purchasingId === pkg.identifier ? (
                      t.purchasing
                    ) : (
                      <>
                        {pkg.product.introPrice?.price === 0 && (
                          <span className="block text-xs font-medium text-good">
                            {t.free(formatPeriod(t.units, pkg.product.introPrice.periodNumberOfUnits, pkg.product.introPrice.periodUnit))}
                          </span>
                        )}
                        {pkg.product.priceString} {t.perYear}
                      </>
                    )}
                  </span>
                </button>
              ))}
              {notice && <p className="text-center text-sm font-semibold text-ink">{notice}</p>}
              <p className="text-center text-xs leading-relaxed text-ink-muted">
                {t.renewalNotice}
                {packages.some((p) => p.product.introPrice?.price === 0) && <> {t.trialNotice}</>}
              </p>
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
              <div className="flex justify-center gap-4 text-xs font-semibold text-ink-muted">
                <Link href="/terms" className="underline">
                  {t.terms}
                </Link>
                <Link href="/privacy" className="underline">
                  {t.privacy}
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
