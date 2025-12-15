import { NextResponse } from "next/server";
import type { ApiResponse } from "../../../types/types";
import { serverError } from "./error";

// ===========================================
// ユーティリティ
// ===========================================

/**
 * カスタムステータスコードでレスポンスを返す
 * 標準的なレスポンス関数でカバーできない特殊なステータスコードを使用する場合に利用します
 * @template T - レスポンスデータの型
 * @param {ApiResponse<T>} data - APIレスポンスデータ
 * @param {number} status - HTTPステータスコード
 * @returns {NextResponse<ApiResponse<T>>} カスタムステータスコードのレスポンス
 * @example
 * return json({ success: true, data: result }, 206);
 */
export function json<T>(
    data: ApiResponse<T>,
    status: number
): NextResponse<ApiResponse<T>> {
    return NextResponse.json(data, { status });
}

/**
 * エラーをキャッチしてサーバーエラーレスポンスを返す
 * try-catchブロックでキャッチしたエラーを適切なレスポンスに変換します
 * 開発環境ではエラーメッセージを含めますが、本番環境では汎用メッセージを返します
 * @param {unknown} error - キャッチしたエラー
 * @returns {NextResponse<ApiResponse>} 500 Internal Server Errorレスポンス
 * @example
 * try {
 *   // 処理
 * } catch (error) {
 *   return handleError(error);
 * }
 */
export function handleError(error: unknown): NextResponse<ApiResponse> {
    console.error("API Error:", error);

    if (error instanceof Error) {
        // 開発環境ではエラーメッセージを返す
        if (process.env.NODE_ENV === "development") {
            return serverError(error.message);
        }
    }

    return serverError();
}

/**
 * APIハンドラをラップしてエラーハンドリングを自動化
 * APIハンドラ関数を渡すことで、自動的にエラーハンドリングを行います
 * @template T - レスポンスデータの型
 * @param {() => Promise<NextResponse<ApiResponse<T>>>} handler - APIハンドラ関数
 * @returns {Promise<NextResponse<ApiResponse<T>>>} エラーハンドリング付きのレスポンス
 * @example
 * export const GET = () => withErrorHandler(async () => {
 *   const data = await fetchData();
 *   return ok(data);
 * });
 */
export function withErrorHandler<T>(
    handler: () => Promise<NextResponse<ApiResponse<T>>>
): Promise<NextResponse<ApiResponse<T>>> {
    return handler().catch((error) => handleError(error) as NextResponse<ApiResponse<T>>);
}
