import { generateContent, hasGeminiKey } from "@/lib/gemini";
import type { StructureModel } from "@/lib/structureModels";
import { SCORE_KEYS, type ExecCommResult, type ScoreKey } from "@/lib/executiveCommTypes";

export type { ExecCommResult } from "@/lib/executiveCommTypes";

const MOCK_TRANSCRIPT =
  "So, um, there was this thing that happened with the project, it took a while because there were " +
  "a bunch of issues, and, like, I had to figure some stuff out, and eventually it got fixed, so, yeah, " +
  "it's better now I guess.";

function overallFrom(scores: Record<ScoreKey, number>): number {
  const sum = SCORE_KEYS.reduce((acc, k) => acc + scores[k], 0);
  return Math.round((sum / SCORE_KEYS.length) * 10);
}

function mockResult(model: StructureModel): ExecCommResult {
  const scores: Record<ScoreKey, number> = { bluf: 2, structure: 3, conciseness: 4, specificity: 2, confidence: 3, closing: 2 };
  return {
    transcript: MOCK_TRANSCRIPT,
    scores,
    overallScore: overallFrom(scores),
    bluf: { ledWithConclusion: false, note: "Mock mode: set GEMINI_API_KEY for real grading." },
    structure: {
      followedPhases: [],
      missingPhases: model.phases.map((p) => p.label),
      note: "Mock mode: set GEMINI_API_KEY for real structure grading.",
    },
    conciseness: { rambling: true, note: "Mock mode." },
    specificity: { note: "Mock mode." },
    confidence: { hedgingPhrases: ["I guess", "kind of"], note: "Mock mode." },
    closing: { hasClearAsk: false, note: "Mock mode." },
    strengths: [
      "Mock mode: set GEMINI_API_KEY to get real coaching feedback here.",
      "Your recording was captured and sent through the grading pipeline successfully.",
      "The full pipeline (record → transcribe → grade → rewrite) is wired up end-to-end.",
    ],
    tips: [
      "Add GEMINI_API_KEY to your environment to replace this mock with real AI coaching.",
      "Lead with your conclusion in the first few seconds, then justify it.",
      `Try structuring your answer around ${model.name}: ${model.phases.map((p) => p.label).join(" → ")}.`,
    ],
    strongRewrite: "Mock mode: set GEMINI_API_KEY to see a real restructured version of your answer here.",
    mocked: true,
  };
}

const NOTE = { type: "STRING" };
const SCORE = { type: "INTEGER", minimum: 0, maximum: 10 };

/** Gemini structured-output schema — the only bug-fixed JSON pattern in this codebase (see lib/analyzeSpeech.ts), used from day one here. */
const EXEC_RESPONSE_SCHEMA = {
  type: "OBJECT",
  properties: {
    transcript: { type: "STRING" },
    scores: {
      type: "OBJECT",
      properties: {
        bluf: SCORE,
        structure: SCORE,
        conciseness: SCORE,
        specificity: SCORE,
        confidence: SCORE,
        closing: SCORE,
      },
      required: [...SCORE_KEYS],
    },
    bluf: {
      type: "OBJECT",
      properties: { ledWithConclusion: { type: "BOOLEAN" }, note: NOTE },
      required: ["ledWithConclusion", "note"],
    },
    structure: {
      type: "OBJECT",
      properties: {
        followedPhases: { type: "ARRAY", items: { type: "STRING" } },
        missingPhases: { type: "ARRAY", items: { type: "STRING" } },
        note: NOTE,
      },
      required: ["followedPhases", "missingPhases", "note"],
    },
    conciseness: {
      type: "OBJECT",
      properties: { rambling: { type: "BOOLEAN" }, note: NOTE },
      required: ["rambling", "note"],
    },
    specificity: { type: "OBJECT", properties: { note: NOTE }, required: ["note"] },
    confidence: {
      type: "OBJECT",
      properties: { hedgingPhrases: { type: "ARRAY", items: { type: "STRING" }, maxItems: 5 }, note: NOTE },
      required: ["hedgingPhrases", "note"],
    },
    closing: {
      type: "OBJECT",
      properties: { hasClearAsk: { type: "BOOLEAN" }, note: NOTE },
      required: ["hasClearAsk", "note"],
    },
    strengths: { type: "ARRAY", items: { type: "STRING" }, minItems: 3, maxItems: 3 },
    tips: { type: "ARRAY", items: { type: "STRING" }, minItems: 3, maxItems: 3 },
    strongRewrite: { type: "STRING" },
  },
  required: [
    "transcript",
    "scores",
    "bluf",
    "structure",
    "conciseness",
    "specificity",
    "confidence",
    "closing",
    "strengths",
    "tips",
    "strongRewrite",
  ],
};

