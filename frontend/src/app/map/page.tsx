"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/layout/Header";
import { api } from "@/lib/api";
import type { Bin, Vehicle } from "@/types";

const BinMap = dynamic(() => import("@/components/map/BinMap"), { ssr: false });

export default function MapPage() {
  const [bins, setBins] = useState<Bin[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([api.bins(), api.vehicles()])
      .then(([b, v]) => { setBins(b); setVehicles(v); })
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <Header
        title="Interactive Map"
        subtitle="Bins and vehicles plotted on OpenStreetMap — click markers for details"
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200 shadow-soft overflow-hidden h-[640px]">
          {loading ? (
            <div className="w-full h-full animate-pulse bg-slate-100" />
          ) : err ? (
            <div className="p-4 text-sm text-rose-700">{err}</div>
          ) : (
            <BinMap bins={bins} vehicles={vehicles} />
          )}
        </div>

        <div className="space-y-3">
          <LegendCard title="Bin Status" items={[
            { label: "Low (0–50%)",      color: "bg-emerald-500" },
            { label: "Medium (51–75%)",  color: "bg-amber-500" },
            { label: "High (76–89%)",    color: "bg-orange-500" },
            { label: "Critical (90–100%)", color: "bg-rose-500" },
          ]} />
          <LegendCard title="Vehicles" items={[
            { label: "Available",  color: "bg-slate-700" },
            { label: "Collecting", color: "bg-slate-700" },
            { label: "Returning",  color: "bg-slate-700" },
          ]} />
          <div className="bg-white rounded-xl border border-slate-200 shadow-soft p-4 text-xs text-slate-500">
            <div className="font-semibold text-slate-700 mb-1">Demo Area</div>
            Campus cluster around Ahmedabad. Coordinates are simulated for the prototype.
          </div>
        </div>
      </div>
    </div>
  );
}

function LegendCard({ title, items }: { title: string; items: { label: string; color: string }[] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-soft p-4">
      <div className="text-sm font-semibold text-slate-900 mb-2">{title}</div>
      <ul className="space-y-1.5">
        {items.map((i) => (
          <li key={i.label} className="flex items-center gap-2 text-xs text-slate-700">
            <span className={`w-3 h-3 rounded-full ${i.color}`} />
            {i.label}
          </li>
        ))}
      </ul>
    </div>
  );
}