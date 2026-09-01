import { NextResponse } from "next/server";
import { grantOwnerAccess } from "@/lib/ownerAccess";

/** Visit once per device: /api/owner-login?token=... sets a year-long premium cookie, no account needed. */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const token = searchParams.get("token") ?? "";

  const granted = await grantOwnerAccess(token);
  if (!granted) {
    return NextResponse.json({ error: "Invalid token." }, { status: 403 });
  }

  return NextResponse.redirect(`${origin}/`);
}
