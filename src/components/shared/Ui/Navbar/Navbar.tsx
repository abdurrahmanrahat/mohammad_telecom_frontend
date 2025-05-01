"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "../Container";
import { MobileMenu } from "./MobileMenu";

// Sample data for categories and subcategories
const categories = [
  {
    name: "Clothing",
    href: "/category/clothing",
    subcategories: [
      { name: "Men's Wear", href: "/category/clothing/mens" },
      { name: "Women's Wear", href: "/category/clothing/womens" },
      { name: "Kids", href: "/category/clothing/kids" },
      { name: "Accessories", href: "/category/clothing/accessories" },
    ],
  },
  {
    name: "Electronics",
    href: "/category/electronics",
    subcategories: [
      { name: "Smartphones", href: "/category/electronics/smartphones" },
      { name: "Laptops", href: "/category/electronics/laptops" },
      { name: "Audio", href: "/category/electronics/audio" },
      { name: "Accessories", href: "/category/electronics/accessories" },
    ],
  },
  {
    name: "Home & Kitchen",
    href: "/category/home-kitchen",
    subcategories: [
      { name: "Furniture", href: "/category/home-kitchen/furniture" },
      { name: "Kitchenware", href: "/category/home-kitchen/kitchenware" },
      { name: "Decor", href: "/category/home-kitchen/decor" },
      { name: "Bedding", href: "/category/home-kitchen/bedding" },
    ],
  },
  {
    name: "Beauty",
    href: "/category/beauty",
    subcategories: [
      { name: "Skincare", href: "/category/beauty/skincare" },
      { name: "Makeup", href: "/category/beauty/makeup" },
      { name: "Haircare", href: "/category/beauty/haircare" },
      { name: "Fragrances", href: "/category/beauty/fragrances" },
    ],
  },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <Container>
        <div className="flex justify-between items-center h-16">
          <div className="flex gap-2">
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="lg:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[350px]">
                <MobileMenu categories={categories} />
              </SheetContent>
            </Sheet>

            <div className="flex items-center">
              <Link href="/" className="font-bold text-xl">
                ShopBrand
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4 lg:space-x-6 mx-6">
            {categories.map((category) => (
              <div key={category.name} className="relative group">
                <Link
                  href={category.href}
                  className={cn(
                    "flex items-center text-sm font-medium transition-colors duration-300 hover:text-primary",
                    pathname.includes(category.href)
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {category.name}
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                </Link>
                <div className="absolute left-0 top-full pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out bg-white">
                  <div className="rounded-md border bg-background shadow-lg p-2">
                    {category.subcategories.map((subcategory) => (
                      <Link
                        key={subcategory.name}
                        href={subcategory.href}
                        className="block rounded-md px-3 py-2 text-sm hover:bg-muted transition-colors duration-150"
                      >
                        {subcategory.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          <div className="flex gap-4 ">
            {/* Search */}
            <div className="hidden lg:block lg:w-72">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full pl-8 lg:w-[300px] border-0 bg-gray-100"
                />
              </div>
            </div>

            {/* Right side icons */}
            <div className="ml-auto flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-6 w-6" />
                <span className="sr-only">Cart</span>
              </Button>
              <Link href={`/login`}>
                <Button className="cursor-pointer">Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
