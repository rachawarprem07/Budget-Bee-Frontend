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

export function RecentTransactions({ items }: { items: Tx[] }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-brand-charcoal">Recent transactions</h3>
          <p className="text-xs text-brand-charcoal/60">Your latest activity</p>
        </div>
        <button className="rounded-full bg-brand-yellow/15 px-3 py-1 text-xs font-semibold text-brand-charcoal ring-1 ring-brand-yellow/40 transition hover:bg-brand-yellow/25">
          View all
        </button>
      </div>

      {items.length === 0 ? (
        <p className="mt-6 text-center text-sm text-brand-charcoal/60">No transactions yet.</p>
      ) : (
        <ul className="mt-4 divide-y divide-border/60">
          {items.map((t) => {
            const Icon = t.icon ?? categoryIcon[t.category] ?? Wallet;
            const positive = t.amount >= 0;
            return (
              <li key={t.id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted text-brand-charcoal/80 ring-1 ring-border/60">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-brand-charcoal">{t.name}</p>
                    <p className="text-xs text-brand-charcoal/55">
                      {t.category} · {t.date}
                    </p>
                  </div>
                </div>
                <span
                  className={cn(
                    "text-sm font-semibold tabular-nums",
                    positive ? "text-emerald-600" : "text-brand-charcoal",
                  )}
                >
                  {positive ? "+" : "-"}${Math.abs(t.amount).toFixed(2)}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
