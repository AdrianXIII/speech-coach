import { casesForCategory, type CaseProfession, type CaseStudy } from "@/lib/caseStudyContent";
import { getFundamentals, type Fundamental } from "@/lib/caseStudyFundamentals";
import { generateContent, hasGeminiKey } from "@/lib/gemini";
import { pickRandom } from "@/lib/random";
import type { TutorProfile } from "@/lib/tutorProfile";
import type { TutorNewsItem } from "@/lib/tutorNews";
import { getTeachingContent, type TeachingContent } from "@/lib/tutorTeachingContent";
import { JURISDICTION_LABELS, type LawJurisdiction } from "@/lib/legalJurisdiction";

/**
 * One generic tutor engine, parameterized by profession/category — no
 * per-domain branching. It teaches from the same Fundamentals checklist
 * Case Studies already uses, challenges with the same CaseStudy pool, and
 * (for Live News mode) grades against a fetched news item instead. Adding a
 * new domain later needs only new entries in caseStudyContent.ts /
 * caseStudyFundamentals.ts — no changes here.
 */

export interface TeachingBrief {
  fundamentals: Fundamental[];
  /** One example of what a strong answer looks like in this domain, for orientation before the challenge. */
  exampleApproach: string;
  /** Rich, step-by-step deep-dive content, when this category has it (see lib/tutorTeachingContent.ts). Null falls back to the plain fundamentals list. */
  teaching: TeachingContent | null;
}

/**
 * Zero API calls — pulled directly from the domain's existing static
 * content, never regenerated per session. `jurisdiction` only matters for
 * Law (see lib/legalJurisdiction.ts) — the returned brief's `teaching`
 * entry carries its own `.jurisdiction` field, which may differ from what
 * was requested if that jurisdiction isn't populated yet and the lookup
 * fell back to the US default; callers should surface that honestly rather
 * than assuming the request was satisfied.
 */
export function buildTeachingBrief(
  profession: CaseProfession,
  category: string,
  jurisdiction?: LawJurisdiction,
): TeachingBrief {
  const fundamentals = getFundamentals(profession, category);
  const cases = casesForCategory(profession, category);
  const sample = cases.length > 0 ? pickRandom(cases) : null;
  return {
    fundamentals,
    exampleApproach: sample?.modelApproach ?? "",
    teaching: getTeachingContent(profession, category, jurisdiction),
  };
}

/** Zero API calls — draws from the same case pool Case Studies uses. */
export function pickChallenge(
  profession: CaseProfession,
  category: string,
  excludeId?: string,
): CaseStudy | null {
  const cases = casesForCategory(profession, category);
  if (cases.length === 0) return null;
  const exclude = excludeId ? cases.find((c) => c.id === excludeId) : undefined;
  return pickRandom(cases, exclude);
}

export interface TutorFeedback {
  knowledge: { covered: string[]; missed: string[]; corrections: string[] };
  language: { terminology: string; wordChoice: string; grammar: string };
  pronunciation: string;
  summary: string;
  nextSteps: string[];
  mocked: boolean;
}

function mockTutorFeedback(): TutorFeedback {
  return {
    knowledge: {
      covered: [],
      missed: ["Mock mode: set GEMINI_API_KEY for real knowledge grading."],
      corrections: [],
    },
    language: {
      terminology: "Mock mode: set GEMINI_API_KEY for real feedback.",
      wordChoice: "Mock mode: set GEMINI_API_KEY for real feedback.",
      grammar: "Mock mode: set GEMINI_API_KEY for real feedback.",
    },
    pronunciation: "Mock mode: set GEMINI_API_KEY for real pronunciation feedback.",
    summary: "Mock mode — no real evaluation was performed.",
    nextSteps: ["Set GEMINI_API_KEY to get real tutoring."],
    mocked: true,
  };
}

const PROFESSION_ROLE: Record<CaseProfession, string> = {
  business: "management consultant and business school professor",
  law: "law professor and senior litigator",
  politics: "political strategist and public policy professor",
};

const ENTITY_LABEL: Record<CaseProfession, string> = {
  business: "company",
  law: "client organization",
  politics: "organization",
};

export interface EvaluateArgs {
  profession: CaseProfession;
  category: string;
  fundamentals: Fundamental[];
  transcript: string;
  /** Core mode: the case being solved. Optional when newsItem is present (Live News mode). */
  caseStudy?: CaseStudy | null;
  /** Live News mode: the fetched news item the student was asked about. */
  newsItem?: TutorNewsItem | null;
  profile?: TutorProfile | null;
  audio?: { base64: string; mimeType: string };
  /** Law only — should match whatever jurisdiction the Teach step actually showed (see lib/legalJurisdiction.ts), so grading stays consistent with what was taught rather than silently assuming the student's own jurisdiction. */
  jurisdiction?: LawJurisdiction;
}

