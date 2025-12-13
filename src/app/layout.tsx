import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SidebarProvider } from "@/components/ui/sidebar";
import PageTransitionClient from "@/components/layout/page-transition-client";
import LoadingOverlay from "@/components/layout/load";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "おすそわけ",
  description: "あなたの一動作が、誰かの助けになります",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f8efde]`}>
        <PageTransitionClient>
          {children}
        </PageTransitionClient>
        <LoadingOverlay />
      </body>
    </html>
  );
}