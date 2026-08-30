"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { formatDuration } from "@/lib/audio";
import {
  READING_LEVELS,
  chunkWords,
  chunkDisplayMs,
  clampWpm,
  type ReadingLevel,
} from "@/lib/speedReadingLevels";
import {
  generateComprehensionQuiz,
  generateRecallCheck,
  type ComprehensionQuestion,
} from "@/lib/readingComprehension";
import {
  loadReadingHistory,
  saveReadingResult,
  type ReadingSessionResult,
} from "@/lib/readingHistory";
import { useLanguage } from "@/components/LanguageProvider";
import { getLanguage, type LanguageCode } from "@/lib/languages";

const WORDS_PER_MID_CHECK = 150;
const MIN_WORDS = 30;
const MID_CHECK_LOOKBACK_WORDS = 25;

type Phase = "setup" | "reading" | "midcheck" | "quiz" | "results";

interface SessionResult {
  wpm: number;
  wordCount: number;
  comprehensionPct: number;
  correctCount: number;
  totalQuestions: number;
  elapsedSeconds: number;
}

/**
 * RSVP (rapid serial visual presentation) speed-reading trainer: paste a
 * text, pick a level, and words/chunks flash one at a time with a fixed
 * focus marker. Mid-reading recall checks nudge the speed up or down
 * automatically; an end-of-session quiz measures whether comprehension
 * actually kept up with the higher WPM. Everything — chunking, the recall
 * checks, and the comprehension quiz — runs locally from the pasted text
 * itself, no AI call involved.
 */
