import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  // Baseline security headers — no CORS policy needed alongside these: the
  // Capacitor iOS shell loads the real deployed origin directly
  // (capacitor.config.ts's server.url), so there's no cross-origin fetch to
  // lock down. microphone=(self) documents that mic access is intentional
  // (record/pronunciation/etc. all use getUserMedia) rather than leaving it
  // unset, which the platform would otherwise have to guess about.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "microphone=(self)" },
          // No legitimate reason for this app to be framed by another site —
          // DENY (not SAMEORIGIN) closes off clickjacking entirely.
          { key: "X-Frame-Options", value: "DENY" },
          // Vercel's edge adds HSTS for the production domain automatically,
          // but setting it explicitly here means the guarantee holds
          // regardless of hosting provider.
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
    ];
  },
};

export default nextConfig;