function buildPrompt(args: EvaluateArgs): string {
  const { profession, category, fundamentals, transcript, caseStudy, newsItem, profile } = args;

  const jurisdictionNote =
    profession === "law" && args.jurisdiction
      ? `\nJURISDICTION: Grade strictly against ${JURISDICTION_LABELS[args.jurisdiction]} — do not apply concepts or terminology from a different legal system, even if they sound similar.\n`
      : "";

  const fundamentalsList =
    fundamentals.map((f) => `- ${f.label}`).join("\n") || "(no fundamentals catalogued for this category yet)";

  const challengeBlock = caseStudy
    ? `CASE PRESENTED TO THE STUDENT:
"""
${caseStudy.scenario}
"""

KEY ISSUES A STRONG ANSWER SHOULD ADDRESS:
${caseStudy.keyIssues.map((i) => `- ${i}`).join("\n")}

PROFESSIONAL CONCEPTS/JARGON A STRONG ANSWER WOULD USE:
${caseStudy.expectedConcepts.join(", ")}`
    : newsItem
      ? `LIVE NEWS QUESTION PRESENTED TO THE STUDENT:
News: "${newsItem.headline}" — ${newsItem.summary}
Connection to "${category}": ${newsItem.connection}
Question asked: "${newsItem.appliedQuestion}"${
          profile
            ? `

THE STUDENT'S FICTIVE ${ENTITY_LABEL[profession].toUpperCase()}:
Name: ${profile.name}
Description: ${profile.description}
Size: ${profile.size}
Market: ${profile.market}
Goals: ${profile.goals}`
            : ""
        }`
      : "(no case or news context was provided)";

  return `You are an expert ${PROFESSION_ROLE[profession]} acting as a one-on-one AI tutor in "${category}".
Be rigorous but constructive — this is a coaching session, not a real engagement, so the goal is
helping the student improve.
${jurisdictionNote}
${challengeBlock}

FUNDAMENTAL CONCEPTS FOR THIS DOMAIN — grade knowledge coverage against this list, not just whatever
this one case/question happens to mention:
${fundamentalsList}

THE STUDENT'S SPOKEN ANSWER (transcribed, may contain minor transcription errors — don't penalize for
that):
"""
${transcript || "(no speech was detected)"}
"""

${
  args.audio
    ? "An audio recording of the student's answer is attached — use it to evaluate pronunciation and delivery, not just content."
    : "No audio recording was provided this time — say so plainly in the pronunciation field rather than inventing an assessment."
}

Evaluate the student and respond with ONLY a JSON object (no markdown fences, no commentary) matching
exactly this shape:
{
  "knowledge": {
    "covered": ["<key concept they correctly addressed>"],
    "missed": ["<important concept from the key issues/fundamentals list they missed>"],
    "corrections": ["<any factual or conceptual mistake they made, stated plainly>"]
  },
  "language": {
    "terminology": "<1-2 sentences: did they use correct, precise domain terminology?>",
    "wordChoice": "<1-2 sentences: word choice/register appropriate for a professional in this field?>",
    "grammar": "<1-2 sentences: sentence structure and clarity>"
  },
  "pronunciation": "<2-3 sentences of pronunciation/delivery feedback, or a note that audio wasn't available>",
  "summary": "<2-3 sentence overall summary of strengths and gaps>",
  "nextSteps": ["<one specific thing to practice next>", "<another, if relevant>"]
}

If no speech was detected or the answer is essentially empty, say so plainly in "summary" and leave
"covered" empty rather than inventing feedback about content that wasn't there.`;
}

/**
 * The single LLM call that covers knowledge, language, and pronunciation
 * together (multimodal when audio is available) — the "minimize API calls"
 * requirement met by batching everything the core flow needs to grade into
 * one request, the same way Live News mode's fetch+question is one request.
 */
export async function evaluateTutorAnswer(args: EvaluateArgs): Promise<TutorFeedback> {
  if (!hasGeminiKey()) return mockTutorFeedback();

  const parts: { text?: string; inlineData?: { mimeType: string; data: string } }[] = [
    { text: buildPrompt(args) },
  ];
  if (args.audio) {
    parts.push({ inlineData: { mimeType: args.audio.mimeType, data: args.audio.base64 } });
  }

  const raw = await generateContent(parts, { responseMimeType: "application/json" });

  let parsed: Partial<Omit<TutorFeedback, "mocked">> & {
    knowledge?: Partial<TutorFeedback["knowledge"]>;
    language?: Partial<TutorFeedback["language"]>;
  };
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("Gemini returned malformed JSON for tutor feedback.");
  }

  return {
    knowledge: {
      covered: Array.isArray(parsed.knowledge?.covered) ? parsed.knowledge!.covered! : [],
      missed: Array.isArray(parsed.knowledge?.missed) ? parsed.knowledge!.missed! : [],
      corrections: Array.isArray(parsed.knowledge?.corrections) ? parsed.knowledge!.corrections! : [],
    },
    language: {
      terminology: parsed.language?.terminology ?? "",
      wordChoice: parsed.language?.wordChoice ?? "",
      grammar: parsed.language?.grammar ?? "",
    },
    pronunciation: parsed.pronunciation ?? "",
    summary: parsed.summary ?? "",
    nextSteps: Array.isArray(parsed.nextSteps) ? parsed.nextSteps : [],
    mocked: false,
  };
}
