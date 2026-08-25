import type { FeedbackResult } from "@/types/feedback";
import { Card } from "@/components/ui/Card";

interface FeedbackPanelProps {
  feedback: FeedbackResult;
}

/** AI-generated coaching feedback: overall score, per-category breakdown, tips. */
export function FeedbackPanel({ feedback }: FeedbackPanelProps) {
  return (
    <div className="flex flex-col gap-4">
      <Card className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-800">Overall score</h2>
        <span className="text-2xl font-bold text-indigo-600">{feedback.overallScore}</span>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        {feedback.categories.map((category) => (
          <Card key={category.label}>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-700">{category.label}</h3>
              <span className="text-sm font-medium text-slate-500">{category.score}/100</span>
            </div>
            <p className="mb-2 text-sm text-slate-600">{category.summary}</p>
            <ul className="list-inside list-disc space-y-1 text-sm text-slate-500">
              {category.tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <h3 className="mb-2 text-sm font-semibold text-emerald-700">Strengths</h3>
          <ul className="list-inside list-disc space-y-1 text-sm text-slate-600">
            {feedback.strengths.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>
        <Card>
          <h3 className="mb-2 text-sm font-semibold text-amber-700">Areas to improve</h3>
          <ul className="list-inside list-disc space-y-1 text-sm text-slate-600">
            {feedback.areasToImprove.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
