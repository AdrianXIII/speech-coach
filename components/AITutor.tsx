"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useMediaRecorder } from "@/hooks/useMediaRecorder";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";
import { CASE_CATEGORIES, type CaseProfession, type CaseStudy } from "@/lib/caseStudyContent";
import type { Fundamental } from "@/lib/caseStudyFundamentals";
import { buildTeachingBrief, pickChallenge, type TeachingBrief, type TutorFeedback } from "@/lib/tutorEngine";
import type { TeachingContent } from "@/lib/tutorTeachingContent";
import type { TutorNewsItem } from "@/lib/tutorNews";
import { loadTutorProfile, type TutorProfile } from "@/lib/tutorProfile";
import { saveTutorFlag } from "@/lib/tutorFlags";
import { JURISDICTION_LABELS } from "@/lib/legalJurisdiction";
import { POLITICAL_SYSTEM_LABELS } from "@/lib/politicalSystem";
import { countryForLanguage } from "@/lib/countryContext";
import { matchSpokenLabel } from "@/lib/voiceMatch";
import { resolveTeachNavCommand, resolveHandoffCommand } from "@/lib/tutorVoiceCommands";
import { categoryLabel, categoryLabels } from "@/lib/categoryLabels";
import { tutorStrings } from "@/lib/tutorUIStrings";
import { ProfessionPicker, PROFESSION_LABELS, professionLabel } from "@/components/shared/ProfessionPicker";
import { CategoryPicker } from "@/components/shared/CategoryPicker";
import { TutorProfileEditor } from "@/components/TutorProfileEditor";
import { FollowUpChat } from "@/components/FollowUpChat";
import { useLanguage } from "@/components/LanguageProvider";
import { getLanguage, type LanguageCode } from "@/lib/languages";

type Phase = "selectProfession" | "selectCategory" | "teach" | "challenge" | "recording" | "evaluating" | "feedback";
type Mode = "core" | "news";
/** Voice answers are routed here so one mic button can serve every prompt in the flow. */
type VoiceIntent = "profession" | "category" | "teachNav" | "handoff" | null;

const ENTITY_LABEL: Record<CaseProfession, string> = {
  business: "company",
  law: "client organization",
  politics: "organization",
};

/**
 * One generic tutor session, voice-first: it teaches the domain step by
 * step (spoken aloud, with a mic button to answer/steer by voice — tap
 * always works too), challenges with a case or live news, listens to a
 * spoken answer, and evaluates knowledge + language + pronunciation
 * together. Domain logic lives in lib/tutorEngine.ts; this component only
 * orchestrates the session and the voice/TTS layer around it.
 */
