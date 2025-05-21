"use client";

import { useGetProductsQuery } from "@/redux/api/productApi";
import { TProduct } from "@/types";
import { useEffect, useState } from "react";
import FilterBar from "./FilterBar";
import { ProductCard } from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import ProductHeader from "./ProductHeader";

const Products = () => {
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentSortOption, setCurrentSortOption] =
    useState<string>("Featured"); // done to set

  console.log("currentSortOption", currentSortOption);

  // RTK Query hook
  const { data: productsData, isLoading: isProductsLoading } =
    useGetProductsQuery({});
  const [products, setProducts] = useState(productsData?.data.data || []);

  // Sort products when the sort option changes
  useEffect(() => {
    let sorted = [...products];

    switch (currentSortOption) {
      case "Featured":
        // Featured products might have a specific flag or ranking
        // For now, we'll keep the original order
        sorted = [...products];
        break;
      case "Price: Low to High":
        sorted = [...products].sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        sorted = [...products].sort((a, b) => b.price - a.price);
        break;
      case "Newest":
        sorted = [...products].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "Best Selling":
        sorted = [...products].sort((a, b) => b.salesCount - a.salesCount);
        break;
      case "Top Rated":
        sorted = [...products].sort((a, b) => b.rating - a.rating);
        break;
      case "Name: A to Z":
        sorted = [...products].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Name: Z to A":
        sorted = [...products].sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    setProducts(sorted);
  }, [currentSortOption]);

  // Handle sorting change from the header
  const handleSortChange = (sortOption: string) => {
    setCurrentSortOption(sortOption);
  };

  return (
    <div className="py-16 grid grid-cols-12 gap-8">
      {/* additional filters */}
      <div className="col-span-3 hidden lg:block">
        <FilterBar />
      </div>

      <div className="col-span-12 lg:col-span-9">
        {/* title something */}
        <ProductHeader onSortChange={handleSortChange} />

        <div>
          {isProductsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(12)].map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div>
              {productsData.data.data.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {productsData.data.data.map((product: TProduct) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="flex justify-center items-center py-24">
                  <h4 className="text-xl md:text-2xl font-medium">
                    No Product Found!
                  </h4>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
