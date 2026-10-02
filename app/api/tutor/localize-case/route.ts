import { NextRequest, NextResponse } from "next/server";
import { getCaseById } from "@/lib/caseStudyContent";
import { translateCaseText } from "@/lib/tutorTranslate";
import { getLanguage, type LanguageCode } from "@/lib/languages";
import { requireApiUser } from "@/lib/requireUser";
import { checkRateLimit } from "@/lib/rateLimit";

/**
 * POST /api/tutor/localize-case
 * Looks up a standard-mode case's rubric server-side (never trusting a
 * client-supplied scenario) and returns its title/scenario translated into
 * the target language for display and TTS — the only fields ever shown to
 * the student. keyIssues/expectedConcepts/modelApproach stay English
 * internally for grading (see /api/tutor/evaluate); Gemini grades a
 * translated transcript against an English rubric just fine.
 */
export async function POST(req: NextRequest) {
  const gate = await requireApiUser();
  if (gate instanceof NextResponse) return gate;

  // Own key prefix so this shares no budget with the other Gemini-calling
  // routes — a student browsing AI Tutor cases shouldn't burn the same
  // bucket that gates analyze-speech/pronunciation-feedback/etc.
  if (!(await checkRateLimit(`tutor-localize-case:${gate.id}`))) {
    return NextResponse.json({ error: "Too many requests. Please slow down." }, { status: 429 });
  }

  let body: { caseId?: string; language?: LanguageCode };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Expected JSON body." }, { status: 400 });
  }

  const { caseId, language } = body;
  if (!caseId || !language) {
    return NextResponse.json({ error: "Missing 'caseId' or 'language'." }, { status: 400 });
  }

  const caseStudy = getCaseById(caseId);
  if (!caseStudy) {
    return NextResponse.json({ error: `Unknown case id '${caseId}'.` }, { status: 404 });
  }

  if (language === "en") {
    return NextResponse.json({ title: caseStudy.title, scenario: caseStudy.scenario });
  }

  const translated = await translateCaseText(caseStudy.title, caseStudy.scenario, getLanguage(language).name);
  return NextResponse.json(translated);
}
