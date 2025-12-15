import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { withAuth } from "@/lib/middleware";
import { badRequest, ok } from "@/lib/helpers/response";


const POST = (async (req: NextRequest) => withAuth(req, (async (auth) => {
    // JSONをパース
    const body = await req.json();
    const trackerId = body.trackerId;
    if (typeof trackerId !== 'string') {
        return badRequest("trackerIdは必須です。");
    }

    try {
        const result = await prisma.amazonTracker.upsert({
            where: { userId: auth.user.id },
            create: {
                trackerId: trackerId,
                user: { connect: { id: auth.user.id } },
            },
            update: {
                trackerId,
            },
        });

        return ok(result, "トラッカー情報が更新されました。");
    } catch (e) {
        console.error(e);
        return badRequest("トラッカー更新中にエラーが発生しました。");
    }
})));

export { POST };