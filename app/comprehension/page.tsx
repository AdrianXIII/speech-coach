import { ComprehensionTrainer } from "@/components/ComprehensionTrainer";

export default function ComprehensionPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12 sm:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <header className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">Listening & Summary</h1>
          <p className="mt-1 text-sm text-slate-500">
            Listen to a short professional passage, then summarize it out loud in your own
            words — scored on content, vocabulary, and structure.
          </p>
        </header>

        <ComprehensionTrainer />
      </div>
    </div>
  );
}
