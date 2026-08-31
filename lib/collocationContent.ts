import type { LanguageCode } from "@/lib/languages";

export type ProfileId = "executive" | "politician" | "lawyer";

export interface CollocationProfile {
  id: ProfileId;
  name: Record<LanguageCode, string>;
  description: Record<LanguageCode, string>;
}

/**
 * The three professions chosen (via web research, not guesswork) for how
 * central public speaking is to the job and how distinct their register
 * is from the others: politicians and executives consistently top
 * "most public speaking" rankings, and legal-profession sources describe
 * public speaking as a lawyer's "stock-in-trade." A sociologist/academic
 * option was considered and dropped — it didn't rank as a top
 * public-speaking profession the way these three did.
 */
export const COLLOCATION_PROFILES: CollocationProfile[] = [
  {
    id: "executive",
    name: { en: "Executive", de: "Führungskraft", fr: "Dirigeant", es: "Ejecutivo", sv: "Chef" },
    description: {
      en: "Strategic business language for boardrooms and leadership.",
      de: "Strategische Geschäftssprache für Vorstandsetagen und Führung.",
      fr: "Langage stratégique pour les conseils d'administration et le leadership.",
      es: "Lenguaje estratégico de negocios para juntas directivas y liderazgo.",
      sv: "Strategiskt affärsspråk för styrelserum och ledarskap.",
    },
  },
  {
    id: "politician",
    name: { en: "Politician", de: "Politiker", fr: "Politicien", es: "Político", sv: "Politiker" },
    description: {
      en: "Persuasive, diplomatic language for public office and policy.",
      de: "Überzeugende, diplomatische Sprache für öffentliche Ämter und Politik.",
      fr: "Langage persuasif et diplomatique pour la fonction publique et les politiques.",
      es: "Lenguaje persuasivo y diplomático para cargos públicos y políticas.",
      sv: "Övertygande, diplomatiskt språk för offentliga uppdrag och politik.",
    },
  },
  {
    id: "lawyer",
    name: { en: "Lawyer", de: "Anwalt", fr: "Avocat", es: "Abogado", sv: "Jurist" },
    description: {
      en: "Precise, adversarial language for courtrooms and negotiations.",
      de: "Präzise, kontradiktorische Sprache für Gerichtssäle und Verhandlungen.",
      fr: "Langage précis et contradictoire pour les tribunaux et les négociations.",
      es: "Lenguaje preciso y contradictorio para tribunales y negociaciones.",
      sv: "Precist, motstridigt språk för rättssalar och förhandlingar.",
    },
  },
];

export interface CollocationOption {
  phrase: string;
  correct: boolean;
  explanation: string;
}

export interface CollocationChallenge {
  id: string;
  category: string;
  weakPhrase: string;
  options: CollocationOption[];
  /** The verb/noun stems to look for in the spoken round — substrings so
   * conjugations (mitigate/mitigated/mitigating) still match. */
  targetVerbStem: string;
  targetNounStem: string;
  /** A short business scenario prompting the user to use the phrase aloud. */
  scenario: string;
}

/**
 * Weak business phrase -> pick the correctly upgraded version among
 * plausible-but-wrong options, per language. The wrong options aren't
 * random noise: each is either still basic, or a "weak collocation"
 * (grammatically fine, but the verb/noun pairing doesn't actually go
 * together professionally — the exact trap described in the "Mitigate
 * Risk" vs "Mitigate Resources" example this feature is built from).
 * Collocations are idiomatic, so the non-English sets are written from
 * real business usage in each language, not word-for-word translations of
 * the English ones — English has more challenges since it was the
 * original target skill.
 */
