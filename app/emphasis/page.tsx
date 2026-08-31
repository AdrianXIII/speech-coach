import { ContrastiveStressTrainer } from "@/components/ContrastiveStressTrainer";
import { PageHeader } from "@/components/PageHeader";

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

export default function EmphasisPage() {
  return (
    <div className="min-h-screen bg-paper px-4 py-12 sm:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <PageHeader title={TITLE} subtitle={SUBTITLE} />

        <ContrastiveStressTrainer />
      </div>
    </div>
  );
}
