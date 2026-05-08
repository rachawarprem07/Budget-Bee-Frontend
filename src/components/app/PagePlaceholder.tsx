import type { ReactNode } from "react";

export function PagePlaceholder({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: ReactNode;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-yellow/20 text-brand-charcoal ring-1 ring-brand-yellow/40">
          {icon}
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-brand-charcoal">{title}</h1>
          <p className="text-sm text-brand-charcoal/60">{description}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-border/60 bg-card p-5 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.1)]"
          >
            <div className="h-3 w-20 rounded-full bg-brand-yellow/30" />
            <div className="mt-4 h-7 w-32 rounded-md bg-brand-charcoal/10" />
            <div className="mt-6 h-2 w-full rounded-full bg-muted" />
            <div className="mt-2 h-2 w-2/3 rounded-full bg-muted" />
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-dashed border-brand-yellow/50 bg-brand-yellow-soft/40 p-8 text-center">
        <p className="text-sm font-medium text-brand-charcoal">
          ✨ {title} module is ready to be built out.
        </p>
        <p className="mt-1 text-xs text-brand-charcoal/60">
          Hook this page up to your data — the layout & theme are in place.
        </p>
      </div>
    </div>
  );
}