const EXECUTIVE_CHALLENGES_BY_LANGUAGE: Partial<Record<LanguageCode, CollocationChallenge[]>> = {
  en: [
    {
      id: "lower-risk",
      category: "Risk & Strategy",
      weakPhrase: "We need to lower the risk before scaling.",
      targetVerbStem: "mitigat",
      targetNounStem: "risk",
      scenario: "You're advising the board on a risky new market entry.",
      options: [
        { phrase: "We need to mitigate the risk before scaling.", correct: true, explanation: "\"Mitigate\" is almost always paired with \"risk\" or \"damage\" — a strong, natural collocation." },
        { phrase: "We need to mitigate the resources before scaling.", correct: false, explanation: "\"Mitigate\" means to lessen the severity of something negative — it doesn't fit \"resources\". Try \"allocate\" or \"optimize\" instead." },
        { phrase: "We need to fix the risk before scaling.", correct: false, explanation: "\"Fix\" is a weak, generic verb — it doesn't signal the deliberate, strategic action \"mitigate\" does." },
        { phrase: "We need to drive the risk before scaling.", correct: false, explanation: "\"Drive\" pairs with things you want to increase (growth, performance) — not risk, which you want to reduce." },
      ],
    },
    {
      id: "make-plan-better",
      category: "Strategy",
      weakPhrase: "We want to make the plan better.",
      targetVerbStem: "enhanc",
      targetNounStem: "framework",
      scenario: "You're presenting a revised strategy document to leadership.",
      options: [
        { phrase: "We want to enhance the framework.", correct: true, explanation: "\"Enhance\" plus \"framework\" is a classic upgrade of \"a plan\" — precise and formal." },
        { phrase: "We want to mitigate the framework.", correct: false, explanation: "\"Mitigate\" only applies to negative things (risk, damage) — a framework isn't inherently negative." },
        { phrase: "We want to improve the plan.", correct: false, explanation: "Grammatically fine, but \"improve\" and \"plan\" are both fairly basic — this barely upgrades the original." },
        { phrase: "We want to allocate the framework.", correct: false, explanation: "\"Allocate\" is for distributing resources (budget, time, capital) — you don't \"allocate\" a framework." },
      ],
    },
    {
      id: "grow-in-good-way",
      category: "Growth & Performance",
      weakPhrase: "We want the company to grow in a good way.",
      targetVerbStem: "driv",
      targetNounStem: "growth",
      scenario: "You're pitching the company's five-year outlook to investors.",
      options: [
        { phrase: "We aim to drive sustainable growth.", correct: true, explanation: "\"Drive\" plus \"growth\" is a textbook strong collocation — decisive and forward-looking." },
        { phrase: "We aim to mandate sustainable growth.", correct: false, explanation: "\"Mandate\" is about imposing rules or authority — growth isn't something you can mandate into existing." },
        { phrase: "We want good growth.", correct: false, explanation: "\"Good growth\" is vague and informal — it doesn't carry any strategic precision." },
        { phrase: "We aim to allocate sustainable growth.", correct: false, explanation: "\"Allocate\" needs a distributable object (budget, resources) — growth is an outcome, not something you distribute." },
      ],
    },
    {
      id: "spend-budget-carefully",
      category: "Financial",
      weakPhrase: "The budget needs to be spent carefully.",
      targetVerbStem: "allocat",
      targetNounStem: "capital",
      scenario: "You're explaining a cost-cutting decision to the finance team.",
      options: [
        { phrase: "Capital must be allocated prudently.", correct: true, explanation: "\"Allocate\" plus \"capital\", qualified by \"prudently\" — precise, formal, and exactly how executives discuss spending." },
        { phrase: "Capital must be mitigated prudently.", correct: false, explanation: "Capital isn't a negative thing to lessen the severity of — \"mitigate\" doesn't fit here." },
        { phrase: "The budget needs to be careful.", correct: false, explanation: "This isn't even a complete professional thought — budgets don't \"be careful\", people spend them carefully." },
        { phrase: "Capital must be driven prudently.", correct: false, explanation: "\"Drive\" pairs with growth or performance, not with careful, controlled spending." },
      ],
    },
    {
      id: "team-follow-rule",
      category: "Leadership & Compliance",
      weakPhrase: "We must make sure the team follows the new rule.",
      targetVerbStem: "mandat",
      targetNounStem: "complian",
      scenario: "You're rolling out a new compliance policy to department heads.",
      options: [
        { phrase: "We must mandate compliance with the new policy.", correct: true, explanation: "\"Mandate\" plus \"compliance\" is exactly the register for enforcing a rule with authority." },
        { phrase: "We must mitigate compliance with the new policy.", correct: false, explanation: "You don't lessen the severity of compliance — \"mitigate\" doesn't apply here." },
        { phrase: "We must make the team follow the rule.", correct: false, explanation: "This is grammatically fine but stays at the basic register — no upgrade in precision or authority." },
        { phrase: "We must allocate compliance with the new policy.", correct: false, explanation: "Compliance isn't a resource to distribute — \"allocate\" doesn't fit." },
      ],
    },
    {
      id: "strengths-get-better",
      category: "Growth & Performance",
      weakPhrase: "Our strengths need to get better.",
      targetVerbStem: "enhanc",
      targetNounStem: "competenc",
      scenario: "You're outlining a talent-development plan to HR leadership.",
      options: [
        { phrase: "We must enhance our core competencies.", correct: true, explanation: "\"Enhance\" plus \"core competencies\" is precise, formal, and directly upgrades \"strengths get better\"." },
        { phrase: "We must mitigate our core competencies.", correct: false, explanation: "Competencies are a strength, not a risk — there's nothing to \"mitigate\"." },
        { phrase: "Our strengths need improvement.", correct: false, explanation: "Grammatically correct but minimal — \"strengths\" and \"improvement\" are both basic-register words." },
        { phrase: "We must mandate our core competencies.", correct: false, explanation: "You can't mandate a competency into existing — mandate applies to rules and behavior, not skill." },
      ],
    },
    {
      id: "company-money-problems",
      category: "Financial",
      weakPhrase: "The company had problems with money because of bad choices.",
      targetVerbStem: "experienc",
      targetNounStem: "downturn",
      scenario: "You're summarizing last quarter's results to shareholders.",
      options: [
        { phrase: "The firm experienced a financial downturn due to strategic miscalculations.", correct: true, explanation: "Precise nouns (\"financial downturn\", \"strategic miscalculations\") replace vague ones (\"problems\", \"bad choices\") — this is the core of executive phrasing." },
        { phrase: "The company had bad money problems.", correct: false, explanation: "This barely differs from the original — \"bad\" and \"problems\" are exactly the vague words to avoid." },
        { phrase: "The company mandated a financial downturn.", correct: false, explanation: "A downturn isn't something a company can mandate — that verb implies deliberate authority over an outcome nobody chooses." },
        { phrase: "The firm's money went down because of bad choices.", correct: false, explanation: "Still entirely basic vocabulary — \"went down\" and \"bad choices\" carry no strategic precision." },
      ],
    },
    {
      id: "less-waste",
      category: "Operations",
      weakPhrase: "The team should try to have less waste in the process.",
      targetVerbStem: "optimiz",
      targetNounStem: "efficienc",
      scenario: "You're presenting a process-improvement initiative to operations leadership.",
      options: [
        { phrase: "The team should aim to optimize operational efficiency.", correct: true, explanation: "\"Optimize\" plus \"efficiency\" is the standard, precise way to describe reducing waste in a process." },
        { phrase: "The team should aim to mitigate operational efficiency.", correct: false, explanation: "Efficiency is a positive you want more of — \"mitigate\" only applies to negatives you want less of." },
        { phrase: "The team should have less waste.", correct: false, explanation: "Direct but entirely basic — no professional vocabulary upgrade at all." },
        { phrase: "The team should allocate operational efficiency.", correct: false, explanation: "Efficiency isn't a resource you distribute — \"allocate\" needs an object like budget, time, or headcount." },
      ],
    },
    {
      id: "more-workers",
      category: "Operations",
      weakPhrase: "We need more workers to do more things.",
      targetVerbStem: "expand",
      targetNounStem: "workforc",
      scenario: "You're justifying a hiring plan to the executive committee.",
      options: [
        { phrase: "We need to expand our workforce to scale operations.", correct: true, explanation: "\"Expand\" plus \"workforce\" is the standard professional phrasing for planned hiring growth." },
        { phrase: "We need to mitigate our workforce to scale operations.", correct: false, explanation: "The workforce isn't a risk to reduce — \"mitigate\" doesn't fit an action meant to grow the team." },
        { phrase: "We need more people to do more work.", correct: false, explanation: "Direct, but entirely basic vocabulary — no strategic precision." },
        { phrase: "We need to mandate our workforce to scale operations.", correct: false, explanation: "You mandate rules or behavior, not the existence of a workforce — the verb doesn't fit this meaning." },
      ],
    },
    {
      id: "keep-momentum",
      category: "Growth & Performance",
      weakPhrase: "Things are going well and we should keep this going.",
      targetVerbStem: "sustain",
      targetNounStem: "trajector",
      scenario: "You're closing a quarterly review on a high note.",
      options: [
        { phrase: "Momentum is strong, and we must sustain this trajectory.", correct: true, explanation: "\"Sustain\" plus \"trajectory\" precisely captures \"keep the good thing going\" in strategic language." },
        { phrase: "Momentum is strong, and we must mitigate this trajectory.", correct: false, explanation: "The trajectory here is positive — \"mitigate\" only applies to something negative you want to lessen." },
        { phrase: "Things are good, and we should keep it going.", correct: false, explanation: "Entirely basic register — \"things\", \"good\", \"keep it going\" are all vague." },
        { phrase: "Momentum is strong, and we must allocate this trajectory.", correct: false, explanation: "A trajectory isn't a resource to distribute — \"allocate\" doesn't fit." },
      ],
    },
  ],
  de: [
    {
      id: "risiko-kleiner",
      category: "Risiko & Strategie",
      weakPhrase: "Wir müssen das Risiko kleiner machen, bevor wir wachsen.",
      targetVerbStem: "minimier",
      targetNounStem: "risiko",
      scenario: "Sie beraten den Vorstand zu einem riskanten Markteintritt.",
      options: [
        { phrase: "Wir müssen das Risiko minimieren, bevor wir skalieren.", correct: true, explanation: "\"Minimieren\" wird fast immer mit \"Risiko\" gepaart — eine starke, natürliche Kollokation." },
        { phrase: "Wir müssen die Ressourcen minimieren, bevor wir skalieren.", correct: false, explanation: "Ressourcen minimiert man nicht — man setzt sie \"optimiert\" oder \"gezielt\" ein." },
        { phrase: "Wir müssen das Risiko reparieren, bevor wir wachsen.", correct: false, explanation: "\"Reparieren\" ist ein schwaches, unpassendes Verb für strategisches Risikomanagement." },
        { phrase: "Wir müssen das Risiko antreiben, bevor wir wachsen.", correct: false, explanation: "\"Antreiben\" passt zu Dingen, die wachsen sollen — nicht zu Risiko, das man reduzieren will." },
      ],
    },
    {
      id: "plan-besser",
      category: "Strategie",
      weakPhrase: "Wir wollen den Plan besser machen.",
      targetVerbStem: "optimier",
      targetNounStem: "rahmen",
      scenario: "Sie präsentieren eine überarbeitete Strategie der Führungsebene.",
      options: [
        { phrase: "Wir wollen den Rahmen optimieren.", correct: true, explanation: "\"Optimieren\" plus \"Rahmen\" ist präzise und formell — eine klare Aufwertung von \"Plan\"." },
        { phrase: "Wir wollen den Rahmen minimieren.", correct: false, explanation: "Ein Rahmen ist nichts Negatives — \"minimieren\" passt hier nicht." },
        { phrase: "Wir wollen den Plan verbessern.", correct: false, explanation: "Grammatisch richtig, aber \"Plan\" und \"verbessern\" bleiben beide im Basisregister." },
        { phrase: "Wir wollen den Rahmen verteilen.", correct: false, explanation: "\"Verteilen\" passt zu Ressourcen oder Budget, nicht zu einem Rahmenwerk." },
      ],
    },
    {
      id: "geld-vorsichtig",
      category: "Finanzen",
      weakPhrase: "Das Geld muss vorsichtig ausgegeben werden.",
      targetVerbStem: "eingesetzt",
      targetNounStem: "kapital",
      scenario: "Sie erklären eine Kostensenkung dem Finanzteam.",
      options: [
        { phrase: "Kapital muss umsichtig eingesetzt werden.", correct: true, explanation: "\"Einsetzen\" plus \"Kapital\", qualifiziert durch \"umsichtig\" — genau die Sprache, in der Führungskräfte über Ausgaben sprechen." },
        { phrase: "Kapital muss umsichtig minimiert werden.", correct: false, explanation: "Kapital ist nichts Negatives, das man minimiert — das Verb passt nicht." },
        { phrase: "Das Geld muss vorsichtig sein.", correct: false, explanation: "Kein vollständiger, professioneller Gedanke — Geld selbst kann nicht \"vorsichtig sein\"." },
        { phrase: "Kapital muss umsichtig angetrieben werden.", correct: false, explanation: "\"Antreiben\" passt zu Wachstum, nicht zu sorgfältiger Kapitalallokation." },
      ],
    },
    {
      id: "firma-waechst",
      category: "Wachstum & Leistung",
      weakPhrase: "Wir wollen, dass die Firma gut wächst.",
      targetVerbStem: "vorantreib",
      targetNounStem: "wachstum",
      scenario: "Sie stellen Investoren den Fünfjahresausblick vor.",
      options: [
        { phrase: "Wir wollen nachhaltiges Wachstum vorantreiben.", correct: true, explanation: "\"Vorantreiben\" plus \"Wachstum\" ist eine starke, entschlossene Kollokation." },
        { phrase: "Wir wollen nachhaltiges Wachstum vorschreiben.", correct: false, explanation: "\"Vorschreiben\" bedeutet, eine Regel aufzuerlegen — Wachstum kann man nicht vorschreiben." },
        { phrase: "Wir wollen gutes Wachstum.", correct: false, explanation: "Vage und informell — keine strategische Präzision." },
        { phrase: "Wir wollen nachhaltiges Wachstum verteilen.", correct: false, explanation: "Wachstum ist ein Ergebnis, kein Objekt, das man verteilt." },
      ],
    },
    {
      id: "chef-lob",
      category: "Führung & Compliance",
      weakPhrase: "Der Chef sagte, die Arbeit des Mitarbeiters war gut.",
      targetVerbStem: "gewürdigt",
      targetNounStem: "leistung",
      scenario: "Sie geben einem Teammitglied nach einem erfolgreichen Projekt Feedback.",
      options: [
        { phrase: "Der Vorgesetzte hat die Leistung des Mitarbeiters gewürdigt.", correct: true, explanation: "\"Würdigen\" plus \"Leistung\" ist präzise und formell — genau das richtige Register für Anerkennung." },
        { phrase: "Der Vorgesetzte hat die Leistung minimiert.", correct: false, explanation: "Das kehrt die beabsichtigte Bedeutung komplett um." },
        { phrase: "Der Chef fand die Arbeit gut.", correct: false, explanation: "Bleibt im Basisregister — keine Aufwertung." },
        { phrase: "Der Vorgesetzte hat die Leistung vorangetrieben.", correct: false, explanation: "\"Vorantreiben\" passt nicht zum Anerkennen einer bereits erbrachten Leistung." },
      ],
    },
  ],
  fr: [
    {
      id: "reduire-risque",
      category: "Risque & Stratégie",
      weakPhrase: "Nous devons réduire le risque avant de grandir.",
      targetVerbStem: "atténu",
      targetNounStem: "risque",
      scenario: "Vous conseillez le conseil d'administration sur une entrée risquée sur le marché.",
      options: [
        { phrase: "Nous devons atténuer le risque avant de nous développer.", correct: true, explanation: "\"Atténuer\" est presque toujours associé à \"risque\" — une collocation forte et naturelle." },
        { phrase: "Nous devons atténuer les ressources avant de nous développer.", correct: false, explanation: "\"Atténuer\" ne s'applique pas aux ressources — on les \"optimise\" ou on les \"alloue\"." },
        { phrase: "Nous devons réparer le risque avant de grandir.", correct: false, explanation: "\"Réparer\" est un verbe faible et ne convient pas à la gestion stratégique du risque." },
        { phrase: "Nous devons conduire le risque avant de grandir.", correct: false, explanation: "\"Conduire\" s'associe à la croissance, pas au risque, que l'on cherche à réduire." },
      ],
    },
    {
      id: "ameliorer-plan",
      category: "Stratégie",
      weakPhrase: "Nous voulons améliorer le plan.",
      targetVerbStem: "optimis",
      targetNounStem: "cadre",
      scenario: "Vous présentez une stratégie révisée à la direction.",
      options: [
        { phrase: "Nous voulons optimiser le cadre stratégique.", correct: true, explanation: "\"Optimiser\" plus \"cadre\" est précis et formel — une vraie mise à niveau de \"plan\"." },
        { phrase: "Nous voulons atténuer le cadre stratégique.", correct: false, explanation: "Un cadre n'est pas quelque chose de négatif — \"atténuer\" ne convient pas." },
        { phrase: "Nous voulons rendre le plan meilleur.", correct: false, explanation: "Reste entièrement au registre basique — aucune précision stratégique." },
        { phrase: "Nous voulons répartir le cadre stratégique.", correct: false, explanation: "\"Répartir\" s'applique aux ressources ou au budget, pas à un cadre." },
      ],
    },
    {
      id: "argent-soin",
      category: "Finance",
      weakPhrase: "L'argent doit être dépensé avec soin.",
      targetVerbStem: "allou",
      targetNounStem: "capital",
      scenario: "Vous expliquez une décision de réduction des coûts à l'équipe financière.",
      options: [
        { phrase: "Le capital doit être alloué avec prudence.", correct: true, explanation: "\"Allouer\" plus \"capital\", qualifié par \"prudence\" — exactement le registre exécutif." },
        { phrase: "Le capital doit être atténué avec prudence.", correct: false, explanation: "Le capital n'est pas négatif — \"atténuer\" ne convient pas." },
        { phrase: "L'argent doit faire attention.", correct: false, explanation: "N'est pas une pensée professionnelle complète." },
        { phrase: "Le capital doit être conduit avec prudence.", correct: false, explanation: "\"Conduire\" ne convient pas à l'allocation prudente de capital." },
      ],
    },
    {
      id: "entreprise-grandit",
      category: "Croissance & Performance",
      weakPhrase: "Nous voulons que l'entreprise grandisse bien.",
      targetVerbStem: "stimul",
      targetNounStem: "croissance",
      scenario: "Vous présentez les perspectives à cinq ans aux investisseurs.",
      options: [
        { phrase: "Nous visons à stimuler une croissance durable.", correct: true, explanation: "\"Stimuler\" plus \"croissance\" est une collocation forte et tournée vers l'avenir." },
        { phrase: "Nous visons à mandater une croissance durable.", correct: false, explanation: "\"Mandater\" impose une règle — la croissance ne peut pas être mandatée." },
        { phrase: "Nous voulons une bonne croissance.", correct: false, explanation: "Vague et informel — aucune précision stratégique." },
        { phrase: "Nous visons à répartir une croissance durable.", correct: false, explanation: "La croissance est un résultat, pas un objet à répartir." },
      ],
    },
    {
      id: "patron-eloge",
      category: "Leadership & Conformité",
      weakPhrase: "Le patron a dit que le travail de l'employé était bon.",
      targetVerbStem: "salu",
      targetNounStem: "performance",
      scenario: "Vous donnez un retour à un membre de l'équipe après un projet réussi.",
      options: [
        { phrase: "Le responsable a salué la performance de l'employé.", correct: true, explanation: "\"Saluer\" plus \"performance\" est précis et formel — le bon registre pour la reconnaissance." },
        { phrase: "Le responsable a atténué la performance de l'employé.", correct: false, explanation: "Inverse complètement le sens voulu." },
        { phrase: "Le patron a trouvé le travail bon.", correct: false, explanation: "Reste au registre basique — aucune mise à niveau." },
        { phrase: "Le responsable a conduit la performance de l'employé.", correct: false, explanation: "\"Conduire\" ne convient pas pour reconnaître une performance déjà accomplie." },
      ],
    },
  ],
  es: [
    {
      id: "reducir-riesgo",
      category: "Riesgo y Estrategia",
      weakPhrase: "Necesitamos reducir el riesgo antes de crecer.",
      targetVerbStem: "mitig",
      targetNounStem: "riesgo",
      scenario: "Estás asesorando a la junta sobre una entrada arriesgada al mercado.",
      options: [
        { phrase: "Necesitamos mitigar el riesgo antes de escalar.", correct: true, explanation: "\"Mitigar\" casi siempre se combina con \"riesgo\" — una colocación fuerte y natural." },
        { phrase: "Necesitamos mitigar los recursos antes de escalar.", correct: false, explanation: "\"Mitigar\" no aplica a los recursos — se \"optimizan\" o \"asignan\"." },
        { phrase: "Necesitamos arreglar el riesgo antes de crecer.", correct: false, explanation: "\"Arreglar\" es un verbo débil que no transmite gestión estratégica del riesgo." },
        { phrase: "Necesitamos impulsar el riesgo antes de crecer.", correct: false, explanation: "\"Impulsar\" se asocia al crecimiento, no al riesgo, que se busca reducir." },
      ],
    },
    {
      id: "mejorar-plan",
      category: "Estrategia",
      weakPhrase: "Queremos mejorar el plan.",
      targetVerbStem: "optimiz",
      targetNounStem: "marco",
      scenario: "Estás presentando una estrategia revisada a la dirección.",
      options: [
        { phrase: "Queremos optimizar el marco estratégico.", correct: true, explanation: "\"Optimizar\" más \"marco\" es preciso y formal — una verdadera mejora de \"plan\"." },
        { phrase: "Queremos mitigar el marco estratégico.", correct: false, explanation: "Un marco no es algo negativo — \"mitigar\" no encaja." },
        { phrase: "Queremos hacer el plan mejor.", correct: false, explanation: "Se queda en el registro básico — sin precisión estratégica." },
        { phrase: "Queremos asignar el marco estratégico.", correct: false, explanation: "\"Asignar\" aplica a recursos o presupuesto, no a un marco." },
      ],
    },
    {
      id: "dinero-cuidado",
      category: "Finanzas",
      weakPhrase: "El dinero debe gastarse con cuidado.",
      targetVerbStem: "asign",
      targetNounStem: "capital",
      scenario: "Estás explicando una decisión de recorte de costos al equipo financiero.",
      options: [
        { phrase: "El capital debe asignarse con prudencia.", correct: true, explanation: "\"Asignar\" más \"capital\", calificado por \"prudencia\" — exactamente el registro ejecutivo." },
        { phrase: "El capital debe mitigarse con prudencia.", correct: false, explanation: "El capital no es algo negativo — \"mitigar\" no encaja aquí." },
        { phrase: "El dinero debe tener cuidado.", correct: false, explanation: "No es un pensamiento profesional completo." },
        { phrase: "El capital debe impulsarse con prudencia.", correct: false, explanation: "\"Impulsar\" no encaja con la asignación prudente de capital." },
      ],
    },
    {
      id: "empresa-crece",
      category: "Crecimiento y Rendimiento",
      weakPhrase: "Queremos que la empresa crezca bien.",
      targetVerbStem: "impuls",
      targetNounStem: "crecimiento",
      scenario: "Estás presentando las perspectivas a cinco años a los inversores.",
      options: [
        { phrase: "Buscamos impulsar un crecimiento sostenible.", correct: true, explanation: "\"Impulsar\" más \"crecimiento\" es una colocación fuerte y decidida." },
        { phrase: "Buscamos mandatar un crecimiento sostenible.", correct: false, explanation: "\"Mandatar\" impone una regla — el crecimiento no se puede mandatar." },
        { phrase: "Queremos buen crecimiento.", correct: false, explanation: "Vago e informal — sin precisión estratégica." },
        { phrase: "Buscamos asignar un crecimiento sostenible.", correct: false, explanation: "El crecimiento es un resultado, no un objeto que se asigna." },
      ],
    },
    {
      id: "jefe-elogio",
      category: "Liderazgo y Cumplimiento",
      weakPhrase: "El jefe dijo que el trabajo del empleado era bueno.",
      targetVerbStem: "elogi",
      targetNounStem: "desempeñ",
      scenario: "Estás dando retroalimentación a un miembro del equipo tras un proyecto exitoso.",
      options: [
        { phrase: "El gerente elogió el desempeño del empleado.", correct: true, explanation: "\"Elogiar\" más \"desempeño\" es preciso y formal — el registro correcto para el reconocimiento." },
        { phrase: "El gerente mitigó el desempeño del empleado.", correct: false, explanation: "Invierte por completo el sentido pretendido." },
        { phrase: "El jefe pensó que el trabajo era bueno.", correct: false, explanation: "Se queda en el registro básico — sin mejora." },
        { phrase: "El gerente asignó el desempeño del empleado.", correct: false, explanation: "\"Asignar\" no encaja con reconocer un desempeño ya logrado." },
      ],
    },
  ],
  sv: [
    {
      id: "minska-risken",
      category: "Risk & Strategi",
      weakPhrase: "Vi måste minska risken innan vi växer.",
      targetVerbStem: "begräns",
      targetNounStem: "risk",
      scenario: "Du rådger styrelsen om en riskfylld marknadsetablering.",
      options: [
        { phrase: "Vi måste begränsa risken innan vi skalar upp.", correct: true, explanation: "\"Begränsa\" pairas nästan alltid med \"risk\" — en stark, naturlig kollokation." },
        { phrase: "Vi måste begränsa resurserna innan vi skalar upp.", correct: false, explanation: "\"Begränsa resurserna\" betyder något annat (mindre resurser) — inte vad som avses här." },
        { phrase: "Vi måste fixa risken innan vi växer.", correct: false, explanation: "\"Fixa\" är ett svagt, informellt verb för strategisk riskhantering." },
        { phrase: "Vi måste driva risken innan vi växer.", correct: false, explanation: "\"Driva\" passar sådant man vill öka — inte risk, som man vill minska." },
      ],
    },
    {
      id: "planen-battre",
      category: "Strategi",
      weakPhrase: "Vi vill göra planen bättre.",
      targetVerbStem: "optimer",
      targetNounStem: "ramverk",
      scenario: "Du presenterar en reviderad strategi för ledningen.",
      options: [
        { phrase: "Vi vill optimera ramverket.", correct: true, explanation: "\"Optimera\" plus \"ramverk\" är precist och formellt — en tydlig uppgradering av \"plan\"." },
        { phrase: "Vi vill begränsa ramverket.", correct: false, explanation: "Ett ramverk är inget negativt — \"begränsa\" passar inte." },
        { phrase: "Vi vill göra planen bra.", correct: false, explanation: "Stannar i basregistret — ingen strategisk precision." },
        { phrase: "Vi vill fördela ramverket.", correct: false, explanation: "\"Fördela\" passar resurser eller budget, inte ett ramverk." },
      ],
    },
    {
      id: "pengarna-forsiktigt",
      category: "Ekonomi",
      weakPhrase: "Pengarna måste spenderas försiktigt.",
      targetVerbStem: "fördela",
      targetNounStem: "kapital",
      scenario: "Du förklarar ett kostnadsbesparingsbeslut för finansteamet.",
      options: [
        { phrase: "Kapitalet måste fördelas klokt.", correct: true, explanation: "\"Fördela\" plus \"kapital\", kvalificerat med \"klokt\" — exakt det register chefer använder om utgifter." },
        { phrase: "Kapitalet måste begränsas klokt.", correct: false, explanation: "Kapital är inget negativt — \"begränsa\" passar inte här." },
        { phrase: "Pengarna måste vara försiktiga.", correct: false, explanation: "Inte en fullständig, professionell tanke." },
        { phrase: "Kapitalet måste drivas klokt.", correct: false, explanation: "\"Driva\" passar inte klok kapitalallokering." },
      ],
    },
    {
      id: "foretaget-vaxer",
      category: "Tillväxt & Prestation",
      weakPhrase: "Vi vill att företaget ska växa bra.",
      targetVerbStem: "driv",
      targetNounStem: "tillväxt",
      scenario: "Du presenterar femårsutsikterna för investerare.",
      options: [
        { phrase: "Vi siktar på att driva hållbar tillväxt.", correct: true, explanation: "\"Driva\" plus \"tillväxt\" är en stark, framåtblickande kollokation." },
        { phrase: "Vi siktar på att föreskriva hållbar tillväxt.", correct: false, explanation: "\"Föreskriva\" innebär att ålägga en regel — tillväxt kan inte föreskrivas." },
        { phrase: "Vi vill ha bra tillväxt.", correct: false, explanation: "Vagt och informellt — ingen strategisk precision." },
        { phrase: "Vi siktar på att fördela hållbar tillväxt.", correct: false, explanation: "Tillväxt är ett resultat, inte ett objekt som fördelas." },
      ],
    },
    {
      id: "chefen-berom",
      category: "Ledarskap & Regelefterlevnad",
      weakPhrase: "Chefen sa att medarbetarens jobb var bra.",
      targetVerbStem: "hylla",
      targetNounStem: "prestation",
      scenario: "Du ger feedback till en teammedlem efter ett lyckat projekt.",
      options: [
        { phrase: "Chefen hyllade medarbetarens prestation.", correct: true, explanation: "\"Hylla\" plus \"prestation\" är precist och formellt — rätt register för erkännande." },
        { phrase: "Chefen begränsade medarbetarens prestation.", correct: false, explanation: "Vänder helt på den avsedda innebörden." },
        { phrase: "Chefen tyckte jobbet var bra.", correct: false, explanation: "Stannar i basregistret — ingen uppgradering." },
        { phrase: "Chefen drev medarbetarens prestation.", correct: false, explanation: "\"Driva\" passar inte för att erkänna en redan uppnådd prestation." },
      ],
    },
  ],
};

