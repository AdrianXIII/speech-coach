"use client";

import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { COMMON } from "@/lib/commonStrings";
import { getLanguage, type LanguageCode } from "@/lib/languages";

const T: Record<
  LanguageCode,
  { title: string; intro: string; generate: string; writing: string; listen: string; stop: string }
> = {
  en: {
    title: "Hear an Ideal Version",
    intro: "A polished rewrite of what you said — listen to it and try to match its pacing and phrasing next time.",
    generate: "Generate ideal version",
    writing: "Writing…",
    listen: "🔊 Listen",
    stop: "⏹ Stop",
  },
  de: {
    title: "Ideale Version anhören",
    intro: "Eine ausgefeilte Neufassung dessen, was du gesagt hast — hör sie dir an und versuche beim nächsten Mal Tempo und Formulierung zu treffen.",
    generate: "Ideale Version erstellen",
    writing: "Wird geschrieben…",
    listen: "🔊 Anhören",
    stop: "⏹ Stopp",
  },
  fr: {
    title: "Écouter une version idéale",
    intro: "Une réécriture soignée de ce que vous avez dit — écoutez-la et essayez d'en reprendre le rythme et les tournures la prochaine fois.",
    generate: "Générer la version idéale",
    writing: "Rédaction…",
    listen: "🔊 Écouter",
    stop: "⏹ Arrêter",
  },
  es: {
    title: "Escucha una versión ideal",
    intro: "Una reescritura pulida de lo que dijiste: escúchala e intenta imitar su ritmo y sus frases la próxima vez.",
    generate: "Generar versión ideal",
    writing: "Escribiendo…",
    listen: "🔊 Escuchar",
    stop: "⏹ Detener",
  },
  sv: {
    title: "Lyssna på en idealversion",
    intro: "En putsad omskrivning av det du sa — lyssna och försök matcha tempot och formuleringarna nästa gång.",
    generate: "Skapa idealversion",
    writing: "Skriver…",
    listen: "🔊 Lyssna",
    stop: "⏹ Stoppa",
  },
};

interface IdealVersionCardProps {
  transcript: string;
}

/**
 * Turns what you actually said into a polished "ideal" version (in the
 * app's selected language), then reads it aloud with the browser's
 * built-in text-to-speech so you can listen and imitate it.
 */
export function IdealVersionCard({ transcript }: IdealVersionCardProps) {
  const { language } = useLanguage();
  const t = T[language];
  const common = COMMON[language];
  const [idealVersion, setIdealVersion] = useState<string | null>(null);
  const [mocked, setMocked] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  async function handleGenerate() {
    setIsGenerating(true);
    setError(null);
    try {
      const res = await fetch("/api/generate-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: transcript, language }),
      });
      if (!res.ok) throw new Error(common.requestFailed(res.status));
      const data: { script: string; mocked: boolean } = await res.json();
      setIdealVersion(data.script);
      setMocked(data.mocked);
    } catch (err) {
      setError(err instanceof Error ? err.message : common.somethingWentWrong);
    } finally {
      setIsGenerating(false);
    }
  }

  function handleListen() {
    if (!idealVersion || typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(idealVersion);
    utterance.lang = getLanguage(language).speechLang;
    utterance.rate = 0.95;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }

  function handleStop() {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  }

  return (
    <div className="rounded-2xl border border-hairline bg-surface p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-ink">{t.title}</h3>
          <p className="mt-0.5 text-xs text-ink-muted">{t.intro}</p>
        </div>
        {!idealVersion && (
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="whitespace-nowrap rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy-800 disabled:opacity-50"
          >
            {isGenerating ? t.writing : t.generate}
          </button>
        )}
      </div>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      {idealVersion && (
        <div className="mt-4 flex flex-col gap-3 rounded-lg border border-hairline bg-surface-2 p-4">
          {mocked && (
            <p className="rounded-md bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
              Mock mode — set GEMINI_API_KEY for a real AI-polished version.
            </p>
          )}
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink">{idealVersion}</p>
          <button
            onClick={isSpeaking ? handleStop : handleListen}
            className="self-start rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
          >
            {isSpeaking ? t.stop : t.listen}
          </button>
        </div>
      )}
    </div>
  );
}
