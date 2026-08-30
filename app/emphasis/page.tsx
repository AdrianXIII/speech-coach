import { ContrastiveStressTrainer } from "@/components/ContrastiveStressTrainer";

export default function EmphasisPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12 sm:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <header className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">Kontrastiv Betoning</h1>
          <p className="mt-1 text-sm text-slate-500">
            Samma mening, olika betoning — träna hur du lägger tryck på rätt ord för att ändra
            innebörden.
          </p>
        </header>

        <ContrastiveStressTrainer />
      </div>
    </div>
  );
}
