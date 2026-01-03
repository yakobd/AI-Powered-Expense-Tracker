"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { checkUser } from "@/lib/checkUser";

export interface SearchFilters {
  query?: string;
  category?: string;
  minAmount?: number;
  maxAmount?: number;
  startDate?: string;
  endDate?: string;
  sortBy?: "date" | "amount" | "category";
  sortOrder?: "asc" | "desc";
}

export interface SearchResult {
  records: any[];
  totalCount: number;
  totalAmount: number;
  averageAmount: number;
  categoryBreakdown: { [key: string]: { count: number; total: number } };
}

export async function searchExpenses(
  filters: SearchFilters,
  page: number = 1,
  limit: number = 20
): Promise<{ result?: SearchResult; error?: string }> {
  // Ensure user exists in database
  const user = await checkUser();
  
  if (!user) {
    return { error: "User not authenticated" };
  }

  try {
    // Build where clause
    const where: any = { userId: user.clerkUserId };

    // Text search
    if (filters.query) {
      where.text = {
        contains: filters.query,
        mode: 'insensitive'
      };
    }

    // Category filter
    if (filters.category && filters.category !== "all") {
      where.category = filters.category;
    }

    // Amount range
    if (filters.minAmount !== undefined || filters.maxAmount !== undefined) {
      where.amount = {};
      if (filters.minAmount !== undefined) {
        where.amount.gte = filters.minAmount;
      }
      if (filters.maxAmount !== undefined) {
        where.amount.lte = filters.maxAmount;
      }
    }

    // Date range
    if (filters.startDate || filters.endDate) {
      where.date = {};
      if (filters.startDate) {
        where.date.gte = new Date(filters.startDate);
      }
      if (filters.endDate) {
        where.date.lte = new Date(filters.endDate + "T23:59:59.999Z");
      }
    }

    // Build order by clause
    let orderBy: any = { createdAt: "desc" }; // default
    if (filters.sortBy) {
      orderBy = {
        [filters.sortBy]: filters.sortOrder || "desc"
      };
    }

    // Get total count for pagination
    const totalCount = await db.record.count({ where });

    // Get records with pagination
    const records = await db.record.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    });

    // Get all matching records for statistics (without pagination)
    const allMatchingRecords = await db.record.findMany({
      where,
      select: {
        amount: true,
        category: true,
      },
    });

    // Calculate statistics
    const totalAmount = allMatchingRecords.reduce((sum, record) => sum + record.amount, 0);
    const averageAmount = allMatchingRecords.length > 0 ? totalAmount / allMatchingRecords.length : 0;

    // Category breakdown
    const categoryBreakdown: { [key: string]: { count: number; total: number } } = {};
    allMatchingRecords.forEach(record => {
      if (!categoryBreakdown[record.category]) {
        categoryBreakdown[record.category] = { count: 0, total: 0 };
      }
      categoryBreakdown[record.category].count++;
      categoryBreakdown[record.category].total += record.amount;
    });

    return {
      result: {
        records,
        totalCount,
        totalAmount,
        averageAmount,
        categoryBreakdown,
      }
    };
  } catch (error) {
    console.error("Error searching expenses:", error);
    return { error: "Failed to search expenses" };
  }
}

export async function getExpenseCategories(): Promise<{ categories?: string[]; error?: string }> {
  // Ensure user exists in database
  const user = await checkUser();
  
  if (!user) {
    return { error: "User not authenticated" };
  }

  try {
    const categories = await db.record.findMany({
      where: { userId: user.clerkUserId },
      select: { category: true },
      distinct: ['category'],
      orderBy: { category: 'asc' },
    });

    return {
      categories: categories.map(c => c.category)
    };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { error: "Failed to fetch categories" };
  }
}

export async function getExpenseStats(): Promise<{
  stats?: {
    totalExpenses: number;
    totalAmount: number;
    averageAmount: number;
    categoryCounts: { [key: string]: number };
    monthlyTrend: { month: string; amount: number }[];
  };
  error?: string;
}> {
  // Ensure user exists in database
  const user = await checkUser();
  
  if (!user) {
    return { error: "User not authenticated" };
  }

  try {
    const records = await db.record.findMany({
      where: { userId: user.clerkUserId },
      select: {
        amount: true,
        category: true,
        date: true,
      },
      orderBy: { date: 'desc' },
    });

    const totalExpenses = records.length;
    const totalAmount = records.reduce((sum, record) => sum + record.amount, 0);
    const averageAmount = totalExpenses > 0 ? totalAmount / totalExpenses : 0;

    // Category counts
    const categoryCounts: { [key: string]: number } = {};
    records.forEach(record => {
      categoryCounts[record.category] = (categoryCounts[record.category] || 0) + 1;
    });

    // Monthly trend (last 12 months)
    const monthlyTrend: { month: string; amount: number }[] = [];
    const now = new Date();
    
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = date.toISOString().slice(0, 7); // YYYY-MM format
      const monthName = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      
      const monthAmount = records
        .filter(record => record.date.toISOString().slice(0, 7) === monthKey)
        .reduce((sum, record) => sum + record.amount, 0);
      
      monthlyTrend.push({
        month: monthName,
        amount: monthAmount,
      });
    }

    return {
      stats: {
        totalExpenses,
        totalAmount,
        averageAmount,
        categoryCounts,
        monthlyTrend,
      }
    };
  } catch (error) {
    console.error("Error fetching expense stats:", error);
    return { error: "Failed to fetch expense statistics" };
  }
}