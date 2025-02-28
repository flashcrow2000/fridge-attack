import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Loader2, LogOut, User } from "lucide-react";

const apiKeySchema = z.object({
  apiKey: z.string().min(1, "API key is required"),
});

type ApiKeyFormData = z.infer<typeof apiKeySchema>;

export default function Profile() {
  const { user, logoutMutation } = useAuth();
  const { toast } = useToast();

  const form = useForm<ApiKeyFormData>({
    resolver: zodResolver(apiKeySchema),
    defaultValues: {
      apiKey: user?.spoonacularApiKey || "",
    },
  });

  const updateApiKeyMutation = useMutation({
    mutationFn: async (data: ApiKeyFormData) => {
      const res = await apiRequest("PATCH", "/api/user/api-key", data);
      return res.json();
    },
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["/api/user"], updatedUser);
      toast({
        title: "Success",
        description: "Your API key has been updated",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to update API key",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ApiKeyFormData) => {
    updateApiKeyMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <User className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">Profile</h1>
            </div>
            <Button
              variant="outline"
              onClick={() => logoutMutation.mutate()}
              disabled={logoutMutation.isPending}
            >
              {logoutMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <LogOut className="h-4 w-4 mr-2" />
              )}
              Sign out
            </Button>
          </div>

          <CardContent className="p-0">
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Account Information</h2>
              <p className="text-muted-foreground">
                Email: {user?.email}
              </p>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold mb-4">API Settings</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="apiKey"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Spoonacular API Key</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your Spoonacular API key"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          You can get your API key from the{" "}
                          <a
                            href="https://spoonacular.com/food-api"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            Spoonacular website
                          </a>
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={updateApiKeyMutation.isPending}
                  >
                    {updateApiKeyMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      'Save API Key'
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}