export function SpeedReadingTrainer() {
  const [phase, setPhase] = useState<Phase>("setup");
  const [text, setText] = useState("");
  const [levelId, setLevelId] = useState<ReadingLevel["id"]>("beginner");

  const [displayChunk, setDisplayChunk] = useState<string[]>([]);
  const [midCheckQuestion, setMidCheckQuestion] = useState<ComprehensionQuestion | null>(null);
  const [midCheckSelected, setMidCheckSelected] = useState<number | null>(null);

  const [quizQuestions, setQuizQuestions] = useState<ComprehensionQuestion[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>([]);

  const [result, setResult] = useState<SessionResult | null>(null);
  const [history, setHistory] = useState<ReadingSessionResult[]>([]);
  const { language } = useLanguage();
  useEffect(() => {
    // localStorage doesn't exist during SSR, so this has to be a client-only
    // effect — same deliberate pattern as the random pickers elsewhere.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHistory(loadReadingHistory());
  }, []);

  const allWordsRef = useRef<string[]>([]);
  const chunksRef = useRef<string[][]>([]);
  const chunkIndexRef = useRef(0);
  const wordsShownRef = useRef(0);
  const wordsSinceCheckRef = useRef(0);
  const wpmRef = useRef(0);
  const levelRef = useRef<ReadingLevel>(READING_LEVELS[0]);
  const startTimeRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Carries the just-finished session's raw numbers from finish() to
  // handleSubmitQuiz(), across the "quiz" phase where the user answers at
  // their own pace.
  const pendingSessionRef = useRef({ elapsedSeconds: 0, wordCount: 0 });

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function runNext() {
    const chunks = chunksRef.current;
    if (chunkIndexRef.current >= chunks.length) {
      finish();
      return;
    }

    const chunk = chunks[chunkIndexRef.current];
    chunkIndexRef.current += 1;
    wordsShownRef.current += chunk.length;
    wordsSinceCheckRef.current += chunk.length;
    setDisplayChunk(chunk);

    const delay = chunkDisplayMs(chunk, wpmRef.current);
    const dueForCheck =
      wordsSinceCheckRef.current >= WORDS_PER_MID_CHECK && chunkIndexRef.current < chunks.length;

    timeoutRef.current = setTimeout(() => {
      if (dueForCheck) {
        wordsSinceCheckRef.current = 0;
        startMidCheck();
      } else {
        runNext();
      }
    }, delay);
  }

  function startMidCheck() {
    const recent = allWordsRef.current.slice(
      Math.max(0, wordsShownRef.current - MID_CHECK_LOOKBACK_WORDS),
      wordsShownRef.current,
    );
    const question = generateRecallCheck(recent, allWordsRef.current.join(" "), language);
    if (!question) {
      runNext();
      return;
    }
    setMidCheckQuestion(question);
    setMidCheckSelected(null);
    setPhase("midcheck");
  }

  function handleMidCheckAnswer(optionIndex: number) {
    if (midCheckSelected !== null || !midCheckQuestion) return;
    setMidCheckSelected(optionIndex);
    const correct = optionIndex === midCheckQuestion.correctIndex;
    wpmRef.current = clampWpm(wpmRef.current * (correct ? 1.05 : 0.85), levelRef.current);

    setTimeout(() => {
      setMidCheckQuestion(null);
      setMidCheckSelected(null);
      setPhase("reading");
      runNext();
    }, 1100);
  }

  function finish() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    const elapsedSeconds = (performance.now() - startTimeRef.current) / 1000;
    const wordsRead = allWordsRef.current.slice(0, wordsShownRef.current);
    const quiz = generateComprehensionQuiz(wordsRead.join(" "), language, 4);

    setQuizQuestions(quiz);
    setQuizAnswers(new Array(quiz.length).fill(null));
    pendingSessionRef.current = { elapsedSeconds, wordCount: wordsRead.length };
    setPhase("quiz");
  }

  function handleStart() {
    const words = text.trim().split(/\s+/).filter(Boolean);
    if (words.length < MIN_WORDS) return;

    const level = READING_LEVELS.find((l) => l.id === levelId) ?? READING_LEVELS[0];
    levelRef.current = level;
    allWordsRef.current = words;
    chunksRef.current = chunkWords(words, level.maxWordsPerChunk, level.maxCharsPerChunk);
    chunkIndexRef.current = 0;
    wordsShownRef.current = 0;
    wordsSinceCheckRef.current = 0;
    wpmRef.current = (level.wpmMin + level.wpmMax) / 2;
    startTimeRef.current = performance.now();

    setResult(null);
    setPhase("reading");
    runNext();
  }

  function handleFinishNow() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    finish();
  }

  function handleSelectQuizAnswer(questionIndex: number, optionIndex: number) {
    setQuizAnswers((prev) => {
      const next = [...prev];
      next[questionIndex] = optionIndex;
      return next;
    });
  }

  function handleSubmitQuiz() {
    const correctCount = quizQuestions.reduce(
      (count, q, i) => count + (quizAnswers[i] === q.correctIndex ? 1 : 0),
      0,
    );
    const { elapsedSeconds, wordCount } = pendingSessionRef.current;
    const wpm = elapsedSeconds > 0 ? Math.round((wordCount / elapsedSeconds) * 60) : 0;
    const comprehensionPct =
      quizQuestions.length > 0 ? Math.round((correctCount / quizQuestions.length) * 100) : 0;

    setResult({
      wpm,
      wordCount,
      comprehensionPct,
      correctCount,
      totalQuestions: quizQuestions.length,
      elapsedSeconds,
    });
    setHistory(
      saveReadingResult({
        date: new Date().toISOString(),
        levelId: levelRef.current.id,
        wpm,
        comprehensionPct,
      }),
    );
    setPhase("results");
  }

  function handleReadAgain() {
    setPhase("setup");
  }

  function handleNewText() {
    setText("");
    setPhase("setup");
  }

  const wordCount = text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      {phase === "setup" && (
        <SetupPanel
          text={text}
          onTextChange={setText}
          wordCount={wordCount}
          levelId={levelId}
          onLevelChange={setLevelId}
          language={language}
          onStart={handleStart}
        />
      )}

      {(phase === "reading" || phase === "midcheck") && (
        <div className="flex flex-col items-center gap-4">
          {phase === "reading" && (
            <>
              <RsvpDisplay words={displayChunk} />
              <button
                onClick={handleFinishNow}
                className="rounded-lg bg-slate-200 px-6 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-300"
              >
                Done
              </button>
            </>
          )}
          {phase === "midcheck" && midCheckQuestion && (
            <MidCheckPanel
              question={midCheckQuestion}
              selected={midCheckSelected}
              onAnswer={handleMidCheckAnswer}
            />
          )}
        </div>
      )}

      {phase === "quiz" && (
        <QuizPanel
          questions={quizQuestions}
          answers={quizAnswers}
          onSelect={handleSelectQuizAnswer}
          onSubmit={handleSubmitQuiz}
        />
      )}

      {phase === "results" && result && (
        <ResultsPanel
          result={result}
          levelId={levelRef.current.id}
          history={history}
          onReadAgain={handleReadAgain}
          onNewText={handleNewText}
        />
      )}
    </div>
  );
}

