import { ReactProps } from "@/types/react";

export async function generateMetadata() {
    return {
        title: "ログアウト | おすそわけ",
        description: "おすそわけのログアウトページです。"
    };
}

export default function LogoutLayout({ children }: ReactProps) {
    return (
        <section>
            {children}
        </section>
    );
}