import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
// import { useToast } from "../hooks/use-toast";
import axios from 'axios';
import { X } from "lucide-react";
import { useState } from "react";

export function IngredientSearch({ onRecipesFound }) {
  const [open, setOpen] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  // const { toast } = useToast();

  const handleSelect = (ingredient) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
    setOpen(false);
  };

  const handleRemove = (ingredient) => {
    setSelectedIngredients(selectedIngredients.filter(i => i !== ingredient));
  };

  const handleSearch = async () => {
    // console.log(selectedIngredients);
    const response = await axios.post('http://localhost:5000/api/recipes', {
      ingredients: "feta,eggs,olives".split(',').map((item) => item.trim()),
    });
    console.log(response);
    onRecipesFound(response.data.recipes);
  };

  return (
    <div className="space-y-4">
      <span>Search ingredients</span>

      <div className="flex flex-wrap gap-2">
        {selectedIngredients.map((ingredient) => (
          <Badge
            key={ingredient}
            variant="secondary"
            className="gap-1"
          >
            {ingredient}
            <button
              className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleRemove(ingredient);
              }}
              onClick={() => handleRemove(ingredient)}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>

      <Button 
        className="w-full"
        onClick={handleSearch}
      >
        'Generate Recipes'
      </Button>
    </div>
  );
}