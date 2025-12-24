"use client";

const ContactPage = () => {
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Get in Touch</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-neutral-900 dark:text-white mb-4 leading-tight">
              Contact{" "}
              <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-accent-600 bg-clip-text text-transparent">
                ExpenseTracker AI
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              Have questions about AI-powered expense tracking or need help? We're here to assist you with intelligent financial management.
            </p>
          </div>

          {/* Contact Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="mailto:support@expensetracker-ai.com"
              className="group relative overflow-hidden bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600 hover:from-primary-700 hover:via-accent-600 hover:to-primary-700 text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:shadow-glow transition-all duration-300 transform hover:-translate-y-1"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Send us an Email
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            <a
              href="tel:+11234567890"
              className="group border-2 border-primary-300 dark:border-primary-700 text-primary-700 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-950/50 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:border-primary-400 dark:hover:border-primary-600"
            >
              <span className="flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Us
              </span>
            </a>
          </div>

          {/* Contact Methods Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Email Support */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
              <div className="relative bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl rounded-3xl border border-neutral-200/50 dark:border-neutral-800/50 shadow-2xl p-8 hover:shadow-glow transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 via-primary-600 to-accent-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-neutral-900 dark:text-white">Email Support</h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">24/7 Response</p>
                  </div>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  Get detailed assistance with your questions. We typically respond within 24 hours.
                </p>
                <a
                  href="mailto:support@expensetracker-ai.com"
                  className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors duration-200 break-all"
                >
                  support@expensetracker-ai.com
                </a>
              </div>
            </div>

            {/* Phone Support */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-accent-600 via-primary-500 to-accent-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
              <div className="relative bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl rounded-3xl border border-neutral-200/50 dark:border-neutral-800/50 shadow-2xl p-8 hover:shadow-glow transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-500 via-accent-600 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-neutral-900 dark:text-white">Phone Support</h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">Direct Line</p>
                  </div>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  Speak directly with our support team for immediate assistance with urgent matters.
                </p>
                <a
                  href="tel:+11234567890"
                  className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors duration-200"
                >
                  +1 (123) 456-7890
                </a>
              </div>
            </div>

            {/* Office Location */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
              <div className="relative bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl rounded-3xl border border-neutral-200/50 dark:border-neutral-800/50 shadow-2xl p-8 hover:shadow-glow transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 via-accent-600 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-neutral-900 dark:text-white">Office Location</h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">Visit Us</p>
                  </div>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  Visit our headquarters for in-person consultations and partnership discussions.
                </p>
                <div className="text-primary-600 dark:text-primary-400 font-medium">
                  123 AI Innovation St<br />
                  Tech City, USA
                </div>
              </div>
            </div>
          </div>

          {/* Support Hours */}
          <div className="bg-gradient-to-r from-primary-50/80 to-accent-50/80 dark:from-primary-950/20 dark:to-accent-950/20 rounded-3xl p-8 border border-primary-200/50 dark:border-primary-800/50 backdrop-blur-sm">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-display font-bold text-neutral-900 dark:text-white mb-4">
                Support Hours & Information
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                We're here to help you succeed with ExpenseTracker AI
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/70 dark:bg-neutral-800/70 backdrop-blur-sm rounded-2xl p-6 border border-neutral-200/50 dark:border-neutral-700/50">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Support Hours
                </h3>
                <div className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span className="font-medium">9:00 AM - 6:00 PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="font-medium">10:00 AM - 4:00 PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/70 dark:bg-neutral-800/70 backdrop-blur-sm rounded-2xl p-6 border border-neutral-200/50 dark:border-neutral-700/50">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Quick Help
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-primary-50/50 dark:bg-primary-950/30 rounded-lg">
                    <h4 className="font-semibold text-neutral-900 dark:text-white text-sm mb-1">
                      Technical Issues
                    </h4>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400">
                      App not working properly? Check our troubleshooting guide first.
                    </p>
                  </div>
                  <div className="p-3 bg-accent-50/50 dark:bg-accent-950/30 rounded-lg">
                    <h4 className="font-semibold text-neutral-900 dark:text-white text-sm mb-1">
                      AI Features
                    </h4>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400">
                      Questions about AI insights? Our AI documentation has answers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;