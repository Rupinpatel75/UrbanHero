import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { SiGoogle, SiApple, SiFacebook } from "react-icons/si";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background/50 to-background">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="text-center mb-8">
            <div className="inline-block p-4 rounded-full bg-gray-100 mb-4">
              <svg
                className="w-8 h-8 text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          </div>

          <form className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Username / Email-id"
                className="w-full"
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                className="w-full"
              />
            </div>
            <div className="text-right">
              <Link href="/forgot-password">
                <a className="text-sm text-gray-600 hover:text-gray-900">
                  Forgot Password?
                </a>
              </Link>
            </div>
            <Button className="w-full" type="submit">
              Login
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <span>-or-</span>
          </div>

          <div className="mt-6 space-y-3">
            <Button variant="outline" className="w-full">
              <SiGoogle className="mr-2 h-4 w-4" />
              Continue with Google
            </Button>
            <Button variant="outline" className="w-full">
              <SiApple className="mr-2 h-4 w-4" />
              Continue with Apple
            </Button>
            <Button variant="outline" className="w-full">
              <SiFacebook className="mr-2 h-4 w-4" />
              Continue with Facebook
            </Button>
          </div>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">Don't have an account? </span>
            <Link href="/register">
              <a className="text-primary hover:underline">Register</a>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
