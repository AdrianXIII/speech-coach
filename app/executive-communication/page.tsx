import { ExecutiveCommunicationTrainer } from "@/components/ExecutiveCommunicationTrainer";
import { PageHeader } from "@/components/PageHeader";

const TITLE = {
  en: "Executive Communication",
  de: "Executive-Kommunikation",
  fr: "Communication de direction",
  es: "Comunicación ejecutiva",
  sv: "Ledningskommunikation",
};

const SUBTITLE = {
  en: "Get to the point, follow a framework, and get graded on structure — not delivery.",
  de: "Komm auf den Punkt, folge einem Modell und werde nach Struktur bewertet — nicht nach Vortragsweise.",
  fr: "Allez à l'essentiel, suivez un modèle, et soyez évalué sur la structure — pas l'élocution.",
  es: "Ve al grano, sigue un modelo y recibe evaluación por estructura — no por elocución.",
  sv: "Kom till saken, följ en modell och bli bedömd på struktur — inte framförande.",
};

export default function ExecutiveCommunicationPage() {
  return (
    <div className="min-h-screen bg-paper px-4 py-12 sm:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <PageHeader title={TITLE} subtitle={SUBTITLE} />

        <ExecutiveCommunicationTrainer />
      </div>
    </div>
  );
}
