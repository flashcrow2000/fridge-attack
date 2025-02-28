import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { Redirect, Route } from "wouter";
import { RequireApiKey } from "./require-api-key";

export function ProtectedRoute({
  path,
  component: Component,
  requireApiKey = true,
}: {
  path: string;
  component: () => React.JSX.Element;
  requireApiKey?: boolean;
}) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Route path={path}>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-border" />
        </div>
      </Route>
    );
  }

  if (!user) {
    return (
      <Route path={path}>
        <Redirect to="/auth" />
      </Route>
    );
  }

  return (
    <Route path={path}>
      {requireApiKey ? (
        <RequireApiKey>
          <Component />
        </RequireApiKey>
      ) : (
        <Component />
      )}
    </Route>
  );
}