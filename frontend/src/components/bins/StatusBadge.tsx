import { cn, statusColor } from "@/lib/utils";

export default function StatusBadge({ status }: { status: string }) {
  const c = statusColor(status);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ring-1",
        c.bg, c.text, c.ring
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", c.dot)} />
      {status}
    </span>
  );
}