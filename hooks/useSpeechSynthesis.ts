"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface UseSpeechSynthesisResult {
  isSupported: boolean;
  isSpeaking: boolean;
  /** Speaks text aloud; calls onEnd (if given) once playback finishes or is cancelled. */
  speak: (text: string, onEnd?: () => void) => void;
  cancel: () => void;
}

let cachedVoices: SpeechSynthesisVoice[] = [];
let voicesLoadPromise: Promise<SpeechSynthesisVoice[]> | null = null;

/**
 * Voices load asynchronously in most browsers (Chrome in particular often
 * returns an empty list on the first getVoices() call) — this resolves
 * once they're actually available, cached module-wide since the list never
 * changes during a session.
 */
function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return Promise.resolve([]);
  if (cachedVoices.length > 0) return Promise.resolve(cachedVoices);
  if (voicesLoadPromise) return voicesLoadPromise;

  voicesLoadPromise = new Promise((resolve) => {
    const existing = window.speechSynthesis.getVoices();
    if (existing.length > 0) {
      cachedVoices = existing;
      resolve(existing);
      return;
    }
    const handle = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        cachedVoices = voices;
        window.speechSynthesis.removeEventListener("voiceschanged", handle);
        resolve(voices);
      }
    };
    window.speechSynthesis.addEventListener("voiceschanged", handle);
    // Some browsers never fire voiceschanged if voices were already ready by
    // the time this runs — a one-shot fallback poll covers that case.
    setTimeout(handle, 250);
  });
  return voicesLoadPromise;
}

/**
 * Picks the most natural-sounding available voice for a language. Browsers
 * ship several voices per language, and the one used by default is often
 * the flattest, most robotic-sounding local/compact one — network-backed
 * voices (Chrome/Edge's "Google ..." voices, Microsoft's "... Online
 * (Natural)" voices) sound meaningfully more human, so this actively
 * prefers them over whatever the browser would default to.
 */
function pickBestVoice(voices: SpeechSynthesisVoice[], lang: string): SpeechSynthesisVoice | undefined {
  const langPrefix = lang.split("-")[0].toLowerCase();
  const matching = voices.filter((v) => v.lang.toLowerCase().startsWith(langPrefix));
  if (matching.length === 0) return undefined;

  const exact = matching.filter((v) => v.lang.toLowerCase() === lang.toLowerCase());
  const pool = exact.length > 0 ? exact : matching;

  const premium = pool.find((v) => /google|natural|online|enhanced|premium/i.test(v.name));
  return premium ?? pool[0];
}

/**
 * Thin wrapper around the browser's built-in SpeechSynthesis API — free, no
 * server round trip or extra API cost, same "use the browser's own engine"
 * pattern as useSpeechRecognition. This is what lets the AI Tutor read
 * teaching content aloud without needing a TTS API call per sentence.
 * Actively selects the best available voice per language rather than
 * accepting the browser's (often more robotic-sounding) default — see
 * pickBestVoice() above.
 */
export function useSpeechSynthesis(lang = "en-US"): UseSpeechSynthesisResult {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const voiceRef = useRef<SpeechSynthesisVoice | undefined>(undefined);

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
      // Slightly slower than the default 1.0 — reads as a bit more
      // deliberate and human, less like a flat text-to-speech readout.
      // Pitch is left at the voice's own natural default (1.0): shifting it
      // away from that tends to make a voice sound worse, not more human.
      utterance.rate = 0.95;
      utterance.pitch = 1;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        onEnd?.();
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        onEnd?.();
      };

      const speakWithVoice = (voice: SpeechSynthesisVoice | undefined) => {
        if (voice) utterance.voice = voice;
        window.speechSynthesis.speak(utterance);
      };

      if (voiceRef.current) {
        speakWithVoice(voiceRef.current);
      } else {
        // First call before the voice list has loaded — resolve once, then speak.
        loadVoices().then((voices) => speakWithVoice(pickBestVoice(voices, lang)));
      }
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
