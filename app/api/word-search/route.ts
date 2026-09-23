import { NextRequest, NextResponse } from "next/server";
import { suggestWords } from "@/lib/wordSearch";

/**
 * GET /api/word-search?q=fisiks
 * Spelling-help suggestions for a partial or phonetically-guessed input —
 * pure local lookup against the CMU Pronouncing Dictionary, no AI call.
 */
export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") ?? "";
  return NextResponse.json({ suggestions: suggestWords(q) });
}
