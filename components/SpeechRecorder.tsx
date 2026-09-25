"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useMediaRecorder } from "@/hooks/useMediaRecorder";
import { formatDuration } from "@/lib/audio";
import { AudienceGrid } from "@/components/stage/AudienceGrid";
import { Teleprompter } from "@/components/stage/Teleprompter";
import { ScriptAssistant } from "@/components/ScriptAssistant";
import { DashboardResults } from "@/components/DashboardResults";
import type { AnalyzeSpeechResponse } from "@/types/speechAnalysis";
import { useLanguage } from "@/components/LanguageProvider";
import { COMMON } from "@/lib/commonStrings";
import type { LanguageCode } from "@/lib/languages";

type Mode = "simple" | "stage";

const T: Record<
  LanguageCode,
  {
    simple: string;
    stage: string;
    recording: string;
    complete: string;
    pressToStart: string;
    analyze: string;
    analyzing: string;
    recordAgain: string;
    cameraPreview: string;
    startPractice: string;
    stop: string;
    practiceAgain: string;
  }
> = {
  en: {
    simple: "Simple recording",
    stage: "Stage practice (video + audience)",
    recording: "Recording…",
    complete: "Recording complete",
    pressToStart: "Press to start recording",
    analyze: "Analyze Speech",
    analyzing: "Analyzing…",
    recordAgain: "Record Again",
    cameraPreview: "Your camera preview will appear here once you start",
    startPractice: "Start Practice",
    stop: "Stop",
    practiceAgain: "Practice Again",
  },
  de: {
    simple: "Einfache Aufnahme",
    stage: "Bühnenübung (Video + Publikum)",
    recording: "Aufnahme läuft…",
    complete: "Aufnahme abgeschlossen",
    pressToStart: "Drücken, um die Aufnahme zu starten",
    analyze: "Rede analysieren",
    analyzing: "Wird analysiert…",
    recordAgain: "Neu aufnehmen",
    cameraPreview: "Deine Kameravorschau erscheint hier, sobald du startest",
    startPractice: "Übung starten",
    stop: "Stopp",
    practiceAgain: "Nochmal üben",
  },
  fr: {
    simple: "Enregistrement simple",
    stage: "Entraînement sur scène (vidéo + public)",
    recording: "Enregistrement…",
    complete: "Enregistrement terminé",
    pressToStart: "Appuyez pour commencer l'enregistrement",
    analyze: "Analyser le discours",
    analyzing: "Analyse…",
    recordAgain: "Réenregistrer",
    cameraPreview: "L'aperçu de votre caméra apparaîtra ici dès que vous commencerez",
    startPractice: "Commencer l'entraînement",
    stop: "Arrêter",
    practiceAgain: "Recommencer",
  },
  es: {
    simple: "Grabación simple",
    stage: "Práctica en escenario (vídeo + público)",
    recording: "Grabando…",
    complete: "Grabación completa",
    pressToStart: "Pulsa para empezar a grabar",
    analyze: "Analizar discurso",
    analyzing: "Analizando…",
    recordAgain: "Grabar de nuevo",
    cameraPreview: "La vista previa de tu cámara aparecerá aquí cuando empieces",
    startPractice: "Empezar práctica",
    stop: "Detener",
    practiceAgain: "Practicar de nuevo",
  },
  sv: {
    simple: "Enkel inspelning",
    stage: "Scenövning (video + publik)",
    recording: "Spelar in…",
    complete: "Inspelningen är klar",
    pressToStart: "Tryck för att börja spela in",
    analyze: "Analysera talet",
    analyzing: "Analyserar…",
    recordAgain: "Spela in igen",
    cameraPreview: "Din kameraförhandsvisning visas här när du börjar",
    startPractice: "Starta övning",
    stop: "Stoppa",
    practiceAgain: "Öva igen",
  },
};

