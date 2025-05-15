"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/reducers/authSlice";
import { TCategory } from "@/types/category.type";
import { ChevronDown, Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ActiveLink from "../ActiveLink";

export function MobileMenu({ categories }: { categories: TCategory[] }) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (categoryId: string) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryId);
    }
  };

  const user = useAppSelector(useCurrentUser);

  const isAdmin = user?.role === "admin";
  const isStudent = user?.role === "user";

  return (
    <div className="flex flex-col h-full overflow-auto p-4 bg-white">
      <div className="mb-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          MobileShop
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
        {/* Home Link */}
        <div className="py-1">
          <div className="flex w-full items-center justify-between rounded-md py-2">
            <ActiveLink href={`/`}>
              <span className="font-medium transition-colors duration-300 hover:text-primary">
                Home
              </span>
            </ActiveLink>
          </div>
        </div>

        {/* Products Link */}
        <div className="py-1">
          <div className="flex w-full items-center justify-between rounded-md py-2">
            <ActiveLink href={`/products`}>
              <span className="font-medium transition-colors duration-300 hover:text-primary">
                Products
              </span>
            </ActiveLink>
          </div>
        </div>

        {/* Categories */}
        {categories.map((category) => (
          <div key={category._id} className="py-1">
            <div className="flex w-full items-center justify-between rounded-md py-2">
              <Link
                href={`/products/${category.slug}`}
                className="flex-1 text-left text-sm font-medium hover:text-primary transition-colors duration-300"
              >
                {category.title}
              </Link>
              {category.subCategories.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-0 h-6 w-8 border border-primary"
                  onClick={() => toggleCategory(category._id)}
                >
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-300",
                      expandedCategory === category._id && "rotate-180"
                    )}
                  />
                  <span className="sr-only">
                    Toggle {category.title} submenu
                  </span>
                </Button>
              )}
            </div>
            {category.subCategories.length > 0 && (
              <div
                className={cn(
                  "ml-4 mt-1 space-y-1 overflow-hidden transition-all duration-300 ease-in-out",
                  expandedCategory === category._id
                    ? "max-h-auto opacity-100"
                    : "max-h-0 opacity-0"
                )}
              >
                {category.subCategories.map((subcategory) => (
                  <Link
                    key={subcategory._id}
                    href={`/products/${category.slug}/${subcategory.slug}`}
                    className="block rounded-md py-2 pl-4 text-sm text-muted-foreground hover:text-primary transition-colors duration-150"
                  >
                    {subcategory.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Blogs Link */}
        <div className="py-1">
          <div className="flex w-full items-center justify-between rounded-md py-2">
            <ActiveLink href={`/blogs`}>
              <span className="font-medium transition-colors duration-300 hover:text-primary">
                Blogs
              </span>
            </ActiveLink>
          </div>
        </div>

        {/* Contact Us Link */}
        <div className="py-1">
          <div className="flex w-full items-center justify-between rounded-md py-2">
            <ActiveLink href={`/contact`}>
              <span className="font-medium transition-colors duration-300 hover:text-primary">
                Contact Us
              </span>
            </ActiveLink>
          </div>
        </div>

        <>
          {user && (
            <>
              {isAdmin && (
                <div className="py-1">
                  <div className="flex w-full items-center justify-between rounded-md py-2">
                    <ActiveLink href={`/dashboard/admin`}>
                      <span className="font-medium transition-colors duration-300 hover:text-primary">
                        Dashboard
                      </span>
                    </ActiveLink>
                  </div>
                </div>
              )}

              {isStudent && (
                <div className="py-1">
                  <div className="flex w-full items-center justify-between rounded-md py-2">
                    <ActiveLink href={`/dashboard/user`}>
                      <span className="font-medium transition-colors duration-300 hover:text-primary">
                        Dashboard
                      </span>
                    </ActiveLink>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      </nav>
      <div className="border-t pt-4 mt-4">
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
