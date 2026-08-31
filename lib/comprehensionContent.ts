import type { LanguageCode } from "@/lib/languages";

export interface ComprehensionPassage {
  id: string;
  topic: string;
  title: string;
  text: string;
  /** Sophisticated vocabulary/phrases actually present in the text. */
  advancedTerms: string[];
  /** Short phrases representing the passage's core facts, for content-coverage scoring. */
  keyPoints: string[];
}

/**
 * Short, professional-register passages across a few business topics, per
 * language — read aloud via the browser's TTS, never shown as text during
 * the exercise. English has more passages since it was the original target
 * skill; German/French/Spanish/Swedish have a smaller starter set that's
 * easy to extend the same way.
 */
const PASSAGES_BY_LANGUAGE: Record<LanguageCode, ComprehensionPassage[]> = {
  en: [
    {
      id: "market-correction",
      topic: "Economics",
      title: "Market Correction",
      text: "Last quarter, the company's stock price fell sharply after a series of strategic miscalculations by senior management. Analysts pointed to an overreliance on a single revenue stream, which left the firm vulnerable when consumer demand shifted unexpectedly. Furthermore, rising interest rates increased borrowing costs, squeezing profit margins even further. In response, the board initiated a comprehensive restructuring plan, diversifying the company's portfolio and cutting non-essential expenditures. While the downturn was significant, executives remain cautiously optimistic that these measures will restore investor confidence within the next two fiscal years.",
      advancedTerms: [
        "strategic miscalculations", "overreliance", "revenue stream",
        "profit margins", "restructuring", "diversifying", "expenditures",
        "cautiously optimistic",
      ],
      keyPoints: [
        "stock price fell", "strategic miscalculations", "single revenue stream",
        "rising interest rates", "restructuring plan", "diversifying portfolio",
      ],
    },
    {
      id: "startup-funding",
      topic: "Economics",
      title: "Startup Funding",
      text: "The fledgling startup secured a substantial round of venture capital after months of negotiations with prospective investors. Rather than pursuing rapid, unchecked expansion, the founders opted for a measured growth strategy, prioritizing sustainable revenue over sheer scale. This approach reassured investors who had grown wary of startups that prioritized valuation over viability. The funding will primarily be allocated toward research and development, along with strategic hires in engineering and sales. Industry observers suggest that this disciplined approach could position the company favorably compared to competitors burning through capital at an unsustainable rate.",
      advancedTerms: [
        "fledgling", "venture capital", "prospective investors",
        "measured growth strategy", "sustainable revenue", "valuation",
        "viability", "disciplined approach", "unsustainable rate",
      ],
      keyPoints: [
        "venture capital secured", "measured growth strategy", "sustainable revenue",
        "research and development", "strategic hires", "disciplined approach",
      ],
    },
    {
      id: "remote-work-culture",
      topic: "Leadership",
      title: "Remote Work Culture",
      text: "When the organization transitioned to a fully remote model, leadership quickly realized that traditional management practices were no longer effective. Consequently, managers shifted their focus from monitoring hours worked to evaluating measurable outcomes. This cultural shift required a significant investment in trust and transparent communication across all levels of the hierarchy. Some employees initially struggled with the lack of structure, whereas others thrived under the newfound autonomy. To address this disparity, the company introduced flexible check-ins and clearer performance benchmarks, ultimately fostering a more inclusive and adaptable work environment.",
      advancedTerms: [
        "transitioned", "measurable outcomes", "cultural shift",
        "transparent communication", "hierarchy", "autonomy", "disparity",
        "performance benchmarks", "adaptable",
      ],
      keyPoints: [
        "remote model transition", "monitoring hours to outcomes", "trust and communication",
        "employees struggled vs thrived", "flexible check-ins", "performance benchmarks",
      ],
    },
    {
      id: "crisis-management",
      topic: "Leadership",
      title: "Crisis Management",
      text: "Following a widely publicized product recall, the chief executive faced mounting pressure to address concerns from both customers and shareholders. Rather than downplaying the severity of the situation, she chose to acknowledge the failure candidly and outline a concrete plan for remediation. This transparency, though initially risky, ultimately bolstered public trust and mitigated long-term reputational damage. Internally, the company overhauled its quality assurance processes to prevent similar incidents. Industry experts later cited this response as a textbook example of effective crisis communication under intense scrutiny.",
      advancedTerms: [
        "mounting pressure", "downplaying", "candidly", "remediation",
        "bolstered", "mitigated", "reputational damage", "overhauled",
        "quality assurance", "scrutiny",
      ],
      keyPoints: [
        "product recall", "CEO acknowledged failure", "plan for remediation",
        "public trust", "quality assurance overhaul", "crisis communication",
      ],
    },
    {
      id: "ai-adoption",
      topic: "Technology",
      title: "AI Adoption",
      text: "As artificial intelligence tools became increasingly sophisticated, the manufacturing firm began integrating automated systems into its production line. Initially, employees expressed apprehension, fearing that the technology would render their roles obsolete. However, management emphasized that the goal was to augment human capabilities rather than replace them entirely. Workers were retrained to oversee and fine-tune the automated processes, shifting their responsibilities toward higher-value tasks. Over time, productivity increased substantially, and employee satisfaction improved as repetitive, tedious work was delegated to machines.",
      advancedTerms: [
        "sophisticated", "integrating", "apprehension", "obsolete", "augment",
        "retrained", "higher-value tasks", "productivity", "delegated",
      ],
      keyPoints: [
        "AI integration in manufacturing", "employees feared obsolescence",
        "augment not replace", "workers retrained", "productivity increased",
      ],
    },
    {
      id: "cybersecurity-breach",
      topic: "Technology",
      title: "Cybersecurity Breach",
      text: "The company disclosed that hackers had exploited a previously unknown vulnerability, compromising sensitive customer data over several weeks before detection. In the aftermath, the organization scrambled to contain the breach, notifying affected users and regulatory authorities as required by law. Cybersecurity experts criticized the firm for inadequate monitoring systems, which allowed the intrusion to go unnoticed for so long. In response, the company committed to a substantial investment in threat detection infrastructure and pledged greater transparency regarding future incidents.",
      advancedTerms: [
        "disclosed", "exploited", "vulnerability", "compromising",
        "regulatory authorities", "inadequate monitoring", "intrusion",
        "threat detection infrastructure", "transparency",
      ],
      keyPoints: [
        "hackers exploited vulnerability", "customer data compromised",
        "notified users and regulators", "inadequate monitoring criticized",
        "investment in threat detection",
      ],
    },
  ],
  de: [
    {
      id: "marktkorrektur",
      topic: "Wirtschaft",
      title: "Marktkorrektur",
      text: "Im vergangenen Quartal fiel der Aktienkurs des Unternehmens deutlich, nachdem das Management mehrere strategische Fehleinschätzungen getroffen hatte. Analysten wiesen auf eine übermäßige Abhängigkeit von einer einzigen Umsatzquelle hin, die das Unternehmen anfällig machte, als sich die Nachfrage der Verbraucher unerwartet änderte. Zudem erhöhten steigende Zinssätze die Finanzierungskosten und schmälerten die Gewinnmargen weiter. Daraufhin leitete der Vorstand einen umfassenden Restrukturierungsplan ein, diversifizierte das Portfolio des Unternehmens und kürzte unwesentliche Ausgaben.",
      advancedTerms: [
        "strategische Fehleinschätzungen", "übermäßige Abhängigkeit", "Umsatzquelle",
        "Gewinnmargen", "Restrukturierungsplan", "diversifizierte",
      ],
      keyPoints: [
        "Aktienkurs fiel", "strategische Fehleinschätzungen", "einzige Umsatzquelle",
        "steigende Zinssätze", "Restrukturierungsplan", "diversifizierte Portfolio",
      ],
    },
    {
      id: "fernarbeitskultur",
      topic: "Führung",
      title: "Fernarbeitskultur",
      text: "Als das Unternehmen vollständig auf Fernarbeit umstellte, erkannte die Führungsebene schnell, dass traditionelle Managementmethoden nicht mehr wirksam waren. Folglich verlagerten Führungskräfte ihren Fokus von der Kontrolle der Arbeitsstunden auf die Bewertung messbarer Ergebnisse. Dieser kulturelle Wandel erforderte erhebliche Investitionen in Vertrauen und transparente Kommunikation auf allen Ebenen der Hierarchie. Einige Mitarbeiter hatten anfangs Schwierigkeiten mit dem Mangel an Struktur, während andere unter der neu gewonnenen Autonomie aufblühten.",
      advancedTerms: [
        "umstellte", "messbarer Ergebnisse", "kulturelle Wandel",
        "transparente Kommunikation", "Hierarchie", "Autonomie",
      ],
      keyPoints: [
        "Umstellung auf Fernarbeit", "Arbeitsstunden zu Ergebnissen",
        "Vertrauen und Kommunikation", "Mitarbeiter kämpften vs. blühten auf",
      ],
    },
    {
      id: "ki-einfuehrung",
      topic: "Technologie",
      title: "KI-Einführung",
      text: "Als Werkzeuge der künstlichen Intelligenz zunehmend ausgereifter wurden, begann das Fertigungsunternehmen, automatisierte Systeme in seine Produktionslinie zu integrieren. Zunächst äußerten die Mitarbeiter Bedenken und befürchteten, überflüssig zu werden. Das Management betonte jedoch, dass das Ziel darin bestehe, menschliche Fähigkeiten zu ergänzen und nicht vollständig zu ersetzen. Die Arbeiter wurden umgeschult, um die automatisierten Prozesse zu überwachen und zu optimieren, wodurch sich ihre Aufgaben in Richtung höherwertiger Tätigkeiten verschoben.",
      advancedTerms: [
        "ausgereifter", "integrieren", "überflüssig", "ergänzen",
        "umgeschult", "höherwertiger Tätigkeiten",
      ],
      keyPoints: [
        "KI-Integration in der Fertigung", "Mitarbeiter befürchteten, überflüssig zu werden",
        "ergänzen statt ersetzen", "Arbeiter umgeschult",
      ],
    },
  ],
  fr: [
    {
      id: "correction-marche",
      topic: "Économie",
      title: "Correction du marché",
      text: "Le trimestre dernier, le cours de l'action de l'entreprise a fortement chuté après une série d'erreurs de calcul stratégiques de la part de la direction. Les analystes ont pointé du doigt une dépendance excessive à une seule source de revenus, ce qui a rendu l'entreprise vulnérable lorsque la demande des consommateurs a changé de façon inattendue. De plus, la hausse des taux d'intérêt a augmenté les coûts d'emprunt, réduisant encore davantage les marges bénéficiaires. En réponse, le conseil d'administration a lancé un plan de restructuration complet, diversifiant le portefeuille de l'entreprise et réduisant les dépenses non essentielles.",
      advancedTerms: [
        "erreurs de calcul stratégiques", "dépendance excessive", "source de revenus",
        "marges bénéficiaires", "plan de restructuration", "diversifiant",
      ],
      keyPoints: [
        "cours de l'action a chuté", "erreurs de calcul stratégiques",
        "une seule source de revenus", "hausse des taux d'intérêt", "plan de restructuration",
      ],
    },
    {
      id: "culture-teletravail",
      topic: "Leadership",
      title: "Culture du télétravail",
      text: "Lorsque l'organisation est passée à un modèle entièrement à distance, la direction a rapidement compris que les pratiques de gestion traditionnelles n'étaient plus efficaces. Par conséquent, les responsables ont déplacé leur attention de la surveillance des heures travaillées vers l'évaluation de résultats mesurables. Ce changement culturel a nécessité un investissement important dans la confiance et la communication transparente à tous les niveaux de la hiérarchie. Certains employés ont d'abord eu du mal avec le manque de structure, tandis que d'autres se sont épanouis grâce à leur nouvelle autonomie.",
      advancedTerms: [
        "est passée", "résultats mesurables", "changement culturel",
        "communication transparente", "hiérarchie", "autonomie",
      ],
      keyPoints: [
        "passage au télétravail", "heures travaillées vers résultats",
        "confiance et communication", "employés en difficulté vs épanouis",
      ],
    },
    {
      id: "adoption-ia",
      topic: "Technologie",
      title: "Adoption de l'IA",
      text: "Alors que les outils d'intelligence artificielle devenaient de plus en plus sophistiqués, l'entreprise manufacturière a commencé à intégrer des systèmes automatisés dans sa chaîne de production. Au départ, les employés ont exprimé des inquiétudes, craignant que la technologie ne rende leurs postes obsolètes. Cependant, la direction a souligné que l'objectif était d'augmenter les capacités humaines plutôt que de les remplacer entièrement. Les travailleurs ont été reconvertis pour superviser et affiner les processus automatisés, orientant leurs responsabilités vers des tâches à plus forte valeur ajoutée.",
      advancedTerms: [
        "sophistiqués", "intégrer", "obsolètes", "augmenter",
        "reconvertis", "valeur ajoutée",
      ],
      keyPoints: [
        "intégration de l'IA dans la fabrication", "employés craignaient l'obsolescence",
        "augmenter plutôt que remplacer", "travailleurs reconvertis",
      ],
    },
  ],
  es: [
    {
      id: "correccion-mercado",
      topic: "Economía",
      title: "Corrección del mercado",
      text: "El trimestre pasado, el precio de las acciones de la empresa cayó bruscamente tras una serie de errores de cálculo estratégicos por parte de la alta dirección. Los analistas señalaron una dependencia excesiva de una única fuente de ingresos, lo que dejó a la empresa vulnerable cuando la demanda de los consumidores cambió inesperadamente. Además, el aumento de las tasas de interés incrementó los costos de financiamiento, reduciendo aún más los márgenes de beneficio. En respuesta, la junta directiva inició un plan integral de reestructuración, diversificando la cartera de la empresa y recortando gastos no esenciales.",
      advancedTerms: [
        "errores de cálculo estratégicos", "dependencia excesiva", "fuente de ingresos",
        "márgenes de beneficio", "reestructuración", "diversificando",
      ],
      keyPoints: [
        "precio de las acciones cayó", "errores de cálculo estratégicos",
        "una única fuente de ingresos", "aumento de las tasas de interés", "plan de reestructuración",
      ],
    },
    {
      id: "cultura-trabajo-remoto",
      topic: "Liderazgo",
      title: "Cultura del trabajo remoto",
      text: "Cuando la organización pasó a un modelo totalmente remoto, los líderes se dieron cuenta rápidamente de que las prácticas de gestión tradicionales ya no eran eficaces. En consecuencia, los gerentes cambiaron su enfoque de supervisar las horas trabajadas a evaluar resultados medibles. Este cambio cultural requirió una inversión significativa en confianza y comunicación transparente en todos los niveles de la jerarquía. Algunos empleados inicialmente lucharon con la falta de estructura, mientras que otros prosperaron con la nueva autonomía.",
      advancedTerms: [
        "pasó", "resultados medibles", "cambio cultural",
        "comunicación transparente", "jerarquía", "autonomía",
      ],
      keyPoints: [
        "transición al trabajo remoto", "horas trabajadas a resultados",
        "confianza y comunicación", "empleados lucharon vs prosperaron",
      ],
    },
    {
      id: "adopcion-ia",
      topic: "Tecnología",
      title: "Adopción de la IA",
      text: "A medida que las herramientas de inteligencia artificial se volvían cada vez más sofisticadas, la empresa manufacturera comenzó a integrar sistemas automatizados en su línea de producción. Al principio, los empleados expresaron aprensión, temiendo que la tecnología volviera obsoletos sus puestos. Sin embargo, la dirección enfatizó que el objetivo era aumentar las capacidades humanas en lugar de reemplazarlas por completo. Los trabajadores fueron reentrenados para supervisar y ajustar los procesos automatizados, desplazando sus responsabilidades hacia tareas de mayor valor.",
      advancedTerms: [
        "sofisticadas", "integrar", "aprensión", "obsoletos",
        "aumentar", "reentrenados", "mayor valor",
      ],
      keyPoints: [
        "integración de IA en manufactura", "empleados temían obsolescencia",
        "aumentar en lugar de reemplazar", "trabajadores reentrenados",
      ],
    },
  ],
  sv: [
    {
      id: "marknadskorrigering",
      topic: "Ekonomi",
      title: "Marknadskorrigering",
      text: "Förra kvartalet föll företagets aktiekurs kraftigt efter en rad strategiska felbedömningar av företagsledningen. Analytiker pekade på ett överdrivet beroende av en enda intäktskälla, vilket gjorde företaget sårbart när konsumenternas efterfrågan förändrades oväntat. Dessutom ökade stigande räntor lånekostnaderna, vilket pressade vinstmarginalerna ytterligare. Som svar inledde styrelsen en omfattande omstruktureringsplan, diversifierade företagets portfölj och skar ner på onödiga utgifter.",
      advancedTerms: [
        "strategiska felbedömningar", "överdrivet beroende", "intäktskälla",
        "vinstmarginalerna", "omstruktureringsplan", "diversifierade",
      ],
      keyPoints: [
        "aktiekursen föll", "strategiska felbedömningar", "en enda intäktskälla",
        "stigande räntor", "omstruktureringsplan",
      ],
    },
    {
      id: "distansarbetskultur",
      topic: "Ledarskap",
      title: "Distansarbetskultur",
      text: "När organisationen övergick till en helt distansbaserad modell insåg ledningen snabbt att traditionella ledningsmetoder inte längre fungerade. Följaktligen flyttade cheferna sitt fokus från att övervaka arbetade timmar till att utvärdera mätbara resultat. Denna kulturella förändring krävde en betydande investering i förtroende och transparent kommunikation på alla nivåer i hierarkin. Vissa medarbetare kämpade inledningsvis med bristen på struktur, medan andra frodades under den nyvunna autonomin.",
      advancedTerms: [
        "övergick", "mätbara resultat", "kulturella förändring",
        "transparent kommunikation", "hierarkin", "autonomin",
      ],
      keyPoints: [
        "övergång till distansarbete", "arbetade timmar till resultat",
        "förtroende och kommunikation", "medarbetare kämpade vs frodades",
      ],
    },
    {
      id: "ai-implementering",
      topic: "Teknik",
      title: "AI-implementering",
      text: "I takt med att AI-verktyg blev alltmer sofistikerade började tillverkningsföretaget integrera automatiserade system i sin produktionslinje. Till en början uttryckte medarbetarna oro och befarade att tekniken skulle göra deras roller överflödiga. Ledningen betonade dock att målet var att förstärka mänsklig förmåga snarare än att helt ersätta den. Arbetarna omskolades för att övervaka och finjustera de automatiserade processerna, vilket förde deras ansvar mot mer värdeskapande uppgifter.",
      advancedTerms: [
        "sofistikerade", "integrera", "överflödiga", "förstärka",
        "omskolades", "värdeskapande uppgifter",
      ],
      keyPoints: [
        "AI-integration i tillverkning", "medarbetare fruktade överflödighet",
        "förstärka istället för ersätta", "arbetare omskolades",
      ],
    },
  ],
};

export function passagesForLanguage(language: LanguageCode): ComprehensionPassage[] {
  return PASSAGES_BY_LANGUAGE[language];
}

export function randomPassage(language: LanguageCode, excludeId?: string): ComprehensionPassage {
  const all = PASSAGES_BY_LANGUAGE[language];
  const pool = excludeId ? all.filter((p) => p.id !== excludeId) : all;
  const source = pool.length > 0 ? pool : all;
  return source[Math.floor(Math.random() * source.length)];
}
