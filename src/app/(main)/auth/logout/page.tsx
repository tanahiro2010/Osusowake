"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutPage() {
    const router = useRouter();

    useEffect(() => {
        (async () => {
            if (confirm("ログアウトしますか？")) {
                await authClient.signOut();
                router.push("/auth");
            } else {
                router.back();
            }
        })();
    }, [router]);

    return null;
}