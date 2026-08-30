import type { LanguageCode } from "@/lib/languages";

export interface NavLink {
  href: string;
  labels: Record<LanguageCode, string>;
}

export const NAV_LINKS: NavLink[] = [
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
    href: "/stage",
    labels: {
      en: "Virtual Stage",
      de: "Virtuelle Bühne",
      fr: "Scène virtuelle",
      es: "Escenario virtual",
      sv: "Virtuell scen",
    },
  },
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
    href: "/improv",
    labels: {
      en: "60s Improv",
      de: "60-Sek-Impro",
      fr: "Impro de 60 s",
      es: "Impro de 60 s",
      sv: "60s Improv",
    },
  },
  {
    href: "/emphasis",
    labels: {
      en: "Contrastive Stress",
      de: "Kontrastive Betonung",
      fr: "Accent contrastif",
      es: "Acento contrastivo",
      sv: "Kontrastiv betoning",
    },
  },
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
  {
    href: "/collocations",
    labels: {
      en: "Executive Phrasing",
      de: "Gehobene Ausdrucksweise",
      fr: "Expression exécutive",
      es: "Expresión ejecutiva",
      sv: "Executive-uttryck",
    },
  },
];
