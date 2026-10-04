import { Suspense } from "react";
import { PronunciationTrainer } from "@/components/PronunciationTrainer";
import { PageHeader } from "@/components/PageHeader";
import { DailyLimitReached } from "@/components/DailyLimitReached";
import { requireSignedIn } from "@/lib/requireUser";
import { isPremium } from "@/lib/subscription";
import { canUseToday } from "@/lib/usageLimitServer";

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

// Read-only check — /api/pronunciation-feedback itself still gates and
// marks the once-a-day use, right before the actual Gemini call. This only
// decides whether to show the trainer (word lookup, review list, and AI
// feedback together — "one session per trainer, per day" per the pricing
// page) or the paywall card.
export default async function PronunciationPage() {
  const user = await requireSignedIn();
  const premium = await isPremium(user.id);
  const available = premium || (await canUseToday(user.id, "pronunciation"));

  return (
    <div className="min-h-screen bg-paper px-4 py-12 sm:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <PageHeader title={TITLE} subtitle={SUBTITLE} />

        {available ? (
          // useSearchParams (for a "Practice this word" deep link) requires a Suspense boundary.
          <Suspense fallback={null}>
            <PronunciationTrainer />
          </Suspense>
        ) : (
          <DailyLimitReached />
        )}
      </div>
    </div>
  );
}
