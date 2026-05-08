import { Wallet, PieChart, Bell, TrendingUp, IndianRupee, CreditCard, Coins, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { Reveal } from "@/components/common/Reveal";
import { FloatingIcons } from "@/components/common/FloatingIcons";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: string;
  iconBg: string;
}

const FEATURES: Feature[] = [
  {
    icon: Wallet,
    title: "Effortless Tracking",
    description: "Log every rupee in seconds with smart categorization.",
    accent: "from-brand-yellow/30 to-transparent",
    iconBg: "bg-brand-yellow-soft",
  },
  {
    icon: PieChart,
    title: "Visual Insights",
    description: "Beautiful charts that make your spending easy to understand.",
    accent: "from-emerald-200/40 to-transparent",
    iconBg: "bg-emerald-100",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description: "Stay ahead with reminders before you overspend.",
    accent: "from-violet-200/40 to-transparent",
    iconBg: "bg-violet-100",
  },
  {
    icon: TrendingUp,
    title: "Goal-Based Saving",
    description: "Set targets and watch your wealth grow week by week.",
    accent: "from-rose-200/40 to-transparent",
    iconBg: "bg-rose-100",
  },
];

export function Features() {
  return (
    <Section id="features" className="relative overflow-hidden bg-white">
      {/* Decorative blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-20 -z-10 h-72 w-72 rounded-full bg-brand-yellow-soft/60 blur-3xl animate-blob-pulse"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-20 -z-10 h-72 w-72 rounded-full bg-emerald-100/60 blur-3xl animate-blob-pulse"
        style={{ animationDelay: "2s" }}
      />

      <FloatingIcons
        items={[
          { Icon: IndianRupee, className: "left-[6%] top-24 h-12 w-12", color: "text-brand-yellow", bg: "bg-brand-yellow-soft", animation: "animate-float-slow" },
          { Icon: Coins, className: "right-[8%] top-32 h-11 w-11", color: "text-amber-600", bg: "bg-amber-50", animation: "animate-float-medium", delay: "0.6s" },
          { Icon: CreditCard, className: "left-[10%] bottom-24 h-12 w-12", color: "text-violet-600", bg: "bg-violet-50", animation: "animate-float-fast", delay: "1.1s" },
          { Icon: Sparkles, className: "right-[12%] bottom-20 h-10 w-10", color: "text-emerald-600", bg: "bg-emerald-50", animation: "animate-float-medium", delay: "0.3s" },
        ]}
      />

      <Container className="relative z-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-yellow">
            Features
          </p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-brand-charcoal sm:text-5xl">
            Everything you need to feel{" "}
            <span className="bg-gradient-to-r from-brand-yellow via-amber-400 to-brand-yellow bg-clip-text text-transparent animate-gradient-shift">
              in control
            </span>
          </h2>
          <p className="mt-4 text-base text-brand-charcoal/70">
            Built for everyday Indians who want clarity, not complexity.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 100} direction="up">
              <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-[0_4px_20px_-8px_oklch(0.21_0.034_264.665/0.08)] transition-all duration-500 hover:-translate-y-2 hover:border-brand-yellow hover:shadow-[0_22px_40px_-12px_oklch(0.852_0.165_88.5/0.55)]">
                {/* Hover gradient wash */}
                <div
                  aria-hidden
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${f.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                />
                {/* Corner shimmer */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-x-10 -top-10 h-20 -translate-x-full opacity-0 transition-all duration-700 group-hover:translate-x-full group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, oklch(1 0 0 / 0.6), transparent)",
                  }}
                />

                <div className="relative">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${f.iconBg} transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-brand-yellow`}
                  >
                    <f.icon className="h-6 w-6 text-brand-charcoal transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-brand-charcoal">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-charcoal/65">
                    {f.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
