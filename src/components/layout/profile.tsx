"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
    trackerId: string | null;
}
export default function ProfileUpdateForm({ profile, trackerId }: ProfileUpdateFormProps) {
    const router = useRouter();
    const [isTrackerUpdating, setIsTrackerUpdating] = useState(false);
    const [isProfileUpdating, setIsProfileUpdating] = useState(false);

    const handleUpdateTracker = (async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsTrackerUpdating(true);
        const formData = new FormData(e.currentTarget);
        const trackerId = formData.get("trackerId") as string;

        try {
            const response = await fetch("/api/users/tracker", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ trackerId })
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

        setIsTrackerUpdating(false);
        router.refresh();
    });
    const handleUpdateProfile = (async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsProfileUpdating(true);
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
                body: JSON.stringify({ username, twitter_id: twitterId, instagram_id: instagramId, bio })
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

        setIsProfileUpdating(false);
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
                <form onSubmit={handleUpdateTracker} className="space-y-4">
                    <h2 className="text-xl font-semibold mb-2">トラッカー情報更新</h2>
                    <div>
                        <label className="block mb-1 font-medium">トラッカーID*:</label>
                        <Input
                            type="text"
                            name="trackerId"
                            placeholder="必須（入力次第有効になります）"
                            defaultValue={trackerId ?? ""}
                        />
                    </div>
                    <Button className={`w-full cursor-pointer ${isTrackerUpdating ? "opacity-50 cursor-not-allowed" : ""}`} disabled={isTrackerUpdating}>
                        {isTrackerUpdating ? "更新中..." : "更新"}
                    </Button>
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
                    <Button className={`w-full cursor-pointer ${isProfileUpdating ? "opacity-50 cursor-not-allowed" : ""}`} disabled={isProfileUpdating}>
                        {isProfileUpdating ? "更新中..." : "更新"}
                    </Button>
                </form>
                <Button className="w-full cursor-pointer" onClick={handleClickCopyProfileUrl} variant={"outline"}>
                    プロフィールURLをコピーする
                </Button>
            </div>
        </div>
    );
}