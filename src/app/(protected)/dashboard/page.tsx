import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Link2, MousePointerClick } from "lucide-react";


export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })!;
  const [links, histories] = await prisma.$transaction([
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
    <div className="max-w-4xl mx-auto">
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
      <div className="mt-8 p-6 border border-gray-200 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">最近のアクティビティ</h2>
        <p className="text-sm text-gray-500">まだアクティビティがありません</p>
      </div>
    </div>
  );
}