const POLITICIAN_CHALLENGES_EN: CollocationChallenge[] = [
  {
    id: "reach-aisle",
    category: "Bipartisanship",
    weakPhrase: "We need to work together with the other party.",
    targetVerbStem: "reach",
    targetNounStem: "aisle",
    scenario: "You're addressing a divided legislature on a contentious bill.",
    options: [
      { phrase: "We must reach across the aisle to find common ground.", correct: true, explanation: "\"Reach across the aisle\" is the standard political idiom for bipartisan cooperation." },
      { phrase: "We must mitigate across the aisle to find common ground.", correct: false, explanation: "\"Mitigate\" doesn't pair with \"aisle\" — it needs a negative like risk or damage." },
      { phrase: "We need to work with the other party.", correct: false, explanation: "Direct but flat — none of the rhetorical weight expected in a political address." },
      { phrase: "We must allocate across the aisle to find common ground.", correct: false, explanation: "\"Allocate\" needs a distributable object (budget, seats) — it doesn't fit this idiom." },
    ],
  },
  {
    id: "grassroots-support",
    category: "Campaigning",
    weakPhrase: "People at the local level are supporting our campaign.",
    targetVerbStem: "grassroot",
    targetNounStem: "support",
    scenario: "You're rallying volunteers ahead of an election.",
    options: [
      { phrase: "We are seeing strong grassroots support for our campaign.", correct: true, explanation: "\"Grassroots\" plus \"support\" is the standard term for organic, local-level backing." },
      { phrase: "We are seeing strong grassroots allocation for our campaign.", correct: false, explanation: "\"Allocation\" implies something distributed from above — the opposite of grassroots." },
      { phrase: "People are supporting our campaign.", correct: false, explanation: "Loses the specific \"organized at the local level\" meaning \"grassroots\" carries." },
      { phrase: "We are seeing strong grassroots mandate for our campaign.", correct: false, explanation: "A \"mandate\" is won after an election, from voters broadly — it doesn't pair with \"grassroots\" this way." },
    ],
  },
  {
    id: "hold-accountable",
    category: "Governance",
    weakPhrase: "We need to make sure leaders answer for their actions.",
    targetVerbStem: "hold",
    targetNounStem: "accountable",
    scenario: "You're responding to a scandal involving a government official.",
    options: [
      { phrase: "We must hold our leaders accountable for their actions.", correct: true, explanation: "\"Hold accountable\" is the fixed political phrase for demanding answerability." },
      { phrase: "We must mitigate our leaders accountable for their actions.", correct: false, explanation: "\"Mitigate\" doesn't combine grammatically with \"accountable\" this way." },
      { phrase: "We need leaders to answer for their actions.", correct: false, explanation: "Says the same thing but without the fixed, forceful political phrasing." },
      { phrase: "We must allocate our leaders accountable for their actions.", correct: false, explanation: "\"Allocate\" doesn't fit — it needs a distributable object, not an adjective like \"accountable\"." },
    ],
  },
  {
    id: "stand-united",
    category: "National Address",
    weakPhrase: "Everyone in the country needs to come together now.",
    targetVerbStem: "stand",
    targetNounStem: "united",
    scenario: "You're delivering a speech after a national crisis.",
    options: [
      { phrase: "Now, more than ever, our nation must stand united.", correct: true, explanation: "\"Stand united\" is a classic collocation for national-address rhetoric." },
      { phrase: "Now, more than ever, our nation must mitigate united.", correct: false, explanation: "Not a real collocation — \"mitigate\" needs a negative noun object." },
      { phrase: "Everyone in the country needs to come together.", correct: false, explanation: "Correct meaning, but lacks the elevated register expected in a national address." },
      { phrase: "Now, more than ever, our nation must allocate united.", correct: false, explanation: "Grammatically broken — \"allocate\" needs a distributable object." },
    ],
  },
  {
    id: "restore-trust",
    category: "Campaigning",
    weakPhrase: "We promise to make things better and be honest with voters.",
    targetVerbStem: "restor",
    targetNounStem: "trust",
    scenario: "You're closing a campaign speech ahead of election day.",
    options: [
      { phrase: "We are committed to restoring trust and delivering on our promises.", correct: true, explanation: "\"Restore trust\" and \"deliver on promises\" are both standard campaign-rhetoric collocations." },
      { phrase: "We are committed to mitigating trust and delivering on our promises.", correct: false, explanation: "Trust isn't a negative to lessen — \"mitigate\" reverses the intended meaning." },
      { phrase: "We promise to make things better and be honest.", correct: false, explanation: "Vague — \"make things better\" carries no specific commitment." },
      { phrase: "We are committed to allocating trust and delivering on our promises.", correct: false, explanation: "\"Allocate\" doesn't fit an abstract quality like trust." },
    ],
  },
];