function buildSystemPrompt(
  languageName: string,
  model: StructureModel,
  scenarioPrompt: string,
  targetSeconds: number,
): string {
  const phaseLabels = model.phases.map((p) => p.label).join(", ");
  return `You are an executive communication coach helping a professional speak clearly, persuasively, and concisely at work. You grade HOW they structured and framed what they said — not their pronunciation, accent, or speaking pace.

The speaker was given this situation:
"${scenarioPrompt}"

They had about ${targetSeconds} seconds and chose the ${model.name} framework (${model.fullName}), with these phases: ${phaseLabels}.

You will be given an audio recording of their spoken answer, in ${languageName}.

Step 1: Transcribe it exactly word-for-word, in the language spoken.

Step 2: Score each dimension 0-10 (10 = what a strong senior communicator would do; be honest — a vague, rambling answer should score 2-4, not 6) and write one short note for each:
- bluf: Did they state their conclusion, point, or answer in the first few sentences, before explaining? Burying it under context is the most common weakness.
- structure: Did they follow the ${model.name} phases (${phaseLabels}) in substance and roughly in order? List which phases they clearly covered and which they missed, using the exact phase labels above.
- conciseness: Tight and relevant for a ${targetSeconds}-second answer, or rambling, repetitive, off on tangents? (Not about filler words — those are graded elsewhere.)
- specificity: Concrete numbers, named results, specific examples — or vague claims like "it went better" and "I worked hard"?
- confidence: Did they own their message, or undercut it with hedging and minimizing language ("I think maybe", "kind of", "just", "sort of", "I'm not sure but", apologizing)? List up to 5 such phrases exactly as they said them; an empty list is a good answer.
- closing: Did they end with a clear takeaway, request, or next step — or just trail off?

Step 3: Write a "strong version" of what they said — the same underlying content and ideas (never invent facts they didn't mention; if they had no numbers, use a clearly marked placeholder like "[X%]"), restructured to lead with the conclusion, follow ${model.name}, and end with a clear ask. Roughly ${targetSeconds} seconds when spoken, in ${languageName}, sounding like natural speech, not written prose.

Rules:
- Exactly 3 strengths and exactly 3 tips — tips must be concrete and actionable for their next attempt.
- followedPhases and missingPhases use only the exact phase labels given, together covering all of them once.
- Write every note, strength, tip, and the strong version in ${languageName}.
- Be honest but encouraging — this is coaching, not a test.`;
}

function clampScore(n: unknown): number {
  const v = typeof n === "number" && Number.isFinite(n) ? Math.round(n) : 0;
  return Math.max(0, Math.min(10, v));
}

/**
 * Grades a spoken answer to a workplace situation against a chosen
 * framework across six dimensions and produces a restructured "strong
 * version". Single combined transcribe+grade Gemini call, responseSchema-
 * constrained, same defensive fence-strip as lib/analyzeSpeech.ts.
 */
export async function evaluateExecutiveComm(args: {
  audio: { base64: string; mimeType: string };
  model: StructureModel;
  scenarioPrompt: string;
  targetSeconds: number;
  languageName: string;
}): Promise<ExecCommResult> {
  const { audio, model, scenarioPrompt, targetSeconds, languageName } = args;

  if (!hasGeminiKey()) return mockResult(model);

  const raw = await generateContent(
    [
      { text: buildSystemPrompt(languageName, model, scenarioPrompt, targetSeconds) },
      { inlineData: { mimeType: audio.mimeType, data: audio.base64 } },
    ],
    { responseMimeType: "application/json", responseSchema: EXEC_RESPONSE_SCHEMA },
  );

  const cleaned = raw.trim().replace(/^```(?:json)?\s*|\s*```$/g, "");
  let parsed: Partial<Omit<ExecCommResult, "mocked" | "overallScore">>;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error("Couldn't read the AI's feedback this time — please try again.");
  }

  const transcript = (parsed.transcript ?? "").trim();
  if (!transcript) throw new Error("Gemini returned an empty transcript.");

  const rawScores = (parsed.scores ?? {}) as Partial<Record<ScoreKey, unknown>>;
  const scores = Object.fromEntries(SCORE_KEYS.map((k) => [k, clampScore(rawScores[k])])) as Record<ScoreKey, number>;

  return {
    transcript,
    scores,
    overallScore: overallFrom(scores),
    bluf: parsed.bluf ?? { ledWithConclusion: false, note: "" },
    structure: parsed.structure ?? { followedPhases: [], missingPhases: [], note: "" },
    conciseness: parsed.conciseness ?? { rambling: false, note: "" },
    specificity: parsed.specificity ?? { note: "" },
    confidence: {
      hedgingPhrases: (parsed.confidence?.hedgingPhrases ?? []).slice(0, 5),
      note: parsed.confidence?.note ?? "",
    },
    closing: parsed.closing ?? { hasClearAsk: false, note: "" },
    strengths: (parsed.strengths ?? []).slice(0, 3),
    tips: (parsed.tips ?? []).slice(0, 3),
    strongRewrite: (parsed.strongRewrite ?? "").trim(),
    mocked: false,
  };
}
