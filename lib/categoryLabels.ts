import type { LanguageCode } from "@/lib/languages";

/**
 * Display translations for the 28 category names — the underlying English
 * strings stay the canonical keys everywhere else (CASE_CATEGORIES, content
 * keys in tutorTeachingContent.ts, etc.) so nothing about data lookups
 * changes; this is purely what's shown/spoken to the user. English is a
 * pass-through (identity) rather than a duplicated entry.
 */
const CATEGORY_LABELS: Record<string, Partial<Record<LanguageCode, string>>> = {
  // Business
  Strategy: { de: "Strategie", fr: "Stratégie", es: "Estrategia", sv: "Strategi" },
  Finance: { de: "Finanzen", fr: "Finance", es: "Finanzas", sv: "Finans" },
  Marketing: { de: "Marketing", fr: "Marketing", es: "Marketing", sv: "Marknadsföring" },
  Operations: { de: "Operations", fr: "Opérations", es: "Operaciones", sv: "Operations" },
  "Leadership & HR": {
    de: "Führung & Personalwesen",
    fr: "Leadership et RH",
    es: "Liderazgo y RR. HH.",
    sv: "Ledarskap & HR",
  },
  "Crisis Management": {
    de: "Krisenmanagement",
    fr: "Gestion de crise",
    es: "Gestión de crisis",
    sv: "Krishantering",
  },
  "Mergers & Acquisitions": {
    de: "Fusionen und Übernahmen",
    fr: "Fusions et acquisitions",
    es: "Fusiones y adquisiciones",
    sv: "Fusioner och förvärv",
  },
  "Entrepreneurship & Startups": {
    de: "Unternehmertum & Startups",
    fr: "Entrepreneuriat et startups",
    es: "Emprendimiento y startups",
    sv: "Entreprenörskap & startups",
  },
  "Sales & Business Development": {
    de: "Vertrieb & Geschäftsentwicklung",
    fr: "Ventes et développement commercial",
    es: "Ventas y desarrollo de negocio",
    sv: "Försäljning & affärsutveckling",
  },
  "Supply Chain & Logistics": {
    de: "Lieferkette & Logistik",
    fr: "Chaîne d'approvisionnement et logistique",
    es: "Cadena de suministro y logística",
    sv: "Försörjningskedja & logistik",
  },
  "IT & Technology Management": {
    de: "IT- & Technologiemanagement",
    fr: "Gestion IT et technologie",
    es: "Gestión de TI y tecnología",
    sv: "IT- & teknikledning",
  },
  "Manufacturing & Production": {
    de: "Fertigung & Produktion",
    fr: "Fabrication et production",
    es: "Fabricación y producción",
    sv: "Tillverkning & produktion",
  },
  "Product Management & Innovation": {
    de: "Produktmanagement & Innovation",
    fr: "Gestion produit et innovation",
    es: "Gestión de producto e innovación",
    sv: "Produktledning & innovation",
  },
  "Customer Experience": {
    de: "Kundenerlebnis",
    fr: "Expérience client",
    es: "Experiencia del cliente",
    sv: "Kundupplevelse",
  },
  "HR & Talent Management": {
    de: "Personalwesen & Talentmanagement",
    fr: "RH et gestion des talents",
    es: "RR. HH. y gestión del talento",
    sv: "HR & talangledning",
  },
  "International & Global Business": {
    de: "Internationales & globales Geschäft",
    fr: "Commerce international et mondial",
    es: "Negocios internacionales y globales",
    sv: "Internationell & global affärsverksamhet",
  },
  "Corporate Governance & Risk": {
    de: "Unternehmensführung & Risiko",
    fr: "Gouvernance d'entreprise et risque",
    es: "Gobierno corporativo y riesgo",
    sv: "Bolagsstyrning & risk",
  },
  "Retail & E-commerce": {
    de: "Einzelhandel & E-Commerce",
    fr: "Commerce de détail et e-commerce",
    es: "Comercio minorista y comercio electrónico",
    sv: "Detaljhandel & e-handel",
  },
  // Law
  "Contract Law": { de: "Vertragsrecht", fr: "Droit des contrats", es: "Derecho contractual", sv: "Avtalsrätt" },
  "Corporate & Compliance": {
    de: "Gesellschaftsrecht & Compliance",
    fr: "Droit des sociétés et conformité",
    es: "Derecho societario y cumplimiento",
    sv: "Bolagsrätt & regelefterlevnad",
  },
  "Civil Litigation": {
    de: "Zivilprozessrecht",
    fr: "Contentieux civil",
    es: "Litigios civiles",
    sv: "Civilprocessrätt",
  },
  "Criminal Law": { de: "Strafrecht", fr: "Droit pénal", es: "Derecho penal", sv: "Straffrätt" },
  "Constitutional & Regulatory": {
    de: "Verfassungs- & Verwaltungsrecht",
    fr: "Droit constitutionnel et réglementaire",
    es: "Derecho constitucional y regulatorio",
    sv: "Konstitutionell rätt & reglering",
  },
  // Politics
  "Foreign Policy & Diplomacy": {
    de: "Außenpolitik & Diplomatie",
    fr: "Politique étrangère et diplomatie",
    es: "Política exterior y diplomacia",
    sv: "Utrikespolitik & diplomati",
  },
  "Domestic Policy": {
    de: "Innenpolitik",
    fr: "Politique intérieure",
    es: "Política interior",
    sv: "Inrikespolitik",
  },
  "Crisis Response": {
    de: "Krisenreaktion",
    fr: "Réponse aux crises",
    es: "Respuesta a crisis",
    sv: "Krisrespons",
  },
  "Campaign Strategy": {
    de: "Wahlkampfstrategie",
    fr: "Stratégie de campagne",
    es: "Estrategia de campaña",
    sv: "Kampanjstrategi",
  },
  "Legislative Negotiation": {
    de: "Gesetzgebungsverhandlung",
    fr: "Négociation législative",
    es: "Negociación legislativa",
    sv: "Lagstiftningsförhandling",
  },
};

/** Returns the display label for a category in the given language, falling back to the canonical English name. */
export function categoryLabel(category: string, language: LanguageCode): string {
  return CATEGORY_LABELS[category]?.[language] ?? category;
}

/** All display labels for a list of categories in the given language — useful for voice matching against what's actually spoken. */
export function categoryLabels(categories: string[], language: LanguageCode): string[] {
  return categories.map((c) => categoryLabel(c, language));
}
