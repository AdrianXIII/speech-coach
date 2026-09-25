import { generateContent, hasGeminiKey } from "@/lib/gemini";
import type { StructureModel } from "@/lib/structureModels";
import type { CommScenario } from "@/lib/executiveCommScenarios";

export interface ExecCommResult {
  transcript: string;
  bluf: { ledWithConclusion: boolean; note: string };
  structure: { followedPhases: string[]; missingPhases: string[]; note: string };
  conciseness: { rambling: boolean; note: string };
  strengths: string[]; // exactly 3
  tips: string[]; // exactly 3
  strongRewrite: string;
  mocked: boolean;
}

const MOCK_TRANSCRIPT =
  "So, um, there was this thing that happened with the project, it took a while because there were " +
  "a bunch of issues, and, like, I had to figure some stuff out, and eventually it got fixed, so, yeah, " +
  "it's better now I guess.";

function mockResult(model: StructureModel): ExecCommResult {
  return {
    transcript: MOCK_TRANSCRIPT,
    bluf: { ledWithConclusion: false, note: "Mock mode: set GEMINI_API_KEY for real BLUF grading." },
    structure: {
      followedPhases: [],
      missingPhases: model.phases.map((p) => p.label),
      note: "Mock mode: set GEMINI_API_KEY for real structure grading.",
    },
    conciseness: { rambling: true, note: "Mock mode: set GEMINI_API_KEY for real feedback." },
    strengths: [
      "Mock mode: set GEMINI_API_KEY to get real coaching feedback here.",
      "Your recording was captured and sent through the grading pipeline successfully.",
      "The full pipeline (record → transcribe → grade → rewrite) is wired up end-to-end.",
    ],
    tips: [
      "Add GEMINI_API_KEY to your environment to replace this mock with real AI coaching.",
      "Lead with your conclusion in the first 10-15 seconds, then justify it.",
      `Try structuring your answer around ${model.name}: ${model.phases.map((p) => p.label).join(" → ")}.`,
    ],
    strongRewrite: "Mock mode: set GEMINI_API_KEY to see a real restructured version of your answer here.",
    mocked: true,
  };
}

const EXEC_RESPONSE_SCHEMA = {
  type: "OBJECT",
  properties: {
    transcript: { type: "STRING" },
    bluf: {
      type: "OBJECT",
      properties: {
        ledWithConclusion: { type: "BOOLEAN" },
        note: { type: "STRING" },
      },
      required: ["ledWithConclusion", "note"],
    },
    structure: {
      type: "OBJECT",
      properties: {
        followedPhases: { type: "ARRAY", items: { type: "STRING" } },
        missingPhases: { type: "ARRAY", items: { type: "STRING" } },
        note: { type: "STRING" },
      },
      required: ["followedPhases", "missingPhases", "note"],
    },
    conciseness: {
      type: "OBJECT",
      properties: {
        rambling: { type: "BOOLEAN" },
        note: { type: "STRING" },
      },
      required: ["rambling", "note"],
    },
    strengths: { type: "ARRAY", items: { type: "STRING" }, minItems: 3, maxItems: 3 },
    tips: { type: "ARRAY", items: { type: "STRING" }, minItems: 3, maxItems: 3 },
    strongRewrite: { type: "STRING" },
  },
  required: ["transcript", "bluf", "structure", "conciseness", "strengths", "tips", "strongRewrite"],
};

