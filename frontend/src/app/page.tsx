"use client";
import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import StatCard from "@/components/dashboard/StatCard";
import { WasteOverTime, WasteByType, BinStatusChart } from "@/components/dashboard/Charts";
import { api } from "@/lib/api";
import type { DashboardPayload } from "@/types";

export default function DashboardPage() {
  const [data, setData] = useState<DashboardPayload | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.dashboard()
      .then(setData)
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingState />;
  if (err)   return <ErrorState msg={err} />;
  if (!data) return null;

  const s = data.summary;

  return (
    <div className="space-y-6">
      <Header
        title="Waste Management Command Center"
        subtitle="Real-time overview of bins, vehicles, and collection activity"
      />

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Bins"          value={s.total_bins}           icon="🗑️" tone="emerald" />
        <StatCard label="Critical Bins"       value={s.critical_bins}        icon="🚨" tone="rose" />
        <StatCard label="High Priority"       value={s.high_priority_bins}   icon="⚠️" tone="amber" />
        <StatCard label="Medium Priority"     value={s.medium_priority_bins} icon="" tone="sky" />
        <StatCard label="Available Vehicles"  value={s.available_vehicles}   icon="🚛" tone="violet" />
        <StatCard
          label="Total Waste Collected"
          value={`${s.total_waste_collected_kg.toFixed(0)} kg`}
          icon="♻️"
          tone="emerald"
        />
        <StatCard
          label="Recycling %"
          value={`${s.recycling_percentage}%`}
          icon="🌱"
          tone="emerald"
        />
        <StatCard label="Active Alerts"       value={s.active_alerts}        icon="🔔" tone="rose" />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <WasteOverTime data={data.waste_over_time} />
        </div>
        <BinStatusChart data={data.status_distribution} />
      </section>

      <section>
        <WasteByType data={data.waste_by_type} />
      </section>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="space-y-6">
      <Header title="Waste Management Command Center" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 h-24 animate-pulse" />
        ))}
      </div>
    </div>
  );
}

function ErrorState({ msg }: { msg: string }) {
  return (
    <div className="bg-rose-50 border border-rose-200 text-rose-800 rounded-xl p-4 text-sm">
      Failed to load dashboard: {msg}. Ensure the FastAPI backend is running on port 8000.
    </div>
  );
}