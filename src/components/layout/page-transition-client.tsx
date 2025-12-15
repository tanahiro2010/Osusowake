'use client'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function PageTransitionClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showTopBar, setShowTopBar] = useState<boolean>(false);

  // 簡易プログレス風の表示：パス名が変わった直後にトップバーを短時間表示する
  useEffect(() => {
    // 非同期に状態変更して即時のカスケードレンダーを避ける
    const showTimer = setTimeout(() => setShowTopBar(true), 0);
    const hideTimer = setTimeout(() => setShowTopBar(false), 450); // 450ms で消す（調整可）
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    }
  }, [pathname]);

  return (
    <>
      {/* 簡易トップ進捗バー */}
      <div className={`top-progress ${showTopBar ? 'active' : ''}`} />
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
          style={{ minHeight: '100vh' }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <style jsx global>{`
        .top-progress {
          position: fixed;
          left: 0;
          top: 0;
          height: 3px;
          width: 0%;
          background: linear-gradient(90deg, #06b6d4, #3b82f6);
          z-index: 9999;
          transition: width 380ms ease;
        }
        .top-progress.active { width: 82%; } /* 遷移中の見せ方 */
      `}</style>
    </>
  );
}