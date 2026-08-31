import { SpeedReadingTrainer } from "@/components/SpeedReadingTrainer";
import { PageHeader } from "@/components/PageHeader";

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

export default function SpeedReadingPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12 sm:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <PageHeader title={TITLE} subtitle={SUBTITLE} />

        <SpeedReadingTrainer />
      </div>
    </div>
  );
}
