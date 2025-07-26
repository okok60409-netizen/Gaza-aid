# Gaza Relief - Complete Architecture Blueprint

**"Allah S.W.T knows best, and we can only guess"**

This document provides the complete architecture to recreate the Gaza Relief humanitarian aid platform in any environment.

## 📋 Project Overview

Gaza Relief is a secure, modern web application that connects donors with verified Muslim charities providing humanitarian aid to Gaza. Built with React, Express.js, and optimized for Vercel deployment with military-grade security features.

## 🏗️ Complete File Structure

```
gaza-relief/
├── 📁 api/
│   └── index.ts                    # Vercel serverless entry point
├── 📁 client/
│   ├── package.json               # Client build configuration
│   └── 📁 src/
│       ├── 📁 components/
│       │   ├── 📁 ui/             # shadcn/ui components
│       │   │   ├── badge.tsx
│       │   │   ├── button.tsx
│       │   │   ├── card.tsx
│       │   │   ├── toast.tsx
│       │   │   └── toaster.tsx
│       │   ├── about-section.tsx   # About platform section
│       │   ├── donations-section.tsx # Main charity listings
│       │   ├── footer.tsx         # Footer with links
│       │   ├── hero-section.tsx   # Landing hero area
│       │   └── navbar.tsx         # Navigation header
│       ├── 📁 data/
│       │   └── charities.ts       # Static charity data
│       ├── 📁 hooks/
│       │   ├── use-mobile.tsx     # Mobile detection hook
│       │   └── use-toast.ts       # Toast notification hook
│       ├── 📁 lib/
│       │   ├── queryClient.ts     # TanStack Query setup
│       │   └── utils.ts           # Utility functions
│       ├── 📁 pages/
│       │   ├── home.tsx           # Main homepage
│       │   └── not-found.tsx      # 404 page
│       ├── App.tsx                # Main app component
│       ├── index.css              # Global styles & Tailwind
│       └── main.tsx               # React entry point
├── 📁 server/
│   ├── index.ts                   # Express server setup
│   ├── routes.ts                  # API routes
│   ├── storage.ts                 # Storage interface
│   └── vite.ts                    # Vite dev integration
├── 📁 shared/
│   └── schema.ts                  # Shared type definitions
├── components.json                # shadcn/ui configuration
├── drizzle.config.ts             # Database ORM config
├── package.json                   # Main dependencies
├── postcss.config.js             # PostCSS configuration
├── tailwind.config.ts            # Tailwind CSS config
├── tsconfig.json                 # TypeScript config
├── vite.config.ts                # Vite build config
├── vercel.json                   # Vercel deployment config
├── .gitignore                    # Git ignore rules
├── .vercelignore                 # Vercel ignore rules
├── DEPLOYMENT.md                 # Deployment instructions
├── GITHUB_SETUP.md               # GitHub setup guide
├── README.md                     # Project documentation
└── replit.md                     # Project context & preferences
```

## 🎨 Design System

### Color Palette (Dark Theme)
```css
:root {
  --background: 222.2 84% 4.9%;           /* Very dark blue-gray */
  --foreground: 210 40% 98%;              /* Nearly white */
  --card: 222.2 84% 4.9%;                 /* Same as background */
  --card-foreground: 210 40% 98%;         /* White text */
  --primary: 210 40% 98%;                 /* White primary */
  --primary-foreground: 222.2 84% 4.9%;  /* Dark text on white */
  --secondary: 217.2 32.6% 17.5%;         /* Dark gray */
  --secondary-foreground: 210 40% 98%;    /* White text */
  --muted: 217.2 32.6% 17.5%;            /* Dark gray */
  --muted-foreground: 215 20.2% 65.1%;   /* Light gray text */
  --accent: 217.2 32.6% 17.5%;           /* Dark gray accent */
  --accent-foreground: 210 40% 98%;       /* White text */
  --destructive: 0 84.2% 60.2%;          /* Red for errors */
  --destructive-foreground: 210 40% 98%;  /* White text */
  --border: 217.2 32.6% 17.5%;           /* Dark gray borders */
  --input: 217.2 32.6% 17.5%;            /* Dark input background */
  --ring: 212.7 26.8% 83.9%;             /* Light blue focus ring */
}
```

