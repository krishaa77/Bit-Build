"use client";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend,
} from "recharts";

export function WasteOverTime({ data }: { data: { date: string; quantity_kg: number }[] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-soft p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-900">Waste Generated Over Time</h3>
        <span className="text-xs text-slate-500">Last 7 days · kg</span>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#94a3b8" />
            <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
            <Tooltip
              contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }}
            />
            <Area
              type="monotone"
              dataKey="quantity_kg"
              stroke="#059669"
              strokeWidth={2}
              fill="url(#g1)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const TYPE_COLORS: Record<string, string> = {
  Plastic: "#10b981",
  Organic: "#f59e0b",
  Paper:   "#3b82f6",
  Metal:   "#8b5cf6",
  Glass:   "#06b6d4",
  Other:   "#94a3b8",
};

export function WasteByType({ data }: { data: { waste_type: string; quantity_kg: number }[] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-soft p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-900">Waste by Type</h3>
        <span className="text-xs text-slate-500">kg</span>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
            <XAxis dataKey="waste_type" tick={{ fontSize: 12 }} stroke="#94a3b8" />
            <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
            <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }} />
            <Bar dataKey="quantity_kg" radius={[6, 6, 0, 0]}>
              {data.map((d) => (
                <Cell key={d.waste_type} fill={TYPE_COLORS[d.waste_type] ?? "#94a3b8"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function BinStatusChart({ data }: { data: { status: string; count: number }[] }) {
  const COLORS: Record<string, string> = {
    LOW: "#10b981", MEDIUM: "#f59e0b", HIGH: "#f97316", CRITICAL: "#e11d48",
  };
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-soft p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-900">Bin Status Distribution</h3>
        <span className="text-xs text-slate-500">bins</span>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="status"
              innerRadius={55}
              outerRadius={90}
              paddingAngle={2}
            >
              {data.map((d) => (
                <Cell key={d.status} fill={COLORS[d.status] ?? "#94a3b8"} />
              ))}
            </Pie>
            <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}