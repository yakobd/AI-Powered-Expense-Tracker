"use client";

import { useEffect, useState } from "react";
import { getBudgets, deleteBudget, type Budget } from "@/app/actions/budgetActions";

export default function BudgetList() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    loadBudgets();
  }, []);

  const loadBudgets = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await getBudgets();
      if (result.error) {
        setError(result.error);
      } else {
        setBudgets(result.budgets || []);
      }
    } catch (err) {
      setError("Failed to load budgets");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (budgetId: string) => {
    if (!confirm("Are you sure you want to delete this budget?")) {
      return;
    }

    setDeletingId(budgetId);
    try {
      const result = await deleteBudget(budgetId);
      if (result.error) {
        alert(result.error);
      } else {
        setBudgets(budgets.filter(budget => budget.id !== budgetId));
      }
    } catch (err) {
      alert("Failed to delete budget");
    } finally {
      setDeletingId(null);
    }
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: React.ReactElement } = {
      Food: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
      Transportation: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      Shopping: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      Entertainment: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V3a1 1 0 011 1v14a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1V2" />
        </svg>
      ),
      Bills: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      Healthcare: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      Other: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    };
    return icons[category] || icons.Other;
  };

  const getStatusColor = (percentage: number) => {
    if (percentage >= 100) return "text-error-600 dark:text-error-400";
    if (percentage >= 80) return "text-warning-600 dark:text-warning-400";
    return "text-success-600 dark:text-success-400";
  };

  const getProgressBarColor = (percentage: number) => {
    if (percentage >= 100) return "bg-gradient-to-r from-error-500 to-error-600";
    if (percentage >= 80) return "bg-gradient-to-r from-warning-500 to-warning-600";
    return "bg-gradient-to-r from-success-500 to-primary-500";
  };

  if (isLoading) {
    return (
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600 rounded-3xl blur opacity-20"></div>
        <section className="relative bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl rounded-3xl border border-neutral-200/50 dark:border-neutral-800/50 shadow-2xl p-8">
          <div className="animate-pulse space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-neutral-200 dark:bg-neutral-700 rounded-2xl"></div>
              <div className="space-y-2">
                <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded w-32"></div>
                <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-24"></div>
              </div>
            </div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 bg-neutral-100 dark:bg-neutral-800 rounded-2xl">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <div className="h-6 bg-neutral-200 dark:bg-neutral-600 rounded w-1/3"></div>
                    <div className="h-6 bg-neutral-200 dark:bg-neutral-600 rounded w-1/4"></div>
                  </div>
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-600 rounded"></div>
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-600 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-error-600 via-warning-500 to-error-600 rounded-3xl blur opacity-20"></div>
        <section className="relative bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl rounded-3xl border border-neutral-200/50 dark:border-neutral-800/50 shadow-2xl p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-error-100 dark:bg-error-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-error-600 dark:text-error-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
              Failed to Load Budgets
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">{error}</p>
            <button
              onClick={loadBudgets}
              className="px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white rounded-xl font-medium shadow-lg hover:shadow-glow transition-all duration-300 transform hover:-translate-y-1"
            >
              Try Again
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Background Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
      
      <section 
        className="relative bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl rounded-3xl border border-neutral-200/50 dark:border-neutral-800/50 shadow-2xl overflow-hidden"
        aria-labelledby="budget-list-heading"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500/10 via-accent-500/10 to-primary-500/10 dark:from-primary-500/5 dark:via-accent-500/5 dark:to-primary-500/5 p-6 border-b border-neutral-200/50 dark:border-neutral-800/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 via-primary-600 to-accent-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {budgets.length}
                </div>
              </div>
              <div>
                <h2 
                  id="budget-list-heading"
                  className="text-2xl font-display font-bold text-neutral-900 dark:text-white"
                >
                  Your Budgets
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                  {budgets.length} {budgets.length === 1 ? 'budget' : 'budgets'} active
                </p>
              </div>
            </div>
            <button
              onClick={loadBudgets}
              className="p-3 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 bg-neutral-100 dark:bg-neutral-800 hover:bg-primary-50 dark:hover:bg-primary-950/50 rounded-xl transition-all duration-300 hover:scale-110"
              title="Refresh budgets"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          {budgets.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                No Budgets Yet
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Create your first budget to start tracking your spending limits
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {budgets.map((budget, index) => (
                <div
                  key={budget.id}
                  className="group relative overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Background Glow */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                  
                  <div className="relative p-6 bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-800 dark:to-neutral-900 backdrop-blur-xl rounded-2xl border border-neutral-200/50 dark:border-neutral-700/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    {/* Budget Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg text-white group-hover:scale-110 transition-transform duration-300">
                          {getCategoryIcon(budget.category)}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                            {budget.category}
                          </h3>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400 capitalize">
                            {budget.period} budget
                          </p>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => handleDelete(budget.id)}
                        disabled={deletingId === budget.id}
                        className="p-2 text-neutral-400 hover:text-error-500 bg-neutral-100 dark:bg-neutral-800 hover:bg-error-50 dark:hover:bg-error-950/50 rounded-xl transition-all duration-300 disabled:opacity-50 hover:scale-110"
                        title="Delete budget"
                      >
                        {deletingId === budget.id ? (
                          <div className="w-4 h-4 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        )}
                      </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                          Progress
                        </span>
                        <span className={`text-sm font-bold ${getStatusColor(budget.percentage || 0)}`}>
                          {(budget.percentage || 0).toFixed(1)}%
                        </span>
                      </div>
                      
                      <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-3 rounded-full transition-all duration-500 ${getProgressBarColor(budget.percentage || 0)}`}
                          style={{ width: `${Math.min(100, budget.percentage || 0)}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Budget Details */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
                        <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-1">
                          Spent
                        </p>
                        <p className="text-lg font-bold text-neutral-900 dark:text-white">
                          ${(budget.spent || 0).toFixed(2)}
                        </p>
                      </div>
                      
                      <div className="p-3 bg-primary-50 dark:bg-primary-950/50 rounded-xl">
                        <p className="text-xs font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wide mb-1">
                          Budget
                        </p>
                        <p className="text-lg font-bold text-primary-700 dark:text-primary-300">
                          ${budget.amount.toFixed(2)}
                        </p>
                      </div>
                      
                      <div className={`p-3 rounded-xl ${
                        (budget.remaining || 0) < 0 
                          ? "bg-error-50 dark:bg-error-950/50" 
                          : "bg-success-50 dark:bg-success-950/50"
                      }`}>
                        <p className={`text-xs font-medium uppercase tracking-wide mb-1 ${
                          (budget.remaining || 0) < 0 
                            ? "text-error-600 dark:text-error-400" 
                            : "text-success-600 dark:text-success-400"
                        }`}>
                          Remaining
                        </p>
                        <p className={`text-lg font-bold ${
                          (budget.remaining || 0) < 0 
                            ? "text-error-700 dark:text-error-300" 
                            : "text-success-700 dark:text-success-300"
                        }`}>
                          ${(budget.remaining || 0).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Status Alert */}
                    {(budget.percentage || 0) >= 100 && (
                      <div className="mt-4 p-3 bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-error-100 dark:bg-error-800 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-error-600 dark:text-error-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                          </div>
                          <p className="text-sm font-medium text-error-800 dark:text-error-200">
                            Budget exceeded! You've spent ${((budget.spent || 0) - budget.amount).toFixed(2)} over your limit.
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {(budget.percentage || 0) >= 80 && (budget.percentage || 0) < 100 && (
                      <div className="mt-4 p-3 bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-800 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-warning-100 dark:bg-warning-800 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-warning-600 dark:text-warning-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <p className="text-sm font-medium text-warning-800 dark:text-warning-200">
                            Approaching budget limit! ${(budget.remaining || 0).toFixed(2)} remaining.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-10 translate-x-10 group-hover:scale-110 transition-transform duration-500"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-white/5 to-transparent rounded-full translate-y-8 -translate-x-8 group-hover:scale-110 transition-transform duration-500"></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}