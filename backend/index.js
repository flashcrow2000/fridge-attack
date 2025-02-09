// backend/index.js
require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const prompt = `
You are a versatile cooking assistant. I will provide you with a list of ingredients I have on hand, and you will:
1. Suggest at least 3 and at most 5 creative, easy-to-make recipes based on my ingredients, tailored to the type of meal I specify (e.g., breakfast, lunch, dinner, dessert, or snack). If no meal type is specified, default to lunch.
2. Prioritize dietary preferences (e.g., low-carb, vegetarian, gluten-free) if mentioned.
3. If any key ingredients are missing for a recipe, create a detailed shopping list. For each missing item, specify:
   - The name of the ingredient.
   - The quantity needed.
   - The unit of measurement.
   - The general store location where the item can be found (e.g., fresh produce, canned goods, dairy).
4. Provide the result in the following JSON format:

[{
    "name": "Recipe name",
    "description": "A brief description of the recipe, highlighting its appeal or key features.",
    "allergens": [
        "Allergen name"
    ],
    "usedIngredients": [
        {
            "name": "Ingredient name",
            "quantity": "Quantity",
            "unit": "Unit"
        }
    ],
    "steps": [
        {
            "name": "Step name",
            "description": "Step description, detailing what needs to be done.",
            "ingredients": [
                {
                    "name": "Ingredient name",
                    "quantity": "Quantity",
                    "unit": "Unit"
                }
            ],
            "tools": [
                {
                    "name": "Tool name",
                    "quantity": "Quantity",
                    "unit": "Unit"
                }
            ],
            "duration": "Duration as a number",
            "duration_unit": "Unit of duration (e.g., minutes, hours)"
        }
    ],
    "missingIngredients": [
        {
            "name": "Ingredient name",
            "storeLocation": "General store location",
            "quantity": "Quantity needed",
            "unit": "Unit of measurement"
        }
    ],
    "totalTime": {
        "prepTime": "Preparation time as a number",
        "prepTime_unit": "Unit of prep time (e.g., minutes, hours)",
        "cookTime": "Cooking time as a number",
        "cookTime_unit": "Unit of cook time (e.g., minutes, hours)"
    },
    "mealType": "Type of meal (e.g., breakfast, lunch, dinner, dessert, snack)"
}, {...}, {...}]

### Example Input ###
Ingredients: Eggs, potatoes, tomatoes, feta, olives, olive oil.
Meal Type: Breakfast
Dietary Preference: None

The list of ingredients follows:`;

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

// Recipe counter (in-memory storage for now)
let recipeCounter = 0;

// Root route
app.get('/', (req, res) => {
  res.send('RecipeGenie Backend is running!');
});

// Endpoint to fetch recipes
// SPOONACULAR
// app.post('/api/recipes', async (req, res) => {
//   const { ingredients } = req.body; // Expects an array of ingredients

//   if (!ingredients || !Array.isArray(ingredients)) {
//     return res.status(400).json({ error: 'Please provide a list of ingredients.' });
//   }

//   try {
//     // Call Spoonacular API to find recipes
//     const response = await axios.get(
//       `https://api.spoonacular.com/recipes/findByIngredients`,
//       {
//         params: {
//           ingredients: ingredients.join(','), // Convert array to comma-separated string
//           number: 5, // Limit to 5 recipes
//           apiKey: process.env.SPOONACULAR_API_KEY,
//         },
//       }
//     );

//     // Increment the recipe counter
//     recipeCounter++;

//     // Send the recipes back to the client
//     res.json({ recipes: response.data, counter: recipeCounter });
//   } catch (error) {
//     console.error('Error fetching recipes:', error.message);
//     res.status(500).json({ error: 'Failed to fetch recipes.' });
//   }
// });

// OPENAI
app.post('/api/recipes', async (req, res) => {
  const { ingredients } = req.body; // Expects an array of ingredients

  if (!ingredients || !Array.isArray(ingredients)) {
    return res.status(400).json({ error: 'Please provide a list of ingredients.' });
  }

  const promptWithIngredients = `${prompt} ${ingredients.join(', ')}`;
  console.log('promptWithIngredients: ', promptWithIngredients);

  try {
    // Call Spoonacular API to find recipes
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "system", content: "You are a helpful cooking assistant." }, { role: "user", content: promptWithIngredients }],
      temperature: 0.7,
    });

    const recipeJson = response.choices[0].message.content;
    console.log('raw recipeJson:', recipeJson);

    const recipes = JSON.parse(recipeJson.split('```json')[1].split('```')[0]);

    console.log(JSON.stringify(recipes, null, 4));

    // Increment the recipe counter
    recipeCounter++;

    // Send the recipes back to the client
    res.json({ recipes, counter: recipeCounter });
  } catch (error) {
    console.error('Error fetching recipes:', error.message);
    res.status(500).json({ error: 'Failed to fetch recipes.' });
  }
});

  // Endpoint to get recipe details and shopping list
app.post('/api/recipe-details', async (req, res) => {
  const { recipeId, userIngredients } = req.body;

  if (!recipeId || !userIngredients || !Array.isArray(userIngredients)) {
    return res.status(400).json({ error: 'Please provide a recipe ID and user ingredients.' });
  }

  try {
    // Fetch detailed recipe information
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${recipeId}/information`,
      {
        params: {
          apiKey: process.env.SPOONACULAR_API_KEY,
        },
      }
    );

    const recipe = response.data;

    // Extract recipe ingredients
    const recipeIngredients = recipe.extendedIngredients.map(
      (ingredient) => ingredient.name.toLowerCase()
    );

    // Compare user ingredients with recipe ingredients
    const missingIngredients = recipeIngredients.filter(
      (ingredient) => !userIngredients.includes(ingredient)
    );

    // Send the recipe details and shopping list back to the client
    res.json({
      recipe: {
        id: recipe.id,
        title: recipe.title,
        instructions: recipe.instructions,
        image: recipe.image,
      },
      missingIngredients,
    });
  } catch (error) {
    console.error('Error fetching recipe details:', error.message);
    res.status(500).json({ error: 'Failed to fetch recipe details.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});