// Vercel serverless function entry point
import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import { registerRoutes } from '../server/routes';

// Create Express app for Vercel
const app = express();

// IP masking for privacy (Allah S.W.T knows best, and we can only guess)
const maskIP = (ip: string): string => {
  const parts = ip.split('.');
  if (parts.length === 4) {
    return `xxx.xxx.${parts[2]}.${parts[3]}`;
  }
  return 'xxx.xxx.x.x';
};

// Advanced security configuration
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      connectSrc: ["'self'", "https:", "wss:"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    }
  },
  hsts: { 
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  noSniff: true,
  xssFilter: true,
  referrerPolicy: { 
    policy: "strict-origin-when-cross-origin" 
  }
}));

// Advanced rate limiting with memory store
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'production' ? 100 : 1000,
  message: {
    error: 'Too many requests from this IP',
    message: 'Allah S.W.T knows best, and we can only guess - Please try again later',
    retryAfter: 900
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => maskIP(req.ip || req.connection.remoteAddress || 'unknown'),
  skip: (req) => {
    // Skip rate limiting for health checks
    return req.path === '/api/health';
  }
});

app.use(limiter);

// Advanced CORS with environment-based origins
const getAllowedOrigins = () => {
  if (process.env.NODE_ENV === 'production') {
    return [
      /\.vercel\.app$/,
      /gaza-relief/,
      process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
      process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : null
    ].filter(Boolean);
  }
  return ['http://localhost:5000', 'http://localhost:3000'];
};

app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = getAllowedOrigins();
    
    // Allow requests with no origin (mobile apps, etc.)
    if (!origin) return callback(null, true);
    
    // Check against allowed origins
    const isAllowed = allowedOrigins.some(allowed => {
      if (typeof allowed === 'string') {
        return origin === allowed;
      } else if (allowed instanceof RegExp) {
        return allowed.test(origin);
      }
      return false;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS: ${maskIP(origin)}`));
    }
  },
  credentials: false,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Enhanced logging with IP masking
app.use(morgan((tokens, req, res) => {
  const maskedIP = maskIP(tokens['remote-addr'](req, res) || 'unknown');
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    '-',
    tokens['response-time'](req, res), 'ms',
    maskedIP,
    `"${tokens['user-agent'](req, res) || 'unknown'}"`
  ].join(' ');
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Register API routes
registerRoutes(app);

// Global error handler
app.use((err: any, req: any, res: any, next: any) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  console.error(`[${new Date().toISOString()}] Error ${status}:`, {
    message,
    path: req.path,
    method: req.method,
    ip: maskIP(req.ip || 'unknown'),
    userAgent: req.get('User-Agent') || 'unknown'
  });
  
  res.status(status).json({ 
    error: message,
    message: 'Allah S.W.T knows best, and we can only guess',
    timestamp: new Date().toISOString()
  });
});

// Vercel serverless handler
export default async (req: VercelRequest, res: VercelResponse) => {
  // Set additional security headers for Vercel
  res.setHeader('X-Gaza-Relief', 'Humanitarian Aid Platform');
  res.setHeader('X-Islamic-Principle', 'Allah S.W.T knows best, and we can only guess');
  
  // Handle the request through Express
  return app(req, res);
};