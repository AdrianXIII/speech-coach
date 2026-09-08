"use client";

import { useEffect, useMemo, useState } from "react";
import { useMediaRecorder } from "@/hooks/useMediaRecorder";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { type CaseProfession, type CaseStudy } from "@/lib/caseStudyContent";
import type { Fundamental } from "@/lib/caseStudyFundamentals";
import { buildTeachingBrief, pickChallenge, type TutorFeedback } from "@/lib/tutorEngine";
import type { TutorNewsItem } from "@/lib/tutorNews";
import { loadTutorProfile, type TutorProfile } from "@/lib/tutorProfile";
import { ProfessionPicker, PROFESSION_LABELS } from "@/components/shared/ProfessionPicker";
import { CategoryPicker } from "@/components/shared/CategoryPicker";
import { TutorProfileEditor } from "@/components/TutorProfileEditor";
import { FollowUpChat } from "@/components/FollowUpChat";
import { useLanguage } from "@/components/LanguageProvider";
import { getLanguage } from "@/lib/languages";

type Phase = "selectProfession" | "selectCategory" | "teach" | "challenge" | "recording" | "evaluating" | "feedback";
type Mode = "core" | "news";

const ENTITY_LABEL: Record<CaseProfession, string> = {
  business: "company",
  law: "client organization",
  politics: "organization",
};

/**
 * One generic tutor session: teach the domain's fundamentals, challenge with
 * a case (or a live news item), listen to a spoken answer, and evaluate
 * knowledge + language + pronunciation together. Same Area → Domain flow as
 * Case Studies (shared pickers), same voice pipeline, same Gemini backend —
 * this component only orchestrates the session, all domain logic lives in
 * lib/tutorEngine.ts.
 */
