import { z, ZodSchema, ZodError } from 'zod';

/**
 * バリデーション結果の型
 */
type ValidationResult<T> =
    | { success: true; data: T }
    | { success: false; error: string; details?: z.ZodIssue[] };

/**
 * Zodスキーマを使用してデータの型を検証する
 * @param data 検証するデータ
 * @param schema Zodスキーマ
 * @returns バリデーション結果
 */
function validationCheck<T>(
    data: unknown,
    schema: ZodSchema<T>
): ValidationResult<T> {
    const result = schema.safeParse(data);

    if (result.success) {
        return { success: true, data: result.data };
    }

    return {
        success: false,
        error: result.error.issues.map((e) => e.message).join(', '),
        details: result.error.issues,
    };
}

/**
 * Zodスキーマを使用してデータを検証し、失敗時は例外をスロー
 * @param data 検証するデータ
 * @param schema Zodスキーマ
 * @returns 検証済みデータ
 * @throws ZodError
 */
function validateOrThrow<T>(data: unknown, schema: ZodSchema<T>): T {
    return schema.parse(data);
}

/**
 * 複数のエラーメッセージをフォーマットする
 * @param error ZodError
 * @returns フォーマットされたエラーメッセージ
 */
function formatZodError(error: ZodError): string {
    return error.issues
        .map((e) => {
            const path = e.path.length > 0 ? `${e.path.join('.')}: ` : '';
            return `${path}${e.message}`;
        })
        .join('\n');
}

/**
 * よく使うスキーマのプリセット
 */
const schemas = {
    /** 空でない文字列 */
    nonEmptyString: z.string().min(1, '文字列は空にできません'),

    /** メールアドレス */
    email: z.email('有効なメールアドレスを入力してください'),

    /** URL */
    url: z.url('有効なURLを入力してください'),

    /** 正の整数 */
    positiveInt: z.number().int().positive('正の整数を入力してください'),

    /** UUID */
    uuid: z.uuid('有効なUUIDを入力してください'),

    /** 日付文字列（ISO 8601形式） */
    dateString: z.date('有効な日付形式を入力してください'),

    /** パスワード（8文字以上、英数字含む） */
    password: z
        .string()
        .min(8, 'パスワードは8文字以上である必要があります')
        .regex(/[a-zA-Z]/, 'パスワードには英字を含める必要があります')
        .regex(/[0-9]/, 'パスワードには数字を含める必要があります'),

    /** ユーザー名（3-20文字、英数字とアンダースコアのみ） */
    username: z
        .string()
        .min(3, 'ユーザー名は3文字以上である必要があります')
        .max(20, 'ユーザー名は20文字以下である必要があります')
        .regex(/^[a-zA-Z0-9_]+$/, 'ユーザー名は英数字とアンダースコアのみ使用できます'),
};

export {
    z,
    validationCheck,
    validateOrThrow,
    formatZodError,
    schemas,
    type ValidationResult,
    type ZodSchema,
    type ZodError,
};