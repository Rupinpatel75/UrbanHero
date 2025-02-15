import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { 
  FileText, 
  Map as MapIcon, 
  MessageSquare, 
  UserCheck,
  ArrowRight
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Report infrastructure issues, improve your community
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Our app makes it easy to report infrastructure issues and connect with your community. Here's how it works.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <Link href="/report">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card>
              <CardContent className="pt-6">
                <FileText className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2">Report Issues</h3>
                <p className="text-sm text-gray-500">
                  Easily report infrastructure issues in your area
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <MapIcon className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2">Explore Map</h3>
                <p className="text-sm text-gray-500">
                  View reported issues in your area
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <MessageSquare className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2">Community Chat</h3>
                <p className="text-sm text-gray-500">
                  Discuss issues and track progress
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <UserCheck className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2">Volunteer</h3>
                <p className="text-sm text-gray-500">
                  Help verify and update reports
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  {feature.icon}
                  <h3 className="font-semibold mt-4 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-500">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    title: "Easy Reporting",
    description: "Simple forms and intuitive interface for quick issue reporting",
    icon: <FileText className="h-8 w-8 text-primary" />,
  },
  {
    title: "Real-time Tracking",
    description: "Monitor the status of your reports in real-time",
    icon: <MapIcon className="h-8 w-8 text-primary" />,
  },
  {
    title: "AI-Powered Detection",
    description: "Advanced AI to verify and categorize reported issues",
    icon: <UserCheck className="h-8 w-8 text-primary" />,
  },
];
