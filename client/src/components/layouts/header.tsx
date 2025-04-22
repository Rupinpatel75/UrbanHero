import { useState, useEffect } from "react";
import { Link } from "wouter";
import logo from "../../assets/logo.png"; 
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { navigate } from "wouter/use-browser-location";

export function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string; image: string } | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser)); // Parse and set user info
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/login");
  };

  const handleSettings = () => {
    navigate("/settings");
  };

  return (
    <header className="border-b">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link href="/">
            <div className="flex items-center gap-2">
              <img src={logo} alt="SmartCity" className="h-10 w-10" />
              <span className="text-xl font-semibold hidden sm:inline-block">SmartCity</span>
            </div>
          </Link>
        </div>
        <nav className="flex items-center gap-4 md:gap-6">
          {isAuthenticated && (
            <>
              <Link href="/dashboard">
                <a className="text-sm font-medium transition-colors hover:text-primary">Dashboard</a>
              </Link>
              <Link href="/map">
                <a className="text-sm font-medium transition-colors hover:text-primary">Map</a>
              </Link>
              <Link href="/report">
                <a className="text-sm font-medium transition-colors hover:text-primary">Create a report</a>
              </Link>
            </>
          )}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-600"></span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer">
                <Avatar>
                  <AvatarImage src={user?.image || "/default-avatar.png"} alt={user?.name || "User"} />
                  <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-sm">
                  <p className="font-medium">{user?.name || "Guest"}</p>
                  <p className="text-xs text-muted-foreground">{isAuthenticated ? user?.name : "Not logged in"}</p>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {isAuthenticated ? (
                <>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSettings}>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
                </>
              ) : (
                <Link href="/login">
                  <DropdownMenuItem>Log in</DropdownMenuItem>
                </Link>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
}
