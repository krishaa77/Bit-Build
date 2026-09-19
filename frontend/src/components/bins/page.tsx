"use client";
import { useEffect, useMemo, useState } from "react";
import Header from "@/components/layout/Header";
import BinTable from "@/components/bins/BinTable";
import BinDetailPanel from "@/components/bins/BinDetailPanel";
import { api } from "@/lib/api";
import type { Bin } from "@/types";

export default function BinsPage() {
  const [bins, setBins] = useState<Bin[]>([]);
  const [selected, setSelected] = useState<Bin | null>(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    api.bins()
      .then((d) => {
        setBins(d);
        setSelected(d[0] ?? null);
      })
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return bins.filter((b) => {
      const q = query.trim().toLowerCase();
      const matchesQ =
        !q ||
        b.bin_id.toLowerCase().includes(q) ||
        b.location_name.toLowerCase().includes(q) ||
        b.waste_type.toLowerCase().includes(q);
      const matchesS = statusFilter === "ALL" || b.status === statusFilter;
      return matchesQ && matchesS;
    });
  }, [bins, query, statusFilter]);

  return (
    <div className="space-y-6">
      <Header
        title="Bin Monitoring"
        subtitle="Live view of all bins, fill levels, and waste types"
      />

      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div className="flex gap-2 flex-wrap">
          {["ALL", "LOW", "MEDIUM", "HIGH", "CRITICAL"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 text-xs rounded-lg border transition ${
                statusFilter === s
                  ? "bg-ink-900 text-white border-ink-900"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search bin, location, or type..."
          className="px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
        />
      </div>

      {loading ? (
        <div className="bg-white rounded-xl border border-slate-200 h-96 animate-pulse" />
      ) : err ? (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 rounded-xl p-4 text-sm">
          {err}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <BinTable bins={filtered} selectedId={selected?.bin_id} onSelect={setSelected} />
          </div>
          <div>
            <BinDetailPanel bin={selected} />
          </div>
        </div>
      )}
    </div>
  );
}