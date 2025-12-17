"use client";
import { Profile } from "@prisma/client";
import { useState } from "react";
import { Table } from "../ui/table";

const buttonClassName = "cursor-pointer w-full bg-amber-100 hover:bg-amber-200 text-amber-800 font-medium py-3 px-8 rounded-full border border-amber-300 shadow-sm transition-all duration-300 hover:shadow-md";

interface DonationModalProps {
    token: string;
    donationId: string;
    donationUrl: string;
    authorInfo: Profile | null;
}

export function DonationModal({ token, donationId, donationUrl, authorInfo }: DonationModalProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleOpenButton = () => setIsOpen(true);
    const handleCloseButton = () => setIsOpen(false);
    const handleOpenAmazonLink = async () => {
        try {
            fetch(`/api/donations/${donationId}/tracker`, { method: 'POST', keepalive: true, body: JSON.stringify({ token }) });
            window.open(donationUrl, '_blank');
            handleCloseButton();
        } catch (error) {
            console.error("Error opening Amazon link:", error);
        }
    }

    return (
        <>
            <div>
                <button className={buttonClassName} onClick={handleOpenButton}>
                    商品ページを開く
                </button>
            </div>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-white/60 z-50">
                    <div className="bg-white rounded-lg p-6 max-w-3xl w-full">
                        <h2 className="text-2xl font-bold mb-4">寄付リンク</h2>
                        { /* 寄付先の情報を */}
                        <Table
                            items={[
                                { label: "おすそわけする人の名前", value: authorInfo?.username ?? '匿名' },
                                { label: "おすそわけする人の自己紹介", value: authorInfo?.bio ?? '設定されていません' },
                                { label: "おすそわけする人のプロフィール", link: `/users/${authorInfo?.id}`, value: `ここをクリック` }
                            ]}
                        />

                        <div className="mt-6">
                            <p className="text-lg">
                                この方におすそわけすることに同意しますか？ <br />
                                「商品ページを開く」ボタンを押し、あなたが商品を購入することで<br />
                                この方を支援することができます。<br />
                                ご支援ありがとうございます！
                            </p>
                        </div>


                        <div className="mt-6 text-right flex space-x-4">
                            <div className="w-1/2">
                                <button className={buttonClassName} onClick={handleOpenAmazonLink}>
                                    商品ページを開く
                                </button>
                            </div>
                            <div className="w-1/2">
                                <button className={buttonClassName} onClick={handleCloseButton}>
                                    閉じる
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}