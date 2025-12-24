"use server";

import { checkUser } from "@/lib/checkUser";
import { db } from "@/lib/db";
import { generateAIAnswer, ExpenseRecord } from "@/lib/ai";

export async function generateInsightAnswer(question: string): Promise<string> {
  try {
    console.log(`🤖 Generating answer for question: "${question}"`);
    
    const user = await checkUser();
    if (!user) {
      console.error("❌ User not authenticated");
      throw new Error("User not authenticated");
    }

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

    console.log(`📊 Using ${expenses.length} expenses for context`);

    // Convert to format expected by AI
    const expenseData: ExpenseRecord[] = expenses.map((expense) => ({
      id: expense.id,
      amount: expense.amount,
      category: expense.category || "Other",
      description: expense.text,
      date: expense.createdAt.toISOString(),
    }));

    // Generate AI answer
    const answer = await generateAIAnswer(question, expenseData);
    console.log("✅ AI answer generated successfully");
    return answer;
  } catch (error) {
    console.error("❌ Error generating insight answer:", error);
    return "I'm having trouble analyzing your expenses right now. This could be due to a connection issue or temporary service unavailability. Please try again in a moment.";
  }
}