export function AITutor() {
  const { language } = useLanguage();
  const [phase, setPhase] = useState<Phase>("selectProfession");
  const [profession, setProfession] = useState<CaseProfession | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>("core");

  const [fundamentals, setFundamentals] = useState<Fundamental[]>([]);
  const [exampleApproach, setExampleApproach] = useState("");

  const [profile, setProfile] = useState<TutorProfile | null>(null);
  const [editingProfile, setEditingProfile] = useState(false);

  const [currentCase, setCurrentCase] = useState<CaseStudy | null>(null);
  const [newsItem, setNewsItem] = useState<TutorNewsItem | null>(null);
  const [isFetchingNews, setIsFetchingNews] = useState(false);
  const [newsFallbackNotice, setNewsFallbackNotice] = useState(false);

  const [feedback, setFeedback] = useState<TutorFeedback | null>(null);
  const [evalError, setEvalError] = useState<string | null>(null);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [lastTranscript, setLastTranscript] = useState("");

  const { recordedBlob, audioBlob, start: startRecorder, stop: stopRecorder, reset: resetRecorder } =
    useMediaRecorder(false);
  const recognition = useSpeechRecognition("en-US");

  // Same "wait for isListening to settle" pattern as Case Studies — the
  // recognizer's last chunk can arrive slightly after stop() is called.
  useEffect(() => {
    if (!isFinalizing || recognition.isListening) return;
    if (!currentCase && !newsItem) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsFinalizing(false);
    const transcript = recognition.transcript.trim();
    setLastTranscript(transcript);
    setPhase("evaluating");
    setEvalError(null);

    const formData = new FormData();
    formData.append("profession", profession!);
    formData.append("category", category!);
    formData.append("transcript", transcript);
    if (currentCase) formData.append("caseId", currentCase.id);
    if (newsItem) formData.append("newsItem", JSON.stringify(newsItem));
    if (profile) formData.append("profile", JSON.stringify(profile));
    if (audioBlob) formData.append("audio", audioBlob, "tutor-answer.webm");

    fetch("/api/tutor/evaluate", { method: "POST", body: formData })
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json().catch(() => null);
          throw new Error(body?.error || `Evaluation failed (${res.status}).`);
        }
        return res.json() as Promise<TutorFeedback>;
      })
      .then((result) => {
        setFeedback(result);
        setPhase("feedback");
      })
      .catch((err) => {
        setEvalError(err instanceof Error ? err.message : "Something went wrong.");
        setPhase("challenge");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinalizing, recognition.isListening]);

  function handleSelectProfession(p: CaseProfession) {
    setProfession(p);
    setCategory(null);
    setProfile(loadTutorProfile(p));
    setPhase("selectCategory");
  }

  function handleSelectCategory(cat: string) {
    if (!profession) return;
    setCategory(cat);
    const brief = buildTeachingBrief(profession, cat);
    setFundamentals(brief.fundamentals);
    setExampleApproach(brief.exampleApproach);
    setMode("core");
    setNewsFallbackNotice(false);
    setPhase("teach");
  }

  async function beginChallenge() {
    if (!profession || !category) return;
    setEvalError(null);
    resetRecorder();
    recognition.reset();

    if (mode === "news" && profile) {
      setIsFetchingNews(true);
      setNewsFallbackNotice(false);
      try {
        const res = await fetch("/api/tutor/news", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ profession, category, profile }),
        });
        const data: { newsItem: TutorNewsItem | null } = await res.json();
        if (data.newsItem) {
          setNewsItem(data.newsItem);
          setCurrentCase(null);
          setIsFetchingNews(false);
          setPhase("challenge");
          return;
        }
      } catch {
        // fall through to the standard-case fallback below
      }
      // Graceful fallback: news fetch failed or returned nothing — use a standard case instead.
      setNewsFallbackNotice(true);
      setIsFetchingNews(false);
    }

    setNewsItem(null);
    setCurrentCase(pickChallenge(profession, category));
    setPhase("challenge");
  }

  function handleNewChallenge() {
    if (!profession || !category) return;
    setFeedback(null);
    setEvalError(null);
    resetRecorder();
    recognition.reset();
    beginChallenge();
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
          The AI Tutor is English-only for now — showing English content instead of {getLanguage(language).name}.
        </p>
      )}

      {!recognition.isSupported && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Your browser doesn&rsquo;t support speech recognition — try Chrome or Edge to use this exercise.
        </div>
      )}

      {phase === "selectProfession" && <ProfessionPicker onSelect={handleSelectProfession} />}

      {phase === "selectCategory" && profession && (
        <CategoryPicker
          profession={profession}
          onSelect={handleSelectCategory}
          onBack={() => setPhase("selectProfession")}
        />
      )}

      {phase === "teach" && profession && category && profile && (
        <TeachStep
          profession={profession}
          category={category}
          fundamentals={fundamentals}
          exampleApproach={exampleApproach}
          mode={mode}
          onModeChange={setMode}
          profile={profile}
          editingProfile={editingProfile}
          onEditProfile={() => setEditingProfile(true)}
          onProfileSaved={(p) => {
            setProfile(p);
            setEditingProfile(false);
          }}
          onCancelEditProfile={() => setEditingProfile(false)}
          isFetchingNews={isFetchingNews}
          onStart={beginChallenge}
          onChangeCategory={() => setPhase("selectCategory")}
        />
      )}

      {(phase === "challenge" || phase === "recording") && profession && category && (currentCase || newsItem) && (
        <ChallengeStep
          profession={profession}
          category={category}
          caseStudy={currentCase}
          newsItem={newsItem}
          newsFallbackNotice={newsFallbackNotice}
          phase={phase}
          transcript={recognition.transcript}
          canSpeak={recognition.isSupported}
          evalError={evalError}
          onStart={handleStartRecording}
          onStop={handleStopRecording}
          onNewChallenge={handleNewChallenge}
          onChangeCategory={() => setPhase("selectCategory")}
        />
      )}

      {phase === "evaluating" && (
        <div className="flex flex-col items-center gap-3 py-10">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-hairline border-t-brass" />
          <p className="text-sm text-ink-muted">Evaluating your answer…</p>
        </div>
      )}

      {phase === "feedback" && feedback && (currentCase || newsItem) && (
        <FeedbackStep
          caseStudy={currentCase}
          newsItem={newsItem}
          transcript={lastTranscript}
          audioBlob={recordedBlob}
          feedback={feedback}
          onNewChallenge={handleNewChallenge}
          onChangeCategory={() => setPhase("selectCategory")}
        />
      )}
    </div>
  );
}

/* ─────────────────────────── Teach step ─────────────────────────── */

