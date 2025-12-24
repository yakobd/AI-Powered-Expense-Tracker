import OpenAI from "openai";

interface RawInsight {
  type?: string;
  title?: string;
  message?: string;
  action?: string;
  confidence?: number;
}

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    "X-Title": "ExpenseTracker AI",
  },
});

export interface ExpenseRecord {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

export interface AIInsight {
  id: string;
  type: "warning" | "info" | "success" | "tip";
  title: string;
  message: string;
  action?: string;
  confidence: number;
}

export async function generateExpenseInsights(
  expenses: ExpenseRecord[]
): Promise<AIInsight[]> {
  try {
    console.log(`🤖 Generating AI insights for ${expenses.length} expenses`);

    // If no expenses, return helpful starter insights
    if (expenses.length === 0) {
      return [
        {
          id: "starter-1",
          type: "info",
          title: "Welcome to AI Insights!",
          message: "Start adding expenses to get personalized financial insights.",
          action: "Add your first expense",
          confidence: 1.0,
        },
        {
          id: "starter-2",
          type: "tip",
          title: "Track Daily",
          message: "Regular expense tracking helps AI provide better insights.",
          action: "Learn tracking tips",
          confidence: 1.0,
        },
      ];
    }

    // Generate rule-based insights first (always reliable)
    const ruleBasedInsights = generateRuleBasedInsights(expenses);

    // Try AI insights as enhancement
    let aiInsights: AIInsight[] = [];
    try {
      // Prepare expense data for AI analysis (limit to prevent token overflow)
      const recentExpenses = expenses.slice(0, 20);
      const expensesSummary = recentExpenses.map((expense) => ({
        amount: expense.amount,
        category: expense.category,
        description: expense.description.slice(0, 50), // Limit description length
        date: expense.date.split('T')[0], // Just date, not time
      }));

      // Calculate basic stats for context
      const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);
      const avgAmount = totalAmount / expenses.length;
      const categories = [...new Set(expenses.map(exp => exp.category))];

      const prompt = `Analyze expenses and provide 1-2 brief financial insights:

Total: $${totalAmount.toFixed(2)}, Average: $${avgAmount.toFixed(2)}
Categories: ${categories.join(', ')}
Recent expenses: ${JSON.stringify(expensesSummary.slice(0, 10))}

Return ONLY a JSON array with this exact format:
[{"type":"tip","title":"Short Title","message":"Brief insight under 80 chars","action":"Action under 40 chars","confidence":0.8}]

Types: "warning", "info", "success", "tip"
Keep titles under 25 chars, messages under 80 chars, actions under 40 chars.`;

      const completion = await openai.chat.completions.create({
        model: "meta-llama/llama-3.2-3b-instruct:free",
        messages: [
          {
            role: "system",
            content: "You are a financial advisor. Return ONLY valid JSON arrays. Be concise and helpful.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.2,
        max_tokens: 300,
      });

      const response = completion.choices[0].message.content;
      if (response && response.trim().length > 0) {
        // Enhanced JSON cleaning
        let cleanedResponse = response.trim();
        
        // Remove markdown code blocks
        cleanedResponse = cleanedResponse.replace(/^```json\s*/, "").replace(/\s*```$/, "");
        cleanedResponse = cleanedResponse.replace(/^```\s*/, "").replace(/\s*```$/, "");
        
        // Extract JSON array
        const firstBracket = cleanedResponse.indexOf('[');
        const lastBracket = cleanedResponse.lastIndexOf(']');
        
        if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
          cleanedResponse = cleanedResponse.substring(firstBracket, lastBracket + 1);
        }
        
        // Fix common JSON issues
        cleanedResponse = cleanedResponse
          .replace(/'/g, '"')
          .replace(/,\s*}/g, '}')
          .replace(/,\s*]/g, ']')
          .replace(/\n/g, ' ')
          .replace(/\r/g, '')
          .replace(/\t/g, ' ');

        try {
          let insights = JSON.parse(cleanedResponse);
          if (!Array.isArray(insights)) {
            insights = [insights];
          }

          // Validate and format AI insights
          aiInsights = insights
            .filter((insight: any) => insight && insight.title && insight.message)
            .slice(0, 2) // Limit to 2 AI insights
            .map((insight: RawInsight, index: number) => ({
              id: `ai-${Date.now()}-${index}`,
              type: (["warning", "info", "success", "tip"].includes(insight.type || "") 
                    ? (insight.type as "warning" | "info" | "success" | "tip") 
                    : "tip"),
              title: (insight.title || "AI Insight").slice(0, 30),
              message: (insight.message || "Analysis complete").slice(0, 100),
              action: insight.action ? insight.action.slice(0, 50) : undefined,
              confidence: Math.min(Math.max(insight.confidence || 0.7, 0.5), 1.0),
            }));

          console.log(`✅ Generated ${aiInsights.length} AI insights successfully`);
        } catch (parseError) {
          console.error("❌ JSON Parse Error:", parseError);
          console.error("Cleaned Response:", cleanedResponse);
        }
      }
    } catch (aiError) {
      console.error("❌ AI insights generation failed:", aiError);
    }

    // Combine rule-based and AI insights, prioritizing rule-based for reliability
    const allInsights = [...ruleBasedInsights, ...aiInsights];
    
    // Return up to 4 insights total
    return allInsights.slice(0, 4);

  } catch (error) {
    console.error("❌ Error generating expense insights:", error);

    // Fallback to basic rule-based insights
    return generateRuleBasedInsights(expenses);
  }
}

