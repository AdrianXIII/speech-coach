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
    {
      id: "startup-finanzierung",
      topic: "Wirtschaft",
      title: "Startup-Finanzierung",
      text: "Das junge Startup sicherte sich nach monatelangen Verhandlungen mit potenziellen Investoren eine beträchtliche Finanzierungsrunde. Anstatt ein schnelles, unkontrolliertes Wachstum anzustreben, entschieden sich die Gründer für eine maßvolle Wachstumsstrategie, die nachhaltige Umsätze über reine Größe stellte. Dieser Ansatz überzeugte Investoren, die gegenüber Startups, die Bewertung über Tragfähigkeit stellten, zunehmend skeptisch geworden waren. Die Mittel werden vor allem in Forschung und Entwicklung sowie in strategische Neueinstellungen im Vertrieb und in der Technik fließen. Branchenbeobachter meinen, dass dieser disziplinierte Ansatz das Unternehmen gegenüber Wettbewerbern, die ihr Kapital in untragbarem Tempo verbrauchen, begünstigen könnte.",
      advancedTerms: [
        "beträchtliche Finanzierungsrunde", "unkontrolliertes Wachstum", "maßvolle Wachstumsstrategie",
        "nachhaltige Umsätze", "Bewertung", "Tragfähigkeit", "disziplinierte Ansatz", "untragbarem Tempo",
      ],
      keyPoints: [
        "Finanzierungsrunde gesichert", "maßvolle Wachstumsstrategie", "nachhaltige Umsätze",
        "Forschung und Entwicklung", "strategische Neueinstellungen", "disziplinierter Ansatz",
      ],
    },
    {
      id: "krisenmanagement",
      topic: "Führung",
      title: "Krisenmanagement",
      text: "Nach einem öffentlich bekannt gewordenen Produktrückruf stand die Geschäftsführerin unter wachsendem Druck, die Sorgen von Kunden und Aktionären zu adressieren. Anstatt den Ernst der Lage herunterzuspielen, entschied sie sich, das Versagen offen einzuräumen und einen konkreten Plan zur Behebung vorzulegen. Diese Transparenz war zunächst riskant, stärkte aber letztlich das öffentliche Vertrauen und begrenzte den langfristigen Reputationsschaden. Intern überarbeitete das Unternehmen seine Qualitätssicherungsprozesse grundlegend, um ähnliche Vorfälle künftig zu verhindern. Branchenexperten bezeichneten diese Reaktion später als Lehrbuchbeispiel für wirksame Krisenkommunikation unter intensiver öffentlicher Beobachtung.",
      advancedTerms: [
        "wachsendem Druck", "herunterzuspielen", "offen einzuräumen", "Behebung",
        "Transparenz", "Reputationsschaden", "Qualitätssicherungsprozesse", "Krisenkommunikation",
      ],
      keyPoints: [
        "Produktrückruf", "Geschäftsführerin räumte Versagen ein", "Plan zur Behebung",
        "öffentliches Vertrauen", "Qualitätssicherung überarbeitet", "Krisenkommunikation",
      ],
    },
    {
      id: "cybersicherheitsvorfall",
      topic: "Technologie",
      title: "Cybersicherheitsvorfall",
      text: "Das Unternehmen gab bekannt, dass Hacker eine zuvor unbekannte Schwachstelle ausgenutzt und über mehrere Wochen hinweg sensible Kundendaten kompromittiert hatten, bevor der Angriff entdeckt wurde. Daraufhin bemühte sich die Organisation fieberhaft, den Vorfall einzudämmen, betroffene Nutzer zu informieren und die gesetzlich vorgeschriebenen Behörden zu benachrichtigen. Cybersicherheitsexperten kritisierten das Unternehmen für unzureichende Überwachungssysteme, die es dem Eindringling ermöglichten, so lange unentdeckt zu bleiben. Als Reaktion sagte das Unternehmen erhebliche Investitionen in die Infrastruktur zur Bedrohungserkennung zu und versprach künftig mehr Transparenz bei derartigen Vorfällen.",
      advancedTerms: [
        "ausgenutzt", "Schwachstelle", "kompromittiert", "eindämmen",
        "Behörden", "unzureichende Überwachungssysteme", "Bedrohungserkennung", "Transparenz",
      ],
      keyPoints: [
        "Hacker nutzten Schwachstelle aus", "Kundendaten kompromittiert", "Nutzer und Behörden informiert",
        "unzureichende Überwachung kritisiert", "Investition in Bedrohungserkennung",
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
    {
      id: "financement-startup",
      topic: "Économie",
      title: "Financement de startup",
      text: "La jeune startup a obtenu un tour de financement substantiel auprès d'investisseurs en capital-risque après plusieurs mois de négociations. Plutôt que de viser une expansion rapide et incontrôlée, les fondateurs ont opté pour une stratégie de croissance mesurée, privilégiant des revenus durables plutôt qu'une simple échelle. Cette approche a rassuré des investisseurs devenus méfiants envers les startups qui privilégiaient la valorisation au détriment de la viabilité. Les fonds seront principalement consacrés à la recherche et au développement, ainsi qu'à des recrutements stratégiques dans l'ingénierie et les ventes. Les observateurs du secteur estiment que cette approche disciplinée pourrait avantager l'entreprise face à des concurrents qui dépensent leur capital à un rythme insoutenable.",
      advancedTerms: [
        "tour de financement", "capital-risque", "expansion incontrôlée", "stratégie de croissance mesurée",
        "revenus durables", "valorisation", "viabilité", "approche disciplinée",
      ],
      keyPoints: [
        "tour de financement obtenu", "stratégie de croissance mesurée", "revenus durables",
        "recherche et développement", "recrutements stratégiques", "approche disciplinée",
      ],
    },
    {
      id: "gestion-crise",
      topic: "Leadership",
      title: "Gestion de crise",
      text: "À la suite d'un rappel de produit largement médiatisé, la directrice générale a dû faire face à une pression croissante de la part des clients et des actionnaires. Plutôt que de minimiser la gravité de la situation, elle a choisi de reconnaître franchement l'échec et de présenter un plan concret de remédiation. Cette transparence, bien que risquée au départ, a finalement renforcé la confiance du public et limité les dommages durables à la réputation de l'entreprise. En interne, l'entreprise a entièrement révisé ses processus d'assurance qualité afin d'éviter que des incidents similaires ne se reproduisent. Les experts du secteur ont par la suite cité cette réponse comme un exemple classique de communication de crise efficace sous une forte pression médiatique.",
      advancedTerms: [
        "pression croissante", "minimiser", "franchement", "remédiation",
        "transparence", "dommages durables", "assurance qualité", "communication de crise",
      ],
      keyPoints: [
        "rappel de produit", "directrice a reconnu l'échec", "plan de remédiation",
        "confiance du public", "assurance qualité révisée", "communication de crise",
      ],
    },
    {
      id: "faille-cybersecurite",
      topic: "Technologie",
      title: "Faille de cybersécurité",
      text: "L'entreprise a révélé que des pirates informatiques avaient exploité une vulnérabilité jusqu'alors inconnue, compromettant des données sensibles de clients pendant plusieurs semaines avant d'être détectés. Dans la foulée, l'organisation s'est empressée de contenir la brèche, d'informer les utilisateurs concernés et de notifier les autorités réglementaires comme l'exige la loi. Des experts en cybersécurité ont critiqué l'entreprise pour ses systèmes de surveillance insuffisants, qui ont permis à l'intrusion de passer inaperçue aussi longtemps. En réponse, l'entreprise s'est engagée à investir massivement dans son infrastructure de détection des menaces et a promis davantage de transparence concernant de futurs incidents.",
      advancedTerms: [
        "exploité", "vulnérabilité", "compromettant", "contenir",
        "autorités réglementaires", "surveillance insuffisants", "détection des menaces", "transparence",
      ],
      keyPoints: [
        "pirates ont exploité une vulnérabilité", "données clients compromises", "utilisateurs et autorités informés",
        "surveillance insuffisante critiquée", "investissement dans la détection des menaces",
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
    {
      id: "financiacion-startups",
      topic: "Economía",
      title: "Financiación de startups",
      text: "La joven startup aseguró una ronda sustancial de capital de riesgo tras varios meses de negociaciones con posibles inversores. En lugar de buscar una expansión rápida y descontrolada, los fundadores optaron por una estrategia de crecimiento mesurado, priorizando ingresos sostenibles sobre la mera escala. Este enfoque tranquilizó a inversores que se habían vuelto recelosos de las startups que priorizaban la valoración sobre la viabilidad. Los fondos se destinarán principalmente a investigación y desarrollo, junto con contrataciones estratégicas en ingeniería y ventas. Observadores del sector sugieren que este enfoque disciplinado podría posicionar favorablemente a la empresa frente a competidores que agotan su capital a un ritmo insostenible.",
      advancedTerms: [
        "ronda sustancial", "capital de riesgo", "expansión descontrolada", "estrategia de crecimiento mesurado",
        "ingresos sostenibles", "valoración", "viabilidad", "enfoque disciplinado",
      ],
      keyPoints: [
        "ronda de capital de riesgo asegurada", "estrategia de crecimiento mesurado", "ingresos sostenibles",
        "investigación y desarrollo", "contrataciones estratégicas", "enfoque disciplinado",
      ],
    },
    {
      id: "gestion-crisis",
      topic: "Liderazgo",
      title: "Gestión de crisis",
      text: "Tras un retiro de producto ampliamente publicitado, la directora ejecutiva se enfrentó a una presión creciente para abordar las preocupaciones de clientes y accionistas. En lugar de minimizar la gravedad de la situación, optó por reconocer el fallo con franqueza y presentar un plan concreto de subsanación. Esta transparencia, aunque arriesgada en un principio, terminó reforzando la confianza pública y mitigando el daño reputacional a largo plazo. Internamente, la empresa reformó por completo sus procesos de control de calidad para evitar incidentes similares. Expertos del sector citaron posteriormente esta respuesta como un ejemplo de manual de comunicación de crisis eficaz bajo un intenso escrutinio.",
      advancedTerms: [
        "presión creciente", "minimizar", "con franqueza", "subsanación",
        "transparencia", "daño reputacional", "control de calidad", "comunicación de crisis",
      ],
      keyPoints: [
        "retiro de producto", "directora reconoció el fallo", "plan de subsanación",
        "confianza pública", "control de calidad reformado", "comunicación de crisis",
      ],
    },
    {
      id: "brecha-ciberseguridad",
      topic: "Tecnología",
      title: "Brecha de ciberseguridad",
      text: "La empresa reveló que unos hackers habían explotado una vulnerabilidad previamente desconocida, comprometiendo datos sensibles de clientes durante varias semanas antes de ser detectados. Tras el hecho, la organización se apresuró a contener la brecha, notificar a los usuarios afectados y a las autoridades reguladoras según exige la ley. Expertos en ciberseguridad criticaron a la empresa por sus sistemas de monitoreo inadecuados, que permitieron que la intrusión pasara desapercibida durante tanto tiempo. En respuesta, la empresa se comprometió a realizar una inversión sustancial en infraestructura de detección de amenazas y prometió mayor transparencia ante futuros incidentes.",
      advancedTerms: [
        "explotado", "vulnerabilidad", "comprometiendo", "contener",
        "autoridades reguladoras", "monitoreo inadecuados", "detección de amenazas", "transparencia",
      ],
      keyPoints: [
        "hackers explotaron una vulnerabilidad", "datos de clientes comprometidos", "usuarios y autoridades notificados",
        "monitoreo inadecuado criticado", "inversión en detección de amenazas",
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
    {
      id: "startup-finansiering",
      topic: "Ekonomi",
      title: "Startup-finansiering",
      text: "Den unga startupen säkrade en betydande finansieringsrunda från riskkapitalister efter månader av förhandlingar med tänkbara investerare. I stället för att eftersträva snabb, okontrollerad expansion valde grundarna en måttfull tillväxtstrategi som prioriterade hållbara intäkter framför ren skala. Detta tillvägagångssätt lugnade investerare som blivit alltmer skeptiska till startups som prioriterade värdering framför livskraft. Kapitalet kommer främst att gå till forskning och utveckling samt strategiska nyanställningar inom teknik och försäljning. Branschbedömare menar att detta disciplinerade angreppssätt kan ge företaget ett försprång gentemot konkurrenter som förbrukar sitt kapital i en ohållbar takt.",
      advancedTerms: [
        "betydande finansieringsrunda", "riskkapitalister", "okontrollerad expansion", "måttfull tillväxtstrategi",
        "hållbara intäkter", "värdering", "livskraft", "disciplinerade angreppssätt",
      ],
      keyPoints: [
        "finansieringsrunda säkrad", "måttfull tillväxtstrategi", "hållbara intäkter",
        "forskning och utveckling", "strategiska nyanställningar", "disciplinerat angreppssätt",
      ],
    },
    {
      id: "krishantering",
      topic: "Ledarskap",
      title: "Krishantering",
      text: "Efter en mycket uppmärksammad produktåterkallelse ställdes vd:n inför ett växande tryck att bemöta kunders och aktieägares oro. Snarare än att tona ner situationens allvar valde hon att öppet erkänna misstaget och presentera en konkret plan för att åtgärda det. Denna öppenhet var inledningsvis riskabel men stärkte i slutändan allmänhetens förtroende och begränsade den långsiktiga skadan på varumärket. Internt gjorde företaget en genomgripande översyn av sina kvalitetssäkringsprocesser för att förhindra liknande incidenter i framtiden. Branschexperter lyfte senare fram denna respons som ett skolboksexempel på effektiv kriskommunikation under intensiv granskning.",
      advancedTerms: [
        "växande tryck", "tona ner", "öppet erkänna", "åtgärda",
        "öppenhet", "skadan på varumärket", "kvalitetssäkringsprocesser", "kriskommunikation",
      ],
      keyPoints: [
        "produktåterkallelse", "vd erkände misstaget", "plan för att åtgärda",
        "allmänhetens förtroende", "kvalitetssäkring sågs över", "kriskommunikation",
      ],
    },
    {
      id: "cybersakerhetsincident",
      topic: "Teknik",
      title: "Cybersäkerhetsincident",
      text: "Företaget avslöjade att hackare hade utnyttjat en tidigare okänd säkerhetslucka och kommit åt känslig kunddata under flera veckor innan intrånget upptäcktes. Därefter arbetade organisationen febrilt för att begränsa intrånget, informera berörda användare och underrätta tillsynsmyndigheter i enlighet med lagen. Cybersäkerhetsexperter kritiserade företaget för bristfälliga övervakningssystem som gjorde att intrånget kunde pågå oupptäckt så länge. Som svar åtog sig företaget att göra en betydande investering i infrastruktur för hotdetektering och utlovade större öppenhet kring framtida incidenter.",
      advancedTerms: [
        "utnyttjat", "säkerhetslucka", "kommit åt", "begränsa",
        "tillsynsmyndigheter", "bristfälliga övervakningssystem", "hotdetektering", "öppenhet",
      ],
      keyPoints: [
        "hackare utnyttjade en säkerhetslucka", "kunddata komprometterad", "användare och myndigheter informerades",
        "bristfällig övervakning kritiserades", "investering i hotdetektering",
      ],
    },
  ],
};

/**
 * Real-news topics for the Listening & Summary trainer (see
 * lib/comprehensionNews.ts), kept here rather than in that file since this
 * module is safe to import from client components — comprehensionNews.ts
 * pulls in the Postgres client and would break a client bundle.
 */
export const NEWS_TOPICS = ["Economy", "Technology", "Politics", "Sport", "Culture"] as const;
export type NewsTopic = (typeof NEWS_TOPICS)[number];

export function passagesForLanguage(language: LanguageCode): ComprehensionPassage[] {
  return PASSAGES_BY_LANGUAGE[language];
}

export function randomPassage(language: LanguageCode, excludeId?: string): ComprehensionPassage {
  const all = PASSAGES_BY_LANGUAGE[language];
  const pool = excludeId ? all.filter((p) => p.id !== excludeId) : all;
  const source = pool.length > 0 ? pool : all;
  return source[Math.floor(Math.random() * source.length)];
}
