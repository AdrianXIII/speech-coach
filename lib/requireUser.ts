import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getDb, hasDatabase } from "@/lib/db";
import { hasAccess } from "@/lib/subscription";

export interface CurrentUser {
  id: number;
  email: string | null;
  isAdmin: boolean;
  trialEndsAt: string;
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
    const rows = await db<{ id: number; email: string | null; is_admin: boolean; trial_ends_at: Date }[]>`
      SELECT id, email, is_admin, trial_ends_at FROM users WHERE id = ${Number(session.user.id)}
    `;
    const u = rows[0];
    if (!u) return null;
    return { id: u.id, email: u.email, isAdmin: u.is_admin, trialEndsAt: u.trial_ends_at.toISOString() };
  } catch (err) {
    // Same degrade-don't-throw posture as every other lib/*.ts file that
    // touches the database (see lib/pronunciationReview.ts) — a DB hiccup
    // here must not crash every single page load; it just means "treat
    // this request as signed out."
    console.error("requireUser failed:", err instanceof Error ? err.message : err);
    return null;
  }
}

/**
 * The blanket paywall gate (see lib/subscription.ts's hasAccess()): every
 * trainer page.tsx server component calls this first. Redirects rather than
 * rendering nothing, per Next.js's own auth guidance against silently
 * returning null in a layout/page — a redirect is the only reliable way to
 * stop a route segment's children from rendering/being reachable.
 */
export async function requireAccess(): Promise<CurrentUser> {
  const user = await requireUser();
  if (!user) redirect("/sign-in");
  if (!(await hasAccess(user))) redirect("/pricing");
  return user;
}
