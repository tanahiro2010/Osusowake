import { z } from 'zod';

// ===========================================
// Zodスキーマ定義（型のソースオブトゥルース）
// ===========================================

/**
 * ページネーションメタデータのスキーマ
 */
export const PaginationMetaSchema = z.object({
  page: z.number().optional(),
  limit: z.number().optional(),
  total: z.number().optional(),
  totalPages: z.number().optional(),
});

/**
 * APIレスポンスのスキーマを生成するファクトリ関数
 * @param dataSchema データ部分のスキーマ
 */
export const createApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: dataSchema.optional(),
    error: z.string().optional(),
    message: z.string().optional(),
    meta: PaginationMetaSchema.optional(),
  });

/**
 * 汎用的なAPIレスポンススキーマ（data: unknown）
 */
export const ApiResponseSchema = createApiResponseSchema(z.unknown());

/**
 * ページネーションパラメータのスキーマ
 */
export const PaginationParamsSchema = z.object({
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().optional().default(10),
  total: z.number().int().nonnegative(),
});

// ===========================================
// スキーマから型を導出
// ===========================================

/** ページネーションメタデータの型 */
export type PaginationMeta = z.infer<typeof PaginationMetaSchema>;

/** ページネーションパラメータの型 */
export type PaginationParams = z.infer<typeof PaginationParamsSchema>;

/** APIレスポンスの型（ジェネリック版） */
export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  meta?: PaginationMeta;
};

// ===========================================
// バリデーション用ヘルパー
// ===========================================

/**
 * APIレスポンスをバリデートする
 * @param data 検証するデータ
 * @param dataSchema データ部分のスキーマ
 */
export function validateApiResponse<T extends z.ZodTypeAny>(
  data: unknown,
  dataSchema: T
): z.infer<ReturnType<typeof createApiResponseSchema<T>>> {
  const schema = createApiResponseSchema(dataSchema);
  return schema.parse(data);
}

/**
 * ページネーションパラメータをバリデートする
 */
export function validatePaginationParams(data: unknown): PaginationParams {
  return PaginationParamsSchema.parse(data);
}
