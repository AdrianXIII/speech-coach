import { PronunciationTrainer } from "@/components/PronunciationTrainer";

export default function PronunciationPage() {
  return (
    <div className="min-h-screen bg-paper px-4 py-12 sm:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <header className="text-center">
          <h1 className="font-display text-2xl font-semibold text-ink">Pronunciation Trainer</h1>
          <div className="mx-auto mt-3 h-px w-10 bg-brass" />
          <p className="mt-3 text-sm text-ink-muted">
            Listen to a word, record yourself saying it, and get AI feedback on how close you are
            to a native pronunciation.
          </p>
        </header>

        <PronunciationTrainer />
      </div>
    </div>
  );
}
