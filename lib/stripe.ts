import Stripe from "stripe";

let stripeSingleton: Stripe | null = null;

/** Lazily-created Stripe client — avoids throwing at import time in dev/test before a key is set. */
export function getStripe(): Stripe {
  if (!stripeSingleton) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error("STRIPE_SECRET_KEY is not set.");
    }
    stripeSingleton = new Stripe(key);
  }
  return stripeSingleton;
}
