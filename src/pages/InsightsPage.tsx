import { useState } from "react";
import { Brain, TrendingUp, TrendingDown, AlertTriangle, Lightbulb, Target, Zap, Shield, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function InsightsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const insights = [
    {
      id: "1",
      title: "Spending Pattern Analysis",
      description: "AI detected unusual spending patterns in entertainment category",
      type: "alert",
      icon: AlertTriangle,
      color: "red",
      value: "+32%",
      trend: "up"
    },
    {
      id: "2", 
      title: "Smart Savings Opportunity",
      description: "AI recommends reallocating subscription budget to savings",
      type: "opportunity",
      icon: Lightbulb,
      color: "yellow",
      value: "₹12,000/mo",
      trend: "neutral"
    },
    {
      id: "3",
      title: "Budget Prediction",
      description: "Machine learning predicts grocery budget will exceed by 15%",
      type: "prediction",
      icon: Brain,
      color: "blue",
      value: "85% used",
      trend: "up"
    },
    {
      id: "4",
      title: "Investment Recommendation",
      description: "Based on cash flow analysis, consider investing ₹16,000/month",
      type: "recommendation",
      icon: Target,
      color: "green",
      value: "+12% ROI",
      trend: "up"
    },
    {
      id: "5",
      title: "Financial Health Score",
      description: "Your overall financial health improved by 8 points",
      type: "achievement",
      icon: Shield,
      color: "purple",
      value: "78/100",
      trend: "up"
    },
    {
      id: "6",
      title: "Expense Optimization",
      description: "AI found 3 recurring expenses that can be reduced",
      type: "optimization",
      icon: Zap,
      color: "orange",
      value: "₹6,000/mo",
      trend: "down"
    }
  ];

  const categories = [
    { value: "all", label: "All Insights", count: insights.length },
    { value: "alert", label: "Alerts", count: insights.filter(i => i.type === "alert").length },
    { value: "opportunity", label: "Opportunities", count: insights.filter(i => i.type === "opportunity").length },
    { value: "prediction", label: "Predictions", count: insights.filter(i => i.type === "prediction").length },
    { value: "recommendation", label: "Recommendations", count: insights.filter(i => i.type === "recommendation").length }
  ];

  const filteredInsights = selectedCategory === "all" 
    ? insights 
    : insights.filter(insight => insight.type === selectedCategory);

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-brand-charcoal sm:text-3xl">
            AI Insights
          </h1>
          <p className="mt-1 text-sm text-brand-charcoal/60">
            Advanced AI-powered analysis to optimize your financial decisions
          </p>
        </div>
        <Button className="bg-brand-charcoal text-white hover:bg-brand-charcoal/90">
          <Brain className="h-4 w-4 mr-2" />
          Generate AI Insights
        </Button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => setSelectedCategory(category.value)}
            className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
              selectedCategory === category.value
                ? "bg-brand-charcoal text-white"
                : "bg-white border border-border/60 text-brand-charcoal/70 hover:border-brand-yellow hover:text-brand-charcoal"
            }`}
          >
            <span>{category.label}</span>
            <span className="ml-2 px-2 py-0.5 rounded-full bg-gray-200 text-xs font-semibold text-gray-700">
              {category.count}
            </span>
          </button>
        ))}
      </div>

      {/* AI Insights Grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filteredInsights.map((insight) => {
          const Icon = insight.icon;
          return (
            <Card key={insight.id} className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-[0_10px_40px_-20px_rgba(0,0,0,0.1)] hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                    insight.color === 'red' ? 'bg-red-100 text-red-600' :
                    insight.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
                    insight.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                    insight.color === 'green' ? 'bg-green-100 text-green-600' :
                    insight.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                    'bg-orange-100 text-orange-600'
                  } transition-all group-hover:scale-110`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    insight.trend === 'up' ? 'bg-emerald-100 text-emerald-700' :
                    insight.trend === 'down' ? 'bg-red-100 text-red-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {insight.trend === 'up' && <TrendingUp className="h-3 w-3 inline mr-1" />}
                    {insight.trend === 'down' && <TrendingDown className="h-3 w-3 inline mr-1" />}
                    {insight.value}
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-brand-charcoal mb-2 line-clamp-2">{insight.title}</h3>
                <p className="text-sm text-brand-charcoal/60 mb-4 line-clamp-3">{insight.description}</p>
                
                <Button variant="ghost" className="w-full justify-between p-0 h-auto text-brand-charcoal hover:bg-brand-yellow/10 group">
                  <span className="text-sm font-medium">View Details</span>
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default InsightsPage;
