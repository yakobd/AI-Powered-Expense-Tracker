import { SignUp } from "@clerk/nextjs";
import ThemeToggle from "@/components/ThemeToggle";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 relative">
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-10">
        <ThemeToggle />
      </div>

      {/* Home Link */}
      <div className="absolute top-6 left-6 z-10">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-xl border border-neutral-200/50 dark:border-neutral-700/50 text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 hover:scale-105"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="hidden sm:inline">Back to Home</span>
        </Link>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400/10 dark:bg-primary-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-400/10 dark:bg-accent-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 via-primary-600 to-accent-600 rounded-2xl shadow-lg mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 className="text-3xl font-display font-bold text-neutral-900 dark:text-white mb-2">
            Create Account
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Join thousands managing their finances smarter
          </p>
        </div>

        {/* Clerk Sign Up Component */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600 rounded-3xl blur opacity-20"></div>
          <div className="relative bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl rounded-3xl border border-neutral-200/50 dark:border-neutral-800/50 shadow-2xl p-2">
            <SignUp 
              routing="path"
              path="/sign-up"
              signInUrl="/sign-in"
            />
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Already have an account?{" "}
            <a 
              href="/sign-in" 
              className="font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
            >
              Sign in here
            </a>
          </p>
        </div>

        {/* Features Preview */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-white/50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200/50 dark:border-neutral-700/50">
            <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/50 rounded-lg flex items-center justify-center mx-auto mb-2">
              <svg className="w-4 h-4 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <p className="text-xs font-medium text-neutral-700 dark:text-neutral-300">AI Insights</p>
          </div>
          <div className="text-center p-3 bg-white/50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200/50 dark:border-neutral-700/50">
            <div className="w-8 h-8 bg-accent-100 dark:bg-accent-900/50 rounded-lg flex items-center justify-center mx-auto mb-2">
              <svg className="w-4 h-4 text-accent-600 dark:text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <p className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Smart Budgets</p>
          </div>
        </div>
      </div>
    </div>
  );
}