function TeachStep({
  profession,
  category,
  fundamentals,
  exampleApproach,
  mode,
  onModeChange,
  profile,
  editingProfile,
  onEditProfile,
  onProfileSaved,
  onCancelEditProfile,
  isFetchingNews,
  onStart,
  onChangeCategory,
}: {
  profession: CaseProfession;
  category: string;
  fundamentals: Fundamental[];
  exampleApproach: string;
  mode: Mode;
  onModeChange: (m: Mode) => void;
  profile: TutorProfile;
  editingProfile: boolean;
  onEditProfile: () => void;
  onProfileSaved: (p: TutorProfile) => void;
  onCancelEditProfile: () => void;
  isFetchingNews: boolean;
  onStart: () => void;
  onChangeCategory: () => void;
}) {
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
        <p className="text-xs font-semibold uppercase tracking-wide text-brass-text">
          Core knowledge for {category}
        </p>
        {fundamentals.length > 0 ? (
          <ul className="mt-3 flex flex-col gap-1.5">
            {fundamentals.map((f) => (
              <li key={f.id} className="text-sm text-ink">
                • {f.label}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-ink-muted">
            No fundamentals catalogued yet for this category — you&rsquo;ll still be graded against
            the challenge&rsquo;s own key issues.
          </p>
        )}
        {exampleApproach && (
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">
            <span className="font-semibold text-ink">What a strong answer looks like: </span>
            {exampleApproach}
          </p>
        )}
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Session type</p>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          <button
            onClick={() => onModeChange("core")}
            className={`rounded-lg border p-3 text-left transition-colors ${
              mode === "core" ? "border-brass bg-surface-2" : "border-hairline bg-surface hover:bg-surface-2"
            }`}
          >
            <p className="text-sm font-bold text-ink">Standard case</p>
            <p className="mt-0.5 text-xs text-ink-muted">A realistic case drawn from this category.</p>
          </button>
          <button
            onClick={() => onModeChange("news")}
            className={`rounded-lg border p-3 text-left transition-colors ${
              mode === "news" ? "border-brass bg-surface-2" : "border-hairline bg-surface hover:bg-surface-2"
            }`}
          >
            <p className="text-sm font-bold text-ink">Live news</p>
            <p className="mt-0.5 text-xs text-ink-muted">
              A real, current news story applied to your fictive {ENTITY_LABEL[profession]}.
            </p>
          </button>
        </div>
      </div>

      {mode === "news" && (
        <div className="flex flex-col gap-3">
          {editingProfile ? (
            <TutorProfileEditor
              profession={profession}
              profile={profile}
              onSave={onProfileSaved}
              onClose={onCancelEditProfile}
            />
          ) : (
            <div className="flex items-center justify-between rounded-lg border border-hairline p-4">
              <div>
                <p className="text-sm font-semibold text-ink">{profile.name}</p>
                <p className="text-xs text-ink-muted">
                  {profile.description} · {profile.size} · {profile.market}
                </p>
              </div>
              <button onClick={onEditProfile} className="text-xs font-semibold text-brass-text hover:underline">
                Edit
              </button>
            </div>
          )}
        </div>
      )}

      <button
        onClick={onStart}
        disabled={isFetchingNews}
        className="self-center rounded-lg bg-navy px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isFetchingNews ? "Finding a news story…" : "Start challenge"}
      </button>
    </div>
  );
}

/* ─────────────────────────── Challenge step ─────────────────────────── */

function ChallengeStep({
  profession,
  category,
  caseStudy,
  newsItem,
  newsFallbackNotice,
  phase,
  transcript,
  canSpeak,
  evalError,
  onStart,
  onStop,
  onNewChallenge,
  onChangeCategory,
}: {
  profession: CaseProfession;
  category: string;
  caseStudy: CaseStudy | null;
  newsItem: TutorNewsItem | null;
  newsFallbackNotice: boolean;
  phase: "challenge" | "recording";
  transcript: string;
  canSpeak: boolean;
  evalError: string | null;
  onStart: () => void;
  onStop: () => void;
  onNewChallenge: () => void;
  onChangeCategory: () => void;
}) {
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

      {newsFallbackNotice && (
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Couldn&rsquo;t fetch a live news story — here&rsquo;s a standard case instead.
        </p>
      )}

      <div className="rounded-lg bg-surface-2 p-5">
        {newsItem ? (
          <>
            <h3 className="font-display text-base font-semibold text-ink">{newsItem.headline}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink">{newsItem.summary}</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              <span className="font-semibold text-ink">Connection: </span>
              {newsItem.connection}
            </p>
            <p className="mt-3 text-sm font-semibold leading-relaxed text-ink">{newsItem.appliedQuestion}</p>
          </>
        ) : caseStudy ? (
          <>
            <h3 className="font-display text-base font-semibold text-ink">{caseStudy.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink">{caseStudy.scenario}</p>
          </>
        ) : null}
      </div>

      {evalError && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{evalError}</p>
      )}

      {phase === "challenge" && (
        <div className="flex flex-col items-center gap-3 py-2">
          <p className="text-sm text-ink-muted">Think it through, then record your answer out loud.</p>
          <button
            onClick={onStart}
            disabled={!canSpeak}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Start Recording"
          >
            <span className="h-6 w-6 rounded-full bg-white" />
          </button>
          <button onClick={onNewChallenge} className="text-xs font-semibold text-brass-text hover:underline">
            🎲 Different challenge
          </button>
        </div>
      )}

      {phase === "recording" && (
        <div className="flex flex-col items-center gap-4 py-2">
          <span className="flex items-center gap-2 text-sm font-semibold text-red-600">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500" />
            Recording…
          </span>
          <p className="min-h-[3rem] max-w-md text-center text-sm text-ink-muted">{transcript || "…"}</p>
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

function FeedbackStep({
  caseStudy,
  newsItem,
  transcript,
  audioBlob,
  feedback,
  onNewChallenge,
  onChangeCategory,
}: {
  caseStudy: CaseStudy | null;
  newsItem: TutorNewsItem | null;
  transcript: string;
  audioBlob: Blob | null;
  feedback: TutorFeedback;
  onNewChallenge: () => void;
  onChangeCategory: () => void;
}) {
  const audioUrl = useMemo(() => (audioBlob ? URL.createObjectURL(audioBlob) : null), [audioBlob]);
  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  const title = caseStudy?.title ?? newsItem?.headline ?? "";
  const prompt = caseStudy?.scenario ?? newsItem?.appliedQuestion ?? "";

  const chatContext = useMemo(
    () => `Challenge: "${title}"\n${prompt}\n\nMy spoken answer: "${transcript || "(no speech detected)"}"`,
    [title, prompt, transcript],
  );
  const chatInitialAnswer = useMemo(
    () =>
      `Summary: ${feedback.summary}\n\nCovered: ${feedback.knowledge.covered.join(", ") || "—"}\nMissed: ${
        feedback.knowledge.missed.join(", ") || "—"
      }\nCorrections: ${feedback.knowledge.corrections.join(", ") || "—"}`,
    [feedback],
  );

  return (
    <div className="flex flex-col gap-6">
      {feedback.mocked && (
        <p className="rounded-md bg-amber-100 px-3 py-2 text-xs font-medium text-amber-800">
          Mock mode — set GEMINI_API_KEY for real AI tutoring.
        </p>
      )}

      <div className="rounded-xl border border-hairline bg-surface-2 p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Summary</p>
        <p className="mt-2 text-sm leading-relaxed text-ink">{feedback.summary}</p>
      </div>

      <div className="rounded-lg border border-brass/40 bg-brass/5 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-brass-text">Knowledge</p>
        <FeedbackList label="Covered" items={feedback.knowledge.covered} tone="good" />
        <FeedbackList label="Missed" items={feedback.knowledge.missed} tone="bad" />
        <FeedbackList label="Corrections" items={feedback.knowledge.corrections} tone="bad" />
      </div>

      <div className="flex flex-col gap-3">
        <FeedbackBlock label="Terminology" text={feedback.language.terminology} />
        <FeedbackBlock label="Word choice" text={feedback.language.wordChoice} />
        <FeedbackBlock label="Grammar & clarity" text={feedback.language.grammar} />
        <FeedbackBlock label="Pronunciation" text={feedback.pronunciation} />
      </div>

      {feedback.nextSteps.length > 0 && (
        <div className="rounded-lg border border-hairline p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Practice next</p>
          <ul className="mt-2 flex flex-col gap-1.5">
            {feedback.nextSteps.map((step) => (
              <li key={step} className="text-sm text-ink">
                • {step}
              </li>
            ))}
          </ul>
        </div>
      )}

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
          onClick={onNewChallenge}
          className="rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
        >
          🎲 Try another challenge
        </button>
      </div>
    </div>
  );
}

function FeedbackList({ label, items, tone }: { label: string; items: string[]; tone: "good" | "bad" }) {
  if (items.length === 0) return null;
  return (
    <div className="mt-2">
      <p className={`text-xs font-semibold ${tone === "good" ? "text-emerald-600" : "text-ink"}`}>{label}</p>
      <ul className="mt-1 flex flex-col gap-1">
        {items.map((item) => (
          <li key={item} className="text-sm text-ink">
            • {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FeedbackBlock({ label, text }: { label: string; text: string }) {
  if (!text) return null;
  return (
    <div className="rounded-lg border border-hairline p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-brass-text">{label}</p>
      <p className="mt-1 text-sm leading-relaxed text-ink">{text}</p>
    </div>
  );
}
