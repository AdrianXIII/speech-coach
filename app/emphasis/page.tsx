import { ContrastiveStressTrainer } from "@/components/ContrastiveStressTrainer";

export default function EmphasisPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12 sm:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <header className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">Contrastive Stress</h1>
          <p className="mt-1 text-sm text-slate-500">
            Same sentence, different stress — practice putting emphasis on the right word to
            change its meaning. Available in English, German, French, Spanish, and Swedish.
          </p>
        </header>

        <ContrastiveStressTrainer />
      </div>
    </div>
  );
}
