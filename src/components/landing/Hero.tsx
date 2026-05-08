import { ArrowRight, PlayCircle, ShieldCheck, BarChart3, Target } from "lucide-react";
import { Container } from "@/components/common/Container";
import { BrandButton } from "@/components/common/BrandButton";
import { HeroTrustItem } from "@/components/landing/HeroTrustItem";
import { HeroDecor } from "@/components/landing/HeroDecor";
import heroMockup from "@/assets/hero-mockup.png";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Decorative background blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 -z-10 h-[700px] w-[700px] translate-x-1/4 rounded-full bg-brand-yellow-soft/70 blur-3xl animate-blob-pulse"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-20 top-40 -z-10 h-72 w-72 rounded-full bg-brand-yellow/30 blur-2xl animate-blob-pulse"
        style={{ animationDelay: "1.5s" }}
      />

      <Container className="grid items-center gap-10 py-12 lg:grid-cols-[1fr_1.15fr] lg:gap-6 lg:py-20">
        {/* Left: copy */}
        <div className="max-w-xl animate-fade-up">
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-brand-charcoal sm:text-5xl lg:text-6xl xl:text-7xl">
            Smart Today,
            <br />
            <span className="text-brand-yellow">Wealth Tomorrow</span>
          </h1>

          <p className="mt-5 text-base leading-relaxed text-brand-charcoal/70 sm:text-lg">
            Track expenses, build better habits, and grow your savings with{" "}
            <span className="font-semibold text-brand-charcoal">
              Budget<span className="text-brand-yellow">Bee</span>
            </span>
            .
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <BrandButton rightIcon={<ArrowRight size={18} />}>Get Started Free</BrandButton>
            <BrandButton variant="outline" leftIcon={<PlayCircle size={20} />}>
              See How It Works
            </BrandButton>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <HeroTrustItem
              icon={ShieldCheck}
              iconBg="bg-brand-yellow-soft"
              iconColor="text-brand-charcoal"
              title="100% Secure"
              subtitle="Your data is safe"
            />
            <HeroTrustItem
              icon={BarChart3}
              iconBg="bg-emerald-100"
              iconColor="text-emerald-600"
              title="Smart Insights"
              subtitle="Know your money"
            />
            <HeroTrustItem
              icon={Target}
              iconBg="bg-violet-100"
              iconColor="text-violet-600"
              title="Achieve Goals"
              subtitle="One step at a time"
            />
          </div>
        </div>

        {/* Right: mockup with floating decor */}
        <div className="relative flex items-center justify-center lg:-my-8 lg:justify-end">
          <HeroDecor />
          <img
            src={heroMockup}
            alt="BudgetBee mobile app showing balance, expenses and breakdown chart"
            width={1024}
            height={1024}
            className="relative z-10 w-full max-w-lg animate-float-slow drop-shadow-[0_30px_60px_rgba(0,0,0,0.18)] sm:max-w-xl lg:max-w-none lg:scale-110"
          />
        </div>
      </Container>
    </section>
  );
}
