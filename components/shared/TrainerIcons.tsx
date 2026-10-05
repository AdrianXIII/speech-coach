/**
 * Small inline stroke-SVG icon set for the tab bar and Progress screen —
 * real icons instead of emoji for these two new, Direction-E-styled
 * screens specifically (see the mobile-UI design review). TrainerPicker's
 * existing card grid keeps its emoji icons untouched; this isn't a
 * app-wide icon swap, just the two new surfaces that needed one.
 */
export type IconName = "home" | "chart" | "person" | "mic" | "book" | "target" | "briefcase" | "chat" | "clock";

const PATHS: Record<IconName, React.ReactNode> = {
  home: (
    <>
      <path d="M3 11l9-8 9 8" />
      <path d="M5 10v9a1 1 0 001 1h3v-6h6v6h3a1 1 0 001-1v-9" />
    </>
  ),
  chart: (
    <>
      <line x1="5" y1="20" x2="5" y2="12" />
      <line x1="12" y1="20" x2="12" y2="6" />
      <line x1="19" y1="20" x2="19" y2="15" />
    </>
  ),
  person: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c1.5-4 5-5.5 7.5-5.5s6 1.5 7.5 5.5" />
    </>
  ),
  mic: (
    <>
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 11a7 7 0 0014 0" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="8" y1="22" x2="16" y2="22" />
    </>
  ),
  book: (
    <>
      <path d="M4 5.5A2.5 2.5 0 016.5 3H12v18H6.5A2.5 2.5 0 014 18.5v-13z" />
      <path d="M20 5.5A2.5 2.5 0 0017.5 3H12v18h5.5a2.5 2.5 0 002.5-2.5v-13z" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.5" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
    </>
  ),
  chat: (
    <path d="M4 4h16v12H8l-4 4V4z" />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
};

export function TrainerIcon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="21"
      height="21"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
