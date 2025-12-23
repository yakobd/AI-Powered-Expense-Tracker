import { SignIn } from "@clerk/nextjs";
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </div>
          <h1 className="text-3xl font-display font-bold text-neutral-900 dark:text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Sign in to continue managing your expenses
          </p>
        </div>

        {/* Clerk Sign In Component */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600 rounded-3xl blur opacity-20"></div>
          <div className="relative bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl rounded-3xl border border-neutral-200/50 dark:border-neutral-800/50 shadow-2xl p-2">
            <SignIn 
              routing="path"
              path="/sign-in"
              signUpUrl="/sign-up"
            />
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Don't have an account?{" "}
            <a 
              href="/sign-up" 
              className="font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
            >
              Sign up for free
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
