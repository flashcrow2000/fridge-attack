export interface Ingredient {
  name: string;
  amount: string;
  available: boolean;
}

export interface Recipe {
  id: string;
  name: string;
  cookTime: number;
  servings: number;
  ingredients: Ingredient[];
  instructions: string[];
  image: string;
}

export const mockRecipes: Recipe[] = [
  {
    id: "1",
    name: "Garlic Butter Pasta",
    cookTime: 20,
    servings: 4,
    ingredients: [
      { name: "Spaghetti", amount: "1 lb", available: true },
      { name: "Garlic", amount: "4 cloves", available: true },
      { name: "Butter", amount: "1/2 cup", available: false },
      { name: "Parmesan", amount: "1/2 cup", available: false },
      { name: "Parsley", amount: "1/4 cup", available: true }
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
    id: "2",
    name: "Mediterranean Salad",
    cookTime: 15,
    servings: 2,
    ingredients: [
      { name: "Cucumber", amount: "1 large", available: true },
      { name: "Tomatoes", amount: "2 medium", available: true },
      { name: "Red Onion", amount: "1/2", available: false },
      { name: "Feta Cheese", amount: "1/2 cup", available: false },
      { name: "Olives", amount: "1/4 cup", available: true }
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
