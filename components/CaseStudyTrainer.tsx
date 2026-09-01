"use client";

import { useEffect, useMemo, useState } from "react";
import { useMediaRecorder } from "@/hooks/useMediaRecorder";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import {
  CASE_CATEGORIES,
  casesForCategory,
  type CaseProfession,
  type CaseStudy,
} from "@/lib/caseStudyContent";
import type { CaseStudyFeedback } from "@/lib/caseStudyFeedback";
import { FollowUpChat } from "@/components/FollowUpChat";
import { useLanguage } from "@/components/LanguageProvider";
import { useAuth } from "@/components/AuthProvider";
import { UpgradeCta } from "@/components/UpgradeCta";
import { getLanguage } from "@/lib/languages";

type Phase = "selectProfession" | "selectCategory" | "case" | "recording" | "grading" | "feedback";

const PROFESSION_LABELS: Record<CaseProfession, { label: string; blurb: string }> = {
  business: { label: "Business", blurb: "Strategy, finance, marketing, operations, and more." },
  law: { label: "Law", blurb: "Contract, corporate, litigation, criminal, and regulatory cases." },
  politics: { label: "Politics", blurb: "Foreign policy, domestic policy, crisis response, and negotiation." },
};

function pickRandom<T>(items: T[], exclude?: T): T {
  const pool = exclude ? items.filter((i) => i !== exclude) : items;
  const source = pool.length > 0 ? pool : items;
  return source[Math.floor(Math.random() * source.length)];
}

/**
 * Case-study drill: pick a profession and category, get a business/legal/
 * political problem to solve out loud, and get it graded by Gemini against
 * a rubric baked into that case (key issues, expected professional
 * concepts, and what a strong answer looks like). English-only for now —
 * see the notice shown when a different app-wide language is selected.
 */
export function CaseStudyTrainer() {
  const { language } = useLanguage();
  const { isPremium } = useAuth();
  const [phase, setPhase] = useState<Phase>("selectProfession");
  const [profession, setProfession] = useState<CaseProfession | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [currentCase, setCurrentCase] = useState<CaseStudy | null>(null);
  const [feedback, setFeedback] = useState<CaseStudyFeedback | null>(null);
  const [gradingError, setGradingError] = useState<string | null>(null);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [lastTranscript, setLastTranscript] = useState("");

  const { recordedBlob, start: startRecorder, stop: stopRecorder, reset: resetRecorder } =
    useMediaRecorder(false);
  const recognition = useSpeechRecognition("en-US");

  // Once stop() has been requested and the recognizer has actually settled,
  // submit the final transcript for grading — same "wait for isListening to
  // go false" pattern used by every other spoken-response feature, since the
  // last chunk of transcript can arrive slightly after stop() is called.
  useEffect(() => {
    if (!isFinalizing || recognition.isListening || !currentCase) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsFinalizing(false);
    const transcript = recognition.transcript.trim();
    setLastTranscript(transcript);
    setPhase("grading");
    setGradingError(null);

    fetch("/api/case-study-feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ caseId: currentCase.id, transcript }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json().catch(() => null);
          throw new Error(body?.error || `Grading failed (${res.status}).`);
        }
        return res.json() as Promise<CaseStudyFeedback>;
      })
      .then((result) => {
        setFeedback(result);
        setPhase("feedback");
      })
      .catch((err) => {
        setGradingError(err instanceof Error ? err.message : "Something went wrong.");
        setPhase("case");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinalizing, recognition.isListening]);

  function handleSelectProfession(p: CaseProfession) {
    setProfession(p);
    setCategory(null);
    setPhase("selectCategory");
  }

  function handleSelectCategory(cat: string) {
    if (!profession) return;
    setCategory(cat);
    setCurrentCase(pickRandom(casesForCategory(profession, cat)));
    setFeedback(null);
    setGradingError(null);
    setPhase("case");
  }

  function handleNewCase() {
    if (!profession || !category) return;
    setCurrentCase((prev) => pickRandom(casesForCategory(profession, category), prev ?? undefined));
    setFeedback(null);
    setGradingError(null);
    resetRecorder();
    recognition.reset();
    setPhase("case");
  }

  function handleStartRecording() {
    resetRecorder();
    recognition.reset();
    startRecorder();
    recognition.start();
    setPhase("recording");
  }

  function handleStopRecording() {
    stopRecorder();
    recognition.stop();
    setIsFinalizing(true);
  }

  const englishOnlyNotice = language !== "en";

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-hairline bg-surface p-8 shadow-sm">
      {englishOnlyNotice && (
        <p className="text-xs text-brass-text">
          Case Studies is English-only for now — showing English content instead of {getLanguage(language).name}.
        </p>
      )}

      {!recognition.isSupported && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Your browser doesn&rsquo;t support speech recognition — try Chrome or Edge to use this exercise.
        </div>
      )}

      {phase === "selectProfession" && (
        <ProfessionPicker onSelect={handleSelectProfession} />
      )}

      {phase === "selectCategory" && profession && (
        <CategoryPicker
          profession={profession}
          onSelect={handleSelectCategory}
          onBack={() => setPhase("selectProfession")}
        />
      )}

      {(phase === "case" || phase === "recording") && currentCase && profession && category && (
        <CaseStep
          caseStudy={currentCase}
          profession={profession}
          category={category}
          phase={phase}
          transcript={recognition.transcript}
          canSpeak={recognition.isSupported}
          isPremium={isPremium}
          gradingError={gradingError}
          onStart={handleStartRecording}
          onStop={handleStopRecording}
          onNewCase={handleNewCase}
          onChangeCategory={() => setPhase("selectCategory")}
        />
      )}

      {phase === "grading" && (
        <div className="flex flex-col items-center gap-3 py-10">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-hairline border-t-brass" />
          <p className="text-sm text-ink-muted">Grading your answer…</p>
        </div>
      )}

      {phase === "feedback" && feedback && currentCase && (
        <FeedbackStep
          caseStudy={currentCase}
          transcript={lastTranscript}
          audioBlob={recordedBlob}
          feedback={feedback}
          onNewCase={handleNewCase}
          onChangeCategory={() => setPhase("selectCategory")}
        />
      )}
    </div>
  );
}

