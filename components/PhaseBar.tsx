import type { StructureModel } from "@/lib/structureModels";

/**
 * Horizontal bar split into the model's phases, width-proportional to each
 * phase's share of the 60 seconds. `activeIndex` (-1 when not running)
 * highlights the current phase and fills it based on progress within that
 * phase specifically, not just the whole bar.
 *
 * Shared between ImprovTrainer (PREP/NUPP/Triad) and ExecutiveCommunicationTrainer
 * (PREP/STAR/BLUF) — both drive a 60-second recording with a phase-timed
 * rhetorical structure, so this visual is identical between them.
 */
export function PhaseBar({
  model,
  activeIndex,
  elapsedSeconds,
}: {
  model: StructureModel;
  activeIndex: number;
  elapsedSeconds: number;
}) {
  const phaseStarts: number[] = [];
  model.phases.reduce((cumulative, phase) => {
    phaseStarts.push(cumulative);
    return cumulative + phase.seconds;
  }, 0);

  return (
    <div className="mt-3 flex w-full gap-1">
      {model.phases.map((phase, i) => {
        const phaseStart = phaseStarts[i];
        const isActive = i === activeIndex;
        const isPast = activeIndex >= 0 && i < activeIndex;
        const progressInPhase = isActive
          ? Math.min(1, Math.max(0, (elapsedSeconds - phaseStart) / phase.seconds))
          : isPast
            ? 1
            : 0;

        return (
          <div
            key={i}
            className="flex flex-col gap-1"
            style={{ flexGrow: phase.seconds, flexBasis: 0 }}
          >
            <div className="h-2.5 overflow-hidden rounded-full bg-surface-2">
              <div
                className={`h-full rounded-full transition-all ${
                  isActive ? "bg-navy-800" : isPast ? "bg-brass-soft" : "bg-surface-2"
                }`}
                style={{ width: `${progressInPhase * 100}%` }}
              />
            </div>
            <p
              className={`truncate text-center text-[11px] font-semibold ${
                isActive ? "text-brass-text" : "text-ink-muted"
              }`}
              title={phase.label}
            >
              {phase.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}
