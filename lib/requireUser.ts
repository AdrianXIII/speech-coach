import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getDb, hasDatabase } from "@/lib/db";

export interface CurrentUser {
  id: number;
  email: string | null;
  isAdmin: boolean;
}

/**
 * The DAL-style guard this app's other lib/*.ts files already follow
 * (hasDatabase()'s boolean-return, degrade-gracefully idiom): returns the
 * signed-in user's account row, or null if there's no session, no database
 * configured, or the session's user has since been deleted. Never throws —
 * callers decide whether null means "redirect to sign-in" (a page) or
 * "401" (an API route).
 */
export async function requireUser(): Promise<CurrentUser | null> {
  if (!hasDatabase()) return null;
  try {
    const session = await auth();
    if (!session?.user?.id) return null;

    const db = await getDb();
    if (!db) return null;
    const rows = await db<{ id: number; email: string | null; is_admin: boolean }[]>`
      SELECT id, email, is_admin FROM users WHERE id = ${Number(session.user.id)}
    `;
    const u = rows[0];
    if (!u) return null;
    return { id: u.id, email: u.email, isAdmin: u.is_admin };
  } catch (err) {
    // Next.js's own internal control-flow signals (a build-time "this route
    // needs headers() so it can't be static" bailout, a redirect() thrown
    // from further down the call stack, etc.) carry a `digest` string and
    // MUST propagate — swallowing one here would break static-generation
    // detection or silently eat a redirect. Only an actual DB/query error
    // (no digest) should degrade to "treat this request as signed out",
    // same posture as every other lib/*.ts file that touches the database
    // (see lib/pronunciationReview.ts) — a DB hiccup must not crash every
    // single page load.
    if (err && typeof err === "object" && "digest" in err) throw err;
    console.error("requireUser failed:", err instanceof Error ? err.message : err);
    return null;
  }
}

/**
 * Every trainer page.tsx calls this first — sign-in only, NOT a
 * subscription check. There's no blanket paywall anymore: a signed-in free
 * account can open every trainer, just limited to one use a day per
 * feature (lib/usageLimit.ts), enforced where each trainer actually does
 * its costly work, not here. Redirects rather than rendering nothing, per
 * Next.js's own auth guidance against silently returning null in a
 * layout/page — a redirect is the only reliable way to stop a route
 * segment's children from rendering/being reachable.
 */
export async function requireSignedIn(): Promise<CurrentUser> {
  const user = await requireUser();
  if (!user) redirect("/sign-in");
  return user;
}

/**
 * The Route Handler equivalent of requireSignedIn() — every route also
 * checks this itself, not just the page.tsx that fronts it, since a page
 * redirect alone is trivially bypassed by calling the API directly (the
 * Next.js auth guide's own "Route Handlers" section warns exactly against
 * relying on a page-level check alone). Returns a ready-made error response
 * to return as-is on failure, or the user on success — callers do
 * `const gate = await requireApiUser(); if (gate instanceof NextResponse) return gate;`
 * Sign-in only, same reasoning as requireSignedIn() above — the daily-use
 * limit for a given feature is checked separately, inside the route, via
 * lib/usageLimit.ts's canUseToday()/markUsedToday().
 */
export async function requireApiUser(): Promise<CurrentUser | NextResponse> {
  const user = await requireUser();
  if (!user) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  return user;
}

/**
 * Gates the developer-only content-review tools (app/api/tutor/flags,
 * .../content-review/approved-export) — these used to be fully
 * unauthenticated, fine for a solo-tester app but not once it's public.
 * Admin, not subscription — an is_admin account never needs to pay to reach
 * its own review tools.
 */
export async function requireAdmin(): Promise<CurrentUser | NextResponse> {
  const user = await requireUser();
  if (!user) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  if (!user.isAdmin) return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  return user;
}
