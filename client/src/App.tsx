import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { AuthLayout } from "@/components/layouts/auth-layout";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import Map from "@/pages/map";
import Report from "@/pages/report";
import Rewards from "@/pages/rewards";
import Cases from "@/pages/cases";

function Router() {
  return (
    <div className="min-h-screen bg-background">
      <Switch>
        {/* Public routes */}
        <Route path="/" component={Home} />
        <Route path="/login" component={Login} />

        {/* Protected routes with AuthLayout */}
        <Route path="/dashboard">
          <AuthLayout>
            <Dashboard />
          </AuthLayout>
        </Route>
        <Route path="/map">
          <AuthLayout>
            <Map />
          </AuthLayout>
        </Route>
        <Route path="/report">
          <AuthLayout>
            <Report />
          </AuthLayout>
        </Route>
        <Route path="/rewards">
          <AuthLayout>
            <Rewards />
          </AuthLayout>
        </Route>
        <Route path="/cases">
          <AuthLayout>
            <Cases />
          </AuthLayout>
        </Route>
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;