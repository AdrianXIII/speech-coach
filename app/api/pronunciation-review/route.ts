import { NextRequest, NextResponse } from "next/server";
import { hasDatabase } from "@/lib/db";
import {
  listReviewWords,
  addReviewWord,
  markReviewWordPracticed,
  removeReviewWord,
} from "@/lib/pronunciationReview";

/**
 * GET /api/pronunciation-review
 * Lists the Pronunciation trainer's spaced-repetition review words,
 * due-soonest first. Returns an empty list (not an error) when no database
 * is connected yet, consistent with the rest of the app's "gracefully do
 * nothing until configured" convention (see app/api/tutor/flags/route.ts).
 */
export async function GET() {
  if (!hasDatabase()) {
    return NextResponse.json({ words: [], databaseConfigured: false });
  }
  const words = await listReviewWords();
  return NextResponse.json({ words, databaseConfigured: true });
}

/** POST /api/pronunciation-review — body { word: string }. Adds a word to the review list. */
export async function POST(req: NextRequest) {
  if (!hasDatabase()) {
    return NextResponse.json({ error: "No database connected." }, { status: 503 });
  }
  const body = await req.json().catch(() => null);
  const word = typeof body?.word === "string" ? body.word.trim() : "";
  if (!word) {
    return NextResponse.json({ error: "Missing 'word'." }, { status: 400 });
  }

  const result = await addReviewWord(word);
  if (!result) {
    return NextResponse.json({ error: "Could not add word." }, { status: 500 });
  }
  return NextResponse.json({ word: result });
}

/** PATCH /api/pronunciation-review — body { id: number }. Marks a word practiced and advances its schedule. */
export async function PATCH(req: NextRequest) {
  if (!hasDatabase()) {
    return NextResponse.json({ error: "No database connected." }, { status: 503 });
  }
  const body = await req.json().catch(() => null);
  const id = typeof body?.id === "number" ? body.id : null;
  if (id === null) {
    return NextResponse.json({ error: "Missing 'id'." }, { status: 400 });
  }

  const result = await markReviewWordPracticed(id);
  if (!result) {
    return NextResponse.json({ error: `Unknown id '${id}'.` }, { status: 404 });
  }
  return NextResponse.json({ word: result });
}

/** DELETE /api/pronunciation-review — body { id: number }. Removes a word from the review list. */
export async function DELETE(req: NextRequest) {
  if (!hasDatabase()) {
    return NextResponse.json({ error: "No database connected." }, { status: 503 });
  }
  const body = await req.json().catch(() => null);
  const id = typeof body?.id === "number" ? body.id : null;
  if (id === null) {
    return NextResponse.json({ error: "Missing 'id'." }, { status: 400 });
  }

  const ok = await removeReviewWord(id);
  return NextResponse.json({ ok });
}
