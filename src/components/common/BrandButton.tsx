import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline";
type Size = "md" | "lg";

interface BrandButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-yellow text-brand-charcoal shadow-[0_8px_24px_-8px_oklch(0.852_0.165_88.5/0.7)] hover:translate-y-[-1px] hover:shadow-[0_12px_28px_-8px_oklch(0.852_0.165_88.5/0.85)]",
  secondary:
    "bg-brand-charcoal text-white hover:bg-brand-charcoal/90",
  outline:
    "border border-border bg-white text-brand-charcoal hover:border-brand-charcoal hover:bg-brand-yellow-soft/40",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-7 text-base",
};

export function BrandButton({
  variant = "primary",
  size = "lg",
  className,
  leftIcon,
  rightIcon,
  children,
  ...props
}: BrandButtonProps) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {leftIcon}
      <span>{children}</span>
      {rightIcon}
    </button>
  );
}
