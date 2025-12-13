import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Link2, MousePointerClick, ArrowRight } from "lucide-react";
import Link from "next/link";


export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })!;
  const [traker, links, histories] = await prisma.$transaction([
    prisma.amazonTraker.findFirst({
      where: {
        userId: session!.user.id,
      },
      select: {
        id: true,
      }
    }),
    prisma.productLink.count({
      where: {
        amazonTraker: {
          userId: session!.user.id,
        }
      }
    }),
    prisma.linkUseHistory.count({
      where: {
        productLink: {
          amazonTraker: {
            userId: session!.user.id,
          }
        }
      }
    }),
  ]);

  return (
    <div>
      {/* ヘッダー */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">ダッシュボード</h1>
        <p className="text-gray-500 mt-1">おかえりなさい、{session?.user.name ?? "ゲスト"}さん</p>
      </div>

      {/* お知らせ */}
      <div className="p-5 mb-8 border border-gray-200 rounded-lg">
        <p className="text-sm text-gray-600 leading-relaxed">
          <span className="font-medium text-gray-900">お知らせ：</span>
          ダッシュボードのデザインは現在改善中です。機能はすべて動作しますのでご安心ください。
        </p>
      </div>

      {/* 統計カード */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-6 border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">寄付リンク数</p>
              <p className="text-4xl font-bold tracking-tight">{links}</p>
            </div>
            <div className="p-3 bg-gray-100 rounded-full">
              <Link2 className="h-5 w-5 text-gray-600" />
            </div>
          </div>
        </div>

        <div className="p-6 border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">寄付受け取り回数</p>
              <p className="text-4xl font-bold tracking-tight">{histories}</p>
            </div>
            <div className="p-3 bg-gray-100 rounded-full">
              <MousePointerClick className="h-5 w-5 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* アクティビティ */}
      <div className={`mt-8 p-6 border rounded-lg ${traker ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}>
        <div className="flex items-center justify-between">
          <p className={`text-sm font-medium ${traker ? "text-green-700" : "text-red-700"}`}>
            {traker ? "アクティビティは有効です" : "トラッカーIDの設定が必要です"}
          </p>
          {!traker && (
            <Link
              href="/dashboard/profile"
              className="inline-flex items-center gap-1 text-sm font-medium text-red-700 hover:text-red-800 transition-colors hover:underline"
            >
              設定する
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
