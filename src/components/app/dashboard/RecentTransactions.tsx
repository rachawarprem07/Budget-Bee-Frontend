import {
  Coffee,
  ShoppingBag,
  Car,
  Home,
  Sparkles,
  Briefcase,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type Tx = {
  id: string;
  name: string;
  category: string;
  amount: number; // negative = spend
  date: string;
  icon?: LucideIcon;
};

export const categoryIcon: Record<string, LucideIcon> = {
  Income: Briefcase,
  "Food & Drink": Coffee,
  Groceries: ShoppingBag,
  Transport: Car,
  Housing: Home,
  Subscriptions: Sparkles,
  Shopping: ShoppingBag,
  Entertainment: Sparkles,
  Other: Wallet,
};

const categoryColors: Record<string, { bg: string; icon: string; ring: string }> = {
  Income: { bg: "bg-emerald-50", icon: "bg-emerald-500", ring: "ring-emerald-200" },
  "Food & Drink": { bg: "bg-amber-50", icon: "bg-amber-500", ring: "ring-amber-200" },
  Groceries: { bg: "bg-blue-50", icon: "bg-blue-500", ring: "ring-blue-200" },
  Transport: { bg: "bg-purple-50", icon: "bg-purple-500", ring: "ring-purple-200" },
  Housing: { bg: "bg-rose-50", icon: "bg-rose-500", ring: "ring-rose-200" },
  Subscriptions: { bg: "bg-violet-50", icon: "bg-violet-500", ring: "ring-violet-200" },
  Shopping: { bg: "bg-pink-50", icon: "bg-pink-500", ring: "ring-pink-200" },
  Entertainment: { bg: "bg-cyan-50", icon: "bg-cyan-500", ring: "ring-cyan-200" },
  Other: { bg: "bg-slate-50", icon: "bg-slate-500", ring: "ring-slate-200" },
};

export function RecentTransactions({ items }: { items: Tx[] }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-white to-gray-50 p-6 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-brand-charcoal">Recent transactions</h3>
          <p className="text-sm text-brand-charcoal/60 mt-1">Your latest activity</p>
        </div>
        <button className="rounded-full bg-brand-yellow/20 px-4 py-2 text-xs font-semibold text-brand-charcoal ring-1 ring-brand-yellow/40 transition-all hover:bg-brand-yellow/30 hover:shadow-lg hover:shadow-brand-yellow/20">
          View all
        </button>
      </div>

      {items.length === 0 ? (
        <div className="mt-6 text-center py-8">
          <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
            <Wallet className="h-6 w-6 text-brand-charcoal/40" />
          </div>
          <p className="text-sm text-brand-charcoal/60">No transactions yet.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((t) => {
            const Icon = t.icon ?? categoryIcon[t.category] ?? Wallet;
            const positive = t.amount >= 0;
            const colors = categoryColors[t.category] || categoryColors.Other;
            return (
              <li key={t.id} className="group flex items-center justify-between p-3 rounded-xl bg-white border border-border/40 hover:border-brand-yellow/40 hover:shadow-md hover:shadow-brand-yellow/5 transition-all duration-200">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl ring-1 shadow-sm transition-all group-hover:scale-110",
                    colors.bg,
                    colors.icon,
                    "text-white",
                    colors.ring
                  )}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-brand-charcoal">{t.name}</p>
                    <p className="text-xs text-brand-charcoal/60 mt-0.5">
                      {t.category} · {t.date}
                    </p>
                  </div>
                </div>
                <span
                  className={cn(
                    "text-sm font-bold tabular-nums px-2 py-1 rounded-lg",
                    positive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                  )}
                >
                  {positive ? "+" : "-"}₹{Math.abs(t.amount).toFixed(2)}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
