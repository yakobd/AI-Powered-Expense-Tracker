"use client";

import { useEffect, useState } from "react";
import { getBudgetOverview } from "@/app/actions/budgetActions";

interface BudgetOverview {
  totalBudget: number;
  totalSpent: number;
  totalRemaining: number;
  overBudgetCount: number;
  nearLimitCount: number;
}

export default function BudgetDashboard() {
  const [overview, setOverview] = useState<BudgetOverview | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadOverview();
  }, []);

  const loadOverview = async () => {
    setIsLoading(true);
    try {
      const result = await getBudgetOverview();
      if (result.error) {
        setError(result.error);
      } else {
        setOverview({
          totalBudget: result.totalBudget || 0,
          totalSpent: result.totalSpent || 0,
          totalRemaining: result.totalRemaining || 0,
          overBudgetCount: result.overBudgetCount || 0,
          nearLimitCount: result.nearLimitCount || 0,
        });
      }
    } catch (err) {
      setError("Failed to load budget overview");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="relative group">
        {/* Background Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
        
        <section className="relative bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl rounded-3xl border border-neutral-200/50 dark:border-neutral-800/50 shadow-2xl p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded-lg mb-6"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-3">
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                  <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative group">
        {/* Background Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-error-600 via-warning-500 to-error-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
        
        <section className="relative bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl rounded-3xl border border-neutral-200/50 dark:border-neutral-800/50 shadow-2xl p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-error-100 dark:bg-error-900/30 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-8 h-8 text-error-600 dark:text-error-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-display font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
              Failed to Load Budget Overview
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">{error}</p>
            <button
              onClick={loadOverview}
              className="px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-glow transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Try Again
            </button>
          </div>
        </section>
      </div>
    );
  }

  if (!overview) {
    return (
      <div className="relative group">
        {/* Background Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
        
        <section className="relative bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl rounded-3xl border border-neutral-200/50 dark:border-neutral-800/50 shadow-2xl p-8">
          <div className="text-center py-8">
            <div className="relative mx-auto mb-6 w-20 h-20">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/50 dark:to-accent-900/50 rounded-3xl flex items-center justify-center shadow-lg">
                <svg className="w-10 h-10 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-100 dark:bg-accent-900 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-accent-600 dark:text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-display font-bold text-neutral-900 dark:text-neutral-100 mb-3">
              No Budgets Set
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
              Create your first budget to start tracking your spending limits and take control of your finances.
            </p>
          </div>
        </section>
      </div>
    );
  }

  const spentPercentage = overview.totalBudget > 0 
    ? (overview.totalSpent / overview.totalBudget) * 100 
    : 0;

  return (
    <div className="relative group">
      {/* Background Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
      
      <section 
        className="relative bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl rounded-3xl border border-neutral-200/50 dark:border-neutral-800/50 shadow-2xl p-8 hover:shadow-glow transition-all duration-300"
        aria-labelledby="budget-overview-heading"
      >
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 via-primary-600 to-accent-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h2 
                id="budget-overview-heading"
                className="text-2xl font-display font-bold text-neutral-900 dark:text-neutral-100"
              >
                Budget Overview
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                Your current budget status and spending summary
              </p>
            </div>
          </div>
        </header>

        {/* Main Progress Bar */}
        <div className="mb-8 p-6 bg-gradient-to-r from-primary-50/80 to-accent-50/80 dark:from-primary-950/30 dark:to-accent-950/30 rounded-2xl border border-primary-200/50 dark:border-primary-800/50 backdrop-blur-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-display font-semibold text-neutral-900 dark:text-neutral-100">
              Total Budget Progress
            </h3>
            <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400 bg-white/50 dark:bg-neutral-800/50 px-3 py-1 rounded-lg">
              {spentPercentage.toFixed(1)}%
            </span>
          </div>
          
          <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-4 mb-4 shadow-inner">
            <div
              className={`h-4 rounded-full transition-all duration-500 shadow-sm ${
                spentPercentage >= 100
                  ? "bg-gradient-to-r from-error-500 to-error-600"
                  : spentPercentage >= 80
                  ? "bg-gradient-to-r from-warning-500 to-warning-600"
                  : "bg-gradient-to-r from-success-500 to-primary-500"
              }`}
              style={{ width: `${Math.min(100, spentPercentage)}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-neutral-600 dark:text-neutral-400 font-medium">
              Spent: <span className="text-neutral-900 dark:text-neutral-100 font-bold">${overview.totalSpent.toFixed(2)}</span>
            </span>
            <span className="text-neutral-600 dark:text-neutral-400 font-medium">
              Budget: <span className="text-neutral-900 dark:text-neutral-100 font-bold">${overview.totalBudget.toFixed(2)}</span>
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Budget */}
          <div className="group relative overflow-hidden">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-500 to-primary-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
            <div className="relative bg-gradient-to-br from-accent-50/80 to-primary-50/80 dark:from-accent-950/30 dark:to-primary-950/30 p-6 rounded-2xl border border-accent-200/50 dark:border-accent-800/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-accent-500 to-primary-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="font-display font-semibold text-neutral-900 dark:text-neutral-100">Total Budget</h3>
              </div>
              <p className="text-2xl font-bold text-accent-600 dark:text-accent-400">
                ${overview.totalBudget.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Total Spent */}
          <div className="group relative overflow-hidden">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
            <div className="relative bg-gradient-to-br from-primary-50/80 to-accent-50/80 dark:from-primary-950/30 dark:to-accent-950/30 p-6 rounded-2xl border border-primary-200/50 dark:border-primary-800/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-display font-semibold text-neutral-900 dark:text-neutral-100">Total Spent</h3>
              </div>
              <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                ${overview.totalSpent.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Remaining */}
          <div className="group relative overflow-hidden">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-success-500 to-primary-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
            <div className="relative bg-gradient-to-br from-success-50/80 to-primary-50/80 dark:from-success-950/30 dark:to-primary-950/30 p-6 rounded-2xl border border-success-200/50 dark:border-success-800/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-success-500 to-primary-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="font-display font-semibold text-neutral-900 dark:text-neutral-100">Remaining</h3>
              </div>
              <p className="text-2xl font-bold text-success-600 dark:text-success-400">
                ${overview.totalRemaining.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Alerts */}
          <div className="group relative overflow-hidden">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-warning-500 to-error-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
            <div className="relative bg-gradient-to-br from-warning-50/80 to-error-50/80 dark:from-warning-950/30 dark:to-error-950/30 p-6 rounded-2xl border border-warning-200/50 dark:border-warning-800/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-warning-500 to-error-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="font-display font-semibold text-neutral-900 dark:text-neutral-100">Alerts</h3>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Over budget: <span className="font-semibold text-error-600 dark:text-error-400">{overview.overBudgetCount}</span>
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Near limit: <span className="font-semibold text-warning-600 dark:text-warning-400">{overview.nearLimitCount}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}