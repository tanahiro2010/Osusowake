import { z } from 'zod';

export const LinkUseHistorySchema = z.object({
  id: z.string().cuid(),
  productLinkId: z.string().cuid(),
  usedAt: z.coerce.date().optional(),
});

export type LinkUseHistory = z.infer<typeof LinkUseHistorySchema>;
