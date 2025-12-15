import { NextRequest } from "next/server";
import { ProfileInputSchema, PaginationQuerySchema } from "@/types/zod/prisma/profile";
import { prisma } from "@/lib/prisma";
import { withAuth } from "@/lib/middleware";
import { badRequest, ok } from "@/lib/helpers/response";


const POST = (async (req: NextRequest) => withAuth(req, (async (auth) => {
    // JSONをパース
    const body = await req.json();
    
    // Zodでバリデーション
    const validation = ProfileInputSchema.safeParse(body);
    
    if (!validation.success) {
        const errors = validation.error.issues.map(e => 
            `${e.path.join('.')}: ${e.message}`
        ).join(', ');
        return badRequest(`入力データが不正です: ${errors}`);
    }

    const data = validation.data;

    try {
        const result = await prisma.profile.upsert({
            where: { userId: auth.user.id },
            create: {
                ...data,
                user: { connect: { id: auth.user.id } }
            },
            update: data
        });

        return ok(result, "プロフィールが正常に保存されました。");
    } catch (e) {
        console.error(e);
        return badRequest("プロフィールの保存中にエラーが発生しました。");
    }
})));

const GET = (async (req: NextRequest) => {
    // クエリパラメータをバリデーション
    const queryParams = {
        page: req.nextUrl.searchParams.get("page") ?? undefined,
        limit: req.nextUrl.searchParams.get("limit") ?? undefined,
    };
    const validation = PaginationQuerySchema.safeParse(queryParams);
    
    if (!validation.success) {
        return badRequest("無効なページネーションパラメータです。");
    }
    
    const { page, limit } = validation.data;
    const skip = (page - 1) * limit;

    try { 
        const profiles = await prisma.profile.findMany({
            skip: skip,
            take: limit,
            include: {
                user: true,
            },
        });
        return ok(profiles);
    } catch (e) {
        console.error(e);
        return badRequest("プロフィールの取得中にエラーが発生しました。");
    }
});

export { POST, GET };