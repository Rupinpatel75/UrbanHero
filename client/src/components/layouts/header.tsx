import { Link } from "wouter";
import logo from '../../assets/logo.png';// Corrected path
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

export function Header() {
  // This would typically come from your auth context
  const user = {
    name: "Admin",
    image: "/avatar.png", // Replace with actual path
  };

  return (
    <header className="border-b">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <div className="flex items-center gap-2">
              <img src={logo} alt="SmartCity" className="h-10 w-10" />
              <span className="text-xl font-semibold hidden sm:inline-block">SmartCity</span>
            </div>
          </Link>
        </div>
        
        <nav className="flex items-center gap-4">
          <Link href="/dashboard">
            <span className="text-sm font-medium transition-colors hover:text-primary">Dashboard</span>
          </Link>
          <Link href="/map">
            <span className="text-sm font-medium transition-colors hover:text-primary">Map</span>
          </Link>
          <Link href="/report">
            <span className="text-sm font-medium transition-colors hover:text-primary">Create a report</span>
          </Link>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-600"></span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer">
                <Avatar>
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-sm">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.name}</p>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
}
