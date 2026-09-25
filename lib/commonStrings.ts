import type { LanguageCode } from "@/lib/languages";

/**
 * Small strings repeated across many components (generic errors, recording
 * controls). Feature-specific text stays in each component's own T map.
 * "Mock mode" banners are intentionally left in English everywhere — they
 * only appear in local development without GEMINI_API_KEY, never to users.
 */
export const COMMON: Record<
  LanguageCode,
  {
    somethingWentWrong: string;
    requestFailed: (status: number) => string;
    startRecording: string;
    stopRecording: string;
  }
> = {
  en: {
    somethingWentWrong: "Something went wrong.",
    requestFailed: (s) => `Request failed (${s}).`,
    startRecording: "Start recording",
    stopRecording: "Stop recording",
  },
  de: {
    somethingWentWrong: "Etwas ist schiefgelaufen.",
    requestFailed: (s) => `Anfrage fehlgeschlagen (${s}).`,
    startRecording: "Aufnahme starten",
    stopRecording: "Aufnahme beenden",
  },
  fr: {
    somethingWentWrong: "Une erreur est survenue.",
    requestFailed: (s) => `La requête a échoué (${s}).`,
    startRecording: "Démarrer l'enregistrement",
    stopRecording: "Arrêter l'enregistrement",
  },
  es: {
    somethingWentWrong: "Algo salió mal.",
    requestFailed: (s) => `La solicitud falló (${s}).`,
    startRecording: "Empezar a grabar",
    stopRecording: "Detener la grabación",
  },
  sv: {
    somethingWentWrong: "Något gick fel.",
    requestFailed: (s) => `Förfrågan misslyckades (${s}).`,
    startRecording: "Starta inspelning",
    stopRecording: "Stoppa inspelning",
  },
};
