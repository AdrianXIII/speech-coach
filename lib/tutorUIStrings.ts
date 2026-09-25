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

type Entity = { business: string; law: string; politics: string };

/**
 * Every on-screen string in the AI Tutor flow (components/AITutor.tsx and
 * its shared pickers / profile editor). Separate from `tutorStrings`
 * above, which holds the handful of prompts that are also spoken aloud.
 */
export interface TutorUI {
  chooseProfession: string;
  chooseCategory: string;
  changeProfession: string;
  fundamentalsMastered: (mastered: number, total: number) => string;
  cases: (n: number) => string;
  browserUnsupported: string;
  answerByVoice: string;
  listening: string;
  didntCatchProfession: string;
  didntCatchCategory: string;
  didntCatchTeachNav: string;
  didntCatchHandoff: string;
  teachNavPrompt: string;
  handoffPrompt: string;
  changeCategoryLink: string;
  changeCategory: string;
  preparingLesson: string;
  coreKnowledgeFor: (category: string) => string;
  noTeachingYet: string;
  noFundamentals: string;
  strongAnswerLooksLike: string;
  skipLesson: string;
  overview: string;
  puttingTogether: string;
  whyItMatters: string;
  example: string;
  sourcesPdf: string;
  back: string;
  repeat: string;
  next: string;
  flagOpen: string;
  flagThanks: string;
  flagReasons: { inaccurate: string; shallow: string; other: string };
  flagNotePlaceholder: string;
  cancel: string;
  submit: string;
  sessionType: string;
  standardCase: string;
  standardCaseDesc: string;
  liveNews: string;
  liveNewsDesc: (entity: string) => string;
  edit: string;
  findingNews: string;
  startChallenge: string;
  newsUnavailable: string;
  useStandardInstead: string;
  preparingChallenge: string;
  connection: string;
  thinkThenRecord: string;
  differentChallenge: string;
  recording: string;
  evaluating: string;
  summary: string;
  knowledge: string;
  covered: string;
  missed: string;
  corrections: string;
  terminology: string;
  wordChoice: string;
  grammar: string;
  pronunciation: string;
  practiceNext: string;
  whatYouSaid: string;
  noSpeech: string;
  tryAnother: string;
  entity: Entity;
  yourFictive: (entity: string) => string;
  profileFields: { name: string; description: string; size: string; market: string; goals: string };
  profilePlaceholders: { name: string; description: string; size: string; market: string; goals: string };
  save: string;
}

