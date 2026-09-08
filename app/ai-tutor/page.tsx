import { AITutor } from "@/components/AITutor";
import { PageHeader } from "@/components/PageHeader";

const TITLE = {
  en: "AI Tutor",
  de: "KI-Tutor",
  fr: "Tuteur IA",
  es: "Tutor de IA",
  sv: "AI-handledare",
};

const SUBTITLE = {
  en: "A one-on-one coach across Business, Politics, and Law: it teaches the core concepts, challenges you with a real case or live news, and grades your knowledge, language, and pronunciation.",
  de: "Ein persönlicher Coach für Wirtschaft, Politik und Recht: er vermittelt die Kernkonzepte, fordert dich mit einem realen Fall oder aktuellen Nachrichten heraus und bewertet dein Wissen, deine Sprache und Aussprache.",
  fr: "Un coach individuel en affaires, politique et droit : il enseigne les concepts clés, vous met au défi avec un cas réel ou une actualité, et évalue vos connaissances, votre langue et votre prononciation.",
  es: "Un coach personal en negocios, política y derecho: enseña los conceptos clave, te desafía con un caso real o noticias actuales, y evalúa tu conocimiento, idioma y pronunciación.",
  sv: "En personlig coach inom affärer, politik och juridik: den lär ut kärnbegreppen, utmanar dig med ett verkligt fall eller aktuella nyheter, och bedömer dina kunskaper, ditt språk och uttal.",
};

export default function AITutorPage() {
  return (
    <div className="min-h-screen bg-paper px-4 py-12 sm:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <PageHeader title={TITLE} subtitle={SUBTITLE} />

        <AITutor />
      </div>
    </div>
  );
}
