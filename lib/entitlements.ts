import type { SupabaseClient } from "@supabase/supabase-js";

/** Premium iff the user has an active or trialing subscription row. */
export async function getEntitlement(supabase: SupabaseClient, userId: string): Promise<boolean> {
  const { data } = await supabase
    .from("subscriptions")
    .select("status")
    .eq("user_id", userId)
    .in("status", ["active", "trialing"])
    .limit(1)
    .maybeSingle();

  return !!data;
}
