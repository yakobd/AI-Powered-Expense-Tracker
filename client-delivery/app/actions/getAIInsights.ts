"use server";

import { checkUser } from "@/lib/checkUser";
import { db } from "@/lib/db";
import { generateExpenseInsights, AIInsight, ExpenseRecord } from "@/lib/ai";

export async function getAIInsights(): Promise<AIInsight[]> {
  try {
    console.log("🔄 Starting AI insights generation...");
    
    const user = await checkUser();
    if (!user) {
      console.error("❌ User not authenticated");
      throw new Error("User not authenticated");
    }

    console.log(`👤 Generating insights for user: ${user.clerkUserId}`);

    // Get user's recent expenses (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const expenses = await db.record.findMany({
      where: {
        userId: user.clerkUserId,
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 50, // Limit to recent 50 expenses for analysis
    });

    console.log(`📊 Found ${expenses.length} expenses for analysis`);

    if (expenses.length === 0) {
      console.log("ℹ️ No expenses found, returning welcome insights");
      // Return default insights for new users
      return [
        {
          id: "welcome-1",
          type: "info",
          title: "Welcome to AI Insights!",
          message: "Start adding expenses to get personalized financial insights.",
          action: "Add your first expense",
          confidence: 1.0,
        },
        {
          id: "welcome-2",
          type: "tip",
          title: "Track Regularly",
          message: "Daily expense tracking helps AI provide better insights.",
          action: "Learn tracking tips",
          confidence: 1.0,
        },
      ];
    }

    // Convert to format expected by AI
    const expenseData: ExpenseRecord[] = expenses.map((expense) => ({
      id: expense.id,
      amount: expense.amount,
      category: expense.category || "Other",
      description: expense.text,
      date: expense.createdAt.toISOString(),
    }));

    console.log("🤖 Calling AI insights generation...");
    // Generate AI insights
    const insights = await generateExpenseInsights(expenseData);
    
    console.log(`✅ Generated ${insights.length} insights successfully`);
    return insights;
  } catch (error) {
    console.error("❌ Error getting AI insights:", error);

    // Return helpful fallback insights
    return [
      {
        id: "error-1",
        type: "warning",
        title: "Connection Issue",
        message: "Unable to analyze expenses. Check your connection and try again.",
        action: "Retry analysis",
        confidence: 0.5,
      },
      {
        id: "error-2",
        type: "tip",
        title: "Manual Review",
        message: "While AI loads, review your recent expenses for patterns.",
        action: "View expense history",
        confidence: 1.0,
      },
    ];
  }
}
