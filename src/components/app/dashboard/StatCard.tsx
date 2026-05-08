import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  value: string;
  delta: number;
  icon: LucideIcon;
  accent?: "yellow" | "green" | "violet" | "blue";
  sub?: string;
};

const accents: Record<NonNullable<Props["accent"]>, string> = {
  yellow: "bg-brand-yellow/20 text-brand-charcoal ring-brand-yellow/40",
  green: "bg-emerald-100 text-emerald-700 ring-emerald-200",
  violet: "bg-violet-100 text-violet-700 ring-violet-200",
  blue: "bg-sky-100 text-sky-700 ring-sky-200",
};

export function StatCard({ label, value, delta, icon: Icon, accent = "yellow", sub }: Props) {
  const positive = delta >= 0;
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.1)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_50px_-20px_rgba(0,0,0,0.18)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-brand-charcoal/50">
            {label}
          </p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-brand-charcoal">{value}</p>
        </div>
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl ring-1",
            accents[accent],
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-xs">
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold",
            positive ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700",
          )}
        >
          {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {Math.abs(delta)}%
        </span>
        {sub && <span className="text-brand-charcoal/50">{sub}</span>}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-brand-yellow/10 blur-2xl transition group-hover:bg-brand-yellow/20"
      />
    </div>
  );
}
