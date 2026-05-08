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
import type { BudgetRow } from "./BudgetProgress";

const CATEGORIES = [
  "Groceries",
  "Dining out",
  "Transport",
  "Housing",
  "Entertainment",
  "Shopping",
  "Subscriptions",
  "Other",
];

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onAdd: (b: BudgetRow) => void;
}

export function AddBudgetDialog({ open, onOpenChange, onAdd }: Props) {
  const [name, setName] = useState(CATEGORIES[0]);
  const [budget, setBudget] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const value = parseFloat(budget);
    if (!name.trim() || isNaN(value) || value <= 0) return;
    onAdd({ name: name.trim(), spent: 0, budget: value });
    setName(CATEGORIES[0]);
    setBudget("");
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-brand-charcoal">New budget</DialogTitle>
          <DialogDescription>Set a monthly spending limit for a category.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brand-charcoal/70">
              Category
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              list="budget-cats"
              required
              className="h-11 w-full rounded-xl border border-border bg-white px-3 text-sm focus:border-brand-yellow focus:outline-none focus:ring-4 focus:ring-brand-yellow/25"
            />
            <datalist id="budget-cats">
              {CATEGORIES.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brand-charcoal/70">
              Monthly limit ($)
            </label>
            <input
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              type="number"
              step="1"
              min="1"
              placeholder="e.g. 500"
              required
              className="h-11 w-full rounded-xl border border-border bg-white px-3 text-sm focus:border-brand-yellow focus:outline-none focus:ring-4 focus:ring-brand-yellow/25"
            />
          </div>

          <DialogFooter className="gap-2">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-xl border border-border px-4 py-2 text-sm font-semibold text-brand-charcoal/80 hover:bg-muted"
            >
              Cancel
            </button>
            <BrandButton type="submit" size="md">
              Create budget
            </BrandButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
