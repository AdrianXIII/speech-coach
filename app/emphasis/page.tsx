import { ContrastiveStressTrainer } from "@/components/ContrastiveStressTrainer";
import { PageHeader } from "@/components/PageHeader";
import { DailyLimitReached } from "@/components/DailyLimitReached";
import { requireSignedIn } from "@/lib/requireUser";
import { isPremium } from "@/lib/subscription";
import { canUseToday, markUsedToday } from "@/lib/usageLimitServer";
import { logActivity } from "@/lib/trainerActivity";

const TITLE = {
  en: "Contrastive Stress",
  de: "Kontrastive Betonung",
  fr: "Accentuation contrastive",
  es: "Énfasis contrastivo",
  sv: "Kontrastiv betoning",
};

const SUBTITLE = {
  en: "Same sentence, different stress — practice putting emphasis on the right word to change its meaning. Available in English, German, French, Spanish, and Swedish.",
  de: "Gleicher Satz, andere Betonung — übe, die Betonung auf das richtige Wort zu legen, um die Bedeutung zu ändern. Verfügbar auf Englisch, Deutsch, Französisch, Spanisch und Schwedisch.",
  fr: "Même phrase, accentuation différente — entraînez-vous à mettre l'accent sur le bon mot pour changer le sens. Disponible en anglais, allemand, français, espagnol et suédois.",
  es: "Misma oración, distinto énfasis — practica poner el énfasis en la palabra correcta para cambiar su significado. Disponible en inglés, alemán, francés, español y sueco.",
  sv: "Samma mening, olika betoning — öva på att lägga betoningen på rätt ord för att ändra betydelsen. Tillgängligt på engelska, tyska, franska, spanska och svenska.",
};

// No server action of its own to gate the daily limit at (see
// lib/usageLimit.ts's doc comment) — checked and spent here, at page load,
// instead.
const FEATURE = "emphasis";

export default async function EmphasisPage() {
  const user = await requireSignedIn();
  const premium = await isPremium(user.id);
  const available = premium || (await canUseToday(user.id, FEATURE));
  if (available && !premium) await markUsedToday(user.id, FEATURE);
  if (available) await logActivity(user.id, FEATURE);

  return (
    <div className="min-h-screen bg-paper px-4 py-12 sm:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <PageHeader title={TITLE} subtitle={SUBTITLE} />

        {available ? <ContrastiveStressTrainer /> : <DailyLimitReached />}
      </div>
    </div>
  );
}
