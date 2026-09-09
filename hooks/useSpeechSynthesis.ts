"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface UseSpeechSynthesisResult {
  isSupported: boolean;
  isSpeaking: boolean;
  /** Speaks text aloud; calls onEnd (if given) once playback finishes or is cancelled. */
  speak: (text: string, onEnd?: () => void) => void;
  cancel: () => void;
}

/**
 * Thin wrapper around the browser's built-in SpeechSynthesis API — free, no
 * server round trip or extra API cost, same "use the browser's own engine"
 * pattern as useSpeechRecognition. This is what lets the AI Tutor read
 * teaching content aloud without needing a TTS API call per sentence.
 */
export function useSpeechSynthesis(lang = "en-US"): UseSpeechSynthesisResult {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsSupported(typeof window !== "undefined" && "speechSynthesis" in window);
  }, []);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speak = useCallback(
    (text: string, onEnd?: () => void) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window) || !text.trim()) {
        onEnd?.();
        return;
      }
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        onEnd?.();
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        onEnd?.();
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [lang],
  );

  const cancel = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, []);

  return { isSupported, isSpeaking, speak, cancel };
}
