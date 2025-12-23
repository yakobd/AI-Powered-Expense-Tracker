import getUserRecord from "@/app/actions/getUserRecord";
import getBestWorstExpense from "@/app/actions/getBestWorstExpense";

const ExpenseStats = async () => {
  try {
    const [userRecordResult, rangeResult] = await Promise.all([
      getUserRecord(),
      getBestWorstExpense(),
    ]);

    const { record, daysWithRecords } = userRecordResult;
    const { bestExpense, worstExpense } = rangeResult;

    const validRecord = record || 0;
    const validDays = daysWithRecords && daysWithRecords > 0 ? daysWithRecords : 1;
    const averageExpense = validRecord / validDays;

    const stats = [
      {
        title: "Daily Average",
        value: `$${averageExpense.toFixed(2)}`,
        subtitle: `Based on ${validDays} ${validDays === 1 ? 'day' : 'days'}`,
        icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
        gradient: "from-primary-500 to-accent-500",
        bgGradient: "from-primary-50 to-accent-50 dark:from-primary-950/50 dark:to-accent-950/50",
        textColor: "text-primary-700 dark:text-primary-300"
      },
      {
        title: "Highest Expense",
        value: bestExpense !== undefined ? `$${bestExpense}` : "No data",
        subtitle: "Maximum single expense",
        icon: "M5 10l7-7m0 0l7 7m-7-7v18",
        gradient: "from-error-500 to-warning-500",
        bgGradient: "from-error-50 to-warning-50 dark:from-error-950/50 dark:to-warning-950/50",
        textColor: "text-error-700 dark:text-error-300"
      },
      {
        title: "Lowest Expense",
        value: worstExpense !== undefined ? `$${worstExpense}` : "No data",
        subtitle: "Minimum single expense",
        icon: "M19 14l-7 7m0 0l-7-7m7 7V3",
        gradient: "from-success-500 to-primary-500",
        bgGradient: "from-success-50 to-primary-50 dark:from-success-950/50 dark:to-primary-950/50",
        textColor: "text-success-700 dark:text-success-300"
      }
    ];

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 via-primary-600 to-accent-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent-400 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold text-neutral-900 dark:text-white">
              Expense Statistics
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
              Your spending insights and patterns
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <div
              key={stat.title}
              className="group relative overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background Glow */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.gradient} rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000`}></div>
              
              <div className={`relative bg-gradient-to-br ${stat.bgGradient} backdrop-blur-xl rounded-2xl border border-neutral-200/50 dark:border-neutral-800/50 p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
                {/* Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                    </svg>
                  </div>
                  <div className="w-2 h-2 bg-current rounded-full opacity-50"></div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">
                    {stat.title}
                  </h3>
                  <div className={`text-2xl lg:text-3xl font-bold ${stat.textColor}`}>
                    {stat.value}
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-500">
                    {stat.subtitle}
                  </p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-10 translate-x-10 group-hover:scale-110 transition-transform duration-500"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-white/5 to-transparent rounded-full translate-y-8 -translate-x-8 group-hover:scale-110 transition-transform duration-500"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Insights */}
        <div className="bg-gradient-to-r from-neutral-50 via-white to-neutral-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 rounded-2xl border border-neutral-200/50 dark:border-neutral-800/50 p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-accent-500 to-primary-500 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Quick Insights</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              <span>Total tracked days: <strong className="text-neutral-900 dark:text-white">{validDays}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
              <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
              <span>Total expenses: <strong className="text-neutral-900 dark:text-white">${validRecord.toFixed(2)}</strong></span>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching expense statistics:", error);
    return (
      <div className="bg-error-50/80 dark:bg-error-950/20 backdrop-blur-xl rounded-2xl border border-error-200/50 dark:border-error-800/50 p-6 shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-error-500 to-warning-500 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-error-800 dark:text-error-200">
              Unable to Load Statistics
            </h2>
            <p className="text-error-600 dark:text-error-400 text-sm">
              Please try refreshing the page
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export default ExpenseStats;