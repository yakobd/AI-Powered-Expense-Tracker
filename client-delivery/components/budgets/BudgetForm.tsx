"use client";

import { useState, useRef } from "react";
import { createBudget } from "@/app/actions/budgetActions";

const categories = [
  { 
    value: "Food", 
    label: "Food & Dining", 
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </svg>
    ),
    gradient: "from-primary-500 to-accent-500" 
  },
  { 
    value: "Transportation", 
    label: "Transportation", 
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    gradient: "from-accent-500 to-primary-500" 
  },
  { 
    value: "Shopping", 
    label: "Shopping", 
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
    gradient: "from-primary-600 to-accent-400" 
  },
  { 
    value: "Entertainment", 
    label: "Entertainment", 
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V3a1 1 0 011 1v14a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1V2" />
      </svg>
    ),
    gradient: "from-accent-600 to-primary-400" 
  },
  { 
    value: "Bills", 
    label: "Bills & Utilities", 
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    gradient: "from-warning-500 to-primary-500" 
  },
  { 
    value: "Healthcare", 
    label: "Healthcare", 
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    gradient: "from-success-500 to-accent-500" 
  },
  { 
    value: "Other", 
    label: "Other", 
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    gradient: "from-neutral-500 to-neutral-600" 
  },
];

const periods = [
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" }
];

export default function BudgetForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setAlertMessage(null);

    try {
      const result = await createBudget(formData);
      
      if (result.error) {
        setAlertMessage(result.error);
        setAlertType("error");
      } else {
        setAlertMessage("Budget created successfully!");
        setAlertType("success");
        formRef.current?.reset();
      }
    } catch (error) {
      setAlertMessage("Failed to create budget");
      setAlertType("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Background Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
      
      <section 
        className="relative bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl rounded-3xl border border-neutral-200/50 dark:border-neutral-800/50 shadow-2xl overflow-hidden"
        aria-labelledby="budget-form-heading"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500/10 via-accent-500/10 to-primary-500/10 dark:from-primary-500/5 dark:via-accent-500/5 dark:to-primary-500/5 p-6 border-b border-neutral-200/50 dark:border-neutral-800/50">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-500 via-primary-600 to-accent-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent-400 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
            </div>
            <div>
              <h2 
                id="budget-form-heading"
                className="text-2xl font-display font-bold text-neutral-900 dark:text-white"
              >
                Create Budget
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                Set spending limits for your categories
              </p>
            </div>
          </div>
        </div>

        <form
          ref={formRef}
          action={handleSubmit}
          className="p-6 space-y-8"
        >
          {/* Category Selection */}
          <div className="space-y-3">
            <label
              htmlFor="category"
              className="flex items-center gap-2 text-sm font-semibold text-neutral-700 dark:text-neutral-300"
            >
              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              Category
              <span className="text-error-500" aria-label="required">*</span>
            </label>
            <select
              id="category"
              name="category"
              required
              className="w-full px-4 py-4 bg-neutral-50 dark:bg-neutral-800/50 border-2 border-neutral-200 dark:border-neutral-700 rounded-2xl focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 dark:focus:border-primary-500 text-neutral-900 dark:text-white transition-all duration-300 hover:border-primary-300 dark:hover:border-primary-600"
            >
              <option value="" disabled>
                Select a category...
              </option>
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          {/* Budget Amount */}
          <div className="space-y-3">
            <label
              htmlFor="amount"
              className="flex items-center gap-2 text-sm font-semibold text-neutral-700 dark:text-neutral-300"
            >
              <div className="w-2 h-2 bg-success-500 rounded-full"></div>
              Budget Amount
              <span className="text-error-500" aria-label="required">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-neutral-400 font-bold text-lg pointer-events-none">
                $
              </span>
              <input
                type="number"
                id="amount"
                name="amount"
                min="0.01"
                step="0.01"
                required
                className="w-full pl-10 pr-4 py-4 bg-neutral-50 dark:bg-neutral-800/50 border-2 border-neutral-200 dark:border-neutral-700 rounded-2xl focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 dark:focus:border-primary-500 text-neutral-900 dark:text-white text-lg font-bold transition-all duration-300"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Period Selection */}
          <div className="space-y-3">
            <label
              htmlFor="period"
              className="flex items-center gap-2 text-sm font-semibold text-neutral-700 dark:text-neutral-300"
            >
              <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
              Budget Period
              <span className="text-error-500" aria-label="required">*</span>
            </label>
            <select
              id="period"
              name="period"
              required
              defaultValue="monthly"
              className="w-full px-4 py-4 bg-neutral-50 dark:bg-neutral-800/50 border-2 border-neutral-200 dark:border-neutral-700 rounded-2xl focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 dark:focus:border-primary-500 text-neutral-900 dark:text-white transition-all duration-300"
            >
              {periods.map((period) => (
                <option key={period.value} value={period.value}>
                  {period.label}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full overflow-hidden bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600 hover:from-primary-700 hover:via-accent-600 hover:to-primary-700 disabled:from-neutral-400 disabled:to-neutral-500 text-white px-8 py-5 rounded-2xl font-bold shadow-xl hover:shadow-glow transition-all duration-300 transform hover:-translate-y-1 disabled:transform-none disabled:cursor-not-allowed"
          >
            <div className="relative z-10 flex items-center justify-center gap-3">
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating Budget...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Create Budget</span>
                </>
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </form>

        {/* Alert Message */}
        {alertMessage && (
          <div className={`mx-6 mb-6 p-4 rounded-2xl border-l-4 backdrop-blur-sm animate-slide-down ${
            alertType === "success"
              ? "bg-success-50/80 dark:bg-success-950/20 border-l-success-500 text-success-800 dark:text-success-200"
              : "bg-error-50/80 dark:bg-error-950/20 border-l-error-500 text-error-800 dark:text-error-200"
          }`}>
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                alertType === "success" ? "bg-success-100 dark:bg-success-800" : "bg-error-100 dark:bg-error-800"
              }`}>
                {alertType === "success" ? (
                  <svg className="w-5 h-5 text-success-600 dark:text-success-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-error-600 dark:text-error-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                )}
              </div>
              <p className="font-medium text-sm leading-relaxed">{alertMessage}</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}