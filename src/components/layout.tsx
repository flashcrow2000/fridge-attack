import { Link, useLocation } from "wouter";
import { Home, Book, ShoppingCart, User } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const navItems = [
  { label: "Discover", icon: Home, href: "/" },
  { label: "My Recipes", icon: Book, href: "/my-recipes" },
  { label: "Shopping List", icon: ShoppingCart, href: "/shopping-list" },
  { label: "Profile", icon: User, href: "/profile" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { user } = useAuth();

  return (
    <div className="min-h-screen pb-16">
      {children}

      {/* Only show bottom navigation when user is logged in */}
      {user && (
        <nav className="fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center justify-around">
            {navItems.map(({ label, icon: Icon, href }) => {
              const isActive = location === href;
              return (
                <Link 
                  key={href} 
                  href={href}
                  className="flex flex-col items-center"
                >
                  <div
                    className={`flex flex-col items-center rounded-lg px-3 py-2 text-sm font-medium ${
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-xs">{label}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
}