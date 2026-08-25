import { VirtualStage } from "@/components/VirtualStage";

export default function StagePage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <VirtualStage />
      </div>
    </div>
  );
}
