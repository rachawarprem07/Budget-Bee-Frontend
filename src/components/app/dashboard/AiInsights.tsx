import { Sparkles, TrendingUp, AlertTriangle } from "lucide-react";

const tips = [
  {
    icon: TrendingUp,
    title: "You saved 12% more this month",
    body: "Keep it up — at this pace you'll hit your emergency fund 2 months early.",
    tone: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  },
  {
    icon: AlertTriangle,
    title: "Entertainment is over budget",
    body: "You've spent ₹20,000 of ₹16,000. Consider trimming subscriptions you don't use.",
    tone: "bg-amber-50 text-amber-700 ring-amber-200",
  },
  {
    icon: Sparkles,
    title: "Round-up suggestion",
    body: "Enable round-ups on coffee purchases to add ~₹1,500/mo to savings.",
    tone: "bg-violet-50 text-violet-700 ring-violet-200",
  },
];

export function AiInsights() {
  return (
    <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-brand-yellow/15 via-card to-card p-5 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.1)]">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-yellow/30 ring-1 ring-brand-yellow/50">
          <Sparkles className="h-4 w-4 text-brand-charcoal" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-brand-charcoal">Smart insights</h3>
          <p className="text-xs text-brand-charcoal/60">Personalized for your habits</p>
        </div>
      </div>

      <ul className="mt-4 grid gap-3 md:grid-cols-3">
        {tips.map((t) => {
          const Icon = t.icon;
          return (
            <li
              key={t.title}
              className="rounded-xl border border-border/60 bg-card/80 p-4 backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ${t.tone}`}>
                <Icon className="h-3 w-3" /> Insight
              </div>
              <p className="mt-2 text-sm font-semibold text-brand-charcoal">{t.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-brand-charcoal/65">{t.body}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
