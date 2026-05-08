import { Heart, Users, Sparkles, Smile, Star, Gift } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { Reveal } from "@/components/common/Reveal";
import { FloatingIcons } from "@/components/common/FloatingIcons";

const VALUES = [
  {
    icon: Heart,
    title: "Built with care",
    description: "Every detail is designed to feel friendly, not financial.",
  },
  {
    icon: Users,
    title: "Made for everyone",
    description: "From students to families — money clarity for all of India.",
  },
  {
    icon: Sparkles,
    title: "Always improving",
    description: "We ship updates weekly based on what real users ask for.",
  },
];

const STATS = [
  { value: "50K+", label: "Happy users" },
  { value: "₹120Cr", label: "Tracked monthly" },
  { value: "4.8★", label: "Avg. rating" },
];

export function AboutUs() {
  return (
    <Section id="about" className="relative overflow-hidden bg-white">
      {/* Decorative blob */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-1/3 -z-10 h-96 w-96 rounded-full bg-brand-yellow-soft/50 blur-3xl animate-blob-pulse"
      />

      <FloatingIcons
        items={[
          { Icon: Smile, className: "left-[4%] top-16 h-11 w-11", color: "text-amber-500", bg: "bg-amber-50", animation: "animate-float-slow" },
          { Icon: Star, className: "right-[5%] bottom-20 h-10 w-10", color: "text-brand-yellow", bg: "bg-brand-yellow-soft", animation: "animate-float-medium", delay: "0.7s" },
          { Icon: Gift, className: "left-[6%] bottom-16 h-11 w-11", color: "text-rose-500", bg: "bg-rose-50", animation: "animate-float-fast", delay: "1.1s" },
        ]}
      />

      <Container className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
          <Reveal direction="right">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-yellow">
              About us
            </p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-brand-charcoal sm:text-5xl">
              We're on a mission to make{" "}
              <span className="relative inline-block">
                <span className="relative z-10">money simple</span>
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-brand-yellow/60"
                />
              </span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-brand-charcoal/70">
              BudgetBee started with a simple belief: managing money shouldn't feel like a chore.
              We're a small team of designers and engineers building the friendliest expense
              manager for everyday Indians — one that respects your time, your privacy, and your
              goals.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4">
              {STATS.map((s, i) => (
                <Reveal
                  key={s.label}
                  delay={200 + i * 120}
                  direction="up"
                  className="group cursor-default"
                >
                  <div className="rounded-2xl bg-gradient-to-br from-brand-yellow-soft/80 to-amber-100/40 p-4 text-center transition-all duration-500 hover:-translate-y-1 hover:from-brand-yellow/40 hover:shadow-[0_12px_30px_-12px_oklch(0.852_0.165_88.5/0.55)]">
                    <p className="text-2xl font-bold text-brand-charcoal sm:text-3xl">{s.value}</p>
                    <p className="mt-1 text-xs text-brand-charcoal/65">{s.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <div className="grid gap-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 150} direction="left">
                <div className="group relative overflow-hidden rounded-2xl border border-border bg-white p-5 shadow-[0_4px_20px_-8px_oklch(0.21_0.034_264.665/0.08)] transition-all duration-500 hover:-translate-y-1 hover:border-brand-yellow hover:shadow-[0_18px_36px_-12px_oklch(0.852_0.165_88.5/0.45)]">
                  {/* Sliding accent bar */}
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 h-full w-1 origin-top scale-y-0 bg-brand-yellow transition-transform duration-500 group-hover:scale-y-100"
                  />
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-yellow transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
                      <v.icon className="h-6 w-6 text-brand-charcoal" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-brand-charcoal">{v.title}</h3>
                      <p className="mt-1 text-sm text-brand-charcoal/65">{v.description}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
