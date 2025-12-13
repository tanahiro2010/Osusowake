"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DonationPage() {
    const router = useRouter();
    const handleCreateDonation = (async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const url = formData.get("url") as string;
        // バリデーションチェック
        if (!url || !url.startsWith("https://www.amazon.co.jp/dp/")) {
            alert("有効なAmazon.co.jpの商品URLを入力してください。");
            return;
        }

        try {
            const response = await fetch("/api/donations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ url }),
            });
            if (response.ok) {
                const data = await response.json();
                const donationId = data.id;
                router.push(`/donation/${donationId}`);
            } else {
                throw new Error("Failed to create donation");
            }
        } catch (error) {
            console.error("Error creating donation:", error);
            alert("寄付の作成中にエラーが発生しました。");
        }
    });

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 w-3/5 mx-auto space-y-5">
            <h1 className="text-2xl font-bold mb-6">寄付を始める</h1>
            <form onSubmit={handleCreateDonation} className="w-full max-w-md">
                <label htmlFor="url" className="block text-lg font-medium mb-2">
                    寄付したい商品のURLを入力してください：
                </label>
                <input
                    type="url"
                    name="url"
                    id="url"
                    required
                    className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-amber-300"
                    placeholder="https://www.amazon.co.jp/dp/:product_id"
                />
                <button
                    type="submit"
                    className="cursor-pointer w-full bg-amber-100 hover:bg-amber-200 text-amber-800 font-medium py-3 px-8 rounded-full border border-amber-300 shadow-sm transition-all duration-300 hover:shadow-md"
                >
                    寄付を作成
                </button>
            </form>

            <div className="mt-6">
                <p className="text-sm text-gray-600">
                    寄付を始めるには、Amazon.co.jpの商品ページのURLが必要です。<br />
                    寄付はアフェリエイト収益の一部を通じて行われます。<br />
                    寄付を受け取りたい人は
                    <span className="underline text-amber-600 hover:text-amber-800 cursor-pointer">
                        <Link href="/auth">こちら</Link>
                    </span>
                </p>
                
            </div>
        </main>
    );
}