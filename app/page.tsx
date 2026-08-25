"use client";

import { useState } from "react";
import { Recorder } from "@/components/Recorder";
import { FillerWordTracker } from "@/components/FillerWordTracker";
import { FeedbackPanel } from "@/components/FeedbackPanel";
import type { AnalysisResult } from "@/types/analysis";
import type { FeedbackResult } from "@/types/feedback";

type Stage = "idle" | "processing" | "done" | "error";

export default function Home() {
  const [stage, setStage] = useState<Stage>("idle");
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [feedback, setFeedback] = useState<FeedbackResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleRecordingComplete(blob: Blob) {
    setStage("processing");
    setErrorMessage(null);
    try {
      const sessionId = crypto.randomUUID();

      const formData = new FormData();
      formData.append("audio", blob, "recording.webm");
      const transcribeRes = await fetch("/api/transcribe", { method: "POST", body: formData });
      if (!transcribeRes.ok) throw new Error("Transcription failed.");
      const { transcript, durationSeconds } = await transcribeRes.json();

      const analyzeRes = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, transcript, durationSeconds }),
      });
      if (!analyzeRes.ok) throw new Error("Analysis failed.");
      const analysisResult: AnalysisResult = await analyzeRes.json();
      setAnalysis(analysisResult);

      const feedbackRes = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(analysisResult),
      });
      if (!feedbackRes.ok) throw new Error("Feedback generation failed.");
      const feedbackResult: FeedbackResult = await feedbackRes.json();
      setFeedback(feedbackResult);

      setStage("done");
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
      setStage("error");
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12 sm:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <header className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">AI Public Speaking Coach</h1>
          <p className="mt-1 text-sm text-slate-500">
            Record a short speech and get instant feedback on pace, filler words, and delivery.
          </p>
        </header>

        <Recorder onRecordingComplete={handleRecordingComplete} />

        {stage === "processing" && (
          <p className="text-center text-sm text-slate-500">Analyzing your speech…</p>
        )}

        {stage === "error" && (
          <p className="text-center text-sm text-red-600">{errorMessage}</p>
        )}

        {stage === "done" && analysis && <FillerWordTracker stats={analysis.fillerWords} />}
        {stage === "done" && feedback && <FeedbackPanel feedback={feedback} />}
      </div>
    </div>
  );
}
