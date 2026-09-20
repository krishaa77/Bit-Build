import StatusBadge from "./StatusBadge";
import { formatTime } from "@/lib/utils";
import type { Bin } from "@/types";

export default function BinDetailPanel({ bin }: { bin: Bin | null }) {
  if (!bin) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-soft p-6 text-sm text-slate-500">
        Select a bin to view details.
      </div>
    );
  }

  const fillKg = Math.round((bin.fill_percentage / 100) * bin.capacity_kg);
  const recommended =
    bin.status === "CRITICAL" ? "Collect Immediately"
    : bin.status === "HIGH"   ? "Schedule Collection Soon"
    : bin.status === "MEDIUM" ? "Monitor — No Action Needed"
    : "No Action Required";

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-soft p-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-slate-500">Bin</div>
          <div className="text-lg font-semibold text-slate-900 font-mono">{bin.bin_id}</div>
        </div>
        <StatusBadge status={bin.status} />
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <Field label="Location" value={bin.location_name} />
        <Field label="Waste Type" value={bin.waste_type} />
        <Field label="Capacity" value={`${bin.capacity_kg} kg`} />
        <Field label="Current Fill" value={`${bin.fill_percentage}% (${fillKg} kg)`} />
        <Field label="Coordinates" value={`${bin.latitude.toFixed(4)}, ${bin.longitude.toFixed(4)}`} />
        <Field label="Last Collection" value={formatTime(bin.last_collection)} />
      </dl>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <InfoBlock
          title="Predicted Overflow"
          value="Coming Soon"
          hint="ML module will be added in v2"
        />
        <InfoBlock
          title="Recommended Action"
          value={recommended}
          tone={bin.status === "CRITICAL" ? "rose" : bin.status === "HIGH" ? "amber" : "emerald"}
        />
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-slate-500">{label}</dt>
      <dd className="text-slate-800 font-medium">{value}</dd>
    </div>
  );
}

function InfoBlock({
  title, value, hint, tone = "slate",
}: { title: string; value: string; hint?: string; tone?: "slate" | "emerald" | "amber" | "rose" }) {
  const tones: Record<string, string> = {
    slate:   "bg-slate-50 border-slate-200 text-slate-700",
    emerald: "bg-emerald-50 border-emerald-200 text-emerald-800",
    amber:   "bg-amber-50 border-amber-200 text-amber-800",
    rose:    "bg-rose-50 border-rose-200 text-rose-800",
  };
  return (
    <div className={`rounded-lg border px-3 py-2 ${tones[tone]}`}>
      <div className="text-[11px] uppercase tracking-wide opacity-70">{title}</div>
      <div className="text-sm font-semibold mt-0.5">{value}</div>
      {hint && <div className="text-[11px] opacity-70 mt-0.5">{hint}</div>}
    </div>
  );
}