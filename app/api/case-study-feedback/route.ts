import { NextRequest, NextResponse } from "next/server";
import { getCaseStudyFeedback } from "@/lib/caseStudyFeedback";
import { getCaseById } from "@/lib/caseStudyContent";
import { geminiErrorResponse } from "@/lib/gemini";
import { createClient } from "@/lib/supabase/server";
import { getEntitlement } from "@/lib/entitlements";

/**
 * POST /api/case-study-feedback
 * Accepts { caseId: string, transcript: string } and returns Gemini's
 * structured grading of the candidate's spoken answer against that case's
 * rubric (mocked if GEMINI_API_KEY isn't set). The case's rubric is looked
 * up server-side from caseId rather than trusted from the client. Premium
 * cases are re-checked here too — the client-side lock is only UX, this is
 * the actual boundary since any caseId could otherwise be POSTed directly.
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

  if (caseStudy.premium) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const isPremium = user ? await getEntitlement(supabase, user.id) : false;
    if (!isPremium) {
      return NextResponse.json({ error: "This case requires Speech Coach Premium." }, { status: 403 });
    }
  }

  try {
    const result = await getCaseStudyFeedback(caseStudy, body.transcript?.trim() ?? "");
    return NextResponse.json(result);
  } catch (err) {
    return geminiErrorResponse(err, "Case study grading failed.");
  }
}
