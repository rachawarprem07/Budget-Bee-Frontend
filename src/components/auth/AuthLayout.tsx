import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/landing/Logo";
import { AuthSideArt } from "./AuthSideArt";

interface AuthLayoutProps {
  /** Side panel headline (rendered with brand accent on the last word) */
  sideTitle: ReactNode;
  sideText: string;
  /** Top-right helper text + link */
  topPrompt: string;
  topLinkLabel: string;
  topLinkTo: "/login" | "/signup";
  children: ReactNode;
}

export function AuthLayout({
  sideTitle,
  sideText,
  topPrompt,
  topLinkLabel,
  topLinkTo,
  children,
}: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Ambient background blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand-yellow/30 blur-3xl animate-blob-pulse" />
        <div
          className="absolute right-[-6rem] bottom-[-4rem] h-80 w-80 rounded-full bg-brand-yellow-soft/70 blur-3xl animate-blob-pulse"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-6 sm:px-8 lg:px-12">
        {/* Top bar */}
        <header className="flex items-center justify-between">
          <Link to="/" aria-label="BudgetBee home">
            <Logo />
          </Link>
          <p className="text-sm text-brand-charcoal/70">
            {topPrompt}{" "}
            <Link
              to={topLinkTo}
              className="font-semibold text-brand-yellow hover:underline underline-offset-4"
            >
              {topLinkLabel}
            </Link>
          </p>
        </header>

        {/* Body */}
        <div className="grid flex-1 items-center gap-10 py-8 lg:grid-cols-[1fr_minmax(0,460px)] lg:gap-12 lg:py-12">
          {/* Left: copy + animated illustration */}
          <section className="hidden lg:flex lg:flex-col lg:justify-center">
            <div className="max-w-md animate-fade-up space-y-4">
              <h2 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-brand-charcoal xl:text-5xl">
                {sideTitle}
              </h2>
              <p className="text-base text-brand-charcoal/70">{sideText}</p>
            </div>

            <div className="relative mt-6 h-[460px] w-full">
              <AuthSideArt />
            </div>
          </section>

          {/* Right: form card */}
          <main className="flex items-center justify-center">
            <div className="w-full animate-fade-up rounded-3xl border border-border bg-white/90 p-7 shadow-[0_30px_80px_-30px_oklch(0.21_0.034_264.665/0.25)] backdrop-blur-xl sm:p-9">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
