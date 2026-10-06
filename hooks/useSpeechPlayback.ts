"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { loadVoices, pickBestVoice, stripCitationMarkers } from "@/hooks/useSpeechSynthesis";
import { getLanguage, type LanguageCode } from "@/lib/languages";

export interface UseSpeechPlaybackResult {
  isSupported: boolean;
  isSpeaking: boolean;
  isPaused: boolean;
  elapsedSeconds: number;
  estimatedTotalSeconds: number;
  /** Index (into the word list of whatever text was passed to `play`) of the word currently being spoken — real, timestamp-driven when Google's neural voice is configured; an estimate otherwise (see the hook's own doc comment). -1 when nothing is playing. */
  currentWordIndex: number;
  /** Starts speaking new text from the beginning, replacing whatever was playing. Also what "restart from scratch" (e.g. a Repeat button) should call. */
  play: (text: string) => void;
  /** Pauses at the current position. */
  pause: () => void;
  /** Resumes from the paused position. No-op if not paused. */
  resume: () => void;
  /** Jumps forward (positive) or backward (negative) by this many seconds. */
  skip: (deltaSeconds: number) => void;
  /** Fully stops and resets position to 0. */
  cancel: () => void;
}

const RATE = 0.95;
/**
 * No browser exposes real duration/position for speech synthesis, and this
 * is also the figure shown as a placeholder total immediately after play()
 * fires, before the neural audio's real duration is known (its
 * loadedmetadata event) — a plain words-per-minute estimate (calibrated for
 * RATE) used only to size the progress bar until then, and as the sole
 * basis for pause/skip/highlighting on the few occasions playback falls
 * back to the browser's own TTS (see the hook's doc comment below). It will
 * drift from actual spoken time in that fallback case, more so for
 * languages/voices that read faster or slower than this — fine for a
 * progress indicator, never presented anywhere as exact.
 */
const WORDS_PER_MINUTE_AT_RATE_1 = 165;

function wordCount(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;
}

function estimateDurationSeconds(text: string): number {
  const words = wordCount(text);
  const wpm = WORDS_PER_MINUTE_AT_RATE_1 * RATE;
  return words > 0 ? (words / wpm) * 60 : 0;
}

/** Maps an estimated elapsed time to a character offset, snapped to the start of the next word so playback never resumes mid-word. Fallback-path only. */
function offsetForElapsed(text: string, elapsed: number, total: number): number {
  if (total <= 0) return 0;
  const ratio = Math.min(1, Math.max(0, elapsed / total));
  let i = Math.round(text.length * ratio);
  while (i < text.length && !/\s/.test(text[i])) i++;
  while (i < text.length && /\s/.test(text[i])) i++;
  return i;
}

/** Index of the last word whose real start time is <= elapsed (timepoints are monotonic non-decreasing, inserted in word order). */
function wordIndexForElapsed(wordStartTimes: number[], elapsed: number): number {
  let i = -1;
  for (let w = 0; w < wordStartTimes.length; w++) {
    if (wordStartTimes[w] <= elapsed) i = w;
    else break;
  }
  return i;
}

function base64ToBlob(base64: string, contentType: string): Blob {
  const bytes = atob(base64);
  const array = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) array[i] = bytes.charCodeAt(i);
  return new Blob([array], { type: contentType });
}

/**
 * A playback-bar-capable layer powering AI Tutor's Teach step specifically
 * — separate from the simpler fire-and-forget useNeuralSpeech (used by
 * every other "🔊 Listen" button in the app), since those don't need
 * pause/skip/word-highlight.
 *
 * Primary path: fetches /api/tts/timepoints for Google Cloud's neural voice
 * plus real SSML-mark word-boundary timestamps, then plays it through a
 * real `<audio>` element — pause/resume/skip and word-highlighting are all
 * driven off that element's actual `currentTime`, which genuinely supports
 * seeking.
 *
 * Fallback path (API unconfigured, a failed fetch, or a browser blocking
 * `<audio>` autoplay outside a user gesture): the browser's own
 * SpeechSynthesis API, exactly as this hook worked before neural TTS
 * existed. Browser TTS has no native seek or reliable pause-and-resume-
 * from-position API, so that path estimates a word offset from elapsed
 * time, cancels whatever's speaking, and starts a fresh utterance from
 * there — deliberately avoiding speechSynthesis.pause()/resume(), which is
 * known-unreliable on WebKit/iOS Safari (this app's native shell; see
 * capacitor.config.ts), in favor of a mechanism that only depends on
 * cancel()/speak(), which work consistently everywhere.
 */
