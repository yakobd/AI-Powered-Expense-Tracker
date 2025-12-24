import getRecords from "@/app/actions/getRecords";
import RecordItem from "./RecordItem";
import { Record } from "@/types/Record";

const RecordHistory = async () => {
  const { records, error } = await getRecords();

  if (error) {
    return (
      <div className="relative group">
        {/* Background Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-error-600 via-warning-500 to-error-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
        
        <div className="relative bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl rounded-3xl border border-neutral-200/50 dark:border-neutral-800/50 shadow-2xl p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-error-500 via-error-600 to-warning-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-warning-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold text-neutral-900 dark:text-white">
                Expense History
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                Your spending timeline
              </p>
            </div>
          </div>
          
          <div className="bg-error-50/80 dark:bg-error-950/20 backdrop-blur-sm rounded-2xl border border-error-200/50 dark:border-error-800/50 p-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-error-100 dark:bg-error-800 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-error-600 dark:text-error-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-error-800 dark:text-error-200 mb-1">
                  Error loading expense history
                </p>
                <p className="text-error-600 dark:text-error-400 text-sm">{error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!records || records.length === 0) {
    return (
      <div className="relative group">
        {/* Background Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
        
        <div className="relative bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl rounded-3xl border border-neutral-200/50 dark:border-neutral-800/50 shadow-2xl p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 via-primary-600 to-accent-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold text-neutral-900 dark:text-white">
                Expense History
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                Your spending timeline
              </p>
            </div>
          </div>
          
          <div className="text-center py-12">
            <div className="relative mx-auto mb-6 w-20 h-20">
              <div className="w-20 h-20 bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 rounded-3xl flex items-center justify-center shadow-lg">
                <svg className="w-10 h-10 text-neutral-400 dark:text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
            </div>
            <h4 className="text-xl font-display font-bold text-neutral-800 dark:text-neutral-200 mb-3">
              No Expense Records Found
            </h4>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-md mx-auto leading-relaxed">
              Start tracking your expenses to see your spending history and patterns displayed here.
            </p>
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
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 via-primary-600 to-accent-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent-400 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold text-neutral-900 dark:text-white">
              Expense History
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
              Your spending timeline
            </p>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-neutral-50/50 to-primary-50/30 dark:from-neutral-800/50 dark:to-primary-950/30 rounded-2xl p-4 border border-neutral-200/30 dark:border-neutral-700/30">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {records.map((record: Record) => (
              <RecordItem key={record.id} record={record} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordHistory;
