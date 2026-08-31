import type { LanguageCode } from "@/lib/languages";

export interface StructurePhase {
  label: string;
  seconds: number;
}

export interface StructureModel {
  id: string;
  name: string;
  fullName: string;
  /** Must sum to 60. */
  phases: StructurePhase[];
}

/**
 * The framework names (PREP, NUPP, Triad) stay the same across languages —
 * treated like brand names for the technique, the same way "PREP" is
 * taught in English internationally. The phase labels and descriptions are
 * translated per language so the on-screen prompts match the language
 * you're actually speaking.
 */
const MODELS_BY_LANGUAGE: Record<LanguageCode, StructureModel[]> = {
  en: [
    {
      id: "prep",
      name: "PREP",
      fullName: "Point – Reason – Example – Point",
      phases: [
        { label: "Point", seconds: 10 },
        { label: "Reason", seconds: 15 },
        { label: "Example", seconds: 25 },
        { label: "Point", seconds: 10 },
      ],
    },
    {
      id: "nupp",
      name: "NUPP",
      fullName: "Situation – Challenge – Possibility – Reminder",
      phases: [
        { label: "Situation", seconds: 15 },
        { label: "Challenge", seconds: 15 },
        { label: "Possibility", seconds: 20 },
        { label: "Reminder", seconds: 10 },
      ],
    },
    {
      id: "treklang",
      name: "Triad",
      fullName: "What is it? – What does it remind you of? – What do you think?",
      phases: [
        { label: "What is it?", seconds: 20 },
        { label: "What does it remind you of?", seconds: 20 },
        { label: "What do you think?", seconds: 20 },
      ],
    },
  ],
  de: [
    {
      id: "prep",
      name: "PREP",
      fullName: "Kernaussage – Begründung – Beispiel – Kernaussage",
      phases: [
        { label: "Kernaussage", seconds: 10 },
        { label: "Begründung", seconds: 15 },
        { label: "Beispiel", seconds: 25 },
        { label: "Kernaussage", seconds: 10 },
      ],
    },
    {
      id: "nupp",
      name: "NUPP",
      fullName: "Lage – Herausforderung – Möglichkeit – Erinnerung",
      phases: [
        { label: "Lage", seconds: 15 },
        { label: "Herausforderung", seconds: 15 },
        { label: "Möglichkeit", seconds: 20 },
        { label: "Erinnerung", seconds: 10 },
      ],
    },
    {
      id: "treklang",
      name: "Triad",
      fullName: "Was ist das? – Woran erinnert es dich? – Was denkst du?",
      phases: [
        { label: "Was ist das?", seconds: 20 },
        { label: "Woran erinnert es dich?", seconds: 20 },
        { label: "Was denkst du?", seconds: 20 },
      ],
    },
  ],
  fr: [
    {
      id: "prep",
      name: "PREP",
      fullName: "Point – Raison – Exemple – Point",
      phases: [
        { label: "Point", seconds: 10 },
        { label: "Raison", seconds: 15 },
        { label: "Exemple", seconds: 25 },
        { label: "Point", seconds: 10 },
      ],
    },
    {
      id: "nupp",
      name: "NUPP",
      fullName: "Situation – Défi – Possibilité – Rappel",
      phases: [
        { label: "Situation", seconds: 15 },
        { label: "Défi", seconds: 15 },
        { label: "Possibilité", seconds: 20 },
        { label: "Rappel", seconds: 10 },
      ],
    },
    {
      id: "treklang",
      name: "Triad",
      fullName: "Qu'est-ce que c'est ? – À quoi ça te fait penser ? – Qu'en penses-tu ?",
      phases: [
        { label: "Qu'est-ce que c'est ?", seconds: 20 },
        { label: "À quoi ça te fait penser ?", seconds: 20 },
        { label: "Qu'en penses-tu ?", seconds: 20 },
      ],
    },
  ],
  es: [
    {
      id: "prep",
      name: "PREP",
      fullName: "Punto – Razón – Ejemplo – Punto",
      phases: [
        { label: "Punto", seconds: 10 },
        { label: "Razón", seconds: 15 },
        { label: "Ejemplo", seconds: 25 },
        { label: "Punto", seconds: 10 },
      ],
    },
    {
      id: "nupp",
      name: "NUPP",
      fullName: "Situación – Desafío – Posibilidad – Recordatorio",
      phases: [
        { label: "Situación", seconds: 15 },
        { label: "Desafío", seconds: 15 },
        { label: "Posibilidad", seconds: 20 },
        { label: "Recordatorio", seconds: 10 },
      ],
    },
    {
      id: "treklang",
      name: "Triad",
      fullName: "¿Qué es? – ¿Qué te recuerda? – ¿Qué piensas?",
      phases: [
        { label: "¿Qué es?", seconds: 20 },
        { label: "¿Qué te recuerda?", seconds: 20 },
        { label: "¿Qué piensas?", seconds: 20 },
      ],
    },
  ],
  sv: [
    {
      id: "prep",
      name: "PREP",
      fullName: "Punkt – Anledning – Exempel – Punkt",
      phases: [
        { label: "Punkt", seconds: 10 },
        { label: "Anledning", seconds: 15 },
        { label: "Exempel", seconds: 25 },
        { label: "Punkt", seconds: 10 },
      ],
    },
    {
      id: "nupp",
      name: "NUPP",
      fullName: "Nuläge – Utmaning – Possibilitet – Påminnelse",
      phases: [
        { label: "Nuläge", seconds: 15 },
        { label: "Utmaning", seconds: 15 },
        { label: "Possibilitet", seconds: 20 },
        { label: "Påminnelse", seconds: 10 },
      ],
    },
    {
      id: "treklang",
      name: "Treklangen",
      fullName: "Vad är det? – Vad påminner det om? – Vad tycker jag?",
      phases: [
        { label: "Vad är det?", seconds: 20 },
        { label: "Vad påminner det om?", seconds: 20 },
        { label: "Vad tycker jag?", seconds: 20 },
      ],
    },
  ],
};

export function modelsForLanguage(language: LanguageCode): StructureModel[] {
  return MODELS_BY_LANGUAGE[language];
}

export function randomStructureModel(language: LanguageCode): StructureModel {
  const models = MODELS_BY_LANGUAGE[language];
  return models[Math.floor(Math.random() * models.length)];
}

/** Which phase index is active at `elapsedSeconds` into the 60-second exercise. */
export function activePhaseIndex(model: StructureModel, elapsedSeconds: number): number {
  let cumulative = 0;
  for (let i = 0; i < model.phases.length; i++) {
    cumulative += model.phases[i].seconds;
    if (elapsedSeconds < cumulative) return i;
  }
  return model.phases.length - 1;
}
