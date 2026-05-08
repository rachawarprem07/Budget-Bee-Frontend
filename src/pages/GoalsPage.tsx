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
        <div className="rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-indigo-100 p-5 shadow-[0_10px_40px_-20px_rgba(99,102,241,0.2)]">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500 shadow-lg shadow-indigo-500/30">
              <Target className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium text-indigo-700">Active Goals</p>
              <p className="text-xl font-bold text-indigo-600">{activeGoals}</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-rose-200 bg-gradient-to-br from-rose-50 to-rose-100 p-5 shadow-[0_10px_40px_-20px_rgba(244,63,94,0.2)]">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500 shadow-lg shadow-rose-500/30">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium text-rose-700">Completed</p>
              <p className="text-xl font-bold text-rose-600">{completedGoals}</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-cyan-200 bg-gradient-to-br from-cyan-50 to-cyan-100 p-5 shadow-[0_10px_40px_-20px_rgba(6,182,212,0.2)]">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500 shadow-lg shadow-cyan-500/30">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium text-cyan-700">Total Target</p>
              <p className="text-xl font-bold text-cyan-600">${totalTarget.toFixed(2)}</p>
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
      <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-white to-gray-50 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.1)]">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-brand-charcoal">Your Goals</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 ring-1 ring-emerald-200">
                <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                <span className="text-sm font-semibold text-emerald-700">{activeGoals} Active</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 ring-1 ring-blue-200">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <span className="text-sm font-semibold text-blue-700">{completedGoals} Completed</span>
              </div>
            </div>
          </div>
          {filteredGoals.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Target className="h-8 w-8 text-brand-charcoal/40" />
              </div>
              <p className="text-sm text-brand-charcoal/60">No goals found matching your criteria.</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {filteredGoals.map((goal) => {
                const Icon = categoryIcon[goal.category] || Target;
                const progress = (goal.current / goal.target) * 100;
                const isActive = goal.status === "active";
                
                return (
                  <li key={goal.id} className="group flex items-center justify-between p-3 rounded-xl bg-white border border-border/40 hover:border-rose-300 hover:shadow-md hover:shadow-rose-5 transition-all duration-200">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-50 text-rose-600 ring-1 ring-rose-200 shadow-sm transition-all group-hover:scale-110">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-brand-charcoal">{goal.name}</p>
                        <p className="text-xs text-brand-charcoal/60 mt-0.5">
                          {goal.category} · {goal.deadline}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex-1 ml-4">
                      <div className="mb-1">
                        <span className={cn(
                          "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold",
                          isActive ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"
                        )}>
                          {isActive ? <Target className="h-3 w-3" /> : <Sparkles className="h-3 w-3" />}
                          {goal.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 justify-end">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={cn(
                              "w-2 h-2 rounded-full transition-all duration-300",
                              i < Math.floor(progress / 20)
                                ? progress >= 100
                                  ? "bg-emerald-400"
                                  : progress >= 75
                                  ? "bg-rose-400"
                                  : "bg-rose-300"
                                : "bg-gray-200"
                            )}
                          />
                        ))}
                      </div>
                      <p className="text-xs font-semibold text-brand-charcoal/70 mt-1">
                        ${goal.current.toFixed(2)} / ${goal.target.toFixed(2)}
                      </p>
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
