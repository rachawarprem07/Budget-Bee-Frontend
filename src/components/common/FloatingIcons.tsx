import type { LucideIcon } from "lucide-react";

interface FloatingIconItem {
  Icon: LucideIcon;
  className: string;
  /** Tailwind animation class, e.g. "animate-float-slow" */
  animation?: string;
  delay?: string;
  /** Color class for the icon (text-*) */
  color?: string;
  /** Background tint class for the bubble (bg-*) */
  bg?: string;
  size?: number;
}

interface FloatingIconsProps {
  items: FloatingIconItem[];
}

/**
 * Decorative floating icon bubbles for section backgrounds.
 * Pure presentation, pointer-events disabled.
 */
export function FloatingIcons({ items }: FloatingIconsProps) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
      {items.map(
        (
          {
            Icon,
            className,
            animation = "animate-float-slow",
            delay,
            color = "text-brand-charcoal/70",
            bg = "bg-white",
            size = 22,
          },
          i,
        ) => (
          <div
            key={i}
            className={`absolute flex items-center justify-center rounded-2xl shadow-[0_10px_30px_-10px_oklch(0.21_0.034_264.665/0.18)] ring-1 ring-black/5 ${bg} ${animation} ${className}`}
            style={delay ? { animationDelay: delay } : undefined}
          >
            <Icon size={size} className={color} strokeWidth={2.2} />
          </div>
        ),
      )}
    </div>
  );
}
