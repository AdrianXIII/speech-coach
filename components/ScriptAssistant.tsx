"use client";

import { useState } from "react";

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
      if (!res.ok) throw new Error(`Script generation failed (${res.status}).`);
      const data: { script: string; mocked: boolean } = await res.json();
      setScript(data.script);
      setMocked(data.mocked);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <h3 className="text-sm font-semibold text-slate-900">Script Assistant</h3>
        <p className="mt-0.5 text-xs text-slate-500">
          Describe a topic, paste rough notes, or drop in a draft — get back a polished script to
          test in the teleprompter.
        </p>
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="e.g. 'a 2-minute toast for my friend's wedding' or paste a rough draft…"
        rows={3}
        className="w-full resize-none rounded-lg border border-slate-200 p-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none"
      />

      <div className="flex items-center gap-3">
        <button
          onClick={handleGenerate}
          disabled={isGenerating || !input.trim()}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-500 disabled:opacity-50"
        >
          {isGenerating ? "Writing…" : "Get AI script"}
        </button>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>

      {script && (
        <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
          {mocked && (
            <p className="rounded-md bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
              Mock mode — set GEMINI_API_KEY for a real AI-written script.
            </p>
          )}
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">{script}</p>
          <button
            onClick={() => onScriptReady(script)}
            className="self-start rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
          >
            Use this script
          </button>
        </div>
      )}
    </div>
  );
}
