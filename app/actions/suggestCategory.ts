"use server";

import { categorizeExpense } from "@/lib/ai";

export async function suggestCategory(
  description: string
): Promise<{ category: string; error?: string }> {
  try {
    if (!description || description.trim().length < 2) {
      console.log("⚠️ Description too short for AI analysis:", description);
      return {
        category: "Other",
        error: "Description too short for AI analysis (minimum 2 characters)",
      };
    }

    if (description.trim().length > 200) {
      console.log("⚠️ Description too long for AI analysis:", description.length);
      return {
        category: "Other",
        error: "Description too long for AI analysis (maximum 200 characters)",
      };
    }

    console.log("🤖 Starting AI categorization for:", description.trim());
    const category = await categorizeExpense(description.trim());
    
    // Validate that we got a proper category
    const validCategories = [
      "Food",
      "Transportation", 
      "Shopping",
      "Entertainment",
      "Bills",
      "Healthcare",
      "Other"
    ];
    
    if (!validCategories.includes(category)) {
      console.warn("⚠️ AI returned invalid category:", category, "defaulting to Other");
      return { category: "Other" };
    }
    
    console.log("✅ AI categorization successful:", description.trim(), "→", category);
    return { category };
  } catch (error) {
    console.error("❌ Error in suggestCategory server action:", error);
    return {
      category: "Other",
      error: "Unable to suggest category at this time. Please try again.",
    };
  }
}