// Generate reliable rule-based insights
function generateRuleBasedInsights(expenses: ExpenseRecord[]): AIInsight[] {
  const insights: AIInsight[] = [];
  
  if (expenses.length === 0) {
    return [
      {
        id: "rule-empty",
        type: "info",
        title: "Start Tracking",
        message: "Add your first expense to begin getting insights.",
        action: "Add expense",
        confidence: 1.0,
      },
    ];
  }

  // Calculate basic statistics
  const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const avgAmount = totalAmount / expenses.length;
  
  // Category analysis
  const categoryTotals: { [key: string]: number } = {};
  expenses.forEach(exp => {
    categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
  });
  
  const topCategory = Object.entries(categoryTotals)
    .sort(([,a], [,b]) => b - a)[0];

  // High spending insight
  if (avgAmount > 50) {
    insights.push({
      id: "rule-high-avg",
      type: "warning",
      title: "High Average Spending",
      message: `Your average expense is $${avgAmount.toFixed(2)}. Consider budgeting.`,
      action: "Create budget",
      confidence: 0.9,
    });
  }

  // Top category insight
  if (topCategory && categoryTotals[topCategory[0]] > totalAmount * 0.4) {
    insights.push({
      id: "rule-top-category",
      type: "info",
      title: `${topCategory[0]} Focus`,
      message: `${topCategory[0]} is ${((categoryTotals[topCategory[0]] / totalAmount) * 100).toFixed(0)}% of your spending.`,
      action: "Review category",
      confidence: 0.95,
    });
  }

  // Recent activity insight
  const recentExpenses = expenses.filter(exp => {
    const expDate = new Date(exp.date);
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    return expDate >= threeDaysAgo;
  });

  if (recentExpenses.length > 5) {
    insights.push({
      id: "rule-active",
      type: "success",
      title: "Active Tracking",
      message: `Great job! You've logged ${recentExpenses.length} expenses recently.`,
      action: "Keep it up",
      confidence: 1.0,
    });
  }

  // Small expenses insight
  const smallExpenses = expenses.filter(exp => exp.amount < 10);
  if (smallExpenses.length > expenses.length * 0.6) {
    insights.push({
      id: "rule-small",
      type: "tip",
      title: "Small Expenses Add Up",
      message: `${smallExpenses.length} small purchases total $${smallExpenses.reduce((sum, exp) => sum + exp.amount, 0).toFixed(2)}.`,
      action: "Review small purchases",
      confidence: 0.8,
    });
  }

  return insights.slice(0, 2); // Return up to 2 rule-based insights
}

