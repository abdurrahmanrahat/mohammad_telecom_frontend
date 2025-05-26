"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TProduct } from "@/types";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ProductCard({ product }: { product: TProduct }) {
  const router = useRouter();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = () => {
    console.log("cart");
    setIsWishlisted((prev) => !prev);
  };

  const handleCardClick = () => {
    router.push(`/products/${product._id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex flex-col bg-white border border-gray-200 rounded-none overflow-hidden transition-all duration-300 hover:shadow-cardLightShadow cursor-pointer"
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-contain p-4"
        />

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart();
          }}
          className={cn(
            "absolute top-2 right-2 p-2 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer",
            isWishlisted ? "text-red-500" : "text-gray-500 hover:text-red-500"
          )}
          aria-label="Add to wishlist"
        >
          <Heart
            className={cn("h-5 w-5", isWishlisted ? "fill-red-500" : "")}
          />
        </button>
      </div>

      {/* Product Info */}
      <div className="flex flex-col p-4 flex-grow">
        <h5 className="text-base font-medium line-clamp-2 mb-2">
          {product.name}
        </h5>

        {/* Star Rating */}
        <div className="flex mb-2">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={cn(
                "w-4 h-4",
                i < product.averageRatings ? "text-yellow-400" : "text-gray-300"
              )}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>

      {/* Price and Cart */}
      <div className="flex items-center justify-between p-4 pt-0 mt-auto">
        <span className="text-primary font-medium text-lg">
          ৳ {product.price.toFixed(0)}{" "}
          <del className="text-gray-300 ml-1 text-base">
            {product.price + 50}{" "}
          </del>
        </span>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart();
          }}
          className="cursor-pointer"
          aria-label="Add to cart"
        >
          <ShoppingCart className="h-5 w-5" /> Order Now
        </Button>
      </div>
    </div>
  );
}
