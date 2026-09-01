import { cookies } from "next/headers";
import { createHash } from "crypto";

const COOKIE_NAME = "owner_access";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

function hashSecret(secret: string): string {
  return createHash("sha256").update(secret).digest("hex");
}

/**
 * Lets the app owner reach premium content on a device with zero login,
 * surviving private-browsing-style cookie wipes only if the visit was made
 * in a normal (non-private) window — visiting /api/owner-login?token=... once
 * sets this cookie for a year. Cookie value is a hash of the secret, not the
 * secret itself, so a leaked cookie doesn't reveal the login URL.
 */
export async function hasOwnerAccess(): Promise<boolean> {
  const secret = process.env.OWNER_BYPASS_SECRET;
  if (!secret) return false;
  const store = await cookies();
  return store.get(COOKIE_NAME)?.value === hashSecret(secret);
}

export async function grantOwnerAccess(providedToken: string): Promise<boolean> {
  const secret = process.env.OWNER_BYPASS_SECRET;
  if (!secret || providedToken !== secret) return false;
  const store = await cookies();
  store.set(COOKIE_NAME, hashSecret(secret), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: ONE_YEAR_SECONDS,
    path: "/",
  });
  return true;
}
