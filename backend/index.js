import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import OpenAI from "openai";

dotenv.config();
const app = express();
app.use(cors())
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Store system instructions globally
const systemMessage = {
  role: "system",
  content: "You are a cooking assistant. Always return structured JSON recipes. Generate 5 meal ideas based on ingredients, dietary preferences, and missing ingredients. Format responses in structured JSON."
};

// Define function parameters to enforce JSON structure
const functionParams = [
  {
    name: "generate_recipe",
    description: "Creates a JSON-formatted recipe",
    parameters: {
      type: "object",
      properties: {
        name: { type: "string" },
        description: { type: "string" },
        allergens: { type: "array", items: { type: "string" } },
        usedIngredients: {
          type: "array",
          items: { 
            type: "object",
            properties: { name: { type: "string" }, quantity: { type: "number" }, unit: { type: "string" } }
          }
        },
        steps: {
          type: "array",
          items: { 
            type: "object",
            properties: { name: { type: "string" }, description: { type: "string" }, duration: { type: "number" }, duration_unit: { type: "string" } }
          }
        },
        missingIngredients: {
          type: "array",
          items: { 
            type: "object",
            properties: { name: { type: "string" }, storeLocation: { type: "string" }, quantity: { type: "number" }, unit: { type: "string" } }
          }
        },
        totalTime: {
          type: "object",
          properties: { prepTime: { type: "number" }, prepTime_unit: { type: "string" }, cookTime: { type: "number" }, cookTime_unit: { type: "string" } }
        },
        mealType: { type: "string" },
        imagePrompt: { type: "string" },
        imageURL: { type: "string" }
      }
    }
  }
];

// API route to get a recipe
app.post("/api/recipes", async (req, res) => {
  console.log('fetching recipes');
  try {
    const { ingredients, mealType, allergies } = req.body;

    if (!ingredients || ingredients.length === 0) {
      return res.status(400).json({ error: "Ingredients are required" });
    }

    const userMessage = {
      role: "user",
      content: `Ingredients: ${ingredients.join(", ")}. Meal Type: ${mealType || "Lunch"}. Allergies: ${allergies || "None"}.`
    };

    // Call OpenAI API
    console.log('call openai api')
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [systemMessage, userMessage],
      functions: functionParams,
      function_call: "auto",
      temperature: 0.3
    });

    console.log(JSON.stringify(response, null, 2));

    // Extract and send the structured JSON response
    const recipe = JSON.parse(response.choices[0].message.function_call.arguments);
    res.json({ recipes: [recipe] });
  } catch (error) {
    console.error("Error generating recipe:", error);
    res.status(500).json({ error: "Failed to generate recipe" });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
