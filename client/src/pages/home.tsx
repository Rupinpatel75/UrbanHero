import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Search, Map, MessageSquare, Users, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, ArrowRight } from "lucide-react";

export default function Home() {
  const handleDownload = async () => {
    try {
      const response = await fetch("/api/download");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "smartcity-project.zip";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading project:", error);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <img src="/logo.svg" alt="SmartCity" className="h-10 w-10" />
              <span className="ml-2 text-xl font-semibold">SmartCity</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <a className="text-sm text-gray-600 hover:text-gray-900">Dashboard</a>
              </Link>
              <Link href="/map">
                <a className="text-sm text-gray-600 hover:text-gray-900">Map</a>
              </Link>
              <Link href="/report">
                <a className="text-sm text-gray-600 hover:text-gray-900">Create a report</a>
              </Link>
              <Link href="/login">
                <Button variant="outline">Log in</Button>
              </Link>
              <Link href="/signup">
                <Button>Sign up</Button>
              </Link>
              <Button onClick={handleDownload} variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download Project
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8">
              <div className="text-center lg:text-left lg:flex lg:items-center lg:justify-between">
                <div className="lg:w-1/2">
                  <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
                    Report infrastructure issues, improve your community
                  </h1>
                  <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg md:mt-5 md:text-xl">
                    Our app makes it easy to report infrastructure issues and connect with your community.
                  </p>
                  <div className="mt-5 sm:mt-8">
                    <Link href="/report">
                      <Button size="lg" className="px-8 py-3 text-lg">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="mt-12 lg:mt-0 lg:w-1/2">
                  <img
                    className="w-full"
                    src="/hero-illustration.svg"
                    alt="City illustration"
                  />
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">How it works</h2>
          </div>
          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mx-auto">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-medium">Report Issues</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Snap a photo and provide details about the issue
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mx-auto">
                  <Map className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-medium">Explore Map</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Check out reports from other users
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mx-auto">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-medium">Community Chat</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Join local groups to stay updated on issues
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mx-auto">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-medium">Volunteer</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Help your neighbors by volunteering
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}