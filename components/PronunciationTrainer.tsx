"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useMediaRecorder } from "@/hooks/useMediaRecorder";
import { formatDuration } from "@/lib/audio";
import { FollowUpChat } from "@/components/FollowUpChat";
import { StressMeter } from "@/components/StressMeter";
import { PronunciationReviewList } from "@/components/PronunciationReviewList";
import { REVIEW_INTERVAL_DAYS, type ReviewWord } from "@/lib/pronunciationReviewSchedule";
import { useLanguage } from "@/components/LanguageProvider";
import { COMMON } from "@/lib/commonStrings";
import { getLanguage, type LanguageCode } from "@/lib/languages";

interface FeedbackState {
  text: string;
  mocked: boolean;
}

interface WordSuggestion {
  word: string;
  matchType: "prefix" | "phonetic";
}

const T: Record<
  LanguageCode,
  {
    label: string;
    placeholder: string;
    listen: string;
    soundsLike: string;
    addToReview: string;
    inReview: string;
    typeFirst: string;
    recording: string;
    complete: string;
    pressToRecord: string;
    getFeedback: string;
    listening: string;
    tryAgain: string;
    markPracticed: (days: number) => string;
  }
> = {
  en: {
    label: "Word or phrase to practice",
    placeholder: "e.g. 'entrepreneur' — not sure how it's spelled? just try",
    listen: "🔊 Listen",
    soundsLike: "sounds like this",
    addToReview: "+ Add to review list",
    inReview: "✓ In your review list",
    typeFirst: "Type a word above to get started",
    recording: "Recording…",
    complete: "Recording complete",
    pressToRecord: "Press to record yourself saying it",
    getFeedback: "Get AI Feedback",
    listening: "Listening…",
    tryAgain: "Try Again",
    markPracticed: (d) => `✓ Mark practiced — next in ${d} days`,
  },
  de: {
    label: "Wort oder Ausdruck zum Üben",
    placeholder: "z. B. „Eichhörnchen“ — unsicher, wie man es schreibt? Probier es einfach",
    listen: "🔊 Anhören",
    soundsLike: "klingt so",
    addToReview: "+ Zur Wiederholungsliste",
    inReview: "✓ In deiner Wiederholungsliste",
    typeFirst: "Gib oben ein Wort ein, um zu beginnen",
    recording: "Aufnahme läuft…",
    complete: "Aufnahme abgeschlossen",
    pressToRecord: "Drücken und das Wort aussprechen",
    getFeedback: "KI-Feedback erhalten",
    listening: "Hört zu…",
    tryAgain: "Nochmal",
    markPracticed: (d) => `✓ Als geübt markieren — wieder in ${d} Tagen`,
  },
  fr: {
    label: "Mot ou expression à travailler",
    placeholder: "ex. « grenouille » — pas sûr de l'orthographe ? essayez quand même",
    listen: "🔊 Écouter",
    soundsLike: "se prononce comme ça",
    addToReview: "+ Ajouter à la liste de révision",
    inReview: "✓ Dans votre liste de révision",
    typeFirst: "Tapez un mot ci-dessus pour commencer",
    recording: "Enregistrement…",
    complete: "Enregistrement terminé",
    pressToRecord: "Appuyez et prononcez le mot",
    getFeedback: "Obtenir un retour IA",
    listening: "Écoute…",
    tryAgain: "Réessayer",
    markPracticed: (d) => `✓ Marquer comme travaillé — de nouveau dans ${d} jours`,
  },
  es: {
    label: "Palabra o frase para practicar",
    placeholder: "p. ej. «ferrocarril» — ¿no sabes cómo se escribe? inténtalo igual",
    listen: "🔊 Escuchar",
    soundsLike: "suena así",
    addToReview: "+ Añadir a la lista de repaso",
    inReview: "✓ En tu lista de repaso",
    typeFirst: "Escribe una palabra arriba para empezar",
    recording: "Grabando…",
    complete: "Grabación completa",
    pressToRecord: "Pulsa y di la palabra",
    getFeedback: "Obtener comentarios de la IA",
    listening: "Escuchando…",
    tryAgain: "Intentar de nuevo",
    markPracticed: (d) => `✓ Marcar como practicada — de nuevo en ${d} días`,
  },
  sv: {
    label: "Ord eller fras att öva på",
    placeholder: "t.ex. ”sjuksköterska” — osäker på stavningen? prova ändå",
    listen: "🔊 Lyssna",
    soundsLike: "låter så här",
    addToReview: "+ Lägg till i repetitionslistan",
    inReview: "✓ I din repetitionslista",
    typeFirst: "Skriv ett ord ovan för att börja",
    recording: "Spelar in…",
    complete: "Inspelningen är klar",
    pressToRecord: "Tryck och säg ordet",
    getFeedback: "Få AI-feedback",
    listening: "Lyssnar…",
    tryAgain: "Försök igen",
    markPracticed: (d) => `✓ Markera som övad — igen om ${d} dagar`,
  },
};

