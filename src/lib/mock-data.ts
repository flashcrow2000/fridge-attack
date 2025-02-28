export interface Ingredient {
  name: string;
  amount: string;
  unit: string;
  available: boolean;
}

export interface Recipe {
  name: string;
  description?: string;
  totalTime?: any;
  cookTime: number;
  servings: number;
  ingredients: Ingredient[];
  instructions: string[];
  image?: string;
}

export const mockRecipes: Recipe[] = [
  {
    name: "Garlic Butter Pasta",
    cookTime: 20,
    servings: 4,
    ingredients: [
      { name: "Spaghetti", amount: "0.5", unit: "kg", available: true },
      { name: "Garlic", amount: "4", unit: "cloves", available: true },
      { name: "Butter", amount: "1/2", unit: "cup", available: false },
      { name: "Parmesan", amount: "1/2", unit: "cup", available: false },
      { name: "Parsley", amount: "1/4", unit: "cup", available: true }
    ],
    instructions: [
      "Boil pasta according to package instructions",
      "Melt butter in a large pan over medium heat",
      "Add minced garlic and sauté until fragrant",
      "Toss cooked pasta with garlic butter",
      "Top with parmesan and chopped parsley"
    ],
    image: "https://images.unsplash.com/photo-1532709031516-391805a39eba"
  },
  {
    name: "Mediterranean Salad",
    cookTime: 15,
    servings: 2,
    ingredients: [
      { name: "Cucumber", amount: "1 large", unit: "piece", available: true },
      { name: "Tomatoes", amount: "2 medium", unit: "piece", available: true },
      { name: "Red Onion", amount: "1/2", unit: "piece", available: false },
      { name: "Feta Cheese", amount: "1/2", unit: "cup", available: false },
      { name: "Olives", amount: "1/4", unit: "cup", available: true }
    ],
    instructions: [
      "Dice cucumber and tomatoes",
      "Slice red onion thinly",
      "Combine vegetables in a bowl",
      "Add crumbled feta and olives",
      "Drizzle with olive oil and season"
    ],
    image: "https://images.unsplash.com/photo-1470549813517-2fa741d25c92"
  }
];

export const availableIngredients = [
  "Pasta", "Rice", "Potato", "Tomato", "Onion", "Garlic",
  "Chicken", "Beef", "Pork", "Fish", "Eggs",
  "Carrot", "Cucumber", "Lettuce", "Spinach",
  "Cheese", "Milk", "Butter", "Yogurt",
  "Olive Oil", "Salt", "Pepper", "Basil", "Oregano"
];
