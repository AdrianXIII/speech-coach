import { NextRequest, NextResponse } from "next/server";
import type { CaseProfession } from "@/lib/caseStudyContent";

interface FlagBody {
  profession?: CaseProfession;
  category?: string;
  conceptId?: string;
  conceptTitle?: string;
  reason?: "inaccurate" | "shallow" | "other";
  note?: string;
}

/**
 * POST /api/tutor/flag
 * Records a "this content seems wrong/shallow" report from a student. This
 * app has no database, so the durable copy is the Vercel function log —
 * search "[TUTOR CONTENT FLAG]" in the project's Runtime Logs to review
 * flags. The client also keeps its own local copy (see lib/tutorFlags.ts)
 * so flags are visible in-app on the reporting device even between deploys.
 */
export async function POST(req: NextRequest) {
  let body: FlagBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Expected JSON body." }, { status: 400 });
  }

  if (!body.profession || !body.category) {
    return NextResponse.json({ error: "Missing 'profession' or 'category'." }, { status: 400 });
  }

  console.warn(
    "[TUTOR CONTENT FLAG]",
    JSON.stringify({
      profession: body.profession,
      category: body.category,
      conceptId: body.conceptId ?? null,
      conceptTitle: body.conceptTitle ?? null,
      reason: body.reason ?? "other",
      note: body.note ?? "",
      at: new Date().toISOString(),
    }),
  );

  return NextResponse.json({ ok: true });
}
