import { SpeedReadingTrainer } from "@/components/SpeedReadingTrainer";
import { PageHeader } from "@/components/PageHeader";
import { DailyLimitReached } from "@/components/DailyLimitReached";
import { requireSignedIn } from "@/lib/requireUser";
import { isPremium } from "@/lib/subscription";
import { canUseToday, markUsedToday } from "@/lib/usageLimitServer";

const TITLE = {
  en: "Speed Reading",
  de: "Schnelllesen",
  fr: "Lecture rapide",
  es: "Lectura rápida",
  sv: "Snabbläsning",
};

const SUBTITLE = {
  en: "Paste a text, pick a level and language, and train yourself to read faster without losing comprehension.",
  de: "Füge einen Text ein, wähle ein Level und eine Sprache, und trainiere dich darin, schneller zu lesen, ohne das Verständnis zu verlieren.",
  fr: "Collez un texte, choisissez un niveau et une langue, et entraînez-vous à lire plus vite sans perdre en compréhension.",
  es: "Pega un texto, elige un nivel e idioma, y entrénate para leer más rápido sin perder comprensión.",
  sv: "Klistra in en text, välj en nivå och ett språk, och träna dig på att läsa snabbare utan att förlora förståelsen.",
};

// No server action of its own to gate the daily limit at (see
// lib/usageLimit.ts's doc comment) — checked and spent here, at page load,
// instead.
const FEATURE = "speedreading";

export default async function SpeedReadingPage() {
  const user = await requireSignedIn();
  const premium = await isPremium(user.id);
  const available = premium || (await canUseToday(user.id, FEATURE));
  if (available && !premium) await markUsedToday(user.id, FEATURE);

  return (
    <div className="min-h-screen bg-paper px-4 py-12 sm:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <PageHeader title={TITLE} subtitle={SUBTITLE} />

        {available ? <SpeedReadingTrainer /> : <DailyLimitReached />}
      </div>
    </div>
  );
}
