import { Suspense } from "react";
import { PronunciationTrainer } from "@/components/PronunciationTrainer";
import { PageHeader } from "@/components/PageHeader";

const TITLE = {
  en: "Pronunciation Trainer",
  de: "Aussprachetrainer",
  fr: "Entraîneur de prononciation",
  es: "Entrenador de pronunciación",
  sv: "Uttalstränare",
};

const SUBTITLE = {
  en: "Listen to a word, record yourself saying it, and get AI feedback on how close you are to a native pronunciation.",
  de: "Hör dir ein Wort an, nimm dich beim Aussprechen auf und erhalte KI-Feedback, wie nah du an einer muttersprachlichen Aussprache bist.",
  fr: "Écoutez un mot, enregistrez-vous en le prononçant et recevez un retour IA sur la proximité avec une prononciation native.",
  es: "Escucha una palabra, grábate diciéndola y recibe comentarios de la IA sobre lo cerca que estás de una pronunciación nativa.",
  sv: "Lyssna på ett ord, spela in dig själv när du säger det och få AI-feedback på hur nära ett infött uttal du är.",
};

export default function PronunciationPage() {
  return (
    <div className="min-h-screen bg-paper px-4 py-12 sm:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <PageHeader title={TITLE} subtitle={SUBTITLE} />

        {/* useSearchParams (for a "Practice this word" deep link) requires a Suspense boundary. */}
        <Suspense fallback={null}>
          <PronunciationTrainer />
        </Suspense>
      </div>
    </div>
  );
}
