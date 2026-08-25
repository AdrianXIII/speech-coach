import { NextRequest, NextResponse } from "next/server";
import type { AnalysisResult } from "@/types/analysis";
import type { FeedbackResult } from "@/types/feedback";

/**
 * POST /api/feedback
 * Takes an AnalysisResult and returns AI-generated coaching feedback.
 *
 * TODO: wire up an LLM call here (e.g. the Claude API) with a prompt built
 * from the analysis metrics, asking for scored categories + tips.
 */
export async function POST(req: NextRequest) {
  const analysis = (await req.json()) as AnalysisResult;

  if (!analysis.sessionId) {
    return NextResponse.json({ error: "Missing 'sessionId'." }, { status: 400 });
  }

  // Placeholder feedback — replace with a real LLM-generated result.
  const feedback: FeedbackResult = {
    sessionId: analysis.sessionId,
    overallScore: 0,
    categories: [
      { label: "Clarity", score: 0, summary: "", tips: [] },
      { label: "Pace", score: 0, summary: "", tips: [] },
      { label: "Filler words", score: 0, summary: "", tips: [] },
      { label: "Confidence", score: 0, summary: "", tips: [] },
    ],
    strengths: [],
    areasToImprove: [],
  };

  return NextResponse.json(feedback);
}