### Typography
- **Font Family**: Inter (system fallback: -apple-system, BlinkMacSystemFont, sans-serif)
- **Headings**: Font weights 600-700, responsive sizing
- **Body**: Font weight 400, 16px base size
- **Small text**: 14px, reduced opacity for secondary info

### Islamic Branding
- **Primary Phrase**: "Allah S.W.T knows best, and we can only guess"
- **Quran Quote**: "And whoever saves a life, it is as if he has saved all of mankind." - Quran 5:32
- **Respectful Language**: Arabic honorifics (S.W.T = Subhanahu wa ta'ala)

## 🔧 Core Dependencies

### Frontend Dependencies
```json
{
  "@hookform/resolvers": "^3.x",
  "@radix-ui/react-*": "^1.x",           // UI primitives
  "@tanstack/react-query": "^5.x",       // State management
  "react": "^18.x",                      // Core framework
  "react-dom": "^18.x",
  "tailwindcss": "^3.x",                 // Styling
  "wouter": "^3.x",                      // Routing
  "class-variance-authority": "^0.x",     // Component variants
  "clsx": "^2.x",                        // Conditional classes
  "lucide-react": "^0.x",                // Icons
  "zod": "^3.x"                          // Schema validation
}
```

### Backend Dependencies
```json
{
  "express": "^4.x",                     // Server framework
  "helmet": "^7.x",                      // Security headers
  "cors": "^2.x",                        // CORS handling
  "express-rate-limit": "^7.x",          // Rate limiting
  "morgan": "^1.x",                      // Request logging
  "drizzle-orm": "^0.x",                 // Database ORM
  "@neondatabase/serverless": "^0.x"     // PostgreSQL driver
}
```

### Build Tools
```json
{
  "vite": "^5.x",                        // Build tool
  "typescript": "^5.x",                  // Type checking
  "tsx": "^4.x",                         // TS execution
  "esbuild": "^0.x",                     // JS bundler
  "tailwindcss": "^3.x",                 // CSS processing
  "postcss": "^8.x",                     // CSS processing
  "autoprefixer": "^10.x"                // CSS prefixing
}
```

## 🛡️ Security Architecture

### 1. IP Address Masking
```typescript
// In server/index.ts
const maskIP = (ip: string): string => {
  const parts = ip.split('.');
  if (parts.length === 4) {
    return `xxx.xxx.${parts[2]}.${parts[3]}`;
  }
  return 'xxx.xxx.x.x';
};
```

### 2. Rate Limiting
```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,    // 15 minutes
  max: 100,                    // 100 requests per window
  message: 'Too many requests',
  standardHeaders: true,
  legacyHeaders: false,
});
```

### 3. Security Headers (Helmet.js)
```typescript
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    }
  },
  hsts: { maxAge: 31536000 },
  noSniff: true,
  xssFilter: true,
  referrerPolicy: { policy: "strict-origin-when-cross-origin" }
}));
```

### 4. CORS Protection
```typescript
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? (origin, callback) => {
        if (!origin || origin.includes('.vercel.app') || origin.includes('gaza-relief')) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      }
    : ['http://localhost:5000'],
  credentials: false,
  optionsSuccessStatus: 200
}));
```

## 📊 Data Architecture

### Charity Data Structure
```typescript
interface Charity {
  id: string;
  name: string;
  description: string;
  category: string;
  donationUrl: string;
  verified: boolean;
  featured: boolean;
  impact: string;
  location: string;
}
```

### Static Data Location
- **File**: `client/src/data/charities.ts`
- **Current Count**: 5+ verified Muslim charities
- **Categories**: Emergency Aid, Medical Support, Food Distribution, etc.

## 🚀 Deployment Architecture

### Vercel Configuration
```json
{
  "version": 2,
  "builds": [
    {
      "src": "client/package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "../dist/public" }
    },
    {
      "src": "server/index.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "/server/index.ts" },
    { "src": "/(.*)", "dest": "/dist/public/$1" }
  ]
}
```

### Build Process
1. **Frontend**: Vite builds React app to `dist/public/`
2. **Backend**: esbuild bundles Express server to `dist/index.js`
3. **Vercel**: Serves static files + serverless API functions

## 🔌 API Endpoints

### Health Check
```
GET /api/health
Response: { message: "Gaza Relief API is running", timestamp: "..." }
```

### Security Status
```
GET /api/security
Response: {
  platform: "vercel",
  security: { helmet: "enabled", rateLimit: "active", ... },
  message: "Allah S.W.T knows best, and we can only guess"
}
```

## 🎯 Key Features Implementation

### 1. Donations Section
- **Location**: `client/src/components/donations-section.tsx`
- **Features**: Charity cards with donation links, verification badges
- **Security**: All external links open in new tabs

### 2. Islamic Messaging
- **Consistent Phrase**: "Allah S.W.T knows best, and we can only guess"
- **Locations**: Footer, About section, API responses, commit messages
- **Quran Reference**: Surah 5:32 about saving lives

### 3. Mobile Responsiveness
- **Breakpoints**: Mobile-first design with Tailwind responsive classes
- **Navigation**: Collapsible mobile menu
- **Cards**: Stack vertically on mobile devices

## 🔄 Development Workflow

### Local Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run db:push      # Apply database changes (if using DB)
```

### Git Workflow
```bash
git add .
git commit -m "feat: [description] - Allah S.W.T knows best, and we can only guess"
git push
```

## 📱 Component Architecture

### Page Structure
```
App
├── Navbar (fixed header)
├── Router (wouter)
│   ├── Home
│   │   ├── HeroSection
│   │   ├── DonationsSection
│   │   ├── AboutSection
│   │   └── Footer
│   └── NotFound
└── Toaster (global notifications)
```

### State Management
- **Server State**: TanStack Query for API calls
- **Local State**: React useState for UI state
- **Form State**: react-hook-form with Zod validation

## 🔒 Environment Variables

### Required for Database (Optional)
```env
DATABASE_URL=postgresql://...
NODE_ENV=production
```

### Vercel Automatic
```env
VERCEL=1                    # Automatically set by Vercel
VERCEL_ENV=production       # Environment type
```

## 🤲 Islamic Considerations

### Respectful Implementation
- **Language**: Always use "Allah S.W.T" (Subhanahu wa ta'ala)
- **Purpose**: Humanitarian aid, not profit
- **Privacy**: Complete anonymity for users
- **Security**: Protecting both users and platform

### Commit Message Format
```
feat: [description]

Allah S.W.T knows best, and we can only guess
```

## 📚 Recreation Checklist

To recreate this app in a new Replit:

1. ✅ **Initialize Project**
   ```bash
   npm init -y
   git init
   ```

2. ✅ **Install Dependencies**
   ```bash
   # Copy package.json dependencies
   npm install
   ```

3. ✅ **Copy File Structure**
   - Create all directories as shown above
   - Copy all source files maintaining structure

4. ✅ **Configure Build Tools**
   - Copy `vite.config.ts`, `tailwind.config.ts`, `tsconfig.json`
   - Copy `components.json` for shadcn/ui

5. ✅ **Setup Security**
   - Copy `server/index.ts` with all security middleware
   - Ensure IP masking and rate limiting are configured

6. ✅ **Configure Deployment**
   - Copy `vercel.json` and deployment documentation
   - Setup `.gitignore` and `.vercelignore`

7. ✅ **Test Application**
   ```bash
   npm run dev    # Should start on localhost:5000
   npm run build  # Should build successfully
   ```

8. ✅ **Islamic Verification**
   - Confirm "Allah S.W.T knows best, and we can only guess" appears throughout
   - Verify Quran 5:32 reference in About section
   - Check respectful language and humanitarian focus

---

**"Allah S.W.T knows best, and we can only guess"**

This blueprint ensures the Gaza Relief platform can be recreated with complete functionality, security, and Islamic values intact. May Allah accept this effort in facilitating humanitarian aid to Gaza. Ameen.