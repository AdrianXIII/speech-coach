import { scrypt, randomBytes, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(scrypt);
const KEY_LENGTH = 64;

/**
 * Password hashing for the email+password Credentials provider (lib/auth.ts)
 * — Node's built-in scrypt, no extra dependency (bcrypt/argon2 would need a
 * native binding, awkward in a Vercel serverless bundle; this app already
 * prefers built-ins/managed services over vendored complexity elsewhere).
 * Stored as "salt:hash", both hex — see users.password_hash in lib/db.ts.
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = (await scryptAsync(password, salt, KEY_LENGTH)) as Buffer;
  return `${salt}:${derivedKey.toString("hex")}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [salt, hashHex] = stored.split(":");
  if (!salt || !hashHex) return false;
  const hash = Buffer.from(hashHex, "hex");
  const derivedKey = (await scryptAsync(password, salt, hash.length)) as Buffer;
  // timingSafeEqual throws on length mismatch rather than returning false.
  if (derivedKey.length !== hash.length) return false;
  return timingSafeEqual(derivedKey, hash);
}
