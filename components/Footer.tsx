import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 dark:from-neutral-950 dark:via-neutral-900 dark:to-primary-950/20 border-t border-neutral-200/50 dark:border-neutral-800/50">
      {/* Gradient accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(237,124,74,0.05),transparent_50%)]"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(14,165,233,0.05),transparent_50%)]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo and Tagline */}
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 via-primary-600 to-accent-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold bg-gradient-to-r from-primary-600 via-primary-500 to-accent-600 bg-clip-text text-transparent">
                  ExpenseTracker
                </h2>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">AI Powered</div>
              </div>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-sm text-sm">
              Intelligent financial management powered by AI. Track your expenses, manage your budget, and gain insights into your spending patterns with cutting-edge technology.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-display font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
              Quick Links
            </h3>
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="group inline-flex items-center gap-3 text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 text-sm font-medium transition-all duration-300"
              >
                <div className="w-6 h-6 bg-neutral-100 dark:bg-neutral-800 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/50 rounded-lg flex items-center justify-center transition-colors duration-300">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  </svg>
                </div>
                Dashboard
              </Link>
              <Link
                href="/analytics"
                className="group inline-flex items-center gap-3 text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 text-sm font-medium transition-all duration-300"
              >
                <div className="w-6 h-6 bg-neutral-100 dark:bg-neutral-800 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/50 rounded-lg flex items-center justify-center transition-colors duration-300">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                Analytics
              </Link>
              <Link
                href="/budgets"
                className="group inline-flex items-center gap-3 text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 text-sm font-medium transition-all duration-300"
              >
                <div className="w-6 h-6 bg-neutral-100 dark:bg-neutral-800 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/50 rounded-lg flex items-center justify-center transition-colors duration-300">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                Budgets
              </Link>
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 text-sm font-medium transition-all duration-300"
              >
                <div className="w-6 h-6 bg-neutral-100 dark:bg-neutral-800 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/50 rounded-lg flex items-center justify-center transition-colors duration-300">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                About
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-display font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
              Key Features
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400 text-sm">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="font-medium">AI-Powered Insights</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400 text-sm">
                <div className="w-8 h-8 bg-gradient-to-br from-accent-500 to-primary-500 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <span className="font-medium">Smart Categorization</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400 text-sm">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-accent-400 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <span className="font-medium">Analytics Dashboard</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400 text-sm">
                <div className="w-8 h-8 bg-gradient-to-br from-accent-600 to-primary-500 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <span className="font-medium">Budget Management</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="relative mb-8">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-700 to-transparent"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-2 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"></div>
        </div>

        {/* Copyright and Credits */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="text-center lg:text-left">
            <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-2">
              © {new Date().getFullYear()} ExpenseTracker AI. All rights reserved.
            </p>
            <p className="text-neutral-400 dark:text-neutral-500 text-xs">
              Built with Next.js, Tailwind CSS, and AI-powered insights
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-950/30 dark:to-accent-950/30 text-primary-700 dark:text-primary-300 px-4 py-2 rounded-xl border border-primary-200/50 dark:border-primary-800/50 text-sm font-medium">
              <div className="w-6 h-6 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span>Made with passion</span>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute bottom-10 left-10 w-16 h-16 bg-gradient-to-br from-primary-400/10 to-accent-400/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-20 right-16 w-12 h-12 bg-gradient-to-br from-accent-400/10 to-primary-400/10 rounded-full blur-xl animate-float" style={{animationDelay: '3s'}}></div>
      </div>
    </footer>
  );
};

export default Footer;
