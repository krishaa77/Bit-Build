"use client";
import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import { api } from "@/lib/api";
import type { Vehicle } from "@/types";
import { cn } from "@/lib/utils";

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    api.vehicles()
      .then(setVehicles)
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <Header
        title="Fleet Overview"
        subtitle="Current status and load of collection vehicles"
      />

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 h-48 animate-pulse" />
          ))}
        </div>
      ) : err ? (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 rounded-xl p-4 text-sm">
          {err}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vehicles.map((v) => {
            const loadPct = Math.round((v.current_load_kg / v.capacity_kg) * 100);
            const statusTone =
              v.status === "Available" ? "emerald"
              : v.status === "Collecting" ? "sky"
              : v.status === "Returning" ? "amber"
              : "slate";
            return (
              <div key={v.vehicle_id} className="bg-white rounded-xl border border-slate-200 shadow-soft p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-500">Vehicle</div>
                    <div className="text-lg font-semibold font-mono text-slate-900">
                      {v.vehicle_id}
                    </div>
                  </div>
                  <span
                    className={cn(
                      "px-2.5 py-1 rounded-full text-xs font-medium ring-1",
                      statusTone === "emerald" && "bg-emerald-50 text-emerald-700 ring-emerald-200",
                      statusTone === "sky"    && "bg-sky-50 text-sky-700 ring-sky-200",
                      statusTone === "amber"  && "bg-amber-50 text-amber-700 ring-amber-200",
                      statusTone === "slate"  && "bg-slate-50 text-slate-700 ring-slate-200",
                    )}
                  >
                    {v.status}
                  </span>
                </div>

                <dl className="mt-4 space-y-2 text-sm">
                  <Row label="Capacity" value={`${v.capacity_kg} kg`} />
                  <Row label="Current Load" value={`${v.current_load_kg} kg`} />
                  <Row label="Location" value={`${v.latitude.toFixed(4)}, ${v.longitude.toFixed(4)}`} />
                </dl>

                <div className="mt-4">
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Load</span>
                    <span className="tabular-nums">{loadPct}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                      style={{ width: `${loadPct}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-slate-500">{label}</dt>
      <dd className="text-slate-800 font-medium">{value}</dd>
    </div>
  );
}