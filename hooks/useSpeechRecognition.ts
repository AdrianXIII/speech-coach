"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface MinimalSpeechRecognition {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

interface SpeechRecognitionEventLike {
  resultIndex: number;
  results: ArrayLike<{ isFinal: boolean; 0: { transcript: string } }>;
}

type SpeechRecognitionCtor = new () => MinimalSpeechRecognition;

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionCtor;
    webkitSpeechRecognition?: SpeechRecognitionCtor;
  }
}

export interface UseSpeechRecognitionResult {
  isSupported: boolean;
  isListening: boolean;
  transcript: string;
  start: () => void;
  stop: () => void;
  reset: () => void;
}

/**
 * Thin wrapper around the browser's built-in Web Speech API — free, no
 * server round trip, since it's the browser's own speech engine (Chrome
 * and Edge; not supported in Firefox or Safari, so callers must check
 * `isSupported` and show a fallback message).
 */
export function useSpeechRecognition(lang = "en-US"): UseSpeechRecognitionResult {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<MinimalSpeechRecognition | null>(null);
  const finalTranscriptRef = useRef("");

  const getCtor = useCallback((): SpeechRecognitionCtor | undefined => {
    if (typeof window === "undefined") return undefined;
    return window.SpeechRecognition ?? window.webkitSpeechRecognition;
  }, []);

  // Checked client-only: `window` already exists on the client's first
  // render pass (unlike during SSR), so reading it directly during render
  // would make the server and client disagree on this value immediately —
  // the same hydration-mismatch trap as a Math.random() initial state.
  const [isSupported, setIsSupported] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsSupported(!!getCtor());
  }, [getCtor]);

  const start = useCallback(() => {
    const Ctor = getCtor();
    if (!Ctor) return;

    finalTranscriptRef.current = "";
    setTranscript("");

    const recognition = new Ctor();
    recognition.lang = lang;
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscriptRef.current += `${result[0].transcript} `;
        } else {
          interim += result[0].transcript;
        }
      }
      setTranscript((finalTranscriptRef.current + interim).trim());
    };

    recognition.onerror = () => {
      // Swallowed: the recorder's own error state covers mic-access
      // failures, and a partial/empty transcript is handled gracefully
      // downstream rather than surfacing a second error message.
    };

    // isListening flips only once the API itself reports it's done — stop()
    // just *requests* a stop, but the last final result(s) can still arrive
    // asynchronously afterward. Callers that need the complete transcript
    // should wait for isListening to become false, not for stop() to return.
    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
    recognitionRef.current = recognition;
    setIsListening(true);
  }, [getCtor, lang]);

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
  }, []);

  const reset = useCallback(() => {
    finalTranscriptRef.current = "";
    setTranscript("");
  }, []);

  return { isSupported, isListening, transcript, start, stop, reset };
}
