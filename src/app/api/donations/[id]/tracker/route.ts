import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { ok, unauthorized, serverError } from "@/lib/helpers/response";
import { verifyJwt } from "@/lib/jwt";

interface DonationPageContext {
    params: Promise<{
        id: string;
    }>;
}

const POST = (async (req: NextRequest, context: DonationPageContext) => {
    const [{ id }, body] = await Promise.all([context.params, req.json()]);
    const token = body?.token;

    if (!token) return unauthorized('Invalid token');
    const [payload, user] = await Promise.all([
        verifyJwt(token),
        prisma.user.findFirst({
            where: { AmazonTracker: { productLinks: { some: { id } } } },
            select: { id: true, email: true, name: true }
        })
    ]);
    if (!payload) return unauthorized('Invalid token');

    try {
        const [history] = await Promise.all([
            prisma.linkUseHistory.create({
                data: {
                    productLink: { connect: { id } }
                },

                select: { productLink: true, id: true, usedAt: true }
            }),
            fetch(process.env.MAIL_API_ENDPOINT ?? "", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token: process.env.MAIL_API_TOKEN ?? '',
                    to: user?.email ?? '',
                    subject: '【おすそわけ】あなたにおすそわけがありました',
                    body: `こんにちは、${user?.name ?? 'ユーザー'}さん。<br>` +
                        `あなたへの寄付リンクが使用されました。<br><br>` +
                        `寄付リンクURL: <a href="${process.env.NEXT_PUBLIC_APP_URL}/donations/${id}">${process.env.NEXT_PUBLIC_APP_URL}/donations/${id}</a><br>` +
                        `使用日時: ${new Date().toLocaleString()}<br><br>` +
                        `ご使用ありがとうございました。<br><br>`
                })
            })
        ]);
        return ok({ history }, "Donation link usage tracked");
    } catch (error) {
        console.error("Error tracking donation link usage:", error);
        return serverError('Donation link not found');
    }
});

export { POST };