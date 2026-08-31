"use client";

import { useState } from "react";
import { FollowUpChat } from "@/components/FollowUpChat";

interface ScriptAssistantProps {
  onScriptReady: (script: string) => void;
}

/**
 * Lets the user describe a topic, paste rough notes, or drop in a draft and
 * get back an AI-polished, speakable script — which they can load straight
 * into the teleprompter to test whether it sounds better out loud.
 */
export function ScriptAssistant({ onScriptReady }: ScriptAssistantProps) {
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
        body: JSON.stringify({ input }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || `Script generation failed (${res.status}).`);
      }
      const data: { script: string; mocked: boolean } = await res.json();
      setScript(data.script);
      setScriptInput(input);
      setMocked(data.mocked);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-hairline bg-surface p-5 shadow-sm">
      <div>
        <h3 className="text-sm font-semibold text-ink">Script Assistant</h3>
        <p className="mt-0.5 text-xs text-ink-muted">
          Describe a topic, paste rough notes, or drop in a draft — get back a polished script to
          test in the teleprompter.
        </p>
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="e.g. 'a 2-minute toast for my friend's wedding' or paste a rough draft…"
        rows={3}
        className="w-full resize-none rounded-lg border border-hairline p-3 text-sm text-ink placeholder:text-ink-muted focus:border-brass focus:outline-none"
      />

      <div className="flex items-center gap-3">
        <button
          onClick={handleGenerate}
          disabled={isGenerating || !input.trim()}
          className="rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy-800 disabled:opacity-50"
        >
          {isGenerating ? "Writing…" : "Get AI script"}
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
            Use this script
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
