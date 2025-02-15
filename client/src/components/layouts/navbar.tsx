import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  LayoutDashboard, 
  Map, 
  FileText, 
  Award, 
  Folder,
  Bell
} from "lucide-react";

export default function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4">
        <Link href="/">
          <a className="mr-6 flex items-center space-x-2">
            <img src="/logo.svg" alt="SmartCity" className="h-6 w-6" />
            <span className="font-bold">SmartCity</span>
          </a>
        </Link>
        <div className="flex items-center space-x-4 lg:space-x-6">
          <Link href="/dashboard">
            <a className="flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary">
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </a>
          </Link>
          <Link href="/map">
            <a className="flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary">
              <Map className="h-4 w-4" />
              <span>Map</span>
            </a>
          </Link>
          <Link href="/report">
            <a className="flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary">
              <FileText className="h-4 w-4" />
              <span>Report</span>
            </a>
          </Link>
          <Link href="/rewards">
            <a className="flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary">
              <Award className="h-4 w-4" />
              <span>Rewards</span>
            </a>
          </Link>
          <Link href="/cases">
            <a className="flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary">
              <Folder className="h-4 w-4" />
              <span>Cases</span>
            </a>
          </Link>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  );
}
