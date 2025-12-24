# AI-Powered Expense Tracker

A modern, intelligent expense tracking application built with Next.js, featuring AI-powered insights, budget management, and comprehensive analytics.

## Features

- 🤖 **AI-Powered Insights**: Get intelligent analysis of your spending patterns
- 📊 **Advanced Analytics**: Visualize your expenses with interactive charts
- 💰 **Budget Management**: Set and track budgets with smart notifications
- 🔍 **Smart Search**: Find expenses quickly with advanced filtering
- 🎨 **Modern UI**: Clean, responsive design with dark/light theme support
- 🔐 **Secure Authentication**: Powered by Clerk for robust user management
- 📱 **Mobile Responsive**: Works seamlessly on all devices

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (Neon)
- **Authentication**: Clerk
- **AI**: OpenRouter API
- **Charts**: Recharts
- **UI Components**: Radix UI, Shadcn/ui

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database (Neon recommended)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yakobd/Expense-Tracker-AI-Powered-Project.git
cd expense-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Fill in your environment variables:
- `DATABASE_URL`: Your PostgreSQL connection string
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Clerk publishable key
- `CLERK_SECRET_KEY`: Clerk secret key
- `OPENROUTER_API_KEY`: OpenRouter API key for AI features

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Usage

1. **Sign Up/Sign In**: Create an account or sign in using Clerk authentication
2. **Add Expenses**: Record your expenses with categories and descriptions
3. **View Analytics**: Analyze your spending patterns with interactive charts
4. **Set Budgets**: Create and manage budgets for different categories
5. **AI Insights**: Get intelligent recommendations and insights about your spending
6. **Search & Filter**: Find specific expenses using the advanced search functionality

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── actions/           # Server actions
│   ├── analytics/         # Analytics page
│   ├── budgets/          # Budget management
│   └── ...
├── components/            # React components
│   ├── ui/               # UI components
│   ├── analytics/        # Analytics components
│   └── ...
├── lib/                  # Utility functions
├── prisma/              # Database schema and migrations
├── types/               # TypeScript type definitions
└── ...
```

## Contributing

This is a client project. For any modifications or enhancements, please contact the development team.

## License

This project is proprietary and confidential.
