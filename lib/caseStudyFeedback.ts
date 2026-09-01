import { generateContent, hasGeminiKey } from "@/lib/gemini";
import type { CaseStudy } from "@/lib/caseStudyContent";

export interface CaseStudyFeedback {
  /** 0-100 overall score. */
  score: number;
  /** One-line verdict, e.g. "Strong, well-structured answer." */
  verdict: string;
  /** How well the answer addressed the case's key issues. */
  correctnessFeedback: string;
  /** How well-organized the reasoning was (structure, logical flow). */
  structureFeedback: string;
  /** How well the answer used professional vocabulary/frameworks for this field. */
  vocabularyFeedback: string;
  /** Concrete topics/frameworks to read up on before trying again, tailored to the gaps in this answer. */
  readingTips: string[];
  mocked: boolean;
}

const PROMPT_TEMPLATE = (caseStudy: CaseStudy, transcript: string) => `You are an expert ${
  caseStudy.profession === "business"
    ? "management consultant and business school professor"
    : caseStudy.profession === "law"
      ? "law professor and senior litigator"
      : "political strategist and public policy professor"
} grading a spoken case study response. Be rigorous but constructive — this is a training exercise,
not a real client engagement, so the goal is helping the person improve.

CASE PRESENTED TO THE CANDIDATE:
"""
${caseStudy.scenario}
"""

KEY ISSUES A STRONG ANSWER SHOULD ADDRESS:
${caseStudy.keyIssues.map((i) => `- ${i}`).join("\n")}

PROFESSIONAL CONCEPTS/JARGON A STRONG ANSWER WOULD USE:
${caseStudy.expectedConcepts.join(", ")}

WHAT A STRONG ANSWER LOOKS LIKE:
${caseStudy.modelApproach}

THE CANDIDATE'S SPOKEN ANSWER (transcribed, may contain minor transcription errors — don't penalize
for that):
"""
${transcript || "(no speech was detected)"}
"""

Evaluate the candidate's answer and respond with ONLY a JSON object (no markdown fences, no
commentary) matching exactly this shape:
{
  "score": <integer 0-100>,
  "verdict": "<one short sentence overall verdict>",
  "correctnessFeedback": "<2-3 sentences: did they identify and address the real key issues, or miss the point?>",
  "structureFeedback": "<2-3 sentences: was their reasoning organized and easy to follow, or rambling/disorganized?>",
  "vocabularyFeedback": "<2-3 sentences: did they use precise professional terminology/frameworks for this field, or stay at a basic/vague register?>",
  "readingTips": ["<specific topic or framework to study>", "<another one>", "<a third one, tailored to this specific answer's gaps>"]
}

If no speech was detected or the answer is essentially empty, score it 0 and say so plainly rather
than inventing feedback about content that wasn't there.`;

function mockFeedback(caseStudy: CaseStudy): CaseStudyFeedback {
  return {
    score: 0,
    verdict: "Mock mode: set GEMINI_API_KEY for real AI grading.",
    correctnessFeedback:
      "Mock mode: once a Gemini API key is configured, this will assess whether you addressed the case's real key issues.",
    structureFeedback:
      "Mock mode: this will assess whether your reasoning was organized and easy to follow.",
    vocabularyFeedback:
      "Mock mode: this will assess your use of professional terminology for this field.",
    readingTips: caseStudy.furtherReading,
    mocked: true,
  };
}

/**
 * Sends a case study's rubric plus the candidate's spoken (transcribed)
 * answer to Gemini for structured grading. Text-only — no audio — since
 * grading is about reasoning content, not pronunciation, so this reuses
 * the same free Web Speech API transcript every other spoken-response
 * feature in the app already produces. Falls back to a mock response when
 * GEMINI_API_KEY isn't set.
 */
export async function getCaseStudyFeedback(
  caseStudy: CaseStudy,
  transcript: string,
): Promise<CaseStudyFeedback> {
  if (!hasGeminiKey()) {
    return mockFeedback(caseStudy);
  }

  const raw = await generateContent(
    [{ text: PROMPT_TEMPLATE(caseStudy, transcript) }],
    { responseMimeType: "application/json" },
  );

  let parsed: Omit<CaseStudyFeedback, "mocked">;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("Gemini returned malformed JSON for case study feedback.");
  }

  return {
    score: Math.max(0, Math.min(100, Math.round(parsed.score))),
    verdict: parsed.verdict,
    correctnessFeedback: parsed.correctnessFeedback,
    structureFeedback: parsed.structureFeedback,
    vocabularyFeedback: parsed.vocabularyFeedback,
    readingTips: Array.isArray(parsed.readingTips) && parsed.readingTips.length > 0
      ? parsed.readingTips
      : caseStudy.furtherReading,
    mocked: false,
  };
}
