import { ReactProps } from "@/types/react";

export default function MainLayout({ children }: ReactProps) {
  return (
    <div className="bg-[#f8efde]">
      <main className="flex min-h-screen flex-col items-center justify-center px-6 sm:px-12 md:px-24 w-full sm:w-11/12 md:w-4/5 lg:w-3/5 mx-auto space-y-5">
        { children }
      </main>  
    </div>
  );
}