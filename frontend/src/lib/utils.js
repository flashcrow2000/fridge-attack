import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function transformSpoonacularRecipe(recipe) {
  return {
    id: recipe.id.toString(),
    name: recipe.title,
    cookTime: recipe.readyInMinutes,
    servings: recipe.servings,
    ingredients: [
      ...recipe.usedIngredients.map(ing => ({
        name: ing.name,
        amount: `${ing.amount} ${ing.unit}`,
        available: true
      })),
      ...recipe.missedIngredients.map(ing => ({
        name: ing.name,
        amount: `${ing.amount} ${ing.unit}`,
        available: false
      }))
    ],
    instructions: [], // Will be populated when viewing recipe details
    image: recipe.image
  };
}