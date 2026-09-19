export default function Header({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="flex items-end justify-between pb-4">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2">
        <span className="hidden md:inline text-xs text-slate-500">
          Last sync: just now
        </span>
        <button className="px-3 py-1.5 text-sm rounded-lg bg-ink-900 text-white hover:bg-ink-800">
          Refresh
        </button>
      </div>
    </header>
  );
}