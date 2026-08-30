import type { LanguageCode } from "@/lib/languages";

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
const CHALLENGES_BY_LANGUAGE: Record<LanguageCode, CollocationChallenge[]> = {
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
      category: "Risk & Strategy",
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
      category: "Strategy",
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
      category: "Financial",
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
      category: "Growth & Performance",
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
      category: "Leadership & Compliance",
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
      category: "Risk & Strategy",
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
      category: "Strategy",
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
      category: "Financial",
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
      category: "Growth & Performance",
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
      category: "Leadership & Compliance",
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
      category: "Risk & Strategy",
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
      category: "Strategy",
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
      category: "Financial",
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
      category: "Growth & Performance",
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
      category: "Leadership & Compliance",
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
      category: "Risk & Strategy",
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
      category: "Strategy",
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
      category: "Financial",
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
      category: "Growth & Performance",
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
      category: "Leadership & Compliance",
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

export function pickSession(language: LanguageCode, size = 5): CollocationChallenge[] {
  const all = CHALLENGES_BY_LANGUAGE[language];
  const shuffled = [...all].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(size, shuffled.length));
}
