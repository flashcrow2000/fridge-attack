import { apiRequest } from "./queryClient";

export interface SpoonacularIngredient {
  name: string;
  amount: number;
  unit: string;
}

export interface SpoonacularRecipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  missedIngredients: SpoonacularIngredient[];
  usedIngredients: SpoonacularIngredient[];
}

export interface RecipeDetails extends SpoonacularRecipe {
  instructions: string[];
}

export async function searchRecipes(ingredients: string[]): Promise<SpoonacularRecipe[]> {
  const response = await apiRequest('POST', '/api/recipes/search', { ingredients });
  return response.json();
}

export async function getRecipeDetails(id: number): Promise<RecipeDetails> {
  const response = await apiRequest('GET', `/api/recipes/${id}`);
  return response.json();
}
