import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Housing", value: 1200, color: "oklch(0.852 0.165 88.5)" },
  { name: "Food", value: 540, color: "oklch(0.72 0.18 145)" },
  { name: "Transport", value: 320, color: "oklch(0.7 0.15 250)" },
  { name: "Leisure", value: 280, color: "oklch(0.65 0.2 320)" },
  { name: "Other", value: 180, color: "oklch(0.554 0.046 257.417)" },
];

const total = data.reduce((s, d) => s + d.value, 0);

export function CategoryBreakdown() {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.1)]">
      <h3 className="text-base font-semibold text-brand-charcoal">Spending by category</h3>
      <p className="text-xs text-brand-charcoal/60">This month</p>

      <div className="relative mt-4 h-52">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} contentStyle={{ borderRadius: 12 }} />
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={56} outerRadius={84} paddingAngle={3} stroke="none">
              {data.map((d) => (
                <Cell key={d.name} fill={d.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs text-brand-charcoal/60">Total</span>
          <span className="text-lg font-bold text-brand-charcoal">${total.toLocaleString()}</span>
        </div>
      </div>

      <ul className="mt-4 space-y-2">
        {data.map((d) => {
          const pct = Math.round((d.value / total) * 100);
          return (
            <li key={d.name} className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-brand-charcoal/80">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />
                {d.name}
              </span>
              <span className="font-medium text-brand-charcoal">${d.value} <span className="text-brand-charcoal/50">· {pct}%</span></span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
