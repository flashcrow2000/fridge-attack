import { Layout } from "@/components/layout";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";
import AuthPage from "@/pages/auth";
import Home from "@/pages/home";
import MyRecipes from "@/pages/my-recipes";
import NotFound from "@/pages/not-found";
import Profile from "@/pages/profile";
import Recipe from "@/pages/recipe";
import ShoppingList from "@/pages/shopping-list";
import { QueryClientProvider } from "@tanstack/react-query";
import { Route, Switch } from "wouter";
import { queryClient } from "./lib/queryClient";

function Router() {
  return (
    <Layout>
      <Switch>
        <ProtectedRoute path="/" component={Home} requireApiKey={false} />
        <ProtectedRoute path="/recipe/:id" component={Recipe} requireApiKey={false} />
        <ProtectedRoute path="/my-recipes" component={MyRecipes} requireApiKey={false} />
        <ProtectedRoute path="/shopping-list" component={ShoppingList} requireApiKey={false} />
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