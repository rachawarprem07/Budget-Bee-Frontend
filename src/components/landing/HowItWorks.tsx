import { Plus, Tags, LineChart, Trophy, PiggyBank, Receipt, Wallet, BadgeCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { Reveal } from "@/components/common/Reveal";
import { FloatingIcons } from "@/components/common/FloatingIcons";

interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    icon: Plus,
    title: "Add an expense",
    description:
      "Log a transaction in seconds — type the amount, pick an account, and you're done.",
  },
  {
    icon: Tags,
    title: "Auto-categorize",
    description:
      "BudgetBee tags every expense — Food, Transport, Bills — so you never sort manually.",
  },
  {
    icon: LineChart,
    title: "See where money goes",
    description:
      "Beautiful charts and monthly summaries reveal your real spending patterns.",
  },
  {
    icon: Trophy,
    title: "Hit your goals",
    description:
      "Set savings targets, get smart nudges, and watch your wealth grow week by week.",
  },
];

export function HowItWorks() {
  return (
    <Section id="how" className="relative overflow-hidden bg-brand-yellow-soft/40">
      {/* Background decor */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 -z-10 h-96 w-96 translate-x-1/3 -translate-y-1/3 rounded-full bg-brand-yellow/20 blur-3xl animate-blob-pulse"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 bottom-0 -z-10 h-80 w-80 -translate-x-1/3 translate-y-1/3 rounded-full bg-amber-200/30 blur-3xl animate-blob-pulse"
        style={{ animationDelay: "2.5s" }}
      />

      <FloatingIcons
        items={[
          { Icon: PiggyBank, className: "left-[5%] top-20 h-12 w-12", color: "text-pink-500", bg: "bg-pink-50", animation: "animate-float-slow" },
          { Icon: Receipt, className: "right-[6%] top-28 h-11 w-11", color: "text-brand-charcoal", bg: "bg-white", animation: "animate-float-medium", delay: "0.5s" },
          { Icon: Wallet, className: "left-[8%] bottom-16 h-12 w-12", color: "text-emerald-600", bg: "bg-emerald-50", animation: "animate-float-fast", delay: "0.9s" },
          { Icon: BadgeCheck, className: "right-[10%] bottom-24 h-11 w-11", color: "text-brand-yellow", bg: "bg-brand-yellow-soft", animation: "animate-float-medium", delay: "1.4s" },
        ]}
      />

      <Container className="relative z-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-yellow">
            How it works
          </p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-brand-charcoal sm:text-5xl">
            Four simple steps to better money habits
          </h2>
          <p className="mt-4 text-base text-brand-charcoal/70">
            Just like the expense managers you already love — only friendlier, faster, and built
            for India.
          </p>
        </Reveal>

        {/* Connecting dotted line for desktop */}
        <div className="relative mt-14">
          <svg
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-12 mx-auto hidden h-4 w-[85%] lg:block"
            viewBox="0 0 1000 20"
            preserveAspectRatio="none"
          >
            <path
              d="M0 10 Q 250 -10 500 10 T 1000 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="6 8"
              className="text-brand-yellow/60 animate-draw-line"
            />
          </svg>

          <ol className="relative grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 130} direction="up" className="h-full">
                <li className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-[0_4px_20px_-8px_oklch(0.21_0.034_264.665/0.08)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_22px_40px_-12px_oklch(0.852_0.165_88.5/0.55)]">
                  {/* Icon ring animation */}
                  <div className="relative">
                    <span
                      aria-hidden
                      className="absolute inset-0 -z-10 rounded-xl bg-brand-yellow/40 opacity-0 blur-md transition-all duration-500 group-hover:opacity-100 group-hover:scale-150"
                    />
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-yellow transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                      <step.icon className="h-6 w-6 text-brand-charcoal" />
                    </div>
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-brand-charcoal">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-charcoal/65">
                    {step.description}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