const POLITICIAN_CHALLENGES_DE: CollocationChallenge[] = [
  {
    id: "kompromiss-such",
    category: "Überparteilichkeit",
    weakPhrase: "Wir müssen mit der anderen Partei zusammenarbeiten.",
    targetVerbStem: "such",
    targetNounStem: "kompromiss",
    scenario: "Sie sprechen vor einem gespaltenen Parlament über ein umstrittenes Gesetz.",
    options: [
      { phrase: "Wir müssen parteiübergreifend Kompromisse suchen.", correct: true, explanation: "\"Parteiübergreifend\" plus \"Kompromisse suchen\" ist die klassische politische Formulierung für Zusammenarbeit über Parteigrenzen hinweg." },
      { phrase: "Wir müssen parteiübergreifend Kompromisse mindern.", correct: false, explanation: "\"Mindern\" passt nicht zu \"suchen\" — Kompromisse werden gefunden, nicht gemindert." },
      { phrase: "Wir müssen mit der anderen Partei zusammenarbeiten.", correct: false, explanation: "Bleibt im Basisregister — keine politische Rhetorik." },
      { phrase: "Wir müssen parteiübergreifend Kompromisse zuteilen.", correct: false, explanation: "\"Zuteilen\" passt nicht zu Kompromissen, die verhandelt, nicht verteilt werden." },
    ],
  },
  {
    id: "basisunterstuetzung",
    category: "Wahlkampf",
    weakPhrase: "Viele Menschen vor Ort unterstützen unsere Kampagne.",
    targetVerbStem: "erleb",
    targetNounStem: "basisunterstützung",
    scenario: "Sie mobilisieren Freiwillige vor einer Wahl.",
    options: [
      { phrase: "Wir erleben eine breite Basisunterstützung für unsere Kampagne.", correct: true, explanation: "\"Basisunterstützung\" ist der feste Begriff für organisierte Unterstützung von der Basis." },
      { phrase: "Wir erleben eine breite Basiszuteilung für unsere Kampagne.", correct: false, explanation: "\"Zuteilung\" impliziert etwas von oben Verteiltes — das Gegenteil von Basisunterstützung." },
      { phrase: "Viele Menschen unterstützen unsere Kampagne.", correct: false, explanation: "Verliert die spezifische Bedeutung von organisierter Unterstützung an der Basis." },
      { phrase: "Wir erleben ein breites Basismandat für unsere Kampagne.", correct: false, explanation: "Ein \"Mandat\" wird nach einer Wahl von den Wählern erteilt — nicht vorher von der Basis." },
    ],
  },
  {
    id: "rechenschaft",
    category: "Regierungsführung",
    weakPhrase: "Wir müssen dafür sorgen, dass Politiker für ihr Handeln geradestehen.",
    targetVerbStem: "zieh",
    targetNounStem: "rechenschaft",
    scenario: "Sie reagieren auf einen Skandal um einen Regierungsbeamten.",
    options: [
      { phrase: "Wir müssen unsere Politiker zur Rechenschaft ziehen.", correct: true, explanation: "\"Zur Rechenschaft ziehen\" ist die feste politische Redewendung für Verantwortlichkeit einfordern." },
      { phrase: "Wir müssen unsere Politiker zur Rechenschaft mindern.", correct: false, explanation: "Grammatisch und semantisch falsch — man zieht zur Rechenschaft, man mindert sie nicht." },
      { phrase: "Politiker müssen für ihr Handeln geradestehen.", correct: false, explanation: "Korrekte Bedeutung, aber ohne die feste politische Formulierung." },
      { phrase: "Wir müssen unsere Politiker zur Rechenschaft zuteilen.", correct: false, explanation: "\"Zuteilen\" passt grammatisch nicht zu dieser Redewendung." },
    ],
  },
  {
    id: "zusammensteh",
    category: "Rede an die Nation",
    weakPhrase: "Alle im Land müssen jetzt zusammenhalten.",
    targetVerbStem: "zusammensteh",
    targetNounStem: "nation",
    scenario: "Sie halten eine Rede nach einer nationalen Krise.",
    options: [
      { phrase: "Jetzt, mehr denn je, muss unsere Nation zusammenstehen.", correct: true, explanation: "\"Zusammenstehen\" ist die klassische Formulierung für nationale Einheit in Reden." },
      { phrase: "Jetzt, mehr denn je, muss unsere Nation zusammenmindern.", correct: false, explanation: "Keine reale Kollokation — grammatisch und semantisch unsinnig." },
      { phrase: "Alle im Land müssen jetzt zusammenhalten.", correct: false, explanation: "Korrekte Bedeutung, aber ohne das erhöhte Register einer nationalen Ansprache." },
      { phrase: "Jetzt, mehr denn je, muss unsere Nation zusammenzuteilen.", correct: false, explanation: "Grammatisch fehlerhaft und keine reale Formulierung." },
    ],
  },
  {
    id: "vertrauen-wiederherstell",
    category: "Wahlkampf",
    weakPhrase: "Wir versprechen, die Dinge besser zu machen und ehrlich zu den Wählern zu sein.",
    targetVerbStem: "wiederherstell",
    targetNounStem: "vertrauen",
    scenario: "Sie beenden eine Wahlkampfrede kurz vor dem Wahltag.",
    options: [
      { phrase: "Wir setzen uns dafür ein, das Vertrauen der Bürger wiederherzustellen.", correct: true, explanation: "\"Vertrauen wiederherstellen\" ist die feste Formulierung für Wahlkampfrhetorik." },
      { phrase: "Wir setzen uns dafür ein, das Vertrauen der Bürger zu mindern.", correct: false, explanation: "\"Mindern\" kehrt die beabsichtigte Bedeutung um." },
      { phrase: "Wir versprechen, die Dinge besser zu machen.", correct: false, explanation: "Vage — kein konkretes Versprechen." },
      { phrase: "Wir setzen uns dafür ein, das Vertrauen der Bürger zuzuteilen.", correct: false, explanation: "\"Zuteilen\" passt nicht zu einer abstrakten Eigenschaft wie Vertrauen." },
    ],
  },
];

