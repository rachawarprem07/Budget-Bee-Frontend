import { Plane, Home, GraduationCap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Goal = { id: string; name: string; saved: number; target: number; icon: LucideIcon; tint: string };

const goals: Goal[] = [
  { id: "1", name: "Japan trip", saved: 1850, target: 3500, icon: Plane, tint: "bg-sky-100 text-sky-700" },
  { id: "2", name: "Emergency fund", saved: 4200, target: 6000, icon: Home, tint: "bg-emerald-100 text-emerald-700" },
  { id: "3", name: "Online course", saved: 320, target: 600, icon: GraduationCap, tint: "bg-violet-100 text-violet-700" },
];

export function GoalsWidget() {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-brand-charcoal">Goals</h3>
        <button className="text-xs font-semibold text-brand-charcoal/70 hover:text-brand-charcoal">+ New goal</button>
      </div>
      <ul className="mt-4 space-y-4">
        {goals.map((g) => {
          const Icon = g.icon;
          const pct = Math.min(100, Math.round((g.saved / g.target) * 100));
          return (
            <li key={g.id}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${g.tint}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-brand-charcoal">{g.name}</p>
                    <p className="text-xs text-brand-charcoal/55">
                      ${g.saved.toLocaleString()} / ${g.target.toLocaleString()}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-brand-charcoal">{pct}%</span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand-yellow to-brand-yellow/70 transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
