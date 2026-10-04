import { SpeechRecorder } from "@/components/SpeechRecorder";
import { PageHeader } from "@/components/PageHeader";
import { DailyLimitReached } from "@/components/DailyLimitReached";
import { requireSignedIn } from "@/lib/requireUser";
import { isPremium } from "@/lib/subscription";
import { canUseToday } from "@/lib/usageLimitServer";

const TITLE = {
  en: "AI Public Speaking Coach",
  de: "KI-Coach für öffentliches Sprechen",
  fr: "Coach IA de prise de parole",
  es: "Coach de oratoria con IA",
  sv: "AI-coach för att tala inför publik",
};

const SUBTITLE = {
  en: "Record a short speech and get instant feedback on pace, filler words, and delivery — or switch to Stage practice for video, a live audience, and a teleprompter.",
  de: "Nimm eine kurze Rede auf und erhalte sofort Feedback zu Tempo, Füllwörtern und Vortrag — oder wechsle zur Bühnenübung mit Video, Publikum und Teleprompter.",
  fr: "Enregistrez un court discours et recevez un retour immédiat sur le débit, les mots de remplissage et l'élocution — ou passez à l'entraînement sur scène avec vidéo, public et téléprompteur.",
  es: "Graba un discurso breve y recibe comentarios al instante sobre ritmo, muletillas y expresión, o cambia a la práctica en escenario con vídeo, público y teleprompter.",
  sv: "Spela in ett kort tal och få direkt feedback på tempo, utfyllnadsord och framförande — eller byt till scenövning med video, publik och teleprompter.",
};

// Unlike collocations/contrastive-stress/speed-reading/improv (which have no
// server action of their own to gate at, so they mark usage at page load —
// see lib/usageLimitServer.ts's doc comment), /api/analyze-speech already
// gates and marks the once-a-day use itself, right before the actual Gemini
// call. canUseToday() here is read-only (no markUsedToday call) — it only
// decides whether to show the trainer or the paywall card; the API route
// remains the single place a use actually gets spent.
export default async function RecordPage() {
  const user = await requireSignedIn();
  const premium = await isPremium(user.id);
  const available = premium || (await canUseToday(user.id, "record"));

  return (
    <div className="min-h-screen bg-paper px-4 py-12 sm:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <PageHeader title={TITLE} subtitle={SUBTITLE} />
        {available ? <SpeechRecorder /> : <DailyLimitReached />}
      </div>
    </div>
  );
}
