"use client";

import { useEffect, useState } from "react";
import { getExpenseStats } from "@/app/actions/searchActions";

interface ExpenseStats {
  totalExpenses: number;
  totalAmount: number;
  averageAmount: number;
  categoryCounts: { [key: string]: number };
  monthlyTrend: { month: string; amount: number }[];
}

export default function ExpenseAnalytics() {
  const [stats, setStats] = useState<ExpenseStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setIsLoading(true);
    try {
      const result = await getExpenseStats();
      if (result.error) {
        setError(result.error);
      } else {
        setStats(result.stats || null);
      }
    } catch (err) {
      setError("Failed to load analytics");
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      Food: "🍔",
      Transportation: "🚗",
      Shopping: "🛒",
      Entertainment: "🎬",
      Bills: "💡",
      Healthcare: "🏥",
      Other: "📦"
    };
    return icons[category] || "📦";
  };

  if (isLoading) {
    return (
      <section className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-slate-200/60 dark:border-slate-700/60">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-lg mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-3">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
                <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded"></div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-64 bg-slate-200 dark:bg-slate-700 rounded-2xl"></div>
            <div className="h-64 bg-slate-200 dark:bg-slate-700 rounded-2xl"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-slate-200/60 dark:border-slate-700/60">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Failed to Load Analytics
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">{error}</p>
          <button
            onClick={loadStats}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  if (!stats) {
    return (
      <section className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-slate-200/60 dark:border-slate-700/60">
        <div className="text-center">
          <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📊</span>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
            No Data Available
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Start adding expenses to see your analytics
          </p>
        </div>
      </section>
    );
  }

  const topCategories = Object.entries(stats.categoryCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  const maxMonthlyAmount = Math.max(...stats.monthlyTrend.map(m => m.amount));

  return (
    <section 
      className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-slate-200/60 dark:border-slate-700/60"
      aria-labelledby="analytics-heading"
    >
      <header className="mb-8">
        <h2 
          id="analytics-heading"
          className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2"
        >
          Expense Analytics Overview
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Comprehensive analysis of your spending patterns and trends
        </p>
      </header>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-2xl border border-blue-200/60 dark:border-blue-800/60">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg">📝</span>
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">Total Expenses</h3>
          </div>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {stats.totalExpenses.toLocaleString()}
          </p>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 p-6 rounded-2xl border border-emerald-200/60 dark:border-emerald-800/60">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg">💰</span>
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">Total Amount</h3>
          </div>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            ${stats.totalAmount.toFixed(2)}
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-2xl border border-purple-200/60 dark:border-purple-800/60">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg">📊</span>
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">Average</h3>
          </div>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            ${stats.averageAmount.toFixed(2)}
          </p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-6 rounded-2xl border border-orange-200/60 dark:border-orange-800/60">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg">🏷️</span>
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">Categories</h3>
          </div>
          <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {Object.keys(stats.categoryCounts).length}
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Trend */}
        <div className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-700 dark:to-slate-800 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-600/60">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-6">
            Monthly Spending Trend
          </h3>
          <div className="space-y-3">
            {stats.monthlyTrend.map((month, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-16 text-sm font-medium text-slate-600 dark:text-slate-400">
                  {month.month}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: maxMonthlyAmount > 0 ? `${(month.amount / maxMonthlyAmount) * 100}%` : '0%'
                        }}
                      ></div>
                    </div>
                    <div className="w-20 text-sm font-semibold text-slate-900 dark:text-slate-100 text-right">
                      ${month.amount.toFixed(0)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Categories */}
        <div className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-700 dark:to-slate-800 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-600/60">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-6">
            Top Categories by Count
          </h3>
          <div className="space-y-4">
            {topCategories.map(([category, count], index) => (
              <div key={category} className="flex items-center gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">
                      {getCategoryIcon(category)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-slate-100">
                      {category}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {count} {count === 1 ? 'expense' : 'expenses'}
                    </div>
                  </div>
                </div>
                <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                  #{index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}