const POLITICIAN_CHALLENGES_FR: CollocationChallenge[] = [
  {
    id: "tendre-opposition",
    category: "Bipartisme",
    weakPhrase: "Nous devons travailler avec l'autre parti.",
    targetVerbStem: "tend",
    targetNounStem: "opposition",
    scenario: "Vous vous adressez à une assemblée divisée sur un projet de loi controversé.",
    options: [
      { phrase: "Nous devons tendre la main à l'opposition pour trouver un compromis.", correct: true, explanation: "\"Tendre la main\" à l'opposition est l'expression politique classique pour la coopération bipartisane." },
      { phrase: "Nous devons atténuer l'opposition pour trouver un compromis.", correct: false, explanation: "\"Atténuer\" ne s'associe pas à \"opposition\" dans ce sens." },
      { phrase: "Nous devons travailler avec l'autre parti.", correct: false, explanation: "Reste au registre basique — aucune rhétorique politique." },
      { phrase: "Nous devons allouer l'opposition pour trouver un compromis.", correct: false, explanation: "\"Allouer\" ne convient pas — on ne répartit pas l'opposition." },
    ],
  },
  {
    id: "soutien-base",
    category: "Campagne électorale",
    weakPhrase: "Beaucoup de gens au niveau local soutiennent notre campagne.",
    targetVerbStem: "constat",
    targetNounStem: "base",
    scenario: "Vous mobilisez des bénévoles avant une élection.",
    options: [
      { phrase: "Nous constatons un fort soutien de la base pour notre campagne.", correct: true, explanation: "\"Soutien de la base\" est le terme standard pour l'appui populaire organisé localement." },
      { phrase: "Nous constatons une forte répartition de la base pour notre campagne.", correct: false, explanation: "\"Répartition\" implique quelque chose distribué d'en haut — l'inverse du soutien de base." },
      { phrase: "Beaucoup de gens soutiennent notre campagne.", correct: false, explanation: "Perd le sens spécifique d'un soutien organisé localement." },
      { phrase: "Nous constatons un fort mandat de la base pour notre campagne.", correct: false, explanation: "Un \"mandat\" est obtenu après une élection, pas avant, de la base." },
    ],
  },
  {
    id: "tenir-responsable",
    category: "Gouvernance",
    weakPhrase: "Nous devons nous assurer que les dirigeants répondent de leurs actes.",
    targetVerbStem: "ten",
    targetNounStem: "responsable",
    scenario: "Vous réagissez à un scandale impliquant un responsable gouvernemental.",
    options: [
      { phrase: "Nous devons tenir nos dirigeants responsables de leurs actes.", correct: true, explanation: "\"Tenir responsable\" est l'expression fixe pour exiger des comptes." },
      { phrase: "Nous devons atténuer nos dirigeants responsables de leurs actes.", correct: false, explanation: "\"Atténuer\" ne s'associe pas grammaticalement à cette expression." },
      { phrase: "Les dirigeants doivent répondre de leurs actes.", correct: false, explanation: "Bonne signification, mais sans l'expression politique fixe." },
      { phrase: "Nous devons allouer nos dirigeants responsables de leurs actes.", correct: false, explanation: "\"Allouer\" ne convient pas grammaticalement ici." },
    ],
  },
  {
    id: "rester-unie",
    category: "Discours à la Nation",
    weakPhrase: "Tout le monde dans le pays doit s'unir maintenant.",
    targetVerbStem: "rest",
    targetNounStem: "uni",
    scenario: "Vous prononcez un discours après une crise nationale.",
    options: [
      { phrase: "Aujourd'hui plus que jamais, notre nation doit rester unie.", correct: true, explanation: "\"Rester uni\" est l'expression classique pour l'unité nationale dans un discours." },
      { phrase: "Aujourd'hui plus que jamais, notre nation doit atténuer unie.", correct: false, explanation: "N'est pas une collocation réelle — grammaticalement incohérent." },
      { phrase: "Tout le monde doit s'unir maintenant.", correct: false, explanation: "Bonne signification, mais sans le registre élevé attendu dans une adresse nationale." },
      { phrase: "Aujourd'hui plus que jamais, notre nation doit allouer unie.", correct: false, explanation: "Grammaticalement incorrect et sans sens." },
    ],
  },
  {
    id: "restaurer-confiance",
    category: "Campagne électorale",
    weakPhrase: "Nous promettons de faire mieux et d'être honnêtes envers les électeurs.",
    targetVerbStem: "restaur",
    targetNounStem: "confiance",
    scenario: "Vous concluez un discours de campagne avant le jour du scrutin.",
    options: [
      { phrase: "Nous nous engageons à restaurer la confiance et à tenir nos promesses.", correct: true, explanation: "\"Restaurer la confiance\" est l'expression fixe de la rhétorique de campagne." },
      { phrase: "Nous nous engageons à atténuer la confiance et à tenir nos promesses.", correct: false, explanation: "\"Atténuer\" inverse le sens voulu." },
      { phrase: "Nous promettons de faire mieux et d'être honnêtes.", correct: false, explanation: "Vague — aucun engagement spécifique." },
      { phrase: "Nous nous engageons à allouer la confiance et à tenir nos promesses.", correct: false, explanation: "\"Allouer\" ne convient pas à une qualité abstraite comme la confiance." },
    ],
  },
];

const POLITICIAN_CHALLENGES_ES: CollocationChallenge[] = [
  {
    id: "tender-puentes",
    category: "Bipartidismo",
    weakPhrase: "Necesitamos trabajar con el otro partido.",
    targetVerbStem: "tend",
    targetNounStem: "puentes",
    scenario: "Te diriges a un parlamento dividido sobre un proyecto de ley polémico.",
    options: [
      { phrase: "Debemos tender puentes con la oposición para encontrar un acuerdo.", correct: true, explanation: "\"Tender puentes\" es la expresión política clásica para la cooperación entre partidos." },
      { phrase: "Debemos mitigar puentes con la oposición para encontrar un acuerdo.", correct: false, explanation: "\"Mitigar\" no encaja con \"puentes\" — no son algo negativo que reducir." },
      { phrase: "Necesitamos trabajar con el otro partido.", correct: false, explanation: "Se queda en el registro básico — sin retórica política." },
      { phrase: "Debemos asignar puentes con la oposición para encontrar un acuerdo.", correct: false, explanation: "\"Asignar\" no encaja — los puentes se tienden, no se asignan." },
    ],
  },
  {
    id: "respaldo-base",
    category: "Campaña electoral",
    weakPhrase: "Mucha gente a nivel local apoya nuestra campaña.",
    targetVerbStem: "respald",
    targetNounStem: "base",
    scenario: "Estás movilizando voluntarios antes de una elección.",
    options: [
      { phrase: "Estamos viendo un fuerte respaldo de base para nuestra campaña.", correct: true, explanation: "\"Respaldo de base\" es el término estándar para el apoyo popular organizado localmente." },
      { phrase: "Estamos viendo una fuerte asignación de base para nuestra campaña.", correct: false, explanation: "\"Asignación\" implica algo distribuido desde arriba — lo opuesto al respaldo de base." },
      { phrase: "Mucha gente apoya nuestra campaña.", correct: false, explanation: "Pierde el significado específico de apoyo organizado a nivel local." },
      { phrase: "Estamos viendo un fuerte mandato de base para nuestra campaña.", correct: false, explanation: "Un \"mandato\" se obtiene después de una elección, no antes, desde la base." },
    ],
  },
  {
    id: "exigir-cuentas",
    category: "Gobernanza",
    weakPhrase: "Debemos asegurarnos de que los líderes respondan por sus actos.",
    targetVerbStem: "exig",
    targetNounStem: "cuentas",
    scenario: "Estás respondiendo a un escándalo que involucra a un funcionario del gobierno.",
    options: [
      { phrase: "Debemos exigir cuentas a nuestros líderes por sus actos.", correct: true, explanation: "\"Exigir cuentas\" es la expresión fija en español para pedir responsabilidad." },
      { phrase: "Debemos mitigar cuentas a nuestros líderes por sus actos.", correct: false, explanation: "\"Mitigar\" no se combina gramaticalmente con esta expresión." },
      { phrase: "Los líderes deben responder por sus actos.", correct: false, explanation: "Buen significado, pero sin la expresión política fija." },
      { phrase: "Debemos asignar cuentas a nuestros líderes por sus actos.", correct: false, explanation: "\"Asignar\" no transmite la idea de exigir responsabilidad." },
    ],
  },
  {
    id: "permanecer-unida",
    category: "Discurso a la Nación",
    weakPhrase: "Todos en el país deben unirse ahora.",
    targetVerbStem: "permanec",
    targetNounStem: "unida",
    scenario: "Estás dando un discurso tras una crisis nacional.",
    options: [
      { phrase: "Ahora, más que nunca, nuestra nación debe permanecer unida.", correct: true, explanation: "\"Permanecer unida\" es la expresión clásica para la unidad nacional en un discurso." },
      { phrase: "Ahora, más que nunca, nuestra nación debe mitigar unida.", correct: false, explanation: "No es una colocación real — incoherente gramaticalmente." },
      { phrase: "Todos deben unirse ahora.", correct: false, explanation: "Buen significado, pero sin el registro elevado de un discurso nacional." },
      { phrase: "Ahora, más que nunca, nuestra nación debe asignar unida.", correct: false, explanation: "Gramaticalmente incorrecto y sin sentido." },
    ],
  },
  {
    id: "restaurar-confianza",
    category: "Campaña electoral",
    weakPhrase: "Prometemos mejorar las cosas y ser honestos con los votantes.",
    targetVerbStem: "restaur",
    targetNounStem: "confianza",
    scenario: "Estás cerrando un discurso de campaña antes del día de las elecciones.",
    options: [
      { phrase: "Nos comprometemos a restaurar la confianza y cumplir nuestras promesas.", correct: true, explanation: "\"Restaurar la confianza\" es la expresión fija de la retórica de campaña." },
      { phrase: "Nos comprometemos a mitigar la confianza y cumplir nuestras promesas.", correct: false, explanation: "\"Mitigar\" invierte el sentido pretendido." },
      { phrase: "Prometemos mejorar las cosas y ser honestos.", correct: false, explanation: "Vago — ningún compromiso específico." },
      { phrase: "Nos comprometemos a asignar la confianza y cumplir nuestras promesas.", correct: false, explanation: "\"Asignar\" no encaja con una cualidad abstracta como la confianza." },
    ],
  },
];

