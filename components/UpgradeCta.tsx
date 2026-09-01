import Link from "next/link";

/** Shared locked-content upsell — used wherever premium content needs a paywall prompt. */
export function UpgradeCta({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-brass/40 bg-brass/5 px-6 py-8 text-center">
      <p className="text-sm font-semibold text-ink">{message}</p>
      <p className="text-xs text-ink-muted">
        Unlock every premium case study and faster speed-reading levels with a subscription.
      </p>
      <Link
        href="/upgrade"
        className="mt-1 rounded-lg bg-brass px-6 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-brass-soft"
      >
        Unlock Premium
      </Link>
    </div>
  );
}
