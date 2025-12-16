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
    const payload = await verifyJwt(token);
    if (!payload) return unauthorized('Invalid token');

    try {
        const history = await prisma.linkUseHistory.create({
            data: {
                productLink: { connect: { id } }
            },

            select: { productLink: true, id: true, usedAt: true }
        });
        return ok({ history }, "Donation link usage tracked");
    } catch (error) {
        console.error("Error tracking donation link usage:", error);
        return serverError('Donation link not found');
    }
});

export { POST };