const POLITICIAN_CHALLENGES_SV: CollocationChallenge[] = [
  {
    id: "bygga-broar",
    category: "Blocköverskridande",
    weakPhrase: "Vi måste samarbeta med det andra partiet.",
    targetVerbStem: "bygg",
    targetNounStem: "broar",
    scenario: "Du talar inför en splittrad riksdag om ett omstritt lagförslag.",
    options: [
      { phrase: "Vi måste bygga broar över partigränserna för att hitta en kompromiss.", correct: true, explanation: "\"Bygga broar\" är det klassiska svenska politiska uttrycket för att samarbeta över partigränser." },
      { phrase: "Vi måste begränsa broar över partigränserna för att hitta en kompromiss.", correct: false, explanation: "\"Begränsa\" passar inte — broar byggs, de begränsas inte." },
      { phrase: "Vi måste samarbeta med det andra partiet.", correct: false, explanation: "Stannar i basregistret — ingen politisk retorik." },
      { phrase: "Vi måste fördela broar över partigränserna för att hitta en kompromiss.", correct: false, explanation: "\"Fördela\" passar inte ihop med \"broar\" i den här betydelsen." },
    ],
  },
  {
    id: "grasrotsstod",
    category: "Valkampanj",
    weakPhrase: "Många människor lokalt stödjer vår kampanj.",
    targetVerbStem: "gräsrot",
    targetNounStem: "stöd",
    scenario: "Du mobiliserar volontärer inför ett val.",
    options: [
      { phrase: "Vi ser ett starkt gräsrotsstöd för vår kampanj.", correct: true, explanation: "\"Gräsrotsstöd\" är den fasta termen för organiserat stöd underifrån." },
      { phrase: "Vi ser en stark gräsrotsfördelning för vår kampanj.", correct: false, explanation: "\"Fördelning\" antyder något uppifrån utdelat — motsatsen till gräsrotsstöd." },
      { phrase: "Många människor stödjer vår kampanj.", correct: false, explanation: "Tappar den specifika betydelsen av organiserat lokalt stöd." },
      { phrase: "Vi ser ett starkt gräsrotsmandat för vår kampanj.", correct: false, explanation: "Ett \"mandat\" ges av väljarna efter ett val, inte innan av gräsrötterna." },
    ],
  },
  {
    id: "stalla-till-svars",
    category: "Styrning",
    weakPhrase: "Vi måste se till att ledare svarar för sina handlingar.",
    targetVerbStem: "ställ",
    targetNounStem: "svars",
    scenario: "Du bemöter en skandal som involverar en regeringstjänsteman.",
    options: [
      { phrase: "Vi måste ställa våra ledare till svars för sina handlingar.", correct: true, explanation: "\"Ställa till svars\" är det fasta svenska uttrycket för att kräva ansvar." },
      { phrase: "Vi måste begränsa våra ledare till svars för sina handlingar.", correct: false, explanation: "\"Begränsa\" passar inte grammatiskt in i det här uttrycket." },
      { phrase: "Ledare måste svara för sina handlingar.", correct: false, explanation: "Rätt betydelse, men utan det fasta politiska uttrycket." },
      { phrase: "Vi måste fördela våra ledare till svars för sina handlingar.", correct: false, explanation: "\"Fördela\" passar inte grammatiskt här." },
    ],
  },
  {
    id: "sta-enad",
    category: "Nationellt Tal",
    weakPhrase: "Alla i landet måste hålla ihop nu.",
    targetVerbStem: "stå",
    targetNounStem: "enad",
    scenario: "Du håller ett tal efter en nationell kris.",
    options: [
      { phrase: "Nu, mer än någonsin, måste vår nation stå enad.", correct: true, explanation: "\"Stå enad\" är det klassiska uttrycket för nationell enighet i tal." },
      { phrase: "Nu, mer än någonsin, måste vår nation begränsa enad.", correct: false, explanation: "Ingen verklig kollokation — grammatiskt osammanhängande." },
      { phrase: "Alla måste hålla ihop nu.", correct: false, explanation: "Rätt betydelse, men utan det upphöjda register som förväntas i ett nationellt tal." },
      { phrase: "Nu, mer än någonsin, måste vår nation fördela enad.", correct: false, explanation: "Grammatiskt felaktigt och betydelselöst." },
    ],
  },
  {
    id: "atterupprata-fortroende",
    category: "Valkampanj",
    weakPhrase: "Vi lovar att göra saker bättre och vara ärliga mot väljarna.",
    targetVerbStem: "återupprätt",
    targetNounStem: "förtroende",
    scenario: "Du avslutar ett kampanjtal inför valdagen.",
    options: [
      { phrase: "Vi är fast beslutna att återupprätta förtroendet och hålla våra löften.", correct: true, explanation: "\"Återupprätta förtroendet\" är det fasta uttrycket i kampanjretorik." },
      { phrase: "Vi är fast beslutna att begränsa förtroendet och hålla våra löften.", correct: false, explanation: "\"Begränsa\" vänder på den avsedda innebörden." },
      { phrase: "Vi lovar att göra saker bättre och vara ärliga.", correct: false, explanation: "Vagt — inget specifikt åtagande." },
      { phrase: "Vi är fast beslutna att fördela förtroendet och hålla våra löften.", correct: false, explanation: "\"Fördela\" passar inte en abstrakt kvalitet som förtroende." },
    ],
  },
];

const LAWYER_CHALLENGES_EN: CollocationChallenge[] = [
  {
    id: "burden-of-proof",
    category: "Trial Advocacy",
    weakPhrase: "We think the other side did not prove their case enough.",
    targetVerbStem: "meet",
    targetNounStem: "burden",
    scenario: "You're delivering a closing argument to the jury.",
    options: [
      { phrase: "The prosecution has failed to meet the burden of proof.", correct: true, explanation: "\"Meet the burden of proof\" is the standard legal phrase for the evidentiary standard being satisfied (or not)." },
      { phrase: "The prosecution has failed to mitigate the burden of proof.", correct: false, explanation: "You don't \"mitigate\" a burden of proof — you meet or fail to meet it." },
      { phrase: "The other side did not prove their case enough.", correct: false, explanation: "Correct meaning, but not the fixed legal terminology a jury expects from counsel." },
      { phrase: "The prosecution has failed to allocate the burden of proof.", correct: false, explanation: "The burden of proof is assigned by law, not something either side \"allocates\" in argument." },
    ],
  },
  {
    id: "breach-of-contract",
    category: "Civil Litigation",
    weakPhrase: "My client did not break the contract.",
    targetVerbStem: "breach",
    targetNounStem: "contract",
    scenario: "You're defending a client in a civil dispute.",
    options: [
      { phrase: "My client is not liable for any breach of contract.", correct: true, explanation: "\"Breach of contract\" plus \"liable\" is precise legal terminology, not just \"broke the contract\"." },
      { phrase: "My client is not liable for any mitigation of contract.", correct: false, explanation: "\"Mitigation\" is a separate legal concept (reducing damages) — it doesn't replace \"breach\" here." },
      { phrase: "My client did not break the contract.", correct: false, explanation: "This is the plain, basic version — no legal precision at all." },
      { phrase: "My client is not liable for any allocation of contract.", correct: false, explanation: "\"Allocation of contract\" isn't a legal term — the correct term is \"breach\"." },
    ],
  },
  {
    id: "beyond-reasonable-doubt",
    category: "Trial Advocacy",
    weakPhrase: "We are sure he did it because of all the proof.",
    targetVerbStem: "establish",
    targetNounStem: "doubt",
    scenario: "You're summarizing the prosecution's case to the jury.",
    options: [
      { phrase: "The evidence establishes guilt beyond a reasonable doubt.", correct: true, explanation: "\"Establish guilt beyond a reasonable doubt\" is the exact standard of proof in criminal law." },
      { phrase: "The evidence mitigates guilt beyond a reasonable doubt.", correct: false, explanation: "\"Mitigate\" would lessen guilt, not prove it — this reverses the intended meaning." },
      { phrase: "We are sure he did it because of the proof.", correct: false, explanation: "Casual and imprecise — not the fixed evidentiary standard the law requires." },
      { phrase: "The evidence allocates guilt beyond a reasonable doubt.", correct: false, explanation: "\"Allocate\" doesn't fit — guilt is established or proven, not allocated." },
    ],
  },
  {
    id: "exclude-inadmissible",
    category: "Trial Procedure",
    weakPhrase: "I don't think that evidence should be allowed.",
    targetVerbStem: "exclud",
    targetNounStem: "inadmissible",
    scenario: "You're objecting to evidence during a trial.",
    options: [
      { phrase: "I move to exclude this evidence as inadmissible.", correct: true, explanation: "\"Move to exclude\" plus \"inadmissible\" is the formal courtroom phrasing for this objection." },
      { phrase: "I move to mitigate this evidence as inadmissible.", correct: false, explanation: "You exclude inadmissible evidence — you don't \"mitigate\" it." },
      { phrase: "I don't think that evidence should be allowed.", correct: false, explanation: "Conversational — not the formal motion language a court expects." },
      { phrase: "I move to allocate this evidence as inadmissible.", correct: false, explanation: "\"Allocate\" doesn't fit — the correct verb for this legal motion is \"exclude\"." },
    ],
  },
  {
    id: "resolve-arbitration",
    category: "Negotiation",
    weakPhrase: "We want to settle this without going to court.",
    targetVerbStem: "resolv",
    targetNounStem: "arbitration",
    scenario: "You're negotiating a settlement before trial.",
    options: [
      { phrase: "We propose to resolve this matter through arbitration.", correct: true, explanation: "\"Resolve through arbitration\" is standard language for alternative dispute resolution." },
      { phrase: "We propose to mitigate this matter through arbitration.", correct: false, explanation: "\"Mitigate\" doesn't fit — arbitration resolves a dispute, it doesn't lessen it." },
      { phrase: "We want to settle this without going to court.", correct: false, explanation: "Plain language — accurate, but not the formal register used in negotiation correspondence." },
      { phrase: "We propose to allocate this matter through arbitration.", correct: false, explanation: "\"Allocate\" doesn't fit a legal dispute — the correct verb is \"resolve\"." },
    ],
  },
];

