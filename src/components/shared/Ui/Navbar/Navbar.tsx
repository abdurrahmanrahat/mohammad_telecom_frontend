"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { authKey } from "@/constants/authKey";
import { useGetCategoriesQuery } from "@/redux/api/categoryApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, useCurrentUser } from "@/redux/reducers/authSlice";
import { removeUser } from "@/services/auth.services";
import { TCategory } from "@/types/category.type";
import axios from "axios";
import {
  ChevronDown,
  ChevronRight,
  Heart,
  Menu,
  Search,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import ActiveLink from "../ActiveLink";
import Container from "../Container";
import { MobileMenu } from "./MobileMenu";

const demoCategories = [
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
  const [isProductsHovered, setIsProductsHovered] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const productsButtonRef = useRef<HTMLDivElement>(null);

  // Close mega menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        megaMenuRef.current &&
        !megaMenuRef.current.contains(event.target as Node) &&
        productsButtonRef.current &&
        !productsButtonRef.current.contains(event.target as Node)
      ) {
        setIsProductsHovered(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // const pathname = usePathname();

  // RTK Query hook
  const { data: categoriesData } = useGetCategoriesQuery({});

  const user = useAppSelector(useCurrentUser);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const isAdmin = user?.role === "admin";
  const isStudent = user?.role === "user";

  // logout user
  const handleLogout = async () => {
    // 🎯 remove HttpOnly cookie from client via API
    await axios.post("/api/auth/remove-cookies", {
      accessToken: authKey,
      // refreshToken: "testToken", // send more name for removing
    });
    dispatch(logout());
    removeUser();

    toast.success("Logout successfully!");

    router.push("/");
  };

  // if (isCategoriesLoading) {
  //   return <MyLoader />;
  // }

  const allCategories = categoriesData?.data || demoCategories;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <Container>
        <div className="flex justify-between items-center h-16">
          <div className="flex gap-2">
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="lg:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[350px]">
                <SheetHeader className="hidden">
                  <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                  <SheetDescription className="sr-only">
                    Browse product categories and featured collections
                  </SheetDescription>
                </SheetHeader>
                <MobileMenu categories={allCategories} />
              </SheetContent>
            </Sheet>

            <div className="flex items-center">
              <Link href="/" className="font-bold text-xl">
                ShopBrand
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:ml-6 lg:flex md:space-x-8">
            <ActiveLink href={`/`}>
              <span className="font-medium transition-colors duration-300 hover:text-primary">
                Home
              </span>
            </ActiveLink>

            {/* Products Dropdown */}
            <div
              ref={productsButtonRef}
              className="relative"
              onMouseEnter={() => setIsProductsHovered(true)}
            >
              <div className="flex items-center">
                <ActiveLink href={`/products`}>
                  <span className="font-medium transition-colors duration-300 hover:text-primary">
                    Products
                  </span>
                </ActiveLink>
                <ChevronDown className="ml-1 h-4 w-4" />
              </div>

              {/* Mega Menu */}
              {isProductsHovered && (
                <div
                  ref={megaMenuRef}
                  onMouseLeave={() => {
                    setIsProductsHovered(false);
                    setHoveredCategory(null);
                  }}
                  className="absolute left-0 z-10 mt-2 w-64 bg-white shadow-lg rounded-md transition-all duration-300 ease-in-out"
                >
                  <div className="py-4">
                    <ul>
                      {allCategories.map((category: TCategory) => (
                        <li
                          key={category._id}
                          className="relative"
                          onMouseEnter={() => setHoveredCategory(category._id)}
                          onMouseLeave={() => setHoveredCategory(null)}
                        >
                          <Link
                            href={`/products/${category.slug}`}
                            className={`flex justify-between items-center py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 ${
                              hoveredCategory === category._id
                                ? "bg-gray-100"
                                : ""
                            }`}
                          >
                            {category.title}
                            {category.subCategories.length > 0 && (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </Link>

                          {/* Flyout Subcategories */}
                          {hoveredCategory === category._id &&
                            category.subCategories.length > 0 && (
                              <div className="absolute top-0 left-full ml-1 w-64 bg-white shadow-lg rounded-md z-20">
                                <div className="py-2">
                                  <h3 className="px-4 py-2 text-sm font-semibold text-gray-900 border-b">
                                    {category.title} Categories
                                  </h3>
                                  <ul className="mt-2">
                                    {category.subCategories.map(
                                      (subCategory) => (
                                        <li key={subCategory._id}>
                                          <Link
                                            href={`/products/${category.slug}/${subCategory.slug}`}
                                            className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
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

            <ActiveLink href={`/blogs`}>
              <span className="font-medium transition-colors duration-300 hover:text-primary">
                Blogs
              </span>
            </ActiveLink>

            <ActiveLink href={`/contact`}>
              <span className="font-medium transition-colors duration-300 hover:text-primary">
                Contact Us
              </span>
            </ActiveLink>

            <>
              {user && (
                <>
                  {isAdmin && (
                    <ActiveLink href={`/dashboard/admin`}>
                      <span className="font-medium transition-colors duration-300 hover:text-primary">
                        Dashboard
                      </span>
                    </ActiveLink>
                  )}

                  {isStudent && (
                    <ActiveLink href={`/dashboard/user`}>
                      <span className="font-medium transition-colors duration-300 hover:text-primary">
                        Dashboard
                      </span>
                    </ActiveLink>
                  )}
                </>
              )}
            </>
          </div>

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
              <div className="flex gap-0">
                <Button variant="ghost" size="icon">
                  <Heart className="h-6 w-6" />
                  <span className="sr-only">Wishlist</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="h-6 w-6" />
                  <span className="sr-only">Cart</span>
                </Button>
              </div>

              {/* login/logout button */}
              <div className="flex items-center gap-4">
                {user ? (
                  <Button className="cursor-pointer" onClick={handleLogout}>
                    Logout
                  </Button>
                ) : (
                  <Link href={`/login`}>
                    <Button className="cursor-pointer">Login</Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
