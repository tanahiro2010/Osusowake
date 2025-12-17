import { Metadata } from "next";
import { prisma } from "@/lib/prisma";

const PAGE_SIZE = 20;

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `寄付リンク一覧 - おすそわけ`,
        description: `これまでに作成された寄付リンクの一覧ページです。ご支援ありがとうございます！`,
        authors: [
            { name: "おすそわけ", url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000" }
        ]
    };
}

interface DonationLinksPageProps {
    searchParams: Promise<{
        page?: string;
    }>;
}

export default async function DonationLinksPage({ searchParams }: DonationLinksPageProps) {
    const { page } = await searchParams;
    const currentPage = page ? parseInt(page, 10) : 1;
    const offset = (currentPage - 1) * PAGE_SIZE;

    const donations = await prisma.productLink.findMany({
        where: {
            NOT: { AmazonTrackerId: undefined }
        },
        select: {
            id: true,
            url: true,
        },
        skip: offset,
        take: PAGE_SIZE,
    });

    return (<>
        <h1 className="text-2xl font-bold mb-4">寄付リンク一覧</h1>
        <ul className="list-disc list-inside">
            {donations.map((donation) => (
                <li key={donation.id}>
                    <a href={`/donations/${donation.id}`} className="text-blue-600 hover:underline">
                        {donation.url.split('?')[0]}
                    </a>
                </li>
            ))}
        </ul>
    </>);
}