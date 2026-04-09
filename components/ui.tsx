import { cx } from "@/lib/helpers";

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <section className={cx("panel p-4", className)}>{children}</section>;
}

export function StatusBadge({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "ok" | "warn" | "danger" | "info" }) {
  const toneClasses = {
    default: "border-slate-700 bg-slate-800/90 text-slate-200",
    ok: "border-emerald-500/40 bg-emerald-500/10 text-emerald-200",
    warn: "border-amber-500/40 bg-amber-500/10 text-amber-200",
    danger: "border-rose-500/40 bg-rose-500/10 text-rose-200",
    info: "border-blue-500/40 bg-blue-500/10 text-blue-200"
  } as const;

  return <span className={cx("badge", toneClasses[tone])}>{children}</span>;
}

export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-slate-800">
      <div className="h-full rounded-full bg-gradient-to-r from-blue-400 to-cyan-400" style={{ width: `${value}%` }} />
    </div>
  );
}
