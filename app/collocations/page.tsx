import { CollocationTrainer } from "@/components/CollocationTrainer";

export default function CollocationsPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12 sm:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <header className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">Elite Phrasing</h1>
          <p className="mt-1 text-sm text-slate-500">
            Pick the correctly upgraded professional phrase, then use it in a sentence out loud —
            for executives, politicians, and lawyers.
          </p>
        </header>

        <CollocationTrainer />
      </div>
    </div>
  );
}
