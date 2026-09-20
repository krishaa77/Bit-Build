import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]): string {
  return clsx(...inputs);
}

export function computeStatus(fill: number): "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" {
  if (fill <= 50) return "LOW";
  if (fill <= 75) return "MEDIUM";
  if (fill <= 89) return "HIGH";
  return "CRITICAL";
}

export function formatTime(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso.endsWith("Z") ? iso : iso + "Z");
  if (isNaN(d.getTime())) return "—";
  const today = new Date();
  const sameDay = d.toDateString() === today.toDateString();
  const hh = d.getHours().toString().padStart(2, "0");
  const mm = d.getMinutes().toString().padStart(2, "0");
  return sameDay ? `Today, ${hh}:${mm}` : d.toLocaleString();
}

export function statusColor(status: string) {
  switch (status) {
    case "LOW":      return { bg: "bg-emerald-50",  text: "text-emerald-700",  ring: "ring-emerald-200", dot: "bg-emerald-500" };
    case "MEDIUM":   return { bg: "bg-amber-50",    text: "text-amber-700",    ring: "ring-amber-200",   dot: "bg-amber-500" };
    case "HIGH":     return { bg: "bg-orange-50",   text: "text-orange-700",   ring: "ring-orange-200",  dot: "bg-orange-500" };
    case "CRITICAL": return { bg: "bg-rose-50",     text: "text-rose-700",     ring: "ring-rose-200",    dot: "bg-rose-500" };
    default:         return { bg: "bg-slate-50",    text: "text-slate-700",    ring: "ring-slate-200",   dot: "bg-slate-500" };
  }
}