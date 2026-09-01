import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getEntitlement } from "@/lib/entitlements";

/** GET /api/entitlement — used by AuthProvider to know if the signed-in user is premium. */
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ premium: false });
  }

  const premium = await getEntitlement(supabase, user.id, user.email);
  return NextResponse.json({ premium });
}
