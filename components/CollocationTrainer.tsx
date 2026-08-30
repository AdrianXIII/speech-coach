"use client";

import { useEffect, useMemo, useState } from "react";
import { useMediaRecorder } from "@/hooks/useMediaRecorder";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { pickSession, type CollocationChallenge, type CollocationOption } from "@/lib/collocationContent";
import { checkCollocationUsage, type CollocationUsage } from "@/lib/collocationCheck";
import { getLanguage } from "@/lib/languages";
import { useLanguage } from "@/components/LanguageProvider";

type Phase = "quiz" | "quizFeedback" | "speakPrompt" | "speaking" | "speakFeedback" | "summary";

interface ChallengeResult {
  challengeId: string;
  quizCorrect: boolean;
  spoken: CollocationUsage | null;
  transcript: string;
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Executive Phrasing drill: for each round, pick the correctly "upgraded"
 * professional collocation among plausible-but-wrong options (still-basic,
 * or a grammatically fine but mismatched pairing — the "mitigate risk" vs
 * "mitigate resources" trap), then say a sentence using that exact pairing
 * out loud. The multiple-choice round is pure local content, no AI or
 * speech needed; the spoken round reuses the same Web Speech API hook as
 * Listening & Summary to check whether the verb and noun actually landed
 * together in what was said. Content language follows the app-wide picker
 * in the nav bar (LanguageProvider).
 */
export function CollocationTrainer() {
  const { language } = useLanguage();
  const [session, setSession] = useState<CollocationChallenge[] | null>(null);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("quiz");
  const [selectedOption, setSelectedOption] = useState<CollocationOption | null>(null);
  const [results, setResults] = useState<ChallengeResult[]>([]);

  const { recordedBlob, start: startRecorder, stop: stopRecorder, reset: resetRecorder } =
    useMediaRecorder(false);
  const recognition = useSpeechRecognition(getLanguage(language).speechLang);
  const [isFinalizingSpeech, setIsFinalizingSpeech] = useState(false);

  const challenge = session?.[index] ?? null;
  const shuffledOptions = useMemo(
    () => (challenge ? shuffle(challenge.options) : []),
    [challenge],
  );

  // Recording is an external system (the mic + speech recognizer): this
  // effect reacts once it reports completion (isListening -> false) rather
  // than deriving state during render, which is exactly the sanctioned use
  // of setState-in-effect the lint rule carves out.
  useEffect(() => {
    if (isFinalizingSpeech && !recognition.isListening && challenge) {
      const usage = checkCollocationUsage(
        recognition.transcript,
        challenge.targetVerbStem,
        challenge.targetNounStem,
      );
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResults((prev) => [
        ...prev,
        {
          challengeId: challenge.id,
          quizCorrect: !!selectedOption?.correct,
          spoken: usage,
          transcript: recognition.transcript,
        },
      ]);
      setPhase("speakFeedback");
      setIsFinalizingSpeech(false);
    }
  }, [isFinalizingSpeech, recognition.isListening, recognition.transcript, challenge, selectedOption]);

  function handleSelectOption(option: CollocationOption) {
    if (selectedOption) return;
    setSelectedOption(option);
    if (!recognition.isSupported) {
      setResults((prev) => [
        ...prev,
        { challengeId: challenge!.id, quizCorrect: option.correct, spoken: null, transcript: "" },
      ]);
    }
    setPhase("quizFeedback");
  }

  function handleContinueToSpeaking() {
    setPhase("speakPrompt");
  }

  function handleStartSpeaking() {
    resetRecorder();
    recognition.reset();
    startRecorder();
    recognition.start();
    setPhase("speaking");
  }

  function handleStopSpeaking() {
    stopRecorder();
    recognition.stop();
    setIsFinalizingSpeech(true);
  }

  function goToNext() {
    resetRecorder();
    recognition.reset();
    setSelectedOption(null);
    if (session && index + 1 < session.length) {
      setIndex((i) => i + 1);
      setPhase("quiz");
    } else {
      setPhase("summary");
    }
  }

  function handleNewSession() {
    resetRecorder();
    recognition.reset();
    setSelectedOption(null);
    setResults([]);
    setIndex(0);
    setPhase("quiz");
    setSession(pickSession(language, 5));
  }

  // Re-roll whenever the app-wide language changes (including the very
  // first time it settles, from LanguageProvider's own localStorage load).
  useEffect(() => {
    resetRecorder();
    recognition.reset();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedOption(null);
    setResults([]);
    setIndex(0);
    setPhase("quiz");
    setSession(pickSession(language, 5));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  if (!session || !challenge) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm text-slate-400">Loading…</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      {!recognition.isSupported && phase !== "summary" && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Your browser doesn&rsquo;t support speech recognition — you&rsquo;ll still get the
          multiple-choice round, just not the spoken practice. Try Chrome or Edge for the full
          exercise.
        </div>
      )}

      {phase !== "summary" && (
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Round {index + 1} of {session.length} · {challenge.category}
        </p>
      )}

      {(phase === "quiz" || phase === "quizFeedback") && (
        <QuizStep
          challenge={challenge}
          options={shuffledOptions}
          selected={selectedOption}
          onSelect={handleSelectOption}
          onContinue={recognition.isSupported ? handleContinueToSpeaking : goToNext}
          canSpeak={recognition.isSupported}
        />
      )}

      {phase === "speakPrompt" && (
        <SpeakPromptStep challenge={challenge} onStart={handleStartSpeaking} />
      )}

      {phase === "speaking" && (
        <div className="flex flex-col items-center gap-4 py-6">
          <span className="flex items-center gap-2 text-sm font-semibold text-red-600">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500" />
            Recording…
          </span>
          <p className="min-h-[2.5rem] max-w-md text-center text-sm text-slate-500">
            {recognition.transcript || "…"}
          </p>
          <button
            onClick={handleStopSpeaking}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-800 text-white shadow-lg transition-transform hover:scale-105"
            aria-label="Stop Recording"
          >
            <span className="h-6 w-6 rounded-md bg-white" />
          </button>
        </div>
      )}

      {phase === "speakFeedback" && (
        <SpeakFeedbackStep
          challenge={challenge}
          usage={results[results.length - 1]?.spoken ?? null}
          transcript={results[results.length - 1]?.transcript ?? ""}
          audioBlob={recordedBlob}
          onContinue={goToNext}
        />
      )}

      {phase === "summary" && (
        <SummaryStep session={session} results={results} onNewSession={handleNewSession} />
      )}
    </div>
  );
}

