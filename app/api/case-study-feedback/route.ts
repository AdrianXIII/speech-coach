import { NextRequest, NextResponse } from "next/server";
import { getCaseStudyFeedback } from "@/lib/caseStudyFeedback";
import { getCaseById } from "@/lib/caseStudyContent";
import { geminiErrorResponse } from "@/lib/gemini";

/**
 * POST /api/case-study-feedback
 * Accepts { caseId: string, transcript: string } and returns Gemini's
 * structured grading of the candidate's spoken answer against that case's
 * rubric (mocked if GEMINI_API_KEY isn't set). The case's rubric is looked
 * up server-side from caseId rather than trusted from the client.
 */
export async function POST(req: NextRequest) {
  let body: { caseId?: string; transcript?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Expected JSON body." }, { status: 400 });
  }

  const caseId = body.caseId;
  if (!caseId) {
    return NextResponse.json({ error: "Missing 'caseId'." }, { status: 400 });
  }

  const caseStudy = getCaseById(caseId);
  if (!caseStudy) {
    return NextResponse.json({ error: `Unknown case id '${caseId}'.` }, { status: 404 });
  }

  try {
    const result = await getCaseStudyFeedback(caseStudy, body.transcript?.trim() ?? "");
    return NextResponse.json(result);
  } catch (err) {
    return geminiErrorResponse(err, "Case study grading failed.");
  }
}
