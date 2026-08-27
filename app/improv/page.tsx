import { ImprovTrainer } from "@/components/ImprovTrainer";

export default function ImprovPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12 sm:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <header className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">60-Second Improv</h1>
          <p className="mt-1 text-sm text-slate-500">
            Ett slumpat ord, en retorisk struktur, 60 sekunder — spela in och våga misslyckas.
          </p>
        </header>

        <ImprovTrainer />
      </div>
    </div>
  );
}
