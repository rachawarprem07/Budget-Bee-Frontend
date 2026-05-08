import { useState, useMemo } from "react";
import { Target, Plus, Download, Upload, TrendingUp, TrendingDown, Coffee, ShoppingBag, Car, Home, Sparkles, Briefcase, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { AddGoalDialog } from "@/components/app/AddGoalDialog";

type Goal = {
  id: string;
  name: string;
  category: string;
  target: number;
  current: number;
  deadline: string;
  status: "active" | "completed" | "paused";
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
  Other: Target,
};

const mockGoals: Goal[] = [
  { id: "1", name: "Emergency Fund", category: "Savings", target: 10000, current: 6500, deadline: "Dec 31", status: "active" },
  { id: "2", name: "Vacation to Japan", category: "Travel", target: 5000, current: 3200, deadline: "Jun 30", status: "active" },
  { id: "3", name: "New Laptop", category: "Technology", target: 2000, current: 1800, deadline: "Mar 15", status: "completed" },
  { id: "4", name: "Home Renovation", category: "Housing", target: 8000, current: 4500, deadline: "Sep 30", status: "active" },
  { id: "5", name: "Fitness Equipment", category: "Health", target: 500, current: 350, deadline: "Feb 28", status: "paused" },
];

const categories = Object.keys(categoryIcon);

function GoalsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAddDialog, setShowAddDialog] = useState(false);

  const filteredGoals = useMemo(() => {
    return mockGoals.filter((goal) => {
      const matchesSearch = goal.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || goal.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const totalTarget = useMemo(() => 
    filteredGoals.reduce((sum, goal) => sum + goal.target, 0), 
    [filteredGoals]
  );

  const totalCurrent = useMemo(() => 
    filteredGoals.reduce((sum, goal) => sum + goal.current, 0), 
    [filteredGoals]
  );

  const totalRemaining = totalTarget - totalCurrent;

  const activeGoals = useMemo(() => 
    filteredGoals.filter(goal => goal.status === "active").length, 
    [filteredGoals]
  );

  const completedGoals = useMemo(() => 
    filteredGoals.filter(goal => goal.status === "completed").length, 
    [filteredGoals]
  );

  const handleAddGoal = (goal: {
    name: string;
    category: string;
    target: number;
    deadline: string;
  }) => {
    const newGoal: Goal = {
      id: Date.now().toString(),
      name: goal.name,
      category: goal.category,
      target: goal.target,
      current: 0,
      deadline: goal.deadline,
      status: "active",
    };

    mockGoals.unshift(newGoal);
    setShowAddDialog(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-brand-charcoal">Goals</h1>
          <p className="text-sm text-brand-charcoal/60">Dream it, save for it, achieve it.</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={() => setShowAddDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Goal
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.1)]">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-yellow/20">
              <Target className="h-4 w-4 text-brand-charcoal" />
            </div>
            <div>
              <p className="text-xs text-brand-charcoal/60">Total Target</p>
              <p className="text-lg font-semibold text-brand-charcoal">${totalTarget.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.1)]">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-brand-charcoal/60">Current Progress</p>
              <p className="text-lg font-semibold text-emerald-600">${totalCurrent.toFixed(2)}</p>
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
            placeholder="Search goals..."
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

      {/* Goals List */}
      <div className="rounded-2xl border border-border/60 bg-card shadow-[0_10px_40px_-20px_rgba(0,0,0,0.1)]">
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-brand-charcoal">Your Goals</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                <span className="text-sm text-brand-charcoal/60">{activeGoals} Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                <span className="text-sm text-brand-charcoal/60">{completedGoals} Completed</span>
              </div>
            </div>
          </div>
          {filteredGoals.length === 0 ? (
            <p className="text-center text-sm text-brand-charcoal/60 py-8">
              No goals found matching your criteria.
            </p>
          ) : (
            <ul className="divide-y divide-border/60">
              {filteredGoals.map((goal) => {
                const Icon = categoryIcon[goal.category] || Target;
                const progress = (goal.current / goal.target) * 100;
                const isActive = goal.status === "active";
                
                return (
                  <li key={goal.id} className="py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-brand-charcoal/80 ring-1 ring-border/60">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-brand-charcoal">{goal.name}</p>
                          <p className="text-xs text-brand-charcoal/55">
                            {goal.category} · {goal.deadline}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="mb-2">
                          <span className={cn(
                            "text-sm font-semibold",
                            isActive ? "text-emerald-600" : "text-blue-600"
                          )}>
                            {goal.status}
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className={cn(
                              "h-2 rounded-full transition-all duration-300",
                              progress >= 100 ? "bg-emerald-500" : "bg-brand-yellow/50"
                            )}
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          />
                        </div>
                        <p className="text-xs text-brand-charcoal/60 mt-1">
                          ${goal.current.toFixed(2)} / ${goal.target.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {/* Add Goal Dialog */}
      <AddGoalDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAddGoal={handleAddGoal}
      />
    </div>
  );
}

export default GoalsPage;
