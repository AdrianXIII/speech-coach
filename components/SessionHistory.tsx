import type { SessionSummary } from "@/types/session";
import { Card } from "@/components/ui/Card";
import { formatDuration } from "@/lib/audio";

interface SessionHistoryProps {
  sessions: SessionSummary[];
  onSelect?: (id: string) => void;
}

/** List of past practice sessions with quick-glance score and filler-word count. */
export function SessionHistory({ sessions, onSelect }: SessionHistoryProps) {
  if (sessions.length === 0) {
    return (
      <Card>
        <p className="text-sm text-slate-500">No sessions yet — record your first speech to get started.</p>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {sessions.map((session) => (
        <button
          key={session.id}
          onClick={() => onSelect?.(session.id)}
          className="w-full text-left"
        >
          <Card className="flex items-center justify-between hover:border-indigo-300">
            <div>
              <p className="text-sm font-medium text-slate-800">
                {new Date(session.createdAt).toLocaleDateString()}
              </p>
              <p className="text-xs text-slate-500">
                {formatDuration(session.durationSeconds)} · {session.fillerWordCount} filler words
              </p>
            </div>
            <span className="text-lg font-semibold text-indigo-600">{session.overallScore}</span>
          </Card>
        </button>
      ))}
    </div>
  );
}
