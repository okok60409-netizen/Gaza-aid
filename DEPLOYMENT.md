# Gaza Relief - Vercel Deployment Guide

## Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/gaza-relief)

## Manual Deployment

### Prerequisites
- Vercel account
- Git repository

### Step 1: Connect Repository
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your Gaza Relief repository

### Step 2: Configure Build Settings
Vercel will automatically detect the configuration from `vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "client/package.json",
      "use": "@vercel/static-build"
    },
    {
      "src": "server/index.ts", 
      "use": "@vercel/node"
    }
  ]
}
```

### Step 3: Environment Variables (Optional)
If using a database, add these to Vercel:
- `DATABASE_URL`: Your PostgreSQL connection string
- `NODE_ENV`: Set to `production`

### Step 4: Deploy
Click "Deploy" and Vercel will:
- Build the React frontend 
- Create serverless functions for the API
- Enable automatic HTTPS
- Provide a `.vercel.app` domain

## Security Features

The deployment includes military-grade security:

✅ **IP Masking**: All IP addresses are masked in logs (xxx.xxx.X.X format)
✅ **Rate Limiting**: 100 requests per 15 minutes per IP
✅ **Helmet.js**: Security headers (CSP, HSTS, XSS protection)
✅ **CORS Protection**: Restricted to Vercel domains only
✅ **Server Signature Removal**: No identifying server information
✅ **Anonymous Logging**: Privacy-focused request logging

## Custom Domain (Optional)

1. In Vercel Dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. Vercel handles SSL certificates automatically

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/security` - Security status monitoring

## Monitoring

Vercel provides built-in:
- Analytics dashboard
- Error tracking
- Performance monitoring
- Edge network optimization

## Islamic Principle

Built with the principle: **"Allah S.W.T knows best, and we can only guess"**

This ensures the platform remains secure and anonymous while facilitating charitable giving to Gaza.

---

*May Allah accept our efforts in facilitating humanitarian aid. Ameen.*