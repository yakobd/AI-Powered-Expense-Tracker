import AddNewRecord from "@/components/AddNewRecord";
import AIInsights from "@/components/AIInsights";
import ExpenseStats from "@/components/ExpenseStats";
import Guest from "@/components/Guest";
import RecordChart from "@/components/RecordChart";
import RecordHistory from "@/components/RecordHistory";
import { currentUser } from "@clerk/nextjs/server";

export default async function HomePage() {
  const user = await currentUser();
  if (!user) {
    return <Guest />;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 dark:from-neutral-950 dark:via-neutral-900 dark:to-primary-950/20">
      {/* Modern Hero Section */}
      <div className="relative overflow-hidden pt-24 lg:pt-32">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-transparent to-accent-50/50 dark:from-primary-950/20 dark:via-transparent dark:to-accent-950/20"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(237,124,74,0.1),transparent_50%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(14,165,233,0.1),transparent_50%)]"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-32 left-10 w-32 h-32 bg-gradient-to-br from-primary-400/20 to-accent-400/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-52 right-20 w-24 h-24 bg-gradient-to-br from-accent-400/20 to-primary-400/20 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
          {/* Welcome Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-3 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm px-6 py-3 rounded-full border border-primary-200/50 dark:border-primary-800/50 mb-6 shadow-lg">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">AI-Powered Financial Intelligence</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-neutral-900 dark:text-white mb-4 leading-tight">
              Welcome back,{" "}
              <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-accent-600 bg-clip-text text-transparent">
                {user.firstName}
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              Your intelligent financial companion is ready to help you make smarter spending decisions
            </p>
          </div>

          {/* Modern Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            {/* Left Column - Add Expense */}
            <div className="lg:col-span-5 space-y-8">
              <div className="animate-slide-up">
                <AddNewRecord />
              </div>
            </div>

            {/* Right Column - Stats & Chart */}
            <div className="lg:col-span-7 space-y-8">
              <div className="animate-slide-up" style={{animationDelay: '0.1s'}}>
                <ExpenseStats />
              </div>
              <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
                <RecordChart />
              </div>
            </div>
          </div>

          {/* Full Width Sections */}
          <div className="space-y-12">
            {/* AI Insights */}
            <div className="animate-slide-up" style={{animationDelay: '0.3s'}}>
              <AIInsights />
            </div>

            {/* Recent Transactions */}
            <div className="animate-slide-up" style={{animationDelay: '0.4s'}}>
              <RecordHistory />
            </div>
          </div>

          {/* Bottom CTA Section */}
          <div className="mt-16 text-center animate-fade-in" style={{animationDelay: '0.5s'}}>
            <div className="bg-gradient-to-r from-primary-500/10 via-accent-500/10 to-primary-500/10 dark:from-primary-500/5 dark:via-accent-500/5 dark:to-primary-500/5 rounded-6xl p-8 border border-primary-200/30 dark:border-primary-800/30 backdrop-blur-sm">
              <h3 className="text-2xl font-display font-bold text-neutral-900 dark:text-white mb-4">
                Take Control of Your Financial Future
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-2xl mx-auto">
                Use AI-powered insights to optimize your spending, set smarter budgets, and achieve your financial goals faster than ever before.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group relative overflow-hidden bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-glow transition-all duration-300 transform hover:-translate-y-1">
                  <span className="relative z-10 flex items-center gap-2">
                    Explore Analytics
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                <button className="group border-2 border-primary-300 dark:border-primary-700 text-primary-700 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-950/50 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:border-primary-400 dark:hover:border-primary-600">
                  <span className="flex items-center gap-2">
                    Set Budget Goals
                    <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}