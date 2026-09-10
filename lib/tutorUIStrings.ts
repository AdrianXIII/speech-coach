import type { LanguageCode } from "@/lib/languages";

/**
 * The handful of spoken/navigational prompts the AI Tutor says out loud
 * before any domain content exists to translate (profession/category
 * questions, the mode handoff question appended after Teach). Kept as a
 * small hand-translated table, same convention as other multi-language
 * trainers in this app (e.g. ComprehensionTrainer's `T` table).
 */
interface TutorStrings {
  professionPrompt: string;
  categoryPrompt: (professionLabel: string) => string;
  handoffQuestion: string;
  forExample: string;
}

const STRINGS: Record<LanguageCode, TutorStrings> = {
  en: {
    professionPrompt: "Which profession would you like to explore — Business, Politics, or Law?",
    categoryPrompt: (p) => `Which category of ${p} would you like to deep dive into?`,
    handoffQuestion: "Do you want to train with a standard use case, or a use case based on live news?",
    forExample: "For example:",
  },
  de: {
    professionPrompt: "Welches Berufsfeld möchtest du erkunden — Wirtschaft, Politik oder Recht?",
    categoryPrompt: (p) => `In welche Kategorie von ${p} möchtest du eintauchen?`,
    handoffQuestion: "Möchtest du mit einem Standardfall üben oder mit einem Fall basierend auf aktuellen Nachrichten?",
    forExample: "Zum Beispiel:",
  },
  fr: {
    professionPrompt: "Quel domaine professionnel souhaitez-vous explorer — Affaires, Politique ou Droit ?",
    categoryPrompt: (p) => `Dans quelle catégorie de ${p} souhaitez-vous approfondir ?`,
    handoffQuestion: "Souhaitez-vous vous entraîner avec un cas standard ou un cas basé sur l'actualité ?",
    forExample: "Par exemple :",
  },
  es: {
    professionPrompt: "¿Qué profesión te gustaría explorar — Negocios, Política o Derecho?",
    categoryPrompt: (p) => `¿En qué categoría de ${p} te gustaría profundizar?`,
    handoffQuestion: "¿Quieres practicar con un caso estándar o un caso basado en noticias actuales?",
    forExample: "Por ejemplo:",
  },
  sv: {
    professionPrompt: "Vilket område vill du utforska — Näringsliv, Politik eller Juridik?",
    categoryPrompt: (p) => `Vilken kategori inom ${p} vill du fördjupa dig i?`,
    handoffQuestion: "Vill du träna med ett standardfall eller ett fall baserat på aktuella nyheter?",
    forExample: "Till exempel:",
  },
};

export function tutorStrings(language: LanguageCode): TutorStrings {
  return STRINGS[language] ?? STRINGS.en;
}
