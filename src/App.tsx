import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Layout } from "@/components/layout";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Recipe from "@/pages/recipe";
import MyRecipes from "@/pages/my-recipes";
import ShoppingList from "@/pages/shopping-list";
import Profile from "@/pages/profile";
import AuthPage from "@/pages/auth";

function Router() {
  return (
    <Layout>
      <Switch>
        <ProtectedRoute path="/" component={Home} />
        <ProtectedRoute path="/recipe/:id" component={Recipe} />
        <ProtectedRoute path="/my-recipes" component={MyRecipes} />
        <ProtectedRoute path="/shopping-list" component={ShoppingList} />
        <ProtectedRoute path="/profile" component={Profile} requireApiKey={false} />
        <Route path="/auth" component={AuthPage} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;