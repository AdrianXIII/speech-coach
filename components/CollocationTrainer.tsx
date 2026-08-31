"use client";

import { useEffect, useMemo, useState } from "react";
import { useMediaRecorder } from "@/hooks/useMediaRecorder";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import {
  pickSession,
  COLLOCATION_PROFILES,
  type CollocationChallenge,
  type CollocationOption,
  type ProfileId,
} from "@/lib/collocationContent";
import { checkCollocationUsage, type CollocationUsage } from "@/lib/collocationCheck";
import { getLanguage, type LanguageCode } from "@/lib/languages";
import { useLanguage } from "@/components/LanguageProvider";

const PROFILE_STORAGE_KEY = "collocationProfile";

const T: Record<LanguageCode, {
  profile: string;
  englishOnlyNotice: (profileName: string, languageName: string) => string;
  noSpeechSupport: string;
  round: (index: number, total: number, category: string) => string;
  upgradeThis: string;
  nowSayIt: string;
  nextRound: string;
  recording: string;
  useInSentence: (phrase: string) => string;
  correctVerdict: string;
  closeVerdict: string;
  missedVerdict: string;
  noSpeechDetected: string;
  target: string;
  recognition: string;
  correctUpgradesPicked: string;
  production: string;
  usedCorrectlyOutLoud: string;
  pick: string;
  speak: string;
  newSession: string;
  loading: string;
}> = {
  en: {
    profile: "Profile",
    englishOnlyNotice: (p, l) => `${p} is English-only for now — showing English content instead of ${l}.`,
    noSpeechSupport: "Your browser doesn't support speech recognition — you'll still get the multiple-choice round, just not the spoken practice. Try Chrome or Edge for the full exercise.",
    round: (i, t, c) => `Round ${i} of ${t} · ${c}`,
    upgradeThis: "Upgrade this",
    nowSayIt: "Now say it →",
    nextRound: "Next round →",
    recording: "Recording…",
    useInSentence: (phrase) => `Use this phrase in a full sentence: "${phrase}"`,
    correctVerdict: "✅ Nice — you used it correctly.",
    closeVerdict: "⚠️ Close — you used part of the phrase, but not the full pairing together.",
    missedVerdict: "❌ Didn't catch that pairing in what you said — try again next round.",
    noSpeechDetected: "(no speech detected)",
    target: "Target:",
    recognition: "Recognition",
    correctUpgradesPicked: "correct upgrades picked",
    production: "Production",
    usedCorrectlyOutLoud: "used correctly out loud",
    pick: "pick",
    speak: "speak",
    newSession: "🎲 New session",
    loading: "Loading…",
  },
  de: {
    profile: "Profil",
    englishOnlyNotice: (p, l) => `${p} gibt es vorerst nur auf Englisch — es wird englischer Inhalt statt ${l} angezeigt.`,
    noSpeechSupport: "Dein Browser unterstützt keine Spracherkennung — du bekommst trotzdem die Multiple-Choice-Runde, nur nicht die gesprochene Übung. Probiere Chrome oder Edge für die vollständige Übung.",
    round: (i, t, c) => `Runde ${i} von ${t} · ${c}`,
    upgradeThis: "Werte das auf",
    nowSayIt: "Jetzt sag es →",
    nextRound: "Nächste Runde →",
    recording: "Aufnahme läuft…",
    useInSentence: (phrase) => `Benutze diese Formulierung in einem vollständigen Satz: „${phrase}“`,
    correctVerdict: "✅ Klasse — du hast es richtig benutzt.",
    closeVerdict: "⚠️ Fast — du hast einen Teil der Formulierung benutzt, aber nicht die vollständige Kombination.",
    missedVerdict: "❌ Diese Kombination war in dem, was du gesagt hast, nicht zu hören — versuch es in der nächsten Runde erneut.",
    noSpeechDetected: "(keine Sprache erkannt)",
    target: "Ziel:",
    recognition: "Erkennung",
    correctUpgradesPicked: "richtige Aufwertungen gewählt",
    production: "Anwendung",
    usedCorrectlyOutLoud: "laut korrekt verwendet",
    pick: "Auswahl",
    speak: "Sprechen",
    newSession: "🎲 Neuer Durchgang",
    loading: "Wird geladen…",
  },
  fr: {
    profile: "Profil",
    englishOnlyNotice: (p, l) => `${p} n'est disponible qu'en anglais pour l'instant — affichage du contenu anglais à la place de ${l}.`,
    noSpeechSupport: "Votre navigateur ne prend pas en charge la reconnaissance vocale — vous aurez quand même le tour à choix multiple, mais pas l'exercice oral. Essayez Chrome ou Edge pour l'exercice complet.",
    round: (i, t, c) => `Manche ${i} sur ${t} · ${c}`,
    upgradeThis: "Améliorez ceci",
    nowSayIt: "Dites-le maintenant →",
    nextRound: "Manche suivante →",
    recording: "Enregistrement…",
    useInSentence: (phrase) => `Utilisez cette expression dans une phrase complète : « ${phrase} »`,
    correctVerdict: "✅ Bravo — vous l'avez utilisée correctement.",
    closeVerdict: "⚠️ Presque — vous avez utilisé une partie de l'expression, mais pas la combinaison complète.",
    missedVerdict: "❌ Cette combinaison n'a pas été détectée dans ce que vous avez dit — réessayez à la prochaine manche.",
    noSpeechDetected: "(aucune parole détectée)",
    target: "Cible :",
    recognition: "Reconnaissance",
    correctUpgradesPicked: "améliorations correctes choisies",
    production: "Production",
    usedCorrectlyOutLoud: "utilisée correctement à voix haute",
    pick: "choix",
    speak: "oral",
    newSession: "🎲 Nouvelle session",
    loading: "Chargement…",
  },
  es: {
    profile: "Perfil",
    englishOnlyNotice: (p, l) => `${p} solo está disponible en inglés por ahora — mostrando contenido en inglés en lugar de ${l}.`,
    noSpeechSupport: "Tu navegador no admite reconocimiento de voz — aun así tendrás la ronda de opción múltiple, pero no la práctica hablada. Prueba Chrome o Edge para el ejercicio completo.",
    round: (i, t, c) => `Ronda ${i} de ${t} · ${c}`,
    upgradeThis: "Mejora esto",
    nowSayIt: "Dilo ahora →",
    nextRound: "Siguiente ronda →",
    recording: "Grabando…",
    useInSentence: (phrase) => `Usa esta frase en una oración completa: "${phrase}"`,
    correctVerdict: "✅ Genial — la usaste correctamente.",
    closeVerdict: "⚠️ Cerca — usaste parte de la frase, pero no la combinación completa.",
    missedVerdict: "❌ No detectamos esa combinación en lo que dijiste — inténtalo de nuevo en la próxima ronda.",
    noSpeechDetected: "(no se detectó voz)",
    target: "Objetivo:",
    recognition: "Reconocimiento",
    correctUpgradesPicked: "mejoras correctas elegidas",
    production: "Producción",
    usedCorrectlyOutLoud: "usada correctamente en voz alta",
    pick: "elección",
    speak: "habla",
    newSession: "🎲 Nueva sesión",
    loading: "Cargando…",
  },
  sv: {
    profile: "Profil",
    englishOnlyNotice: (p, l) => `${p} finns bara på engelska än så länge — visar engelskt innehåll istället för ${l}.`,
    noSpeechSupport: "Din webbläsare stöder inte taligenkänning — du får ändå flervalsrundan, men inte den muntliga övningen. Prova Chrome eller Edge för hela övningen.",
    round: (i, t, c) => `Runda ${i} av ${t} · ${c}`,
    upgradeThis: "Uppgradera denna",
    nowSayIt: "Säg det nu →",
    nextRound: "Nästa runda →",
    recording: "Spelar in…",
    useInSentence: (phrase) => `Använd den här frasen i en hel mening: "${phrase}"`,
    correctVerdict: "✅ Snyggt — du använde den korrekt.",
    closeVerdict: "⚠️ Nära — du använde en del av frasen, men inte hela kombinationen tillsammans.",
    missedVerdict: "❌ Den kombinationen hördes inte i det du sa — försök igen nästa runda.",
    noSpeechDetected: "(inget tal upptäcktes)",
    target: "Mål:",
    recognition: "Igenkänning",
    correctUpgradesPicked: "korrekta uppgraderingar valda",
    production: "Användning",
    usedCorrectlyOutLoud: "använd korrekt högt",
    pick: "val",
    speak: "tal",
    newSession: "🎲 Ny session",
    loading: "Laddar…",
  },
};

