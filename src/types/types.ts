// ===========================================
// 型定義
// ===========================================

/**
 * APIレスポンスの基本型
 * @template T - レスポンスデータの型
 * @property {boolean} success - リクエストが成功したかどうか
 * @property {T} [data] - レスポンスデータ(成功時)
 * @property {string} [error] - エラーメッセージ(失敗時)
 * @property {string} [message] - 追加のメッセージ
 * @property {object} [meta] - メタデータ(ページネーション情報など)
 */
export type ApiResponse<T = unknown> = {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
    meta?: {
        page?: number;
        limit?: number;
        total?: number;
        totalPages?: number;
    };
};

/**
 * ページネーションパラメータ
 * @property {number} [page] - 現在のページ番号(デフォルト: 1)
 * @property {number} [limit] - 1ページあたりのアイテム数(デフォルト: 10)
 * @property {number} total - 全アイテム数
 */
export type PaginationParams = {
    page?: number;
    limit?: number;
    total: number;
};