/**
 * Pronunciation practice in the app's selected language: type a word or
 * short phrase, hear it spoken by the browser's built-in text-to-speech,
 * record yourself saying it, then get a syllable-stress check and
 * qualitative AI feedback on how close it is to a native pronunciation.
 */
export function PronunciationTrainer() {
  const { language } = useLanguage();
  const t = T[language];
  const common = COMMON[language];

  // Lets a "Practice this word" link (e.g. from a Record & Analyze result)
  // land here with the word already filled in — see DashboardResults.tsx.
  const searchParams = useSearchParams();
  const [word, setWord] = useState(() => searchParams.get("word") ?? "");
  const { isRecording, recordedBlob, start, stop, reset, error: recordError } = useMediaRecorder(false);

  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [suggestions, setSuggestions] = useState<WordSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Debounced spelling-help lookup, for a learner who knows how a word
  // sounds but not how it's spelled ("fisiks" -> "physics"). English is a
  // local dictionary lookup; other languages ask Gemini, so they wait a bit
  // longer before firing to avoid a call on every keystroke.
  useEffect(() => {
    const query = word.trim();
    if (query.length < (language === "en" ? 2 : 3)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSuggestions([]);
      return;
    }
    const timer = setTimeout(
      () => {
        fetch(`/api/word-search?q=${encodeURIComponent(query)}&lang=${language}`)
          .then((res) => res.json())
          .then((data: { suggestions: WordSuggestion[] }) => {
            setSuggestions(data.suggestions ?? []);
          })
          .catch(() => setSuggestions([]));
      },
      language === "en" ? 200 : 600,
    );
    return () => clearTimeout(timer);
  }, [word, language]);

  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const [isFetchingFeedback, setIsFetchingFeedback] = useState(false);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);
  // Bumped on every new recording so <StressMeter> remounts fresh instead of
  // reusing state from a previous attempt.
  const [attempt, setAttempt] = useState(0);

  // Spaced-repetition review list for the current language — refetched when
  // the language changes, then kept in sync locally from each mutation's own
  // response. genRef guards two races: a slow GET landing after a mutation
  // (a cold Postgres connection can take seconds), and a GET for the
  // previous language landing after a switch.
  const [reviewWords, setReviewWords] = useState<ReviewWord[]>([]);
  const genRef = useRef(0);
  useEffect(() => {
    const gen = ++genRef.current;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReviewWords([]);
    fetch(`/api/pronunciation-review?language=${language}`)
      .then((res) => res.json())
      .then((data: { words: ReviewWord[] }) => {
        if (gen === genRef.current) setReviewWords(data.words ?? []);
      })
      .catch(() => {});
  }, [language]);
  const inReviewList = reviewWords.find((w) => w.word.toLowerCase() === word.trim().toLowerCase());

  async function handleAddToReviewList() {
    const target = word.trim();
    if (!target) return;
    genRef.current++;
    const res = await fetch("/api/pronunciation-review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ word: target, language }),
    });
    if (!res.ok) return;
    const data: { word: ReviewWord } = await res.json();
    setReviewWords((prev) => [...prev, data.word]);
  }

  function handleSelectReviewWord(w: string) {
    setWord(w);
    handleTryAgain();
  }

  async function handleRemoveReviewWord(id: number) {
    genRef.current++;
    setReviewWords((prev) => prev.filter((w) => w.id !== id));
    await fetch("/api/pronunciation-review", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
  }

  async function handleMarkPracticed() {
    if (!inReviewList) return;
    genRef.current++;
    const res = await fetch("/api/pronunciation-review", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: inReviewList.id }),
    });
    if (!res.ok) return;
    const data: { word: ReviewWord } = await res.json();
    setReviewWords((prev) => prev.map((w) => (w.id === data.word.id ? data.word : w)));
  }

  const audioUrl = useMemo(() => (recordedBlob ? URL.createObjectURL(recordedBlob) : null), [recordedBlob]);
  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  useEffect(() => {
    if (!isRecording) return;
    intervalRef.current = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRecording]);

  function handleListen() {
    if (!word.trim() || typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word.trim());
    utterance.lang = getLanguage(language).speechLang;
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }

  function handleStart() {
    setElapsedSeconds(0);
    setFeedback(null);
    setFeedbackError(null);
    setAttempt((a) => a + 1);
    start();
  }

  function handleTryAgain() {
    reset();
    setElapsedSeconds(0);
    setFeedback(null);
    setFeedbackError(null);
  }

  async function handleGetFeedback() {
    if (!recordedBlob || !word.trim()) return;
    setIsFetchingFeedback(true);
    setFeedbackError(null);
    try {
      const formData = new FormData();
      formData.append("audio", recordedBlob, "pronunciation.webm");
      formData.append("word", word.trim());
      formData.append("language", language);

      const res = await fetch("/api/pronunciation-feedback", { method: "POST", body: formData });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || common.requestFailed(res.status));
      }

      const data: { feedback: string; mocked: boolean } = await res.json();
      setFeedback({ text: data.feedback, mocked: data.mocked });
    } catch (err) {
      setFeedbackError(err instanceof Error ? err.message : common.somethingWentWrong);
    } finally {
      setIsFetchingFeedback(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6 rounded-2xl border border-hairline bg-surface p-8 shadow-sm">
        <div>
          <label htmlFor="pronunciation-word" className="text-sm font-semibold text-ink">
            {t.label}
          </label>
          <div className="relative mt-2 flex gap-2">
            <input
              id="pronunciation-word"
              value={word}
              onChange={(e) => {
                setWord(e.target.value);
                setShowSuggestions(true);
                handleTryAgain();
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              placeholder={t.placeholder}
              autoComplete="off"
              className="flex-1 rounded-lg border border-hairline px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-brass focus:outline-none"
            />
            <button
              onClick={handleListen}
              disabled={!word.trim()}
              className="whitespace-nowrap rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy-800 disabled:opacity-40"
            >
              {t.listen}
            </button>

            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute left-0 right-0 top-full z-10 mt-1 max-h-56 overflow-y-auto rounded-lg border border-hairline bg-surface shadow-lg">
                {suggestions.map((s) => (
                  <li key={s.word}>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        setWord(s.word);
                        setShowSuggestions(false);
                        handleTryAgain();
                      }}
                      className="flex w-full items-center justify-between px-3 py-2 text-left text-sm text-ink hover:bg-surface-2"
                    >
                      <span>{s.word}</span>
                      {s.matchType === "phonetic" && <span className="text-xs text-ink-muted">{t.soundsLike}</span>}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {word.trim() && !inReviewList && (
            <button onClick={handleAddToReviewList} className="mt-2 text-xs font-semibold text-brass-text hover:underline">
              {t.addToReview}
            </button>
          )}
          {inReviewList && <p className="mt-2 text-xs font-semibold text-ink-muted">{t.inReview}</p>}
        </div>

        <div className="flex flex-col items-center gap-4 border-t border-hairline pt-6">
          <div className="font-mono text-2xl font-bold tabular-nums text-ink">{formatDuration(elapsedSeconds)}</div>

          {!isRecording ? (
            <button
              onClick={handleStart}
              disabled={!word.trim() || !!recordedBlob}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
              aria-label={common.startRecording}
            >
              <span className="h-5 w-5 rounded-full bg-surface" />
            </button>
          ) : (
            <button
              onClick={stop}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-navy text-white shadow-lg transition-transform hover:scale-105"
              aria-label={common.stopRecording}
            >
              <span className="h-5 w-5 rounded-md bg-surface" />
            </button>
          )}

          <p className="text-sm font-semibold text-ink-muted">
            {!word.trim() ? t.typeFirst : isRecording ? t.recording : recordedBlob ? t.complete : t.pressToRecord}
          </p>

          {recordError && <p className="text-sm text-red-600">{recordError}</p>}

          {audioUrl && !isRecording && (
            <div className="flex w-full flex-col items-center gap-4">
              <audio src={audioUrl} controls className="w-full max-w-sm" />

              {recordedBlob && <StressMeter key={attempt} word={word.trim()} audioBlob={recordedBlob} />}

              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={handleGetFeedback}
                  disabled={isFetchingFeedback}
                  className="rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800 disabled:opacity-50"
                >
                  {isFetchingFeedback ? t.listening : t.getFeedback}
                </button>
                <button
                  onClick={handleTryAgain}
                  disabled={isFetchingFeedback}
                  className="rounded-lg bg-surface-2 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-hairline disabled:opacity-50"
                >
                  {t.tryAgain}
                </button>
              </div>
              {feedbackError && <p className="text-sm text-red-600">{feedbackError}</p>}
            </div>
          )}
        </div>

        {feedback && (
          <div className="flex flex-col gap-2 rounded-lg border border-hairline bg-surface-2 p-4">
            {feedback.mocked && (
              <p className="rounded-md bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
                Mock mode — set GEMINI_API_KEY for real pronunciation feedback.
              </p>
            )}
            <p className="text-sm leading-relaxed text-ink">{feedback.text}</p>

            {inReviewList && (
              <button
                onClick={handleMarkPracticed}
                className="self-start rounded-lg bg-surface px-4 py-2 text-xs font-semibold text-ink transition-colors hover:bg-hairline"
              >
                {t.markPracticed(
                  REVIEW_INTERVAL_DAYS[Math.min(inReviewList.stage + 1, REVIEW_INTERVAL_DAYS.length - 1)],
                )}
              </button>
            )}

            <FollowUpChat
              context={`I practiced saying the ${getLanguage(language).name} word/phrase "${word.trim()}" out loud and asked for pronunciation feedback.`}
              initialAnswer={feedback.text}
            />
          </div>
        )}
      </div>

      <PronunciationReviewList words={reviewWords} onSelect={handleSelectReviewWord} onRemove={handleRemoveReviewWord} />
    </div>
  );
}
