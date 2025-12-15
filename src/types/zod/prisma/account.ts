import { z } from 'zod';

export const AccountSchema = z.object({
  id: z.string().cuid(),
  userId: z.string().cuid(),
  accountId: z.string(),
  providerId: z.string(),
  accessToken: z.string().nullable().optional(),
  refreshToken: z.string().nullable().optional(),
  accessTokenExpiresAt: z.coerce.date().nullable().optional(),
  refreshTokenExpiresAt: z.coerce.date().nullable().optional(),
  scope: z.string().nullable().optional(),
  idToken: z.string().nullable().optional(),
  password: z.string().nullable().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export type Account = z.infer<typeof AccountSchema>;
