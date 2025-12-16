import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { DonationModal } from '@/components/modals/donation';
import { signJwt } from '@/lib/jwt';

interface DonationPageProps {
    params: Promise<{
        id: string;
    }>;
}

export async function generateMetadata({ params }: DonationPageProps): Promise<Metadata> {
    const { id } = await params;
    const donation = await fetchDonation(id);
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
            { name: donation.AmazonTracker?.user?.profile?.username ?? '匿名', url: `${process.env.NEXT_PUBLIC_APP_URL}/users/${donation.AmazonTracker?.user?.profile?.id ?? ''}` }
        ]
    };
}

export default async function DonationPage({ params }: DonationPageProps) {
    const { id } = await params;
    const [donation, token] = await Promise.all([fetchDonation(id), signJwt({ donationId: id }, '15m')]);
    if (!donation) return <div>Donation not found</div>;

    return (
        <div>
            <h1 className="font-bold mb-4 text-center">
                寄付リンクページ
            </h1>
            <iframe src={`/api/proxy?url=${encodeURIComponent(donation.url)}`} width="1000" height="500" />
            <br />
            <DonationModal 
                token={token}
                donationId={id} 
                donationUrl={donation.url} 
                authorInfo={donation.AmazonTracker?.user?.profile ?? null} 
            />
        </div>
    );
}

async function fetchDonation(id: string) {
    return prisma.productLink.findUnique({
        where: { id },
        select: {
            url: true,
            AmazonTracker: {
                select: {
                    user: { select: { profile: true } }
                }
            }
        }
    });
}