import logo from "@/assets/logo.png";

export function Logo() {
  return (
    <a href="/" className="flex items-center gap-2">
      <img src={logo} alt="BudgetBee logo" width={40} height={40} className="h-10 w-10" />
      <span className="text-xl font-bold tracking-tight text-brand-charcoal">
        Budget<span className="text-brand-yellow">Bee</span>
      </span>
    </a>
  );
}
