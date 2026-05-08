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
        <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-5 shadow-[0_10px_40px_-20px_rgba(59,130,246,0.2)]">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 shadow-lg shadow-blue-500/30">
              <Wallet className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium text-blue-700">Total Budgeted</p>
              <p className="text-xl font-bold text-blue-600">₹{totalBudgeted.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100 p-5 shadow-[0_10px_40px_-20px_rgba(245,158,11,0.2)]">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 shadow-lg shadow-amber-500/30">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium text-amber-700">Total Spent</p>
              <p className="text-xl font-bold text-amber-600">₹{totalSpent.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-teal-200 bg-gradient-to-br from-teal-50 to-teal-100 p-5 shadow-[0_10px_40px_-20px_rgba(20,184,166,0.2)]">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500 shadow-lg shadow-teal-500/30">
              <TrendingDown className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium text-teal-700">Remaining</p>
              <p className="text-xl font-bold text-teal-600">₹{totalRemaining.toFixed(2)}</p>
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
      <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-white to-gray-50 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.1)]">
        <div className="p-6">
          <h3 className="text-lg font-bold text-brand-charcoal mb-6">Your Budgets</h3>
          {filteredBudgets.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Wallet className="h-8 w-8 text-brand-charcoal/40" />
              </div>
              <p className="text-sm text-brand-charcoal/60">No budgets found matching your criteria.</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {filteredBudgets.map((budget) => {
                const Icon = categoryIcon[budget.category] || Wallet;
                const percentage = (budget.spent / budget.budget) * 100;
                
                return (
                  <li key={budget.id} className="group flex items-center justify-between p-3 rounded-xl bg-white border border-border/40 hover:border-emerald-300 hover:shadow-md hover:shadow-emerald-5 transition-all duration-200">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200 shadow-sm transition-all group-hover:scale-110">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-brand-charcoal">{budget.name}</p>
                        <p className="text-xs text-brand-charcoal/60 mt-0.5">{budget.category}</p>
                      </div>
                    </div>
                    <div className="text-right flex-1 ml-4">
                      <div className="mb-1">
                        <span className="text-xs font-bold text-brand-charcoal">
                          ₹{budget.spent.toFixed(2)} / ₹{budget.budget.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 justify-end">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={cn(
                              "w-2 h-2 rounded-full transition-all duration-300",
                              i < Math.floor(percentage / 20)
                                ? percentage >= 100
                                  ? "bg-red-400"
                                  : percentage >= 80
                                  ? "bg-amber-400"
                                  : "bg-emerald-400"
                                : "bg-gray-200"
                            )}
                          />
                        ))}
                      </div>
                      <p className="text-xs font-semibold text-brand-charcoal/70 mt-1">
                        {percentage.toFixed(0)}% used
                      </p>
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
