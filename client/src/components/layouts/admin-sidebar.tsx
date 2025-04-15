
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  FileText,
  Map,
  Briefcase,
  UserPlus,
  MessageSquare,
  FileBarChart,
  Settings,
  LogOut,
} from "lucide-react";
import logo from "../../assets/logo.png";

export function AdminSidebar() {
  const [location] = useLocation();

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Cases",
      href: "/admin/cases",
      icon: Briefcase,
    },
    {
      title: "Case Report",
      href: "/admin/case-report",
      icon: FileText,
    },
    {
      title: "View Employees",
      href: "/admin/employees",
      icon: Users,
    },
    {
      title: "Assign Task",
      href: "/admin/assign-task",
      icon: FileText,
    },
    {
      title: "Add Employee",
      href: "/admin/add-employee",
      icon: UserPlus,
    },
    {
      title: "Manage Complain",
      href: "/admin/manage-complaint",
      icon: MessageSquare,
    },
    {
      title: "Generate Reports",
      href: "/admin/reports",
      icon: FileBarChart,
    },
    {
      title: "View Map",
      href: "/admin/map",
      icon: Map,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="w-64 bg-sidebar border-r min-h-screen">

      <nav className="space-y-1 px-2">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <a
              className={cn(
                "flex items-center px-3 py-2 text-sm rounded-md",
                location === item.href
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              <item.icon className="h-5 w-5 mr-2" />
              {item.title}
            </a>
          </Link>
        ))}
        <Link href="/admin/logout">
          <a className="flex items-center px-3 py-2 text-sm rounded-md text-red-500 hover:bg-sidebar-accent/50">
            <LogOut className="h-5 w-5 mr-2" />
            Sign Out
          </a>
        </Link>
      </nav>
    </aside>
  );
}
export default AdminSidebar;