/* ─────────────────────────── Profession picker ─────────────────────────── */

function ProfessionPicker({ onSelect }: { onSelect: (p: CaseProfession) => void }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
        Choose a profession
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        {(Object.keys(PROFESSION_LABELS) as CaseProfession[]).map((p) => (
          <button
            key={p}
            onClick={() => onSelect(p)}
            className="flex flex-col gap-1.5 rounded-xl border border-hairline bg-surface-2 p-5 text-left transition-colors hover:border-brass"
          >
            <span className="font-display text-lg font-semibold text-ink">
              {PROFESSION_LABELS[p].label}
            </span>
            <span className="text-xs text-ink-muted">{PROFESSION_LABELS[p].blurb}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────── Category picker ─────────────────────────── */

function CategoryPicker({
  profession,
  onSelect,
  onBack,
}: {
  profession: CaseProfession;
  onSelect: (category: string) => void;
  onBack: () => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
          {PROFESSION_LABELS[profession].label} — choose a category
        </p>
        <button onClick={onBack} className="text-xs font-semibold text-brass-text hover:underline">
          ← Change profession
        </button>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {CASE_CATEGORIES[profession].map((cat) => {
          const count = casesForCategory(profession, cat).length;
          return (
            <button
              key={cat}
              onClick={() => onSelect(cat)}
              className="flex items-center justify-between rounded-lg border border-hairline bg-surface-2 px-4 py-3 text-left transition-colors hover:border-brass"
            >
              <span className="text-sm font-semibold text-ink">{cat}</span>
              <span className="text-xs text-ink-muted">{count} case{count === 1 ? "" : "s"}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────── Case step ─────────────────────────── */

function CaseStep({
  caseStudy,
  profession,
  category,
  phase,
  transcript,
  canSpeak,
  isPremium,
  gradingError,
  onStart,
  onStop,
  onNewCase,
  onChangeCategory,
}: {
  caseStudy: CaseStudy;
  profession: CaseProfession;
  category: string;
  phase: "case" | "recording";
  transcript: string;
  canSpeak: boolean;
  isPremium: boolean;
  gradingError: string | null;
  onStart: () => void;
  onStop: () => void;
  onNewCase: () => void;
  onChangeCategory: () => void;
}) {
  const locked = !!caseStudy.premium && !isPremium;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
          {PROFESSION_LABELS[profession].label} · {category}
        </p>
        <button onClick={onChangeCategory} className="text-xs font-semibold text-brass-text hover:underline">
          ← Change category
        </button>
      </div>

      <div className="rounded-lg bg-surface-2 p-5">
        <div className="flex items-center gap-2">
          <h3 className="font-display text-base font-semibold text-ink">{caseStudy.title}</h3>
          {caseStudy.premium && (
            <span className="rounded-full border border-brass bg-brass/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brass-text">
              Premium
            </span>
          )}
        </div>
        <p className={`mt-2 text-sm leading-relaxed text-ink ${locked ? "line-clamp-2 opacity-70" : ""}`}>
          {caseStudy.scenario}
        </p>
      </div>

      {locked && (
        <div className="flex flex-col items-center gap-3">
          <UpgradeCta message="This case is part of Speech Coach Premium." />
          <button onClick={onNewCase} className="text-xs font-semibold text-brass-text hover:underline">
            🎲 Different case in this category
          </button>
        </div>
      )}

      {gradingError && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {gradingError}
        </p>
      )}

      {!locked && phase === "case" && (
        <div className="flex flex-col items-center gap-3 py-2">
          <p className="text-sm text-ink-muted">
            Think it through, then record your solution out loud.
          </p>
          <button
            onClick={onStart}
            disabled={!canSpeak}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Start Recording"
          >
            <span className="h-6 w-6 rounded-full bg-white" />
          </button>
          <button onClick={onNewCase} className="text-xs font-semibold text-brass-text hover:underline">
            🎲 Different case in this category
          </button>
        </div>
      )}

      {phase === "recording" && (
        <div className="flex flex-col items-center gap-4 py-2">
          <span className="flex items-center gap-2 text-sm font-semibold text-red-600">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500" />
            Recording…
          </span>
          <p className="min-h-[3rem] max-w-md text-center text-sm text-ink-muted">
            {transcript || "…"}
          </p>
          <button
            onClick={onStop}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-navy text-white shadow-lg transition-transform hover:scale-105"
            aria-label="Stop Recording"
          >
            <span className="h-6 w-6 rounded-md bg-white" />
          </button>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────── Feedback step ─────────────────────────── */

function scoreColor(score: number): string {
  if (score >= 75) return "text-emerald-600";
  if (score >= 50) return "text-amber-600";
  return "text-red-600";
}

function FeedbackStep({
  caseStudy,
  transcript,
  audioBlob,
  feedback,
  onNewCase,
  onChangeCategory,
}: {
  caseStudy: CaseStudy;
  transcript: string;
  audioBlob: Blob | null;
  feedback: CaseStudyFeedback;
  onNewCase: () => void;
  onChangeCategory: () => void;
}) {
  const audioUrl = useMemo(() => (audioBlob ? URL.createObjectURL(audioBlob) : null), [audioBlob]);
  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  const chatContext = useMemo(
    () =>
      `Case: "${caseStudy.title}"\n${caseStudy.scenario}\n\nMy spoken answer: "${transcript || "(no speech detected)"}"`,
    [caseStudy, transcript],
  );
  const chatInitialAnswer = useMemo(
    () =>
      `Score: ${feedback.score}/100 — ${feedback.verdict}\n\nCorrectness: ${feedback.correctnessFeedback}\n\nStructure: ${feedback.structureFeedback}\n\nProfessional vocabulary: ${feedback.vocabularyFeedback}`,
    [feedback],
  );

  return (
    <div className="flex flex-col gap-6">
      {feedback.mocked && (
        <p className="rounded-md bg-amber-100 px-3 py-2 text-xs font-medium text-amber-800">
          Mock mode — set GEMINI_API_KEY for real AI grading.
        </p>
      )}

      <div className="flex flex-col items-center gap-1 rounded-xl border border-hairline bg-surface-2 p-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Score</p>
        <p className={`text-4xl font-extrabold ${scoreColor(feedback.score)}`}>{feedback.score}</p>
        <p className="text-sm text-ink-muted">{feedback.verdict}</p>
      </div>

      <div className="flex flex-col gap-3">
        <FeedbackBlock label="Correctness" text={feedback.correctnessFeedback} />
        <FeedbackBlock label="Structure" text={feedback.structureFeedback} />
        <FeedbackBlock label="Professional vocabulary" text={feedback.vocabularyFeedback} />
      </div>

      <div className="rounded-lg border border-hairline p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
          Read up on this before trying again
        </p>
        <ul className="mt-2 flex flex-col gap-1.5">
          {feedback.readingTips.map((tip) => (
            <li key={tip} className="text-sm text-ink">
              • {tip}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-lg bg-surface-2 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">What you said</p>
        <p className="mt-2 text-sm italic text-ink-muted">
          {transcript ? `"${transcript}"` : "(no speech detected)"}
        </p>
        {audioUrl && <audio src={audioUrl} controls className="mt-3 w-full max-w-sm" />}
      </div>

      <FollowUpChat context={chatContext} initialAnswer={chatInitialAnswer} />

      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={onChangeCategory}
          className="rounded-lg bg-surface-2 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-hairline"
        >
          Change category
        </button>
        <button
          onClick={onNewCase}
          className="rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
        >
          🎲 Try another case
        </button>
      </div>
    </div>
  );
}

function FeedbackBlock({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-lg border border-hairline p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-brass-text">{label}</p>
      <p className="mt-1 text-sm leading-relaxed text-ink">{text}</p>
    </div>
  );
}
