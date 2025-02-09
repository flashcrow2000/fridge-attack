import { Clock, Heart, ShoppingCart, Users } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { useToast } from "../hooks/use-toast";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

export function RecipeCard({ recipe }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();
  const availableCount = recipe.ingredients.filter(i => i.available).length;
  const totalCount = recipe.ingredients.length;
  const missingIngredients = recipe.ingredients.filter(i => !i.available);

  const handleFavoriteClick = (e) => {
    e.preventDefault(); // Prevent navigation
    setIsFavorite(!isFavorite);
  };

  const handleShoppingCartClick = (e) => {
    e.preventDefault(); // Prevent navigation
    // Will be implemented when we add shopping list functionality
    console.log("Adding to shopping list:", missingIngredients);
    toast({
      title: "Added to Shopping List",
      description: `Added ${missingIngredients.length} ingredients to your shopping list`,
      duration: 2000,
    });
  };

  return (
    <Link href={`/recipe/${recipe.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
        <div
          className="h-48 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${recipe.image})` }}
        >
          <div className="absolute top-2 right-2 flex gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
              onClick={handleFavoriteClick}
            >
              <Heart
                className={`h-4 w-4 ${
                  isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
                }`}
              />
            </Button>
            {missingIngredients.length > 0 && (
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                onClick={handleShoppingCartClick}
              >
                <ShoppingCart className="h-4 w-4 text-gray-600" />
              </Button>
            )}
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="text-xl font-semibold mb-2">{recipe.name}</h3>

          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{recipe.cookTime} mins</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{recipe.servings} servings</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline">
              {availableCount}/{totalCount} ingredients
            </Badge>
            {availableCount === totalCount ? (
              <Badge variant="default">Ready to cook!</Badge>
            ) : (
              <Badge variant="secondary">Missing ingredients</Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}