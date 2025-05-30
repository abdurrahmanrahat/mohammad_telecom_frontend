"use client";

import { Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeFromWishlist } from "@/redux/reducers/wishlistSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import WishlistCard from "./WishListCard";

export default function WishlistSheet() {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const dispatch = useAppDispatch();
  const wishlists = useAppSelector((state) => state.wishlist.items);

  const removeItem = (productId: string) => {
    dispatch(removeFromWishlist(productId));
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Heart className="h-5 w-5" />

          {wishlists.length > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {wishlists.length}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent hideClose={false} className="w-full sm:max-w-[400px]">
        <SheetHeader className="-mb-4">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Your Wishlist Items
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full overflow-auto">
          {/* Main Content */}
          <div className="w-full pt-12 px-4">
            <div>
              <div>
                <div className="">
                  {wishlists.length === 0 ? (
                    <div className="h-full w-full mx-auto text-center py-20">
                      <h4 className="text-lg lg:text-xl font-medium mb-4">
                        Your wishlist is empty!
                      </h4>
                      <Button asChild>
                        <Link href="/products">Continue Shopping</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="py-6">
                      {wishlists.map((product, index) => (
                        <div key={product._id}>
                          <div className="">
                            <WishlistCard
                              product={product}
                              onWishlistRemove={removeItem}
                            />
                          </div>
                          {index < wishlists.length - 1 && (
                            <hr className="my-4 border border-primary/10" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
