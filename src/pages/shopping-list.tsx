import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";

export default function ShoppingList() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <ShoppingCart className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Shopping List</h1>
          </div>
          
          <CardContent className="p-0">
            <p className="text-muted-foreground">
              Items you need to buy will appear here.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