/* ─────────────────────────── Quiz step ─────────────────────────── */

function QuizStep({
  challenge,
  options,
  selected,
  onSelect,
  onContinue,
  canSpeak,
}: {
  challenge: CollocationChallenge;
  options: CollocationOption[];
  selected: CollocationOption | null;
  onSelect: (option: CollocationOption) => void;
  onContinue: () => void;
  canSpeak: boolean;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg bg-slate-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Upgrade this
        </p>
        <p className="mt-1 text-base font-medium text-slate-800">&ldquo;{challenge.weakPhrase}&rdquo;</p>
      </div>

      <div className="flex flex-col gap-2">
        {options.map((option, i) => {
          const isSelected = selected === option;
          const showFeedback = selected !== null;
          const colorClasses = !showFeedback
            ? "border-slate-200 bg-white hover:bg-slate-50"
            : option.correct
              ? "border-emerald-400 bg-emerald-50"
              : isSelected
                ? "border-red-400 bg-red-50"
                : "border-slate-200 bg-white opacity-50";

          return (
            <div key={i}>
              <button
                onClick={() => onSelect(option)}
                disabled={selected !== null}
                className={`w-full rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors ${colorClasses}`}
              >
                {option.phrase}
              </button>
              {showFeedback && (isSelected || option.correct) && (
                <p
                  className={`mt-1 px-1 text-xs ${option.correct ? "text-emerald-700" : "text-red-600"}`}
                >
                  {option.correct ? "✅ " : "❌ "}
                  {option.explanation}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {selected && (
        <button
          onClick={onContinue}
          className="self-center rounded-lg bg-indigo-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
        >
          {canSpeak ? "Now say it →" : "Next round →"}
        </button>
      )}
    </div>
  );
}

/* ─────────────────────────── Speak steps ─────────────────────────── */

function SpeakPromptStep({
  challenge,
  onStart,
}: {
  challenge: CollocationChallenge;
  onStart: () => void;
}) {
  const correctPhrase = challenge.options.find((o) => o.correct)?.phrase ?? "";
  return (
    <div className="flex flex-col items-center gap-4 py-4 text-center">
      <p className="text-sm text-slate-500">{challenge.scenario}</p>
      <p className="rounded-lg bg-indigo-50 px-4 py-3 text-base font-semibold text-indigo-700">
        Use this phrase in a full sentence: &ldquo;{correctPhrase}&rdquo;
      </p>
      <button
        onClick={onStart}
        className="flex h-20 w-20 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform hover:scale-105"
        aria-label="Start Recording"
      >
        <span className="h-6 w-6 rounded-full bg-white" />
      </button>
    </div>
  );
}

function SpeakFeedbackStep({
  challenge,
  usage,
  transcript,
  audioBlob,
  onContinue,
}: {
  challenge: CollocationChallenge;
  usage: CollocationUsage | null;
  transcript: string;
  audioBlob: Blob | null;
  onContinue: () => void;
}) {
  const audioUrl = useMemo(() => (audioBlob ? URL.createObjectURL(audioBlob) : null), [audioBlob]);
  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  return (
    <div className="flex flex-col items-center gap-4 py-4 text-center">
      {usage?.usedTogether ? (
        <p className="text-lg font-semibold text-emerald-700">✅ Nice — you used it correctly.</p>
      ) : usage?.verbUsed || usage?.nounUsed ? (
        <p className="text-lg font-semibold text-amber-700">
          ⚠️ Close — you used part of the phrase, but not the full pairing together.
        </p>
      ) : (
        <p className="text-lg font-semibold text-red-600">
          ❌ Didn&rsquo;t catch that pairing in what you said — try again next round.
        </p>
      )}
      <p className="max-w-md text-sm italic text-slate-500">
        {transcript ? `"${transcript}"` : "(no speech detected)"}
      </p>
      {audioUrl && <audio src={audioUrl} controls className="w-full max-w-sm" />}
      <p className="text-xs text-slate-400">
        Target: {challenge.options.find((o) => o.correct)?.phrase}
      </p>
      <button
        onClick={onContinue}
        className="rounded-lg bg-indigo-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
      >
        Next round →
      </button>
    </div>
  );
}

/* ─────────────────────────── Summary ─────────────────────────── */

function SummaryStep({
  session,
  results,
  onNewSession,
}: {
  session: CollocationChallenge[];
  results: ChallengeResult[];
  onNewSession: () => void;
}) {
  const quizCorrectCount = results.filter((r) => r.quizCorrect).length;
  const spokenAttempted = results.filter((r) => r.spoken !== null);
  const spokenCorrectCount = spokenAttempted.filter((r) => r.spoken?.usedTogether).length;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Recognition
          </p>
          <p className="mt-1 text-3xl font-extrabold text-slate-900">
            {quizCorrectCount}/{session.length}
          </p>
          <p className="text-xs text-slate-500">correct upgrades picked</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Production
          </p>
          <p className="mt-1 text-3xl font-extrabold text-slate-900">
            {spokenAttempted.length > 0 ? `${spokenCorrectCount}/${spokenAttempted.length}` : "—"}
          </p>
          <p className="text-xs text-slate-500">used correctly out loud</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {session.map((c, i) => {
          const r = results[i];
          return (
            <div key={c.id} className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-sm">
              <span className="text-slate-600">{c.category}</span>
              <span>
                {r?.quizCorrect ? "✅" : "❌"} pick
                {r?.spoken && <span className="ml-2">{r.spoken.usedTogether ? "✅" : "❌"} speak</span>}
              </span>
            </div>
          );
        })}
      </div>

      <button
        onClick={onNewSession}
        className="self-center rounded-lg bg-indigo-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
      >
        🎲 New session
      </button>
    </div>
  );
}
