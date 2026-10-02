import { scrypt, randomBytes, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(scrypt);
const KEY_LENGTH = 64;

// scrypt's cost scales with input size, not just its configured work
// factor — an unbounded password lets a caller force an expensive hash on
// every request (register, reset-password, and every single sign-in
// attempt via lib/auth.ts's Credentials authorize()), a cheap CPU-exhaustion
// lever since it needs no account first. 256 chars covers any real
// passphrase with room to spare.
export const MAX_PASSWORD_LENGTH = 256;

/**
 * Password hashing for the email+password Credentials provider (lib/auth.ts)
 * — Node's built-in scrypt, no extra dependency (bcrypt/argon2 would need a
 * native binding, awkward in a Vercel serverless bundle; this app already
 * prefers built-ins/managed services over vendored complexity elsewhere).
 * Stored as "salt:hash", both hex — see users.password_hash in lib/db.ts.
 */
export async function hashPassword(password: string): Promise<string> {
  if (password.length > MAX_PASSWORD_LENGTH) throw new Error("Password too long.");
  const salt = randomBytes(16).toString("hex");
  const derivedKey = (await scryptAsync(password, salt, KEY_LENGTH)) as Buffer;
  return `${salt}:${derivedKey.toString("hex")}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  // Checked before touching scrypt at all — this is the one call site
  // (lib/auth.ts's authorize()) that runs on every sign-in attempt, not
  // just account creation, so it's the actual DoS-relevant path.
  if (password.length > MAX_PASSWORD_LENGTH) return false;
  const [salt, hashHex] = stored.split(":");
  if (!salt || !hashHex) return false;
  const hash = Buffer.from(hashHex, "hex");
  const derivedKey = (await scryptAsync(password, salt, hash.length)) as Buffer;
  // timingSafeEqual throws on length mismatch rather than returning false.
  if (derivedKey.length !== hash.length) return false;
  return timingSafeEqual(derivedKey, hash);
}
