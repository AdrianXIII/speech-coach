import { SpeedReadingTrainer } from "@/components/SpeedReadingTrainer";

export default function SpeedReadingPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12 sm:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <header className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">Snabbläsning</h1>
          <p className="mt-1 text-sm text-slate-500">
            Klistra in en text, välj nivå, och träna på att läsa snabbare utan att tappa
            förståelsen.
          </p>
        </header>

        <SpeedReadingTrainer />
      </div>
    </div>
  );
}
