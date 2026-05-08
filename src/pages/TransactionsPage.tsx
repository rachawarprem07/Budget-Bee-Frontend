import { useState, useMemo } from "react";
import { Wallet, Plus, Download, Upload, TrendingUp, TrendingDown, Coffee, ShoppingBag, Car, Home, Sparkles, Briefcase, Search, MoreVertical, Archive, Edit, Trash2, Calendar, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { AddTransactionDialog } from "@/components/app/AddTransactionDialog";

type Transaction = {
  id: string;
  name: string;
  category: string;
  amount: number;
  date: string;
  archived?: boolean;
};

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

const mockTransactions: Transaction[] = [
  { id: "1", name: "Salary — Acme Inc", category: "Income", amount: 352800, date: "Today" },
  { id: "2", name: "Freelance Project", category: "Income", amount: 71400, date: "Today" },
  { id: "3", name: "Blue Bottle Coffee", category: "Food & Drink", amount: -546, date: "Today" },
  { id: "4", name: "Whole Foods", category: "Groceries", amount: -6933, date: "Yesterday" },
  { id: "5", name: "Uber", category: "Transport", amount: -1197, date: "Yesterday" },
  { id: "6", name: "Rent — September", category: "Housing", amount: -100800, date: "Sep 1" },
  { id: "7", name: "Electricity Bill", category: "Housing", amount: -12222, date: "Sep 1" },
  { id: "8", name: "Spotify", category: "Subscriptions", amount: -839, date: "Aug 30" },
  { id: "9", name: "Netflix", category: "Subscriptions", amount: -1347, date: "Aug 30" },
  { id: "10", name: "Amazon", category: "Shopping", amount: -3846, date: "Aug 29" },
  { id: "11", name: "Target", category: "Shopping", amount: -5719, date: "Aug 28" },
  { id: "12", name: "Gas Station", category: "Transport", amount: -3575, date: "Aug 27" },
  { id: "13", name: "Starbucks", category: "Food & Drink", amount: -736, date: "Aug 27" },
  { id: "14", name: "Gym Membership", category: "Subscriptions", amount: -2519, date: "Aug 26" },
  { id: "15", name: "Restaurant Dinner", category: "Food & Drink", amount: -7168, date: "Aug 25" },
  { id: "16", name: "Internet Bill", category: "Housing", amount: -6739, date: "Aug 24" },
  { id: "17", name: "Clothing Store", category: "Shopping", amount: -10395, date: "Aug 23" },
  { id: "18", name: "Grocery Shopping", category: "Groceries", amount: -4780, date: "Aug 22" },
  { id: "19", name: "Uber Eats", category: "Food & Drink", amount: -1973, date: "Aug 21" },
  { id: "20", name: "Parking Fee", category: "Transport", amount: -1008, date: "Aug 20" },
  { id: "21", name: "Coffee Shop", category: "Food & Drink", amount: -462, date: "Aug 19" },
  { id: "22", name: "Phone Bill", category: "Housing", amount: -5460, date: "Aug 18" },
  { id: "23", name: "Apple Store", category: "Shopping", amount: -25200, date: "Aug 17" },
  { id: "24", name: "Lyft", category: "Transport", amount: -1578, date: "Aug 16" },
  { id: "25", name: "Grocery Market", category: "Groceries", amount: -6652, date: "Aug 15" },
  { id: "26", name: "Movie Tickets", category: "Entertainment", amount: -2688, date: "Aug 14" },
  { id: "27", name: "Concert Tickets", category: "Entertainment", amount: -10500, date: "Aug 13" },
  { id: "28", name: "Book Store", category: "Shopping", amount: -3780, date: "Aug 12" },
  { id: "29", name: "Pharmacy", category: "Groceries", amount: -2394, date: "Aug 11" },
  { id: "30", name: "Hotel Booking", category: "Travel", amount: -21000, date: "Aug 10" },
];

const categories = Object.keys(categoryIcon);

function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string[] | "all">("all" as any);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [showArchived, setShowArchived] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [passcode, setPasscode] = useState("");
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dateRange, setDateRange] = useState({
    start: "",
    end: ""
  });

  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter((transaction) => {
      const matchesSearch = transaction.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || 
        (Array.isArray(selectedCategory) ? (selectedCategory as string[]).includes(transaction.category) : transaction.category === selectedCategory);
      const matchesArchived = showArchived ? transaction.archived === true : !transaction.archived;
      const matchesPasscode = showArchived ? isAuthenticated && (!passcode || transaction.id.toString().slice(-4) === passcode) : true;
      
      // Date range filtering
      let matchesDateRange = true;
      if (dateRange.start && dateRange.end) {
        const transactionDate = new Date(transaction.date);
        const startDate = new Date(dateRange.start);
        const endDate = new Date(dateRange.end);
        matchesDateRange = transactionDate >= startDate && transactionDate <= endDate;
      }
      
      return matchesSearch && matchesCategory && matchesArchived && matchesPasscode && matchesDateRange;
    });
  }, [searchTerm, selectedCategory, showArchived, passcode, isAuthenticated, dateRange]);

  const handlePinSubmit = () => {
    if (pin === "1234") {
      setIsAuthenticated(true);
      setShowPinModal(false);
    }
  };

  const totalIncome = useMemo(() => 
    filteredTransactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0), 
    [filteredTransactions]
  );

  const totalExpenses = useMemo(() => 
    filteredTransactions.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0), 
    [filteredTransactions]
  );

  const netBalance = totalIncome - totalExpenses;

  const handleAddTransaction = (transaction: {
    description: string;
    amount: number;
    type: "income" | "expense";
    category: string;
    note: string;
    date: string;
  }) => {
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      name: transaction.description,
      category: transaction.category,
      amount: transaction.amount,
      date: transaction.date,
    };
    mockTransactions.unshift(newTransaction);
    setShowAddDialog(false);
  };

  const handleArchiveTransaction = (id: string) => {
    const index = mockTransactions.findIndex(t => t.id === id);
    if (index !== -1) {
      mockTransactions[index] = { ...mockTransactions[index], archived: true };
    }
    setActiveMenu(null);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setActiveMenu(null);
  };

  const handleDeleteTransaction = (id: string) => {
    const index = mockTransactions.findIndex(t => t.id === id);
    if (index !== -1) {
      mockTransactions.splice(index, 1);
    }
    setActiveMenu(null);
  };

  const handleUpdateTransaction = (transaction: {
    description: string;
    amount: number;
    type: "income" | "expense";
    category: string;
    note: string;
    date: string;
  }) => {
    if (editingTransaction) {
      const index = mockTransactions.findIndex(t => t.id === editingTransaction.id);
      if (index !== -1) {
        mockTransactions[index] = {
          ...mockTransactions[index],
          name: transaction.description,
          category: transaction.category,
          amount: transaction.amount,
          date: transaction.date,
        };
      }
    }
    setEditingTransaction(null);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(filteredTransactions, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'transactions.json';
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
          mockTransactions.unshift(...imported);
        } catch (error) {
          console.error('Import failed:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-brand-charcoal">Transactions</h1>
          <p className="text-sm text-brand-charcoal/60">Every penny in and out, beautifully organized.</p>
        </div>
        <div className="flex flex-wrap gap-2">
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
          <Button size="sm" variant={showArchived ? "default" : "outline"} onClick={() => {
            if (!showArchived) {
              setShowPinModal(true);
            } else {
              setShowArchived(false);
              setIsAuthenticated(false);
              setPasscode("");
            }
          }}>
            <Archive className="h-4 w-4 mr-2" />
            {showArchived ? "Normal" : "Archived"}
          </Button>
          <Button size="sm" onClick={() => setShowAddDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Transaction
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-5 shadow-[0_10px_40px_-20px_rgba(16,185,129,0.2)]">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 shadow-lg shadow-emerald-500/30">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium text-emerald-700">Total Income</p>
              <p className="text-xl font-bold text-emerald-600">+₹{totalIncome.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-red-200 bg-gradient-to-br from-red-50 to-red-100 p-5 shadow-[0_10px_40px_-20px_rgba(239,68,68,0.2)]">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500 shadow-lg shadow-red-500/30">
              <TrendingDown className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium text-red-700">Total Expenses</p>
              <p className="text-xl font-bold text-red-600">-₹{totalExpenses.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-violet-100 p-5 shadow-[0_10px_40px_-20px_rgba(139,92,246,0.2)]">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500 shadow-lg shadow-violet-500/30">
              <Wallet className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium text-violet-700">Net Balance</p>
              <p className={cn(
                "text-xl font-bold",
                netBalance >= 0 ? "text-emerald-600" : "text-red-600"
              )}>
                {netBalance >= 0 ? "+" : "-"}₹{Math.abs(netBalance).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-charcoal/40" />
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {/* Date Range Inputs */}
          <div className="flex gap-2 items-center">
            <Calendar className="h-4 w-4 text-brand-charcoal/40" />
            <Input
              type="date"
              placeholder="Start date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="w-auto"
            />
            <span className="text-sm text-brand-charcoal/60">to</span>
            <Input
              type="date"
              placeholder="End date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="w-auto"
            />
          </div>
          {/* Multi-Select Categories */}
          <div className="relative">
            <button
              onClick={() => {
                const dropdown = document.getElementById('category-dropdown');
                if (dropdown) {
                  if (dropdown.style.display === 'block') {
                    dropdown.style.display = 'none';
                  } else {
                    dropdown.style.display = 'block';
                  }
                }
              }}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm w-auto flex items-center gap-2"
            >
              <span>
                {Array.isArray(selectedCategory) 
                  ? `${selectedCategory.length} categories selected` 
                  : selectedCategory === "all" 
                    ? "All Categories" 
                    : selectedCategory
                }
              </span>
              <ChevronDown className="h-4 w-4" />
            </button>
            <div
              id="category-dropdown"
              className="absolute top-full mt-1 w-48 rounded-md border border-border/60 bg-background shadow-lg z-10 hidden"
            >
              <div>
                {categories.map((category: string) => (
                  <label key={category} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCategory === "all" || (Array.isArray(selectedCategory) && selectedCategory.includes(category))}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.target.checked) {
                          setSelectedCategory("all");
                        } else if (Array.isArray(selectedCategory)) {
                          setSelectedCategory(selectedCategory.filter((cat: string) => cat !== "all"));
                        } else if (typeof selectedCategory === 'string') {
                          setSelectedCategory(selectedCategory !== category ? [category] : []);
                        } else {
                          setSelectedCategory([]);
                        }
                      }}
                      className="rounded"
                    />
                    <span>{category}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
        {showArchived && (
          <Input
            placeholder="Enter 4-digit passcode"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            className="w-full md:w-48"
            maxLength={4}
          />
        )}
      </div>

      {/* Transactions List */}
      <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-white to-gray-50 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.1)]">
        <div className="p-6">
          <h3 className="text-lg font-bold text-brand-charcoal mb-6">Recent Transactions</h3>
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Wallet className="h-8 w-8 text-brand-charcoal/40" />
              </div>
              <p className="text-sm text-brand-charcoal/60">No transactions found matching your criteria.</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {filteredTransactions.map((transaction) => {
                const Icon = categoryIcon[transaction.category] || Wallet;
                const isIncome = transaction.amount > 0;
                const categoryColors: Record<string, { bg: string; icon: string; ring: string }> = {
                  Income: { bg: "bg-emerald-50", icon: "bg-emerald-500", ring: "ring-emerald-200" },
                  "Food & Drink": { bg: "bg-amber-50", icon: "bg-amber-500", ring: "ring-amber-200" },
                  Groceries: { bg: "bg-blue-50", icon: "bg-blue-500", ring: "ring-blue-200" },
                  Transport: { bg: "bg-purple-50", icon: "bg-purple-500", ring: "ring-purple-200" },
                  Housing: { bg: "bg-rose-50", icon: "bg-rose-500", ring: "ring-rose-200" },
                  Subscriptions: { bg: "bg-violet-50", icon: "bg-violet-500", ring: "ring-violet-200" },
                  Shopping: { bg: "bg-pink-50", icon: "bg-pink-500", ring: "ring-pink-200" },
                  Entertainment: { bg: "bg-cyan-50", icon: "bg-cyan-500", ring: "ring-cyan-200" },
                  Other: { bg: "bg-slate-50", icon: "bg-slate-500", ring: "ring-slate-200" },
                };
                const colors = categoryColors[transaction.category] || categoryColors.Other;
                
                return (
                  <li key={transaction.id} className="group flex items-center justify-between p-3 rounded-xl bg-white border border-border/40 hover:border-emerald-300 hover:shadow-md hover:shadow-emerald-5 transition-all duration-200">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-xl ring-1 shadow-sm transition-all group-hover:scale-110 flex-shrink-0",
                        colors.bg,
                        colors.icon,
                        "text-white",
                        colors.ring
                      )}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-brand-charcoal truncate">{transaction.name}</p>
                        <p className="text-xs text-brand-charcoal/60 mt-0.5 truncate">
                          {transaction.category} · {transaction.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span
                        className={cn(
                          "text-xs font-bold tabular-nums px-2 py-1 rounded-lg",
                          isIncome ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                        )}
                      >
                        {isIncome ? "+" : "-"}₹{Math.abs(transaction.amount).toFixed(2)}
                      </span>
                      <div className="relative">
                        <button
                          onClick={() => setActiveMenu(activeMenu === transaction.id ? null : transaction.id)}
                          className="p-1.5 rounded-full hover:bg-brand-yellow/10 transition"
                        >
                          <MoreVertical className="h-4 w-4 text-brand-charcoal/60" />
                        </button>
                        {activeMenu === transaction.id && (
                          <div className="absolute right-0 top-full mt-1 w-40 rounded-lg border border-border/60 bg-background shadow-lg z-10">
                              <button
                                onClick={() => handleArchiveTransaction(transaction.id)}
                                className="flex w-full items-center gap-3 px-3 py-2 text-sm text-brand-charcoal transition hover:bg-brand-yellow/10"
                              >
                                <Archive className="h-4 w-4" />
                                Archive
                              </button>
                              <button
                                onClick={() => handleEditTransaction(transaction)}
                                className="flex w-full items-center gap-3 px-3 py-2 text-sm text-brand-charcoal transition hover:bg-brand-yellow/10"
                              >
                                <Edit className="h-4 w-4" />
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteTransaction(transaction.id)}
                                className="flex w-full items-center gap-3 px-3 py-2 text-sm text-red-600 transition hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {/* Add Transaction Dialog */}
      <AddTransactionDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAddTransaction={handleAddTransaction} 
      />
      
      {/* Edit Transaction Dialog */}
      {editingTransaction && (
        <AddTransactionDialog
          open={!!editingTransaction}
          onOpenChange={(open) => !open && setEditingTransaction(null)}
          onAddTransaction={handleUpdateTransaction}
        />
      )}

      {/* PIN Modal */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl border border-border/60 bg-card shadow-[0_10px_40px_-20px_rgba(0,0,0,0.1)] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-brand-charcoal">Enter PIN</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPinModal(false)}
              >
                ×
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="pin" className="text-sm font-medium text-brand-charcoal">
                  Enter 4-digit PIN to access archived transactions
                </label>
                <Input
                  id="pin"
                  type="password"
                  maxLength={4}
                  placeholder="••••"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="mt-1 w-full"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowPinModal(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handlePinSubmit} className="flex-1">
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionsPage;
