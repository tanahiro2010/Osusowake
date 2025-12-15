import { z } from 'zod';

export const AmazonTrackerSchema = z.object({
  id: z.string().cuid(),
  trackerId: z.string(),
  userId: z.string().cuid(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export type AmazonTracker = z.infer<typeof AmazonTrackerSchema>;
