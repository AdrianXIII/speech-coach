"use client";

import { useState } from "react";
import { FollowUpChat } from "@/components/FollowUpChat";
import { useLanguage } from "@/components/LanguageProvider";
import { COMMON } from "@/lib/commonStrings";
import type { LanguageCode } from "@/lib/languages";

const T: Record<
  LanguageCode,
  { title: string; intro: string; placeholder: string; generate: string; writing: string; useScript: string }
> = {
  en: {
    title: "Script Assistant",
    intro: "Describe a topic, paste rough notes, or drop in a draft — get back a polished script to test in the teleprompter.",
    placeholder: "e.g. 'a 2-minute toast for my friend's wedding' or paste a rough draft…",
    generate: "Get AI script",
    writing: "Writing…",
    useScript: "Use this script",
  },
  de: {
    title: "Skript-Assistent",
    intro: "Beschreibe ein Thema, füge Stichpunkte oder einen Entwurf ein — und erhalte ein ausgefeiltes Skript für den Teleprompter.",
    placeholder: "z. B. „eine 2-minütige Rede zur Hochzeit meines Freundes“ oder füge einen Entwurf ein…",
    generate: "KI-Skript erstellen",
    writing: "Wird geschrieben…",
    useScript: "Dieses Skript verwenden",
  },
  fr: {
    title: "Assistant de script",
    intro: "Décrivez un sujet, collez des notes ou un brouillon — et obtenez un script soigné à tester dans le téléprompteur.",
    placeholder: "ex. « un toast de 2 minutes pour le mariage de mon ami » ou collez un brouillon…",
    generate: "Générer un script IA",
    writing: "Rédaction…",
    useScript: "Utiliser ce script",
  },
  es: {
    title: "Asistente de guion",
    intro: "Describe un tema, pega notas o un borrador y recibe un guion pulido para probar en el teleprompter.",
    placeholder: "p. ej. «un brindis de 2 minutos para la boda de mi amigo» o pega un borrador…",
    generate: "Generar guion con IA",
    writing: "Escribiendo…",
    useScript: "Usar este guion",
  },
  sv: {
    title: "Manusassistent",
    intro: "Beskriv ett ämne, klistra in stödord eller ett utkast — och få tillbaka ett putsat manus att testa i teleprompter.",
    placeholder: "t.ex. ”ett 2-minuters tal på min väns bröllop” eller klistra in ett utkast…",
    generate: "Skapa AI-manus",
    writing: "Skriver…",
    useScript: "Använd det här manuset",
  },
};

interface ScriptAssistantProps {
  onScriptReady: (script: string) => void;
}

/**
 * Lets the user describe a topic, paste rough notes, or drop in a draft and
 * get back an AI-polished, speakable script (in the app's selected
 * language) — which they can load straight into the teleprompter.
 */
export function ScriptAssistant({ onScriptReady }: ScriptAssistantProps) {
  const { language } = useLanguage();
  const t = T[language];
  const common = COMMON[language];
  const [input, setInput] = useState("");
  const [script, setScript] = useState<string | null>(null);
  const [scriptInput, setScriptInput] = useState("");
  const [mocked, setMocked] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    if (!input.trim()) return;
    setIsGenerating(true);
    setError(null);
    try {
      const res = await fetch("/api/generate-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input, language }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || common.requestFailed(res.status));
      }
      const data: { script: string; mocked: boolean } = await res.json();
      setScript(data.script);
      setScriptInput(input);
      setMocked(data.mocked);
    } catch (err) {
      setError(err instanceof Error ? err.message : common.somethingWentWrong);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-hairline bg-surface p-5 shadow-sm">
      <div>
        <h3 className="text-sm font-semibold text-ink">{t.title}</h3>
        <p className="mt-0.5 text-xs text-ink-muted">{t.intro}</p>
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={t.placeholder}
        rows={3}
        className="w-full resize-none rounded-lg border border-hairline p-3 text-sm text-ink placeholder:text-ink-muted focus:border-brass focus:outline-none"
      />

      <div className="flex items-center gap-3">
        <button
          onClick={handleGenerate}
          disabled={isGenerating || !input.trim()}
          className="rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy-800 disabled:opacity-50"
        >
          {isGenerating ? t.writing : t.generate}
        </button>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>

      {script && (
        <div className="flex flex-col gap-3 rounded-lg border border-hairline bg-surface-2 p-4">
          {mocked && (
            <p className="rounded-md bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
              Mock mode — set GEMINI_API_KEY for a real AI-written script.
            </p>
          )}
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink">{script}</p>
          <button
            onClick={() => onScriptReady(script)}
            className="self-start rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
          >
            {t.useScript}
          </button>

          <FollowUpChat
            context={`Write a polished, speakable script based on this input: """${scriptInput}"""`}
            initialAnswer={script}
          />
        </div>
      )}
    </div>
  );
}
