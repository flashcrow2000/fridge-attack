import { useState } from "react";
import { IngredientSearch } from "../components/ingredient-search";
import { RecipeCard } from "../components/recipe-card";
import { Card } from "../components/ui/card";
// import type { SpoonacularRecipe } from "@/lib/api";
import { transformSpoonacularRecipe } from "../lib/utils";

export default function Home() {
  const [recipes, setRecipes] = useState([]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div 
        className="relative h-[40vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1600585152220-90363fe7e115')"
        }}
      >
        <div className="text-center text-white z-10 p-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            RecipeGenie
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Turn your ingredients into delicious meals
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="p-6 -mt-20 shadow-lg bg-white/90 backdrop-blur">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            What's in your kitchen?
          </h2>
          <IngredientSearch onRecipesFound={setRecipes} />
        </Card>

        {/* Recipe Results */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard 
              key={recipe.id} 
              recipe={transformSpoonacularRecipe(recipe)} 
            />
          ))}
          {recipes.length === 0 && (
            <p className="col-span-2 text-center text-gray-500 mt-8">
              No recipes found. Try searching with different ingredients!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}