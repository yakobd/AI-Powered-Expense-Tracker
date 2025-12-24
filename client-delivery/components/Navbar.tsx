"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path: string) => pathname === path;

  const navLinks = [
    { href: "/", label: "Dashboard", icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" },
    { href: "/analytics", label: "Analytics", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
    { href: "/budgets", label: "Budgets", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" },
    { href: "/about", label: "About", icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    { href: "/contact", label: "Contact", icon: "M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border-b border-neutral-200/50 dark:border-neutral-800/50 shadow-lg' 
          : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group transition-all duration-300 hover:scale-105"
            onClick={closeMobileMenu}
            aria-label="ExpenseTracker AI - Go to homepage"
          >
            <div className="relative">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-primary-500 via-primary-600 to-accent-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-glow transition-all duration-300 group-hover:rotate-3">
                <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent-400 rounded-full animate-pulse-glow"></div>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl lg:text-2xl font-display font-bold bg-gradient-to-r from-primary-600 via-primary-500 to-accent-600 bg-clip-text text-transparent">
                ExpenseTracker
              </span>
              <div className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">AI Powered</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActivePath(link.href)
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/50'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-950/30'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} />
                </svg>
                <span>{link.label}</span>
                {isActivePath(link.href) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-500 rounded-full"></div>
                )}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Auth Section */}
            <SignedOut>
              <div className="flex items-center gap-3">
                <Link 
                  href="/sign-up"
                  className="hidden sm:inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors duration-300"
                >
                  Sign Up
                </Link>
                <Link 
                  href="/sign-in"
                  className="group relative overflow-hidden bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white px-4 lg:px-6 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-glow transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    <span className="hidden sm:inline">Sign In</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </div>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center gap-3">
                <div className="hidden lg:block text-right">
                  <div className="text-sm font-medium text-neutral-900 dark:text-white">Welcome back!</div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">Ready to track expenses?</div>
                </div>
                <div className="relative">
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "w-10 h-10 lg:w-12 lg:h-12 rounded-2xl border-2 border-primary-200 dark:border-primary-800 hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-300 hover:scale-105",
                        userButtonBox: "flex items-center justify-center",
                      },
                    }}
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success-400 border-2 border-white dark:border-neutral-900 rounded-full"></div>
                </div>
              </div>
            </SignedIn>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-xl text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950/50 transition-all duration-300"
              aria-label="Toggle mobile menu"
            >
              <svg
                className={`w-6 h-6 transition-transform duration-300 ${isMobileMenuOpen ? "rotate-90" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMobileMenuOpen ? "max-h-96 opacity-100 pb-6" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white/95 dark:bg-neutral-800/95 backdrop-blur-xl rounded-2xl border border-neutral-200/50 dark:border-neutral-700/50 shadow-xl mt-4 p-4">
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActivePath(link.href)
                      ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/50'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-950/30'
                  }`}
                  onClick={closeMobileMenu}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} />
                  </svg>
                  <span>{link.label}</span>
                  {isActivePath(link.href) && (
                    <div className="ml-auto w-2 h-2 bg-primary-500 rounded-full"></div>
                  )}
                </Link>
              ))}
            </div>

            {/* Mobile Auth */}
            <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
              <SignedOut>
                <div className="space-y-3">
                  <Link
                    href="/sign-up"
                    className="w-full bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                    onClick={closeMobileMenu}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Create Account
                  </Link>
                  <Link
                    href="/sign-in"
                    className="w-full bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white px-4 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                    onClick={closeMobileMenu}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Sign In to Continue
                  </Link>
                </div>
              </SignedOut>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}