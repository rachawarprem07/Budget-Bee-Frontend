import { IndianRupee } from "lucide-react";
import heroMockup from "@/assets/hero-mockup.png";

/**
 * Auth side panel illustration — mirrors the landing hero section:
 * floating phone mockup, spinning coins, hexagons, and an animated bee.
 */
export function AuthSideArt() {
  return (
    <div className="relative h-full w-full">
      {/* Soft yellow glow behind phone */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-yellow/35 blur-3xl animate-blob-pulse"
      />

      {/* Hexagon outlines */}
      <svg
        aria-hidden
        className="absolute left-2 top-6 h-16 w-16 text-brand-yellow/60 animate-float-medium"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      >
        <polygon points="50,5 90,28 90,72 50,95 10,72 10,28" />
      </svg>
      <svg
        aria-hidden
        className="absolute right-4 bottom-16 h-12 w-12 text-brand-yellow/70 animate-float-fast"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        style={{ animationDelay: "0.8s" }}
      >
        <polygon points="50,5 90,28 90,72 50,95 10,72 10,28" />
      </svg>

      {/* Floating coins */}
      <FloatingCoin className="left-0 top-1/3 h-14 w-14 animate-float-slow" />
      <FloatingCoin
        className="right-2 top-12 h-12 w-12 animate-float-fast"
        style={{ animationDelay: "1.2s" }}
      />
      <FloatingCoin
        className="left-8 bottom-12 h-10 w-10 animate-float-medium"
        style={{ animationDelay: "0.6s" }}
      />

      {/* Bee with flight path */}
      <div aria-hidden className="absolute right-12 top-2 z-20 animate-float-fast">
        <div className="text-3xl animate-wiggle">🐝</div>
        <svg className="absolute -left-12 top-6 h-16 w-20 text-brand-yellow" viewBox="0 0 80 60">
          <path
            d="M 75 5 Q 40 30, 50 55"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="2 6"
          />
        </svg>
      </div>

      {/* Phone mockup */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <img
          src={heroMockup}
          alt="BudgetBee mobile app preview"
          width={1024}
          height={1024}
          className="w-full max-w-sm animate-float-slow drop-shadow-[0_30px_60px_rgba(0,0,0,0.4)] xl:max-w-md"
        />
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
    <div className={`absolute z-20 ${className}`} style={style} aria-hidden>
      <div className="relative h-full w-full animate-spin-slow rounded-full bg-gradient-to-br from-yellow-300 via-brand-yellow to-yellow-600 shadow-[0_8px_20px_-4px_oklch(0.852_0.165_88.5/0.6)] ring-2 ring-yellow-400/60">
        <div className="absolute inset-1 flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-200 to-brand-yellow">
          <IndianRupee className="h-1/2 w-1/2 text-yellow-800" strokeWidth={3} />
        </div>
      </div>
    </div>
  );
}
