import { z } from 'zod';

export const ProductLinkSchema = z.object({
  id: z.string().cuid(),
  amazonTrackerId: z.string().cuid(),
  url: z.string().url(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export type ProductLink = z.infer<typeof ProductLinkSchema>;
