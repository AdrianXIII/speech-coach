import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Emails that are always treated as premium, regardless of subscription
 * state — for testing the paywall itself without a real Stripe purchase.
 * Comma-separated in PREMIUM_OVERRIDE_EMAILS.
 */
const OVERRIDE_EMAILS = (process.env.PREMIUM_OVERRIDE_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

/** Premium iff the user is an override email, or has an active/trialing subscription row. */
export async function getEntitlement(
  supabase: SupabaseClient,
  userId: string,
  email?: string | null,
): Promise<boolean> {
  if (email && OVERRIDE_EMAILS.includes(email.toLowerCase())) {
    return true;
  }

  const { data } = await supabase
    .from("subscriptions")
    .select("status")
    .eq("user_id", userId)
    .in("status", ["active", "trialing"])
    .limit(1)
    .maybeSingle();

  return !!data;
}
