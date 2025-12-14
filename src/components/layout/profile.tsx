"use client";
import { useRouter } from "next/navigation";
import { Profile } from "@prisma/client";
import { Button } from "../ui/button";

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className={`w-full border border-gray-300 rounded px-3 py-2 ${props.className}`}
        />
    );
}

interface ProfileUpdateFormProps {
    profile: Profile | null;
    trakerId: string | null;
}
export default function ProfileUpdateForm({ profile, trakerId }: ProfileUpdateFormProps) {
    const router = useRouter();
    const handleUpdateTraker = (async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const trakerId = formData.get("trakerId") as string;

        try {
            const response = await fetch("/api/users/traker", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ trakerId })
            });
            if (response.ok) {
                alert("トラッカー情報が更新されました。");
            } else {
                const data = await response.json();
                alert(`トラッカーの更新に失敗しました: ${data.message}`);
                throw new Error(data.message);
            }
        } catch (e) {
            console.error("トラッカー更新エラー:", e);
            alert("トラッカーの更新中にエラーが発生しました。");
        }

        router.refresh();
    });
    const handleUpdateProfile = (async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const username = formData.get("username") as string;
        const twitterId = formData.get("twitterId") as string;
        const instagramId = formData.get("instagramId") as string;
        const bio = formData.get("bio") as string;

        try {
            const response = await fetch("/api/users/profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, twitterId, instagramId, bio })
            });
            if (response.ok) {
                alert("プロフィール情報が更新されました。");
            } else {
                const data = await response.json();
                alert(`プロフィールの更新に失敗しました: ${data.message}`);
                throw new Error(data.message);
            }
        } catch (e) {
            console.error("プロフィール更新エラー:", e);
            alert("プロフィールの更新中にエラーが発生しました。");
        }

        router.refresh();
    });
    const handleClickCopyProfileUrl = (() => {
        if (!profile) return alert("プロフィール情報が存在しません。");
        const profileUrl = `${window.location.origin}/public/${profile?.id}`;
        navigator.clipboard.writeText(profileUrl);
        alert("プロフィールURLをコピーしました: " + profileUrl);
    });

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">プロフィール更新</h1>
            
            <div className="space-y-8">
                <form onSubmit={handleUpdateTraker} className="space-y-4">
                    <h2 className="text-xl font-semibold mb-2">トラッカー情報更新</h2>
                    <div>
                        <label className="block mb-1 font-medium">トラッカーID*:</label>
                        <Input
                            type="text"
                            name="trakerId"
                            placeholder="必須（入力次第有効になります）"
                            defaultValue={trakerId ?? ""}
                        />
                    </div>
                    <Button className="w-full cursor-pointer">更新</Button>
                </form>

                <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <h2 className="text-xl font-semibold mb-2">ユーザー情報更新</h2>
                    <div>
                        <label className="block mb-1 font-medium">名前:</label>
                        <Input
                            type="text"
                            name="username"
                            defaultValue={profile?.username ?? ""}
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Twitter ID:</label>
                        <Input
                            type="text"
                            name="twitterId"
                            defaultValue={profile?.twitter_id ?? ""}
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Instagram ID:</label>
                        <Input
                            type="text"
                            name="instagramId"
                            defaultValue={profile?.instagram_id ?? ""}
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">自己紹介:</label>
                        <textarea
                            name="bio"
                            defaultValue={profile?.bio ?? ""}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            rows={4}
                        />
                    </div>
                    <Button className="w-full cursor-pointer">更新</Button>
                </form>
                <Button className="w-full cursor-pointer" onClick={handleClickCopyProfileUrl} variant={"outline"}>
                    プロフィールURLをコピーする
                </Button>
            </div>
        </div>
    );
}