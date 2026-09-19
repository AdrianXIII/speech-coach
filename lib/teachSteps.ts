import type { KeyTerm, Pitfall, TeachingContent } from "@/lib/tutorTeachingContent";

/**
 * Flattens a TeachingContent entry into the ordered steps the Teach phase
 * walks through. Splitting a concept across several steps is what keeps a
 * 45-minute lecture navigable: each step is a couple of minutes of speech
 * the student can repeat or step back through, rather than one block of
 * text that has to be sat through to reach the next control.
 *
 * Entries expanded to lecture depth (see EXPANSION in tutorTeachingContent.ts)
 * produce one step per concept section; entries still at the original depth
 * produce exactly one step per concept, which is the behaviour the Teach
 * phase had before sections existed.
 */

export type TeachBlock =
  | { kind: "prose"; text: string }
  | { kind: "labelled"; label: string; text: string; muted?: boolean }
  | { kind: "terms"; terms: KeyTerm[] }
  | { kind: "pitfalls"; pitfalls: Pitfall[] }
  | { kind: "drill"; question: string; modelAnswer: string };

export interface TeachStep {
  /** Heading shown at the top of the card. */
  label: string;
  /** Set on steps belonging to a concept, so the flag control knows what's being reported. */
  conceptId: string | null;
  conceptTitle: string | null;
  /** What the tutor speaks for this step. */
  speech: string;
  blocks: TeachBlock[];
}

function termsSpeech(terms: KeyTerm[]): string {
  return terms.map((t) => `${t.term}: ${t.definition}`).join(" ");
}

function pitfallsSpeech(pitfalls: Pitfall[]): string {
  return pitfalls.map((p) => `A common mistake: ${p.mistake} Instead: ${p.instead}`).join(" ");
}

export function buildTeachSteps(teaching: TeachingContent, forExample: string): TeachStep[] {
  const steps: TeachStep[] = [];

  const overviewBlocks: TeachBlock[] = [{ kind: "prose", text: teaching.overview }];
  let overviewSpeech = teaching.overview;
  if (teaching.prerequisites) {
    overviewBlocks.push({ kind: "labelled", label: "Assumed knowledge", text: teaching.prerequisites, muted: true });
    overviewSpeech += ` ${teaching.prerequisites}`;
  }
  steps.push({ label: "Overview", conceptId: null, conceptTitle: null, speech: overviewSpeech, blocks: overviewBlocks });

  for (const concept of teaching.concepts) {
    const sections = concept.sections ?? [];
    const extras: TeachBlock[] = [];
    let extrasSpeech = "";
    if (concept.keyTerms?.length) {
      extras.push({ kind: "terms", terms: concept.keyTerms });
      extrasSpeech += ` ${termsSpeech(concept.keyTerms)}`;
    }
    if (concept.pitfalls?.length) {
      extras.push({ kind: "pitfalls", pitfalls: concept.pitfalls });
      extrasSpeech += ` ${pitfallsSpeech(concept.pitfalls)}`;
    }

    // Terms and pitfalls ride along on the concept's last step rather than
    // getting one of their own — they're the "before we move on" beat, not
    // a section, and a separate step per concept would nearly double the
    // click count across a full lecture.
    const coreIsLast = sections.length === 0;
    const coreBlocks: TeachBlock[] = [
      { kind: "prose", text: concept.explanation },
      { kind: "labelled", label: "Why it matters", text: concept.whyItMatters },
      { kind: "labelled", label: "Example", text: concept.example, muted: true },
    ];
    steps.push({
      label: concept.title,
      conceptId: concept.id,
      conceptTitle: concept.title,
      speech:
        `${concept.title}. ${concept.explanation} ${concept.whyItMatters} ${forExample} ${concept.example}` +
        (coreIsLast ? extrasSpeech : ""),
      blocks: coreIsLast ? [...coreBlocks, ...extras] : coreBlocks,
    });

    sections.forEach((section, i) => {
      const isLast = i === sections.length - 1;
      steps.push({
        label: `${concept.title} — ${section.heading}`,
        conceptId: concept.id,
        conceptTitle: concept.title,
        speech: `${section.heading}. ${section.body}` + (isLast ? extrasSpeech : ""),
        blocks: isLast ? [{ kind: "prose", text: section.body }, ...extras] : [{ kind: "prose", text: section.body }],
      });
    });
  }

  steps.push({
    label: "Putting it together",
    conceptId: null,
    conceptTitle: null,
    speech: teaching.connections,
    blocks: [{ kind: "prose", text: teaching.connections }],
  });

  (teaching.drills ?? []).forEach((drill, i) => {
    steps.push({
      label: `Interview drill ${i + 1} of ${teaching.drills!.length}`,
      conceptId: null,
      conceptTitle: null,
      speech: `${drill.question} ${drill.modelAnswer}`,
      blocks: [{ kind: "drill", question: drill.question, modelAnswer: drill.modelAnswer }],
    });
  });

  return steps;
}
