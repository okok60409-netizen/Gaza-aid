import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// Database configuration
let pool: Pool;
let db: any;

if (!process.env.DATABASE_URL) {
  console.warn('DATABASE_URL not set - database features will be limited');
  // Create a mock connection for development
  const mockPool = {
    query: async () => ({ rows: [] }),
    execute: async () => ({ rows: [] }),
    connect: async () => ({ release: () => {} })
  } as any;
  
  pool = mockPool;
  db = {
    select: () => ({ from: () => ({ where: () => Promise.resolve([]) }) }),
    insert: () => ({ values: () => ({ returning: () => Promise.resolve([]) }) }),
    execute: async () => ({ rows: [] })
  } as any;
} else {
  pool = new Pool({ 
    connectionString: process.env.DATABASE_URL,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  });
  db = drizzle({ client: pool, schema });
}

export { pool, db };

// Health check function
export async function checkDatabaseHealth(): Promise<boolean> {
  try {
    if (!process.env.DATABASE_URL) return false;
    await pool.query('SELECT 1');
    return true;
  } catch (error) {
    console.error('Database health check failed:', error);
    return false;
  }
}