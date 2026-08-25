import { NextResponse } from "next/server";
import { generateContent, hasGeminiKey } from "@/lib/gemini";

export async function GET() {
  if (!hasGeminiKey()) {
    return NextResponse.json({ hasKey: false });
  }
  try {
    const text = await generateContent([{ text: "Say the word OK and nothing else." }]);
    return NextResponse.json({ hasKey: true, ok: true, text });
  } catch (err) {
    return NextResponse.json({
      hasKey: true,
      ok: false,
      error: err instanceof Error ? err.message : String(err),
    });
  }
}
