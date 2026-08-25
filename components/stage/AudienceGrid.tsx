"use client";

const ROWS = 3;
const COLS = 8;

const AVATAR_COLORS = [
  "bg-indigo-400",
  "bg-sky-400",
  "bg-violet-400",
  "bg-rose-400",
  "bg-amber-400",
  "bg-emerald-400",
];

interface AudienceGridProps {
  /** True while the user is actively recording — the audience "leans in". */
  engaged: boolean;
}

/**
 * A minimalist, pure-CSS animated audience: a grid of simple avatar dots
 * that idly sway, and become brighter / more attentive while `engaged`.
 * No canvas or 3D library — kept deliberately lightweight.
 */
export function AudienceGrid({ engaged }: AudienceGridProps) {
  const seats = Array.from({ length: ROWS * COLS }, (_, i) => i);

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-900 p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Audience
        </h3>
        <span
          className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
            engaged ? "text-emerald-400" : "text-slate-500"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${engaged ? "bg-emerald-400" : "bg-slate-600"}`}
          />
          {engaged ? "Watching closely" : "Waiting for you to begin"}
        </span>
      </div>

      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
      >
        {seats.map((seat) => (
          <AudienceMember
            key={seat}
            engaged={engaged}
            color={AVATAR_COLORS[seat % AVATAR_COLORS.length]}
            delay={(seat % COLS) * 0.12 + Math.floor(seat / COLS) * 0.2}
          />
        ))}
      </div>
    </div>
  );
}

function AudienceMember({
  engaged,
  color,
  delay,
}: {
  engaged: boolean;
  color: string;
  delay: number;
}) {
  return (
    <div
      className="flex justify-center"
      style={{ animationDelay: `${delay}s` }}
    >
      <div
        className={`stage-avatar-sway h-6 w-6 rounded-full transition-all duration-500 ${color} ${
          engaged ? "scale-110 opacity-100" : "scale-95 opacity-50"
        }`}
        style={{ animationDelay: `${delay}s` }}
      >
        <div className="flex h-full items-center justify-center gap-[3px]">
          <span className="h-1 w-1 rounded-full bg-slate-900/70" />
          <span className="h-1 w-1 rounded-full bg-slate-900/70" />
        </div>
      </div>
    </div>
  );
}