export function AITutor() {
  const { language } = useLanguage();
  const [phase, setPhase] = useState<Phase>("selectProfession");
  const [profession, setProfession] = useState<CaseProfession | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>("core");

  const [fundamentals, setFundamentals] = useState<Fundamental[]>([]);
  const [exampleApproach, setExampleApproach] = useState("");
  const [teaching, setTeaching] = useState<TeachingContent | null>(null);
  const [teachStepIndex, setTeachStepIndex] = useState(-1); // -1 = overview, 0..N-1 = concepts, N = connections/handoff
  const [isLocalizingTeach, setIsLocalizingTeach] = useState(false);
  // What's actually shown/spoken for the current challenge case — translated
  // when language !== "en" (see /api/tutor/localize-case). currentCase
  // itself stays the canonical English CaseStudy (its id is what's actually
  // submitted for grading).
  const [caseDisplay, setCaseDisplay] = useState<{ title: string; scenario: string } | null>(null);
  const [isLocalizingCase, setIsLocalizingCase] = useState(false);

  // Law and Politics are both country-bound (see lib/legalJurisdiction.ts,
  // lib/politicalSystem.ts) — Business ignores this. Derived from the app
  // language, not stored separately, so it always tracks the language picker.
  const isCountryBound = profession === "law" || profession === "politics";
  const jurisdiction = isCountryBound ? countryForLanguage(language) : undefined;
  const isJurisdictionFallback =
    isCountryBound && !!teaching?.jurisdiction && teaching.jurisdiction !== jurisdiction;
  const jurisdictionLabels = profession === "politics" ? POLITICAL_SYSTEM_LABELS : JURISDICTION_LABELS;

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

  // Voice navigation (profession/category answers, "next"/"repeat"/"back", the
  // handoff question) — a separate recognizer from the one used to record an
  // actual challenge answer below, and short-answer tuned (auto-stops after
  // ~1.5s of silence, so no second tap is needed to say "I'm done").
  const [voiceIntent, setVoiceIntent] = useState<VoiceIntent>(null);
  const [voiceNotice, setVoiceNotice] = useState<string | null>(null);
  const speechLang = getLanguage(language).speechLang;
  const tts = useSpeechSynthesis(speechLang);
  const voiceNav = useSpeechRecognition(speechLang, 1500);

  const { recordedBlob, audioBlob, start: startRecorder, stop: stopRecorder, reset: resetRecorder } =
    useMediaRecorder(false);
  const recognition = useSpeechRecognition(speechLang);

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
    // Grade against whatever jurisdiction was actually taught, not just what
    // was requested — they can differ if that jurisdiction isn't populated
    // yet and Teach fell back to the US default (see isJurisdictionFallback).
    if (profession === "law" || profession === "politics") {
      const actualJurisdiction = teaching?.jurisdiction ?? jurisdiction;
      if (actualJurisdiction) formData.append("jurisdiction", actualJurisdiction);
    }
    formData.append("language", language);

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

  // Speak the current prompt whenever it changes. Every step also shows the
  // same text on screen and has a manual "Repeat" control, since some
  // browsers block audio before any user gesture on first page load.
  useEffect(() => {
    if (phase === "selectProfession") {
      tts.speak(tutorStrings(language).professionPrompt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  useEffect(() => {
    if (phase === "selectCategory" && profession) {
      tts.speak(tutorStrings(language).categoryPrompt(professionLabel(profession, language).label));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, profession]);

  useEffect(() => {
    if (phase !== "teach" || !teaching || isLocalizingTeach) return;
    tts.speak(teachStepText(teaching, teachStepIndex, language));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, teaching, teachStepIndex, isLocalizingTeach]);

  // Resolves whatever the user just said, once voiceNav has settled, against
  // whichever prompt is currently pending (voiceIntent) — one mic button and
  // one matching pipeline serves every voice-answer moment in the flow.
  useEffect(() => {
    if (!voiceIntent || voiceNav.isListening) return;
    const heard = voiceNav.transcript.trim();
    if (!heard) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVoiceIntent(null);
      return;
    }

    if (voiceIntent === "profession") {
      const professions = Object.keys(PROFESSION_LABELS) as CaseProfession[];
      const labels = professions.map((p) => professionLabel(p, language).label);
      const match = matchSpokenLabel(heard, labels);
      const p = match ? professions[labels.indexOf(match)] : null;
      if (p) {
        setVoiceNotice(null);
        handleSelectProfession(p);
      } else {
        setVoiceNotice(`Didn't catch that — try naming a profession, or tap one below.`);
      }
    } else if (voiceIntent === "category" && profession) {
      const categories = CASE_CATEGORIES[profession];
      const labels = categoryLabels(categories, language);
      const match = matchSpokenLabel(heard, labels);
      const cat = match ? categories[labels.indexOf(match)] : null;
      if (cat) {
        setVoiceNotice(null);
        handleSelectCategory(cat);
      } else {
        setVoiceNotice(`Didn't catch that — try naming the category, or tap one below.`);
      }
    } else if (voiceIntent === "teachNav") {
      const cmd = resolveTeachNavCommand(heard, language);
      if (cmd) {
        setVoiceNotice(null);
        handleTeachCommand(cmd);
      } else {
        setVoiceNotice(`Didn't catch that — say "next" or "repeat", or tap a button below.`);
      }
    } else if (voiceIntent === "handoff") {
      const cmd = resolveHandoffCommand(heard, language);
      if (cmd === "news") {
        setVoiceNotice(null);
        setMode("news");
        beginChallenge("news");
      } else if (cmd) {
        setVoiceNotice(null);
        setMode("core");
        beginChallenge("core");
      } else {
        setVoiceNotice(`Didn't catch that — say "standard" or "news", or tap a button below.`);
      }
    }
    setVoiceIntent(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voiceIntent, voiceNav.isListening]);

  function askByVoice(intent: VoiceIntent) {
    setVoiceNotice(null);
    voiceNav.reset();
    setVoiceIntent(intent);
    voiceNav.start();
  }

  function handleSelectProfession(p: CaseProfession) {
    tts.cancel();
    setProfession(p);
    setCategory(null);
    setProfile(loadTutorProfile(p));
    setPhase("selectCategory");
  }

  async function handleSelectCategory(cat: string) {
    if (!profession) return;
    tts.cancel();
    setCategory(cat);
    const brief = buildTeachingBrief(profession, cat, jurisdiction);
    setFundamentals(brief.fundamentals);
    setExampleApproach(brief.exampleApproach);
    setTeachStepIndex(-1);
    setMode("core");
    setNewsFallbackNotice(false);

    if (language === "en" || !brief.teaching) {
      setTeaching(brief.teaching);
      setPhase("teach");
      return;
    }

    // Non-English: translate the teaching content server-side so the
    // lesson is actual language practice, not English to read/hear.
    setTeaching(null);
    setIsLocalizingTeach(true);
    setPhase("teach");
    try {
      const res = await fetch("/api/tutor/localize-teach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profession, category: cat, jurisdiction, language }),
      });
      const data: TeachingBrief = await res.json();
      setTeaching(data.teaching ?? brief.teaching);
    } catch {
      setTeaching(brief.teaching); // fall back to English rather than get stuck
    } finally {
      setIsLocalizingTeach(false);
    }
  }

  function handleTeachCommand(cmd: string) {
    if (!teaching) return;
    if (cmd === "repeat") {
      tts.speak(teachStepText(teaching, teachStepIndex, language));
      return;
    }
    if (cmd === "back" || cmd === "previous") {
      setTeachStepIndex((i) => Math.max(-1, i - 1));
      return;
    }
    setTeachStepIndex((i) => Math.min(teaching.concepts.length, i + 1));
  }

  async function beginChallenge(forceMode?: Mode) {
    if (!profession || !category) return;
    tts.cancel();
    const activeMode = forceMode ?? mode;
    setEvalError(null);
    resetRecorder();
    recognition.reset();

    if (activeMode === "news" && profile) {
      setIsFetchingNews(true);
      setNewsFallbackNotice(false);
      try {
        const res = await fetch("/api/tutor/news", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ profession, category, profile, language, country: jurisdiction }),
        });
        const data: { newsItem: TutorNewsItem | null } = await res.json();
        if (data.newsItem) {
          setNewsItem(data.newsItem);
          setCurrentCase(null);
          setCaseDisplay(null);
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
    const picked = pickChallenge(profession, category);
    setCurrentCase(picked);
    if (!picked) {
      setCaseDisplay(null);
      setPhase("challenge");
      return;
    }

    if (language === "en") {
      setCaseDisplay({ title: picked.title, scenario: picked.scenario });
      setPhase("challenge");
      return;
    }

    // Non-English: translate the case's title/scenario so the challenge is
    // read/heard in the language being practiced, not in English.
    setCaseDisplay(null);
    setIsLocalizingCase(true);
    setPhase("challenge");
    try {
      const res = await fetch("/api/tutor/localize-case", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ caseId: picked.id, language }),
      });
      const data: { title: string; scenario: string } = await res.json();
      setCaseDisplay(data);
    } catch {
      setCaseDisplay({ title: picked.title, scenario: picked.scenario });
    } finally {
      setIsLocalizingCase(false);
    }
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

  async function handleFlagConcept(report: { conceptId: string | null; conceptTitle: string | null; reason: "inaccurate" | "shallow" | "other"; note: string }) {
    if (!profession || !category) return;
    const flag = { profession, category, ...report, at: new Date().toISOString() };
    saveTutorFlag(flag);
    try {
      await fetch("/api/tutor/flag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(flag),
      });
    } catch {
      // Local copy is already saved — the server log is a nice-to-have, not required.
    }
  }

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-hairline bg-surface p-8 shadow-sm">
      {isJurisdictionFallback && jurisdiction && (
        <p className="text-xs text-brass-text">
          Showing {jurisdictionLabels[teaching!.jurisdiction!]} — {jurisdictionLabels[jurisdiction]} content
          isn&rsquo;t available yet.
        </p>
      )}

      {!recognition.isSupported && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Your browser doesn&rsquo;t support speech recognition — try Chrome or Edge to use this exercise.
        </div>
      )}

      {phase === "selectProfession" && (
        <div className="flex flex-col gap-3">
          <ProfessionPicker language={language} onSelect={handleSelectProfession} />
          <VoiceAnswerControl
            prompt={tutorStrings(language).professionPrompt}
            listening={voiceIntent === "profession" && voiceNav.isListening}
            liveTranscript={voiceIntent === "profession" ? voiceNav.transcript : ""}
            notice={voiceIntent === null ? voiceNotice : null}
            onSpeak={() => askByVoice("profession")}
          />
        </div>
      )}

      {phase === "selectCategory" && profession && (
        <div className="flex flex-col gap-3">
          <CategoryPicker
            profession={profession}
            language={language}
            onSelect={handleSelectCategory}
            onBack={() => setPhase("selectProfession")}
          />
          <VoiceAnswerControl
            prompt={tutorStrings(language).categoryPrompt(professionLabel(profession, language).label)}
            listening={voiceIntent === "category" && voiceNav.isListening}
            liveTranscript={voiceIntent === "category" ? voiceNav.transcript : ""}
            notice={voiceIntent === null ? voiceNotice : null}
            onSpeak={() => askByVoice("category")}
          />
        </div>
      )}

      {phase === "teach" && profession && category && profile && (
        <TeachStep
          profession={profession}
          category={category}
          language={language}
          fundamentals={fundamentals}
          exampleApproach={exampleApproach}
          teaching={teaching}
          isLocalizing={isLocalizingTeach}
          teachStepIndex={teachStepIndex}
          isSpeaking={tts.isSpeaking}
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
          onNext={() => handleTeachCommand("next")}
          onBack={() => handleTeachCommand("back")}
          onRepeat={() => handleTeachCommand("repeat")}
          onFlag={handleFlagConcept}
          voiceControl={
            <VoiceAnswerControl
              prompt='Say "next", "repeat", or "back".'
              listening={voiceIntent === "teachNav" && voiceNav.isListening}
              liveTranscript={voiceIntent === "teachNav" ? voiceNav.transcript : ""}
              notice={voiceIntent === null ? voiceNotice : null}
              onSpeak={() => askByVoice("teachNav")}
              compact
            />
          }
          handoffVoiceControl={
            <VoiceAnswerControl
              prompt='Say "standard" or "news".'
              listening={voiceIntent === "handoff" && voiceNav.isListening}
              liveTranscript={voiceIntent === "handoff" ? voiceNav.transcript : ""}
              notice={voiceIntent === null ? voiceNotice : null}
              onSpeak={() => askByVoice("handoff")}
              compact
            />
          }
          onStart={() => beginChallenge()}
          onSkipToChallenge={() => {
            setMode("core");
            beginChallenge("core");
          }}
          onChangeCategory={() => setPhase("selectCategory")}
        />
      )}

      {(phase === "challenge" || phase === "recording") && profession && category && (currentCase || newsItem) && (
        <ChallengeStep
          profession={profession}
          category={category}
          language={language}
          caseDisplay={caseDisplay}
          isLocalizingCase={isLocalizingCase}
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

/** The text spoken (and shown) for a given step of the rich teaching flow. */
function teachStepText(teaching: TeachingContent, stepIndex: number, language: LanguageCode): string {
  const t = tutorStrings(language);
  if (stepIndex === -1) return teaching.overview;
  if (stepIndex < teaching.concepts.length) {
    const c = teaching.concepts[stepIndex];
    return `${c.title}. ${c.explanation} ${c.whyItMatters} ${t.forExample} ${c.example}`;
  }
  return `${teaching.connections} ${t.handoffQuestion}`;
}

/* ─────────────────────────── Voice answer control ─────────────────────────── */

function VoiceAnswerControl({
  prompt,
  listening,
  liveTranscript,
  notice,
  onSpeak,
  compact,
}: {
  prompt: string;
  listening: boolean;
  liveTranscript: string;
  notice: string | null;
  onSpeak: () => void;
  compact?: boolean;
}) {
  return (
    <div className={`flex flex-col items-center gap-2 ${compact ? "" : "rounded-lg border border-hairline p-3"}`}>
      <button
        onClick={onSpeak}
        disabled={listening}
        className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
          listening ? "bg-red-100 text-red-700" : "bg-surface-2 text-ink hover:bg-hairline"
        }`}
      >
        {listening ? (
          <>
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" /> Listening…
          </>
        ) : (
          <>🎤 Answer by voice</>
        )}
      </button>
      {!compact && <p className="text-center text-xs text-ink-muted">{prompt}</p>}
      {listening && liveTranscript && <p className="text-center text-xs italic text-ink-muted">{liveTranscript}</p>}
      {notice && <p className="text-center text-xs text-amber-700">{notice}</p>}
    </div>
  );
}

/* ─────────────────────────── Teach step ─────────────────────────── */

function TeachStep({
  profession,
  category,
  language,
  fundamentals,
  exampleApproach,
  teaching,
  isLocalizing,
  teachStepIndex,
  isSpeaking,
  mode,
  onModeChange,
  profile,
  editingProfile,
  onEditProfile,
  onProfileSaved,
  onCancelEditProfile,
  isFetchingNews,
  onNext,
  onBack,
  onRepeat,
  onFlag,
  voiceControl,
  handoffVoiceControl,
  onStart,
  onSkipToChallenge,
  onChangeCategory,
}: {
  profession: CaseProfession;
  category: string;
  language: LanguageCode;
  fundamentals: Fundamental[];
  exampleApproach: string;
  teaching: TeachingContent | null;
  /** True while /api/tutor/localize-teach is translating content for a non-English language. */
  isLocalizing: boolean;
  teachStepIndex: number;
  isSpeaking: boolean;
  mode: Mode;
  onModeChange: (m: Mode) => void;
  profile: TutorProfile;
  editingProfile: boolean;
  onEditProfile: () => void;
  onProfileSaved: (p: TutorProfile) => void;
  onCancelEditProfile: () => void;
  isFetchingNews: boolean;
  onNext: () => void;
  onBack: () => void;
  onRepeat: () => void;
  onFlag: (report: { conceptId: string | null; conceptTitle: string | null; reason: "inaccurate" | "shallow" | "other"; note: string }) => void;
  voiceControl: ReactNode;
  handoffVoiceControl: ReactNode;
  onStart: () => void;
  /** Jumps straight to a standard case, bypassing the teaching walkthrough — the old Case Studies experience, now reachable from inside the tutor instead of a separate page. */
  onSkipToChallenge: () => void;
  onChangeCategory: () => void;
}) {
  const header = (
    <div className="flex items-center justify-between">
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
        {professionLabel(profession, language).label} · {categoryLabel(category, language)}
      </p>
      <button onClick={onChangeCategory} className="text-xs font-semibold text-brass-text hover:underline">
        ← Change category
      </button>
    </div>
  );

  const sessionTypePicker = (
    <SessionTypePicker
      profession={profession}
      mode={mode}
      onModeChange={onModeChange}
      profile={profile}
      editingProfile={editingProfile}
      onEditProfile={onEditProfile}
      onProfileSaved={onProfileSaved}
      onCancelEditProfile={onCancelEditProfile}
      isFetchingNews={isFetchingNews}
      onStart={onStart}
    />
  );

  if (isLocalizing) {
    return (
      <div className="flex flex-col gap-5">
        {header}
        <div className="flex flex-col items-center gap-3 py-10">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-hairline border-t-brass" />
          <p className="text-sm text-ink-muted">Preparing your lesson…</p>
        </div>
      </div>
    );
  }

  // No generated deep-dive content for this category yet — fall back to the
  // plain fundamentals checklist (silent, tap-only), same as before.
  if (!teaching) {
    return (
      <div className="flex flex-col gap-5">
        {header}
        <div className="rounded-lg bg-surface-2 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-brass-text">
            Core knowledge for {categoryLabel(category, language)}
          </p>
          <p className="mt-1 text-xs text-ink-muted">
            Deep-dive teaching content for this category hasn&rsquo;t been generated yet — here&rsquo;s the
            fundamentals checklist in the meantime.
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
        {sessionTypePicker}
      </div>
    );
  }

  const totalSteps = teaching.concepts.length + 2; // overview + concepts + connections/handoff
  const stepNumber = teachStepIndex + 2; // 1-indexed, overview = 1
  const isOverview = teachStepIndex === -1;
  const isConnections = teachStepIndex === teaching.concepts.length;
  const concept = !isOverview && !isConnections ? teaching.concepts[teachStepIndex] : null;

  return (
    <div className="flex flex-col gap-5">
      {header}

      {isOverview && (
        <button
          onClick={onSkipToChallenge}
          className="self-center text-xs font-semibold text-ink-muted hover:text-brass-text hover:underline"
        >
          Skip the lesson — practice a case now →
        </button>
      )}

      <div className="rounded-lg bg-surface-2 p-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wide text-brass-text">
            {isOverview ? "Overview" : isConnections ? "Putting it together" : concept!.title}
          </p>
          <span className="text-[10px] font-semibold text-ink-muted">
            {stepNumber} / {totalSteps}
          </span>
        </div>

        {isOverview && <p className="mt-2 text-sm leading-relaxed text-ink">{teaching.overview}</p>}

        {concept && (
          <div className="mt-2 flex flex-col gap-2">
            <p className="text-sm leading-relaxed text-ink">{concept.explanation}</p>
            <p className="text-sm leading-relaxed text-ink">
              <span className="font-semibold">Why it matters: </span>
              {concept.whyItMatters}
            </p>
            <p className="text-sm leading-relaxed text-ink-muted">
              <span className="font-semibold text-ink">Example: </span>
              {concept.example}
            </p>
          </div>
        )}

        {isConnections && <p className="mt-2 text-sm leading-relaxed text-ink">{teaching.connections}</p>}

        {isSpeaking && <p className="mt-3 text-xs text-brass-text">🔊 Speaking…</p>}
      </div>

      {concept && <FlagConceptControl conceptId={concept.id} conceptTitle={concept.title} onFlag={onFlag} />}

      {!isConnections && (
        <div className="flex flex-col items-center gap-3">
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={onBack}
              disabled={isOverview}
              className="rounded-lg bg-surface-2 px-4 py-2 text-xs font-semibold text-ink transition-colors hover:bg-hairline disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← Back
            </button>
            <button
              onClick={onRepeat}
              className="rounded-lg bg-surface-2 px-4 py-2 text-xs font-semibold text-ink transition-colors hover:bg-hairline"
            >
              🔁 Repeat
            </button>
            <button
              onClick={onNext}
              className="rounded-lg bg-navy px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-navy-800"
            >
              Next →
            </button>
          </div>
          {voiceControl}
        </div>
      )}

      {isConnections && (
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={onBack}
              className="rounded-lg bg-surface-2 px-4 py-2 text-xs font-semibold text-ink transition-colors hover:bg-hairline"
            >
              ← Back
            </button>
            <button
              onClick={onRepeat}
              className="rounded-lg bg-surface-2 px-4 py-2 text-xs font-semibold text-ink transition-colors hover:bg-hairline"
            >
              🔁 Repeat
            </button>
          </div>
          {sessionTypePicker}
          {handoffVoiceControl}
        </div>
      )}
    </div>
  );
}

function FlagConceptControl({
  conceptId,
  conceptTitle,
  onFlag,
}: {
  conceptId: string;
  conceptTitle: string;
  onFlag: (report: { conceptId: string | null; conceptTitle: string | null; reason: "inaccurate" | "shallow" | "other"; note: string }) => void;
}) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState<"inaccurate" | "shallow" | "other">("inaccurate");
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);

  if (sent) {
    return <p className="text-center text-xs text-ink-muted">Thanks — flagged for review.</p>;
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="self-center text-xs font-semibold text-ink-muted hover:text-brass-text hover:underline"
      >
        🚩 This seems wrong or shallow
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-hairline p-3">
      <div className="flex flex-wrap gap-2">
        {(["inaccurate", "shallow", "other"] as const).map((r) => (
          <button
            key={r}
            onClick={() => setReason(r)}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
              reason === r ? "bg-brass text-navy" : "bg-surface-2 text-ink-muted hover:bg-hairline"
            }`}
          >
            {r}
          </button>
        ))}
      </div>
      <input
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Optional note — what's wrong?"
        className="rounded-lg border border-hairline px-3 py-1.5 text-xs text-ink placeholder:text-ink-muted focus:border-brass focus:outline-none"
      />
      <div className="flex justify-end gap-2">
        <button onClick={() => setOpen(false)} className="text-xs font-semibold text-ink-muted hover:underline">
          Cancel
        </button>
        <button
          onClick={() => {
            onFlag({ conceptId, conceptTitle, reason, note });
            setSent(true);
          }}
          className="rounded-lg bg-navy px-3 py-1.5 text-xs font-semibold text-white hover:bg-navy-800"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────── Session type picker (mode + profile) ─────────────────────────── */

