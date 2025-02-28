import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, X, Loader2 } from "lucide-react";
import { availableIngredients } from "@/lib/mock-data";
import { useToast } from "@/hooks/use-toast";
import { searchRecipes } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

interface IngredientSearchProps {
  onRecipesFound?: (recipes: any[]) => void;
}

export function IngredientSearch({ onRecipesFound }: IngredientSearchProps) {
  const [open, setOpen] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const { toast } = useToast();

  const searchMutation = useMutation({
    mutationFn: searchRecipes,
    onSuccess: (data) => {
      onRecipesFound?.(data);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to search recipes. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSelect = (ingredient: string) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
    setOpen(false);
  };

  const handleRemove = (ingredient: string) => {
    setSelectedIngredients(selectedIngredients.filter(i => i !== ingredient));
  };

  const handleSearch = () => {
    if (selectedIngredients.length > 0) {
      searchMutation.mutate(selectedIngredients);
    }
  };

  return (
    <div className="space-y-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between"
            role="combobox"
          >
            Select ingredients
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search ingredients..." />
            <CommandGroup>
              {availableIngredients.map((ingredient) => (
                <CommandItem
                  key={ingredient}
                  onSelect={() => handleSelect(ingredient)}
                  className="cursor-pointer"
                >
                  {ingredient}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

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