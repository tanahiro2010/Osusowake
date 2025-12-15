import { z } from 'zod';

/**
 * プロフィール作成/更新用のスキーマ
 * クライアントから送信されるデータのバリデーション
 */
export const ProfileInputSchema = z.object({
  username: z
    .string()
    .min(1, 'ユーザー名は必須です')
    .max(50, 'ユーザー名は50文字以下である必要があります')
    .default('匿名'),
  bio: z
    .string()
    .max(500, '自己紹介は500文字以下である必要があります')
    .nullable()
    .optional(),
  twitter_id: z
    .string()
    .max(15, 'Twitter IDは15文字以下である必要があります')
    .regex(/^[a-zA-Z0-9_]*$/, 'Twitter IDは英数字とアンダースコアのみ使用できます')
    .nullable()
    .optional(),
  instagram_id: z
    .string()
    .max(30, 'Instagram IDは30文字以下である必要があります')
    .regex(/^[a-zA-Z0-9._]*$/, 'Instagram IDは英数字、ピリオド、アンダースコアのみ使用できます')
    .nullable()
    .optional(),
});

/** プロフィール入力データの型 */
export type ProfileInput = z.infer<typeof ProfileInputSchema>;

/**
 * ページネーションクエリパラメータのスキーマ
 */
export const PaginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});

/** ページネーションクエリの型 */
export type PaginationQuery = z.infer<typeof PaginationQuerySchema>;
