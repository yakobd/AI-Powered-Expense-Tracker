import Link from "next/link";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 dark:from-neutral-950 dark:via-neutral-900 dark:to-primary-950/20 text-neutral-800 dark:text-neutral-200 transition-all duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden flex flex-col items-center justify-center text-center pt-32 lg:pt-40 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 md:px-8 bg-gradient-to-br from-primary-500/10 via-accent-500/5 to-primary-500/10 dark:from-primary-900/30 dark:via-accent-900/20 dark:to-primary-900/30">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-transparent to-accent-50/50 dark:from-primary-950/20 dark:via-transparent dark:to-accent-950/20"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(237,124,74,0.1),transparent_50%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(14,165,233,0.1),transparent_50%)]"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-32 left-10 w-32 h-32 bg-gradient-to-br from-primary-400/20 to-accent-400/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-52 right-20 w-24 h-24 bg-gradient-to-br from-accent-400/20 to-primary-400/20 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
        
        <div className="relative z-10 max-w-4xl mx-auto w-full">
          <div className="inline-flex items-center gap-3 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm px-6 py-3 rounded-full border border-primary-200/50 dark:border-primary-800/50 mb-6 shadow-lg">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Powered by AI Technology</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold mb-4 sm:mb-6 text-neutral-900 dark:text-neutral-100 leading-tight">
            About{" "}
            <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-accent-600 bg-clip-text text-transparent">
              ExpenseTracker AI
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
            Your intelligent companion for tracking expenses and managing your
            finances with cutting-edge AI-powered insights.
          </p>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 justify-center px-2 sm:px-0">
            <Link
              href="/sign-up"
              className="group relative overflow-hidden bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600 hover:from-primary-700 hover:via-accent-600 hover:to-primary-700 text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:shadow-glow transition-all duration-300 transform hover:-translate-y-1"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Start Your Journey
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link
              href="/contact"
              className="group border-2 border-primary-300 dark:border-primary-700 text-primary-700 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-950/50 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:border-primary-400 dark:hover:border-primary-600"
            >
              <span className="flex items-center justify-center gap-2">
                Learn More
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500"></div>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-primary-50 dark:bg-primary-950/30 text-primary-700 dark:text-primary-300 px-4 py-2 rounded-xl border border-primary-200/50 dark:border-primary-800/50 text-sm font-medium mb-6 shadow-lg">
              <div className="w-2 h-2 bg-primary-500 dark:bg-primary-400 rounded-full"></div>
              Our Mission
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 text-neutral-900 dark:text-neutral-100">
              Transforming Financial Management with{" "}
              <span className="text-primary-600 dark:text-primary-400">AI</span>
            </h2>
            <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-3xl mx-auto">
              At ExpenseTracker AI, we leverage cutting-edge artificial
              intelligence to revolutionize how individuals achieve financial
              wellness. Our AI analyzes your spending patterns to deliver
              personalized recommendations and actionable insights.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-950/30 dark:to-accent-950/30 p-8 rounded-3xl border border-primary-200/50 dark:border-primary-800/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                10K+
              </div>
              <div className="text-neutral-600 dark:text-neutral-400 font-medium">
                Active Users
              </div>
            </div>
            <div className="bg-gradient-to-br from-accent-50 to-primary-50 dark:from-accent-950/30 dark:to-primary-950/30 p-8 rounded-3xl border border-accent-200/50 dark:border-accent-800/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl font-bold text-accent-600 dark:text-accent-400 mb-2">
                $2M+
              </div>
              <div className="text-neutral-600 dark:text-neutral-400 font-medium">
                Money Tracked
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-950/30 dark:to-accent-950/30 p-8 rounded-3xl border border-primary-200/50 dark:border-primary-800/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                99%
              </div>
              <div className="text-neutral-600 dark:text-neutral-400 font-medium">
                Satisfaction Rate
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-8 bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 dark:from-neutral-950 dark:via-neutral-900 dark:to-primary-950/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-accent-50 dark:bg-accent-950/30 text-accent-700 dark:text-accent-300 px-4 py-2 rounded-xl border border-accent-200/50 dark:border-accent-800/50 text-sm font-medium mb-6 shadow-lg">
              <div className="w-2 h-2 bg-accent-500 dark:bg-accent-400 rounded-full"></div>
              Features
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-neutral-900 dark:text-neutral-100">
              Why Choose{" "}
              <span className="text-primary-600 dark:text-primary-400">
                ExpenseTracker AI?
              </span>
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Discover the powerful features that make our AI-driven platform
              the smart choice for modern financial management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "AI-Powered Insights",
                description: "Get intelligent analysis of your spending patterns with personalized AI recommendations and automated category suggestions that learn from your behavior."
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
                title: "Smart Categorization",
                description: "Let our AI automatically categorize your expenses with 99% accuracy and provide tailored recommendations to enhance your budget management effortlessly."
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                title: "Intelligent Dashboard",
                description: "Experience a modern, AI-enhanced interface with real-time insights, interactive financial analytics, and beautiful visualizations that make sense of your data."
              }
            ].map((feature, index) => (
              <div key={index} className="group relative bg-white/90 dark:bg-neutral-800/90 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-neutral-200/50 dark:border-neutral-700/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-500 via-primary-600 to-accent-600 rounded-2xl flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-display font-bold mb-4 text-neutral-900 dark:text-neutral-100">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-8 bg-gradient-to-br from-primary-500/10 via-accent-500/5 to-primary-500/10 dark:from-primary-900/30 dark:via-accent-900/20 dark:to-primary-900/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(237,124,74,0.1),transparent_50%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(14,165,233,0.1),transparent_50%)]"></div>
        </div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-3 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm px-6 py-3 rounded-full border border-primary-200/50 dark:border-primary-800/50 mb-6 shadow-lg">
            <div className="w-2 h-2 bg-primary-500 dark:bg-primary-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Ready to Transform Your Finances?</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight text-neutral-900 dark:text-neutral-100">
            Take Control of Your{" "}
            <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-accent-600 bg-clip-text text-transparent">
              Financial Future
            </span>
          </h2>

          <p className="text-xl md:text-2xl mb-10 text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Join thousands of users who have already transformed their financial
            habits with ExpenseTracker AI.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/sign-up"
              className="group relative overflow-hidden bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600 hover:from-primary-700 hover:via-accent-600 hover:to-primary-700 text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:shadow-glow transition-all duration-300 transform hover:-translate-y-1"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started Free
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>

            <Link
              href="/contact"
              className="group border-2 border-primary-300 dark:border-primary-700 text-primary-700 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-950/50 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:border-primary-400 dark:hover:border-primary-600 flex items-center gap-2"
            >
              Contact Us
              <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                Free
              </div>
              <div className="text-neutral-600 dark:text-neutral-400">
                No credit card required
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-600 dark:text-accent-400 mb-2">
                24/7
              </div>
              <div className="text-neutral-600 dark:text-neutral-400">
                AI-powered support
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                Instant
              </div>
              <div className="text-neutral-600 dark:text-neutral-400">
                Setup in minutes
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
