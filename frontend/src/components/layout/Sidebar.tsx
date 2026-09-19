"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/",            label: "Dashboard",           icon: "📊", ready: true },
  { href: "/bins",        label: "Bins",                icon: "🗑️", ready: true },
  { href: "/map",         label: "Map",                 icon: "🗺️", ready: true },
  { href: "/vehicles",    label: "Vehicles",            icon: "🚛", ready: true },
  { href: "/priority",    label: "Collection Priority", icon: "⚡", ready: false },
  { href: "/routes",      label: "Routes",              icon: "🧭", ready: false },
  { href: "/classify",    label: "Waste Classification",icon: "🧪", ready: false },
  { href: "/analytics",   label: "Analytics",           icon: "📈", ready: false },
  { href: "/alerts",      label: "Alerts",              icon: "", ready: false },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 shrink-0 bg-ink-900 text-slate-200 h-screen sticky top-0 flex flex-col">
      <div className="px-5 py-5 border-b border-white/5 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 grid place-items-center text-white font-bold">
          E
        </div>
        <div>
          <div className="text-sm font-semibold text-white">EcoRoute AI</div>
          <div className="text-[11px] text-slate-400">Waste Optimizer · v1</div>
        </div>
      </div>

      <nav className="px-3 py-4 space-y-1 overflow-y-auto">
        {NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition",
                active
                  ? "bg-white/10 text-white"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              )}
            >
              <span className="text-base">{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              {!item.ready && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-slate-300">
                  soon
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto p-4 text-[11px] text-slate-400 border-t border-white/5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Simulated prototype data
        </div>
        <div className="mt-1">Not live IoT feed</div>
      </div>
    </aside>
  );
}