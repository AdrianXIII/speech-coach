import type { LanguageCode } from "@/lib/languages";

/**
 * The three sub-skills "Executive Communication" trains, matching the
 * user's own framing: explaining your own impact, summarizing complex work
 * fast, and making your point land with a skeptical audience.
 */
export type CommScenarioCategory = "self-advocacy" | "executive-summary" | "influence";

export interface CommScenario {
  id: string;
  category: CommScenarioCategory;
  prompt: string;
}

/**
 * Deliberately profession-agnostic (a project setback, a promotion case, a
 * status update, a disagreement in a meeting) so they generalize across
 * engineering, sales, legal, healthcare, etc. — not tied to any one domain
 * the way a literal "database bottleneck" example would be.
 */
const SCENARIOS_BY_LANGUAGE: Record<LanguageCode, CommScenario[]> = {
  en: [
    {
      id: "self-advocacy-contribution",
      category: "self-advocacy",
      prompt:
        "Tell your manager, in under a minute, about a time you solved a hard problem at work — make sure they walk away understanding exactly what you did and what changed because of it.",
    },
    {
      id: "self-advocacy-promotion",
      category: "self-advocacy",
      prompt:
        "Make the case for why you deserve a promotion or a raise, based on your work over the last few months — be specific about your impact, not just your effort.",
    },
    {
      id: "exec-summary-hallway",
      category: "executive-summary",
      prompt:
        "A senior leader stops you in the hallway and asks how your project is going. You have about 30 seconds before they move on — give them the status, the one thing that matters most right now, and what, if anything, you need from them.",
    },
    {
      id: "exec-summary-complex",
      category: "executive-summary",
      prompt:
        "Summarize a complicated project or problem you're working on for someone with no background in it — in two sentences, without using any jargon from your field.",
    },
    {
      id: "influence-pushback",
      category: "influence",
      prompt:
        "You're in a meeting and you disagree with the direction being proposed. Make your case in a way that gets the room to actually reconsider, not just hear you out politely.",
    },
    {
      id: "influence-buyin",
      category: "influence",
      prompt:
        "Pitch a new idea or change to a group of colleagues who are skeptical of change — structure your argument so it lands with people who need convincing.",
    },
  ],
  de: [
    {
      id: "self-advocacy-contribution",
      category: "self-advocacy",
      prompt:
        "Erzähle deinem Vorgesetzten in weniger als einer Minute von einer Situation, in der du ein schwieriges Problem bei der Arbeit gelöst hast — sorge dafür, dass klar wird, was genau du getan hast und was sich dadurch verändert hat.",
    },
    {
      id: "self-advocacy-promotion",
      category: "self-advocacy",
      prompt:
        "Begründe, warum du eine Beförderung oder Gehaltserhöhung verdienst, basierend auf deiner Arbeit der letzten Monate — sei konkret bei deiner Wirkung, nicht nur bei deinem Aufwand.",
    },
    {
      id: "exec-summary-hallway",
      category: "executive-summary",
      prompt:
        "Eine Führungskraft trifft dich auf dem Flur und fragt, wie dein Projekt läuft. Du hast etwa 30 Sekunden, bevor sie weitergeht — nenne den Status, das eine, was gerade am wichtigsten ist, und was du, falls überhaupt, von ihr brauchst.",
    },
    {
      id: "exec-summary-complex",
      category: "executive-summary",
      prompt:
        "Fasse ein kompliziertes Projekt oder Problem, an dem du arbeitest, für jemanden ohne Fachwissen in zwei Sätzen zusammen — ohne Fachjargon aus deinem Bereich.",
    },
    {
      id: "influence-pushback",
      category: "influence",
      prompt:
        "Du bist in einem Meeting und bist mit der vorgeschlagenen Richtung nicht einverstanden. Bringe deine Position so vor, dass der Raum sie wirklich überdenkt, statt dich nur höflich anzuhören.",
    },
    {
      id: "influence-buyin",
      category: "influence",
      prompt:
        "Stelle einer Gruppe von Kolleg:innen, die Veränderungen gegenüber skeptisch sind, eine neue Idee vor — strukturiere dein Argument so, dass es bei Zweifelnden ankommt.",
    },
  ],
  fr: [
    {
      id: "self-advocacy-contribution",
      category: "self-advocacy",
      prompt:
        "Racontez à votre manager, en moins d'une minute, un moment où vous avez résolu un problème difficile au travail — assurez-vous qu'il comprenne exactement ce que vous avez fait et ce que cela a changé.",
    },
    {
      id: "self-advocacy-promotion",
      category: "self-advocacy",
      prompt:
        "Défendez le fait que vous méritez une promotion ou une augmentation, en vous basant sur votre travail des derniers mois — soyez précis sur votre impact, pas seulement sur vos efforts.",
    },
    {
      id: "exec-summary-hallway",
      category: "executive-summary",
      prompt:
        "Un dirigeant vous arrête dans le couloir et vous demande où en est votre projet. Vous avez environ 30 secondes avant qu'il ne reprenne son chemin — donnez le statut, la chose la plus importante en ce moment, et ce dont vous avez besoin de sa part, le cas échéant.",
    },
    {
      id: "exec-summary-complex",
      category: "executive-summary",
      prompt:
        "Résumez en deux phrases, sans jargon de votre domaine, un projet ou problème compliqué sur lequel vous travaillez, pour quelqu'un qui n'y connaît rien.",
    },
    {
      id: "influence-pushback",
      category: "influence",
      prompt:
        "Vous êtes en réunion et vous n'êtes pas d'accord avec la direction proposée. Défendez votre point de vue de façon à ce que le groupe le reconsidère vraiment, pas seulement par politesse.",
    },
    {
      id: "influence-buyin",
      category: "influence",
      prompt:
        "Présentez une nouvelle idée ou un changement à des collègues sceptiques face au changement — structurez votre argument pour convaincre ceux qui doutent.",
    },
  ],
  es: [
    {
      id: "self-advocacy-contribution",
      category: "self-advocacy",
      prompt:
        "Cuéntale a tu jefe, en menos de un minuto, sobre un momento en que resolviste un problema difícil en el trabajo — asegúrate de que entienda exactamente qué hiciste y qué cambió gracias a ello.",
    },
    {
      id: "self-advocacy-promotion",
      category: "self-advocacy",
      prompt:
        "Argumenta por qué mereces un ascenso o un aumento, basándote en tu trabajo de los últimos meses — sé específico sobre tu impacto, no solo sobre tu esfuerzo.",
    },
    {
      id: "exec-summary-hallway",
      category: "executive-summary",
      prompt:
        "Un directivo te detiene en el pasillo y te pregunta cómo va tu proyecto. Tienes unos 30 segundos antes de que siga su camino — dale el estado, lo más importante ahora mismo, y qué necesitas de él, si es que necesitas algo.",
    },
    {
      id: "exec-summary-complex",
      category: "executive-summary",
      prompt:
        "Resume en dos frases, sin usar jerga de tu campo, un proyecto o problema complicado en el que estás trabajando, para alguien sin conocimientos previos.",
    },
    {
      id: "influence-pushback",
      category: "influence",
      prompt:
        "Estás en una reunión y no estás de acuerdo con la dirección propuesta. Defiende tu postura de forma que el grupo realmente la reconsidere, no solo te escuche por cortesía.",
    },
    {
      id: "influence-buyin",
      category: "influence",
      prompt:
        "Propón una nueva idea o cambio a un grupo de colegas escépticos ante el cambio — estructura tu argumento para convencer a quienes dudan.",
    },
  ],
  sv: [
    {
      id: "self-advocacy-contribution",
      category: "self-advocacy",
      prompt:
        "Berätta för din chef, på under en minut, om ett tillfälle då du löste ett svårt problem på jobbet — se till att hen förstår exakt vad du gjorde och vad som förändrades tack vare det.",
    },
    {
      id: "self-advocacy-promotion",
      category: "self-advocacy",
      prompt:
        "Argumentera för varför du förtjänar en befordran eller löneförhöjning, baserat på ditt arbete de senaste månaderna — var konkret kring din påverkan, inte bara din insats.",
    },
    {
      id: "exec-summary-hallway",
      category: "executive-summary",
      prompt:
        "En senior chef stoppar dig i korridoren och frågar hur ditt projekt går. Du har ungefär 30 sekunder innan hen går vidare — ge statusen, det viktigaste just nu, och vad du eventuellt behöver från hen.",
    },
    {
      id: "exec-summary-complex",
      category: "executive-summary",
      prompt:
        "Sammanfatta ett komplicerat projekt eller problem du jobbar med, på två meningar, utan att använda något fackspråk från ditt område, för någon utan förkunskaper.",
    },
    {
      id: "influence-pushback",
      category: "influence",
      prompt:
        "Du är på ett möte och håller inte med om den föreslagna riktningen. Framför din ståndpunkt på ett sätt som faktiskt får gruppen att tänka om, inte bara lyssna artigt.",
    },
    {
      id: "influence-buyin",
      category: "influence",
      prompt:
        "Presentera en ny idé eller förändring för kollegor som är skeptiska till förändring — strukturera ditt resonemang så att det landar hos de som behöver övertygas.",
    },
  ],
};

export function scenariosForLanguage(language: LanguageCode): CommScenario[] {
  return SCENARIOS_BY_LANGUAGE[language];
}

export function randomScenario(language: LanguageCode, category?: CommScenarioCategory): CommScenario {
  const pool = SCENARIOS_BY_LANGUAGE[language].filter(
    (s) => !category || s.category === category,
  );
  return pool[Math.floor(Math.random() * pool.length)];
}