type Translations = (typeof T)[LanguageCode];

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
 * Elite Phrasing drill: for each round, pick the correctly "upgraded"
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
  const t = T[language];
  const [profile, setProfile] = useState<ProfileId>("executive");
  const [session, setSession] = useState<CollocationChallenge[] | null>(null);
  // The language actually in use for the current session — falls back to
  // English when the chosen profile doesn't have content in `language` yet
  // (Politician/Lawyer are English-only for now).
  const [usedLanguage, setUsedLanguage] = useState<LanguageCode>("en");
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("quiz");
  const [selectedOption, setSelectedOption] = useState<CollocationOption | null>(null);
  const [results, setResults] = useState<ChallengeResult[]>([]);

  const { recordedBlob, start: startRecorder, stop: stopRecorder, reset: resetRecorder } =
    useMediaRecorder(false);
  const recognition = useSpeechRecognition(getLanguage(usedLanguage).speechLang);
  const [isFinalizingSpeech, setIsFinalizingSpeech] = useState(false);

  // Load the saved profile once on mount — client-only, since localStorage
  // doesn't exist during SSR.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(PROFILE_STORAGE_KEY);
      if (COLLOCATION_PROFILES.some((p) => p.id === saved)) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setProfile(saved as ProfileId);
      }
    } catch {
      // Private browsing / storage disabled — stick with the default.
    }
  }, []);

  function handleProfileChange(newProfile: ProfileId) {
    setProfile(newProfile);
    try {
      window.localStorage.setItem(PROFILE_STORAGE_KEY, newProfile);
    } catch {
      // Ignore — the choice just won't persist across visits.
    }
  }

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
    const picked = pickSession(profile, language, 5);
    setSession(picked.challenges);
    setUsedLanguage(picked.usedLanguage);
  }

  // Re-roll whenever the app-wide language or the chosen profile changes
  // (including the very first time language settles, from
  // LanguageProvider's own localStorage load).
  useEffect(() => {
    resetRecorder();
    recognition.reset();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedOption(null);
    setResults([]);
    setIndex(0);
    setPhase("quiz");
    const picked = pickSession(profile, language, 5);
    setSession(picked.challenges);
    setUsedLanguage(picked.usedLanguage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, profile]);

  if (!session || !challenge) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm text-slate-400">{t.loading}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{t.profile}</p>
        <div className="flex flex-wrap gap-1.5">
          {COLLOCATION_PROFILES.map((p) => (
            <button
              key={p.id}
              onClick={() => handleProfileChange(p.id)}
              title={p.description[language]}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                profile === p.id
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {p.name[language]}
            </button>
          ))}
        </div>
      </div>

      {usedLanguage !== language && (
        <p className="text-xs text-amber-600">
          {t.englishOnlyNotice(
            COLLOCATION_PROFILES.find((p) => p.id === profile)?.name[language] ?? "",
            getLanguage(language).name,
          )}
        </p>
      )}

      {!recognition.isSupported && phase !== "summary" && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {t.noSpeechSupport}
        </div>
      )}

      {phase !== "summary" && (
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          {t.round(index + 1, session.length, challenge.category)}
        </p>
      )}

      {(phase === "quiz" || phase === "quizFeedback") && (
        <QuizStep
          t={t}
          challenge={challenge}
          options={shuffledOptions}
          selected={selectedOption}
          onSelect={handleSelectOption}
          onContinue={recognition.isSupported ? handleContinueToSpeaking : goToNext}
          canSpeak={recognition.isSupported}
        />
      )}

      {phase === "speakPrompt" && (
        <SpeakPromptStep t={t} challenge={challenge} onStart={handleStartSpeaking} />
      )}

      {phase === "speaking" && (
        <div className="flex flex-col items-center gap-4 py-6">
          <span className="flex items-center gap-2 text-sm font-semibold text-red-600">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500" />
            {t.recording}
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
          t={t}
          challenge={challenge}
          usage={results[results.length - 1]?.spoken ?? null}
          transcript={results[results.length - 1]?.transcript ?? ""}
          audioBlob={recordedBlob}
          onContinue={goToNext}
        />
      )}

      {phase === "summary" && (
        <SummaryStep t={t} session={session} results={results} onNewSession={handleNewSession} />
      )}
    </div>
  );
}

