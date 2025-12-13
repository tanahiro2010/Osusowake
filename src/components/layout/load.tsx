"use client";
import { useEffect, useState } from "react";

export default function LoadingOverlay() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // リロード時はローディングをリセット
    localStorage.setItem("loading", "false");

    const checkLoading = () => {
      const loading = localStorage.getItem("loading");
      setIsLoading(loading === "true");
    };

    // 初回チェック
    checkLoading();

    // localStorageの変更を監視（他タブからの変更用）
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "loading") {
        setIsLoading(e.newValue === "true");
      }
    };

    // カスタムイベントで同一タブ内の変更も監視
    const handleCustomEvent = () => {
      checkLoading();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("loadingChange", handleCustomEvent);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("loadingChange", handleCustomEvent);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 背景ぼかし */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm" />

      {/* スピナー */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-gray-800" />
        <p className="text-sm text-gray-600">読み込み中...</p>
      </div>
    </div>
  );
}

// ヘルパー関数: ローディング状態を設定
export function setLoading(value: boolean) {
  localStorage.setItem("loading", value ? "true" : "false");
  // 同一タブ内でも検知できるようにカスタムイベントを発火
  window.dispatchEvent(new Event("loadingChange"));
}