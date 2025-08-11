import { PropsWithChildren } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/navigation/AppSidebar";
import { MobileTabBar } from "@/components/navigation/MobileTabBar";

const titles: Record<string, string> = {
  "/": "Today",
  "/history": "History",
  "/dashboard": "Dashboard",
  "/photos": "Photos",
  "/export": "Export",
  "/settings": "Settings",
};

export default function AppLayout({ children }: PropsWithChildren) {
  const { pathname } = useLocation();
  const title = titles[pathname] || "Health";

  return (
    <SidebarProvider>
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 items-center gap-3">
          <SidebarTrigger aria-label="Toggle navigation" />
          <NavLink to="/" className="font-semibold tracking-tight">
            Health Tracker
          </NavLink>
          <span className="ml-2 text-muted-foreground">{title}</span>
        </div>
      </header>

      <div className="flex min-h-[calc(100dvh-3.5rem)] w-full">
        <AppSidebar />
        <main className="flex-1">
          <div className="container mx-auto py-6">
            {children ?? <Outlet />}
          </div>
        </main>
      </div>

      <MobileTabBar />
    </SidebarProvider>
  );
}