/* ─────────────────────────── Quiz step ─────────────────────────── */

function QuizStep({
  t,
  challenge,
  options,
  selected,
  onSelect,
  onContinue,
  canSpeak,
}: {
  t: Translations;
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
          {t.upgradeThis}
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
          {canSpeak ? t.nowSayIt : t.nextRound}
        </button>
      )}
    </div>
  );
}

/* ─────────────────────────── Speak steps ─────────────────────────── */

function SpeakPromptStep({
  t,
  challenge,
  onStart,
}: {
  t: Translations;
  challenge: CollocationChallenge;
  onStart: () => void;
}) {
  const correctPhrase = challenge.options.find((o) => o.correct)?.phrase ?? "";
  return (
    <div className="flex flex-col items-center gap-4 py-4 text-center">
      <p className="text-sm text-slate-500">{challenge.scenario}</p>
      <p className="rounded-lg bg-indigo-50 px-4 py-3 text-base font-semibold text-indigo-700">
        {t.useInSentence(correctPhrase)}
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
  t,
  challenge,
  usage,
  transcript,
  audioBlob,
  onContinue,
}: {
  t: Translations;
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
        <p className="text-lg font-semibold text-emerald-700">{t.correctVerdict}</p>
      ) : usage?.verbUsed || usage?.nounUsed ? (
        <p className="text-lg font-semibold text-amber-700">{t.closeVerdict}</p>
      ) : (
        <p className="text-lg font-semibold text-red-600">{t.missedVerdict}</p>
      )}
      <p className="max-w-md text-sm italic text-slate-500">
        {transcript ? `"${transcript}"` : t.noSpeechDetected}
      </p>
      {audioUrl && <audio src={audioUrl} controls className="w-full max-w-sm" />}
      <p className="text-xs text-slate-400">
        {t.target} {challenge.options.find((o) => o.correct)?.phrase}
      </p>
      <button
        onClick={onContinue}
        className="rounded-lg bg-indigo-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
      >
        {t.nextRound}
      </button>
    </div>
  );
}

