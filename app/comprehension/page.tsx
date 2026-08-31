import { ComprehensionTrainer } from "@/components/ComprehensionTrainer";
import { PageHeader } from "@/components/PageHeader";

const TITLE = {
  en: "Listening & Summary",
  de: "Hören & Zusammenfassen",
  fr: "Écoute et résumé",
  es: "Escucha y resumen",
  sv: "Lyssna & sammanfatta",
};

const SUBTITLE = {
  en: "Listen to a short professional passage, then summarize it out loud in your own words — scored on content, vocabulary, and structure.",
  de: "Höre dir eine kurze professionelle Passage an und fasse sie dann laut in eigenen Worten zusammen — bewertet nach Inhalt, Wortschatz und Struktur.",
  fr: "Écoutez un court passage professionnel, puis résumez-le à voix haute avec vos propres mots — évalué sur le contenu, le vocabulaire et la structure.",
  es: "Escucha un breve pasaje profesional y luego resúmelo en voz alta con tus propias palabras — evaluado según contenido, vocabulario y estructura.",
  sv: "Lyssna på ett kort professionellt avsnitt och sammanfatta det sedan högt med egna ord — bedöms utifrån innehåll, ordförråd och struktur.",
};

export default function ComprehensionPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12 sm:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <PageHeader title={TITLE} subtitle={SUBTITLE} />

        <ComprehensionTrainer />
      </div>
    </div>
  );
}
