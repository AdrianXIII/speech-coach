import Link from "next/link";

/**
 * Minimal legal footer — Privacy/Terms links are both mandatory for App
 * Store Connect submission (a privacy-policy URL is a required field) and
 * for Sign-in-with-Apple/RevenueCat's own compliance requirements. English
 * link labels regardless of app language, matching the pages they point to
 * (see app/privacy/page.tsx's doc comment for why those stay English-only).
 */
export function Footer() {
  return (
    <footer className="border-t border-hairline px-4 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-center text-xs text-ink-muted sm:px-8">
      <Link href="/privacy" className="hover:underline">
        Privacy Policy
      </Link>
      <span className="mx-2">·</span>
      <Link href="/terms" className="hover:underline">
        Terms of Service
      </Link>
    </footer>
  );
}
