import { SpeechRecorder } from "@/components/SpeechRecorder";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12 sm:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <header className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">AI Public Speaking Coach</h1>
          <p className="mt-1 text-sm text-slate-500">
            Record a short speech and get instant feedback on pace, filler words, and delivery.
          </p>
        </header>

        <SpeechRecorder />
      </div>
    </div>
  );
}
