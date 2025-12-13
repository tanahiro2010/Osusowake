import { ReactProps } from "@/types/react"

export async function generateMetadata() {
    return {
        title: "寄付する | おすそわけ",
        description: "おすそわけへの寄付ページです。"
    }
}

export default function DonationLayout({ children }: ReactProps) {
    return (
        <section>
            {children}
        </section>
    )
}