import { ok } from "@/lib/helpers/response";

interface API_DOC {
    path: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    description: string;
    request?: {
        headers?: Record<string, string>;
        queryParams?: Record<string, string>;
        body?: any;
    };
    response: {
        status: number;
        body: any;
    };
}

const API_DOCS: API_DOC[] = [
    {
        path: '/api/donations',
        method: 'POST',
        description: '寄付（トラッカー）から使用可能な Amazon トラッカーを割り当てて寄付リンクを生成します。',
        request: {
            body: { url: 'string (Amazon 商品ページの URL)' }
        },
        response: {
            status: 200,
            body: { id: 'string (生成された productLink の id)' }
        }
    },
    {
        path: '/api/donations/:id',
        method: 'GET',
        description: '指定した寄付リンクの情報を取得します（url と提供者のプロフィールを含む）。',
        response: {
            status: 200,
            body: { url: 'string', AmazonTracker: { user: { profile: { id: 'string', username: 'string', bio: 'string(?)' } } } }
        }
    },
    {
        path: '/api/donations/:id/tracker',
        method: 'POST',
        description: '寄付リンクの使用（クリック）を記録します。JWT トークンで認証されたリクエストを期待します。',
        request: {
            body: { token: 'string (JWT)' }
        },
        response: {
            status: 200,
            body: { history: { id: 'string', usedAt: 'ISO datetime', productLink: { id: 'string', url: 'string' } } }
        }
    },
    {
        path: '/api/proxy',
        method: 'GET',
        description: 'クエリパラメータ `url` で指定した外部 URL をサーバ経由でフェッチして返します（CORS 回避や簡易プロキシ用）。',
        request: {
            queryParams: { url: 'string (フェッチする完全 URL)' }
        },
        response: {
            status: 200,
            body: 'url が指すリソースの生のレスポンス（HTML など）'
        }
    },
    {
        path: '/api/users/tracker',
        method: 'POST',
        description: '認証済みユーザーの Amazon トラッカー ID を登録/更新します。',
        request: {
            body: { trackerId: 'string' }
        },
        response: {
            status: 200,
            body: 'アップサートされた AmazonTracker レコード' }
    },
    {
        path: '/api/users/profile',
        method: 'GET',
        description: 'プロフィール一覧をページネーション付きで取得します。',
        request: {
            queryParams: { page: 'number (1-based)', limit: 'number' }
        },
        response: { status: 200, body: 'Profile[] (user を含む)' }
    },
    {
        path: '/api/users/profile',
        method: 'POST',
        description: '認証済みユーザーのプロフィールを作成/更新します（Zod バリデーションあり）。',
        request: { body: 'Profile 入力スキーマに準ずる JSON' },
        response: { status: 200, body: '保存された Profile オブジェクト' }
    },
    {
        path: '/api/auth/[...all]',
        method: 'GET',
        description: '認証ライブラリ（Better Auth）による複数の認証エンドポイントを提供します（ログイン・コールバック等）。',
        response: { status: 200, body: '認証フローに依存するレスポンス' }
    }
];

const GET = (async () => {
    return ok({ docs: API_DOCS }, "Donation API Root");
});

export { GET };