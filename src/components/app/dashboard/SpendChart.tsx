import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { m: "Jan", income: 3200, spend: 2100 },
  { m: "Feb", income: 3400, spend: 2400 },
  { m: "Mar", income: 3100, spend: 2000 },
  { m: "Apr", income: 3600, spend: 2700 },
  { m: "May", income: 3800, spend: 2500 },
  { m: "Jun", income: 4000, spend: 2900 },
  { m: "Jul", income: 4200, spend: 3100 },
  { m: "Aug", income: 4100, spend: 2800 },
  { m: "Sep", income: 4400, spend: 3000 },
];

export function SpendChart() {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-brand-charcoal">Cash flow</h3>
          <p className="text-xs text-brand-charcoal/60">Income vs spending — last 9 months</p>
        </div>
        <div className="flex items-center gap-3 text-xs text-brand-charcoal/70">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-brand-yellow" /> Income
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-brand-charcoal" /> Spend
          </span>
        </div>
      </div>
      <div className="mt-4 h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ left: -10, right: 8, top: 10 }}>
            <defs>
              <linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.852 0.165 88.5)" stopOpacity={0.55} />
                <stop offset="100%" stopColor="oklch(0.852 0.165 88.5)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="spendFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.279 0.029 256.847)" stopOpacity={0.35} />
                <stop offset="100%" stopColor="oklch(0.279 0.029 256.847)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.929 0.013 255.508)" vertical={false} />
            <XAxis dataKey="m" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "oklch(0.554 0.046 257.417)" }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "oklch(0.554 0.046 257.417)" }} />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid oklch(0.929 0.013 255.508)",
                boxShadow: "0 10px 40px -10px rgba(0,0,0,0.15)",
              }}
              formatter={(v: number) => `$${v.toLocaleString()}`}
            />
            <Area type="monotone" dataKey="income" stroke="oklch(0.852 0.165 88.5)" strokeWidth={2.5} fill="url(#incomeFill)" />
            <Area type="monotone" dataKey="spend" stroke="oklch(0.279 0.029 256.847)" strokeWidth={2.5} fill="url(#spendFill)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
