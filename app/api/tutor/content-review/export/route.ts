import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/requireUser";
import { reviewExport } from "@/lib/tutorContentReview";

export async function GET() {
  const gate = await requireAdmin();
  if (gate instanceof NextResponse) return gate;

  return new NextResponse(JSON.stringify(reviewExport(), null, 2), {
    headers: { "Content-Type": "application/json; charset=utf-8", "Content-Disposition": "attachment; filename=ai-tutor-review-export.json" },
  });
}