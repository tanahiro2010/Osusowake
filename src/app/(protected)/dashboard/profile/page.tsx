import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import ProfileUpdateForm from "@/components/layout/profile";

export async function generateMetadata() {
    return {
        title: "プロフィール設定 - おすそわけ",
        description: "おすそわけのプロフィール設定ページです。",
    };
}

export default async function ProfilePage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    })!;
    console.log(session)
    const [profile, tracker] = await prisma.$transaction([
        prisma.profile.findUnique({
            where: {
                userId: session!.user.id,
            }
        }),
        prisma.amazonTracker.findFirst({
            where: {
                userId: session!.user.id,
            },
            select: {
                id: true,
                trackerId: true,
            }
        })
    ]);

    console.log([profile, tracker]);

    return (
        <div>
            <ProfileUpdateForm profile={profile} trackerId={tracker?.trackerId ?? null} />
        </div>
    );
}