import { NextResponse } from "next/server";
import type { ApiResponse } from "../../../types/types";

// ===========================================
// エラーレスポンス
// ===========================================

/**
 * バリデーションエラー (400 Bad Request)
 * リクエストの形式が不正、またはバリデーションエラーがある場合に使用します
 * @param {string} [error="リクエストが不正です"] - エラーメッセージ
 * @returns {NextResponse<ApiResponse>} 400 Bad Requestレスポンス
 * @example
 * return badRequest("メールアドレスの形式が不正です");
 */
export function badRequest(error = "リクエストが不正です"): NextResponse<ApiResponse> {
    return NextResponse.json(
        {
            success: false,
            error,
        },
        { status: 400 }
    );
}

/**
 * 認証エラー (401 Unauthorized)
 * 認証が必要、または認証情報が無効な場合に使用します
 * @param {string} [error="ログインが必要です"] - エラーメッセージ
 * @returns {NextResponse<ApiResponse>} 401 Unauthorizedレスポンス
 * @example
 * return unauthorized("認証トークンが無効です");
 */
export function unauthorized(error = "ログインが必要です"): NextResponse<ApiResponse> {
    return NextResponse.json(
        {
            success: false,
            error,
        },
        { status: 401 }
    );
}

/**
 * 権限エラー (403 Forbidden)
 * 認証済みだがリソースへのアクセス権限がない場合に使用します
 * @param {string} [error="アクセス権限がありません"] - エラーメッセージ
 * @returns {NextResponse<ApiResponse>} 403 Forbiddenレスポンス
 * @example
 * return forbidden("この操作を実行する権限がありません");
 */
export function forbidden(error = "アクセス権限がありません"): NextResponse<ApiResponse> {
    return NextResponse.json(
        {
            success: false,
            error,
        },
        { status: 403 }
    );
}

/**
 * 見つからない (404 Not Found)
 * 指定されたリソースが存在しない場合に使用します
 * @param {string} [error="見つかりませんでした"] - エラーメッセージ
 * @returns {NextResponse<ApiResponse>} 404 Not Foundレスポンス
 * @example
 * return notFound("指定されたユーザーが見つかりません");
 */
export function notFound(error = "見つかりませんでした"): NextResponse<ApiResponse> {
    return NextResponse.json(
        {
            success: false,
            error,
        },
        { status: 404 }
    );
}

/**
 * メソッド不許可 (405 Method Not Allowed)
 * HTTPメソッドが許可されていない場合に使用します
 * @param {string} [error="許可されていないメソッドです"] - エラーメッセージ
 * @returns {NextResponse<ApiResponse>} 405 Method Not Allowedレスポンス
 * @example
 * return methodNotAllowed("このエンドポイントではDELETEメソッドは許可されていません");
 */
export function methodNotAllowed(error = "許可されていないメソッドです"): NextResponse<ApiResponse> {
    return NextResponse.json(
        {
            success: false,
            error,
        },
        { status: 405 }
    );
}

/**
 * 競合エラー (409 Conflict)
 * リソースの競合、または既に存在する場合に使用します
 * @param {string} [error="既に存在します"] - エラーメッセージ
 * @returns {NextResponse<ApiResponse>} 409 Conflictレスポンス
 * @example
 * return conflict("このメールアドレスは既に登録されています");
 */
export function conflict(error = "既に存在します"): NextResponse<ApiResponse> {
    return NextResponse.json(
        {
            success: false,
            error,
        },
        { status: 409 }
    );
}

/**
 * ペイロード過大 (413 Payload Too Large)
 * リクエストのペイロードが大きすぎる場合に使用します
 * @param {string} [error="データサイズが大きすぎます"] - エラーメッセージ
 * @returns {NextResponse<ApiResponse>} 413 Payload Too Largeレスポンス
 * @example
 * return payloadTooLarge("アップロードファイルは最大10MBまでです");
 */
export function payloadTooLarge(error = "データサイズが大きすぎます"): NextResponse<ApiResponse> {
    return NextResponse.json(
        {
            success: false,
            error,
        },
        { status: 413 }
    );
}

/**
 * 処理不能 (422 Unprocessable Entity)
 * リクエストは理解できたがビジネスロジック上処理できない場合に使用します
 * @param {string} [error="処理できませんでした"] - エラーメッセージ
 * @returns {NextResponse<ApiResponse>} 422 Unprocessable Entityレスポンス
 * @example
 * return unprocessable("残高不足のため処理できません");
 */
export function unprocessable(error = "処理できませんでした"): NextResponse<ApiResponse> {
    return NextResponse.json(
        {
            success: false,
            error,
        },
        { status: 422 }
    );
}

/**
 * レート制限 (429 Too Many Requests)
 * レート制限を超えた場合に使用します
 * @param {string} [error="リクエストが多すぎます。しばらくお待ちください"] - エラーメッセージ
 * @returns {NextResponse<ApiResponse>} 429 Too Many Requestsレスポンス
 * @example
 * return tooManyRequests("1分間に最大10回までリクエスト可能です");
 */
export function tooManyRequests(error = "リクエストが多すぎます。しばらくお待ちください"): NextResponse<ApiResponse> {
    return NextResponse.json(
        {
            success: false,
            error,
        },
        { status: 429 }
    );
}

/**
 * サーバーエラー (500 Internal Server Error)
 * サーバー内部でエラーが発生した場合に使用します
 * @param {string} [error="サーバーエラーが発生しました"] - エラーメッセージ
 * @returns {NextResponse<ApiResponse>} 500 Internal Server Errorレスポンス
 * @example
 * return serverError("データベース接続エラー");
 */
export function serverError(error = "サーバーエラーが発生しました"): NextResponse<ApiResponse> {
    return NextResponse.json(
        {
            success: false,
            error,
        },
        { status: 500 }
    );
}

/**
 * サービス利用不可 (503 Service Unavailable)
 * サービスが一時的に利用できない場合に使用します（メンテナンス等）
 * @param {string} [error="サービスが一時的に利用できません"] - エラーメッセージ
 * @returns {NextResponse<ApiResponse>} 503 Service Unavailableレスポンス
 * @example
 * return serviceUnavailable("メンテナンス中です。しばらくお待ちください");
 */
export function serviceUnavailable(error = "サービスが一時的に利用できません"): NextResponse<ApiResponse> {
    return NextResponse.json(
        {
            success: false,
            error,
        },
        { status: 503 }
    );
}
