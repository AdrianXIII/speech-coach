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
        ],
      },
    ];
  },
};

export default nextConfig;
