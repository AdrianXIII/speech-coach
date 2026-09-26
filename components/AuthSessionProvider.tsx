"use client";

import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";

/**
 * Thin client-boundary wrapper so app/layout.tsx (a Server Component) can
 * still render normally — next-auth/react's SessionProvider is itself a
 * client component and can't be imported directly into a server file.
 * Gives components/UserMenu.tsx (and anything else) access to useSession().
 */
export function AuthSessionProvider({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
