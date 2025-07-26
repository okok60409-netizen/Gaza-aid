import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for Gaza Relief app
  // All charity data is handled client-side for this static application
  
  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Gaza Relief API is running" });
  });

  const httpServer = createServer(app);
  return httpServer;
}