/**
 * Delivery practice, in two modes sharing one recording/analysis pipeline:
 * "Simple" is a plain audio recorder; "Stage" adds webcam video, a live
 * "audience" that reacts while you speak, a teleprompter overlay for notes,
 * and an AI script-drafting assistant. Both submit to the same
 * /api/analyze-speech pipeline and render the same DashboardResults — they
 * were two separate pages until this merge, since the only real difference
 * between them was how much practice-environment dressing surrounds the
 * same underlying record → analyze loop.
 */
export function SpeechRecorder() {
  const { language } = useLanguage();
  const t = T[language];
  const common = COMMON[language];
  const [mode, setMode] = useState<Mode>("simple");
  const { isRecording, recordedBlob, audioBlob, stream, start, stop, reset, error } =
    useMediaRecorder(mode === "stage");

  const [notes, setNotes] = useState("");
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const livePreviewRef = useRef<HTMLVideoElement>(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzeError, setAnalyzeError] = useState<string | null>(null);
  const [results, setResults] = useState<AnalyzeSpeechResponse | null>(null);

  // Stage mode only: bind the live camera stream to the preview <video>.
  useEffect(() => {
    if (livePreviewRef.current) {
      livePreviewRef.current.srcObject = stream;
    }
  }, [stream]);

  useEffect(() => {
    if (!isRecording) return;
    intervalRef.current = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRecording]);

  // recordedBlob is audio-only in simple mode and video in stage mode —
  // audioBlob is always the audio-only track, which is what playback and
  // analysis should use in simple mode; stage mode plays back the video.
  const playbackUrl = useMemo(() => {
    const blob = mode === "stage" ? recordedBlob : (audioBlob ?? recordedBlob);
    return blob ? URL.createObjectURL(blob) : null;
  }, [mode, recordedBlob, audioBlob]);
  useEffect(() => {
    return () => {
      if (playbackUrl) URL.revokeObjectURL(playbackUrl);
    };
  }, [playbackUrl]);

  function handleModeChange(next: Mode) {
    if (isRecording) return;
    setMode(next);
    reset();
    setElapsedSeconds(0);
    setAnalyzeError(null);
    setResults(null);
  }

  function handleStart() {
    setElapsedSeconds(0);
    start();
  }

  function handleRecordAgain() {
    reset();
    setElapsedSeconds(0);
    setAnalyzeError(null);
    setResults(null);
  }

  async function handleAnalyze() {
    const blob = audioBlob ?? recordedBlob;
    if (!blob) return;
    setIsAnalyzing(true);
    setAnalyzeError(null);
    try {
      const formData = new FormData();
      formData.append("audio", blob, "speech.webm");
      formData.append("durationSeconds", String(elapsedSeconds));
      formData.append("language", language);

      const res = await fetch("/api/analyze-speech", { method: "POST", body: formData });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || common.requestFailed(res.status));
      }

      const result: AnalyzeSpeechResponse = await res.json();
      setResults(result);
    } catch (err) {
      setAnalyzeError(err instanceof Error ? err.message : common.somethingWentWrong);
    } finally {
      setIsAnalyzing(false);
    }
  }

  const hasRecording = !!recordedBlob;
  const showLiveStage = mode === "stage" && isRecording;
  const showStageReview = mode === "stage" && hasRecording && !isRecording;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-center gap-2">
        <button
          onClick={() => handleModeChange("simple")}
          disabled={isRecording}
          className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
            mode === "simple" ? "bg-brass text-navy" : "bg-surface-2 text-ink-muted hover:bg-hairline"
          }`}
        >
          {t.simple}
        </button>
        <button
          onClick={() => handleModeChange("stage")}
          disabled={isRecording}
          className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
            mode === "stage" ? "bg-brass text-navy" : "bg-surface-2 text-ink-muted hover:bg-hairline"
          }`}
        >
          {t.stage}
        </button>
      </div>

      {mode === "simple" && (
        <div className="flex flex-col items-center gap-6 rounded-2xl border border-hairline bg-surface p-8 shadow-sm">
          <div className="font-mono text-4xl font-bold tabular-nums text-ink">
            {formatDuration(elapsedSeconds)}
          </div>

          {!isRecording ? (
            <button
              onClick={handleStart}
              disabled={hasRecording}
              className="flex h-24 w-24 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
              aria-label={common.startRecording}
            >
              <span className="h-7 w-7 rounded-full bg-surface" />
            </button>
          ) : (
            <button
              onClick={stop}
              className="flex h-24 w-24 items-center justify-center rounded-full bg-navy text-white shadow-lg transition-transform hover:scale-105"
              aria-label={common.stopRecording}
            >
              <span className="h-7 w-7 rounded-md bg-surface" />
            </button>
          )}

          <p className="text-sm font-semibold text-ink-muted">
            {isRecording ? t.recording : hasRecording ? t.complete : t.pressToStart}
          </p>

          {error && <p className="text-sm text-red-600">{error}</p>}

          {playbackUrl && !isRecording && (
            <div className="flex w-full flex-col items-center gap-4">
              <audio src={playbackUrl} controls className="w-full max-w-sm" />

              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800 disabled:opacity-50"
                >
                  {isAnalyzing ? t.analyzing : t.analyze}
                </button>
                <button
                  onClick={handleRecordAgain}
                  disabled={isAnalyzing}
                  className="rounded-lg bg-surface-2 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-hairline disabled:opacity-50"
                >
                  {t.recordAgain}
                </button>
              </div>

              {analyzeError && <p className="text-sm text-red-600">{analyzeError}</p>}
            </div>
          )}
        </div>
      )}

      {mode === "stage" && (
        <div className="flex flex-col gap-6">
          <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <div className="flex flex-col gap-4">
              <div className="relative overflow-hidden rounded-2xl border border-hairline bg-navy-800 shadow-sm">
                {showLiveStage ? (
                  <video ref={livePreviewRef} autoPlay muted playsInline className="aspect-video w-full object-cover" />
                ) : showStageReview ? (
                  <video src={playbackUrl ?? undefined} controls className="aspect-video w-full" />
                ) : (
                  <div className="flex aspect-video w-full items-center justify-center text-sm text-cream-muted">
                    {t.cameraPreview}
                  </div>
                )}

                {showLiveStage && (
                  <div className="absolute inset-x-4 bottom-4">
                    <Teleprompter text={notes} onTextChange={setNotes} isScrolling />
                  </div>
                )}

                {showLiveStage && (
                  <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur-sm">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                    {formatDuration(elapsedSeconds)}
                  </div>
                )}
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <div className="flex justify-center gap-3">
                {!isRecording && !hasRecording && (
                  <button
                    onClick={handleStart}
                    className="rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
                  >
                    {t.startPractice}
                  </button>
                )}
                {isRecording && (
                  <button
                    onClick={stop}
                    className="rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
                  >
                    {t.stop}
                  </button>
                )}
                {showStageReview && (
                  <>
                    <button
                      onClick={handleAnalyze}
                      disabled={isAnalyzing || !audioBlob}
                      className="rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800 disabled:opacity-50"
                    >
                      {isAnalyzing ? t.analyzing : t.analyze}
                    </button>
                    <button
                      onClick={handleRecordAgain}
                      disabled={isAnalyzing}
                      className="rounded-lg bg-surface-2 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-hairline disabled:opacity-50"
                    >
                      {t.practiceAgain}
                    </button>
                  </>
                )}
              </div>

              {analyzeError && <p className="text-center text-sm text-red-600">{analyzeError}</p>}
            </div>

            <AudienceGrid engaged={isRecording} />
          </div>

          {!isRecording && (
            <div className="flex flex-col gap-4">
              <Teleprompter text={notes} onTextChange={setNotes} isScrolling={false} />
              <ScriptAssistant onScriptReady={setNotes} />
            </div>
          )}
        </div>
      )}

      {results && <DashboardResults data={results} />}
    </div>
  );
}
