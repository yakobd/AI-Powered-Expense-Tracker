"use client";

import { useState, useEffect } from "react";
import { searchExpenses, getExpenseCategories, type SearchFilters, type SearchResult } from "@/app/actions/searchActions";

export default function ExpenseSearch() {
  const [filters, setFilters] = useState<SearchFilters>({
    sortBy: "date",
    sortOrder: "desc"
  });
  const [results, setResults] = useState<SearchResult | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadCategories();
    handleSearch(); // Load initial results
  }, []);

  const loadCategories = async () => {
    try {
      const result = await getExpenseCategories();
      if (result.categories) {
        setCategories(result.categories);
      }
    } catch (err) {
      console.error("Failed to load categories:", err);
    }
  };

  const handleSearch = async (page: number = 1) => {
    setIsLoading(true);
    setError(null);
    setCurrentPage(page);

    try {
      const result = await searchExpenses(filters, page, 10);
      if (result.error) {
        setError(result.error);
      } else {
        setResults(result.result || null);
      }
    } catch (err) {
      setError("Failed to search expenses");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      sortBy: "date",
      sortOrder: "desc"
    });
    setCurrentPage(1);
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

  const totalPages = results ? Math.ceil(results.totalCount / 10) : 0;

  return (
    <section 
      className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-slate-200/60 dark:border-slate-700/60"
      aria-labelledby="expense-search-heading"
    >
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 
              id="expense-search-heading"
              className="text-2xl font-bold text-slate-900 dark:text-slate-100"
            >
              Advanced Expense Search
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Find and analyze your expenses with powerful filters
            </p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            <span className="text-sm">🔍</span>
            <span>{showFilters ? 'Hide' : 'Show'} Filters</span>
          </button>
        </div>
      </header>

      {/* Search Filters */}
      {showFilters && (
        <div className="mb-8 p-6 bg-gradient-to-r from-slate-50 to-white dark:from-slate-700 dark:to-slate-800 rounded-2xl border border-slate-200/60 dark:border-slate-600/60">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {/* Text Search */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Search Description
              </label>
              <input
                type="text"
                value={filters.query || ""}
                onChange={(e) => handleFilterChange("query", e.target.value)}
                placeholder="Search expense descriptions..."
                className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Category
              </label>
              <select
                value={filters.category || "all"}
                onChange={(e) => handleFilterChange("category", e.target.value === "all" ? undefined : e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Sort By
              </label>
              <select
                value={filters.sortBy || "date"}
                onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              >
                <option value="date">Date</option>
                <option value="amount">Amount</option>
                <option value="category">Category</option>
              </select>
            </div>

            {/* Amount Range */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Min Amount
              </label>
              <input
                type="number"
                value={filters.minAmount || ""}
                onChange={(e) => handleFilterChange("minAmount", e.target.value ? parseFloat(e.target.value) : undefined)}
                placeholder="0.00"
                min="0"
                step="0.01"
                className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Max Amount
              </label>
              <input
                type="number"
                value={filters.maxAmount || ""}
                onChange={(e) => handleFilterChange("maxAmount", e.target.value ? parseFloat(e.target.value) : undefined)}
                placeholder="1000.00"
                min="0"
                step="0.01"
                className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              />
            </div>

            {/* Sort Order */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Sort Order
              </label>
              <select
                value={filters.sortOrder || "desc"}
                onChange={(e) => handleFilterChange("sortOrder", e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
            </div>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={filters.startDate || ""}
                onChange={(e) => handleFilterChange("startDate", e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                End Date
              </label>
              <input
                type="date"
                value={filters.endDate || ""}
                onChange={(e) => handleFilterChange("endDate", e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => handleSearch(1)}
              disabled={isLoading}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-300 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <span>🔍</span>
              )}
              Search
            </button>
            
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-slate-500 hover:bg-slate-600 text-white rounded-lg transition-colors duration-200"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}

      {/* Search Results */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-red-500">⚠️</span>
            <p className="text-red-800 dark:text-red-200 font-medium">{error}</p>
          </div>
        </div>
      )}

      {results && (
        <div>
          {/* Results Summary */}
          <div className="mb-6 p-4 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                  {results.totalCount}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Total Results
                </div>
              </div>
              <div>
                <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                  ${results.totalAmount.toFixed(2)}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Total Amount
                </div>
              </div>
              <div>
                <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                  ${results.averageAmount.toFixed(2)}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Average
                </div>
              </div>
              <div>
                <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                  {Object.keys(results.categoryBreakdown).length}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Categories
                </div>
              </div>
            </div>
          </div>

          {/* Results List */}
          {results.records.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                No Results Found
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Try adjusting your search filters
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {results.records.map((record) => (
                <div
                  key={record.id}
                  className="p-4 bg-gradient-to-r from-slate-50 to-white dark:from-slate-700 dark:to-slate-800 rounded-lg border border-slate-200 dark:border-slate-600 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm">
                          {getCategoryIcon(record.category)}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-slate-100">
                          {record.text}
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                          {record.category} • {new Date(record.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                      ${record.amount.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-2">
              <button
                onClick={() => handleSearch(currentPage - 1)}
                disabled={currentPage === 1 || isLoading}
                className="px-3 py-2 bg-slate-200 hover:bg-slate-300 disabled:bg-slate-100 text-slate-700 rounded-lg transition-colors duration-200"
              >
                Previous
              </button>
              
              <span className="px-4 py-2 text-slate-600 dark:text-slate-400">
                Page {currentPage} of {totalPages}
              </span>
              
              <button
                onClick={() => handleSearch(currentPage + 1)}
                disabled={currentPage === totalPages || isLoading}
                className="px-3 py-2 bg-slate-200 hover:bg-slate-300 disabled:bg-slate-100 text-slate-700 rounded-lg transition-colors duration-200"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}