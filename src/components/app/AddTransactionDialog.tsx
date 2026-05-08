import { useState } from "react";
import { X, DollarSign, TrendingUp, TrendingDown, Calendar, Tag, FileText } from "lucide-react";
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

interface AddTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddTransaction: (transaction: {
    description: string;
    amount: number;
    type: "income" | "expense";
    category: string;
    note: string;
    date: string;
  }) => void;
}

const categories = [
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

export function AddTransactionDialog({ open, onOpenChange, onAddTransaction }: AddTransactionDialogProps) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [category, setCategory] = useState(categories[0]);
  const [note, setNote] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0 || !description.trim()) {
      return;
    }

    const transaction = {
      description: description.trim(),
      amount: type === "income" ? amountNum : -amountNum,
      type,
      category,
      note: note.trim(),
      date,
    };

    onAddTransaction(transaction);
    
    // Reset form
    setDescription("");
    setAmount("");
    setNote("");
    setDate(new Date().toISOString().split('T')[0]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {type === "income" ? (
              <TrendingUp className="h-5 w-5 text-emerald-600" />
            ) : (
              <TrendingDown className="h-5 w-5 text-red-600" />
            )}
            Add Transaction
          </DialogTitle>
          <DialogDescription>
            Add a new {type} to track your finances
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Income/Expense Toggle */}
          <div className="flex gap-2 p-1 bg-muted rounded-lg">
            <Button
              type="button"
              variant={type === "income" ? "default" : "outline"}
              size="sm"
              onClick={() => setType("income")}
              className="flex-1"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Income
            </Button>
            <Button
              type="button"
              variant={type === "expense" ? "default" : "outline"}
              size="sm"
              onClick={() => setType("expense")}
              className="flex-1"
            >
              <TrendingDown className="h-4 w-4 mr-2" />
              Expense
            </Button>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium text-brand-charcoal">
              Description
            </label>
            <Input
              id="description"
              placeholder="Enter transaction description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <label htmlFor="amount" className="text-sm font-medium text-brand-charcoal">
              Amount
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-charcoal/40" />
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          {/* Category */}
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

          {/* Note */}
          <div className="space-y-2">
            <label htmlFor="note" className="text-sm font-medium text-brand-charcoal">
              <FileText className="h-4 w-4 mr-2 inline" />
              Note (optional)
            </label>
            <textarea
              id="note"
              placeholder="Add any additional notes..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none"
              rows={3}
            />
          </div>

          {/* Date */}
          <div className="space-y-2">
            <label htmlFor="date" className="text-sm font-medium text-brand-charcoal">
              <Calendar className="h-4 w-4 mr-2 inline" />
              Date
            </label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Add {type}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
