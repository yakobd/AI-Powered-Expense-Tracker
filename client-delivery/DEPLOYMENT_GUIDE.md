# AI-Powered Expense Tracker - Deployment Guide

## Quick Setup Instructions

### 1. Prerequisites
- Node.js 18+ installed
- PostgreSQL database (recommended: Neon.tech)
- Clerk account for authentication
- OpenRouter account for AI features

### 2. Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   Fill in your environment variables in the `.env` file.

3. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

### 3. Required Environment Variables

- **DATABASE_URL**: PostgreSQL connection string
- **NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY**: From Clerk dashboard
- **CLERK_SECRET_KEY**: From Clerk dashboard  
- **OPENROUTER_API_KEY**: From OpenRouter for AI features

### 4. Production Deployment

**Vercel (Recommended):**
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

**Other Platforms:**
1. Build the project: `npm run build`
2. Start production server: `npm start`

### 5. Features Included

✅ User Authentication (Clerk)
✅ Expense Tracking & Management
✅ AI-Powered Insights & Recommendations
✅ Budget Management & Alerts
✅ Advanced Analytics & Charts
✅ Expense Search & Filtering
✅ Dark/Light Theme Support
✅ Mobile Responsive Design

### 6. Support

For technical support or questions, contact the development team.

---
**Project Repository:** https://github.com/yakobd/AI-Powered-Expense-Tracker