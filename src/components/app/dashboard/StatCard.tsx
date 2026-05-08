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

const cardStyles: Record<NonNullable<Props["accent"]>, { bg: string; border: string; iconBg: string; iconText: string; shadow: string; labelColor: string }> = {
  yellow: {
    bg: "bg-gradient-to-br from-amber-50 to-amber-100",
    border: "border-amber-200",
    iconBg: "bg-amber-500",
    iconText: "text-white",
    shadow: "shadow-[0_10px_40px_-20px_rgba(245,158,11,0.2)]",
    labelColor: "text-amber-700"
  },
  green: {
    bg: "bg-gradient-to-br from-emerald-50 to-emerald-100",
    border: "border-emerald-200",
    iconBg: "bg-emerald-500",
    iconText: "text-white",
    shadow: "shadow-[0_10px_40px_-20px_rgba(16,185,129,0.2)]",
    labelColor: "text-emerald-700"
  },
  violet: {
    bg: "bg-gradient-to-br from-violet-50 to-violet-100",
    border: "border-violet-200",
    iconBg: "bg-violet-500",
    iconText: "text-white",
    shadow: "shadow-[0_10px_40px_-20px_rgba(139,92,246,0.2)]",
    labelColor: "text-violet-700"
  },
  blue: {
    bg: "bg-gradient-to-br from-sky-50 to-sky-100",
    border: "border-sky-200",
    iconBg: "bg-sky-500",
    iconText: "text-white",
    shadow: "shadow-[0_10px_40px_-20px_rgba(14,165,233,0.2)]",
    labelColor: "text-sky-700"
  },
};

export function StatCard({ label, value, delta, icon: Icon, accent = "yellow", sub }: Props) {
  const positive = delta >= 0;
  const style = cardStyles[accent];
  return (
    <div className={cn(
      "group relative overflow-hidden rounded-2xl border p-5 transition hover:-translate-y-0.5",
      style.bg,
      style.border,
      style.shadow,
      "hover:shadow-[0_18px_50px_-20px_rgba(0,0,0,0.18)]"
    )}>
      <div className="flex items-start justify-between">
        <div>
          <p className={cn("text-xs font-medium uppercase tracking-wide", style.labelColor)}>
            {label}
          </p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-brand-charcoal">{value}</p>
        </div>
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl shadow-lg",
            style.iconBg,
            style.iconText,
            `shadow-${style.iconBg.split('-')[1]}-500/30`
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-xs">
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold",
            positive ? "bg-emerald-500 text-white" : "bg-rose-500 text-white",
          )}
        >
          {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {Math.abs(delta)}%
        </span>
        {sub && <span className="text-brand-charcoal/60">{sub}</span>}
      </div>
    </div>
  );
}
