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
    // Force timeout so it doesn't hang forever
    const timer = setTimeout(() => {
      if (loading) {
        setErr("Backend connection timed out. Using demo mode.");
        setLoading(false);
      }
    }, 5000);

    api.dashboard()
      .then(setData)
      .catch((e) => setErr(e.message))
      .finally(() => {
        clearTimeout(timer);
        setLoading(false);
      });
  }, []);

  // Safe fallback data for demo
  const safeData = data || {
    summary: {
      total_bins: 24,
      critical_bins: 2,
      high_priority_bins: 3,
      medium_priority_bins: 5,
      available_vehicles: 2,
      total_waste_collected_kg: 1840,
      recycling_percentage: 68,
      active_alerts: 6,
    },
    waste_over_time: [],
    status_distribution: [],
    waste_by_type: [],
  };

  const s = safeData.summary;

  if (loading) return <LoadingState />;

  return (
    <div className="space-y-6">
      <Header
        title="Waste Management Command Center"
        subtitle="Real-time overview of bins, vehicles, and collection activity"
      />

      {/* Show error banner if API failed */}
      {err && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-xl p-3 text-sm flex items-center gap-2">
          ⚠️ {err} — Showing demo data
        </div>
      )}

      {/* Main Stats Grid - ALL ICONS RESTORED */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Bins"          value={s.total_bins}           icon="🗑️" tone="emerald" />
        <StatCard label="Critical Bins"       value={s.critical_bins}        icon="🚨" tone="rose" />
        <StatCard label="High Priority"       value={s.high_priority_bins}   icon="⚠️" tone="amber" />
        <StatCard label="Medium Priority"     value={s.medium_priority_bins} icon="🔵" tone="sky" />
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
        
        <StatCard 
          label="AI High Risk Bins" 
          value={s.critical_bins + s.high_priority_bins} 
          icon="🧠" 
          tone="violet" 
          hint="Predicted overflow" 
        />

        <StatCard 
          label="Images Classified" 
          value="156" 
          icon="📷" 
          tone="violet" 
          hint="This month" 
        />
      </section>

      {/* Alert Summary Section */}
      <section>
        <h2 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <span>🚨</span> Active Alerts Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-50 border-2 border-red-200 p-4 rounded-xl flex items-center justify-between shadow-sm">
            <div>
              <div className="text-xs font-bold text-red-600 uppercase tracking-wider">Critical Alerts</div>
              <div className="text-3xl font-bold text-red-700 mt-1">2</div>
            </div>
            <div className="text-4xl opacity-80">🚨</div>
          </div>
          <div className="bg-orange-50 border-2 border-orange-200 p-4 rounded-xl flex items-center justify-between shadow-sm">
            <div>
              <div className="text-xs font-bold text-orange-600 uppercase tracking-wider">High Priority</div>
              <div className="text-3xl font-bold text-orange-700 mt-1">3</div>
            </div>
            <div className="text-4xl opacity-80">⚠️</div>
          </div>
          <div className="bg-yellow-50 border-2 border-yellow-200 p-4 rounded-xl flex items-center justify-between shadow-sm">
            <div>
              <div className="text-xs font-bold text-yellow-600 uppercase tracking-wider">Unusual Waste Zones</div>
              <div className="text-3xl font-bold text-yellow-700 mt-1">1</div>
            </div>
            <div className="text-4xl opacity-80">📈</div>
          </div>
        </div>
      </section>

      {/* Charts - Only render if real data exists */}
      {data ? (
        <>
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <WasteOverTime data={data.waste_over_time} />
            </div>
            <BinStatusChart data={data.status_distribution} />
          </section>
          <section>
            <WasteByType data={data.waste_by_type} />
          </section>
        </>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-400">
          📊 Charts unavailable in demo mode. Connect backend to view live analytics.
        </div>
      )}
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