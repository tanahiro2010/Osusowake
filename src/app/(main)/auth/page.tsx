"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Google } from "@deemlol/next-icons";
import { authClient } from "@/lib/auth-client";
import { signIn } from "@/lib/auth-client";
import { setLoading } from "@/components/layout/load";

export default function AuthPage() {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    await signIn.social({
      provider: "google",
      callbackURL: "/dashboard", // ログイン成功後のリダイレクト先
    });
    setLoading(false);
  };
  const isAuthed = async (): Promise<boolean> => {
    const user = await authClient.getSession();
    return !!user.data;
  };
  useEffect(() => {
    setLoading(true);
    isAuthed().then((isAuthed) => {
      setLoading(false);
      if (isAuthed) {
        router.push("/dashboard");
      }
    });
  }, [router]);

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">認証ページ</h1>
      <button
        onClick={handleGoogleSignIn}
        className="rounded-full border border-gray-600 py-3 px-8 flex justify-center items-center space-x-2 transition-all duration-300 cursor-pointer hover:shadow-md"
      >
        <Google className="mr-2" />
        Googleでサインイン
      </button>
    </>
  );
}
