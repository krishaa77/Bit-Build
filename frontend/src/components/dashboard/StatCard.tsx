import { cn } from "@/lib/utils";

interface Props {
  label: string;
  value: string | number;
  hint?: string;
  icon?: string;
  tone?: "emerald" | "amber" | "rose" | "sky" | "violet" | "slate";
}

const TONES: Record<string, string> = {
  emerald: "from-emerald-500/15 to-emerald-500/5 text-emerald-700",
  amber:   "from-amber-500/15 to-amber-500/5 text-amber-700",
  rose:    "from-rose-500/15 to-rose-500/5 text-rose-700",
  sky:     "from-sky-500/15 to-sky-500/5 text-sky-700",
  violet:  "from-violet-500/15 to-violet-500/5 text-violet-700",
  slate:   "from-slate-500/15 to-slate-500/5 text-slate-700",
};

export default function StatCard({ label, value, hint, icon, tone = "emerald" }: Props) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-soft p-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
          <div className="mt-2 text-2xl font-semibold text-slate-900">{value}</div>
          {hint && <div className="text-xs text-slate-500 mt-1">{hint}</div>}
        </div>
        <div
          className={cn(
            "w-10 h-10 rounded-lg grid place-items-center text-lg bg-gradient-to-br",
            TONES[tone]
          )}
        >
          {icon ?? "•"}
        </div>
      </div>
    </div>
  );
}