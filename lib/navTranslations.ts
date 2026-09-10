import type { LanguageCode } from "@/lib/languages";

export interface NavLink {
  href: string;
  labels: Record<LanguageCode, string>;
}

export interface NavGroup {
  label: Record<LanguageCode, string>;
  links: NavLink[];
}

/**
 * The nav is grouped by what each feature actually trains, not listed flat —
 * see the app-structure review this grouping came out of. Four groups:
 *
 * - Delivery practice: free-form speaking, graded on pace/filler words/
 *   delivery (or spontaneous fluency under a time limit for Improv).
 * - Micro-drills: short, targeted single-utterance exercises, each
 *   isolating one specific verbal skill (pronunciation, stress, phrasing).
 * - Receptive skills: the only features about *taking in* language quickly
 *   (reading/listening) rather than producing it.
 * - Professional practice: domain case work (Business/Law/Politics) —
 *   AI Tutor now also covers the old Case Studies flow directly (its Teach
 *   step has a "skip the lesson, practice a case now" shortcut), so that's
 *   no longer a separate top-level item.
 */
export const NAV_GROUPS: NavGroup[] = [
  {
    label: {
      en: "Delivery Practice",
      de: "Sprechtraining",
      fr: "Entraînement à l'expression orale",
      es: "Práctica de expresión oral",
      sv: "Talträning",
    },
    links: [
      {
        href: "/",
        labels: {
          en: "Record & Analyze",
          de: "Aufnehmen & Analysieren",
          fr: "Enregistrer et analyser",
          es: "Grabar y analizar",
          sv: "Spela in & analysera",
        },
      },
      {
        href: "/improv",
        labels: {
          en: "60s Improv",
          de: "60-Sek-Impro",
          fr: "Impro de 60 s",
          es: "Impro de 60 s",
          sv: "60 sek improv",
        },
      },
    ],
  },
  {
    label: {
      en: "Micro-Drills",
      de: "Mikroübungen",
      fr: "Micro-exercices",
      es: "Micro-ejercicios",
      sv: "Mikroövningar",
    },
    links: [
      {
        href: "/pronunciation",
        labels: {
          en: "Pronunciation",
          de: "Aussprache",
          fr: "Prononciation",
          es: "Pronunciación",
          sv: "Uttal",
        },
      },
      {
        href: "/emphasis",
        labels: {
          en: "Contrastive Stress",
          de: "Kontrastive Betonung",
          fr: "Accentuation contrastive",
          es: "Énfasis contrastivo",
          sv: "Kontrastiv betoning",
        },
      },
      {
        href: "/collocations",
        labels: {
          en: "Elite Phrasing",
          de: "Elite-Ausdrucksweise",
          fr: "Expression d'élite",
          es: "Expresión de élite",
          sv: "Elituttryck",
        },
      },
    ],
  },
  {
    label: {
      en: "Receptive Skills",
      de: "Rezeptive Fähigkeiten",
      fr: "Compétences réceptives",
      es: "Habilidades receptivas",
      sv: "Receptiv förmåga",
    },
    links: [
      {
        href: "/speed-reading",
        labels: {
          en: "Speed Reading",
          de: "Schnelllesen",
          fr: "Lecture rapide",
          es: "Lectura rápida",
          sv: "Snabbläsning",
        },
      },
      {
        href: "/comprehension",
        labels: {
          en: "Listening & Summary",
          de: "Hören & Zusammenfassen",
          fr: "Écoute et résumé",
          es: "Escucha y resumen",
          sv: "Lyssna & sammanfatta",
        },
      },
    ],
  },
  {
    label: {
      en: "Professional Practice",
      de: "Berufliche Praxis",
      fr: "Pratique professionnelle",
      es: "Práctica profesional",
      sv: "Professionell träning",
    },
    links: [
      {
        href: "/ai-tutor",
        labels: {
          en: "AI Tutor",
          de: "KI-Tutor",
          fr: "Tuteur IA",
          es: "Tutor de IA",
          sv: "AI-handledare",
        },
      },
    ],
  },
];

/** Flat view of every link, for code that just needs to check/list all routes (not grouped display). */
export const NAV_LINKS: NavLink[] = NAV_GROUPS.flatMap((group) => group.links);