function SessionTypePicker({
  profession,
  mode,
  onModeChange,
  profile,
  editingProfile,
  onEditProfile,
  onProfileSaved,
  onCancelEditProfile,
  isFetchingNews,
  onStart,
}: {
  profession: CaseProfession;
  mode: Mode;
  onModeChange: (m: Mode) => void;
  profile: TutorProfile;
  editingProfile: boolean;
  onEditProfile: () => void;
  onProfileSaved: (p: TutorProfile) => void;
  onCancelEditProfile: () => void;
  isFetchingNews: boolean;
  onStart: () => void;
}) {
  return (
    <div className="flex w-full flex-col gap-5">
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
  language,
  caseDisplay,
  isLocalizingCase,
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
  language: LanguageCode;
  /** Standard-mode case, translated for display when language !== "en" — null while newsItem is the active challenge instead. */
  caseDisplay: { title: string; scenario: string } | null;
  /** True while /api/tutor/localize-case is translating the case for a non-English language. */
  isLocalizingCase: boolean;
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
          {professionLabel(profession, language).label} · {categoryLabel(category, language)}
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

      {isLocalizingCase ? (
        <div className="flex flex-col items-center gap-3 py-6">
          <span className="h-6 w-6 animate-spin rounded-full border-2 border-hairline border-t-brass" />
          <p className="text-sm text-ink-muted">Preparing your challenge…</p>
        </div>
      ) : (
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
          ) : caseDisplay ? (
            <>
              <h3 className="font-display text-base font-semibold text-ink">{caseDisplay.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink">{caseDisplay.scenario}</p>
            </>
          ) : null}
        </div>
      )}

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
