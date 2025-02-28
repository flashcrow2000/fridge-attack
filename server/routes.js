import { createServer } from "http";
import OpenAI from "openai";

export function registerRoutes(app){
  // Set up authentication routes
  // setupAuth(app);
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  
  // Store system instructions globally
  const systemMessage = {
    role: "system",
    name: "system_instructions",
    content: "You are a cooking assistant. Always return structured JSON recipes. Generate 5 meal ideas based on ingredients, dietary preferences, and missing ingredients. Format responses in structured JSON as an array of 5 recipes. Mention all missing ingredients."
  };
  
  // Define function parameters to enforce JSON structure
  const functionParams = [
    {
      name: "generate_recipes", // Plural to indicate multiple recipes
      description: "Creates an array of 5 JSON-formatted recipes",
      parameters: {
        type: "object",
        properties: {
          recipes: {
            type: "array",
            items: {
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
            },
            minItems: 3,
            maxItems: 5
          }
        }
      }
    }
  ];
  

  // Recipe search endpoint
  app.post("/api/recipes", async (req, res) => {
    console.log('fetching recipes');
    try {
      const { ingredients, mealType, allergies } = req.body;
  
      if (!ingredients || ingredients.length === 0) {
        return res.status(400).json({ error: "Ingredients are required" });
      }
      const userMessage = {
        role: "user",
        name: "user_request",
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
      const recipesResponse = JSON.parse(response?.choices?.[0].message?.function_call?.arguments ?? "{}");
      res.json({ recipes: recipesResponse.recipes });
    } catch (error) {
      console.error("Error generating recipe:", error);
      res.status(500).json({ error: "Failed to generate recipe" });
    }
  });

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  const httpServer = createServer(app);
  return httpServer;
}