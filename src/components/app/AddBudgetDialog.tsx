import { useState } from "react";
import { X, Wallet, Calendar, Tag, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AddBudgetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddBudget: (budget: {
    name: string;
    category: string;
    budget: number;
  }) => void;
}

const categories = [
  "Groceries",
  "Food & Drink",
  "Transport",
  "Housing",
  "Subscriptions",
  "Shopping",
  "Entertainment",
  "Other",
];

export function AddBudgetDialog({ open, onOpenChange, onAddBudget }: AddBudgetDialogProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [budget, setBudget] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const budgetNum = parseFloat(budget);
    if (isNaN(budgetNum) || budgetNum <= 0 || !name.trim()) {
      return;
    }

    const newBudget = {
      name: name.trim(),
      category,
      budget: budgetNum,
    };

    onAddBudget(newBudget);
    
    setName("");
    setBudget("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-brand-charcoal" />
            Add Budget
          </DialogTitle>
          <DialogDescription>
            Create a new budget to track your spending limits
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="budgetName" className="text-sm font-medium text-brand-charcoal">
              Budget Name
            </label>
            <Input
              id="budgetName"
              placeholder="Enter budget name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium text-brand-charcoal">
              <Tag className="h-4 w-4 mr-2 inline" />
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              required
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="budgetAmount" className="text-sm font-medium text-brand-charcoal">
              <DollarSign className="h-4 w-4 mr-2 inline" />
              Budget Amount
            </label>
            <Input
              id="budgetAmount"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0.00"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Add Budget
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
