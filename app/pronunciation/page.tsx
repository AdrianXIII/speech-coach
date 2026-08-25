import { PronunciationTrainer } from "@/components/PronunciationTrainer";

export default function PronunciationPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12 sm:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <header className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">Pronunciation Trainer</h1>
          <p className="mt-1 text-sm text-slate-500">
            Listen to a word, record yourself saying it, and get AI feedback on how close you are
            to a native pronunciation.
          </p>
        </header>

        <PronunciationTrainer />
      </div>
    </div>
  );
}
