"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import type { LanguageCode } from "@/lib/languages";

const T: Record<
  LanguageCode,
  {
    title: string;
    subtitle: string;
    cta: string;
    trialNote: string;
    features: { icon: string; title: string; body: string }[];
  }
> = {
  en: {
    title: "Speak with confidence, in five languages.",
    subtitle:
      "MasterSpeak is an AI coach for public speaking, pronunciation, and professional communication — practice with your voice, get feedback in seconds.",
    cta: "Start your free trial",
    trialNote: "7 days free, then a simple monthly or annual subscription.",
    features: [
      { icon: "🎙️", title: "Record & Analyze", body: "Get instant feedback on pace, filler words, and delivery." },
      { icon: "🗣️", title: "Pronunciation", body: "Practice tricky words with AI feedback and spaced repetition." },
      { icon: "🎓", title: "AI Tutor", body: "A personal coach across business, law, and politics — real cases, real news." },
      { icon: "💼", title: "Executive Communication", body: "Sixty-second deliberate practice for the moments that matter." },
    ],
  },
  de: {
    title: "Sprich selbstbewusst — in fünf Sprachen.",
    subtitle:
      "MasterSpeak ist ein KI-Coach für Redekunst, Aussprache und professionelle Kommunikation — übe mit deiner Stimme, erhalte Feedback in Sekunden.",
    cta: "Kostenlose Testphase starten",
    trialNote: "7 Tage kostenlos, danach ein einfaches Monats- oder Jahresabo.",
    features: [
      { icon: "🎙️", title: "Aufnahme & Analyse", body: "Sofortiges Feedback zu Tempo, Füllwörtern und Vortrag." },
      { icon: "🗣️", title: "Aussprache", body: "Übe schwierige Wörter mit KI-Feedback und Wiederholung." },
      { icon: "🎓", title: "KI-Tutor", body: "Ein persönlicher Coach für Wirtschaft, Recht und Politik — echte Fälle, echte Nachrichten." },
      { icon: "💼", title: "Executive Communication", body: "Sechzig Sekunden gezieltes Üben für die Momente, die zählen." },
    ],
  },
  fr: {
    title: "Parlez avec confiance, en cinq langues.",
    subtitle:
      "MasterSpeak est un coach IA pour la prise de parole, la prononciation et la communication professionnelle — entraînez votre voix, recevez un retour en quelques secondes.",
    cta: "Démarrer l'essai gratuit",
    trialNote: "7 jours gratuits, puis un abonnement simple mensuel ou annuel.",
    features: [
      { icon: "🎙️", title: "Enregistrer et analyser", body: "Retour instantané sur le débit, les mots de remplissage et l'élocution." },
      { icon: "🗣️", title: "Prononciation", body: "Entraînez les mots difficiles avec un retour IA et la répétition espacée." },
      { icon: "🎓", title: "Tuteur IA", body: "Un coach personnel en affaires, droit et politique — cas réels, actualités réelles." },
      { icon: "💼", title: "Communication exécutive", body: "Soixante secondes d'entraînement délibéré pour les moments qui comptent." },
    ],
  },
  es: {
    title: "Habla con confianza, en cinco idiomas.",
    subtitle:
      "MasterSpeak es un coach de IA para oratoria, pronunciación y comunicación profesional — practica con tu voz y recibe comentarios en segundos.",
    cta: "Empezar prueba gratuita",
    trialNote: "7 días gratis, luego una suscripción sencilla mensual o anual.",
    features: [
      { icon: "🎙️", title: "Grabar y analizar", body: "Comentarios al instante sobre ritmo, muletillas y expresión." },
      { icon: "🗣️", title: "Pronunciación", body: "Practica palabras difíciles con comentarios de IA y repetición espaciada." },
      { icon: "🎓", title: "Tutor de IA", body: "Un coach personal en negocios, derecho y política — casos reales, noticias reales." },
      { icon: "💼", title: "Comunicación ejecutiva", body: "Sesenta segundos de práctica deliberada para los momentos que importan." },
    ],
  },
  sv: {
    title: "Tala med självförtroende, på fem språk.",
    subtitle:
      "MasterSpeak är en AI-coach för offentligt tal, uttal och professionell kommunikation — öva med din röst, få feedback på sekunder.",
    cta: "Starta kostnadsfri provperiod",
    trialNote: "7 dagar gratis, sedan en enkel månads- eller årsprenumeration.",
    features: [
      { icon: "🎙️", title: "Spela in & analysera", body: "Direkt feedback på tempo, utfyllnadsord och framförande." },
      { icon: "🗣️", title: "Uttal", body: "Öva svåra ord med AI-feedback och spaced repetition." },
      { icon: "🎓", title: "AI-handledare", body: "En personlig coach inom affärer, juridik och politik — riktiga fall, aktuella nyheter." },
      { icon: "💼", title: "Executive Communication", body: "Sextio sekunders medveten övning för stunderna som räknas." },
    ],
  },
};

/**
 * Shown by app/page.tsx to anyone who isn't signed in, or whose trial has
 * ended without a subscription — a real pitch before asking for an account,
 * instead of the trainer picker (components/TrainerPicker.tsx) those
 * visitors can't actually use yet.
 */
export function MarketingLanding({ ctaHref }: { ctaHref: string }) {
  const { language } = useLanguage();
  const t = T[language];

  return (
    <div className="min-h-screen bg-paper px-4 py-12 sm:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-10">
        <header className="text-center">
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">{t.title}</h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-ink-muted">{t.subtitle}</p>
          <div className="mt-8 flex flex-col items-center gap-2">
            <Link
              href={ctaHref}
              className="rounded-full bg-navy px-8 py-3 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
            >
              {t.cta}
            </Link>
            <p className="text-xs text-ink-muted">{t.trialNote}</p>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {t.features.map((f) => (
            <div key={f.title} className="flex flex-col gap-2 rounded-2xl border border-hairline bg-surface p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="text-2xl" aria-hidden="true">{f.icon}</span>
                <span className="font-display text-lg font-semibold text-ink">{f.title}</span>
              </div>
              <p className="text-sm leading-relaxed text-ink-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
