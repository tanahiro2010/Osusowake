import { prisma } from "@/lib/prisma";

export async function generateMetadata() {
    return {
        title: "ユーザー一覧 - おすそわけ",
        description: "あなたの一動作が、誰かの助けになります"
    }
}

export default async function UsersPage() {
    const profiles = await prisma.profile.findMany({
        where: {
            NOT: {
                username: undefined,
                userId: undefined
            }
        },
        select: {
            id: true,
            username: true,
        }
    });

    return (
        <main className="flex min-h-screen flex-col items-center justify-center px-24 w-3/5 mx-auto space-y-5">
            <h1 className="text-3xl font-bold mb-6">ユーザー一覧</h1>
            <ul className="space-y-4">
                {profiles.length === 0 && (
                    <li>登録されたユーザーがまだいません。</li>
                )}
                {profiles.map((profile) => (
                    <li key={profile.id}>
                        <a href={`/users/${profile.id}`} className="text-blue-600 hover:underline">
                            {profile.username ? `@${profile.username}` : `ユーザーID: ${profile.id}`}
                        </a>
                    </li>
                ))}
            </ul>
        </main>
    )
}