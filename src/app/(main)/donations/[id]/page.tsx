import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';

interface DonationPageProps {
    params: Promise<{
        id: string;
    }>;
}

export async function generateMetadata({ params }: DonationPageProps): Promise<Metadata> {
    const { id } = await params;
    const donation = await prisma.productLink.findUnique({
        where: { id },
        include: { 
            AmazonTracker: {
                select: {
                    user: {
                        select: {
                            profile: true,
                        }
                    }
                }
            } 
        }
    });
    if (!donation) {
        return {
            title: '無効な寄付リンク - おすそわけ',
            description: '無効な寄付リンクです。商品が設定されていません。',
        };
    }
    return {
        title: `寄付リンク - おすそわけ`,
        description: `こちらは「${donation.url}」への寄付リンクです。ご支援ありがとうございます！`,
        authors: [
            { name: 'おすそわけ', url: 'https://osusowake.app' },
            { name: donation.AmazonTracker.user.profile?.username || '匿名', url: `https://osusowake.app/users/${donation.AmazonTracker.user.profile?.id}` }
        ]
    };
}

export default async function DonationPage({ params }: DonationPageProps) {
    const { id } = await params;
    const donation = await prisma.productLink.findUnique({
        where: { id },
        include: { 
            AmazonTracker: {
                select: {
                    user: {
                        select: {
                            profile: true,
                        }
                    }
                }
            } 
        }
    });
    if (!donation) {
        return <div>Donation not found</div>;
    }
    return (
        <div>
            <h1>Donation Details</h1>
            <p>ID: {donation.id}</p>
            <p>Link: {donation.url}</p>
            {/* Add more donation details as needed */}
        </div>
    );
}