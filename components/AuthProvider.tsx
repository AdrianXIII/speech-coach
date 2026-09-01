"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

interface AuthContextValue {
  user: User | null;
  isPremium: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isPremium: false,
  loading: true,
});

/**
 * Global auth + entitlement state. Free content (case studies, beginner
 * speed reading, everything else) never depends on this — it only gates
 * the premium boundary, so a slow/failed auth check must never block the
 * rest of the app.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
      setLoading(false);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsPremium(false);
      return;
    }

    let cancelled = false;
    fetch("/api/entitlement")
      .then((res) => (res.ok ? res.json() : { premium: false }))
      .then((data) => {
        if (!cancelled) setIsPremium(Boolean(data.premium));
      })
      .catch(() => {
        if (!cancelled) setIsPremium(false);
      });

    return () => {
      cancelled = true;
    };
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isPremium, loading }}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  return useContext(AuthContext);
}
