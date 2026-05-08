import { useState, type FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { BrandButton } from "@/components/common/BrandButton";
import type { Tx } from "./RecentTransactions";

const CATEGORIES = [
  "Income",
  "Food & Drink",
  "Groceries",
  "Transport",
  "Housing",
  "Subscriptions",
  "Shopping",
  "Entertainment",
  "Other",
];

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onAdd: (tx: Tx) => void;
}

export function AddTransactionDialog({ open, onOpenChange, onAdd }: Props) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food & Drink");
  const [type, setType] = useState<"expense" | "income">("expense");

  function reset() {
    setName("");
    setAmount("");
    setCategory("Food & Drink");
    setType("expense");
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const value = parseFloat(amount);
    if (!name.trim() || isNaN(value) || value <= 0) return;
    onAdd({
      id: crypto.randomUUID(),
      name: name.trim(),
      category: type === "income" ? "Income" : category,
      amount: type === "income" ? value : -value,
      date: "Today",
    });
    reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-brand-charcoal">Add transaction</DialogTitle>
          <DialogDescription>Track a new expense or income entry.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-2 rounded-xl bg-muted p-1">
            {(["expense", "income"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`rounded-lg py-2 text-sm font-semibold capitalize transition ${
                  type === t
                    ? "bg-brand-yellow text-brand-charcoal shadow-sm"
                    : "text-brand-charcoal/60 hover:text-brand-charcoal"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brand-charcoal/70">
              Description
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Coffee at Blue Bottle"
              required
              className="h-11 w-full rounded-xl border border-border bg-white px-3 text-sm focus:border-brand-yellow focus:outline-none focus:ring-4 focus:ring-brand-yellow/25"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brand-charcoal/70">
              Amount ($)
            </label>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              required
              className="h-11 w-full rounded-xl border border-border bg-white px-3 text-sm focus:border-brand-yellow focus:outline-none focus:ring-4 focus:ring-brand-yellow/25"
            />
          </div>

          {type === "expense" && (
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brand-charcoal/70">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-11 w-full rounded-xl border border-border bg-white px-3 text-sm focus:border-brand-yellow focus:outline-none focus:ring-4 focus:ring-brand-yellow/25"
              >
                {CATEGORIES.filter((c) => c !== "Income").map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          )}

          <DialogFooter className="gap-2">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-xl border border-border px-4 py-2 text-sm font-semibold text-brand-charcoal/80 hover:bg-muted"
            >
              Cancel
            </button>
            <BrandButton type="submit" size="md">
              Add transaction
            </BrandButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
