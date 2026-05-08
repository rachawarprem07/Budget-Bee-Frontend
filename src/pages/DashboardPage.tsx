import { useState } from "react";
import { Wallet, TrendingUp, PiggyBank, CreditCard, Plus, ArrowRight } from "lucide-react";
import { StatCard } from "@/components/app/dashboard/StatCard";
import { SpendChart } from "@/components/app/dashboard/SpendChart";
import { CategoryBreakdown } from "@/components/app/dashboard/CategoryBreakdown";
import { RecentTransactions, type Tx } from "@/components/app/dashboard/RecentTransactions";
import { GoalsWidget } from "@/components/app/dashboard/GoalsWidget";
import { BudgetProgress, type BudgetRow } from "@/components/app/dashboard/BudgetProgress";
import { AiInsights } from "@/components/app/dashboard/AiInsights";
import { AddTransactionDialog } from "@/components/app/dashboard/AddTransactionDialog";
import { AddBudgetDialog } from "@/components/app/dashboard/AddBudgetDialog";
import { toast } from "sonner";

const initialTxs: Tx[] = [
  { id: "1", name: "Salary — Acme Inc", category: "Income", amount: 352800, date: "Today" },
  { id: "2", name: "Blue Bottle Coffee", category: "Food & Drink", amount: -546, date: "Today" },
  { id: "3", name: "Whole Foods", category: "Groceries", amount: -6933, date: "Yesterday" },
  { id: "4", name: "Uber", category: "Transport", amount: -1197, date: "Yesterday" },
  { id: "5", name: "Rent — September", category: "Housing", amount: -100800, date: "Sep 1" },
  { id: "6", name: "Spotify", category: "Subscriptions", amount: -839, date: "Aug 30" },
];

const initialBudgets: BudgetRow[] = [
  { name: "Groceries", spent: 320, budget: 500 },
  { name: "Dining out", spent: 180, budget: 200 },
  { name: "Transport", spent: 95, budget: 150 },
  { name: "Entertainment", spent: 240, budget: 200 },
  { name: "Shopping", spent: 130, budget: 300 },
];

function DashboardPage() {
  const [txs, setTxs] = useState<Tx[]>(initialTxs);
  const [budgets, setBudgets] = useState<BudgetRow[]>(initialBudgets);
  const [openTx, setOpenTx] = useState(false);
  const [openBudget, setOpenBudget] = useState(false);

  function handleAddTx(tx: Tx) {
    setTxs((prev) => [tx, ...prev]);
    // Sync spend to matching budget
    if (tx.amount < 0) {
      setBudgets((prev) =>
        prev.map((b) =>
          b.name.toLowerCase() === tx.category.toLowerCase()
            ? { ...b, spent: b.spent + Math.abs(tx.amount) }
            : b,
        ),
      );
    }
    toast.success("Transaction added");
  }

  function handleAddBudget(b: BudgetRow) {
    setBudgets((prev) => {
      const existing = prev.findIndex((x) => x.name.toLowerCase() === b.name.toLowerCase());
      if (existing >= 0) {
        const copy = [...prev];
        copy[existing] = { ...copy[existing], budget: b.budget };
        return copy;
      }
      return [...prev, b];
    });
    toast.success("Budget created");
  }

  return (
    <>
      <div className="space-y-6 animate-fade-up">
        {/* Greeting + quick actions */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-brand-charcoal sm:text-3xl">
              Good morning, Alex 👋
            </h1>
            <p className="mt-1 text-sm text-brand-charcoal/60">
              Here's how your money is doing today.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setOpenTx(true)}
              className="inline-flex items-center gap-1.5 rounded-full bg-brand-charcoal px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
            >
              <Plus className="h-4 w-4" /> Add transaction
            </button>
            <button
              onClick={() => setOpenBudget(true)}
              className="inline-flex items-center gap-1.5 rounded-full bg-brand-yellow px-4 py-2 text-sm font-semibold text-brand-charcoal shadow-sm transition hover:brightness-105"
            >
              New budget <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total balance" value="₹10,84,050" delta={4.2} icon={Wallet} accent="yellow" sub="vs last month" />
          <StatCard label="Income" value="₹3,51,000" delta={2.1} icon={TrendingUp} accent="green" sub="vs Aug" />
          <StatCard label="Expenses" value="₹2,10,010" delta={-3.4} icon={CreditCard} accent="violet" sub="vs Aug" />
          <StatCard label="Saved this month" value="₹1,40,990" delta={12} icon={PiggyBank} accent="blue" sub="40% of income" />
        </div>

        {/* Charts row */}
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SpendChart />
          </div>
          <CategoryBreakdown />
        </div>

        {/* Insights banner */}
        <AiInsights />

        {/* Bottom grid */}
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RecentTransactions items={txs} />
          </div>
          <div className="space-y-4">
            <BudgetProgress rows={budgets} />
            <GoalsWidget />
          </div>
        </div>

        <AddTransactionDialog open={openTx} onOpenChange={setOpenTx} onAdd={handleAddTx} />
        <AddBudgetDialog open={openBudget} onOpenChange={setOpenBudget} onAdd={handleAddBudget} />
      </div>
    </>
  );
}

export default DashboardPage;
