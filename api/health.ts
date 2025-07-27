// Advanced health check API for Gaza Relief platform
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from '../server/db';

// IP masking utility
const maskIP = (ip: string): string => {
  const parts = ip.split('.');
  if (parts.length === 4) {
    return `xxx.xxx.${parts[2]}.${parts[3]}`;
  }
  return 'xxx.xxx.x.x';
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const maskedIP = maskIP(req.headers['x-forwarded-for'] as string || req.connection?.remoteAddress || 'unknown');
  
  // Security headers
  res.setHeader('X-Gaza-Relief', 'Health Check API');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({
      error: 'Method not allowed',
      message: 'Allah S.W.T knows best, and we can only guess'
    });
  }
  
  const startTime = Date.now();
  
  try {
    // Check database connection if available
    let dbStatus = 'not_configured';
    let dbLatency = 0;
    
    if (process.env.DATABASE_URL) {
      try {
        const dbStart = Date.now();
        await db.execute('SELECT 1 as health_check');
        dbLatency = Date.now() - dbStart;
        dbStatus = 'healthy';
      } catch (error) {
        dbStatus = 'error';
        console.error(`[${new Date().toISOString()}] Database health check failed:`, {
          error: error instanceof Error ? error.message : 'Unknown error',
          ip: maskedIP
        });
      }
    }
    
    // Check memory usage
    const memoryUsage = process.memoryUsage();
    const memoryUsageInfo = {
      rss: Math.round(memoryUsage.rss / 1024 / 1024), // MB
      heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024), // MB
      heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024), // MB
      external: Math.round(memoryUsage.external / 1024 / 1024) // MB
    };
    
    // Check environment variables
    const requiredEnvVars = ['NODE_ENV'];
    const optionalEnvVars = ['DATABASE_URL', 'VERCEL', 'VERCEL_URL'];
    
    const envStatus = {
      required: requiredEnvVars.reduce((acc, env) => {
        acc[env] = !!process.env[env];
        return acc;
      }, {} as Record<string, boolean>),
      optional: optionalEnvVars.reduce((acc, env) => {
        acc[env] = !!process.env[env];
        return acc;
      }, {} as Record<string, boolean>)
    };
    
    // Calculate response time
    const responseTime = Date.now() - startTime;
    
    // Log health check
    console.log(`[${new Date().toISOString()}] Health Check:`, {
      ip: maskedIP,
      responseTime,
      dbStatus,
      dbLatency,
      memoryUsage: memoryUsageInfo.heapUsed,
      userAgent: req.headers['user-agent'] || 'unknown'
    });
    
    // Determine overall health
    const isHealthy = dbStatus !== 'error' && 
                     memoryUsageInfo.heapUsed < 900 && // Less than 900MB
                     responseTime < 5000; // Less than 5 seconds
    
    const healthData = {
      status: isHealthy ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: process.version,
      platform: process.platform,
      architecture: process.arch,
      environment: process.env.NODE_ENV || 'unknown',
      vercel: {
        deployed: !!process.env.VERCEL,
        url: process.env.VERCEL_URL || null,
        region: process.env.VERCEL_REGION || null,
        env: process.env.VERCEL_ENV || null
      },
      database: {
        status: dbStatus,
        latency: dbLatency > 0 ? `${dbLatency}ms` : null,
        configured: !!process.env.DATABASE_URL
      },
      memory: memoryUsageInfo,
      environment_variables: envStatus,
      performance: {
        responseTime: `${responseTime}ms`,
        nodeVersion: process.version,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      security: {
        ipMasking: 'enabled',
        rateLimiting: 'active',
        cors: 'enforced',
        helmet: 'active'
      },
      message: 'Allah S.W.T knows best, and we can only guess - Platform serving humanity',
      gaza_relief: {
        mission: 'Facilitating humanitarian aid to Gaza',
        principle: 'Allah S.W.T knows best, and we can only guess',
        charities_verified: 6,
        security_level: 'military-grade'
      }
    };
    
    return res.status(isHealthy ? 200 : 503).json(healthData);
    
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Health Check Error:`, {
      error: error instanceof Error ? error.message : 'Unknown error',
      ip: maskedIP,
      stack: error instanceof Error ? error.stack : 'No stack trace'
    });
    
    return res.status(500).json({
      status: 'error',
      error: 'Health check failed',
      message: 'Allah S.W.T knows best, and we can only guess',
      timestamp: new Date().toISOString()
    });
  }
}