/* ─────────────────────────── Summary ─────────────────────────── */

function SummaryStep({
  t,
  session,
  results,
  onNewSession,
}: {
  t: Translations;
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
            {t.recognition}
          </p>
          <p className="mt-1 text-3xl font-extrabold text-slate-900">
            {quizCorrectCount}/{session.length}
          </p>
          <p className="text-xs text-slate-500">{t.correctUpgradesPicked}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            {t.production}
          </p>
          <p className="mt-1 text-3xl font-extrabold text-slate-900">
            {spokenAttempted.length > 0 ? `${spokenCorrectCount}/${spokenAttempted.length}` : "—"}
          </p>
          <p className="text-xs text-slate-500">{t.usedCorrectlyOutLoud}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {session.map((c, i) => {
          const r = results[i];
          return (
            <div key={c.id} className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-sm">
              <span className="text-slate-600">{c.category}</span>
              <span>
                {r?.quizCorrect ? "✅" : "❌"} {t.pick}
                {r?.spoken && <span className="ml-2">{r.spoken.usedTogether ? "✅" : "❌"} {t.speak}</span>}
              </span>
            </div>
          );
        })}
      </div>

      <button
        onClick={onNewSession}
        className="self-center rounded-lg bg-indigo-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
      >
        {t.newSession}
      </button>
    </div>
  );
}
