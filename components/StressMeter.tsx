"use client";

import { useEffect, useState } from "react";
import { measureSyllableStress, type StressMeasurement } from "@/lib/audioStress";
import type { WordStress } from "@/lib/wordStress";

interface StressMeterProps {
  word: string;
  audioBlob: Blob;
}

/**
 * Instant, local stress check: splits the word into syllables (from the CMU
 * Pronouncing Dictionary), measures loudness/pitch per syllable in the
 * recording (Web Audio API, no network round trip), and shows which
 * syllable actually came out strongest vs. which one should have. No AI
 * call — this is meant to replace reaching for "Get AI Feedback" on every
 * single attempt; that button stays available for a deeper explanation.
 */
export function StressMeter({ word, audioBlob }: StressMeterProps) {
  const [wordStress, setWordStress] = useState<WordStress | null>(null);
  const [measurement, setMeasurement] = useState<StressMeasurement | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "unsupported" | "error">("loading");

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        const res = await fetch(`/api/word-stress?word=${encodeURIComponent(word)}`);
        const stress: WordStress = await res.json();
        if (cancelled) return;

        if (!stress.found) {
          setStatus("unsupported");
          return;
        }
        setWordStress(stress);

        const result = await measureSyllableStress(audioBlob, stress.syllableCount);
        if (cancelled) return;
        setMeasurement(result);
        setStatus("ready");
      } catch {
        if (!cancelled) setStatus("error");
      }
    }
    run();

    return () => {
      cancelled = true;
    };
  }, [word, audioBlob]);

  if (status === "loading") {
    return <p className="text-sm text-slate-400">Measuring stress…</p>;
  }
  if (status === "unsupported") {
    return (
      <p className="text-sm text-slate-400">
        No stress data for this word/phrase — try &ldquo;Get AI Feedback&rdquo; below instead.
      </p>
    );
  }
  if (status === "error" || !wordStress || !measurement) {
    return <p className="text-sm text-slate-400">Couldn&rsquo;t measure stress for that recording.</p>;
  }

  const expected = wordStress.stressedSyllableIndex;
  const measured = measurement.measuredStressIndex;
  const isCorrect = expected === measured;

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Stress check</p>

      <div className="flex items-end justify-center gap-3">
        {wordStress.syllables.map((syllable, i) => {
          const syllableMeasurement = measurement.syllables[i];
          const heightPct = Math.round(20 + (syllableMeasurement?.relativeLoudness ?? 0) * 80);
          const isExpected = i === expected;
          const isMeasured = i === measured;

          return (
            <div key={i} className="flex w-16 flex-col items-center gap-1.5">
              {isExpected && <span className="text-[10px] font-semibold text-indigo-500">should stress</span>}
              <div className="flex h-20 w-full items-end justify-center rounded-md bg-slate-100">
                <div
                  className={`w-8 rounded-t-md transition-all ${
                    isMeasured ? (isCorrect ? "bg-emerald-500" : "bg-amber-500") : "bg-slate-300"
                  }`}
                  style={{ height: `${heightPct}%` }}
                />
              </div>
              <span
                className={`text-sm font-semibold ${isExpected ? "text-indigo-600" : "text-slate-600"}`}
              >
                {syllable}
              </span>
            </div>
          );
        })}
      </div>

      <p className={`text-center text-sm ${isCorrect ? "text-emerald-700" : "text-amber-700"}`}>
        {isCorrect
          ? `✅ Nice — you stressed the right syllable ("${wordStress.syllables[expected]}").`
          : `Try emphasizing "${wordStress.syllables[expected]}" more — right now "${wordStress.syllables[measured]}" is coming out strongest.`}
      </p>

      <p className="text-center text-[11px] text-slate-400">
        Approximate — based on volume and pitch, not lab-grade phonetic analysis.
      </p>
    </div>
  );
}
