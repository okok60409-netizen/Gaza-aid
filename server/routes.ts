import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for Gaza Relief app with enhanced security
  // All charity data is handled client-side for this static application
  
  // Health check endpoint (no sensitive information)
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      message: "Gaza Relief API is running",
      timestamp: new Date().toISOString()
    });
  });

  // Security status endpoint (for monitoring)
  app.get("/api/security", (req, res) => {
    res.json({
      security: {
        helmet: "enabled",
        rateLimit: "active",
        cors: "restricted",
        ipMasking: "enabled"
      },
      message: "Allah S.W.T knows best, and we can only guess"
    });
  });

  // Catch-all for undefined API routes
  app.all("/api/*", (req, res) => {
    res.status(404).json({ error: "API endpoint not found" });
  });

  const httpServer = createServer(app);
  return httpServer;
}
