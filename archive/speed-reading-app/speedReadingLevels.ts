import type { LanguageCode } from "@/lib/languages";

export interface ReadingLevel {
  id: "beginner" | "intermediate" | "advanced";
  name: Record<LanguageCode, string>;
  description: Record<LanguageCode, string>;
  wpmMin: number;
  wpmMax: number;
  maxWordsPerChunk: number;
  maxCharsPerChunk: number;
  /** Requires an active subscription. Beginner stays free forever. */
  premium: boolean;
}

export const READING_LEVELS: ReadingLevel[] = [
  {
    id: "beginner",
    name: {
      en: "Level 1 – Beginner",
      de: "Stufe 1 – Anfänger",
      fr: "Niveau 1 – Débutant",
      es: "Nivel 1 – Principiante",
      sv: "Nivå 1 – Nybörjare",
    },
    description: {
      en: "150–200 wpm, one word at a time.",
      de: "150–200 Wörter/Min., ein Wort nach dem anderen.",
      fr: "150–200 mots/min, un mot à la fois.",
      es: "150–200 palabras/min, una palabra a la vez.",
      sv: "150–200 ord/min, ett ord i taget.",
    },
    wpmMin: 150,
    wpmMax: 200,
    maxWordsPerChunk: 1,
    maxCharsPerChunk: 16,
    premium: false,
  },
  {
    id: "intermediate",
    name: {
      en: "Level 2 – Intermediate",
      de: "Stufe 2 – Mittelstufe",
      fr: "Niveau 2 – Intermédiaire",
      es: "Nivel 2 – Intermedio",
      sv: "Nivå 2 – Mellannivå",
    },
    description: {
      en: "300–400 wpm, 1–2 words at a time.",
      de: "300–400 Wörter/Min., 1–2 Wörter auf einmal.",
      fr: "300–400 mots/min, 1 à 2 mots à la fois.",
      es: "300–400 palabras/min, 1–2 palabras a la vez.",
      sv: "300–400 ord/min, 1–2 ord i taget.",
    },
    wpmMin: 300,
    wpmMax: 400,
    maxWordsPerChunk: 2,
    maxCharsPerChunk: 12,
    premium: true,
  },
  {
    id: "advanced",
    name: {
      en: "Level 3 – Advanced (Chunking)",
      de: "Stufe 3 – Fortgeschritten (Wortgruppen)",
      fr: "Niveau 3 – Avancé (groupes de mots)",
      es: "Nivel 3 – Avanzado (agrupación)",
      sv: "Nivå 3 – Avancerad (gruppering)",
    },
    description: {
      en: "500+ wpm, 3–4 words per chunk.",
      de: "500+ Wörter/Min., 3–4 Wörter pro Gruppe.",
      fr: "500+ mots/min, 3 à 4 mots par groupe.",
      es: "500+ palabras/min, 3–4 palabras por grupo.",
      sv: "500+ ord/min, 3–4 ord per grupp.",
    },
    wpmMin: 500,
    wpmMax: 650,
    maxWordsPerChunk: 4,
    maxCharsPerChunk: 24,
    premium: true,
  },
];

/**
 * Groups words into chunks for the RSVP display: at most `maxWordsPerChunk`
 * words, and stops adding words once the chunk would exceed
 * `maxCharsPerChunk` — so a chunk of short words can use its full word
 * budget while a couple of long words fill a chunk on their own.
 */
export function chunkWords(
  words: string[],
  maxWordsPerChunk: number,
  maxCharsPerChunk: number,
): string[][] {
  const chunks: string[][] = [];
  let current: string[] = [];
  let currentChars = 0;

  for (const word of words) {
    const separatorChars = current.length > 0 ? 1 : 0;
    const exceedsWords = current.length + 1 > maxWordsPerChunk;
    const exceedsChars = currentChars + separatorChars + word.length > maxCharsPerChunk;

    if (current.length > 0 && (exceedsWords || exceedsChars)) {
      chunks.push(current);
      current = [];
      currentChars = 0;
    }

    current.push(word);
    currentChars += (current.length > 1 ? 1 : 0) + word.length;
  }

  if (current.length > 0) chunks.push(current);
  return chunks;
}

/** How long to show one chunk, in milliseconds, at a given reading speed. */
export function chunkDisplayMs(chunk: string[], wpm: number): number {
  return (chunk.length / wpm) * 60_000;
}

export function clampWpm(wpm: number, level: ReadingLevel): number {
  return Math.min(level.wpmMax * 1.3, Math.max(level.wpmMin * 0.7, Math.round(wpm)));
}
