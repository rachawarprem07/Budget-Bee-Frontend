import { Container } from "@/components/common/Container";
import { Logo } from "@/components/landing/Logo";
import { Reveal } from "@/components/common/Reveal";

const COLUMNS = [
  {
    title: "Product",
    links: ["Features", "How it Works", "Download", "Changelog"],
  },
  {
    title: "Company",
    links: ["About Us", "Careers", "Press", "Contact"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Security", "Cookies"],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-white">
      {/* Decorative accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 left-1/2 -z-10 h-64 w-[80%] -translate-x-1/2 rounded-full bg-brand-yellow-soft/50 blur-3xl"
      />

      <Container className="grid gap-10 py-16 lg:grid-cols-[1.2fr_2fr]">
        <Reveal>
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-brand-charcoal/65">
            BudgetBee helps you track expenses, build better habits, and grow your savings — all
            in one delightful app.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {COLUMNS.map((col, ci) => (
            <Reveal key={col.title} delay={ci * 120} direction="up">
              <h4 className="text-sm font-semibold text-brand-charcoal">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="group inline-flex items-center text-sm text-brand-charcoal/65 transition-colors hover:text-brand-charcoal"
                    >
                      <span className="relative">
                        {link}
                        <span
                          aria-hidden
                          className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-brand-yellow transition-all duration-300 group-hover:w-full"
                        />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
          <p className="text-xs text-brand-charcoal/55">
            © {new Date().getFullYear()} BudgetBee. All rights reserved.
          </p>
          <p className="text-xs text-brand-charcoal/55">Made with care in India 🇮🇳</p>
        </Container>
      </div>
    </footer>
  );
}
