import { SpeechRecorder } from "@/components/SpeechRecorder";
import { PageHeader } from "@/components/PageHeader";

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

export default function RecordPage() {
  return (
    <div className="min-h-screen bg-paper px-4 py-12 sm:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <PageHeader title={TITLE} subtitle={SUBTITLE} />
        <SpeechRecorder />
      </div>
    </div>
  );
}
