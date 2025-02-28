import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import type { Ingredient } from "@/lib/mock-data";
import { useState } from "react";

interface ShoppingListProps {
  ingredients: Ingredient[];
}

export function ShoppingList({ ingredients }: ShoppingListProps) {
  const [checked, setChecked] = useState<string[]>([]);

  const toggleIngredient = (name: string) => {
    setChecked(prev =>
      prev.includes(name)
        ? prev.filter(i => i !== name)
        : [...prev, name]
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shopping List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {ingredients.map((ingredient) => (
            <div
              key={ingredient.name}
              className="flex items-center space-x-2"
            >
              <Checkbox
                id={ingredient.name}
                checked={checked.includes(ingredient.name)}
                onCheckedChange={() => toggleIngredient(ingredient.name)}
              />
              <label
                htmlFor={ingredient.name}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {ingredient.amount} {ingredient.name}
              </label>
            </div>
          ))}
          {ingredients.length === 0 && (
            <p className="text-sm text-gray-500">
              No missing ingredients!
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
