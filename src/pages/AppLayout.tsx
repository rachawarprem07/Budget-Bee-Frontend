import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app/AppSidebar";
import { Bell, User } from "lucide-react";

function AppLayout() {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/app/profile');
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/30">
        <AppSidebar onProfileClick={handleProfileClick} />
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-border/60 bg-background/80 px-4 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="text-brand-charcoal" />
              <span className="text-sm font-medium text-brand-charcoal/70">Welcome back 👋</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative rounded-full p-2 text-brand-charcoal/70 transition hover:bg-brand-yellow/10 hover:text-brand-charcoal">
                <Bell className="h-4 w-4" />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-brand-yellow" />
              </button>
              <button
                onClick={handleProfileClick}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-yellow text-xs font-bold text-brand-charcoal ring-2 ring-white transition hover:bg-brand-yellow/80"
              >
                BB
              </button>
            </div>
          </header>
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default AppLayout;
