import Header from "@/components/layout/Header";

export default function ComingSoonPage() {
  return (
    <div className="space-y-6">
      <Header title="Module Coming Soon" subtitle="This feature is planned for the next phase." />
      <div className="bg-white rounded-xl border border-slate-200 shadow-soft p-10 text-center">
        <div className="text-5xl mb-4">🚧</div>
        <h2 className="text-xl font-semibold text-slate-900">Under Construction</h2>
        <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
          This module (AI prediction, route optimization, classification, or analytics)
          will be added in the next development phase. The current foundation is ready
          to support it.
        </p>
      </div>
    </div>
  );
}