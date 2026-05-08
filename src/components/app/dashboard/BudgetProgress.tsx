import { cn } from "@/lib/utils";

export type BudgetRow = { name: string; spent: number; budget: number };

export function BudgetProgress({ rows }: { rows: BudgetRow[] }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-brand-charcoal">Budgets</h3>
          <p className="text-xs text-brand-charcoal/60">How you're tracking this month</p>
        </div>
      </div>
      {rows.length === 0 ? (
        <p className="mt-6 text-center text-sm text-brand-charcoal/60">No budgets yet.</p>
      ) : (
        <ul className="mt-4 space-y-4">
          {rows.map((r) => {
            const pct = r.budget > 0 ? Math.round((r.spent / r.budget) * 100) : 0;
            const over = r.spent > r.budget;
            return (
              <li key={r.name}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-brand-charcoal">{r.name}</span>
                  <span
                    className={cn(
                      "tabular-nums",
                      over ? "font-semibold text-rose-600" : "text-brand-charcoal/70",
                    )}
                  >
                    ${r.spent} <span className="text-brand-charcoal/40">/ ${r.budget}</span>
                  </span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all",
                      over ? "bg-rose-500" : "bg-brand-charcoal",
                    )}
                    style={{ width: `${Math.min(100, pct)}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
