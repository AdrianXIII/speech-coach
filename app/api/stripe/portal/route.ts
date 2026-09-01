import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

/**
 * POST /api/stripe/portal
 * Creates a Stripe Billing Portal session so a subscribed user can manage
 * or cancel their own subscription, and returns its URL for redirect.
 */
export async function POST(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("stripe_customer_id")
    .eq("id", user.id)
    .single();

  if (!profile?.stripe_customer_id) {
    return NextResponse.json({ error: "No billing account found." }, { status: 404 });
  }

  const stripe = getStripe();
  const origin = new URL(req.url).origin;

  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: `${origin}/account`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe billing portal session creation failed.", err);
    return NextResponse.json({ error: "Could not open billing portal." }, { status: 500 });
  }
}
