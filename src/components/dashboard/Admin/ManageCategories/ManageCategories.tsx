"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronRight, Edit, Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import AddCategoryModal from "./AddCategoryModal";

// Sample category data
const initialCategories = [
  {
    id: 1,
    name: "Electronics",
    parentId: null,
    subcategories: [
      { id: 4, name: "Smartphones", parentId: 1 },
      { id: 5, name: "Laptops", parentId: 1 },
      { id: 6, name: "Accessories", parentId: 1 },
    ],
  },
  {
    id: 2,
    name: "Clothing",
    parentId: null,
    subcategories: [
      { id: 7, name: "Men's Wear", parentId: 2 },
      { id: 8, name: "Women's Wear", parentId: 2 },
      { id: 9, name: "Kids", parentId: 2 },
    ],
  },
  {
    id: 3,
    name: "Home & Kitchen",
    parentId: null,
    subcategories: [
      { id: 10, name: "Furniture", parentId: 3 },
      { id: 11, name: "Appliances", parentId: 3 },
      { id: 12, name: "Decor", parentId: 3 },
    ],
  },
];

export default function ManageCategories() {
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);

  const toggleExpand = (categoryId: number) => {
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

        <AddCategoryModal />
      </div>

      <div className="grid gap-4">
        {initialCategories.map((category) => (
          <Card key={category.id} className="border border-gray-200 shadow-sm">
            <CardHeader className="p-4 bg-gray-50 rounded-t-lg">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-8 w-8 mr-2"
                    onClick={() => toggleExpand(category.id)}
                  >
                    {expandedCategories.includes(category.id) ? (
                      <ChevronDown className="h-5 w-5" />
                    ) : (
                      <ChevronRight className="h-5 w-5" />
                    )}
                  </Button>
                  <CardTitle className="text-lg font-medium">
                    {category.name}
                  </CardTitle>
                  <Badge className="ml-2 bg-purple-100 text-purple-800 hover:bg-purple-200">
                    {category.subcategories.length} subcategories
                  </Badge>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
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
            </CardHeader>
            {expandedCategories.includes(category.id) &&
              category.subcategories.length > 0 && (
                <CardContent className="p-0">
                  <div className="divide-y">
                    {category.subcategories.map((subcategory) => (
                      <div
                        key={subcategory.id}
                        className="flex justify-between items-center p-4 pl-12 hover:bg-gray-50"
                      >
                        <div className="flex items-center">
                          <span className="text-sm font-medium">
                            {subcategory.name}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
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
                </CardContent>
              )}
          </Card>
        ))}
      </div>
    </div>
  );
}
