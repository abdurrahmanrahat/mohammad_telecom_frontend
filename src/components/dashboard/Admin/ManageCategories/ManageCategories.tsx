"use client";

import { MyLoader } from "@/components/shared/Ui/MyLoader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { useGetCategoriesQuery } from "@/redux/api/categoryApi";
import { TCategory } from "@/types/category.type";
import { ChevronDown, ChevronRight, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import AddCategoryModal from "./AddCategoryModal";

export default function ManageCategories() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  // RTK Query hook
  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery({});

  if (isCategoriesLoading) {
    return <MyLoader />;
  }

  // Use the data from the API or fallback to empty array
  const categories: TCategory[] = categoriesData?.data || [];

  const toggleExpand = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Categories</h1>
        <AddCategoryModal categories={categories} />
      </div>

      <div className="grid gap-4">
        {categories.map((category) => (
          <Card
            key={category._id}
            className="border border-gray-200 shadow-sm overflow-hidden p-4 pb-0"
          >
            <div
              className=" bg-white hover:bg-gray-50 cursor-pointer transition-colors duration-300"
              onClick={() => toggleExpand(category._id)}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-8 w-8 mr-2 cursor-pointer"
                  >
                    {expandedCategories.includes(category._id) ? (
                      <ChevronDown className="h-5 w-5 text-purple-600" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-600" />
                    )}
                  </Button>
                  <CardTitle className="text-lg font-medium">
                    {category.title}
                  </CardTitle>

                  <Badge className="ml-2 bg-purple-100 text-purple-800 hover:bg-purple-200">
                    {category.subCategories.length} subcategories
                  </Badge>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  {category.subCategories.length === 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div
              className={`overflow-auto transition-all duration-300 ease-in-out ${
                expandedCategories.includes(category._id)
                  ? "max-h-[400px] opacity-100"
                  : "h-0 opacity-0"
              }`}
            >
              {category.subCategories.length > 0 && (
                <div className="border-t border-gray-100">
                  {category.subCategories.map((subcategory) => (
                    <div
                      key={subcategory._id}
                      className="flex justify-between items-center pl-16 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex items-center">
                        <span className="text-sm font-medium">
                          {subcategory.title}
                        </span>
                        {/* {subcategory.subCategories.length > 0 && (
                          <Badge className="ml-2 bg-gray-100 text-gray-800 hover:bg-gray-200 text-xs">
                            {subcategory.subCategories.length} items
                          </Badge>
                        )} */}
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
