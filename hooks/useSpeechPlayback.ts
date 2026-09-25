"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { loadVoices, pickBestVoice, stripCitationMarkers } from "@/hooks/useSpeechSynthesis";

export interface UseSpeechPlaybackResult {
  isSupported: boolean;
  isSpeaking: boolean;
  isPaused: boolean;
  elapsedSeconds: number;
  estimatedTotalSeconds: number;
  /** Starts speaking new text from the beginning, replacing whatever was playing. Also what "restart from scratch" (e.g. a Repeat button) should call. */
  play: (text: string) => void;
  /** Pauses at the current estimated position. */
  pause: () => void;
  /** Resumes from the paused position. No-op if not paused. */
  resume: () => void;
  /** Jumps forward (positive) or backward (negative) by this many seconds, estimated. */
  skip: (deltaSeconds: number) => void;
  /** Fully stops and resets position to 0. */
  cancel: () => void;
}

const RATE = 0.95;
/**
 * No browser exposes real duration/position for speech synthesis — this is
 * a plain words-per-minute estimate (calibrated for RATE) used only to size
 * the progress bar and to translate a "skip ±10s" tap into an approximate
 * word offset to restart from. It will drift from the actual spoken time,
 * more so for languages/voices that read faster or slower than this — fine
 * for a progress indicator, not presented anywhere as exact.
 */
const WORDS_PER_MINUTE_AT_RATE_1 = 165;

function estimateDurationSeconds(text: string): number {
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const wpm = WORDS_PER_MINUTE_AT_RATE_1 * RATE;
  return wordCount > 0 ? (wordCount / wpm) * 60 : 0;
}

/** Maps an estimated elapsed time to a character offset, snapped to the start of the next word so playback never resumes mid-word. */
function offsetForElapsed(text: string, elapsed: number, total: number): number {
  if (total <= 0) return 0;
  const ratio = Math.min(1, Math.max(0, elapsed / total));
  let i = Math.round(text.length * ratio);
  while (i < text.length && !/\s/.test(text[i])) i++;
  while (i < text.length && /\s/.test(text[i])) i++;
  return i;
}

/**
 * A playback-bar-capable layer on top of the browser's SpeechSynthesis API —
 * built for AI Tutor's teach step specifically, separate from the simpler
 * fire-and-forget useSpeechSynthesis (used by every other "🔊 Listen" button
 * in the app, left untouched, since they don't need pause/skip).
 *
 * Browser TTS has no native seek or reliable pause-and-resume-from-position
 * API. Both "skip ±10s" and pause/resume here are implemented the same way:
 * estimate a word offset from elapsed time, cancel whatever's currently
 * speaking, and start a fresh utterance from that offset. This deliberately
 * avoids speechSynthesis.pause()/resume(), which is known-unreliable on
 * WebKit/iOS Safari — exactly the platform this app's native shell runs on
 * (see capacitor.config.ts) — in favor of a mechanism that only depends on
 * cancel()/speak(), which work consistently everywhere.
 */
export function useSpeechPlayback(lang = "en-US"): UseSpeechPlaybackResult {
  const [isSupported, setIsSupported] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [estimatedTotalSeconds, setEstimatedTotalSeconds] = useState(0);

  const voiceRef = useRef<SpeechSynthesisVoice | undefined>(undefined);
  const fullTextRef = useRef("");
  // Mirrors elapsedSeconds for reads inside callbacks (skip/resume) without
  // depending on a stale closure over the state value.
  const elapsedRef = useRef(0);
  // Bumped on every cancel/new-utterance so a stray onstart/onend/onerror
  // from an utterance we've already abandoned (e.g. cancelled mid-skip)
  // can't clobber the state a newer utterance just set.
  const utteranceIdRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    elapsedRef.current = elapsedSeconds;
  }, [elapsedSeconds]);

  useEffect(() => {
    const supported = typeof window !== "undefined" && "speechSynthesis" in window;
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

  const speakFrom = useCallback(
    (offset: number, total: number) => {
      const text = fullTextRef.current.slice(offset);
      if (!text.trim()) {
        setIsSpeaking(false);
        setIsPaused(false);
        stopTimer();
        return;
      }
      window.speechSynthesis.cancel();
      const id = ++utteranceIdRef.current;
      const utterance = new SpeechSynthesisUtterance(stripCitationMarkers(text));
      utterance.lang = lang;
      utterance.rate = RATE;
      utterance.pitch = 1;
      utterance.onstart = () => {
        if (utteranceIdRef.current !== id) return;
        setIsSpeaking(true);
        setIsPaused(false);
        startTimer(total);
      };
      utterance.onend = () => {
        if (utteranceIdRef.current !== id) return;
        setIsSpeaking(false);
        stopTimer();
      };
      utterance.onerror = () => {
        if (utteranceIdRef.current !== id) return;
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
      fullTextRef.current = text;
      const total = estimateDurationSeconds(text);
      setEstimatedTotalSeconds(total);
      setElapsedSeconds(0);
      elapsedRef.current = 0;
      speakFrom(0, total);
    },
    [isSupported, speakFrom],
  );

  const pause = useCallback(() => {
    if (!isSpeaking) return;
    utteranceIdRef.current++; // invalidate the in-flight utterance's own callbacks
    window.speechSynthesis.cancel();
    stopTimer();
    setIsSpeaking(false);
    setIsPaused(true);
  }, [isSpeaking, stopTimer]);

  const resume = useCallback(() => {
    if (!isPaused || !fullTextRef.current) return;
    const offset = offsetForElapsed(fullTextRef.current, elapsedRef.current, estimatedTotalSeconds);
    speakFrom(offset, estimatedTotalSeconds);
  }, [isPaused, estimatedTotalSeconds, speakFrom]);

  const skip = useCallback(
    (deltaSeconds: number) => {
      if (!fullTextRef.current) return;
      const total = estimatedTotalSeconds;
      const target = Math.min(total, Math.max(0, elapsedRef.current + deltaSeconds));
      elapsedRef.current = target;
      setElapsedSeconds(target);
      if (target >= total - 0.05) {
        utteranceIdRef.current++;
        window.speechSynthesis.cancel();
        stopTimer();
        setIsSpeaking(false);
        setIsPaused(false);
        return;
      }
      const offset = offsetForElapsed(fullTextRef.current, target, total);
      speakFrom(offset, total);
    },
    [estimatedTotalSeconds, speakFrom, stopTimer],
  );

  const cancel = useCallback(() => {
    utteranceIdRef.current++;
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    stopTimer();
    setIsSpeaking(false);
    setIsPaused(false);
    setElapsedSeconds(0);
    elapsedRef.current = 0;
    fullTextRef.current = "";
    setEstimatedTotalSeconds(0);
  }, [stopTimer]);

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      utteranceIdRef.current++;
      stopTimer();
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [stopTimer]);

  return {
    isSupported,
    isSpeaking,
    isPaused,
    elapsedSeconds,
    estimatedTotalSeconds,
    play,
    pause,
    resume,
    skip,
    cancel,
  };
}
