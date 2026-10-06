"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";
import { getLanguage, type LanguageCode } from "@/lib/languages";

export interface UseNeuralSpeechResult {
  isSupported: boolean;
  isSpeaking: boolean;
  /** Speaks text aloud; calls onEnd (if given) once playback finishes, fails, or is cancelled. */
  speak: (text: string, onEnd?: () => void) => void;
  cancel: () => void;
}

/**
 * Drop-in sibling of useSpeechSynthesis with the same { isSupported,
 * isSpeaking, speak, cancel } shape, but backed by /api/tts's natural
 * Google Cloud neural voice instead of the browser's own (often robotic)
 * voice. Falls back to the plain useSpeechSynthesis path — same browser
 * engine as before — whenever the API isn't configured, fails, or a
 * browser blocks `<audio>` autoplay outside a user gesture, so this is
 * never a worse experience than what shipped before it, only sometimes a
 * better one.
 *
 * `cacheable` should be true for text that's identical across every user
 * who ever triggers it (AI Tutor's static prompts/lessons, Comprehension's
 * pooled passages) and false for anything generated per-request (a typed
 * word, Gemini-generated feedback) — see lib/tts.ts's tts_cache.
 */
export function useNeuralSpeech(language: LanguageCode, opts: { cacheable?: boolean } = {}): UseNeuralSpeechResult {
  const cacheable = opts.cacheable ?? false;
  const fallback = useSpeechSynthesis(getLanguage(language).speechLang);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);
  // Bumped on every speak()/cancel() call so a slow/late-arriving fetch from
  // a previous call can recognize it's been superseded and do nothing.
  const requestIdRef = useRef(0);

  const cleanupAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.onended = null;
      audioRef.current.onerror = null;
      audioRef.current = null;
    }
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  }, []);

  useEffect(() => cleanupAudio, [cleanupAudio]);

  const speak = useCallback(
    (text: string, onEnd?: () => void) => {
      const requestId = ++requestIdRef.current;
      cleanupAudio();
      fallback.cancel();
      setIsSpeaking(false);

      if (!text.trim()) {
        onEnd?.();
        return;
      }

      const fallbackToSpeech = () => {
        if (requestId !== requestIdRef.current) return;
        fallback.speak(text, onEnd);
      };

      fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, language, cacheable }),
      })
        .then(async (res) => {
          if (requestId !== requestIdRef.current) return;
          const contentType = res.headers.get("content-type") ?? "";
          if (!res.ok || !contentType.startsWith("audio/")) {
            fallbackToSpeech();
            return;
          }
          const blob = await res.blob();
          if (requestId !== requestIdRef.current) return;

          const url = URL.createObjectURL(blob);
          objectUrlRef.current = url;
          const audio = new Audio(url);
          audioRef.current = audio;
          audio.onended = () => {
            if (requestId !== requestIdRef.current) return;
            setIsSpeaking(false);
            onEnd?.();
          };
          audio.onerror = fallbackToSpeech;
          setIsSpeaking(true);
          audio.play().catch(fallbackToSpeech);
        })
        .catch(fallbackToSpeech);
    },
    [language, cacheable, cleanupAudio, fallback],
  );

  const cancel = useCallback(() => {
    requestIdRef.current += 1;
    cleanupAudio();
    fallback.cancel();
    setIsSpeaking(false);
  }, [cleanupAudio, fallback]);

  return { isSupported: true, isSpeaking: isSpeaking || fallback.isSpeaking, speak, cancel };
}
