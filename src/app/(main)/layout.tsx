import { ReactProps } from "@/types/react";

export default function MainLayout({ children }: ReactProps) {
  return (
    <div className="bg-[#f8efde]">
      <main className="flex min-h-screen flex-col items-center justify-center px-24 w-3/5 mx-auto space-y-5">
        { children }
      </main>
    </div>
  );
}