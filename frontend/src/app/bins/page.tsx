"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function BinsPage() {
  const [bins, setBins] = useState<any[]>([]);
  const [selectedBin, setSelectedBin] = useState<any>(null);
  const [selectedPrediction, setSelectedPrediction] = useState<any>(null);
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.bins().then((data) => { 
      setBins(data); 
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  // Fetch prediction ONLY when bin is clicked (with error handling)
  useEffect(() => {
    if (selectedBin) {
      setSelectedPrediction(null); // Reset
      api.predictFill(selectedBin.bin_id)
        .then((res) => setSelectedPrediction(res))
        .catch((err) => {
          console.error("Prediction error:", err);
          // Fallback data if API fails
          setSelectedPrediction({ risk: 'LOW', hours_to_overflow: 999, predicted_24h: 0, predicted_48h: 0 });
        });
    }
  }, [selectedBin]);

  if (loading) return <div className="p-10 text-slate-500">Loading bins...</div>;
  const filtered = filter === "ALL" ? bins : bins.filter((b: any) => b.status === filter);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Bins Management</h1>
        <p className="text-slate-500 mt-1">Monitor and manage all waste collection bins with AI predictions</p>
      </div>

      <div className="flex gap-6">
        {/* Table Section */}
        <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="text-sm font-medium text-slate-700">Total Bins: {bins.length}</div>
            <div className="flex gap-2">
              {["ALL", "LOW", "MEDIUM", "HIGH", "CRITICAL"].map((f) => (
                <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${filter === f ? "bg-emerald-600 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"}`}>{f}</button>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="text-left px-4 py-3 font-medium">Bin ID</th>
                  <th className="text-left px-4 py-3 font-medium">Location</th>
                  <th className="text-left px-4 py-3 font-medium">Fill %</th>
                  <th className="text-left px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((bin: any) => (
                  <tr key={bin.bin_id} onClick={() => setSelectedBin(bin)} className={`hover:bg-slate-50 cursor-pointer transition ${selectedBin?.bin_id === bin.bin_id ? "bg-emerald-50" : ""}`}>
                    <td className="px-4 py-3 font-mono text-slate-900 font-medium">{bin.bin_id}</td>
                    <td className="px-4 py-3 text-slate-700">{bin.location_name}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden w-20">
                          <div className={`h-full rounded-full ${bin.fill_percentage >= 90 ? "bg-rose-500" : bin.fill_percentage >= 75 ? "bg-orange-500" : bin.fill_percentage >= 50 ? "bg-amber-500" : "bg-emerald-500"}`} style={{ width: `${bin.fill_percentage}%` }} />
                        </div>
                        <span className="text-xs text-slate-600 w-8">{bin.fill_percentage}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${bin.status === 'CRITICAL' ? 'bg-rose-100 text-rose-700' : bin.status === 'HIGH' ? 'bg-orange-100 text-orange-700' : bin.status === 'MEDIUM' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>{bin.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail Panel Section */}
        <div className="w-80 shrink-0">
          {selectedBin ? (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sticky top-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-xs text-slate-500">Selected Bin</div>
                  <div className="text-lg font-bold text-slate-900 font-mono">{selectedBin.bin_id}</div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${selectedBin.status === 'CRITICAL' ? 'bg-rose-100 text-rose-700' : selectedBin.status === 'HIGH' ? 'bg-orange-100 text-orange-700' : selectedBin.status === 'MEDIUM' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>{selectedBin.status}</span>
              </div>
              <dl className="space-y-3 text-sm">
                <div><dt className="text-xs text-slate-500">Location</dt><dd className="text-slate-800 font-medium">{selectedBin.location_name}</dd></div>
                <div><dt className="text-xs text-slate-500">Current Fill</dt><dd className="text-slate-800 font-medium">{selectedBin.fill_percentage}%</dd></div>
                <div><dt className="text-xs text-slate-500">Waste Type</dt><dd className="text-slate-800 font-medium">{selectedBin.waste_type}</dd></div>
              </dl>
              
              {/* AI Prediction Box - Bulletproof */}
              <div className="mt-5 pt-4 border-t border-slate-100">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">AI Prediction</div>
                
                {selectedPrediction ? (
                  <div className={`border rounded-lg p-3 text-sm ${
                    selectedPrediction.risk === 'CRITICAL' ? 'bg-rose-50 border-rose-200 text-rose-800' :
                    selectedPrediction.risk === 'HIGH' ? 'bg-orange-50 border-orange-200 text-orange-800' :
                    selectedPrediction.risk === 'MEDIUM' ? 'bg-amber-50 border-amber-200 text-amber-800' : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  }`}>
                    <div className="font-bold text-base">{selectedPrediction.risk || 'LOW'} RISK</div>
                    <div className="text-xs mt-1">
                      {selectedPrediction.hours_to_overflow && selectedPrediction.hours_to_overflow < 999 
                        ? `Overflow in ~${Math.round(selectedPrediction.hours_to_overflow)}h` 
                        : 'No overflow predicted'}
                    </div>
                    <div className="text-xs mt-2 opacity-75">
                      24h: {selectedPrediction.predicted_24h || 0}% | 48h: {selectedPrediction.predicted_48h || 0}%
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-500 text-sm text-center animate-pulse">
                    Calculating AI prediction...
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-sm text-slate-500 text-center sticky top-6">
              Click a bin row to view AI predictions.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}