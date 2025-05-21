"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PriceFilterProps {
  minPrice?: number;
  maxPrice?: number;
  onChange?: (range: [number, number]) => void;
}

export default function PriceFilter({
  minPrice = 0,
  maxPrice = 5000,
  onChange,
}: PriceFilterProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([
    minPrice,
    maxPrice,
  ]);
  const [displayRange, setDisplayRange] = useState<[number, number]>([
    minPrice,
    maxPrice,
  ]);
  console.log("priceRange", priceRange);
  const router = useRouter();

  // Update the display range when the slider is being dragged
  const handleSliderChange = (value: number[]) => {
    setDisplayRange([value[0], value[1]]);
  };

  // Only update the actual filter when the slider is released
  const handleSliderCommit = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
    onChange?.([value[0], value[1]]);
  };

  // Format price with currency symbol
  const formatPrice = (price: number) => {
    return `₹ ${price.toLocaleString()}`;
  };

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-base uppercase">Filter by Price</h3>

      <div className="px-2 pt-2 pb-6">
        <Slider
          defaultValue={[minPrice, maxPrice]}
          min={minPrice}
          max={maxPrice}
          step={10}
          value={displayRange}
          onValueChange={handleSliderChange}
          onValueCommit={handleSliderCommit}
          className="my-6 bg-gray-200 rounded-full"
        />

        <div className="flex items-center justify-between">
          <Button
            variant="default"
            className="bg-black hover:bg-gray-800 text-white rounded-full px-6 cursor-pointer"
            onClick={() => {
              handleSliderCommit(displayRange);

              router.push(
                `/products?priceRange=${priceRange[0]}-${priceRange[1]}`
              );
            }}
          >
            Filter
          </Button>
          <div className="text-sm">
            Price: {formatPrice(displayRange[0])} —{" "}
            {formatPrice(displayRange[1])}
          </div>
        </div>
      </div>
    </div>
  );
}
