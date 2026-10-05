import { NextRequest, NextResponse } from "next/server";
import { evaluateTutorAnswer } from "@/lib/tutorEngine";
import { getCaseById, type CaseProfession } from "@/lib/caseStudyContent";
import { getFundamentals } from "@/lib/caseStudyFundamentals";
import { geminiErrorResponse } from "@/lib/gemini";
import type { TutorNewsItem } from "@/lib/tutorNews";
import type { TutorProfile } from "@/lib/tutorProfile";
import type { CountryCode } from "@/lib/countryContext";
import { getLanguage, type LanguageCode } from "@/lib/languages";
import { requireApiUser } from "@/lib/requireUser";
import { checkRateLimit } from "@/lib/rateLimit";
import { isPremium } from "@/lib/subscription";
import { canUseToday, markUsedToday } from "@/lib/usageLimitServer";
import { logActivity } from "@/lib/trainerActivity";
import { isFreeAiTutorCategory } from "@/lib/usageLimit";

const MAX_AUDIO_BYTES = 15 * 1024 * 1024;
// A spoken answer transcribed to text — generous for several minutes of
// speech, tight enough to stop an arbitrarily large string reaching Gemini.
const MAX_TRANSCRIPT_CHARS = 8000;
// newsItem/profile are structured JSON the client itself generated a few
// steps earlier in the same session (not free-form user input), so this is
// a sanity ceiling against a malformed/oversized payload, not a UX limit.
const MAX_JSON_FIELD_CHARS = 20000;
export const maxDuration = 60;
const FEATURE = "aitutor";

/**
 * POST /api/tutor/evaluate
 * Accepts multipart/form-data: profession, category, transcript, and either
 * a caseId (Core mode — the rubric is looked up server-side, not trusted
 * from the client) or a newsItem + profile (Live News mode), plus an
 * optional audio recording. Returns the combined knowledge/language/
 * pronunciation/summary feedback in one call.
 */
export async function POST(req: NextRequest) {
  const gate = await requireApiUser();
  if (gate instanceof NextResponse) return gate;

  if (!(await checkRateLimit(String(gate.id)))) {
    return NextResponse.json({ error: "Too many requests. Please slow down." }, { status: 429 });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Expected multipart/form-data." }, { status: 400 });
  }

  const profession = formData.get("profession")?.toString() as CaseProfession | undefined;
  const category = formData.get("category")?.toString();
  const transcript = (formData.get("transcript")?.toString() ?? "").slice(0, MAX_TRANSCRIPT_CHARS);
  const caseId = formData.get("caseId")?.toString();
  const newsItemRaw = formData.get("newsItem")?.toString().slice(0, MAX_JSON_FIELD_CHARS);
  const profileRaw = formData.get("profile")?.toString().slice(0, MAX_JSON_FIELD_CHARS);
  const jurisdiction = formData.get("jurisdiction")?.toString() as CountryCode | undefined;
  const language = formData.get("language")?.toString() as LanguageCode | undefined;
  const audio = formData.get("audio");

  if (!profession || !category) {
    return NextResponse.json({ error: "Missing 'profession' or 'category'." }, { status: 400 });
  }

  const premium = await isPremium(gate.id);
  if (!premium) {
    // Category lock never trusts the client — someone could otherwise call
    // this route directly for a locked category even if the UI (see
    // components/shared/CategoryPicker.tsx) never lets them pick it.
    if (!isFreeAiTutorCategory(profession, category)) {
      return NextResponse.json(
        { error: "This category requires a subscription.", upgradeUrl: "/pricing" },
        { status: 402 },
      );
    }
    if (!(await canUseToday(gate.id, FEATURE))) {
      return NextResponse.json({ error: "Free daily use already used today.", upgradeUrl: "/pricing" }, { status: 402 });
    }
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

  if (audio instanceof Blob && audio.size > MAX_AUDIO_BYTES) {
    return NextResponse.json({ error: "Recording too large." }, { status: 413 });
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
    if (!premium && !result.mocked) await markUsedToday(gate.id, FEATURE);
    // TutorFeedback has no numeric score (knowledge/language/pronunciation
    // are qualitative) — log a bare session, still counts for streak/goal.
    if (!result.mocked) await logActivity(gate.id, FEATURE);
    return NextResponse.json(result);
  } catch (err) {
    return geminiErrorResponse(err, "Tutor evaluation failed.");
  }
}