function buildSystemPrompt(languageName: string, model: StructureModel, scenario: CommScenario): string {
  const phaseLabels = model.phases.map((p) => p.label).join(", ");
  return `You are an executive communication coach helping a professional get to the point clearly, persuasively, and concisely at work — not grading their pronunciation or speaking pace, only how they structured what they said.

The speaker was given this scenario:
"${scenario.prompt}"

They chose the ${model.name} framework (${model.fullName}), with these phases: ${phaseLabels}.

You will be given an audio recording of their spoken answer, in ${languageName}.

Step 1: Transcribe it exactly word-for-word, in the language spoken.

Step 2: Judge whether they led with their conclusion/point/bottom line in roughly the first 10-15 seconds, before justifying it (BLUF — Bottom Line Up Front). This matters regardless of which framework they picked: leading with the point is always a strength, burying it under context first is always a weakness.

Step 3: Judge how well they followed the ${model.name} framework's phases specifically — are ${phaseLabels} all present, in substance and roughly the right order? List which phases they clearly covered (using the exact phase labels above) and which they missed or skipped.

Step 4: Judge conciseness — did they stay tight and relevant, or ramble, repeat themselves, or go on tangents? This is about focus, not speed or filler words — don't comment on "um"/"uh", that's graded elsewhere in this app.

Step 5: Write a rewritten "strong version" of what they said — same underlying content and ideas, but restructured to lead with the conclusion and cleanly follow the ${model.name} framework. Keep it roughly the same length as what they actually said, in ${languageName}, and make it sound like a natural spoken answer, not written prose.

Respond with a JSON object matching exactly this shape:
{
  "transcript": "<verbatim transcript>",
  "bluf": { "ledWithConclusion": true or false, "note": "<one short sentence>" },
  "structure": { "followedPhases": ["<phase label>", ...], "missingPhases": ["<phase label>", ...], "note": "<one short sentence>" },
  "conciseness": { "rambling": true or false, "note": "<one short sentence>" },
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "tips": ["<actionable tip 1>", "<actionable tip 2>", "<actionable tip 3>"],
  "strongRewrite": "<the rewritten strong version, in ${languageName}>"
}

Rules:
- Exactly 3 strengths and exactly 3 tips — no more, no fewer.
- followedPhases and missingPhases must only use the exact phase labels given above, together covering all of them exactly once.
- Be honest but encouraging — this is coaching, not a test.
- strongRewrite must be written in ${languageName}.`;
}

/**
 * Grades a spoken answer to a workplace scenario against a chosen
 * rhetorical framework (PREP/STAR/BLUF) — did they lead with the
 * conclusion, follow the framework's phases, stay concise — and produces a
 * restructured "strong version" of what they said. Modeled directly on
 * lib/analyzeSpeech.ts: single combined transcribe+grade Gemini call,
 * responseSchema-constrained (the only bug-fixed JSON pattern in this
 * codebase — see analyzeSpeech.ts's own doc comment for why that matters),
 * with the same defensive fence-strip before parsing.
 */
export async function evaluateExecutiveComm(args: {
  audio: { base64: string; mimeType: string };
  model: StructureModel;
  scenario: CommScenario;
  languageName: string;
}): Promise<ExecCommResult> {
  const { audio, model, scenario, languageName } = args;

  if (!hasGeminiKey()) return mockResult(model);

  const raw = await generateContent(
    [
      { text: buildSystemPrompt(languageName, model, scenario) },
      { inlineData: { mimeType: audio.mimeType, data: audio.base64 } },
    ],
    { responseMimeType: "application/json", responseSchema: EXEC_RESPONSE_SCHEMA },
  );

  const cleaned = raw.trim().replace(/^```(?:json)?\s*|\s*```$/g, "");
  let parsed: Partial<Omit<ExecCommResult, "mocked">>;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error("Couldn't read the AI's feedback this time — please try again.");
  }

  const transcript = (parsed.transcript ?? "").trim();
  if (!transcript) throw new Error("Gemini returned an empty transcript.");

  return {
    transcript,
    bluf: parsed.bluf ?? { ledWithConclusion: false, note: "" },
    structure: parsed.structure ?? { followedPhases: [], missingPhases: [], note: "" },
    conciseness: parsed.conciseness ?? { rambling: false, note: "" },
    strengths: (parsed.strengths ?? []).slice(0, 3),
    tips: (parsed.tips ?? []).slice(0, 3),
    strongRewrite: (parsed.strongRewrite ?? "").trim(),
    mocked: false,
  };
}
