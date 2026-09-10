import { NextRequest, NextResponse } from "next/server";
import type { CaseProfession } from "@/lib/caseStudyContent";
import { getDb, hasDatabase } from "@/lib/db";

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
 * Records a "this content seems wrong/shallow" report from a student.
 * Written to Postgres when a database is connected (see lib/db.ts) so
 * flags are reviewable across devices/sessions via GET /api/tutor/flags.
 * Always also logged to the Vercel function log as a durable fallback for
 * before a database is set up, or if the write itself fails. The client
 * also keeps its own local copy (see lib/tutorFlags.ts) so flags stay
 * visible in-app on the reporting device either way.
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

  const flag = {
    profession: body.profession,
    category: body.category,
    conceptId: body.conceptId ?? null,
    conceptTitle: body.conceptTitle ?? null,
    reason: body.reason ?? "other",
    note: body.note ?? "",
    at: new Date().toISOString(),
  };

  console.warn("[TUTOR CONTENT FLAG]", JSON.stringify(flag));

  if (hasDatabase()) {
    try {
      const sql = await getDb();
      await sql!`
        INSERT INTO tutor_flags (profession, category, concept_id, concept_title, reason, note)
        VALUES (${flag.profession}, ${flag.category}, ${flag.conceptId}, ${flag.conceptTitle}, ${flag.reason}, ${flag.note})
      `;
    } catch (err) {
      // The console.warn above already captured it — a DB hiccup shouldn't fail the request.
      console.error("Failed to write tutor flag to database:", err);
    }
  }

  return NextResponse.json({ ok: true });
}
