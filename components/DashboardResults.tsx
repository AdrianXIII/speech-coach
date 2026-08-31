import type { ReactNode } from "react";
import type { AnalyzeSpeechResponse } from "@/types/speechAnalysis";
import { IdealVersionCard } from "@/components/IdealVersionCard";
import { FollowUpChat } from "@/components/FollowUpChat";

interface DashboardResultsProps {
  data: AnalyzeSpeechResponse;
}

/**
 * Full results dashboard for a completed analysis: score ring, metric
 * badges, a transcript with filler words highlighted inline, and the AI
 * coach's strengths / areas to improve.
 */
export function DashboardResults({ data }: DashboardResultsProps) {
  const fillerWords = Object.keys(data.metrics.fillerWordBreakdown);

  return (
    <div className="flex flex-col gap-6">
      {data.mocked && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Showing mock results — set <code className="font-mono">GEMINI_API_KEY</code> to see real
          transcription and coaching feedback.
        </div>
      )}

      <SummaryCard score={data.overallScore} />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
        <MetricBadge
          icon={<PaceIcon />}
          label="Pace"
          value={`${data.metrics.wordsPerMinute} wpm`}
        />
        <MetricBadge
          icon={<FillerIcon />}
          label="Filler Words"
          value={String(data.metrics.fillerWordCount)}
        />
      </div>

      <TranscriptCard transcript={data.transcript} fillerWords={fillerWords} />

      <IdealVersionCard transcript={data.transcript} />

      <div className="grid gap-4 sm:grid-cols-2">
        <FeedbackList
          title="Strengths"
          items={data.feedback.strengths}
          tone="positive"
        />
        <FeedbackList
          title="Areas to Improve"
          items={data.feedback.tips}
          tone="improve"
        />
      </div>

      <div className="rounded-2xl border border-hairline bg-surface p-6 shadow-sm">
        <FollowUpChat
          context={[
            `Here is a transcript of my practice speech:\n"""${data.transcript}"""`,
            "",
            `Metrics: ${data.metrics.wordsPerMinute} words per minute, ${data.metrics.fillerWordCount} filler words.`,
            "I asked for coaching feedback on my delivery.",
          ].join("\n")}
          initialAnswer={[
            "Strengths:",
            ...data.feedback.strengths.map((s) => `- ${s}`),
            "",
            "Areas to improve:",
            ...data.feedback.tips.map((t) => `- ${t}`),
          ].join("\n")}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────── Summary / score ─────────────────────────── */

function SummaryCard({ score }: { score: number }) {
  return (
    <div className="flex flex-col items-center gap-6 rounded-2xl border border-hairline bg-gradient-to-br from-surface to-surface-2 p-8 shadow-sm sm:flex-row sm:justify-between">
      <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
        <p className="text-xs font-semibold uppercase tracking-widest text-brass-text">
          Session Score
        </p>
        <h2 className="mt-1 text-lg font-bold text-ink">{scoreLabel(score)}</h2>
        <p className="mt-1 max-w-xs text-sm text-ink-muted">
          Based on your pace and how often filler words showed up in this recording.
        </p>
      </div>
      <ScoreRing score={score} />
    </div>
  );
}

function ScoreRing({ score }: { score: number }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(100, Math.max(0, score)) / 100) * circumference;
  const ringColor =
    score >= 80 ? "stroke-emerald-500" : score >= 60 ? "stroke-amber-500" : "stroke-red-500";

  return (
    <div className="relative flex h-32 w-32 shrink-0 items-center justify-center">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          strokeWidth="10"
          className="stroke-surface-2"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={`${ringColor} transition-[stroke-dashoffset] duration-700 ease-out`}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-extrabold tabular-nums text-ink">{score}</span>
        <span className="text-xs font-medium text-ink-muted">/ 100</span>
      </div>
    </div>
  );
}

function scoreLabel(score: number): string {
  if (score >= 90) return "Excellent delivery";
  if (score >= 75) return "Great job";
  if (score >= 60) return "Solid effort";
  if (score >= 40) return "Needs some work";
  return "Keep practicing";
}

/* ──────────────────────────── Metric badges ──────────────────────────── */

function MetricBadge({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-hairline bg-surface px-4 py-3.5 shadow-sm">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-2 text-brass-text">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
          {label}
        </p>
        <p className="truncate text-lg font-bold text-ink">{value}</p>
      </div>
    </div>
  );
}

function PaceIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" strokeWidth="2" stroke="currentColor">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FillerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" strokeWidth="2" stroke="currentColor">
      <path
        d="M8 9h8M8 13h5M5 19l2.5-2.5H19a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10.5A2 2 0 0 0 5 19Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ────────────────────────── Transcript, highlighted ────────────────────────── */

function TranscriptCard({ transcript, fillerWords }: { transcript: string; fillerWords: string[] }) {
  return (
    <div className="rounded-2xl border border-hairline bg-surface p-6 shadow-sm">
      <h3 className="mb-3 text-sm font-semibold text-ink">Transcript</h3>
      <p className="text-[15px] leading-relaxed text-ink-muted">
        {highlightFillerWords(transcript, fillerWords)}
      </p>
      {fillerWords.length > 0 && (
        <p className="mt-4 flex items-center gap-1.5 text-xs text-ink-muted">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-amber-200" />
          Filler words highlighted above
        </p>
      )}
    </div>
  );
}

function highlightFillerWords(transcript: string, fillerWords: string[]): ReactNode {
  if (fillerWords.length === 0) return transcript;

  const pattern = new RegExp(
    `(\\b(?:${fillerWords.map((w) => w.replace(/\s+/g, "\\s+")).join("|")})\\b)`,
    "gi",
  );
  const parts = transcript.split(pattern);
  const fillerSet = new Set(fillerWords.map((w) => w.toLowerCase()));

  return parts.map((part, i) =>
    fillerSet.has(part.toLowerCase()) ? (
      <mark key={i} className="rounded bg-amber-200/70 px-1 py-0.5 font-medium text-amber-900">
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

/* ─────────────────────────── Feedback lists ─────────────────────────── */

function FeedbackList({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "positive" | "improve";
}) {
  const toneClasses =
    tone === "positive"
      ? { title: "text-emerald-700", bullet: "bg-emerald-500" }
      : { title: "text-amber-700", bullet: "bg-amber-500" };

  return (
    <div className="rounded-2xl border border-hairline bg-surface p-6 shadow-sm">
      <h3 className={`mb-3 text-sm font-semibold ${toneClasses.title}`}>{title}</h3>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-ink-muted">
            <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${toneClasses.bullet}`} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
