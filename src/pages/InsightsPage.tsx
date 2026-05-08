import { useState, useMemo } from "react";
import { TrendingUp, TrendingDown, Coffee, ShoppingBag, Car, Home, Sparkles, Briefcase, Search, Target, DollarSign, PiggyBank, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Insight = {
  id: string;
  title: string;
  description: string;
  type: "spending" | "saving" | "budget" | "trend";
  value: number;
  change: number;
  period: string;
};

const mockInsights: Insight[] = [
  { id: "1", title: "Top Spending Category", description: "You spent most on dining out this month", type: "spending", value: 450, change: 12.5, period: "Sep 2024" },
  { id: "2", title: "Savings Opportunity", description: "Reduce subscriptions by 20% to save $50/month", type: "saving", value: 600, change: 0, period: "Monthly" },
  { id: "3", title: "Budget Alert", description: "Groceries budget 85% used", type: "budget", value: 85, change: 0, period: "Sep 2024" },
  { id: "4", title: "Income Trend", description: "Monthly income increased by 8% vs last month", type: "trend", value: 8, change: 8, period: "Sep 2024" },
  { id: "5", title: "Spending Alert", description: "Entertainment spending 25% over budget", type: "spending", value: 250, change: -25, period: "Sep 2024" },
];

const insightIcon: Record<string, any> = {
  spending: TrendingDown,
  saving: PiggyBank,
  budget: Target,
  trend: TrendingUp,
};

function InsightsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  const filteredInsights = useMemo(() => {
    return mockInsights.filter((insight) => {
      const matchesSearch = insight.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === "all" || insight.type === selectedType;
      return matchesSearch && matchesType;
    });
  }, [searchTerm, selectedType]);

  const handleExport = () => {
    const reportData = {
      generatedAt: new Date().toISOString(),
      totalSavings: totalSavings,
      totalAlerts: totalAlerts,
      positiveTrends: positiveTrends,
      insights: filteredInsights.map(insight => ({
        title: insight.title,
        description: insight.description,
        type: insight.type,
        value: insight.value,
        change: insight.change,
        period: insight.period
      }))
    };

    const dataStr = JSON.stringify(reportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'insights-report.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const totalSavings = useMemo(() => 
    filteredInsights.filter(i => i.type === "saving").reduce((sum, i) => sum + i.value, 0), 
    [filteredInsights]
  );

  const totalAlerts = useMemo(() => 
    filteredInsights.filter(i => i.change < 0).length, 
    [filteredInsights]
  );

  const positiveTrends = useMemo(() => 
    filteredInsights.filter(i => i.change > 0).length, 
    [filteredInsights]
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-brand-charcoal">Insights</h1>
          <p className="text-sm text-brand-charcoal/60">Smart, AI-powered nudges to grow your savings.</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button size="sm">
            <Sparkles className="h-4 w-4 mr-2" />
            Generate Insights
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.1)]">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
              <PiggyBank className="h-4 w-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-brand-charcoal/60">Total Savings</p>
              <p className="text-lg font-semibold text-emerald-600">${totalSavings.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.1)]">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
              <TrendingDown className="h-4 w-4 text-red-600" />
            </div>
            <div>
              <p className="text-xs text-brand-charcoal/60">Active Alerts</p>
              <p className="text-lg font-semibold text-red-600">{totalAlerts}</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.1)]">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-yellow/20">
              <TrendingUp className="h-4 w-4 text-brand-charcoal" />
            </div>
            <div>
              <p className="text-xs text-brand-charcoal/60">Positive Trends</p>
              <p className="text-lg font-semibold text-brand-charcoal">{positiveTrends}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-charcoal/40" />
          <Input
            placeholder="Search insights..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="rounded-md border border-input bg-background px-3 py-2 text-sm md:w-auto w-full"
        >
          <option value="all">All Types</option>
          <option value="spending">Spending</option>
          <option value="saving">Savings</option>
          <option value="budget">Budget</option>
          <option value="trend">Trends</option>
        </select>
      </div>

      {/* Insights List */}
      <div className="rounded-2xl border border-border/60 bg-card shadow-[0_10px_40px_-20px_rgba(0,0,0,0.1)]">
        <div className="p-5">
          <h3 className="text-base font-semibold text-brand-charcoal mb-4">Your Insights</h3>
          {filteredInsights.length === 0 ? (
            <p className="text-center text-sm text-brand-charcoal/60 py-8">
              No insights found matching your criteria.
            </p>
          ) : (
            <ul className="divide-y divide-border/60">
              {filteredInsights.map((insight) => {
                const Icon = insightIcon[insight.type] || Sparkles;
                const isPositive = insight.change > 0;
                
                return (
                  <li key={insight.id} className="py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-brand-charcoal/80 ring-1 ring-border/60">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-brand-charcoal">{insight.title}</p>
                          <p className="text-xs text-brand-charcoal/55">
                            {insight.description} · {insight.period}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="mb-2">
                          <span className={cn(
                            "text-sm font-semibold",
                            isPositive ? "text-emerald-600" : "text-red-600"
                          )}>
                            {isPositive ? "+" : ""}{Math.abs(insight.change).toFixed(1)}%
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className={cn(
                              "h-2 rounded-full transition-all duration-300",
                              isPositive ? "bg-emerald-500" : "bg-red-500"
                            )}
                            style={{ width: `${Math.min(Math.abs(insight.change), 100)}%` }}
                          />
                        </div>
                        <p className="text-xs text-brand-charcoal/60 mt-1">
                          ${Math.abs(insight.value).toFixed(2)}
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
    </div>
  );
}

export default InsightsPage;
