import { NextResponse } from "next/server";
import type { ApiResponse, PaginationParams } from "../../../types/types";

// ===========================================
// 成功レスポンス
// ===========================================

/**
 * 成功レスポンス (200 OK)
 * @template T - レスポンスデータの型
 * @param {T} data - レスポンスデータ
 * @param {string} [message] - 追加のメッセージ
 * @returns {NextResponse<ApiResponse<T>>} 200 OKレスポンス
 * @example
 * return ok({ id: 1, name: "太郎" }, "取得しました");
 */
export function ok<T>(data: T, message?: string): NextResponse<ApiResponse<T>> {
    return NextResponse.json(
        {
            success: true,
            data,
            message,
        },
        { status: 200 }
    );
}

/**
 * 作成成功レスポンス (201 Created)
 * リソースが正常に作成された際に使用します
 * @template T - レスポンスデータの型
 * @param {T} data - 作成されたリソースのデータ
 * @param {string} [message="作成しました"] - 成功メッセージ
 * @returns {NextResponse<ApiResponse<T>>} 201 Createdレスポンス
 * @example
 * return created({ id: 1, name: "新規ユーザー" });
 */
export function created<T>(data: T, message = "作成しました"): NextResponse<ApiResponse<T>> {
    return NextResponse.json(
        {
            success: true,
            data,
            message,
        },
        { status: 201 }
    );
}

/**
 * 更新成功レスポンス (200 OK)
 * リソースが正常に更新された際に使用します
 * @template T - レスポンスデータの型
 * @param {T} data - 更新されたリソースのデータ
 * @param {string} [message="更新しました"] - 成功メッセージ
 * @returns {NextResponse<ApiResponse<T>>} 200 OKレスポンス
 * @example
 * return updated({ id: 1, name: "更新後の名前" });
 */
export function updated<T>(data: T, message = "更新しました"): NextResponse<ApiResponse<T>> {
    return NextResponse.json(
        {
            success: true,
            data,
            message,
        },
        { status: 200 }
    );
}

/**
 * 削除成功レスポンス (200 OK)
 * リソースが正常に削除された際に使用します
 * @param {string} [message="削除しました"] - 成功メッセージ
 * @returns {NextResponse<ApiResponse<null>>} 200 OKレスポンス（データはnull）
 * @example
 * return deleted("ユーザーを削除しました");
 */
export function deleted(message = "削除しました"): NextResponse<ApiResponse<null>> {
    return NextResponse.json(
        {
            success: true,
            data: null,
            message,
        },
        { status: 200 }
    );
}

/**
 * ページネーション付きレスポンス (200 OK)
 * リストデータをページネーション情報とともに返す際に使用します
 * @template T - 配列要素の型
 * @param {T[]} data - レスポンスデータの配列
 * @param {PaginationParams} pagination - ページネーション情報
 * @param {number} [pagination.page=1] - 現在のページ番号
 * @param {number} [pagination.limit=10] - 1ページあたりのアイテム数
 * @param {number} pagination.total - 全アイテム数
 * @returns {NextResponse<ApiResponse<T[]>>} ページネーション情報を含む200 OKレスポンス
 * @example
 * return paginated(users, { page: 1, limit: 20, total: 100 });
 */
export function paginated<T>(
    data: T[],
    pagination: PaginationParams
): NextResponse<ApiResponse<T[]>> {
    const { page = 1, limit = 10, total } = pagination;
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json(
        {
            success: true,
            data,
            meta: {
                page,
                limit,
                total,
                totalPages,
            },
        },
        { status: 200 }
    );
}

/**
 * 空レスポンス (204 No Content)
 * リクエストは成功したがレスポンスボディが不要な場合に使用します
 * @returns {NextResponse} 204 No Contentレスポンス
 * @example
 * return noContent();
 */
export function noContent(): NextResponse {
    return new NextResponse(null, { status: 204 });
}
