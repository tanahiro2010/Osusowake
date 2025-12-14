import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "おすそわけ",
  description: "あなたの一動作が、誰かの助けになります",

  openGraph: {
    title: "おすそわけ",
    description: "あなたの一動作が、誰かの助けになります",
    url: APP_URL,
    siteName: "おすそわけ",
    images: [
      {
        url: `${APP_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "おすそわけ",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "おすそわけ",
    description: "あなたの一動作が、誰かの助けになります",
    images: [`${APP_URL}/og-image.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <PageTransitionClient>
          {children}
        </PageTransitionClient>
        <LoadingOverlay />
      </body>
    </html>
  );
}