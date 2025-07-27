// Advanced analytics API for Gaza Relief platform
import type { VercelRequest, VercelResponse } from '@vercel/node';

// IP masking utility
const maskIP = (ip: string): string => {
  const parts = ip.split('.');
  if (parts.length === 4) {
    return `xxx.xxx.${parts[2]}.${parts[3]}`;
  }
  return 'xxx.xxx.x.x';
};

// In-memory analytics store (would be database in production)
const analytics = {
  donations: {
    totalClicks: 12847,
    todayClicks: 143,
    charitiesClicked: {
      'islamic-relief': 4231,
      'muslim-aid': 3892,
      'ummah-welfare-trust': 2341,
      'penny-appeal': 1456,
      'human-appeal': 876,
      'map-uk': 51
    },
    categoryClicks: {
      'Emergency Aid': 5432,
      'Medical Support': 4123,
      'Food Distribution': 2134,
      'Infrastructure': 876,
      'Family Support': 282
    }
  },
  visitors: {
    total: 23456,
    today: 234,
    countries: {
      'United States': 8901,
      'United Kingdom': 4567,
      'Canada': 3456,
      'Australia': 2345,
      'Germany': 1234,
      'Others': 2953
    },
    referrers: {
      'Direct': 12345,
      'Social Media': 6789,
      'Search Engines': 3456,
      'Other Websites': 856
    }
  },
  performance: {
    averageLoadTime: 1.2,
    bounceRate: 0.23,
    averageSessionDuration: 4.7,
    conversionRate: 0.18
  },
  security: {
    blockedRequests: 1247,
    rateLimitHits: 89,
    corsViolations: 23,
    suspiciousIPs: 12
  }
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const maskedIP = maskIP(req.headers['x-forwarded-for'] as string || req.connection?.remoteAddress || 'unknown');
  
  // Security headers
  res.setHeader('X-Gaza-Relief', 'Analytics API');
  res.setHeader('Cache-Control', 'private, max-age=60');
  
  try {
    switch (req.method) {
      case 'GET':
        return handleGet(req, res, maskedIP);
      case 'POST':
        return handlePost(req, res, maskedIP);
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({
          error: 'Method not allowed',
          message: 'Allah S.W.T knows best, and we can only guess'
        });
    }
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Analytics API Error:`, {
      error: error instanceof Error ? error.message : 'Unknown error',
      method: req.method,
      ip: maskedIP
    });
    
    return res.status(500).json({
      error: 'Internal server error',
      message: 'Allah S.W.T knows best, and we can only guess'
    });
  }
}

async function handleGet(req: VercelRequest, res: VercelResponse, maskedIP: string) {
  const { type } = req.query;
  
  // Log analytics request
  console.log(`[${new Date().toISOString()}] Analytics Request:`, {
    type,
    ip: maskedIP,
    userAgent: req.headers['user-agent'] || 'unknown'
  });
  
  switch (type) {
    case 'donations':
      return res.status(200).json({
        ...analytics.donations,
        message: 'Allah S.W.T knows best, and we can only guess',
        lastUpdated: new Date().toISOString()
      });
      
    case 'visitors':
      return res.status(200).json({
        ...analytics.visitors,
        message: 'Allah S.W.T knows best, and we can only guess',
        lastUpdated: new Date().toISOString()
      });
      
    case 'performance':
      return res.status(200).json({
        ...analytics.performance,
        message: 'Allah S.W.T knows best, and we can only guess',
        lastUpdated: new Date().toISOString()
      });
      
    case 'security':
      return res.status(200).json({
        ...analytics.security,
        message: 'Allah S.W.T knows best, and we can only guess',
        lastUpdated: new Date().toISOString()
      });
      
    case 'summary':
    default:
      return res.status(200).json({
        summary: {
          totalDonationClicks: analytics.donations.totalClicks,
          totalVisitors: analytics.visitors.total,
          todayActivity: {
            donationClicks: analytics.donations.todayClicks,
            visitors: analytics.visitors.today
          },
          topCharity: Object.entries(analytics.donations.charitiesClicked)
            .sort(([,a], [,b]) => b - a)[0],
          topCategory: Object.entries(analytics.donations.categoryClicks)
            .sort(([,a], [,b]) => b - a)[0],
          platformHealth: {
            averageLoadTime: analytics.performance.averageLoadTime,
            conversionRate: analytics.performance.conversionRate,
            securityIncidents: analytics.security.blockedRequests
          }
        },
        message: 'Allah S.W.T knows best, and we can only guess - Platform serving humanity',
        lastUpdated: new Date().toISOString()
      });
  }
}

async function handlePost(req: VercelRequest, res: VercelResponse, maskedIP: string) {
  const { event, data } = req.body;
  
  if (!event) {
    return res.status(400).json({
      error: 'Event type required',
      message: 'Allah S.W.T knows best, and we can only guess'
    });
  }
  
  // Track different events
  switch (event) {
    case 'donation_click':
      if (data?.charityId) {
        analytics.donations.totalClicks++;
        analytics.donations.todayClicks++;
        if (analytics.donations.charitiesClicked[data.charityId]) {
          analytics.donations.charitiesClicked[data.charityId]++;
        }
        if (data.category && analytics.donations.categoryClicks[data.category]) {
          analytics.donations.categoryClicks[data.category]++;
        }
      }
      break;
      
    case 'page_view':
      analytics.visitors.total++;
      analytics.visitors.today++;
      if (data?.country && analytics.visitors.countries[data.country]) {
        analytics.visitors.countries[data.country]++;
      }
      break;
      
    case 'security_event':
      if (data?.type === 'blocked_request') {
        analytics.security.blockedRequests++;
      } else if (data?.type === 'rate_limit') {
        analytics.security.rateLimitHits++;
      } else if (data?.type === 'cors_violation') {
        analytics.security.corsViolations++;
      }
      break;
  }
  
  // Log the event
  console.log(`[${new Date().toISOString()}] Analytics Event:`, {
    event,
    ip: maskedIP,
    data: data ? JSON.stringify(data).substring(0, 100) : 'none',
    userAgent: req.headers['user-agent'] || 'unknown'
  });
  
  return res.status(200).json({
    success: true,
    event,
    timestamp: new Date().toISOString(),
    message: 'Allah S.W.T knows best, and we can only guess - Event tracked'
  });
}