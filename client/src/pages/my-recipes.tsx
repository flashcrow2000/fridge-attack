import { Card, CardContent } from "@/components/ui/card";
import { BookMarked } from "lucide-react";

export default function MyRecipes() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <BookMarked className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">My Recipes</h1>
          </div>
          
          <CardContent className="p-0">
            <p className="text-muted-foreground">
              Your saved recipes will appear here.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
