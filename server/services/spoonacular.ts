import fetch from "node-fetch";

const BASE_URL = "https://api.spoonacular.com/recipes";

interface SpoonacularIngredient {
  name: string;
  amount: number;
  unit: string;
}

interface SpoonacularInstructionStep {
  number: number;
  step: string;
}

interface SpoonacularInstruction {
  steps: SpoonacularInstructionStep[];
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

export interface SpoonacularRecipeDetails extends SpoonacularRecipe {
  instructions?: string[];
  extendedIngredients: SpoonacularIngredient[];
}

class SpoonacularError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'SpoonacularError';
  }
}

async function handleSpoonacularResponse(response: Response) {
  if (!response.ok) {
    const error = await response.text();
    throw new SpoonacularError(
      `Spoonacular API error: ${error || response.statusText}`,
      response.status
    );
  }
  return response.json();
}

export async function searchRecipesByIngredients(
  ingredients: string[],
  apiKey: string
): Promise<SpoonacularRecipe[]> {
  if (!ingredients.length) {
    throw new SpoonacularError("No ingredients provided");
  }

  const params = new URLSearchParams({
    apiKey,
    ingredients: ingredients.join(','),
    number: '5',
    ranking: '2',
    ignorePantry: 'true'
  });

  const response = await fetch(`${BASE_URL}/findByIngredients?${params}`);
  return handleSpoonacularResponse(response);
}

export async function getRecipeInstructions(
  recipeId: number,
  apiKey: string
): Promise<SpoonacularInstruction[]> {
  if (!recipeId) {
    throw new SpoonacularError("Recipe ID is required");
  }

  const params = new URLSearchParams({ apiKey });
  const response = await fetch(`${BASE_URL}/${recipeId}/analyzedInstructions?${params}`);
  return handleSpoonacularResponse(response);
}

export async function getRecipeDetails(
  recipeId: number,
  apiKey: string
): Promise<SpoonacularRecipeDetails> {
  if (!recipeId) {
    throw new SpoonacularError("Recipe ID is required");
  }

  const params = new URLSearchParams({ apiKey });
  const response = await fetch(`${BASE_URL}/${recipeId}/information?${params}`);
  return handleSpoonacularResponse(response);
}