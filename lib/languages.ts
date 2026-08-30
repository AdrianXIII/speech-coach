export type LanguageCode = "en" | "de" | "fr" | "es" | "sv";

export interface Language {
  code: LanguageCode;
  name: string;
  /** BCP-47 tag for the browser's TTS/STT APIs. */
  speechLang: string;
}

/**
 * Shared language list — the first feature to use this is Contrastive
 * Stress, but it's meant to be reused as other trainers grow multi-language
 * content packs. English, German, French, and Spanish share Latin script
 * and whitespace-separated words, so the same mechanics (word-count-based
 * audio segmentation, simple tokenization) transfer directly; a language
 * like Japanese or Chinese would need real changes (no spaces between
 * words, pitch-accent/tone instead of stress) and isn't in this list yet.
 */
export const LANGUAGES: Language[] = [
  { code: "en", name: "English", speechLang: "en-US" },
  { code: "de", name: "Deutsch", speechLang: "de-DE" },
  { code: "fr", name: "Français", speechLang: "fr-FR" },
  { code: "es", name: "Español", speechLang: "es-ES" },
  { code: "sv", name: "Svenska", speechLang: "sv-SE" },
];

export function getLanguage(code: LanguageCode): Language {
  return LANGUAGES.find((l) => l.code === code) ?? LANGUAGES[0];
}
