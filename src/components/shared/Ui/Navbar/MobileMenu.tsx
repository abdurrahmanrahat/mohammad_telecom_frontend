/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ChevronDown, Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function MobileMenu({ categories }: { categories: any }) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (categoryName: string) => {
    if (expandedCategory === categoryName) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryName);
    }
  };

  return (
    <div className="flex flex-col h-full p-4 bg-white">
      <div className="mb-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          ShopBrand
        </Link>
      </div>
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="w-full pl-8 border-0 bg-gray-100"
            tabIndex={-1}
          />
        </div>
      </div>
      <nav className="flex-1 space-y-1">
        {categories.map((category: any) => (
          <div key={category.name} className="py-1">
            <div className="flex w-full items-center justify-between rounded-md py-2">
              <Link
                href={category.href}
                className="flex-1 text-left text-sm font-medium hover:text-primary transition-colors duration-200"
              >
                {category.name}
              </Link>
              <Button
                variant="ghost"
                size="sm"
                className="p-0 h-8 w-8"
                onClick={() => toggleCategory(category.name)}
              >
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    expandedCategory === category.name && "rotate-180"
                  )}
                />
                <span className="sr-only">Toggle {category.name} submenu</span>
              </Button>
            </div>
            <div
              className={cn(
                "ml-4 mt-1 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ",
                expandedCategory === category.name
                  ? "max-h-40 opacity-100"
                  : "max-h-0 opacity-0"
              )}
            >
              {category.subcategories.map((subcategory: any) => (
                <Link
                  key={subcategory.name}
                  href={subcategory.href}
                  className="block rounded-md py-2 pl-4 text-sm text-muted-foreground hover:text-primary transition-colors duration-150"
                >
                  {subcategory.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
      <div className="border-t pt-4">
        <Link
          href="/account"
          className="flex items-center rounded-md py-2 text-sm font-medium transition-colors duration-150 hover:text-primary"
        >
          <User className="mr-2 h-4 w-4" />
          My Account
        </Link>
        <Link
          href="/cart"
          className="flex items-center rounded-md py-2 text-sm font-medium transition-colors duration-150 hover:text-primary"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Shopping Cart
        </Link>
      </div>
    </div>
  );
}
