import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { ok, notFound } from "@/lib/helpers/response";

interface DonationPageContext {
    params: Promise<{
        id: string;
    }>;
}

const GET = (async (_: NextRequest, context: DonationPageContext) => {
    const { id } = await context.params;
    const donation = await prisma.productLink.findUnique({
        where: { id },
        select: {
            url: true,
            AmazonTracker: {
                select: {
                    user: { select: { profile: true } }
                }
            }
        }
    });
    if (!donation) {
        return notFound('Donation not found');
    }

    return ok(donation);
});

export { GET };