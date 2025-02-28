import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { searchRecipes } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";

interface IngredientSearchProps {
  onRecipesFound?: (recipes: any[]) => void;
}

export function IngredientSearch({ onRecipesFound }: IngredientSearchProps) {
  const [selectedIngredients, setSelectedIngredients] = useState<string>("");
  const { toast } = useToast();

  const searchMutation = useMutation({
    mutationFn: searchRecipes,
    onSuccess: (data) => {
      console.log('query data:', data);
      onRecipesFound?.(data.recipes );
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to search recipes. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSearch = () => {
    if (selectedIngredients.length > 0) {
      searchMutation.mutate(selectedIngredients.split(',').map((ingredient) => ingredient.trim()));
    }
  };

  return (
    <div className="space-y-4">
      <Input 
      onChange={(e) => setSelectedIngredients(e.target.value)} 
      placeholder="Add ingredients..." 
      />

      <Button 
      className="w-full"
      disabled={selectedIngredients.length === 0 || searchMutation.isPending}
      onClick={handleSearch}
      >
      {searchMutation.isPending ? (
        <>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Searching...
        </>
      ) : (
        'Generate Recipes'
      )}
      </Button>
    </div>
  );
}