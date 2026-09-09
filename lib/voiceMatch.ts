/**
 * Matches a spoken phrase against a fixed list of options (professions,
 * categories, "next"/"repeat" commands) — deterministic keyword matching,
 * not an LLM call, since this needs to be instant and free. Returns the
 * matched option's original label, or null if nothing matched confidently.
 */
export function matchSpokenLabel(transcript: string, options: string[]): string | null {
  const normalized = transcript.toLowerCase().replace(/[^a-z0-9\s&]/g, " ").trim();
  if (!normalized) return null;

  // Exact or substring match first (handles "Business" said for "Business", or
  // "the strategy one" containing "strategy").
  for (const option of options) {
    const optionNorm = option.toLowerCase();
    if (normalized === optionNorm || normalized.includes(optionNorm)) return option;
  }

  // Fall back to matching on the option's significant words (e.g. "foreign
  // policy" matches "Foreign Policy & Diplomacy"), picking the option with
  // the most matching words so a vague answer still resolves confidently.
  const words = normalized.split(/\s+/).filter((w) => w.length >= 4);
  let best: { option: string; score: number } | null = null;
  for (const option of options) {
    const optionWords = option
      .toLowerCase()
      .replace(/[^a-z0-9\s&]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length >= 4);
    const score = optionWords.filter((w) => words.includes(w)).length;
    if (score > 0 && (!best || score > best.score)) best = { option, score };
  }
  return best?.option ?? null;
}

/** True if the spoken phrase contains one of the given short command words (e.g. "next", "repeat"). */
export function matchesCommand(transcript: string, commands: string[]): string | null {
  const normalized = transcript.toLowerCase();
  return commands.find((c) => normalized.includes(c)) ?? null;
}
