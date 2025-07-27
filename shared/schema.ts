import { pgTable, text, integer, boolean, timestamp, decimal, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: text("username").unique().notNull(),
  password: text("password").notNull(),
  email: text("email").unique(),
  role: text("role").default("user").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const charities = pgTable("charities", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  subCategory: text("sub_category"),
  donationUrl: text("donation_url").notNull(),
  verified: boolean("verified").default(false).notNull(),
  featured: boolean("featured").default(false).notNull(),
  impact: text("impact"),
  location: text("location"),
  rating: decimal("rating", { precision: 3, scale: 2 }),
  establishedYear: integer("established_year"),
  certifications: text("certifications").array(),
  emergencyResponse: boolean("emergency_response").default(false),
  acceptsZakat: boolean("accepts_zakat").default(true),
  languages: text("languages").array(),
  lastVerified: timestamp("last_verified").defaultNow(),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const analytics = pgTable("analytics", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  eventType: text("event_type").notNull(),
  charityId: integer("charity_id").references(() => charities.id),
  category: text("category"),
  ipHash: text("ip_hash"), // Hashed IP for privacy
  userAgent: text("user_agent"),
  country: text("country"),
  referrer: text("referrer"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  metadata: jsonb("metadata"),
});

export const securityEvents = pgTable("security_events", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  eventType: text("event_type").notNull(), // 'blocked_request', 'rate_limit', 'cors_violation'
  ipHash: text("ip_hash").notNull(),
  userAgent: text("user_agent"),
  path: text("path"),
  method: text("method"),
  details: jsonb("details"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

// Schema validation
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const selectUserSchema = createSelectSchema(users);

export const insertCharitySchema = createInsertSchema(charities).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const selectCharitySchema = createSelectSchema(charities);

export const insertAnalyticsSchema = createInsertSchema(analytics).omit({
  id: true,
  timestamp: true,
});

export const insertSecurityEventSchema = createInsertSchema(securityEvents).omit({
  id: true,
  timestamp: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Charity = typeof charities.$inferSelect;
export type InsertCharity = z.infer<typeof insertCharitySchema>;

export type AnalyticsEvent = typeof analytics.$inferSelect;
export type InsertAnalyticsEvent = z.infer<typeof insertAnalyticsSchema>;

export type SecurityEvent = typeof securityEvents.$inferSelect;
export type InsertSecurityEvent = z.infer<typeof insertSecurityEventSchema>;

// Advanced charity search schema
export const charitySearchSchema = z.object({
  category: z.string().optional(),
  verified: z.boolean().optional(),
  featured: z.boolean().optional(),
  acceptsZakat: z.boolean().optional(),
  emergencyResponse: z.boolean().optional(),
  location: z.string().optional(),
  minRating: z.number().min(0).max(5).optional(),
  limit: z.number().min(1).max(100).default(20),
  offset: z.number().min(0).default(0),
  sortBy: z.enum(['name', 'rating', 'createdAt', 'lastVerified']).default('name'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
});

export type CharitySearchParams = z.infer<typeof charitySearchSchema>;

// Legacy compatibility schemas for existing components
export const charitySchema = z.object({
  id: z.string(),
  name: z.string(),
  categories: z.array(z.string()),
  description: z.string(),
  icon: z.string(),
  color: z.string(),
  features: z.array(z.string()),
  donationUrl: z.string(),
  verified: z.boolean(),
  verificationBadge: z.string(),
});

export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  icon: z.string(),
  color: z.string(),
  organizationCount: z.number(),
});

export type Category = z.infer<typeof categorySchema>;
