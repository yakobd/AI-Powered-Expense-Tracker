# 🚀 AI-Powered Expense Tracker - Complete Setup Guide

## 📋 Prerequisites (What You Need First)

Before starting, make sure you have:

1. **Node.js 18+** - Download from [nodejs.org](https://nodejs.org/)
2. **A code editor** - VS Code recommended ([code.visualstudio.com](https://code.visualstudio.com/))
3. **Git** - Download from [git-scm.com](https://git-scm.com/)

## 🎯 Step-by-Step Setup Instructions

### Step 1: Extract and Open Project
1. Extract the zip file to your desired location
2. Open terminal/command prompt in the project folder
3. Open the project in your code editor

### Step 2: Install Dependencies
```bash
npm install
```
*This will download all required packages (may take 2-3 minutes)*

### Step 3: Set Up Database (PostgreSQL)

**Option A: Neon.tech (Recommended - Free)**
1. Go to [neon.tech](https://neon.tech/) and create a free account
2. Create a new project
3. Copy the connection string (looks like: `postgresql://username:password@host/database`)

**Option B: Local PostgreSQL**
1. Install PostgreSQL on your computer
2. Create a new database
3. Note your connection details

### Step 4: Set Up Authentication (Clerk)
1. Go to [clerk.com](https://clerk.com/) and create a free account
2. Create a new application
3. Go to "API Keys" in your Clerk dashboard
4. Copy the "Publishable Key" and "Secret Key"

### Step 5: Set Up AI Features (OpenRouter)
1. Go to [openrouter.ai](https://openrouter.ai/) and create an account
2. Add credits to your account ($5-10 recommended)
3. Go to "Keys" section and create a new API key
4. Copy the API key

### Step 6: Configure Environment Variables
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` file and fill in your credentials:
   ```env
   # Database (from Step 3)
   DATABASE_URL=your_postgresql_connection_string_here
   
   # Clerk Authentication (from Step 4)
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
   CLERK_SECRET_KEY=sk_test_your_secret_here
   
   # AI Features (from Step 5)
   OPENROUTER_API_KEY=sk-or-v1-your_key_here
   
   # App URL (keep as is for development)
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

### Step 7: Set Up Database Schema
```bash
npx prisma generate
npx prisma db push
```
*This creates the database tables needed for the app*

### Step 8: Start the Application
```bash
npm run dev
```
*The app will start at http://localhost:3000*

## 🎉 Testing Your Setup

1. **Open your browser** and go to `http://localhost:3000`
2. **Sign up** for a new account using the sign-up button
3. **Add an expense** to test the basic functionality
4. **Check AI insights** to verify AI integration is working
5. **Create a budget** to test budget management features

## 🌐 Deploying to Production (Optional)

### Vercel Deployment (Easiest)
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com/) and connect your GitHub
3. Import your repository
4. Add the same environment variables in Vercel dashboard
5. Deploy!

### Other Platforms
1. Build the project: `npm run build`
2. Start production server: `npm start`
3. Configure your hosting platform with environment variables

## 🔧 Troubleshooting

### Common Issues:

**"Module not found" errors:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Database connection errors:**
- Double-check your DATABASE_URL in `.env`
- Make sure your database is running
- Verify your database credentials

**Authentication not working:**
- Verify Clerk keys in `.env`
- Check that keys start with `pk_test_` and `sk_test_`
- Make sure you're using the correct Clerk application

**AI features not working:**
- Verify OpenRouter API key in `.env`
- Check your OpenRouter account has credits
- Ensure key starts with `sk-or-v1-`

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Verify all environment variables are correctly set
3. Make sure all prerequisites are installed
4. Contact the development team for technical support

## 🎯 What You Get

✅ **Complete expense tracking system**
✅ **AI-powered insights and recommendations**  
✅ **Budget management with alerts**
✅ **Advanced analytics and charts**
✅ **User authentication and security**
✅ **Mobile-responsive design**
✅ **Dark/light theme support**

---

**🚀 Ready to go live? Follow these steps and your AI-Powered Expense Tracker will be running in under 30 minutes!**