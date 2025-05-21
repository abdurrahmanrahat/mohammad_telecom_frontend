"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import PriceFilter from "./PriceFilter";

// Category type definition
type SubCategory = {
  _id: string;
  title: string;
  slug: string;
  subCategories: SubCategory[];
};

type Category = {
  _id: string;
  title: string;
  slug: string;
  subCategories: SubCategory[];
};

// Sample data from your JSON
const categories: Category[] = [
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

// Category component that handles its own expanded state
const CategoryItem = ({ category }: { category: Category }) => {
  const [expanded, setExpanded] = useState(false);
  const hasSubcategories =
    category.subCategories && category.subCategories.length > 0;

  return (
    <div className="mb-1">
      <div
        className={`flex items-center justify-between py-2 px-3 cursor-pointer rounded-md ${
          hasSubcategories ? "hover:bg-gray-100" : ""
        }`}
        onClick={() => hasSubcategories && setExpanded(!expanded)}
      >
        <Link
          href={`/category/${category.slug}`}
          className="font-medium hover:text-primary flex-1"
        >
          {category.title}
        </Link>
        {hasSubcategories && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            className="p-1 rounded-full hover:bg-gray-200"
          >
            {expanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        )}
      </div>

      {expanded && hasSubcategories && (
        <div className="pl-4">
          {category.subCategories.map((subCategory) => (
            <div key={subCategory._id} className="py-1.5 px-3">
              <Link
                href={`/category/${category.slug}/${subCategory.slug}`}
                className="text-gray-700 hover:text-primary text-sm flex items-center"
              >
                {subCategory.title}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function FilterBar({
  hideTitle = false,
}: {
  hideTitle?: boolean;
}) {
  return (
    <div className="bg-white rounded-md">
      {!hideTitle && <h2 className="font-bold text-lg mb-3">Categories</h2>}
      <div className="space-y-1">
        {categories.map((category) => (
          <CategoryItem key={category._id} category={category} />
        ))}
      </div>
      {!hideTitle && (
        <div className="mt-6 pt-4 border-t">
          <PriceFilter />
        </div>
      )}
    </div>
  );
}