const LAWYER_CHALLENGES_DE: CollocationChallenge[] = [
  {
    id: "beweislast-erfuell",
    category: "Plädoyer",
    weakPhrase: "Wir glauben, die Gegenseite hat ihren Fall nicht ausreichend bewiesen.",
    targetVerbStem: "erfüll",
    targetNounStem: "beweislast",
    scenario: "Sie halten ein Schlussplädoyer vor den Geschworenen.",
    options: [
      { phrase: "Die Staatsanwaltschaft konnte die Beweislast nicht erfüllen.", correct: true, explanation: "\"Die Beweislast erfüllen\" ist der feste juristische Begriff für den erforderlichen Beweisstandard." },
      { phrase: "Die Staatsanwaltschaft konnte die Beweislast nicht mindern.", correct: false, explanation: "Eine Beweislast wird erfüllt oder nicht erfüllt — nicht \"gemindert\"." },
      { phrase: "Die Gegenseite hat ihren Fall nicht ausreichend bewiesen.", correct: false, explanation: "Korrekte Bedeutung, aber nicht die feste juristische Terminologie." },
      { phrase: "Die Staatsanwaltschaft konnte die Beweislast nicht zuteilen.", correct: false, explanation: "Die Beweislast wird gesetzlich zugewiesen, nicht im Plädoyer \"zugeteilt\"." },
    ],
  },
  {
    id: "vertragsverletzung",
    category: "Zivilprozess",
    weakPhrase: "Mein Mandant hat den Vertrag nicht gebrochen.",
    targetVerbStem: "haft",
    targetNounStem: "vertragsverletzung",
    scenario: "Sie verteidigen einen Mandanten in einem zivilrechtlichen Streit.",
    options: [
      { phrase: "Mein Mandant haftet nicht für eine Vertragsverletzung.", correct: true, explanation: "\"Vertragsverletzung\" plus \"haften\" ist präzise juristische Terminologie, nicht nur \"den Vertrag gebrochen\"." },
      { phrase: "Mein Mandant haftet nicht für eine Vertragsminderung.", correct: false, explanation: "\"Vertragsminderung\" ist ein anderer Rechtsbegriff — hier passt \"Vertragsverletzung\"." },
      { phrase: "Mein Mandant hat den Vertrag nicht gebrochen.", correct: false, explanation: "Die einfache Version — keine juristische Präzision." },
      { phrase: "Mein Mandant haftet nicht für eine Vertragszuteilung.", correct: false, explanation: "\"Vertragszuteilung\" ist kein juristischer Begriff — korrekt ist \"Vertragsverletzung\"." },
    ],
  },
  {
    id: "zweifelsfrei",
    category: "Plädoyer",
    weakPhrase: "Wir sind sicher, dass er es getan hat, wegen all der Beweise.",
    targetVerbStem: "begründ",
    targetNounStem: "zweifelsfrei",
    scenario: "Sie fassen den Fall der Anklage vor den Geschworenen zusammen.",
    options: [
      { phrase: "Die Beweise begründen die Schuld zweifelsfrei.", correct: true, explanation: "\"Schuld zweifelsfrei begründen\" ist der exakte strafrechtliche Beweisstandard." },
      { phrase: "Die Beweise mindern die Schuld zweifelsfrei.", correct: false, explanation: "\"Mindern\" würde die Schuld verringern, nicht beweisen — kehrt den Sinn um." },
      { phrase: "Wir sind sicher, dass er es getan hat, wegen der Beweise.", correct: false, explanation: "Umgangssprachlich — nicht der gesetzlich geforderte Beweisstandard." },
      { phrase: "Die Beweise zuteilen die Schuld zweifelsfrei.", correct: false, explanation: "Grammatisch und semantisch unsinnig — Schuld wird begründet, nicht zugeteilt." },
    ],
  },
  {
    id: "unzulaessig-ausschliess",
    category: "Verfahrensrecht",
    weakPhrase: "Ich denke nicht, dass dieser Beweis zugelassen werden sollte.",
    targetVerbStem: "ausschließ",
    targetNounStem: "unzulässig",
    scenario: "Sie erheben Einspruch gegen einen Beweis während der Verhandlung.",
    options: [
      { phrase: "Ich beantrage, diesen Beweis als unzulässig auszuschließen.", correct: true, explanation: "\"Als unzulässig ausschließen\" ist die formelle prozessuale Formulierung für diesen Einspruch." },
      { phrase: "Ich beantrage, diesen Beweis als unzulässig zu mindern.", correct: false, explanation: "Man schließt unzulässige Beweise aus — man \"mindert\" sie nicht." },
      { phrase: "Ich denke nicht, dass dieser Beweis zugelassen werden sollte.", correct: false, explanation: "Umgangssprachlich — nicht die formelle Antragssprache vor Gericht." },
      { phrase: "Ich beantrage, diesen Beweis als unzulässig zuzuteilen.", correct: false, explanation: "\"Zuteilen\" passt grammatisch nicht zu diesem Verfahrensantrag." },
    ],
  },
  {
    id: "schiedsverfahren",
    category: "Verhandlung",
    weakPhrase: "Wir wollen das ohne Gericht klären.",
    targetVerbStem: "klär",
    targetNounStem: "schiedsverfahren",
    scenario: "Sie verhandeln einen Vergleich vor dem Prozess.",
    options: [
      { phrase: "Wir schlagen vor, diese Angelegenheit im Schiedsverfahren zu klären.", correct: true, explanation: "\"Im Schiedsverfahren klären\" ist die Standardformulierung für alternative Streitbeilegung." },
      { phrase: "Wir schlagen vor, diese Angelegenheit im Schiedsverfahren zu mindern.", correct: false, explanation: "Ein Schiedsverfahren klärt einen Streit — es \"mindert\" ihn nicht." },
      { phrase: "Wir wollen das ohne Gericht klären.", correct: false, explanation: "Einfache Sprache — korrekt, aber nicht das formelle Register juristischer Korrespondenz." },
      { phrase: "Wir schlagen vor, diese Angelegenheit im Schiedsverfahren zuzuteilen.", correct: false, explanation: "\"Zuteilen\" passt nicht zu einem Rechtsstreit — korrekt ist \"klären\"." },
    ],
  },
];

const LAWYER_CHALLENGES_FR: CollocationChallenge[] = [
  {
    id: "charge-preuve",
    category: "Plaidoirie",
    weakPhrase: "Nous pensons que l'autre partie n'a pas suffisamment prouvé son cas.",
    targetVerbStem: "acquitt",
    targetNounStem: "preuve",
    scenario: "Vous prononcez une plaidoirie finale devant le jury.",
    options: [
      { phrase: "L'accusation n'a pas réussi à s'acquitter de la charge de la preuve.", correct: true, explanation: "\"S'acquitter de la charge de la preuve\" est le terme juridique exact pour cette norme de preuve." },
      { phrase: "L'accusation n'a pas réussi à atténuer la charge de la preuve.", correct: false, explanation: "On s'acquitte d'une charge de la preuve — on ne l'\"atténue\" pas." },
      { phrase: "L'autre partie n'a pas suffisamment prouvé son cas.", correct: false, explanation: "Bonne signification, mais sans la terminologie juridique précise." },
      { phrase: "L'accusation n'a pas réussi à allouer la charge de la preuve.", correct: false, explanation: "\"Allouer\" ne convient pas — la charge de la preuve est fixée par la loi, pas allouée." },
    ],
  },
  {
    id: "rupture-contrat",
    category: "Contentieux civil",
    weakPhrase: "Mon client n'a pas rompu le contrat.",
    targetVerbStem: "respons",
    targetNounStem: "rupture",
    scenario: "Vous défendez un client dans un litige civil.",
    options: [
      { phrase: "Mon client n'est pas responsable d'une rupture de contrat.", correct: true, explanation: "\"Rupture de contrat\" plus \"responsable\" est la terminologie juridique précise." },
      { phrase: "Mon client n'est pas responsable d'une atténuation de contrat.", correct: false, explanation: "\"Atténuation de contrat\" n'est pas un terme juridique — le terme correct est \"rupture\"." },
      { phrase: "Mon client n'a pas rompu le contrat.", correct: false, explanation: "La version simple — aucune précision juridique." },
      { phrase: "Mon client n'est pas responsable d'une allocation de contrat.", correct: false, explanation: "\"Allocation de contrat\" n'existe pas en droit — le terme correct est \"rupture\"." },
    ],
  },
  {
    id: "doute-raisonnable",
    category: "Plaidoirie",
    weakPhrase: "Nous sommes sûrs qu'il l'a fait à cause de toutes les preuves.",
    targetVerbStem: "établi",
    targetNounStem: "doute",
    scenario: "Vous résumez le dossier de l'accusation devant le jury.",
    options: [
      { phrase: "Les preuves établissent la culpabilité au-delà de tout doute raisonnable.", correct: true, explanation: "\"Établir la culpabilité au-delà de tout doute raisonnable\" est la norme de preuve exacte en droit pénal." },
      { phrase: "Les preuves atténuent la culpabilité au-delà de tout doute raisonnable.", correct: false, explanation: "\"Atténuer\" réduirait la culpabilité au lieu de la prouver — inverse le sens." },
      { phrase: "Nous sommes sûrs qu'il l'a fait à cause des preuves.", correct: false, explanation: "Familier — pas la norme de preuve exigée par la loi." },
      { phrase: "Les preuves allouent la culpabilité au-delà de tout doute raisonnable.", correct: false, explanation: "\"Allouer\" ne convient pas — la culpabilité est établie, pas allouée." },
    ],
  },
  {
    id: "exclure-irrecevable",
    category: "Procédure de procès",
    weakPhrase: "Je ne pense pas que cette preuve devrait être autorisée.",
    targetVerbStem: "exclu",
    targetNounStem: "irrecevable",
    scenario: "Vous vous opposez à une preuve pendant le procès.",
    options: [
      { phrase: "Je demande à exclure cette preuve comme irrecevable.", correct: true, explanation: "\"Exclure ... comme irrecevable\" est la formulation formelle de cette objection au tribunal." },
      { phrase: "Je demande à atténuer cette preuve comme irrecevable.", correct: false, explanation: "On exclut une preuve irrecevable — on ne l'\"atténue\" pas." },
      { phrase: "Je ne pense pas que cette preuve devrait être autorisée.", correct: false, explanation: "Familier — pas le langage formel qu'un tribunal attend." },
      { phrase: "Je demande à allouer cette preuve comme irrecevable.", correct: false, explanation: "\"Allouer\" ne convient pas grammaticalement à cette requête." },
    ],
  },
  {
    id: "resoudre-arbitrage",
    category: "Négociation",
    weakPhrase: "Nous voulons régler cela sans aller au tribunal.",
    targetVerbStem: "résoud",
    targetNounStem: "arbitrage",
    scenario: "Vous négociez un règlement avant le procès.",
    options: [
      { phrase: "Nous proposons de résoudre cette affaire par voie d'arbitrage.", correct: true, explanation: "\"Résoudre par voie d'arbitrage\" est le langage standard pour un mode alternatif de résolution des conflits." },
      { phrase: "Nous proposons d'atténuer cette affaire par voie d'arbitrage.", correct: false, explanation: "L'arbitrage résout un litige — il ne l'\"atténue\" pas." },
      { phrase: "Nous voulons régler cela sans aller au tribunal.", correct: false, explanation: "Langage simple — correct, mais pas le registre formel utilisé en négociation." },
      { phrase: "Nous proposons d'allouer cette affaire par voie d'arbitrage.", correct: false, explanation: "\"Allouer\" ne convient pas à un litige — le verbe correct est \"résoudre\"." },
    ],
  },
];

