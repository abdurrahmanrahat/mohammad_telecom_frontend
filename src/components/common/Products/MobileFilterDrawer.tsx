"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import FilterBar from "./FilterBar";
import PriceFilter from "./PriceFilter";

export default function MobileFilterDrawer() {
  // Remove the controlled state - let the Sheet component handle its own state
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="lg:hidden flex items-center gap-2"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[300px] sm:w-[350px] overflow-y-auto bg-white p-4"
      >
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="py-4 space-y-6">
          <div className="mb-6">
            <h2 className="font-bold text-lg mb-3">Categories</h2>
            <FilterBar hideTitle={true} />
          </div>
          <div className="border-t pt-4">
            <PriceFilter />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
