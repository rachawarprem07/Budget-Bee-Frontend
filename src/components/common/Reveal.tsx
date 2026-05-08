import type { HTMLAttributes } from "react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "scale";

interface RevealProps extends HTMLAttributes<HTMLDivElement> {
  delay?: number;
  direction?: Direction;
  duration?: number;
}

const HIDDEN: Record<Direction, string> = {
  up: "translate-y-8 opacity-0",
  down: "-translate-y-8 opacity-0",
  left: "translate-x-8 opacity-0",
  right: "-translate-x-8 opacity-0",
  scale: "scale-95 opacity-0",
};

/**
 * Reveal — animates children when scrolled into view.
 * Uses IntersectionObserver. Direction-aware entrance.
 */
export function Reveal({
  delay = 0,
  direction = "up",
  duration = 700,
  className,
  style,
  children,
  ...rest
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ once: false, threshold: 0.12 });

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
        ...style,
      }}
      className={cn(
        "transition-all ease-out will-change-transform",
        inView ? "translate-x-0 translate-y-0 scale-100 opacity-100" : HIDDEN[direction],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