const LAWYER_CHALLENGES_ES: CollocationChallenge[] = [
  {
    id: "carga-prueba",
    category: "Alegato",
    weakPhrase: "Creemos que la otra parte no probó su caso lo suficiente.",
    targetVerbStem: "cumpl",
    targetNounStem: "carga",
    scenario: "Estás presentando un alegato final ante el jurado.",
    options: [
      { phrase: "La fiscalía no ha logrado cumplir con la carga de la prueba.", correct: true, explanation: "\"Cumplir con la carga de la prueba\" es el término jurídico exacto para este estándar probatorio." },
      { phrase: "La fiscalía no ha logrado mitigar la carga de la prueba.", correct: false, explanation: "Se cumple o no se cumple con la carga de la prueba — no se \"mitiga\"." },
      { phrase: "La otra parte no probó su caso lo suficiente.", correct: false, explanation: "Buen significado, pero sin la terminología jurídica precisa." },
      { phrase: "La fiscalía no ha logrado asignar la carga de la prueba.", correct: false, explanation: "La carga de la prueba la asigna la ley, no se \"asigna\" en el alegato." },
    ],
  },
  {
    id: "incumplimiento-contrato",
    category: "Litigio civil",
    weakPhrase: "Mi cliente no rompió el contrato.",
    targetVerbStem: "respons",
    targetNounStem: "incumplimiento",
    scenario: "Estás defendiendo a un cliente en una disputa civil.",
    options: [
      { phrase: "Mi cliente no es responsable de un incumplimiento de contrato.", correct: true, explanation: "\"Incumplimiento de contrato\" plus \"responsable\" es terminología jurídica precisa." },
      { phrase: "Mi cliente no es responsable de una mitigación de contrato.", correct: false, explanation: "\"Mitigación de contrato\" no es el término correcto — es \"incumplimiento\"." },
      { phrase: "Mi cliente no rompió el contrato.", correct: false, explanation: "La versión simple — sin precisión jurídica." },
      { phrase: "Mi cliente no es responsable de una asignación de contrato.", correct: false, explanation: "\"Asignación de contrato\" no es un término jurídico real." },
    ],
  },
  {
    id: "duda-razonable",
    category: "Alegato",
    weakPhrase: "Estamos seguros de que lo hizo por todas las pruebas.",
    targetVerbStem: "establec",
    targetNounStem: "duda",
    scenario: "Estás resumiendo el caso de la fiscalía ante el jurado.",
    options: [
      { phrase: "Las pruebas establecen la culpabilidad más allá de toda duda razonable.", correct: true, explanation: "\"Establecer la culpabilidad más allá de toda duda razonable\" es el estándar probatorio exacto en derecho penal." },
      { phrase: "Las pruebas mitigan la culpabilidad más allá de toda duda razonable.", correct: false, explanation: "\"Mitigar\" reduciría la culpabilidad en vez de probarla — invierte el sentido." },
      { phrase: "Estamos seguros de que lo hizo por las pruebas.", correct: false, explanation: "Coloquial — no el estándar probatorio exigido por la ley." },
      { phrase: "Las pruebas asignan la culpabilidad más allá de toda duda razonable.", correct: false, explanation: "\"Asignar\" no encaja — la culpabilidad se establece, no se asigna." },
    ],
  },
  {
    id: "excluir-inadmisible",
    category: "Procedimiento judicial",
    weakPhrase: "No creo que esa prueba deba permitirse.",
    targetVerbStem: "exclu",
    targetNounStem: "inadmisible",
    scenario: "Te opones a una prueba durante el juicio.",
    options: [
      { phrase: "Solicito excluir esta prueba por ser inadmisible.", correct: true, explanation: "\"Excluir ... inadmisible\" es la formulación formal de esta objeción en el tribunal." },
      { phrase: "Solicito mitigar esta prueba por ser inadmisible.", correct: false, explanation: "Se excluye una prueba inadmisible — no se \"mitiga\"." },
      { phrase: "No creo que esa prueba deba permitirse.", correct: false, explanation: "Coloquial — no el lenguaje formal de una moción judicial." },
      { phrase: "Solicito asignar esta prueba por ser inadmisible.", correct: false, explanation: "\"Asignar\" no encaja gramaticalmente con esta moción." },
    ],
  },
  {
    id: "resolver-arbitraje",
    category: "Negociación",
    weakPhrase: "Queremos resolver esto sin ir a juicio.",
    targetVerbStem: "resolv",
    targetNounStem: "arbitraje",
    scenario: "Estás negociando un acuerdo antes del juicio.",
    options: [
      { phrase: "Proponemos resolver este asunto mediante arbitraje.", correct: true, explanation: "\"Resolver mediante arbitraje\" es el lenguaje estándar para la resolución alternativa de conflictos." },
      { phrase: "Proponemos mitigar este asunto mediante arbitraje.", correct: false, explanation: "El arbitraje resuelve una disputa — no la \"mitiga\"." },
      { phrase: "Queremos resolver esto sin ir a juicio.", correct: false, explanation: "Lenguaje simple — correcto, pero no el registro formal usado en negociaciones." },
      { phrase: "Proponemos asignar este asunto mediante arbitraje.", correct: false, explanation: "\"Asignar\" no encaja con una disputa legal — el verbo correcto es \"resolver\"." },
    ],
  },
];

const LAWYER_CHALLENGES_SV: CollocationChallenge[] = [
  {
    id: "bevisborda-uppfyll",
    category: "Pläderande",
    weakPhrase: "Vi tycker att motparten inte bevisade sin sak tillräckligt.",
    targetVerbStem: "uppfyll",
    targetNounStem: "bevisbörd",
    scenario: "Du håller ett slutplädering inför juryn.",
    options: [
      { phrase: "Åklagaren har misslyckats med att uppfylla bevisbördan.", correct: true, explanation: "\"Uppfylla bevisbördan\" är den fasta juridiska termen för det beviskrav som gäller." },
      { phrase: "Åklagaren har misslyckats med att begränsa bevisbördan.", correct: false, explanation: "Bevisbördan uppfylls eller uppfylls inte — den \"begränsas\" inte." },
      { phrase: "Motparten bevisade inte sin sak tillräckligt.", correct: false, explanation: "Rätt betydelse, men utan den precisa juridiska terminologin." },
      { phrase: "Åklagaren har misslyckats med att fördela bevisbördan.", correct: false, explanation: "Bevisbördan är lagreglerad, inte något som \"fördelas\" i pläderingen." },
    ],
  },
  {
    id: "avtalsbrott",
    category: "Civilrättslig Tvist",
    weakPhrase: "Min klient bröt inte mot avtalet.",
    targetVerbStem: "ansvar",
    targetNounStem: "avtalsbrott",
    scenario: "Du försvarar en klient i en civilrättslig tvist.",
    options: [
      { phrase: "Min klient är inte ansvarig för avtalsbrott.", correct: true, explanation: "\"Avtalsbrott\" plus \"ansvarig\" är precis juridisk terminologi." },
      { phrase: "Min klient är inte ansvarig för avtalsbegränsning.", correct: false, explanation: "\"Avtalsbegränsning\" är inte rätt term — korrekt är \"avtalsbrott\"." },
      { phrase: "Min klient bröt inte mot avtalet.", correct: false, explanation: "Den enkla versionen — ingen juridisk precision." },
      { phrase: "Min klient är inte ansvarig för avtalsfördelning.", correct: false, explanation: "\"Avtalsfördelning\" är inte en juridisk term — korrekt är \"avtalsbrott\"." },
    ],
  },
  {
    id: "bortom-rimligt-tvivel",
    category: "Pläderande",
    weakPhrase: "Vi är säkra på att han gjorde det på grund av alla bevis.",
    targetVerbStem: "fastställ",
    targetNounStem: "tvivel",
    scenario: "Du sammanfattar åklagarens fall inför juryn.",
    options: [
      { phrase: "Bevisningen fastställer skuld bortom rimligt tvivel.", correct: true, explanation: "\"Fastställa skuld bortom rimligt tvivel\" är den exakta beviströskeln i brottmål." },
      { phrase: "Bevisningen begränsar skuld bortom rimligt tvivel.", correct: false, explanation: "\"Begränsa\" skulle minska skulden istället för att bevisa den — vänder på innebörden." },
      { phrase: "Vi är säkra på att han gjorde det på grund av bevisen.", correct: false, explanation: "Vardagligt — inte det beviskrav lagen ställer." },
      { phrase: "Bevisningen fördelar skuld bortom rimligt tvivel.", correct: false, explanation: "\"Fördela\" passar inte — skuld fastställs, den fördelas inte." },
    ],
  },
  {
    id: "otillaten-uteslut",
    category: "Rättegångsförfarande",
    weakPhrase: "Jag tycker inte att den bevisningen ska tillåtas.",
    targetVerbStem: "uteslut",
    targetNounStem: "otillåten",
    scenario: "Du invänder mot bevisning under rättegången.",
    options: [
      { phrase: "Jag yrkar på att utesluta denna bevisning som otillåten.", correct: true, explanation: "\"Utesluta ... som otillåten\" är den formella processuella formuleringen för denna invändning." },
      { phrase: "Jag yrkar på att begränsa denna bevisning som otillåten.", correct: false, explanation: "Otillåten bevisning utesluts — den \"begränsas\" inte." },
      { phrase: "Jag tycker inte att den bevisningen ska tillåtas.", correct: false, explanation: "Vardagligt — inte det formella yrkandespråk domstolen förväntar sig." },
      { phrase: "Jag yrkar på att fördela denna bevisning som otillåten.", correct: false, explanation: "\"Fördela\" passar grammatiskt inte till detta processuella yrkande." },
    ],
  },
  {
    id: "skiljeforfarande",
    category: "Förhandling",
    weakPhrase: "Vi vill lösa det här utan att gå till domstol.",
    targetVerbStem: "lös",
    targetNounStem: "skiljeförfarande",
    scenario: "Du förhandlar om en förlikning före rättegången.",
    options: [
      { phrase: "Vi föreslår att lösa denna fråga genom skiljeförfarande.", correct: true, explanation: "\"Lösa genom skiljeförfarande\" är standarduttrycket för alternativ tvistlösning." },
      { phrase: "Vi föreslår att begränsa denna fråga genom skiljeförfarande.", correct: false, explanation: "Ett skiljeförfarande löser en tvist — det \"begränsar\" den inte." },
      { phrase: "Vi vill lösa det här utan att gå till domstol.", correct: false, explanation: "Enkelt språk — korrekt, men inte det formella register som används i förhandlingar." },
      { phrase: "Vi föreslår att fördela denna fråga genom skiljeförfarande.", correct: false, explanation: "\"Fördela\" passar inte en rättstvist — rätt verb är \"lösa\"." },
    ],
  },
];

const CHALLENGES_BY_PROFILE_AND_LANGUAGE: Record<
  ProfileId,
  Partial<Record<LanguageCode, CollocationChallenge[]>>
> = {
  executive: EXECUTIVE_CHALLENGES_BY_LANGUAGE,
  politician: {
    en: POLITICIAN_CHALLENGES_EN,
    de: POLITICIAN_CHALLENGES_DE,
    fr: POLITICIAN_CHALLENGES_FR,
    es: POLITICIAN_CHALLENGES_ES,
    sv: POLITICIAN_CHALLENGES_SV,
  },
  lawyer: {
    en: LAWYER_CHALLENGES_EN,
    de: LAWYER_CHALLENGES_DE,
    fr: LAWYER_CHALLENGES_FR,
    es: LAWYER_CHALLENGES_ES,
    sv: LAWYER_CHALLENGES_SV,
  },
};

export interface CollocationSession {
  challenges: CollocationChallenge[];
  /** The language actually used — falls back to English if the chosen
   * profile doesn't have content in the requested language yet. */
  usedLanguage: LanguageCode;
}

export function pickSession(profile: ProfileId, language: LanguageCode, size = 5): CollocationSession {
  const byLanguage = CHALLENGES_BY_PROFILE_AND_LANGUAGE[profile];
  const usedLanguage: LanguageCode = byLanguage[language] ? language : "en";
  const all = byLanguage[usedLanguage] ?? [];
  const shuffled = [...all].sort(() => Math.random() - 0.5);
  return { challenges: shuffled.slice(0, Math.min(size, shuffled.length)), usedLanguage };
}
