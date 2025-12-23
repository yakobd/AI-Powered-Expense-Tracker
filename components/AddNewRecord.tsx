"use client";
import { useRef, useState, useEffect } from "react";
import addExpenseRecord from "@/app/actions/addExpenseRecord";
import { suggestCategory } from "@/app/actions/suggestCategory";

const AddRecord = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [amount, setAmount] = useState(50);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [isCategorizingAI, setIsCategorizingAI] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCategoryDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const clientAction = async (formData: FormData) => {
    setIsLoading(true);
    setAlertMessage(null);

    formData.set("amount", amount.toString());
    formData.set("category", category);

    const { error } = await addExpenseRecord(formData);

    if (error) {
      setAlertMessage(`Error: ${error}`);
      setAlertType("error");
    } else {
      setAlertMessage("Expense added successfully! 🎉");
      setAlertType("success");
      formRef.current?.reset();
      setAmount(50);
      setCategory("");
      setDescription("");
    }

    setIsLoading(false);
  };

  const handleAISuggestCategory = async () => {
    if (!description.trim()) {
      setAlertMessage("Please enter a description first");
      setAlertType("error");
      return;
    }

    if (description.trim().length < 3) {
      setAlertMessage("Please enter a more detailed description for better AI suggestions");
      setAlertType("error");
      return;
    }

    setIsCategorizingAI(true);
    setAlertMessage(null);

    try {
      console.log(`🤖 Requesting AI categorization for: "${description}"`);
      const result = await suggestCategory(description);
      
      if (result.error) {
        setAlertMessage(`AI Suggestion: ${result.error}`);
        setAlertType("error");
        console.error("❌ AI Suggestion Error:", result.error);
      } else {
        // Ensure the category matches one of our valid categories (case-insensitive)
        const validCategories = [
          "Food",
          "Transportation", 
          "Shopping",
          "Entertainment",
          "Bills",
          "Healthcare",
          "Other"
        ];
        
        const matchedCategory = validCategories.find(
          cat => cat.toLowerCase() === result.category.toLowerCase()
        ) || "Other";
        
        setCategory(matchedCategory);
        setAlertMessage(`AI suggested: ${matchedCategory} ✨`);
        setAlertType("success");
        console.log(`✅ AI Suggestion Success: "${description}" → "${matchedCategory}"`);
        
        // Auto-close dropdown if it was open
        setIsCategoryDropdownOpen(false);
      }
    } catch (error) {
      console.error("❌ AI Suggestion Failed:", error);
      setAlertMessage("Failed to get AI category suggestion. Please try again.");
      setAlertType("error");
    } finally {
      setIsCategorizingAI(false);
    }
  };

  const categories = [
    { 
      value: "Food", 
      label: "Food & Dining", 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
      color: "from-orange-400 to-red-400" 
    },
    { 
      value: "Transportation", 
      label: "Transportation", 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      color: "from-blue-400 to-indigo-400" 
    },
    { 
      value: "Shopping", 
      label: "Shopping", 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      color: "from-pink-400 to-purple-400" 
    },
    { 
      value: "Entertainment", 
      label: "Entertainment", 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V3a1 1 0 011 1v14a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1V2" />
        </svg>
      ),
      color: "from-purple-400 to-indigo-400" 
    },
    { 
      value: "Bills", 
      label: "Bills & Utilities", 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: "from-yellow-400 to-orange-400" 
    },
    { 
      value: "Healthcare", 
      label: "Healthcare", 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      color: "from-green-400 to-teal-400" 
    },
    { 
      value: "Other", 
      label: "Other", 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      color: "from-neutral-400 to-slate-400" 
    },
  ];

  return (
    <div className="relative">
      {/* Background Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
      
      <div className="relative bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl rounded-3xl border border-neutral-200/50 dark:border-neutral-800/50 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500/10 via-accent-500/10 to-primary-500/10 dark:from-primary-500/5 dark:via-accent-500/5 dark:to-primary-500/5 p-6 border-b border-neutral-200/50 dark:border-neutral-800/50">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-500 via-primary-600 to-accent-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent-400 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold text-neutral-900 dark:text-white">
                Add New Expense
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                Track your spending with AI-powered assistance
              </p>
            </div>
          </div>
        </div>

        <form
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(formRef.current!);
            clientAction(formData);
          }}
          className="p-6 space-y-8"
        >
          {/* Description Input */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              Expense Description
              <span className="text-error-500">*</span>
            </label>
            <div className="relative group">
              <input
                type="text"
                name="text"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  // Auto-suggest category based on keywords as user types
                  const desc = e.target.value.toLowerCase();
                  if (desc.length > 3 && !category) {
                    if (desc.includes('coffee') || desc.includes('restaurant') || desc.includes('food')) {
                      setCategory('Food');
                    } else if (desc.includes('gas') || desc.includes('uber') || desc.includes('taxi')) {
                      setCategory('Transportation');
                    } else if (desc.includes('amazon') || desc.includes('shopping') || desc.includes('store')) {
                      setCategory('Shopping');
                    } else if (desc.includes('movie') || desc.includes('netflix') || desc.includes('game')) {
                      setCategory('Entertainment');
                    } else if (desc.includes('electric') || desc.includes('rent') || desc.includes('bill')) {
                      setCategory('Bills');
                    } else if (desc.includes('doctor') || desc.includes('pharmacy') || desc.includes('medicine')) {
                      setCategory('Healthcare');
                    }
                  }
                }}
                className="w-full pl-4 pr-14 py-4 bg-neutral-50 dark:bg-neutral-800/50 border-2 border-neutral-200 dark:border-neutral-700 rounded-2xl focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 dark:focus:border-primary-500 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 transition-all duration-300 group-hover:border-primary-300 dark:group-hover:border-primary-600"
                placeholder="e.g., Coffee at Starbucks, Grocery shopping..."
                required
              />
              <button
                type="button"
                onClick={handleAISuggestCategory}
                disabled={isCategorizingAI || !description.trim()}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 disabled:from-neutral-300 disabled:to-neutral-400 text-white rounded-xl flex items-center justify-center shadow-lg hover:shadow-glow disabled:shadow-none transition-all duration-300 hover:scale-110 disabled:scale-100"
                title="Get AI category suggestion"
              >
                {isCategorizingAI ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )}
              </button>
            </div>
            {isCategorizingAI && (
              <div className="flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400 animate-pulse">
                <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"></div>
                <span>AI is analyzing "{description.slice(0, 30)}{description.length > 30 ? '...' : ''}" to suggest the best category...</span>
              </div>
            )}
          </div>

          {/* Category Selection */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
              Category
              <span className="text-error-500">*</span>
            </label>
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                className="w-full flex items-center justify-between px-4 py-4 bg-neutral-50 dark:bg-neutral-800/50 border-2 border-neutral-200 dark:border-neutral-700 rounded-2xl focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 dark:focus:border-primary-500 text-neutral-900 dark:text-white transition-all duration-300 hover:border-primary-300 dark:hover:border-primary-600"
              >
                <div className="flex items-center gap-3">
                  {category ? (
                    <>
                      <div className="w-8 h-8 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/50 dark:to-accent-900/50 rounded-xl flex items-center justify-center text-primary-600 dark:text-primary-400">
                        {categories.find(cat => cat.value === category)?.icon}
                      </div>
                      <span className="font-medium">
                        {categories.find(cat => cat.value === category)?.label}
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="w-8 h-8 bg-neutral-200 dark:bg-neutral-700 rounded-xl flex items-center justify-center">
                        <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                      <span className="text-neutral-400 dark:text-neutral-500">Select a category...</span>
                    </>
                  )}
                </div>
                <svg 
                  className={`w-5 h-5 text-neutral-400 transition-transform duration-300 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isCategoryDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 dark:bg-neutral-800/95 backdrop-blur-xl rounded-2xl border border-neutral-200/50 dark:border-neutral-700/50 shadow-2xl z-50 overflow-hidden animate-slide-down">
                  <div className="p-2 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-600">
                    {categories.map((cat) => (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => {
                          setCategory(cat.value);
                          setIsCategoryDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-left ${
                          category === cat.value
                            ? 'bg-primary-50 dark:bg-primary-950/50 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800'
                            : 'hover:bg-neutral-50 dark:hover:bg-neutral-700/50 text-neutral-700 dark:text-neutral-300'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                          category === cat.value
                            ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400'
                            : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400'
                        }`}>
                          {cat.icon}
                        </div>
                        <span className="font-medium">{cat.label}</span>
                        {category === cat.value && (
                          <svg className="w-4 h-4 ml-auto text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Amount & Date Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Amount */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                Amount
                <span className="text-error-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-neutral-400 font-bold text-lg">
                  $
                </span>
                <input
                  type="number"
                  name="amount"
                  min="0.01"
                  max="10000"
                  step="0.01"
                  value={amount || ''}
                  onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                  className="w-full pl-10 pr-4 py-4 bg-neutral-50 dark:bg-neutral-800/50 border-2 border-neutral-200 dark:border-neutral-700 rounded-2xl focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 dark:focus:border-primary-500 text-neutral-900 dark:text-white text-lg font-bold transition-all duration-300"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>

            {/* Date */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                <div className="w-2 h-2 bg-warning-500 rounded-full"></div>
                Date
                <span className="text-error-500">*</span>
              </label>
              <input
                type="date"
                name="date"
                className="w-full px-4 py-4 bg-neutral-50 dark:bg-neutral-800/50 border-2 border-neutral-200 dark:border-neutral-700 rounded-2xl focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 dark:focus:border-primary-500 text-neutral-900 dark:text-white transition-all duration-300"
                required
                defaultValue={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="group relative w-full overflow-hidden bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600 hover:from-primary-700 hover:via-accent-600 hover:to-primary-700 disabled:from-neutral-400 disabled:to-neutral-500 text-white px-8 py-5 rounded-2xl font-bold shadow-xl hover:shadow-glow transition-all duration-300 transform hover:-translate-y-1 disabled:transform-none disabled:cursor-not-allowed"
            disabled={isLoading || !description.trim() || !category || !amount}
          >
            <div className="relative z-10 flex items-center justify-center gap-3">
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Add Expense</span>
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
      </div>
    </div>
  );
};

export default AddRecord;