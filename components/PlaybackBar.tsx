import { useLanguage } from "@/components/LanguageProvider";
import type { LanguageCode } from "@/lib/languages";

interface PlaybackBarProps {
  isSupported: boolean;
  isSpeaking: boolean;
  elapsedSeconds: number;
  estimatedTotalSeconds: number;
  onPlayPause: () => void;
  onSkipBack: () => void;
  onSkipForward: () => void;
}

const T: Record<LanguageCode, { back: string; pause: string; play: string; forward: string }> = {
  en: { back: "Back 10 seconds", pause: "Pause", play: "Play", forward: "Forward 10 seconds" },
  de: { back: "10 Sekunden zurück", pause: "Pause", play: "Abspielen", forward: "10 Sekunden vor" },
  fr: { back: "Reculer de 10 secondes", pause: "Pause", play: "Lecture", forward: "Avancer de 10 secondes" },
  es: { back: "Retroceder 10 segundos", pause: "Pausa", play: "Reproducir", forward: "Avanzar 10 segundos" },
  sv: { back: "Tillbaka 10 sekunder", pause: "Pausa", play: "Spela upp", forward: "Framåt 10 sekunder" },
};

function formatTime(seconds: number): string {
  const s = Math.max(0, Math.round(seconds));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, "0")}`;
}

/**
 * Play/pause + skip-back-10s/skip-forward-10s for AI Tutor's teach step,
 * backed by hooks/useSpeechPlayback.ts. The progress bar is an estimate
 * (browser TTS exposes no real position/duration) — see that hook's doc
 * comment for why, and why skip/pause both restart from an estimated word
 * offset rather than using speechSynthesis.pause()/resume() directly.
 */
export function PlaybackBar({
  isSupported,
  isSpeaking,
  elapsedSeconds,
  estimatedTotalSeconds,
  onPlayPause,
  onSkipBack,
  onSkipForward,
}: PlaybackBarProps) {
  const { language } = useLanguage();
  const t = T[language];

  if (!isSupported) return null;

  const progress = estimatedTotalSeconds > 0 ? Math.min(1, elapsedSeconds / estimatedTotalSeconds) : 0;

  return (
    <div className="mt-3 flex flex-col gap-2 rounded-lg border border-hairline bg-surface px-4 py-3">
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
        <div
          className="h-full rounded-full bg-brass transition-[width]"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <div className="flex items-center gap-4">
          <button
            onClick={onSkipBack}
            aria-label={t.back}
            className="flex h-8 w-8 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink"
          >
            <BackIcon />
          </button>
          <button
            onClick={onPlayPause}
            aria-label={isSpeaking ? t.pause : t.play}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-white transition-colors hover:bg-navy-800"
          >
            {isSpeaking ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button
            onClick={onSkipForward}
            aria-label={t.forward}
            className="flex h-8 w-8 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink"
          >
            <ForwardIcon />
          </button>
        </div>
        <span className="font-mono text-[11px] tabular-nums text-ink-muted">
          {formatTime(elapsedSeconds)} / {formatTime(estimatedTotalSeconds)}
        </span>
      </div>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 translate-x-[1px]" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 17L6 12l5-5M18 17l-5-5 5-5" />
    </svg>
  );
}

function ForwardIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 17l5-5-5-5M6 17l5-5-5-5" />
    </svg>
  );
}
