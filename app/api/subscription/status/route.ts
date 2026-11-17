import { NextResponse } from "next/server";
import { requireApiUser } from "@/lib/requireUser";
import { isPremium } from "@/lib/subscription";

/**
 * GET /api/subscription/status → { premium: boolean }
 * Polled by app/pricing/page.tsx right after a purchase/restore: the App
 * Store purchase completes on the device first, and access only opens once
 * RevenueCat's webhook has written the `subscriptions` row — usually a few
 * seconds later. Sign-in only (not premium-gated, obviously).
 */
export async function GET() {
  const gate = await requireApiUser();
  if (gate instanceof NextResponse) return gate;
  const premium = gate.isAdmin || (await isPremium(gate.id));
  return NextResponse.json({ premium }, { headers: { "Cache-Control": "no-store" } });
}
