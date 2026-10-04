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
    signInRequired: string;
    dailyLimitReached: string;
    categoryLocked: string;
    rateLimited: string;
    quotaExceeded: string;
    recordingTooLarge: string;
    micAccessDenied: string;
  }
> = {
  en: {
    somethingWentWrong: "Something went wrong.",
    requestFailed: (s) => `Request failed (${s}).`,
    startRecording: "Start recording",
    stopRecording: "Stop recording",
    signInRequired: "Please sign in again.",
    dailyLimitReached: "You've used today's free session for this trainer. Upgrade for unlimited daily use.",
    categoryLocked: "This category requires a subscription.",
    rateLimited: "Too many requests — please slow down and try again shortly.",
    quotaExceeded: "Our AI coach is at capacity right now. Please try again in a few minutes.",
    recordingTooLarge: "That recording is too large. Try a shorter take.",
    micAccessDenied: "Couldn't access your microphone. Check your browser or system permissions and try again.",
  },
  de: {
    somethingWentWrong: "Etwas ist schiefgelaufen.",
    requestFailed: (s) => `Anfrage fehlgeschlagen (${s}).`,
    startRecording: "Aufnahme starten",
    stopRecording: "Aufnahme beenden",
    signInRequired: "Bitte melde dich erneut an.",
    dailyLimitReached: "Du hast deine heutige kostenlose Sitzung für diesen Trainer aufgebraucht. Abonniere für unbegrenzte tägliche Nutzung.",
    categoryLocked: "Diese Kategorie erfordert ein Abonnement.",
    rateLimited: "Zu viele Anfragen — bitte warte kurz und versuche es erneut.",
    quotaExceeded: "Unser KI-Coach ist gerade ausgelastet. Bitte versuche es in ein paar Minuten erneut.",
    recordingTooLarge: "Diese Aufnahme ist zu groß. Versuche eine kürzere Aufnahme.",
    micAccessDenied: "Zugriff auf dein Mikrofon nicht möglich. Prüfe deine Browser- oder Systemberechtigungen und versuche es erneut.",
  },
  fr: {
    somethingWentWrong: "Une erreur est survenue.",
    requestFailed: (s) => `La requête a échoué (${s}).`,
    startRecording: "Démarrer l'enregistrement",
    stopRecording: "Arrêter l'enregistrement",
    signInRequired: "Veuillez vous reconnecter.",
    dailyLimitReached: "Vous avez utilisé votre session gratuite du jour pour cet entraîneur. Abonnez-vous pour un usage quotidien illimité.",
    categoryLocked: "Cette catégorie nécessite un abonnement.",
    rateLimited: "Trop de requêtes — veuillez patienter un instant et réessayer.",
    quotaExceeded: "Notre coach IA est actuellement saturé. Veuillez réessayer dans quelques minutes.",
    recordingTooLarge: "Cet enregistrement est trop volumineux. Essayez un enregistrement plus court.",
    micAccessDenied: "Impossible d'accéder à votre microphone. Vérifiez les autorisations de votre navigateur ou système et réessayez.",
  },
  es: {
    somethingWentWrong: "Algo salió mal.",
    requestFailed: (s) => `La solicitud falló (${s}).`,
    startRecording: "Empezar a grabar",
    stopRecording: "Detener la grabación",
    signInRequired: "Vuelve a iniciar sesión.",
    dailyLimitReached: "Ya has usado tu sesión gratuita de hoy para este entrenador. Suscríbete para uso diario ilimitado.",
    categoryLocked: "Esta categoría requiere una suscripción.",
    rateLimited: "Demasiadas solicitudes — espera un momento e inténtalo de nuevo.",
    quotaExceeded: "Nuestro coach de IA está saturado en este momento. Inténtalo de nuevo en unos minutos.",
    recordingTooLarge: "Esa grabación es demasiado grande. Prueba con una toma más corta.",
    micAccessDenied: "No se pudo acceder a tu micrófono. Revisa los permisos del navegador o del sistema e inténtalo de nuevo.",
  },
  sv: {
    somethingWentWrong: "Något gick fel.",
    requestFailed: (s) => `Förfrågan misslyckades (${s}).`,
    startRecording: "Starta inspelning",
    stopRecording: "Stoppa inspelning",
    signInRequired: "Logga in igen.",
    dailyLimitReached: "Du har använt dagens gratissession för den här tränaren. Prenumerera för obegränsad daglig användning.",
    categoryLocked: "Den här kategorin kräver en prenumeration.",
    rateLimited: "För många förfrågningar — vänta en stund och försök igen.",
    quotaExceeded: "Vår AI-coach är fullbelastad just nu. Försök igen om några minuter.",
    recordingTooLarge: "Den inspelningen är för stor. Försök med en kortare inspelning.",
    micAccessDenied: "Kunde inte komma åt mikrofonen. Kontrollera webbläsarens eller systemets behörigheter och försök igen.",
  },
};

/**
 * Maps a failed API response's status (and, where status alone is
 * ambiguous, its own English `error` message — never shown directly) to a
 * localized string from COMMON above. Every trainer's fetch handler should
 * go through this instead of falling back to the server's raw English
 * `body?.error` — the server message is still logged/available via `status`
 * for support purposes, but never rendered as-is, so a de/fr/es/sv user
 * never sees unexpected English in an error state.
 */
export function apiErrorMessage(status: number, serverMessage: string | undefined, language: LanguageCode): string {
  const t = COMMON[language];
  const m = (serverMessage ?? "").toLowerCase();
  if (status === 401) return t.signInRequired;
  if (status === 402) return m.includes("subscription") ? t.categoryLocked : t.dailyLimitReached;
  if (status === 413) return t.recordingTooLarge;
  if (status === 429) return m.includes("usage limit") ? t.quotaExceeded : t.rateLimited;
  return t.requestFailed(status);
}
