import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { SpoonacularRecipe } from "./api"
import type { Recipe } from "./mock-data"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function transformRecipe(recipe: any): any { // TODO proper type for the openai recipe
  return {
    // id: recipe.id.toString(),
    name: recipe.name,
    description: recipe.description,
    cookTime: recipe.readyInMinutes,
    servings: recipe.servings,
    ingredients: [
      ...(recipe.usedIngredients ?? []).map(ing => ({
        name: ing.name,
        amount: `${ing.quantity} ${ing.unit}`,
        available: true
      })),
      ...(recipe.missingIngredients ?? []).map(ing => ({
        name: ing.name,
        amount: `${ing.quantity} ${ing.unit}`,
        available: false
      }))
    ],
    instructions: [], // Will be populated when viewing recipe details
    // image: recipe.image
  };
}