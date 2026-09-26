"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { Capacitor } from "@capacitor/core";
import { Purchases } from "@revenuecat/purchases-capacitor";

/**
 * Configures the RevenueCat SDK once, then links the current account to it
 * via Purchases.logIn(String(userId)) — that log-in id becomes
 * RevenueCat's app_user_id, which app/api/webhooks/revenuecat/route.ts
 * reads straight back as this app's own numeric user id, no separate
 * mapping table needed. Mounted once in app/layout.tsx.
 *
 * RevenueCat's Capacitor SDK only functions on a native platform (iOS/
 * Android) — it's a no-op in a desktop/mobile browser tab, which is fine:
 * hasAccess() in lib/subscription.ts is the real, server-side gate; this is
 * just what lets a signed-in phone user actually complete a purchase.
 */
export function RevenueCatInit() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;
    const apiKey = process.env.NEXT_PUBLIC_REVENUECAT_IOS_KEY;
    if (!apiKey) return;

    Purchases.configure({ apiKey }).catch((err) => console.error("RevenueCat configure failed:", err));
  }, []);

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;
    if (status !== "authenticated" || !session?.user?.id) return;

    Purchases.logIn({ appUserID: String(session.user.id) }).catch((err) =>
      console.error("RevenueCat logIn failed:", err),
    );
  }, [status, session?.user?.id]);

  return null;
}
