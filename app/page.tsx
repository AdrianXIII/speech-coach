import { SpeechRecorder } from "@/components/SpeechRecorder";

export default function Home() {
  return (
    <div className="min-h-screen bg-paper px-4 py-12 sm:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <header className="text-center">
          <h1 className="font-display text-2xl font-semibold text-ink">AI Public Speaking Coach</h1>
          <div className="mx-auto mt-3 h-px w-10 bg-brass" />
          <p className="mt-3 text-sm text-ink-muted">
            Record a short speech and get instant feedback on pace, filler words, and delivery.
          </p>
        </header>

        <SpeechRecorder />
      </div>
    </div>
  );
}