export function useSpeechPlayback(language: LanguageCode = "en"): UseSpeechPlaybackResult {
  const lang = getLanguage(language).speechLang;

  const [isSupported, setIsSupported] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [estimatedTotalSeconds, setEstimatedTotalSeconds] = useState(0);
  // State, not derived from fullTextRef at render time — refs can't be read
  // during render (only in effects/callbacks), so this is set explicitly
  // wherever fullTextRef itself is set (currently just play()).
  const [totalWords, setTotalWords] = useState(0);

  const voiceRef = useRef<SpeechSynthesisVoice | undefined>(undefined);
  const fullTextRef = useRef("");
  // Mirrors elapsedSeconds for reads inside callbacks (skip/resume) without
  // depending on a stale closure over the state value.
  const elapsedRef = useRef(0);
  // Bumped on every play()/cancel() so a stray async callback (a slow fetch,
  // an abandoned utterance's onstart/onend/onerror) from a session we've
  // already moved past can't clobber state a newer session just set.
  const sessionIdRef = useRef(0);
  const utteranceIdRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Real word-start timestamps for the current session, from
  // /api/tts/timepoints — null whenever this session is running on the
  // estimated fallback path instead.
  // State, not a ref: read during render (currentWordIndex below), which
  // React's own ref rules forbid for a plain ref.
  const [wordStartTimes, setWordStartTimes] = useState<number[] | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);
  // True once this session's neural <audio> element has successfully
  // started — lets pause/resume/skip/cancel branch to the right engine
  // without re-deriving it from several pieces of state.
  const usingNeuralRef = useRef(false);

  useEffect(() => {
    elapsedRef.current = elapsedSeconds;
  }, [elapsedSeconds]);

  useEffect(() => {
    const supported = typeof window !== "undefined" && ("speechSynthesis" in window || typeof Audio !== "undefined");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsSupported(supported);
    if (!supported) return;
    voiceRef.current = undefined;
    loadVoices().then((voices) => {
      voiceRef.current = pickBestVoice(voices, lang);
    });
  }, [lang]);

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startTimer = useCallback(
    (totalSeconds: number) => {
      stopTimer();
      intervalRef.current = setInterval(() => {
        setElapsedSeconds((s) => Math.min(totalSeconds, s + 0.25));
      }, 250);
    },
    [stopTimer],
  );

  const cleanupNeuralAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.ontimeupdate = null;
      audioRef.current.onended = null;
      audioRef.current.onerror = null;
      audioRef.current.onloadedmetadata = null;
      audioRef.current = null;
    }
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    usingNeuralRef.current = false;
  }, []);

  /** Fallback engine: estimated-offset browser SpeechSynthesis, unchanged from before neural TTS existed. */
  const speakFromFallback = useCallback(
    (offset: number, total: number) => {
      usingNeuralRef.current = false;
      setWordStartTimes(null);
      const text = fullTextRef.current.slice(offset);
      if (!text.trim() || typeof window === "undefined" || !("speechSynthesis" in window)) {
        setIsSpeaking(false);
        setIsPaused(false);
        stopTimer();
        return;
      }
      window.speechSynthesis.cancel();
      const id = ++utteranceIdRef.current;
      const session = sessionIdRef.current;
      const utterance = new SpeechSynthesisUtterance(stripCitationMarkers(text));
      utterance.lang = lang;
      utterance.rate = RATE;
      utterance.pitch = 1;
      utterance.onstart = () => {
        if (utteranceIdRef.current !== id || sessionIdRef.current !== session) return;
        setIsSpeaking(true);
        setIsPaused(false);
        startTimer(total);
      };
      utterance.onend = () => {
        if (utteranceIdRef.current !== id || sessionIdRef.current !== session) return;
        setIsSpeaking(false);
        stopTimer();
      };
      utterance.onerror = () => {
        if (utteranceIdRef.current !== id || sessionIdRef.current !== session) return;
        setIsSpeaking(false);
        stopTimer();
      };

      const go = (voice: SpeechSynthesisVoice | undefined) => {
        if (voice) utterance.voice = voice;
        window.speechSynthesis.speak(utterance);
      };
      if (voiceRef.current) go(voiceRef.current);
      else loadVoices().then((voices) => go(pickBestVoice(voices, lang)));
    },
    [lang, startTimer, stopTimer],
  );

  const play = useCallback(
    (text: string) => {
      if (!isSupported || !text.trim()) return;
      const session = ++sessionIdRef.current;
      cleanupNeuralAudio();

      fullTextRef.current = text;
      const estimate = estimateDurationSeconds(text);
      setEstimatedTotalSeconds(estimate);
      setTotalWords(wordCount(text));
      setElapsedSeconds(0);
      elapsedRef.current = 0;
      setIsPaused(false);
      setWordStartTimes(null);

      fetch("/api/tts/timepoints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, language }),
      })
        .then(async (res) => {
          if (sessionIdRef.current !== session) return;
          const data: { configured: boolean; audio?: string; wordStartTimes?: number[] } = await res.json();
          if (!res.ok || !data.configured || !data.audio || !data.wordStartTimes) {
            speakFromFallback(0, estimate);
            return;
          }

          setWordStartTimes(data.wordStartTimes);
          const url = URL.createObjectURL(base64ToBlob(data.audio, "audio/mpeg"));
          objectUrlRef.current = url;
          const audio = new Audio(url);
          audioRef.current = audio;
          audio.onloadedmetadata = () => {
            if (sessionIdRef.current !== session) return;
            if (Number.isFinite(audio.duration) && audio.duration > 0) setEstimatedTotalSeconds(audio.duration);
          };
          audio.ontimeupdate = () => {
            if (sessionIdRef.current !== session) return;
            setElapsedSeconds(audio.currentTime);
            elapsedRef.current = audio.currentTime;
          };
          audio.onended = () => {
            if (sessionIdRef.current !== session) return;
            setIsSpeaking(false);
            setIsPaused(false);
          };
          audio.onerror = () => {
            if (sessionIdRef.current !== session) return;
            cleanupNeuralAudio();
            speakFromFallback(0, estimate);
          };

          usingNeuralRef.current = true;
          audio
            .play()
            .then(() => {
              if (sessionIdRef.current !== session) return;
              setIsSpeaking(true);
              setIsPaused(false);
            })
            .catch(() => {
              if (sessionIdRef.current !== session) return;
              cleanupNeuralAudio();
              speakFromFallback(0, estimate);
            });
        })
        .catch(() => {
          if (sessionIdRef.current !== session) return;
          speakFromFallback(0, estimate);
        });
    },
    [isSupported, language, cleanupNeuralAudio, speakFromFallback],
  );

  const pause = useCallback(() => {
    if (!isSpeaking) return;
    if (usingNeuralRef.current && audioRef.current) {
      audioRef.current.pause();
      setIsSpeaking(false);
      setIsPaused(true);
      return;
    }
    utteranceIdRef.current++; // invalidate the in-flight fallback utterance's own callbacks
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    stopTimer();
    setIsSpeaking(false);
    setIsPaused(true);
  }, [isSpeaking, stopTimer]);

  const resume = useCallback(() => {
    if (!isPaused) return;
    if (usingNeuralRef.current && audioRef.current) {
      audioRef.current.play().then(
        () => setIsSpeaking(true),
        () => speakFromFallback(offsetForElapsed(fullTextRef.current, elapsedRef.current, estimatedTotalSeconds), estimatedTotalSeconds),
      );
      setIsPaused(false);
      return;
    }
    if (!fullTextRef.current) return;
    const offset = offsetForElapsed(fullTextRef.current, elapsedRef.current, estimatedTotalSeconds);
    speakFromFallback(offset, estimatedTotalSeconds);
  }, [isPaused, estimatedTotalSeconds, speakFromFallback]);

  const skip = useCallback(
    (deltaSeconds: number) => {
      if (!fullTextRef.current) return;
      const total = estimatedTotalSeconds;

      if (usingNeuralRef.current && audioRef.current) {
        const target = Math.min(total, Math.max(0, audioRef.current.currentTime + deltaSeconds));
        audioRef.current.currentTime = target;
        setElapsedSeconds(target);
        elapsedRef.current = target;
        return;
      }

      const target = Math.min(total, Math.max(0, elapsedRef.current + deltaSeconds));
      elapsedRef.current = target;
      setElapsedSeconds(target);
      if (target >= total - 0.05) {
        utteranceIdRef.current++;
        if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
        stopTimer();
        setIsSpeaking(false);
        setIsPaused(false);
        return;
      }
      const offset = offsetForElapsed(fullTextRef.current, target, total);
      speakFromFallback(offset, total);
    },
    [estimatedTotalSeconds, speakFromFallback, stopTimer],
  );

  const cancel = useCallback(() => {
    sessionIdRef.current++;
    utteranceIdRef.current++;
    cleanupNeuralAudio();
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    stopTimer();
    setIsSpeaking(false);
    setIsPaused(false);
    setElapsedSeconds(0);
    elapsedRef.current = 0;
    fullTextRef.current = "";
    setEstimatedTotalSeconds(0);
    setTotalWords(0);
    setWordStartTimes(null);
  }, [cleanupNeuralAudio, stopTimer]);

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      sessionIdRef.current++;
      // eslint-disable-next-line react-hooks/exhaustive-deps
      utteranceIdRef.current++;
      stopTimer();
      cleanupNeuralAudio();
      if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, [stopTimer, cleanupNeuralAudio]);

  const currentWordIndex = wordStartTimes
    ? wordIndexForElapsed(wordStartTimes, elapsedSeconds)
    : estimatedTotalSeconds > 0 && totalWords > 0
      ? Math.min(totalWords - 1, Math.floor((elapsedSeconds / estimatedTotalSeconds) * totalWords))
      : -1;

  return {
    isSupported,
    isSpeaking,
    isPaused,
    elapsedSeconds,
    estimatedTotalSeconds,
    currentWordIndex,
    play,
    pause,
    resume,
    skip,
    cancel,
  };
}
