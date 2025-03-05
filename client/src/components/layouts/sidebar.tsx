
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  LineChart,
  Award,
  Settings,
  LogOut,
} from "lucide-react";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/users",
    icon: Users,
  },
  {
    title: "Cases",
    href: "/cases",
    icon: Briefcase,
  },
  {
    title: "Case Report",
    href: "/case-report",
    icon: LineChart,
  },
  {
    title: "Rewards",
    href: "/rewards",
    icon: Award,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const [location] = useLocation();

  return (
    <aside className="w-64 min-h-screen border-r bg-background hidden md:block">
      <div className="flex flex-col h-full">
        <div className="flex-1 py-4">
          <nav className="grid items-start px-4 gap-2">
            {navItems.map((item, index) => {
              const isActive = location === item.href;
              const IconComponent = item.icon;
              
              return (
                <Link href={item.href} key={index}>
                  <a
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                      isActive
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <IconComponent className={cn("h-5 w-5", isActive ? "text-primary" : "")} />
                    <span>{item.title}</span>
                  </a>
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="p-4 border-t">
          <Link href="/logout">
            <a className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground">
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </a>
          </Link>
        </div>
      </div>
    </aside>
  );
}