/* ─────────────────────────── Setup ─────────────────────────── */

function SetupPanel({
  text,
  onTextChange,
  wordCount,
  levelId,
  onLevelChange,
  language,
  onStart,
}: {
  text: string;
  onTextChange: (value: string) => void;
  wordCount: number;
  levelId: ReadingLevel["id"];
  onLevelChange: (id: ReadingLevel["id"]) => void;
  language: LanguageCode;
  onStart: () => void;
}) {
  const tooShort = wordCount < MIN_WORDS;

  return (
    <div className="flex flex-col gap-5">
      <p className="text-xs text-slate-400">
        Paste text in <span className="font-semibold text-slate-600">{getLanguage(language).name}</span> —
        change the language from the picker in the nav bar above.
      </p>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Text</p>
        <textarea
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="Paste a text to practice on (at least ~30 words)…"
          rows={8}
          className="mt-2 w-full resize-none rounded-lg border border-slate-200 p-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none"
        />
        <p className="mt-1 text-xs text-slate-400">{wordCount} words</p>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Level</p>
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          {READING_LEVELS.map((level) => (
            <button
              key={level.id}
              onClick={() => onLevelChange(level.id)}
              className={`rounded-lg border p-3 text-left transition-colors ${
                levelId === level.id
                  ? "border-indigo-400 bg-indigo-50"
                  : "border-slate-200 bg-white hover:bg-slate-50"
              }`}
            >
              <p className="text-sm font-bold text-slate-900">{level.name}</p>
              <p className="mt-0.5 text-xs text-slate-500">{level.description}</p>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onStart}
        disabled={tooShort}
        className="self-center rounded-lg bg-indigo-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Start reading
      </button>
    </div>
  );
}

/* ─────────────────────────── RSVP display ─────────────────────────── */

/**
 * A single word gets the classic Spritz-style treatment: a fixed pivot
 * letter (~35% into the word) colored and aligned under the guide marker,
 * so the eye can stay still while shorter/longer words flash past. A
 * multi-word chunk (levels 2-3) is just centered as a phrase — splitting a
 * multi-word string into aligned before/pivot/after spans hits real
 * whitespace-collapsing edge cases at the join between words, and the
 * point of chunking is to take in the whole phrase at a glance anyway, not
 * fixate on one letter of it. The red guide ticks are the focus marker
 * either way.
 */
function RsvpDisplay({ words }: { words: string[] }) {
  if (words.length === 1) {
    const word = words[0];
    const pivotIndex = Math.min(word.length - 1, Math.max(0, Math.floor(word.length * 0.35)));
    const before = word.slice(0, pivotIndex);
    const pivot = word.slice(pivotIndex, pivotIndex + 1);
    const after = word.slice(pivotIndex + 1);

    return (
      <FocusBox>
        <span className="w-1/2 truncate text-right">{before}</span>
        <span className="shrink-0 text-red-500">{pivot}</span>
        <span className="w-1/2 truncate text-left">{after}</span>
      </FocusBox>
    );
  }

  return (
    <FocusBox>
      <span className="px-2 text-center">{words.join(" ")}</span>
    </FocusBox>
  );
}

function FocusBox({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex h-40 w-full flex-col items-center justify-center rounded-xl bg-slate-900">
      <div className="absolute top-3 h-3 w-0.5 rounded-full bg-red-500" />
      <div className="flex w-full items-baseline justify-center px-4 font-mono text-3xl font-bold text-white sm:text-4xl">
        {children}
      </div>
      <div className="absolute bottom-3 h-3 w-0.5 rounded-full bg-red-500" />
    </div>
  );
}

/* ─────────────────────────── Mid-reading check ─────────────────────────── */

function MidCheckPanel({
  question,
  selected,
  onAnswer,
}: {
  question: ComprehensionQuestion;
  selected: number | null;
  onAnswer: (index: number) => void;
}) {
  return (
    <div className="flex w-full flex-col items-center gap-4 rounded-xl border border-indigo-200 bg-indigo-50 p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500">Quick check</p>
      <p className="text-center text-base font-medium text-slate-800">{question.prompt}</p>
      <div className="grid w-full max-w-sm grid-cols-2 gap-2">
        {question.options.map((option, i) => {
          const isSelected = selected === i;
          const isCorrect = i === question.correctIndex;
          const showFeedback = selected !== null;
          const colorClasses = !showFeedback
            ? "border-slate-200 bg-white hover:bg-slate-50"
            : isCorrect
              ? "border-emerald-400 bg-emerald-100 text-emerald-800"
              : isSelected
                ? "border-red-400 bg-red-100 text-red-800"
                : "border-slate-200 bg-white opacity-60";

          return (
            <button
              key={i}
              onClick={() => onAnswer(i)}
              disabled={selected !== null}
              className={`rounded-lg border px-3 py-2 text-sm font-semibold transition-colors ${colorClasses}`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────── End-of-session quiz ─────────────────────────── */

function QuizPanel({
  questions,
  answers,
  onSelect,
  onSubmit,
}: {
  questions: ComprehensionQuestion[];
  answers: (number | null)[];
  onSelect: (questionIndex: number, optionIndex: number) => void;
  onSubmit: () => void;
}) {
  const allAnswered = questions.length > 0 && answers.every((a) => a !== null);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Comprehension questions
        </p>
        <p className="mt-1 text-sm text-slate-500">
          Based on the text you just read — nothing to look up, just what you actually absorbed.
        </p>
      </div>

      {questions.map((q, qi) => (
        <div key={qi} className="rounded-lg border border-slate-200 p-4">
          <p className="text-sm font-semibold text-slate-800">{q.prompt}</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {q.options.map((option, oi) => (
              <button
                key={oi}
                onClick={() => onSelect(qi, oi)}
                className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                  answers[qi] === oi
                    ? "border-indigo-400 bg-indigo-50 text-indigo-700"
                    : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={onSubmit}
        disabled={!allAnswered}
        className="self-center rounded-lg bg-indigo-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
      >
        See results
      </button>
    </div>
  );
}

/* ─────────────────────────── Results ─────────────────────────── */

function ResultsPanel({
  result,
  levelId,
  history,
  onReadAgain,
  onNewText,
}: {
  result: SessionResult;
  levelId: string;
  history: ReadingSessionResult[];
  onReadAgain: () => void;
  onNewText: () => void;
}) {
  const previousAtLevel = [...history]
    .reverse()
    .find((h, i) => i > 0 && h.levelId === levelId); // skip the just-saved entry itself

  const improved =
    previousAtLevel &&
    result.wpm > previousAtLevel.wpm &&
    result.comprehensionPct >= previousAtLevel.comprehensionPct;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Speed</p>
          <p className="mt-1 text-3xl font-extrabold text-slate-900">{result.wpm}</p>
          <p className="text-xs text-slate-500">words/minute</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Comprehension</p>
          <p
            className={`mt-1 text-3xl font-extrabold ${
              result.comprehensionPct >= 75 ? "text-emerald-600" : result.comprehensionPct >= 50 ? "text-amber-600" : "text-red-600"
            }`}
          >
            {result.comprehensionPct}%
          </p>
          <p className="text-xs text-slate-500">
            {result.correctCount}/{result.totalQuestions} correct
          </p>
        </div>
      </div>

      <p className="text-center text-xs text-slate-400">
        {result.wordCount} words in {formatDuration(Math.round(result.elapsedSeconds))}
      </p>

      {previousAtLevel && (
        <p
          className={`rounded-lg p-3 text-center text-sm ${
            improved ? "bg-emerald-50 text-emerald-700" : "bg-slate-50 text-slate-600"
          }`}
        >
          {improved
            ? `📈 Faster than last attempt (${previousAtLevel.wpm} → ${result.wpm} wpm) without comprehension dropping — you're actually reading faster, not just skimming.`
            : `Last attempt at this level: ${previousAtLevel.wpm} wpm, ${previousAtLevel.comprehensionPct}% comprehension.`}
        </p>
      )}

      {history.length > 1 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">History</p>
          <div className="mt-2 flex flex-col gap-1">
            {[...history].reverse().slice(0, 6).map((h, i) => (
              <div key={i} className="flex justify-between text-xs text-slate-500">
                <span>{new Date(h.date).toLocaleDateString("en-US")}</span>
                <span>{h.levelId}</span>
                <span>{h.wpm} wpm</span>
                <span>{h.comprehensionPct}% correct</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={onReadAgain}
          className="rounded-lg bg-slate-200 px-6 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-300"
        >
          Read the same text again
        </button>
        <button
          onClick={onNewText}
          className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
        >
          New text
        </button>
      </div>
    </div>
  );
}