const UI: Record<LanguageCode, TutorUI> = {
  en: {
    chooseProfession: "Choose a profession",
    chooseCategory: "choose a category",
    changeProfession: "← Change profession",
    fundamentalsMastered: (m, n) => `${m}/${n} fundamentals mastered`,
    cases: (n) => `${n} case${n === 1 ? "" : "s"}`,
    browserUnsupported: "Your browser doesn’t support speech recognition — try Chrome or Edge to use this exercise.",
    answerByVoice: "🎤 Answer by voice",
    listening: "Listening…",
    didntCatchProfession: "Didn't catch that — try naming a profession, or tap one below.",
    didntCatchCategory: "Didn't catch that — try naming the category, or tap one below.",
    didntCatchTeachNav: 'Didn\'t catch that — say "next" or "repeat", or tap a button below.',
    didntCatchHandoff: 'Didn\'t catch that — say "standard" or "news", or tap a button below.',
    teachNavPrompt: 'Say "next", "repeat", or "back".',
    handoffPrompt: 'Say "standard" or "news".',
    changeCategoryLink: "← Change category",
    changeCategory: "Change category",
    preparingLesson: "Preparing your lesson…",
    coreKnowledgeFor: (c) => `Core knowledge for ${c}`,
    noTeachingYet: "Deep-dive teaching content for this category hasn’t been generated yet — here’s the fundamentals checklist in the meantime.",
    noFundamentals: "No fundamentals catalogued yet for this category — you’ll still be graded against the challenge’s own key issues.",
    strongAnswerLooksLike: "What a strong answer looks like: ",
    skipLesson: "Skip the lesson — practice a case now →",
    overview: "Overview",
    puttingTogether: "Putting it together",
    whyItMatters: "Why it matters: ",
    example: "Example: ",
    sourcesPdf: "Sources (PDF) →",
    back: "← Back",
    repeat: "🔁 Repeat",
    next: "Next →",
    flagOpen: "🚩 This seems wrong or shallow",
    flagThanks: "Thanks — flagged for review.",
    flagReasons: { inaccurate: "inaccurate", shallow: "shallow", other: "other" },
    flagNotePlaceholder: "Optional note — what's wrong?",
    cancel: "Cancel",
    submit: "Submit",
    sessionType: "Session type",
    standardCase: "Standard case",
    standardCaseDesc: "A realistic case drawn from this category.",
    liveNews: "Live news",
    liveNewsDesc: (e) => `A real, current news story applied to your fictive ${e}.`,
    edit: "Edit",
    findingNews: "Finding a news story…",
    startChallenge: "Start challenge",
    newsUnavailable: "There are no suitable news stories for this area right now. Try again in a while, or continue with a standard case.",
    useStandardInstead: "Use a standard case instead",
    preparingChallenge: "Preparing your challenge…",
    connection: "Connection: ",
    thinkThenRecord: "Think it through, then record your answer out loud.",
    differentChallenge: "🎲 Different challenge",
    recording: "Recording…",
    evaluating: "Evaluating your answer…",
    summary: "Summary",
    knowledge: "Knowledge",
    covered: "Covered",
    missed: "Missed",
    corrections: "Corrections",
    terminology: "Terminology",
    wordChoice: "Word choice",
    grammar: "Grammar & clarity",
    pronunciation: "Pronunciation",
    practiceNext: "Practice next",
    whatYouSaid: "What you said",
    noSpeech: "(no speech detected)",
    tryAnother: "🎲 Try another challenge",
    entity: { business: "company", law: "client organization", politics: "organization" },
    yourFictive: (e) => `Your fictive ${e}`,
    profileFields: { name: "Name", description: "Description", size: "Size", market: "Market", goals: "Goals" },
    profilePlaceholders: {
      name: "e.g. XYZ Corp",
      description: "e.g. A mid-sized B2B software company",
      size: "e.g. ~500 employees, $80M revenue",
      market: "e.g. North America and Western Europe",
      goals: "e.g. Grow the enterprise segment",
    },
    save: "Save",
  },
  de: {
    chooseProfession: "Wähle ein Berufsfeld",
    chooseCategory: "wähle eine Kategorie",
    changeProfession: "← Berufsfeld wechseln",
    fundamentalsMastered: (m, n) => `${m}/${n} Grundlagen beherrscht`,
    cases: (n) => `${n} ${n === 1 ? "Fall" : "Fälle"}`,
    browserUnsupported: "Dein Browser unterstützt keine Spracherkennung — nutze Chrome oder Edge für diese Übung.",
    answerByVoice: "🎤 Per Sprache antworten",
    listening: "Hört zu…",
    didntCatchProfession: "Nicht verstanden — nenne ein Berufsfeld oder tippe unten auf eins.",
    didntCatchCategory: "Nicht verstanden — nenne die Kategorie oder tippe unten auf eine.",
    didntCatchTeachNav: "Nicht verstanden — sag „weiter“ oder „nochmal“ oder tippe unten auf einen Button.",
    didntCatchHandoff: "Nicht verstanden — sag „Standard“ oder „Nachrichten“ oder tippe unten auf einen Button.",
    teachNavPrompt: "Sag „weiter“, „nochmal“ oder „zurück“.",
    handoffPrompt: "Sag „Standard“ oder „Nachrichten“.",
    changeCategoryLink: "← Kategorie wechseln",
    changeCategory: "Kategorie wechseln",
    preparingLesson: "Deine Lektion wird vorbereitet…",
    coreKnowledgeFor: (c) => `Kernwissen für ${c}`,
    noTeachingYet: "Vertiefende Lerninhalte für diese Kategorie gibt es noch nicht — hier ist vorerst die Grundlagen-Checkliste.",
    noFundamentals: "Für diese Kategorie sind noch keine Grundlagen erfasst — bewertet wirst du trotzdem anhand der Kernpunkte des Falls.",
    strongAnswerLooksLike: "So sieht eine starke Antwort aus: ",
    skipLesson: "Lektion überspringen — jetzt einen Fall üben →",
    overview: "Überblick",
    puttingTogether: "Alles zusammen",
    whyItMatters: "Warum es wichtig ist: ",
    example: "Beispiel: ",
    sourcesPdf: "Quellen (PDF) →",
    back: "← Zurück",
    repeat: "🔁 Wiederholen",
    next: "Weiter →",
    flagOpen: "🚩 Das wirkt falsch oder oberflächlich",
    flagThanks: "Danke — zur Prüfung markiert.",
    flagReasons: { inaccurate: "ungenau", shallow: "oberflächlich", other: "anderes" },
    flagNotePlaceholder: "Optionale Notiz — was stimmt nicht?",
    cancel: "Abbrechen",
    submit: "Senden",
    sessionType: "Art der Übung",
    standardCase: "Standardfall",
    standardCaseDesc: "Ein realistischer Fall aus dieser Kategorie.",
    liveNews: "Aktuelle Nachrichten",
    liveNewsDesc: (e) => `Eine echte, aktuelle Nachricht, angewendet auf deine fiktive ${e}.`,
    edit: "Bearbeiten",
    findingNews: "Nachricht wird gesucht…",
    startChallenge: "Aufgabe starten",
    newsUnavailable: "Für diesen Bereich gibt es gerade keine passenden Nachrichten. Versuch es später erneut oder mach mit einem Standardfall weiter.",
    useStandardInstead: "Stattdessen einen Standardfall nutzen",
    preparingChallenge: "Deine Aufgabe wird vorbereitet…",
    connection: "Zusammenhang: ",
    thinkThenRecord: "Denk kurz nach und nimm dann deine Antwort laut auf.",
    differentChallenge: "🎲 Andere Aufgabe",
    recording: "Aufnahme läuft…",
    evaluating: "Deine Antwort wird bewertet…",
    summary: "Zusammenfassung",
    knowledge: "Wissen",
    covered: "Abgedeckt",
    missed: "Gefehlt",
    corrections: "Korrekturen",
    terminology: "Fachbegriffe",
    wordChoice: "Wortwahl",
    grammar: "Grammatik & Klarheit",
    pronunciation: "Aussprache",
    practiceNext: "Als Nächstes üben",
    whatYouSaid: "Was du gesagt hast",
    noSpeech: "(keine Sprache erkannt)",
    tryAnother: "🎲 Weitere Aufgabe",
    entity: { business: "Firma", law: "Mandantenorganisation", politics: "Organisation" },
    yourFictive: (e) => `Deine fiktive ${e}`,
    profileFields: { name: "Name", description: "Beschreibung", size: "Größe", market: "Markt", goals: "Ziele" },
    profilePlaceholders: {
      name: "z. B. XYZ GmbH",
      description: "z. B. Ein mittelgroßes B2B-Softwareunternehmen",
      size: "z. B. ca. 500 Mitarbeitende, 80 Mio. € Umsatz",
      market: "z. B. DACH-Region und Westeuropa",
      goals: "z. B. Das Großkundengeschäft ausbauen",
    },
    save: "Speichern",
  },
  fr: {
    chooseProfession: "Choisissez un domaine",
    chooseCategory: "choisissez une catégorie",
    changeProfession: "← Changer de domaine",
    fundamentalsMastered: (m, n) => `${m}/${n} fondamentaux maîtrisés`,
    cases: (n) => `${n} cas`,
    browserUnsupported: "Votre navigateur ne prend pas en charge la reconnaissance vocale — utilisez Chrome ou Edge pour cet exercice.",
    answerByVoice: "🎤 Répondre à voix haute",
    listening: "Écoute…",
    didntCatchProfession: "Je n'ai pas compris — nommez un domaine ou touchez-en un ci-dessous.",
    didntCatchCategory: "Je n'ai pas compris — nommez la catégorie ou touchez-en une ci-dessous.",
    didntCatchTeachNav: "Je n'ai pas compris — dites « suivant » ou « répéter », ou touchez un bouton ci-dessous.",
    didntCatchHandoff: "Je n'ai pas compris — dites « standard » ou « actualités », ou touchez un bouton ci-dessous.",
    teachNavPrompt: "Dites « suivant », « répéter » ou « retour ».",
    handoffPrompt: "Dites « standard » ou « actualités ».",
    changeCategoryLink: "← Changer de catégorie",
    changeCategory: "Changer de catégorie",
    preparingLesson: "Préparation de votre leçon…",
    coreKnowledgeFor: (c) => `Connaissances clés : ${c}`,
    noTeachingYet: "Le contenu approfondi de cette catégorie n'a pas encore été généré — voici en attendant la liste des fondamentaux.",
    noFundamentals: "Aucun fondamental n'est encore répertorié pour cette catégorie — vous serez tout de même évalué sur les points clés du cas.",
    strongAnswerLooksLike: "À quoi ressemble une bonne réponse : ",
    skipLesson: "Passer la leçon — s'entraîner sur un cas →",
    overview: "Vue d'ensemble",
    puttingTogether: "Synthèse",
    whyItMatters: "Pourquoi c'est important : ",
    example: "Exemple : ",
    sourcesPdf: "Sources (PDF) →",
    back: "← Retour",
    repeat: "🔁 Répéter",
    next: "Suivant →",
    flagOpen: "🚩 Cela semble faux ou superficiel",
    flagThanks: "Merci — signalé pour vérification.",
    flagReasons: { inaccurate: "inexact", shallow: "superficiel", other: "autre" },
    flagNotePlaceholder: "Note facultative — qu'est-ce qui ne va pas ?",
    cancel: "Annuler",
    submit: "Envoyer",
    sessionType: "Type de séance",
    standardCase: "Cas standard",
    standardCaseDesc: "Un cas réaliste tiré de cette catégorie.",
    liveNews: "Actualité",
    liveNewsDesc: (e) => `Une vraie actualité récente appliquée à votre ${e} fictive.`,
    edit: "Modifier",
    findingNews: "Recherche d'une actualité…",
    startChallenge: "Commencer l'exercice",
    newsUnavailable: "Il n'y a pas d'actualité adaptée à ce domaine pour le moment. Réessayez plus tard ou continuez avec un cas standard.",
    useStandardInstead: "Utiliser un cas standard à la place",
    preparingChallenge: "Préparation de votre exercice…",
    connection: "Lien : ",
    thinkThenRecord: "Réfléchissez, puis enregistrez votre réponse à voix haute.",
    differentChallenge: "🎲 Un autre exercice",
    recording: "Enregistrement…",
    evaluating: "Évaluation de votre réponse…",
    summary: "Résumé",
    knowledge: "Connaissances",
    covered: "Abordé",
    missed: "Manqué",
    corrections: "Corrections",
    terminology: "Terminologie",
    wordChoice: "Choix des mots",
    grammar: "Grammaire et clarté",
    pronunciation: "Prononciation",
    practiceNext: "À travailler ensuite",
    whatYouSaid: "Ce que vous avez dit",
    noSpeech: "(aucune parole détectée)",
    tryAnother: "🎲 Un autre exercice",
    entity: { business: "entreprise", law: "organisation cliente", politics: "organisation" },
    yourFictive: (e) => `Votre ${e} fictive`,
    profileFields: { name: "Nom", description: "Description", size: "Taille", market: "Marché", goals: "Objectifs" },
    profilePlaceholders: {
      name: "ex. XYZ SA",
      description: "ex. Un éditeur de logiciels B2B de taille moyenne",
      size: "ex. ~500 salariés, 80 M€ de chiffre d'affaires",
      market: "ex. France et Europe de l'Ouest",
      goals: "ex. Développer le segment grands comptes",
    },
    save: "Enregistrer",
  },
  es: {
    chooseProfession: "Elige una profesión",
    chooseCategory: "elige una categoría",
    changeProfession: "← Cambiar de profesión",
    fundamentalsMastered: (m, n) => `${m}/${n} fundamentos dominados`,
    cases: (n) => `${n} ${n === 1 ? "caso" : "casos"}`,
    browserUnsupported: "Tu navegador no admite el reconocimiento de voz: usa Chrome o Edge para este ejercicio.",
    answerByVoice: "🎤 Responder por voz",
    listening: "Escuchando…",
    didntCatchProfession: "No te he entendido: di una profesión o toca una abajo.",
    didntCatchCategory: "No te he entendido: di la categoría o toca una abajo.",
    didntCatchTeachNav: "No te he entendido: di «siguiente» o «repetir», o toca un botón abajo.",
    didntCatchHandoff: "No te he entendido: di «estándar» o «noticias», o toca un botón abajo.",
    teachNavPrompt: "Di «siguiente», «repetir» o «atrás».",
    handoffPrompt: "Di «estándar» o «noticias».",
    changeCategoryLink: "← Cambiar de categoría",
    changeCategory: "Cambiar de categoría",
    preparingLesson: "Preparando tu lección…",
    coreKnowledgeFor: (c) => `Conocimientos clave de ${c}`,
    noTeachingYet: "Aún no se ha generado el contenido detallado de esta categoría; mientras tanto, aquí tienes la lista de fundamentos.",
    noFundamentals: "Aún no hay fundamentos catalogados para esta categoría; igualmente se te evaluará según los puntos clave del caso.",
    strongAnswerLooksLike: "Así es una respuesta sólida: ",
    skipLesson: "Saltar la lección: practicar un caso ahora →",
    overview: "Visión general",
    puttingTogether: "Todo junto",
    whyItMatters: "Por qué importa: ",
    example: "Ejemplo: ",
    sourcesPdf: "Fuentes (PDF) →",
    back: "← Atrás",
    repeat: "🔁 Repetir",
    next: "Siguiente →",
    flagOpen: "🚩 Esto parece incorrecto o superficial",
    flagThanks: "Gracias: marcado para revisión.",
    flagReasons: { inaccurate: "incorrecto", shallow: "superficial", other: "otro" },
    flagNotePlaceholder: "Nota opcional: ¿qué está mal?",
    cancel: "Cancelar",
    submit: "Enviar",
    sessionType: "Tipo de sesión",
    standardCase: "Caso estándar",
    standardCaseDesc: "Un caso realista de esta categoría.",
    liveNews: "Noticias actuales",
    liveNewsDesc: (e) => `Una noticia real y actual aplicada a tu ${e} ficticia.`,
    edit: "Editar",
    findingNews: "Buscando una noticia…",
    startChallenge: "Empezar el reto",
    newsUnavailable: "Ahora mismo no hay noticias adecuadas para esta área. Vuelve a intentarlo más tarde o continúa con un caso estándar.",
    useStandardInstead: "Usar un caso estándar",
    preparingChallenge: "Preparando tu reto…",
    connection: "Relación: ",
    thinkThenRecord: "Piénsalo y luego graba tu respuesta en voz alta.",
    differentChallenge: "🎲 Otro reto",
    recording: "Grabando…",
    evaluating: "Evaluando tu respuesta…",
    summary: "Resumen",
    knowledge: "Conocimientos",
    covered: "Cubierto",
    missed: "Omitido",
    corrections: "Correcciones",
    terminology: "Terminología",
    wordChoice: "Elección de palabras",
    grammar: "Gramática y claridad",
    pronunciation: "Pronunciación",
    practiceNext: "Practica a continuación",
    whatYouSaid: "Lo que dijiste",
    noSpeech: "(no se detectó voz)",
    tryAnother: "🎲 Probar otro reto",
    entity: { business: "empresa", law: "organización cliente", politics: "organización" },
    yourFictive: (e) => `Tu ${e} ficticia`,
    profileFields: { name: "Nombre", description: "Descripción", size: "Tamaño", market: "Mercado", goals: "Objetivos" },
    profilePlaceholders: {
      name: "p. ej. XYZ S.A.",
      description: "p. ej. Una empresa mediana de software B2B",
      size: "p. ej. ~500 empleados, 80 M€ de facturación",
      market: "p. ej. España y Latinoamérica",
      goals: "p. ej. Crecer en el segmento de grandes cuentas",
    },
    save: "Guardar",
  },
  sv: {
    chooseProfession: "Välj ett område",
    chooseCategory: "välj en kategori",
    changeProfession: "← Byt område",
    fundamentalsMastered: (m, n) => `${m}/${n} grunder behärskade`,
    cases: (n) => `${n} fall`,
    browserUnsupported: "Din webbläsare stöder inte taligenkänning — använd Chrome eller Edge för den här övningen.",
    answerByVoice: "🎤 Svara med rösten",
    listening: "Lyssnar…",
    didntCatchProfession: "Uppfattade inte — säg ett område eller tryck på ett nedan.",
    didntCatchCategory: "Uppfattade inte — säg kategorin eller tryck på en nedan.",
    didntCatchTeachNav: "Uppfattade inte — säg ”nästa” eller ”upprepa”, eller tryck på en knapp nedan.",
    didntCatchHandoff: "Uppfattade inte — säg ”standard” eller ”nyheter”, eller tryck på en knapp nedan.",
    teachNavPrompt: "Säg ”nästa”, ”upprepa” eller ”tillbaka”.",
    handoffPrompt: "Säg ”standard” eller ”nyheter”.",
    changeCategoryLink: "← Byt kategori",
    changeCategory: "Byt kategori",
    preparingLesson: "Förbereder din lektion…",
    coreKnowledgeFor: (c) => `Grundkunskaper i ${c}`,
    noTeachingYet: "Fördjupande lektionsinnehåll för den här kategorin finns inte än — här är grundchecklistan så länge.",
    noFundamentals: "Inga grunder är katalogiserade för den här kategorin än — du bedöms ändå mot fallets egna nyckelfrågor.",
    strongAnswerLooksLike: "Så ser ett starkt svar ut: ",
    skipLesson: "Hoppa över lektionen — öva på ett fall direkt →",
    overview: "Översikt",
    puttingTogether: "Sammanfattning",
    whyItMatters: "Varför det spelar roll: ",
    example: "Exempel: ",
    sourcesPdf: "Källor (PDF) →",
    back: "← Tillbaka",
    repeat: "🔁 Upprepa",
    next: "Nästa →",
    flagOpen: "🚩 Det här verkar fel eller ytligt",
    flagThanks: "Tack — flaggat för granskning.",
    flagReasons: { inaccurate: "felaktigt", shallow: "ytligt", other: "annat" },
    flagNotePlaceholder: "Valfri kommentar — vad är fel?",
    cancel: "Avbryt",
    submit: "Skicka",
    sessionType: "Typ av övning",
    standardCase: "Standardfall",
    standardCaseDesc: "Ett realistiskt fall från den här kategorin.",
    liveNews: "Aktuella nyheter",
    liveNewsDesc: (e) => `En verklig, aktuell nyhet tillämpad på ${e === "företag" ? "ditt" : "din"} fiktiva ${e}.`,
    edit: "Redigera",
    findingNews: "Letar efter en nyhet…",
    startChallenge: "Starta uppgiften",
    newsUnavailable: "Just nu finns inga lämpliga nyhetsartiklar för det här området. Prova igen om en stund, eller fortsätt med ett standardfall.",
    useStandardInstead: "Använd standardfall istället",
    preparingChallenge: "Förbereder din uppgift…",
    connection: "Koppling: ",
    thinkThenRecord: "Tänk igenom det och spela sedan in ditt svar högt.",
    differentChallenge: "🎲 Annan uppgift",
    recording: "Spelar in…",
    evaluating: "Bedömer ditt svar…",
    summary: "Sammanfattning",
    knowledge: "Kunskap",
    covered: "Täckte in",
    missed: "Missade",
    corrections: "Rättelser",
    terminology: "Terminologi",
    wordChoice: "Ordval",
    grammar: "Grammatik och tydlighet",
    pronunciation: "Uttal",
    practiceNext: "Öva på härnäst",
    whatYouSaid: "Det du sa",
    noSpeech: "(inget tal uppfattades)",
    tryAnother: "🎲 Prova en annan uppgift",
    entity: { business: "företag", law: "klientorganisation", politics: "organisation" },
    yourFictive: (e) => `${e === "företag" ? "Ditt" : "Din"} fiktiva ${e}`,
    profileFields: { name: "Namn", description: "Beskrivning", size: "Storlek", market: "Marknad", goals: "Mål" },
    profilePlaceholders: {
      name: "t.ex. XYZ AB",
      description: "t.ex. Ett medelstort B2B-mjukvaruföretag",
      size: "t.ex. ~500 anställda, 800 Mkr i omsättning",
      market: "t.ex. Norden och Västeuropa",
      goals: "t.ex. Växa inom storkundssegmentet",
    },
    save: "Spara",
  },
};

export function tutorUI(language: LanguageCode): TutorUI {
  return UI[language] ?? UI.en;
}
