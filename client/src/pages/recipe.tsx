import { useParams } from "wouter";
import { mockRecipes } from "@/lib/mock-data";
import { ShoppingList } from "@/components/shopping-list";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Clock, Users } from "lucide-react";

export default function Recipe() {
  const { id } = useParams();
  const recipe = mockRecipes.find(r => r.id === id);

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {recipe.name}
              </h1>
              
              <div className="flex gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{recipe.cookTime} mins</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{recipe.servings} servings</span>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="font-semibold text-lg mb-2">Ingredients</h2>
                <div className="flex flex-wrap gap-2">
                  {recipe.ingredients.map((ing, i) => (
                    <Badge 
                      key={i}
                      variant={ing.available ? "default" : "secondary"}
                    >
                      {ing.name}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h2 className="font-semibold text-lg mb-2">Instructions</h2>
                <ol className="list-decimal pl-4 space-y-2">
                  {recipe.instructions.map((step, i) => (
                    <li key={i} className="text-gray-700">{step}</li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="w-full md:w-72">
              <ShoppingList 
                ingredients={recipe.ingredients.filter(ing => !ing.available)}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
