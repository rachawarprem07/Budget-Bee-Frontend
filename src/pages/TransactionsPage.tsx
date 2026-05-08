import { useState, useMemo } from "react";
import { Wallet, Plus, Download, Upload, TrendingUp, TrendingDown, Coffee, ShoppingBag, Car, Home, Sparkles, Briefcase, Search, MoreVertical, Archive, Edit, Trash2 } from "lucide-react";
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
  { id: "1", name: "Salary — Acme Inc", category: "Income", amount: 4200, date: "Today" },
  { id: "2", name: "Blue Bottle Coffee", category: "Food & Drink", amount: -6.5, date: "Today" },
  { id: "3", name: "Whole Foods", category: "Groceries", amount: -82.3, date: "Yesterday" },
  { id: "4", name: "Uber", category: "Transport", amount: -14.2, date: "Yesterday" },
  { id: "5", name: "Rent — September", category: "Housing", amount: -1200, date: "Sep 1" },
  { id: "6", name: "Spotify", category: "Subscriptions", amount: -9.99, date: "Aug 30" },
  { id: "7", name: "Netflix", category: "Subscriptions", amount: -15.99, date: "Aug 30" },
  { id: "8", name: "Amazon", category: "Shopping", amount: -45.67, date: "Aug 29" },
];

const categories = Object.keys(categoryIcon);

function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [showArchived, setShowArchived] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [passcode, setPasscode] = useState("");
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter((transaction) => {
      const matchesSearch = transaction.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || transaction.category === selectedCategory;
      const matchesArchived = showArchived ? transaction.archived === true : !transaction.archived;
      const matchesPasscode = isAuthenticated && (!passcode || transaction.id.toString().slice(-4) === passcode);
      return matchesSearch && matchesCategory && matchesArchived && matchesPasscode;
    });
  }, [searchTerm, selectedCategory, showArchived, passcode, isAuthenticated]);

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
        <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.1)]">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-brand-charcoal/60">Total Income</p>
              <p className="text-lg font-semibold text-emerald-600">+${totalIncome.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.1)]">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
              <TrendingDown className="h-4 w-4 text-red-600" />
            </div>
            <div>
              <p className="text-xs text-brand-charcoal/60">Total Expenses</p>
              <p className="text-lg font-semibold text-red-600">-${totalExpenses.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.1)]">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-yellow/20">
              <Wallet className="h-4 w-4 text-brand-charcoal" />
            </div>
            <div>
              <p className="text-xs text-brand-charcoal/60">Net Balance</p>
              <p className={cn(
                "text-lg font-semibold",
                netBalance >= 0 ? "text-emerald-600" : "text-red-600"
              )}>
                {netBalance >= 0 ? "+" : "-"}${Math.abs(netBalance).toFixed(2)}
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
        {showArchived && (
          <Input
            placeholder="Enter 4-digit passcode"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            className="w-full md:w-48"
            maxLength={4}
          />
        )}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="rounded-md border border-input bg-background px-3 py-2 text-sm w-full md:w-auto"
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Transactions List */}
      <div className="rounded-2xl border border-border/60 bg-card shadow-[0_10px_40px_-20px_rgba(0,0,0,0.1)]">
        <div className="p-5">
          <h3 className="text-base font-semibold text-brand-charcoal mb-4">Recent Transactions</h3>
          {filteredTransactions.length === 0 ? (
            <p className="text-center text-sm text-brand-charcoal/60 py-8">
              No transactions found matching your criteria.
            </p>
          ) : (
            <ul className="divide-y divide-border/60">
              {filteredTransactions.map((transaction) => {
                const Icon = categoryIcon[transaction.category] || Wallet;
                const isIncome = transaction.amount > 0;
                
                return (
                  <li key={transaction.id} className="py-4">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-brand-charcoal/80 ring-1 ring-border/60 flex-shrink-0">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-brand-charcoal truncate">{transaction.name}</p>
                          <p className="text-xs text-brand-charcoal/55 truncate">
                            {transaction.category} · {transaction.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span
                          className={cn(
                            "text-sm font-semibold tabular-nums",
                            isIncome ? "text-emerald-600" : "text-brand-charcoal"
                          )}
                        >
                          {isIncome ? "+" : "-"}${Math.abs(transaction.amount).toFixed(2)}
                        </span>
                        <div className="relative">
                          <button
                            onClick={() => setActiveMenu(activeMenu === transaction.id ? null : transaction.id)}
                            className="p-1 rounded-full hover:bg-brand-yellow/10 transition"
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
