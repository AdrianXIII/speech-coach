"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { LANGUAGES, type LanguageCode } from "@/lib/languages";

const STORAGE_KEY = "appLanguage";

interface LanguageContextValue {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: "en",
  setLanguage: () => {},
});

/**
 * One global language choice for the whole app — the nav labels and every
 * multi-language trainer (Improv, Contrastive Stress, Listening & Summary,
 * Executive Phrasing, Speed Reading) all read from this instead of each
 * managing its own language picker and localStorage key.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>("en");

  // Client-only: localStorage doesn't exist during SSR, and reading it
  // during the initial render would make the server and client disagree
  // immediately — same hydration-mismatch trap as a Math.random() pick.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (LANGUAGES.some((l) => l.code === saved)) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLanguageState(saved as LanguageCode);
      }
    } catch {
      // Private browsing / storage disabled — stick with English.
    }
  }, []);

  function setLanguage(newLanguage: LanguageCode) {
    setLanguageState(newLanguage);
    try {
      window.localStorage.setItem(STORAGE_KEY, newLanguage);
    } catch {
      // Ignore — the choice just won't persist across visits.
    }
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  return useContext(LanguageContext);
}
