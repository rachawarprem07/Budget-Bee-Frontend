import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Container } from "@/components/common/Container";
import { BrandButton } from "@/components/common/BrandButton";
import { Logo } from "@/components/landing/Logo";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#how" },
  { label: "About Us", href: "#about" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md">
      <Container className="flex h-20 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-brand-charcoal/80 transition-colors hover:text-brand-charcoal"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/login"
            className="text-sm font-semibold text-brand-charcoal/80 transition-colors hover:text-brand-charcoal"
          >
            Sign In
          </Link>
          <Link to="/signup">
            <BrandButton size="md">Get Started</BrandButton>
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg p-2 text-brand-charcoal md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-sm font-medium text-brand-charcoal/80 hover:bg-brand-yellow-soft/40"
              >
                {l.label}
              </a>
            ))}
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-3 text-sm font-medium text-brand-charcoal/80 hover:bg-brand-yellow-soft/40"
            >
              Sign In
            </Link>
            <Link to="/signup" onClick={() => setOpen(false)} className="mt-2 block">
              <BrandButton size="md" className="w-full">
                Get Started
              </BrandButton>
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}
