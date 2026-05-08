export function Divider({ label = "or" }: { label?: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px flex-1 bg-border" />
      <span className="text-xs font-medium uppercase tracking-wider text-brand-charcoal/50">
        {label}
      </span>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}
