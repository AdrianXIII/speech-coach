"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import type { LanguageCode } from "@/lib/languages";

const T: Record<LanguageCode, { title: string; placeholder: string; speed: string; empty: string }> = {
  en: {
    title: "Teleprompter notes",
    placeholder: "Paste or write your speech notes here — they'll scroll automatically once you start recording.",
    speed: "Scroll speed",
    empty: "No notes added — add some before you start next time.",
  },
  de: {
    title: "Teleprompter-Notizen",
    placeholder: "Füge deine Redenotizen hier ein oder schreibe sie — sie scrollen automatisch, sobald die Aufnahme startet.",
    speed: "Scrollgeschwindigkeit",
    empty: "Keine Notizen — füge beim nächsten Mal vor dem Start welche hinzu.",
  },
  fr: {
    title: "Notes du téléprompteur",
    placeholder: "Collez ou écrivez vos notes ici — elles défileront automatiquement dès le début de l'enregistrement.",
    speed: "Vitesse de défilement",
    empty: "Aucune note — ajoutez-en avant de commencer la prochaine fois.",
  },
  es: {
    title: "Notas del teleprompter",
    placeholder: "Pega o escribe aquí tus notas: se desplazarán automáticamente cuando empieces a grabar.",
    speed: "Velocidad de desplazamiento",
    empty: "Sin notas: añade algunas antes de empezar la próxima vez.",
  },
  sv: {
    title: "Teleprompteranteckningar",
    placeholder: "Klistra in eller skriv dina talanteckningar här — de rullar automatiskt när inspelningen startar.",
    speed: "Rullningshastighet",
    empty: "Inga anteckningar — lägg till några innan du börjar nästa gång.",
  },
};

interface TeleprompterProps {
  text: string;
  onTextChange: (text: string) => void;
  /** True while recording — switches from the editable notes box to the auto-scrolling overlay. */
  isScrolling: boolean;
}

const MIN_SPEED = 10; // px/sec
const MAX_SPEED = 120;
const DEFAULT_SPEED = 40;

/**
 * Speech-notes box that doubles as a scrolling teleprompter overlay once
 * recording starts. Auto-scroll runs on requestAnimationFrame, driven by
 * elapsed time (not a fixed-interval tick) so speed stays consistent
 * regardless of frame rate.
 */
export function Teleprompter({ text, onTextChange, isScrolling }: TeleprompterProps) {
  const { language } = useLanguage();
  const t = T[language];
  const [speed, setSpeed] = useState(DEFAULT_SPEED);
  const scrollRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isScrolling) return;

    function tick(ts: number) {
      const el = scrollRef.current;
      if (el && lastTsRef.current !== null) {
        const dtSeconds = (ts - lastTsRef.current) / 1000;
        el.scrollTop += speed * dtSeconds;
      }
      lastTsRef.current = ts;
      frameRef.current = requestAnimationFrame(tick);
    }
    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      lastTsRef.current = null;
    };
  }, [isScrolling, speed]);

  if (!isScrolling) {
    return (
      <div className="flex flex-col gap-3 rounded-2xl border border-hairline bg-surface p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-ink">{t.title}</h3>
        <textarea
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder={t.placeholder}
          rows={7}
          className="w-full resize-none rounded-lg border border-hairline p-3 text-sm text-ink focus:border-brass focus:outline-none"
        />
        <label className="flex items-center gap-3 text-xs text-ink-muted">
          {t.speed}
          <input
            type="range"
            min={MIN_SPEED}
            max={MAX_SPEED}
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="flex-1 accent-navy"
          />
          <span className="w-8 text-right font-medium text-ink">{speed}</span>
        </label>
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      className="max-h-48 overflow-y-auto rounded-xl border border-white/10 bg-black/70 p-5 text-lg font-medium leading-relaxed text-white backdrop-blur-sm"
    >
      {text.trim() ? (
        <p className="whitespace-pre-wrap">{text}</p>
      ) : (
        <p className="text-white/50">{t.empty}</p>
      )}
      {/* trailing space so the last line isn't stuck at the bottom edge */}
      <div className="h-32" />
    </div>
  );
}
