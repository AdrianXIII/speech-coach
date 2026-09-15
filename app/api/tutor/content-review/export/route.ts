import { NextResponse } from "next/server";
import { reviewExport } from "@/lib/tutorContentReview";

export function GET() {
  return new NextResponse(JSON.stringify(reviewExport(), null, 2), {
    headers: { "Content-Type": "application/json; charset=utf-8", "Content-Disposition": "attachment; filename=ai-tutor-review-export.json" },
  });
}