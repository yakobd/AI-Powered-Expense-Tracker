"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { checkUser } from "@/lib/checkUser";

export interface Budget {
  id: string;
  category: string;
  amount: number;
  period: string;
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
  spent?: number;
  remaining?: number;
  percentage?: number;
}

export async function createBudget(formData: FormData) {
  // Ensure user exists in database
  const user = await checkUser();
  
  if (!user) {
    return { error: "User not authenticated" };
  }

  const category = formData.get("category")?.toString();
  const amount = parseFloat(formData.get("amount")?.toString() || "0");
  const period = formData.get("period")?.toString() || "monthly";

  if (!category || amount <= 0) {
    return { error: "Category and valid amount are required" };
  }

  try {
    // Check if budget already exists for this category and period
    const existingBudget = await db.budget.findUnique({
      where: {
        userId_category_period: {
          userId: user.clerkUserId,
          category,
          period,
        },
      },
    });

    if (existingBudget) {
      // Update existing budget
      const budget = await db.budget.update({
        where: { id: existingBudget.id },
        data: {
          amount,
          isActive: true,
          updatedAt: new Date(),
        },
      });
      
      revalidatePath("/budgets");
      return { success: true, budget };
    } else {
      // Create new budget
      const budget = await db.budget.create({
        data: {
          userId: user.clerkUserId,
          category,
          amount,
          period,
          isActive: true,
        },
      });
      
      revalidatePath("/budgets");
      return { success: true, budget };
    }
  } catch (error) {
    console.error("Error creating/updating budget:", error);
    return { error: "Failed to create budget" };
  }
}

export async function getBudgets(): Promise<{ budgets?: Budget[]; error?: string }> {
  const { userId } = await auth();
  
  if (!userId) {
    return { error: "User not authenticated" };
  }

  try {
    const budgets = await db.budget.findMany({
      where: { 
        userId,
        isActive: true,
      },
      orderBy: { createdAt: "desc" },
    });

    // Calculate spending for each budget
    const budgetsWithSpending = await Promise.all(
      budgets.map(async (budget) => {
        const now = new Date();
        let startDate = budget.startDate;
        let endDate = budget.endDate;

        // Calculate period dates if not set
        if (!endDate) {
          switch (budget.period) {
            case "weekly":
              endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);
              break;
            case "monthly":
              endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate());
              break;
            case "yearly":
              endDate = new Date(startDate.getFullYear() + 1, startDate.getMonth(), startDate.getDate());
              break;
            default:
              endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate());
          }
        }

        // Get spending for this category in the budget period
        const records = await db.record.findMany({
          where: {
            userId,
            category: budget.category,
            date: {
              gte: startDate,
              lte: endDate,
            },
          },
        });

        const spent = records.reduce((sum, record) => sum + record.amount, 0);
        const remaining = Math.max(0, budget.amount - spent);
        const percentage = Math.min(100, (spent / budget.amount) * 100);

        return {
          id: budget.id,
          category: budget.category,
          amount: budget.amount,
          period: budget.period,
          startDate: budget.startDate,
          endDate,
          isActive: budget.isActive,
          spent,
          remaining,
          percentage,
        };
      })
    );

    return { budgets: budgetsWithSpending };
  } catch (error) {
    console.error("Error fetching budgets:", error);
    return { error: "Failed to fetch budgets" };
  }
}

export async function deleteBudget(budgetId: string) {
  const { userId } = await auth();
  
  if (!userId) {
    return { error: "User not authenticated" };
  }

  try {
    await db.budget.update({
      where: {
        id: budgetId,
        userId,
      },
      data: {
        isActive: false,
      },
    });

    revalidatePath("/budgets");
    return { success: true };
  } catch (error) {
    console.error("Error deleting budget:", error);
    return { error: "Failed to delete budget" };
  }
}

export async function getBudgetOverview() {
  const { userId } = await auth();
  
  if (!userId) {
    return { error: "User not authenticated" };
  }

  try {
    const { budgets } = await getBudgets();
    
    if (!budgets) {
      return { error: "Failed to fetch budgets" };
    }

    const totalBudget = budgets.reduce((sum, budget) => sum + budget.amount, 0);
    const totalSpent = budgets.reduce((sum, budget) => sum + (budget.spent || 0), 0);
    const totalRemaining = budgets.reduce((sum, budget) => sum + (budget.remaining || 0), 0);
    
    const overBudgetCategories = budgets.filter(budget => 
      (budget.spent || 0) > budget.amount
    );
    
    const nearLimitCategories = budgets.filter(budget => 
      (budget.percentage || 0) >= 80 && (budget.percentage || 0) < 100
    );

    return {
      totalBudget,
      totalSpent,
      totalRemaining,
      overBudgetCount: overBudgetCategories.length,
      nearLimitCount: nearLimitCategories.length,
      budgets,
    };
  } catch (error) {
    console.error("Error fetching budget overview:", error);
    return { error: "Failed to fetch budget overview" };
  }
}