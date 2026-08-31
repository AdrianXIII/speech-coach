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

const T: Record<LanguageCode, {
  pasteInstruction: (langName: string) => string;
  text: string;
  placeholder: string;
  wordsCount: (n: number) => string;
  level: string;
  startReading: string;
  done: string;
  quickCheck: string;
  comprehensionQuestions: string;
  comprehensionSubtitle: string;
  seeResults: string;
  speed: string;
  wordsPerMinute: string;
  comprehension: string;
  correctOf: (correct: number, total: number) => string;
  percentCorrect: (pct: number) => string;
  wordsInDuration: (words: number, duration: string) => string;
  improvedNote: (prevWpm: number, wpm: number) => string;
  lastAttemptNote: (prevWpm: number, prevPct: number) => string;
  history: string;
  readAgain: string;
  newText: string;
  levelShortNames: Record<"beginner" | "intermediate" | "advanced", string>;
}> = {
  en: {
    pasteInstruction: (l) => `Paste text in ${l} — change the language from the picker in the nav bar above.`,
    text: "Text",
    placeholder: "Paste a text to practice on (at least ~30 words)…",
    wordsCount: (n) => `${n} words`,
    level: "Level",
    startReading: "Start reading",
    done: "Done",
    quickCheck: "Quick check",
    comprehensionQuestions: "Comprehension questions",
    comprehensionSubtitle: "Based on the text you just read — nothing to look up, just what you actually absorbed.",
    seeResults: "See results",
    speed: "Speed",
    wordsPerMinute: "words/minute",
    comprehension: "Comprehension",
    correctOf: (c, t) => `${c}/${t} correct`,
    percentCorrect: (pct) => `${pct}% correct`,
    wordsInDuration: (w, d) => `${w} words in ${d}`,
    improvedNote: (prev, wpm) => `📈 Faster than last attempt (${prev} → ${wpm} wpm) without comprehension dropping — you're actually reading faster, not just skimming.`,
    lastAttemptNote: (prev, pct) => `Last attempt at this level: ${prev} wpm, ${pct}% comprehension.`,
    history: "History",
    readAgain: "Read the same text again",
    newText: "New text",
    levelShortNames: { beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced" },
  },
  de: {
    pasteInstruction: (l) => `Füge einen Text auf ${l} ein — ändere die Sprache über den Wähler in der Navigationsleiste oben.`,
    text: "Text",
    placeholder: "Füge einen Übungstext ein (mindestens ~30 Wörter)…",
    wordsCount: (n) => `${n} Wörter`,
    level: "Stufe",
    startReading: "Lesen starten",
    done: "Fertig",
    quickCheck: "Kurzcheck",
    comprehensionQuestions: "Verständnisfragen",
    comprehensionSubtitle: "Basierend auf dem Text, den du gerade gelesen hast — nichts zum Nachschlagen, nur das, was du tatsächlich aufgenommen hast.",
    seeResults: "Ergebnisse ansehen",
    speed: "Geschwindigkeit",
    wordsPerMinute: "Wörter/Minute",
    comprehension: "Verständnis",
    correctOf: (c, t) => `${c}/${t} richtig`,
    percentCorrect: (pct) => `${pct}% richtig`,
    wordsInDuration: (w, d) => `${w} Wörter in ${d}`,
    improvedNote: (prev, wpm) => `📈 Schneller als beim letzten Versuch (${prev} → ${wpm} Wörter/Min.) ohne Verständnisverlust — du liest wirklich schneller, nicht nur oberflächlich.`,
    lastAttemptNote: (prev, pct) => `Letzter Versuch auf dieser Stufe: ${prev} Wörter/Min., ${pct}% Verständnis.`,
    history: "Verlauf",
    readAgain: "Denselben Text erneut lesen",
    newText: "Neuer Text",
    levelShortNames: { beginner: "Anfänger", intermediate: "Mittel", advanced: "Fortgeschritten" },
  },
  fr: {
    pasteInstruction: (l) => `Collez un texte en ${l} — changez la langue depuis le sélecteur dans la barre de navigation ci-dessus.`,
    text: "Texte",
    placeholder: "Collez un texte pour vous entraîner (au moins ~30 mots)…",
    wordsCount: (n) => `${n} mots`,
    level: "Niveau",
    startReading: "Commencer la lecture",
    done: "Terminé",
    quickCheck: "Vérification rapide",
    comprehensionQuestions: "Questions de compréhension",
    comprehensionSubtitle: "Basé sur le texte que vous venez de lire — rien à chercher, seulement ce que vous avez vraiment retenu.",
    seeResults: "Voir les résultats",
    speed: "Vitesse",
    wordsPerMinute: "mots/minute",
    comprehension: "Compréhension",
    correctOf: (c, t) => `${c}/${t} correctes`,
    percentCorrect: (pct) => `${pct}% correctes`,
    wordsInDuration: (w, d) => `${w} mots en ${d}`,
    improvedNote: (prev, wpm) => `📈 Plus rapide que la dernière tentative (${prev} → ${wpm} mots/min) sans baisse de compréhension — vous lisez vraiment plus vite, pas seulement en survolant.`,
    lastAttemptNote: (prev, pct) => `Dernière tentative à ce niveau : ${prev} mots/min, ${pct}% de compréhension.`,
    history: "Historique",
    readAgain: "Relire le même texte",
    newText: "Nouveau texte",
    levelShortNames: { beginner: "Débutant", intermediate: "Intermédiaire", advanced: "Avancé" },
  },
  es: {
    pasteInstruction: (l) => `Pega un texto en ${l} — cambia el idioma desde el selector en la barra de navegación de arriba.`,
    text: "Texto",
    placeholder: "Pega un texto para practicar (al menos ~30 palabras)…",
    wordsCount: (n) => `${n} palabras`,
    level: "Nivel",
    startReading: "Empezar a leer",
    done: "Listo",
    quickCheck: "Comprobación rápida",
    comprehensionQuestions: "Preguntas de comprensión",
    comprehensionSubtitle: "Basado en el texto que acabas de leer — nada que buscar, solo lo que realmente absorbiste.",
    seeResults: "Ver resultados",
    speed: "Velocidad",
    wordsPerMinute: "palabras/minuto",
    comprehension: "Comprensión",
    correctOf: (c, t) => `${c}/${t} correctas`,
    percentCorrect: (pct) => `${pct}% correctas`,
    wordsInDuration: (w, d) => `${w} palabras en ${d}`,
    improvedNote: (prev, wpm) => `📈 Más rápido que el intento anterior (${prev} → ${wpm} palabras/min) sin bajar la comprensión — realmente estás leyendo más rápido, no solo hojeando.`,
    lastAttemptNote: (prev, pct) => `Último intento en este nivel: ${prev} palabras/min, ${pct}% de comprensión.`,
    history: "Historial",
    readAgain: "Leer el mismo texto de nuevo",
    newText: "Nuevo texto",
    levelShortNames: { beginner: "Principiante", intermediate: "Intermedio", advanced: "Avanzado" },
  },
  sv: {
    pasteInstruction: (l) => `Klistra in text på ${l} — byt språk via väljaren i navigeringsfältet ovan.`,
    text: "Text",
    placeholder: "Klistra in en text att öva på (minst ~30 ord)…",
    wordsCount: (n) => `${n} ord`,
    level: "Nivå",
    startReading: "Börja läsa",
    done: "Klar",
    quickCheck: "Snabbkoll",
    comprehensionQuestions: "Förståelsefrågor",
    comprehensionSubtitle: "Baserat på texten du just läste — inget att slå upp, bara det du faktiskt tog till dig.",
    seeResults: "Se resultat",
    speed: "Hastighet",
    wordsPerMinute: "ord/minut",
    comprehension: "Förståelse",
    correctOf: (c, t) => `${c}/${t} rätt`,
    percentCorrect: (pct) => `${pct}% rätt`,
    wordsInDuration: (w, d) => `${w} ord på ${d}`,
    improvedNote: (prev, wpm) => `📈 Snabbare än förra försöket (${prev} → ${wpm} ord/min) utan att förståelsen sjönk — du läser faktiskt snabbare, inte bara skummar.`,
    lastAttemptNote: (prev, pct) => `Förra försöket på den här nivån: ${prev} ord/min, ${pct}% förståelse.`,
    history: "Historik",
    readAgain: "Läs samma text igen",
    newText: "Ny text",
    levelShortNames: { beginner: "Nybörjare", intermediate: "Mellannivå", advanced: "Avancerad" },
  },
};

type Translations = (typeof T)[LanguageCode];

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
  const t = T[language];
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
    <div className="flex flex-col gap-6 rounded-2xl border border-hairline bg-surface p-8 shadow-sm">
      {phase === "setup" && (
        <SetupPanel
          t={t}
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
                className="rounded-lg bg-surface-2 px-6 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-hairline"
              >
                {t.done}
              </button>
            </>
          )}
          {phase === "midcheck" && midCheckQuestion && (
            <MidCheckPanel
              t={t}
              question={midCheckQuestion}
              selected={midCheckSelected}
              onAnswer={handleMidCheckAnswer}
            />
          )}
        </div>
      )}

      {phase === "quiz" && (
        <QuizPanel
          t={t}
          questions={quizQuestions}
          answers={quizAnswers}
          onSelect={handleSelectQuizAnswer}
          onSubmit={handleSubmitQuiz}
        />
      )}

      {phase === "results" && result && (
        <ResultsPanel
          t={t}
          language={language}
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
  t,
  text,
  onTextChange,
  wordCount,
  levelId,
  onLevelChange,
  language,
  onStart,
}: {
  t: Translations;
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
      <p className="text-xs text-ink-muted">{t.pasteInstruction(getLanguage(language).name)}</p>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{t.text}</p>
        <textarea
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder={t.placeholder}
          rows={8}
          className="mt-2 w-full resize-none rounded-lg border border-hairline p-3 text-sm text-ink placeholder:text-ink-muted focus:border-brass focus:outline-none"
        />
        <p className="mt-1 text-xs text-ink-muted">{t.wordsCount(wordCount)}</p>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{t.level}</p>
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          {READING_LEVELS.map((level) => (
            <button
              key={level.id}
              onClick={() => onLevelChange(level.id)}
              className={`rounded-lg border p-3 text-left transition-colors ${
                levelId === level.id
                  ? "border-brass bg-surface-2"
                  : "border-hairline bg-surface hover:bg-surface-2"
              }`}
            >
              <p className="text-sm font-bold text-ink">{level.name[language]}</p>
              <p className="mt-0.5 text-xs text-ink-muted">{level.description[language]}</p>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onStart}
        disabled={tooShort}
        className="self-center rounded-lg bg-navy px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {t.startReading}
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
    <div className="relative flex h-40 w-full flex-col items-center justify-center rounded-xl bg-navy">
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
  t,
  question,
  selected,
  onAnswer,
}: {
  t: Translations;
  question: ComprehensionQuestion;
  selected: number | null;
  onAnswer: (index: number) => void;
}) {
  return (
    <div className="flex w-full flex-col items-center gap-4 rounded-xl border border-brass/40 bg-surface-2 p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-brass-text">{t.quickCheck}</p>
      <p className="text-center text-base font-medium text-ink">{question.prompt}</p>
      <div className="grid w-full max-w-sm grid-cols-2 gap-2">
        {question.options.map((option, i) => {
          const isSelected = selected === i;
          const isCorrect = i === question.correctIndex;
          const showFeedback = selected !== null;
          const colorClasses = !showFeedback
            ? "border-hairline bg-surface hover:bg-surface-2"
            : isCorrect
              ? "border-emerald-400 bg-emerald-100 text-emerald-800"
              : isSelected
                ? "border-red-400 bg-red-100 text-red-800"
                : "border-hairline bg-surface opacity-60";

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
  t,
  questions,
  answers,
  onSelect,
  onSubmit,
}: {
  t: Translations;
  questions: ComprehensionQuestion[];
  answers: (number | null)[];
  onSelect: (questionIndex: number, optionIndex: number) => void;
  onSubmit: () => void;
}) {
  const allAnswered = questions.length > 0 && answers.every((a) => a !== null);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
          {t.comprehensionQuestions}
        </p>
        <p className="mt-1 text-sm text-ink-muted">{t.comprehensionSubtitle}</p>
      </div>

      {questions.map((q, qi) => (
        <div key={qi} className="rounded-lg border border-hairline p-4">
          <p className="text-sm font-semibold text-ink">{q.prompt}</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {q.options.map((option, oi) => (
              <button
                key={oi}
                onClick={() => onSelect(qi, oi)}
                className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                  answers[qi] === oi
                    ? "border-brass bg-surface-2 text-brass-text"
                    : "border-hairline bg-surface hover:bg-surface-2 text-ink"
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
        className="self-center rounded-lg bg-navy px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {t.seeResults}
      </button>
    </div>
  );
}

/* ─────────────────────────── Results ─────────────────────────── */

function ResultsPanel({
  t,
  language,
  result,
  levelId,
  history,
  onReadAgain,
  onNewText,
}: {
  t: Translations;
  language: LanguageCode;
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
        <div className="rounded-xl border border-hairline bg-surface-2 p-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{t.speed}</p>
          <p className="mt-1 text-3xl font-extrabold text-ink">{result.wpm}</p>
          <p className="text-xs text-ink-muted">{t.wordsPerMinute}</p>
        </div>
        <div className="rounded-xl border border-hairline bg-surface-2 p-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{t.comprehension}</p>
          <p
            className={`mt-1 text-3xl font-extrabold ${
              result.comprehensionPct >= 75 ? "text-emerald-600" : result.comprehensionPct >= 50 ? "text-amber-600" : "text-red-600"
            }`}
          >
            {result.comprehensionPct}%
          </p>
          <p className="text-xs text-ink-muted">
            {t.correctOf(result.correctCount, result.totalQuestions)}
          </p>
        </div>
      </div>

      <p className="text-center text-xs text-ink-muted">
        {t.wordsInDuration(result.wordCount, formatDuration(Math.round(result.elapsedSeconds)))}
      </p>

      {previousAtLevel && (
        <p
          className={`rounded-lg p-3 text-center text-sm ${
            improved ? "bg-emerald-50 text-emerald-700" : "bg-surface-2 text-ink-muted"
          }`}
        >
          {improved
            ? t.improvedNote(previousAtLevel.wpm, result.wpm)
            : t.lastAttemptNote(previousAtLevel.wpm, previousAtLevel.comprehensionPct)}
        </p>
      )}

      {history.length > 1 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{t.history}</p>
          <div className="mt-2 flex flex-col gap-1">
            {[...history].reverse().slice(0, 6).map((h, i) => (
              <div key={i} className="flex justify-between text-xs text-ink-muted">
                <span>{new Date(h.date).toLocaleDateString(language)}</span>
                <span>{t.levelShortNames[h.levelId as "beginner" | "intermediate" | "advanced"]}</span>
                <span>{h.wpm} {t.wordsPerMinute}</span>
                <span>{t.percentCorrect(h.comprehensionPct)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={onReadAgain}
          className="rounded-lg bg-surface-2 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-hairline"
        >
          {t.readAgain}
        </button>
        <button
          onClick={onNewText}
          className="rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
        >
          {t.newText}
        </button>
      </div>
    </div>
  );
}

