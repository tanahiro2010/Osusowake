import { Home, User2, Settings, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";

const mainItems = [
  {
    title: "ダッシュボード",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "プロフィール",
    url: "/dashboard/profile",
    icon: User2,
  },
];

const settingsItems = [
  {
    title: "設定",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="おすそわけ"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="text-lg font-bold">おすそわけ</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="flex flex-col items-center justify-between">
        <SidebarGroup>
          <SidebarGroupLabel>メイン</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>その他</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <Link href="/auth/logout">
                <LogOut className="h-4 w-4" />
                <span>ログアウト</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
