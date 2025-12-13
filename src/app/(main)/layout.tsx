import { ReactProps } from "@/types/react";

export default function MainLayout({ children }: ReactProps) {
  return (
    <div className="bg-[#f8efde]">
        {children}
    </div>
  );
}