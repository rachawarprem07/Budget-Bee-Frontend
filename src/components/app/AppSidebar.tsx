import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, ArrowLeftRight, Wallet, Target, Sparkles, User, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/landing/Logo";

const items = [
  { title: "Dashboard", url: "/app/dashboard", icon: LayoutDashboard },
  { title: "Transactions", url: "/app/transactions", icon: ArrowLeftRight },
  { title: "Budgets", url: "/app/budgets", icon: Wallet },
  { title: "Goals", url: "/app/goals", icon: Target },
  { title: "AI Insights", url: "/app/insights", icon: Sparkles },
] as const;

export function AppSidebar({ onProfileClick }: { onProfileClick?: () => void }) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const currentPath = useLocation().pathname;

  const handleLogout = () => {
    // Add logout logic here
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-border/60">
      <SidebarHeader className="px-4 py-5">
        {!collapsed ? (
          <Logo />
        ) : (
          <button
            onClick={onProfileClick}
            className="mx-auto h-10 w-10 rounded-xl bg-brand-yellow/20 ring-2 ring-brand-yellow shadow-lg shadow-brand-yellow/20 transition hover:bg-brand-yellow/30"
          >
            <span className="text-xs font-bold text-brand-charcoal">BB</span>
          </button>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-base font-semibold px-4 py-3">Modules</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active = currentPath.startsWith(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      tooltip={item.title}
                      className={
                        active
                          ? "bg-gradient-to-r from-brand-yellow/20 to-brand-yellow/10 text-brand-charcoal hover:from-brand-yellow/25 hover:to-brand-yellow/15 data-[active=true]:bg-gradient-to-r"
                          : "text-brand-charcoal/80 hover:bg-gradient-to-r hover:from-brand-yellow/10 hover:to-transparent hover:text-brand-charcoal"
                      }
                      size="lg"
                    >
                      <Link to={item.url} className="flex items-center gap-4">
                        <item.icon className="h-5 w-5 shrink-0" />
                        {!collapsed && <span className="font-semibold text-base">{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        {!collapsed && (
          <div className="space-y-3">
            <div className="rounded-2xl bg-gradient-to-br from-brand-yellow/20 via-brand-yellow/15 to-brand-yellow/soft p-4 ring-2 ring-brand-yellow/40 shadow-lg shadow-brand-yellow/10">
              <p className="font-bold text-brand-charcoal text-sm flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Tip of the day
              </p>
              <p className="mt-2 leading-relaxed text-brand-charcoal/80 text-sm">Set a weekly budget to stay on track effortlessly.</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold text-brand-charcoal/80 rounded-xl transition hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        )}
        {collapsed && (
          <button
            onClick={handleLogout}
            className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl text-brand-charcoal/60 transition hover:bg-red-50 hover:text-red-600"
            title="Logout"
          >
            <LogOut className="h-5 w-5" />
          </button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
