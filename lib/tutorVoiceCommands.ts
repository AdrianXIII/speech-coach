import type { LanguageCode } from "@/lib/languages";

/**
 * Word lists for the AI Tutor's fixed voice commands ("next", "repeat",
 * "back", "standard", "news"), per app language, with their own resolver
 * functions below. Kept separate from the domain content translation
 * (which is dynamic, via Gemini) since these are a small, fixed,
 * high-confidence vocabulary worth hand-translating once.
 */
export interface TeachNavCommands {
  next: string[];
  back: string[];
  repeat: string[];
}

export interface HandoffCommands {
  news: string[];
  standard: string[];
}

const TEACH_NAV_COMMANDS: Record<LanguageCode, TeachNavCommands> = {
  en: { next: ["next", "continue", "skip"], back: ["back", "previous"], repeat: ["repeat"] },
  de: { next: ["weiter", "nächste", "nächster"], back: ["zurück", "vorherige"], repeat: ["wiederhol", "nochmal"] },
  fr: { next: ["suivant", "continue", "continuer"], back: ["retour", "précédent"], repeat: ["répète", "répéter"] },
  es: { next: ["siguiente", "continuar"], back: ["atrás", "anterior"], repeat: ["repite", "repetir"] },
  sv: { next: ["nästa", "fortsätt"], back: ["tillbaka", "föregående"], repeat: ["upprepa", "igen"] },
};

const HANDOFF_COMMANDS: Record<LanguageCode, HandoffCommands> = {
  en: { news: ["news"], standard: ["standard", "case"] },
  de: { news: ["nachrichten", "news"], standard: ["standard", "fall"] },
  fr: { news: ["actualité", "actualités", "nouvelles"], standard: ["standard", "cas"] },
  es: { news: ["noticia", "noticias"], standard: ["estándar", "caso"] },
  sv: { news: ["nyheter", "nyhet"], standard: ["standard", "fall"] },
};

export function teachNavCommandWords(language: LanguageCode): string[] {
  const c = TEACH_NAV_COMMANDS[language];
  return [...c.next, ...c.back, ...c.repeat];
}

export function resolveTeachNavCommand(heard: string, language: LanguageCode): "next" | "back" | "repeat" | null {
  const c = TEACH_NAV_COMMANDS[language];
  const lower = heard.toLowerCase();
  if (c.repeat.some((w) => lower.includes(w))) return "repeat";
  if (c.back.some((w) => lower.includes(w))) return "back";
  if (c.next.some((w) => lower.includes(w))) return "next";
  return null;
}

export function resolveHandoffCommand(heard: string, language: LanguageCode): "news" | "standard" | null {
  const c = HANDOFF_COMMANDS[language];
  const lower = heard.toLowerCase();
  if (c.news.some((w) => lower.includes(w))) return "news";
  if (c.standard.some((w) => lower.includes(w))) return "standard";
  return null;
}
