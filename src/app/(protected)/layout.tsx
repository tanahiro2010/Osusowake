import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactProps } from "@/types/react";
import { auth } from "@/lib/auth";


export default async function ProtectedLayout({ children }: ReactProps) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (session?.session) {
        return (
        <SidebarProvider>
            { children }
        </SidebarProvider>
    );
    } else {
        redirect("/auth");
    }
}