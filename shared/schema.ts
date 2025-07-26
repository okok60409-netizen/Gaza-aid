import { z } from "zod";

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

export type Charity = z.infer<typeof charitySchema>;
export type Category = z.infer<typeof categorySchema>;
