import { IndianRupee } from "lucide-react";

/**
 * Decorative floating elements that surround the hero mockup.
 * Pure presentation — no logic.
 */
export function HeroDecor() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
      {/* Soft yellow blob behind phone */}
      <div className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-yellow/35 blur-3xl animate-blob-pulse" />

      {/* Hexagon outlines */}
      <svg
        className="absolute left-4 top-10 h-16 w-16 text-brand-yellow/50 animate-float-medium"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      >
        <polygon points="50,5 90,28 90,72 50,95 10,72 10,28" />
      </svg>
      <svg
        className="absolute right-6 bottom-24 h-12 w-12 text-brand-yellow/60 animate-float-fast"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        style={{ animationDelay: "0.8s" }}
      >
        <polygon points="50,5 90,28 90,72 50,95 10,72 10,28" />
      </svg>

      {/* Floating coins */}
      <FloatingCoin className="left-2 top-1/3 h-14 w-14 animate-float-slow" />
      <FloatingCoin
        className="left-8 bottom-32 h-10 w-10 animate-float-medium"
        style={{ animationDelay: "0.6s" }}
      />
      <FloatingCoin
        className="right-2 top-20 h-12 w-12 animate-float-fast"
        style={{ animationDelay: "1.2s" }}
      />

      {/* Tiny bee */}
      <div className="absolute left-6 top-16 animate-float-fast">
        <div className="text-3xl animate-wiggle">🐝</div>
        {/* Dotted flight path */}
        <svg className="absolute -left-2 top-8 h-16 w-20 text-brand-yellow" viewBox="0 0 80 60">
          <path
            d="M 5 5 Q 30 30, 20 55"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="2 6"
          />
        </svg>
      </div>
    </div>
  );
}

interface FloatingCoinProps {
  className?: string;
  style?: React.CSSProperties;
}

function FloatingCoin({ className = "", style }: FloatingCoinProps) {
  return (
    <div className={`absolute ${className}`} style={style}>
      <div className="relative h-full w-full animate-spin-slow rounded-full bg-gradient-to-br from-yellow-300 via-brand-yellow to-yellow-600 shadow-[0_8px_20px_-4px_oklch(0.852_0.165_88.5/0.6)] ring-2 ring-yellow-400/60">
        <div className="absolute inset-1 flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-200 to-brand-yellow">
          <IndianRupee className="h-1/2 w-1/2 text-yellow-800" strokeWidth={3} />
        </div>
      </div>
    </div>
  );
}
