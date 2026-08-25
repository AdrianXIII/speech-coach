import type { FillerWordStats } from "@/types/analysis";
import { Card } from "@/components/ui/Card";

interface FillerWordTrackerProps {
  stats: FillerWordStats;
}

/** Breakdown of filler-word usage for a completed analysis. */
export function FillerWordTracker({ stats }: FillerWordTrackerProps) {
  const entries = Object.entries(stats.byWord).sort(([, a], [, b]) => b - a);

  return (
    <Card>
      <div className="mb-3 flex items-baseline justify-between">
        <h3 className="text-sm font-semibold text-slate-700">Filler words</h3>
        <span className="text-xs text-slate-500">{stats.perMinute.toFixed(1)}/min</span>
      </div>

      {entries.length === 0 ? (
        <p className="text-sm text-slate-500">No filler words detected. 🎉</p>
      ) : (
        <ul className="space-y-1.5">
          {entries.map(([word, count]) => (
            <li key={word} className="flex items-center justify-between text-sm">
              <span className="text-slate-700">&ldquo;{word}&rdquo;</span>
              <span className="font-medium text-slate-900">{count}</span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
