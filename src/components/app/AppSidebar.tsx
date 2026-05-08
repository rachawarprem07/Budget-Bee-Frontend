import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, ArrowLeftRight, Wallet, Target, Sparkles, User } from "lucide-react";
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
  { title: "Insights", url: "/app/insights", icon: Sparkles },
] as const;

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const currentPath = useLocation().pathname;

  return (
    <Sidebar collapsible="icon" className="border-r border-border/60">
      <SidebarHeader className="px-3 py-4">
        {!collapsed ? (
          <Logo />
        ) : (
          <div className="mx-auto h-8 w-8 rounded-lg bg-brand-yellow/20 ring-1 ring-brand-yellow" />
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Modules</SidebarGroupLabel>
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
                          ? "bg-brand-yellow/15 text-brand-charcoal hover:bg-brand-yellow/20 data-[active=true]:bg-brand-yellow/20"
                          : "text-brand-charcoal/80 hover:bg-brand-yellow/10 hover:text-brand-charcoal"
                      }
                    >
                      <Link to={item.url} className="flex items-center gap-3">
                        <item.icon className="h-4 w-4 shrink-0" />
                        {!collapsed && <span className="font-medium">{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        {!collapsed && (
          <div className="rounded-xl bg-gradient-to-br from-brand-yellow/20 to-brand-yellow-soft p-3 text-xs text-brand-charcoal/80 ring-1 ring-brand-yellow/40">
            <p className="font-semibold text-brand-charcoal">Tip of the day</p>
            <p className="mt-1 leading-snug">Set a weekly budget to stay on track effortlessly.</p>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
