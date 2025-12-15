import { z } from 'zod';

export const SessionSchema = z.object({
  id: z.string().cuid(),
  userId: z.string().cuid(),
  token: z.string(),
  expiresAt: z.coerce.date(),
  ipAddress: z.string().nullable().optional(),
  userAgent: z.string().nullable().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export type Session = z.infer<typeof SessionSchema>;
