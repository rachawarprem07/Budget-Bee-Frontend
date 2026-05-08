import type { LucideIcon } from "lucide-react";

interface HeroTrustItemProps {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
}

export function HeroTrustItem({
  icon: Icon,
  iconBg,
  iconColor,
  title,
  subtitle,
}: HeroTrustItemProps) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBg}`}
        aria-hidden
      >
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </div>
      <div>
        <p className="text-sm font-semibold text-brand-charcoal">{title}</p>
        <p className="text-xs text-brand-charcoal/60">{subtitle}</p>
      </div>
    </div>
  );
}
