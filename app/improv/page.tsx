import { ImprovTrainer } from "@/components/ImprovTrainer";
import { PageHeader } from "@/components/PageHeader";

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

export default function ImprovPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12 sm:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <PageHeader title={TITLE} subtitle={SUBTITLE} />

        <ImprovTrainer />
      </div>
    </div>
  );
}
