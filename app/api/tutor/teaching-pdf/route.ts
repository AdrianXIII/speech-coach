import { NextRequest, NextResponse } from "next/server";
import { buildTeachingBrief } from "@/lib/tutorEngine";
import { translateTeachingContent } from "@/lib/tutorTranslate";
import { generateTeachingPdf } from "@/lib/teachingPdf";
import type { CaseProfession } from "@/lib/caseStudyContent";
import type { CountryCode } from "@/lib/countryContext";
import { getLanguage, type LanguageCode } from "@/lib/languages";

/**
 * GET /api/tutor/teaching-pdf?profession=...&category=...&jurisdiction=...&language=...
 * Mirrors localize-teach's lookup/translation path (same params, same
 * buildTeachingBrief + translateTeachingContent call), then renders the
 * result as a PDF instead of JSON. A category with no cited sources still
 * produces a valid PDF — generateTeachingPdf just omits the Sources
 * section.
 */
export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const profession = params.get("profession") as CaseProfession | null;
  const category = params.get("category");
  const jurisdiction = (params.get("jurisdiction") || undefined) as CountryCode | undefined;
  const language = (params.get("language") || "en") as LanguageCode;

  if (!profession || !category) {
    return NextResponse.json({ error: "Missing 'profession' or 'category'." }, { status: 400 });
  }

  const brief = buildTeachingBrief(profession, category, jurisdiction);
  if (!brief.teaching) {
    return NextResponse.json({ error: "No teaching content for this category." }, { status: 404 });
  }

  const teaching = language === "en" ? brief.teaching : await translateTeachingContent(brief.teaching, getLanguage(language).name);
  const pdf = await generateTeachingPdf(teaching, { profession, category, jurisdiction });

  return new NextResponse(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${category.replace(/[^a-z0-9]+/gi, "-")}.pdf"`,
    },
  });
}
