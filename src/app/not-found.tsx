import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 w-3/5 mx-auto space-y-5">
            <h1 className="text-2xl font-bold">404 - お探しのページは見つかりませんでした</h1>
            <p className="text-center">
                お探しのページは存在しないか、移動した可能性があります。<br />
                URLをご確認の上、再度お試しください。
            </p>

            <div className="mt-10">
                <Link href="/">
                    <button className="bg-amber-100 hover:bg-amber-200 text-amber-800 font-medium py-3 px-8 rounded-full border border-amber-300 shadow-sm transition-all duration-300 hover:shadow-md">
                        ホームに戻る
                    </button>
                </Link>
            </div>
        </main>
    );
}