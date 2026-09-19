"use client";
import StatusBadge from "./StatusBadge";
import type { Bin } from "@/types";

interface Props {
  bins: Bin[];
  selectedId?: string | null;
  onSelect: (b: Bin) => void;
}

export default function BinTable({ bins, selectedId, onSelect }: Props) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-soft overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Bin ID</th>
              <th className="text-left px-4 py-3 font-medium">Location</th>
              <th className="text-left px-4 py-3 font-medium">Waste Type</th>
              <th className="text-left px-4 py-3 font-medium">Capacity</th>
              <th className="text-left px-4 py-3 font-medium">Fill</th>
              <th className="text-left px-4 py-3 font-medium">Status</th>
              <th className="text-left px-4 py-3 font-medium">Last Collection</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {bins.map((b) => {
              const active = selectedId === b.bin_id;
              return (
                <tr
                  key={b.bin_id}
                  onClick={() => onSelect(b)}
                  className={`cursor-pointer transition ${
                    active ? "bg-emerald-50/60" : "hover:bg-slate-50"
                  }`}
                >
                  <td className="px-4 py-3 font-mono text-slate-800">{b.bin_id}</td>
                  <td className="px-4 py-3 text-slate-700">{b.location_name}</td>
                  <td className="px-4 py-3 text-slate-700">{b.waste_type}</td>
                  <td className="px-4 py-3 text-slate-700">{b.capacity_kg} kg</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500"
                          style={{ width: `${b.fill_percentage}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-600 tabular-nums">
                        {b.fill_percentage}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={b.status} /></td>
                  <td className="px-4 py-3 text-slate-500 text-xs">
                    {b.last_collection ?? "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}