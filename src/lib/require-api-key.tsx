import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function RequireApiKey({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  if (!user?.spoonacularApiKey) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="p-6">
            <h1 className="text-2xl font-bold mb-4">API Key Required</h1>
            <p className="text-muted-foreground mb-6">
              To use RecipeGenie, you need to set up your Spoonacular API key first. 
              You can get a free API key from Spoonacular.
            </p>
            <Button asChild>
              <a href="/profile">
                Set up API Key
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
