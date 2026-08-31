import { CollocationTrainer } from "@/components/CollocationTrainer";
import { PageHeader } from "@/components/PageHeader";

const TITLE = {
  en: "Elite Phrasing",
  de: "Elite-Ausdrucksweise",
  fr: "Expression d'élite",
  es: "Expresión de élite",
  sv: "Elituttryck",
};

const SUBTITLE = {
  en: "Pick the correctly upgraded professional phrase, then use it in a sentence out loud — for executives, politicians, and lawyers.",
  de: "Wähle die richtig aufgewertete professionelle Formulierung und benutze sie dann laut in einem Satz — für Führungskräfte, Politiker und Anwälte.",
  fr: "Choisissez la formulation professionnelle correctement améliorée, puis utilisez-la à voix haute dans une phrase — pour dirigeants, politiciens et avocats.",
  es: "Elige la frase profesional correctamente mejorada y luego úsala en voz alta en una oración — para ejecutivos, políticos y abogados.",
  sv: "Välj den korrekt uppgraderade professionella frasen och använd den sedan högt i en mening — för chefer, politiker och jurister.",
};

export default function CollocationsPage() {
  return (
    <div className="min-h-screen bg-paper px-4 py-12 sm:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <PageHeader title={TITLE} subtitle={SUBTITLE} />

        <CollocationTrainer />
      </div>
    </div>
  );
}
