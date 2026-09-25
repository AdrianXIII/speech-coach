import type { LanguageCode } from "@/lib/languages";

export interface NavLink {
  href: string;
  icon: string;
  labels: Record<LanguageCode, string>;
  /** One short sentence, shown on the landing page's "what do you want to practice?" cards — not used by the nav itself. */
  descriptions: Record<LanguageCode, string>;
}

export interface NavGroup {
  label: Record<LanguageCode, string>;
  links: NavLink[];
}

/**
 * The nav is grouped by what each feature actually trains, not listed flat —
 * see the app-structure review this grouping came out of. Four groups:
 *
 * - Presentation Skills: free-form speaking, graded on pace/filler words/
 *   delivery (or spontaneous fluency under a time limit for Improv).
 * - Micro-drills: short, targeted single-utterance exercises, each
 *   isolating one specific verbal skill (pronunciation, stress, phrasing).
 * - Receptive skills: the only features about *taking in* language quickly
 *   (reading/listening) rather than producing it.
 * - Professional practice: domain case work (Business/Law/Politics) —
 *   AI Tutor now also covers the old Case Studies flow directly (its Teach
 *   step has a "skip the lesson, practice a case now" shortcut), so that's
 *   no longer a separate top-level item.
 *
 * The same grouping also drives the landing page's "what do you want to
 * practice today?" chooser (see app/page.tsx) — icon/descriptions exist for
 * that, the nav itself only reads labels/href.
 */
