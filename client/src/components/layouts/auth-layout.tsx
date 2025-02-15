import { SidebarNav } from "./sidebar-nav";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <SidebarNav />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