export async function categorizeExpense(description: string): Promise<string> {
  try {
    // Define valid categories that match the UI
    const validCategories = [
      "Food",
      "Transportation",
      "Shopping",
      "Entertainment",
      "Bills",
      "Healthcare",
      "Other",
    ];

    // First, try simple keyword matching for common cases
    const descLower = description.toLowerCase();
    
    // Food keywords
    if (descLower.includes('coffee') || descLower.includes('restaurant') || 
        descLower.includes('food') || descLower.includes('lunch') || 
        descLower.includes('dinner') || descLower.includes('breakfast') ||
        descLower.includes('starbucks') || descLower.includes('mcdonalds') ||
        descLower.includes('grocery') || descLower.includes('takeout') ||
        descLower.includes('pizza') || descLower.includes('burger')) {
      return "Food";
    }
    
    // Transportation keywords
    if (descLower.includes('gas') || descLower.includes('fuel') || 
        descLower.includes('uber') || descLower.includes('taxi') ||
        descLower.includes('bus') || descLower.includes('train') ||
        descLower.includes('parking') || descLower.includes('car') ||
        descLower.includes('transport')) {
      return "Transportation";
    }
    
    // Shopping keywords
    if (descLower.includes('amazon') || descLower.includes('target') ||
        descLower.includes('walmart') || descLower.includes('clothes') ||
        descLower.includes('shopping') || descLower.includes('store') ||
        descLower.includes('purchase') || descLower.includes('buy')) {
      return "Shopping";
    }
    
    // Entertainment keywords
    if (descLower.includes('movie') || descLower.includes('netflix') ||
        descLower.includes('spotify') || descLower.includes('game') ||
        descLower.includes('concert') || descLower.includes('entertainment')) {
      return "Entertainment";
    }
    
    // Bills keywords
    if (descLower.includes('electric') || descLower.includes('water') ||
        descLower.includes('internet') || descLower.includes('phone') ||
        descLower.includes('rent') || descLower.includes('insurance') ||
        descLower.includes('bill') || descLower.includes('utility')) {
      return "Bills";
    }
    
    // Healthcare keywords
    if (descLower.includes('doctor') || descLower.includes('pharmacy') ||
        descLower.includes('medicine') || descLower.includes('hospital') ||
        descLower.includes('dental') || descLower.includes('health')) {
      return "Healthcare";
    }

    // If no keyword match, use AI
    const completion = await openai.chat.completions.create({
      model: "meta-llama/llama-3.2-3b-instruct:free",
      messages: [
        {
          role: "system",
          content: `You are an expense categorization AI. You must categorize expenses into exactly one of these categories:

Food - restaurants, groceries, coffee, takeout, dining
Transportation - gas, uber, taxi, bus, parking, car expenses  
Shopping - clothes, electronics, retail purchases, amazon
Entertainment - movies, streaming, games, concerts, fun activities
Bills - utilities, rent, phone, internet, insurance, recurring payments
Healthcare - doctor visits, pharmacy, medicine, medical expenses
Other - anything that doesn't fit the above categories

IMPORTANT: Respond with ONLY the exact category name from the list above. No explanations, no extra text.`,
        },
        {
          role: "user",
          content: `Categorize: "${description}"`,
        },
      ],
      temperature: 0.1,
      max_tokens: 10,
    });

    const response = completion.choices[0].message.content?.trim();
    
    if (!response) {
      console.error("❌ Empty response from categorization AI");
      return "Other";
    }

    // Clean the response and extract just the category name
    let cleanResponse = response
      .split('\n')[0]
      .split('.')[0]
      .split(',')[0]
      .trim()
      .replace(/['"]/g, ''); // Remove quotes

    // Handle common AI response variations
    if (cleanResponse.toLowerCase().includes('food')) cleanResponse = 'Food';
    else if (cleanResponse.toLowerCase().includes('transport')) cleanResponse = 'Transportation';
    else if (cleanResponse.toLowerCase().includes('shop')) cleanResponse = 'Shopping';
    else if (cleanResponse.toLowerCase().includes('entertain')) cleanResponse = 'Entertainment';
    else if (cleanResponse.toLowerCase().includes('bill')) cleanResponse = 'Bills';
    else if (cleanResponse.toLowerCase().includes('health')) cleanResponse = 'Healthcare';

    // Check if response matches any valid category (case insensitive)
    const matchedCategory = validCategories.find(
      cat => cat.toLowerCase() === cleanResponse.toLowerCase()
    );

    const result = matchedCategory || "Other";
    console.log(`🤖 AI Categorization: "${description}" → "${result}"`);
    return result;

  } catch (error) {
    console.error("❌ Error categorizing expense:", error);
    return "Other";
  }
}

export async function generateAIAnswer(
  question: string,
  context: ExpenseRecord[]
): Promise<string> {
  try {
    console.log(`🤖 Generating AI answer for: "${question}"`);

    // Provide rule-based answers for common questions first
    const ruleBasedAnswer = generateRuleBasedAnswer(question, context);
    if (ruleBasedAnswer) {
      console.log("✅ Using rule-based answer");
      return ruleBasedAnswer;
    }

    // Prepare context data (limit to prevent token overflow)
    const recentExpenses = context.slice(0, 15);
    const totalAmount = context.reduce((sum, exp) => sum + exp.amount, 0);
    const avgAmount = totalAmount / context.length;
    const categories = [...new Set(context.map(exp => exp.category))];

    const expensesSummary = recentExpenses.map((expense) => ({
      amount: expense.amount,
      category: expense.category,
      description: expense.description.slice(0, 30),
      date: expense.date.split('T')[0],
    }));

    const prompt = `Question: "${question}"

Context:
- Total expenses: $${totalAmount.toFixed(2)}
- Average: $${avgAmount.toFixed(2)}
- Categories: ${categories.join(', ')}
- Recent expenses: ${JSON.stringify(expensesSummary.slice(0, 8))}

Provide a helpful 2-3 sentence answer with specific advice based on the data.`;

    const completion = await openai.chat.completions.create({
      model: "meta-llama/llama-3.2-3b-instruct:free",
      messages: [
        {
          role: "system",
          content: "You are a helpful financial advisor. Provide specific, actionable advice in 2-3 sentences based on the expense data.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.5,
      max_tokens: 150,
    });

    const response = completion.choices[0].message.content;
    if (!response || response.trim().length === 0) {
      throw new Error("No response from AI");
    }

    console.log("✅ AI answer generated successfully");
    return response.trim();

  } catch (error) {
    console.error("❌ Error generating AI answer:", error);
    
    // Fallback to rule-based answer
    const fallbackAnswer = generateRuleBasedAnswer(question, context);
    if (fallbackAnswer) {
      return fallbackAnswer;
    }
    
    return "I'm having trouble analyzing your data right now. Please try again in a moment, or check if you have recent expenses recorded.";
  }
}

// Generate rule-based answers for common questions
function generateRuleBasedAnswer(question: string, context: ExpenseRecord[]): string | null {
  const questionLower = question.toLowerCase();
  
  if (context.length === 0) {
    return "You don't have any expenses recorded yet. Start by adding some expenses to get personalized insights and answers.";
  }

  const totalAmount = context.reduce((sum, exp) => sum + exp.amount, 0);
  const avgAmount = totalAmount / context.length;
  
  // Category analysis
  const categoryTotals: { [key: string]: number } = {};
  context.forEach(exp => {
    categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
  });
  
  const topCategory = Object.entries(categoryTotals)
    .sort(([,a], [,b]) => b - a)[0];

  // Budget-related questions
  if (questionLower.includes('budget') || questionLower.includes('limit')) {
    return `Based on your spending of $${totalAmount.toFixed(2)} across ${context.length} expenses, I'd suggest setting a monthly budget of $${(totalAmount * 1.1).toFixed(2)}. Your top spending category is ${topCategory[0]} at $${topCategory[1].toFixed(2)}.`;
  }

  // Spending pattern questions
  if (questionLower.includes('spending') || questionLower.includes('pattern')) {
    const percentage = ((categoryTotals[topCategory[0]] / totalAmount) * 100).toFixed(0);
    return `Your spending pattern shows ${topCategory[0]} as your largest expense category (${percentage}% of total). Your average expense is $${avgAmount.toFixed(2)}. Consider tracking daily to identify trends.`;
  }

  // Saving questions
  if (questionLower.includes('save') || questionLower.includes('reduce')) {
    const smallExpenses = context.filter(exp => exp.amount < 15);
    const smallTotal = smallExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    return `You could save by reviewing small purchases: ${smallExpenses.length} expenses under $15 total $${smallTotal.toFixed(2)}. Also focus on ${topCategory[0]} spending which is your largest category.`;
  }

  // Category questions
  if (questionLower.includes('category') || questionLower.includes('food') || questionLower.includes('transport')) {
    return `Your top spending categories are: ${Object.entries(categoryTotals)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([cat, amount]) => `${cat} ($${amount.toFixed(2)})`)
      .join(', ')}. Focus on the highest ones for potential savings.`;
  }

  return null; // No rule-based answer available
}
