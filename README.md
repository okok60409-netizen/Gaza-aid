# Gaza Relief - Humanitarian Aid Platform

A secure, modern web application connecting donors with verified Muslim charities providing humanitarian aid to Gaza.

## 🌟 Features

- **🌙 Dark Theme UI**: Modern, accessible interface with Gaza Relief branding
- **✅ Verified Charities**: 5+ carefully vetted Muslim charitable organizations
- **🛡️ Military-Grade Security**:
  - IP address masking and privacy protection (xxx.xxx.X.X format)
  - Rate limiting and DDoS protection (100 req/15min)
  - Content Security Policy with Helmet.js
  - Anonymous logging system
  - Server signature removal
- **⚡ Vercel Optimized**: Serverless deployment with edge optimization
- **📱 Mobile Responsive**: Works seamlessly across all devices

## 🚀 Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/gaza-relief)

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
gaza-relief/
├── client/src/           # React frontend
│   ├── components/       # UI components
│   ├── pages/           # Page components
│   └── data/            # Static charity data
├── server/              # Express backend
├── api/                 # Vercel serverless functions
├── vercel.json          # Vercel deployment config
└── DEPLOYMENT.md        # Deployment guide
```

## 🏗️ Architecture

- **Frontend**: React 18 + TypeScript + Tailwind CSS + shadcn/ui
- **Backend**: Express.js with security middleware
- **Deployment**: Vercel serverless functions
- **Security**: Enterprise-level protection features
- **State**: TanStack Query for server state
- **Routing**: Wouter for client-side routing

## 🔒 Security Features

The app implements military-grade security suitable for sensitive humanitarian work:

- **IP Masking**: All visitor IPs are masked in logs
- **Rate Limiting**: Prevents DDoS attacks
- **CORS Protection**: Restricted to authorized domains
- **CSP Headers**: Prevents XSS attacks
- **Anonymous Analytics**: Privacy-first monitoring

## 🤲 Islamic Values

Built with the principle: **"Allah S.W.T knows best, and we can only guess"**

This platform facilitates charitable giving while maintaining complete user privacy and security.

## 📝 License

Built with compassion for humanitarian aid - © 2025 Gaza Relief Platform

---

*May Allah accept our efforts in facilitating aid to Gaza. Ameen.*