import { Button } from "@/components/ui/button";
import { TProduct } from "@/types";
import { ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";

type TWishlistCardProps = {
  product: TProduct;
  onWishlistRemove: (id: string) => void;
};

const WishlistCard = ({ product, onWishlistRemove }: TWishlistCardProps) => {
  return (
    <div className="grid grid-cols-12 gap-2 items-center ">
      <div className="col-span-3">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name.slice(0, 6)}
          width={100}
          height={100}
          className="rounded-md object-cover"
        />
      </div>

      <div className="col-span-9 space-y-2">
        <div className="flex justify-between gap-2">
          <h3 className="text-sm line-clamp-2">{product.name}</h3>
          <Button
            variant="ghost"
            size="icon"
            className="text-red-500 hover:text-red-600"
            onClick={() => onWishlistRemove(product._id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex justify-end items-center">
          <Button
            // onClick={(e) => {
            //   e.stopPropagation();
            //   handleAddToCart();
            // }}
            className="cursor-pointer"
            aria-label="Add to cart"
            size="sm"
          >
            <ShoppingCart className="h-5 w-5" /> Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
