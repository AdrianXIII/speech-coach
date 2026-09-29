import { randomBytes } from "node:crypto";
import { getDb, hasDatabase } from "@/lib/db";

const TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour

/**
 * Password-reset tokens — see lib/db.ts's password_reset_tokens table.
 * Degrades gracefully (null) rather than throwing, same posture as every
 * other lib/*.ts file that touches the database.
 */
export async function createResetToken(email: string): Promise<string | null> {
  if (!hasDatabase()) return null;
  try {
    const db = await getDb();
    if (!db) return null;
    const token = randomBytes(32).toString("hex");
    await db`
      INSERT INTO password_reset_tokens (token, email, expires)
      VALUES (${token}, ${email}, ${new Date(Date.now() + TOKEN_TTL_MS)})
    `;
    return token;
  } catch (err) {
    console.error("createResetToken failed:", err instanceof Error ? err.message : err);
    return null;
  }
}

/** One-time use: deletes the token as part of looking it up, so a link can't be replayed. Returns the associated email, or null if the token is unknown/expired/already used. */
export async function consumeResetToken(token: string): Promise<string | null> {
  if (!hasDatabase()) return null;
  try {
    const db = await getDb();
    if (!db) return null;
    const rows = await db<{ email: string; expires: Date }[]>`
      DELETE FROM password_reset_tokens WHERE token = ${token} RETURNING email, expires
    `;
    const row = rows[0];
    if (!row || row.expires.getTime() < Date.now()) return null;
    return row.email;
  } catch (err) {
    console.error("consumeResetToken failed:", err instanceof Error ? err.message : err);
    return null;
  }
}
