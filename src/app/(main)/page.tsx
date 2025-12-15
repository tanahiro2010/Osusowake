import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const iconSize = 200;
  return (
    <>
      <Image src={`/logo.png`} alt="Icon" width={iconSize} height={iconSize} />
      <h1 className="text-xl">
        ちいさなおすそわけ
      </h1>

      <div className="mt-5">
        あなたのひと手間が、誰かの生活の助けになります。
        <br />
        アフェリエイト型寄付プラットフォーム「おすそわけ」へようこそ。
        <br /><br />

        このサイトでは、あなたがオンラインで商品を購入する際に発生するアフェリエイト収益の一部を、
        <span>自身の好きなインフルエンサー</span>
        や
        <span>公共団体</span>
        、そして
        <span>生活に困っている人々</span>
        に寄付することができます。
        <br />

        例えば、日用品や書籍、電子機器など、普段のショッピングを通じて、環境保護団体や教育支援団体、医療支援団体などに貢献できます。
        <br />
        あなたの「おすそわけ」が、より良い社会の実現に繋がります。
        <br /><br />

        ぜひ、この機会に参加してみませんか？
      </div>

      <div className="mt-10">
        <Link href="/donations">
          <button className="bg-amber-100 hover:bg-amber-200 text-amber-800 font-medium py-3 px-8 rounded-full border border-amber-300 shadow-sm transition-all duration-300 hover:shadow-md">
            今すぐ寄付を始める
          </button>
        </Link>
      </div>
    </>
  );
}