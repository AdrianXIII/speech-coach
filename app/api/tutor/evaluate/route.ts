import { NextRequest, NextResponse } from "next/server";
import { evaluateTutorAnswer } from "@/lib/tutorEngine";
import { getCaseById, type CaseProfession } from "@/lib/caseStudyContent";
import { getFundamentals } from "@/lib/caseStudyFundamentals";
import { geminiErrorResponse } from "@/lib/gemini";
import type { TutorNewsItem } from "@/lib/tutorNews";
import type { TutorProfile } from "@/lib/tutorProfile";
import type { CountryCode } from "@/lib/countryContext";
import { getLanguage, type LanguageCode } from "@/lib/languages";

/**
 * POST /api/tutor/evaluate
 * Accepts multipart/form-data: profession, category, transcript, and either
 * a caseId (Core mode — the rubric is looked up server-side, not trusted
 * from the client) or a newsItem + profile (Live News mode), plus an
 * optional audio recording. Returns the combined knowledge/language/
 * pronunciation/summary feedback in one call.
 */
export async function POST(req: NextRequest) {
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Expected multipart/form-data." }, { status: 400 });
  }

  const profession = formData.get("profession")?.toString() as CaseProfession | undefined;
  const category = formData.get("category")?.toString();
  const transcript = formData.get("transcript")?.toString() ?? "";
  const caseId = formData.get("caseId")?.toString();
  const newsItemRaw = formData.get("newsItem")?.toString();
  const profileRaw = formData.get("profile")?.toString();
  const jurisdiction = formData.get("jurisdiction")?.toString() as CountryCode | undefined;
  const language = formData.get("language")?.toString() as LanguageCode | undefined;
  const audio = formData.get("audio");

  if (!profession || !category) {
    return NextResponse.json({ error: "Missing 'profession' or 'category'." }, { status: 400 });
  }

  const caseStudy = caseId ? getCaseById(caseId) : null;
  if (caseId && !caseStudy) {
    return NextResponse.json({ error: `Unknown case id '${caseId}'.` }, { status: 404 });
  }

  let newsItem: TutorNewsItem | null = null;
  if (newsItemRaw) {
    try {
      newsItem = JSON.parse(newsItemRaw);
    } catch {
      return NextResponse.json({ error: "Malformed 'newsItem'." }, { status: 400 });
    }
  }

  let profile: TutorProfile | null = null;
  if (profileRaw) {
    try {
      profile = JSON.parse(profileRaw);
    } catch {
      return NextResponse.json({ error: "Malformed 'profile'." }, { status: 400 });
    }
  }

  if (!caseStudy && !newsItem) {
    return NextResponse.json({ error: "Provide either 'caseId' or 'newsItem'." }, { status: 400 });
  }

  let audioPart: { base64: string; mimeType: string } | undefined;
  if (audio instanceof Blob && audio.size > 0) {
    const buffer = await audio.arrayBuffer();
    audioPart = { base64: Buffer.from(buffer).toString("base64"), mimeType: audio.type || "audio/webm" };
  }

  try {
    const result = await evaluateTutorAnswer({
      profession,
      category,
      fundamentals: getFundamentals(profession, category),
      transcript: transcript.trim(),
      caseStudy,
      newsItem,
      profile,
      audio: audioPart,
      jurisdiction,
      languageName: language ? getLanguage(language).name : undefined,
    });
    return NextResponse.json(result);
  } catch (err) {
    return geminiErrorResponse(err, "Tutor evaluation failed.");
  }
}
