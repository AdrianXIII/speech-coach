import { ComprehensionTrainer } from "@/components/ComprehensionTrainer";
import { PageHeader } from "@/components/PageHeader";
import { DailyLimitReached } from "@/components/DailyLimitReached";
import { requireSignedIn } from "@/lib/requireUser";
import { isPremium } from "@/lib/subscription";
import { canUseToday, markUsedToday } from "@/lib/usageLimitServer";

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

// Gated at page load, not inside app/api/comprehension/news/route.ts — that
// route is legitimately called many times in one real session (browsing
// headlines, shuffling passages), so a per-call limit would burn a free
// user's whole day on their first shuffle. One page visit's worth of
// browsing is the more sensible unit here, same reasoning as the 4 fully
// client-side trainers (see lib/usageLimit.ts's doc comment).
const FEATURE = "comprehension";

export default async function ComprehensionPage() {
  const user = await requireSignedIn();
  const premium = await isPremium(user.id);
  const available = premium || (await canUseToday(user.id, FEATURE));
  if (available && !premium) await markUsedToday(user.id, FEATURE);

  return (
    <div className="min-h-screen bg-paper px-4 py-12 sm:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <PageHeader title={TITLE} subtitle={SUBTITLE} />

        {available ? <ComprehensionTrainer /> : <DailyLimitReached />}
      </div>
    </div>
  );
}