export const NAV_GROUPS: NavGroup[] = [
  {
    label: {
      en: "Presentation Skills",
      de: "Präsentationsfähigkeiten",
      fr: "Compétences de présentation",
      es: "Habilidades de presentación",
      sv: "Presentationsfärdigheter",
    },
    links: [
      {
        href: "/record",
        icon: "🎙️",
        labels: {
          en: "Record & Analyze",
          de: "Aufnehmen & Analysieren",
          fr: "Enregistrer et analyser",
          es: "Grabar y analizar",
          sv: "Spela in & analysera",
        },
        descriptions: {
          en: "Record a short speech and get feedback on pace, filler words, and delivery.",
          de: "Nimm eine kurze Rede auf und erhalte Feedback zu Tempo, Füllwörtern und Vortrag.",
          fr: "Enregistrez un court discours et recevez des retours sur le rythme et l'élocution.",
          es: "Graba un discurso breve y recibe comentarios sobre ritmo y muletillas.",
          sv: "Spela in ett kort tal och få feedback på tempo, utfyllnadsord och framförande.",
        },
      },
      {
        href: "/improv",
        icon: "⏱️",
        labels: {
          en: "60s Improv",
          de: "60-Sek-Impro",
          fr: "Impro de 60 s",
          es: "Impro de 60 s",
          sv: "60 sek improv",
        },
        descriptions: {
          en: "Speak on a surprise topic for 60 seconds — build fluency under pressure.",
          de: "Sprich 60 Sekunden zu einem Überraschungsthema — Sprachgewandtheit unter Druck.",
          fr: "Parlez 60 secondes sur un sujet surprise — l'aisance sous pression.",
          es: "Habla 60 segundos sobre un tema sorpresa — fluidez bajo presión.",
          sv: "Prata 60 sekunder om ett överraskningsämne — flyt under press.",
        },
      },
      {
        href: "/executive-communication",
        icon: "🧭",
        labels: {
          en: "Executive Communication",
          de: "Executive-Kommunikation",
          fr: "Communication de direction",
          es: "Comunicación ejecutiva",
          sv: "Ledningskommunikation",
        },
        descriptions: {
          en: "Practice explaining your impact, summarizing complex work in 30 seconds, and making your point heard in meetings — graded on structure, not delivery.",
          de: "Übe, deinen Beitrag zu erklären, komplexe Arbeit in 30 Sekunden zusammenzufassen und dich in Meetings durchzusetzen — bewertet nach Struktur, nicht Vortragsweise.",
          fr: "Entraînez-vous à expliquer votre impact, résumer un sujet complexe en 30 secondes et vous faire entendre en réunion — évalué sur la structure, pas l'élocution.",
          es: "Practica explicar tu impacto, resumir un tema complejo en 30 segundos y hacerte escuchar en reuniones — evaluado por estructura, no por elocución.",
          sv: "Öva på att förklara din påverkan, sammanfatta komplext arbete på 30 sekunder och göra dig hörd i möten — bedöms på struktur, inte framförande.",
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
        icon: "🗣️",
        labels: {
          en: "Pronunciation",
          de: "Aussprache",
          fr: "Prononciation",
          es: "Pronunciación",
          sv: "Uttal",
        },
        descriptions: {
          en: "Practice a single tricky word and get AI feedback on your pronunciation.",
          de: "Übe ein einzelnes schwieriges Wort und erhalte KI-Feedback zur Aussprache.",
          fr: "Entraînez-vous sur un mot difficile et recevez un retour de l'IA.",
          es: "Practica una palabra difícil y recibe retroalimentación de la IA.",
          sv: "Öva på ett svårt ord och få AI-feedback på ditt uttal.",
        },
      },
      {
        href: "/emphasis",
        icon: "🎯",
        labels: {
          en: "Contrastive Stress",
          de: "Kontrastive Betonung",
          fr: "Accentuation contrastive",
          es: "Énfasis contrastivo",
          sv: "Kontrastiv betoning",
        },
        descriptions: {
          en: "Learn to stress the right word in a sentence to change its meaning.",
          de: "Lerne, das richtige Wort im Satz zu betonen, um die Bedeutung zu verändern.",
          fr: "Apprenez à accentuer le bon mot dans une phrase pour changer son sens.",
          es: "Aprende a acentuar la palabra correcta para cambiar el significado.",
          sv: "Lär dig betona rätt ord i en mening för att ändra dess betydelse.",
        },
      },
      {
        href: "/collocations",
        icon: "💬",
        labels: {
          en: "Elite Phrasing",
          de: "Elite-Ausdrucksweise",
          fr: "Expression d'élite",
          es: "Expresión de élite",
          sv: "Elituttryck",
        },
        descriptions: {
          en: "Elevate your professional language with the refined word combinations polished speakers reach for.",
          de: "Werte deine berufliche Ausdrucksweise mit den feinen Wortkombinationen versierter Sprecher auf.",
          fr: "Élevez votre langage professionnel grâce aux combinaisons raffinées des orateurs aguerris.",
          es: "Eleva tu lenguaje profesional con las combinaciones refinadas que usan los oradores expertos.",
          sv: "Höj din professionella språknivå med de förfinade ordkombinationer skickliga talare använder.",
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
        icon: "📖",
        labels: {
          en: "Speed Reading",
          de: "Schnelllesen",
          fr: "Lecture rapide",
          es: "Lectura rápida",
          sv: "Snabbläsning",
        },
        descriptions: {
          en: "Read passages faster while keeping full comprehension.",
          de: "Lies Texte schneller und behalte das volle Verständnis.",
          fr: "Lisez des textes plus vite tout en gardant une pleine compréhension.",
          es: "Lee textos más rápido sin perder la comprensión.",
          sv: "Läs texter snabbare och behåll full förståelse.",
        },
      },
      {
        href: "/comprehension",
        icon: "🎧",
        labels: {
          en: "Listening & Summary",
          de: "Hören & Zusammenfassen",
          fr: "Écoute et résumé",
          es: "Escucha y resumen",
          sv: "Lyssna & sammanfatta",
        },
        descriptions: {
          en: "Listen to a real news passage, then summarize it out loud from memory.",
          de: "Höre einen echten Nachrichtentext und fasse ihn dann frei zusammen.",
          fr: "Écoutez un vrai article, puis résumez-le à voix haute de mémoire.",
          es: "Escucha una noticia real y resúmela en voz alta de memoria.",
          sv: "Lyssna på en riktig nyhetstext och sammanfatta den sedan utantill.",
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
        icon: "🎓",
        labels: {
          en: "AI Tutor",
          de: "KI-Tutor",
          fr: "Tuteur IA",
          es: "Tutor de IA",
          sv: "AI-handledare",
        },
        descriptions: {
          en: "Sharpen your domain knowledge, then have the AI tutor put it to the test with real Business, Law, or Politics cases.",
          de: "Vertiefe dein Fachwissen und lass es dich vom KI-Tutor mit echten Fällen aus Wirtschaft, Recht oder Politik auf die Probe stellen.",
          fr: "Approfondissez vos connaissances, puis laissez le tuteur IA les mettre à l'épreuve avec de vrais cas d'affaires, de droit ou de politique.",
          es: "Perfecciona tus conocimientos y deja que el tutor de IA los ponga a prueba con casos reales de negocios, derecho o política.",
          sv: "Fördjupa dina kunskaper och låt AI-handledaren sätta dem på prov med verkliga fall inom ekonomi, juridik eller politik.",
        },
      },
    ],
  },
];

/** Flat view of every link, for code that just needs to check/list all routes (not grouped display). */
export const NAV_LINKS: NavLink[] = NAV_GROUPS.flatMap((group) => group.links);

/** Copy for the landing page's "what do you want to practice today?" chooser. */
export const LANDING_COPY: Record<LanguageCode, { title: string; subtitle: string }> = {
  en: {
    title: "What do you want to practice today?",
    subtitle: "Pick a skill below — each session takes just a few minutes.",
  },
  de: {
    title: "Was möchtest du heute üben?",
    subtitle: "Wähle unten eine Fähigkeit — jede Übung dauert nur wenige Minuten.",
  },
  fr: {
    title: "Que voulez-vous pratiquer aujourd'hui ?",
    subtitle: "Choisissez une compétence ci-dessous — chaque séance ne prend que quelques minutes.",
  },
  es: {
    title: "¿Qué quieres practicar hoy?",
    subtitle: "Elige una habilidad abajo — cada sesión dura solo unos minutos.",
  },
  sv: {
    title: "Vad vill du träna på idag?",
    subtitle: "Välj en färdighet nedan — varje övning tar bara några minuter.",
  },
};
