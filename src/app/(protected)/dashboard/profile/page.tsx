import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import ProfileUpdateForm from "@/components/layout/profile";

export default async function ProfilePage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    })!;
    console.log(session)
    const [profile, traker] = await prisma.$transaction([
        prisma.profile.findUnique({
            where: {
                userId: session!.user.id,
            }
        }),
        prisma.amazonTraker.findFirst({
            where: {
                userId: session!.user.id,
            },
            select: {
                id: true,
                trakerId: true,
            }
        })
    ]);

    console.log([profile, traker]);

    return (
        <div>
            <ProfileUpdateForm profile={profile} trakerId={traker?.trakerId ?? null} />
        </div>
    );
}