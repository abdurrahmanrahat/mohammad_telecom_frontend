"use client";

import { ChevronDown, ChevronRight, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { authKey } from "@/constants/authKey";
import { cn } from "@/lib/utils";
import { useGetCategoriesQuery } from "@/redux/api/categoryApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, useCurrentUser } from "@/redux/reducers/authSlice";
import { removeUser } from "@/services/auth.services";
import { TCategory } from "@/types";
import axios from "axios";
import ActiveLink from "../ActiveLink";
import { MobileMenu } from "./MobileMenu";
import SearchInput from "./SearchInput";
import CartSheet from "./Sheets/CartSheet";
import WishlistSheet from "./Sheets/WishlistSheet";

const categoriesDemo = [
  {
    _id: "6824b3452216909943d58762",
    title: "Apple",
    slug: "apple",
    subCategories: [
      {
        _id: "6824b3722216909943d5876c",
        title: "iPhone",
        slug: "iphone",
        subCategories: [],
      },
      {
        _id: "6824b3802216909943d58773",
        title: "iPad",
        slug: "ipad",
        subCategories: [],
      },
    ],
  },
  {
    _id: "6824b3622216909943d58766",
    title: "Samsung",
    slug: "samsung",
    subCategories: [
      {
        _id: "6824b4092216909943d587a3",
        title: "Samsung Galaxy Display",
        slug: "samsung_galaxy_display",
        subCategories: [],
      },
      {
        _id: "6824b41e2216909943d587b0",
        title: "Samsung Galaxy Battery",
        slug: "samsung_galaxy_battery",
        subCategories: [],
      },
      {
        _id: "6824b4402216909943d587be",
        title: "Samsung Galaxy Backshell",
        slug: "samsung_galaxy_backshell",
        subCategories: [],
      },
    ],
  },
  {
    _id: "6824b39c2216909943d5877a",
    title: "OnePlus",
    slug: "oneplus",
    subCategories: [
      {
        _id: "6824b3af2216909943d58783",
        title: "OnePlus Display",
        slug: "oneplus_display",
        subCategories: [],
      },
      {
        _id: "6824b4582216909943d587cd",
        title: "OnePlus Battery",
        slug: "oneplus_battery",
        subCategories: [],
      },
      {
        _id: "6824b6fd373197d825eb5487",
        title: "OnePlus Backshell",
        slug: "oneplus_backshell",
        subCategories: [],
      },
    ],
  },
  {
    _id: "6824b3bd2216909943d5878c",
    title: "Oppo",
    slug: "oppo",
    subCategories: [
      {
        _id: "6824b3d32216909943d58797",
        title: "Oppo Display",
        slug: "oppo_display",
        subCategories: [],
      },
    ],
  },
  {
    _id: "6824b70f373197d825eb5497",
    title: "Vivo",
    slug: "vivo",
    subCategories: [
      {
        _id: "6824b723373197d825eb54a9",
        title: "Vivo Display",
        slug: "vivo_display",
        subCategories: [],
      },
      {
        _id: "6824b746373197d825eb54bc",
        title: "Vivo Battery",
        slug: "vivo_battery",
        subCategories: [],
      },
    ],
  },
  {
    _id: "6824b764373197d825eb54cf",
    title: "Xiaomi",
    slug: "xiaomi",
    subCategories: [
      {
        _id: "6824b781373197d825eb54e4",
        title: "Xiaomi Display",
        slug: "xiaomi_display",
        subCategories: [],
      },
      {
        _id: "6824b78d373197d825eb54fa",
        title: "Xiaomi Battery",
        slug: "xiaomi_battery",
        subCategories: [],
      },
    ],
  },
  {
    _id: "6824b79f373197d825eb5510",
    title: "Realme",
    slug: "realme",
    subCategories: [
      {
        _id: "6824b7b2373197d825eb5528",
        title: "Realme Display",
        slug: "realme_display",
        subCategories: [],
      },
      {
        _id: "6824b7c1373197d825eb5541",
        title: "Realme Battery",
        slug: "realme_battery",
        subCategories: [],
      },
    ],
  },
  {
    _id: "6824b7d2373197d825eb555a",
    title: "Google Pixel",
    slug: "google_pixel",
    subCategories: [],
  },
  {
    _id: "6824b7e1373197d825eb5574",
    title: "Motorola",
    slug: "motorola",
    subCategories: [],
  },
  {
    _id: "6824b7fd373197d825eb558f",
    title: "Huawei",
    slug: "huawei",
    subCategories: [],
  },
  {
    _id: "6824b812373197d825eb55ab",
    title: "Honor",
    slug: "honor",
    subCategories: [],
  },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isProductsHovered, setIsProductsHovered] = React.useState(false);
  const [hoveredCategory, setHoveredCategory] = React.useState<string | null>(
    null
  );
  const [isClosing, setIsClosing] = React.useState(false);
  const [isSubMenuClosing, setIsSubMenuClosing] = React.useState(false);
  const megaMenuRef = React.useRef<HTMLDivElement>(null);
  const productsButtonRef = React.useRef<HTMLDivElement>(null);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const subMenuTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const pathname = usePathname();
  const user = useAppSelector(useCurrentUser);

  const isAdmin = user?.role === "admin";
  // const isUser = user?.role === "user";

  // RTK Query hook
  const { data: categoriesData } = useGetCategoriesQuery({});

  // Close menu when route changes
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Handle menu opening with delay
  const handleMenuEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsClosing(false);
    setIsProductsHovered(true);
  };

  // Handle menu closing with delay for smooth transition
  const handleMenuLeave = () => {
    setIsClosing(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsProductsHovered(false);
      setHoveredCategory(null);
      setIsClosing(false);
    }, 300); // Match this with CSS transition duration
  };

  // Handle submenu opening
  const handleCategoryEnter = (categoryId: string) => {
    if (subMenuTimeoutRef.current) {
      clearTimeout(subMenuTimeoutRef.current);
    }
    setIsSubMenuClosing(false);
    setHoveredCategory(categoryId);
  };

  // Handle submenu closing with delay for smooth transition
  const handleCategoryLeave = () => {
    setIsSubMenuClosing(true);
    if (subMenuTimeoutRef.current) {
      clearTimeout(subMenuTimeoutRef.current);
    }
    subMenuTimeoutRef.current = setTimeout(() => {
      setHoveredCategory(null);
      setIsSubMenuClosing(false);
    }, 300); // Match this with CSS transition duration
  };

  // if (isCategoriesLoading) {
  //   return;
  // }

  const categoriesList = categoriesData?.data || categoriesDemo;

  // logout user
  const handleLogout = async () => {
    // 🎯 remove HttpOnly cookie from client via API
    await axios.post("/api/auth/remove-cookies", {
      accessToken: authKey,
      // refreshToken: "testToken", // send more name for removing
    });
    dispatch(logout());
    removeUser();

    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-secondary text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex gap-2">
            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <button className="lg:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[300px] sm:w-[350px] bg-secondary"
              >
                <SheetHeader>
                  <SheetTitle>
                    <div className="pt-4 flex items-center justify-center text-white ">
                      <Link href="/" className="font-bold text-xl">
                        MobileShop
                      </Link>
                    </div>
                  </SheetTitle>
                  <SheetDescription className="hidden"></SheetDescription>
                </SheetHeader>
                <MobileMenu
                  categories={categoriesList}
                  setIsMobileMenuOpen={setIsMobileMenuOpen}
                />
              </SheetContent>
            </Sheet>

            <div className="flex items-center">
              <Link href="/" className="font-bold text-xl">
                ShopBrand
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:ml-6 lg:flex h-full">
            <ActiveLink href="/" exact>
              Home
            </ActiveLink>

            {/* Products Dropdown */}
            <div
              ref={productsButtonRef}
              className="relative h-full"
              onMouseEnter={handleMenuEnter}
              onMouseLeave={handleMenuLeave}
            >
              <div className="flex items-center h-full">
                <ActiveLink
                  href="/products"
                  className="flex items-center h-full"
                >
                  Products
                  <ChevronDown
                    className={cn(
                      "ml-1 h-4 w-4 transition-transform duration-300",
                      isProductsHovered && "rotate-180"
                    )}
                  />
                </ActiveLink>
              </div>

              {/* Mega Menu */}
              {isProductsHovered && (
                <div
                  ref={megaMenuRef}
                  className={cn(
                    "absolute left-0 z-10 mt-0 w-64 bg-[#5550A0] shadow-lg rounded-b-md border border-[#6660B0]",
                    "transition-all duration-300 ease-in-out",
                    isClosing
                      ? "opacity-0 translate-y-1"
                      : "opacity-100 translate-y-0"
                  )}
                >
                  <div className="py-2">
                    <ul>
                      {categoriesList.map((category: TCategory) => (
                        <li
                          key={category._id}
                          className="relative"
                          onMouseEnter={() => handleCategoryEnter(category._id)}
                          onMouseLeave={handleCategoryLeave}
                        >
                          <Link
                            href={`/products?category=${category.slug}`}
                            className={cn(
                              "flex justify-between items-center py-3 px-4 text-sm font-medium text-white hover:bg-[#4A4690] transition-colors duration-200",
                              hoveredCategory === category._id
                                ? "bg-[#4A4690]"
                                : ""
                            )}
                          >
                            {category.title}
                            {category.subCategories.length > 0 && (
                              <ChevronRight
                                className={cn(
                                  "h-4 w-4 transition-transform duration-300",
                                  hoveredCategory === category._id &&
                                    "rotate-90"
                                )}
                              />
                            )}
                          </Link>

                          {/* Flyout Subcategories */}
                          {hoveredCategory === category._id &&
                            category.subCategories.length > 0 && (
                              <div
                                className={cn(
                                  "absolute top-0 left-full ml-0 w-64 bg-[#5550A0] shadow-lg rounded-r-md z-20 border border-[#6660B0] overflow-hidden ",
                                  "transition-all duration-3000 ease-in-out",
                                  isSubMenuClosing
                                    ? "max-w-0 hidden"
                                    : "max-w-xs block"
                                )}
                                style={{
                                  transformOrigin: "left center",
                                }}
                              >
                                <div className="py-2">
                                  <h3 className="px-4 py-2 text-sm font-semibold text-white border-b border-[#6660B0]">
                                    {category.title} Categories
                                  </h3>
                                  <ul className="mt-1">
                                    {category.subCategories.map(
                                      (subCategory: TCategory) => (
                                        <li key={subCategory._id}>
                                          <Link
                                            href={`/products?category=${subCategory.slug}`}
                                            className="block py-3 px-4 text-sm text-white hover:bg-[#4A4690] transition-colors duration-200"
                                          >
                                            {subCategory.title}
                                          </Link>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              </div>
                            )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <ActiveLink href="/contact">Contact Us</ActiveLink>

            <ActiveLink href="/about">About Us</ActiveLink>

            {user && (
              <>
                {isAdmin && (
                  <ActiveLink href="/dashboard/admin">Dashboard</ActiveLink>
                )}
                {/* {isUser && (
                  <ActiveLink href="/dashboard/user">Dashboard</ActiveLink>
                )} */}
              </>
            )}
          </div>

          <div className="flex gap-4">
            {/* Search */}
            <div className="hidden lg:block lg:w-72">
              {/* <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full pl-8 lg:w-[300px] border-0 bg-white/10 text-white placeholder:text-white/70 focus:ring-white"
                />
              </div> */}
              <SearchInput />
            </div>

            {/* Right side icons */}
            <div className="ml-auto flex items-center space-x-4">
              <div className="flex gap-0">
                {/* <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-[#4A4690]"
                >
                  <Heart className="h-6 w-6" />
                  <span className="sr-only">Wishlist</span>
                </Button> */}
                <WishlistSheet />
                {/* <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-[#4A4690]"
                  >
                    <ShoppingCart className="h-6 w-6" />
                    <span className="sr-only">Cart</span>
                  </Button>
                  <span className="absolute top-0 right-0 text-sm font-medium">
                    {cartItems.length}
                  </span>
                </div> */}
                <CartSheet />
              </div>

              {/* login/logout button */}
              <div className="flex items-center gap-4">
                {user ? (
                  <Button
                    className="cursor-pointer bg-white text-[#5550A0] hover:bg-white/90"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                ) : (
                  <Link href="/login">
                    <Button className="cursor-pointer bg-white text-[#5550A0] hover:bg-white/90">
                      Login
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
