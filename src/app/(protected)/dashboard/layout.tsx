import { ReactProps } from "@/types/react";
import { AppSidebar } from "@/components/layout/sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({ children }: ReactProps) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-14 items-center gap-4 border-b px-6">
                    <SidebarTrigger />
                </header>
                <main className="flex-1 p-6 max-w-4xl mx-auto w-full">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}