import type { CaseProfession } from "@/lib/caseStudyContent";
import type { LanguageCode } from "@/lib/languages";

/**
 * The fictive company/organization/client the AI Tutor's Live News mode
 * applies news to, so a student's answers stay consistent across sessions
 * ("how would this affect XYZ's strategy" only works if XYZ is the same
 * company every time). One profile per profession, since a law client and
 * a political coalition need different defaults than a business.
 */
export interface TutorProfile {
  name: string;
  description: string;
  size: string;
  market: string;
  goals: string;
}

const STORAGE_PREFIX = "tutorProfile:";

type Defaults = Record<CaseProfession, TutorProfile>;

/** Starting profiles shown until the student edits their own, per app language. */
const DEFAULT_PROFILES: Record<LanguageCode, Defaults> = {
  en: {
    business: {
      name: "XYZ Corp",
      description: "A mid-sized B2B software company",
      size: "~500 employees, $80M annual revenue",
      market: "North America and Western Europe",
      goals: "Grow the enterprise segment and improve gross margin",
    },
    law: {
      name: "Meridian Holdings",
      description: "A privately held manufacturing group, client of XYZ & Partners",
      size: "~1,200 employees across three subsidiaries",
      market: "United States, with growing exposure in the EU",
      goals: "Manage regulatory risk while pursuing acquisitions",
    },
    politics: {
      name: "XYZ Coalition",
      description: "A regional political coalition/advocacy organization",
      size: "Represents a mid-sized metropolitan constituency",
      market: "State-level politics",
      goals: "Build legislative support for its policy platform",
    },
  },
  de: {
    business: {
      name: "XYZ GmbH",
      description: "Ein mittelgroßes B2B-Softwareunternehmen",
      size: "ca. 500 Mitarbeitende, 80 Mio. € Jahresumsatz",
      market: "DACH-Region und Westeuropa",
      goals: "Das Großkundengeschäft ausbauen und die Bruttomarge verbessern",
    },
    law: {
      name: "Meridian Holding",
      description: "Eine private Industriegruppe, Mandantin von XYZ & Partner",
      size: "ca. 1.200 Mitarbeitende in drei Tochtergesellschaften",
      market: "Deutschland, mit wachsender Präsenz in der EU",
      goals: "Regulatorische Risiken steuern und gleichzeitig Übernahmen verfolgen",
    },
    politics: {
      name: "XYZ-Bündnis",
      description: "Ein regionales politisches Bündnis / eine Interessenvertretung",
      size: "Vertritt einen mittelgroßen städtischen Wahlkreis",
      market: "Landespolitik",
      goals: "Parlamentarische Unterstützung für das eigene Programm gewinnen",
    },
  },
  fr: {
    business: {
      name: "XYZ SA",
      description: "Un éditeur de logiciels B2B de taille moyenne",
      size: "~500 salariés, 80 M€ de chiffre d'affaires annuel",
      market: "France et Europe de l'Ouest",
      goals: "Développer le segment grands comptes et améliorer la marge brute",
    },
    law: {
      name: "Meridian Holding",
      description: "Un groupe industriel privé, client du cabinet XYZ & Associés",
      size: "~1 200 salariés répartis dans trois filiales",
      market: "France, avec une présence croissante dans l'UE",
      goals: "Maîtriser le risque réglementaire tout en menant des acquisitions",
    },
    politics: {
      name: "Coalition XYZ",
      description: "Une coalition politique / organisation de plaidoyer régionale",
      size: "Représente une circonscription urbaine de taille moyenne",
      market: "Politique régionale",
      goals: "Obtenir un soutien parlementaire pour son programme",
    },
  },
  es: {
    business: {
      name: "XYZ S.A.",
      description: "Una empresa mediana de software B2B",
      size: "~500 empleados, 80 M€ de facturación anual",
      market: "España y Latinoamérica",
      goals: "Crecer en el segmento de grandes cuentas y mejorar el margen bruto",
    },
    law: {
      name: "Meridian Holding",
      description: "Un grupo industrial privado, cliente de XYZ & Asociados",
      size: "~1.200 empleados en tres filiales",
      market: "España, con creciente presencia en la UE",
      goals: "Gestionar el riesgo regulatorio mientras busca adquisiciones",
    },
    politics: {
      name: "Coalición XYZ",
      description: "Una coalición política / organización de incidencia regional",
      size: "Representa a una circunscripción urbana de tamaño medio",
      market: "Política autonómica",
      goals: "Conseguir apoyo parlamentario para su programa",
    },
  },
  sv: {
    business: {
      name: "XYZ AB",
      description: "Ett medelstort B2B-mjukvaruföretag",
      size: "~500 anställda, 800 Mkr i årlig omsättning",
      market: "Norden och Västeuropa",
      goals: "Växa inom storkundssegmentet och förbättra bruttomarginalen",
    },
    law: {
      name: "Meridian Holding",
      description: "En privatägd industrikoncern, klient till XYZ Advokatbyrå",
      size: "~1 200 anställda i tre dotterbolag",
      market: "Sverige, med växande närvaro i EU",
      goals: "Hantera regulatoriska risker samtidigt som man gör förvärv",
    },
    politics: {
      name: "XYZ-koalitionen",
      description: "En regional politisk koalition/intresseorganisation",
      size: "Representerar en medelstor storstadsvalkrets",
      market: "Regionpolitik",
      goals: "Bygga stöd i fullmäktige för sitt politiska program",
    },
  },
};

function storageKey(profession: CaseProfession): string {
  return `${STORAGE_PREFIX}${profession}`;
}

/** Per-browser, per-profession — no backend/account needed, same convention as caseStudyProgress.ts. */
export function loadTutorProfile(profession: CaseProfession, language: LanguageCode = "en"): TutorProfile {
  const defaults = DEFAULT_PROFILES[language][profession];
  if (typeof window === "undefined") return defaults;
  try {
    const raw = window.localStorage.getItem(storageKey(profession));
    if (!raw) return defaults;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object"
      ? { ...defaults, ...parsed }
      : defaults;
  } catch {
    return defaults;
  }
}

export function saveTutorProfile(profession: CaseProfession, profile: TutorProfile): void {
  try {
    window.localStorage.setItem(storageKey(profession), JSON.stringify(profile));
  } catch {
    // Private browsing / storage quota — edits just won't persist this session.
  }
}
