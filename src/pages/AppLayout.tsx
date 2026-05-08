import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app/AppSidebar";
import { Bell, User, LogOut, ChevronDown } from "lucide-react";

function AppLayout() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleProfileClick = () => {
    navigate('/app/profile');
    setShowDropdown(false);
  };

  const handleLogout = () => {
    setShowDropdown(false);
    // Add logout logic here
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/30">
        <AppSidebar />
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
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-yellow text-xs font-bold text-brand-charcoal ring-2 ring-white transition hover:bg-brand-yellow/80"
                >
                  BB
                </button>
                {showDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-border/60 bg-background shadow-lg">
                    <button
                      onClick={handleProfileClick}
                      className="flex w-full items-center gap-3 px-3 py-2 text-sm text-brand-charcoal transition hover:bg-brand-yellow/10"
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 px-3 py-2 text-sm text-brand-charcoal transition hover:bg-brand-yellow/10"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
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
