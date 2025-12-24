import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import BudgetDashboard from "@/components/budgets/BudgetDashboard";
import BudgetForm from "@/components/budgets/BudgetForm";
import BudgetList from "@/components/budgets/BudgetList";

export default async function BudgetsPage() {
  const user = await currentUser();
  
  if (!user) {
    redirect("/sign-in");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 dark:from-neutral-950 dark:via-neutral-900 dark:to-primary-950/20 text-neutral-800 dark:text-neutral-200 transition-all duration-300">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-transparent to-accent-50/50 dark:from-primary-950/20 dark:via-transparent dark:to-accent-950/20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(237,124,74,0.1),transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(14,165,233,0.1),transparent_50%)]"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-32 left-10 w-32 h-32 bg-gradient-to-br from-primary-400/20 to-accent-400/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute top-52 right-20 w-24 h-24 bg-gradient-to-br from-accent-400/20 to-primary-400/20 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 lg:pt-40 pb-8 sm:pb-12 lg:pb-16">
        {/* Page Header */}
        <header className="mb-8 sm:mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-500 via-primary-600 to-accent-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent-400 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-neutral-900 dark:text-neutral-100 leading-tight">
                Budget Management
              </h1>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mt-2">
                Set budgets, track spending, and stay on top of your finances
              </p>
            </div>
          </div>
        </header>

        {/* Budget Overview Dashboard */}
        <div className="mb-8 sm:mb-12">
          <BudgetDashboard />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Budget Form */}
          <div className="lg:col-span-1">
            <BudgetForm />
          </div>

          {/* Budget List */}
          <div className="lg:col-span-2">
            <BudgetList />
          </div>
        </div>
      </div>
    </main>
  );
}