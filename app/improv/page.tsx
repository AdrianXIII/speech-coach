import { ImprovTrainer } from "@/components/ImprovTrainer";
import { PageHeader } from "@/components/PageHeader";
import { DailyLimitReached } from "@/components/DailyLimitReached";
import { requireSignedIn } from "@/lib/requireUser";
import { isPremium } from "@/lib/subscription";
import { canUseToday, markUsedToday } from "@/lib/usageLimitServer";

const TITLE = {
  en: "60-Second Improv",
  de: "60-Sekunden-Improvisation",
  fr: "Impro de 60 secondes",
  es: "Impro de 60 segundos",
  sv: "60-sekunders improvisation",
};

const SUBTITLE = {
  en: "A random word, a rhetorical structure, 60 seconds — record and dare to fail.",
  de: "Ein zufälliges Wort, eine rhetorische Struktur, 60 Sekunden — aufnehmen und dich trauen zu scheitern.",
  fr: "Un mot aléatoire, une structure rhétorique, 60 secondes — enregistrez-vous et osez échouer.",
  es: "Una palabra aleatoria, una estructura retórica, 60 segundos — grábate y atrévete a fallar.",
  sv: "Ett slumpmässigt ord, en retorisk struktur, 60 sekunder — spela in och våga misslyckas.",
};

// No server action of its own to gate the daily limit at (see
// lib/usageLimit.ts's doc comment) — checked and spent here, at page load,
// instead.
const FEATURE = "improv";

export default async function ImprovPage() {
  const user = await requireSignedIn();
  const premium = await isPremium(user.id);
  const available = premium || (await canUseToday(user.id, FEATURE));
  if (available && !premium) await markUsedToday(user.id, FEATURE);

  return (
    <div className="min-h-screen bg-paper px-4 py-12 sm:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <PageHeader title={TITLE} subtitle={SUBTITLE} />

        {available ? <ImprovTrainer /> : <DailyLimitReached />}
      </div>
    </div>
  );
}
