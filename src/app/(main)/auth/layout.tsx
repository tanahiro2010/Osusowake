import { ReactProps } from "@/types/react";

export async function generateMetadata() {
  return {
    title: "認証 | おすそわけ",
    description: "おすそわけの認証ページです。",
  };
}

export default async function AuthLayout({ children }: ReactProps) {
  return <>{children}</>;
}
