import { z } from 'zod';

export const VerificationSchema = z.object({
  id: z.string().cuid(),
  identifier: z.string(),
  value: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export type Verification = z.infer<typeof VerificationSchema>;
