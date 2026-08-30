export interface ReadingLevel {
  id: "beginner" | "intermediate" | "advanced";
  name: string;
  description: string;
  wpmMin: number;
  wpmMax: number;
  maxWordsPerChunk: number;
  maxCharsPerChunk: number;
}

export const READING_LEVELS: ReadingLevel[] = [
  {
    id: "beginner",
    name: "Nivå 1 – Nybörjare",
    description: "150–200 ord/min, ett ord i taget.",
    wpmMin: 150,
    wpmMax: 200,
    maxWordsPerChunk: 1,
    maxCharsPerChunk: 16,
  },
  {
    id: "intermediate",
    name: "Nivå 2 – Medel",
    description: "300–400 ord/min, 1–2 ord i taget.",
    wpmMin: 300,
    wpmMax: 400,
    maxWordsPerChunk: 2,
    maxCharsPerChunk: 12,
  },
  {
    id: "advanced",
    name: "Nivå 3 – Avancerad (Chunking)",
    description: "500+ ord/min, 3–4 ord i en chunk.",
    wpmMin: 500,
    wpmMax: 650,
    maxWordsPerChunk: 4,
    maxCharsPerChunk: 24,
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
