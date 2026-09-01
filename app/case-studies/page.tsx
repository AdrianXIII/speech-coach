import { CaseStudyTrainer } from "@/components/CaseStudyTrainer";
import { PageHeader } from "@/components/PageHeader";

const TITLE = {
  en: "Case Studies",
  de: "Fallstudien",
  fr: "Études de cas",
  es: "Casos de estudio",
  sv: "Fallstudier",
};

const SUBTITLE = {
  en: "Business, legal, and political problems to solve out loud — get graded on your answer, structure, and professional vocabulary.",
  de: "Geschäftliche, juristische und politische Probleme, die du laut lösen sollst — erhalte eine Bewertung deiner Antwort, Struktur und Fachsprache.",
  fr: "Des problèmes d'affaires, juridiques et politiques à résoudre à voix haute — obtenez une évaluation de votre réponse, structure et vocabulaire professionnel.",
  es: "Problemas de negocios, legales y políticos para resolver en voz alta — recibe una evaluación de tu respuesta, estructura y vocabulario profesional.",
  sv: "Affärsmässiga, juridiska och politiska problem att lösa högt — få en bedömning av ditt svar, din struktur och ditt yrkesspråk.",
};

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-paper px-4 py-12 sm:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <PageHeader title={TITLE} subtitle={SUBTITLE} />

        <CaseStudyTrainer />
      </div>
    </div>
  );
}
