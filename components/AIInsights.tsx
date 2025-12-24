"use client";

import { useState, useEffect } from "react";
import { getAIInsights } from "@/app/actions/getAIInsights";
import { generateInsightAnswer } from "@/app/actions/generateInsightAnswer";

interface InsightData {
  id: string;
  type: "warning" | "info" | "success" | "tip";
  title: string;
  message: string;
  action?: string;
  confidence?: number;
}

interface AIAnswer {
  insightId: string;
  answer: string;
  isLoading: boolean;
}

const AIInsights = () => {
  const [insights, setInsights] = useState<InsightData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [aiAnswers, setAiAnswers] = useState<AIAnswer[]>([]);

  const loadInsights = async () => {
    setIsLoading(true);
    try {
      console.log("🔄 Loading AI insights...");
      const newInsights = await getAIInsights();
      console.log(`✅ Loaded ${newInsights.length} insights`);
      setInsights(newInsights);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("❌ AIInsights: Failed to load AI insights:", error);
      // Provide helpful fallback insights
      setInsights([
        {
          id: "fallback-1",
          type: "warning",
          title: "Connection Issue",
          message: "Unable to load AI insights. Check your internet connection.",
          action: "Retry loading",
          confidence: 0.5,
        },
        {
          id: "fallback-2",
          type: "tip",
          title: "Manual Review",
          message: "While AI loads, review your recent expenses manually.",
          action: "View expenses",
          confidence: 1.0,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleActionClick = async (insight: InsightData) => {
    if (!insight.action) return;

    // Check if answer is already loading or exists
    const existingAnswer = aiAnswers.find((a) => a.insightId === insight.id);
    if (existingAnswer) {
      // Remove the answer if it already exists (toggle functionality)
      setAiAnswers((prev) => prev.filter((a) => a.insightId !== insight.id));
      return;
    }

    // Add loading state
    setAiAnswers((prev) => [
      ...prev,
      {
        insightId: insight.id,
        answer: "",
        isLoading: true,
      },
    ]);

    try {
      console.log(`🤖 Generating detailed answer for: ${insight.title}`);
      
      // Generate question based on insight title and action
      const question = `${insight.title}: ${insight.action}. Please provide specific advice.`;

      // Use server action to generate AI answer
      const answer = await generateInsightAnswer(question);

      console.log("✅ AI answer generated successfully");

      setAiAnswers((prev) =>
        prev.map((a) =>
          a.insightId === insight.id ? { ...a, answer, isLoading: false } : a
        )
      );
    } catch (error) {
      console.error("❌ Failed to generate AI answer:", error);
      
      // Provide a more helpful error message based on the insight type
      let fallbackAnswer = "I'm having trouble providing detailed advice right now. ";
      
      if (insight.type === "warning") {
        fallbackAnswer += "Consider reviewing your recent expenses and setting spending limits.";
      } else if (insight.type === "tip") {
        fallbackAnswer += "Try implementing small changes to your spending habits gradually.";
      } else if (insight.action?.toLowerCase().includes("budget")) {
        fallbackAnswer += "Start by tracking your expenses for a week to understand your patterns.";
      } else {
        fallbackAnswer += "Please try refreshing the insights or check back later.";
      }

      setAiAnswers((prev) =>
        prev.map((a) =>
          a.insightId === insight.id
            ? {
                ...a,
                answer: fallbackAnswer,
                isLoading: false,
              }
            : a
        )
      );
    }
  };

  useEffect(() => {
    loadInsights();
  }, []);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "warning":
        return "⚠️";
      case "success":
        return "✅";
      case "tip":
        return "💡";
      case "info":
        return "ℹ️";
      default:
        return "🤖";
    }
  };

  const getInsightColors = (type: string) => {
    switch (type) {
      case "warning":
        return "border-l-warning-500 bg-warning-50/80 dark:bg-warning-950/20";
      case "success":
        return "border-l-success-500 bg-success-50/80 dark:bg-success-950/20";
      case "tip":
        return "border-l-primary-500 bg-primary-50/80 dark:bg-primary-950/20";
      case "info":
        return "border-l-accent-500 bg-accent-50/80 dark:bg-accent-950/20";
      default:
        return "border-l-neutral-500 bg-neutral-50/80 dark:bg-neutral-800/50";
    }
  };

  const getButtonColors = (type: string) => {
    switch (type) {
      case "warning":
        return "text-warning-700 dark:text-warning-300 hover:text-warning-800 dark:hover:text-warning-200";
      case "success":
        return "text-success-700 dark:text-success-300 hover:text-success-800 dark:hover:text-success-200";
      case "tip":
        return "text-primary-700 dark:text-primary-300 hover:text-primary-800 dark:hover:text-primary-200";
      case "info":
        return "text-accent-700 dark:text-accent-300 hover:text-accent-800 dark:hover:text-accent-200";
      default:
        return "text-neutral-700 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-neutral-200";
    }
  };

  const formatLastUpdated = () => {
    if (!lastUpdated) return "Loading...";

    const now = new Date();
    const diffMs = now.getTime() - lastUpdated.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;

    return lastUpdated.toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="relative group">
        {/* Background Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
        
        <div className="relative bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl rounded-3xl border border-neutral-200/50 dark:border-neutral-800/50 shadow-2xl p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 via-primary-600 to-accent-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent-400 rounded-full animate-pulse"></div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-display font-bold text-neutral-900 dark:text-white">
                AI Insights
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                Analyzing your spending patterns
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin"></div>
              <span className="text-sm text-primary-600 dark:text-primary-400 font-medium hidden sm:block">
                Analyzing...
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse bg-gradient-to-r from-neutral-100 to-neutral-50 dark:from-neutral-800 dark:to-neutral-700 p-4 rounded-2xl border border-neutral-200/50 dark:border-neutral-700/50"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-neutral-200 dark:bg-neutral-600 rounded-xl"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-600 rounded-lg w-3/4"></div>
                    <div className="h-3 bg-neutral-200 dark:bg-neutral-600 rounded-lg w-full"></div>
                    <div className="h-3 bg-neutral-200 dark:bg-neutral-600 rounded-lg w-2/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-200/50 dark:border-neutral-700/50 text-center">
            <div className="flex items-center justify-center gap-2 text-neutral-500 dark:text-neutral-400">
              <div className="w-2 h-2 bg-primary-500 dark:bg-primary-400 rounded-full animate-pulse"></div>
              <span className="text-sm">
                AI is analyzing your financial patterns...
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      {/* Background Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
      
      <div className="relative bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl rounded-3xl border border-neutral-200/50 dark:border-neutral-800/50 shadow-2xl p-6 hover:shadow-glow transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 via-primary-600 to-accent-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold text-neutral-900 dark:text-white">
                AI Insights
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                AI financial analysis
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 bg-primary-50 dark:bg-primary-950/30 text-primary-700 dark:text-primary-300 px-3 py-2 rounded-xl text-sm font-medium border border-primary-200/50 dark:border-primary-800/50">
              <span className="w-2 h-2 bg-primary-500 dark:bg-primary-400 rounded-full"></span>
              <span className="hidden sm:inline">{formatLastUpdated()}</span>
              <span className="sm:hidden">
                {formatLastUpdated().includes("ago")
                  ? formatLastUpdated().replace(" ago", "")
                  : formatLastUpdated()}
              </span>
            </div>
            <button
              onClick={loadInsights}
              className="w-10 h-10 bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600 hover:from-primary-700 hover:via-accent-600 hover:to-primary-700 text-white rounded-xl flex items-center justify-center shadow-lg hover:shadow-glow transition-all duration-300 hover:scale-110"
              disabled={isLoading}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-neutral-50/50 to-primary-50/30 dark:from-neutral-800/50 dark:to-primary-950/30 rounded-2xl p-4 border border-neutral-200/30 dark:border-neutral-700/30">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {insights.map((insight) => {
              const currentAnswer = aiAnswers.find(
                (a) => a.insightId === insight.id
              );

              return (
                <div
                  key={insight.id}
                  className={`relative overflow-hidden rounded-2xl p-4 border-l-4 hover:shadow-lg transition-all duration-300 backdrop-blur-sm ${getInsightColors(
                    insight.type
                  )}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-sm ${
                            insight.type === "warning"
                              ? "bg-warning-100 dark:bg-warning-900/50"
                              : insight.type === "success"
                              ? "bg-success-100 dark:bg-success-900/50"
                              : insight.type === "tip"
                              ? "bg-primary-100 dark:bg-primary-900/50"
                              : "bg-accent-100 dark:bg-accent-900/50"
                          }`}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {insight.type === "warning" && (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            )}
                            {insight.type === "success" && (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            )}
                            {insight.type === "tip" && (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            )}
                            {(insight.type === "info" || !["warning", "success", "tip"].includes(insight.type)) && (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            )}
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-neutral-900 dark:text-neutral-100 text-sm mb-1">
                            {insight.title}
                          </h4>
                          {insight.confidence && insight.confidence < 0.8 && (
                            <span className="inline-block px-2 py-1 bg-warning-100 dark:bg-warning-900/50 text-warning-700 dark:text-warning-300 rounded-lg text-xs font-medium">
                              Preliminary
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed mb-4">
                        {insight.message}
                      </p>
                      {insight.action && (
                        <div className="text-left">
                          <button
                            onClick={() => handleActionClick(insight)}
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm cursor-pointer transition-all duration-300 ${getButtonColors(
                              insight.type
                            )} hover:bg-white/70 dark:hover:bg-neutral-700/70 border border-current/20 hover:border-current/40 ${
                              currentAnswer ? "bg-white/70 dark:bg-neutral-700/70 border-current/40" : ""
                            }`}
                          >
                            <span>{insight.action}</span>
                            {currentAnswer?.isLoading ? (
                              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={currentAnswer ? "M5 15l7-7 7 7" : "M9 5l7 7-7 7"} />
                              </svg>
                            )}
                          </button>
                        </div>
                      )}

                      {/* AI Answer Display */}
                      {currentAnswer && (
                        <div className="mt-4 p-4 bg-white/80 dark:bg-neutral-700/80 backdrop-blur-sm rounded-xl border border-neutral-200/50 dark:border-neutral-600/50">
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-gradient-to-br from-primary-500 via-primary-600 to-accent-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <h5 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm mb-2">
                                AI Answer:
                              </h5>
                              {currentAnswer.isLoading ? (
                                <div className="space-y-2">
                                  <div className="animate-pulse bg-neutral-200 dark:bg-neutral-600 h-3 rounded-lg w-full"></div>
                                  <div className="animate-pulse bg-neutral-200 dark:bg-neutral-600 h-3 rounded-lg w-3/4"></div>
                                  <div className="animate-pulse bg-neutral-200 dark:bg-neutral-600 h-3 rounded-lg w-1/2"></div>
                                </div>
                              ) : (
                                <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
                                  {currentAnswer.answer}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-neutral-200/50 dark:border-neutral-700/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400">
              <div className="w-6 h-6 bg-primary-50 dark:bg-primary-950/30 rounded-lg flex items-center justify-center">
                <svg className="w-3 h-3 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <span className="font-medium text-sm">Powered by AI analysis</span>
            </div>
            <button
              onClick={loadInsights}
              className="px-4 py-2 bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600 hover:from-primary-700 hover:via-accent-600 hover:to-primary-700 text-white rounded-xl font-medium text-sm shadow-lg hover:shadow-glow transition-all duration-300 hover:scale-105"
            >
              <span className="flex items-center gap-2">
                <span className="sm:hidden">Refresh</span>
                <span className="hidden sm:inline">Refresh Insights</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;
