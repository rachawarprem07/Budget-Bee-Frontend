import { useState, useMemo } from "react";
import { Brain, TrendingUp, TrendingDown, AlertTriangle, Lightbulb, Target, DollarSign, Zap, Shield, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function InsightsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const aiInsights = [
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
      value: "$150/mo",
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
      description: "Based on cash flow analysis, consider investing $200/month",
      type: "recommendation",
      icon: TrendingUp,
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
      value: "$75/mo",
      trend: "down"
    }
  ];

  const filteredInsights = useMemo(() => {
    if (selectedCategory === "all") return aiInsights;
    return aiInsights.filter(insight => insight.type === selectedCategory);
  }, [selectedCategory]);

  const categories = [
    { value: "all", label: "All Insights", count: aiInsights.length },
    { value: "alert", label: "Alerts", count: aiInsights.filter(i => i.type === "alert").length },
    { value: "opportunity", label: "Opportunities", count: aiInsights.filter(i => i.type === "opportunity").length },
    { value: "prediction", label: "Predictions", count: aiInsights.filter(i => i.type === "prediction").length },
    { value: "recommendation", label: "Recommendations", count: aiInsights.filter(i => i.type === "recommendation").length }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-brand-yellow rounded-lg flex items-center justify-center">
              <Brain className="h-6 w-6 text-brand-charcoal" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-brand-charcoal">AI Insights</h1>
              <p className="text-sm text-gray-500">Advanced AI-powered analysis to optimize your financial decisions</p>
            </div>
          </div>
          <Button className="bg-brand-charcoal text-white hover:bg-brand-charcoal/90">
            <Brain className="h-4 w-4 mr-2" />
            Generate AI Insights
          </Button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex gap-2">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === category.value
                  ? "bg-brand-charcoal text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.label}
              <span className="ml-2 px-2 py-0.5 rounded-full bg-gray-200 text-xs font-semibold text-gray-700">
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* AI Insights Grid */}
      <div className="p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredInsights.map((insight) => {
            const Icon = insight.icon;
            return (
              <Card key={insight.id} className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                      insight.color === 'red' ? 'bg-red-100 text-red-600' :
                      insight.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
                      insight.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                      insight.color === 'green' ? 'bg-green-100 text-green-600' :
                      insight.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                      'bg-orange-100 text-orange-600'
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      insight.trend === 'up' ? 'bg-green-100 text-green-700' :
                      insight.trend === 'down' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {insight.trend === 'up' && <TrendingUp className="h-3 w-3 inline mr-1" />}
                      {insight.trend === 'down' && <TrendingDown className="h-3 w-3 inline mr-1" />}
                      {insight.value}
                    </div>
                  </div>
                  
                  <h3 className="text-base font-semibold text-brand-charcoal mb-2">{insight.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
                  
                  <Button variant="ghost" className="w-full justify-between p-0 h-auto text-brand-charcoal hover:bg-gray-50">
                    <span className="text-sm font-medium">View Details</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default InsightsPage;
