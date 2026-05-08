import { useState, useMemo } from "react";
import { Wallet, Plus, Download, Upload, TrendingUp, TrendingDown, Coffee, ShoppingBag, Car, Home, Sparkles, Briefcase, Search, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { AddBudgetDialog } from "@/components/app/AddBudgetDialog";

type Budget = {
  id: string;
  name: string;
  spent: number;
  budget: number;
  category: string;
};

const mockBudgets: Budget[] = [
  { id: "1", name: "Groceries", spent: 320, budget: 500, category: "Groceries" },
  { id: "2", name: "Dining out", spent: 180, budget: 200, category: "Food & Drink" },
  { id: "3", name: "Transport", spent: 95, budget: 150, category: "Transport" },
  { id: "4", name: "Entertainment", spent: 240, budget: 200, category: "Entertainment" },
  { id: "5", name: "Shopping", spent: 130, budget: 300, category: "Shopping" },
];

const categoryIcon: Record<string, any> = {
  Income: Briefcase,
  "Food & Drink": Coffee,
  Groceries: ShoppingBag,
  Transport: Car,
  Housing: Home,
  Subscriptions: Sparkles,
  Shopping: ShoppingBag,
  Entertainment: Sparkles,
  Other: Wallet,
};

const categories = Object.keys(categoryIcon);

function BudgetsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAddDialog, setShowAddDialog] = useState(false);

  const handleAddBudget = (budget: {
    name: string;
    category: string;
    budget: number;
  }) => {
    const newBudget: Budget = {
      id: Date.now().toString(),
      name: budget.name,
      category: budget.category,
      budget: budget.budget,
      spent: 0,
    };

    mockBudgets.unshift(newBudget);
    setShowAddDialog(false);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(mockBudgets, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'budgets.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target?.result as string);
          mockBudgets.unshift(...imported);
        } catch (error) {
          console.error('Import failed:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  const filteredBudgets = useMemo(() => {
    return mockBudgets.filter((budget) => {
      const matchesSearch = budget.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || budget.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const totalBudgeted = useMemo(() => 
    mockBudgets.reduce((sum, budget) => sum + budget.budget, 0), 
    [mockBudgets]
  );

  const totalSpent = useMemo(() => 
    mockBudgets.reduce((sum, budget) => sum + budget.spent, 0), 
    [mockBudgets]
  );

  const totalRemaining = totalBudgeted - totalSpent;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-brand-charcoal">Budgets</h1>
          <p className="text-sm text-brand-charcoal/60">Plan, allocate, and stay in control of your spending.</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" asChild>
            <label className="cursor-pointer">
              <Upload className="h-4 w-4 mr-2" />
              Import
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>
          </Button>
          <Button size="sm" variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm" onClick={() => setShowAddDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Budget
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.1)]">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-yellow/20">
              <Wallet className="h-4 w-4 text-brand-charcoal" />
            </div>
            <div>
              <p className="text-xs text-brand-charcoal/60">Total Budgeted</p>
              <p className="text-lg font-semibold text-brand-charcoal">${totalBudgeted.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.1)]">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-brand-charcoal/60">Total Spent</p>
              <p className="text-lg font-semibold text-emerald-600">${totalSpent.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.1)]">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
              <TrendingDown className="h-4 w-4 text-red-600" />
            </div>
            <div>
              <p className="text-xs text-brand-charcoal/60">Remaining</p>
              <p className="text-lg font-semibold text-red-600">${totalRemaining.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-charcoal/40" />
          <Input
            placeholder="Search budgets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="rounded-md border border-input bg-background px-3 py-2 text-sm md:w-auto w-full"
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Budgets List */}
      <div className="rounded-2xl border border-border/60 bg-card shadow-[0_10px_40px_-20px_rgba(0,0,0,0.1)]">
        <div className="p-5">
          <h3 className="text-base font-semibold text-brand-charcoal mb-4">Your Budgets</h3>
          {filteredBudgets.length === 0 ? (
            <p className="text-center text-sm text-brand-charcoal/60 py-8">
              No budgets found matching your criteria.
            </p>
          ) : (
            <ul className="divide-y divide-border/60">
              {filteredBudgets.map((budget) => {
                const Icon = categoryIcon[budget.category] || Wallet;
                const percentage = (budget.spent / budget.budget) * 100;
                
                return (
                  <li key={budget.id} className="py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-brand-charcoal/80 ring-1 ring-border/60">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-brand-charcoal">{budget.name}</p>
                          <p className="text-xs text-brand-charcoal/55">{budget.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-semibold text-brand-charcoal">
                          ${budget.spent.toFixed(2)} / ${budget.budget.toFixed(2)}
                        </span>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className={cn(
                              "h-2 rounded-full transition-all duration-300",
                              percentage >= 100 ? "bg-red-500" : percentage >= 80 ? "bg-brand-yellow/50" : "bg-emerald-500"
                            )}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {/* Add Budget Dialog */}
      <AddBudgetDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAddBudget={handleAddBudget}
      />
    </div>
  );
}

export default BudgetsPage;
