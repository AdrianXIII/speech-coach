import { NextRequest, NextResponse } from "next/server";
import type { CaseProfession } from "@/lib/caseStudyContent";
import { getDb, hasDatabase } from "@/lib/db";
import { requireUser } from "@/lib/requireUser";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

const MAX_FIELD_CHARS = 200;
const MAX_NOTE_CHARS = 2000;

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
  // IP-keyed, not user-keyed — this route stays usable signed-out (see the
  // doc comment above), so there's no account id to key on for an anonymous
  // caller either way.
  if (!(await checkRateLimit(`tutor-flag:${getClientIp(req)}`))) {
    return NextResponse.json({ error: "Too many requests. Please slow down." }, { status: 429 });
  }

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
    category: body.category.slice(0, MAX_FIELD_CHARS),
    conceptId: body.conceptId?.slice(0, MAX_FIELD_CHARS) ?? null,
    conceptTitle: body.conceptTitle?.slice(0, MAX_FIELD_CHARS) ?? null,
    reason: body.reason ?? "other",
    note: (body.note ?? "").slice(0, MAX_NOTE_CHARS),
    at: new Date().toISOString(),
  };

  console.warn("[TUTOR CONTENT FLAG]", JSON.stringify(flag));

  if (hasDatabase()) {
    // Attached when signed in, but this stays usable signed-out too — it's
    // a low-stakes content report, not user data (see lib/db.ts's
    // tutor_flags.user_id doc comment for why it's ON DELETE SET NULL).
    const user = await requireUser();
    try {
      const sql = await getDb();
      await sql!`
        INSERT INTO tutor_flags (user_id, profession, category, concept_id, concept_title, reason, note)
        VALUES (${user?.id ?? null}, ${flag.profession}, ${flag.category}, ${flag.conceptId}, ${flag.conceptTitle}, ${flag.reason}, ${flag.note})
      `;
    } catch (err) {
      // The console.warn above already captured it — a DB hiccup shouldn't fail the request.
      console.error("Failed to write tutor flag to database:", err);
    }
  }

  return NextResponse.json({ ok: true });
}
