import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ok, badRequest } from "@/lib/helpers/response";

const payloadSchema = z.object({
    url: z.url().min(1, "URLは必須です。"),
});

const POST = (async (req: NextRequest) => {
    const [body, count] = await Promise.all([req.json(), prisma.amazonTracker.count({ where: { isUsed: false } })]);
    if (!body) {
        return badRequest("リクエストボディが必要です。");
    }
    if (count === 0) {
        return badRequest("利用可能なトラッカーがありません。");
    }
    const validation = payloadSchema.safeParse(body);
    if (!validation.success) {
        const errors = validation.error.issues.map(e =>
            `${e.path.join('.')}: ${e.message}`
        ).join(', ');
        return badRequest(`入力データが不正です: ${errors}`);
    }

    const { url } = validation.data;
    try {
        const uri = new URL(url);

        // 未使用の tracker をカウントしてランダムなオフセットを選ぶ
        if (count === 0) {
            await prisma.amazonTracker.updateMany({
                where: { isUsed: true },
                data: { isUsed: false },
            });
        }
        const randomIndex = Math.floor(Math.random() * count);
        const rows = await prisma.amazonTracker.findMany({
            where: { isUsed: false },
            select: { id: true, trackerId: true },
            skip: randomIndex,
            take: 1,
        });
        const selected = rows[0];
        if (!selected) {
            return badRequest("トラッカーが見つかりませんでした。");
        }


        const amazonUrl = `${uri.protocol}//${uri.host}${uri.pathname}?tag=${selected.trackerId}`;

        // 取得した tracker を返す（必要ならここで isUsed を更新する等の処理を追加）
        const [link] = await prisma.$transaction([
            prisma.productLink.create({
                data: {
                    url: amazonUrl,
                    AmazonTracker: { connect: { id: selected.id } },
                }
            }),
            prisma.amazonTracker.update({
                where: { id: selected.id },
                data: { isUsed: true },
            })
        ]);
        console.log("Generated link: ", link);
        return ok({ id: link.id });
    } catch (e) {
        console.error(e);
        return badRequest("処理中にエラーが発生しました。");
    }
});

export { POST };